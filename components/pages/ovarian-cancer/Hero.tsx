import { hero } from "@/content/pages/ovarian-cancer";
import { ovarianSeo } from "@/content/pages/ovarian-cancer.seo";
import { Definition } from "@/components/shared/Definition";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { HeroParallax } from "@/components/pages/home/HeroParallax";
import { HeroHeadline } from "@/components/pages/ovarian-cancer/HeroHeadline";
import { HeroVisual } from "@/components/pages/ovarian-cancer/HeroVisual";
import { at, styles } from "@/components/pages/ovarian-cancer/hero-styles";
import "@/components/pages/ovarian-cancer/hero.css";

/**
 * 1 · #hero "THE TEAL RIBBON". Server-rendered; the pause button and the parallax are the only
 * client code. Desktop: text left, the ribbon and portrait right. Tablet: text, then the visual.
 * Phones: the H1 and full-width buttons first, then the visual (max 360px).
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate overflow-hidden bg-surface-warm bg-(image:--grad-hero)")}
    >
      <HeroParallax />
      <Container
        className={cn(
          "grid grid-cols-1 pt-[calc(var(--header-h)+14px)] pb-14",
          "md:pt-[calc(var(--header-h)+40px)] md:pb-20",
          "lg:min-h-[min(100svh,960px)] lg:grid-cols-12 lg:content-center lg:items-center lg:gap-x-10 lg:pt-[calc(var(--header-h)+36px)]",
        )}
      >
        <div className="lg:col-span-6">
          <HeroHeadline />
          <p
            data-speakable
            className={cn(styles.step, styles.fadeUp, "mt-4 measure text-base text-text md:mt-6 md:text-lg")}
            style={at(1.05)}
          >
            {hero.body}
          </p>
          <Definition
            text={ovarianSeo.definition}
            className={cn(styles.step, styles.fadeUp, "mt-3")}
            style={at(1.05)}
          />
          <div
            className={cn(styles.step, styles.fadeUp, "mt-5 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap")}
            style={at(1.2)}
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
        <div className="mt-10 md:mt-14 lg:col-span-6 lg:mt-0">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
