import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { defaultAppointmentService, hero, meta, pageSlug, shared, surgeon } from "@/content/pages/urology";
import { urologySeo } from "@/content/pages/urology.seo";
import { urologyImages } from "@/content/pages/urology.images";
import { reviewsFor } from "@/content/shared/reviews";
import { reviewsSection, videosSection } from "@/content/shared/sections";
import { cancerPageGraph } from "@/lib/jsonld";
import { keepLastWords } from "@/lib/format";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { Container } from "@/components/ui/Container";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { Reviews } from "@/components/shared/Reviews";
import { Videos } from "@/components/shared/Videos";
import { Locations } from "@/components/shared/Locations";
import { FinalCta } from "@/components/shared/FinalCta";
import { JsonLd } from "@/components/shared/JsonLd";
import { RelatedTreatments } from "@/components/shared/RelatedTreatments";

const page = pages[pageSlug];

// Live URL and SEO: content/pages/urology.ts → meta
export const metadata: Metadata = pageMetadata(page);

export function generateViewport(): Viewport {
  return pageViewport(page);
}

const finalImage = urologyImages[shared.finalImage];

// Header, footer and mobile action bar come from ./layout.tsx (SiteShell, urology theme).
// Sections stay inline (no <Suspense>): React would move them into hidden blocks after the footer,
// where crawlers that do not run JavaScript cannot read them.
// One @graph: MedicalWebPage, MedicalCondition, Physician, MedicalClinic, BreadcrumbList (+ FAQPage
// and Offers once written and approved): lib/jsonld.ts.
const graph = cancerPageGraph({
  meta,
  seo: urologySeo,
  breadcrumb: [
    { label: "Home", href: "/" },
    { label: urologySeo.name, href: new URL(meta.canonical).pathname },
  ],
  physicianDescription: surgeon.bio,
});

// Foundation: the hero is a placeholder (eyebrow, H1, lead, the two buttons); the page's own
// sections come next, in the live order listed in content/pages/urology.ts.
export default function UrologyPage() {
  return (
    <>
      <JsonLd graph={graph} />
      {/* 1 #hero (sage gradient) */}
      <section
        id="hero"
        aria-labelledby="hero-title"
        className="bg-(image:--grad-hero) pt-[calc(var(--header-h)+56px)] pb-(--section-y) md:pt-[calc(var(--header-h)+96px)]"
      >
        <Container>
          <p className="text-sm font-semibold tracking-[0.12em] text-accent uppercase">{hero.eyebrow}</p>
          <h1 id="hero-title" className="mt-4 max-w-4xl heading-1 text-ink">
            {hero.lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p data-speakable className="mt-6 measure text-lg text-muted">
            {hero.body}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <AppointmentButton {...hero.ctas.primary} arrow fullWidthOnMobile />
            <AppointmentButton {...hero.ctas.secondary} variant="secondary" fullWidthOnMobile />
          </div>
        </Container>
      </section>
      {/* Shared sections (soft look), re-themed by the urology theme */}
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
      <RelatedTreatments path={new URL(meta.canonical).pathname} page="urology" service={defaultAppointmentService} />
      <FinalCta image={{ src: finalImage.src, focal: finalImage.focal }} />
    </>
  );
}
