import type * as React from "react";
import { Flame } from "lucide-react";
import { outcomes } from "@/content/pages/ovarian-cancer";
import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { InView } from "@/components/ui/InView";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { SurvivalChart } from "@/components/shared/SurvivalChart";
import "@/components/pages/ovarian-cancer/outcomes.css";

const HEAT_ICONS = 5;

/**
 * 8 · #outcomes "Clinical Excellence & Outcomes". The two live figures: 96% as a large
 * ProgressRing, "500+" counting up while five heat icons fill in turn (both PENDING DOCTOR). Beside
 * them the shared SurvivalChart (Stage I–IV, one colour for every stage) and the live "Dec 2023"
 * footnote. Desktop: the figures stay sticky beside the chart. Screen-reader tables for both.
 */
export function Outcomes() {
  const [ring, count] = outcomes.stats;
  return (
    <section id="outcomes" aria-labelledby="outcomes-title" className="bg-surface-alt py-(--section-y)">
      <Container>
        <h2 id="outcomes-title" className="heading-2 text-ink">
          {outcomes.lines.map((line, i) => (
            <span key={line}>
              {i > 0 ? " " : null}
              <span className="md:block">{line}</span>
            </span>
          ))}
        </h2>
        <p className="mt-4 measure text-base text-text md:text-lg">{outcomes.intro}</p>

        {/* In a div: a table ignores sr-only's 1px width and would widen the page. */}
        <div className="sr-only">
          <table>
            <caption>{outcomes.a11y.figures}</caption>
            <thead>
              <tr>
                <th scope="col">{outcomes.a11y.figure}</th>
                <th scope="col">{outcomes.a11y.value}</th>
              </tr>
            </thead>
            <tbody>
              {outcomes.stats.map((s) => (
                <tr key={s.lines.join(" ")}>
                  <th scope="row">{s.lines.join(" ")}</th>
                  <td>
                    {s.value}
                    {s.suffix}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start lg:gap-x-14">
          <div
            aria-hidden="true"
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:col-span-5 lg:grid-cols-1"
          >
            <div className="flex items-center gap-5 rounded-xl bg-surface p-5 ring-1 shadow-soft-sm ring-line md:p-6">
              <ProgressRing
                value={ring.value}
                size={100}
                thickness={10}
                sizeMd={150}
                thicknessMd={12}
                label={`${ring.lines.join(" ")}: ${ring.value}${ring.suffix}`}
              >
                <span className="font-display text-[1.9rem] leading-none font-semibold text-ink md:text-[2.4rem]">
                  <Counter value={ring.value} suffix={ring.suffix} duration={1.4} reserveWidth />
                </span>
              </ProgressRing>
              <p className="min-w-0 text-sm leading-snug font-bold tracking-[0.08em] break-words text-muted">
                {ring.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </div>
            <InView
              threshold={0.5}
              className="ovo-heat flex flex-col gap-4 rounded-xl bg-surface p-5 ring-1 shadow-soft-sm ring-line md:p-6"
            >
              <p className="font-display text-[2.6rem] leading-none font-semibold text-ink md:text-[3.25rem]">
                <Counter value={count.value} suffix={count.suffix} duration={1.6} reserveWidth />
              </p>
              <span className="flex gap-2">
                {Array.from({ length: HEAT_ICONS }, (_, k) => (
                  <span key={k} className="relative size-7" style={{ "--k": k } as React.CSSProperties}>
                    <Flame className="absolute inset-0 size-7 text-line" strokeWidth={1.75} />
                    <span className="absolute inset-0 overflow-hidden">
                      <span className="ovo-rise block">
                        <Flame className="size-7 fill-gold text-gold" strokeWidth={1.75} />
                      </span>
                    </span>
                  </span>
                ))}
              </span>
              <p className="text-sm leading-snug font-bold tracking-[0.08em] text-muted">
                {count.lines.map((l) => (
                  <span key={l} className="block">
                    {l}
                  </span>
                ))}
              </p>
            </InView>
          </div>

          <div className="lg:col-span-7">
            <h3 className="font-display text-2xl text-ink md:text-[1.75rem]">{outcomes.survival.title}</h3>
            <SurvivalChart
              className="mt-6"
              rows={outcomes.survival.rows}
              unit={outcomes.survival.unit}
              caption={outcomes.a11y.survival}
              labels={{ row: outcomes.a11y.row, value: outcomes.a11y.rate }}
              footnote={outcomes.footnote}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}
