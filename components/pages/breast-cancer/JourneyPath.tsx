"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

type JourneyImage = { src: string; alt: string; focal: string };

type JourneyPathProps = {
  steps: readonly { title: string; body: string }[];
  main: JourneyImage;
  inset: JourneyImage;
  label: string;
};

// Progress at which each circle lights (the line reaches it).
const lightAt = (i: number, n: number) => (n === 1 ? 0 : (i / (n - 1)) * 0.96 + 0.02);

/**
 * Desktop: a curved rose line joins 4 numbered circles and draws itself as the section
 * scrolls into view; each step card rises once its circle lights. Step 4 is a wide card
 * with the recovery photos: the hopeful ending. Reduced motion: everything shown.
 */
export function JourneyPath({ steps, main, inset, label }: JourneyPathProps) {
  const rootRef = React.useRef<HTMLDivElement>(null);
  const circleRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const reduce = useReducedMotion();
  const [geo, setGeo] = React.useState<{ w: number; h: number; d: string } | null>(null);
  const [lit, setLit] = React.useState(0);

  // Build the path through the measured circle centres (so it always meets them).
  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const box = root.getBoundingClientRect();
      const pts = circleRefs.current.map((c) => {
        const r = c!.getBoundingClientRect();
        return { x: r.left - box.left + r.width / 2, y: r.top - box.top + r.height / 2 };
      });
      if (pts.length < 2) return;
      let d = `M ${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1];
        const b = pts[i];
        const dx = b.x - a.x;
        const lift = (i % 2 ? -1 : 1) * 46; // gentle wave, alternating up / down
        d += ` C ${a.x + dx * 0.35} ${a.y + lift}, ${b.x - dx * 0.35} ${b.y + lift}, ${b.x} ${b.y}`;
      }
      setGeo({ w: box.width, h: box.height, d });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(root);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({ target: rootRef, offset: ["start 80%", "center 45%"] });
  const progress = useTransform(scrollYProgress, (v) => (reduce ? 1 : v));
  const dashOffset = useTransform(progress, (v) => 1 - v);

  useMotionValueEvent(progress, "change", (v) => {
    setLit(steps.filter((_, i) => v >= lightAt(i, steps.length)).length);
  });
  React.useEffect(() => {
    if (reduce) {
      const id = requestAnimationFrame(() => setLit(steps.length));
      return () => cancelAnimationFrame(id);
    }
  }, [reduce, steps.length]);

  return (
    <div ref={rootRef} className="relative">
      {geo ? (
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 overflow-visible"
          width={geo.w}
          height={geo.h}
          viewBox={`0 0 ${geo.w} ${geo.h}`}
        >
          <path d={geo.d} fill="none" strokeWidth={2} strokeDasharray="6 8" style={{ stroke: "var(--line)" }} />
          <motion.path
            d={geo.d}
            fill="none"
            strokeWidth={3}
            strokeLinecap="round"
            pathLength={1}
            strokeDasharray="1"
            style={{ stroke: "var(--accent)", strokeDashoffset: dashOffset }}
          />
        </svg>
      ) : null}

      <ol aria-label={label} className="relative grid grid-cols-5 gap-6">
        {steps.map((step, i) => {
          const isLit = i < lit;
          const last = i === steps.length - 1;
          return (
            <li key={step.title} className={cn("flex flex-col", last && "col-span-2")}>
              <span
                ref={(el) => {
                  circleRefs.current[i] = el;
                }}
                aria-hidden="true"
                className={cn(
                  "relative z-10 ml-7 grid size-14 place-items-center rounded-full font-display text-xl font-semibold tabular-nums transition-[background-color,color,box-shadow,scale] duration-500",
                  isLit
                    ? "scale-100 bg-accent text-white shadow-(--accent-shadow) ring-[6px] ring-accent-soft"
                    : "scale-90 bg-surface text-muted ring-1 ring-line",
                )}
              >
                {i + 1}
              </span>

              <div
                className={cn(
                  "mt-10 flex-1 transition-[opacity,translate] duration-700 ease-out-expo",
                  isLit ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
                )}
                style={{ transitionDelay: isLit ? "0.15s" : "0s" }}
              >
                {last ? (
                  <div className="grid h-full grid-cols-[minmax(0,5fr)_minmax(0,6fr)] items-stretch overflow-hidden rounded-xl bg-linear-to-br from-surface-alt to-accent-soft ring-1 shadow-soft-lg ring-line">
                    <div className="flex flex-col justify-center p-7">
                      <h3 className="font-display text-[1.45rem] leading-snug text-ink">{step.title}</h3>
                      <p className="mt-2.5 text-base leading-relaxed text-muted">{step.body}</p>
                    </div>
                    <div className="relative min-h-[260px]">
                      <Image
                        src={main.src}
                        alt={main.alt}
                        fill
                        sizes="340px"
                        className="object-cover"
                        style={{ objectPosition: main.focal }}
                      />
                      <div className="absolute bottom-4 left-4 aspect-[4/5] w-[38%] overflow-hidden rounded-[16px] ring-4 shadow-soft-lg ring-white">
                        <Image
                          src={inset.src}
                          alt={inset.alt}
                          fill
                          sizes="130px"
                          className="object-cover"
                          style={{ objectPosition: inset.focal }}
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="h-full rounded-lg border border-line bg-surface p-6 shadow-soft-sm">
                    <h3 className="font-display text-[1.3rem] leading-snug text-ink">{step.title}</h3>
                    <p className="mt-2.5 text-[15px] leading-relaxed text-muted">{step.body}</p>
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
