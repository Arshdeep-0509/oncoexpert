/**
 * Every word on / (Home).
 *
 * SOURCE tags (see docs/PROJECT.md):
 *   EXISTING → copied from the live page (https://oncoxpert.in/, 22 Oct 2026). Render exactly.
 *   NEW      → labels or headings we added. Pending the doctor's approval.
 *   PENDING DOCTOR → something only the doctor can confirm.
 *
 * Never paraphrase, shorten or "improve" EXISTING text. The live page breaks some headings with
 * <br> (differently per breakpoint); those breaks are layout, not words, so each EXISTING line is
 * one string here. Numbers live here as numbers; components format them (e.g. 15 + "+" → "15+").
 * Images: content/pages/home.images.ts. Appointment, locations and the final call band are the
 * shared sections (content/shared/sections.ts), whose EXISTING copy matches the live homepage.
 */
import type { FaqItem, PageMeta, Stat } from "@/content/types";
import type { HomeImageKey } from "@/content/pages/home.images";
import { homeOgImage } from "@/content/pages/home.images";
import type { AppointmentService } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (identical to the live page, keeps the SEO)
export const meta = {
  title: "Cancer Hospital in Bangalore | OncoXpert",
  description:
    "OncoXpert - Cancer Hospital provides cancer treatment in Bangalore with surgical oncology, robotic surgery, personalized care and second-opinion consultations.",
  canonical: "https://oncoxpert.in/",
  ogImage: homeOgImage,
} as const satisfies PageMeta;

/** Page name used in the appointment email subject and the form's hidden "page" field. */
export const pageName = "Home";
export const pageSlug = "home";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

type AppointmentCta = { label: string; service: AppointmentService };
type LinkCta = { label: string; href: string };

type SpecialtyKey = "breast" | "colorectal" | "endometrial" | "lung" | "thyroid" | "ovarian";

export type HeroContent = {
  title: string;
  body: string;
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  /** The specialties listed in the hero, in this order (labels: `specialties.items`). */
  specialties: readonly SpecialtyKey[];
  a11y: { specialties: string };
};

export type SurgeonContent = {
  name: string;
  tagline: string;
  credentials: readonly string[];
  stats: readonly Stat[];
  training: { title: string; body: string; institutes: readonly string[] };
  image: HomeImageKey;
};

export type RoboticContent = {
  title: string;
  intro: string;
  features: readonly string[];
  cta: LinkCta;
  images: readonly HomeImageKey[];
};

export type SpecialtiesContent = {
  title: string;
  items: readonly { key: SpecialtyKey; name: string; body: string; href: string; image: HomeImageKey }[];
};

export type ServicesContent = {
  title: string;
  items: readonly { name: string; body: string }[];
};

export type ApproachContent = {
  /** Rendered as separate lines of the heading. */
  title: readonly string[];
  body: string;
  cta: AppointmentCta;
  pillars: readonly { title: string; body: string }[];
};

/** A value item; `range` renders before the title: { from: 30, to: 40, suffix: "%" } → "30–40% …". */
type ValueItem = { title: string; range?: { from: number; to: number; suffix: string } };

export type ValueContent = {
  title: string;
  items: readonly ValueItem[];
  cta: AppointmentCta;
};

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

export const hero = {
  // SOURCE: EXISTING
  title: "State-of-the-Art Cancer Care by Trusted & Experienced Oncologists",
  body: "Focused on achieving the best possible outcomes through advanced surgical oncology, robotic surgery, minimally invasive procedures, and personalized cancer care.",
  // SOURCE: EXISTING (button labels; both open the booking page on the live site)
  ctas: {
    primary: { label: "Book Appointment", service: "Consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion" },
  },
  // SOURCE: EXISTING (labels: the specialty names in `specialties` below)
  // PENDING DOCTOR: the order of the specialties listed in the hero. It follows the live page's
  // "Expertise Across All Cancer Specialties" grid until the doctor picks which to lead with.
  specialties: ["breast", "colorectal", "endometrial", "lung", "thyroid", "ovarian"],
  // SOURCE: NEW (screen-reader label)
  a11y: { specialties: "Cancer specialties we treat" },
} as const satisfies HeroContent;

