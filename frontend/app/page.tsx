import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import { GlassPanel, MotionSection } from "@/components/common";

/* ─── Metric widget (iOS-style) ──────────────────────────────────────── */
function MetricWidget({
  label,
  value,
  tone = "neutral",
}: {
  label: string;
  value: string;
  tone?: "neutral" | "warn" | "danger";
}) {
  const dot =
    tone === "danger"
      ? "bg-red-400"
      : tone === "warn"
        ? "bg-amber-400"
        : "bg-green-400";

  return (
    <div className="flex flex-col items-center gap-1.5 px-5 py-4 rounded-2xl bg-white/[0.07] border border-white/10">
      <div className="flex items-center gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
        <span className="text-[10px] font-semibold uppercase tracking-widest text-white/50">
          {label}
        </span>
      </div>
      <span className="text-xl font-bold tracking-tight text-white">{value}</span>
    </div>
  );
}

/* ─── Capability pill ────────────────────────────────────────────────── */
function CapPill({ label, sub }: { label: string; sub: string }) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-colors">
      <span className="text-sm font-semibold text-slate-800 tracking-tight">{label}</span>
      <span className="text-xs text-slate-400">{sub}</span>
    </div>
  );
}

/* ─── Landing Page ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <PublicPageShell>

      {/* ══════════════════════════════════════════════════
          HERO — centered, dark glass, dominant
      ══════════════════════════════════════════════════ */}
      <section className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-[#070E1B]">

        {/* Ambient glow layer */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 55% at 50% 60%, rgba(29,78,216,0.18) 0%, transparent 70%), " +
              "radial-gradient(ellipse 40% 30% at 30% 20%, rgba(6,182,212,0.10) 0%, transparent 60%)",
          }}
        />

        {/* Hairline grid overlay */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />

        {/* Content */}
        <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center text-center gap-8">

          {/* Eyebrow pill */}
          <MotionSection direction="up" delay={0} className="w-full flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-[#06B6D4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#06B6D4] animate-pulse" />
              Smart Traffic Intelligence
            </span>
          </MotionSection>

          {/* Main headline */}
          <MotionSection direction="up" delay={0.08} className="w-full space-y-4">
            <h1 className="text-6xl sm:text-7xl lg:text-8xl font-bold tracking-[-0.05em] text-white leading-[1.0]">
              RoadTierbers
            </h1>
            <p className="text-lg sm:text-xl text-white/60 font-light tracking-tight">
              Traffic command center untuk jalan yang lebih aman.
            </p>
          </MotionSection>

          {/* Short description */}
          <MotionSection direction="up" delay={0.14} className="w-full">
            <p className="max-w-sm mx-auto text-sm text-white/40 leading-relaxed">
              Pantau kondisi lalu lintas, prediksi kemacetan, dan dukung keputusan petugas dalam satu sistem terpadu.
            </p>
          </MotionSection>

          {/* CTAs */}
          <MotionSection direction="up" delay={0.2} className="w-full flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/traffic-overview"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-white text-[#0B1F3A] text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              Lihat Lalu Lintas
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full border border-white/20 bg-white/[0.06] text-white text-sm font-semibold hover:bg-white/10 transition-colors"
            >
              Masuk Command Center
            </Link>
          </MotionSection>

          {/* Metric widgets */}
          <MotionSection direction="up" delay={0.28} className="w-full">
            <GlassPanel
              intensity="strong"
              className="w-full max-w-sm mx-auto !bg-white/[0.05] !border-white/10 !backdrop-blur-xl !rounded-3xl px-6 py-6 space-y-4"
            >
              <p className="text-[10px] font-semibold uppercase tracking-widest text-white/30 text-center">
                Sample pemantauan · data simulasi prototype
              </p>
              <div className="grid grid-cols-3 gap-3">
                <MetricWidget label="Kondisi" value="Padat" tone="danger" />
                <MetricWidget label="Estimasi" value="32 mnt" tone="warn" />
                <MetricWidget label="Sistem" value="Waspada" tone="warn" />
              </div>
            </GlassPanel>
          </MotionSection>

        </div>

        {/* Bottom fade to next section */}
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: "linear-gradient(to bottom, transparent, #F5F7FA)",
          }}
        />
      </section>

      {/* ══════════════════════════════════════════════════
          CAPABILITY STRIP
      ══════════════════════════════════════════════════ */}
      <MotionSection
        direction="up"
        delay={0}
        className="mx-auto max-w-5xl px-4 sm:px-6 py-16"
      >
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <CapPill label="Traffic Overview" sub="Kondisi jalan terkini" />
          <CapPill label="Prediction" sub="Estimasi kemacetan" />
          <CapPill label="Detection" sub="Analisis visual AI" />
          <CapPill label="Insight" sub="Rekomendasi keputusan" />
        </div>
      </MotionSection>

      {/* ══════════════════════════════════════════════════
          PUBLIC vs OFFICER
      ══════════════════════════════════════════════════ */}
      <MotionSection
        direction="up"
        delay={0}
        className="mx-auto max-w-5xl px-4 sm:px-6 pb-20 space-y-4"
      >
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 text-center mb-6">
          Dua Area Layanan
        </p>
        <div className="grid sm:grid-cols-2 gap-4">
          {/* Public */}
          <Link href="/traffic-overview" className="group">
            <GlassPanel
              intensity="subtle"
              className="h-full p-7 space-y-3 border-slate-200 hover:border-slate-300 transition-colors group-hover:shadow-md"
            >
              <div className="w-8 h-8 rounded-xl bg-[#EFF6FF] flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-[#1D4ED8]" />
              </div>
              <p className="text-base font-semibold tracking-tight text-slate-800">
                Untuk Publik
              </p>
              <p className="text-sm text-slate-500">
                Informasi lalu lintas yang mudah dipahami.
              </p>
              <p className="text-xs font-medium text-[#1D4ED8] group-hover:underline underline-offset-4">
                Lihat informasi lalu lintas
              </p>
            </GlassPanel>
          </Link>

          {/* Officer */}
          <Link href="/login" className="group">
            <GlassPanel
              intensity="subtle"
              className="h-full p-7 space-y-3 !bg-[#0B1F3A] !border-white/10 hover:!border-white/20 transition-colors group-hover:shadow-lg"
            >
              <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center">
                <span className="w-3 h-3 rounded-full bg-[#06B6D4]" />
              </div>
              <p className="text-base font-semibold tracking-tight text-white">
                Untuk Petugas
              </p>
              <p className="text-sm text-white/50">
                Command center untuk monitoring dan keputusan.
              </p>
              <p className="text-xs font-medium text-[#06B6D4] group-hover:underline underline-offset-4">
                Masuk Command Center
              </p>
            </GlassPanel>
          </Link>
        </div>
      </MotionSection>

      {/* ══════════════════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════════════════ */}
      <MotionSection
        direction="up"
        delay={0}
        className="border-t border-slate-200 bg-white"
      >
        <div className="mx-auto max-w-2xl px-4 sm:px-6 py-20 text-center space-y-5">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#0B1F3A]">
            Satu sistem. Dua pengalaman.
          </h2>
          <p className="text-sm text-slate-400">
            Ringkas untuk publik, mendalam untuk petugas.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
            <Link
              href="/traffic-overview"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors"
            >
              Cek Lalu Lintas
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-10 px-6 rounded-full border border-slate-200 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Command Center
            </Link>
          </div>
        </div>
      </MotionSection>

    </PublicPageShell>
  );
}
