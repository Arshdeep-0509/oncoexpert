/**
 * Every word on /stomach-cancer/ (Stomach Cancer).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (oncoxpert.in/stomach-cancer/, raw HTML fetched 19 Nov 2026
 *              from the local copy oncoxpert.local). Render exactly, typos included
 *              ("Modalites", "pathology,genomics").
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text. The live page breaks headings and some
 * paragraphs with <br>; those breaks are layout, so each line is one string in `lines` (headings) or
 * a string array (paragraphs). Capitals are kept as the live markup has them ("EXPERT
 * GASTRO-ONCOLOGY"). Numbers live here as numbers. Shared copy is reused, not repeated here:
 * reviews, videos, locations and the final call band (content/shared/sections.ts). The live "Need
 * Clarity?" form is not rebuilt: every button opens the booking page. Images:
 * content/pages/stomach-cancer.images.ts.
 *
 * Live order: #hero → #understanding → #warning-signs → #treatments → #techniques → #surgeon →
 * shared reviews, videos, locations.
 */
import type { PageMeta } from "@/content/types";
import type { StomachImageKey } from "@/content/pages/stomach-cancer.images";
import { stomachOgImage } from "@/content/pages/stomach-cancer.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { reviewsSection } from "@/content/shared/sections";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

/** A button that opens the booking page with `service` preselected (and `note` in the email). */
type AppointmentCta = { label: string; service: AppointmentService; note?: string; cta?: string };

/** Icon keys, mapped to icons in components/pages/stomach-cancer (built in a later step). */
export type WarningIcon = "pain" | "weight" | "appetite" | "nausea";
export type TreatmentPointIcon =
  "nodes" | "survival" | "visualization" | "tremor" | "targeted" | "side-effects" | "genetics" | "response";
export type TechniquePointIcon = "wrist" | "magnification" | "recovery" | "scarring";
export type SurgeonBadgeIcon = "fellowship" | "team" | "evidence" | "compassion";

/* ------------------------------------------------------------------ */
/* Figures (PENDING DOCTOR: each one, see the notes)                   */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING
// PENDING DOCTOR: "5,000+ Surgeries Performed": all surgeries, or stomach cancer surgeries? Thyroid
// said "10,000+ Surgeries" (removed in the client review), Home "3,000+ patients".
const surgeriesPerformed = 5000;
// SOURCE: EXISTING
// PENDING DOCTOR: "Early / Diagnosis increases cure rate by 70%": compared with what, and which
// source? (A relative figure like this is hard to back up; a stage-wise survival figure may read
// more clearly.)
const cureRateIncrease = 70;

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING. The heading's four lines (<br> on the live page).
const heroLines = ["Advanced Stomach", "Cancer Treatment", "with Precision &", "Personalized Care"] as const;

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING title (identical to the live page, keeps the SEO). The live description is written
// (not the plugin's excerpt) but 145 characters: "Stomach cancer treatment in Bangalore at OncoXpert,
// with advanced surgery, minimally invasive procedures and personalized surgical oncology care."
// It is lengthened to 150–160 with the page's own words (as on the lung page). The live page has no
// <h1> (its headings are styled divs): `h1` is the hero heading, which becomes the page's one <h1>.
// The live canonical is the local address; the rebuilt one is the live domain.
export const meta = {
  title: "Stomach Cancer Treatment in Bangalore | OncoXpert",
  // SOURCE: NEW (lengthened to 150-160 characters: 153). PENDING DOCTOR: approve.
  description:
    "Stomach cancer treatment in Bangalore at OncoXpert, with robotic and laparoscopic gastrectomy, minimally invasive surgery and personalized oncology care.",
  h1: heroLines.join(" "),
  canonical: "https://oncoxpert.in/stomach-cancer/",
  ogImage: stomachOgImage,
} as const satisfies PageMeta & { h1: string };

