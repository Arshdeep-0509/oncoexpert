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
export default function BreastCancerPage() {
  return (
    <>
      <BreastJsonLd />
      <Hero /> {/* 1  #hero         hero gradient */}
      <Overview /> {/* 2  #overview     surface */}
      <WhyTrust /> {/* 3  #why-trust    surface-alt */}
      <PrecisePlanning /> {/* 4  #planning     surface */}
      <SurgicalTechniques /> {/* 5  #surgery      surface-warm */}
      <CareJourney /> {/* 6  #journey      surface */}
      <SurvivorsCircle /> {/* 7  #survivors    plum */}
      <ProvenOutcomes /> {/* 8  #outcomes     surface */}
      <InstitutionalValue /> {/* 9  #value        surface-alt */}
      <CareFinancing /> {/* 10 #pricing      surface */}
      <LeadSurgeon /> {/* 11 #surgeon      surface-warm */}
      {/* 12–17: shared sections, driven by this page's content */}
      <Reviews title={reviews.title} reviews={reviewsFor(pageSlug, reviews.order)} />
      <Videos eyebrow={videos.eyebrow} title={videos.title} ids={youtubeVideos} labels={videos.a11y} />
      <Faq title={faq.title} contactTitle={faq.contactTitle} items={faq.items} locations={site.locations} />
      <Locations tone="alt" />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
