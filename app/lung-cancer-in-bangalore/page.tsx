import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  diagnosis,
  hero,
  highlights,
  pageName,
  pageSlug,
  pathway,
  shared,
  stageIV,
  surgeon,
  surgery,
  survival,
  techniques,
  volume,
  volumeTotal,
} from "@/content/pages/lung-cancer";
import { lungImages } from "@/content/pages/lung-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { finalCtaSection, locationsSection, reviewsSection, videosSection } from "@/content/shared/sections";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/lung-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const reviews = reviewsFor(pageSlug, shared.reviewOrder);

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, lung theme).
// Foundation: every section is a placeholder with its final id, in its final order.
export default function LungCancerPage() {
  return (
    <>
      {/* 1 #hero  dawn-sky gradient */}
      <SectionPlaceholder
        id="hero"
        as="h1"
        hero
        title={page.meta.h1}
        className="bg-(image:--grad-hero)"
        blocks={[
          { label: pageName, wide: true },
          { label: hero.ctas.primary.label },
          { label: hero.ctas.secondary.label },
          { label: lungImages[hero.image].alt },
        ]}
      />
      {/* 2 #highlights  surface */}
      <SectionPlaceholder
        id="highlights"
        title={highlights.a11y.label}
        blocks={highlights.items.map((item) => ({ label: item.label }))}
      />
      {/* 3 #diagnosis  alt */}
      <SectionPlaceholder
        id="diagnosis"
        tone="alt"
        title={diagnosis.title}
        blocks={[
          ...diagnosis.symptoms.map((label) => ({ label })),
          ...diagnosis.tests.map((label) => ({ label })),
          { label: `${diagnosis.callout.lead} ${diagnosis.callout.body}`, wide: true },
        ]}
      />
      {/* 4 #pathway  surface */}
      <SectionPlaceholder
        id="pathway"
        title={pathway.title}
        blocks={pathway.steps.map((step, i) => ({ label: `${i + 1} · ${step.title}` }))}
      />
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
      <SectionPlaceholder id="final-cta" tone="plum" title={finalCtaSection.text} />
    </>
  );
}
