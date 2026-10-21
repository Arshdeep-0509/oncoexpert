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
  /** Seconds to wait after coming into view before counting (e.g. for an entrance animation). */
  delay?: number;
  /**
   * Reserve the final value's width while counting, so the suffix and anything beside the
   * number never move (no layout shift).
   */
  reserveWidth?: boolean;
};

/**
 * Counts up from 0 to `value` over 1.6s (ease-out) when scrolled into view.
 * The server renders the final value so the number is always in the HTML;
 * with prefers-reduced-motion it simply stays there.
 */
/** Updates the number in place (same text node), so the count-up never registers as a layout shift. */
function setText(el: HTMLElement, text: string) {
  const node = el.firstChild;
  if (node && node.nodeType === Node.TEXT_NODE) (node as Text).data = text;
  else el.textContent = text;
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
  className,
  locale = "en-IN",
  delay = 0,
  reserveWidth = false,
}: CounterProps) {
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
    setText(el, format(0));
  }, [reduce, inView, format]);

  React.useEffect(() => {
    const el = ref.current;
    if (!el || !inView) return;
    if (reduce || !armed.current) {
      setText(el, format(value));
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: "easeOut",
      onUpdate: (n) => {
        setText(el, format(n));
      },
    });
    return () => controls.stop();
  }, [inView, reduce, value, format, delay]);

  return (
    <span className={cn("tabular-nums", reserveWidth && "whitespace-nowrap", className)}>
      {prefix}
      {reserveWidth ? (
        // The invisible final value holds the layout; the counting number sits on top of it,
        // anchored at the same start, so neither it nor anything after it ever moves.
        // The holder is CSS generated content: it takes space but is not part of the page text.
        <span className="relative inline-block">
          <span aria-hidden="true" data-value={format(value)} className="invisible before:content-[attr(data-value)]" />
          <span ref={ref} className="absolute inset-y-0 left-0">
            {format(value)}
          </span>
        </span>
      ) : (
        <span ref={ref}>{format(value)}</span>
      )}
      {suffix}
    </span>
  );
}
