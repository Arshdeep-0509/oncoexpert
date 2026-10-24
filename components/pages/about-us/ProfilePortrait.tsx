import type * as React from "react";
import Image from "next/image";
import { hero } from "@/content/pages/about-us";
import { aboutImages } from "@/content/pages/about-us.images";
import { cn } from "@/lib/utils";
import { portraitMaskStyle } from "@/lib/portrait";
import { ScrollVar } from "@/components/ui/ScrollVar";
import { at, styles } from "@/components/pages/about-us/about-styles";

/** Seconds after the intro. */
const T = { outline: 0.5, reveal: 1.6, firstChip: 2.4, chipGap: 0.15 };
/** Each chip drifts on its own cycle, so they never move in step. */
const DRIFT = ["8s", "9.5s", "7s"];
const SIZES = "(min-width: 1024px) 440px, (min-width: 768px) 360px, 70vw";

/**
 * The portrait in an arch on the hero gradient: the arch draws its outline, then a cover slides
 * up and the portrait rises in behind it (the photo itself is painted from the start: it is the
 * LCP element). A slow parallax with scroll (ScrollVar, transform only). The credential chips
 * pop in and drift around it (desktop) or sit in a row under it (phones).
 */
export function ProfilePortrait() {
  const photo = aboutImages[hero.image];
  return (
    <ScrollVar range="top" className="relative">
      {/* Soft light behind the arch */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[10%] top-[18%] bottom-0 -z-10 rounded-full bg-accent-glow/25 blur-[70px]"
      />
      <div className={cn(styles.parallaxSlow, "relative")}>
        <div className={styles.arch}>
          <div
            className={cn(
              styles.archFrame,
              "bg-(image:--portrait-backdrop) shadow-[0_40px_80px_-30px_rgb(var(--shadow-rgb)/0.7)]",
            )}
          >
            <div className={cn(styles.parallax, "absolute inset-x-[4%] top-[12%] -bottom-8")}>
              <div className={cn(styles.rise, "absolute inset-0")} style={at(T.reveal)}>
                {/* The LCP element on phones: preloaded and fetched first */}
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  preload
                  fetchPriority="high"
                  sizes={SIZES}
                  className="object-contain object-bottom"
                  style={portraitMaskStyle}
                />
              </div>
            </div>
            <div aria-hidden="true" className={cn(styles.cover, "bg-ink")} style={at(T.reveal)} />
          </div>

          {/* The outline, drawn over the frame's edge (a 4:5 box: the top is a true semicircle) */}
          <svg aria-hidden="true" viewBox="0 0 100 125" preserveAspectRatio="none" className={styles.outline}>
            <defs>
              <linearGradient id="ab-outline" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" style={{ stopColor: "var(--name-1)" }} />
                <stop offset="0.55" style={{ stopColor: "var(--name-2)" }} />
                <stop offset="1" style={{ stopColor: "var(--name-3)" }} />
              </linearGradient>
            </defs>
            <path
              className={styles.outlinePath}
              style={at(T.outline)}
              d="M0.75 117.5 V50 A49.25 49.25 0 0 1 99.25 50 V117.5 A6.75 6.75 0 0 1 92.5 124.25 H7.5 A6.75 6.75 0 0 1 0.75 117.5 Z"
              pathLength={1}
              fill="none"
              stroke="url(#ab-outline)"
              strokeWidth={2}
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </div>

        <ul aria-label={hero.a11y.chips} className={styles.chips}>
          {hero.chips.map((chip, i) => (
            <li key={chip} className={cn(styles.chip, styles.step, styles.pop)} style={at(T.firstChip + i * T.chipGap)}>
              <span
                className={cn(
                  styles.loop,
                  styles.drift,
                  "inline-flex min-h-10 items-center gap-2 rounded-pill bg-white/90 px-4 py-2 text-sm font-semibold whitespace-nowrap text-ink shadow-[0_12px_32px_-12px_rgb(var(--shadow-rgb)/0.6)] ring-1 ring-white",
                )}
                style={{ "--drift": DRIFT[i] } as React.CSSProperties}
              >
                <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
                {chip}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </ScrollVar>
  );
}
