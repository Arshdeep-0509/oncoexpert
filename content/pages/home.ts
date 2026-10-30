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
import { site, type AppointmentService } from "@/content/site";
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

export const pageSlug = "home";

/* ------------------------------------------------------------------ */
/* Section content types                                               */
/* ------------------------------------------------------------------ */

type AppointmentCta = { label: string; service: AppointmentService };
type LinkCta = { label: string; href: string };

export type SpecialtyKey = "breast" | "colorectal" | "endometrial" | "lung" | "thyroid" | "ovarian";

export type HeroContent = {
  eyebrow: string;
  title: string;
  /** Words of `title` set in the accent gradient; the last one gets the drawn underline. */
  emphasis: string;
  body: string;
  /** "Expert care for ___ cancer": the blank cycles through `specialties` (heroTicker below). */
  ticker: { lead: string; tail: string; and: string };
  /** The specialties the ticker cycles through, in this order (names: `specialties.items`). */
  specialties: readonly SpecialtyKey[];
  ctas: { primary: AppointmentCta; secondary: AppointmentCta };
  /** "Or call" + the clinic phone number (content/site.ts). */
  phone: { lead: string };
  /** The trust strip along the bottom edge. */
  trust: readonly string[];
  a11y: { trust: string; pause: string; play: string; scroll: string };
};

export type SurgeonContent = {
  /** Section heading; `emphasis` is set in the serif italic. */
  heading: { title: string; emphasis: string };
  name: string;
  tagline: string;
  credentials: readonly string[];
  stats: readonly Stat[];
  training: { title: string; body: string; institutes: readonly string[] };
  /** The training journey timeline, in order. */
  journey: { label: string; stops: readonly { role: string; place: string; note?: string }[] };
  cta: AppointmentCta;
  image: HomeImageKey;
  a11y: { stats: string };
};

/** Icon keys for the robotic features (mapped to lucide icons in components/pages/home). */
export type RoboticFeatureIcon =
  "crosshair" | "eye" | "hand" | "droplet-off" | "smile" | "sparkles" | "timer" | "house";

export type RoboticContent = {
  title: string;
  intro: string;
  features: readonly { label: string; icon: RoboticFeatureIcon }[];
  cta: LinkCta;
  image: HomeImageKey;
  a11y: { features: string };
};

export type SpecialtiesContent = {
  title: string;
  /** Words of `title` set in the serif italic. */
  emphasis: string;
  items: readonly { key: SpecialtyKey; name: string; body: string; href: string; image: HomeImageKey }[];
  a11y: { list: string };
};

/** Icon keys for the services (mapped to lucide icons in components/pages/home). */
export type ServiceIcon = "scalpel" | "robot" | "syringe" | "radiation" | "immune" | "screening";

/** A service card either links to a page or opens the appointment form, preset. */
type ServiceAction =
  | { kind: "link"; label: string; href: string }
  | { kind: "appointment"; label: string; service: AppointmentService; note: string };

export type ServicesContent = {
  title: string;
  emphasis: string;
  items: readonly { name: string; body: string; icon: ServiceIcon; action: ServiceAction }[];
};

/** Icon keys for the approach pillars. */
export type ApproachIcon = "award" | "scale" | "heart-handshake" | "target" | "cpu";

export type ApproachContent = {
  /** Rendered as separate lines of the heading; `emphasis` (in the last line) in the serif italic. */
  title: readonly string[];
  emphasis: string;
  body: string;
  cta: AppointmentCta;
  pillars: readonly { title: string; body: string; icon: ApproachIcon }[];
};

/** Icon keys for the value cards. */
export type ValueIcon = "wallet" | "receipt" | "shield-check";

/** A value item; `range` renders before the title: { from: 30, to: 40, suffix: "%" } → "30–40% …". */
type ValueItem = { title: string; icon?: ValueIcon; range?: { from: number; to: number; suffix: string } };

export type ValueContent = {
  title: string;
  emphasis: string;
  items: readonly ValueItem[];
  /** Opens the appointment form with `note` stored on the request. */
  cta: AppointmentCta & { note: string };
};

