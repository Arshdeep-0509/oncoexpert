import type * as React from "react";
import Image from "next/image";
import { hero } from "@/content/pages/ovarian-cancer";
import { ovarianImages } from "@/content/pages/ovarian-cancer.images";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { ARCH_PATH, RIBBON_BOX, RIBBON_PATH, SEEDS, archBox } from "@/components/pages/ovarian-cancer/ribbon-art";
import { at, styles } from "@/components/pages/ovarian-cancer/hero-styles";

/**
 * The teal ribbon (ribbon-art.ts) around the arch-framed portrait. The box keeps the art's
 * proportions (CLS 0). Layers carry data-depth for the pointer parallax (desktop, ≤ 10px). The
 * portrait is the LCP image: preloaded, high priority, painted at once; a cover slides off it.
 */
export function HeroVisual() {
  const portrait = ovarianImages[hero.image];
  return (
    <div className="relative mx-auto w-full max-w-[360px] md:max-w-[440px] lg:mr-0 lg:max-w-[520px]">
      <div className="relative" style={{ aspectRatio: `${RIBBON_BOX.width} / ${RIBBON_BOX.height}` }}>
        {/* The portrait in its arch */}
        <div data-depth="10" className="absolute" style={archBox}>
          <div className="absolute inset-0 overflow-hidden rounded-t-full bg-(image:--grad-hero) shadow-soft-lg">
            <Image
              src={portrait.src}
              alt={portrait.alt}
              fill
              preload
              fetchPriority="high"
              loading="eager"
              sizes="(min-width: 1024px) 240px, (min-width: 768px) 204px, 166px"
              className={cn(styles.photo, "object-cover")}
              style={{ objectPosition: "50% 12%" }}
            />
            <span aria-hidden="true" className={cn(styles.cover, "absolute inset-0 bg-surface-warm")} />
          </div>
        </div>

        {/* The line, the arch outline and the seeds */}
        <div data-depth="5" role="img" aria-label={hero.a11y.visual} className="pointer-events-none absolute inset-0">
          <svg viewBox={`0 0 ${RIBBON_BOX.width} ${RIBBON_BOX.height}`} className="size-full overflow-visible">
            <defs>
              <linearGradient id="ov-ribbon-grad" x1="0" y1="1" x2="1" y2="0">
                <stop offset="0" style={{ stopColor: "var(--accent)" }} />
                <stop offset="0.6" style={{ stopColor: "var(--accent-bright)" }} />
                <stop offset="1" style={{ stopColor: "var(--accent-glow)" }} />
              </linearGradient>
            </defs>
            <path
              d={ARCH_PATH}
              pathLength={1}
              fill="none"
              style={{ stroke: "var(--highlight)" }}
              strokeWidth="2"
              strokeOpacity="0.7"
              className={styles.arch}
            />
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
    </div>
  );
}
