import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { faq, pageSlug, reviews, videos } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { youtubeVideos } from "@/content/shared/videos";
import { site } from "@/content/site";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { BreastJsonLd } from "@/components/pages/breast-cancer/BreastJsonLd";
import { Hero } from "@/components/pages/breast-cancer/Hero";
import { Overview } from "@/components/pages/breast-cancer/Overview";
import { WhyTrust } from "@/components/pages/breast-cancer/WhyTrust";
import { PrecisePlanning } from "@/components/pages/breast-cancer/PrecisePlanning";
import { TeamSection } from "@/components/pages/breast-cancer/TeamSection";
import { SurgicalTechniques } from "@/components/pages/breast-cancer/SurgicalTechniques";
import { CareJourney } from "@/components/pages/breast-cancer/CareJourney";
import { SurvivorsCircle } from "@/components/pages/breast-cancer/SurvivorsCircle";
import { ProvenOutcomes } from "@/components/pages/breast-cancer/ProvenOutcomes";
import { InstitutionalValue } from "@/components/pages/breast-cancer/InstitutionalValue";
import { CareFinancing } from "@/components/pages/breast-cancer/CareFinancing";
import { LeadSurgeon } from "@/components/pages/breast-cancer/LeadSurgeon";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Faq } from "@/components/shared/Faq";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/breast-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const finalImage = breastImages.joyFlowers;

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, breast theme).
// Order: the outcome figures and the reviews come before the planning section (client review,
// 30 Oct 2026). Tones alternate white and tint all the way down, so no two tints touch.
export default function BreastCancerPage() {
  return (
    <>
      <BreastJsonLd />
      <Hero /> {/* 1  #hero         hero gradient */}
      <Overview /> {/* 2  #overview     surface */}
      <WhyTrust /> {/* 3  #why-trust    surface-alt */}
      <ProvenOutcomes /> {/* 4  #outcomes     surface */}
      {/* 5: shared, driven by this page's content (as are 13–16) */}
      <Reviews tone="alt" title={reviews.title} reviews={reviewsFor(pageSlug, reviews.order)} />
      <PrecisePlanning /> {/* 6  #planning     surface */}
      <TeamSection /> {/* 6b #team         plum (client review, 31 Oct 2026) */}
      <SurgicalTechniques /> {/* 7  #surgery      surface-warm */}
      <CareJourney /> {/* 8  #journey      surface */}
      <SurvivorsCircle /> {/* 9  #survivors    plum */}
      <InstitutionalValue /> {/* 10 #value        surface-alt */}
      <CareFinancing /> {/* 11 #pricing      surface */}
      <LeadSurgeon /> {/* 12 #surgeon      surface-warm */}
      {/* 13–17: shared sections, driven by this page's content */}
      <Videos tone="surface" eyebrow={videos.eyebrow} title={videos.title} ids={youtubeVideos} labels={videos.a11y} />
      <Faq tone="alt" title={faq.title} contactTitle={faq.contactTitle} items={faq.items} locations={site.locations} />
      <Locations tone="surface" />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
