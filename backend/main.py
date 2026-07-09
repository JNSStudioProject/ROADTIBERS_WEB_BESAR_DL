import cv2
import numpy as np
from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from typing import Any, Optional
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

from models.detect_all import load_all_models, detect_all
from database import engine, Base, SessionLocal
from db_models import DetectionHistory
from datetime import datetime, timedelta
import pytz

try:
    from models.forecasting_kel9 import predict_congestion
except Exception as e:
    print(f"Error importing forecasting_kel9: {e}")
    predict_congestion = None

try:
    from models.forecasting_kel8 import predict_violations
except Exception as e:
    print(f"Error importing forecasting_kel8: {e}")
    predict_violations = None

try:
    from models.forecasting_kendaraan import predict_kendaraan
except Exception as e:
    print(f"Error importing forecasting_kendaraan: {e}")
    predict_kendaraan = None

# 1. Initialize DB tables
Base.metadata.create_all(bind=engine)

# 2. Define Lifespan for Model Loading
@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Loading all YOLO models...")
    load_all_models()
    print("Models loaded. Startup complete.")
    yield
    print("Shutting down.")

app = FastAPI(lifespan=lifespan)

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Define Response Schema matching frontend ApiResponse<T>
class ApiResponse(BaseModel):
    status: str
    message: Optional[str] = None
    data: Any

# 4. API Endpoints
@app.post("/detection/analyze-all", response_model=ApiResponse)
async def analyze_all(file: UploadFile = File(...)):
    try:
        # Read image
        contents = await file.read()
        nparr = np.frombuffer(contents, np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

        if frame is None:
            return ApiResponse(
                status="error",
                message="Invalid image file format",
                data=None
            )

        # Run parallel detection
        results, errors = detect_all(frame)

        # Determine status
        status = "success"
        message = "All models ran successfully."
        if errors > 0:
            if errors == 5:
                status = "error"
                message = "All models failed to run."
            else:
                message = f"Detection completed with {errors} model error(s)."

        # Save to DB
        db = SessionLocal()
        try:
            history = DetectionHistory(
                filename=file.filename,
                results=results
            )
            db.add(history)
            db.commit()
            db.refresh(history)
        finally:
            db.close()

        return ApiResponse(
            status=status,
            message=message,
            data={"history_id": history.id if 'history' in locals() else None, "detections": results}
        )

    except Exception as e:
        return ApiResponse(
            status="error",
            message=str(e),
            data=None
        )

# 5. Forecasting Endpoint for Trip Planner
@app.get("/forecasting/plan", response_model=ApiResponse)
async def plan_trip(
    origin: str, 
    destination: str,
    time_mode: str = "berangkat", 
    target_time: str = "08:00", 
    weather: str = "Cerah",
    temp_c: float = 30.0
):
    if not predict_congestion:
        return ApiResponse(status="error", message="Forecasting model not loaded", data=None)
        
    try:
        from models.forecasting_kel9 import routes
        route_info = routes.get((origin, destination))
        if route_info is None:
            distance, speed_ff = 5.0, 40
        else:
            distance, speed_ff, _, _, _ = route_info
            
        base_travel_time_minutes = int(distance / speed_ff * 60)
        
        now = datetime.now()
        hour, minute = map(int, target_time.split(':'))
        target_dt = now.replace(hour=hour, minute=minute, second=0, microsecond=0)
        
        db = SessionLocal()
        yolo_history = {}
        try:
            now_utc = datetime.utcnow()
            twelve_hours_ago = now_utc - timedelta(hours=12)
            records = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= twelve_hours_ago).all()
            for record in records:
                if not record.results: continue
                kendaraan_res = record.results.get('kendaraan', {})
                if kendaraan_res.get('status') == 'success' and kendaraan_res.get('data'):
                    hr = record.timestamp.hour
                    yolo_history[hr] = yolo_history.get(hr, 0) + len(kendaraan_res['data'])
        finally:
            db.close()
            
        if time_mode == "tiba":
            # Guess 1
            guess_depart = target_dt - timedelta(minutes=base_travel_time_minutes)
            target_hour_str = guess_depart.strftime("%H:00")
            
            res_guess = predict_congestion(
                origin=origin, destination=destination, weather=weather,
                temp_c=temp_c, target_hour_str=target_hour_str,
                current_date=now.date(), yolo_history=yolo_history
            )
            
            delay = res_guess["delay_minutes"] if res_guess else 0
            total_travel_time = base_travel_time_minutes + delay
            recommended_depart = target_dt - timedelta(minutes=total_travel_time)
            
            # Final prediction
            res_final = predict_congestion(
                origin=origin, destination=destination, weather=weather,
                temp_c=temp_c, target_hour_str=recommended_depart.strftime("%H:00"),
                current_date=now.date(), yolo_history=yolo_history
            )
            
            delay_final = res_final["delay_minutes"] if res_final else 0
            cat_final = res_final["category"] if res_final else "Tidak Diketahui"
            risk_final = res_final["risk_level"] if res_final else "Rendah"
            total_travel_time_final = base_travel_time_minutes + delay_final
            recommended_depart_final = target_dt - timedelta(minutes=total_travel_time_final)
            
            return ApiResponse(
                status="success",
                message="Plan generated successfully",
                data={
                    "mode": "tiba",
                    "target_arrival": target_time,
                    "recommended_departure": recommended_depart_final.strftime("%H:%M"),
                    "base_travel_time": base_travel_time_minutes,
                    "delay_minutes": delay_final,
                    "total_travel_time": total_travel_time_final,
                    "congestion_category": cat_final,
                    "risk_level": risk_final
                }
            )
        else:
            # time_mode == "berangkat"
            target_hour_str = target_dt.strftime("%H:00")
            res = predict_congestion(
                origin=origin, destination=destination, weather=weather,
                temp_c=temp_c, target_hour_str=target_hour_str,
                current_date=now.date(), yolo_history=yolo_history
            )
            
            delay = res["delay_minutes"] if res else 0
            cat = res["category"] if res else "Tidak Diketahui"
            risk = res["risk_level"] if res else "Rendah"
            total_travel_time = base_travel_time_minutes + delay
            arrival_time = target_dt + timedelta(minutes=total_travel_time)
            
            return ApiResponse(
                status="success",
                message="Plan generated successfully",
                data={
                    "mode": "berangkat",
                    "departure_time": target_time,
                    "estimated_arrival": arrival_time.strftime("%H:%M"),
                    "base_travel_time": base_travel_time_minutes,
                    "delay_minutes": delay,
                    "total_travel_time": total_travel_time,
                    "congestion_category": cat,
                    "risk_level": risk
                }
            )
    except Exception as e:
        import traceback
        traceback.print_exc()
        return ApiResponse(status="error", message=str(e), data=None)

