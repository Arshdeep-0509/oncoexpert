import type * as React from "react";
import type { TestKey } from "@/content/pages/ovarian-cancer";

/** Shared line style (viewBox 120 × 90). Colours through style: SVG attributes ignore var(). */
const line = {
  fill: "none",
  style: { stroke: "var(--accent)" },
  strokeWidth: 2.25,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const soft = { ...line, style: { stroke: "var(--accent-bright)" }, strokeOpacity: 0.5 } as const;

/** CA-125: a blood tube that fills. */
function Tube() {
  return (
    <>
      <rect
        x="53"
        y="40"
        width="14"
        height="36"
        rx="7"
        className="ovd-fill"
        style={{ fill: "var(--accent-bright)" }}
        fillOpacity="0.55"
      />
      <path {...line} d="M50 10h20M52 10v60a8 8 0 0 0 16 0V10" />
      <path {...soft} d="M44 30h6M44 44h6M44 58h6" />
    </>
  );
}

/** Transvaginal ultrasound: the scan's fan, a sweep crossing it, the ovary outlined. */
function Ultrasound() {
  return (
    <>
      <path {...soft} d="M60 82 22 32a54 54 0 0 1 76 0Z" />
      <ellipse {...line} cx="62" cy="50" rx="11" ry="7.5" />
      <circle cx="60" cy="49" r="2.5" style={{ fill: "var(--highlight)" }} />
      <path {...line} d="M60 82V28" className="ovd-sweep" strokeOpacity="0.8" />
    </>
  );
}

/** CT: four slices fanning out of one. */
function Slices() {
  return (
    <>
      {[0, 1, 2, 3].map((k) => (
        <ellipse
          key={k}
          {...line}
          cx="60"
          cy="45"
          rx="34"
          ry="8"
          className="ovd-slice"
          style={{ ...line.style, "--y": `${(k - 1.5) * 15}px`, "--k": k } as React.CSSProperties}
        />
      ))}
    </>
  );
}

/** BRCA1/2: a double helix whose rungs draw in turn. */
function Helix() {
  return (
    <>
      <path {...line} d="M40 10c40 14 40 28 0 42s40 28 0 32" />
      <path {...line} d="M80 10c-40 14-40 28 0 42s-40 28 0 32" />
      {[17, 27, 37, 59, 69, 79].map((y, k) => (
        <path
          key={y}
          {...soft}
          d={`M${y < 45 ? 46 + Math.abs(31 - y) * 0.6 : 46 + Math.abs(73 - y) * 0.6} ${y}H${y < 45 ? 74 - Math.abs(31 - y) * 0.6 : 74 - Math.abs(73 - y) * 0.6}`}
          pathLength={1}
          className="ovd-rung"
          style={{ ...soft.style, "--k": k } as React.CSSProperties}
        />
      ))}
    </>
  );
}

const art: Record<TestKey, () => React.JSX.Element> = { ca125: Tube, tvus: Ultrasound, ct: Slices, brca: Helix };

/** One test's illustration (decorative; the tile names the test). */
export function TrayArt({ test }: { test: TestKey }) {
  const Art = art[test];
  return (
    <svg viewBox="0 0 120 90" aria-hidden="true" className="ovd-art h-20 w-auto overflow-visible md:h-24">
      <Art />
    </svg>
  );
}
