"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";

type ProgressRingProps = {
  /** 0–100 */
  value: number;
  /** Diameter in px. Default 128. */
  size?: number;
  /** Ring thickness in px. Default 10. */
  thickness?: number;
  /** Accessible description, e.g. "92% of patients …" (from /content). */
  label: string;
  /** Centre content, e.g. a <Counter>. */
  children?: React.ReactNode;
  /** On plum bands: translucent track, glow arc. */
  onDark?: boolean;
  /** Size / thickness from 768px up (defaults: same as size / thickness). */
  sizeMd?: number;
  thicknessMd?: number;
  /** Seconds to wait after coming into view (for staggered groups). */
  delay?: number;
  className?: string;
};

const DURATION = 1.4;

/**
 * Ring that fills clockwise to `value`% when scrolled into view.
 * Built from two rotating half-rings inside two half-windows, so it animates
 * with transform only (no stroke-dashoffset). Reduced motion: drawn at once.
 */
export function ProgressRing({
  value,
  size = 128,
  thickness = 10,
  sizeMd,
  thicknessMd,
  delay = 0,
  label,
  children,
  onDark = false,
  className,
}: ProgressRingProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const reduce = useReducedMotion();
  const pct = Math.min(100, Math.max(0, value));
  const shown = inView || reduce;

  // Right half covers 0–50%, left half 50–100%; time split in proportion.
  const firstShare = pct > 0 ? Math.min(pct, 50) / pct : 0;
  const d1 = reduce ? 0 : DURATION * firstShare;
  const d2 = reduce ? 0 : DURATION - d1;
  const first = shown ? Math.min(pct, 50) * 3.6 : 0;
  const second = shown ? Math.max(pct - 50, 0) * 3.6 : 0;

  const ring = cn("absolute inset-0 rounded-full border-solid", onDark ? "border-accent-glow" : "border-accent");
  // Size and thickness are CSS variables, so a ring can grow from md without rendering twice.
  const vars = {
    "--ring": `${size}px`,
    "--ring-md": `${sizeMd ?? size}px`,
    "--ring-th": `${thickness}px`,
    "--ring-th-md": `${thicknessMd ?? thickness}px`,
  } as React.CSSProperties;
  const ringWidth = "[border-width:var(--ring-th)] md:[border-width:var(--ring-th-md)]";

  return (
    <div
      ref={ref}
      role="img"
      aria-label={label}
      className={cn("relative grid size-(--ring) shrink-0 place-items-center md:size-(--ring-md)", className)}
      style={vars}
    >
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-0 rounded-full border-solid",
          ringWidth,
          onDark ? "border-white/15" : "border-accent-soft",
        )}
      />
      {/* 0–50%: the left half-ring rotates into the right window */}
      <span aria-hidden="true" className="absolute inset-0 [clip-path:inset(0_0_0_50%)]">
        <motion.span
          className={cn(ring, ringWidth, "[clip-path:inset(0_50%_0_0)]")}
          initial={false}
          animate={{ rotate: first }}
          transition={{ duration: d1, delay: reduce ? 0 : delay, ease: pct > 50 ? "linear" : EASE_OUT_EXPO }}
        />
      </span>
      {/* 50–100%: the right half-ring rotates into the left window */}
      <span aria-hidden="true" className="absolute inset-0 [clip-path:inset(0_50%_0_0)]">
        <motion.span
          className={cn(ring, ringWidth, "[clip-path:inset(0_0_0_50%)]")}
          initial={false}
          animate={{ rotate: second }}
          transition={{ duration: d2, delay: (reduce ? 0 : delay) + d1, ease: EASE_OUT_EXPO }}
        />
      </span>
      <div className="relative text-center">{children}</div>
    </div>
  );
}
