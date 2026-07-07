import { PageHeader, EmptyState } from "@/components/common";

export default function ForecastingPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <PageHeader
        title="Forecasting Prediction Center"
        description="Analisis prediksi volume, pelanggaran, dan durasi kemacetan."
      />
      <EmptyState
        title="Forecasting"
        description="Fitur prediksi berbasis time-series sedang dalam tahap pengembangan."
      />
    </main>
  );
}
