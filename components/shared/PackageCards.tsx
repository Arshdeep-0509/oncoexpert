import type { PackageEstimator, PackageItem } from "@/content/types";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { PriceTable } from "@/components/shared/PriceTable";
import { PackageCard } from "@/components/shared/package-cards/PackageCard";
import { CycleEstimator } from "@/components/shared/package-cards/CycleEstimator";
import { OffscreenFlag } from "@/components/shared/technique-compare/OffscreenFlag";
import "@/components/shared/package-cards/package-cards.css";

type PackageCardsProps = {
  packages: readonly PackageItem[];
  /** Shown under the cards (e.g. an "indicative only" note, or the asterisk's footnote). */
  footnote?: string;
  /** Phones: the swipe row starts on this card. Default: the featured card (or the first). */
  initialIndex?: number;
  /** An optional estimator under the cards (e.g. chemotherapy cycles × price). */
  estimator?: PackageEstimator;
  /** Analytics prefix of the page, e.g. "ovarian" (package_select, estimator_change). */
  page: string;
  /** The swipe row's accessible name (phones). */
  label: string;
};

/**
 * Price cards (shared; first used on the ovarian page). Desktop three columns, the featured card
 * raised; tablets one card per row (the featured card is the middle one in the content's order);
 * phones a swipe row starting on the featured card. Server-rendered except the counters, the
 * inclusion reveal, the buttons and the estimator. Place it inside the page's own <section>.
 */
export function PackageCards({ packages, footnote, initialIndex, estimator, page, label }: PackageCardsProps) {
  const featured = packages.findIndex((p) => p.featured);
  return (
    <div>
      <OffscreenFlag />
      <PriceTable
        caption={label}
        rows={packages.map((p) => ({
          name: p.name,
          price: `${p.lead ? `${p.lead} ` : ""}${p.prefix ?? ""}${p.price.toLocaleString("en-IN")}${p.suffix ?? ""}${p.asterisk ?? ""}`,
          includes: p.inclusions,
        }))}
      />
      <SwipeRow
        label={label}
        initialIndex={initialIndex ?? Math.max(0, featured)}
        gridClassName="md:mx-auto md:max-w-xl md:grid-cols-1 md:gap-6 lg:max-w-none lg:grid-cols-3 lg:items-stretch lg:pt-3"
      >
        {packages.map((item) => (
          <PackageCard key={item.name} item={item} page={page} />
        ))}
      </SwipeRow>
      {estimator ? <CycleEstimator estimator={estimator} page={page} /> : null}
      {footnote ? <p className="mt-6 measure text-sm leading-relaxed text-muted">{footnote}</p> : null}
    </div>
  );
}