# 6. Forecasting Endpoint
@app.get("/forecasting/current", response_model=ApiResponse)
async def get_forecast(
    origin: str = "Simpang SKA", 
    destination: str = "Bandara SSK II", 
    weather: str = "Cerah", 
    temp_c: float = 30.0
):
    if not predict_congestion:
        return ApiResponse(status="error", message="Forecasting model not loaded", data=None)

    db = SessionLocal()
    try:
        # Get YOLO history for the last 12 hours
        now = datetime.utcnow()
        twelve_hours_ago = now - timedelta(hours=12)
        
        # Query db for detections
        records = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= twelve_hours_ago).all()
        
        yolo_history = {}
        kendaraan_hourly = {}
        for record in records:
            if not record.results: continue
            
            # Record results format: dict of models -> {status, message, data: [detections]}
            kendaraan_res = record.results.get('kendaraan', {})
            if kendaraan_res.get('status') == 'success' and kendaraan_res.get('data'):
                hour = record.timestamp.hour
                # Add to YOLO history (count vehicles)
                yolo_history[hour] = yolo_history.get(hour, 0) + len(kendaraan_res['data'])
                
                # Detail per kelas untuk lstm kendaraan
                if hour not in kendaraan_hourly:
                    kendaraan_hourly[hour] = {'Mobil': 0, 'Bus': 0, 'Truk': 0, 'Motor': 0}
                
                # Pemetan label model YOLOv8 (COCO) ke label yang diharapkan forecasting
                name_mapping = {
                    'car': 'Mobil',
                    'bus': 'Bus',
                    'truck': 'Truk',
                    'motorcycle': 'Motor',
                    'Mobil': 'Mobil',
                    'Bus': 'Bus',
                    'Truk': 'Truk',
                    'Motor': 'Motor'
                }
                
                for det in kendaraan_res['data']:
                    raw_name = det.get('name')
                    name = name_mapping.get(raw_name, raw_name)
                    if name in kendaraan_hourly[hour]:
                        kendaraan_hourly[hour][name] += 1

        # Since UTC hour might be different, let's just use it directly or convert to local.
        # For simplicity, we use local hour for the prediction target
        local_now = datetime.now()
        target_hour = (local_now + timedelta(hours=1)).strftime("%H:00")
        
        result_kel9 = predict_congestion(
            origin=origin,
            destination=destination,
            weather=weather,
            temp_c=temp_c,
            target_hour_str=target_hour,
            current_date=local_now.date(),
            yolo_history=yolo_history
        )
        
        # Hitung total pelanggaran hari ini (untuk input Kelompok 8)
        today_start_utc = now.replace(hour=0, minute=0, second=0, microsecond=0)
        records_today = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= today_start_utc).all()
        
        total_violations_today = 0
        for record in records_today:
            if not record.results: continue
            # Model pelanggaran: plat, pajak, helm, boncengan
            for model_name in ['plat', 'pajak', 'helm', 'boncengan']:
                res = record.results.get(model_name, {})
                if res.get('status') == 'success' and res.get('data'):
                    total_violations_today += len(res['data'])

        # Result for Kelompok 8
        if predict_violations:
            tanggal = local_now.strftime("%Y-%m-%d")
            # Jika tidak ada deteksi sama sekali, berikan nilai default historis (misal 25)
            # Jika ada, gunakan hasil deteksi YOLO (total_violations_today)
            input_jumlah = total_violations_today if total_violations_today > 0 else 25
            result_kel8 = predict_violations(tanggal, input_jumlah)
        else:
            result_kel8 = {
                "predicted_violations": total_violations_today,
                "note": "Fungsi predict_violations gagal dimuat."
            }

        # Forecasting lstm kendaraan
        sorted_hours = sorted(kendaraan_hourly.keys())[-3:]
        yolo_history_3_steps = [kendaraan_hourly[h] for h in sorted_hours]
        
        if predict_kendaraan:
            result_kendaraan = predict_kendaraan(yolo_history_3_steps)
        else:
            result_kendaraan = {"error": "Fungsi predict_kendaraan gagal dimuat."}

        return ApiResponse(
            status="success",
            message="Forecasting successful",
            data={
                "congestion": result_kel9,
                "violations": result_kel8,
                "vehicles": result_kendaraan,
                "yolo_history_used": yolo_history,
                "target_hour": target_hour
            }
        )

    except Exception as e:
        import traceback
        traceback.print_exc()
        return ApiResponse(
            status="error",
            message=str(e),
            data=None
        )
    finally:
        db.close()

