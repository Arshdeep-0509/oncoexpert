import { packages } from "@/content/pages/ovarian-cancer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCards } from "@/components/shared/PackageCards";

/**
 * 9 · #packages "Transparent Care Packages" on the shared PackageCards (the live section is hidden
 * on every device: shown here pending the doctor). HIPEC is featured; the chemotherapy estimator is
 * behind showCycleEstimator.
 */
export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="bg-surface-warm py-(--section-y)">
      <Container>
        <SectionHeading id="packages-title" title={packages.title} intro={packages.intro} />
        <div className="mt-10 md:mt-12">
          <PackageCards
            packages={packages.items}
            footnote={packages.footnote}
            estimator={packages.estimator}
            page="ovarian"
            label={packages.title}
          />
        </div>
      </Container>
    </section>
  );
}
