import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { StatusBadge } from "@/components/common";
import { ForecastVolumeChart, ForecastViolationChart, ForecastCongestionChart } from "@/components/charts/officer-forecasting-charts";

export default function OfficerForecastingPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Forecasting Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-purple-200 bg-purple-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-purple-700">
              Officer Forecasting
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Prediksi Operasional Petugas
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Pantauan prediksi volume kendaraan, pelanggaran, dan durasi kemacetan untuk membantu petugas menyiapkan tindakan lebih awal.
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
              <span className="text-slate-400">Periode:</span> Hari ini
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Validasi:</span> Prediksi perlu evaluasi petugas
            </p>
          </div>
        </section>

        {/* 2. Forecast Status Summary */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-purple-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Prediksi Volume</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-[#0B1F3A]">920 kendaraan</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Volume kendaraan diperkirakan meningkat menuju siang.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Prediksi Pelanggaran</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-amber-600">45 kasus</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Indikasi pelanggaran perlu dipantau lebih dekat.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Prediksi Kemacetan</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-2xl font-medium text-red-600">32 menit</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Area padat perlu disiapkan pengawasan.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Level Risiko</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status="Tinggi" className="px-4 py-1.5 text-sm" />
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Petugas perlu mengantisipasi periode sibuk.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. KPI Forecasting Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Volume Sekarang", value: "842", unit: "Kendaraan", color: "text-[#0B1F3A]", helper: "Terekam pada jam ini." },
              { label: "Volume Prediksi", value: "920", unit: "Kendaraan", color: "text-[#1D4ED8]", helper: "Estimasi puncak berikutnya." },
              { label: "Kenaikan Volume", value: "9.3%", unit: "", color: "text-amber-600", helper: "Persentase lonjakan." },
              { label: "Prediksi Pelanggaran", value: "45", unit: "Kasus", color: "text-amber-600", helper: "Proyeksi pelanggaran." },
              { label: "Durasi Kemacetan", value: "32", unit: "Menit", color: "text-red-600", helper: "Estimasi antrean terpanjang." },
              { label: "Area Prioritas", value: "3", unit: "Area", color: "text-red-600", helper: "Zona merah butuh petugas." },
            ].map((kpi, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{kpi.label}</p>
                <div className="mb-4">
                  <span className={`text-4xl font-medium ${kpi.color} tracking-tight`}>
                    {kpi.value}
                  </span>
                  {kpi.unit && <span className="text-base font-medium text-slate-500 ml-2">{kpi.unit}</span>}
                </div>
                <div className="mt-auto pt-4 border-t border-slate-100">
                  <p className="text-sm font-normal text-slate-500">{kpi.helper}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4 & 5. Forecasting Workspace */}
        <section className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Left Column (Charts) */}
          <div className="xl:col-span-2 space-y-8">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-8">Grafik Prediksi Operasional</h2>
              
              <div className="space-y-12">
                <div>
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Prediksi Volume Kendaraan</h3>
                  <ForecastVolumeChart />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Prediksi menunjukkan volume kendaraan meningkat konsisten menuju periode siang (12:00-13:00). Petugas perlu menyiapkan pengawasan area simpang lebih awal.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Prediksi Pelanggaran</h3>
                  <ForecastViolationChart />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Indikasi pelanggaran diperkirakan naik berbanding lurus dengan kepadatan kendaraan. Puncak teguran berpotensi terjadi di jam sibuk siang.
                    </p>
                  </div>
                </div>

                <div className="pt-8 border-t border-slate-200">
                  <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Prediksi Durasi Kemacetan</h3>
                  <ForecastCongestionChart />
                  <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <p className="text-sm font-normal text-slate-700 leading-relaxed">
                      Durasi kemacetan akan mencapai puncaknya hingga lebih dari 30 menit. Diperlukan intervensi petugas lalu lintas pada titik kritis.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column (Risks & Priorities) */}
          <div className="xl:col-span-1 space-y-8">
            
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Periode Risiko Tinggi</h2>
              <div className="space-y-4">
                {[
                  { time: "11:00–13:00", risk: "Tinggi", note: "Volume dan pelanggaran meningkat." },
                  { time: "16:00–18:00", risk: "Sedang", note: "Potensi kepadatan pulang kerja." },
                  { time: "19:00–20:00", risk: "Sedang", note: "Perlu pemantauan tambahan." },
                ].map((period, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-[#0B1F3A]">{period.time}</p>
                      <StatusBadge status={period.risk} />
                    </div>
                    <p className="text-sm font-normal text-slate-600">{period.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Area Prioritas</h2>
              <div className="space-y-4">
                {[
                  { area: "Simpang SKA", risk: "Tinggi", note: "Volume diprediksi meningkat drastis." },
                  { area: "Jl. Sudirman", risk: "Tinggi", note: "Potensi pelanggaran area berhenti saat padat." },
                  { area: "Harapan Raya", risk: "Sedang", note: "Perlu pemantauan plat dan pelanggaran." },
                  { area: "Panam (UNRI)", risk: "Sedang", note: "Kepadatan mulai naik di siang hari." },
                ].map((loc, i) => (
                  <div key={i} className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="flex justify-between items-start mb-2">
                      <p className="text-sm font-medium text-[#0B1F3A]">{loc.area}</p>
                      <StatusBadge status={loc.risk} />
                    </div>
                    <p className="text-sm font-normal text-slate-600">{loc.note}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-3">Catatan Operasional</h2>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Prediksi membantu petugas menyiapkan pengawasan lebih awal.
                </li>
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Data tetap perlu dibandingkan dengan kondisi lapangan.
                </li>
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Gunakan halaman laporan jika risiko tetap tinggi.
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* 6. Forecast Detail Table */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Detail Prediksi Jam Berikutnya</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Waktu</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Volume Prediksi</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Pelanggaran Prediksi</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Durasi Kemacetan</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Level Risiko</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan Petugas</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { time: "10:00", vol: "842", viol: "12", cong: "20 menit", risk: "Sedang", note: "Kondisi mulai padat" },
                    { time: "11:00", vol: "880", viol: "17", cong: "25 menit", risk: "Tinggi", note: "Siapkan pengawasan area padat" },
                    { time: "12:00", vol: "920", viol: "21", cong: "32 menit", risk: "Tinggi", note: "Risiko meningkat pada periode siang" },
                    { time: "13:00", vol: "940", viol: "24", cong: "35 menit", risk: "Tinggi", note: "Perlu evaluasi lanjutan" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-slate-500">{row.time}</td>
                      <td className="p-4 text-sm font-medium text-[#0B1F3A]">{row.vol}</td>
                      <td className="p-4 text-sm font-medium text-[#0B1F3A]">{row.viol}</td>
                      <td className="p-4 text-sm font-medium text-slate-700">{row.cong}</td>
                      <td className="p-4">
                        <StatusBadge status={row.risk} />
                      </td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.note}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7 & 8. Interpretation and Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Interpretasi Prediksi */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Interpretasi Prediksi</h2>
            <ul className="space-y-3 mt-2">
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Volume kendaraan diprediksi meningkat menuju siang.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Pelanggaran juga diperkirakan naik seiring kepadatan lalu lintas.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Durasi kemacetan perlu diantisipasi secara khusus pada area prioritas.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Prediksi belum menjadi keputusan resmi tanpa evaluasi petugas di lapangan.
                </p>
              </li>
            </ul>
          </div>

          {/* Recommended Officer Actions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Rekomendasi Tindakan Petugas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Siapkan Pengawasan", desc: "Fokus pada pukul 11:00–13:00." },
                { title: "Prioritaskan Titik Rawan", desc: "Awasi Simpang SKA dan Jl. Sudirman." },
                { title: "Pantau Pelanggaran Helm", desc: "Teguran visual saat volume meningkat.", link: "/officer/violation-monitoring" },
                { title: "Buat Laporan", desc: "Jika risiko tetap tinggi pasca validasi.", link: "/officer/report" },
              ].map((action, i) => (
                <div key={i} className="p-4 bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
                  <div>
                    <p className="text-sm font-medium text-[#0B1F3A] mb-1">{action.title}</p>
                    <p className="text-sm font-normal text-slate-600 mb-3">{action.desc}</p>
                  </div>
                  {action.link && (
                    <Link href={action.link} className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors mt-auto">
                      Buka Halaman →
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 9. Quick Navigation */}
        <section>
          <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Operasional</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Monitoring Pelanggaran", href: "/officer/violation-monitoring", helper: "Lihat tren real-time" },
              { label: "Plate Monitoring", href: "/officer/vehicle-plate", helper: "Pantau indikasi administrasi" },
              { label: "Riwayat Deteksi", href: "/officer/history", helper: "Lihat log aktivitas sebelumnya" },
              { label: "Buat Laporan", href: "/officer/report", helper: "Unduh evaluasi harian" },
            ].map((action, i) => (
              <Link
                key={i}
                href={action.href}
                className="flex flex-col p-5 rounded-2xl bg-[#0B1F3A] border border-[#142d52] hover:bg-[#142d52] transition-colors shadow-sm group h-full"
              >
                <h3 className="text-sm font-medium text-white mb-2">{action.label}</h3>
                <p className="text-xs font-normal text-blue-200/70 leading-relaxed mb-6 flex-1">{action.helper}</p>
                <div className="mt-auto pt-4 border-t border-white/10 flex justify-between items-center text-xs font-medium text-white/50 group-hover:text-blue-400 transition-colors">
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
