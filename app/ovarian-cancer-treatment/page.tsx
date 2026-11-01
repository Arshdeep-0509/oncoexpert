import { Suspense } from "react";
import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { pageSlug, shared, surgeon } from "@/content/pages/ovarian-cancer";
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

const page = pages[pageSlug];

// Live URL and SEO: content/pages/ovarian-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = ovarianImages[surgeon.image];
const finalImage = ovarianImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, ovarian theme).
// Every section after the hero sits in its own <Suspense> boundary, so React hydrates them one by
// one and yields between them (shorter main-thread tasks; no visual difference).
// Tones alternate: sand and sea-glass bands between white ones, the teal band and the final band.
export default function OvarianCancerPage() {
  return (
    <>
      <Hero /> {/* 1  #hero           sand gradient */}
      <Suspense>
        <Features /> {/* 2  #features       surface */}
      </Suspense>
      <Suspense>
        <Understanding /> {/* 3  #understanding  alt (sea-glass) */}
      </Suspense>
      <Suspense>
        <WarningSigns /> {/* 4  #warning-signs  surface */}
      </Suspense>
      <Suspense>
        <Diagnostics /> {/* 5  #diagnostics    warm (sand) */}
      </Suspense>
      <Suspense>
        <Treatments /> {/* 6  #treatments     surface */}
      </Suspense>
      <Suspense>
        <SecondOpinion /> {/* 7  #second-opinion teal band */}
      </Suspense>
      <Suspense>
        <Outcomes /> {/* 8  #outcomes       alt */}
      </Suspense>
      <Suspense>
        <Packages /> {/* 9  #packages       warm */}
      </Suspense>
      {/* 10 #surgeon: the shared DoctorCard with the live ovarian profile */}
      <Suspense>
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
      </Suspense>
      {/* 11–14: shared sections (soft look), re-themed by the ovarian theme */}
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
