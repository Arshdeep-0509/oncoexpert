import Image from "next/image";
import { hero } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { HeroBackdrop } from "@/components/pages/breast-cancer/HeroBackdrop";
import { HeroPetals } from "@/components/pages/breast-cancer/HeroPetals";
import { HeroStage } from "@/components/pages/breast-cancer/HeroStage";
import { HeroRibbon } from "@/components/pages/breast-cancer/HeroRibbon";
import { HeroCounter } from "@/components/pages/breast-cancer/HeroCounter";
import { HeroHeadline } from "@/components/pages/breast-cancer/HeroHeadline";
import { HeroStats } from "@/components/pages/breast-cancer/HeroStats";
import { treatmentIcons } from "@/components/pages/breast-cancer/treatment-icons";
import { at, styles } from "@/components/pages/breast-cancer/hero-styles";
import "@/components/pages/breast-cancer/hero.css";

const slides = hero.slides.map((key) => {
  const img = breastImages[key];
  return { src: img.src, alt: img.alt, focal: img.focal };
});

/** 1 · #hero "Bloom". Server-rendered; only the stage, backdrop, petals and counters are client code. */
export function Hero() {
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
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 -z-10 size-[min(36vw,380px)] overflow-hidden rounded-tl-[999px] opacity-[0.06]"
      >
        <Image
          src={petals.src}
          alt=""
          aria-hidden="true"
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
        <HeroHeadline />

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
            <HeroStats />
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
          className="-mx-(--gutter) no-scrollbar flex gap-2 overflow-x-auto px-(--gutter) md:col-start-1 md:row-start-3 md:mx-0 md:flex-wrap md:overflow-visible md:px-0 lg:col-span-6"
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
