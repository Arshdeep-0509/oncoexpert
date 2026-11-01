import { hero } from "@/content/pages/thyroid-cancer";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { HeroParallax } from "@/components/pages/home/HeroParallax";
import { HeroButterflies } from "@/components/pages/thyroid-cancer/HeroButterflies";
import { HeroHeadline } from "@/components/pages/thyroid-cancer/HeroHeadline";
import { HeroStats } from "@/components/pages/thyroid-cancer/HeroStats";
import { HeroVisual } from "@/components/pages/thyroid-cancer/HeroVisual";
import { at, styles } from "@/components/pages/thyroid-cancer/hero-styles";
import "@/components/pages/thyroid-cancer/hero.css";

/**
 * 1 · #hero "THE BUTTERFLY". Server-rendered; the pause button, the parallax and the lazy
 * butterflies are the client code. Desktop: text left, visual right, the stat chips in a row under
 * both. Tablets: the chips three across. Phones: text and buttons, the visual, then the chips as a
 * swipe row.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate overflow-hidden bg-surface-alt bg-(image:--grad-hero)")}
    >
      <HeroParallax />
      <HeroButterflies />
      <Container
        className={cn(
          "grid grid-cols-1 pt-[calc(var(--header-h)+14px)] pb-12",
          "md:pt-[calc(var(--header-h)+40px)] md:pb-16",
          "lg:grid-cols-12 lg:items-center lg:gap-x-10 lg:pt-[calc(var(--header-h)+48px)]",
        )}
      >
        <div className="lg:col-span-6">
          <HeroHeadline />
          <div
            className={cn(styles.step, styles.fadeUp, "mt-6 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap")}
            style={at(1.1)}
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
        <div className="mt-10 mb-10 md:mt-12 md:mb-14 lg:col-span-6 lg:mt-0 lg:mb-10">
          <HeroVisual />
        </div>
        <div className="mt-10 md:mt-12 lg:col-span-12">
          <HeroStats />
        </div>
      </Container>
    </section>
  );
}
