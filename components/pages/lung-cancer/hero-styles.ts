import type * as React from "react";

/** Class names from hero.css (plain CSS, `lu-` prefix). */
export const styles = {
  hero: "lu-hero",
  step: "lu-step",
  fadeDown: "lu-fadeDown",
  fadeUp: "lu-fadeUp",
  pop: "lu-pop",
  wordMask: "lu-wordMask",
  word: "lu-word",
  wordRise: "lu-wordRise",
  gradWord: "lu-gradWord",
  phrase: "lu-phrase",
  underline: "lu-underline",
  draw: "lu-draw",
  breathe: "lu-breathe",
  glow: "lu-glow",
  alveolus: "lu-alv",
  shine: "lu-shine",
  air: "lu-air",
  dot: "lu-dot",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

/** A stroke that draws from `d` for `dur` seconds (desktop timing). */
export const drawAt = (d: number, dur: number) => ({ "--d": `${d}s`, "--dur": `${dur}s` }) as React.CSSProperties;
