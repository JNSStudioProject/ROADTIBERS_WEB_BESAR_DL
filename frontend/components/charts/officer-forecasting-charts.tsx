"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

const volumeData = [
  { time: "08:00", volume: 690 },
  { time: "09:00", volume: 760 },
  { time: "10:00", volume: 842 },
  { time: "11:00", volume: 880 },
  { time: "12:00", volume: 920 },
  { time: "13:00", volume: 940 },
];

const violationData = [
  { time: "08:00", pelanggaran: 6 },
  { time: "09:00", pelanggaran: 9 },
  { time: "10:00", pelanggaran: 12 },
  { time: "11:00", pelanggaran: 17 },
  { time: "12:00", pelanggaran: 21 },
  { time: "13:00", pelanggaran: 24 },
];

const congestionData = [
  { time: "08:00", durasi: 13 },
  { time: "09:00", durasi: 17 },
  { time: "10:00", durasi: 20 },
  { time: "11:00", durasi: 25 },
  { time: "12:00", durasi: 32 },
  { time: "13:00", durasi: 35 },
];

export function ForecastVolumeChart() {
  return (
    <div className="w-full h-64 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={volumeData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", padding: "12px" }}
            labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}
            itemStyle={{ fontWeight: 500, color: "#1d4ed8", fontSize: "14px" }}
            formatter={(value) => [`${value} Kendaraan`, "Volume Prediksi"]}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}
          />
          <Line 
            type="monotone" 
            dataKey="volume" 
            name="Prediksi Volume Kendaraan"
            stroke="#1d4ed8" 
            strokeWidth={4} 
            dot={{ r: 5, strokeWidth: 2, fill: "#ffffff", stroke: "#1d4ed8" }}
            activeDot={{ r: 8, fill: "#1d4ed8", stroke: "#ffffff", strokeWidth: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ForecastViolationChart() {
  return (
    <div className="w-full h-64 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={violationData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
          />
          <Tooltip 
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", padding: "12px" }}
            labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}
            itemStyle={{ fontWeight: 500, color: "#f59e0b", fontSize: "14px" }}
            formatter={(value) => [`${value} Kasus`, "Prediksi Pelanggaran"]}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}
          />
          <Bar 
            dataKey="pelanggaran" 
            name="Prediksi Pelanggaran" 
            fill="#f59e0b" 
            radius={[4, 4, 0, 0]} 
            isAnimationActive={false} 
            barSize={24} 
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export function ForecastCongestionChart() {
  return (
    <div className="w-full h-64 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={congestionData} margin={{ top: 10, right: 20, left: -20, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
          <XAxis 
            dataKey="time" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
          />
          <Tooltip 
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", padding: "12px" }}
            labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}
            itemStyle={{ fontWeight: 500, color: "#ef4444", fontSize: "14px" }}
            formatter={(value) => [`${value} Menit`, "Durasi Kemacetan"]}
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}
          />
          <Line 
            type="monotone" 
            dataKey="durasi" 
            name="Prediksi Durasi Kemacetan"
            stroke="#ef4444" 
            strokeWidth={4} 
            dot={{ r: 5, strokeWidth: 2, fill: "#ffffff", stroke: "#ef4444" }}
            activeDot={{ r: 8, fill: "#ef4444", stroke: "#ffffff", strokeWidth: 3 }}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
