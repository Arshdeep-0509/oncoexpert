"use client";

import * as React from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";

export const EASE_OUT_EXPO = [0.22, 1, 0.36, 1] as const;

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  // Only set `delay` when given: an explicit delay would override the parent's stagger offset.
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_OUT_EXPO, ...(delay ? { delay } : {}) },
  }),
};

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Delay before the reveal starts, in seconds. */
  delay?: number;
  /**
   * Reveal each direct child in turn, 0.08s apart.
   * Each child is wrapped in a div, so use it on grids/lists.
   */
  stagger?: boolean;
  /** Class applied to each stagger wrapper (e.g. to keep grid sizing). */
  itemClassName?: string;
};

/**
 * Fades in and rises 24px → 0 over 0.7s, once, when 20% visible.
 * With prefers-reduced-motion the final state renders immediately.
 */
export function Reveal({ children, className, delay = 0, stagger = false, itemClassName }: RevealProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return stagger ? (
      <div className={className}>
        {React.Children.map(children, (child) => (
          <div className={itemClassName}>{child}</div>
        ))}
      </div>
    ) : (
      <div className={className}>{children}</div>
    );
  }

  if (!stagger) {
    return (
      <motion.div
        className={className}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={item}
        custom={delay}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08, delayChildren: delay } } }}
    >
      {React.Children.map(children, (child) => (
        <motion.div className={itemClassName} variants={item}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
