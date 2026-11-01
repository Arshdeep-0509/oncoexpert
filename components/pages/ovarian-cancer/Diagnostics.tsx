import { diagnostics } from "@/content/pages/ovarian-cancer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { InstrumentTray } from "@/components/pages/ovarian-cancer/InstrumentTray";
import "@/components/pages/ovarian-cancer/diagnostics.css";

/**
 * 5 · #diagnostics "Diagnostic Markers": the live sentence, then the instrument tray (CA-125,
 * transvaginal ultrasound, CT, BRCA1/2) with a drawer per test.
 */
export function Diagnostics() {
  return (
    <section id="diagnostics" aria-labelledby="diagnostics-title" className="bg-surface-warm py-(--section-y)">
      <Container>
        <SectionHeading id="diagnostics-title" title={diagnostics.title} intro={diagnostics.body} />
        <div className="mt-10 md:mt-14">
          <InstrumentTray
            tests={diagnostics.tests}
            body={diagnostics.body}
            tellsLabel={diagnostics.tellsLabel}
            labels={diagnostics.a11y}
          />
        </div>
      </Container>
    </section>
  );
}
