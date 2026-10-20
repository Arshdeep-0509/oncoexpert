"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { styles } from "./hero-styles";

// left %, size px, fall s, sway s, start delay s, sideways drift px, spin deg
const PETALS = [
  [8, 16, 19, 5.2, 0, 90, 200],
  [22, 12, 23, 4.4, 6, -60, -160],
  [37, 18, 21, 6.0, 11, 70, 240],
  [51, 13, 25, 4.8, 3, -80, -210],
  [63, 15, 20, 5.6, 14, 60, 180],
  [74, 11, 24, 4.2, 8, -50, -230],
  [86, 17, 22, 5.0, 1, 80, 260],
  [94, 12, 26, 4.6, 17, -70, -190],
] as const;

/** The petals themselves; paused while the hero is off-screen. */
export default function HeroPetalsLayer() {
  const ref = React.useRef<HTMLDivElement>(null);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setPaused(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-paused={paused ? "" : undefined}
      className={cn(styles.petals, "pointer-events-none absolute inset-0 -z-10 overflow-hidden")}
    >
      {PETALS.map(([left, size, fall, sway, start, drift, spin], i) => (
        <span
          key={i}
          className={styles.petal}
          style={
            {
              left: `${left}%`,
              "--fall": `${fall}s`,
              "--sway": `${sway}s`,
              "--start": `${-start}s`,
              "--drift": `${drift}px`,
              "--spin": `${spin}deg`,
            } as React.CSSProperties
          }
        >
          <svg width={size} height={size * 1.3} viewBox="0 0 20 26" className="block">
            <path d="M10 1C16 7 18 14 14.5 20 12.5 23.5 7.5 23.5 5.5 20 2 14 4 7 10 1Z" style={{ fill: "var(--petal)" }} />
            <path d="M10 4C10.5 10 10.5 15 10 21" fill="none" style={{ stroke: "var(--accent-glow)" }} strokeWidth="0.8" />
          </svg>
        </span>
      ))}
    </div>
  );
}
