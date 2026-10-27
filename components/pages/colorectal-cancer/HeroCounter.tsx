"use client";

import * as React from "react";
import { introRemainingSeconds } from "@/lib/intro";
import { Counter } from "@/components/ui/Counter";

/**
 * The hero stat: counts up as its card pops in (after the intro, at ~1.5s). Phones: the card is
 * below the first screen, so it counts as soon as it scrolls into view.
 */
export function HeroCounter({ value, suffix }: { value: number; suffix?: string }) {
  // Only used as an animation delay, never in the markup.
  const [delay] = React.useState(() => {
    if (typeof window === "undefined") return 0;
    if (!window.matchMedia("(min-width: 768px)").matches) return 0.3;
    return introRemainingSeconds() + 1.5;
  });
  return <Counter value={value} suffix={suffix} delay={delay} reserveWidth />;
}
