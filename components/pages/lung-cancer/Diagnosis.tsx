import { diagnosis } from "@/content/pages/lung-cancer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiagnosticLens } from "@/components/pages/lung-cancer/DiagnosticLens";
import { DidYouKnow } from "@/components/pages/lung-cancer/DidYouKnow";
import { SymptomCard } from "@/components/pages/lung-cancer/SymptomCard";
import "@/components/pages/lung-cancer/diagnosis.css";

/**
 * 3 · #diagnosis "Early Diagnosis Creates More Treatment Options". Desktop: heading, text and the
 * two symptom cards left, the diagnostic lens right; tablets and phones stack them. Then the
 * "Did you know?" band. Server-rendered; the symptom cards and the lens are small islands.
 */
export function Diagnosis() {
  return (
    <section id="diagnosis" aria-labelledby="diagnosis-title" className="bg-surface-alt py-(--section-y)">
      <Container>
        <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-x-14">
          <div className="lg:col-span-7">
            <SectionHeading id="diagnosis-title" title={diagnosis.title} intro={diagnosis.body} />
            <ul aria-label={diagnosis.a11y.symptoms} className="mt-8 grid gap-4 md:grid-cols-2 md:gap-5">
              {diagnosis.symptoms.map((symptom, i) => (
                <li key={symptom.title}>
                  <SymptomCard id={`lung-symptom-${i}`} hint={diagnosis.hint} {...symptom} />
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-5">
            <DiagnosticLens tests={diagnosis.tests} labels={diagnosis.a11y} />
          </div>
        </div>
        <DidYouKnow />
      </Container>
    </section>
  );
}
