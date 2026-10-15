"use client";

import * as React from "react";
import { animate, useInView, useReducedMotion } from "motion/react";
import { cn } from "@/lib/utils";

type CounterProps = {
  value: number;
  /** Text before/after the number, e.g. "+" or "%". Pass from /content. */
  prefix?: string;
  suffix?: string;
  className?: string;
  /** Locale used for thousands separators. */
  locale?: string;
};

/**
 * Counts up from 0 to `value` over 1.6s (ease-out) when scrolled into view.
 * The server renders the final value so the number is always in the HTML;
 * with prefers-reduced-motion it simply stays there.
 */
export function Counter({ value, prefix = "", suffix = "", className, locale = "en-IN" }: CounterProps) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduce = useReducedMotion();
  const format = React.useCallback((n: number) => Math.round(n).toLocaleString(locale), [locale]);
  const armed = React.useRef(false);

  // Before the counter is seen, reset it to 0 so the count-up starts from zero.
  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduce || inView || armed.current) return;
    armed.current = true;
    el.textContent = format(0);
  }, [reduce, inView, format]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce || !armed.current) {
      el.textContent = format(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (n) => {
        el.textContent = format(n);
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, format]);

  return (
    <span className={cn("tabular-nums", className)}>
      {prefix}
      <span ref={ref}>{format(value)}</span>
      {suffix}
    </span>
  );
}
