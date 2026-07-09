"use client";

import Link from "next/link";
import { useState, useRef } from "react";
import { PublicPageShell } from "@/components/layout/public-page-shell";
import {
  InteractiveGlassCard,
  ScrollRevealRow,
  MouseSpotlight,
  MotionSection,
} from "@/components/common";

// Dictionary mapping model class ID to sign info
const SIGN_INFO: Record<string, { name: string; kategori: string; arti: string; tindakan: string; pentingnya: string }> = {
  "13": {
    name: "Peringatan Tikungan ke Kanan",
    kategori: "Peringatan",
    arti: "Menandakan adanya tikungan tajam ke arah kanan di depan.",
    tindakan: "Kurangi kecepatan kendaraan Anda dan bersiap untuk berbelok ke kanan dengan aman.",
    pentingnya: "Mencegah kecelakaan akibat kendaraan keluar jalur karena kecepatan tinggi di tikungan."
  },
  // TODO: Tambahkan mapping kelas lainnya di sini (0-20)
};

const DEFAULT_INFO = {
  name: "Rambu Terdeteksi",
  kategori: "Umum",
  arti: "Rambu ini memberi instruksi atau informasi tertentu di area ini.",
  tindakan: "Perhatikan dan ikuti arahan rambu dengan hati-hati.",
  pentingnya: "Rambu membantu menjaga alur jalan tetap aman dan teratur."
};

