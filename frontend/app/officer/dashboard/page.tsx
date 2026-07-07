import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { mockDashboardSummary } from "@/data/mock-dashboard";
import { TrafficVolumeChart, ViolationDistributionChart } from "@/components/charts/officer-dashboard-charts";

export default function OfficerDashboardPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-6xl mx-auto space-y-12 pb-12">
        
        {/* 1. Officer-friendly page header */}
        <section className="relative space-y-4">
          <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
            Officer Command Center
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.2]">
            Dashboard Monitoring Petugas
          </h1>
          <p className="text-base font-medium text-slate-600 leading-relaxed max-w-3xl">
            Ringkasan kondisi lalu lintas, pelanggaran, prediksi, dan rekomendasi tindakan untuk membantu petugas membaca situasi dengan cepat.
          </p>
          <div className="inline-block mt-2 px-3 py-1.5 bg-slate-100 rounded-md border border-slate-200">
            <p className="text-xs font-bold text-slate-500">
              ℹ️ Data yang ditampilkan merupakan data simulasi prototype untuk kebutuhan demo.
            </p>
          </div>
        </section>

        {/* 2. Situation Summary Panel */}
        <section>
          <div className="p-8 sm:p-10 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white shadow-lg flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#1D4ED8]/5 blur-[60px] rounded-full pointer-events-none" />
            
            <h2 className="text-lg font-extrabold text-[#0B1F3A] mb-6 relative z-10 border-b border-slate-200 pb-4">
              Ringkasan Situasi Saat Ini
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              
              <div className="flex flex-col space-y-3">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Status Sistem</p>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-4 py-2 rounded-lg border text-base font-bold shadow-sm ${
                    (mockDashboardSummary.system_status as string) === 'Waspada' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-teal-50 border-teal-200 text-teal-700'
                  }`}>
                    {mockDashboardSummary.system_status}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 mt-2">
                  Sistem mendeteksi kondisi yang perlu dipantau lebih dekat.
                </p>
              </div>
              
              <div className="flex flex-col space-y-3">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Kondisi Lalu Lintas</p>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-4 py-2 rounded-lg border text-base font-bold shadow-sm ${
                    (mockDashboardSummary.traffic_condition as string) === 'Padat' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    {mockDashboardSummary.traffic_condition}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 mt-2">
                  Volume kendaraan cukup tinggi, berpotensi menimbulkan perlambatan laju lalu lintas.
                </p>
              </div>

              <div className="flex flex-col space-y-3">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Risiko Pelanggaran</p>
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center px-4 py-2 rounded-lg border text-base font-bold shadow-sm ${
                    (mockDashboardSummary.violation_risk as string) === 'Tinggi' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    {mockDashboardSummary.violation_risk}
                  </span>
                </div>
                <p className="text-sm font-medium text-slate-600 mt-2">
                  Risiko pelanggaran meningkat, disarankan untuk mengaktifkan peringatan publik.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 6. Recommended Officer Actions (Moved up for priority) */}
        <section>
          <div className="p-8 rounded-[2rem] bg-blue-50/50 backdrop-blur-xl border border-blue-200 shadow-md">
            <h2 className="text-lg font-extrabold text-[#0B1F3A] mb-6 flex items-center gap-3">
              <span className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">!</span>
              Rekomendasi Tindakan Petugas
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                "Prioritaskan area dengan status padat pada pantauan CCTV.",
                "Pantau pelanggaran tanpa helm yang saat ini menjadi dominan.",
                "Siapkan evaluasi petugas lapangan untuk periode siang hari.",
                "Gunakan halaman Forecasting untuk melihat prediksi lanjutan."
              ].map((action, i) => (
                <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-slate-200 shadow-sm">
                  <span className="text-blue-600 font-bold text-lg leading-none mt-0.5">•</span>
                  <span className="text-sm font-bold text-slate-700 leading-relaxed">{action}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Key Metrics with explanations */}
        <section>
          <h2 className="text-xl font-extrabold text-[#0B1F3A] mb-6">Metrik Operasional Hari Ini</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: "Total Deteksi Hari Ini", 
                value: mockDashboardSummary.total_detections_today.toLocaleString('id-ID'), 
                color: "text-[#1D4ED8]",
                helper: "Jumlah total kendaraan yang terekam sistem kamera."
              },
              { 
                label: "Total Pelanggaran", 
                value: mockDashboardSummary.total_violations_today.toLocaleString('id-ID'), 
                color: "text-red-600",
                helper: "Jumlah pelanggaran yang terverifikasi dari deteksi."
              },
              { 
                label: "Kendaraan Aktif", 
                value: mockDashboardSummary.total_vehicles.toLocaleString('id-ID'), 
                color: "text-[#14B8A6]",
                helper: "Estimasi volume kendaraan yang ada di area pantau."
              },
              { 
                label: "Pelanggaran Dominan", 
                value: mockDashboardSummary.dominant_violation, 
                color: "text-amber-600", 
                isText: true,
                helper: "Jenis pelanggaran paling banyak ditemukan."
              },
            ].map((metric, i) => (
              <div key={i} className="p-6 rounded-[1.5rem] bg-white/80 backdrop-blur-xl border border-white shadow-md flex flex-col">
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{metric.label}</p>
                <p className={`${metric.isText ? 'text-xl leading-tight' : 'text-3xl'} font-extrabold ${metric.color} tracking-tight mb-4`}>
                  {metric.value}
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-xs font-medium text-slate-500 leading-relaxed">{metric.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Charts Section */}
        <section>
          <h2 className="text-xl font-extrabold text-[#0B1F3A] mb-6">Grafik dan Analisis</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white shadow-md flex flex-col">
              <h3 className="text-base font-extrabold text-[#0B1F3A] mb-2">Tren Volume Kendaraan</h3>
              <p className="text-sm font-medium text-slate-600 mb-6">Perkiraan perubahan volume kendaraan dari pagi hingga siang.</p>
              
              <div className="flex-1">
                <TrafficVolumeChart />
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-sm font-bold text-slate-700">
                  <span className="text-[#1D4ED8]">💡 Kesimpulan: </span>
                  Volume kendaraan terpantau meningkat konstan menuju pukul 12:00. Petugas perlu mengantisipasi kepadatan jalan pada periode istirahat siang.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white shadow-md flex flex-col">
              <h3 className="text-base font-extrabold text-[#0B1F3A] mb-2">Komposisi Pelanggaran</h3>
              <p className="text-sm font-medium text-slate-600 mb-6">Jenis pelanggaran yang paling sering muncul pada sample pemantauan.</p>
              
              <div className="flex-1">
                <ViolationDistributionChart />
              </div>

              <div className="mt-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-sm font-bold text-slate-700">
                  <span className="text-amber-600">💡 Kesimpulan: </span>
                  Pelanggaran "Tanpa Helm" mendominasi secara signifikan. Dibutuhkan edukasi rambu atau pengerahan petugas pada titik-titik rawan.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Forecasting Snapshot */}
        <section>
          <h2 className="text-xl font-extrabold text-[#0B1F3A] mb-6">Snapshot Prediksi Satu Jam Kedepan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                label: "Prediksi Volume Kendaraan", 
                value: "920", 
                unit: "Kendaraan",
                color: "text-amber-600",
                meaning: "Akan terjadi lonjakan kecil pada arus utama raya." 
              },
              { 
                label: "Prediksi Pelanggaran", 
                value: "45", 
                unit: "Pelanggaran",
                color: "text-[#14B8A6]",
                meaning: "Angka diprediksi stabil jika tidak ada event besar." 
              },
              { 
                label: "Prediksi Kemacetan", 
                value: "32", 
                unit: "Menit Durasi",
                color: "text-red-600",
                meaning: "Perlu disiapkan pengawasan pada persimpangan padat." 
              },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-[1.5rem] bg-white/80 backdrop-blur-xl border border-white shadow-md">
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-3">{item.label}</p>
                <p className="text-3xl font-extrabold text-[#0B1F3A] mb-1">
                  {item.value} <span className="text-base font-bold text-slate-500">{item.unit}</span>
                </p>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm font-bold text-slate-700 leading-relaxed">
                    Tindakan: <span className="font-medium text-slate-600">{item.meaning}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. Recent Activity */}
        <section>
          <h2 className="text-xl font-extrabold text-[#0B1F3A] mb-6">Riwayat Deteksi Terkini</h2>
          <div className="rounded-[2rem] bg-white/80 backdrop-blur-xl border border-white shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Waktu</th>
                    <th className="p-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Jenis Deteksi</th>
                    <th className="p-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Jumlah</th>
                    <th className="p-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Status Risiko</th>
                    <th className="p-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Catatan</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { time: "14:32", type: "Tidak Pakai Helm", count: "1 Kendaraan", status: "Valid", riskColor: "bg-red-100 text-red-700 border-red-200", note: "Terdeteksi kamera utara." },
                    { time: "14:28", type: "Pelanggaran Marka", count: "2 Kendaraan", status: "Review", riskColor: "bg-amber-100 text-amber-700 border-amber-200", note: "Perlu konfirmasi petugas." },
                    { time: "14:25", type: "Volume Tinggi", count: "145 Kendaraan", status: "Info", riskColor: "bg-blue-100 text-blue-700 border-blue-200", note: "Volume normal jam sibuk." },
                    { time: "14:15", type: "Kendaraan Berhenti", count: "1 Kendaraan", status: "Valid", riskColor: "bg-amber-100 text-amber-700 border-amber-200", note: "Berhenti di bahu jalan raya." },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-bold text-slate-500">{row.time}</td>
                      <td className="p-4 text-sm font-bold text-[#0B1F3A]">{row.type}</td>
                      <td className="p-4 text-sm font-medium text-slate-600">{row.count}</td>
                      <td className="p-4">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-widest ${row.riskColor}`}>
                          {row.status}
                        </span>
                      </td>
                      <td className="p-4 text-sm font-medium text-slate-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 8. Quick Actions */}
        <section>
          <h2 className="text-xl font-extrabold text-[#0B1F3A] mb-6">Akses Cepat Petugas</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { 
                label: "Mulai Deteksi AI", 
                href: "/officer/ai-detection",
                helper: "Buka halaman utama deteksi kamera secara real-time."
              },
              { 
                label: "Lihat Forecasting", 
                href: "/officer/forecasting",
                helper: "Periksa prediksi volume, pelanggaran, dan kemacetan secara detail."
              },
              { 
                label: "Tanya AI Assistant", 
                href: "/officer/assistant",
                helper: "Gunakan asisten AI pintar untuk panduan sistem atau regulasi."
              },
              { 
                label: "Buat Laporan", 
                href: "/officer/report",
                helper: "Cetak hasil monitoring hari ini dalam bentuk PDF."
              },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex flex-col justify-between p-6 rounded-[1.5rem] bg-[#0B1F3A] border border-[#142d52] hover:bg-[#142d52] transition-colors shadow-lg group h-full"
              >
                <div>
                  <h3 className="text-base font-bold text-white mb-2">{action.label}</h3>
                  <p className="text-sm font-medium text-blue-200/70 leading-relaxed mb-6">{action.helper}</p>
                </div>
                <div className="flex items-center justify-between mt-auto pt-4 border-t border-white/10">
                  <span className="text-xs font-bold text-white/50 uppercase tracking-widest group-hover:text-blue-400 transition-colors">Buka Menu</span>
                  <span className="text-white/50 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">→</span>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </OfficerPageShell>
  );
}
