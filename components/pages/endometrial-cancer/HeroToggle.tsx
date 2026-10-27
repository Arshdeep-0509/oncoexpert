"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";

/**
 * Pause / play for the hero's loops (the petal bloom, the chips' float): sets data-paused on the
 * hero section, which hero.css reads. It also marks the hero data-offscreen while it is scrolled
 * away and pins its --intro for this page load (the known --intro-delay issue, docs/PROJECT.md).
 * A 48px target. Hidden with reduced motion (nothing loops).
 */
export function HeroToggle({ pause, play }: { pause: string; play: string }) {
  const [paused, setPaused] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

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
    const io = new IntersectionObserver(([entry]) => hero.toggleAttribute("data-offscreen", !entry?.isIntersecting));
    io.observe(hero);
    return () => io.disconnect();
  }, []);

  return (
    <button
      ref={ref}
      type="button"
      onClick={() => setPaused((p) => !p)}
      aria-label={paused ? play : pause}
      className="grid size-12 shrink-0 place-items-center rounded-full bg-white/80 text-muted ring-1 shadow-soft-sm ring-line transition-colors hover:bg-accent-soft hover:text-accent motion-reduce:hidden"
    >
      {paused ? (
        <Play className="size-4 translate-x-px" strokeWidth={1.75} aria-hidden="true" />
      ) : (
        <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
      )}
    </button>
  );
}
