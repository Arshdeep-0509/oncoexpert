import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { pageSlug, shared, surgeon } from "@/content/pages/thyroid-cancer";
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

const page = pages[pageSlug];

// Live URL and SEO: content/pages/thyroid-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = thyroidImages[surgeon.image];
const finalImage = thyroidImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, thyroid theme).
// Every section after the hero sits in its own <Suspense> boundary, so React hydrates them one by
// one and yields between them (shorter main-thread tasks; no visual difference).
export default function ThyroidCancerPage() {
  return (
    <>
      <Hero /> {/* 1  #hero             lilac gradient */}
      <Suspense>
        <Understanding /> {/* 2  #understanding    surface */}
      </Suspense>
      <Suspense>
        <Symptoms /> {/* 3  #symptoms         alt */}
      </Suspense>
      <Suspense>
        <EarlyDetection /> {/* 4  #early-detection  surface */}
      </Suspense>
      <Suspense>
        <Modalities /> {/* 5  #modalities       warm (blush) */}
      </Suspense>
      <Suspense>
        <Dashboard /> {/* 6  #dashboard       indigo band */}
      </Suspense>
      <Suspense>
        <Outcomes /> {/* 7  #outcomes        alt */}
      </Suspense>
      <Suspense>
        <Packages /> {/* 8  #packages        warm (hidden on the live page: PENDING DOCTOR) */}
      </Suspense>
      {/* 9 #surgeon: the shared DoctorCard with the live thyroid profile */}
      <Suspense>
        <DoctorCard
          id="surgeon"
          tone="surface"
          label={surgeon.role}
          name={surgeon.name}
          bio={surgeon.bio}
          stats={surgeon.stats}
          badges={surgeon.badges}
          cta={surgeon.cta}
          link={surgeon.link}
          image={{ src: portrait.src, alt: portrait.alt }}
        />
      </Suspense>
      <Suspense>
        <SecondOpinion /> {/* 10 #second-opinion  indigo band */}
      </Suspense>
      {/* 11–14: shared sections (soft look), re-themed by the thyroid theme */}
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
        <Locations tone="warm" />
      </Suspense>
      <Suspense>
        <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
      </Suspense>
    </>
  );
}
