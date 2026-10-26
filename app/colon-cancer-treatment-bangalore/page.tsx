import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  advancedCases,
  approach,
  hero,
  outcomes,
  pageSlug,
  qualityOfLife,
  recoveryPath,
  surgeon,
  techniques,
} from "@/content/pages/colorectal-cancer";
import {
  appointmentSection,
  finalCtaSection,
  locationsSection,
  reviewsSection,
  videosSection,
} from "@/content/shared/sections";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/colorectal-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, colorectal theme).
// Foundation: every section is a placeholder with its final id, in its final order.
export default function ColorectalCancerPage() {
  return (
    <>
      {/* 1 #hero  hero gradient */}
      <SectionPlaceholder
        id="hero"
        as="h1"
        hero
        title={hero.title}
        className="bg-(image:--grad-hero)"
        blocks={[
          { label: hero.eyebrow, wide: true },
          { label: `${hero.stat.value}${hero.stat.suffix} ${hero.stat.label}` },
          { label: hero.ctas.primary.label },
          { label: hero.ctas.secondary.label },
        ]}
      />
      {/* 2 #approach  alt */}
      <SectionPlaceholder
        id="approach"
        tone="alt"
        title={approach.title}
        blocks={approach.cards.map((card) => ({ label: card.title }))}
      />
      {/* 3 #path  surface */}
      <SectionPlaceholder
        id="path"
        title={recoveryPath.title}
        blocks={recoveryPath.steps.map((step) => ({ label: step.title }))}
      />
      {/* 4 #techniques  warm */}
      <SectionPlaceholder
        id="techniques"
        tone="warm"
        title={techniques.title}
        blocks={[{ label: techniques.robotic.title }, { label: techniques.laparoscopic.title }]}
      />
      {/* 5 #quality-of-life  blue band */}
      <SectionPlaceholder
        id="quality-of-life"
        tone="plum"
        title={qualityOfLife.title}
        blocks={qualityOfLife.stoma.map((stat) => ({ label: `${stat.value}${stat.suffix} ${stat.label}` }))}
      />
      {/* 6 #outcomes  surface */}
      <SectionPlaceholder
        id="outcomes"
        title={outcomes.dashboard.title}
        blocks={[{ label: outcomes.dashboard.totalLabel, wide: true }, { label: outcomes.survival.title }]}
      />
      {/* 7 #advanced-cases  alt */}
      <SectionPlaceholder
        id="advanced-cases"
        tone="alt"
        title={advancedCases.title}
        blocks={[{ label: advancedCases.eyebrow }, { label: advancedCases.cta.label }]}
      />
      {/* 8 #surgeon  warm */}
      <SectionPlaceholder
        id="surgeon"
        tone="warm"
        title={surgeon.name}
        blocks={[{ label: surgeon.credentials, wide: true }, { label: surgeon.cta.label }]}
      />
      {/* 9–13: the shared sections */}
      <SectionPlaceholder id="reviews" title={reviewsSection.title} />
      <SectionPlaceholder id="videos" tone="alt" title={videosSection.title} />
      <SectionPlaceholder id="appointment" title={appointmentSection.heading} />
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
