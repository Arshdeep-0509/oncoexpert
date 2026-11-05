import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { defaultAppointmentService, meta, pageSlug, shared, surgeon } from "@/content/pages/thyroid-cancer";
import { thyroidSeo } from "@/content/pages/thyroid-cancer.seo";
import { cancerPageGraph } from "@/lib/jsonld";
import { thyroidImages } from "@/content/pages/thyroid-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { keepLastWords } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { Hero } from "@/components/pages/thyroid-cancer/Hero";
import { Understanding } from "@/components/pages/thyroid-cancer/Understanding";
import { Symptoms } from "@/components/pages/thyroid-cancer/Symptoms";
import { EarlyDetection } from "@/components/pages/thyroid-cancer/EarlyDetection";
import { Modalities } from "@/components/pages/thyroid-cancer/Modalities";
import { Dashboard } from "@/components/pages/thyroid-cancer/Dashboard";
import { Outcomes } from "@/components/pages/thyroid-cancer/Outcomes";
import { Packages } from "@/components/pages/thyroid-cancer/Packages";
import { SecondOpinion } from "@/components/pages/thyroid-cancer/SecondOpinion";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { QuickAnswers } from "@/components/shared/QuickAnswers";
import { RelatedTreatments } from "@/components/shared/RelatedTreatments";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/thyroid-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = thyroidImages[surgeon.image];
const finalImage = thyroidImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, thyroid theme).
// Sections stay inline (no <Suspense>): React would move them into hidden blocks after the footer,
// where crawlers that do not run JavaScript cannot read them.
// One @graph: MedicalWebPage, MedicalCondition, Physician, MedicalClinic, BreadcrumbList (+ FAQPage
// and Offers once approved): lib/jsonld.ts.
const graph = cancerPageGraph({
  meta,
  seo: thyroidSeo,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: thyroidSeo.name, href: new URL(meta.canonical).pathname },
  ],
  physicianDescription: surgeon.bio,
});

export default function ThyroidCancerPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <Hero /> {/* 1  #hero             lilac gradient */}
      <Understanding /> {/* 2  #understanding    surface */}
      <Symptoms /> {/* 3  #symptoms         alt */}
      <EarlyDetection /> {/* 4  #early-detection  surface */}
      <Modalities /> {/* 5  #modalities       warm (blush) */}
      <Dashboard /> {/* 6  #dashboard       indigo band */}
      <Outcomes /> {/* 7  #outcomes        alt */}
      <Packages /> {/* 8  #packages        warm (hidden on the live page: PENDING DOCTOR) */}
      {/* 9 #surgeon: the shared DoctorCard with the live thyroid profile */}
      <DoctorCard
        id="surgeon"
        tone="surface"
        label={surgeon.role}
        name={surgeon.name}
        bio={surgeon.bio}
        badges={surgeon.badges}
        cta={surgeon.cta}
        link={surgeon.link}
        image={{ src: portrait.src, alt: portrait.alt }}
      />
      <SecondOpinion /> {/* 10 #second-opinion  indigo band */}
      {/* 11–14: shared sections (soft look), re-themed by the thyroid theme */}
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
      {/* NEW: quick answers (once approved) and the related treatments strip */}
      <QuickAnswers items={thyroidSeo.quickAnswers} stats={thyroidSeo.stats} />
      <RelatedTreatments path={new URL(meta.canonical).pathname} page="thyroid" service={defaultAppointmentService} />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
