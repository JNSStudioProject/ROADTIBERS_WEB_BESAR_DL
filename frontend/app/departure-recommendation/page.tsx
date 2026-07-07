import { PageHeader, EmptyState } from "@/components/common";

export default function DepartureRecommendationPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-12 space-y-8">
      <PageHeader
        title="Rekomendasi Keberangkatan"
        description="Saran waktu terbaik untuk perjalanan Anda."
      />
      <EmptyState
        title="Rekomendasi Keberangkatan"
        description="Sistem akan memberikan rekomendasi waktu keberangkatan yang optimal."
      />
    </main>
  );
}
