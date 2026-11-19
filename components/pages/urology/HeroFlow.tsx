import type * as React from "react";
import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/urology/hero-styles";

/*
 * The "flow" behind the hero: slow streamlines sweeping across (a faint base line, with a bright
 * pulse flowing along it) and droplets drifting through. Coordinates in a 1440 × 820 box, sliced to
 * cover. `phone: false` lines and drops are hidden under 768px (fewer, calmer loops on phones).
 */
const LINES = [
  { d: "M-40 640 C 260 560, 520 700, 820 600 S 1240 420, 1500 470", t: 15, s: 0, tone: "accent", phone: true },
  { d: "M-40 700 C 300 640, 600 760, 900 680 S 1280 560, 1500 600", t: 17, s: 3.5, tone: "petal", phone: false },
  { d: "M640 -20 C 760 160, 980 120, 1080 280 S 1260 520, 1500 540", t: 13, s: 1.5, tone: "accent", phone: true },
  { d: "M760 -20 C 900 140, 1120 90, 1220 240 S 1380 420, 1500 420", t: 16, s: 6, tone: "petal", phone: false },
  { d: "M-40 130 C 180 170, 320 80, 540 124 S 780 210, 940 150", t: 11, s: 4.5, tone: "highlight", phone: true },
] as const;

const DROPS = [
  { x: 120, y: 760, r: 1, t: 18, s: 1, dx: 320, dy: -16, o: 0.55, phone: true },
  { x: 880, y: 640, r: 0.8, t: 22, s: 5, dx: 380, dy: -24, o: 0.45, phone: false },
  { x: 980, y: 210, r: 1.2, t: 20, s: 2.5, dx: 300, dy: 22, o: 0.5, phone: true },
  { x: 260, y: 120, r: 0.7, t: 16, s: 7, dx: 260, dy: -14, o: 0.5, phone: false },
  { x: 1120, y: 480, r: 0.9, t: 24, s: 9, dx: 240, dy: -20, o: 0.4, phone: false },
] as const;

const tone = { accent: "var(--accent)", petal: "var(--accent-bright)", highlight: "var(--highlight)" } as const;

/** A droplet, 12 units tall, its tip up. */
const DROP = "M0 -7 C 2.6 -3, 5 0, 5 2.6 A 5 5 0 1 1 -5 2.6 C -5 0, -2.6 -3, 0 -7 Z";

export function HeroFlow() {
  return (
    <div aria-hidden="true" className={styles.flow}>
      <svg viewBox="0 0 1440 820" preserveAspectRatio="xMidYMid slice" className="size-full">
        {LINES.map((l, i) => (
          <g key={i} className={cn(!l.phone && styles.phoneHidden)}>
            <path
              d={l.d}
              pathLength={1}
              fill="none"
              stroke={tone[l.tone]}
              strokeOpacity={l.tone === "highlight" ? 0.22 : 0.14}
              strokeWidth={1.25}
              className={cn(styles.step, styles.fadeIn)}
              style={{ "--d": `${0.4 + i * 0.15}s` } as React.CSSProperties}
            />
            <path
              d={l.d}
              pathLength={1}
              fill="none"
              stroke={tone[l.tone]}
              strokeOpacity={0.55}
              strokeWidth={2}
              strokeLinecap="round"
              className={styles.flowDash}
              style={{ "--t": `${l.t}s`, "--s": `${l.s}s` } as React.CSSProperties}
            />
          </g>
        ))}
        {DROPS.map((p, i) => (
          <path
            key={i}
            d={DROP}
            transform={`translate(${p.x} ${p.y}) scale(${p.r})`}
            fill={i % 2 ? "var(--accent-bright)" : "var(--accent)"}
            className={cn(styles.drop, !p.phone && styles.phoneHidden)}
            style={
              {
                "--t": `${p.t}s`,
                "--s": `${p.s}s`,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--o": p.o,
              } as React.CSSProperties
            }
          />
        ))}
      </svg>
    </div>
  );
}
