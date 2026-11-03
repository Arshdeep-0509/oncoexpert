import { warningSigns } from "@/content/pages/ovarian-cancer";
import { ovarianImages } from "@/content/pages/ovarian-cancer.images";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SymptomGrid } from "@/components/shared/SymptomGrid";

const items = warningSigns.items.map(({ image, ...item }) => {
  const img = ovarianImages[image];
  return { ...item, image: { src: img.src, alt: img.alt, focal: img.focal } };
});

/**
 * 4 · #warning-signs: the shared SymptomGrid in "check" mode, each card on its photo. The live sentence is the result line
 * while nothing is ticked; once a sign is ticked, a NEW line and Book (note: the ticked list).
 */
export function WarningSigns() {
  return (
    <section id="warning-signs" aria-labelledby="warning-signs-title" className="bg-surface py-(--section-y)">
      <Container>
        <SectionHeading id="warning-signs-title" title={warningSigns.title} />
        <SymptomGrid
          mode="check"
          className="mt-8 md:mt-10"
          items={items}
          empty={warningSigns.body}
          result={warningSigns.result}
          labels={warningSigns.a11y}
          page="ovarian"
        />
      </Container>
    </section>
  );
}
