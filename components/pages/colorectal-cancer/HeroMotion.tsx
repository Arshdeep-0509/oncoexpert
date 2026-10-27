"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { introRemainingSeconds } from "@/lib/intro";

/** When the glowing dot sets off: the line has finished drawing (desktop timing). */
const DOT_AT_S = 2.4;

/**
 * Pause / play for the hero's loops (the travelling dot, the stat card float, the button shine).
 * - Sets data-paused on the hero section (hero.css) and pauses the colon SVG's own timeline
 *   (the dot is SVG animateMotion, which CSS cannot pause).
 * - Marks the hero data-offscreen while it is scrolled away, and pauses the SVG then too.
 * - Pins the hero's --intro for this page load (the known --intro-delay issue, docs/PROJECT.md).
 * - Starts the dot once the line has drawn, from 768px up and only with motion allowed; without
 *   JavaScript it never starts and the line stays still.
 * Hidden with reduced motion (nothing loops).
 */
export function HeroMotion({ pause, play }: { pause: string; play: string }) {
  const [paused, setPaused] = React.useState(false);
  const offscreen = React.useRef(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  const svgOf = (hero: Element | null | undefined) => hero?.querySelector<SVGSVGElement>("svg[data-colon]") ?? null;

  React.useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    if (document.querySelector(".preloader")) {
      hero.style.setProperty("--intro", getComputedStyle(hero).getPropertyValue("--intro-delay").trim() || "0s");
    }
    const tablet = window.matchMedia("(min-width: 768px)").matches;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!tablet || still) return;
    const delay = introRemainingSeconds() + DOT_AT_S;
    hero.querySelectorAll<SVGAnimationElement>("[data-dot-anim]").forEach((anim) => anim.beginElementAt(delay));
  }, []);

  React.useEffect(() => {
    const hero = ref.current?.closest("section");
    hero?.toggleAttribute("data-paused", paused);
    const svg = svgOf(hero);
    if (paused || offscreen.current) svg?.pauseAnimations();
    else svg?.unpauseAnimations();
  }, [paused]);

  React.useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    const io = new IntersectionObserver(([entry]) => {
      offscreen.current = !entry?.isIntersecting;
      hero.toggleAttribute("data-offscreen", offscreen.current);
      const svg = svgOf(hero);
      if (offscreen.current || hero.hasAttribute("data-paused")) svg?.pauseAnimations();
      else svg?.unpauseAnimations();
    });
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
