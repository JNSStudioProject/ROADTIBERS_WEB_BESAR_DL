import Link from "next/link";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import {
  GlassPanel,
  MotionSection,
  FeatureCard,
} from "@/components/common";
import { StatusBadge } from "@/components/common/status-badge";

/* ─── Inline hero command preview panel ─────────────────────────────── */
function HeroCommandPreview() {
  return (
    <GlassPanel intensity="medium" className="w-full max-w-md mx-auto p-6 space-y-5">
      {/* Header bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs font-semibold text-slate-500 tracking-wide">
            RoadTierbers — Pemantauan Aktif
          </span>
        </div>
        <StatusBadge status="Waspada" />
      </div>

      {/* Divider */}
      <div className="border-t border-slate-200/60" />

      {/* Metric rows */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Kondisi Lalu Lintas
          </p>
          <p className="text-2xl font-bold tracking-tight text-slate-900">Padat</p>
          <StatusBadge status="Padat" />
        </div>
        <div className="space-y-1">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
            Estimasi Kemacetan
          </p>
          <p className="text-2xl font-bold tracking-tight text-slate-900">
            32 <span className="text-sm font-normal text-slate-400">menit</span>
          </p>
          <p className="text-xs text-slate-400 leading-snug">Meningkat dari sebelumnya</p>
        </div>
      </div>

      {/* Insight strip */}
      <div className="rounded-xl bg-[#0B1F3A]/5 border border-[#0B1F3A]/10 px-4 py-3 space-y-1">
        <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          Smart Insight
        </p>
        <p className="text-xs text-slate-700 leading-relaxed">
          Volume kendaraan meningkat di Simpang SKA. Disarankan memantau jalur alternatif.
        </p>
      </div>

      {/* Footer bar */}
      <div className="flex items-center gap-3 pt-1">
        <div className="flex gap-1.5">
          {["bg-green-400", "bg-amber-400", "bg-red-400"].map((c) => (
            <span key={c} className={`w-2 h-2 rounded-full ${c}`} />
          ))}
        </div>
        <p className="text-[10px] text-slate-300">
          Contoh area pemantauan · data simulasi prototype
        </p>
      </div>
    </GlassPanel>
  );
}

/* ─── Inline "divider" visual between sections ────────────────────────── */
function SectionDivider() {
  return (
    <div className="flex items-center justify-center py-2">
      <div className="w-px h-12 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
    </div>
  );
}

/* ─── Officer capability row item ────────────────────────────────────── */
interface OfficerCapItemProps {
  label: string;
  description: string;
}
function OfficerCapItem({ label, description }: OfficerCapItemProps) {
  return (
    <div className="flex items-start gap-4 py-4 border-b border-slate-100 last:border-0">
      <div className="w-1.5 h-1.5 rounded-full bg-[#1D4ED8] mt-2 shrink-0" />
      <div>
        <p className="text-sm font-semibold text-slate-800">{label}</p>
        <p className="text-sm text-slate-500 leading-relaxed mt-0.5">{description}</p>
      </div>
    </div>
  );
}

/* ─── Deep Learning capability pill ─────────────────────────────────── */
function MLPill({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-600 shadow-sm">
      {label}
    </span>
  );
}

/* ─── Landing Page ───────────────────────────────────────────────────── */
export default function Home() {
  return (
    <PublicPageShell>

      {/* ══════════════════════════════════════════════════
          1 · HERO SECTION
      ══════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#F5F7FA] rt-soft-grid">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 pt-20 pb-8 lg:pt-28 lg:pb-0">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

            {/* Left copy */}
            <MotionSection direction="up" delay={0} className="space-y-7">
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#1D4ED8]">
                  Smart Traffic Intelligence Platform
                </p>
                <h1
                  className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.04em] text-[#0B1F3A] leading-[1.05]"
                >
                  RoadTierbers
                </h1>
                <p className="text-lg sm:text-xl text-slate-500 font-normal leading-snug max-w-md">
                  Smart Traffic Command Center for Safer and Smarter Roads
                </p>
              </div>

              <p className="text-base text-slate-600 leading-relaxed max-w-md">
                Sistem terpadu berbasis Deep Learning untuk membantu memahami kondisi lalu lintas,
                memprediksi kemacetan, mendeteksi pelanggaran, dan memberikan insight bagi petugas.
              </p>

              <div className="flex flex-col sm:flex-row gap-3">
                <Link
                  href="/traffic-overview"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold tracking-tight hover:bg-[#142d52] transition-colors"
                >
                  Lihat Kondisi Lalu Lintas
                </Link>
                <Link
                  href="/login"
                  className="inline-flex items-center justify-center h-11 px-6 rounded-full border border-slate-300 bg-white text-slate-700 text-sm font-semibold tracking-tight hover:bg-slate-50 transition-colors"
                >
                  Masuk Command Center
                </Link>
              </div>
            </MotionSection>

            {/* Right: hero command preview */}
            <MotionSection direction="up" delay={0.15} className="lg:flex lg:justify-end">
              <div className="w-full lg:w-auto">
                <HeroCommandPreview />
              </div>
            </MotionSection>
          </div>

          {/* Overlap bridge: bottom of hero */}
          <div className="mt-16 h-16" />
        </div>
      </section>

      {/* ══════════════════════════════════════════════════
          2 · PRODUCT POSITIONING
      ══════════════════════════════════════════════════ */}
      <MotionSection
        direction="up"
        delay={0}
        className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 -mt-8"
      >
        <GlassPanel intensity="medium" className="rt-section-overlap px-8 py-10 sm:px-12 sm:py-12">
          <div className="grid sm:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#1D4ED8]">
                Dua Area Layanan
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#0B1F3A]">
                Satu sistem,<br />dua pengalaman.
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                RoadTierbers dirancang untuk dua kelompok pengguna — masyarakat umum yang ingin
                informasi lalu lintas sederhana, dan petugas yang membutuhkan sistem komando
                pemantauan penuh.
              </p>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-100 bg-white/70 p-5 space-y-1.5">
                <p className="text-sm font-semibold text-slate-800">Area Publik</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Informasi lalu lintas, prediksi kemacetan, rekomendasi keberangkatan, dan
                  edukasi rambu — tanpa data sensitif.
                </p>
              </div>
              <div className="rounded-2xl border border-[#0B1F3A]/10 bg-[#0B1F3A]/[0.03] p-5 space-y-1.5">
                <p className="text-sm font-semibold text-slate-800">Area Petugas</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  Command Center dengan deteksi AI, monitoring pelanggaran, forecasting,
                  smart insight, dan AI assistant untuk pendukung keputusan.
                </p>
              </div>
            </div>
          </div>
        </GlassPanel>
      </MotionSection>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════
          3 · PUBLIC AREA PREVIEW
      ══════════════════════════════════════════════════ */}
      <MotionSection
        direction="up"
        delay={0}
        className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-20 space-y-10"
      >
        <div className="space-y-2 max-w-xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Untuk Masyarakat
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#0B1F3A]">
            Informasi lalu lintas yang mudah dipahami.
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            Empat fitur publik dirancang agar siapa pun bisa memahami kondisi jalan
            tanpa perlu keahlian teknis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <MotionSection delay={0.05} direction="up">
            <FeatureCard
              eyebrow="Kondisi Jalan"
              title="Ringkasan Lalu Lintas"
              description="Status lalu lintas terkini — lancar, sedang, atau padat — disajikan secara ringkas dan jelas."
              href="/traffic-overview"
            />
          </MotionSection>
          <MotionSection delay={0.1} direction="up">
            <FeatureCard
              eyebrow="AI Prediction"
              title="Prediksi Kemacetan"
              description="Estimasi durasi kemacetan berdasarkan data pemantauan dan analisis berbasis AI."
              href="/congestion-prediction"
            />
          </MotionSection>
          <MotionSection delay={0.15} direction="up">
            <FeatureCard
              eyebrow="Saran Perjalanan"
              title="Rekomendasi Keberangkatan"
              description="Waktu terbaik untuk berangkat agar perjalanan Anda lebih nyaman dan efisien."
              href="/departure-recommendation"
            />
          </MotionSection>
          <MotionSection delay={0.2} direction="up">
            <FeatureCard
              eyebrow="Edukasi"
              title="Edukasi Rambu Lalu Lintas"
              description="Kenali dan pahami arti berbagai rambu lalu lintas di Indonesia secara interaktif."
              href="/traffic-sign-education"
            />
          </MotionSection>
        </div>
      </MotionSection>

      <SectionDivider />

      {/* ══════════════════════════════════════════════════
          4 · OFFICER COMMAND CENTER PREVIEW
      ══════════════════════════════════════════════════ */}
      <MotionSection
        direction="up"
        delay={0}
        className="bg-[#0B1F3A] py-20 sm:py-24"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left copy */}
            <div className="space-y-4">
              <p className="text-xs font-semibold uppercase tracking-widest text-[#06B6D4]">
                Officer Command Center
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-white">
                Sistem komando untuk pengambilan keputusan yang lebih cepat.
              </h2>
              <p className="text-sm text-slate-400 leading-relaxed max-w-md">
                Area petugas menyatukan deteksi AI, monitoring pelanggaran, forecasting,
                dan smart insight dalam satu antarmuka yang bersih dan operasional.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center justify-center h-10 px-5 rounded-full bg-white text-[#0B1F3A] text-sm font-semibold hover:bg-slate-100 transition-colors mt-2"
              >
                Masuk Command Center
              </Link>
            </div>

            {/* Right: capability list */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-6 py-2">
              <OfficerCapItem
                label="Command Center Dashboard"
                description="Ringkasan metrik pemantauan, status sistem, dan pelanggaran dalam satu tampilan."
              />
              <OfficerCapItem
                label="AI Detection Center"
                description="Jalankan deteksi berbasis model AI — helm, kendaraan, plat, dan rambu."
              />
              <OfficerCapItem
                label="Forecasting Prediction Center"
                description="Prediksi volume kendaraan, jumlah pelanggaran, dan durasi kemacetan ke depan."
              />
              <OfficerCapItem
                label="Smart Insight"
                description="Narasi keputusan otomatis berdasarkan data pemantauan terkini."
              />
              <OfficerCapItem
                label="Report & Export"
                description="Buat laporan rekapitulasi dan ekspor data pelanggaran dengan mudah."
              />
              <OfficerCapItem
                label="Officer AI Assistant"
                description="Asisten AI untuk membantu analisis, membaca data, dan menyusun laporan."
              />
            </div>

          </div>
        </div>
      </MotionSection>

      {/* ══════════════════════════════════════════════════
          5 · DEEP LEARNING INTEGRATION
      ══════════════════════════════════════════════════ */}
      <MotionSection
        direction="up"
        delay={0}
        className="mx-auto max-w-7xl px-4 sm:px-6 py-20 sm:py-24 space-y-10"
      >
        <div className="max-w-2xl space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Teknologi
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-[-0.03em] text-[#0B1F3A]">
            Ditenagai Deep Learning,<br />disajikan dengan jelas.
          </h2>
          <p className="text-sm text-slate-500 leading-relaxed">
            RoadTierbers mengintegrasikan beberapa kemampuan Deep Learning ke dalam satu antarmuka
            yang terasa alami — dari deteksi visual hingga forecasting berbasis data historis.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-6">
          <GlassPanel intensity="subtle" className="p-6 space-y-3">
            <p className="text-sm font-semibold text-slate-800 tracking-tight">Deteksi Visual</p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Analisis gambar dan video secara otomatis untuk mendeteksi pelanggaran, jenis kendaraan,
              plat nomor, dan rambu lalu lintas.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Helm & Pembonceng", "Jenis Kendaraan", "Plat Nomor", "Rambu Jalan"].map((l) => (
                <MLPill key={l} label={l} />
              ))}
            </div>
          </GlassPanel>

          <GlassPanel intensity="subtle" className="p-6 space-y-3">
            <p className="text-sm font-semibold text-slate-800 tracking-tight">Forecasting & Insight</p>
            <p className="text-sm text-slate-500 leading-relaxed">
              Prediksi kondisi ke depan berbasis pola historis dan data real-time, disajikan sebagai
              narasi keputusan yang mudah dipahami.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {["Volume Kendaraan", "Durasi Kemacetan", "Risiko Pelanggaran", "Smart Insight"].map((l) => (
                <MLPill key={l} label={l} />
              ))}
            </div>
          </GlassPanel>
        </div>

        <p className="text-xs text-slate-400 max-w-xl leading-relaxed">
          RoadTierbers merupakan prototype akademik berbasis Deep Learning untuk kebutuhan
          pembelajaran dan demonstrasi. Sistem ini belum ditujukan sebagai alat keputusan resmi
          tanpa validasi lanjutan.
        </p>
      </MotionSection>

      {/* ══════════════════════════════════════════════════
          6 · FINAL CTA
      ══════════════════════════════════════════════════ */}
      <MotionSection direction="up" delay={0} className="bg-[#F0F4FA] border-t border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-20 sm:py-24 text-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold tracking-[-0.04em] text-[#0B1F3A] leading-tight">
            Mulai pantau kondisi jalan.<br />Mulai dari sekarang.
          </h2>
          <p className="text-sm sm:text-base text-slate-500 leading-relaxed max-w-lg mx-auto">
            Akses informasi lalu lintas publik secara gratis, atau masuk ke Command Center
            untuk pemantauan petugas yang lebih dalam.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/traffic-overview"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-[#0B1F3A] text-white text-sm font-semibold hover:bg-[#142d52] transition-colors"
            >
              Lihat Kondisi Lalu Lintas
            </Link>
            <Link
              href="/login"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full border border-slate-300 bg-white text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
            >
              Masuk Command Center
            </Link>
          </div>
        </div>
      </MotionSection>

    </PublicPageShell>
  );
}
