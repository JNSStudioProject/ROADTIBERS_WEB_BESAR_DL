"use client";

import { useRef, useState, useEffect } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

interface InteractiveGlassCardProps {
  children: React.ReactNode;
  className?: string;
  intensity?: "subtle" | "medium" | "strong" | "dark";
  glow?: boolean;
}

export function InteractiveGlassCard({
  children,
  className,
  intensity = "subtle",
  glow = false,
}: InteractiveGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (!cardRef.current || !isHovered) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      // subtle tilt calculation (max ~6 degrees)
      const rotateX = ((y - centerY) / centerY) * -6;
      const rotateY = ((x - centerX) / centerX) * 6;

      const posX = (x / rect.width) * 100;
      const posY = (y / rect.height) * 100;

      requestAnimationFrame(() => {
        setRotation({ x: rotateX, y: rotateY });
        setMousePos({ x: posX, y: posY });
      });
    };

    if (isHovered) {
      window.addEventListener("mousemove", handleMouseMove);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isHovered, shouldReduceMotion]);

  const baseIntensityClass =
    intensity === "dark"
      ? "rt-liquid-dark rt-liquid-gloss"
      : intensity === "strong"
      ? "bg-white/90 backdrop-blur-xl border-slate-200/50 shadow-md"
      : intensity === "medium"
      ? "bg-white/70 backdrop-blur-md border-slate-200/50 shadow-sm"
      : "bg-white/50 backdrop-blur-sm border-slate-200/40";

  return (
    <div
      ref={cardRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setRotation({ x: 0, y: 0 });
      }}
      className={cn(
        "relative rounded-3xl transition-transform duration-200 ease-out overflow-hidden",
        baseIntensityClass,
        className
      )}
      style={{
        transform: !shouldReduceMotion
          ? `perspective(1000px) rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
          : undefined,
      }}
    >
      {/* Moving inner glow based on mouse position */}
      {glow && !shouldReduceMotion && (
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 mix-blend-overlay"
          style={{
            opacity: isHovered ? 0.3 : 0,
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(255,255,255,0.8) 0%, transparent 50%)`,
          }}
        />
      )}
      {children}
    </div>
  );
}
