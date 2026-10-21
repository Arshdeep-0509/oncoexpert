"use client";

import * as React from "react";

/** True while the media query matches. false during server rendering and hydration. */
export function useMedia(query: string) {
  return React.useSyncExternalStore(
    (onChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onChange);
      return () => mq.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

export const MEDIA = {
  md: "(min-width: 768px)",
  lg: "(min-width: 1024px)",
} as const;
