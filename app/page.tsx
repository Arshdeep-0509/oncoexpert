import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import {
  approach,
  faq,
  pageSlug,
  reviews,
  robotic,
  services,
  specialties,
  surgeon,
  value,
  videos,
} from "@/content/pages/home";
import { appointmentSection, finalCtaSection, locationsSection } from "@/content/shared/sections";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SiteShell } from "@/components/layout/SiteShell";
import { HomeHero } from "@/components/pages/home/HomeHero";
import { SectionPlaceholder } from "@/components/pages/home/SectionPlaceholder";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/home.ts → meta (og:type "website", as on the live homepage)
export const metadata: Metadata = pageMetadata(page, "website");

export function generateViewport(): Viewport {
  return pageViewport(page);
}

/*
 * Why the shell is here and not in a layout: every other page puts <SiteShell> in its own
 * app/<slug>/layout.tsx, but a layout.tsx next to this file would be the root layout, which
 * wraps every route (the other pages would get a second shell). Home has no child routes, so
 * a layout's one advantage (staying mounted across child navigations) does not apply: wrapping
 * the sections here renders the same <div data-theme="home"> → header → main → footer tree.
 */
export default function HomePage() {
  return (
    <SiteShell theme="home" headerVariant="light" heroTone="dark" activeHref={page.path}>
      <HomeHero /> {/* 1  #hero         navy hero gradient */}
      <SectionPlaceholder index={2} id="surgeon" tone="surface" title={surgeon.name} />
      <SectionPlaceholder index={3} id="robotic" tone="plum" title={robotic.title} />
      <SectionPlaceholder index={4} id="specialties" tone="alt" title={specialties.title} />
      <SectionPlaceholder index={5} id="services" tone="surface" title={services.title} />
      <SectionPlaceholder index={6} id="approach" tone="plum" title={approach.title} />
      <SectionPlaceholder index={7} id="value" tone="warm" title={value.title} />
      <SectionPlaceholder index={8} id="reviews" tone="alt" title={reviews.title} />
      <SectionPlaceholder index={9} id="videos" tone="plum" title={videos.title} />
      <SectionPlaceholder index={10} id="faq" tone="surface" title={faq.title} />
      <SectionPlaceholder index={11} id="appointment" tone="alt" title={appointmentSection.heading} />
      <SectionPlaceholder index={12} id="locations" tone="surface" title={locationsSection.heading} />
      <SectionPlaceholder index={13} id="final-cta" tone="plum" title={finalCtaSection.text} />
    </SiteShell>
  );
}
