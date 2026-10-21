"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { setLenis } from "@/lib/lenis";

/**
 * Lenis smooth scrolling for mouse/trackpad users.
 * Disabled on touch devices and when prefers-reduced-motion is set.
 */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    let lenis: Lenis | null = null;

    const sync = () => {
      const enable = !reduce.matches && !coarse.matches && navigator.maxTouchPoints === 0;
      if (enable && !lenis) {
        lenis = new Lenis({
          autoRaf: true,
          anchors: true,
          lerp: 0.09 /* anchor offset comes from scroll-margin-top */,
        });
        setLenis(lenis);
      } else if (!enable && lenis) {
        lenis.destroy();
        lenis = null;
        setLenis(null);
      }
    };

    sync();
    reduce.addEventListener("change", sync);
    coarse.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      coarse.removeEventListener("change", sync);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
