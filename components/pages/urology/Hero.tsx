import { hero } from "@/content/pages/urology";
import { urologySeo } from "@/content/pages/urology.seo";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { Definition } from "@/components/shared/Definition";
import { HeroFlow } from "@/components/pages/urology/HeroFlow";
import { HeroHeadline } from "@/components/pages/urology/HeroHeadline";
import { HeroVisual } from "@/components/pages/urology/HeroVisual";
import { at, styles } from "@/components/pages/urology/hero-styles";
import "@/components/pages/urology/hero.css";

/**
 * 1 · #hero "FLOW". Server-rendered; only the pause button is client code. Desktop: text left, the
 * stage right (top-aligned, so nothing re-centres while the HTML streams in). Tablets and phones:
 * text and full-width buttons first, then the shorter stage with two chips.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate overflow-hidden bg-surface-alt bg-(image:--grad-hero)")}
    >
      <HeroFlow />
      <Container
        className={cn(
          "grid grid-cols-1 gap-y-12 pt-[calc(var(--header-h)+20px)] pb-14",
          "md:gap-y-14 md:pt-[calc(var(--header-h)+48px)] md:pb-20",
          "lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:pt-[calc(var(--header-h)+56px)] lg:pb-24",
        )}
      >
        <div className="lg:col-span-6 lg:pt-12 xl:pt-16">
          <HeroHeadline />
          <Definition
            text={urologySeo.definition}
            className={cn(styles.step, styles.fadeUp, "mt-4 md:mt-5")}
            style={at(0.65)}
          />
          <p
            data-speakable
            className={cn(styles.step, styles.fadeUp, "mt-5 measure text-base text-muted md:mt-6 md:text-lg")}
            style={at(0.7)}
          >
            {hero.body}
          </p>
          <div
            className={cn(styles.step, styles.fadeUp, "mt-7 flex flex-col gap-3 md:mt-9 md:flex-row md:flex-wrap")}
            style={at(0.85)}
          >
            <AppointmentButton {...hero.ctas.primary} arrow fullWidthOnMobile />
            <AppointmentButton
              {...hero.ctas.secondary}
              variant="secondary"
              fullWidthOnMobile
              className="border-ink/50 bg-surface"
            />
          </div>
        </div>
        <div className="lg:col-span-6">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
