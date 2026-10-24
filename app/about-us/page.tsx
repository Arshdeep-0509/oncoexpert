import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { experience, expertise, pageSlug, whyTrust } from "@/content/pages/about-us";
import {
  appointmentSection,
  finalCtaSection,
  locationsSection,
  reviewsSection,
  videosSection,
} from "@/content/shared/sections";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SectionPlaceholder } from "@/components/ui/SectionPlaceholder";
import { AboutHero } from "@/components/pages/about-us/AboutHero";
import { Credentials } from "@/components/pages/about-us/Credentials";
import { Journey } from "@/components/pages/about-us/Journey";
import { QuoteSection } from "@/components/pages/about-us/QuoteSection";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/about-us.ts → meta
export const metadata: Metadata = pageMetadata(page, "website");

export function generateViewport(): Viewport {
  return pageViewport(page);
}

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, care theme).
// Built: #hero, #credentials, #journey, #quote. The rest are placeholders with their final ids.
export default function AboutUsPage() {
  return (
    <>
      <AboutHero /> {/* 1 #hero         navy → logo-blue gradient */}
      <Credentials /> {/* 2 #credentials  white */}
      <Journey /> {/* 3 #journey      ice, pinned on desktop */}
      <QuoteSection /> {/* 4 #quote        soft ivory gradient */}
      {/* 5–13: still placeholders (next step) */}
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
