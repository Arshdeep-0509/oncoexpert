"use client";

import * as React from "react";
import { introRemainingSeconds } from "@/lib/intro";
import { Counter } from "@/components/ui/Counter";

/**
 * Hero stat number: counts up over 1.4s from `at` seconds after the intro (when its chip pops
 * in). Once that moment has passed the delay drops to 0, so a chip first seen later (phones:
 * below the fold) counts as soon as it scrolls into view.
 */
export function HeroCounter({ value, suffix, at }: { value: number; suffix?: string; at: number }) {
  // Only used as an animation delay, never in the markup.
  const [delay, setDelay] = React.useState(() => (typeof window === "undefined" ? 0 : introRemainingSeconds() + at));
  React.useEffect(() => {
    if (delay <= 0) return;
    const t = window.setTimeout(() => setDelay(0), delay * 1000);
    return () => window.clearTimeout(t);
  }, [delay]);

  return <Counter value={value} suffix={suffix} delay={delay} duration={1.4} reserveWidth />;
}
