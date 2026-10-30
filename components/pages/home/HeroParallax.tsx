"use client";

import * as React from "react";
import { useMedia } from "@/lib/hooks/use-media";

/** Desktop with a mouse (fine pointer) and motion allowed. */
const QUERY = "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
const EASE = 0.08;

/**
 * Pointer parallax: every [data-depth="n"] layer in the hero moves up to n px against the
 * cursor, smoothed with requestAnimationFrame. The loop only runs while the layers are still
 * settling. Renders nothing. (Used by the colorectal hero; Home's photos sit flush against the
 * screen edge, where a shift would show the navy, so Home has none.)
 */
export function HeroParallax() {
  const enabled = useMedia(QUERY);

  React.useEffect(() => {
    const hero = document.getElementById("hero");
    if (!enabled || !hero) return;
    const layers = [...hero.querySelectorAll<HTMLElement>("[data-depth]")].map((el) => ({
      el,
      depth: Number(el.dataset.depth),
    }));
    let target = { x: 0, y: 0 };
    const now = { x: 0, y: 0 };
    let raf = 0;

    const frame = () => {
      now.x += (target.x - now.x) * EASE;
      now.y += (target.y - now.y) * EASE;
      for (const { el, depth } of layers) {
        el.style.translate = `${(-now.x * depth).toFixed(2)}px ${(-now.y * depth).toFixed(2)}px`;
      }
      const settling = Math.abs(target.x - now.x) > 0.002 || Math.abs(target.y - now.y) > 0.002;
      raf = settling ? requestAnimationFrame(frame) : 0;
    };
    const aim = (x: number, y: number) => {
      target = { x, y };
      if (!raf) raf = requestAnimationFrame(frame);
    };
    // -1 … 1 across the window: no layout reads.
    const onMove = (e: PointerEvent) => {
      if (e.pointerType === "mouse") aim((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1);
    };
    const onLeave = () => aim(0, 0);

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(raf);
      for (const { el } of layers) el.style.translate = "";
    };
  }, [enabled]);

  return null;
}
