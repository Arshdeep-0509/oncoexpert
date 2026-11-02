import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { defaultAppointmentService, meta, pageSlug, shared, surgeon } from "@/content/pages/lung-cancer";
import { lungSeo } from "@/content/pages/lung-cancer.seo";
import { cancerPageGraph } from "@/lib/jsonld";
import { lungImages } from "@/content/pages/lung-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { keepLastWords } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { Hero } from "@/components/pages/lung-cancer/Hero";
import { Highlights } from "@/components/pages/lung-cancer/Highlights";
import { Diagnosis } from "@/components/pages/lung-cancer/Diagnosis";
import { Pathway } from "@/components/pages/lung-cancer/Pathway";
import { Surgery } from "@/components/pages/lung-cancer/Surgery";
import { Techniques } from "@/components/pages/lung-cancer/Techniques";
import { StageIV } from "@/components/pages/lung-cancer/StageIV";
import { Survival } from "@/components/pages/lung-cancer/Survival";
import { Volume } from "@/components/pages/lung-cancer/Volume";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { QuickAnswers } from "@/components/shared/QuickAnswers";
import { RelatedTreatments } from "@/components/shared/RelatedTreatments";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/lung-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = lungImages[surgeon.image];
const finalImage = lungImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, lung theme).
// Every section after the hero sits in its own <Suspense> boundary, so React hydrates them one by
// one and yields between them (shorter main-thread tasks; no visual difference).
// Tones alternate so no two tints touch: ice and mint bands between pearl ones, the navy bands
// (#stage-iv, the final band) between light ones.
// One @graph: MedicalWebPage, MedicalCondition, Physician, MedicalClinic, BreadcrumbList (+ FAQPage
// and Offers once approved): lib/jsonld.ts.
const graph = cancerPageGraph({
  meta,
  seo: lungSeo,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: "Our Services", href: "/our-services/" },
    { label: lungSeo.name, href: new URL(meta.canonical).pathname },
  ],
  physicianDescription: surgeon.bio,
});

export default function LungCancerPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <Hero /> {/* 1  #hero        dawn-sky gradient */}
      <Suspense>
        <Highlights /> {/* 2  #highlights  surface, overlapping the hero on desktop */}
      </Suspense>
      <Suspense>
        <Diagnosis /> {/* 3  #diagnosis   alt */}
      </Suspense>
      <Suspense>
        <Pathway /> {/* 4  #pathway     surface */}
      </Suspense>
      <Suspense>
        <Surgery /> {/* 5  #surgery     warm (mint) */}
      </Suspense>
      <Suspense>
        <Techniques /> {/* 6  #techniques  surface */}
      </Suspense>
      <Suspense>
        <StageIV /> {/* 7  #stage-iv    navy band */}
      </Suspense>
      <Suspense>
        <Survival /> {/* 8  #survival    alt */}
      </Suspense>
      <Suspense>
        <Volume /> {/* 9  #volume      surface */}
      </Suspense>
      {/* 10 #surgeon: the shared DoctorCard with the live lung profile */}
      <Suspense>
        <DoctorCard
          id="surgeon"
          tone="warm"
          label={surgeon.label}
          name={surgeon.name}
          title={surgeon.title}
          bio={surgeon.bio}
          stats={surgeon.stats}
          badges={surgeon.facts.map((fact) => ({ icon: fact.icon, label: `${fact.label}: ${fact.value}` }))}
          cta={surgeon.cta}
          link={surgeon.link}
          image={{ src: portrait.src, alt: portrait.alt }}
        />
      </Suspense>
      {/* 11–14: shared sections (soft look), re-themed by the lung theme */}
      <Suspense>
        <Reviews
          tone="alt"
          title={reviewsSection.title}
          reviews={reviewsFor(pageSlug, shared.reviewOrder)}
          link={reviewsSection.link}
        />
      </Suspense>
      <Suspense>
        <Videos
          tone="surface"
          eyebrow={videosSection.eyebrow}
          title={keepLastWords(videosSection.title)}
          ids={videosSection.ids}
          labels={videosSection.a11y}
        />
      </Suspense>
      <Suspense>
        <Locations tone="alt" />
      </Suspense>
      {/* NEW: quick answers (once approved) and the related treatments strip */}
      <QuickAnswers items={lungSeo.quickAnswers} stats={lungSeo.stats} />
      <RelatedTreatments path={new URL(meta.canonical).pathname} page="lung" service={defaultAppointmentService} />
      <Suspense>
        <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
      </Suspense>
    </>
  );
}
