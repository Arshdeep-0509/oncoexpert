import type { PackageItem } from "@/content/types";
import { pricing } from "@/content/pages/urology";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PackageCards } from "@/components/shared/PackageCards";

/** The three plans as PackageCards items (tier, tagline, inclusions with their icons). */
const packages: PackageItem[] = pricing.plans.map((plan) => ({
  name: plan.name,
  tier: plan.tier,
  lead: plan.lead,
  price: plan.price,
  prefix: plan.prefix,
  suffix: plan.suffix,
  tagline: plan.tagline,
  inclusions: plan.features.map((f) => f.label),
  inclusionIcons: plan.features.map((f) => f.icon),
  cta: plan.cta,
}));

/**
 * 6 · #pricing "Transparent Pricing" (warm; hidden on every device on the live page, shown here:
 * PENDING DOCTOR). The shared PackageCards with the live lakh shorthand ("From ₹1.6L +"); its
 * sr-only price table carries the full figures. No plan is featured (the live page features none).
 * Buttons open booking on "Consultation For Surgery" with "Package: <name>".
 */
export function Pricing() {
  return (
    <Section id="pricing" tone="warm" aria-labelledby="pricing-title">
      <SectionHeading id="pricing-title" title={pricing.title} intro={pricing.intro} align="center" />
      <div className="mt-10 md:mt-14">
        <PackageCards packages={packages} priceFormat="lakh" page="urology" label={pricing.a11y.label} />
      </div>
    </Section>
  );
}
