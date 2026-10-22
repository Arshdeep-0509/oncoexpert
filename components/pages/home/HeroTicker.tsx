"use client";

import * as React from "react";
import { introRemainingSeconds } from "@/lib/intro";
import { styles } from "@/components/pages/home/hero-styles";

/** Seconds between swaps, and when the first one happens (after the ticker has faded in). */
const INTERVAL_MS = 2400;
const START_S = 1.05;

type HeroTickerProps = {
  lead: string;
  tail: string;
  words: readonly string[];
  /** The whole list in one sentence: what screen readers get (the visible line is aria-hidden). */
  sentence: string;
  className?: string;
};

/**
 * "Expert care for ___ cancer": the blank swaps every 2.4s with a vertical slot motion. The
 * words share one grid cell (its width = the widest word, so nothing reflows); "cancer" slides
 * (translate) to sit right after the current word. Not a live region. It skips a turn while the
 * hero is paused (button) or off-screen, the line is hovered, or the tab is hidden; with reduced
 * motion it stays on the first word.
 */
export function HeroTicker({ lead, tail, words, sentence, className }: HeroTickerProps) {
  const [{ index, prev }, setState] = React.useState<{ index: number; prev: number | null }>({ index: 0, prev: null });
  const [shift, setShift] = React.useState(0);
  const rootRef = React.useRef<HTMLSpanElement>(null);
  const slotRef = React.useRef<HTMLSpanElement>(null);
  const hovered = React.useRef(false);

  // Keep "cancer" next to the current word (re-measured on resize and once fonts are in).
  React.useEffect(() => {
    const slot = slotRef.current;
    if (!slot) return;
    const measure = () => {
      const word = slot.children[index] as HTMLElement | undefined;
      if (word) setShift(word.offsetWidth - slot.offsetWidth);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(slot);
    document.fonts?.ready.then(measure);
    return () => ro.disconnect();
  }, [index]);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const hero = rootRef.current?.closest("section");
    let interval = 0;
    const tick = () => {
      if (hovered.current || document.hidden || hero?.matches("[data-paused], [data-offscreen]")) return;
      setState(({ index: i }) => ({ index: (i + 1) % words.length, prev: i }));
    };
    const start = window.setTimeout(
      () => {
        tick();
        interval = window.setInterval(tick, INTERVAL_MS);
      },
      (introRemainingSeconds() + START_S) * 1000 + INTERVAL_MS,
    );
    return () => {
      window.clearTimeout(start);
      window.clearInterval(interval);
    };
  }, [words.length]);

  return (
    <p className={className}>
      <span className="sr-only">{sentence}</span>
      <span
        ref={rootRef}
        aria-hidden="true"
        onPointerEnter={() => (hovered.current = true)}
        onPointerLeave={() => (hovered.current = false)}
        style={{ "--tail-shift": `${shift}px` } as React.CSSProperties}
      >
        {lead}{" "}
        <span ref={slotRef} className={styles.slot}>
          {words.map((word, i) => (
            <span
              key={word}
              data-state={i === index ? "current" : i === prev ? "prev" : "next"}
              className="font-semibold text-accent-glow"
            >
              {word}
            </span>
          ))}
        </span>{" "}
        <span className={styles.tail}>{tail}</span>
      </span>
    </p>
  );
}
