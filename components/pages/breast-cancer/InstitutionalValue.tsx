import { Headset, PiggyBank, Receipt, ShieldCheck, BadgeIndianRupee, type LucideIcon } from "lucide-react";
import { value, type ValueIcon } from "@/content/pages/breast-cancer";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const icons: Record<ValueIcon, LucideIcon> = {
  "shield-check": ShieldCheck,
  receipt: Receipt,
  "piggy-bank": PiggyBank,
  headset: Headset,
};

/** 9 · #value */
export function InstitutionalValue() {
  return (
    <Section id="value" tone="alt" aria-labelledby="value-title">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <Reveal>
          <SectionHeading id="value-title" title={value.title} />
          <p className="measure mt-5 text-[1.0625rem] leading-relaxed text-text md:text-lg">{value.body}</p>

          {/* Highlight card */}
          <div className="mt-8 flex items-start gap-4 rounded-lg bg-ink bg-(image:--grad-plum) p-6 text-white shadow-soft">
            <span className="grid size-12 shrink-0 place-items-center rounded-[14px] bg-white/10 text-accent-glow ring-1 ring-white/15">
              <BadgeIndianRupee className="size-6" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <div>
              <p className="font-display text-xl leading-snug">{value.highlight.title}</p>
              <p className="mt-1 text-[15px] leading-relaxed text-white/80">{value.highlight.body}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-xs font-semibold tracking-[0.16em] text-accent uppercase">{value.label}</p>
          <ul className="mt-4 grid grid-cols-2 gap-3 md:gap-5">
            {value.items.map((item) => {
              const Icon = icons[item.icon];
              return (
                <li key={item.title} className="flex flex-col rounded-lg border border-line bg-surface p-4 shadow-soft-sm md:p-6">
                  <div className="flex flex-col gap-3 md:flex-row md:items-center">
                    <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-accent-soft text-accent md:size-12 md:rounded-[14px]">
                      <Icon className="size-5 md:size-[22px]" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-base leading-snug text-ink md:text-[1.2rem]">{item.title}</h3>
                  </div>
                  <p className="mt-2.5 text-[13px] leading-relaxed text-muted md:mt-3 md:text-[15px]">{item.body}</p>
                </li>
              );
            })}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
