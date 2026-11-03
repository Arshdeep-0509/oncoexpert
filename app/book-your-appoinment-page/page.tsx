import type { Metadata, Viewport } from "next";
import { pages } from "@/content/pages";
import { meta, pageName, pageSlug } from "@/content/pages/book-appointment";
import { bookSeo } from "@/content/pages/book-appointment.seo";
import { bookingGraph } from "@/lib/jsonld";
import { pageMetadata, pageViewport } from "@/lib/seo";

import { AppointmentSection } from "@/components/shared/AppointmentSection";
import { JsonLd } from "@/components/shared/JsonLd";

// One @graph: WebPage, MedicalClinic with a ReserveAction (this form), BreadcrumbList.
const graph = bookingGraph(meta);

const page = pages[pageSlug];

// Live URL and SEO: content/pages/book-appointment.ts → meta
export const metadata: Metadata = pageMetadata(page, "website");

export function generateViewport(): Viewport {
  return pageViewport(page);
}

// Header and footer come from ./layout.tsx (SiteShell, care theme). The whole page is the
// appointment form: every appointment button on the site links here, with ?service= and ?note=
// preselecting the service and carrying the note (lib/booking.ts).
export default function BookAppointmentPage() {
  return (
    <>
      <JsonLd graph={graph} />
      <AppointmentSection
        page={pageName}
        definition={bookSeo.definition}
        tone="surface"
        heading="h1"
        className="pt-[calc(var(--header-h)+40px)] md:pt-[calc(var(--header-h)+64px)]"
      />
    </>
  );
}
