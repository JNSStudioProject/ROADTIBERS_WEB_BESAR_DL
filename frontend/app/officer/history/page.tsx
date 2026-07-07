import { PageHeader, EmptyState } from "@/components/common";

export default function HistoryPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <PageHeader
        title="Detection History"
        description="Riwayat hasil deteksi dari seluruh model analitik."
      />
      <EmptyState
        title="Riwayat Deteksi"
        description="Tabel riwayat hasil deteksi sedang dalam tahap pengembangan."
      />
    </main>
  );
}
