/**
 * Every word on /book-your-appoinment-page/ (Book Appointment).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/book-your-appoinment-page/,
 *              24 Oct 2026), or from another live page where noted. Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * The URL keeps the live spelling ("appoinment"): it is the indexed address and every "For
 * Appointment" button on the live site links to it (site.appointmentCta.href).
 * The live page breaks its heading with <br>; that break is layout, so the line is one string.
 * Shared copy is reused, not repeated here: the form's labels and messages
 * (content/shared/sections.ts → appointmentSection.form), reviews, videos, locations and the
 * final call band (content/shared/sections.ts), the phone and WhatsApp links (content/site.ts),
 * Home's statistics and credentials (content/pages/home.ts → surgeon), the portrait caption
 * (content/pages/about-us.ts → hero.card). Images: content/pages/book-appointment.images.ts.
 */
import type { PageMeta, Stat } from "@/content/types";
import type { BookImageKey } from "@/content/pages/book-appointment.images";
import { bookOgImage } from "@/content/pages/book-appointment.images";
import { hero as aboutHero } from "@/content/pages/about-us";
import { surgeon } from "@/content/pages/home";
import { site, type AppointmentService } from "@/content/site";
import { averageRating, googleReviews } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";

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

/** Icon keys, mapped to lucide icons in components/pages/book-appointment/icons.ts. */
export type ReassuranceIcon = "clock" | "award" | "building";
export type ServiceIcon = "stethoscope" | "second-opinion" | "surgery" | "follow-up";

export type BookHeroContent = {
  eyebrow: string;
  title: string;
  /** Word of `title` set in the serif italic. */
  emphasis: string;
  body: string;
  /** The three rows under the body, in order. */
  reassurance: readonly { icon: ReassuranceIcon; title: string; body: string }[];
  /** The small portrait with his name. */
  doctor: { name: string; role: string; image: BookImageKey };
  a11y: { reassurance: string; pause: string; play: string };
};

/** The guided form. Field labels and messages are the shared ones (appointmentSection.form). */
export type BookingFormContent = {
  steps: readonly [{ title: string }, { title: string; hint: string }, { title: string }];
  /** One icon per "Service Required" option, by option. */
  serviceIcons: Record<AppointmentService, ServiceIcon>;
  progress: (step: number, total: number) => string;
  next: string;
  back: string;
  success: { call: string; whatsapp: string };
  a11y: { form: string; steps: string; newTab: string };
};

export type EmergencyContent = {
  label: string;
  /** "For urgent surgical reviews, call our priority hotline:" + the number, as one line. */
  lead: string;
  phone: { display: string; href: string };
  button: string;
};

export type HowItWorksContent = {
  eyebrow: string;
  title: string;
  emphasis: string;
  steps: readonly { title: string; body: string }[];
  image: BookImageKey;
};

export type TrustContent = {
  eyebrow: string;
  title: string;
  emphasis: string;
  stats: readonly Stat[];
  rating: { value: number; label: string };
  credentials: { title: string; items: readonly string[] };
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
  reassurance: [
    // SOURCE: NEW
    // PENDING DOCTOR: confirm the promise (and the clinic's working hours, if they should be named).
    {
      icon: "clock",
      title: "Response within working hours",
      body: "Our team calls you back to confirm your appointment.",
    },
    // SOURCE: EXISTING
    // PENDING DOCTOR: "Over 25 years" here, "over a decade" / "10+" on the about page and "15+"
    // on Home. Which number is right?
    // PENDING DOCTOR: "Board Certified": confirm the wording (which board / certification).
    { icon: "award", title: "Board Certified Expertise", body: "Over 25 years of surgical oncology experience" },
    // SOURCE: EXISTING
    { icon: "building", title: "Hospital Affiliations", body: "Leading Medical Centers & Cancer Research Institutes" },
  ],
  // SOURCE: EXISTING (the about page's portrait caption)
  doctor: { name: aboutHero.card.name, role: aboutHero.card.role, image: "doctor" },
  // SOURCE: NEW (screen-reader labels)
  a11y: { reassurance: "Why book with us", pause: "Pause animation", play: "Play animation" },
} as const satisfies BookHeroContent;

