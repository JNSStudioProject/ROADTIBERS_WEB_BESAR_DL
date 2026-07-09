import sys
import os
import random
from datetime import datetime, timedelta

# Ensure we can import from the backend directory
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from database import SessionLocal, engine, Base
from db_models import DetectionHistory

def seed():
    # Ensure tables exist
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # 21 days ago
    now = datetime.utcnow()
    start_date = now - timedelta(days=21)
    
    print("Memulai pengisian data simulasi 21 hari ke belakang di database...")
    records = []
    
    # Define a trend: weekend has more violations, morning has more vehicles
    for day in range(22): # 0 to 21
        current_day = start_date + timedelta(days=day)
        is_weekend = current_day.weekday() >= 5
        
        # generate detections for every active hour (e.g., 6 AM to 10 PM)
        for hour in range(6, 23):
            # Skenario: jam sibuk (7-9 pagi dan 4-6 sore)
            is_rush_hour = (7 <= hour <= 9) or (16 <= hour <= 18)
            
            # Jumlah file yang dianalisis per jam
            num_detections = random.randint(3, 8) if is_rush_hour else random.randint(1, 4)
            
            for _ in range(num_detections):
                minute = random.randint(0, 59)
                timestamp = current_day.replace(hour=hour, minute=minute, second=0, microsecond=0)
                
                # Base counts
                base_mobil = random.randint(5, 15) if is_rush_hour else random.randint(1, 8)
                base_motor = random.randint(10, 30) if is_rush_hour else random.randint(5, 15)
                
                # Pelanggaran lebih tinggi saat bukan rush hour atau weekend
                base_helm = random.randint(1, 4) if is_weekend else random.randint(0, 2)
                base_boncengan = random.randint(0, 2)
                
                kendaraan_data = []
                for _ in range(base_mobil): kendaraan_data.append({"name": "Mobil", "confidence": round(random.uniform(0.7, 0.95), 2), "box": {"x1":0, "y1":0, "x2":10, "y2":10}})
                for _ in range(base_motor): kendaraan_data.append({"name": "Motor", "confidence": round(random.uniform(0.7, 0.95), 2), "box": {"x1":0, "y1":0, "x2":10, "y2":10}})
                for _ in range(random.randint(0, 3)): kendaraan_data.append({"name": "Truk", "confidence": 0.8, "box": {"x1":0, "y1":0, "x2":10, "y2":10}})
                
                helm_data = []
                for _ in range(base_helm): helm_data.append({"name": "No Helmet", "confidence": round(random.uniform(0.6, 0.9), 2), "box": {"x1":0, "y1":0, "x2":10, "y2":10}})
                
                boncengan_data = []
                for _ in range(base_boncengan): boncengan_data.append({"name": "Bonceng 3", "confidence": 0.75, "box": {"x1":0, "y1":0, "x2":10, "y2":10}})
                
                results_json = {
                    "kendaraan": {"status": "success", "data": kendaraan_data},
                    "helm": {"status": "success", "data": helm_data},
                    "boncengan": {"status": "success", "data": boncengan_data},
                    "plat": {"status": "success", "data": []},
                    "pajak": {"status": "success", "data": []}
                }
                
                record = DetectionHistory(
                    timestamp=timestamp,
                    filename=f"sim_cctv_kamera1_{timestamp.strftime('%Y%m%d_%H%M%S')}.jpg",
                    results=results_json
                )
                records.append(record)
                
    db.bulk_save_objects(records)
    db.commit()
    db.close()
    
    print(f"Sukses! Menambahkan {len(records)} baris data historis (21 hari) ke dalam tabel detection_history.")

if __name__ == "__main__":
    seed()
