"use client";

import * as React from "react";
import { useMotionValueEvent, useReducedMotion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";
import { SCROLL_FILL_OFFSET, ScrollFillLine } from "@/components/ui/ScrollFillLine";
import "@/components/pages/home/journey.css";

type Stop = { role: string; place: string; note?: string };

/** Class names from journey.css (plain CSS, `journey-` prefix). */
const styles = { stop: "journey-stop", lit: "journey-lit", halo: "journey-halo", card: "journey-card" } as const;

/**
 * The training journey: a vertical timeline whose line fills with scroll (ScrollFillLine). Each
 * stop's dot lights up exactly when the fill reaches it (same box, same scroll offset), and its
 * card slides in the first time. Reduced motion: line full, every stop lit and shown.
 */
export function JourneyTimeline({
  label,
  stops,
  className,
}: {
  label: string;
  stops: readonly Stop[];
  className?: string;
}) {
  const reduce = useReducedMotion();
  const trackRef = React.useRef<HTMLDivElement>(null);
  const dotRefs = React.useRef<(HTMLSpanElement | null)[]>([]);
  const thresholds = React.useRef<number[]>([]);
  const [lit, setLit] = React.useState(0);
  const [shown, setShown] = React.useState(0);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: SCROLL_FILL_OFFSET });

  const update = React.useCallback((progress: number) => {
    const count = thresholds.current.filter((t) => progress >= t).length;
    setLit(count);
    setShown((s) => Math.max(s, count));
  }, []);

  // Where each dot's centre sits along the track (0–1): the fill reaches it at that progress.
  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const box = track.getBoundingClientRect();
      thresholds.current = dotRefs.current.map((dot) => {
        if (!dot || !box.height) return 0;
        const d = dot.getBoundingClientRect();
        return Math.min(1, Math.max(0, (d.top + d.height / 2 - box.top) / box.height));
      });
      update(scrollYProgress.get());
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    return () => ro.disconnect();
  }, [scrollYProgress, update]);

  useMotionValueEvent(scrollYProgress, "change", update);

  const all = reduce ? stops.length : null;

  return (
    <div className={cn("relative", className)}>
      <div ref={trackRef} aria-hidden="true" className="absolute top-6 bottom-6 left-[11px] w-0.5">
        <ScrollFillLine className="absolute inset-0" />
      </div>
      <ol aria-label={label} className="relative space-y-4 md:space-y-5">
        {stops.map((stop, i) => (
          <li
            key={stop.role}
            className={cn(styles.stop, "relative pl-10 md:pl-12")}
            data-lit={i < (all ?? lit) ? "" : undefined}
            data-shown={i < (all ?? shown) ? "" : undefined}
          >
            {/* Dot: plain ring, with the lit dot and its halo on top */}
            <span
              ref={(el) => {
                dotRefs.current[i] = el;
              }}
              aria-hidden="true"
              className="absolute top-[18px] left-[3px] size-[18px] rounded-full border-2 border-line bg-surface-warm"
            >
              <span className={cn(styles.halo, "absolute -inset-0.5 rounded-full bg-accent/40")} />
              <span
                className={cn(
                  styles.lit,
                  "absolute -inset-0.5 rounded-full bg-accent shadow-[0_0_0_4px_color-mix(in_srgb,var(--accent)_18%,transparent)]",
                )}
              />
            </span>
            <div
              className={cn(
                styles.card,
                "rounded-2xl bg-surface px-5 py-4 ring-1 shadow-soft-sm ring-line md:px-6 md:py-5",
              )}
            >
              <p className="font-display text-[17px] leading-snug font-bold text-ink md:text-lg">{stop.role}</p>
              <p className="mt-1 text-[15px] leading-snug text-muted">{stop.place}</p>
              {stop.note ? (
                <p className="mt-3 inline-flex items-center gap-2 rounded-pill bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
                  <span aria-hidden="true" className="size-1.5 rounded-full bg-highlight" />
                  {stop.note}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
