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
import { Preservation } from "@/components/pages/urology/Preservation";
import { Leadership } from "@/components/pages/urology/Leadership";
import { Pricing } from "@/components/pages/urology/Pricing";
import { QuoteBand } from "@/components/pages/urology/QuoteBand";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { QuickAnswers } from "@/components/shared/QuickAnswers";
import { RelatedTreatments } from "@/components/shared/RelatedTreatments";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/urology.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = urologyImages[surgeon.image];
const finalImage = urologyImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, urology theme).
// Sections stay inline (no <Suspense>): React would move them into hidden blocks after the footer,
// where crawlers that do not run JavaScript cannot read them.
// One @graph: MedicalWebPage, MedicalCondition, Physician, MedicalClinic, BreadcrumbList (+ FAQPage
// and Offers once approved): lib/jsonld.ts.
const graph = cancerPageGraph({
  meta,
  seo: urologySeo,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: urologySeo.name, href: new URL(meta.canonical).pathname },
  ],
  physicianDescription: surgeon.bio,
});

export default function UrologyPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <Hero /> {/* 1  #hero           sage gradient, the flow */}
      <Specialties /> {/* 2  #specialties    surface: the clinical dashboard */}
      <RoboticEdge /> {/* 3  #robotic-edge   pine band */}
      <Preservation /> {/* 4  #preservation   alt: Spare vs Remove, the TMT ring */}
      <Leadership /> {/* 5  #leadership     surface, then the dark outcome monitor */}
      <Pricing /> {/* 6  #pricing        warm (hidden on the live page: PENDING DOCTOR) */}
      {/* 7 #surgeon: the shared DoctorCard with the live specialist block */}
      <DoctorCard
        id="surgeon"
        tone="surface"
        label={surgeon.label}
        name={surgeon.name}
        bio={surgeon.bio}
        badges={surgeon.badges}
        cta={surgeon.cta}
        profile={surgeon.profile}
        image={{ src: portrait.src, alt: portrait.alt }}
      />
      <QuoteBand /> {/* 7b #quote         pine band: the live quote */}
      {/* 8–12: shared sections (soft look), re-themed by the urology theme */}
      <Reviews
        tone="alt"
        title={reviewsSection.title}
        reviews={reviewsFor(pageSlug, shared.reviewOrder)}
        link={reviewsSection.link}
      />
      {/* 8  #reviews  alt */}
      <Videos
        tone="surface"
        eyebrow={videosSection.eyebrow}
        title={keepLastWords(videosSection.title)}
        ids={videosSection.ids}
        labels={videosSection.a11y}
      />
      {/* 9  #videos   surface */}
      <Locations tone="warm" /> {/* 10 #locations warm */}
      {/* 11 NEW: quick answers (once approved) and the related treatments strip */}
      <QuickAnswers items={urologySeo.quickAnswers} stats={urologySeo.stats} />
      <RelatedTreatments path={new URL(meta.canonical).pathname} page="urology" service={defaultAppointmentService} />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} /> {/* 12 #final-cta */}
    </>
  );
}
