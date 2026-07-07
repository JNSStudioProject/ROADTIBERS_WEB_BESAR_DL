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
  Cell,
  Legend
} from "recharts";

const volumeData = [
  { time: "08:00", "Volume Kendaraan": 690 },
  { time: "09:00", "Volume Kendaraan": 760 },
  { time: "10:00", "Volume Kendaraan": 842 },
  { time: "11:00", "Volume Kendaraan": 880 },
  { time: "12:00", "Volume Kendaraan": 920 },
];

const violationData = [
  { name: "Tanpa Helm", count: 24, color: "#f59e0b" },
  { name: "Bonceng >2", count: 8, color: "#14b8a6" },
  { name: "Plat/Pajak", count: 5, color: "#1d4ed8" },
];

export function TrafficVolumeChart() {
  return (
    <div className="w-full h-72 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={volumeData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
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
          />
          <Legend 
            verticalAlign="top" 
            height={36} 
            iconType="circle"
            wrapperStyle={{ fontSize: '13px', fontWeight: 500, color: '#334155' }}
          />
          <Line 
            type="monotone" 
            dataKey="Volume Kendaraan" 
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

export function ViolationDistributionChart() {
  return (
    <div className="w-full h-72 mt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={violationData} layout="vertical" margin={{ top: 0, right: 30, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
          <XAxis 
            type="number"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#475569", fontSize: 13, fontWeight: 500 }}
          />
          <YAxis 
            dataKey="name" 
            type="category"
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: "#0B1F3A", fontSize: 13, fontWeight: 500 }}
            width={100}
          />
          <Tooltip 
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{ borderRadius: "12px", border: "1px solid #e2e8f0", boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)", padding: "12px" }}
            labelStyle={{ fontWeight: 600, color: "#0f172a", marginBottom: "4px" }}
            itemStyle={{ fontWeight: 500, color: "#0f172a", fontSize: "14px" }}
            formatter={(value) => [`${value} Kasus`, "Jumlah"]}
          />
          <Bar dataKey="count" name="Jumlah Kasus" radius={[0, 6, 6, 0]} isAnimationActive={false} barSize={32}>
            {violationData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
