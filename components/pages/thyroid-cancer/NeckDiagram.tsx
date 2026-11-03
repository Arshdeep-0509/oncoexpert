import type * as React from "react";
import type { AnatomyKey } from "@/content/pages/thyroid-cancer";

const LEFT_LOBE =
  "M146 166 C130 162 114 150 110 128 C106 106 116 92 128 94 C140 96 146 120 148 146 C150 172 150 200 144 222 C138 240 120 246 112 232 C106 220 116 206 130 200";
const RIGHT_LOBE =
  "M154 166 C170 162 186 150 190 128 C194 106 184 92 172 94 C160 96 154 120 152 146 C150 172 150 200 156 222 C162 240 180 246 188 232 C194 220 184 206 170 200";
const PARATHYROIDS = [
  [116, 120],
  [118, 214],
  [184, 120],
  [182, 214],
] as const;

/**
 * The front of the neck (viewBox 300 × 320): the larynx and trachea, the thyroid over it, the two
 * recurrent laryngeal (voice) nerves running up behind it and four parathyroids behind the lobes.
 * The chosen structure is highlighted and the rest dimmed (understanding.css, tyu-); the voice
 * nerve plays a soft sound wave once, the parathyroids pulse once. Decorative (the text names it).
 */
export function NeckDiagram({ selected, label }: { selected: AnatomyKey; label: string }) {
  return (
    <svg
      viewBox="0 0 300 320"
      role="img"
      aria-label={label}
      data-selected={selected}
      className="tyu-diagram size-full overflow-visible"
    >
      {/* neck outline */}
      <path
        d="M78 0 C88 110 80 220 50 320 M222 0 C212 110 220 220 250 320"
        fill="none"
        style={{ stroke: "var(--line)" }}
        strokeWidth="3"
      />
      {/* larynx and trachea */}
      <g className="tyu-airway" fill="none" style={{ stroke: "var(--muted)" }} strokeWidth="2.5" strokeOpacity="0.55">
        <path d="M128 20 C126 44 132 62 140 72 L160 72 C168 62 174 44 172 20" />
        <path d="M138 72 V320 M162 72 V320" />
        {[96, 116, 136, 156, 176, 196, 216, 236, 256, 276, 296].map((y) => (
          <path key={y} d={`M138 ${y} H162`} strokeWidth="1.5" />
        ))}
      </g>
      {/* voice nerves */}
      <g
        data-key="nerve"
        className="tyu-part"
        fill="none"
        style={{ stroke: "var(--highlight)" }}
        strokeWidth="3"
        strokeLinecap="round"
      >
        <path d="M128 320 C126 260 124 190 130 130 C134 100 136 84 140 70" />
        <path d="M172 320 C174 260 176 190 170 130 C166 100 164 84 160 70" />
        <path d="M184 46 C196 38 204 54 216 46 S236 38 248 46" className="tyu-wave" pathLength={1} />
      </g>
      {/* thyroid */}
      <g
        data-key="thyroid"
        className="tyu-part"
        fill="none"
        style={{ stroke: "var(--accent)" }}
        strokeWidth="3.5"
        strokeLinejoin="round"
      >
        <path d={LEFT_LOBE} style={{ fill: "var(--accent-soft)" }} fillOpacity="0.7" />
        <path d={RIGHT_LOBE} style={{ fill: "var(--accent-soft)" }} fillOpacity="0.7" />
        <path d="M144 176 C148 180 152 180 156 176" strokeWidth="6" />
      </g>
      {/* parathyroids */}
      <g data-key="parathyroids" className="tyu-part">
        {PARATHYROIDS.map(([cx, cy], k) => (
          <circle
            key={k}
            cx={cx}
            cy={cy}
            r="7"
            className="tyu-para"
            style={{ fill: "var(--blush)", "--k": k } as React.CSSProperties}
          />
        ))}
      </g>
    </svg>
  );
}
