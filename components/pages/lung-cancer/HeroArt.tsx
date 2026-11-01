import type * as React from "react";
import { ALVEOLI, ART_BOX, BRANCH_WAVES, OUTLINES, TRACHEA } from "@/components/pages/lung-cancer/lung-art";
import { drawAt, styles } from "@/components/pages/lung-cancer/hero-styles";

/** Stroke width of each wave: the airways narrow as they branch. */
const WAVE_WIDTH = [7, 5, 3.2] as const;
/** Each wave starts when the previous one has drawn (trachea 0.3–0.8s, then 0.4s per wave). */
const waveAt = (i: number) => 0.8 + i * 0.4;
const OUTLINE_AT = 2.0;

/**
 * The lungs as one gradient bronchial tree (lung-art.ts), decorative (the visual's label is on
 * its wrapper). The tree and the alveoli breathe together (.lu-breathe); the soft glow behind
 * brightens in step. With reduced motion: drawn and still.
 */
export function HeroArt() {
  return (
    <svg viewBox={`0 0 ${ART_BOX} ${ART_BOX}`} aria-hidden="true" className="size-full overflow-visible">
      <defs>
        <linearGradient id="lu-tree-grad" x1="0.2" y1="0" x2="0.8" y2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--accent-bright)" }} />
          <stop offset="1" style={{ stopColor: "var(--highlight)" }} />
        </linearGradient>
        <radialGradient id="lu-glow-grad">
          <stop offset="0" style={{ stopColor: "var(--petal)" }} stopOpacity="0.95" />
          <stop offset="0.6" style={{ stopColor: "var(--accent-soft)" }} stopOpacity="0.6" />
          <stop offset="1" style={{ stopColor: "var(--accent-soft)" }} stopOpacity="0" />
        </radialGradient>
      </defs>

      <circle className={styles.glow} cx="200" cy="224" r="190" fill="url(#lu-glow-grad)" />

      <g className={styles.breathe} fill="none" stroke="url(#lu-tree-grad)" strokeLinecap="round">
        {OUTLINES.map((d) => (
          <path
            key={d}
            d={d}
            pathLength={1}
            strokeWidth="2.5"
            strokeOpacity="0.6"
            strokeLinejoin="round"
            className={styles.draw}
            style={drawAt(OUTLINE_AT, 0.8)}
          />
        ))}
        <path d={TRACHEA} pathLength={1} strokeWidth="9" className={styles.draw} style={drawAt(0.3, 0.5)} />
        {BRANCH_WAVES.map((wave, i) =>
          wave.map((d) => (
            <path
              key={d}
              d={d}
              pathLength={1}
              strokeWidth={WAVE_WIDTH[i]}
              className={styles.draw}
              style={drawAt(waveAt(i), 0.4)}
            />
          )),
        )}
        <g stroke="none">
          {ALVEOLI.map((a) => (
            <circle
              key={`${a.cx}-${a.cy}`}
              cx={a.cx}
              cy={a.cy}
              r={a.r}
              className={styles.alveolus}
              style={
                {
                  "--t": a.t.toFixed(3),
                  fill: a.t < 0.5 ? "var(--accent-bright)" : "var(--highlight)",
                  fillOpacity: 0.55 + (1 - a.t) * 0.3,
                } as React.CSSProperties
              }
            />
          ))}
        </g>
      </g>
    </svg>
  );
}
