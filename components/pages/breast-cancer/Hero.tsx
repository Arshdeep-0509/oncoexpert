import * as React from "react";
import Image from "next/image";
import { breadcrumb, hero } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Chip } from "@/components/ui/chip";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroPetals } from "./HeroPetals";
import { HeroStage } from "./HeroStage";
import { HeroRibbon } from "./HeroRibbon";
import { HeroCounter } from "./HeroCounter";
import { treatmentIcons } from "./treatment-icons";
import { styles } from "./hero-styles";
import "./hero.css";

/** Entrance step at `d` seconds of the (desktop) choreography; see hero.css. */
const at = (d: number) => ({ "--d": `${d}s` }) as React.CSSProperties;

const slides = hero.slides.map((key) => {
  const img = breastImages[key];
  return { src: img.src, alt: img.alt, focal: img.focal };
});

/*
 * Stat card placement around the arch.
 * Desktop/tablet: top-left, middle-right, bottom-left.
 * Phones: the first two are pinned half outside the arch's bottom corners; the third
 * moves to the strip under the arch.
 */
const CARD_POSITION = [
  "max-md:-left-[5%] max-md:bottom-0 max-md:translate-y-1/2 md:top-[4%] md:-left-[14%] lg:top-[9%] lg:-left-[16%]",
  "max-md:-right-[5%] max-md:bottom-0 max-md:translate-y-1/2 md:top-[40%] md:-right-[8%] lg:top-[44%] lg:-right-[12%]",
  "max-md:hidden md:bottom-[3%] md:-left-[14%] lg:bottom-[7%] lg:-left-[20%]",
] as const;
const FLOAT = ["6.5s", "7.5s", "7s"] as const;

function StatCard({ index, className }: { index: number; className?: string }) {
  const stat = hero.stats[index];
  return (
    <div
      className={cn(
        "rounded-[20px] border border-line bg-white/90 px-4 py-3 shadow-soft-lg md:rounded-[16px] md:px-3.5 md:py-2.5 lg:rounded-[20px] lg:px-5 lg:py-4",
        className,
      )}
    >
      <p className="font-display text-[1.75rem] leading-none font-semibold text-ink md:text-[1.6rem] lg:text-[2.25rem]">
        <HeroCounter value={stat.value} suffix={stat.suffix} />
      </p>
      <p className="mt-1.5 text-[13px] leading-snug text-muted md:mt-1 md:text-[12px] lg:mt-1.5 lg:text-[13px]">{stat.label}</p>
    </div>
  );
}