# 7. Dashboard and History Endpoints
@app.get("/dashboard/summary", response_model=ApiResponse)
async def get_dashboard_summary():
    db = SessionLocal()
    try:
        now = datetime.utcnow()
        today_start = now.replace(hour=0, minute=0, second=0, microsecond=0)
        
        # Get today's records
        records_today = db.query(DetectionHistory).filter(DetectionHistory.timestamp >= today_start).all()
        
        total_detections_today = len(records_today)
        total_violations_today = 0
        total_vehicles = 0
        violation_counts = {"Tanpa Helm": 0, "Bonceng >2": 0, "Plat/Pajak": 0}
        
        # for volume chart
        hourly_volume = {}
        
        for record in records_today:
            if not record.results: continue
            
            hr_str = record.timestamp.strftime("%H:00")
            if hr_str not in hourly_volume:
                hourly_volume[hr_str] = 0
                
            kendaraan_res = record.results.get('kendaraan', {})
            if isinstance(kendaraan_res, dict) and kendaraan_res.get('status') == 'success' and kendaraan_res.get('data'):
                total_vehicles += len(kendaraan_res['data'])
                hourly_volume[hr_str] += len(kendaraan_res['data'])
                
            helm_res = record.results.get('helm', {})
            if isinstance(helm_res, dict) and helm_res.get('status') == 'success' and helm_res.get('data'):
                c = len(helm_res['data'])
                total_violations_today += c
                violation_counts["Tanpa Helm"] += c
                
            boncengan_res = record.results.get('boncengan', {})
            if isinstance(boncengan_res, dict) and boncengan_res.get('status') == 'success' and boncengan_res.get('data'):
                c = len(boncengan_res['data'])
                total_violations_today += c
                violation_counts["Bonceng >2"] += c
                
            plat_res = record.results.get('plat', {})
            if isinstance(plat_res, dict) and plat_res.get('status') == 'success' and plat_res.get('data'):
                c = len(plat_res['data'])
                total_violations_today += c
                violation_counts["Plat/Pajak"] += c

            pajak_res = record.results.get('pajak', {})
            if isinstance(pajak_res, dict) and pajak_res.get('status') == 'success' and pajak_res.get('data'):
                c = len(pajak_res['data'])
                total_violations_today += c
                violation_counts["Plat/Pajak"] += c

        # format volume data for chart
        volume_data = []
        for hr in sorted(hourly_volume.keys()):
            volume_data.append({"time": hr, "Volume Kendaraan": hourly_volume[hr]})
            
        # fill gaps if needed, or just return as is
            
        # format violation data for chart
        violation_data = [
            {"name": "Tanpa Helm", "count": violation_counts["Tanpa Helm"], "color": "#f59e0b"},
            {"name": "Bonceng >2", "count": violation_counts["Bonceng >2"], "color": "#14b8a6"},
            {"name": "Plat/Pajak", "count": violation_counts["Plat/Pajak"], "color": "#1d4ed8"},
        ]
        
        dominant_violation = max(violation_counts, key=violation_counts.get) if total_violations_today > 0 else "Tidak Ada"
        
        return ApiResponse(
            status="success",
            message="Dashboard summary retrieved",
            data={
                "total_detections_today": total_detections_today,
                "total_violations_today": total_violations_today,
                "total_vehicles": total_vehicles,
                "dominant_violation": dominant_violation,
                "volume_data": volume_data,
                "violation_data": violation_data,
                "system_status": "Normal",
                "traffic_condition": "Padat" if total_vehicles > 200 else "Lancar",
                "violation_risk": "Tinggi" if total_violations_today > 50 else "Sedang"
            }
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        return ApiResponse(status="error", message=str(e), data=None)
    finally:
        db.close()


@app.get("/history/list", response_model=ApiResponse)
async def get_history_list(limit: int = 100):
    db = SessionLocal()
    try:
        records = db.query(DetectionHistory).order_by(DetectionHistory.timestamp.desc()).limit(limit).all()
        history_rows = []
        
        for record in records:
            time_str = record.timestamp.strftime("%H:%M")
            loc_str = "Simpang SKA"
            
            if not record.results: continue
            
            v_count = 0
            if isinstance(record.results.get('kendaraan'), dict) and record.results.get('kendaraan', {}).get('status') == 'success' and record.results.get('kendaraan', {}).get('data'):
                v_count = len(record.results['kendaraan']['data'])
                
            helm_count = 0
            if isinstance(record.results.get('helm'), dict) and record.results.get('helm', {}).get('status') == 'success' and record.results.get('helm', {}).get('data'):
                helm_count = len(record.results['helm']['data'])
                
            bonceng_count = 0
            if isinstance(record.results.get('boncengan'), dict) and record.results.get('boncengan', {}).get('status') == 'success' and record.results.get('boncengan', {}).get('data'):
                bonceng_count = len(record.results['boncengan']['data'])
                
            if v_count > 0:
                history_rows.append({
                    "time": time_str,
                    "loc": loc_str,
                    "cat": "Volume Kendaraan",
                    "res": "Terdeteksi",
                    "count": f"{v_count} Kendaraan",
                    "risk": "Normal" if v_count < 10 else "Sedang",
                    "val": "Tinjauan Awal",
                    "note": f"Dari {record.filename}",
                    "follow": "Lihat Detail"
                })
                
            if helm_count > 0:
                history_rows.append({
                    "time": time_str,
                    "loc": loc_str,
                    "cat": "Pelanggaran Helm",
                    "res": "Tanpa Helm",
                    "count": f"{helm_count} Kasus",
                    "risk": "Tinggi",
                    "val": "Perlu Validasi",
                    "note": f"Dari {record.filename}",
                    "follow": "Validasi Visual"
                })
                
            if bonceng_count > 0:
                history_rows.append({
                    "time": time_str,
                    "loc": loc_str,
                    "cat": "Pelanggaran Penumpang",
                    "res": "Bonceng >2",
                    "count": f"{bonceng_count} Kasus",
                    "risk": "Tinggi",
                    "val": "Perlu Validasi",
                    "note": f"Dari {record.filename}",
                    "follow": "Validasi Visual"
                })
                
        return ApiResponse(
            status="success",
            message="History list retrieved",
            data={
                "historyRows": history_rows[:limit],
                "total_records": len(history_rows)
            }
        )
    except Exception as e:
        import traceback
        traceback.print_exc()
        return ApiResponse(status="error", message=str(e), data=None)
    finally:
        db.close()
