import { treatments } from "@/content/pages/ovarian-cancer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TreatmentExplorer } from "@/components/pages/ovarian-cancer/TreatmentExplorer";
import "@/components/pages/ovarian-cancer/treatments.css";

/**
 * 6 · #treatments "Personalized Treatment Options": the treatment explorer. The empty anchors
 * #treatments-<key> (the feature cards link to them) land at the section; the explorer reads the
 * hash and selects that option.
 */
export function Treatments() {
  return (
    <section id="treatments" aria-labelledby="treatments-title" className="relative bg-surface py-(--section-y)">
      {treatments.items.map((it) => (
        <span
          key={it.key}
          id={`treatments-${it.key}`}
          className="absolute top-0 scroll-mt-(--header-h)"
          aria-hidden="true"
        />
      ))}
      <Container>
        <SectionHeading id="treatments-title" title={treatments.title} intro={treatments.intro} />
        <div className="mt-10 md:mt-12">
          <TreatmentExplorer items={treatments.items} ask={treatments.ask} labels={treatments.a11y} />
        </div>
      </Container>
    </section>
  );
}
