import type * as React from "react";
import Image from "next/image";
import { HandHeart } from "lucide-react";
import { hero } from "@/content/pages/stomach-cancer";
import { stomachImages } from "@/content/pages/stomach-cancer.images";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { at, styles } from "@/components/pages/stomach-cancer/hero-styles";

const photo = stomachImages[hero.image];

/* Three steam curls (a 120 × 90 box), rising one after another. */
const CURLS = [
  { d: "M30 88 C 18 70, 42 58, 30 40 S 22 14, 34 2", t: 8, s: 0.4, o: 0.35 },
  { d: "M60 88 C 48 66, 74 54, 60 34 S 52 10, 64 0", t: 9, s: 2.8, o: 0.28 },
  { d: "M90 88 C 80 72, 100 60, 90 44 S 84 20, 94 6", t: 7.5, s: 5.2, o: 0.32 },
] as const;

/**
 * A large rounded photo card (a family sharing a meal: the LCP image, preloaded at high priority and
 * on screen from the first paint; it only settles from a slight zoom) with steam rising off its top
 * edge, the 48px pause button, and the floating trust card ("5,000+ Surgeries Performed") over its
 * lower edge. The card's aspect ratio is fixed, so nothing shifts while the page loads.
 */
export function HeroVisual() {
  const { card } = hero;
  return (
    <div className="relative mx-auto w-full max-w-[520px] pt-8 pb-20 md:max-w-[600px] md:pb-12 lg:mr-0 lg:pt-14">
      <div className="relative">
        <svg aria-hidden="true" viewBox="0 0 120 90" className={styles.steam}>
          {CURLS.map((c) => (
            <path
              key={c.d}
              d={c.d}
              fill="none"
              stroke="var(--accent-bright)"
              strokeWidth={1.6}
              strokeLinecap="round"
              className={styles.curl}
              style={{ "--t": `${c.t}s`, "--s": `${c.s}s`, "--o": c.o } as React.CSSProperties}
            />
          ))}
        </svg>

        <div className="relative isolate aspect-[5/4] overflow-hidden rounded-[1.75rem] bg-petal ring-1 shadow-soft-lg ring-line md:rounded-[2.25rem] lg:aspect-[6/5]">
          <Image
            src={photo.src}
            alt={photo.alt}
            fill
            preload
            fetchPriority="high"
            sizes="(max-width: 767px) 100vw, (max-width: 1023px) 600px, 50vw"
            className={cn(styles.photo, "object-cover")}
            style={{ objectPosition: photo.focal }}
          />
          <div className={cn(styles.step, styles.fadeUp, "absolute top-3 right-3 md:top-4 md:right-4")} style={at(1.8)}>
            <MotionToggle
              pause={hero.a11y.pause}
              play={hero.a11y.play}
              className="size-12 bg-surface/90 shadow-soft-sm"
            />
          </div>
        </div>

        {/* The trust card over the photo's lower edge */}
        <div
          className={cn(
            styles.step,
            styles.pop,
            "absolute inset-x-4 -bottom-16 flex items-center gap-4 rounded-2xl bg-surface p-4 ring-1 shadow-soft-lg ring-line md:inset-x-auto md:-bottom-8 md:-left-6 md:max-w-[340px] md:p-5 lg:-left-10",
          )}
          style={at(1.3)}
        >
          <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-accent-soft text-accent">
            <HandHeart className="size-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <p className="min-w-0">
            <span className="block font-display text-xl leading-tight font-(--display-weight) text-ink md:text-2xl">
              <Counter value={card.value} suffix={card.suffix} reserveWidth /> {card.label}
            </span>
            <span className="mt-1 block text-sm text-muted md:text-base">{card.note}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
