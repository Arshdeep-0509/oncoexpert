import type * as React from "react";

/** Class names from hero.css (plain CSS, `ex-` prefix). */
export const styles = {
  hero: "ex-hero",
  step: "ex-step",
  fadeDown: "ex-fadeDown",
  fadeUp: "ex-fadeUp",
  pop: "ex-pop",
  wordMask: "ex-wordMask",
  word: "ex-word",
  wordRise: "ex-wordRise",
  gradWord: "ex-gradWord",
  line: "ex-line",
  bloom: "ex-bloom",
  float: "ex-float",
  chips: "ex-chips",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
