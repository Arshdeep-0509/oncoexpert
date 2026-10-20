"use client";

import * as React from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
import { cn } from "@/lib/utils";

type ScrollFillLineProps = {
  /** Position/size of the track, e.g. "absolute top-5 bottom-5 left-[19px]". */
  className?: string;
};

/**
 * A 2px vertical timeline track whose accent fill grows (scaleY, transform only) as the
 * timeline scrolls through the middle of the screen. Reduced motion: shown full.
 */
export function ScrollFillLine({ className }: ScrollFillLineProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 65%", "end 55%"] });

  return (
    <div ref={ref} aria-hidden="true" className={cn("w-0.5 overflow-hidden rounded-full bg-line", className)}>
      <motion.div className="h-full w-full origin-top bg-accent" style={{ scaleY: reduce ? 1 : scrollYProgress }} />
    </div>
  );
}
