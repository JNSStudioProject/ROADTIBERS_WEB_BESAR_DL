import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="rt-bright-stage relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">
      {/* Soft background radial glows */}
      <div className="absolute top-1/4 -left-1/4 w-[600px] h-[600px] bg-[#1D4ED8]/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-[#06B6D4]/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Main Login Container */}
      <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        
        {/* Left Information Panel */}
        <div className="flex flex-col gap-6">
          <span className="inline-flex items-center w-fit gap-2.5 rounded-full border border-blue-200 bg-blue-50/80 px-4 py-1.5 text-[12px] font-bold uppercase tracking-[0.2em] text-[#1D4ED8] backdrop-blur-md shadow-sm">
            Area Petugas
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-[#0B1F3A] leading-[1.2]">
            Selamat Datang di Command Center
          </h1>
          <p className="text-base font-medium text-slate-600 leading-relaxed">
            Halaman ini khusus digunakan untuk masuk ke area monitoring petugas lalu lintas.
          </p>
          
          <div className="mt-4 space-y-4">
            <h3 className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wider">Fasilitas Command Center:</h3>
            <ul className="space-y-3">
              {[
                "Pemantauan kondisi lalu lintas terkini secara real-time.",
                "Deteksi otomatis berbagai jenis pelanggaran kendaraan.",
                "Prediksi kemacetan dan kepadatan jalan.",
                "Laporan dan insight operasional untuk pengambilan keputusan."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center shrink-0 mt-0.5">
                    <span className="text-teal-700 font-bold text-sm">✓</span>
                  </span>
                  <span className="text-sm font-medium text-slate-700 leading-relaxed">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Login Form */}
        <div className="p-8 sm:p-10 rounded-[2.5rem] border border-white/80 shadow-xl relative overflow-hidden bg-white/80 backdrop-blur-xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#14B8A6]/5 blur-[60px] rounded-full pointer-events-none" />
          
          <form className="relative z-10 flex flex-col gap-8">
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wide px-1">
                  Email atau Username Petugas
                </label>
                <input 
                  type="text" 
                  placeholder="Contoh: petugas@roadtierbers.go.id" 
                  className="w-full h-14 px-4 rounded-xl bg-white border border-slate-200 text-base font-medium text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]/50 transition-all shadow-inner"
                  defaultValue="demo_petugas"
                />
                <p className="text-xs text-slate-500 px-1 font-medium">Gunakan kredensial resmi dari instansi Anda.</p>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-bold text-[#0B1F3A] uppercase tracking-wide px-1">
                  Password
                </label>
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  className="w-full h-14 px-4 rounded-xl bg-white border border-slate-200 text-base font-medium text-[#0B1F3A] placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1D4ED8]/20 focus:border-[#1D4ED8]/50 transition-all shadow-inner"
                  defaultValue="password"
                />
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/officer/dashboard"
                className="w-full inline-flex items-center justify-center h-14 px-6 rounded-xl bg-[#0B1F3A] text-white text-base font-bold hover:bg-[#142d52] transition-colors shadow-lg shadow-[#0B1F3A]/20"
              >
                Masuk ke Dashboard Petugas
              </Link>
            </div>

            <div className="mt-2 p-4 rounded-xl bg-blue-50 border border-blue-100 flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-blue-200 flex items-center justify-center shrink-0">
                <span className="text-[#1D4ED8] font-bold text-sm">i</span>
              </div>
              <p className="text-xs font-bold text-[#1D4ED8] leading-relaxed pt-1">
                Data simulasi prototype: autentikasi masih disimulasikan untuk kebutuhan demo. Klik tombol masuk untuk melanjutkan.
              </p>
            </div>
          </form>
        </div>

      </div>
      
      {/* Back to Home */}
      <div className="absolute bottom-6 left-0 right-0 text-center z-20">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-widest hover:text-[#0B1F3A] transition-colors bg-white/50 px-4 py-2 rounded-full backdrop-blur-sm border border-slate-200">
          ← Kembali ke Halaman Utama
        </Link>
      </div>
    </div>
  );
}
