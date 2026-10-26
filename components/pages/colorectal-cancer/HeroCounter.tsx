"use client";

import * as React from "react";
import { introRemainingSeconds } from "@/lib/intro";
import { Counter } from "@/components/ui/Counter";

/** The hero stat: counts up as its card pops in (after the intro, at ~1.5s; 1.1s on phones). */
export function HeroCounter({ value, suffix }: { value: number; suffix?: string }) {
  // Only used as an animation delay, never in the markup.
  const [delay] = React.useState(() => {
    if (typeof window === "undefined") return 0;
    const pace = window.matchMedia("(min-width: 768px)").matches ? 1 : 0.75;
    return introRemainingSeconds() + 1.5 * pace;
  });
  return <Counter value={value} suffix={suffix} delay={delay} reserveWidth />;
}
