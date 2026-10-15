"use client";

import * as React from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { outcomes, scarLabels } from "@/content/robotic-surgery";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/components/ui/reveal";

type Mode = "open" | "robotic";

/*
 * The torso is drawn in millimetres (1 SVG unit = 1 mm, viewBox 400 × 560), so the
 * open incision and the robotic ports are at the same real-world scale.
 */
const VIEW_W = 400;
const VIEW_H = 560;
const NAVEL = { x: 200, y: 330 };

const TORSO = [
  // left & right outline: neck → shoulder → side → waist → hip
  "M172 18C172 40 168 52 160 60C130 70 82 76 66 96C56 110 58 140 66 176C74 230 88 280 98 318C104 360 96 420 86 500",
  "M228 18C228 40 232 52 240 60C270 70 318 76 334 96C344 110 342 140 334 176C326 230 312 280 302 318C296 360 304 420 314 500",
  // chest
  "M118 150C140 190 180 196 194 170",
  "M282 150C260 190 220 196 206 170",
  // costal margins
  "M200 204C182 232 154 246 122 242",
  "M200 204C218 232 246 246 278 242",
  // inguinal lines
  "M140 420C165 455 185 470 200 478",
  "M260 420C235 455 215 470 200 478",
];

export function ScarCompare() {
  const reduce = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [mode, setMode] = React.useState<Mode>("open");
  const touched = React.useRef(false);
  const { scars, barLabels } = outcomes;

  // Open incision length (mm): the larger figure, centred on the navel.
  const incisionMm = scars.openIncisionCm[1] * 10;
  const incision = { y1: NAVEL.y - incisionMm / 2, y2: NAVEL.y + incisionMm / 2 };

  // Ports along a gentle arc just above the navel, spread across the abdomen.
  const ports = Array.from({ length: scars.ports }, (_, i) => {
    const t = i / Math.max(1, scars.ports - 1) - 0.5; // -0.5 … 0.5
    const x = NAVEL.x + t * 130;
    const y = NAVEL.y - 18 + 40 * t * t;
    // Each port slit follows the arc: slope dy/dx = 80t / 130.
    const angle = (Math.atan((80 * t) / 130) * 180) / Math.PI;
    return { x, y, angle };
  });

  // Auto-toggle once when first seen; after that the user is in control.
  React.useEffect(() => {
    if (!inView || reduce || touched.current) return;
    const t = setTimeout(() => {
      if (!touched.current) setMode("robotic");
    }, 2200);
    return () => clearTimeout(t);
  }, [inView, reduce]);

  const choose = (next: Mode) => {
    touched.current = true;
    setMode(next);
  };

  const half = scars.portSizeMm / 2;

  return (
    <div ref={ref} className="flex h-full flex-col">
      <div
        role="group"
        aria-label={outcomes.a11y.scarToggle}
        className="mx-auto inline-flex rounded-full border border-white/10 bg-white/[0.04] p-1"
      >
        {(["open", "robotic"] as const).map((option) => (
          <button
            key={option}
            type="button"
            aria-pressed={mode === option}
            onClick={() => choose(option)}
            className={cn(
              "relative h-11 rounded-full px-4 text-sm font-semibold transition-colors duration-300 sm:px-5",
              mode === option ? "text-ink" : "text-white/70 hover:text-white",
            )}
          >
            {mode === option ? (
              <motion.span
                layoutId="scar-toggle"
                className="absolute inset-0 rounded-full bg-glow"
                transition={{ duration: reduce ? 0 : 0.45, ease: EASE_OUT_EXPO }}
              />
            ) : null}
            <span className="relative">{barLabels[option]}</span>
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        {outcomes.a11y.scarSummary(scars.openIncisionCm, scars.ports, scars.portSizeMm)}
      </p>

      <div aria-hidden="true" className="relative mx-auto mt-6 w-full max-w-[270px]" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
        <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="absolute inset-0 size-full" fill="none" strokeLinecap="round">
          <g stroke="rgb(255 255 255 / 0.25)" strokeWidth={2.2}>
            {TORSO.map((d) => (
              <path key={d} d={d} />
            ))}
            <circle cx={NAVEL.x} cy={NAVEL.y} r={4} />
          </g>

          {/* Open: midline incision, drawn */}
          <AnimatePresence>
            {mode === "open" ? (
              <motion.g key="open" exit={{ opacity: 0 }} transition={{ duration: reduce ? 0 : 0.5 }}>
                <motion.line
                  x1={NAVEL.x}
                  x2={NAVEL.x}
                  y1={incision.y1}
                  y2={incision.y2}
                  stroke="var(--glow)"
                  strokeWidth={3.5}
                  initial={reduce ? false : { pathLength: 0 }}
                  animate={inView || reduce ? { pathLength: 1 } : { pathLength: 0 }}
                  transition={{ duration: 1.3, ease: EASE_OUT_EXPO, delay: 0.2 }}
                />
                {/* stitch ticks every 10 mm */}
                {Array.from({ length: Math.floor(incisionMm / 10) + 1 }, (_, i) => incision.y1 + i * 10).map((y, i) => (
                  <motion.line
                    key={y}
                    x1={NAVEL.x - 5}
                    x2={NAVEL.x + 5}
                    y1={y}
                    y2={y}
                    stroke="rgb(45 212 191 / 0.55)"
                    strokeWidth={1.5}
                    initial={reduce ? false : { opacity: 0 }}
                    animate={inView || reduce ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.07 }}
                  />
                ))}
              </motion.g>
            ) : null}
          </AnimatePresence>

          {/* Robotic: four 8 mm ports pop in */}
          <AnimatePresence>
            {mode === "robotic"
              ? ports.map((p, i) => (
                  <motion.g
                    key={`port-${i}`}
                    style={{ transformBox: "fill-box", transformOrigin: "center" }}
                    initial={reduce ? false : { scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: reduce ? 0 : 0.5, ease: EASE_OUT_EXPO, delay: reduce ? 0 : 0.35 + i * 0.12 }}
                  >
                    {/* soft highlight ring (not to scale) */}
                    <circle cx={p.x} cy={p.y} r={11} stroke="rgb(45 212 191 / 0.35)" strokeWidth={1.2} />
                    {/* the port itself: 8 mm, to scale */}
                    <line
                      x1={p.x - half}
                      x2={p.x + half}
                      y1={p.y}
                      y2={p.y}
                      stroke="var(--glow)"
                      strokeWidth={3.5}
                      transform={`rotate(${p.angle} ${p.x} ${p.y})`}
                    />
                  </motion.g>
                ))
              : null}
          </AnimatePresence>
        </svg>

        {/* Measurement labels */}
        <AnimatePresence mode="wait">
          <motion.span
            key={mode}
            initial={reduce ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : 0.5 }}
            className={cn(
              "absolute rounded-full border border-glow/30 bg-black/60 px-2.5 py-1 text-xs font-semibold whitespace-nowrap text-glow tabular-nums backdrop-blur",
              mode === "open" ? "top-[52%] left-[60%]" : "top-[44%] left-1/2 -translate-x-1/2",
            )}
          >
            {scarLabels[mode]}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
}
