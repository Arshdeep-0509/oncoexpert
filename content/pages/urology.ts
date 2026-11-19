/**
 * Every word on /urology/ (Urology).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (oncoxpert.in/urology/, raw HTML fetched 19 Nov 2026 from
 *              the local copy oncoxpert.local). Render exactly, typos included.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text. The live page breaks headings and some
 * paragraphs with <br>; those breaks are layout, so each line is one string in `lines` (headings) or
 * a string array (paragraphs). Capitals are kept as the live markup has them ("CLINICAL DASHBOARD
 * V2.0"). Numbers and prices live here as numbers (prices: formatRupees). Shared copy is reused, not
 * repeated here: reviews, videos, locations and the final call band (content/shared/sections.ts). The
 * live "Need Clarity?" form is not rebuilt: every button opens the booking page. Images:
 * content/pages/urology.images.ts.
 *
 * Live order: #hero → #specialties → #technology → #organ-preservation → #leadership → #pricing
 * (hidden on every device on the live page) → #specialist → shared reviews, videos, locations.
 */
import type { PageMeta } from "@/content/types";
import type { UrologyImageKey } from "@/content/pages/urology.images";
import { urologyOgImage } from "@/content/pages/urology.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page with `service` preselected (and `note` in the email). */
type AppointmentCta = { label: string; service: AppointmentService; note?: string; cta?: string };

/** A figure that counts up: `value` is a plain number, `suffix` follows it ("%", "+", "h"). */
type Figure = { value: number; suffix: string; label: string };

/** Icon keys, mapped to icons in components/pages/urology (built in a later step). */
export type SpecialtyIcon = "kidney" | "prostate" | "bladder" | "testicular" | "penile" | "adrenal";
export type FeatureIcon = "recovery" | "precision";
export type PreservationIcon = "kidney" | "bladder";
export type PlanFeatureIcon =
  "efficacy" | "team" | "recovery" | "scarring" | "visualization" | "precision" | "cosmetic" | "discharge";
export type SpecialistBadgeIcon = "fellowship" | "diplomate";

/* ------------------------------------------------------------------ */
/* Figures (PENDING DOCTOR: each one, see the notes)                   */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING
// PENDING DOCTOR: "500+ SUCCESSFUL ROBOTIC CASES". content/pages/robotic-surgery.ts (SOURCE:
// DOCTOR) counts 229 robotic oncosurgeries in total, 12 of them kidney. Which is right, and does
// 500+ count urological cases only, or all robotic cases?
const roboticCases = 500;
// SOURCE: EXISTING
// PENDING DOCTOR: "40% faster return to daily activities": compared with what (open surgery?), and
// from which data?
const fasterReturn = 40;
// SOURCE: EXISTING
// PENDING DOCTOR: "15+ Years Exp" (and "over 15 years" in the same card). Thyroid and Ovarian say
// "over a decade", About Us "15+", Colorectal and Endometrial "15+". One figure for the site?
const yearsExperience = 15;

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The heading's three lines (<br> on the live page).
const heroLines = ["Advanced Uro-Oncology", "Care with Precision &", "Compassion"] as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING title (identical to the live page, keeps the SEO). The live page has no written
// description: its meta description is the SEO plugin's automatic excerpt ("For Appointment Tata
// Memorial Trained Specialist Advanced Uro-OncologyCare with Precision &Compassion …"), replaced by
// a NEW one. The live page has no <h1> (its headings are styled divs): `h1` is the hero heading,
// which becomes the page's one <h1>. The live canonical is the local address; the rebuilt one is
// the live domain.
// PENDING DOCTOR: approve the description; a better title, not used yet:
//   title: "Uro-Oncology: Kidney, Prostate & Bladder Cancer Surgery in Bangalore | OncoXpert"
export const meta = {
  title: "Urology - oncoxpert.in",
  // SOURCE: NEW (157 characters)
  description:
    "Uro-oncology in Bangalore at OncoXpert: robotic and keyhole surgery for kidney, prostate, bladder, testicular and penile cancers, with organ-preserving care.",
  h1: heroLines.join(" "),
  canonical: "https://oncoxpert.in/urology/",
  ogImage: urologyOgImage,
} as const satisfies PageMeta & { h1: string };

export const pageSlug = "urology";
// SOURCE: EXISTING (the live menu's label): breadcrumb and structured data name.
export const pageName = "Urology";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "Tata Memorial Trained Specialist",
  lines: heroLines,
  body: "Comprehensive diagnosis, robotic-assisted surgery, and personalized treatment pathways for kidney, prostate, and bladder cancers led by Dr. Sunil Navalgund.",
  // SOURCE: EXISTING (button labels); NEW (the service each one preselects, analytics labels)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation", cta: "urology:hero:book-consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion", cta: "urology:hero:second-opinion" },
  },
  // The live hero shows the doctor's cutout; the rebuilt hero adds a confident older man (NEW).
  image: "heroMan",
  portrait: "doctorCutout",
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  image: UrologyImageKey;
  portrait: UrologyImageKey;
};

