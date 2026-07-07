import { PageHeader, EmptyState } from "@/components/common";

export default function LoginPage() {
  return (
    <main className="container mx-auto max-w-md px-4 py-24 space-y-8">
      <PageHeader
        title="Login Petugas"
        description="Masuk ke Command Center untuk mengakses fitur monitoring dan insight."
      />
      <EmptyState
        title="Autentikasi"
        description="Formulir login petugas sedang dalam tahap integrasi."
      />
    </main>
  );
}