export default function TrafficSignEducationPage() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [detectionResult, setDetectionResult] = useState<any | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
      setDetectionResult(null);
      setErrorMessage(null);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    setIsLoading(true);
    setErrorMessage(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";
      const response = await fetch(`${apiUrl}/detection/analyze-all`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const res = await response.json();
      
      if (res.status === "success" || res.status === "error") {
         const edukasiData = res.data?.detections?.edukasi;
         if (edukasiData && edukasiData.status === "success" && edukasiData.data && edukasiData.data.length > 0) {
           setDetectionResult(edukasiData.data[0]); // ambil deteksi pertama
         } else {
           setErrorMessage("Rambu tidak terdeteksi dari gambar ini.");
           setDetectionResult(null);
         }
      } else {
         setErrorMessage("Gagal memproses gambar.");
      }
    } catch (error) {
      console.error("Error analyzing image:", error);
      setErrorMessage("Terjadi kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Get info based on detection result or use default
  const signId = detectionResult ? String(detectionResult.name) : null;
  const currentInfo = signId && SIGN_INFO[signId] ? SIGN_INFO[signId] : (signId ? { ...DEFAULT_INFO, name: `Rambu ID: ${signId}` } : DEFAULT_INFO);

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
                Edukasi Publik
              </span>
            </MotionSection>

            <MotionSection direction="up" delay={0.15} className="space-y-4 max-w-2xl">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.1]">
                Kenali rambu, pahami<br />arah perjalanan.
              </h1>
              <p className="text-base sm:text-lg text-[#0B1F3A]/70 font-medium leading-relaxed max-w-xl mx-auto">
                Pelajari arti rambu lalu lintas melalui tampilan edukatif yang sederhana dan mudah dipahami.
              </p>
            </MotionSection>
            
            <MotionSection direction="up" delay={0.2}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 border border-white/80 shadow-sm backdrop-blur-md mt-4">
                <span className="w-2 h-2 rounded-full bg-[#06B6D4] animate-pulse shadow-[0_0_8px_#06B6D4]" />
                <span className="text-xs font-bold text-[#0B1F3A]/70">Deteksi Rambu Cerdas</span>
              </div>
            </MotionSection>
          </div>
        </section>

        {/* 2. Main Traffic Sign Learning Panel & 3. Sample Interaction Area */}
        <section className="relative z-20 pb-16">
          <div className="mx-auto max-w-5xl px-4 sm:px-6">
            <MotionSection direction="up" delay={0.3}>
              <div className="flex flex-col lg:flex-row gap-5 items-stretch">
                
                {/* Sample Interaction Area (Upload Prototype) */}
                <InteractiveGlassCard intensity="medium" className="p-8 rounded-[2.5rem] border-white shadow-sm flex flex-col justify-between w-full lg:w-1/3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-40 h-40 bg-[#1D4ED8]/5 blur-[60px] rounded-full pointer-events-none" />
                  <div className="relative z-10 space-y-6 h-full flex flex-col">
                    <div>
                      <p className="text-xs font-bold text-[#0B1F3A]/60 uppercase tracking-widest mb-1">Unggah Gambar</p>
                      <h3 className="text-lg font-bold text-[#0B1F3A]">Pilih gambar rambu</h3>
                    </div>
                    
                    <input 
                      type="file" 
                      accept="image/*" 
                      ref={fileInputRef} 
                      onChange={handleFileChange} 
                      className="hidden" 
                    />

                    <div 
                      onClick={triggerFileInput}
                      className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-2xl bg-white/40 mb-6 group hover:border-[#1D4ED8]/30 transition-colors cursor-pointer relative overflow-hidden"
                    >
                      {previewUrl ? (
                        <img src={previewUrl} alt="Preview" className="w-full h-full object-cover rounded-2xl absolute inset-0" />
                      ) : (
                        <div className="text-center space-y-2">
                          <div className="w-10 h-10 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400 group-hover:text-[#1D4ED8] transition-colors">
                            <span className="font-bold text-xl">+</span>
                          </div>
                          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Klik untuk upload</p>
                        </div>
                      )}
                    </div>
                    
                    <button 
                      type="button" 
                      onClick={handleUpload}
                      disabled={!file || isLoading}
                      className={`w-full inline-flex items-center justify-center h-12 px-6 rounded-xl bg-[#0B1F3A] text-white text-sm font-semibold transition-colors shadow-md ${!file || isLoading ? "opacity-50 cursor-not-allowed" : "hover:bg-[#142d52]"}`}
                    >
                      {isLoading ? "Memproses..." : "Deteksi Rambu"}
                    </button>
                  </div>
                </InteractiveGlassCard>

                {/* Main Traffic Sign Learning Panel */}
                <InteractiveGlassCard intensity="strong" glow className="p-8 sm:p-12 rounded-[2.5rem] border-white shadow-lg flex-1 relative overflow-hidden flex flex-col sm:flex-row items-center gap-10 min-h-[300px]">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[#14B8A6]/5 blur-[80px] rounded-full pointer-events-none" />
                  
                  {detectionResult ? (
                    <>
                      {/* Detected Sign Info */}
                      <div className="relative z-10 shrink-0 flex items-center justify-center w-36 h-36 sm:w-48 sm:h-48 rounded-full border-[6px] border-[#0B1F3A]/10 bg-slate-50 shadow-inner overflow-hidden shadow-sm">
                        <img 
                          src={previewUrl!} 
                          alt="Cropped/Detected" 
                          className="w-full h-full object-cover" 
                        />
                      </div>

                      <div className="relative z-10 flex-1 space-y-6">
                        <div>
                          <div className="inline-flex items-center px-2.5 py-1 rounded-md border border-green-100 bg-green-50 mb-3">
                            <span className="text-[11px] font-bold text-green-600 uppercase tracking-widest">Rambu Terdeteksi</span>
                          </div>
                          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight mb-2">
                            {currentInfo.name}
                          </h2>
                          <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-sm">
                            Tingkat keyakinan: {(detectionResult.confidence * 100).toFixed(1)}%
                          </p>
                        </div>

                        <div className="p-4 sm:p-5 rounded-2xl bg-white/60 border border-white/80 shadow-sm backdrop-blur-md flex items-start gap-3">
                          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center shrink-0 mt-0.5">
                            <span className="text-[#1D4ED8] font-bold text-xs">i</span>
                          </div>
                          <p className="text-sm font-bold text-[#0B1F3A]/80 leading-relaxed">
                            Patuhi rambu ini untuk keamanan dan kenyamanan berkendara Anda.
                          </p>
                        </div>
                      </div>
                    </>
                  ) : errorMessage ? (
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-4">
                      <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center">
                        <span className="text-red-500 text-2xl">!</span>
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-[#0B1F3A] mb-1">Pendeteksian Gagal</h3>
                        <p className="text-slate-500 text-sm max-w-sm mx-auto">{errorMessage}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center space-y-4 opacity-50">
                      <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center">
                        <span className="text-slate-400 text-xl">?</span>
                      </div>
                      <p className="text-slate-500 font-medium">Unggah gambar rambu di panel samping untuk melihat hasil deteksi.</p>
                    </div>
                  )}
                </InteractiveGlassCard>
                
              </div>
            </MotionSection>
          </div>
        </section>

        {/* 4. Education Cards */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {[
                { 
                  title: "Apa artinya?", 
                  helper: currentInfo.arti, 
                  delay: 0.1, 
                  iconColor: "text-[#1D4ED8]", 
                  iconBg: "bg-blue-50" 
                },
                { 
                  title: "Apa yang harus dilakukan?", 
                  helper: currentInfo.tindakan, 
                  delay: 0.15, 
                  iconColor: "text-amber-500", 
                  iconBg: "bg-amber-50" 
                },
                { 
                  title: "Kenapa penting?", 
                  helper: currentInfo.pentingnya, 
                  delay: 0.2, 
                  iconColor: "text-[#14B8A6]", 
                  iconBg: "bg-teal-50" 
                },
              ].map((item, i) => (
                <ScrollRevealRow key={i} direction="up" delay={item.delay} className="h-full">
                  <InteractiveGlassCard intensity="medium" className="p-6 h-full border-white shadow-sm transition-all duration-500">
                    <div className={`w-8 h-8 rounded-full ${item.iconBg} flex items-center justify-center mb-4`}>
                      <span className={`text-sm font-bold ${item.iconColor}`}>?</span>
                    </div>
                    <p className="text-sm font-bold text-[#0B1F3A] tracking-tight mb-2">{item.title}</p>
                    <p className="text-sm font-medium text-slate-500 leading-relaxed">{item.helper}</p>
                  </InteractiveGlassCard>
                </ScrollRevealRow>
              ))}
            </div>
          </div>
        </section>

        {/* 5. Traffic Sign Category Strip */}
        <section className="relative z-10 pb-20">
          <div className="mx-auto max-w-4xl px-4 sm:px-6">
            <ScrollRevealRow direction="up" delay={0.1}>
              <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] border border-white/80 p-8 shadow-sm">
                <h3 className="text-sm font-bold text-[#0B1F3A] mb-6 text-center sm:text-left">Kategori Umum</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { label: "Larangan", color: "bg-red-500", ring: "ring-red-100", active: currentInfo.kategori.toLowerCase() === "larangan" },
                    { label: "Peringatan", color: "bg-amber-400", ring: "ring-amber-100", active: currentInfo.kategori.toLowerCase() === "peringatan" },
                    { label: "Perintah", color: "bg-blue-600", ring: "ring-blue-100", active: currentInfo.kategori.toLowerCase() === "perintah" },
                    { label: "Petunjuk", color: "bg-green-500", ring: "ring-green-100", active: currentInfo.kategori.toLowerCase() === "petunjuk" },
                  ].map((cat, i) => (
                    <div key={i} className={`flex items-center gap-3 p-3 rounded-xl border transition-all duration-500 ${cat.active ? "bg-white shadow-md border-slate-200 scale-105" : "bg-white/50 border-white opacity-60 grayscale-[50%]"}`}>
                      <span className={`w-3 h-3 rounded-full ${cat.color} ${cat.active ? `ring-4 ${cat.ring}` : ''}`} />
                      <span className={`text-xs font-bold uppercase tracking-widest ${cat.active ? "text-[#0B1F3A]" : "text-slate-500"}`}>{cat.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 6. Safety Guidance Section */}
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
                    <p>Rambu lalu lintas membantu pengguna jalan memahami batasan, arah, dan potensi risiko di sekitar.</p>
                    <p>Tetap fokus, kurangi kecepatan saat ragu, dan ikuti rambu yang terlihat.</p>
                  </div>
                </div>
              </div>
            </ScrollRevealRow>
          </div>
        </section>

        {/* 7. CTA Section */}
        <section className="relative z-10 pb-12">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 text-center space-y-8">
            <ScrollRevealRow direction="up" delay={0.1}>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-[#0B1F3A]">
                Lanjut pahami kondisi perjalanan?
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