/* ------------------------------------------------------------------ */
/* 2 · #surgeon                                                        */
/* ------------------------------------------------------------------ */

export const surgeon = {
  // SOURCE: EXISTING
  name: "Dr. Sunil Navalgund",
  tagline: "One of the most respected Surgical Oncologists in Bangalore.",
  // SOURCE: EXISTING (one line each, as on the live page)
  credentials: [
    "Senior Consultant at Sparsh Hospitals",
    "M.Ch Surgical Oncology from Tata Memorial Hospital - Asia's Best Cancer Hospital",
    "M.S. General Surgery | VIMS, Ballari",
    "Ex - Consultant Apollo Hospitals",
  ],
  // SOURCE: EXISTING (numbers and labels; the live page shows "15+", "3000+" …)
  stats: [
    { value: 15, suffix: "+", label: "YEARS EXPERIENCE" },
    { value: 3000, suffix: "+", label: "PATIENTS TREATED" },
    { value: 2000, suffix: "+", label: "CANCER SURGERIES" },
    { value: 1000, suffix: "+", label: "MINIMALLY INVASIVE" },
  ],
  // SOURCE: EXISTING (in the live page's markup but hidden there at every breakpoint:
  // desktop, tablet and mobile. Its stats repeat the ones above.)
  training: {
    title: "Trained at Apex Institutes",
    body: "Dr. Sunil Navalgund brings global expertise and precision to surgical oncology, having trained at India’s most prestigious medical centers.",
    institutes: ["MS General Surgery", "M.Ch Surgical Oncology", "Tata Memorial Hospital", "Apollo & Sparsh Hospitals"],
  },
  image: "doctor",
} as const satisfies SurgeonContent;

/* ------------------------------------------------------------------ */
/* 3 · #robotic                                                        */
/* ------------------------------------------------------------------ */

export const robotic = {
  // SOURCE: EXISTING
  title: "Transforming Surgical Outcomes with Robotic Surgery",
  intro: "Harnessing the power of the Da Vinci system for unmatched precision and patient recovery.",
  // SOURCE: EXISTING (the 8 features, in the live order)
  features: [
    "Unmatched Precision",
    "Excellent 3D Vision",
    "Superior Dexterity",
    "Minimal Blood Loss",
    "Less Pain",
    "Minimal Scars",
    "Faster Recovery",
    "Early Discharge",
  ],
  // SOURCE: EXISTING
  cta: { label: "Learn About Robotic Surgery", href: "/robotic-surgery/" },
  images: ["roboticSystem", "roboticArms", "roboticInstruments"],
} as const satisfies RoboticContent;

/* ------------------------------------------------------------------ */
/* 4 · #specialties                                                    */
/* ------------------------------------------------------------------ */

export const specialties = {
  // SOURCE: EXISTING
  title: "Expertise Across All Cancer Specialties",
  // SOURCE: EXISTING (names and one-liners, in the live order). Links: the site menu's pages
  // (content/site.ts). The live cards link Colorectal to /colon-page/ and Endometrial to
  // /endometrial-cancer-2/, which both return 404.
  items: [
    {
      key: "breast",
      name: "Breast Cancer",
      body: "Advanced diagnosis and personalized surgical treatment for benign and malignant breast conditions.",
      href: "/breast-cancer-treatment-bangalore/",
      image: "specialtyBreast",
    },
    {
      key: "colorectal",
      name: "Colorectal Cancer",
      body: "Comprehensive treatment for colon and colorectal cancers using minimally invasive and robotic surgery.",
      href: "/colon-cancer-treatment-bangalore/",
      image: "specialtyColorectal",
    },
    {
      key: "endometrial",
      name: "Endometrial Cancer",
      body: "Specialized care for uterine and endometrial cancers with evidence-based surgical treatment.",
      href: "/endometrial-cancer-treatment-bangalore/",
      image: "specialtyEndometrial",
    },
    {
      key: "lung",
      name: "Lung Cancer",
      body: "Expert surgical management of lung and thoracic cancers using advanced minimally invasive techniques.",
      href: "/lung-cancer-in-bangalore/",
      image: "specialtyLung",
    },
    {
      key: "thyroid",
      name: "Thyroid Cancer",
      body: "Expert thyroid cancer surgery with a focus on safety, precision, and faster recovery.",
      href: "/thyroid-cancer/",
      image: "specialtyThyroid",
    },
    {
      key: "ovarian",
      name: "Ovarian Cancer",
      body: "Comprehensive diagnosis and advanced surgical treatment for ovarian and gynecologic cancers.",
      href: "/ovarian-cancer-treatment/",
      image: "specialtyOvarian",
    },
  ],
} as const satisfies SpecialtiesContent;

