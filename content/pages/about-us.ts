/**
 * Every word on /about-us/ (About Us).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/about-us/, 24 Oct 2026). Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text: typos on the live page are kept (e.g.
 * "esophageal,stomach" without a space). The live page breaks some headings with <br>; those
 * breaks are layout, so each line is one string. Words the live page sets in blue are `emphasis`.
 * Shared copy is reused, not repeated here: the appointment block ("GET IN TOUCH" / "Need
 * Clarity?" and the form), reviews, videos, locations and the final call band
 * (content/shared/sections.ts). Images: content/pages/about-us.images.ts.
 */
import type { PageMeta, Stat } from "@/content/types";
import type { AboutImageKey } from "@/content/pages/about-us.images";
import { aboutOgImage } from "@/content/pages/about-us.images";
import type { AppointmentService } from "@/content/site";
import { bookingHref } from "@/lib/booking";

// SOURCE: EXISTING (the hero intro; also the meta description)
// PENDING DOCTOR: "over a decade" here and "10+" (experience), "Over 25 years" on the booking
// page, "15+" on Home. Which number is right?
const intro =
  "At OncoXpert, our philosophy revolves around precision medicine and compassionate care. Dr. Navalgund brings over a decade of specialized expertise from premier institutions like Tata Memorial, focusing on innovative techniques that prioritize both cancer eradication and patient quality of life.";

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

export const meta = {
  // SOURCE: EXISTING (the live title, kept for SEO)
  title: "About US - oncoxpert.in",
  // SOURCE: EXISTING (words: the intro paragraph, verbatim). The live description is
  // an automatic excerpt of the page that starts with the header button and runs words together
  // ("For Appointment Leading Surgical Oncologist Meet Dr. SunilNavalgund MCh …"), so the intro
  // the excerpt was trying to quote is used instead.
  // PENDING DOCTOR: the years mismatch (see intro).
  description: intro,
  canonical: "https://oncoxpert.in/about-us/",
  ogImage: aboutOgImage,
} as const satisfies PageMeta;

/** Page name used in the appointment email subject and the form's hidden "page" field. */
export const pageName = "About Us";
export const pageSlug = "about-us";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page's form with `service` preselected (`href`). */
type BookingCta = { label: string; service: AppointmentService; href: string };

/** Icon keys, mapped to lucide icons in components/pages/about-us (later sections: to be mapped). */
export type CredentialIcon = "graduation" | "hospital" | "robot";
type ExpertiseIcon = "breast" | "gi" | "uro" | "robotic";
type TrustPointIcon = "shield" | "globe" | "message";

export type AboutHeroContent = {
  eyebrow: string;
  title: string;
  /** Words of `title` set in the accent (none on the live page). */
  emphasis?: string;
  subtitle: string;
  body: string;
  ctas: { primary: BookingCta; secondary: BookingCta };
  /** The caption on the portrait card. */
  card: { name: string; role: string };
  /** The credential chips floating around the portrait. */
  chips: readonly string[];
  image: AboutImageKey;
  a11y: { chips: string; pause: string; play: string };
};

export type CredentialsContent = {
  /** "Dr. Sunil Navalgund · Surgical Oncologist & Founder" above the title. */
  byline: { name: string; role: string };
  title: string;
  items: readonly { icon: CredentialIcon; title: string; body: string }[];
};

export type JourneyContent = {
  title: string;
  emphasis: string;
  intro: string;
  stages: readonly { stage: string; title: string; body: string }[];
};

export type QuoteContent = { text: string; attribution: string };

export type ExpertiseContent = {
  title: string;
  intro: string;
  all: { label: string; href: string };
  cards: readonly { icon: ExpertiseIcon; title: string; body: string; link: { label: string; href: string } }[];
  image: AboutImageKey;
};

export type ExperienceContent = { stat: Stat; image: AboutImageKey };

export type WhyTrustContent = {
  title: string;
  emphasis: string;
  points: readonly { icon: TrustPointIcon; title: string; body: string }[];
};

/* ------------------------------------------------------------------ */
/* #hero                                                               */
/* ------------------------------------------------------------------ */

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "Leading Surgical Oncologist",
  title: "Meet Dr. Sunil Navalgund",
  subtitle: "MCh Surgical Oncology | Specialist in Robotic, Laparoscopic & Organ Preservation Surgery",
  body: intro,
  // SOURCE: EXISTING (labels). Both link to the booking page, as on the live site, now with the
  // matching service preselected in its form (?service=…).
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation", href: bookingHref("Consultation") },
    secondary: { label: "Get Second Opinion", service: "Second Opinion", href: bookingHref("Second Opinion") },
  },
  // SOURCE: EXISTING
  card: { name: "Dr. Sunil Navalgund", role: "Surgical Oncologist & Founder" },
  // SOURCE: EXISTING (words from this page: the credential "MCh Surgical Oncology", the intro's
  // "Tata Memorial", the credential "Robotic Specialist")
  chips: ["MCh Surgical Oncology", "Tata Memorial", "Robotic Specialist"],
  image: "doctor",
  // SOURCE: NEW (screen-reader labels)
  a11y: { chips: "Credentials", pause: "Pause animation", play: "Play animation" },
} as const satisfies AboutHeroContent;

/* ------------------------------------------------------------------ */
/* #credentials                                                        */
/* ------------------------------------------------------------------ */

