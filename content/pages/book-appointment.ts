/**
 * /book-your-appoinment-page/ (Book Appointment): the site's one appointment form.
 *
 * Every appointment button on the site links here, with the service preselected and an optional
 * note in the URL (lib/booking.ts bookingHref). The page is the shared appointment section
 * ("GET IN TOUCH", "Need Clarity?", the phone and email cards, the form); its words are in
 * content/shared/sections.ts (appointmentSection). This file holds the page's metadata.
 *
 * The URL keeps the live spelling ("appoinment"): it is the indexed address and every "For
 * Appointment" button on the live site links to it (site.appointmentCta.href).
 * Images: content/pages/book-appointment.images.ts (the og.jpg).
 */
import type { PageMeta } from "@/content/types";
import { bookOgImage } from "@/content/pages/book-appointment.images";

// SOURCE: EXISTING (identical to the live page, keeps the SEO)
export const meta = {
  title: "Book Cancer Specialist Appointment in Bangalore | OncoXpert",
  description:
    "Book an appointment with Dr.Sunil Navalgund at OncoXpert, Bangalore,for expert cancer surgery consultation,second opinion & personalised,affordable cancer care.",
  canonical: "https://oncoxpert.in/book-your-appoinment-page/",
  ogImage: bookOgImage,
} as const satisfies PageMeta;

/** Page name used in the appointment email subject and the form's hidden "page" field. */
export const pageName = "Book Appointment";
export const pageSlug = "book-your-appoinment-page";
