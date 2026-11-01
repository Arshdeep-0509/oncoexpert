import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  pageName,
  pageSlug,
  shared,
  stageIV,
  surgeon,
  surgery,
  survival,
  techniques,
  volume,
  volumeTotal,
} from "@/content/pages/lung-cancer";
import { reviewsFor } from "@/content/shared/reviews";
import { finalCtaSection, locationsSection, reviewsSection, videosSection } from "@/content/shared/sections";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";
import { Hero } from "@/components/pages/lung-cancer/Hero";
import { Highlights } from "@/components/pages/lung-cancer/Highlights";
import { Diagnosis } from "@/components/pages/lung-cancer/Diagnosis";
import { Pathway } from "@/components/pages/lung-cancer/Pathway";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/lung-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const reviews = reviewsFor(pageSlug, shared.reviewOrder);

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, lung theme).
// Sections 1–4 are built; the rest are placeholders with their final ids, in their final order.
export default function LungCancerPage() {
  return (
    <>
      <Hero /> {/* 1  #hero        dawn-sky gradient */}
      <Highlights /> {/* 2  #highlights  surface, overlapping the hero on desktop */}
      <Diagnosis /> {/* 3  #diagnosis   alt */}
      <Pathway /> {/* 4  #pathway     surface */}
      {/* 5 #surgery  warm */}
      <SectionPlaceholder
        id="surgery"
        tone="warm"
        title={surgery.lines.join(" ")}
        blocks={surgery.benefits.map((benefit) => ({ label: benefit.label }))}
      />
      {/* 6 #techniques  surface */}
      <SectionPlaceholder
        id="techniques"
        title={techniques.title}
        blocks={[{ label: techniques.robotic.title }, { label: techniques.vats.title }]}
      />
      {/* 7 #stage-iv  navy band */}
      <SectionPlaceholder
        id="stage-iv"
        tone="plum"
        title={stageIV.title}
        blocks={stageIV.stats.map((stat) => ({ label: `${stat.value}${stat.suffix} ${stat.label}` }))}
      />
      {/* 8 #survival  alt */}
      <SectionPlaceholder
        id="survival"
        tone="alt"
        title={survival.title}
        blocks={survival.stages.map((stage) => ({ label: `${stage.stage} · ${stage.value}${survival.unit}` }))}
      />
      {/* 9 #volume  surface */}
      <SectionPlaceholder
        id="volume"
        title={volume.title}
        blocks={[
          ...volume.counts.map((count) => ({ label: `${count.value} ${count.label}` })),
          { label: `${volumeTotal} ${volume.total.label}`, wide: true },
        ]}
      />
      {/* 10 #surgeon  warm */}
      <SectionPlaceholder
        id="surgeon"
        tone="warm"
        title={surgeon.title}
        blocks={[
          ...surgeon.facts.map((fact) => ({ label: `${fact.label}: ${fact.value}` })),
          { label: surgeon.cta.label },
        ]}
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
