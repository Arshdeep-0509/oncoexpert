import type * as React from "react";
import { organPreservation } from "@/content/pages/urology";
import { InView } from "@/components/ui/InView";

const { trimodal } = organPreservation;

/* Three arcs on one circle (r 66, pathLength 1 each), a 14° gap between them (round caps). */
const R = 66;
const GAP = 14;
const TONES = ["var(--accent)", "var(--accent-bright)", "var(--highlight)"] as const;

function arc(index: number) {
  const span = 120 - GAP;
  const a0 = ((-90 + index * 120 + GAP / 2) * Math.PI) / 180;
  const a1 = a0 + (span * Math.PI) / 180;
  const p = (a: number) => `${(90 + R * Math.cos(a)).toFixed(2)} ${(90 + R * Math.sin(a)).toFixed(2)}`;
  return `M${p(a0)} A${R} ${R} 0 0 1 ${p(a1)}`;
}

/**
 * The Bladder Sparing card's ring: trimodal therapy as three segments (surgery, chemotherapy,
 * radiation: the live words) that fill one after another once in view, "TMT" in the centre and a
 * legend beside it. One image for screen readers (its label from content).
 */
export function TrimodalRing() {
  return (
    <InView
      threshold={0.5}
      className="uro-pv-tmt flex items-center justify-center gap-6 md:flex-col md:gap-4 lg:flex-row lg:gap-6"
    >
      <svg role="img" aria-label={trimodal.a11y} viewBox="0 0 180 180" className="size-36 shrink-0 md:size-40">
        <circle cx="90" cy="90" r={R} fill="none" stroke="var(--line)" strokeWidth={12} />
        {trimodal.parts.map((part, i) => (
          <path
            key={part}
            d={arc(i)}
            pathLength={1}
            fill="none"
            stroke={TONES[i]}
            strokeWidth={12}
            strokeLinecap="round"
            className="uro-pv-arc"
            style={{ "--d": `${i * 0.45}s` } as React.CSSProperties}
          />
        ))}
        <text
          x="90"
          y="90"
          textAnchor="middle"
          dominantBaseline="central"
          className="fill-ink font-display text-[26px] font-bold tracking-[0.06em]"
        >
          {trimodal.centre}
        </text>
      </svg>
      <ul aria-hidden="true" className="grid gap-2.5">
        {trimodal.parts.map((part, i) => (
          <li
            key={part}
            className="uro-pv-legend flex items-center gap-2.5 text-base text-text"
            style={{ "--d": `${i * 0.45 + 0.3}s` } as React.CSSProperties}
          >
            <span className="size-3 shrink-0 rounded-full" style={{ background: TONES[i] }} />
            {part}
          </li>
        ))}
      </ul>
    </InView>
  );
}