/* ------------------------------------------------------------------ */
/* 1 · #hero                                                           */
/* ------------------------------------------------------------------ */

export const hero = {
  // SOURCE: NEW
  eyebrow: "Surgical Oncology · Bengaluru",
  // SOURCE: EXISTING
  title: "State-of-the-Art Cancer Care by Trusted & Experienced Oncologists",
  // NEW (presentation only): these words of the title get the gradient
  emphasis: "Trusted & Experienced",
  // SOURCE: EXISTING
  body: "Focused on achieving the best possible outcomes through advanced surgical oncology, robotic surgery, minimally invasive procedures, and personalized cancer care.",
  // SOURCE: NEW (the words around the cycling specialty name)
  ticker: { lead: "Expert care for", tail: "cancer", and: "and" },
  // SOURCE: EXISTING (names: the specialties below, without "Cancer")
  // PENDING DOCTOR: the order of the specialties in the hero ticker (and which to lead with).
  specialties: ["breast", "colorectal", "lung", "thyroid", "ovarian", "endometrial"],
  // SOURCE: EXISTING (button labels; both open the booking page on the live site)
  ctas: {
    primary: { label: "Book Appointment", service: "Consultation" },
    secondary: { label: "Get Second Opinion", service: "Second Opinion" },
  },
  // SOURCE: NEW
  phone: { lead: "Or call" },
  // SOURCE: NEW (wording); every fact is EXISTING: M.Ch at Tata Memorial Hospital, former
  // consultant at Apollo Hospitals, senior consultant at Sparsh Hospitals, the Da Vinci system,
  // and the clinic count (computed from the clinic list in content/site.ts).
  trust: [
    "Trained at Tata Memorial Hospital",
    "Former Consultant, Apollo Hospitals",
    "Senior Consultant, Sparsh Hospitals",
    "Da Vinci Robotic Surgery",
    `${site.locations.length} clinics across Bengaluru`,
  ],
  // SOURCE: NEW (screen-reader / control labels)
  a11y: {
    trust: "Credentials",
    pause: "Pause animation",
    play: "Play animation",
    scroll: "Scroll to the next section",
  },
} as const satisfies HeroContent;

/* ------------------------------------------------------------------ */
/* 2 · #surgeon                                                        */
/* ------------------------------------------------------------------ */

export const surgeon = {
  // SOURCE: NEW (the name is EXISTING; non-breaking spaces keep the name on one line)
  heading: { title: "Meet Dr. Sunil Navalgund", emphasis: "Dr. Sunil Navalgund" },
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
  // SOURCE: DOCTOR (the client's review, 30 Oct 2026: this order and these roles and places, the
  // current post first). The label and the note are as before (NEW / EXISTING).
  journey: {
    label: "Training journey",
    stops: [
      { role: "Senior Consultant", place: "Apollo Hospital, OncoXpert and Sparsh Hospital" },
      { role: "M.Ch Surgical Oncology", place: "Tata Memorial Hospital", note: "Asia's Best Cancer Hospital" },
      { role: "M.S. General Surgery", place: "VIMS, Ballari" },
    ],
  },
  // SOURCE: EXISTING (button label from the robotic page)
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  image: "doctor",
  // SOURCE: NEW (screen-reader label)
  a11y: { stats: "Dr. Sunil Navalgund in numbers" },
} as const satisfies SurgeonContent;

/* ------------------------------------------------------------------ */
/* 3 · #robotic                                                        */
/* ------------------------------------------------------------------ */

export const robotic = {
  // SOURCE: EXISTING
  title: "Transforming Surgical Outcomes with Robotic Surgery",
  intro: "Harnessing the power of the Da Vinci system for unmatched precision and patient recovery.",
  // SOURCE: EXISTING (the 8 features, in the live order); icons NEW
  features: [
    { label: "Unmatched Precision", icon: "crosshair" },
    { label: "Excellent 3D Vision", icon: "eye" },
    { label: "Superior Dexterity", icon: "hand" },
    { label: "Minimal Blood Loss", icon: "droplet-off" },
    { label: "Less Pain", icon: "smile" },
    { label: "Minimal Scars", icon: "sparkles" },
    { label: "Faster Recovery", icon: "timer" },
    { label: "Early Discharge", icon: "house" },
  ],
  // SOURCE: EXISTING
  cta: { label: "Learn About Robotic Surgery", href: "/robotic-surgery/" },
  image: "roboticArms",
  // SOURCE: NEW (screen-reader label)
  a11y: { features: "Benefits of robotic surgery" },
} as const satisfies RoboticContent;

