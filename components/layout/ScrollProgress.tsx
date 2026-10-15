"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/** 2px reading-progress line (primary → glow) along the bottom edge of the navbar. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const reduce = useReducedMotion();
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -bottom-px h-0.5 origin-left bg-linear-to-r from-primary to-glow"
      style={{ scaleX: reduce ? scrollYProgress : smooth }}
    />
  );
}
