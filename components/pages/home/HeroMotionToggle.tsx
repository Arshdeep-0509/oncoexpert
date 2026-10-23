"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/home/hero-styles";

/**
 * Pause / play for every ambient loop in the hero (marquee, ticker, ring spin, glows, chips,
 * sparks, particles, shine): sets data-paused on the hero section, which hero.css and the
 * ticker read. It also marks the hero data-offscreen while it is scrolled away, so the loops
 * stop costing anything. Hidden with reduced motion (nothing moves).
 */
export function HeroMotionToggle({ pause, play }: { pause: string; play: string }) {
  const [paused, setPaused] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  // Latch the intro delay for this page load. --intro-delay comes from `.preloader ~
  // [data-theme]` (globals.css), which stops matching once the overlay unmounts at the end of
  // its fade: every entrance still running would then jump to its end. While the overlay is
  // still there (a full load), pin the hero's --intro to its current value. After in-site
  // navigation there is no overlay and the hero keeps --intro: 0s.
  React.useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero || !document.querySelector(".preloader")) return;
    hero.style.setProperty("--intro", getComputedStyle(hero).getPropertyValue("--intro-delay").trim() || "0s");
  }, []);

  React.useEffect(() => {
    ref.current?.closest("section")?.toggleAttribute("data-paused", paused);
  }, [paused]);

  React.useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => hero.toggleAttribute("data-offscreen", !entry.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setPaused((p) => !p)}
      aria-label={paused ? play : pause}
      className={cn(
        styles.pause,
        "grid size-11 shrink-0 place-items-center rounded-full text-white/80 ring-1 ring-white/20 transition-colors hover:bg-white/10 hover:text-white",
      )}
    >
      {paused ? (
        <Play className="size-4 translate-x-px" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
