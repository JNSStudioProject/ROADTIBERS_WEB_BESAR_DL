import { PageHeader, EmptyState } from "@/components/common";

export default function AIDetectionPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <PageHeader
        title="AI Detection Center"
        description="Jalankan deteksi AI pada sampel gambar atau video."
      />
      <EmptyState
        title="AI Detection"
        description="Modul analisis gambar dan video sedang dalam tahap integrasi model."
      />
    </main>
  );
}
