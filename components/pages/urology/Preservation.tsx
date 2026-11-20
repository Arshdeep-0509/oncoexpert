import { organPreservation } from "@/content/pages/urology";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SpareRemove } from "@/components/pages/urology/SpareRemove";
import { TrimodalRing } from "@/components/pages/urology/TrimodalRing";
import "@/components/pages/urology/preservation.css";

/**
 * 4 · #preservation "Clinical Philosophy: Organ Preservation" (alt). The heading and the live intro,
 * then two cards, each with its visual on top: Partial Nephrectomy with the "Spare vs Remove" kidney
 * (the SpareRemove island), Bladder Sparing Protocols with the trimodal ring. Side by side from
 * 768px, stacked on phones.
 */
export function Preservation() {
  const [partial, bladder] = organPreservation.cards;
  const card = "flex h-full flex-col rounded-3xl bg-surface p-5 ring-1 shadow-soft-sm ring-line md:p-8";
  const title =
    "font-display text-xl leading-snug font-(--display-weight) tracking-(--display-tracking) text-ink md:text-2xl";
  return (
    <Section id="preservation" tone="alt" aria-labelledby="preservation-title">
      <SectionHeading
        id="preservation-title"
        title={organPreservation.title}
        intro={organPreservation.intro.join(" ")}
        align="center"
      />
      <Reveal stagger className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-6" itemClassName="h-full">
        <article className={card}>
          <div className="rounded-2xl bg-surface-alt px-4 pt-5 pb-3 md:px-6">
            <SpareRemove content={organPreservation.spare} />
          </div>
          <h3 className={`mt-6 ${title}`}>{partial.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-muted">{partial.body.join(" ")}</p>
        </article>
        <article className={card}>
          <div className="grid min-h-[220px] place-items-center rounded-2xl bg-surface-alt px-4 py-6 md:min-h-[300px]">
            <TrimodalRing />
          </div>
          <h3 className={`mt-6 ${title}`}>{bladder.title}</h3>
          <p className="mt-2 text-base leading-relaxed text-muted">{bladder.body.join(" ")}</p>
        </article>
      </Reveal>
    </Section>
  );
}
