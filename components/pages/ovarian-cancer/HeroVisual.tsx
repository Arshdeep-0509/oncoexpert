import type * as React from "react";
import Image from "next/image";
import { hero } from "@/content/pages/ovarian-cancer";
import { ovarianImages } from "@/content/pages/ovarian-cancer.images";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { at, styles } from "@/components/pages/ovarian-cancer/hero-styles";

/** The overlays' coordinates: the render's own, so they stay on the organs at every size. */
const ART = { width: 800, height: 420 } as const;
const OVARIES = [
  { cx: 155, cy: 262 },
  { cx: 645, cy: 262 },
] as const;
const TUBES = [
  "M 62 215 C 30 130, 70 52, 130 44 C 185 38, 205 84, 268 96",
  "M 738 215 C 770 130, 730 52, 670 44 C 615 38, 595 84, 532 96",
] as const;

const viewBox = `0 0 ${ART.width} ${ART.height}`;

/**
 * A 3D render of the uterus, tubes and ovaries, floating in a soft halo inside a slow ring. The
 * three treatment steps loop over it, each lighting its chip below: surgery (focus rings draw
 * around the ovaries), HIPEC (a warm glow), recovery (the ovaries glow teal, light runs along the
 * tubes). The photo is the LCP image: painted from the start, it only ever moves. The default CSS
 * is the calm end state; the art carries data-depth for the pointer parallax.
 */
export function HeroVisual() {
  const art = ovarianImages.heroOvaries;

  return (
    <div className="relative mx-auto w-full max-w-[400px] md:max-w-[480px] lg:mr-0 lg:max-w-[600px]">
      <div className="relative aspect-[10/8]">
        <span aria-hidden="true" className={styles.halo} />
        <span aria-hidden="true" className={styles.orbit} />

        <div data-depth="5" className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className={cn(styles.art, "relative w-full")} style={{ aspectRatio: `${ART.width} / ${ART.height}` }}>
            {/* Behind the organs */}
            <svg aria-hidden="true" viewBox={viewBox} className="absolute inset-0 size-full overflow-visible">
              <defs>
                <radialGradient id="ov-grad-warm">
                  <stop offset="0" style={{ stopColor: "var(--highlight)", stopOpacity: 0.6 }} />
                  <stop offset="1" style={{ stopColor: "var(--highlight)", stopOpacity: 0 }} />
                </radialGradient>
                <radialGradient id="ov-grad-calm">
                  <stop offset="0" style={{ stopColor: "var(--accent-bright)", stopOpacity: 0.7 }} />
                  <stop offset="1" style={{ stopColor: "var(--accent-bright)", stopOpacity: 0 }} />
                </radialGradient>
              </defs>
              <ellipse cx="400" cy="200" rx="400" ry="250" fill="url(#ov-grad-warm)" className={styles.warm} />
              {OVARIES.map((o) => (
                <circle key={o.cx} cx={o.cx} cy={o.cy} r="125" fill="url(#ov-grad-calm)" className={styles.calm} />
              ))}
            </svg>

            <Image
              src={art.src}
              alt={art.alt}
              width={art.width}
              height={art.height}
              preload
              fetchPriority="high"
              sizes="(max-width: 767px) 400px, (max-width: 1023px) 480px, 600px"
              className="relative size-full select-none"
            />

            {/* Over the organs */}
            <svg aria-hidden="true" viewBox={viewBox} className="absolute inset-0 size-full overflow-visible">
              {OVARIES.map((o) => (
                <circle
                  key={o.cx}
                  cx={o.cx}
                  cy={o.cy}
                  r="86"
                  pathLength={1}
                  fill="none"
                  strokeWidth="3"
                  strokeLinecap="round"
                  style={{ stroke: "var(--accent)" }}
                  className={styles.scan}
                />
              ))}
              {TUBES.map((d) => (
                <path
                  key={d}
                  d={d}
                  pathLength={1}
                  fill="none"
                  strokeWidth="7"
                  strokeLinecap="round"
                  style={{ stroke: "var(--white)" }}
                  className={styles.bead}
                />
              ))}
            </svg>
          </div>
        </div>

        <div className={cn(styles.step, styles.fadeUp, "absolute right-0 bottom-0 z-10")} style={at(1.8)}>
          <MotionToggle
            pause={hero.a11y.pause}
            play={hero.a11y.play}
            className="size-12 bg-surface/85 shadow-soft-sm"
          />
        </div>
      </div>

      {/* The story's steps, each lighting up as its part plays */}
      <ol aria-label={hero.a11y.steps} className="mt-3 flex flex-wrap justify-center gap-2">
        {hero.story.map((step, i) => (
          <li
            key={step}
            className={cn(
              styles.storyStep,
              "flex items-center gap-2 rounded-pill bg-surface/90 px-3 py-1.5 text-[13px] font-semibold text-ink ring-1 shadow-soft-sm ring-line",
            )}
            style={{ "--s": i } as React.CSSProperties}
          >
            <span
              aria-hidden="true"
              className="grid size-5 place-items-center rounded-full bg-accent text-[11px] text-white tabular-nums"
            >
              {i + 1}
            </span>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
}
