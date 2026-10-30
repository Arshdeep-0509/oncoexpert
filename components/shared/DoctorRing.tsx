import type * as React from "react";
import Image from "next/image";
import type { Stat } from "@/content/types";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { RingCounter } from "@/components/shared/doctor-ring/RingCounter";
import "@/components/shared/doctor-ring/doctor-ring.css";

/** Class names from doctor-ring.css (plain CSS, `aura-` prefix). */
const styles = {
  root: "aura-root",
  step: "aura-step",
  loop: "aura-loop",
  stage: "aura-stage",
  layer: "aura-layer",
  halo: "aura-halo",
  annulus: "aura-annulus",
  track: "aura-track",
  window: "aura-window",
  piece: "aura-piece",
  paint: "aura-paint",
  spark: "aura-spark",
  sparkCore: "aura-sparkCore",
  portrait: "aura-portrait",
  circle: "aura-circle",
  photo: "aura-photo",
  head: "aura-head",
  fill: "aura-fill",
  iris: "aura-iris",
  chip: "aura-chip",
  fadeIn: "aura-fadeIn",
  spin: "aura-spin",
  sparkIn: "aura-sparkIn",
  twinkle: "aura-twinkle",
  rise: "aura-rise",
  crownIn: "aura-crownIn",
  pop: "aura-pop",
  float: "aura-float",
} as const;

/** Entrance step at `d` seconds after the panel comes on screen (and the intro, in a hero). */
const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

/** Sparks on the ring's path: angle (deg from 12 o'clock) and twinkle phase (s). */
const SPARKS = [
  [38, 0],
  [166, 1.7],
  [292, 3.2],
] as const;

/** Float loop length and start offset per chip (desktop), so the four never move in step. */
const FLOAT = [
  [6.4, 0],
  [7.6, 0.9],
  [6.9, 1.7],
  [8, 2.6],
] as const;

/** The photo box is 1.09× the ring (120% of the portrait circle, which is 90.8% of the ring). */
const SIZES = "(min-width: 1024px) 480px, (min-width: 768px) 392px, 80vw";

type DoctorRingProps = {
  /** The four figures: one chip per corner of the ring on desktop, 2×2 under it below. */
  stats: readonly Stat[];
  /** Screen-reader name of the figures list (from /content). */
  label: string;
  /** The portrait (a transparent PNG on the theme's portrait backdrop). */
  photo: { src: string; alt: string };
  /** The head cut out of the same photo (decorative): it breaks out over the ring. */
  head: { src: string };
  /** Above the fold (a hero): the photo is preloaded, and the entrance and the count wait for the intro. */
  hero?: boolean;
};

/**
 * Dr. Sunil in the logo's gradient ring, on a navy panel (its own background, so it looks the
 * same in every theme): the ring draws itself clockwise from the top, the portrait rises in as
 * the circle opens (the head breaks out over the ring), orange sparks twinkle on its path, and
 * the figures pop in and count up: floating around the ring on desktop, a 2×2 grid under it on
 * phones and tablets. It plays once the panel is on screen; every motion is CSS
 * (doctor-ring.css). Home's #surgeon and the About hero (`hero`). No backdrop blur on the chips:
 * they animate.
 */
export function DoctorRing({ stats, label, photo, head, hero = false }: DoctorRingProps) {
  return (
    <InView
      className={cn(
        styles.root,
        "on-dark relative isolate overflow-hidden rounded-[28px] px-5 pt-12 pb-6 text-white shadow-soft-lg md:px-10 md:pt-14 md:pb-10 lg:px-6 lg:py-16",
      )}
      style={hero ? ({ "--ring-delay": "var(--intro, 0s)" } as React.CSSProperties) : undefined}
    >
      <div className="relative lg:mx-auto lg:w-(--stage)">
        <div className={styles.stage}>
          <div aria-hidden="true" className={cn(styles.halo, styles.step, styles.fadeIn)} style={at(0.1)} />

          <div aria-hidden="true" className={cn(styles.layer, styles.spin, styles.loop)}>
            <div className={cn(styles.track, styles.annulus, styles.step, styles.fadeIn)} style={at(0)} />
            {(["r", "l"] as const).map((half) => (
              <div key={half} className={styles.window} data-half={half}>
                <div className={styles.piece}>
                  <div className={cn(styles.paint, styles.annulus)} />
                </div>
              </div>
            ))}
            {SPARKS.map(([angle, phase], i) => (
              <span
                key={angle}
                className={cn(styles.spark, styles.step, styles.sparkIn)}
                style={{ "--a": `${angle}deg`, "--d": `${1.5 + i * 0.12}s` } as React.CSSProperties}
              >
                <span
                  className={cn(styles.sparkCore, styles.twinkle, styles.loop)}
                  style={{ "--phase": `${phase}s` } as React.CSSProperties}
                />
              </span>
            ))}
          </div>

          <div className={styles.portrait}>
            <div className={styles.circle}>
              <div className={cn(styles.photo, styles.step, styles.rise)} style={at(0.3)}>
                {/* In a hero, the LCP element on phones: preloaded and fetched first */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={SIZES}
                  preload={hero}
                  fetchPriority={hero ? "high" : undefined}
                  className="object-cover"
                />
              </div>
              <span aria-hidden="true" className={styles.iris} />
            </div>
            {/* The crown, over the ring: appears as the circle finishes opening. */}
            <div aria-hidden="true" className={cn(styles.head, styles.step, styles.crownIn)} style={at(0.55)}>
              <div className={cn(styles.fill, styles.step, styles.rise)} style={at(0.3)}>
                <Image
                  src={head.src}
                  alt=""
                  fill
                  sizes={SIZES}
                  loading={hero ? "eager" : undefined}
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        <ul
          aria-label={label}
          className="mx-auto mt-8 grid max-w-[520px] grid-cols-2 gap-3 md:mt-10 lg:absolute lg:inset-0 lg:mt-0 lg:block lg:max-w-none"
        >
          {stats.map((stat, i) => {
            const step = 1.2 + i * 0.12;
            const [float, phase] = FLOAT[i % FLOAT.length];
            return (
              <li key={stat.label} className={cn(styles.chip, styles.step, styles.pop)} style={at(step)}>
                <div
                  className={cn(styles.float, styles.loop)}
                  style={{ "--float": `${float}s`, "--phase": `${phase}s` } as React.CSSProperties}
                >
                  {/* Glass without blur: white/8 over a dark backing, so the ring never shows through the text. */}
                  <p className="flex h-full flex-col rounded-2xl bg-ink/70 bg-linear-to-b from-white/10 to-white/[0.06] px-4 py-3.5 shadow-[0_16px_40px_-16px_rgb(0_0_0/0.55)] ring-1 ring-white/15 xl:min-w-[158px] xl:px-5 xl:py-4">
                    <span className="font-display text-[1.6rem] leading-none font-bold tracking-[-0.02em] text-white xl:text-[1.85rem]">
                      <RingCounter value={stat.value} suffix={stat.suffix} at={step + 0.15} afterIntro={hero} />
                    </span>
                    <span className="mt-2 text-[11px] leading-snug font-semibold tracking-[0.14em] text-white/70 uppercase">
                      {stat.label}
                    </span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </InView>
  );
}
