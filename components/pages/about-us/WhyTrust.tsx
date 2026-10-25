import { whyTrust } from "@/content/pages/about-us";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TrustPoints } from "@/components/pages/about-us/TrustPoints";
import "@/components/pages/about-us/about.css";

/**
 * #why-trust "Why Patients Trust Dr. Sunil Navalgund". Desktop: the heading stays on the left
 * (sticky) while the three large cards scroll on the right; the one at mid-screen is active.
 * Phones: the heading, then the cards stacked.
 */
export function WhyTrust() {
  return (
    <Section id="why-trust" tone="warm" aria-labelledby="why-trust-title">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+64px)] lg:col-span-5 lg:self-start">
          <Reveal>
            <SectionHeading id="why-trust-title" title={whyTrust.title} emphasis={whyTrust.emphasis} />
          </Reveal>
        </div>
        <div className="lg:col-span-7 lg:-my-[10vh]">
          <TrustPoints points={whyTrust.points} />
        </div>
      </div>
    </Section>
  );
}
