import type * as React from "react";
import { styles } from "@/components/pages/thyroid-cancer/hero-styles";

// left %, top %, size px, drift s (18–26), start offset s, dx px, dy px
const FLIES = [
  [6, 70, 14, 22, 0, 160, -60],
  [18, 24, 10, 26, 8, 140, 40],
  [40, 82, 12, 19, 4, 180, -80],
  [58, 14, 9, 24, 12, 120, 50],
  [74, 58, 13, 18, 6, -150, -40],
  [88, 30, 10, 21, 14, -130, 60],
] as const;

/** The butterflies themselves (hero.css): the pause button and leaving the screen stop them. */
export function HeroButterflyLayer() {
  return (
    <div aria-hidden="true" className={styles.flies}>
      {FLIES.map(([left, top, size, fly, start, dx, dy], i) => (
        <svg
          key={i}
          viewBox="0 0 20 16"
          width={size}
          height={size * 0.8}
          className={styles.fly}
          style={
            {
              left: `${left}%`,
              top: `${top}%`,
              "--fly": `${fly}s`,
              "--start": `${-start}s`,
              "--dx": `${dx}px`,
              "--dy": `${dy}px`,
            } as React.CSSProperties
          }
        >
          <path
            d="M10 8 C7 2 2 1 1.5 5 C1 9 6 9 10 8 C6 10 3 14 6 15 C8 15.5 9.5 12 10 8 C10.5 12 12 15.5 14 15 C17 14 14 10 10 8 C14 9 19 9 18.5 5 C18 1 13 2 10 8Z"
            style={{ fill: i % 2 ? "var(--petal)" : "var(--accent-bright)" }}
            fillOpacity="0.75"
          />
        </svg>
      ))}
    </div>
  );
}
