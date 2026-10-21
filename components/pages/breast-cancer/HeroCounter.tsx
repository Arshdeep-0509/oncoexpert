"use client";

import * as React from "react";
import { introRemainingSeconds } from "@/lib/intro";
import { Counter } from "@/components/ui/Counter";

/** Hero stat number: counts up when the stat cards pop in (after the intro, at ~1.0s; 0.75s on phones). */
export function HeroCounter({ value, prefix, suffix }: { value: number; prefix?: string; suffix?: string }) {
  // Only used as an animation delay, never in the markup.
  const [delay] = React.useState(() => {
    if (typeof window === "undefined") return 0;
    const pace = window.matchMedia("(min-width: 768px)").matches ? 1 : 0.75;
    return introRemainingSeconds() + 1 * pace;
  });
  return <Counter value={value} prefix={prefix} suffix={suffix} delay={delay} reserveWidth />;
}
