import type * as React from "react";
import { hero } from "@/content/pages/endometrial-cancer";
import { cn } from "@/lib/utils";
import { HeroBloomLayer } from "@/components/pages/endometrial-cancer/HeroBloomLayer";
import { HeroToggle } from "@/components/pages/endometrial-cancer/HeroToggle";
import { at, styles } from "@/components/pages/endometrial-cancer/hero-styles";

/**
 * An abstract uterus in soft coral lines (viewBox 400 × 360), drawn in turn: the tubes and the
 * body's outline as one stroke, the fundus, the inner cavity, then the two ovaries.
 */
const STROKES = [
  {
    d: "M58 150 C80 118 112 110 140 124 C150 130 150 140 148 150 C140 200 170 250 186 285 L186 312 C192 320 208 320 214 312 L214 285 C230 250 260 200 252 150 C250 140 250 130 260 124 C288 110 320 118 342 150",
    width: 6,
    at: 0.3,
  },
  { d: "M148 150 C172 118 228 118 252 150", width: 6, at: 0.75 },
  { d: "M172 168 C190 178 210 178 228 168 C220 202 210 230 200 250 C190 230 180 202 172 168Z", width: 3.5, at: 1.05 },
  { d: "M52 150 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0", width: 4, at: 1.3 },
  { d: "M348 150 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0", width: 4, at: 1.4 },
] as const;

/**
 * The hero's visual: the coral line art drawing in at the centre of a highlighted backdrop (a warm
 * glow, a ring of petals turning slowly on desktop, two thin orbit rings) and the pause button.
 * No photo: the drawing is the picture. Phones: the same, smaller.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square w-[72%] md:w-full lg:mr-0 lg:max-w-[540px]">
      {/* Backdrop: glow, petals, orbit rings */}
      <div aria-hidden="true" className={cn(styles.step, styles.pop, "absolute inset-0")} style={at(0.1)}>
        <div className="absolute inset-[4%] rounded-full bg-[radial-gradient(circle,var(--petal)_0%,color-mix(in_srgb,var(--petal)_55%,transparent)_45%,transparent_70%)]" />
        <HeroBloomLayer />
        <svg viewBox="0 0 400 400" className="absolute inset-0 size-full overflow-visible">
          <circle
            cx="200"
            cy="200"
            r="192"
            fill="none"
            style={{ stroke: "var(--highlight)" }}
            strokeOpacity="0.35"
            strokeWidth="1.5"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
          <circle
            cx="200"
            cy="200"
            r="150"
            fill="none"
            style={{ stroke: "var(--accent-bright)" }}
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
        </svg>
      </div>

      {/* Line art, centred */}
      <div className="absolute inset-x-[10%] top-[7%]">
        <svg viewBox="0 0 400 360" aria-hidden="true" className="relative size-full overflow-visible">
          <defs>
            <linearGradient id="ex-line-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: "var(--accent)" }} />
              <stop offset="1" style={{ stopColor: "var(--accent-bright)" }} />
            </linearGradient>
          </defs>
          {STROKES.map((s) => (
            <path
              key={s.d}
              className={styles.line}
              style={{ "--d": `${s.at}s` } as React.CSSProperties}
              d={s.d}
              pathLength={1}
              fill="none"
              stroke="url(#ex-line-grad)"
              strokeWidth={s.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </svg>
      </div>

      <div className={cn(styles.step, styles.fadeUp, "absolute top-0 right-0 z-10")} style={at(1.6)}>
        <HeroToggle pause={hero.a11y.pause} play={hero.a11y.play} />
      </div>
    </div>
  );
}
