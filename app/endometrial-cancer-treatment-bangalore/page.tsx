import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  clinical,
  hero,
  packages,
  pageSlug,
  precision,
  sentinel,
  surgeon,
  symptoms,
} from "@/content/pages/endometrial-cancer";
import {
  appointmentSection,
  finalCtaSection,
  locationsSection,
  reviewsSection,
  videosSection,
} from "@/content/shared/sections";
import { formatRupees } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/endometrial-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, endometrial theme).
// Foundation: every section is a placeholder with its final id, in its final order.
export default function EndometrialCancerPage() {
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
          ...hero.features.map((feature) => ({ label: feature.label })),
          { label: hero.ctas.primary.label },
        ]}
      />
      {/* 2 #clinical  plum band */}
      <SectionPlaceholder
        id="clinical"
        tone="plum"
        title={clinical.title}
        blocks={clinical.stats.map((stat) => ({ label: `${stat.value}${stat.suffix} ${stat.label}` }))}
      />
      {/* 3 #symptoms  surface */}
      <SectionPlaceholder
        id="symptoms"
        title={symptoms.title}
        blocks={symptoms.items.map((item) => ({ label: item.title }))}
      />
      {/* 4 #precision  alt */}
      <SectionPlaceholder
        id="precision"
        tone="alt"
        title={precision.title}
        blocks={[{ label: precision.robotic.title }, { label: precision.laparoscopic.title }]}
      />
      {/* 5 #sentinel-node  surface */}
      <SectionPlaceholder
        id="sentinel-node"
        title={sentinel.title}
        blocks={sentinel.benefits.map((benefit) => ({ label: benefit.title }))}
      />
      {/* 6 #packages  warm */}
      <SectionPlaceholder
        id="packages"
        tone="warm"
        title={packages.title}
        blocks={packages.packages.map((pkg) => ({ label: `${pkg.name} · ${formatRupees(pkg.amount)}` }))}
      />
      {/* 7 #surgeon  surface */}
      <SectionPlaceholder
        id="surgeon"
        title={surgeon.title}
        blocks={[
          { label: `${surgeon.experience.value}${surgeon.experience.suffix} ${surgeon.experience.label}` },
          { label: surgeon.cta.label },
        ]}
      />
      {/* 8–12: the shared sections */}
      <SectionPlaceholder id="reviews" tone="alt" title={reviewsSection.title} />
      <SectionPlaceholder id="videos" title={videosSection.title} />
      <SectionPlaceholder id="appointment" tone="alt" title={appointmentSection.heading} />
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
