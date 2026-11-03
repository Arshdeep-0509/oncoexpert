import type * as React from "react";

const LEFT =
  "M146 66 C130 62 114 52 110 34 C106 16 118 6 130 10 C142 14 146 34 148 56 C150 80 150 104 144 122 C138 138 120 144 112 130 C106 118 116 106 130 100";
const RIGHT =
  "M154 66 C170 62 186 52 190 34 C194 16 182 6 170 10 C158 14 154 34 152 56 C150 80 150 104 156 122 C162 138 180 144 188 130 C194 118 184 106 170 100";
const TUMOUR = [126, 70] as const;
/** The neck lymph nodes the late state reaches (left side), and one on the right that stays calm. */
const NODES = [
  [64, 150],
  [54, 196],
  [66, 238],
] as const;
const CALM = [
  [236, 150],
  [246, 196],
  [234, 238],
] as const;

/**
 * The thyroid and the neck lymph nodes (viewBox 300 × 260; early-detection.css, tye-). Early: a
 * small dot, contained in the lobe. Late: dots travel along the lymph paths to the nodes, which
 * light up (0.8s). `state` drives it through data-state.
 */
export function DetectionDiagram({ state, label }: { state: "early" | "late"; label: string }) {
  return (
    <svg
      viewBox="0 0 300 260"
      role="img"
      aria-label={label}
      data-state={state}
      className="tye-diagram size-full overflow-visible"
    >
      <g fill="none" style={{ stroke: "var(--line)" }} strokeWidth="2.5" strokeDasharray="4 6">
        {NODES.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M${TUMOUR[0]} ${TUMOUR[1]} C100 100 ${x + 20} ${y - 30} ${x} ${y}`} />
        ))}
        {CALM.map(([x, y]) => (
          <path key={`${x}-${y}`} d={`M174 70 C200 100 ${x - 20} ${y - 30} ${x} ${y}`} />
        ))}
      </g>
      <g fill="none" style={{ stroke: "var(--accent)" }} strokeWidth="3.5" strokeLinejoin="round">
        <path d={LEFT} style={{ fill: "var(--accent-soft)" }} fillOpacity="0.7" />
        <path d={RIGHT} style={{ fill: "var(--accent-soft)" }} fillOpacity="0.7" />
        <path d="M144 76 C148 80 152 80 156 76" strokeWidth="6" />
      </g>
      {[...NODES, ...CALM].map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <circle
            cx={x}
            cy={y}
            r="11"
            style={{ fill: "var(--surface)", stroke: "var(--accent-bright)" }}
            strokeWidth="2.5"
          />
          {i < NODES.length ? (
            <circle
              cx={x}
              cy={y}
              r="11"
              className="tye-lit"
              style={{ fill: "var(--blush)", "--k": i } as React.CSSProperties}
            />
          ) : null}
        </g>
      ))}
      {/* the early dot, with a calm ring around it */}
      <circle
        cx={TUMOUR[0]}
        cy={TUMOUR[1]}
        r="13"
        className="tye-ring"
        fill="none"
        style={{ stroke: "var(--highlight)" }}
        strokeWidth="2"
      />
      <circle cx={TUMOUR[0]} cy={TUMOUR[1]} r="6" style={{ fill: "var(--blush)" }} />
      {/* the travelling dots (late) */}
      {NODES.map(([x, y], k) => (
        <circle
          key={k}
          cx={x}
          cy={y}
          r="5"
          className="tye-travel"
          style={
            {
              fill: "var(--blush)",
              "--dx": `${TUMOUR[0] - x}px`,
              "--dy": `${TUMOUR[1] - y}px`,
              "--k": k,
            } as React.CSSProperties
          }
        />
      ))}
    </svg>
  );
}
