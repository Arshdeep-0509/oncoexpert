"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";

const COUNT_S = 1.4;

/**
 * A range shown as one big number, e.g. "30–40%": the first number counts up from 0 when it
 * comes into view, then "–40%" fades in. Its space is always reserved (opacity only, and the
 * counter keeps its final width), so nothing moves. Reduced motion: shown at once.
 */
export function ValueRange({
  from,
  to,
  suffix,
  className,
}: {
  from: number;
  to: number;
  suffix: string;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <span ref={ref} className={cn("inline-flex items-baseline whitespace-nowrap", className)}>
      <Counter value={from} duration={COUNT_S} reserveWidth />
      {/* The range dash and the upper bound, e.g. "–40%" */}
      <span
        className={cn("motion-safe:transition-opacity motion-safe:duration-700", !inView && "motion-safe:opacity-0")}
        style={inView ? { transitionDelay: `${COUNT_S}s` } : undefined}
      >
        –{to}
        {suffix}
      </span>
    </span>
  );
}
