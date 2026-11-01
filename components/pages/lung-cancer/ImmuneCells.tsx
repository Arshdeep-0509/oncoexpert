import type * as React from "react";
import { InView } from "@/components/ui/InView";

/** Eight immune cells start outside the frame and gather on a ring around the tumour. */
const CELLS = Array.from({ length: 8 }, (_, i) => {
  const a = (i / 8) * Math.PI * 2 - Math.PI / 2;
  const ring = 74;
  const out = 150;
  return {
    cx: 150 + Math.cos(a) * ring,
    cy: 150 + Math.sin(a) * ring,
    // the start, relative to the resting place
    dx: Math.round(Math.cos(a) * (out - ring)),
    dy: Math.round(Math.sin(a) * (out - ring)),
  };
});

/**
 * The one-time "immune cells encircle the tumour" sequence (stage-iv.css, lu-iv-): once in view,
 * the cells travel in over ~2.6s, one after another, and the tumour settles smaller and dimmer by
 * 4s. It plays once; it never loops. Reduced motion (and the default): the final picture.
 */
export function ImmuneCells({ label }: { label: string }) {
  return (
    <InView
      threshold={0.5}
      className="lu-iv-cells relative mx-auto aspect-square w-full max-w-[300px] md:max-w-[380px] lg:max-w-[460px]"
    >
      <svg viewBox="40 40 220 220" role="img" aria-label={label} className="size-full overflow-visible">
        <circle
          cx="150"
          cy="150"
          r="74"
          fill="none"
          style={{ stroke: "var(--accent-glow)" }}
          strokeOpacity="0.25"
          strokeDasharray="3 7"
        />
        <g className="lu-iv-tumour">
          <path
            d="M150 118 C168 116 184 130 182 148 C186 166 170 184 152 182 C134 186 116 172 118 152 C114 134 132 120 150 118 Z"
            style={{ fill: "var(--accent-glow)" }}
            fillOpacity="0.28"
          />
          <circle cx="146" cy="146" r="9" style={{ fill: "var(--accent-glow)" }} fillOpacity="0.35" />
          <circle cx="160" cy="160" r="6" style={{ fill: "var(--accent-glow)" }} fillOpacity="0.3" />
        </g>
        {CELLS.map((c, i) => (
          <g
            key={i}
            className="lu-iv-cell"
            style={{ "--dx": `${c.dx}px`, "--dy": `${c.dy}px`, "--i": i } as React.CSSProperties}
          >
            <circle cx={c.cx} cy={c.cy} r="15" style={{ fill: "var(--white)" }} fillOpacity="0.92" />
            <circle cx={c.cx} cy={c.cy} r="6" style={{ fill: "var(--highlight)" }} />
            <circle
              cx={c.cx}
              cy={c.cy}
              r="19"
              fill="none"
              style={{ stroke: "var(--accent-glow)" }}
              strokeOpacity="0.5"
              strokeWidth="2"
            />
          </g>
        ))}
      </svg>
    </InView>
  );
}
