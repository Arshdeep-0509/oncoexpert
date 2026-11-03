import type * as React from "react";

/** Class names from hero.css (plain CSS, `ov-` prefix). */
export const styles = {
  hero: "ov-hero",
  step: "ov-step",
  fadeDown: "ov-fadeDown",
  fadeUp: "ov-fadeUp",
  wordMask: "ov-wordMask",
  word: "ov-word",
  wordRise: "ov-wordRise",
  gradWord: "ov-gradWord",
  phrase: "ov-phrase",
  underline: "ov-underline",
  line: "ov-line",
  shimmer: "ov-shimmer",
  uterus: "ov-uterus",
  tumour: "ov-tumour",
  ring: "ov-ring",
  waves: "ov-waves",
  wave: "ov-wave",
  glow: "ov-glow",
  check: "ov-check",
  checkMark: "ov-checkMark",
  storyStep: "ov-storyStep",
  seed: "ov-seed",
  shine: "ov-shine",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
