import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { defaultAppointmentService, meta, pageSlug, shared, surgeon } from "@/content/pages/urology";
import { urologySeo } from "@/content/pages/urology.seo";
import { urologyImages } from "@/content/pages/urology.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { cancerPageGraph } from "@/lib/jsonld";
import { keepLastWords } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { Hero } from "@/components/pages/urology/Hero";
import { Specialties } from "@/components/pages/urology/Specialties";
import { RoboticEdge } from "@/components/pages/urology/RoboticEdge";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { RelatedTreatments } from "@/components/shared/RelatedTreatments";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/urology.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const finalImage = urologyImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, urology theme).
// Sections stay inline (no <Suspense>): React would move them into hidden blocks after the footer,
// where crawlers that do not run JavaScript cannot read them.
// One @graph: MedicalWebPage, MedicalCondition, Physician, MedicalClinic, BreadcrumbList (+ FAQPage
// and Offers once written and approved): lib/jsonld.ts.
const graph = cancerPageGraph({
  meta,
  seo: urologySeo,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: urologySeo.name, href: new URL(meta.canonical).pathname },
  ],
  physicianDescription: surgeon.bio,
});

// Built so far: #hero, #specialties, #robotic-edge. Still to come, in the live order (content/pages/
// urology.ts): #organ-preservation, #leadership, #pricing, #specialist.
export default function UrologyPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <Hero /> {/* 1  #hero          sage gradient, the flow */}
      <Specialties /> {/* 2  #specialties   surface: the clinical dashboard */}
      <RoboticEdge /> {/* 3  #robotic-edge  pine band */}
      {/* Shared sections (soft look), re-themed by the urology theme */}
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
      <RelatedTreatments path={new URL(meta.canonical).pathname} page="urology" service={defaultAppointmentService} />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
