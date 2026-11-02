import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { hero, meta, pageSlug } from "@/content/pages/about-us";
import { aboutImages } from "@/content/pages/about-us.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { aboutGraph } from "@/lib/jsonld";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { AboutHero } from "@/components/pages/about-us/AboutHero";
import { Credentials } from "@/components/pages/about-us/Credentials";
import { Journey } from "@/components/pages/about-us/Journey";
import { QuoteSection } from "@/components/pages/about-us/QuoteSection";
import { Expertise } from "@/components/pages/about-us/Expertise";
import { Experience } from "@/components/pages/about-us/Experience";
import { WhyTrust } from "@/components/pages/about-us/WhyTrust";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/about-us.ts → meta
export const metadata: Metadata = pageMetadata(page, "website");

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const finalImage = aboutImages.careHands;

// One @graph: ProfilePage (main entity: the Physician), Physician, MedicalClinic, BreadcrumbList.
const graph = aboutGraph(meta, hero.body);

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, care theme, dark hero).
// Tones: navy bands open, break and close the page (hero, experience, final call); between them
// white, ice, the ivory quote and warm alternate, so no two tints touch.
export default function AboutUsPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <AboutHero /> {/* 1  #hero         navy → logo-blue gradient */}
      <Credentials /> {/* 2  #credentials  white */}
      <Journey /> {/* 3  #journey      ice, pinned on desktop */}
      <QuoteSection /> {/* 4  #quote        soft ivory gradient */}
      <Expertise /> {/* 5  #expertise    white */}
      <Experience /> {/* 6  #experience   navy band */}
      <WhyTrust /> {/* 7  #why-trust    warm */}
      {/* 8–13: shared sections (soft look), re-themed by the care theme */}
      <Reviews
        tone="surface"
        title={reviewsSection.title}
        reviews={reviewsFor(pageSlug, reviewsSection.order)}
        link={reviewsSection.link}
      />
      <Videos
        tone="alt"
        eyebrow={videosSection.eyebrow}
        title={videosSection.title}
        ids={videosSection.ids}
        labels={videosSection.a11y}
      />
      <Locations tone="warm" />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} /> {/* 13 navy, photo */}
    </>
  );
}
