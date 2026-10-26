"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { Stat } from "@/content/types";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { Counter } from "@/components/ui/Counter";

/** Segment colours on the blue band: teal glow, a pale awareness blue, gold. */
const COLORS = ["var(--accent-glow)", "color-mix(in oklab, var(--accent) 35%, var(--white))", "var(--gold)"] as const;

/** Gap between segments, in % of the circumference (pathLength = 100). */
const GAP = 1;

/**
 * The 60 / 36 / 4 donut and its legend (the robotic page's SurgeryNumbers technique). The segments
 * draw in one after another when scrolled into view and the legend counts up. Hovering (mouse) or
 * tapping a segment or a legend row highlights the pair, and the centre shows its share; with
 * nothing chosen the centre shows the first ("No Stoma Ever"). Decorative: the section's
 * screen-reader table carries the data, so this is aria-hidden.
 */
export function StomaChart({ stats }: { stats: readonly Stat[] }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const [active, setActive] = React.useState<number | null>(null);

  const total = stats.reduce((sum, s) => sum + s.value, 0);
  const segments = stats.reduce<{ start: number; length: number }[]>((acc, s) => {
    const prev = acc[acc.length - 1];
    const start = prev ? prev.start + prev.length + GAP : 0;
    acc.push({ start, length: (s.value / total) * 100 - GAP });
    return acc;
  }, []);

  const link = (i: number) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(i);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(null);
    },
    // Touch: a tap toggles. A mouse already highlights on hover, so its click must not toggle it off.
    onClick: (e: React.MouseEvent) => {
      if ((e.nativeEvent as PointerEvent).pointerType === "mouse") return;
      setActive((a) => (a === i ? null : i));
    },
  });

  const shown = stats[active ?? 0];

  return (
    <div aria-hidden="true" className="grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-10">
      <div className="relative mx-auto aspect-square w-full max-w-[300px]">
        {/* soft glow behind the ring */}
        <span className="absolute inset-[12%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--accent-glow)_22%,transparent),transparent)]" />
        <svg ref={ref} viewBox="0 0 240 240" className="relative size-full">
          <circle
            cx="120"
            cy="120"
            r="96"
            fill="none"
            style={{ stroke: "var(--white)" }}
            strokeOpacity="0.08"
            strokeWidth="24"
          />
          <g transform="rotate(-90 120 120)">
            {segments.map((s, i) => (
              <motion.circle
                key={stats[i].label}
                cx="120"
                cy="120"
                r="96"
                fill="none"
                pathLength={100}
                stroke={COLORS[i]}
                strokeLinecap="butt"
                strokeDashoffset={-s.start}
                initial={reduce ? false : { strokeDasharray: "0 100" }}
                animate={
                  inView || reduce ? { strokeDasharray: `${s.length} ${100 - s.length}` } : { strokeDasharray: "0 100" }
                }
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: 0.15 + i * 0.45 }}
                strokeWidth={active === i ? 30 : 24}
                opacity={active !== null && active !== i ? 0.4 : 1}
                className="cursor-pointer transition-[stroke-width,opacity] duration-300"
                {...link(i)}
              />
            ))}
          </g>
        </svg>
        <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
          <div
            key={active ?? "default"}
            className="motion-safe:animate-in motion-safe:duration-300 motion-safe:fade-in"
          >
            <p className="font-display text-[3.25rem] leading-none font-semibold text-white tabular-nums">
              {shown.value}
              {shown.suffix}
            </p>
            <p className="mt-2 text-sm text-white/70">{shown.label}</p>
          </div>
        </div>
      </div>

      <ul className="grid gap-3">
        {stats.map((s, i) => (
          <li
            key={s.label}
            {...link(i)}
            className={cn(
              "flex min-h-16 cursor-pointer items-center gap-4 rounded-lg px-4 py-3 ring-1 transition-[opacity,transform] duration-300",
              active === i ? "translate-x-1 bg-white/10 ring-white/25" : "bg-white/[0.04] ring-white/10",
              active !== null && active !== i && "opacity-55",
            )}
          >
            <span className="size-3.5 shrink-0 rounded-full" style={{ background: COLORS[i] }} />
            <span className="flex-1 text-[15px] leading-snug text-white/85">{s.label}</span>
            <span className="font-display text-2xl font-semibold text-white">
              <Counter value={s.value} suffix={s.suffix} delay={0.15 + i * 0.45} duration={1.2} reserveWidth />
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
