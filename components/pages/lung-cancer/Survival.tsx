import { survival } from "@/content/pages/lung-cancer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SurvivalChart } from "@/components/shared/SurvivalChart";

/** 8 · #survival "Survival Benchmarks" on the shared SurvivalChart (Stage I 86 / II 80 / III 72). */
export function Survival() {
  return (
    <section id="survival" aria-labelledby="survival-title" className="bg-surface-alt py-(--section-y)">
      <Container className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-14">
        <div className="lg:col-span-4">
          <SectionHeading id="survival-title" title={survival.title} />
        </div>
        <SurvivalChart
          className="lg:col-span-8"
          rows={survival.rows}
          unit={survival.unit}
          caption={survival.a11y.table}
          labels={survival.a11y}
          footnote={survival.footnote}
        />
      </Container>
    </section>
  );
}
