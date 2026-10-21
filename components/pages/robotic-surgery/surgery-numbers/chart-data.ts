import type * as React from "react";
import { surgeryNumbers, surgeryTotal, type SurgeryKey } from "@/content/pages/robotic-surgery";

// Data behind the surgery-numbers chart: totals, colours, donut segments and the
// tile ↔ segment linking. No React state here.

export const { counts, a11y } = surgeryNumbers;
export const total = surgeryTotal(counts);
export const max = Math.max(...counts.map((c) => c.count));

/** Shades from --primary to --glow in order; "Others" is slate. */
export const colorFor = (key: SurgeryKey) => {
  if (key === "others") return "var(--slate)";
  const ranked = counts.filter((c) => c.key !== "others");
  const t = ranked.length > 1 ? ranked.findIndex((c) => c.key === key) / (ranked.length - 1) : 1;
  return `color-mix(in oklab, var(--primary) ${Math.round((1 - t) * 100)}%, var(--glow))`;
};

/**
 * Tile ↔ segment linking: hover with a mouse, tap on touch screens (tap again to clear).
 * Touch fires enter/leave around every tap, so those only count for mouse pointers.
 */
export function linkHandlers(setActive: React.Dispatch<React.SetStateAction<SurgeryKey | null>>) {
  return (key: SurgeryKey) => ({
    onPointerEnter: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(key);
    },
    onPointerLeave: (e: React.PointerEvent) => {
      if (e.pointerType === "mouse") setActive(null);
    },
    onClick: () => setActive((a) => (a === key ? null : key)),
  });
}

// Donut geometry (units: % of circumference via pathLength=100).
const GAP = 0.7;
export const segments = counts.reduce<{ key: SurgeryKey; start: number; length: number }[]>((acc, c) => {
  const start = acc.length ? acc[acc.length - 1].start + acc[acc.length - 1].length + GAP : 0;
  acc.push({ key: c.key, start, length: (c.count / total) * 100 - GAP });
  return acc;
}, []);

export type Linker = ReturnType<typeof linkHandlers>;
