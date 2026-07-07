import { PageHeader, EmptyState } from "@/components/common";

export default function ViolationMonitoringPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <PageHeader
        title="Violation Monitoring"
        description="Pantau statistik dan tren pelanggaran lalu lintas."
      />
      <EmptyState
        title="Monitoring Pelanggaran"
        description="Fitur pemantauan pelanggaran sedang dalam tahap pengembangan."
      />
    </main>
  );
}
