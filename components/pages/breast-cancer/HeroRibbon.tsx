import { cn } from "@/lib/utils";
import { styles } from "@/components/pages/breast-cancer/hero-styles";

/*
 * Awareness ribbon as one centre-line path, stroked wide:
 * left tail (30,160) → up to the loop → over the top (60,20) → down → right tail (90,160).
 * The second leg is drawn after the first, so it lies on top where they cross (60,100).
 */
const RIBBON = "M30 160 L67 86 C82 58 78 22 60 20 C42 22 38 58 53 86 L90 160";
const WIDTH = 15;

/** Draws itself (stroke-dashoffset), fills with --grad-accent, then breathes. Decorative. */
export function HeroRibbon({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none", className)}>
      <svg viewBox="0 0 120 170" className={cn("size-full overflow-visible", styles.ribbonBreathe)}>
        <defs>
          <linearGradient id="hero-ribbon-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--accent)" }} />
            <stop offset="1" style={{ stopColor: "var(--accent-bright)" }} />
          </linearGradient>
        </defs>
        <g fill="none" strokeLinejoin="round">
          {/* Soft shadow: the same path, offset and faint (no SVG filter: filters are costly to paint) */}
          <path
            d={RIBBON}
            transform="translate(0 5)"
            style={{ stroke: "var(--ink)" }}
            strokeOpacity={0.08}
            strokeWidth={WIDTH + 4}
            className={styles.ribbonFill}
          />
          {/* 1 · the draw: a solid accent stroke */}
          <path
            d={RIBBON}
            pathLength={1}
            style={{ stroke: "var(--accent)" }}
            strokeWidth={WIDTH}
            className={styles.ribbonStroke}
          />
          {/* 2 · the fill: gradient fades in over it, with a soft highlight along the ribbon */}
          <g className={styles.ribbonFill}>
            <path d={RIBBON} stroke="url(#hero-ribbon-grad)" strokeWidth={WIDTH} />
            <path d={RIBBON} stroke="white" strokeOpacity={0.28} strokeWidth={2.5} transform="translate(-2.5 -1)" />
          </g>
        </g>
      </svg>
    </div>
  );
}
