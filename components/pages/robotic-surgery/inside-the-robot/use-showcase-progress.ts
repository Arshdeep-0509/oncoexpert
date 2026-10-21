"use client";

import * as React from "react";
import { useMotionValueEvent, useScroll } from "motion/react";
import { N } from "@/components/pages/robotic-surgery/inside-the-robot/geometry";

/** Scroll progress over a pinned track, plus the step it currently shows. */
export function useShowcaseProgress() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const [active, setActive] = React.useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    setActive((a) => (a === next ? a : next));
  });
  return { trackRef, scrollYProgress, active };
}
