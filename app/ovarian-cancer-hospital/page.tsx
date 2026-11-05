import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { defaultAppointmentService, meta, pageSlug, shared, surgeon } from "@/content/pages/ovarian-cancer";
import { ovarianSeo } from "@/content/pages/ovarian-cancer.seo";
import { cancerPageGraph } from "@/lib/jsonld";
import { ovarianImages } from "@/content/pages/ovarian-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { keepLastWords } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { Hero } from "@/components/pages/ovarian-cancer/Hero";
import { Features } from "@/components/pages/ovarian-cancer/Features";
import { Understanding } from "@/components/pages/ovarian-cancer/Understanding";
import { WarningSigns } from "@/components/pages/ovarian-cancer/WarningSigns";
import { Diagnostics } from "@/components/pages/ovarian-cancer/Diagnostics";
import { Treatments } from "@/components/pages/ovarian-cancer/Treatments";
import { SecondOpinion } from "@/components/pages/ovarian-cancer/SecondOpinion";
import { Outcomes } from "@/components/pages/ovarian-cancer/Outcomes";
import { Packages } from "@/components/pages/ovarian-cancer/Packages";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { QuickAnswers } from "@/components/shared/QuickAnswers";
import { RelatedTreatments } from "@/components/shared/RelatedTreatments";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/ovarian-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = ovarianImages[surgeon.image];
const finalImage = ovarianImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, ovarian theme).
// Sections stay inline (no <Suspense>): React would move them into hidden blocks after the footer,
// where crawlers that do not run JavaScript cannot read them.
// Tones alternate: sand and sea-glass bands between white ones, the teal band and the final band.
// One @graph: MedicalWebPage, MedicalCondition, Physician, MedicalClinic, BreadcrumbList (+ FAQPage
// and Offers once approved): lib/jsonld.ts.
const graph = cancerPageGraph({
  meta,
  seo: ovarianSeo,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: ovarianSeo.name, href: new URL(meta.canonical).pathname },
  ],
  physicianDescription: surgeon.bio,
});

export default function OvarianCancerPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <Hero /> {/* 1  #hero           sand gradient */}
      <Features /> {/* 2  #features       surface */}
      <Understanding /> {/* 3  #understanding  alt (sea-glass) */}
      <WarningSigns /> {/* 4  #warning-signs  surface */}
      <Diagnostics /> {/* 5  #diagnostics    warm (sand) */}
      <Treatments /> {/* 6  #treatments     surface */}
      <SecondOpinion /> {/* 7  #second-opinion teal band */}
      <Outcomes /> {/* 8  #outcomes       alt */}
      <Packages /> {/* 9  #packages       warm */}
      {/* 10 #surgeon: the shared DoctorCard with the live ovarian profile */}
      <DoctorCard
        id="surgeon"
        tone="surface"
        label={surgeon.label}
        name={surgeon.lines.join(" ")}
        bio={surgeon.bio}
        stats={surgeon.stats}
        badges={[
          ...surgeon.badges,
          ...surgeon.facts.map((fact) => ({ icon: fact.icon, label: `${fact.label}: ${fact.value}` })),
        ]}
        cta={surgeon.cta}
        link={surgeon.link}
        image={{ src: portrait.src, alt: portrait.alt }}
      />
      {/* 11–14: shared sections (soft look), re-themed by the ovarian theme */}
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
      <QuickAnswers items={ovarianSeo.quickAnswers} stats={ovarianSeo.stats} />
      <RelatedTreatments path={new URL(meta.canonical).pathname} page="ovarian" service={defaultAppointmentService} />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
