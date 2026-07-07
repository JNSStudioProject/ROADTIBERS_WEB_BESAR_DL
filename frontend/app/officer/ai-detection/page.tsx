import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import { StatusBadge } from "@/components/common";

export default function OfficerAIDetectionPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-7xl mx-auto space-y-10 pb-12">
        
        {/* 1. Header Bar */}
        <section className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-slate-200">
          <div className="space-y-2">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50/80 px-3 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-[#1D4ED8]">
              Officer AI Detection
            </span>
            <h1 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#0B1F3A]">
              Pusat Deteksi AI
            </h1>
            <p className="text-base font-normal text-slate-600 leading-relaxed max-w-2xl">
              Panel kerja untuk membaca hasil deteksi kendaraan, rambu, dan indikasi pelanggaran dari sample pemantauan.
            </p>
          </div>
          <div className="flex flex-col gap-1.5 text-right bg-slate-50 border border-slate-200 px-4 py-2.5 rounded-xl">
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Mode:</span> Data simulasi prototype
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Sumber:</span> Sample kamera
            </p>
            <p className="text-xs font-medium text-slate-500">
              <span className="text-slate-400">Validasi:</span> Perlu pemeriksaan petugas
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Input Panel & Visual Preview */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* 2. Detection Input Panel */}
            <section>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                <div className="space-y-3">
                  <h2 className="text-lg font-medium text-[#0B1F3A]">Sumber Analisis</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                    <p className="text-sm font-medium text-slate-600">
                      <span className="text-slate-400 w-24 inline-block">Sumber:</span> Kamera Simpang SKA
                    </p>
                    <p className="text-sm font-medium text-slate-600">
                      <span className="text-slate-400 w-24 inline-block">Waktu:</span> Hari ini, 10:15 WIB
                    </p>
                    <p className="text-sm font-medium text-slate-600">
                      <span className="text-slate-400 w-24 inline-block">Jenis:</span> Kendaraan, Rambu, Pelanggaran
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-400 w-24">Status:</span>
                      <StatusBadge status="Selesai" className="bg-blue-50 text-blue-700 border-blue-200 ring-blue-100" />
                    </div>
                  </div>
                </div>

                <div className="shrink-0 p-4 bg-slate-50 rounded-xl border border-slate-200 border-dashed text-center min-w-[200px]">
                  <p className="text-sm font-medium text-[#0B1F3A] mb-1">Area Upload Prototype</p>
                  <p className="text-xs font-normal text-slate-500 mb-3">Gunakan sample kamera</p>
                  <span className="inline-block px-3 py-1.5 bg-white border border-slate-200 rounded text-xs font-medium text-slate-400 cursor-not-allowed">
                    Belum terhubung
                  </span>
                </div>
              </div>
            </section>

            {/* 3. Visual Detection Preview */}
            <section>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm">
                <h2 className="text-lg font-medium text-[#0B1F3A] mb-4">Preview Deteksi Visual</h2>
                
                {/* CSS Visual Box */}
                <div className="relative w-full aspect-video bg-slate-100 rounded-xl border border-slate-200 overflow-hidden mb-4">
                  {/* Road backdrop elements */}
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,#e2e8f0_0%,#f1f5f9_100%)] opacity-50" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-48 h-full border-x-4 border-dashed border-white/60 transform perspective-[1000px] rotateX-[60deg]" />
                  
                  {/* Motor + Tanpa helm bbox */}
                  <div className="absolute top-[30%] left-[25%] w-[15%] h-[40%] border-2 border-red-500 bg-red-500/10 rounded-sm">
                    <div className="absolute -top-7 left-0 flex gap-1">
                      <span className="bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 whitespace-nowrap">Motor</span>
                      <span className="bg-red-500 text-white text-[10px] font-medium px-1.5 py-0.5 whitespace-nowrap">Tanpa Helm</span>
                    </div>
                  </div>

                  {/* Mobil bbox */}
                  <div className="absolute top-[40%] left-[55%] w-[25%] h-[35%] border-2 border-blue-500 bg-blue-500/10 rounded-sm">
                    <div className="absolute -top-5 left-0 bg-blue-500 text-white text-[10px] font-medium px-1.5 py-0.5 whitespace-nowrap">
                      Mobil
                    </div>
                  </div>

                  {/* Rambu bbox */}
                  <div className="absolute top-[15%] right-[10%] w-[8%] h-[20%] border-2 border-teal-500 bg-teal-500/10 rounded-sm">
                    <div className="absolute -bottom-5 left-0 bg-teal-500 text-white text-[10px] font-medium px-1.5 py-0.5 whitespace-nowrap">
                      Rambu
                    </div>
                  </div>
                </div>

                <p className="text-xs font-medium text-slate-500 text-center">
                  ℹ️ Hasil visual merupakan representasi sample pemantauan untuk kebutuhan demo.
                </p>
              </div>
            </section>
            
            {/* 6. Detection Result Table */}
            <section>
              <div className="p-6 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm overflow-hidden flex flex-col">
                <h2 className="text-lg font-medium text-[#0B1F3A] mb-4">Rincian Hasil Deteksi</h2>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[700px]">
                    <thead>
                      <tr className="bg-slate-100 border-b border-slate-200">
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Waktu</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Objek</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Hasil Deteksi</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Jumlah</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Risiko</th>
                        <th className="p-4 text-sm font-medium text-slate-600 uppercase tracking-wider">Catatan Petugas</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {[
                        { time: "10:15", obj: "Motor", res: "Tanpa helm", count: 5, risk: "Tinggi", note: "Perlu validasi visual" },
                        { time: "10:15", obj: "Motor", res: "Bonceng >2", count: 2, risk: "Sedang", note: "Cek ulang frame sample" },
                        { time: "10:15", obj: "Rambu", res: "Dilarang berhenti", count: 1, risk: "Sedang", note: "Perhatikan area sekitar rambu" },
                        { time: "10:15", obj: "Mobil", res: "Kendaraan normal", count: 14, risk: "Rendah", note: "Tidak ada tindakan khusus" },
                      ].map((row, i) => (
                        <tr key={i} className="hover:bg-slate-50 transition-colors">
                          <td className="p-4 text-sm font-medium text-slate-500">{row.time}</td>
                          <td className="p-4 text-sm font-medium text-[#0B1F3A]">{row.obj}</td>
                          <td className="p-4 text-sm font-normal text-slate-600">{row.res}</td>
                          <td className="p-4 text-sm font-normal text-slate-600">{row.count}</td>
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

          </div>

          {/* Right Column: Summaries, Validation, Actions */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* 4. Detection Summary Cards */}
            <section>
              <h2 className="text-lg font-medium text-[#0B1F3A] mb-4">Rangkuman Deteksi</h2>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { value: "38", label: "Kendaraan Terdeteksi", helper: "Total objek", colSpan: "col-span-2" },
                  { value: "24", label: "Motor", helper: "Roda dua" },
                  { value: "14", label: "Mobil", helper: "Roda empat+" },
                  { value: "3", label: "Rambu Terdeteksi", helper: "Total objek" },
                  { value: "7", label: "Indikasi Pelanggaran", helper: "Perlu cek" },
                ].map((item, i) => (
                  <div key={i} className={`p-4 rounded-xl bg-white/70 backdrop-blur-xl border border-white shadow-sm flex flex-col justify-between ${item.colSpan || ''}`}>
                    <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-1">{item.label}</p>
                    <p className="text-3xl font-medium text-[#1D4ED8] mb-2">{item.value}</p>
                    <p className="text-xs font-normal text-slate-500">{item.helper}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. Violation Detection Result */}
            <section>
              <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm">
                <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Kategori Pelanggaran</h2>
                <div className="space-y-3">
                  {[
                    { type: "Tanpa helm", count: "5 kasus", risk: "Tinggi" },
                    { type: "Bonceng lebih dari 2", count: "2 kasus", risk: "Sedang" },
                    { type: "Melanggar area berhenti", count: "1 kasus", risk: "Sedang" },
                  ].map((v, i) => (
                    <div key={i} className="flex justify-between items-center p-3 bg-slate-50 rounded-lg border border-slate-200">
                      <div>
                        <p className="text-sm font-medium text-[#0B1F3A]">{v.type}</p>
                        <p className="text-xs font-normal text-slate-500 mt-0.5">{v.count}</p>
                      </div>
                      <StatusBadge status={v.risk} />
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100">
                  <p className="text-xs font-normal text-slate-600 leading-relaxed">
                    Kategori ini perlu diperiksa kembali oleh petugas sebelum dijadikan dasar laporan resmi.
                  </p>
                </div>
              </div>
            </section>

            {/* 7. Officer Validation Panel */}
            <section>
              <div className="p-5 rounded-2xl bg-blue-50 border border-blue-200 shadow-sm">
                <h2 className="text-base font-medium text-[#0B1F3A] mb-3 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">!</span>
                  Validasi Petugas Tetap Diperlukan
                </h2>
                <ul className="space-y-2">
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-0.5 text-xs">■</span>
                    <p className="text-sm font-normal text-slate-700">AI membantu mempercepat pembacaan sample pemantauan.</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-0.5 text-xs">■</span>
                    <p className="text-sm font-normal text-slate-700">Petugas tetap perlu memeriksa konteks visual.</p>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-blue-500 mt-0.5 text-xs">■</span>
                    <p className="text-sm font-normal text-slate-700">Hasil deteksi belum menjadi keputusan resmi tanpa verifikasi.</p>
                  </li>
                </ul>
              </div>
            </section>

            {/* 8. Recommended Actions */}
            <section>
              <div className="p-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white shadow-sm">
                <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Rekomendasi Tindakan</h2>
                <div className="space-y-3">
                  {[
                    { title: "Periksa Kasus Tanpa Helm", desc: "Validasi visual pada frame sample." },
                    { title: "Prioritaskan Risiko Tinggi", desc: "Awasi area yang memiliki banyak kasus tinggi." },
                    { title: "Gunakan Violation Monitoring", desc: "Lihat rangkuman jenis pelanggaran.", link: "/officer/violation-monitoring" },
                    { title: "Buat Laporan", desc: "Jika pelanggaran terkonfirmasi.", link: "/officer/report" },
                  ].map((action, i) => (
                    <div key={i} className="p-3 bg-white rounded-lg border border-slate-200 shadow-sm">
                      <p className="text-sm font-medium text-[#0B1F3A] mb-1">{action.title}</p>
                      <p className="text-sm font-normal text-slate-600 mb-2">{action.desc}</p>
                      {action.link && (
                        <Link href={action.link} className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
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
              <h2 className="text-base font-medium text-[#0B1F3A] mb-4">Navigasi Terkait</h2>
              <div className="flex flex-col gap-3">
                {[
                  { label: "Monitoring Pelanggaran", href: "/officer/violation-monitoring", helper: "Lihat tren pelanggaran" },
                  { label: "Plate Monitoring", href: "/officer/vehicle-plate", helper: "Pantau nopol kendaraan" },
                  { label: "Forecasting", href: "/officer/forecasting", helper: "Prediksi durasi kemacetan" },
                  { label: "Buat Laporan", href: "/officer/report", helper: "Unduh laporan deteksi" },
                ].map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="flex justify-between items-center p-4 rounded-xl bg-[#0B1F3A] border border-[#142d52] hover:bg-[#142d52] transition-colors shadow-sm group"
                  >
                    <div>
                      <h3 className="text-sm font-medium text-white mb-0.5">{action.label}</h3>
                      <p className="text-xs font-normal text-blue-200/70">{action.helper}</p>
                    </div>
                    <span className="text-white/50 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">→</span>
                  </Link>
                ))}
              </div>
            </section>

          </div>
        </div>
      </div>
    </OfficerPageShell>
  );
}
