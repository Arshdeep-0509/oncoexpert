import type * as React from "react";

/** Class names from hero.css (plain CSS, `bloom-` prefix). */
export const styles = {
  hero: "bloom-hero",
  step: "bloom-step",
  blob: "bloom-blob",
  grain: "bloom-grain",
  lineMask: "bloom-lineMask",
  line: "bloom-line",
  gradientText: "bloom-gradientText",
  underline: "bloom-underline",
  halo: "bloom-halo",
  orbit: "bloom-orbit",
  orbitPath: "bloom-orbitPath",
  orbitDashed: "bloom-orbitDashed",
  orbitTurn: "bloom-orbitTurn",
  orbitTurnBack: "bloom-orbitTurnBack",
  portrait: "bloom-portrait",
  settle: "bloom-settle",
  breathe: "bloom-breathe",
  ribbonStroke: "bloom-ribbonStroke",
  shine: "bloom-shine",
  petal: "bloom-petal",
  petals: "bloom-petals",
  fadeIn: "bloom-fadeIn",
  fadeDown: "bloom-fadeDown",
  rise: "bloom-rise",
  fadeUp: "bloom-fadeUp",
  pop: "bloom-pop",
  ribbonFill: "bloom-ribbonFill",
  ribbonBreathe: "bloom-ribbonBreathe",
  drift1: "bloom-drift1",
  drift2: "bloom-drift2",
  drift3: "bloom-drift3",
  stage: "bloom-stage",
} as const;

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
export const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;
