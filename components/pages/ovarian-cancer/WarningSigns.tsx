import { warningSigns } from "@/content/pages/ovarian-cancer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SymptomGrid } from "@/components/shared/SymptomGrid";

/**
 * 4 · #warning-signs: the shared SymptomGrid in "check" mode. The live sentence is the result line
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
          items={warningSigns.items}
          empty={warningSigns.body}
          result={warningSigns.result}
          labels={warningSigns.a11y}
          page="ovarian"
        />
      </Container>
    </section>
  );
}
