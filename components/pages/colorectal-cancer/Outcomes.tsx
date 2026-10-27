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
const max = Math.max(...dashboard.stages.map((s) => s.cases));
const BAR_DELAY = 0.18;

/**
 * 6 · #outcomes: the Outcome Dashboard (stage case counts as bars that grow in turn while their
 * counts count up, then the total) and the 5-Year Survival Rates (progress rings with their
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
          <div className="h-full rounded-xl border border-line bg-surface-alt p-6 md:p-10">
            <h2 id="outcomes-title" className="heading-3 text-ink">
              {keepLastWords(dashboard.title)}
            </h2>
            {/* Visual only: the tables above carry the figures for screen readers. */}
            <div aria-hidden="true">
              <InView className="cxo-chart mt-8 grid grid-cols-4 gap-3 md:gap-6" threshold={0.5}>
                {dashboard.stages.map((s, i) => (
                  <div key={s.label} className="flex min-w-0 flex-col">
                    <p className="font-display text-xl leading-none font-semibold text-ink tabular-nums md:text-[1.75rem]">
                      <Counter value={s.cases} delay={0.15 + i * BAR_DELAY} duration={1} />
                      <span className="ml-1 font-sans text-xs font-semibold text-muted md:text-sm">
                        {dashboard.casesUnit}
                      </span>
                    </p>
                    <div className="mt-3 flex h-40 items-end rounded-lg bg-surface md:h-56">
                      <span
                        className="cxo-bar block w-full rounded-lg bg-(image:--grad-accent)"
                        style={{ height: `${(s.cases / max) * 100}%`, "--i": i } as React.CSSProperties}
                      />
                    </div>
                    <p className="mt-3 text-[13px] leading-snug text-muted md:text-sm">{s.label}</p>
                  </div>
                ))}
              </InView>
            </div>
            <div
              aria-hidden="true"
              className="mt-8 flex items-baseline justify-between gap-4 border-t border-line pt-6"
            >
              <p className="text-[15px] font-semibold text-text md:text-base">{dashboard.totalLabel}</p>
              <p
                className="font-display text-[2rem] leading-none font-semibold text-accent md:text-[2.5rem]"
                data-pending-approval={outcomes.pendingApproval}
              >
                <Counter value={dashboardTotal} delay={0.15 + dashboard.stages.length * BAR_DELAY} duration={1.2} />{" "}
                <span className="font-sans text-base font-semibold text-muted">{dashboard.totalUnit}</span>
              </p>
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
