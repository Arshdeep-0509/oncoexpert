import type * as React from "react";

/** Class names from hero.css (plain CSS, `ty-` prefix). */
export const styles = {
  hero: "ty-hero",
  step: "ty-step",
  fadeDown: "ty-fadeDown",
  fadeUp: "ty-fadeUp",
  pop: "ty-pop",
  fadeIn: "ty-fadeIn",
  wordMask: "ty-wordMask",
  word: "ty-word",
  wordRise: "ty-wordRise",
  gradWord: "ty-gradWord",
  phrase: "ty-phrase",
  underline: "ty-underline",
  isthmus: "ty-isthmus",
  lobe: "ty-lobe",
  wing: "ty-wing",
  breathe: "ty-breathe",
  photoCover: "ty-photoCover",
  float: "ty-float",
  shine: "ty-shine",
  flies: "ty-flies",
  fly: "ty-fly",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
