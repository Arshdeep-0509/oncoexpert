import { ChevronDown } from "lucide-react";
import type { CitableStat, QuickAnswer, SectionTone } from "@/content/types";
import { approvals } from "@/content/shared/approvals";
import { quickAnswersSection } from "@/content/shared/sections";
import { Section } from "@/components/ui/Section";

type QuickAnswersProps = {
  items: readonly QuickAnswer[];
  /** Figure sentences; only those with a date are listed (with their source and date). */
  stats?: readonly CitableStat[];
  tone?: SectionTone;
};

/**
 * #quick-answers: short Q&As built from the page's own facts, each a native <details> (no
 * JavaScript; keyboard and screen readers work out of the box), the first one open. The answers
 * are marked speakable. Renders nothing until the doctor approves them (approvals.quickAnswers);
 * the page's FAQPage structured data follows the same switch (lib/jsonld.ts).
 */
export function QuickAnswers({ items, stats = [], tone = "alt" }: QuickAnswersProps) {
  if (!approvals.quickAnswers || !items.length) return null;
  const dated = approvals.citableStats ? stats.filter((s) => s.date) : [];
  return (
    <Section id="quick-answers" tone={tone} aria-labelledby="quick-answers-title">
      <h2 id="quick-answers-title" className="heading-3 text-ink">
        {quickAnswersSection.title}
      </h2>
      <p className="mt-3 measure text-base text-muted">{quickAnswersSection.intro}</p>
      <div className="mt-8 grid max-w-4xl gap-3" data-speakable>
        {items.map((item, i) => (
          <details
            key={item.question}
            open={i === 0}
            className="group rounded-xl bg-surface ring-1 shadow-soft-sm ring-line open:ring-accent/40"
          >
            <summary className="flex min-h-14 cursor-pointer list-none items-center gap-4 rounded-xl px-5 py-3 outline-none focus-visible:ring-2 focus-visible:ring-accent [&::-webkit-details-marker]:hidden">
              <h3 className="flex-1 text-lg font-semibold text-ink">{item.question}</h3>
              <ChevronDown
                className="size-5 shrink-0 text-accent transition-transform duration-300 group-open:rotate-180 motion-reduce:transition-none"
                aria-hidden="true"
              />
            </summary>
            <p className="measure px-5 pb-5 text-base leading-relaxed text-text">{item.answer}</p>
          </details>
        ))}
      </div>
      {dated.length ? (
        <div className="mt-8 max-w-4xl">
          <h3 className="text-lg font-semibold text-ink">{quickAnswersSection.figures}</h3>
          <ul className="mt-3 grid list-disc gap-1.5 pl-5 text-base text-text">
            {dated.map((s) => (
              <li key={s.sentence}>
                {s.sentence} ({s.source}, updated {s.date})
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
