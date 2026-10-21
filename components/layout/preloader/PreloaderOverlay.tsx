"use client";

import * as React from "react";
import { getLenis } from "@/lib/lenis";
import { INTRO_TOTAL_MS, introDisabled } from "@/lib/intro";
import { EXIT, anim } from "@/components/layout/preloader/preloader-anim";

/**
 * The full-screen white overlay around the badge. It locks scrolling while the intro
 * plays and removes itself when the exit animation ends (or at once if the page turns
 * the intro off).
 */
export function PreloaderOverlay({ children }: { children: React.ReactNode }) {
  const [gone, setGone] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const html = document.documentElement;
    if (introDisabled()) {
      const id = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(id);
    }
    // Keep the page still while the intro plays; release it when the exit fade ends
    // (the CSS animation is the clock; a timer is only a safety net).
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    getLenis()?.stop();
    const finish = () => {
      html.style.overflow = previous;
      getLenis()?.start();
      setGone(true);
    };
    const el = overlayRef.current;
    const onEnd = (e: AnimationEvent) => {
      if (e.target === el && e.animationName === "pl-exit") finish();
    };
    // If the page hydrated late (slow first load), the exit may already be over:
    // the animationend event was missed, so finish now.
    const exit = el?.getAnimations().find((a) => (a as CSSAnimation).animationName === "pl-exit");
    if (exit?.playState === "finished") {
      const id = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(id);
    }
    el?.addEventListener("animationend", onEnd);
    // Safety net, measured from page start (not from hydration).
    const safety = window.setTimeout(finish, Math.max(0, INTRO_TOTAL_MS - performance.now()) + 400);
    return () => {
      el?.removeEventListener("animationend", onEnd);
      window.clearTimeout(safety);
      html.style.overflow = previous;
    };
  }, []);

  if (gone) return null;

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      // 100vw/100dvh (not inset-0) so it is centred on the whole screen even while a
      // desktop scrollbar is still showing, and never shifts when scrolling locks.
      className="preloader fixed top-0 left-0 z-[200] grid h-dvh w-screen place-items-center bg-white font-brand-text"
      style={{ animation: anim("pl-exit", 0.6, EXIT, "cubic-bezier(0.4, 0, 0.2, 1)") }}
    >
      {children}
    </div>
  );
}
