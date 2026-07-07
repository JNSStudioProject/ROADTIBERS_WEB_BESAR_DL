import { PageHeader, EmptyState } from "@/components/common";

export default function AssistantPage() {
  return (
    <main className="container mx-auto max-w-5xl px-4 py-8 space-y-8">
      <PageHeader
        title="Officer AI Assistant"
        description="Asisten AI cerdas untuk membantu analisis operasional Anda."
      />
      <EmptyState
        title="AI Assistant"
        description="Fitur asisten percakapan cerdas sedang dalam tahap pengembangan."
      />
    </main>
  );
}
