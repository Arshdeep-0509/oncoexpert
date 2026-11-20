import type * as React from "react";
import { hero } from "@/content/pages/stomach-cancer";
import { stomachSeo } from "@/content/pages/stomach-cancer.seo";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { Definition } from "@/components/shared/Definition";
import { HeroHeadline } from "@/components/pages/stomach-cancer/HeroHeadline";
import { HeroVisual } from "@/components/pages/stomach-cancer/HeroVisual";
import { at, styles } from "@/components/pages/stomach-cancer/hero-styles";
import "@/components/pages/stomach-cancer/hero.css";

/* Grain-like specks (left/top in %, saffron or periwinkle); `phone: false` ones only from 768px. */
const SPECKS = [
  { x: 8, y: 78, tone: "saffron", t: 20, s: 0.5, r: 20, dx: 50, dy: -120, phone: true },
  { x: 22, y: 92, tone: "ribbon", t: 24, s: 4, r: -30, dx: 30, dy: -150, phone: false },
  { x: 44, y: 70, tone: "saffron", t: 18, s: 7.5, r: 45, dx: -40, dy: -110, phone: false },
  { x: 58, y: 18, tone: "ribbon", t: 22, s: 2, r: 10, dx: 60, dy: -80, phone: true },
  { x: 72, y: 90, tone: "saffron", t: 26, s: 9, r: -15, dx: -30, dy: -160, phone: false },
  { x: 88, y: 40, tone: "ribbon", t: 19, s: 5.5, r: 60, dx: -50, dy: -100, phone: true },
  { x: 94, y: 84, tone: "saffron", t: 23, s: 11, r: 30, dx: -40, dy: -130, phone: false },
] as const;

const tone = { saffron: "var(--accent-bright)", ribbon: "var(--highlight)" } as const;

/**
 * 1 · #hero "WARMTH". Server-rendered; only the pause button and the trust card's counter are client
 * code. Desktop: text left, the photo card right (top-aligned, so nothing re-centres while the HTML
 * streams in). Tablets and phones: the headline, lead and full-width buttons first, then the photo
 * with the trust card over its lower edge.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate overflow-hidden bg-surface-alt bg-(image:--grad-hero)")}
    >
      <div aria-hidden="true" className={styles.specks}>
        {SPECKS.map((p, i) => (
          <span
            key={i}
            className={cn(styles.speck, !p.phone && styles.phoneHidden)}
            style={
              {
                left: `${p.x}%`,
                top: `${p.y}%`,
                background: tone[p.tone],
                "--t": `${p.t}s`,
                "--s": `${p.s}s`,
                "--r": `${p.r}deg`,
                "--dx": `${p.dx}px`,
                "--dy": `${p.dy}px`,
                "--o": p.tone === "ribbon" ? 0.55 : 0.6,
              } as React.CSSProperties
            }
          />
        ))}
      </div>
      <Container
        className={cn(
          "grid grid-cols-1 gap-y-4 pt-[calc(var(--header-h)+20px)] pb-16",
          "md:pt-[calc(var(--header-h)+48px)] md:pb-20",
          "lg:grid-cols-12 lg:items-start lg:gap-x-10 lg:pt-[calc(var(--header-h)+48px)] lg:pb-24",
        )}
      >
        <div className="lg:col-span-6 lg:pt-14 xl:pt-20">
          <HeroHeadline />
          <Definition
            text={stomachSeo.definition}
            className={cn(styles.step, styles.fadeUp, "mt-4 md:mt-5")}
            style={at(0.6)}
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
