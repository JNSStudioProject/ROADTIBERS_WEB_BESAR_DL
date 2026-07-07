"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type MotionDirection = "up" | "down" | "left" | "right" | "none";

interface MotionSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: MotionDirection;
}

const DIRECTION_OFFSET: Record<MotionDirection, { x: number; y: number }> = {
  up: { x: 0, y: 20 },
  down: { x: 0, y: -20 },
  left: { x: 20, y: 0 },
  right: { x: -20, y: 0 },
  none: { x: 0, y: 0 },
};

export function MotionSection({
  children,
  className,
  delay = 0,
  direction = "up",
}: MotionSectionProps) {
  const shouldReduceMotion = useReducedMotion();
  const offset = DIRECTION_OFFSET[direction];

  return (
    <motion.section
      className={cn(className)}
      initial={
        shouldReduceMotion
          ? { opacity: 1, x: 0, y: 0 }
          : { opacity: 0, x: offset.x, y: offset.y }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.5,
        delay: shouldReduceMotion ? 0 : delay,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      {children}
    </motion.section>
  );
}
