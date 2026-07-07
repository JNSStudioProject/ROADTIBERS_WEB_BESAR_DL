import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import {
  InteractiveGlassCard,
  ScrollRevealRow,
  MouseSpotlight,
  MotionSection,
} from "@/components/common";

export default function TrafficOverviewPage() {
  return (
    <PublicPageShell>
      <div className="rt-bright-stage relative overflow-hidden pb-32 min-h-screen pt-12">
        <MouseSpotlight />
        
        {/* Soft background radial glows */}
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />

        {/* 1. Page Hero */}
        <section className="relative pt-32 pb-12 lg:pt-36 lg:pb-16 flex flex-col items-center justify-center z-10">
          <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-6">
            <MotionSection direction="up" delay={0.1}>
              <span className="inline-flex items-center gap-2.5 rounded-full border border-white/80 bg-white/60 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#0B1F3A] backdrop-blur-md shadow-sm">
                Layanan Publik
              </span>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
                Kondisi lalu lintas,<br />lebih mudah dipahami.
              </h1>
              <p className="text-base sm:text-lg text-[#0B1F3A]/70 font-medium leading-relaxed max-w-xl mx-auto">
                Ringkasan kondisi jalan untuk membantu pengguna memilih waktu perjalanan dengan lebih tenang.
              </p>
            </MotionSection>
            
            <MotionSection direction="up" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-white/80 shadow-sm backdrop-blur-md mt-4">
                <span className="w-2 h-2 rounded-full bg-[#14B8A6] animate-pulse shadow-[0_0_8px_#14B8A6]" />
                <span className="text-xs font-bold text-[#0B1F3A]/70">Pemantauan aktif</span>
              </div>
            </MotionSection>
          </div>
        </section>

        {/* 2. Main Traffic Status Panel */}
        <section className="relative z-20 pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <MotionSection direction="up" delay={0.3}>
              <InteractiveGlassCard intensity="strong" glow className="w-full p-8 sm:p-10 flex flex-col md:flex-row items-center gap-8 justify-between border-white rounded-[2rem] shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#1D4ED8]/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="flex-1 space-y-2 relative z-10 w-full">
                  <p className="text-sm font-bold text-[#0B1F3A]/60 uppercase tracking-widest">Area Pemantauan</p>
                  <h2 className="text-3xl font-extrabold text-[#0B1F3A] tracking-tight">Pekanbaru</h2>
                  <div className="inline-flex items-center gap-2 mt-2 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200">
                    <span className="text-[11px] font-bold text-amber-800 uppercase tracking-widest">Trend: Meningkat</span>
                  </div>
                </div>

                <div className="flex flex-row gap-4 relative z-10 w-full md:w-auto">
                  <div className="flex-1 md:flex-none p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-md text-center">
                    <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest mb-1">Status Lalu Lintas</p>
                    <p className="text-2xl font-extrabold text-red-500 tracking-tight">Padat</p>
                  </div>
                  <div className="flex-1 md:flex-none p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-md text-center">
                    <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest mb-1">Estimasi Kemacetan</p>
                    <p className="text-2xl font-extrabold text-[#0B1F3A] tracking-tight">32 menit</p>
                  </div>
                </div>
              </InteractiveGlassCard>
            </MotionSection>
          </div>
        </section>

        {/* 3. Public Summary Cards */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { title: "Status Saat Ini", value: "Padat", helper: "Arus kendaraan mulai melambat.", delay: 0.1, valueColor: "text-red-500" },
                { title: "Estimasi Kemacetan", value: "32 mnt", helper: "Perjalanan dapat memakan waktu lebih lama.", delay: 0.15, valueColor: "text-[#0B1F3A]" },
                { title: "Rekomendasi", value: "Tunda 20–30 mnt", helper: "Jika tidak mendesak, pilih waktu lebih lengang.", delay: 0.2, valueColor: "text-[#1D4ED8]" },
                { title: "Pesan Keselamatan", value: "Berkendara tenang", helper: "Jaga jarak aman dan patuhi rambu.", delay: 0.25, valueColor: "text-[#14B8A6]" },
              ].map((item, i) => (
                <ScrollRevealRow key={i} direction="up" delay={item.delay}>
                  <InteractiveGlassCard intensity="medium" glow className="p-6 h-full flex flex-col justify-between border-white shadow-[0_8px_32px_rgba(11,31,58,0.03)] hover:shadow-lg transition-shadow">
                    <div className="mb-4">
                      <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest">{item.title}</p>
                      <p className={`text-2xl font-extrabold tracking-tight mt-1 ${item.valueColor}`}>{item.value}</p>
                    </div>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.helper}</p>
                  </InteractiveGlassCard>
                </ScrollRevealRow>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Mini Traffic Timeline */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0.1}>
              <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-6 sm:p-8 shadow-sm overflow-x-auto">
                <h3 className="text-sm font-bold text-[#0B1F3A] mb-8">Pola Hari Ini (Data Simulasi Prototype)</h3>
                <div className="flex justify-between items-end gap-2 relative min-w-[500px]">
                  {/* Connecting Line */}
                  <div className="absolute top-1/2 left-4 right-4 h-[2px] bg-slate-100 rounded-full -translate-y-1/2 z-0" />
                  
                  {[
                    { time: "08:00", label: "Lancar", color: "bg-[#14B8A6]", active: false },
                    { time: "09:00", label: "Sedang", color: "bg-amber-400", active: false },
                    { time: "10:00", label: "Padat", color: "bg-red-500", active: true },
                    { time: "11:00", label: "Padat", color: "bg-red-500", active: false },
                    { time: "12:00", label: "Sedang", color: "bg-amber-400", active: false },
                  ].map((node, i) => (
                    <div key={i} className="flex flex-col items-center gap-3 relative z-10 bg-white/70 px-2 py-3 rounded-xl backdrop-blur-sm border border-white/50 w-full max-w-[80px]">
                      <span className="text-xs font-bold text-[#0B1F3A]/50">{node.time}</span>
                      <div className={`w-3.5 h-3.5 rounded-full ${node.color} ${node.active ? 'ring-4 ring-red-500/20 shadow-[0_0_12px_#ef4444]' : 'ring-4 ring-white shadow-sm'}`} />
                      <span className={`text-[10px] font-bold ${node.active ? 'text-[#0B1F3A]' : 'text-slate-400'}`}>{node.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 5. Travel Guidance Section */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="left" delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-4 p-6 sm:p-8 rounded-3xl bg-blue-50/50 border border-blue-100 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-[#1D4ED8]/10 flex items-center justify-center shrink-0">
                  <span className="text-[#1D4ED8] font-bold text-lg">i</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#0B1F3A]">Imbauan Perjalanan</h3>
                  <p className="text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
                    Jika perjalanan tidak mendesak, pertimbangkan berangkat setelah periode padat menurun. 
                    Tetap jaga jarak aman, hindari terburu-buru, dan ikuti rambu lalu lintas.
                  </p>
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 6. CTA Section */}
        <section className="relative z-10 pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-8">
            <ScrollRevealRow direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A]">
                Ingin melihat prediksi perjalanan?
              </h2>
            </ScrollRevealRow>
            
            <ScrollRevealRow direction="up" delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/congestion-prediction"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors shadow-md"
              >
                Prediksi Kemacetan
              </Link>
              <Link
                href="/departure-recommendation"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#0B1F3A] text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Rekomendasi Berangkat
              </Link>
            </ScrollRevealRow>
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
