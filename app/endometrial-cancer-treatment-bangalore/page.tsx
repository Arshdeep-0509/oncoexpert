import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { pageSlug, shared, surgeon } from "@/content/pages/endometrial-cancer";
import { endometrialImages } from "@/content/pages/endometrial-cancer.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { keepLastWords } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { Hero } from "@/components/pages/endometrial-cancer/Hero";
import { ClinicalExcellence } from "@/components/pages/endometrial-cancer/ClinicalExcellence";
import { Symptoms } from "@/components/pages/endometrial-cancer/Symptoms";
import { Precision } from "@/components/pages/endometrial-cancer/Precision";
import { SentinelNode } from "@/components/pages/endometrial-cancer/SentinelNode";
import { Packages } from "@/components/pages/endometrial-cancer/Packages";
import { DoctorCard } from "@/components/shared/DoctorCard";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/endometrial-cancer.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const portrait = endometrialImages[surgeon.image];
const finalImage = endometrialImages[shared.finalImage];
const factIcons = { Education: "graduation-cap", Expertise: "stethoscope" } as const;

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, endometrial theme).
// Tones alternate so no two tints touch: peach and apricot bands between white ones, the plum
// final band last.
export default function EndometrialCancerPage() {
  return (
    <>
      <Hero /> {/* 1  #hero           peach gradient */}
      <ClinicalExcellence /> {/* 2  #clinical       warm band */}
      <Symptoms /> {/* 3  #symptoms       surface */}
      <Precision /> {/* 4  #precision      alt */}
      <SentinelNode /> {/* 5  #sentinel-node  surface */}
      <Packages /> {/* 6  #packages       warm */}
      {/* 7  #surgeon: the shared DoctorCard; the live block's two paragraphs as one bio */}
      <DoctorCard
        id="surgeon"
        tone="surface"
        label={surgeon.role}
        name={surgeon.title}
        bio={surgeon.paragraphs.join(" ")}
        stats={[surgeon.experience]}
        credentials={surgeon.facts.map((f) => ({ ...f, icon: factIcons[f.label] }))}
        cta={surgeon.cta}
        image={{ src: portrait.src, alt: portrait.alt }}
      />
      {/* 8–12: shared sections (soft look), re-themed by the endometrial theme */}
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
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