/** 1 · #hero "Bloom". Server-rendered; only the stage, backdrop, petals and counters are client code. */
export function Hero() {
  const lines = hero.headline;
  const petals = breastImages.petalsTexture;

  return (
    <section
      id="hero"
      data-tone="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate overflow-hidden bg-surface-alt bg-(image:--grad-hero)")}
    >
      <HeroBackdrop />
      {/* Petal texture at 6% in the corner. Kept in a box smaller than the arch so it never
          becomes the Largest Contentful Paint (that must be hero-woman-1). */}
      <div aria-hidden="true" className="pointer-events-none absolute right-0 bottom-0 -z-10 size-[min(36vw,380px)] overflow-hidden rounded-tl-[999px] opacity-[0.06]">
        <Image
          src={petals.src}
          alt=""
          fill
          sizes="(min-width: 1056px) 380px, 36vw"
          className="object-cover select-none"
          style={{ objectPosition: petals.focal }}
        />
      </div>
      <HeroPetals />

      <Container
        className={cn(
          "grid grid-cols-1 gap-y-7 pt-[calc(var(--header-h)+20px)] pb-14",
          "md:grid-cols-[minmax(0,1fr)_45%] md:grid-rows-[1fr_auto_auto_auto_1fr] md:content-center md:gap-x-10 md:gap-y-6 md:pt-[calc(var(--header-h)+40px)] md:pb-20",
          "lg:min-h-[min(calc(100svh-36px),920px)] lg:grid-cols-12 lg:gap-x-6 lg:pb-[calc(var(--header-h)*0.5)]",
        )}
      >
        {/* Breadcrumb · eyebrow · H1 */}
        <div className="md:col-start-1 md:row-start-2 lg:col-span-6">
          <div className={cn(styles.step, styles.fadeDown)} style={at(0.1)}>
            <Breadcrumb label={breadcrumb.label} items={breadcrumb.items} className="mb-5 max-md:sr-only" />
            <Eyebrow>{hero.eyebrow}</Eyebrow>
          </div>

          <h1
            id="hero-title"
            className="mt-5 font-display text-[clamp(2.1rem,8.5vw,2.6rem)] leading-[1.04] tracking-[-0.02em] text-ink [overflow-wrap:normal] [hyphens:manual] md:mt-6 md:text-[clamp(2.4rem,5.6vw,4.6rem)]"
          >
            {lines.map((text, i) => {
              const isEmphasis = i === hero.emphasisLine;
              return (
                <span key={text} className={cn(styles.lineMask, i === 0 && "mb-1 md:mb-2")}>
                  <span
                    className={cn(styles.line, styles.step, styles.rise, i === 0 && "text-[0.7em] leading-[1.15] md:text-[0.6em]")}
                    style={at(0.2 + i * 0.12)}
                  >
                    {isEmphasis ? (
                      <span className={cn(styles.gradientText, "relative inline-block italic")}>
                        {text}
                        <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className={styles.underline}>
                          <path
                            d="M4 13 C 55 6, 120 4, 180 8 S 268 15, 296 7"
                            pathLength={1}
                            fill="none"
                            style={{ stroke: "var(--accent)" }}
                            strokeOpacity={0.55}
                            strokeWidth={3}
                            strokeLinecap="round"
                            vectorEffect="non-scaling-stroke"
                          />
                        </svg>
                      </span>
                    ) : (
                      text
                    )}
                  </span>
                </span>
              );
            })}
          </h1>
        </div>

        {/* Image stage */}
        <div className="md:col-start-2 md:row-span-5 md:row-start-1 md:self-center lg:col-span-6 lg:col-start-7">
          <HeroStage
            slides={slides}
            labels={hero.a11y}
            className="mx-auto w-[min(84vw,calc(58svh*0.8))] max-md:mb-10 md:w-full md:max-w-[520px] lg:w-[86%]"
          >
            <HeroRibbon
              className={cn(
                "absolute z-10 aspect-[120/170]",
                "max-md:-top-[3%] max-md:-left-[7%] max-md:w-[19%] md:top-[30%] md:-left-[13%] md:w-[30%]",
              )}
            />
            <div role="list" aria-label={hero.a11y.stats}>
              {hero.stats.map((stat, i) => (
                <div
                  key={stat.label}
                  role="listitem"
                  className={cn("absolute z-10 w-[46%] md:w-[50%] lg:w-[min(200px,44%)]", CARD_POSITION[i])}
                >
                  <div className={cn(styles.step, styles.pop)} style={at(1 + i * 0.15)}>
                    <div
                      className="motion-safe:animate-float"
                      style={{ "--float-duration": FLOAT[i], animationDelay: `-${i * 2.1}s` } as React.CSSProperties}
                    >
                      <StatCard index={i} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </HeroStage>
        </div>

        {/* Phones: the third stat as a strip under the arch */}
        <div className={cn(styles.step, styles.pop, "md:hidden")} style={at(1.3)}>
          <div className="flex items-center gap-4 rounded-[20px] border border-line bg-white/90 px-5 py-3.5 shadow-soft">
            <p className="shrink-0 font-display text-[1.75rem] leading-none font-semibold text-ink">
              <HeroCounter value={hero.stats[2].value} suffix={hero.stats[2].suffix} />
            </p>
            <p className="text-[13px] leading-snug text-muted">{hero.stats[2].label}</p>
          </div>
        </div>

        {/* Chips */}
        <ul
          aria-label={hero.a11y.chips}
          className="no-scrollbar -mx-(--gutter) flex gap-2 overflow-x-auto px-(--gutter) md:col-start-1 md:row-start-3 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 lg:col-span-6"
        >
          {hero.chips.map((chip, i) => (
            <li key={chip.key} className={cn("shrink-0", styles.step, styles.fadeUp)} style={at(1.2 + i * 0.06)}>
              <Chip icon={treatmentIcons[chip.key]}>{chip.label}</Chip>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div
          className={cn(
            styles.step,
            styles.fadeUp,
            "flex flex-col gap-3 md:col-start-1 md:row-start-4 md:mt-2 md:flex-row md:flex-wrap lg:col-span-6",
          )}
          style={at(1.5)}
        >
          <AppointmentButton
            {...hero.ctas.primary}
            arrow
            fullWidthOnMobile
            className={cn(styles.shine, "max-md:min-h-[52px]")}
          />
          <AppointmentButton
            {...hero.ctas.secondary}
            variant="secondary"
            fullWidthOnMobile
            className="border-ink/80 bg-white max-md:min-h-[52px]"
          />
        </div>
      </Container>
    </section>
  );
}
