"use client";

import * as React from "react";
import { motion, useInView, useReducedMotion } from "motion/react";
import type { SurgeryKey } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { colorFor, counts, segments, type Linker } from "@/components/pages/robotic-surgery/surgery-numbers/chart-data";

/** The donut: one segment per surgery type, drawn in when scrolled into view; the hovered or tapped one grows. */
export function Donut({ active, link }: { active: SurgeryKey | null; link: Linker }) {
  const reduce = useReducedMotion();
  const ref = React.useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.4 });
  const current = counts.find((c) => c.key === active);

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[300px] lg:mx-0">
      <svg ref={ref} viewBox="0 0 240 240" className="size-full" aria-hidden="true">
        <circle cx="120" cy="120" r="96" fill="none" stroke="rgb(255 255 255 / 0.06)" strokeWidth="26" />
        <g transform="rotate(-90 120 120)">
          {segments.map((s, i) => (
            <motion.circle
              key={s.key}
              cx="120"
              cy="120"
              r="96"
              fill="none"
              pathLength={100}
              stroke={colorFor(s.key)}
              strokeDashoffset={-s.start}
              initial={reduce ? false : { strokeDasharray: "0 100" }}
              animate={
                inView || reduce ? { strokeDasharray: `${s.length} ${100 - s.length}` } : { strokeDasharray: "0 100" }
              }
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay: 0.1 + i * 0.12 }}
              strokeWidth={active === s.key ? 32 : 26}
              opacity={active && active !== s.key ? 0.45 : 1}
              className="cursor-pointer transition-[stroke-width,opacity] duration-300"
              {...link(s.key)}
            />
          ))}
        </g>
      </svg>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div className={cn("transition-opacity duration-300", current ? "opacity-100" : "opacity-0")}>
          <p className="font-display text-4xl font-bold text-white tabular-nums">{current?.count}</p>
          <p className="mt-1 max-w-[9rem] text-[13px] leading-snug text-white/60">{current?.label}</p>
        </div>
      </div>
    </div>
  );
}
