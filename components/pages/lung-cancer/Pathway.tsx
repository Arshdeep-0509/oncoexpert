import { pathway } from "@/content/pages/lung-cancer";
import { lungImages } from "@/content/pages/lung-cancer.images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { AirwayJourney } from "@/components/pages/lung-cancer/AirwayJourney";
import "@/components/pages/lung-cancer/pathway.css";

const steps = pathway.steps.map((step) => {
  const img = lungImages[step.image];
  return { title: step.title, body: step.body, image: { src: img.src, alt: img.alt, focal: img.focal } };
});

/**
 * 4 · #pathway "The OncoXpert Care Pathway": the six steps as an airway journey (AirwayJourney,
 * pathway.css), then a Book button. Desktop pins for 2.5 screens; tablets a snap row; phones a
 * vertical timeline; reduced motion a static list.
 */
export function Pathway() {
  return (
    <section id="pathway" aria-labelledby="pathway-title" className="relative bg-surface pb-(--section-y)">
      <AirwayJourney
        heading={<SectionHeading id="pathway-title" title={pathway.title} />}
        steps={steps}
        labels={pathway.a11y}
      />
      <Container className="mt-10 flex justify-center lg:mt-4">
        <AppointmentButton {...pathway.cta} arrow fullWidthOnMobile />
      </Container>
    </section>
  );
}
