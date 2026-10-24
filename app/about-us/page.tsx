import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { credentials, experience, expertise, hero, journey, pageSlug, quote, whyTrust } from "@/content/pages/about-us";
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

// Live URL and SEO: content/pages/about-us.ts → meta
export const metadata: Metadata = pageMetadata(page, "website");

export function generateViewport(): Viewport {
  return pageViewport(page);
}

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, care theme).
// Foundation: every section is a placeholder with its final id, in its final order.
export default function AboutUsPage() {
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
          { label: hero.subtitle, wide: true },
          { label: hero.card.name },
          { label: hero.ctas.primary.label },
          { label: hero.ctas.secondary.label },
        ]}
      />
      {/* 2 #credentials  surface */}
      <SectionPlaceholder
        id="credentials"
        title={credentials.title}
        blocks={credentials.items.map((item) => ({ label: item.title }))}
      />
      {/* 3 #journey  warm */}
      <SectionPlaceholder
        id="journey"
        tone="warm"
        title={journey.title}
        blocks={journey.stages.map((stage) => ({ label: stage.title }))}
      />
      {/* 4 #quote  navy band */}
      <SectionPlaceholder id="quote" tone="plum" title={quote.text} blocks={[{ label: quote.attribution }]} />
      {/* 5 #expertise  surface */}
      <SectionPlaceholder
        id="expertise"
        title={expertise.title}
        blocks={expertise.cards.map((card) => ({ label: card.title }))}
      />
      {/* 6 #experience  alt */}
      <SectionPlaceholder
        id="experience"
        tone="alt"
        title={`${experience.stat.value}${experience.stat.suffix}`}
        blocks={[{ label: experience.stat.label, wide: true }]}
      />
      {/* 7 #why-trust  surface */}
      <SectionPlaceholder
        id="why-trust"
        title={whyTrust.title}
        blocks={whyTrust.points.map((point) => ({ label: point.title }))}
      />
      {/* 8–13: the shared sections */}
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