export const pageSlug = "stomach-cancer";
// SOURCE: EXISTING (the live menu's label): breadcrumb and structured data name.
export const pageName = "Stomach Cancer";

/** Buttons that name no service (header, menu, action bar) preselect this one. */
// SOURCE: NEW (choice; the first of the live "Service Required" options)
export const defaultAppointmentService: AppointmentService = "Consultation";

export const hero = {
  // SOURCE: EXISTING
  eyebrow: "EXPERT GASTRO-ONCOLOGY",
  lines: heroLines,
  body: "Led by Dr. Sunil Navalgund, we specialize in robotic and laparoscopic gastrectomy, offering a minimally invasive path to recovery and healing.",
  // SOURCE: EXISTING (button labels; both link to the booking page on the live page); NEW (the
  // service each one preselects, analytics labels)
  ctas: {
    primary: { label: "Book Consultation", service: "Consultation", cta: "stomach:hero:book-consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion", cta: "stomach:hero:second-opinion" },
  },
  // SOURCE: EXISTING (the floating card: "5,000+ Surgeries Performed" over its note)
  card: {
    value: surgeriesPerformed,
    suffix: "+",
    label: "Surgeries Performed",
    note: "Global standards of care in Bangalore",
  },
  image: "heroMeal",
} as const satisfies {
  eyebrow: string;
  lines: readonly string[];
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  card: { value: number; suffix: string; label: string; note: string };
  image: StomachImageKey;
};

/* ------------------------------------------------------------------ */
/* 2 · #understanding ("Understanding Stomach (Gastric) Cancer")       */
/* ------------------------------------------------------------------ */

export const understanding = {
  // SOURCE: EXISTING. "pathology,genomics" (no space) as on the live page.
  lines: ["Understanding Stomach", "(Gastric) Cancer"],
  paragraphs: [
    "Stomach cancer begins when cells in the stomach lining grow out of control. It is often a silent disease in its early stages, making expert evaluation critical at the first sign of persistent symptoms.",
    "At OncoXpert, we believe that understanding the biology of the tumor is the first step toward a cure. Our approach integrates advanced pathology,genomics, and clinical expertise to map out a precise treatment trajectory for every patient.",
  ],
  // SOURCE: EXISTING (the two tiles: a large word over its line). The 70% is `cureRateIncrease`.
  tiles: [
    { key: "early", title: "Early", body: `Diagnosis increases cure rate by ${cureRateIncrease}%` },
    { key: "multi", title: "Multi", body: "Disciplinary team approach for every case" },
  ],
  image: "anatomy",
} as const satisfies {
  lines: readonly string[];
  paragraphs: readonly string[];
  tiles: readonly { key: string; title: string; body: string }[];
  image: StomachImageKey;
};

/* ------------------------------------------------------------------ */
/* 3 · #warning-signs (4 cards)                                        */
/* ------------------------------------------------------------------ */

export const warningSigns = {
  // SOURCE: EXISTING (title, intro, card titles, text); NEW (icon keys, photos)
  title: "Warning Signs Not to Ignore",
  intro: "Persistent digestive issues should always be evaluated by a specialist oncologist.",
  items: [
    {
      key: "pain",
      icon: "pain",
      title: "Persistent Pain",
      body: "Dull ache or sharp pain in the upper abdomen.",
      image: "symptomPain",
    },
    {
      key: "weight",
      icon: "weight",
      title: "Weight Loss",
      body: "Unexplained or rapid weight loss without dieting.",
      image: "symptomWeight",
    },
    {
      key: "appetite",
      icon: "appetite",
      title: "Appetite Loss",
      body: "Feeling full after eating only a small amount.",
      image: "symptomAppetite",
    },
    {
      key: "nausea",
      icon: "nausea",
      title: "Chronic Nausea",
      body: "Persistent nausea or vomiting after meals.",
      image: "symptomNausea",
    },
  ],
  // SOURCE: NEW (the live block has no button; label as on the thyroid symptoms)
  cta: { label: "Book Consultation", service: "Consultation", cta: "stomach:warning-signs:book-consultation" },
  a11y: { group: "Warning signs" },
} as const satisfies {
  title: string;
  intro: string;
  items: readonly { key: string; icon: WarningIcon; title: string; body: string; image: StomachImageKey }[];
  cta: AppointmentCta;
  a11y: { group: string };
};

