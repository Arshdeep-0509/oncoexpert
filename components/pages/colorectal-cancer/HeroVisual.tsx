import Image from "next/image";
import { hero } from "@/content/pages/colorectal-cancer";
import { colorectalImages } from "@/content/pages/colorectal-cancer.images";
import { cn } from "@/lib/utils";
import { HeroCounter } from "@/components/pages/colorectal-cancer/HeroCounter";
import { HeroMotion } from "@/components/pages/colorectal-cancer/HeroMotion";
import { at, styles } from "@/components/pages/colorectal-cancer/hero-styles";

/**
 * The large intestine as one continuous line (viewBox 400 × 420): up the ascending colon,
 * across the transverse with a soft sag, down the descending colon, through the sigmoid's S and
 * into the rectum.
 */
const COLON =
  "M96 336 C72 306 70 258 76 212 C82 166 78 122 108 98 C150 66 198 124 248 100 C290 80 326 72 330 118 C334 164 320 212 326 252 C332 296 302 318 262 312 C224 306 198 330 212 354 C224 374 206 392 204 412";

/** The dot's loop: travel the line in 86% of 12s, rest out of sight, start again. */
const DOT = { dur: "12s", keyTimes: "0;0.86;1", opacity: "0;1;1;0;0", fadeTimes: "0;0.04;0.8;0.86;1" };

/**
 * The hero's visual: the colon line drawing itself in the accent gradient (a soft halo under it),
 * the glowing dot that travels it (tablet and desktop), the photo card in front, the glass stat
 * card and the pause button. Layers carry data-depth for the pointer parallax (desktop, ≤ 12px).
 * Phones: a compact box; the stat card overlaps its bottom edge.
 */
export function HeroVisual() {
  const photo = colorectalImages[hero.image];
  return (
    // The box has the line art's own proportions (400 × 420), so the cards are placed in its
    // coordinates: the photo inside the colon's frame, the stat card in the free corner under the
    // cecum (bottom-left), the pause button by the splenic flexure (top-right).
    <div className="relative mx-auto aspect-[400/420] w-[80%] md:w-full lg:mr-0 lg:max-w-[560px]">
      {/* Line art */}
      <div data-depth="6" className="absolute inset-0">
        <svg data-colon viewBox="0 0 400 420" aria-hidden="true" className="size-full overflow-visible">
          <defs>
            <linearGradient id="cx-colon-grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" style={{ stopColor: "var(--accent)" }} />
              <stop offset="0.6" style={{ stopColor: "var(--accent-bright)" }} />
              <stop offset="1" style={{ stopColor: "var(--highlight)" }} />
            </linearGradient>
            <radialGradient id="cx-colon-glow">
              <stop offset="0" style={{ stopColor: "var(--petal)" }} stopOpacity="0.9" />
              <stop offset="1" style={{ stopColor: "var(--petal)" }} stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="210" cy="220" r="190" fill="url(#cx-colon-glow)" />
          <path
            className={styles.colonHalo}
            d={COLON}
            pathLength={1}
            fill="none"
            stroke="url(#cx-colon-grad)"
            strokeOpacity="0.16"
            strokeWidth="34"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            id="cx-colon-path"
            className={styles.colonLine}
            d={COLON}
            pathLength={1}
            fill="none"
            stroke="url(#cx-colon-grad)"
            strokeWidth="11"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* The glowing dot: still and invisible until HeroMotion begins its two animations. */}
          <g className={styles.dot} opacity="0">
            <circle r="18" style={{ fill: "var(--accent-bright)" }} fillOpacity="0.2" />
            <circle r="10" style={{ fill: "var(--accent-bright)" }} fillOpacity="0.28" />
            <circle r="5.5" style={{ fill: "var(--white)", stroke: "var(--accent-bright)" }} strokeWidth="3" />
            <animateMotion
              data-dot-anim
              begin="indefinite"
              dur={DOT.dur}
              repeatCount="indefinite"
              calcMode="linear"
              keyPoints="0;1;1"
              keyTimes={DOT.keyTimes}
            >
              <mpath href="#cx-colon-path" />
            </animateMotion>
            <animate
              data-dot-anim
              attributeName="opacity"
              begin="indefinite"
              dur={DOT.dur}
              repeatCount="indefinite"
              values={DOT.opacity}
              keyTimes={DOT.fadeTimes}
            />
          </g>
        </svg>
      </div>

      {/* Photo card */}
      <div data-depth="8" className="absolute top-[33%] left-[29%] w-[48%]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[18px] border-4 border-white shadow-soft-lg md:rounded-[24px] md:border-[6px]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            sizes="(min-width: 1024px) 270px, (min-width: 768px) 34vw, 39vw"
            fetchPriority="high"
            loading="eager"
            className="object-cover"
            style={{ objectPosition: photo.focal }}
          />
          <span aria-hidden="true" className={cn(styles.photoCover, "absolute inset-0 bg-surface-alt")} />
        </div>
      </div>

      {/* Glass stat card: overlaps the box's bottom edge on phones */}
      <div
        data-depth="12"
        className="absolute bottom-0 -left-[12%] z-10 w-[72%] translate-y-1/2 md:-left-[6%] md:w-[46%] md:translate-y-0"
      >
        <div className={cn(styles.step, styles.pop)} style={at(1.4)}>
          <div
            className={cn(
              styles.float,
              "rounded-[20px] bg-white/85 px-4 py-3 ring-1 shadow-soft-lg ring-white md:px-5 md:py-4",
            )}
          >
            <p className="font-display text-[2rem] leading-none font-semibold text-ink md:text-[2.6rem]">
              <HeroCounter value={hero.stat.value} suffix={hero.stat.suffix} />
            </p>
            <p className="mt-1.5 text-[15px] leading-tight font-semibold text-ink">{hero.stat.label}</p>
            <p className="mt-1 text-[13px] leading-snug text-muted">{hero.stat.caption}</p>
          </div>
        </div>
      </div>

      {/* Pause / play for the loops */}
      <div className={cn(styles.step, styles.fadeUp, "absolute top-0 right-0 z-10")} style={at(1.6)}>
        <HeroMotion pause={hero.a11y.pause} play={hero.a11y.play} />
      </div>
    </div>
  );
}
