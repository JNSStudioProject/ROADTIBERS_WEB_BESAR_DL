import { cn } from "@/lib/utils";

type GlassIntensity = "subtle" | "medium" | "strong";

interface GlassPanelProps {
  children: React.ReactNode;
  className?: string;
  intensity?: GlassIntensity;
  overlap?: boolean;
}

const INTENSITY_CLASSES: Record<GlassIntensity, string> = {
  subtle:
    "bg-white/60 backdrop-blur-sm border border-white/40 shadow-sm",
  medium:
    "bg-white/72 backdrop-blur-md border border-white/50 shadow-md rt-glass-highlight",
  strong:
    "bg-white/85 backdrop-blur-xl border border-white/60 shadow-lg rt-glass-highlight",
};

export function GlassPanel({
  children,
  className,
  intensity = "medium",
  overlap = false,
}: GlassPanelProps) {
  return (
    <div
      className={cn(
        "rounded-3xl",
        INTENSITY_CLASSES[intensity],
        overlap && "rt-section-overlap",
        className
      )}
    >
      {children}
    </div>
  );
}
