import type * as React from "react";
import { BadgeCheck, Bot, Users, type LucideIcon } from "lucide-react";
import { leadership } from "@/content/pages/urology";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";
import { InView } from "@/components/ui/InView";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import "@/components/pages/urology/leadership.css";

const cardIcons: Record<string, LucideIcon> = { mastery: Bot, "tumor-board": Users };
const [survival, precision] = leadership.outcome.figures;

/** A figure as text, for the table: "5,000+", "99.8%". */
const asText = (f: { value: number; suffix: string }) => `${f.value.toLocaleString("en-IN")}${f.suffix}`;

/** Gauge ticks: every 10, longer every 50. */
const TICKS = Array.from({ length: 11 }, (_, i) => i * 10);

/**
 * 5 · #leadership "Clinical Leadership & Infrastructure" (surface). Two leadership cards (Robotic
 * Mastery with its "15+ Years Exp" and "FELLOWSHIP TRAINED" chips; Integrated Tumor Board), then
 * "Patient Outcome" as a calm dark monitor: thin grid lines, one marigold live dot, the 92% survival
 * as a ProgressRing, the 99.8% precision on a fine horizontal gauge, and the three tiles counting up.
 * Every figure is also in a visually hidden table. All figures are PENDING DOCTOR (content).
 */
export function Leadership() {
  return (
    <Section id="leadership" tone="surface" aria-labelledby="leadership-title">
      <SectionHeading id="leadership-title" title={leadership.title} />

      <Reveal stagger className="mt-8 grid grid-cols-1 gap-5 md:mt-12 md:grid-cols-2 md:gap-6" itemClassName="h-full">
        {leadership.cards.map((card) => {
          const Icon = cardIcons[card.key] ?? BadgeCheck;
          return (
            <article
              key={card.key}
              className="flex h-full flex-col rounded-3xl bg-surface-alt p-6 ring-1 ring-line md:p-8"
            >
              <span className="grid size-12 place-items-center rounded-xl bg-accent-soft text-accent">
                <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-xl font-(--display-weight) tracking-(--display-tracking) text-ink md:text-2xl">
                {card.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-muted">{card.body}</p>
              {"stat" in card ? (
                <div className="mt-5 flex flex-wrap gap-2">
                  <span className="inline-flex min-h-9 items-center rounded-lg bg-surface px-3 text-sm font-semibold text-ink tabular-nums ring-1 ring-line">
                    {card.stat.value}
                    {card.stat.suffix} {card.stat.label}
                  </span>
                  <span className="inline-flex min-h-9 items-center rounded-lg bg-accent px-3 text-xs font-bold tracking-[0.14em] text-white">
                    {card.badge}
                  </span>
                </div>
              ) : null}
            </article>
          );
        })}
      </Reveal>

      {/* Patient Outcome: the monitor */}
      <InView
        threshold={0.3}
        className="uro-ld-monitor relative isolate mt-6 overflow-hidden rounded-3xl bg-ink bg-(image:--grad-plum) p-6 text-white md:mt-8 md:p-10"
      >
        <div aria-hidden="true" className="uro-ld-grid pointer-events-none absolute inset-0 -z-10" />
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="uro-ld-live size-2.5 rounded-full bg-highlight" />
          <h3 className="font-display text-xl font-(--display-weight) tracking-(--display-tracking) text-white md:text-2xl">
            {leadership.outcome.title}
          </h3>
        </div>

        {/* The figures for screen readers (in a div: a table ignores sr-only's width). */}
        <div className="sr-only">
          <table>
            <caption>{leadership.a11y.table}</caption>
            <thead>
              <tr>
                <th scope="col">{leadership.a11y.figure}</th>
                <th scope="col">{leadership.a11y.value}</th>
              </tr>
            </thead>
            <tbody>
              {[...leadership.outcome.figures, ...leadership.tiles].map((f) => (
                <tr key={f.label}>
                  <th scope="row">{f.label}</th>
                  <td>{asText(f)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div aria-hidden="true" className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-center lg:gap-10">
          {/* 92%: the ring */}
          <div className="flex items-center gap-5 lg:col-span-5">
            <ProgressRing
              value={survival.value}
              size={128}
              sizeMd={156}
              thickness={9}
              label={leadership.a11y.ring}
              onDark
            >
              <span className="font-display text-3xl font-(--display-weight) text-white md:text-4xl">
                <Counter value={survival.value} suffix={survival.suffix} reserveWidth />
              </span>
            </ProgressRing>
            <p className="text-sm font-semibold tracking-[0.12em] text-accent-glow uppercase">{survival.label}</p>
          </div>

          {/* 99.8%: the gauge */}
          <div className="lg:col-span-7">
            <div className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-semibold tracking-[0.12em] text-accent-glow uppercase">{precision.label}</p>
              <p className="font-display text-3xl font-(--display-weight) text-white tabular-nums md:text-4xl">
                {precision.value}
                {precision.suffix}
              </p>
            </div>
            <div className="relative mt-4 h-3 overflow-hidden rounded-pill bg-white/10">
              <span
                className="uro-ld-fill absolute inset-y-0 left-0 w-full origin-left rounded-pill bg-(image:--grad-accent)"
                style={{ "--v": precision.value / 100 } as React.CSSProperties}
              />
            </div>
            <div className="relative mt-2 h-5">
              {TICKS.map((t) => (
                <span
                  key={t}
                  className={cn("absolute top-0 w-px bg-white/35", t % 50 === 0 ? "h-3" : "h-2")}
                  style={{ left: `${t}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* The tiles */}
        <ul aria-hidden="true" className="mt-8 grid grid-cols-3 gap-2 border-t border-white/10 pt-8 sm:gap-3 md:gap-4">
          {leadership.tiles.map((t) => {
            const compact = "compact" in t && t.compact;
            return (
              <li key={t.label} className="rounded-2xl bg-white/[0.05] p-3 ring-1 ring-white/10 sm:p-5">
                <p className="font-display text-[1.75rem] leading-none font-(--display-weight) text-white sm:text-4xl md:text-5xl">
                  <Counter
                    value={compact ? t.value / 1000 : t.value}
                    suffix={compact ? `k${t.suffix}` : t.suffix}
                    reserveWidth
                  />
                </p>
                <p className="mt-2 text-[11px] leading-snug font-semibold tracking-[0.12em] text-white/70 sm:mt-3 sm:text-xs sm:tracking-[0.16em]">
                  {t.label}
                </p>
              </li>
            );
          })}
        </ul>
      </InView>
    </Section>
  );
}