/* ------------------------------------------------------------------ */
/* 5 · #services                                                       */
/* ------------------------------------------------------------------ */

export const services = {
  // SOURCE: EXISTING
  title: "Comprehensive Oncology Services",
  // SOURCE: EXISTING (names and one-liners, in the live order)
  items: [
    { name: "Surgical Oncology", body: "Expert tumor removals with focus on organ preservation." },
    { name: "Robotic Surgery", body: "Minimally invasive advanced robotic-assisted procedures." },
    { name: "Chemotherapy", body: "Personalized drug therapy protocols with precision dosing." },
    { name: "Radiation Therapy", body: "Targeted radiation for localized cancer control." },
    { name: "Immunotherapy", body: "Boosting the immune system to fight cancer cells." },
    { name: "Cancer Screening", body: "Early detection programs for at-risk populations." },
  ],
} as const satisfies ServicesContent;

/* ------------------------------------------------------------------ */
/* 6 · #approach                                                       */
/* ------------------------------------------------------------------ */

export const approach = {
  // SOURCE: EXISTING (one string per sentence)
  title: ["Fight Cancer with Clarity.", "Reclaim Life with Confidence."],
  body: "At OncoXpert, we combine advanced surgical expertise, ethical guidance, and personalized treatment plans to help every patient make informed decisions and achieve the best possible outcomes.",
  // SOURCE: EXISTING (button label; opens the booking page on the live site)
  cta: { label: "Book a Consultation", service: "Consultation" },
  // SOURCE: EXISTING (the 5 pillars, in the live order)
  pillars: [
    {
      title: "Best-in-Class Treatment Protocols",
      body: "Evidence-based cancer treatment aligned with global standards.",
    },
    {
      title: "Ethical & Clear Guidance",
      body: "Honest recommendations with complete transparency at every step.",
    },
    {
      title: "Holistic Healing & Quality of Life",
      body: "Comprehensive care focused on recovery, comfort, and long term well-being.",
    },
    {
      title: "Precision & Personalized Care",
      body: "Tailored treatment plans designed around each patient's unique condition.",
    },
    {
      title: "Cutting-Edge Surgical Technology",
      body: "Advanced minimally invasive and robotic surgical techniques for better outcomes.",
    },
  ],
} as const satisfies ApproachContent;

/* ------------------------------------------------------------------ */
/* 7 · #value                                                          */
/* ------------------------------------------------------------------ */

export const value = {
  // SOURCE: EXISTING
  title: "Where Excellence, Compassion, Trust & Affordability Come Together",
  // SOURCE: EXISTING (the 4 items, in the live order)
  items: [
    { title: "Affordable & Budget-Friendly Treatment" },
    // Renders "30–40% Cost Savings", as on the live page.
    // PENDING DOCTOR: confirm the 30–40% cost savings claim, and what it is compared with.
    { title: "Cost Savings", range: { from: 30, to: 40, suffix: "%" } },
    { title: "Transparent Pricing, No Hidden Charges" },
    { title: "Cashless Insurance Assistance" },
  ],
  // SOURCE: EXISTING (button label; opens the booking page on the live site)
  cta: { label: "Request a Treatment Estimate", service: "Consultation" },
} as const satisfies ValueContent;

