"use client";

import * as React from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useReducedMotion } from "motion/react";

type Options = {
  /** Autoplay interval. Default 7s. */
  delay?: number;
  /** Also pause while a finger is on the carousel (resumes on release). */
  pauseOnTouch?: boolean;
};

/**
 * Looping Embla carousel with autoplay that pauses on hover and focus, never runs with
 * reduced motion, and reports the selected snap (for dots).
 */
export function useAutoplayCarousel({ delay = 7000, pauseOnTouch = false }: Options = {}) {
  const reduce = useReducedMotion();
  const autoplay = React.useMemo(
    () => Autoplay({ delay, stopOnInteraction: false, stopOnMouseEnter: true, stopOnFocusIn: true, playOnInit: false }),
    [delay],
  );
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: "start" }, [autoplay]);
  const [selected, setSelected] = React.useState(0);
  const [snaps, setSnaps] = React.useState<number[]>([]);

  React.useEffect(() => {
    if (!embla) return;
    const onSelect = () => setSelected(embla.selectedScrollSnap());
    const onInit = () => {
      setSnaps(embla.scrollSnapList());
      onSelect();
    };
    onInit();
    embla.on("select", onSelect).on("reInit", onInit);
    return () => {
      embla.off("select", onSelect).off("reInit", onInit);
    };
  }, [embla]);

  React.useEffect(() => {
    if (!embla || !pauseOnTouch) return;
    const root = embla.rootNode();
    const pause = () => autoplay.stop();
    const resume = () => {
      if (!reduce) autoplay.play();
    };
    root.addEventListener("touchstart", pause, { passive: true });
    root.addEventListener("touchend", resume, { passive: true });
    return () => {
      root.removeEventListener("touchstart", pause);
      root.removeEventListener("touchend", resume);
    };
  }, [embla, autoplay, reduce, pauseOnTouch]);

  // Autoplay only when motion is allowed.
  React.useEffect(() => {
    if (!embla) return;
    if (reduce) autoplay.stop();
    else autoplay.play();
  }, [embla, reduce, autoplay]);

  return { emblaRef, embla, selected, snaps };
}
