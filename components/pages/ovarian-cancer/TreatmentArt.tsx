import type * as React from "react";
import type { TreatmentKey } from "@/content/pages/ovarian-cancer";

/** Shared line style (viewBox 200 × 160). Colours through style: SVG attributes ignore var(). */
const line = {
  fill: "none",
  style: { stroke: "var(--accent)" },
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const soft = { ...line, style: { stroke: "var(--accent-bright)" }, strokeOpacity: 0.45 } as const;
const v = (vars: Record<string, string | number>) => vars as React.CSSProperties;

/** Cytoreduction: a ring sweeps around the organ and the tumour dots vanish one by one. */
function Cytoreduction() {
  const dots = [
    [78, 70],
    [112, 62],
    [128, 88],
    [96, 100],
    [70, 96],
    [118, 108],
  ];
  return (
    <>
      <ellipse {...soft} cx="100" cy="84" rx="58" ry="44" />
      {dots.map(([cx, cy], k) => (
        <circle key={k} cx={cx} cy={cy} r="6" className="ovt-dot" style={{ fill: "var(--gold)", ...v({ "--k": k }) }} />
      ))}
      <g className="ovt-sweep">
        <circle {...line} cx="100" cy="84" r="66" strokeDasharray="60 355" strokeWidth={4} />
      </g>
    </>
  );
}

/** HIPEC: warm droplets circulate from the pump through the abdomen; the thermometer fills. */
function Hipec({ replay }: { replay: number }) {
  return (
    <>
      <rect {...line} x="14" y="66" width="26" height="30" rx="5" />
      <path {...line} d="M40 76h18M40 86h18" />
      <circle {...soft} cx="100" cy="81" r="44" />
      <circle {...line} cx="100" cy="81" r="30" strokeDasharray="4 6" />
      <g key={replay} className="ovt-orbit">
        {[0, 90, 180, 270].map((deg) => (
          <circle
            key={deg}
            cx={100 + 30 * Math.cos((deg * Math.PI) / 180)}
            cy={81 + 30 * Math.sin((deg * Math.PI) / 180)}
            r="5.5"
            style={{ fill: "var(--gold)" }}
          />
        ))}
      </g>
      <rect {...line} x="168" y="40" width="12" height="70" rx="6" />
      <circle {...line} cx="174" cy="118" r="9" />
      <circle cx="174" cy="118" r="5.5" style={{ fill: "var(--gold)" }} />
      <rect
        key={`t${replay}`}
        x="171"
        y="48"
        width="6"
        height="66"
        rx="3"
        className="ovt-thermo"
        style={{ fill: "var(--gold)" }}
      />
    </>
  );
}

/** Fertility preservation: a shield closes around an ovary and a seedling grows. */
function Fertility() {
  return (
    <>
      <ellipse {...line} cx="100" cy="92" rx="22" ry="16" />
      <path {...line} d="M100 34c-14 8-30 12-46 12 0 40 16 72 46 86" className="ovt-shieldL" />
      <path {...line} d="M100 34c14 8 30 12 46 12 0 40-16 72-46 86" className="ovt-shieldR" />
      <path {...line} d="M100 92V64" pathLength={1} className="ovt-stem" />
      <path
        {...line}
        d="M100 70c0-8 6-12 14-12 0 8-6 12-14 12Z"
        className="ovt-leaf"
        style={{ ...line.style, ...v({ "--k": 0 }) }}
      />
      <path
        {...line}
        d="M100 76c0-7-5-11-12-11 0 7 5 11 12 11Z"
        className="ovt-leaf"
        style={{ ...line.style, ...v({ "--k": 1 }) }}
      />
    </>
  );
}

/** Chemotherapy: three drops fall from the drip bag. */
function Chemo() {
  return (
    <>
      <path {...line} d="M80 20h40v44a20 20 0 0 1-40 0Z" />
      <path {...soft} d="M86 46h28" />
      <path {...line} d="M100 84v52" />
      <path {...line} d="M84 140h32" />
      {[0, 1, 2].map((k) => (
        <path
          key={k}
          d="M100 94c-4 6-6 9-6 12a6 6 0 0 0 12 0c0-3-2-6-6-12Z"
          className="ovt-drop"
          style={{ fill: "var(--accent-bright)", ...v({ "--k": k }) }}
        />
      ))}
    </>
  );
}

/** Immunotherapy: immune cells dock on the tumour cell and the checkpoint lock opens. */
function Immuno() {
  // docked on the tumour cell's edge; each starts further out by (dx, dy)
  const cells = [
    [100, 37, 0, -26],
    [59, 107, -26, 18],
    [141, 107, 26, 18],
  ];
  return (
    <>
      <circle {...soft} cx="100" cy="84" r="34" />
      <circle cx="100" cy="84" r="34" style={{ fill: "var(--accent-soft)" }} fillOpacity="0.6" />
      {cells.map(([cx, cy, dx, dy], k) => (
        <g key={k} className="ovt-cell" style={v({ "--dx": `${dx}px`, "--dy": `${dy}px`, "--k": k })}>
          <circle {...line} cx={cx} cy={cy} r="13" />
          <circle cx={cx} cy={cy} r="5" style={{ fill: "var(--accent)" }} />
        </g>
      ))}
      <rect {...line} x="90" y="82" width="20" height="16" rx="3" />
      <path {...line} d="M94 82v-6a6 6 0 0 1 12 0v6" className="ovt-shackle" />
    </>
  );
}

/** One treatment's illustration (decorative). It plays when it mounts (once per open). */
export function TreatmentArt({ treatment, replay = 0 }: { treatment: TreatmentKey; replay?: number }) {
  return (
    <svg viewBox="0 0 200 160" aria-hidden="true" className="ovt-art size-full overflow-visible">
      {treatment === "cytoreduction" ? <Cytoreduction /> : null}
      {treatment === "hipec" ? <Hipec replay={replay} /> : null}
      {treatment === "fertility" ? <Fertility /> : null}
      {treatment === "chemo" ? <Chemo /> : null}
      {treatment === "immuno" ? <Immuno /> : null}
    </svg>
  );
}
