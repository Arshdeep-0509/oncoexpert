import Link from "next/link";
import { ArrowRight, MapPin, MessageCircleQuestion, Phone } from "lucide-react";
import type { Cta, FaqItem, Location, SectionTone } from "@/content/types";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
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

/** Plain-text answer (for FAQPage structured data). */
const answerText = (item: FaqEntryProps, locations: readonly Location[]) =>
  [...item.answer, ...(item.showLocations ? locations.map((l) => `${l.name}, ${l.area}`) : [])].join(" ");

/**
 * #faq: one question open at a time, 56px rows, a plus that rotates into a minus, smooth
 * height. Desktop: heading + a sticky contact card on the left, questions on the right.
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
      <div className="grid gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div className="lg:sticky lg:top-[120px] lg:self-start">
          <Reveal>
            <SectionHeading id={`${id}-title`} title={title} />
          </Reveal>
          {/* Contact card (desktop) */}
          <Reveal className="mt-8 hidden lg:block" delay={0.08}>
            <div className="rounded-lg bg-surface-alt p-7 ring-1 ring-line">
              <span className="grid size-12 place-items-center rounded-[14px] bg-accent-soft text-accent">
                <MessageCircleQuestion className="size-6" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <p className="mt-4 font-display text-xl text-ink">{contactTitle}</p>
              <a
                href={site.contact.phoneHref}
                className="mt-3 inline-flex min-h-11 items-center gap-2 text-lg font-semibold text-ink tabular-nums hover:text-accent"
              >
                <Phone className="size-[18px] text-accent" strokeWidth={1.75} aria-hidden="true" />
                {site.contact.phoneDisplay}
              </a>
              <div className="mt-4">
                <AppointmentButton label={site.appointmentCta.label} arrow />
              </div>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.05}>
          <Accordion type="single" collapsible className="border-t border-line">
            {items.map((item, i) => (
              <AccordionItem key={item.question} value={`q${i}`} className="border-line">
                <AccordionTrigger
                  className={cn(
                    "group min-h-14 items-center gap-4 rounded-none py-4 text-left font-display text-[1.1rem] leading-snug text-ink hover:no-underline md:text-[1.25rem]",
                    "[&>svg:last-child]:hidden",
                  )}
                >
                  {item.question}
                  {/* Plus → minus: the vertical bar rotates flat when open */}
                  <span
                    aria-hidden="true"
                    className="relative grid size-9 shrink-0 place-items-center rounded-full bg-accent-soft text-accent"
                  >
                    <span className="absolute h-0.5 w-3.5 rounded-full bg-current" />
                    <span className="absolute h-3.5 w-0.5 rounded-full bg-current transition-transform duration-300 ease-out-expo group-data-[state=open]:rotate-90" />
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-6">
                  <div className="measure space-y-3 text-base leading-relaxed text-text">
                    {item.answer.map((p) => (
                      <p key={p}>{p}</p>
                    ))}
                    {item.showLocations ? (
                      <ul className="grid gap-1.5 pt-1">
                        {locations.map((l) => (
                          <li key={l.name}>
                            <a
                              href={l.mapHref}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex min-h-11 items-center gap-2 font-semibold text-ink hover:text-accent"
                            >
                              <MapPin className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
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
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </Section>
  );
}
