import { hero } from "@/content/pages/lung-cancer";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { HeroParallax } from "@/components/pages/home/HeroParallax";
import { HeroAir } from "@/components/pages/lung-cancer/HeroAir";
import { HeroHeadline } from "@/components/pages/lung-cancer/HeroHeadline";
import { HeroVisual } from "@/components/pages/lung-cancer/HeroVisual";
import { at, styles } from "@/components/pages/lung-cancer/hero-styles";
import "@/components/pages/lung-cancer/hero.css";

/**
 * 1 · #hero "BREATH". Server-rendered; the pause button, the parallax and the lazy air layer are
 * the only client code. Desktop (lg): text left, visual right, a full screen tall. Tablet: text,
 * then the visual at 70% width. Phones: the H1 and full-width buttons in the first screen, then
 * the visual (max 360px). The bottom padding leaves room for #highlights, which overlaps the hero
 * by 40px on desktop.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate overflow-hidden bg-surface-alt bg-(image:--grad-hero)")}
    >
      <HeroParallax />
      <HeroAir />
      <Container
        className={cn(
          "grid grid-cols-1 pt-[calc(var(--header-h)+14px)] pb-14",
          "md:pt-[calc(var(--header-h)+40px)] md:pb-20",
          "lg:min-h-svh lg:grid-cols-12 lg:content-center lg:items-center lg:gap-x-10 lg:pt-[calc(var(--header-h)+36px)] lg:pb-24",
        )}
      >
        <div className="lg:col-span-6">
          <HeroHeadline />

          <p
            className={cn(styles.step, styles.fadeUp, "mt-4 measure text-base text-text md:mt-6 md:text-lg")}
            style={at(0.95)}
          >
            {hero.body}
          </p>

          <div
            className={cn(styles.step, styles.fadeUp, "mt-5 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap")}
            style={at(1.15)}
          >
            <AppointmentButton {...hero.ctas.primary} arrow fullWidthOnMobile className={styles.shine} />
            <AppointmentButton
              {...hero.ctas.secondary}
              variant="secondary"
              fullWidthOnMobile
              className="border-ink/60 bg-surface"
            />
          </div>
        </div>

        <div className="mt-10 md:mx-auto md:mt-14 md:w-[70%] lg:col-span-6 lg:mt-0 lg:w-full">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
