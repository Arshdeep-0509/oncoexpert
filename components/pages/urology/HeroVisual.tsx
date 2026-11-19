import type * as React from "react";
import Image from "next/image";
import { hero, specialties } from "@/content/pages/urology";
import { urologyImages } from "@/content/pages/urology.images";
import { cn } from "@/lib/utils";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { at, styles } from "@/components/pages/urology/hero-styles";

const portrait = urologyImages[hero.portrait];
const chips = hero.chips.map((key) => specialties.items.find((item) => item.key === key)!);

/* Chip positions around the stage: phones (the first two only), then from md. */
const CHIP_POSITIONS = [
  "left-3 bottom-[34%] md:-left-6 md:top-[16%] md:bottom-auto lg:-left-10",
  "right-3 bottom-4 md:-right-4 md:top-[44%] md:bottom-auto lg:-right-6",
  "md:-left-4 md:bottom-[18%] lg:-left-12",
  "md:right-6 md:-bottom-5",
] as const;

/* The rings behind the head and the gauge ticks (stage coordinates, 400 × 436). */
const RINGS = [
  { r: 150, opacity: 0.5, delay: 0 },
  { r: 118, opacity: 0.35, delay: 0.15 },
] as const;
const TICKS = Array.from({ length: 13 }, (_, i) => {
  const a = (-200 + i * 18.33) * (Math.PI / 180);
  const r1 = 172;
  const r2 = i % 3 === 0 ? 184 : 179;
  return `M${200 + r1 * Math.cos(a)} ${168 + r1 * Math.sin(a)} L${200 + r2 * Math.cos(a)} ${168 + r2 * Math.sin(a)}`;
}).join(" ");

/**
 * The doctor on a soft rounded stage (his cutout is the LCP image: preloaded, high priority, on
 * screen from the first paint; it only settles upward), with rings and gauge ticks drawn around his
 * head and the floating dashboard chips (ICD-10 code · organ, tabular figures, a live dot). The
 * stage's aspect ratio is fixed, so nothing shifts while the page loads. Phones: a shorter stage
 * (~70% of the desktop height) and two chips.
 */
export function HeroVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[460px] md:max-w-[560px] lg:mr-0 lg:max-w-[520px] xl:max-w-[540px]">
      <div
        className={cn(
          styles.stage,
          "relative isolate aspect-[4/3] overflow-hidden rounded-[1.75rem] ring-1 shadow-soft-lg ring-line md:aspect-[5/4] md:rounded-[2.25rem] lg:aspect-[11/12]",
        )}
      >
        {/* Rings and gauge ticks behind the head */}
        <svg
          aria-hidden="true"
          viewBox="0 0 400 436"
          preserveAspectRatio="xMidYMin slice"
          className="absolute inset-0 -z-10 size-full"
        >
          {RINGS.map((ring) => (
            <circle
              key={ring.r}
              cx="200"
              cy="168"
              r={ring.r}
              pathLength={1}
              fill="none"
              stroke="var(--accent)"
              strokeOpacity={ring.opacity}
              strokeWidth={1}
              transform="rotate(-90 200 168)"
              className={styles.ring}
              style={{ "--r": `${ring.delay}s` } as React.CSSProperties}
            />
          ))}
          <path
            d={TICKS}
            pathLength={1}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.55}
            strokeWidth={1.5}
            strokeLinecap="round"
            className={styles.tick}
          />
          <circle cx="200" cy="168" r="196" fill="none" stroke="var(--line)" strokeWidth={1} strokeDasharray="2 6" />
        </svg>

        <Image
          src={portrait.src}
          alt={portrait.alt}
          width={portrait.width}
          height={portrait.height}
          preload
          fetchPriority="high"
          sizes="(max-width: 767px) 320px, (max-width: 1023px) 380px, 460px"
          className={cn(
            styles.portrait,
            "absolute bottom-0 left-1/2 w-[66%] max-w-none -translate-x-1/2 select-none md:w-[64%] lg:w-[86%]",
          )}
        />

        <div
          className={cn(styles.step, styles.fadeUp, "absolute top-3 right-3 z-10 md:top-4 md:right-4")}
          style={at(1.8)}
        >
          <MotionToggle
            pause={hero.a11y.pause}
            play={hero.a11y.play}
            className="size-12 bg-surface/90 shadow-soft-sm"
          />
        </div>
      </div>

      {/* Dashboard chips (words from the specialties) */}
      <ul aria-label={hero.a11y.chips} className="contents">
        {chips.map((item, i) => (
          <li
            key={item.key}
            className={cn(
              styles.step,
              styles.pop,
              "absolute z-10",
              CHIP_POSITIONS[i],
              i >= hero.phoneChips && styles.phoneHidden,
            )}
            style={at(1.5 + i * 0.15)}
          >
            <span
              className={cn(
                styles.chipFloat,
                "flex min-h-10 items-center gap-2 rounded-xl bg-surface px-3 py-2 text-sm leading-none whitespace-nowrap text-ink ring-1 shadow-soft ring-line md:min-h-11 md:px-3.5",
              )}
              style={{ "--i": i } as React.CSSProperties}
            >
              <span
                aria-hidden="true"
                className={cn(styles.live, "size-2 shrink-0 rounded-full bg-highlight")}
                style={{ "--i": i } as React.CSSProperties}
              />
              {"code" in item ? (
                <>
                  <span className="text-xs font-medium text-muted tabular-nums">{specialties.scheme}</span>
                  <span className="font-semibold tracking-wide tabular-nums">{item.code}</span>
                </>
              ) : (
                <span className="rounded-md bg-surface-warm px-1.5 py-1 text-[11px] font-bold tracking-[0.12em] text-ink ring-1 ring-highlight">
                  {item.tag}
                </span>
              )}
              <span aria-hidden="true" className="text-muted">
                ·
              </span>
              <span className="font-medium">{item.short}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
