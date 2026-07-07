import { PageHeader, EmptyState } from "@/components/common";

export default function VehiclePlatePage() {
  return (
    <main className="container mx-auto max-w-7xl px-4 py-8 space-y-8">
      <PageHeader
        title="Vehicle & Plate Monitoring"
        description="Pantau jenis kendaraan, plat nomor, dan status pajak."
      />
      <EmptyState
        title="Kendaraan & Plat"
        description="Modul analisis plat nomor kendaraan sedang dipersiapkan."
      />
    </main>
  );
}
