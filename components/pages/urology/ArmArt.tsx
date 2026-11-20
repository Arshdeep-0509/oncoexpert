import type * as React from "react";
import { cn } from "@/lib/utils";

/*
 * A robotic arm in line art (420 × 360): base, column, upper arm, forearm, the wrist joint and the
 * instrument with its jaws, with dashed arcs for each joint's range. Drawn once, in order, when the
 * band comes into view (robotic-edge.css keys off [data-inview] on the InView wrapper).
 */

type P = readonly [number, number];

/** A capsule (rounded segment) of radius r between two points. */
function capsule([x1, y1]: P, [x2, y2]: P, r: number) {
  const len = Math.hypot(x2 - x1, y2 - y1);
  const nx = (-(y2 - y1) / len) * r;
  const ny = ((x2 - x1) / len) * r;
  const f = (n: number) => n.toFixed(1);
  return (
    `M${f(x1 + nx)} ${f(y1 + ny)} L${f(x2 + nx)} ${f(y2 + ny)} ` +
    `A${r} ${r} 0 0 0 ${f(x2 - nx)} ${f(y2 - ny)} L${f(x1 - nx)} ${f(y1 - ny)} ` +
    `A${r} ${r} 0 0 0 ${f(x1 + nx)} ${f(y1 + ny)} Z`
  );
}

const BASE: P = [96, 300];
const SHOULDER: P = [112, 206];
const ELBOW: P = [246, 116];
const WRIST: P = [332, 176];
const TIP: P = [356, 262];

const SEGMENTS = [
  { d: capsule(BASE, SHOULDER, 15), delay: 0.15 },
  { d: capsule(SHOULDER, ELBOW, 13), delay: 0.45 },
  { d: capsule(ELBOW, WRIST, 11), delay: 0.75 },
  { d: capsule(WRIST, TIP, 4), delay: 1.05 },
] as const;

const JOINTS = [
  { at: SHOULDER, r: 18, delay: 0.4 },
  { at: ELBOW, r: 16, delay: 0.7 },
  { at: WRIST, r: 13, delay: 1.0 },
] as const;

/** Dashed range arcs around the joints. */
const ARCS = [
  { d: "M78 186 A 36 36 0 0 1 132 172", delay: 1.3 },
  { d: "M220 86 A 38 38 0 0 1 280 100", delay: 1.4 },
  { d: "M352 146 A 32 32 0 0 1 364 196", delay: 1.5 },
] as const;

const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

export function ArmArt({ className }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 420 360" className={cn("uro-re-art", className)}>
      {/* Floor line and base */}
      <path d="M24 330 H396" pathLength={1} className="uro-re-draw uro-re-faint" style={at(0)} />
      <path
        d="M52 330 V316 Q52 300 68 300 H124 Q140 300 140 316 V330"
        pathLength={1}
        className="uro-re-draw"
        style={at(0.05)}
      />
      {SEGMENTS.map((s) => (
        <path key={s.d} d={s.d} pathLength={1} className="uro-re-draw" style={at(s.delay)} />
      ))}
      {/* Jaws at the tip */}
      <path
        d={`M${TIP[0]} ${TIP[1]} l-12 18 M${TIP[0]} ${TIP[1]} l10 19`}
        pathLength={1}
        className="uro-re-draw uro-re-glow"
        style={at(1.25)}
      />
      {ARCS.map((a) => (
        <path key={a.d} d={a.d} className="uro-re-arc" style={at(a.delay)} />
      ))}
      {JOINTS.map((j) => (
        <g key={j.at.join()} className="uro-re-joint" style={at(j.delay)}>
          <circle cx={j.at[0]} cy={j.at[1]} r={j.r} className="uro-re-jointRing" />
          <circle cx={j.at[0]} cy={j.at[1]} r={j.r * 0.32} className="uro-re-jointCore" />
        </g>
      ))}
      <circle cx={TIP[0]} cy={TIP[1] + 24} r={3.5} className="uro-re-joint uro-re-spark" style={at(1.6)} />
    </svg>
  );
}