/* ------------------------------------------------------------------ */
/* 2 · #specialties (6 cards with ICD-10 codes)                        */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (title, intro, badge, codes, card titles, text, "VIEW PROTOCOL"); NEW (icon keys).
// `code` is shown after `scheme` ("ICD-10 C64") in tabular figures; the last card has a `tag`
// ("RARE") instead. "aesthetic- functional" is kept as on the live page.
// PENDING DOCTOR: where should "VIEW PROTOCOL" lead? On the live page it is not a link. Options:
// the booking page with the cancer as the note, a section of this page, or a future page per cancer.
export const specialties = {
  title: "Oncological Specialties",
  intro:
    "Comprehensive surgical and medical management of urological malignancies with a focus on functional preservation.",
  badge: "CLINICAL DASHBOARD V2.0",
  scheme: "ICD-10",
  action: "VIEW PROTOCOL",
  items: [
    {
      key: "kidney",
      icon: "kidney",
      code: "C64",
      title: "Kidney Cancer",
      body: [
        "Specializing in Robotic Partial Nephrectomy (Organ Sparing) and Radical Nephrectomy for advanced RCC cases.",
      ],
    },
    {
      key: "prostate",
      icon: "prostate",
      code: "C61",
      title: "Prostate Cancer",
      body: [
        "Precision Robotic Prostatectomy focusing on",
        "early functional recovery, nerve sparing, and oncological clearance.",
      ],
    },
    {
      key: "bladder",
      icon: "bladder",
      code: "C67",
      title: "Bladder Cancer",
      body: ["Comprehensive care spanning TURBT to Robotic Radical Cystectomy with Intracorporeal Urinary Diversion."],
    },
    {
      key: "testicular",
      icon: "testicular",
      code: "C62",
      title: "Testicular Cancer",
      body: [
        "Multimodal approach including nerve-sparing Retroperitoneal Lymph Node Dissection (RPLND) for germ cell tumors.",
      ],
    },
    {
      key: "penile",
      icon: "penile",
      code: "C60",
      title: "Penile Cancer",
      body: [
        "Specialized surgical protocols aiming for maximum organ preservation and aesthetic- functional restoration.",
      ],
    },
    {
      key: "adrenal",
      icon: "adrenal",
      tag: "RARE",
      title: "Urethral & Adrenal",
      body: [
        "Expert management of adrenal masses and rare genitourinary tract tumors using advanced imaging and robotics.",
      ],
    },
  ],
} as const satisfies {
  title: string;
  intro: string;
  badge: string;
  scheme: string;
  action: string;
  items: readonly ({ key: string; icon: SpecialtyIcon; title: string; body: readonly string[] } & (
    { code: string } | { tag: string }
  ))[];
};

/* ------------------------------------------------------------------ */
/* 3 · #technology ("TECHNOLOGICAL EDGE")                              */
/* ------------------------------------------------------------------ */

export const technology = {
  // SOURCE: EXISTING. "Da Vinci®" as on the live page.
  eyebrow: "TECHNOLOGICAL EDGE",
  lines: ["Advanced Robotic & Keyhole", "Surgical Excellence"],
  body: "OncoXpert utilizes the latest Da Vinci® surgical platform to perform ultra-precise procedures that minimize trauma and accelerate healing. Our robotic-first approach is the gold standard for urological oncology.",
  // SOURCE: EXISTING (titles, text and its line breaks); NEW (icon keys). The 40% is `fasterReturn`.
  features: [
    {
      icon: "recovery",
      title: "Rapid Recovery",
      body: ["Patients typically experience", `${fasterReturn}% faster return to daily`, "activities."],
    },
    {
      icon: "precision",
      title: "High Precision",
      body: ["Nerve preservation rates are", "significantly higher than", "traditional surgery."],
    },
  ],
  // SOURCE: EXISTING (label). SOURCE: NEW (target: "#" on the live page; the robotic surgery page).
  link: { label: "Learn About Robotic Tech", href: "/robotic-surgery/", cta: "urology:technology:robotic" },
  // SOURCE: EXISTING
  stat: { value: roboticCases, suffix: "+", label: "SUCCESSFUL ROBOTIC CASES" },
  image: "theatre",
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  body: string;
  features: readonly { icon: FeatureIcon; title: string; body: readonly string[] }[];
  link: { label: string; href: string; cta: string };
  stat: Figure;
  image: UrologyImageKey;
};

/* ------------------------------------------------------------------ */
/* 4 · #organ-preservation ("Clinical Philosophy")                     */
/* ------------------------------------------------------------------ */

