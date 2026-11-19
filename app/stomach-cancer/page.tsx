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
import { Approach } from "@/components/pages/stomach-cancer/Approach";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { QuickAnswers } from "@/components/shared/QuickAnswers";
import { RelatedTreatments } from "@/components/shared/RelatedTreatments";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/stomach-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = stomachImages[surgeon.image];
const finalImage = stomachImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, stomach theme).
// Sections stay inline (no <Suspense>): React would move them into hidden blocks after the footer,
// where crawlers that do not run JavaScript cannot read them.
// One @graph: MedicalWebPage, MedicalCondition, Physician, MedicalClinic, BreadcrumbList (+ FAQPage
// once the answers are approved; no Offers: the page has no prices): lib/jsonld.ts.
const graph = cancerPageGraph({
  meta,
  seo: stomachSeo,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: stomachSeo.name, href: new URL(meta.canonical).pathname },
  ],
  physicianDescription: surgeon.bio.join(" "),
});

export default function StomachCancerPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <Hero /> {/* 1  #hero           cream gradient, the warmth */}
      <Understanding /> {/* 2  #understanding  surface: the stomach wall */}
      <WarningSigns /> {/* 3  #warning-signs  alt: the checklist */}
      <Modalities /> {/* 4  #modalities     warm (periwinkle mist): the care pathway */}
      <Approach /> {/* 5  #approach       surface: robotic vs laparoscopic */}
      {/* 6 #surgeon (alt): the shared DoctorCard; the live heading is its label */}
      <DoctorCard
        id="surgeon"
        tone="alt"
        label={surgeon.title}
        name={surgeon.name}
        title={surgeon.role}
        bio={surgeon.bio.join(" ")}
        badges={surgeon.badges}
        cta={surgeon.cta}
        profile={surgeon.profile}
        image={{ src: portrait.src, alt: portrait.alt }}
      />
      {/* 7–11: shared sections (soft look), re-themed by the stomach theme */}
      {/* 7  #reviews  warm */}
      <Reviews
        tone="warm"
        title={reviewsSection.title}
        reviews={reviewsFor(pageSlug, shared.reviewOrder)}
        link={reviewsSection.link}
      />
      {/* 8  #videos   surface */}
      <Videos
        tone="surface"
        eyebrow={videosSection.eyebrow}
        title={keepLastWords(videosSection.title)}
        ids={videosSection.ids}
        labels={videosSection.a11y}
      />
      <Locations tone="alt" /> {/* 9  #locations  alt */}
      {/* 10 NEW: quick answers (once approved, warm) and the related treatments strip (surface) */}
      <QuickAnswers items={stomachSeo.quickAnswers} stats={stomachSeo.stats} tone="warm" />
      <RelatedTreatments path={new URL(meta.canonical).pathname} page="stomach" service={defaultAppointmentService} />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} /> {/* 11 #final-cta  dark */}
    </>
  );
}
