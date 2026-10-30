"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/home/hero-styles";

/**
 * Pause / play for every ambient loop in the hero (photo slider, marquee, ticker, glows,
 * particles, shine): sets data-paused on the hero section, which hero.css and the ticker read.
 * It also marks the hero data-offscreen while it is scrolled away, so the loops stop costing
 * anything, and sets the entrance timing (after the intro, or quick without one). Hidden with
 * reduced motion (nothing moves).
 */
export function HeroMotionToggle({ pause, play }: { pause: string; play: string }) {
  const [paused, setPaused] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  // The entrance timing for this showing of the hero. On a full load the intro preloader plays
  // first: pin --intro to it (--intro-delay comes from `.preloader ~ [data-theme]`, globals.css,
  // which stops matching once the overlay unmounts at the end of its fade: every entrance still
  // running would then jump to its end). With no overlay, after in-site navigation or when Home
  // is shown again from the router's cache (Cache Components keep a visited page in the document
  // with display: none, and its animations restart when it is shown), there is nothing to wait
  // for: --intro 0s (never the pin from an earlier load) and data-quick, a faster entrance
  // (hero.css), so the text is there at once. A layout effect: it applies before the hero is
  // painted, and it runs again each time the page is shown.
  React.useLayoutEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    const intro = document.querySelector(".preloader");
    hero.style.setProperty(
      "--intro",
      intro ? getComputedStyle(hero).getPropertyValue("--intro-delay").trim() || "0s" : "0s",
    );
    hero.toggleAttribute("data-quick", !intro);
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
