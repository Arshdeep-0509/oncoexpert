import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  dashboard,
  outcomes,
  packages,
  pageName,
  pageSlug,
  secondOpinion,
  shared,
  surgeon,
} from "@/content/pages/thyroid-cancer";
import { reviewsFor } from "@/content/shared/reviews";
import { finalCtaSection, locationsSection, reviewsSection, videosSection } from "@/content/shared/sections";
import { formatRupees } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";
import { Hero } from "@/components/pages/thyroid-cancer/Hero";
import { Understanding } from "@/components/pages/thyroid-cancer/Understanding";
import { Symptoms } from "@/components/pages/thyroid-cancer/Symptoms";
import { EarlyDetection } from "@/components/pages/thyroid-cancer/EarlyDetection";
import { Modalities } from "@/components/pages/thyroid-cancer/Modalities";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/thyroid-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const reviews = reviewsFor(pageSlug, shared.reviewOrder);

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, thyroid theme).
// Sections 1–5 are built (each after the hero in its own <Suspense> boundary); the rest are
// placeholders with their final ids, in their final order.
export default function ThyroidCancerPage() {
  return (
    <>
      <Hero /> {/* 1  #hero             lilac gradient */}
      <Suspense>
        <Understanding /> {/* 2  #understanding    surface */}
      </Suspense>
      <Suspense>
        <Symptoms /> {/* 3  #symptoms         alt */}
      </Suspense>
      <Suspense>
        <EarlyDetection /> {/* 4  #early-detection  surface */}
      </Suspense>
      <Suspense>
        <Modalities /> {/* 5  #modalities       warm (blush) */}
      </Suspense>
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
      <SectionPlaceholder id="final-cta" tone="plum" title={finalCtaSection.text} blocks={[{ label: pageName }]} />
    </>
  );
}