/* ------------------------------------------------------------------ */
/* 4 · #treatments ("Comprehensive Treatment Modalites", 4 cards)      */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: where should "Explore All Procedures" lead? On the live page it links to "#".
// Options: the robotic surgery page, Home's services, or the booking page.
export const treatments = {
  // SOURCE: EXISTING. "Modalites" (sic) as on the live page.
  lines: ["Comprehensive Treatment", "Modalites"],
  intro: "We offer cutting-edge surgical and oncological protocols tailored to the stage and location of the tumor.",
  // SOURCE: EXISTING (label); NEW (target, until the doctor says)
  link: { label: "Explore All Procedures", href: "/robotic-surgery/", cta: "stomach:treatments:explore" },
  // SOURCE: EXISTING (tag, title, text and its line breaks, the two points); NEW (icon keys)
  items: [
    {
      key: "gastrectomy",
      tag: "SURGICAL",
      title: "D2 Gastrectomy",
      body: [
        "Removal of the tumor with",
        "extensive lymph node",
        "clearance, the gold standard for gastric cancer surgery.",
      ],
      points: [
        { icon: "nodes", label: "Superior nodal clearance" },
        { icon: "survival", label: "Improved survival rates" },
      ],
    },
    {
      key: "robotic",
      tag: "MINIMAL INVASIVE",
      title: "Robotic Surgery",
      body: ["da Vinci robotic-assisted gastrectomy for unmatched precision and faster functional recovery."],
      points: [
        { icon: "visualization", label: "3D HD visualization" },
        { icon: "tremor", label: "Tremor filtration" },
      ],
    },
    {
      key: "flot",
      tag: "SYSTEMIC",
      title: "FLOT Chemotherapy",
      body: ["Modern peri-operative chemotherapy protocol to shrink tumors and prevent recurrence."],
      points: [
        { icon: "targeted", label: "Targeted delivery" },
        { icon: "side-effects", label: "Side-effect management" },
      ],
    },
    {
      key: "immunotherapy",
      tag: "ADVANCED",
      title: "Immunotherapy",
      body: ["Harnessing the body’s immune system to fight advanced gastric cancers using PD-L1 inhibitors."],
      points: [
        { icon: "genetics", label: "Personalized genetics" },
        { icon: "response", label: "Longer-term response" },
      ],
    },
  ],
} as const satisfies {
  lines: readonly string[];
  intro: string;
  link: { label: string; href: string; cta: string };
  items: readonly {
    key: string;
    tag: string;
    title: string;
    body: readonly string[];
    points: readonly { icon: TreatmentPointIcon; label: string }[];
  }[];
};

/* ------------------------------------------------------------------ */
/* 5 · #techniques (Robotic Precision vs Laparoscopic Expertise)       */
/* ------------------------------------------------------------------ */

