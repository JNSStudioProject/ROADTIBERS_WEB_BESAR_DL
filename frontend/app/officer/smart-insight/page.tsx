import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { StatusBadge } from "@/components/common";
import { AreaRiskScoreChart, ActionPriorityChart } from "@/components/charts/officer-insight-charts";

export default function OfficerSmartInsightPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Insight Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-teal-200 bg-teal-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-teal-700">
              Smart Insight
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Insight Operasional Petugas
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Ringkasan analisis kondisi lalu lintas, risiko pelanggaran, area prioritas, dan rekomendasi tindakan untuk membantu petugas membaca situasi.
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
              <span className="text-slate-400">Validasi:</span> Insight perlu evaluasi petugas
            </p>
          </div>
        </section>

        {/* 2. Main Insight Summary */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col relative overflow-hidden">
            <div className="absolute top-0 right-1/4 w-64 h-64 bg-teal-500/5 blur-[60px] rounded-full pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 relative z-10 divide-y md:divide-y-0 md:divide-x divide-slate-200">
              
              <div className="flex flex-col space-y-2 md:pr-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Insight Utama</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-xl font-medium text-[#0B1F3A]">Kepadatan meningkat</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Volume kendaraan naik menuju periode siang.
                </p>
              </div>
              
              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Risiko Tertinggi</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-xl font-medium text-amber-600">Pelanggaran tanpa helm</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Kategori ini paling sering muncul pada sample pemantauan.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:px-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Area Prioritas</p>
                <div className="flex items-center pt-1 pb-2">
                  <span className="text-xl font-medium text-red-600">Simpang SKA</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Area ini menunjukkan risiko dan volume paling tinggi.
                </p>
              </div>

              <div className="flex flex-col space-y-2 pt-6 md:pt-0 md:pl-6">
                <p className="text-sm font-medium text-slate-500 uppercase tracking-widest">Rekomendasi Utama</p>
                <div className="flex items-center pt-1 pb-2">
                  <StatusBadge status="Tinggi" className="px-4 py-1 text-xs mb-1 mr-2 hidden sm:inline-flex" />
                  <span className="text-xl font-medium text-[#1D4ED8]">Tambah pemantauan</span>
                </div>
                <p className="text-sm font-normal text-slate-600 leading-relaxed">
                  Petugas perlu memprioritaskan area padat dan validasi pelanggaran.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* 3. Insight KPI Grid */}
        <section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { label: "Area Prioritas", value: "3", unit: "Area", color: "text-[#0B1F3A]", helper: "Butuh pengawasan lebih." },
              { label: "Risiko Tinggi", value: "2", unit: "Kategori", color: "text-red-600", helper: "Perlu segera ditangani." },
              { label: "Pelanggaran Dominan", value: "Tanpa Helm", unit: "", color: "text-amber-600", helper: "Berdasarkan sample AI." },
              { label: "Prediksi Kemacetan", value: "32", unit: "Menit", color: "text-red-600", helper: "Maksimal antrean diprediksi." },
              { label: "Kasus Perlu Validasi", value: "14", unit: "Kasus", color: "text-blue-600", helper: "Menunggu verifikasi manual." },
              { label: "Rekomendasi Aktif", value: "4", unit: "Tindakan", color: "text-teal-600", helper: "Tindak lanjut yang disarankan." },
            ].map((kpi, i) => (
              <div key={i} className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between">
                <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-3">{kpi.label}</p>
                <div className="mb-4">
                  <span className={`text-3xl font-medium ${kpi.color} tracking-tight`}>
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

        {/* 4. Charts Section */}
        <section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Skor Risiko Area</h3>
              <AreaRiskScoreChart />
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Simpang SKA dan Jl. Sudirman menjadi area dengan skor risiko tertinggi. Petugas perlu memprioritaskan pemantauan dan validasi pada dua area tersebut.
                </p>
              </div>
            </div>

            <div className="p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h3 className="text-base font-medium text-[#0B1F3A] mb-2">Prioritas Tindakan</h3>
              <ActionPriorityChart />
              <div className="mt-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Validasi pelanggaran visual mendominasi prioritas tugas petugas hari ini, diikuti dengan pengaturan kepadatan di area kritis.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 5. Insight Workspace */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Column (Analysis) */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Analisis Penyebab (Cause Analysis)</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-teal-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Volume kendaraan meningkat secara konstan pada periode siang.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Pelanggaran tanpa helm paling sering muncul sebagai akibat sekunder dari kepadatan di jalur pendek.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-teal-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Beberapa area persimpangan menunjukkan kombinasi bahaya kepadatan dan risiko pelanggaran marka.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Analisis Pola Risiko (Risk Patterns)</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-amber-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Risiko pelanggaran meningkat pesat seiring menumpuknya antrean kendaraan.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Area yang padat menghasilkan jauh lebih banyak data ambigu yang memerlukan validasi visual petugas.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-amber-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Pelanggaran tertentu (seperti tanpa helm dan berhenti melewati garis) muncul secara sistematis di lokasi yang sama setiap hari.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Prioritas Validasi</h2>
              <div className="space-y-4">
                {[
                  { type: "Tanpa Helm", risk: "Tinggi", note: "14 kasus perlu validasi" },
                  { type: "Plat Perlu Pemeriksaan", risk: "Sedang", note: "7 data perlu dicek" },
                  { type: "Area Berhenti", risk: "Sedang", note: "4 kasus perlu verifikasi" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div>
                      <p className="text-sm font-medium text-[#0B1F3A]">{item.type}</p>
                      <p className="text-sm font-normal text-slate-600">{item.note}</p>
                    </div>
                    <StatusBadge status={item.risk} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Action Plan & Prioritization) */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Peringkat Prioritas Area</h2>
              <div className="space-y-4">
                {[
                  { rank: "1", area: "Simpang SKA", risk: "Tinggi", note: "Volume dan pelanggaran meningkat drastis." },
                  { rank: "2", area: "Jl. Sudirman", risk: "Tinggi", note: "Pelanggaran area berhenti sangat perlu dipantau." },
                  { rank: "3", area: "Harapan Raya", risk: "Sedang", note: "Validasi plat tersamarkan perlu perhatian." },
                  { rank: "4", area: "Panam (UNRI)", risk: "Sedang", note: "Kepadatan antrean perlahan mulai naik." },
                ].map((loc, i) => (
                  <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-sm font-medium text-slate-700 shrink-0">
                      {loc.rank}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-1">
                        <p className="text-sm font-medium text-[#0B1F3A]">{loc.area}</p>
                        <StatusBadge status={loc.risk} />
                      </div>
                      <p className="text-sm font-normal text-slate-600">{loc.note}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Rencana Tindakan Petugas (Action Plan)</h2>
              <ul className="space-y-3">
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Prioritaskan pengerahan pengawasan di Simpang SKA dan Jl. Sudirman.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Selesaikan validasi visual kasus tanpa helm terlebih dahulu di Pusat Deteksi AI.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Cek hasil Plate Monitoring untuk mencocokkan data indikasi administrasi simulasi.
                  </p>
                </li>
                <li className="flex gap-3">
                  <span className="text-blue-500 mt-1 text-[10px]">■</span>
                  <p className="text-sm font-normal text-slate-700 leading-relaxed">
                    Siapkan draf laporan akhir hari jika status risiko area tetap tinggi.
                  </p>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm flex flex-col">
              <h2 className="text-base font-medium text-[#0B1F3A] mb-3">Catatan Operasional</h2>
              <ul className="space-y-2">
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Insight semata-mata membantu petugas menentukan prioritas penanganan awal.
                </li>
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Seluruh rangkuman insight harus selalu dibandingkan ulang dengan kondisi lapangan riil.
                </li>
                <li className="flex gap-2 text-sm font-normal text-slate-700">
                  <span className="text-blue-500">■</span> Insight mesin ini tidak dapat dijadikan keputusan resmi sebelum divalidasi manual oleh petugas kepolisian.
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 6. Insight Detail Table */}
        <section>
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
            <h2 className="text-lg font-medium text-[#0B1F3A] mb-6">Detail Matriks Insight Operasional</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[900px]">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Kategori Insight</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Temuan</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Dampak Operasional</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Prioritas</th>
                    <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Tindak Lanjut</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    { cat: "Kepadatan", found: "Volume naik menuju siang", impact: "Potensi kemacetan lebih lama", risk: "Tinggi", action: "Pantau area prioritas" },
                    { cat: "Pelanggaran", found: "Tanpa helm dominan", impact: "Perlu validasi visual mendalam", risk: "Tinggi", action: "Cek sample deteksi" },
                    { cat: "Plat", found: "Beberapa data perlu pemeriksaan", impact: "Butuh verifikasi lanjutan petugas", risk: "Sedang", action: "Buka Plate Monitoring" },
                    { cat: "Laporan", found: "Risiko tetap tinggi", impact: "Perlu dokumentasi operasional khusus", risk: "Sedang", action: "Siapkan laporan" },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4 text-sm font-medium text-[#0B1F3A]">{row.cat}</td>
                      <td className="p-4 text-sm font-medium text-slate-700">{row.found}</td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.impact}</td>
                      <td className="p-4">
                        <StatusBadge status={row.risk} />
                      </td>
                      <td className="p-4 text-sm font-normal text-slate-600">{row.action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* 7 & 8. Decision Support and Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Decision Support Panel */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Ringkasan Keputusan Operasional</h2>
            <ul className="space-y-3 mt-2">
              <li className="flex gap-3">
                <span className="text-blue-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Fokus utama operasional hari ini adalah menanggulangi area dengan peningkatan volume kendaraan dan risiko pelanggaran markah yang signifikan.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-amber-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Validasi konfirmasi secara manual tetap diwajibkan untuk seluruh kasus pelanggaran dan pembacaan plat sebelum dilakukan tindak lanjut penilangan.
                </p>
              </li>
              <li className="flex gap-3">
                <span className="text-teal-500 mt-1 text-[10px]">■</span>
                <p className="text-sm font-normal text-slate-700 leading-relaxed">
                  Petugas operasional disarankan untuk segera beralih memeriksa halaman Monitoring Pelanggaran, Plate Monitoring, dan menu Forecasting sebelum memulai rekapitulasi pelaporan.
                </p>
              </li>
            </ul>
          </div>

          {/* Recommended Officer Actions */}
          <div className="p-6 sm:p-8 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col">
            <h2 className="text-base font-medium text-[#0B1F3A] mb-5">Rekomendasi Tindakan Petugas</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: "Validasi Tanpa Helm", desc: "Prioritaskan pengecekan kasus ini lebih dulu.", link: "/officer/violation-monitoring" },
                { title: "Fokus Area SKA & Sudirman", desc: "Awasi dua area paling berisiko hari ini." },
                { title: "Sinkronisasi Forecast", desc: "Cocokkan insight saat ini dengan hasil forecasting.", link: "/officer/forecasting" },
                { title: "Susun Pelaporan", desc: "Laporan wajib jika risiko tinggi terkonfirmasi.", link: "/officer/report" },
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
          <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Operasional Lanjutan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: "Monitoring Pelanggaran", href: "/officer/violation-monitoring", helper: "Lihat tren real-time" },
              { label: "Forecasting", href: "/officer/forecasting", helper: "Lihat prediksi periode depan" },
              { label: "Plate Monitoring", href: "/officer/vehicle-plate", helper: "Pantau indikasi administrasi" },
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
