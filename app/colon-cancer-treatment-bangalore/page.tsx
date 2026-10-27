import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { pageName, pageSlug, shared, surgeon } from "@/content/pages/colorectal-cancer";
import { colorectalImages } from "@/content/pages/colorectal-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { keepLastWords } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { Hero } from "@/components/pages/colorectal-cancer/Hero";
import { Approach } from "@/components/pages/colorectal-cancer/Approach";
import { RecoveryPath } from "@/components/pages/colorectal-cancer/RecoveryPath";
import { Techniques } from "@/components/pages/colorectal-cancer/Techniques";
import { QualityOfLife } from "@/components/pages/colorectal-cancer/QualityOfLife";
import { Outcomes } from "@/components/pages/colorectal-cancer/Outcomes";
import { HopeBand } from "@/components/pages/colorectal-cancer/HopeBand";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { AppointmentSection } from "@/components/shared/AppointmentSection";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/colorectal-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = colorectalImages[surgeon.image];
const finalImage = colorectalImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, colorectal theme).
// Tones alternate so no two tints touch: light bands between the three dark ones (quality of
// life, hope, the final call).
export default function ColorectalCancerPage() {
  return (
    <>
      <Hero /> {/* 1  #hero             hero gradient */}
      <Approach /> {/* 2  #approach         alt */}
      <RecoveryPath /> {/* 3  #path             surface, pinned on desktop */}
      <Techniques /> {/* 4  #techniques       warm */}
      <QualityOfLife /> {/* 5  #quality-of-life  blue band */}
      <Outcomes /> {/* 6  #outcomes         surface */}
      <HopeBand /> {/* 7  #advanced-cases   ink band, photo */}
      {/* 8  #surgeon: the shared DoctorCard, its figures counting up */}
      <DoctorCard
        id="surgeon"
        tone="warm"
        label={surgeon.label}
        name={surgeon.name}
        title={surgeon.credentials}
        bio={surgeon.bio}
        stats={surgeon.stats}
        link={surgeon.cta}
        image={{ src: portrait.src, alt: portrait.alt }}
      />
      {/* 9–13: shared sections (soft look), re-themed by the colorectal theme */}
      <Reviews
        tone="surface"
        title={reviewsSection.title}
        reviews={reviewsFor(pageSlug, shared.reviewOrder)}
        link={reviewsSection.link}
      />
      <Videos
        tone="alt"
        eyebrow={videosSection.eyebrow}
        title={keepLastWords(videosSection.title)}
        ids={videosSection.ids}
        labels={videosSection.a11y}
      />
      <AppointmentSection tone="surface" page={pageName} />
      <Locations tone="warm" />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
