import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { defaultAppointmentService, faq, pageName, pageSlug, reviews, videos } from "@/content/pages/home";
import { homeImages } from "@/content/pages/home.images";
import { reviewsFor } from "@/content/shared/reviews";
import { youtubeVideos } from "@/content/shared/videos";
import { site } from "@/content/site";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { SiteShell } from "@/components/layout/SiteShell";
import { HomeHero } from "@/components/pages/home/HomeHero";
import { SurgeonSection } from "@/components/pages/home/SurgeonSection";
import { RoboticSection } from "@/components/pages/home/RoboticSection";
import { SpecialtiesSection } from "@/components/pages/home/SpecialtiesSection";
import { ServicesSection } from "@/components/pages/home/ServicesSection";
import { ApproachSection } from "@/components/pages/home/ApproachSection";
import { ValueSection } from "@/components/pages/home/ValueSection";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Faq } from "@/components/shared/Faq";
import { AppointmentSection } from "@/components/shared/AppointmentSection";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/home.ts → meta (og:type "website", as on the live homepage)
export const metadata: Metadata = pageMetadata(page, "website");

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const finalImage = homeImages.finalCouple;

/*
 * Why the shell is here and not in a layout: every other page puts <SiteShell> in its own
 * app/<slug>/layout.tsx, but a layout.tsx next to this file would be the root layout, which
 * wraps every route (the other pages would get a second shell). Home has no child routes, so
 * a layout's one advantage (staying mounted across child navigations) does not apply: wrapping
 * the sections here renders the same <div data-theme="home"> → header → main → footer tree.
 *
 * Tones: navy bands carry the statements (hero, robotic, approach, final call); warm marks the
 * human moments, every fifth section (surgeon, value, locations); ice and white alternate in
 * between. Two tints never touch, so every edge is tint ↔ white or light ↔ navy.
 */
export default function HomePage() {
  return (
    <SiteShell
      theme="home"
      headerVariant="light"
      heroTone="dark"
      activeHref={page.path}
      defaultService={defaultAppointmentService}
    >
      <HomeHero /> {/* 1  #hero         navy hero gradient */}
      <SurgeonSection /> {/* 2  #surgeon      warm */}
      <RoboticSection /> {/* 3  #robotic      navy band */}
      <SpecialtiesSection /> {/* 4  #specialties  ice */}
      <ServicesSection /> {/* 5  #services     white */}
      <ApproachSection /> {/* 6  #approach     navy band */}
      <ValueSection /> {/* 7  #value        warm → white */}
      {/* 8–13: shared sections (soft look), driven by this page's content */}
      <Reviews tone="alt" title={reviews.title} reviews={reviewsFor(pageSlug, reviews.order)} link={reviews.link} />
      <Videos tone="surface" eyebrow={videos.eyebrow} title={videos.title} ids={youtubeVideos} labels={videos.a11y} />
      <Faq tone="alt" title={faq.title} contactTitle={faq.contactTitle} items={faq.items} locations={site.locations} />
      <AppointmentSection tone="surface" page={pageName} />
      <Locations tone="warm" />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} /> {/* 13 navy, photo */}
    </SiteShell>
  );
}
