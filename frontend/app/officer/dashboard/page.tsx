import Link from "next/link";
import { OfficerPageShell } from "@/components/layout/officer-page-shell";
import {
  InteractiveGlassCard,
  ScrollRevealRow,
  MotionSection,
} from "@/components/common";
import { mockDashboardSummary } from "@/data/mock-dashboard";

export default function OfficerDashboardPage() {
  return (
    <OfficerPageShell>
      <div className="max-w-6xl mx-auto space-y-12">
        
        {/* 1. Dashboard Hero / Summary Header */}
        <section className="relative flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <MotionSection direction="up" delay={0.1} className="space-y-3">
            <span className="inline-flex items-center gap-2.5 rounded-full border border-blue-200 bg-blue-50/50 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1D4ED8]">
              Officer Command Center
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
              Command Center Dashboard
            </h1>
            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-2xl">
              Pantau status sistem, kondisi lalu lintas, risiko pelanggaran, dan insight operasional dalam satu layar.
            </p>
          </MotionSection>

          <MotionSection direction="left" delay={0.2} className="shrink-0">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border shadow-sm backdrop-blur-md ${
              (mockDashboardSummary.system_status as string) === 'Waspada' 
                ? 'bg-amber-50 border-amber-200 text-amber-700' 
                : 'bg-teal-50 border-teal-200 text-teal-700'
            }`}>
              <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${
                (mockDashboardSummary.system_status as string) === 'Waspada' ? 'bg-amber-500 shadow-[0_0_8px_#f59e0b]' : 'bg-[#14B8A6] shadow-[0_0_8px_#14B8A6]'
              }`} />
              <span className="text-xs font-bold uppercase tracking-widest">
                Sistem {mockDashboardSummary.system_status}
              </span>
            </div>
          </MotionSection>
        </section>

        {/* 2. Primary Status Panel */}
        <section>
          <ScrollRevealRow direction="up" delay={0.1}>
            <InteractiveGlassCard intensity="strong" className="p-6 sm:p-8 rounded-[2rem] border-white shadow-md flex flex-col md:flex-row gap-8 items-center justify-between relative overflow-hidden">
              <div className="absolute top-0 right-1/4 w-64 h-64 bg-[#1D4ED8]/5 blur-[60px] rounded-full pointer-events-none" />
              
              <div className="grid grid-cols-1 sm:grid-cols-3 w-full gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 relative z-10">
                <div className="flex flex-col items-center text-center space-y-3 sm:px-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">System Status</p>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-lg border text-sm font-bold shadow-sm ${
                    (mockDashboardSummary.system_status as string) === 'Waspada' ? 'bg-amber-50 border-amber-200 text-amber-700' : 'bg-teal-50 border-teal-200 text-teal-700'
                  }`}>
                    {mockDashboardSummary.system_status}
                  </span>
                </div>
                
                <div className="flex flex-col items-center text-center space-y-3 pt-6 sm:pt-0 sm:px-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Traffic Condition</p>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-lg border text-sm font-bold shadow-sm ${
                    (mockDashboardSummary.traffic_condition as string) === 'Padat' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    {mockDashboardSummary.traffic_condition}
                  </span>
                </div>

                <div className="flex flex-col items-center text-center space-y-3 pt-6 sm:pt-0 sm:px-4">
                  <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Violation Risk</p>
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-lg border text-sm font-bold shadow-sm ${
                    (mockDashboardSummary.violation_risk as string) === 'Tinggi' ? 'bg-red-50 border-red-200 text-red-700' : 'bg-amber-50 border-amber-200 text-amber-700'
                  }`}>
                    {mockDashboardSummary.violation_risk}
                  </span>
                </div>
              </div>
            </InteractiveGlassCard>
          </ScrollRevealRow>
        </section>

        {/* 3. Metric Cards */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Total Deteksi Hari Ini", value: mockDashboardSummary.total_detections_today.toLocaleString('id-ID'), color: "text-[#1D4ED8]" },
            { label: "Total Pelanggaran", value: mockDashboardSummary.total_violations_today.toLocaleString('id-ID'), color: "text-red-500" },
            { label: "Kendaraan Terdeteksi", value: mockDashboardSummary.total_vehicles.toLocaleString('id-ID'), color: "text-[#14B8A6]" },
            { label: "Pelanggaran Dominan", value: mockDashboardSummary.dominant_violation, color: "text-amber-600", isText: true },
          ].map((metric, i) => (
            <ScrollRevealRow key={i} direction="up" delay={0.1 + (i * 0.05)} className="h-full">
              <InteractiveGlassCard intensity="medium" className="p-6 h-full rounded-[1.5rem] border-white shadow-sm flex flex-col justify-between">
                <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">{metric.label}</p>
                <p className={`${metric.isText ? 'text-lg leading-tight' : 'text-3xl'} font-extrabold ${metric.color} tracking-tight`}>
                  {metric.value}
                </p>
              </InteractiveGlassCard>
            </ScrollRevealRow>
          ))}
        </section>

        {/* 4. Forecasting & 5. Smart Insight */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Forecasting Snapshot */}
          <ScrollRevealRow direction="up" delay={0.1}>
            <InteractiveGlassCard intensity="medium" className="p-8 rounded-[2rem] border-white shadow-sm h-full flex flex-col">
              <h3 className="text-sm font-bold text-[#0B1F3A] mb-6 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#14B8A6]" />
                Snapshot Prediksi (Satu Jam Kedepan)
              </h3>
              
              <div className="flex-1 flex flex-col justify-center space-y-6">
                {[
                  { label: "Prediksi Volume Kendaraan", value: "Meningkat 15%", color: "bg-amber-500" },
                  { label: "Prediksi Pelanggaran", value: "Stabil", color: "bg-[#14B8A6]" },
                  { label: "Durasi Kemacetan", value: "+20 Menit", color: "bg-red-500" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between items-center bg-slate-50/50 p-4 rounded-xl border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${item.color}`} />
                      <span className="text-sm font-bold text-[#0B1F3A]">{item.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </InteractiveGlassCard>
          </ScrollRevealRow>

          {/* Smart Insight Panel */}
          <ScrollRevealRow direction="up" delay={0.15}>
            <InteractiveGlassCard intensity="strong" glow className="p-8 rounded-[2rem] border-white shadow-md h-full flex flex-col relative overflow-hidden">
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#1D4ED8]/5 blur-[40px] rounded-full pointer-events-none" />
              
              <h3 className="text-sm font-bold text-[#0B1F3A] mb-6 flex items-center gap-2 relative z-10">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8]" />
                Smart Insight
              </h3>
              
              <div className="flex-1 flex flex-col justify-center relative z-10">
                <div className="p-6 rounded-2xl bg-blue-50/50 border border-blue-100 shadow-sm backdrop-blur-md flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-[#1D4ED8] font-bold text-sm">!</span>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-2">Rekomendasi Operasional</p>
                    <p className="text-sm font-bold text-[#0B1F3A] leading-relaxed">
                      {mockDashboardSummary.smart_insight}
                    </p>
                  </div>
                </div>
              </div>
            </InteractiveGlassCard>
          </ScrollRevealRow>
        </section>

        {/* 6. Recent Activity & 7. Quick Actions */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Detections */}
          <div className="lg:col-span-2">
            <ScrollRevealRow direction="up" delay={0.1}>
              <InteractiveGlassCard intensity="medium" className="p-8 rounded-[2rem] border-white shadow-sm h-full">
                <h3 className="text-sm font-bold text-[#0B1F3A] mb-6">Deteksi Terkini</h3>
                <div className="space-y-3">
                  {[
                    { time: "14:32", type: "Tidak Pakai Helm", count: "1 Kendaraan", status: "Valid", color: "text-red-600 bg-red-50 border-red-100" },
                    { time: "14:28", type: "Pelanggaran Marka", count: "2 Kendaraan", status: "Review", color: "text-amber-600 bg-amber-50 border-amber-100" },
                    { time: "14:25", type: "Volume Tinggi", count: "145 Kendaraan", status: "Info", color: "text-blue-600 bg-blue-50 border-blue-100" },
                  ].map((det, i) => (
                    <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-white/60 border border-slate-100 shadow-sm">
                      <div className="flex items-center gap-4">
                        <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest min-w-[50px]">{det.time}</span>
                        <div>
                          <p className="text-sm font-bold text-[#0B1F3A]">{det.type}</p>
                          <p className="text-xs font-medium text-slate-500 mt-0.5">{det.count}</p>
                        </div>
                      </div>
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md border text-[10px] font-bold uppercase tracking-widest ${det.color} w-fit`}>
                        {det.status}
                      </span>
                    </div>
                  ))}
                </div>
              </InteractiveGlassCard>
            </ScrollRevealRow>
          </div>

          {/* Quick Actions */}
          <div className="lg:col-span-1">
            <ScrollRevealRow direction="up" delay={0.2} className="h-full">
              <div className="p-8 rounded-[2rem] bg-[#0B1F3A] text-white shadow-xl h-full flex flex-col relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#1D4ED8] blur-[40px] rounded-full pointer-events-none opacity-50" />
                
                <h3 className="text-sm font-bold text-white/80 mb-6 relative z-10">Tindakan Cepat</h3>
                <div className="flex-1 flex flex-col gap-3 relative z-10">
                  {[
                    { label: "AI Detection", href: "/officer/ai-detection" },
                    { label: "Forecasting", href: "/officer/forecasting" },
                    { label: "Smart Insight", href: "/officer/smart-insight" },
                    { label: "Buat Laporan", href: "/officer/report" },
                  ].map((action, i) => (
                    <Link
                      key={i}
                      href={action.href}
                      className="flex items-center justify-between p-4 rounded-xl bg-white/10 border border-white/10 hover:bg-white/20 transition-colors"
                    >
                      <span className="text-sm font-bold">{action.label}</span>
                      <span className="text-white/50">→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

      </div>
    </OfficerPageShell>
  );
}
