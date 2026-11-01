import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  dashboard,
  earlyDetection,
  hero,
  modalities,
  outcomes,
  packages,
  pageName,
  pageSlug,
  secondOpinion,
  shared,
  surgeon,
  symptoms,
  understanding,
} from "@/content/pages/thyroid-cancer";
import { thyroidImages } from "@/content/pages/thyroid-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { finalCtaSection, locationsSection, reviewsSection, videosSection } from "@/content/shared/sections";
import { formatRupees } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/thyroid-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const reviews = reviewsFor(pageSlug, shared.reviewOrder);

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, thyroid theme).
// Foundation: every section is a placeholder with its final id, in its final order.
export default function ThyroidCancerPage() {
  return (
    <>
      {/* 1 #hero  lilac gradient */}
      <SectionPlaceholder
        id="hero"
        as="h1"
        hero
        title={page.meta.h1}
        className="bg-(image:--grad-hero)"
        blocks={[
          { label: `${pageName} · ${hero.eyebrow}`, wide: true },
          ...hero.stats.map((stat) => ({
            label: "text" in stat ? `${stat.text} ${stat.label}` : `${stat.value}${stat.suffix} ${stat.label}`,
          })),
          { label: hero.ctas.primary.label },
          { label: hero.ctas.secondary.label },
          { label: thyroidImages[hero.image].alt },
        ]}
      />
      {/* 2 #understanding  surface */}
      <SectionPlaceholder id="understanding" title={understanding.lines.join(" ")} />
      {/* 3 #symptoms  alt */}
      <SectionPlaceholder
        id="symptoms"
        tone="alt"
        title={symptoms.title}
        blocks={symptoms.items.map((label) => ({ label }))}
      />
      {/* 4 #early-detection  surface */}
      <SectionPlaceholder id="early-detection" title={earlyDetection.title} />
      {/* 5 #modalities  warm */}
      <SectionPlaceholder
        id="modalities"
        tone="warm"
        title={modalities.title}
        blocks={[...modalities.items, ...modalities.strengths].map((card) => ({ label: card.title }))}
      />
      {/* 6 #dashboard  indigo band */}
      <SectionPlaceholder
        id="dashboard"
        tone="plum"
        title={dashboard.title}
        blocks={dashboard.stats.map((stat) => ({ label: `${stat.value}${stat.suffix} ${stat.label}` }))}
      />
      {/* 7 #outcomes  alt */}
      <SectionPlaceholder
        id="outcomes"
        tone="alt"
        title={outcomes.title}
        blocks={[
          ...outcomes.stages.map((stage) => ({ label: `${stage.label} · ${stage.value}${outcomes.unit}` })),
          { label: `${outcomes.overall.value}${outcomes.overall.suffix} ${outcomes.overall.label}`, wide: true },
        ]}
      />
      {/* 8 #packages  warm (hidden on every device on the live page: PENDING DOCTOR) */}
      <SectionPlaceholder
        id="packages"
        tone="warm"
        title={packages.title}
        blocks={packages.items.map((item) => ({ label: `${item.name} · ${formatRupees(item.amount)}${item.mark}` }))}
      />
      {/* 9 #surgeon  surface */}
      <SectionPlaceholder
        id="surgeon"
        title={surgeon.name}
        blocks={[...surgeon.badges.map((badge) => ({ label: badge.label })), { label: surgeon.cta.label }]}
      />
      {/* 10 #second-opinion  indigo band */}
      <SectionPlaceholder
        id="second-opinion"
        tone="plum"
        title={secondOpinion.title}
        blocks={[{ label: secondOpinion.cta.label }]}
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
        tone="alt"
        title={locationsSection.heading}
        blocks={locationsSection.items.map((clinic) => ({ label: clinic.name }))}
      />
      <SectionPlaceholder id="final-cta" tone="plum" title={finalCtaSection.text} />
    </>
  );
}
