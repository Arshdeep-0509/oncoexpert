import type * as React from "react";
import { dashboardTotal, outcomes } from "@/content/pages/colorectal-cancer";
import { keepLastWords } from "@/lib/format";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";
import { Counter } from "@/components/ui/Counter";
import { ProgressRing } from "@/components/ui/ProgressRing";
import "@/components/pages/colorectal-cancer/outcomes.css";

const { dashboard, survival, table } = outcomes;
const STEP = 0.12;

/**
 * 6 · #outcomes: the Outcome Dashboard (the total on a dark band, then one tile per stage with its
 * count as a large gradient figure; the tiles rise in turn while the counts count up) and the 5-Year Survival Rates (progress rings with their
 * captions). Desktop: side by side; tablets and phones: one after the other. The total is the
 * computed sum of the stages unless the doctor picks the live figure (content: totalSource).
 * Screen readers get both as tables.
 */
export function Outcomes() {
  return (
    <Section id="outcomes" aria-labelledby="outcomes-title">
      <table className="sr-only">
        <caption>{table.caption}</caption>
        <thead>
          <tr>
            <th scope="col">{table.stage}</th>
            <th scope="col">{table.cases}</th>
          </tr>
        </thead>
        <tbody>
          {dashboard.stages.map((s) => (
            <tr key={s.label}>
              <th scope="row">{s.label}</th>
              <td>{s.cases}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <th scope="row">{dashboard.totalLabel}</th>
            <td>{dashboardTotal}</td>
          </tr>
        </tfoot>
      </table>
      <table className="sr-only">
        <caption>{table.survivalCaption}</caption>
        <thead>
          <tr>
            <th scope="col">{table.stage}</th>
            <th scope="col">{table.survival}</th>
          </tr>
        </thead>
        <tbody>
          {survival.items.map((item) => (
            <tr key={item.stage}>
              <th scope="row">{item.stage}</th>
              <td>{item.rate}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
        {/* Dashboard */}
        <Reveal className="lg:col-span-7">
          <div className="flex h-full flex-col rounded-xl border border-line bg-surface-alt p-6 md:p-10">
            <h2 id="outcomes-title" className="heading-3 text-ink">
              {keepLastWords(dashboard.title)}
            </h2>
            {/* Visual only: the tables above carry the figures for screen readers. */}
            <div
              aria-hidden="true"
              className="mt-6 flex items-center justify-between gap-4 rounded-2xl bg-(image:--grad-plum) px-5 py-5 text-white md:mt-8 md:px-7 md:py-6"
              data-pending-approval={outcomes.pendingApproval}
            >
              <p className="text-[15px] leading-snug font-semibold text-white/85 md:text-lg">{dashboard.totalLabel}</p>
              <p className="shrink-0 font-display text-[3rem] leading-none font-semibold text-white tabular-nums md:text-[4.25rem]">
                <Counter value={dashboardTotal} delay={0.1} duration={1.2} />{" "}
                <span className="font-sans text-sm font-semibold text-accent-glow md:text-base">
                  {dashboard.totalUnit}
                </span>
              </p>
            </div>
            <div aria-hidden="true" className="mt-3 flex flex-1 flex-col md:mt-4">
              <InView className="cxo-tiles grid flex-1 auto-rows-fr grid-cols-2 gap-3 md:gap-4" threshold={0.4}>
                {dashboard.stages.map((s, i) => (
                  <div
                    key={s.label}
                    className="cxo-tile flex flex-col rounded-2xl bg-surface p-4 ring-1 ring-line md:p-6"
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <p className="text-[13px] leading-snug font-semibold text-text md:text-[15px]">{s.label}</p>
                    <p className="cxo-num mt-auto pt-5 font-display text-[2.75rem] leading-none font-semibold tabular-nums md:text-[4rem]">
                      <Counter value={s.cases} delay={0.25 + i * STEP} duration={1} />
                    </p>
                    <p className="mt-1.5 text-[11px] font-semibold tracking-[0.14em] text-muted uppercase md:text-xs">
                      {dashboard.casesUnit}
                    </p>
                  </div>
                ))}
              </InView>
            </div>
          </div>
        </Reveal>

        {/* Survival */}
        <Reveal className="lg:col-span-5" delay={0.08}>
          <div className="h-full rounded-xl bg-ink p-6 text-white md:p-10" data-tone="ink">
            <h2 className="heading-3 text-white">{keepLastWords(survival.title)}</h2>
            <ol className="mt-8 grid gap-6 md:grid-cols-3 md:gap-5 lg:grid-cols-1">
              {survival.items.map((item, i) => (
                <li
                  key={item.stage}
                  className="flex items-center gap-5 md:flex-col md:text-center lg:flex-row lg:text-left"
                >
                  <ProgressRing
                    value={item.rate}
                    size={88}
                    thickness={8}
                    sizeMd={104}
                    thicknessMd={9}
                    delay={i * 0.2}
                    onDark
                    label={`${item.stage}: ${item.rate}% ${survival.rateUnit}`}
                  >
                    <span className="font-display text-xl font-semibold text-white md:text-2xl">
                      <Counter value={item.rate} suffix="%" delay={i * 0.2} reserveWidth />
                    </span>
                  </ProgressRing>
                  <div className="min-w-0">
                    <h3 className="font-display text-lg leading-snug text-white">
                      {item.stage}: {keepLastWords(`${item.rate}% ${survival.rateUnit}`)}
                    </h3>
                    <p className="mt-1 text-[15px] leading-snug text-white/75">{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>

      <p className="mt-6 max-w-[68ch] text-[13px] leading-relaxed text-muted md:text-sm">{outcomes.disclaimer}</p>
    </Section>
  );
}
