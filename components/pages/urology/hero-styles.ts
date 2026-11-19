import type * as React from "react";

/** Class names from hero.css (plain CSS, `uro-` prefix). */
export const styles = {
  hero: "uro-hero",
  step: "uro-step",
  fadeDown: "uro-fadeDown",
  fadeUp: "uro-fadeUp",
  pop: "uro-pop",
  fadeIn: "uro-fadeIn",
  stage: "uro-stage",
  portrait: "uro-portrait",
  ring: "uro-ring",
  tick: "uro-tick",
  chip: "uro-chip",
  chipFloat: "uro-chipFloat",
  live: "uro-live",
  flow: "uro-flow",
  flowBase: "uro-flowBase",
  flowDash: "uro-flowDash",
  drop: "uro-drop",
  phoneHidden: "uro-phoneHidden",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
