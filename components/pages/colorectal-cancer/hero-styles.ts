import type * as React from "react";

/** Class names from hero.css (plain CSS, `cx-` prefix). */
export const styles = {
  hero: "cx-hero",
  step: "cx-step",
  fadeDown: "cx-fadeDown",
  fadeUp: "cx-fadeUp",
  pop: "cx-pop",
  wordMask: "cx-wordMask",
  word: "cx-word",
  wordRise: "cx-wordRise",
  gradWord: "cx-gradWord",
  phrase: "cx-phrase",
  underline: "cx-underline",
  float: "cx-float",
  shine: "cx-shine",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
