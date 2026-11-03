"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { MEDIA, useMedia } from "@/lib/hooks/use-media";

// Loaded only on desktop with motion allowed, once the browser is idle: phones never download it.
const AirLayer = dynamic(() => import("@/components/pages/lung-cancer/HeroAirLayer").then((m) => m.HeroAirLayer), {
  ssr: false,
});

/** ~18 small dots of air rising through the hero (desktop only, decorative). */
export function HeroAir() {
  const desktop = useMedia(MEDIA.lg);
  const reduce = useReducedMotion();
  const [idle, setIdle] = React.useState(false);

  React.useEffect(() => {
    if (!desktop || reduce) return;
    const ric = window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 1200));
    const cancel = window.cancelIdleCallback ?? window.clearTimeout;
    const id = ric(() => setIdle(true), { timeout: 4000 });
    return () => cancel(id);
  }, [desktop, reduce]);

  return desktop && !reduce && idle ? <AirLayer /> : null;
}
