import type * as React from "react";
import { hero } from "@/content/pages/ovarian-cancer";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { HeroStory } from "@/components/pages/ovarian-cancer/HeroStory";
import { RIBBON_BOX, RIBBON_PATH, SEEDS } from "@/components/pages/ovarian-cancer/ribbon-art";
import { at, styles } from "@/components/pages/ovarian-cancer/hero-styles";

/**
 * The teal ribbon (ribbon-art.ts) whose line outlines the tubes and ovaries, with the treatment
 * story drawn inside it (HeroStory) and, under the art, its three steps lighting up in turn. The
 * box keeps the art's proportions (CLS 0); the art carries data-depth for the pointer parallax.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[360px] md:max-w-[440px] lg:mr-0 lg:max-w-[520px]">
      <div className="relative" style={{ aspectRatio: `${RIBBON_BOX.width} / ${RIBBON_BOX.height}` }}>
        <div data-depth="5" role="img" aria-label={hero.a11y.visual} className="pointer-events-none absolute inset-0">
          <svg viewBox={`0 0 ${RIBBON_BOX.width} ${RIBBON_BOX.height}`} className="size-full overflow-visible">
            <defs>
              <linearGradient id="ov-ribbon-grad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" style={{ stopColor: "var(--accent)" }} />
                <stop offset="0.6" style={{ stopColor: "var(--accent-bright)" }} />
                <stop offset="1" style={{ stopColor: "var(--accent-glow)" }} />
              </linearGradient>
            </defs>
            <HeroStory />
            <path
              d={RIBBON_PATH}
              pathLength={1}
              fill="none"
              stroke="url(#ov-ribbon-grad)"
              strokeWidth="7"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={styles.line}
            />
            <path
              d={RIBBON_PATH}
              pathLength={1}
              fill="none"
              style={{ stroke: "var(--white)" }}
              strokeWidth="7"
              strokeLinecap="round"
              strokeOpacity="0.85"
              className={styles.shimmer}
            />
            {SEEDS.map(([cx, cy, r], i) => (
              <circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={r}
                className={styles.seed}
                style={{ fill: i % 2 ? "var(--highlight)" : "var(--accent-bright)", "--i": i } as React.CSSProperties}
              />
            ))}
          </svg>
        </div>

        <div className={cn(styles.step, styles.fadeUp, "absolute right-0 bottom-[6%] z-10")} style={at(1.8)}>
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
