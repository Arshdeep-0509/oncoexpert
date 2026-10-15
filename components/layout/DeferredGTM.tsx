"use client";

import { useEffect, useState } from "react";
import { GoogleTagManager } from "@next/third-parties/google";

const INTERACTION_EVENTS = ["pointerdown", "keydown", "scroll", "touchstart"] as const;
const FALLBACK_MS = 12000;

/**
 * Google Tag Manager, kept off the critical path: it loads on the visitor's first
 * interaction or after 12s, whichever comes first. The container (incl. its ads tag)
 * costs ~0.5s of main-thread time on a mid-range phone, which otherwise delays the
 * hero from painting. Events pushed earlier wait in window.dataLayer and are
 * processed as soon as GTM starts.
 */
export function DeferredGTM({ gtmId }: { gtmId: string }) {
  const [load, setLoad] = useState(false);

  useEffect(() => {
    const start = () => setLoad(true);
    const timer = window.setTimeout(start, FALLBACK_MS);
    INTERACTION_EVENTS.forEach((e) => window.addEventListener(e, start, { once: true, passive: true }));
    return () => {
      window.clearTimeout(timer);
      INTERACTION_EVENTS.forEach((e) => window.removeEventListener(e, start));
    };
  }, []);

  return load ? <GoogleTagManager gtmId={gtmId} /> : null;
}