export const techniques = {
  // SOURCE: NEW (the live block has no heading; the section needs one for the outline, and the tab
  // labels and "vs" for the comparison on phones)
  title: "Robotic Precision vs Laparoscopic Expertise",
  labels: { vs: "vs", tabs: "Surgical technique" },
  // SOURCE: EXISTING (titles, text, points); NEW (keys, tab labels, icon keys, photos, the link)
  sides: [
    {
      key: "robotic",
      label: "Robotic",
      title: "Robotic Precision",
      body: "The pinnacle of surgical technology. Robotic instruments mimic the human wrist with 7 degrees of freedom, allowing for dissection in spaces too narrow for human hands.",
      points: [
        { icon: "wrist", title: "EndoWrist Technology", text: "Superior dexterity for complex suturing." },
        {
          icon: "magnification",
          title: "10x Magnification",
          text: "Crystal clear view of microscopic nerves and vessels.",
        },
      ],
      image: "robotic",
      link: { label: "Learn about robotic surgery", href: "/robotic-surgery/", cta: "stomach:techniques:robotic" },
    },
    {
      key: "laparoscopic",
      label: "Laparoscopic",
      title: "Laparoscopic Expertise",
      body: "Standard-of-care minimally invasive surgery. Uses specialized long instruments through tiny incisions to achieve radical cure with minimal trauma.",
      points: [
        { icon: "recovery", title: "Rapid Recovery", text: "Patients typically walk within 24 hours of surgery." },
        { icon: "scarring", title: "Minimal Scarring", text: "5-10mm incisions instead of a large abdominal cut." },
      ],
      image: "laparoscopy",
    },
  ],
} as const satisfies {
  title: string;
  labels: { vs: string; tabs: string };
  sides: readonly {
    key: string;
    label: string;
    title: string;
    body: string;
    points: readonly { icon: TechniquePointIcon; title: string; text: string }[];
    image: StomachImageKey;
    link?: { label: string; href: string; cta: string };
  }[];
};

/* ------------------------------------------------------------------ */
/* 6 · #surgeon ("Meet Dr. Sunil Navalgund", 4 badges)                 */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: "a pioneer in robotic-assisted stomach cancer surgeries in India": can this claim be
// backed up (first cases, year)? Also "International Fellowship trained": which fellowship (see
// content/shared/organization.ts)?
export const surgeon = {
  // SOURCE: EXISTING
  title: "Meet Dr. Sunil Navalgund",
  name: "Dr. Sunil Navalgund",
  role: "Surgical Oncologist & GI Cancer Specialist",
  bio: [
    "Dr. Sunil Navalgund is a pioneer in robotic-assisted stomach cancer surgeries in India. His patient-first philosophy ensures that clinical excellence is balanced with empathy and constant support throughout the",
    "cancer journey.",
  ],
  // SOURCE: EXISTING (labels; "International Fellowship <br> trained" on the live page); NEW (icons)
  badges: [
    { icon: "fellowship", label: "International Fellowship trained" },
    { icon: "team", label: "Multi-disciplinary approach" },
    { icon: "evidence", label: "Evidence-based protocols" },
    { icon: "compassion", label: "Compassionate care model" },
  ],
  // SOURCE: NEW (the live block has no buttons; labels as on the other cancer pages)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation", cta: "stomach:surgeon:book" },
  link: { label: "View Full Profile", href: "/about-us/" },
  image: "doctor",
} as const satisfies {
  title: string;
  name: string;
  role: string;
  bio: readonly string[];
  badges: readonly { icon: SurgeonBadgeIcon; label: string }[];
  cta: AppointmentCta;
  link: { label: string; href: string };
  image: StomachImageKey;
};

/* ------------------------------------------------------------------ */
/* 7–10 · shared sections                                              */
/* (reviews, videos, locations, final band: content/shared/sections.ts, */
/*  in the live order; the live form is replaced by the booking page)  */
/* ------------------------------------------------------------------ */

// PENDING DOCTOR: the live page shows Vasudeva Murthy's review, which is about colon cancer
// surgery. Hidden on this page by default (as on the other cancer pages); set showColonReview to
// true to show it. (A GI page could reasonably show it: the doctor's call.)
const showColonReview = false as boolean;

export const shared = {
  // SOURCE: NEW (order): the live order, without the colon cancer review unless the doctor wants it.
  reviewOrder: reviewsSection.order.filter((id) => showColonReview || id !== "vasudeva-murthy"),
  // The final call band's photo.
  finalImage: "finalMeal",
} as const satisfies { reviewOrder: readonly ReviewId[]; finalImage: StomachImageKey };