export const credentials = {
  // SOURCE: EXISTING (the portrait card's caption, shown above the title)
  byline: hero.card,
  // SOURCE: EXISTING
  title: "Academic Excellence & Training",
  items: [
    {
      icon: "graduation",
      title: "MCh Surgical Oncology",
      body: "Super-specialization from a premier medical institution, mastering complex oncological procedures and surgical planning.",
    },
    {
      icon: "hospital",
      title: "Tata Memorial Center",
      body: "Rigorous clinical training at India’s foremost cancer institute, specializing in advanced surgical techniques and multi-disciplinary care.",
    },
    {
      icon: "robot",
      title: "Robotic Specialist",
      body: "Certified in Da Vinci Robotic Surgery, providing patients with minimally invasive options that offer faster recovery and superior precision.",
    },
  ],
} as const satisfies CredentialsContent;

/* ------------------------------------------------------------------ */
/* #journey                                                            */
/* ------------------------------------------------------------------ */

export const journey = {
  // SOURCE: EXISTING ("Excellence" is the word the live page sets in blue)
  title: "The Path to Excellence",
  emphasis: "Excellence",
  intro: "A legacy built on years of dedication, research, and thousands of successful procedures.",
  stages: [
    {
      stage: "FOUNDATION",
      title: "MS & Initial Clinical Training",
      body: "Establishing a strong foundation in general surgery with a focus on patient outcomes and surgical ethics.",
    },
    {
      stage: "SPECIALIZATION",
      title: "MCh at Premier Oncology Centers",
      body: "Intensive specialization in surgical oncology, rotating through various departments including Breast, GI, and Uro-Oncology.",
    },
    {
      stage: "INNOVATION",
      title: "Robotic & Minimal Access Fellowship",
      body: "Adopting the latest technological advancements in cancer care to minimize morbidity and enhance recovery times.",
    },
    {
      stage: "FOUNDING",
      title: "Inception of OncoXpert",
      body: "Creating a center of excellence where advanced science meets compassionate, individualized patient journeys.",
    },
  ],
} as const satisfies JourneyContent;

/* ------------------------------------------------------------------ */
/* #quote                                                              */
/* ------------------------------------------------------------------ */

export const quote = {
  // SOURCE: EXISTING (the curly quotes and the ellipsis are the live page's own characters)
  text: "“Treating Patients, Not Just Cancer… every patient deserves personalized care that combines advanced medical science with compassion.”",
  attribution: "DR. SUNIL NAVALGUND",
} as const satisfies QuoteContent;

/* ------------------------------------------------------------------ */
/* #expertise                                                          */
/* ------------------------------------------------------------------ */

export const expertise = {
  // SOURCE: EXISTING
  title: "Surgical Expertise",
  intro: "Comprehensive oncology services powered by advanced surgical science.",
  // SOURCE: EXISTING (label). SOURCE: NEW (target: on the live page it is not a link; this is the
  // menu's "Our Services" page).
  all: { label: "View All Services", href: "/our-services/" },
  // SOURCE: EXISTING (titles, text, "Learn more"). SOURCE: NEW (targets: on the live page the
  // "Learn more" labels are not links). Breast and Robotic point to their rebuilt pages.
  // PENDING DOCTOR: GI Oncology and Uro-Oncology have no rebuilt page yet; they point to the live
  // menu's Colorectal Cancer and Urology pages. Confirm (or name the pages they should open).
  cards: [
    {
      icon: "breast",
      title: "Breast Cancer",
      body: "Specializing in breast conserving surgeries and sentinel lymph node biopsies.",
      link: { label: "Learn more", href: "/breast-cancer-treatment-bangalore/" },
    },
    {
      icon: "gi",
      title: "GI Oncology",
      body: "Expertise in esophageal,stomach, and colorectal cancer resections.",
      link: { label: "Learn more", href: "/colon-cancer-treatment-bangalore/" },
    },
    {
      icon: "uro",
      title: "Uro-Oncology",
      body: "Advanced management of prostate, bladder, and kidney malignancies.",
      link: { label: "Learn more", href: "/urology/" },
    },
    {
      icon: "robotic",
      title: "Robotic Surgery",
      body: "Minimally invasive approach for complex abdominal and pelvic cancers.",
      link: { label: "Learn more", href: "/robotic-surgery/" },
    },
  ],
  // The Robotic Surgery card's photo (own photo, reused from the robotic page).
  image: "roboticArms",
} as const satisfies ExpertiseContent;

/* ------------------------------------------------------------------ */
/* #experience                                                         */
/* ------------------------------------------------------------------ */

export const experience = {
  // SOURCE: EXISTING (shown as "10+")
  // PENDING DOCTOR: the years mismatch (see intro).
  stat: { value: 10, suffix: "+", label: "Years of Specialized Oncological Experience" },
  image: "doctor",
} as const satisfies ExperienceContent;

/* ------------------------------------------------------------------ */
/* #why-trust                                                          */
/* ------------------------------------------------------------------ */

export const whyTrust = {
  // SOURCE: EXISTING ("Dr. Sunil Navalgund" is the line the live page sets in blue)
  title: "Why Patients Trust Dr. Sunil Navalgund",
  emphasis: "Dr. Sunil Navalgund",
  points: [
    {
      icon: "shield",
      title: "Organ Preservation",
      body: "Prioritizing surgical techniques that preserve organ function and physical appearance without compromising cancer control.",
    },
    {
      icon: "globe",
      title: "International Standards",
      body: "Practicing evidence-based medicine following global protocols established by NCCN and ESMO guidelines.",
    },
    {
      icon: "message",
      title: "Transparent Communication",
      body: "A commitment to clear, empathetic dialogue, ensuring patients and families understand every step of the journey.",
    },
  ],
} as const satisfies WhyTrustContent;

/* ------------------------------------------------------------------ */
/* Shared sections (copy in content/shared/sections.ts)                */
/* ------------------------------------------------------------------ */

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";
