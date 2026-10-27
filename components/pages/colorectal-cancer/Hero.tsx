import { Bot, Crosshair, ShieldCheck, type LucideIcon } from "lucide-react";
import { hero, type TrustIcon } from "@/content/pages/colorectal-cancer";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Chip } from "@/components/ui/Chip";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { HeroParallax } from "@/components/pages/home/HeroParallax";
import { HeroHeadline } from "@/components/pages/colorectal-cancer/HeroHeadline";
import { HeroVisual } from "@/components/pages/colorectal-cancer/HeroVisual";
import { at, styles } from "@/components/pages/colorectal-cancer/hero-styles";
import "@/components/pages/colorectal-cancer/hero.css";

const trustIcons: Record<TrustIcon, LucideIcon> = {
  robotic: Bot,
  laparoscopic: Crosshair,
  preservation: ShieldCheck,
};

/**
 * 1 · #hero. Server-rendered; only the counter, the pause button and the parallax are client code.
 * Desktop (lg): text left, visual right. Tablet: text, then the visual at 70% width.
 * Phones: the H1, full-width buttons and chips first, then the visual (no travelling dot) with the
 * stat card as a strip under it.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate overflow-hidden bg-surface-alt bg-(image:--grad-hero)")}
    >
      <HeroParallax />
      <Container
        className={cn(
          "grid grid-cols-1 pt-[calc(var(--header-h)+16px)] pb-12",
          "md:pt-[calc(var(--header-h)+40px)] md:pb-16",
          "lg:min-h-[min(calc(100svh-36px),880px)] lg:grid-cols-12 lg:content-center lg:items-center lg:gap-x-8 lg:pb-12",
        )}
      >
        <div className="lg:col-span-6">
          <HeroHeadline />

          <p
            className={cn(styles.step, styles.fadeUp, "mt-5 measure text-base text-text md:mt-6 md:text-lg")}
            style={at(0.95)}
          >
            {hero.body}
          </p>

          <div
            className={cn(styles.step, styles.fadeUp, "mt-7 flex flex-col gap-3 md:mt-8 md:flex-row md:flex-wrap")}
            style={at(1.15)}
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
              className="border-ink/70 bg-white max-md:min-h-[52px]"
            />
          </div>

          <ul aria-label={hero.a11y.trust} className="mt-6 flex flex-wrap gap-2 md:mt-7">
            {hero.trust.map((item, i) => (
              <li key={item.label} className={cn(styles.step, styles.fadeUp)} style={at(1.35 + i * 0.08)}>
                <Chip variant="outline" icon={trustIcons[item.icon]} className="bg-white/70 text-text">
                  {item.label}
                </Chip>
              </li>
            ))}
          </ul>
        </div>

        <div className="max-md:mt-6 md:mx-auto md:mt-14 md:w-[70%] lg:col-span-6 lg:mt-0 lg:w-full">
          <HeroVisual />
        </div>
      </Container>
    </section>
  );
}
