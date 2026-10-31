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
import { HeroHeadline } from "@/components/pages/breast-cancer/HeroHeadline";
import { HeroHighlights } from "@/components/pages/breast-cancer/HeroHighlights";
import { treatmentIcons } from "@/components/pages/breast-cancer/treatment-icons";
import { at, styles } from "@/components/pages/breast-cancer/hero-styles";
import "@/components/pages/breast-cancer/hero.css";

const heroPhoto = breastImages[hero.image];
const photo = { src: heroPhoto.src, alt: heroPhoto.alt, focal: heroPhoto.focal };

/**
 * 1 · #hero "Bloom". Server-rendered; only the stage, backdrop and petals are client code.
 * The visual: one hopeful woman with no frame, melting into the blush in front of a soft sun and
 * two turning rings, the ribbon and the three highlight cards floating around her.
 */
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
      {/* Petal texture at 6% in the corner. Kept in a box smaller than the hero photo so it never
          becomes the Largest Contentful Paint (that must be the photo). */}
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
            photo={photo}
            labels={hero.a11y}
            className="max-md:-mx-(--gutter) max-md:mb-2 md:w-full lg:w-[110%] lg:max-w-none"
          >
            <HeroRibbon
              className={cn(
                "absolute z-10 aspect-[120/170]",
                "max-md:top-[5%] max-md:left-[5%] max-md:w-[12%] md:top-[4%] md:-left-[2%] md:w-[12%]",
              )}
            />
            <HeroHighlights />
          </HeroStage>
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
