import { Phone } from "lucide-react";
import { hero, heroTicker } from "@/content/pages/home";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { HeroHeadline } from "@/components/pages/home/HeroHeadline";
import { HeroTicker } from "@/components/pages/home/HeroTicker";
import { HeroRing } from "@/components/pages/home/HeroRing";
import { HeroStats } from "@/components/pages/home/HeroStats";
import { HeroTrustStrip } from "@/components/pages/home/HeroTrustStrip";
import { HeroParallax } from "@/components/pages/home/HeroParallax";
import { HeroParticles } from "@/components/pages/home/HeroParticles";
import { at, styles } from "@/components/pages/home/hero-styles";
import "@/components/pages/home/hero.css";

/**
 * 1 · #hero "Orbit". Server-rendered; the client islands are the ticker, the counters, the
 * pointer parallax, the motion toggle and (desktop, on demand) the particles.
 * Choreography, in seconds after the intro: background 0.0 · ring 0.1 · portrait 0.3 ·
 * words 0.4–0.9 · body + ticker 1.0 · chips 1.2 · buttons 1.5 · trust strip 1.8.
 * Layout: phones ring → text → buttons → body → stats; tablets text → ring → stats;
 * desktop text | ring with the chips around it (hero.css, .orbit-grid).
 */
export function HomeHero() {
  return (
    <section
      id="hero"
      data-tone="hero"
      aria-labelledby="hero-title"
      className={cn(
        styles.hero,
        "on-dark relative isolate flex flex-col overflow-hidden bg-ink text-white lg:min-h-[min(calc(100svh-36px),920px)]",
      )}
    >
      {/* Background: the hero gradient and two drifting glows */}
      <div aria-hidden="true" className={cn(styles.step, styles.fadeIn, "pointer-events-none absolute inset-0 -z-10")}>
        <div className={styles.bg} />
        <div className={cn(styles.glow, styles.glowBlue, styles.drift1, styles.loop)} />
        <div className={cn(styles.glow, styles.glowWarm, styles.drift2, styles.loop)} />
      </div>
      <HeroParticles />
      <HeroParallax />

      <Container
        className={cn(
          styles.grid,
          "flex-1 pt-[calc(var(--header-h)+30px)] pb-10 md:pt-[calc(var(--header-h)+48px)] md:pb-14 lg:pt-[calc(var(--header-h)+12px)] lg:pb-12",
        )}
      >
        <div className={cn(styles.areaHead, styles.scrollText, "mt-8 md:mt-0")}>
          <HeroHeadline />
        </div>

        <div className={cn(styles.areaBody, styles.scrollText, "mt-7 md:mt-5")}>
          <p
            className={cn(styles.step, styles.fadeUp, "max-w-[52ch] text-base text-white/75 md:text-lg")}
            style={at(1)}
          >
            {hero.body}
          </p>
        </div>

        <div className={cn(styles.areaTicker, styles.scrollText, "mt-4 md:mt-5")}>
          <div className={cn(styles.step, styles.fadeUp)} style={at(1.05)}>
            <HeroTicker
              lead={hero.ticker.lead}
              tail={hero.ticker.tail}
              words={heroTicker.words}
              sentence={heroTicker.sentence}
              className="text-[17px] text-white md:text-lg"
            />
          </div>
        </div>

        <div className={cn(styles.areaCta, styles.scrollText, "mt-7 md:mt-8")}>
          <div
            className={cn(styles.step, styles.fadeUp, "flex flex-col gap-3 md:flex-row md:flex-wrap md:items-center")}
            style={at(1.5)}
          >
            <AppointmentButton
              {...hero.ctas.primary}
              arrow
              fullWidthOnMobile
              className="cta-shine min-h-[52px] bg-(image:--grad-cta) shadow-(--cta-glow) md:min-h-12"
            />
            <AppointmentButton
              {...hero.ctas.secondary}
              variant="ghost"
              fullWidthOnMobile
              className="min-h-[52px] px-6 text-white ring-1 ring-white/30 ring-inset hover:bg-white/10 hover:text-white md:min-h-12"
            />
            <a
              href={site.contact.phoneHref}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-pill px-2 text-[15px] text-white/75 transition-colors hover:text-white md:justify-start"
            >
              <Phone className="size-4 text-accent-glow" strokeWidth={1.75} aria-hidden="true" />
              <span>
                {hero.phone.lead}{" "}
                <span className="font-semibold whitespace-nowrap text-white tabular-nums">
                  {site.contact.phoneDisplay}
                </span>
              </span>
            </a>
          </div>
        </div>

        <HeroRing />
        <HeroStats />
      </Container>

      <HeroTrustStrip />
    </section>
  );
}
