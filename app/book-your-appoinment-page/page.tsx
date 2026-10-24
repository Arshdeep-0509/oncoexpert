import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { emergency, hero, howItWorks, pageSlug, trust } from "@/content/pages/book-appointment";
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

// Live URL and SEO: content/pages/book-appointment.ts → meta
export const metadata: Metadata = pageMetadata(page, "website");

export function generateViewport(): Viewport {
  return pageViewport(page);
}

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, care theme).
// Foundation: every section is a placeholder with its final id, in its final order.
export default function BookAppointmentPage() {
  return (
    <>
      {/* 1 #hero: form first (the form block is #appointment, so every "Book" button scrolls to it) */}
      <SectionPlaceholder
        id="hero"
        as="h1"
        hero
        title={hero.title}
        className="bg-(image:--grad-hero)"
        blocks={[{ id: "appointment", label: appointmentSection.form.title, wide: true }, { label: hero.eyebrow }]}
      />
      {/* 2 #emergency  warm */}
      <SectionPlaceholder
        id="emergency"
        tone="warm"
        title={emergency.label}
        blocks={[{ label: `${emergency.lead} ${emergency.phone.display}`, wide: true }]}
      />
      {/* 3 #trust  surface */}
      <SectionPlaceholder
        id="trust"
        title={trust.a11y.list}
        blocks={trust.items.map((item) => ({ label: item.title }))}
      />
      {/* 4 #how-it-works  alt */}
      <SectionPlaceholder
        id="how-it-works"
        tone="alt"
        title={howItWorks.title}
        blocks={howItWorks.steps.map((step) => ({ label: step.title }))}
      />
      {/* 5–8: the shared sections */}
      <SectionPlaceholder id="reviews" title={reviewsSection.title} />
      <SectionPlaceholder id="videos" tone="alt" title={videosSection.title} />
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
