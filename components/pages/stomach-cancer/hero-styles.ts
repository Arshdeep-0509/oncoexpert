import type * as React from "react";

/** Class names from hero.css (plain CSS, `gastro-` prefix). */
export const styles = {
  hero: "gastro-hero",
  step: "gastro-step",
  fadeDown: "gastro-fadeDown",
  fadeUp: "gastro-fadeUp",
  pop: "gastro-pop",
  photo: "gastro-photo",
  card: "gastro-card",
  steam: "gastro-steam",
  curl: "gastro-curl",
  specks: "gastro-specks",
  speck: "gastro-speck",
  phoneHidden: "gastro-phoneHidden",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