export const organPreservation = {
  // SOURCE: EXISTING (title, intro and its line break, card titles, text); NEW (icon keys)
  title: "Clinical Philosophy: Organ Preservation",
  intro: ["At OncoXpert, our primary goal is to cure cancer while preserving organ function and", "quality of life."],
  cards: [
    {
      icon: "kidney",
      title: "Partial Nephrectomy",
      body: [
        "Removing only the renal tumor while sparing the healthy kidney tissue. Essential for long-term renal",
        "health and avoiding dialysis risks.",
      ],
    },
    {
      icon: "bladder",
      title: "Bladder Sparing Protocols",
      body: [
        "Utilizing trimodal therapy (TMT) – surgery, chemotherapy, and radiation – to keep the natural bladder intact when oncologically viable.",
      ],
    },
  ],
} as const satisfies {
  title: string;
  intro: readonly string[];
  cards: readonly { icon: PreservationIcon; title: string; body: readonly string[] }[];
};

/* ------------------------------------------------------------------ */
/* 5 · #leadership ("Clinical Leadership & Infrastructure")            */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: every figure in this block: "92%" 5-year survival (which cancers, stages, years,
// how many patients?), "99.8%" surgical precision (what is measured?), "5k+ PATIENTS TREATED" (Home
// says 3,000+), "98% SATISFACTION SCORE" (which survey?), "24h CONSULT TURNAROUND" (from what to
// what?). Also "FELLOWSHIP TRAINED": which fellowship (see #specialist)?
export const leadership = {
  // SOURCE: EXISTING
  title: "Clinical Leadership & Infrastructure",
  cards: [
    {
      key: "mastery",
      title: "Robotic Mastery",
      body: `Dr. Sunil Navalgund brings over ${yearsExperience} years of surgical excellence, specializing in high-complexity robotic cases that demand elite precision and experienced decision-making.`,
      // SOURCE: EXISTING (the two chips under the text; the live chip reads "15+ Years Exp")
      stat: { value: yearsExperience, suffix: "+", label: "Years Exp" },
      badge: "FELLOWSHIP TRAINED",
    },
    {
      key: "tumor-board",
      title: "Integrated Tumor Board",
      body: "Every case is reviewed by a multi-disciplinary team of oncologists, radiologists, and surgeons.",
    },
  ],
  // SOURCE: EXISTING (the "Patient Outcome" panel: two figures)
  outcome: {
    title: "Patient Outcome",
    figures: [
      { value: 92, suffix: "%", label: "Survival Rate (5yr)" },
      { value: 99.8, suffix: "%", label: "Surgical Precision" },
    ],
  },
  // SOURCE: EXISTING. The live "5k+" is 5,000 shown compactly (`compact`: "5k+").
  tiles: [
    { value: 5000, suffix: "+", label: "PATIENTS TREATED", compact: true },
    { value: 98, suffix: "%", label: "SATISFACTION SCORE" },
    { value: 24, suffix: "h", label: "CONSULT TURNAROUND" },
  ],
  image: "consultation",
  // SOURCE: NEW (screen-reader labels for the figures table)
  a11y: { table: "Patient outcome figures", figure: "Figure", value: "Value" },
} as const satisfies {
  title: string;
  cards: readonly { key: string; title: string; body: string; stat?: Figure; badge?: string }[];
  outcome: { title: string; figures: readonly Figure[] };
  tiles: readonly (Figure & { compact?: boolean })[];
  image: UrologyImageKey;
  a11y: Record<"table" | "figure" | "value", string>;
};

/* ------------------------------------------------------------------ */
/* 6 · #pricing ("Transparent Pricing", 3 plans)                       */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The live section is in the markup but hidden on every device
// (elementor-hidden-desktop/-tablet/-mobile), as the thyroid and ovarian packages were. The live
// prices read "₹1.6L", "₹3.5L" and "₹5.0L" after "From" with a "+" after them; here they are rupee
// numbers (formatRupees shows "₹1,60,000"). The live buttons link to "#".
// PENDING DOCTOR: show the prices on the rebuilt page? Confirm the three starting prices
// (₹1,60,000 · ₹3,50,000 · ₹5,00,000), what each includes, and whether one plan is featured.
// Show them as lakhs ("₹1.6L") as on the live page, or in full?
export const pricing = {
  title: "Transparent Pricing",
  intro: "Honest, upfront estimates for world-class surgical care.",
  // SOURCE: EXISTING (tier, name, "From", price, "+", tagline, features, button labels); NEW (icon
  // keys, service + note each button sends with the form). "Minimal Surgical Scarring" has a <br>
  // after "Surgical" on the live page (layout).
  plans: [
    {
      key: "open",
      tier: "STANDARD CARE",
      name: "Open Surgery",
      lead: "From",
      price: 160000,
      prefix: "₹",
      suffix: "+",
      tagline: "Traditional clinical approach",
      features: [
        { icon: "efficacy", label: "Proven Clinical Efficacy" },
        { icon: "team", label: "Multi-specialist Team" },
        { icon: "recovery", label: "Standard Recovery Time" },
      ],
      cta: { label: "Select Plan", service: "Consultation For Surgery", note: "Plan: Open Surgery" },
    },
    {
      key: "laparoscopic",
      tier: "MODERN STANDARD",
      name: "Laparoscopic",
      lead: "From",
      price: 350000,
      prefix: "₹",
      suffix: "+",
      tagline: "Minimal Invasive Excellence",
      features: [
        { icon: "recovery", label: "Faster Recovery Window" },
        { icon: "scarring", label: "Minimal Surgical Scarring" },
        { icon: "visualization", label: "HD 3D Visualization" },
      ],
      cta: { label: "Consult Specialist", service: "Consultation For Surgery", note: "Plan: Laparoscopic" },
    },
    {
      key: "robotic",
      tier: "PREMIUM PRECISION",
      name: "Robotic Surgery",
      lead: "From",
      price: 500000,
      prefix: "₹",
      suffix: "+",
      tagline: "Advanced Robotic Assistance",
      features: [
        { icon: "precision", label: "Extreme Surgical Precision" },
        { icon: "cosmetic", label: "Best Cosmetic Outcomes" },
        { icon: "discharge", label: "Fastest Hospital Discharge" },
      ],
      cta: { label: "View Packages", service: "Consultation For Surgery", note: "Plan: Robotic Surgery" },
    },
  ],
} as const satisfies {
  title: string;
  intro: string;
  plans: readonly {
    key: string;
    tier: string;
    name: string;
    lead: string;
    price: number;
    prefix: string;
    suffix: string;
    tagline: string;
    features: readonly { icon: PlanFeatureIcon; label: string }[];
    cta: AppointmentCta;
  }[];
};

/* ------------------------------------------------------------------ */
/* 7 · #specialist ("PRINCIPAL SPECIALIST" + quote)                    */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: "A pioneer in robotic uro-oncology" and the two badges. content/shared/
// organization.ts lists "MCH Surgical Oncology, FIAGES", trained at Tata Memorial Hospital, Mumbai;
// About Us has a "Robotic & Minimal Access Fellowship", Thyroid "Robotic Oncology Fellow". Is there a
// US-trained "Fellowship: Robotic Surgery & Uro-Oncology", and is he a Diplomate of National Board
// (DNB)? Which international societies?
export const surgeon = {
  // SOURCE: EXISTING
  label: "PRINCIPAL SPECIALIST",
  name: "Dr. Sunil Navalgund",
  bio: "A pioneer in robotic uro-oncology, Dr. Sunil is dedicated to setting international benchmarks in cancer treatment. His work focuses on integrating surgical precision with empathetic patient-centered care models.",
  // SOURCE: EXISTING (labels); NEW (icon keys)
  badges: [
    { icon: "fellowship", label: "Fellowship: Robotic Surgery & Uro-Oncology (US Trained)" },
    { icon: "diplomate", label: "Diplomate of National Board & Fellow of International Societies" },
  ],
  // SOURCE: EXISTING (label; "#" on the live page); NEW (service, analytics label)
  cta: { label: "Book Your Appointment", service: "Consultation", cta: "urology:specialist:book" },
  // SOURCE: NEW (as on the other cancer pages)
  link: { label: "View Full Profile", href: "/about-us/" },
  // SOURCE: EXISTING. The quote, its straight quotation marks and its line break as on the live page.
  quote: ['"Precision at the core, empathy at the', 'helm."'],
  image: "doctor",
} as const satisfies {
  label: string;
  name: string;
  bio: string;
  badges: readonly { icon: SpecialistBadgeIcon; label: string }[];
  cta: AppointmentCta;
  link: { label: string; href: string };
  quote: readonly string[];
  image: UrologyImageKey;
};

/* ------------------------------------------------------------------ */
/* 8–11 · shared sections                                              */
/* (reviews, videos, locations, final band: content/shared/sections.ts, */
/*  in the live order; the live form is replaced by the booking page)  */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: the live page shows Vasudeva Murthy's review, which is about colon cancer
// surgery. Hidden on this page by default (as on the other cancer pages); set showColonReview to
// true to show it.
const showColonReview = false as boolean;

export const shared = {
  // SOURCE: NEW (order): the live order, without the colon cancer review unless the doctor wants it.
  reviewOrder: reviewsSection.order.filter((id) => showColonReview || id !== "vasudeva-murthy"),
  // The final call band's photo.
  finalImage: "finalMan",
} as const satisfies { reviewOrder: readonly ReviewId[]; finalImage: UrologyImageKey };
