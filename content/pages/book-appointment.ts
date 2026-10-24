/**
 * Every word on /book-your-appoinment-page/ (Book Appointment).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/book-your-appoinment-page/,
 *              24 Oct 2026). Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * The URL keeps the live spelling ("appoinment"): it is the indexed address and every "For
 * Appointment" button on the live site links to it (site.appointmentCta.href).
 * The live page breaks its heading with <br>; that break is layout, so the line is one string.
 * Shared copy is reused, not repeated here: the form (content/shared/sections.ts →
 * appointmentSection.form), reviews, videos, locations and the final call band
 * (content/shared/sections.ts), the phone number (content/site.ts).
 * Images: content/pages/book-appointment.images.ts.
 */
import type { PageMeta } from "@/content/types";
import type { BookImageKey } from "@/content/pages/book-appointment.images";
import { bookOgImage } from "@/content/pages/book-appointment.images";
import { site, type AppointmentService } from "@/content/site";

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

type TrustIcon = "award" | "building";

export type BookHeroContent = {
  eyebrow: string;
  title: string;
  /** Word of `title` set in the serif italic. */
  emphasis: string;
  body: string;
  /** The form itself is the shared one: appointmentSection.form (content/shared/sections.ts). */
  a11y: { form: string };
};

export type EmergencyContent = {
  label: string;
  /** "For urgent surgical reviews, call our priority hotline:" + the number, as one line. */
  lead: string;
  phone: { display: string; href: string };
};

export type TrustContent = {
  items: readonly { icon: TrustIcon; title: string; body: string }[];
  a11y: { list: string };
};

export type HowItWorksContent = {
  eyebrow: string;
  title: string;
  emphasis: string;
  steps: readonly { title: string; body: string }[];
  image: BookImageKey;
};

/* ------------------------------------------------------------------ */
/* #hero (form first)                                                  */
/* ------------------------------------------------------------------ */

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "EXPERT ONCOLOGY CARE",
  title: "Schedule Your Specialist Consultation",
  body: "Access world-class surgical oncology expertise. Our team provides precise diagnostics and compassionate surgical solutions tailored to your journey.",
  // SOURCE: NEW (style choice: the word set in the serif italic)
  emphasis: "Consultation",
  // SOURCE: NEW (screen-reader label)
  a11y: { form: "Book an appointment" },
} as const satisfies BookHeroContent;

/* ------------------------------------------------------------------ */
/* #emergency                                                          */
/* ------------------------------------------------------------------ */

export const emergency = {
  // SOURCE: EXISTING (the number is shown as on the live page, without +91; it dials the clinic)
  label: "EMERGENCY CONSULTATION",
  lead: "For urgent surgical reviews, call our priority hotline:",
  phone: { display: "8002 8002 95", href: site.contact.phoneHref },
} as const satisfies EmergencyContent;

/* ------------------------------------------------------------------ */
/* #trust                                                              */
/* ------------------------------------------------------------------ */

export const trust = {
  items: [
    // SOURCE: EXISTING
    // PENDING DOCTOR: "Over 25 years" here, "over a decade" / "10+" on the about page and "15+"
    // on Home. Which number is right?
    // PENDING DOCTOR: "Board Certified": confirm the wording (which board / certification).
    { icon: "award", title: "Board Certified Expertise", body: "Over 25 years of surgical oncology experience" },
    // SOURCE: EXISTING
    { icon: "building", title: "Hospital Affiliations", body: "Leading Medical Centers & Cancer Research Institutes" },
  ],
  // SOURCE: NEW (screen-reader label)
  a11y: { list: "Why book with us" },
} as const satisfies TrustContent;

/* ------------------------------------------------------------------ */
/* #how-it-works (not on the live page)                                */
/* ------------------------------------------------------------------ */

// SOURCE: NEW (the whole section). Built only from facts already on the site: the form's
// fields, the confirmation call (the form's success message) and the three clinics.
// PENDING DOCTOR: confirm the booking steps match how the clinic actually works.
export const howItWorks = {
  eyebrow: "How booking works",
  title: "Three steps to your consultation",
  emphasis: "consultation",
  steps: [
    { title: "Send the form", body: "Your name, a contact number, the service you need and a time that suits you." },
    { title: "We call to confirm", body: "Our team calls you back to confirm the date, time and clinic." },
    { title: "Meet the specialist", body: "Your consultation at one of our three clinics in Bengaluru." },
  ],
  image: "consultationDesk",
} as const satisfies HowItWorksContent;

/* ------------------------------------------------------------------ */
/* Shared sections (copy in content/shared/sections.ts)                */
/* ------------------------------------------------------------------ */

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";
