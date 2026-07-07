import { PageHeader, EmptyState } from "@/components/common";

export default function ReportPage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <PageHeader
        title="Report & Export"
        description="Laporan rekapitulasi data pelanggaran dan pemantauan."
      />
      <EmptyState
        title="Laporan & Ekspor"
        description="Modul pembuatan dan ekspor laporan sedang dipersiapkan."
      />
    </main>
  );
}
