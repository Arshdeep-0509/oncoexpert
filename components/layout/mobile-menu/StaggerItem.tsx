"use client";

import type * as React from "react";
import { motion, type Variants } from "motion/react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type StaggerItemProps = { i: number; step: number; reduce: boolean | null; children: React.ReactNode };

/** Menu rows slide in `step` seconds apart; no motion with prefers-reduced-motion. */
export function StaggerItem({ i, step, reduce, children }: StaggerItemProps) {
  if (reduce) return <li>{children}</li>;
  const item: Variants = {
    hidden: { opacity: 0, x: 16 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO, delay: 0.12 + i * step } },
  };
  return (
    <motion.li variants={item} initial="hidden" animate="visible">
      {children}
    </motion.li>
  );
}
