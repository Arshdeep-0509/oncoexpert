import Link from "next/link";
import {
  ArrowRight,
  ClipboardList,
  Cpu,
  HeartHandshake,
  IndianRupee,
  MapPin,
  MessageCircleQuestion,
  Phone,
  ShieldCheck,
  Stethoscope,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Cta, FaqIcon, FaqItem, Location, SectionTone } from "@/content/types";
import { site } from "@/content/site";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { AppointmentButton } from "@/components/shared/AppointmentButton";

export type FaqEntryProps = FaqItem & { link?: Cta; showLocations?: boolean };

type FaqProps = {
  id?: string;
  tone?: SectionTone;
  title: string;
  contactTitle: string;
  items: readonly FaqEntryProps[];
  /** Listed under answers with showLocations. */
  locations: readonly Location[];
};

const icons: Record<FaqIcon, LucideIcon> = {
  stethoscope: Stethoscope,
  "clipboard-list": ClipboardList,
  "heart-handshake": HeartHandshake,
  cpu: Cpu,
  "indian-rupee": IndianRupee,
  "shield-check": ShieldCheck,
  users: Users,
  "map-pin": MapPin,
};

/** Masonry tile: keeps a card in one piece inside its column. */
const tile = "group/reveal mb-5 break-inside-avoid";

/*
 * Played when the card is revealed (Reveal sets data-revealed on the tile): the icon pops in
 * and the accent line under the question draws itself. Transform/opacity only; with reduced
 * motion the final state shows at once.
 */
const iconPop =
  "scale-75 opacity-0 transition-[scale,opacity,background-color,color] delay-150 duration-500 ease-out-expo group-data-revealed/reveal:scale-100 group-data-revealed/reveal:opacity-100 motion-reduce:scale-100 motion-reduce:opacity-100 motion-reduce:transition-none";
const lineDraw =
  "origin-left scale-x-0 transition-transform delay-300 duration-700 ease-out-expo group-data-revealed/reveal:scale-x-100 motion-reduce:scale-x-100 motion-reduce:transition-none";

/** Plain-text answer (for FAQPage structured data). */
const answerText = (item: FaqEntryProps, locations: readonly Location[]) =>
  [...item.answer, ...(item.showLocations ? locations.map((l) => `${l.name}, ${l.area}`) : [])].join(" ");

/**
 * #faq: every question with its answer, as cards in a masonry flow (1 column on phones,
 * 2 from md, 3 from xl). Each card rises in as it scrolls into view, its icon pops and a
 * rose line draws under the question; the last tile is the "Still have a question?" card.
 * Adds FAQPage JSON-LD built from the same data.
 */
export function Faq({ id = "faq", tone = "surface", title, contactTitle, items, locations }: FaqProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: answerText(item, locations) },
    })),
  };

  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Reveal>
        <SectionHeading id={`${id}-title`} title={title} />
      </Reveal>

      <div className="mt-10 columns-1 gap-5 md:mt-12 md:columns-2 xl:columns-3">
        {items.map((item, i) => {
          const Icon = icons[item.icon];
          return (
            <Reveal key={item.question} className={tile} delay={(i % 3) * 0.07}>
              <article className="group relative overflow-hidden rounded-lg border border-line bg-surface p-6 shadow-soft-sm transition-[translate,border-color,box-shadow] duration-300 ease-out-expo hover:-translate-y-1 hover:border-accent/40 hover:shadow-soft md:p-7">
                <span
                  aria-hidden="true"
                  className="absolute top-5 right-6 font-display text-[2.25rem] leading-none text-accent/10 tabular-nums select-none"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={`${iconPop} grid size-11 place-items-center rounded-[14px] bg-accent-soft text-accent group-hover:bg-accent group-hover:text-white`}
                >
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <h3 className="mt-5 pr-8 font-display text-[1.2rem] leading-snug text-ink md:text-[1.3rem]">
                  {item.question}
                </h3>
                <span
                  aria-hidden="true"
                  className={`${lineDraw} mt-3 block h-0.5 w-12 rounded-full bg-(image:--grad-accent)`}
                />
                <div className="mt-4 space-y-3 text-[15px] leading-relaxed text-muted md:text-base">
                  {item.answer.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                  {item.showLocations ? (
                    <ul className="grid gap-1 pt-1">
                      {locations.map((l) => (
                        <li key={l.name}>
                          <a
                            href={l.mapHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink hover:text-accent"
                          >
                            <MapPin className="size-4 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
                            {l.name}, {l.area}
                            <span className="sr-only"> {site.a11y.newTab}</span>
                          </a>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {item.link ? (
                    <Link
                      href={item.link.href}
                      className="group/link inline-flex min-h-11 items-center gap-2 font-semibold text-accent hover:text-accent-hover"
                    >
                      {item.link.label}
                      <ArrowRight
                        className="size-4 transition-transform duration-300 group-hover/link:translate-x-1"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </Link>
                  ) : null}
                </div>
              </article>
            </Reveal>
          );
        })}

        {/* Last tile: still have a question? */}
        <Reveal className={tile} delay={(items.length % 3) * 0.07}>
          <div className="on-dark relative overflow-hidden rounded-lg bg-ink bg-(image:--grad-plum) p-7 text-white shadow-soft">
            <span
              aria-hidden="true"
              className="pointer-events-none absolute -top-16 -right-16 size-48 rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)] opacity-30"
            />
            <span
              className={`${iconPop} grid size-11 place-items-center rounded-[14px] bg-white/10 text-accent-glow ring-1 ring-white/15`}
            >
              <MessageCircleQuestion className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <p className="relative mt-5 font-display text-[1.4rem] leading-snug">{contactTitle}</p>
            <a
              href={site.contact.phoneHref}
              className="relative mt-3 inline-flex min-h-11 items-center gap-2 text-lg font-semibold tabular-nums hover:text-accent-glow"
            >
              <Phone className="size-[18px] text-accent-glow" strokeWidth={1.75} aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
            <div className="relative mt-4">
              <AppointmentButton label={site.appointmentCta.label} variant="onDark" arrow />
            </div>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
