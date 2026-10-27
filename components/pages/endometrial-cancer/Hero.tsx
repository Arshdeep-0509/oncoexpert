import type * as React from "react";
import { Activity, Bot, Crosshair, Globe, type LucideIcon } from "lucide-react";
import { breadcrumb, hero, type FeatureIcon } from "@/content/pages/endometrial-cancer";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { HeroVisual } from "@/components/pages/endometrial-cancer/HeroVisual";
import { at, styles } from "@/components/pages/endometrial-cancer/hero-styles";
import "@/components/pages/endometrial-cancer/hero.css";

const featureIcons: Record<FeatureIcon, LucideIcon> = {
  robotic: Bot,
  sentinel: Crosshair,
  recovery: Activity,
  standards: Globe,
};

const FIRST_WORD = 0.25;
const WORD_GAP = 0.06;

/** Colour at `t` (0–1) along the accent gradient: deep coral → coral. */
const gradientAt = (t: number) => `color-mix(in oklab, var(--accent-bright) ${Math.round(t * 100)}%, var(--accent))`;

/** The H1: each word rises in its own mask; the emphasis words carry their slice of the gradient. */
function Headline() {
  const words = hero.title.split(" ");
  const emphasis = hero.emphasis.split(" ");
  const from = words.findIndex((_, i) => emphasis.every((w, j) => words[i + j] === w));
  const length = hero.emphasis.length;
  const sliceOf = (i: number) => {
    const j = i - from;
    if (from < 0 || j < 0 || j >= emphasis.length) return undefined;
    const start = j === 0 ? 0 : emphasis.slice(0, j).join(" ").length + 1;
    return { from: start / length, to: (start + emphasis[j].length) / length };
  };

  return (
    <h1
      id="hero-title"
      className="mt-4 font-display text-[clamp(1.95rem,8.2vw,2.4rem)] leading-[1.08] tracking-(--display-tracking) text-ink md:mt-6 md:text-[3rem] lg:text-[clamp(2.5rem,3.6vw,3.4rem)]"
    >
      {words.map((word, i) => {
        const slice = sliceOf(i);
        return (
          <span key={i}>
            {i > 0 ? " " : null}
            <span className={styles.wordMask}>
              <span
                className={cn(styles.word, styles.step, styles.wordRise, slice && styles.gradWord)}
                style={
                  {
                    "--d": `${(FIRST_WORD + i * WORD_GAP).toFixed(2)}s`,
                    ...(slice ? { "--from": gradientAt(slice.from), "--to": gradientAt(slice.to) } : {}),
                  } as React.CSSProperties
                }
              >
                {word}
              </span>
            </span>
          </span>
        );
      })}
    </h1>
  );
}

/**
 * 1 · #hero: the warm peach hero. Server-rendered; the bloom (desktop) and the pause button are
 * the only client code. Desktop: text left, visual right. Tablet: stacked, the chips in a 2×2
 * grid. Phones: the compact visual first, then the H1, full-width buttons and the chips as a
 * swipe row.
 */
export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className={cn(styles.hero, "relative isolate overflow-hidden bg-surface-alt bg-(image:--grad-hero)")}
    >
      <Container
        className={cn(
          "grid grid-cols-1 pt-[calc(var(--header-h)+16px)] pb-12",
          "md:pt-[calc(var(--header-h)+40px)] md:pb-16",
          "lg:min-h-[min(calc(100svh-36px),880px)] lg:grid-cols-12 lg:content-center lg:items-center lg:gap-x-10 lg:pb-12",
        )}
      >
        <div className="max-md:order-2 lg:col-span-6">
          <div className={cn(styles.step, styles.fadeDown)} style={at(0.05)}>
            <Breadcrumb label={breadcrumb.label} items={breadcrumb.items} className="mb-5 max-md:sr-only" />
            <p className="inline-flex min-h-8 items-center gap-2 rounded-pill bg-accent-soft px-3.5 py-1.5 text-xs leading-tight font-semibold tracking-[0.14em] text-accent uppercase">
              <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
              {hero.eyebrow}
            </p>
          </div>

          <Headline />

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
            <AppointmentButton {...hero.ctas.primary} arrow fullWidthOnMobile className="max-md:min-h-[52px]" />
            <AppointmentButton
              {...hero.ctas.secondary}
              variant="secondary"
              fullWidthOnMobile
              className="border-ink/60 bg-white max-md:min-h-[52px]"
            />
          </div>
        </div>

        <div className="max-md:order-1 max-md:mb-8 md:order-3 md:mx-auto md:mt-12 md:w-[72%] lg:order-none lg:col-span-6 lg:mt-0 lg:w-full">
          <HeroVisual />
        </div>

        {/* The four features: a swipe row after the text (phones), a 2×2 grid after the text
            (tablets), one row of four across the hero under both columns (desktop). */}
        <ul
          aria-label={hero.a11y.features}
          className={cn(
            styles.chips,
            "-mx-(--gutter) mt-7 flex snap-x snap-mandatory gap-2.5 overflow-x-auto px-(--gutter) pt-1 pb-3 max-md:order-3",
            "md:order-2 md:mx-0 md:grid md:max-w-xl md:grid-cols-2 md:overflow-visible md:px-0 md:pb-1",
            "lg:order-none lg:col-span-12 lg:mt-12 lg:max-w-none lg:grid-cols-4 lg:gap-5",
          )}
        >
          {hero.features.map((f, i) => {
            const Icon = featureIcons[f.icon];
            return (
              <li
                key={f.label}
                className={cn(styles.step, styles.pop, "shrink-0 snap-start")}
                style={at(1.35 + i * 0.1)}
              >
                <span
                  className={cn(
                    styles.float,
                    "flex min-h-12 items-center gap-2 rounded-pill bg-white/85 py-2 pr-3.5 pl-2 text-xs font-semibold tracking-[0.06em] whitespace-nowrap text-ink ring-1 shadow-soft-sm ring-line",
                  )}
                  style={{ "--float": `${6 + (i % 2)}s`, "--phase": `${-i * 1.3}s` } as React.CSSProperties}
                >
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  {f.label}
                </span>
              </li>
            );
          })}
        </ul>
      </Container>
    </section>
  );
}
