import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  outcomes,
  packages,
  pageName,
  pageSlug,
  secondOpinion,
  shared,
  surgeon,
  treatments,
} from "@/content/pages/ovarian-cancer";
import { reviewsFor } from "@/content/shared/reviews";
import { finalCtaSection, locationsSection, reviewsSection, videosSection } from "@/content/shared/sections";
import { formatRupees } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";
import { Hero } from "@/components/pages/ovarian-cancer/Hero";
import { Features } from "@/components/pages/ovarian-cancer/Features";
import { Understanding } from "@/components/pages/ovarian-cancer/Understanding";
import { WarningSigns } from "@/components/pages/ovarian-cancer/WarningSigns";
import { Diagnostics } from "@/components/pages/ovarian-cancer/Diagnostics";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/ovarian-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const reviews = reviewsFor(pageSlug, shared.reviewOrder);

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, ovarian theme).
// Sections 1–5 are built; the rest are placeholders with their final ids, in their final order.
export default function OvarianCancerPage() {
  return (
    <>
      <Hero /> {/* 1  #hero           sand gradient */}
      <Features /> {/* 2  #features       surface */}
      <Understanding /> {/* 3  #understanding  alt (sea-glass) */}
      <WarningSigns /> {/* 4  #warning-signs  surface */}
      <Diagnostics /> {/* 5  #diagnostics    warm (sand) */}
      {/* 6 #treatments  surface */}
      <SectionPlaceholder
        id="treatments"
        title={treatments.title}
        blocks={treatments.items.map((item) => ({ id: `treatments-${item.icon}`, label: item.title }))}
      />
      {/* 7 #second-opinion  plum band */}
      <SectionPlaceholder
        id="second-opinion"
        tone="plum"
        title={secondOpinion.title}
        blocks={[{ label: secondOpinion.cta.label }]}
      />
      {/* 8 #outcomes  alt */}
      <SectionPlaceholder
        id="outcomes"
        tone="alt"
        title={outcomes.lines.join(" ")}
        blocks={[
          ...outcomes.stats.map((stat) => ({ label: `${stat.value}${stat.suffix} ${stat.lines.join(" ")}` })),
          ...outcomes.survival.stages.map((stage) => ({
            label: `${stage.stage} · ${stage.value}${outcomes.survival.unit}`,
          })),
        ]}
      />
      {/* 9 #packages  warm (hidden on every device on the live page: PENDING DOCTOR) */}
      <SectionPlaceholder
        id="packages"
        tone="warm"
        title={packages.title}
        blocks={packages.items.map((item) => ({
          label: `${item.name} · ${item.priceLabel} ${formatRupees(item.amount)}`,
        }))}
      />
      {/* 10 #surgeon  surface */}
      <SectionPlaceholder
        id="surgeon"
        title={surgeon.lines.join(" ")}
        blocks={[...surgeon.badges.map((badge) => ({ label: badge.label })), { label: surgeon.cta.label }]}
      />
      {/* 11–14: the shared sections */}
      <SectionPlaceholder
        id="reviews"
        tone="alt"
        title={reviewsSection.title.join(" ")}
        blocks={reviews.map((review) => ({ label: review.author }))}
      />
      <SectionPlaceholder id="videos" title={videosSection.title} />
      <SectionPlaceholder
        id="locations"
        tone="warm"
        title={locationsSection.heading}
        blocks={locationsSection.items.map((clinic) => ({ label: clinic.name }))}
      />
      <SectionPlaceholder id="final-cta" tone="plum" title={finalCtaSection.text} blocks={[{ label: pageName }]} />
    </>
  );
}
