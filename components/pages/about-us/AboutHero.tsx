import { ArrowRight } from "lucide-react";
import { hero } from "@/content/pages/about-us";
import { aboutImages } from "@/content/pages/about-us.images";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { MotionToggle } from "@/components/ui/MotionToggle";
import { DoctorRing } from "@/components/shared/DoctorRing";
import { at, styles } from "@/components/pages/about-us/about-styles";
import { AboutHeadline } from "@/components/pages/about-us/AboutHeadline";
import "@/components/pages/about-us/about.css";

/** Seconds after the intro (the headline and the portrait keep their own times). */
const T = { subtitle: 1.15, body: 1.3, ctas: 1.45 };

/**
 * #hero: a cinematic profile on the navy → logo-blue gradient. Left: eyebrow, the H1 (each word
 * rises in its mask, his name in the gradient), subtitle and intro verbatim, and the two buttons,
 * which open the booking page with the service preselected. Right: Home's portrait ring with the
 * four figures (the shared DoctorRing; its entrance waits for the intro, the pause button stops its
 * loops). Phones: the ring panel first, then the text.
 */
export function AboutHero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      data-tone="ink"
      className={cn(
        styles.hero,
        "on-dark relative isolate overflow-hidden bg-ink bg-(image:--grad-profile) text-white",
      )}
    >
      <Container
        className={cn(
          styles.grid,
          "pt-[calc(var(--header-h)+28px)] pb-16 md:pt-[calc(var(--header-h)+48px)] md:pb-20 lg:min-h-[min(100svh,960px)] lg:pt-[calc(var(--header-h)+56px)] lg:pb-24",
        )}
      >
        <div className={styles.areaPortrait}>
          <DoctorRing
            hero
            stats={hero.stats}
            label={hero.a11y.stats}
            photo={aboutImages[hero.image]}
            head={aboutImages.doctorHead}
          />
        </div>

        <div className={styles.areaText}>
          <AboutHeadline />
          <p
            className={cn(
              styles.step,
              styles.fadeUp,
              "mt-6 max-w-[40ch] text-lg leading-snug font-semibold text-accent-glow md:text-xl",
            )}
            style={at(T.subtitle)}
          >
            {hero.subtitle}
          </p>
          <p
            className={cn(styles.step, styles.fadeUp, "mt-5 measure text-base text-white/75 md:text-lg")}
            style={at(T.body)}
          >
            {hero.body}
          </p>
          <div className={cn(styles.step, styles.fadeUp, "mt-9 flex flex-wrap items-center gap-3")} style={at(T.ctas)}>
            <Button
              href={hero.ctas.primary.href}
              variant="onDark"
              icon={ArrowRight}
              cta={hero.ctas.primary.label}
              fullWidthOnMobile
            >
              {hero.ctas.primary.label}
            </Button>
            <Button
              href={hero.ctas.secondary.href}
              cta={hero.ctas.secondary.label}
              fullWidthOnMobile
              className="border border-white/30 bg-transparent text-white shadow-none hover:bg-white/10"
            >
              {hero.ctas.secondary.label}
            </Button>
            <MotionToggle pause={hero.a11y.pause} play={hero.a11y.play} onDark />
          </div>
        </div>
      </Container>
    </section>
  );
}
