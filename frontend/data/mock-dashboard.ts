import { SYSTEM_STATUS, TRAFFIC_CONDITIONS, VIOLATION_RISK } from "@/lib/status";

export const mockDashboardSummary = {
  system_status: "Normal",
  traffic_condition: "Sedang",
  violation_risk: "Perlu Perhatian",
  total_detections_today: 28,
  total_violations_today: 6,
  total_vehicles: 22,
  dominant_violation: "Tanpa Helm",
  smart_insight: "Terjadi perlambatan arus di Simpang SKA arah Jl. Tuanku Tambusai. Terdapat beberapa indikasi pelanggaran tanpa helm yang terpantau pada rekaman sampel."
};
