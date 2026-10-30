"use client";

import * as React from "react";
import { introRemainingSeconds } from "@/lib/intro";
import { Counter } from "@/components/ui/Counter";

/**
 * A ring chip's number (DoctorRing): counts up over 1.4s, `at` seconds after it comes on screen
 * (when its chip pops in). In a hero (`afterIntro`) the moment counts from the end of the intro;
 * once it has passed, the delay drops to 0, so a chip first seen later (phones: below the fold)
 * counts as soon as it scrolls into view.
 */
export function RingCounter({
  value,
  suffix,
  at,
  afterIntro = false,
}: {
  value: number;
  suffix?: string;
  at: number;
  afterIntro?: boolean;
}) {
  // Only used as an animation delay, never in the markup.
  const [delay, setDelay] = React.useState(() =>
    afterIntro && typeof window !== "undefined" ? introRemainingSeconds() + at : at,
  );
  React.useEffect(() => {
    if (!afterIntro || delay <= 0) return;
    const t = window.setTimeout(() => setDelay(0), delay * 1000);
    return () => window.clearTimeout(t);
  }, [afterIntro, delay]);

  return <Counter value={value} suffix={suffix} delay={delay} duration={1.4} reserveWidth />;
}
