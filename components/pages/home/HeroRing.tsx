import type * as React from "react";
import Image from "next/image";
import { homeImages } from "@/content/pages/home.images";
import { cn } from "@/lib/utils";
import { at, styles } from "@/components/pages/home/hero-styles";

/** Sparks on the ring's path: angle (deg from 12 o'clock) and twinkle phase (s). */
const SPARKS = [
  [38, 0],
  [166, 1.7],
  [292, 3.2],
] as const;

/** The photo box is 1.09× the ring (120% of the portrait circle, which is 90.8% of the ring). */
const SIZES = "(min-width: 1024px) 567px, (min-width: 768px) 458px, 79vw";

/**
 * The Ring: the logo's gradient ring drawn in clockwise from the top (transform only), orange
 * sparks on its path, a soft blue halo, and Dr. Sunil's portrait inside, shoulders in the circle
 * and the head breaking out over the ring. Server-rendered; every motion is CSS (hero.css).
 * The ring, portrait (and chips, HeroStats) are separate [data-depth] layers for HeroParallax.
 */
export function HeroRing() {
  const photo = homeImages.doctor;
  const head = homeImages.doctorHead;

  return (
    <div className={cn(styles.areaStage, styles.scrollStage, styles.stage, "md:mt-16 lg:mt-0")}>
      <div aria-hidden="true" className={cn(styles.halo, styles.step, styles.fadeIn)} style={at(0.1)} />

      <div data-depth="12" aria-hidden="true" className={styles.layer}>
        <div className={cn(styles.layer, styles.spin, styles.loop)}>
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
      </div>

      <div data-depth="8" className={styles.portrait}>
        <div className={styles.circle}>
          <div className={cn(styles.photo, styles.step, styles.rise)} style={at(0.3)}>
            {/* The LCP element: preloaded and fetched first */}
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              fetchPriority="high"
              sizes={SIZES}
              className="object-cover"
            />
          </div>
          <span aria-hidden="true" className={styles.iris} />
        </div>
        {/* The crown, over the ring: appears as the circle finishes opening. */}
        <div aria-hidden="true" className={cn(styles.head, styles.step, styles.crownIn)} style={at(0.55)}>
          <div className={cn(styles.fill, styles.step, styles.rise)} style={at(0.3)}>
            {/* Above the fold, so not lazy (Next's default) */}
            <Image src={head.src} alt="" fill loading="eager" sizes={SIZES} className="object-cover" />
          </div>
        </div>
      </div>
    </div>
  );
}
