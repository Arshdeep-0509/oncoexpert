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
  halo: "ov-halo",
  orbit: "ov-orbit",
  art: "ov-art",
  scan: "ov-scan",
  warm: "ov-warm",
  calm: "ov-calm",
  bead: "ov-bead",
  storyStep: "ov-storyStep",
  shine: "ov-shine",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
