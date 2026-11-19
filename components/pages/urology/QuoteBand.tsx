import { Quote } from "lucide-react";
import { surgeon } from "@/content/pages/urology";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";

/**
 * The live quote under the specialist ("Precision at the core, empathy at the helm.") on the dark
 * pine band: one large quotation mark in the marigold highlight (decoration), the words in the
 * theme's sans display, wrapping in balanced lines (the live line break is layout). Not a
 * heading: a blockquote.
 */
export function QuoteBand() {
  return (
    <Section id="quote" tone="plum" className="relative overflow-hidden">
      <Reveal className="mx-auto max-w-4xl text-center">
        <Quote aria-hidden="true" className="mx-auto size-12 text-highlight md:size-16" strokeWidth={1.5} />
        <blockquote className="mt-6 font-display text-[clamp(1.75rem,5.4vw,3.25rem)] leading-[1.15] font-(--display-weight) tracking-(--display-tracking) text-balance text-white">
          <p>{surgeon.quote.join(" ")}</p>
        </blockquote>
      </Reveal>
    </Section>
  );
}
