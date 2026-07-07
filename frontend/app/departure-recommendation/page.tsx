import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import {
  InteractiveGlassCard,
  ScrollRevealRow,
  MouseSpotlight,
  MotionSection,
} from "@/components/common";

export default function DepartureRecommendationPage() {
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
                Rekomendasi Publik
              </span>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
                Pilih waktu berangkat<br />dengan lebih tenang.
              </h1>
              <p className="text-base sm:text-lg text-[#0B1F3A]/70 font-medium leading-relaxed max-w-xl mx-auto">
                Gunakan estimasi kemacetan untuk menentukan waktu perjalanan yang lebih nyaman dan aman.
              </p>
            </MotionSection>
            
            <MotionSection direction="up" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-white/80 shadow-sm backdrop-blur-md mt-4">
                <span className="w-2 h-2 rounded-full bg-[#1D4ED8] animate-pulse shadow-[0_0_8px_#1D4ED8]" />
                <span className="text-xs font-bold text-[#0B1F3A]/70">Berdasarkan sample pemantauan</span>
              </div>
            </MotionSection>
          </div>
        </section>

        {/* 2. Main Recommendation Panel */}
        <section className="relative z-20 pb-16">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <MotionSection direction="up" delay={0.3}>
              <InteractiveGlassCard intensity="strong" glow className="w-full p-8 sm:p-12 flex flex-col md:flex-row items-center gap-10 justify-between border-white rounded-[2.5rem] shadow-lg relative overflow-hidden">
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#14B8A6]/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="flex-1 space-y-8 relative z-10 w-full">
                  <div>
                    <p className="text-sm font-bold text-[#0B1F3A]/60 uppercase tracking-widest mb-3">Rekomendasi Utama</p>
                    <h2 className="text-4xl sm:text-5xl font-extrabold text-[#1D4ED8] tracking-tight">Tunda 20–30 menit</h2>
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-blue-50/50 border border-blue-100 shadow-sm backdrop-blur-md flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-[#1D4ED8] font-bold text-sm">i</span>
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-1">Alasan Singkat</p>
                      <p className="text-sm font-medium text-slate-600 leading-relaxed">
                        Kepadatan masih meningkat, sehingga perjalanan berpotensi memakan waktu lebih lama.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 relative z-10 w-full md:w-auto min-w-[240px]">
                  <div className="p-5 rounded-2xl bg-white/80 border border-white/80 shadow-sm backdrop-blur-md flex justify-between items-center">
                    <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest">Status Perjalanan</p>
                    <span className="text-sm font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-100">Padat</span>
                  </div>
                  <div className="p-5 rounded-2xl bg-white/80 border border-white/80 shadow-sm backdrop-blur-md flex justify-between items-center">
                    <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest">Estimasi Kemacetan</p>
                    <span className="text-sm font-extrabold text-[#0B1F3A]">32 menit</span>
                  </div>
                </div>
              </InteractiveGlassCard>
            </MotionSection>
          </div>
        </section>

        {/* 3. Decision Cards */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { 
                  title: "Berangkat sekarang", 
                  status: "Tidak disarankan", 
                  helper: "Perjalanan berpotensi lebih lambat.", 
                  delay: 0.1, 
                  statusColor: "text-red-500", 
                  bgStatus: "bg-red-50",
                  borderColor: "border-red-100"
                },
                { 
                  title: "Tunggu sebentar", 
                  status: "Disarankan", 
                  helper: "Tunda 20–30 menit jika tidak mendesak.", 
                  delay: 0.15, 
                  statusColor: "text-[#1D4ED8]", 
                  bgStatus: "bg-blue-50",
                  borderColor: "border-blue-100"
                },
                { 
                  title: "Tetap berkendara aman", 
                  status: "Prioritas", 
                  helper: "Jaga jarak dan hindari terburu-buru.", 
                  delay: 0.2, 
                  statusColor: "text-[#14B8A6]", 
                  bgStatus: "bg-teal-50",
                  borderColor: "border-teal-100"
                },
              ].map((item, i) => (
                <ScrollRevealRow key={i} direction="up" delay={item.delay} className="h-full">
                  <InteractiveGlassCard intensity="medium" className="p-6 h-full border-white shadow-sm flex flex-col">
                    <div className="flex-1">
                      <p className="text-[11px] font-bold text-[#0B1F3A]/50 uppercase tracking-widest mb-3">{item.title}</p>
                      <div className={`inline-flex items-center px-2.5 py-1 rounded-md border ${item.bgStatus} ${item.borderColor} mb-4`}>
                        <span className={`text-[11px] font-bold uppercase tracking-widest ${item.statusColor}`}>{item.status}</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed mt-2">{item.helper}</p>
                  </InteractiveGlassCard>
                </ScrollRevealRow>
              ))}
            </div>
          </div>
        </section>

        {/* 4. Simple Time Option Flow */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0.1}>
              <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-8 shadow-sm">
                <h3 className="text-sm font-bold text-[#0B1F3A] mb-8 text-center sm:text-left">Pola Waktu Kedepan (Simulasi)</h3>
                
                <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-6 relative">
                  {/* Connecting Line (Desktop) */}
                  <div className="hidden sm:block absolute top-1/2 left-6 right-6 h-[2px] bg-slate-100 rounded-full -translate-y-1/2 z-0" />
                  
                  {/* Connecting Line (Mobile) */}
                  <div className="sm:hidden absolute top-6 bottom-6 left-[22px] w-[2px] bg-slate-100 rounded-full z-0" />
                  
                  {[
                    { time: "Sekarang", label: "Padat", color: "bg-red-500", ring: "ring-red-500/20" },
                    { time: "+15 menit", label: "Masih padat", color: "bg-red-400", ring: "ring-red-400/20" },
                    { time: "+30 menit", label: "Mulai menurun", color: "bg-amber-400", ring: "ring-amber-400/20" },
                    { time: "+45 menit", label: "Lebih stabil", color: "bg-[#14B8A6]", ring: "ring-teal-500/20" },
                  ].map((node, i) => (
                    <div key={i} className="flex flex-row sm:flex-col items-center gap-4 sm:gap-3 relative z-10 bg-white/70 sm:bg-white/60 p-3 sm:px-4 sm:py-5 rounded-xl sm:rounded-2xl backdrop-blur-sm border border-white/50 w-full sm:max-w-[140px] shadow-sm sm:shadow-none hover:shadow-md transition-shadow">
                      <div className={`w-3.5 h-3.5 rounded-full ${node.color} ring-4 ${node.ring} shadow-sm shrink-0`} />
                      <div className="flex flex-col sm:items-center w-full">
                        <span className="text-xs font-bold text-[#0B1F3A]/60 sm:mb-1">{node.time}</span>
                        <span className="text-sm sm:text-[11px] font-bold text-[#0B1F3A] sm:uppercase sm:tracking-widest">{node.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 5. Safety Guidance Section */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="left" delay={0.1}>
              <div className="flex flex-col sm:flex-row gap-5 p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-slate-200 backdrop-blur-sm">
                <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                  <span className="text-slate-600 font-bold text-lg">!</span>
                </div>
                <div className="space-y-3">
                  <h3 className="text-base font-bold text-[#0B1F3A]">Imbauan Keselamatan</h3>
                  <div className="space-y-2 text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
                    <p>Jika tetap harus berangkat, siapkan waktu tambahan dan hindari mengambil keputusan mendadak.</p>
                    <p>Tetap patuhi rambu, jaga jarak aman, dan perhatikan kondisi sekitar.</p>
                  </div>
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
                Ingin memahami kondisi jalan lebih lengkap?
              </h2>
            </ScrollRevealRow>
            
            <ScrollRevealRow direction="up" delay={0.2} className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/traffic-overview"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors shadow-md"
              >
                Ringkasan Lalu Lintas
              </Link>
              <Link
                href="/congestion-prediction"
                className="inline-flex items-center justify-center h-12 px-6 rounded-full border border-slate-200 bg-white/80 backdrop-blur-md text-[#0B1F3A] text-sm font-semibold hover:bg-white transition-colors shadow-sm"
              >
                Prediksi Kemacetan
              </Link>
            </ScrollRevealRow>
          </div>
        </section>
      </div>
    </PublicPageShell>
  );
}
