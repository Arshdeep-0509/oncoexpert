import type * as React from "react";
import { styles } from "@/components/pages/lung-cancer/hero-styles";

// left %, size px, rise s (14–22), start offset s, sway px
const DOTS = [
  [4, 10, 18, 0, 18],
  [9, 6, 15, 7, -12],
  [15, 12, 21, 3, 22],
  [21, 7, 16, 11, -16],
  [27, 9, 19, 5, 14],
  [33, 5, 14, 13, -10],
  [40, 11, 22, 2, 20],
  [46, 6, 17, 9, -14],
  [52, 8, 20, 15, 16],
  [58, 5, 15, 6, -12],
  [64, 10, 18, 12, 18],
  [70, 7, 21, 1, -18],
  [75, 12, 16, 8, 24],
  [80, 6, 19, 14, -10],
  [85, 9, 14, 4, 12],
  [90, 5, 22, 10, -16],
  [94, 11, 17, 16, 20],
  [98, 7, 20, 3, -14],
] as const;

/** The dots themselves (hero.css): they rise in a loop; the pause button and off-screen stop them. */
export function HeroAirLayer() {
  return (
    <div aria-hidden="true" className={styles.air}>
      {DOTS.map(([left, size, fly, start, sway], i) => (
        <span
          key={i}
          className={styles.dot}
          style={
            {
              left: `${left}%`,
              width: size,
              height: size,
              "--fly": `${fly}s`,
              "--start": `${-start}s`,
              "--sway": `${sway}px`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
