import type * as React from "react";
import { Counter } from "@/components/ui/Counter";

/** Class names in dashboard.css (prefix tyd-). */
const gaugeStyles = {
  arc: "tyd-arc",
} as const;

// A half circle, left to right over the top: radius 80, centre (100, 100).
const ARC = "M20 100 A80 80 0 0 1 180 100";
const TICKS = 11;

type GaugeProps = {
  /** 0–100 */
  value: number;
  suffix: string;
  /** Seconds after the panel comes into view (for the stagger). */
  delay: number;
};

/**
 * A semicircle gauge (the half-ring cousin of ProgressRing): a hairline track with eleven ticks,
 * the value's arc drawn with a stroke (pathLength 1) once the panel is in view, and the figure
 * counting up under it. A value of 0 draws no arc. Decorative: the panel's table carries the data.
 */
export function Gauge({ value, suffix, delay }: GaugeProps) {
  const share = Math.min(100, Math.max(0, value)) / 100;
  return (
    <div className="relative mx-auto w-full max-w-[240px]">
      <svg viewBox="0 0 200 112" className="block w-full overflow-visible" aria-hidden="true">
        {Array.from({ length: TICKS }, (_, i) => {
          const a = Math.PI * (1 - i / (TICKS - 1));
          const [c, s] = [Math.cos(a), Math.sin(a)];
          return (
            <line
              key={i}
              x1={100 + c * 92}
              y1={100 - s * 92}
              x2={100 + c * 97}
              y2={100 - s * 97}
              strokeWidth="1.5"
              strokeLinecap="round"
              className="stroke-white/30"
            />
          );
        })}
        <path d={ARC} fill="none" strokeWidth="10" strokeLinecap="round" className="stroke-white/12" />
        {share > 0 ? (
          <path
            d={ARC}
            pathLength={1}
            fill="none"
            strokeWidth="10"
            strokeLinecap="round"
            className={`${gaugeStyles.arc} stroke-accent-glow`}
            style={{ "--v": share, "--d": `${delay}s` } as React.CSSProperties}
          />
        ) : null}
      </svg>
      <p className="absolute inset-x-0 bottom-0 text-center font-display text-[2.75rem] leading-none font-semibold text-white md:text-[2.25rem] lg:text-[3.25rem]">
        <Counter value={value} suffix={suffix} delay={delay} duration={1.3} reserveWidth />
      </p>
    </div>
  );
}
