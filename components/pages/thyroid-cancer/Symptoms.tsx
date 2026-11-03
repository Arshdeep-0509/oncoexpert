import { Info } from "lucide-react";
import { symptoms } from "@/content/pages/thyroid-cancer";
import { thyroidImages } from "@/content/pages/thyroid-cancer.images";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { SymptomGrid } from "@/components/shared/SymptomGrid";

const items = symptoms.items.map(({ image, ...item }) => {
  const img = thyroidImages[image];
  return { ...item, image: { src: img.src, alt: img.alt, focal: img.focal } };
});

/**
 * 3 · #symptoms "Key Symptoms": the shared SymptomGrid in "disclose" mode (four photo hover cards:
 * the line slides up over the photo; under it on touch screens), then the live "Many patients remain asymptomatic
 * in early stages." as a highlighted note with Book.
 */
export function Symptoms() {
  return (
    <section id="symptoms" aria-labelledby="symptoms-title" className="bg-surface-alt py-(--section-y)">
      <Container>
        <SectionHeading id="symptoms-title" title={symptoms.title} />
        <SymptomGrid mode="disclose" className="mt-8 md:mt-10" items={items} labels={symptoms.a11y} page="thyroid" />
        <div className="mt-8 flex flex-col items-start gap-5 rounded-xl bg-surface p-5 ring-1 ring-line md:flex-row md:items-center md:justify-between md:p-6">
          <p className="flex items-start gap-3 text-base leading-relaxed font-semibold text-ink md:text-lg">
            <Info className="mt-0.5 size-6 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
            {symptoms.note}
          </p>
          <AppointmentButton {...symptoms.cta} arrow fullWidthOnMobile className="shrink-0" />
        </div>
      </Container>
    </section>
  );
}