export const bookingForm = {
  // SOURCE: NEW (step titles; the fields keep their EXISTING labels)
  steps: [{ title: "Which service?" }, { title: "When?", hint: "Optional" }, { title: "Your details" }],
  // SOURCE: NEW (icon choice)
  serviceIcons: {
    Consultation: "stethoscope",
    "Second Opinion": "second-opinion",
    "Consultation For Surgery": "surgery",
    "Follow Up": "follow-up",
  },
  // SOURCE: NEW
  progress: (step: number, total: number) => `Step ${step} of ${total}`,
  next: "Continue",
  back: "Back",
  // SOURCE: NEW (the confirmation text itself is the shared appointmentSection.form.success)
  success: { call: "Call now", whatsapp: "WhatsApp us" },
  // SOURCE: NEW (screen-reader labels)
  a11y: { form: "Book an appointment", steps: "Booking progress", newTab: site.a11y.newTab },
} as const satisfies BookingFormContent;

/* ------------------------------------------------------------------ */
/* #emergency                                                          */
/* ------------------------------------------------------------------ */

export const emergency = {
  // SOURCE: EXISTING (the number is shown as on the live page, without +91; it dials the clinic)
  label: "EMERGENCY CONSULTATION",
  lead: "For urgent surgical reviews, call our priority hotline:",
  phone: { display: "8002 8002 95", href: site.contact.phoneHref },
  // SOURCE: NEW (button label; the number is EXISTING)
  button: "Call 8002 8002 95",
} as const satisfies EmergencyContent;

/* ------------------------------------------------------------------ */
/* #how-it-works (not on the live page)                                */
/* ------------------------------------------------------------------ */

// SOURCE: NEW (the whole section). Built only from facts already on the site: the form's
// fields, the confirmation call (the form's success message) and the clinics.
// PENDING DOCTOR: confirm the booking steps match how the clinic actually works.
export const howItWorks = {
  eyebrow: "How booking works",
  title: "Three steps to your consultation",
  emphasis: "consultation",
  steps: [
    { title: "Book", body: "Your name, a contact number, the service you need and a time that suits you." },
    { title: "We call to confirm", body: "Our team calls you back to confirm the date, time and clinic." },
    {
      title: "Consult the specialist",
      body: `Your consultation at one of our ${site.locations.length} clinics in Bengaluru.`,
    },
  ],
  image: "consultationDesk",
} as const satisfies HowItWorksContent;

/* ------------------------------------------------------------------ */
/* #trust: EXISTING facts only                                         */
/* ------------------------------------------------------------------ */

// Home's statistics minus "YEARS EXPERIENCE" (the years are PENDING DOCTOR: 15+ / 10+ / 25).
const trustStats = surgeon.stats.filter((stat) => stat.label !== "YEARS EXPERIENCE");
const shownReviews = googleReviews.filter((review) => reviewsSection.order.includes(review.id));

export const trust = {
  // SOURCE: NEW (headings)
  eyebrow: "In numbers",
  title: "Experience behind every consultation",
  emphasis: "consultation",
  // SOURCE: EXISTING (the live homepage's numbers and labels: content/pages/home.ts)
  stats: trustStats,
  // The average of the Google reviews shown on this page (computed). SOURCE: NEW (labels)
  rating: {
    value: averageRating(shownReviews),
    label: `Google rating · ${shownReviews.length} reviews`,
  },
  // SOURCE: EXISTING (the live homepage's credentials). SOURCE: NEW (title)
  credentials: { title: "Credentials", items: surgeon.credentials },
} as const satisfies TrustContent;
