import { outcomes } from "@/content/pages/breast-cancer";
import { sumBy } from "@/lib/content";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProgressRing } from "@/components/ui/progress-ring";
import { Counter } from "@/components/ui/counter";
import { OutcomeStages } from "./OutcomeStages";

/** 8 · #outcomes */
export function ProvenOutcomes() {
  // Never typed in: the sum of the stage cases (currently 216).
  const total = sumBy(outcomes.stages, (s) => s.cases);

  return (
    <Section id="outcomes" tone="surface" aria-labelledby="outcomes-title">
      <Reveal>
        <SectionHeading id="outcomes-title" eyebrow={outcomes.label} title={outcomes.title} />
      </Reveal>

      {/* Response rings + total */}
      <Reveal className="mt-10 grid grid-cols-2 gap-4 md:mt-14 md:gap-6 lg:grid-cols-[1fr_1fr_1.3fr]" delay={0.05}>
        {outcomes.responses.map((r, i) => (
          <div
            key={r.label}
            className="flex flex-col items-center gap-4 rounded-xl bg-surface-alt p-5 text-center md:p-8 lg:flex-row lg:text-left"
          >
            <ProgressRing
              value={r.value}
              size={120}
              thickness={10}
              sizeMd={160}
              thicknessMd={12}
              delay={i * 0.12}
              label={`${r.value}${r.suffix} ${r.label}`}
            >
              <span className="font-display text-[1.75rem] font-semibold text-ink md:text-[2.25rem]">
                <Counter value={r.value} suffix={r.suffix} delay={i * 0.12} reserveWidth />
              </span>
            </ProgressRing>
            <p aria-hidden="true" className="font-display text-lg leading-snug text-ink md:text-xl">
              {r.label}
            </p>
          </div>
        ))}
        <div className="col-span-2 flex flex-col justify-center rounded-xl bg-ink bg-(image:--grad-plum) p-6 text-white md:p-8 lg:col-span-1">
          <p className="font-display text-[clamp(3.5rem,11vw,6rem)] leading-none font-semibold">
            <Counter value={total} reserveWidth />
          </p>
          <p className="mt-3 text-base font-semibold tracking-wide text-accent-glow md:text-lg">{outcomes.totalLabel}</p>
        </div>
      </Reveal>

      {/* Stage cards (visual) + the same numbers as a table for screen readers */}
      <Reveal className="mt-6 md:mt-8" delay={0.05}>
        <OutcomeStages stages={outcomes.stages} survivalLabel={outcomes.survivalLabel} />
        <table className="sr-only">
          <caption>{outcomes.table.caption}</caption>
          <thead>
            <tr>
              <th scope="col">{outcomes.table.stage}</th>
              <th scope="col">{outcomes.table.cases}</th>
              <th scope="col">{outcomes.table.survival}</th>
            </tr>
          </thead>
          <tbody>
            {outcomes.stages.map((s) => (
              <tr key={s.stage}>
                <th scope="row">{s.stage}</th>
                <td>{s.cases}</td>
                <td>{s.survival5y}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Reveal>

      <p className="mt-6 max-w-[80ch] text-[13px] leading-relaxed text-muted" data-pending-approval={outcomes.pendingApproval}>
        {outcomes.disclaimer}
      </p>
    </Section>
  );
}
