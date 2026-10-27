import { clinical } from "@/content/pages/endometrial-cancer";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Counter } from "@/components/ui/Counter";

/**
 * 2 · #clinical "Clinical Excellence": the two figures as large rings that draw in and count up,
 * with the live captions ("STAGE I SURVIVAL" · "5-Year", "MINIMALLY INVASIVE" · "Of Cases").
 * Desktop: the heading left, the two cards right. Tablets: the cards side by side under the
 * heading. Phones: stacked cards, ring beside its caption.
 */
export function ClinicalExcellence() {
  return (
    <Section id="clinical" tone="warm" aria-labelledby="clinical-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
        <Reveal className="lg:col-span-4">
          <SectionHeading id="clinical-title" title={clinical.title} intro={clinical.intro} />
        </Reveal>
        <Reveal stagger as="ul" className="grid gap-4 md:grid-cols-2 md:gap-6 lg:col-span-8">
          {clinical.stats.map((s, i) => (
            <div
              key={s.label}
              className="flex h-full items-center gap-5 rounded-xl bg-surface p-5 ring-1 shadow-soft ring-line md:flex-col md:gap-6 md:p-8 md:text-center"
            >
              <ProgressRing
                value={s.value}
                size={112}
                thickness={10}
                sizeMd={184}
                thicknessMd={14}
                delay={0.2 + i * 0.25}
                label={`${s.label}: ${s.value}${s.suffix} ${s.note}`}
              >
                <span className="font-display text-[1.75rem] leading-none font-semibold text-ink md:text-[2.75rem]">
                  <Counter value={s.value} suffix={s.suffix} delay={0.2 + i * 0.25} duration={1.4} reserveWidth />
                </span>
              </ProgressRing>
              <div className="min-w-0">
                <p className="text-xs font-semibold tracking-[0.16em] text-accent md:text-sm">{s.label}</p>
                <p className="mt-1 font-display text-xl text-ink md:text-2xl">{s.note}</p>
              </div>
            </div>
          ))}
        </Reveal>
      </div>
    </Section>
  );
}
