import { warningSigns } from "@/content/pages/stomach-cancer";
import { stomachImages } from "@/content/pages/stomach-cancer.images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SymptomGrid } from "@/components/shared/SymptomGrid";

const items = warningSigns.items.map((item) => {
  const img = stomachImages[item.image];
  return {
    key: item.key,
    icon: item.icon,
    title: item.title,
    body: item.body,
    image: { src: img.src, alt: img.alt, focal: img.focal },
  };
});

/**
 * 3 · #warning-signs "Warning Signs Not to Ignore" (alt). The live intro, then the shared SymptomGrid
 * as a checklist (photo cards, 2 × 2 on phones, four across from 1024px): a gentle NEW line before
 * anything is ticked, then a NEW line and "Book Consultation" with "Symptoms: …" as the note.
 * Nothing is stored; `symptom_check` sends the count only (page "stomach").
 */
export function WarningSigns() {
  return (
    <Section id="warning-signs" tone="alt" aria-labelledby="warning-signs-title">
      <SectionHeading id="warning-signs-title" title={warningSigns.title} intro={warningSigns.intro} />
      <SymptomGrid
        mode="check"
        items={items}
        page="stomach"
        empty={warningSigns.empty}
        result={warningSigns.result}
        labels={warningSigns.a11y}
        className="mt-8 md:mt-12"
      />
    </Section>
  );
}
