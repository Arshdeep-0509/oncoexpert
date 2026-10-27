import { packages } from "@/content/pages/endometrial-cancer";
import { keepLastWords } from "@/lib/format";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { PackageCard } from "@/components/pages/endometrial-cancer/PackageCard";
import "@/components/pages/endometrial-cancer/packages.css";

const featured = packages.packages.findIndex((p) => "featured" in p && p.featured);

/**
 * Tablets: one wide card per row, the featured one in the middle row (CSS order). Desktop: three
 * columns in content order, the featured card raised. Phones: a swipe row that starts on the
 * featured card, with dots.
 */
const itemClass = packages.packages.map((_, i) => {
  // The first other card above the featured one, the rest below it.
  const firstOther = packages.packages.findIndex((_, j) => j !== featured);
  const order = i === featured ? "md:order-2" : i === firstOther ? "md:order-1" : "md:order-3";
  return `${order} lg:order-none ${i === featured ? "lg:-translate-y-4" : ""}`.trim();
});

/** 6 · #packages "Transparent Care Packages". Prices are PENDING DOCTOR (content). */
export function Packages() {
  return (
    <Section id="packages" tone="warm" aria-labelledby="packages-title">
      <Reveal>
        <SectionHeading
          id="packages-title"
          title={keepLastWords(packages.title)}
          intro={packages.intro}
          align="center"
        />
      </Reveal>
      <SwipeRow
        label={packages.a11y.list}
        initialIndex={featured > 0 ? featured : undefined}
        className="mt-10 md:mt-14"
        gridClassName="md:mx-auto md:max-w-3xl md:grid-cols-1 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:pt-4"
        itemClassName={itemClass}
      >
        {packages.packages.map((pkg, i) => (
          <Reveal key={pkg.name} delay={i * 0.08} className="h-full">
            <PackageCard pkg={pkg} id={`package-${i + 1}`} />
          </Reveal>
        ))}
      </SwipeRow>
      <p
        className="mx-auto mt-8 max-w-[68ch] text-center text-[13px] leading-relaxed text-muted md:text-sm"
        data-pending-approval={packages.pendingApproval}
      >
        {packages.disclaimer}
      </p>
    </Section>
  );
}
