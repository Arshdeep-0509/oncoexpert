import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { advancedCases, outcomes, pageSlug, surgeon } from "@/content/pages/colorectal-cancer";
import {
  appointmentSection,
  finalCtaSection,
  locationsSection,
  reviewsSection,
  videosSection,
} from "@/content/shared/sections";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";
import { Hero } from "@/components/pages/colorectal-cancer/Hero";
import { Approach } from "@/components/pages/colorectal-cancer/Approach";
import { RecoveryPath } from "@/components/pages/colorectal-cancer/RecoveryPath";
import { Techniques } from "@/components/pages/colorectal-cancer/Techniques";
import { QualityOfLife } from "@/components/pages/colorectal-cancer/QualityOfLife";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/colorectal-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, colorectal theme).
// Built: #hero, #approach, #path, #techniques, #quality-of-life. The rest are placeholders with their final ids, in their final order.
export default function ColorectalCancerPage() {
  return (
    <>
      <Hero /> {/* 1 #hero      hero gradient */}
      <Approach /> {/* 2 #approach  alt */}
      <RecoveryPath /> {/* 3 #path      surface, pinned on desktop */}
      <Techniques /> {/* 4 #techniques  warm */}
      <QualityOfLife /> {/* 5 #quality-of-life  blue band */}
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
