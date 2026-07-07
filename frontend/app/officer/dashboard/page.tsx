import { PageHeader, EmptyState } from "@/components/common";

export default function OfficerDashboardPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <PageHeader
        title="Command Center Dashboard"
        description="Ringkasan pemantauan lalu lintas dan metrik pelanggaran."
      />
      <EmptyState
        title="Dashboard"
        description="Metrik dan chart dashboard petugas sedang dalam tahap pengembangan."
      />
    </main>
  );
}
