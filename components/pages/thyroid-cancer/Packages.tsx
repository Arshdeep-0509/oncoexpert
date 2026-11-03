import { packages } from "@/content/pages/thyroid-cancer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCards } from "@/components/shared/PackageCards";

/**
 * 8 · #packages "Transparent Surgical Packages" on the shared PackageCards (the live section is
 * hidden on every device: shown here pending the doctor). Total Thyroidectomy is featured; the
 * live prices keep their asterisk and footnote. No estimator. "SELECT PACKAGE" opens the booking
 * page with the package's note.
 */
export function Packages() {
  return (
    <section id="packages" aria-labelledby="packages-title" className="bg-surface-warm py-(--section-y)">
      <Container>
        <SectionHeading id="packages-title" title={packages.title} />
        <div className="mt-10 md:mt-12">
          <PackageCards packages={packages.items} footnote={packages.footnote} page="thyroid" label={packages.title} />
        </div>
      </Container>
    </section>
  );
}