/* ------------------------------------------------------------------ */
/* 4 · #specialties                                                    */
/* ------------------------------------------------------------------ */

export const specialties = {
  // SOURCE: EXISTING
  title: "Expertise Across All Cancer Specialties",
  // NEW (presentation only): set in the serif italic
  emphasis: "Cancer Specialties",
  // SOURCE: NEW (screen-reader label of the phone swipe row)
  a11y: { list: "Cancer specialties" },
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

/** Hero ticker: the specialty names above without "Cancer", in hero.specialties order. */
const tickerWords = hero.specialties.map((key) =>
  specialties.items.find((item) => item.key === key)!.name.replace(/ Cancer$/, ""),
);
export const heroTicker = {
  words: tickerWords,
  /** The whole list in one sentence, for screen readers (the visible ticker is aria-hidden). */
  sentence: `${hero.ticker.lead} ${tickerWords.slice(0, -1).join(", ")} ${hero.ticker.and} ${tickerWords.at(-1)} ${hero.ticker.tail}.`,
} as const;

/* ------------------------------------------------------------------ */
/* 5 · #services                                                       */
/* ------------------------------------------------------------------ */

export const services = {
  // SOURCE: EXISTING
  title: "Comprehensive Oncology Services",
  // NEW (presentation only): set in the serif italic
  emphasis: "Oncology Services",
  // SOURCE: EXISTING (names and one-liners, in the live order; action labels are the live site's
  // "Learn About Robotic Surgery" and "Book a Consultation" buttons). Icons and actions NEW: the
  // two surgical services link to the robotic page, the others open the form ("Consultation")
  // with the service's name stored as the note.
  items: [
    {
      name: "Surgical Oncology",
      body: "Expert tumor removals with focus on organ preservation.",
      icon: "scalpel",
      action: { kind: "link", label: "Learn About Robotic Surgery", href: "/robotic-surgery/" },
    },
    {
      name: "Robotic Surgery",
      body: "Minimally invasive advanced robotic-assisted procedures.",
      icon: "robot",
      action: { kind: "link", label: "Learn About Robotic Surgery", href: "/robotic-surgery/" },
    },
    {
      name: "Chemotherapy",
      body: "Personalized drug therapy protocols with precision dosing.",
      icon: "syringe",
      action: { kind: "appointment", label: "Book a Consultation", service: "Consultation", note: "Chemotherapy" },
    },
    {
      name: "Radiation Therapy",
      body: "Targeted radiation for localized cancer control.",
      icon: "radiation",
      action: { kind: "appointment", label: "Book a Consultation", service: "Consultation", note: "Radiation Therapy" },
    },
    {
      name: "Immunotherapy",
      body: "Boosting the immune system to fight cancer cells.",
      icon: "immune",
      action: { kind: "appointment", label: "Book a Consultation", service: "Consultation", note: "Immunotherapy" },
    },
    {
      name: "Cancer Screening",
      body: "Early detection programs for at-risk populations.",
      icon: "screening",
      action: { kind: "appointment", label: "Book a Consultation", service: "Consultation", note: "Cancer Screening" },
    },
  ],
} as const satisfies ServicesContent;

/* ------------------------------------------------------------------ */
/* 6 · #value                                                          */
/* ------------------------------------------------------------------ */

export const value = {
  // SOURCE: EXISTING
  title: "Where Excellence, Compassion, Trust & Affordability Come Together",
  // NEW (presentation only): set in the serif italic
  emphasis: "Come Together",
  // SOURCE: EXISTING (the 4 items, in the live order); icons NEW
  items: [
    { title: "Affordable & Budget-Friendly Treatment", icon: "wallet" },
    // Renders "30–40% Cost Savings", as on the live page (the big animated number).
    // PENDING DOCTOR: confirm the 30–40% cost savings claim, and what it is compared with.
    { title: "Cost Savings", range: { from: 30, to: 40, suffix: "%" } },
    { title: "Transparent Pricing, No Hidden Charges", icon: "receipt" },
    { title: "Cashless Insurance Assistance", icon: "shield-check" },
  ],
  // SOURCE: EXISTING (button label; opens the booking page on the live site); note NEW
  cta: { label: "Request a Treatment Estimate", service: "Consultation", note: "Estimate request" },
} as const satisfies ValueContent;

/* ------------------------------------------------------------------ */
/* 8 · #approach                                                       */
/* ------------------------------------------------------------------ */

export const approach = {
  // SOURCE: EXISTING (one string per sentence)
  title: ["Fight Cancer with Clarity.", "Reclaim Life with Confidence."],
  // NEW (presentation only): set in the serif italic
  emphasis: "Confidence.",
  body: "At OncoXpert, we combine advanced surgical expertise, ethical guidance, and personalized treatment plans to help every patient make informed decisions and achieve the best possible outcomes.",
  // SOURCE: EXISTING (button label; opens the booking page on the live site)
  cta: { label: "Book a Consultation", service: "Consultation" },
  // SOURCE: EXISTING (the 5 pillars, in the live order); icons NEW
  pillars: [
    {
      title: "Best-in-Class Treatment Protocols",
      body: "Evidence-based cancer treatment aligned with global standards.",
      icon: "award",
    },
    {
      title: "Ethical & Clear Guidance",
      body: "Honest recommendations with complete transparency at every step.",
      icon: "scale",
    },
    {
      title: "Holistic Healing & Quality of Life",
      body: "Comprehensive care focused on recovery, comfort, and long term well-being.",
      icon: "heart-handshake",
    },
    {
      title: "Precision & Personalized Care",
      body: "Tailored treatment plans designed around each patient's unique condition.",
      icon: "target",
    },
    {
      title: "Cutting-Edge Surgical Technology",
      body: "Advanced minimally invasive and robotic surgical techniques for better outcomes.",
      icon: "cpu",
    },
  ],
} as const satisfies ApproachContent;

/* ------------------------------------------------------------------ */
/* 7, 9–13 · shared sections: this page's settings and headings        */
/* (reviews: content/shared/reviews.ts; videos: content/shared/videos.ts;
    appointment, locations, final band: content/shared/sections.ts)    */
/* Not built: the live page's "Join Our Newsletter" box (email sign-up for blog posts; there is
   no backend for it here). Waiting on a decision.                     */
/* ------------------------------------------------------------------ */

/**
 * SOURCE: NEW. Preselected by the buttons that name no service: header, menu, mobile action bar
 * and the FAQ's contact card. Every Home section button names its own (above).
 */
export const defaultAppointmentService: AppointmentService = "Consultation";

export const reviews = {
  // SOURCE: EXISTING (as displayed: the live markup is sentence case, capitalised by CSS; same
  // words as the breast page). Set in two lines (the client's review, 30 Oct 2026): the break is
  // layout, not words.
  title: ["Every Patient Story Reflects", "Our Commitment To Clinical Excellence."],
  // SOURCE: NEW (label; replaces the live page's "Verified by Trustindex" badge). The link is
  // EXISTING: the live site's "Main Clinic Location" Google profile (site.mainClinic).
  // PENDING DOCTOR: the doctor has three Google profiles (one per clinic); confirm which one
  // these reviews are on.
  link: { label: "Read all reviews on Google", href: site.mainClinic.mapHref },
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
} as const satisfies { title: readonly string[]; link: { label: string; href: string }; order: readonly ReviewId[] };

export const videos = {
  // SOURCE: NEW (the live page shows its videos without a heading); "warriors": the client's
  // review, 30 Oct 2026
  eyebrow: "Watch & learn",
  title: "Hear from our warriors",
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
