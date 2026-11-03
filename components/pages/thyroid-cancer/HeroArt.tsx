import { BUTTERFLY_BOX, ISTHMUS, LOBES, VEINS } from "@/components/pages/thyroid-cancer/butterfly-art";
import { styles } from "@/components/pages/thyroid-cancer/hero-styles";

/**
 * The thyroid as a butterfly (butterfly-art.ts) in a periwinkle-to-blush gradient, decorative. The
 * isthmus draws, the lobes draw outward, the wings unfold from the centre, then the whole butterfly
 * breathes (hero.css). Reduced motion: drawn and still.
 */
export function HeroArt() {
  return (
    <svg
      viewBox={`0 0 ${BUTTERFLY_BOX.width} ${BUTTERFLY_BOX.height}`}
      aria-hidden="true"
      className="size-full overflow-visible"
    >
      <defs>
        <linearGradient id="ty-wing-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--accent)" }} />
          <stop offset="0.55" style={{ stopColor: "var(--accent-bright)" }} />
          <stop offset="1" style={{ stopColor: "var(--blush)" }} />
        </linearGradient>
        <radialGradient id="ty-wing-glow">
          <stop offset="0" style={{ stopColor: "var(--petal)" }} stopOpacity="0.85" />
          <stop offset="1" style={{ stopColor: "var(--petal)" }} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="170" rx="190" ry="150" fill="url(#ty-wing-glow)" />
      <g
        className={styles.breathe}
        fill="none"
        stroke="url(#ty-wing-grad)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={ISTHMUS} pathLength={1} strokeWidth="7" className={styles.isthmus} />
        {LOBES.map((d, side) => (
          <g key={d} className={styles.wing}>
            <path d={d} pathLength={1} strokeWidth="5" className={styles.lobe} />
            {VEINS[side].map((v) => (
              <path key={v} d={v} pathLength={1} strokeWidth="2" strokeOpacity="0.6" className={styles.lobe} />
            ))}
          </g>
        ))}
      </g>
    </svg>
  );
}
