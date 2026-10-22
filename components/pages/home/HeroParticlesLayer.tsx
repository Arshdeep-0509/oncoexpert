import type * as React from "react";
import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/home/hero-styles";

// left %, size px, rise s, start offset s (negative: already mid-flight), sideways drift px,
// peak opacity, orange (1) or white (0). All on the ring's half: never beside the headline,
// where a dot reads as punctuation.
const PARTICLES = [
  [52, 3, 22, -4, 18, 0.7, 0],
  [56, 2, 26, -15, -12, 0.55, 0],
  [60, 3, 19, -9, 14, 0.6, 1],
  [64, 2, 24, -2, -20, 0.5, 0],
  [68, 4, 28, -18, 10, 0.45, 0],
  [72, 2, 21, -7, -14, 0.65, 0],
  [76, 3, 25, -12, 16, 0.55, 1],
  [80, 2, 20, -3, -10, 0.6, 0],
  [84, 3, 27, -21, 12, 0.5, 0],
  [88, 2, 23, -10, -18, 0.65, 0],
  [92, 3, 18, -5, 8, 0.55, 1],
  [96, 2, 24, -16, -12, 0.5, 0],
] as const;

/** The particles themselves (transform/opacity loops); stopped with the hero's other loops. */
export function HeroParticlesLayer() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {PARTICLES.map(([left, size, rise, start, drift, glow, warm], i) => (
        <span
          key={i}
          className={cn(styles.particle, styles.loop)}
          style={
            {
              ...(warm ? { "--particle": "var(--highlight)" } : {}),
              left: `${left}%`,
              width: size,
              height: size,
              "--dur": `${rise}s`,
              "--delay": `${start}s`,
              "--drift": `${drift}px`,
              "--glow": glow,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
