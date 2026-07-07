import { PageHeader, EmptyState } from "@/components/common";

export default function CongestionPredictionPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12 space-y-8">
      <PageHeader
        title="Prediksi Kemacetan"
        description="Estimasi durasi kemacetan pada rute yang Anda pilih."
      />
      <EmptyState
        title="Prediksi Kemacetan"
        description="Fitur prediksi kemacetan berbasis AI sedang dalam tahap pengembangan."
      />
    </main>
  );
}
