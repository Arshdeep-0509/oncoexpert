import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { defaultAppointmentService, meta, pageSlug, shared, surgeon } from "@/content/pages/stomach-cancer";
import { stomachSeo } from "@/content/pages/stomach-cancer.seo";
import { stomachImages } from "@/content/pages/stomach-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { cancerPageGraph } from "@/lib/jsonld";
import { keepLastWords } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { Hero } from "@/components/pages/stomach-cancer/Hero";
import { Understanding } from "@/components/pages/stomach-cancer/Understanding";
import { WarningSigns } from "@/components/pages/stomach-cancer/WarningSigns";
import { Modalities } from "@/components/pages/stomach-cancer/Modalities";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { RelatedTreatments } from "@/components/shared/RelatedTreatments";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/stomach-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const finalImage = stomachImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, stomach theme).
// Sections stay inline (no <Suspense>): React would move them into hidden blocks after the footer,
// where crawlers that do not run JavaScript cannot read them.
// One @graph: MedicalWebPage, MedicalCondition, Physician, MedicalClinic, BreadcrumbList (+ FAQPage
// and Offers once written and approved): lib/jsonld.ts.
const graph = cancerPageGraph({
  meta,
  seo: stomachSeo,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: stomachSeo.name, href: new URL(meta.canonical).pathname },
  ],
  physicianDescription: surgeon.bio.join(" "),
});

// Built so far: #hero, #understanding, #warning-signs, #modalities. Still to come, in the live order
// (content/pages/stomach-cancer.ts): #techniques, #surgeon.
export default function StomachCancerPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <Hero /> {/* 1  #hero           cream gradient, the warmth */}
      <Understanding /> {/* 2  #understanding  surface: the stomach wall */}
      <WarningSigns /> {/* 3  #warning-signs  alt: the checklist */}
      <Modalities /> {/* 4  #modalities     warm (periwinkle mist): the care pathway */}
      {/* Shared sections (soft look), re-themed by the stomach theme */}
      <Reviews
        tone="alt"
        title={reviewsSection.title}
        reviews={reviewsFor(pageSlug, shared.reviewOrder)}
        link={reviewsSection.link}
      />
      <Videos
        tone="surface"
        eyebrow={videosSection.eyebrow}
        title={keepLastWords(videosSection.title)}
        ids={videosSection.ids}
        labels={videosSection.a11y}
      />
      <Locations tone="warm" />
      <RelatedTreatments path={new URL(meta.canonical).pathname} page="stomach" service={defaultAppointmentService} />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
