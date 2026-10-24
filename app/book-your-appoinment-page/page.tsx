import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { pageSlug } from "@/content/pages/book-appointment";
import { bookImages } from "@/content/pages/book-appointment.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { BookingHero } from "@/components/pages/book-appointment/BookingHero";
import { HowItWorks } from "@/components/pages/book-appointment/HowItWorks";
import { TrustSection } from "@/components/pages/book-appointment/TrustSection";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/book-appointment.ts → meta
export const metadata: Metadata = pageMetadata(page, "website");

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const finalImage = bookImages.consultationReport;

// Header and footer come from ./layout.tsx (SiteShell, care theme; no phone dock: the form is
// always close). One job: a worried patient books in under 30 seconds and feels reassured.
export default function BookAppointmentPage() {
  return (
    <>
      <BookingHero /> {/* 1  #hero (the form, #appointment) + #emergency   ivory gradient */}
      <HowItWorks /> {/* 2  #how-it-works   ice */}
      <TrustSection /> {/* 3  #trust          white */}
      {/* 4–7: shared sections (soft look), re-themed by the care theme */}
      <Reviews
        tone="alt"
        title={reviewsSection.title}
        reviews={reviewsFor(pageSlug, reviewsSection.order)}
        link={reviewsSection.link}
      />
      <Videos
        tone="surface"
        eyebrow={videosSection.eyebrow}
        title={videosSection.title}
        ids={videosSection.ids}
        labels={videosSection.a11y}
      />
      <Locations tone="warm" />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} /> {/* navy, photo */}
    </>
  );
}
