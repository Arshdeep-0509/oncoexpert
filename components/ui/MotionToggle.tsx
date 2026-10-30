"use client";

import * as React from "react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Pause / play for a hero's loops: sets data-paused on the enclosing <section>, which the page's
 * CSS reads. It also marks the section data-offscreen while it is scrolled away, and pins its
 * --intro for this page load (see the known issue in docs/PROJECT.md: --intro-delay drops to 0
 * when the preloader unmounts). Hidden with reduced motion (nothing moves). Used by the booking
 * and about heroes.
 */
export function MotionToggle({ pause, play, onDark = false }: { pause: string; play: string; onDark?: boolean }) {
  const [paused, setPaused] = React.useState(false);
  const ref = React.useRef<HTMLButtonElement>(null);

  // A full load: pin --intro to the intro. No overlay (in-site navigation, or the page shown
  // again from the router's cache, where its animations restart): 0s, never an earlier pin.
  React.useEffect(() => {
    const hero = ref.current?.closest("section");
    if (!hero) return;
    const intro = document.querySelector(".preloader");
    hero.style.setProperty(
      "--intro",
      intro ? getComputedStyle(hero).getPropertyValue("--intro-delay").trim() || "0s" : "0s",
    );
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
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full ring-1 transition-colors motion-reduce:hidden",
        onDark
          ? "text-white/80 ring-white/25 hover:bg-white/10 hover:text-white"
          : "text-muted ring-line hover:bg-accent-soft hover:text-accent",
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
