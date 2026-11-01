import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  diagnostics,
  features,
  hero,
  outcomes,
  packages,
  pageName,
  pageSlug,
  secondOpinion,
  shared,
  surgeon,
  treatments,
  understanding,
  warningSigns,
} from "@/content/pages/ovarian-cancer";
import { ovarianImages } from "@/content/pages/ovarian-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { finalCtaSection, locationsSection, reviewsSection, videosSection } from "@/content/shared/sections";
import { formatRupees } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/ovarian-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const reviews = reviewsFor(pageSlug, shared.reviewOrder);

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, ovarian theme).
// Foundation: every section is a placeholder with its final id, in its final order.
export default function OvarianCancerPage() {
  return (
    <>
      {/* 1 #hero  sand gradient */}
      <SectionPlaceholder
        id="hero"
        as="h1"
        hero
        title={page.meta.h1}
        className="bg-(image:--grad-hero)"
        blocks={[
          { label: `${pageName} · ${hero.eyebrow}`, wide: true },
          { label: hero.ctas.primary.label },
          { label: hero.ctas.secondary.label },
          { label: ovarianImages[hero.image].alt },
        ]}
      />
      {/* 2 #features  surface */}
      <SectionPlaceholder
        id="features"
        title={features.a11y.label}
        blocks={features.items.map((item) => ({ label: item.label }))}
      />
      {/* 3 #understanding  alt */}
      <SectionPlaceholder id="understanding" tone="alt" title={understanding.title} />
      {/* 4 #warning-signs  surface */}
      <SectionPlaceholder
        id="warning-signs"
        title={warningSigns.title}
        blocks={warningSigns.signs.map((label) => ({ label }))}
      />
      {/* 5 #diagnostics  warm */}
      <SectionPlaceholder
        id="diagnostics"
        tone="warm"
        title={diagnostics.title}
        blocks={diagnostics.markers.map((label) => ({ label }))}
      />
      {/* 6 #treatments  surface */}
      <SectionPlaceholder
        id="treatments"
        title={treatments.title}
        blocks={treatments.items.map((item) => ({ label: item.title }))}
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
      <SectionPlaceholder id="final-cta" tone="plum" title={finalCtaSection.text} />
    </>
  );
}
