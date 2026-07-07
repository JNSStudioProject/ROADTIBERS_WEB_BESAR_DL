import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { mockDashboardSummary } from "@/data/mock-dashboard";
import { TrafficVolumeChart, ViolationDistributionChart } from "@/components/charts/officer-dashboard-charts";
import { StatusBadge } from "@/components/common";

export default function OfficerDashboardPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Monitoring Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Dashboard Monitoring Petugas
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Pantauan operasional untuk membaca kondisi lalu lintas, pelanggaran, prediksi, dan tindak lanjut petugas.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Mode:</span> Data simulasi prototype
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Area:</span> Pekanbaru
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Update:</span> Hari ini
            </p>
          </div>
        </section>

        {/* 2. Live Monitoring Summary */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#1D4ED8]/5 blur-[60px] rounded-full pointer-events-none" />
            
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6 relative z-10">
              Ringkasan Situasi Saat Ini
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Status Sistem</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={mockDashboardSummary.system_status as string} className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Perlu pemantauan lebih dekat.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Kondisi Lalu Lintas</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={mockDashboardSummary.traffic_condition as string} className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Arus kendaraan melambat.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Risiko Pelanggaran</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status={mockDashboardSummary.violation_risk as string} className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Pelanggaran perlu diprioritaskan.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Monitoring KPI Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { 
                label: "Total Deteksi", 
                value: mockDashboardSummary.total_detections_today.toLocaleString('id-ID'), 
                color: "text-[#1D4ED8]",
                helper: "Kendaraan terekam hari ini."
              },
              { 
                label: "Total Pelanggaran", 
                value: mockDashboardSummary.total_violations_today.toLocaleString('id-ID'), 
                color: "text-red-600",
                helper: "Terkonfirmasi dari deteksi."
              },
              { 
                label: "Kendaraan Aktif", 
                value: mockDashboardSummary.total_vehicles.toLocaleString('id-ID'), 
                color: "text-[#14B8A6]",
                helper: "Estimasi volume saat ini."
              },
              { 
                label: "Pelanggaran Dominan", 
                value: mockDashboardSummary.dominant_violation, 
                color: "text-amber-600", 
                isText: true,
                helper: "Sering muncul di pantauan."
              },
              { 
                label: "Estimasi Kemacetan", 
                value: "32",
                unit: "Menit", 
                color: "text-red-600",
                helper: "Durasi kemacetan saat ini."
              },
              { 
                label: "Prediksi Volume (1 Jam)", 
                value: "920",
                unit: "Kend.", 
                color: "text-blue-600",
                helper: "Perkiraan volume berikutnya."
              },
            ].map((metric, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{metric.label}</p>
                <div className="mb-4">
                  <span className={`${metric.isText ? 'text-xl' : 'text-4xl'} font-medium ${metric.color} tracking-tight`}>
                    {metric.value}
                  </span>
                  {metric.unit && <span className="text-base font-medium text-slate-500 ml-2">{metric.unit}</span>}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-sm font-normal text-slate-500">{metric.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Main Monitoring Workspace */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Charts) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Grafik Pemantauan</h2>
              
              <div className="space-y-10">
                <div>
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Tren Volume Kendaraan</h3>
                  <TrafficVolumeChart />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Volume kendaraan terpantau meningkat menuju pukul 12:00. Petugas perlu mengantisipasi kepadatan jalan pada periode siang.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Komposisi Pelanggaran</h3>
                  <ViolationDistributionChart />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Pelanggaran &quot;Tanpa Helm&quot; masih mendominasi secara signifikan. Prioritaskan teguran atau edukasi di area rawan.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* 7. Recent Detection Activity */}
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Aktivitas Deteksi Terbaru</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="bg-slate-100 border-b border-slate-200">
                      <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Waktu</th>
                      <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Jenis Deteksi</th>
                      <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Jumlah</th>
                      <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Status Risiko</th>
                      <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan Petugas</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {[
                      { time: "14:32", type: "Tidak Pakai Helm", count: "1 Kendaraan", status: "Tinggi", riskColor: "danger", note: "Terdeteksi kamera utara." },
                      { time: "14:28", type: "Pelanggaran Marka", count: "2 Kendaraan", status: "Sedang", riskColor: "warning", note: "Perlu konfirmasi." },
                      { time: "14:25", type: "Volume Tinggi", count: "145 Kendaraan", status: "Normal", riskColor: "info", note: "Jam sibuk dimulai." },
                      { time: "14:15", type: "Berhenti Sembarangan", count: "1 Kendaraan", status: "Tinggi", riskColor: "danger", note: "Di bahu jalan raya." },
                    ].map((row, i) => (
                      <tr key={i} className="hover:bg-slate-50 transition-colors">
                        <td className="p-4 text-sm font-medium text-slate-500">{row.time}</td>
                        <td className="p-4 text-sm font-medium text-[#0B1F3A]">{row.type}</td>
                        <td className="p-4 text-sm font-normal text-slate-600">{row.count}</td>
                        <td className="p-4">
                          <StatusBadge status={row.status} />
                        </td>
                        <td className="p-4 text-sm font-normal text-slate-600">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column (Priority, Actions) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Right: Area Monitoring Priority */}
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Prioritas Area (Pekanbaru)</h2>
              <div className="space-y-4">
                {[
                  { area: "Simpang SKA", status: "Padat", note: "Volume sangat tinggi." },
                  { area: "Panam (UNRI)", status: "Sedang", note: "Arus mulai melambat." },
                  { area: "Jl. Sudirman", status: "Lancar", note: "Arus terkendali." },
                  { area: "Harapan Raya", status: "Padat", note: "Ada antrean panjang." },
                ].map((loc, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-[#0B1F3A]">{loc.area}</p>
                      <StatusBadge status={loc.status} />
                    </div>
                    <p className="text-sm font-normal text-slate-600">{loc.note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* 8. Recommended Officer Actions */}
            <div className="p-6 rounded-2xl bg-blue-50/50 backdrop-blur-xl border border-blue-200 shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5 flex items-center gap-2">
                <span className="text-blue-600">ℹ️</span> Rekomendasi Tindakan
              </h2>
              <div className="space-y-4">
                {[
                  { title: "Prioritaskan Area Padat", desc: "Pantau Simpang SKA dan Harapan Raya melalui CCTV." },
                  { title: "Pantau Pelanggaran Helm", desc: "Fokus pada deteksi tanpa helm yang mendominasi hari ini." },
                  { title: "Cek Forecasting", desc: "Periksa prediksi volume untuk periode siang." },
                  { title: "Siapkan Laporan", desc: "Cetak laporan deteksi jika risiko tetap tinggi." },
                ].map((action, i) => (
                  <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                    <p className="text-sm font-medium text-[#0B1F3A] mb-1">{action.title}</p>
                    <p className="text-sm font-normal text-slate-600 leading-relaxed">{action.desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </section>

        {/* 9. Quick Navigation */}
        <section>
          <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Akses Cepat Halaman Petugas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: "Mulai Deteksi AI", 
                href: "/officer/ai-detection",
                helper: "Buka halaman utama deteksi kamera."
              },
              { 
                label: "Lihat Forecasting", 
                href: "/officer/forecasting",
                helper: "Periksa detail prediksi volume & kemacetan."
              },
              { 
                label: "Cek Riwayat Deteksi", 
                href: "/officer/history",
                helper: "Lihat data riwayat operasional."
              },
              { 
                label: "Buat Laporan", 
                href: "/officer/report",
                helper: "Cetak atau unduh hasil monitoring."
              },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex flex-col p-6 rounded-2xl bg-[#0B1F3A] border border-[#142d52] hover:bg-[#142d52] transition-colors shadow-md group h-full"
              >
                <h3 className="text-base font-medium text-white mb-2">{action.label}</h3>
                <p className="text-sm font-normal text-blue-200/70 leading-relaxed mb-6 flex-1">{action.helper}</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-sm font-medium text-white/50 group-hover:text-blue-400 transition-colors">
                  <span>Buka Menu</span>
                  <span>→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </OfficerPageShell>
  );
}
