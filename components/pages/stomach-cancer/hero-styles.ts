import type * as React from "react";

/** Class names from hero.css (plain CSS, `gastro-` prefix). */
export const styles = {
  hero: "gastro-hero",
  step: "gastro-step",
  fadeDown: "gastro-fadeDown",
  fadeUp: "gastro-fadeUp",
  pop: "gastro-pop",
  card: "gastro-card",
  line: "gastro-line",
  lineLong: "gastro-lineLong",
  fill: "gastro-fill",
  fold: "gastro-fold",
  flow: "gastro-flow",
  glow: "gastro-glow",
  specks: "gastro-specks",
  speck: "gastro-speck",
  phoneHidden: "gastro-phoneHidden",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