/* ------------------------------------------------------------------ */
/* 8–13 · shared sections: this page's settings and headings           */
/* (reviews: content/shared/reviews.ts; videos: content/shared/videos.ts;
    appointment, locations, final band: content/shared/sections.ts)    */
/* ------------------------------------------------------------------ */

export const reviews = {
  // SOURCE: EXISTING (as displayed: the live markup is sentence case, capitalised by CSS; same
  // string as the breast page)
  title: "Every Patient Story Reflects Our Commitment To Clinical Excellence.",
  // The live page's order.
  order: [
    "muralidharan-chinnusamy",
    "veena-iyer",
    "shwetha-jayaraj",
    "padmavathi-p",
    "jayashree-ajith",
    "friendly-work",
    "narasimhamurthy-sm",
    "vasudeva-murthy",
    "mangala-music",
  ],
} as const satisfies { title: string; order: readonly ReviewId[] };

export const videos = {
  // SOURCE: NEW (the live page shows its videos without a heading)
  eyebrow: "Watch & learn",
  title: "Hear from our experts",
  // SOURCE: NEW (screen-reader labels)
  a11y: { play: "Play video", frame: "YouTube video", list: "Videos" },
} as const;

export type FaqEntry = FaqItem & { showLocations?: boolean };

export const faq = {
  // SOURCE: NEW (the live page lists the questions without a heading)
  title: "Questions patients often ask",
  // SOURCE: NEW (contact card after the questions)
  contactTitle: "Still have a question?",
  // SOURCE: EXISTING (questions and answers). The live page numbers the questions "1." to "5.":
  // those are list markers, not words of the question, so they are not part of the strings.
  // Icons: NEW.
  items: [
    {
      question: "Which is the best cancer hospital in Bangalore?",
      icon: "shield-check",
      answer: [
        "Choosing the right cancer hospital in Bangalore depends on your diagnosis, the specialist's experience, available treatment options and the facilities required for your care. OncoXpert helps patients explore surgical oncology services, minimally invasive cancer surgery and personalised treatment guidance based on their medical needs.",
      ],
    },
    {
      question: "Which cancer hospital in Bangalore specialises in cancer surgery?",
      icon: "stethoscope",
      answer: [
        "Patients looking for cancer surgery in Bangalore should consult a qualified surgical oncologist who can evaluate their diagnosis and determine whether surgery is appropriate. OncoXpert provides surgical oncology consultation and guidance on treatment options, including robotic and laparoscopic procedures where clinically suitable.",
      ],
    },
    {
      question: "Which cancer hospital in Bangalore offers robotic cancer surgery?",
      icon: "cpu",
      answer: [
        "Robotic cancer surgery may be suitable for selected patients depending on the cancer type, stage and clinical circumstances. Patients considering this approach should consult a qualified surgical oncologist to understand its potential benefits, limitations and suitability. Contact OncoXpert to enquire about consultation and available treatment facilities.",
      ],
    },
    {
      question: "Where can I get cancer treatment in Bangalore?",
      icon: "map-pin",
      answer: [
        "OncoXpert provides cancer care and surgical oncology consultation in Bangalore, helping patients understand their diagnosis and available treatment options. Patients can seek guidance for different types of cancer, surgical treatment, minimally invasive procedures and second opinions, based on their individual medical needs.",
      ],
      // NEW: the clinic list (content/site.ts) under the answer, as on the breast page.
      showLocations: true,
    },
    {
      question: "What types of cancer are treated at OncoXpert?",
      icon: "clipboard-list",
      // PENDING DOCTOR: this answer lists "head and neck cancers", which are not among the
      // specialties or the services on this page (nor in the menu). Keep, or remove them?
      answer: [
        "OncoXpert provides surgical oncology services for several types of cancer, including breast cancer, colorectal cancer, lung cancer, stomach cancer, ovarian cancer, thyroid cancer, and head and neck cancers. Treatment recommendations depend on the cancer type, stage, overall health and individual clinical assessment.",
      ],
    },
  ] satisfies FaqEntry[],
} as const;
