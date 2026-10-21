"use client";

import { motion, useTransform, type MotionValue } from "motion/react";

/** One slide's indicator: a thin bar that fills with the slide's progress while it is active. */
export function IndicatorBar({
  active,
  progress,
  reduce,
  label,
  onClick,
}: {
  active: boolean;
  progress: MotionValue<number>;
  reduce: boolean;
  label: string;
  onClick: () => void;
}) {
  const scaleX = useTransform(progress, (v) => (reduce ? 1 : v));
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? "true" : undefined}
      className="group flex h-11 w-9 items-center sm:w-12"
    >
      <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/35">
        {active ? (
          <motion.span className="absolute inset-0 origin-left rounded-full bg-glow" style={{ scaleX }} />
        ) : null}
      </span>
    </button>
  );
}
