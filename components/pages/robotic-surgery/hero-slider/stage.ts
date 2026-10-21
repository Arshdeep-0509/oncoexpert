import type * as React from "react";
import { hero } from "@/content/pages/robotic-surgery";

// Hero slider timing and framing: every machine photo is shown at the same height, centred
// in a 4:3 stage. Pure values and functions (no React state).

export const SLIDE_SECONDS = 6;
export const CROSSFADE_SECONDS = 1.2;
export const KEN_BURNS_SCALE = 0.07;
export const IMAGE_SIZES = "(min-width: 1304px) 720px, (min-width: 1024px) 56vw, (min-width: 768px) 62vw, 100vw";

export type Slide = (typeof hero.slides)[number];

/** The stage is 4:3, so its height is 3/4 of its width. */
const STAGE_RATIO = 3 / 4;

/**
 * Same machine size on every slide, as large as possible: every machine gets the same
 * height (% of the stage height) and is centred. That height is the largest at which the
 * widest machine still fits in 86% of the stage width (the edge fade starts beyond that),
 * capped at 64% so tall machines keep breathing room above and below.
 */
const MAX_WIDTH = 86; // % of the stage width a machine may use
const MAX_HEIGHT = 64; // % of the stage height
const SUBJECT_HEIGHT = Math.min(
  MAX_HEIGHT,
  ...hero.slides
    .filter((sl) => sl.subject)
    .map((sl) => {
      const s = sl.subject!;
      const ratio = (s.w / s.h) * (sl.width / sl.height); // machine width : height, in pixels
      return MAX_WIDTH / (STAGE_RATIO * ratio);
    }),
);

export function photoBox(slide: Slide): React.CSSProperties {
  const s = slide.subject;
  if (!s) return { inset: 0 }; // real photographs simply cover the stage
  const heightPct = (SUBJECT_HEIGHT * 100) / s.h; // photo height, % of the stage height
  const widthPct = heightPct * STAGE_RATIO * (slide.width / slide.height); // % of the stage width
  return {
    width: `${widthPct}%`,
    height: `${heightPct}%`,
    left: `${50 - ((s.x + s.w / 2) / 100) * widthPct}%`,
    top: `${50 - ((s.y + s.h / 2) / 100) * heightPct}%`,
  };
}
