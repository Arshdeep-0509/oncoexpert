import type * as React from "react";
import Image from "next/image";
import { hero } from "@/content/pages/endometrial-cancer";
import { endometrialImages } from "@/content/pages/endometrial-cancer.images";
import { cn } from "@/lib/utils";
import { HeroBloom } from "@/components/pages/endometrial-cancer/HeroBloom";
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
 * The hero's visual: the coral line art drawing in, the petal bloom turning slowly behind it
 * (desktop only, lazy), the photo card in front and the pause button. Phones: a compact box.
 */
export function HeroVisual() {
  const photo = endometrialImages[hero.image];
  return (
    <div className="relative mx-auto aspect-[400/330] w-[88%] md:w-full lg:mr-0 lg:max-w-[560px]">
      {/* The line art and the photo card barely touch, so the drawing reads whole. */}
      <div className="absolute top-[6%] left-0 w-[64%]">
        <div className="relative aspect-[400/360]">
          <HeroBloom />
          <svg viewBox="0 0 400 360" aria-hidden="true" className="relative size-full overflow-visible">
            <defs>
              <linearGradient id="ex-line-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: "var(--accent-bright)" }} />
                <stop offset="1" style={{ stopColor: "var(--highlight)" }} />
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
      </div>

      {/* Photo card, in front, bottom-right */}
      <div className="absolute right-0 bottom-0 w-[40%]">
        <div className="relative aspect-[4/5] overflow-hidden rounded-[20px] border-4 border-white shadow-soft-lg md:rounded-[28px] md:border-[6px]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 230px, (min-width: 768px) 30vw, 36vw"
            fetchPriority="high"
            loading="eager"
            className="object-cover"
            style={{ objectPosition: photo.focal }}
          />
          <span aria-hidden="true" className={cn(styles.photoCover, "absolute inset-0 bg-surface-alt")} />
        </div>
      </div>

      <div className={cn(styles.step, styles.fadeUp, "absolute top-0 right-0 z-10")} style={at(1.6)}>
        <HeroToggle pause={hero.a11y.pause} play={hero.a11y.play} />
      </div>
    </div>
  );
}
