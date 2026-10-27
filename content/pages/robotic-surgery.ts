/**
 * Every word that appears on /robotic-surgery/.
 *
 * SOURCE tags:
 *   EXISTING → copied from the live page (oncoxpert.in/robotic-surgery/). Render exactly.
 *   DOCTOR   → new statement from Dr. Sunil. Render exactly.
 *   NEW      → labels/captions we added. Pending the doctor's approval.
 *
 * Never paraphrase, shorten or reorder EXISTING or DOCTOR text. The only
 * permitted edits are the approved spelling/punctuation fixes listed in the brief.
 */

import type { AppointmentService } from "@/content/site";
import { googleReviews } from "@/content/shared/reviews";
import { youtubeVideos } from "@/content/shared/videos";
import { organization } from "@/content/shared/organization";

/* ------------------------------------------------------------------ */
/* Metadata                                                            */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING (identical to live page for SEO)
export const meta = {
  title: "Robotic Cancer Surgery in Bangalore | OncoXpert",
  description:
    "Robotic cancer surgery in Bangalore at OncoXpert, offering minimally invasive procedures, precision surgery and personalized cancer care.",
  canonical: "https://oncoxpert.in/robotic-surgery/",
  ogImage: {
    src: "/images/brand/oncoxpert-logo-square.png",
    width: 216,
    height: 217,
  },
} as const;

/* ------------------------------------------------------------------ */
/* Images                                                              */
/* Files are .jpg on disk. "bg" tells you where each may be placed:    */
/*   black → only on pure #000 sections, or with blend-on-dark         */
/*   white → only on #FFF sections, or with blend-on-light             */
/* ------------------------------------------------------------------ */

// SOURCE: NEW (alt text)
const ALT = {
  front: "da Vinci robotic patient cart with four robotic arms",
  instruments: "da Vinci robotic arms fitted with surgical instruments and a 3D camera",
  back: "Rear view of the da Vinci robotic patient cart",
  arms: "Close-up of the four numbered robotic arms converging on the surgical field",
  system: "The complete da Vinci system: vision cart, patient cart and surgeon console",
  visionCart: "da Vinci vision cart with 3D HD monitor",
} as const;

const PORTRAIT = { width: 1717, height: 2576 } as const;
const LANDSCAPE = { width: 2400, height: 1600 } as const;
const ARMS = { width: 1200, height: 839 } as const;

export const images = {
  xFrontWhite: { src: "/images/robotic/davinci-x-front-white.jpg", alt: ALT.front, bg: "white", ...PORTRAIT },
  xInstrumentsWhite: {
    src: "/images/robotic/davinci-x-instruments-white.jpg",
    alt: ALT.instruments,
    bg: "white",
    ...PORTRAIT,
  },
  xInstrumentsBlack: {
    src: "/images/robotic/davinci-x-instruments-black.jpg",
    alt: ALT.instruments,
    bg: "black",
    subject: { x: 10.7, y: 30.2, w: 75, h: 56.2 },
    ...PORTRAIT,
  },
  xBackWhite: { src: "/images/robotic/davinci-x-back-white.jpg", alt: ALT.back, bg: "white", ...PORTRAIT },
  xBackBlack: {
    src: "/images/robotic/davinci-x-back-black.jpg",
    alt: ALT.back,
    bg: "black",
    subject: { x: 17.2, y: 15.4, w: 71.2, h: 68.4 },
    ...PORTRAIT,
  },
  // The arms run off the photo's top and left edges (`bleed`): those edges get faded wherever it is shown.
  armsWhite: { src: "/images/robotic/davinci-arms-white.jpg", alt: ALT.arms, bg: "white", bleed: "top-left", ...ARMS },
  armsBlack: {
    src: "/images/robotic/davinci-arms-black.jpg",
    alt: ALT.arms,
    bg: "black",
    bleed: "top-left",
    subject: { x: 0, y: 0, w: 82.8, h: 68.3 },
    ...ARMS,
  },
  systemWhite: { src: "/images/robotic/davinci-system-white.jpg", alt: ALT.system, bg: "white", ...LANDSCAPE },
  systemBlack: {
    src: "/images/robotic/davinci-system-black.jpg",
    alt: ALT.system,
    bg: "black",
    subject: { x: 26, y: 28.3, w: 52.5, h: 42.8 },
    ...LANDSCAPE,
  },
  visionCart: { src: "/images/robotic/davinci-vision-cart.jpg", alt: ALT.visionCart, bg: "white", ...PORTRAIT },
  // Black-background copies made with scripts/make-black-bg.mjs (from the white originals above).
  xFrontBlack: {
    src: "/images/robotic/davinci-x-front-black.jpg",
    alt: ALT.front,
    bg: "black",
    subject: { x: 12.2, y: 15.8, w: 75.5, h: 67.3 },
    ...PORTRAIT,
  },
  visionCartBlack: {
    src: "/images/robotic/davinci-vision-cart-black.jpg",
    alt: ALT.visionCart,
    bg: "black",
    subject: { x: 24.8, y: 2.8, w: 50.8, h: 93.2 },
    ...PORTRAIT,
  },
  doctor: {
    src: "/images/brand/dr-sunil-navalgund.png",
    // SOURCE: NEW
    alt: "Dr. Sunil Navalgund, Lead Surgical Oncologist",
    bg: "photo",
    width: 886,
    height: 1024,
  },
} as const;

/**
 * SOURCE: DOCTOR (asked for more images). The photos shown in the hero slider, in this order.
 * Add operating-room / team photos here: put the file in public/images/robotic/ and add an
 * entry ({ src, alt, width, height, bg }). The hero is pure black: use black-background photos
 * (bg: "black"; make one from a white product shot with scripts/make-black-bg.mjs) or real
 * photographs (bg: "photo"). Every photo is shown in the same-size frame; give black product
 * shots a `subject` box so the machine is drawn at the same size as on the first slide.
 */
type GalleryItem = {
  src: string;
  alt: string;
  width: number;
  height: number;
  /** "white" photos are multiply-blended on the white section; "photo" = normal photograph. */
  bg: "white" | "black" | "photo";
  /**
   * Where the machine sits inside the photo, in % of the photo (measured on the file).
   * The hero slider uses it to show every machine at the same size and centred.
   */
  subject?: { x: number; y: number; w: number; h: number };
};

const robotPhotos: readonly GalleryItem[] = [
  images.systemBlack,
  images.xInstrumentsBlack,
  images.armsBlack,
  images.xBackBlack,
  images.xFrontBlack,
];

/* ------------------------------------------------------------------ */
/* 1 · #hero — HeroSlider                                              */
/* ------------------------------------------------------------------ */

// Form options are shared by every page: content/site.ts → appointmentServices.
export type { AppointmentService };

// SOURCE: EXISTING (button labels) → service preselected in the appointment form
const consultCtas = {
  primary: { label: "Book Consultation", service: "Consultation" },
  secondary: { label: "Get Second Opinion", service: "Second Opinion" },
} as const satisfies Record<string, { label: string; service: AppointmentService }>;

export const hero = {
  // SOURCE: DOCTOR
  title: "Robotic surgery",
  // SOURCE: NEW (styling hint: the word given the white → glow gradient)
  titleAccent: "Robotic",
  // SOURCE: DOCTOR
  subtitle: "For advanced and precise oncological procedures",
  // SOURCE: DOCTOR
  highlights: [
    { label: "Bloodless", icon: "droplet-off" },
    { label: "Painless", icon: "heart-pulse" },
    { label: "Scarless", icon: "sparkles" },
    { label: "Fast recovery and early discharge", icon: "house" },
  ],
  ctas: consultCtas,
  // The hero slider shows robotPhotos (above), every photo in the same fixed-size frame.
  slides: robotPhotos,
  // SOURCE: NEW (screen-reader labels)
  a11y: {
    region: "da Vinci robotic system images",
    pause: "Pause slideshow",
    play: "Play slideshow",
    goTo: (n: number, total: number) => `Show image ${n} of ${total}`,
    scrollCue: "Scroll to continue",
  },
} as const;

/* ------------------------------------------------------------------ */
/* 2 · #overview — IntroSection                                        */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING ("Negligable" → "Negligible" per approved fix)
export const overview = {
  eyebrow: "Precision Meets Care",
  headingLead: "Advanced Keyhole Cancer Surgery for",
  headingHighlight: "Better Recovery & Precision",
  body: "Experience minimally invasive cancer treatment through Robotic Surgery and Advanced Laparoscopic Surgery, designed for faster recovery, reduced pain, and improved outcomes.",
  ctas: consultCtas,
  // `position` (desktop only): centre of each floating card around the robot, in % of the image box.
  badges: [
    { label: "Minimal Scars", icon: "sparkles", position: { x: 10, y: 14 } },
    { label: "Faster Recovery", icon: "timer", position: { x: 90, y: 32 } },
    { label: "Negligible Blood Loss", icon: "droplet-off", position: { x: 6, y: 60 } },
    { label: "Pain Less", icon: "smile", position: { x: 92, y: 80 } },
  ],
  image: images.xInstrumentsWhite,
} as const;

/* ------------------------------------------------------------------ */
/* 3 · #why-robotic — RoboticsInOncology                               */
/* ------------------------------------------------------------------ */

export const whyRobotic = {
  // SOURCE: NEW
  eyebrow: "Why Robotic Surgery",
  // SOURCE: NEW
  heading: "At the forefront of innovation in cancer surgery",
  // SOURCE: DOCTOR (approved fixes applied: "surgeons' best friend", "thoracic, gastrointestinal, urological", "less bleeding, pain", "in our effort")
  paragraphs: [
    "Robotics is at the forefront of innovation in surgery and is increasingly seen as surgeons' best friend in handling difficult surgeries especially in field of oncology. It provides excellent vision, reach and maneuverability and ensures complex surgeries can be done with precision.",
    "We use the robot extensively in thoracic, gastrointestinal, urological and gyne oncosurgeries to provide state of art care to patients.",
    "Patients have minimal scars, less bleeding, pain and faster recovery. Robot has become our constant companion in our effort to provide best care and outcomes.",
  ],
  // SOURCE: NEW (taken from paragraph 2)
  specialties: ["Thoracic", "Gastrointestinal", "Urological", "Gynecological"],
} as const;

/* ------------------------------------------------------------------ */
/* 4 · #techniques — SurgicalTechniques                                */
/* ------------------------------------------------------------------ */

// SOURCE: EXISTING
export const techniques = {
  heading: "Advanced Surgical Techniques",
  intro: "We specialize in two primary minimally invasive methods, choosing the best fit for your specific condition.",
  items: [
    {
      tag: "Next-Gen Tech",
      title: "Robotic Cancer Surgery",
      body: "Utilizing the Da Vinci robotic system for unmatched precision in complex oncological procedures.",
      features: [
        "Enhanced Surgical Precision (1-2mm accuracy)",
        "Immersion 3D HD Visualization",
        "Greater Dexterity for intricate tissue handling",
        "Superior access in confined spaces",
      ],
    },
    {
      tag: "Legacy Technique",
      title: "Advanced Laparoscopic Surgery",
      body: "Proven minimally invasive technique using specialized instruments and cameras for radical results.",
      features: [
        "Significantly smaller incisions",
        "Faster post-operative recovery times",
        "Less post-operative pain medication needed",
        "Proven clinical results across decades",
      ],
    },
  ],
  roboticImage: images.armsBlack,
} as const;

/* ------------------------------------------------------------------ */
/* 5 · #inside-the-robot — InsideTheRobot                              */
/* ------------------------------------------------------------------ */

export type ShowcaseStep = {
  number: string;
  title: string;
  body: string;
  image: (typeof images)[keyof typeof images];
  /**
   * The machine this step features: its box in % of the photo (measured on the file).
   * Omitted = the photo's own `subject`. Every step shows its machine at the same height,
   * centred; consecutive steps on the same photo become a camera move between machines.
   */
  machine?: { x: number; y: number; w: number; h: number };
  /** Overview step: the whole group is fitted to the stage instead of the standard height. */
  overview?: boolean;
  /** Darken everything around the featured machine (for photos showing several machines). */
  spotlight?: boolean;
  /** Optional size tweak (1 = standard) for machines whose shape reads larger, e.g. wide photos. */
  size?: number;
};

export const insideTheRobot = {
  // SOURCE: NEW
  eyebrow: "Inside the robot",
  // SOURCE: NEW (captions pending the doctor's approval)
  steps: [
    {
      number: "01",
      title: "The complete robotic system",
      body: "Surgeon console, patient cart and vision cart work together as one.",
      image: images.systemBlack,
      overview: true,
    },
    {
      number: "02",
      title: "Surgeon console",
      body: "The surgeon operates from the console with a magnified, immersive 3D HD view.",
      image: images.systemBlack,
      machine: { x: 65.2, y: 37.9, w: 13.3, h: 33.3 },
      spotlight: true,
    },
    {
      number: "03",
      title: "Patient cart",
      body: "Positioned beside the operating table, it carries the four robotic arms that hold the camera and instruments.",
      image: images.systemBlack,
      machine: { x: 38.8, y: 31.1, w: 23.8, h: 40 },
      spotlight: true,
    },
    {
      number: "04",
      title: "Vision cart with 3D HD monitor",
      body: "Its 3D HD monitor and imaging equipment let the whole operating team see exactly what the surgeon sees.",
      image: images.systemBlack,
      machine: { x: 26.1, y: 28.1, w: 10.6, h: 42.3 },
      spotlight: true,
    },
    {
      number: "05",
      title: "Four robotic arms",
      body: "They hold a 3D HD camera and wristed instruments through small ports.",
      image: images.xInstrumentsBlack,
    },
    {
      number: "06",
      title: "Precise, wristed movement",
      body: "Fine, controlled movement in tight spaces inside the body.",
      image: images.armsBlack,
      // A wide, close-up shot: shown a little smaller so it reads the same size as the other steps.
      size: 0.72,
    },
  ] satisfies ShowcaseStep[],
} as const;

/* ------------------------------------------------------------------ */
/* 6 · #outcomes — RoboticVsOpen                                       */
/* Percentages live here so the doctor can update them in one place.   */
/* ------------------------------------------------------------------ */

export type OutcomeItem = {
  label: string;
  /** Robotic value as a % of open surgery (open surgery = 100). */
  robotic: number;
  open: number;
  caption: string;
  /** Optional photo shown inside the card (fills the card's spare height). */
  image?: (typeof images)[keyof typeof images];
};

export const outcomes = {
  // SOURCE: NEW
  eyebrow: "Outcomes",
  // SOURCE: NEW
  heading: "Robotic vs open surgery",
  // SOURCE: NEW
  barLabels: { open: "Open surgery", robotic: "Robotic surgery" },
  // SOURCE: DOCTOR (captions exactly as written)
  items: [
    { label: "Blood loss", robotic: 25, open: 100, caption: "Blood loss – 25% compared to open surgery" },
    { label: "Hospital stay", robotic: 60, open: 100, caption: "Hospital stay – 60% compared to open surgery" },
    {
      label: "Pain",
      robotic: 30,
      open: 100,
      caption: "Pain – 30% as compared to normal surgery",
      image: images.armsBlack,
    },
  ] satisfies OutcomeItem[],
  // SOURCE: DOCTOR
  scars: {
    caption: "Scars – only port sites (8mm x 4), open surgery 12-14 cms",
    portSizeMm: 8,
    ports: 4,
    openIncisionCm: [12, 14],
  },
  // SOURCE: NEW
  disclaimer: "Figures are indicative. Individual outcomes vary with each patient's condition and procedure.",
  // SOURCE: NEW (screen-reader text for the charts)
  a11y: {
    tableCaption: "Robotic surgery compared with open surgery (open surgery = 100%)",
    measure: "Measure",
    scarToggle: "Show scars after",
    scarSummary: (openCm: readonly number[], ports: number, portMm: number) =>
      `Open surgery leaves one ${openCm[0]} to ${openCm[1]} cm midline incision. Robotic surgery leaves ${ports} port sites of ${portMm} mm each.`,
  },
} as const;

/** Scar labels derived from the numbers above (so they update with them). */
export const scarLabels = {
  open: `${outcomes.scars.openIncisionCm[0]}–${outcomes.scars.openIncisionCm[1]} cm`,
  robotic: `${outcomes.scars.portSizeMm} mm × ${outcomes.scars.ports}`,
};

/* ------------------------------------------------------------------ */
/* 7 · #compare — ComparingModalities                                  */
/* ------------------------------------------------------------------ */

export const compare = {
  // SOURCE: EXISTING
  eyebrow: "COMPARING MODALITIES",
  heading: "Which Option is Right for You?",
  intro: "A detailed comparison of our advanced surgical approaches to help you make an informed decision.",
  // SOURCE: EXISTING (row labels); icons are presentation only
  rows: [
    { label: "TECHNOLOGY", icon: "cpu" },
    { label: "PRECISION", icon: "crosshair" },
    { label: "RECOVERY", icon: "timer" },
    { label: "INCISION SIZE", icon: "ruler" },
    { label: "HOSPITAL STAY", icon: "bed-double" },
  ],
  // SOURCE: EXISTING (values in row order)
  modalities: [
    {
      name: "Robotic Surgery",
      badge: "ADVANCED CHOICE",
      featured: true,
      values: [
        "Computer-Assisted Arms",
        "Extreme (Sub-millimeter)",
        "Quickest (2-5 days)",
        "8mm - 12mm",
        "Minimal (1-3 days)",
      ],
    },
    {
      name: "Laparoscopic",
      badge: null,
      featured: false,
      values: ["Manual Endoscopic Tools", "High Precision", "Fast (4-7 days)", "10mm - 15mm", "Short (2-4 days)"],
    },
  ],
  // SOURCE: EXISTING
  cta: { label: "Schedule Expert Consultation", service: "Consultation" },
} as const satisfies { cta: { label: string; service: AppointmentService } } & Record<string, unknown>;

/* ------------------------------------------------------------------ */
/* 8 · #numbers — SurgeryNumbers                                       */
/* Counts live here; the total is computed, never typed in.            */
/* ------------------------------------------------------------------ */

export type SurgeryKey =
  "colorectal" | "stomach" | "endometrium" | "esophagus" | "lung" | "thyroid" | "kidney" | "others";

export type SurgeryCount = {
  key: SurgeryKey;
  label: string;
  count: number;
};

export const surgeryNumbers = {
  // SOURCE: NEW
  eyebrow: "Our experience",
  // SOURCE: NEW
  heading: "Robotic surgery in numbers",
  // SOURCE: NEW
  totalLabel: "Robotic oncosurgeries performed",
  // SOURCE: DOCTOR (update counts here; the total and every badge follow)
  counts: [
    { key: "colorectal", label: "Colorectal", count: 51 },
    { key: "stomach", label: "Stomach", count: 32 },
    { key: "endometrium", label: "Endometrium/uterine", count: 54 },
    { key: "esophagus", label: "Esophagus", count: 26 },
    { key: "lung", label: "Lung", count: 16 },
    { key: "thyroid", label: "Thyroid", count: 12 },
    { key: "kidney", label: "Kidney", count: 12 },
    { key: "others", label: "Others", count: 26 },
  ] satisfies SurgeryCount[],
  // SOURCE: NEW (screen-reader text for the chart)
  a11y: {
    tableCaption: "Robotic oncosurgeries performed, by specialty",
    specialty: "Specialty",
    surgeries: "Surgeries",
    total: "Total",
  },
} as const;

export const surgeryTotal = (counts: readonly SurgeryCount[] = surgeryNumbers.counts) =>
  counts.reduce((sum, c) => sum + c.count, 0);

export const surgeryCount = (key: SurgeryKey) => surgeryNumbers.counts.find((c) => c.key === key)?.count ?? 0;

/* ------------------------------------------------------------------ */
/* 9 · #cancers — CancersWeTreat                                       */
/* ------------------------------------------------------------------ */

export const cancers = {
  // SOURCE: EXISTING
  heading: "Cancers We Treat with Keyhole",
  intro: "Advanced minimally invasive solutions for various oncology needs.",
  // SOURCE: EXISTING (title, body). Links reuse site URLs; counts come from surgeryNumbers.
  items: [
    {
      title: "Colon & Rectal",
      body: "Precise resection of colorectal tumors preserving normal function and nerve pathways.",
      href: "/colon-cancer-treatment-bangalore/",
      countKey: "colorectal",
      icon: "waves",
    },
    {
      title: "Stomach",
      body: "Advanced gastrectomy through small ports, facilitating quicker return to oral nutrition.",
      href: "/stomach-cancer/",
      countKey: "stomach",
      icon: "soup",
    },
    {
      title: "Esophageal",
      body: "Complex thoracic and abdominal procedures managed with meticulous keyhole precision.",
      href: null,
      countKey: "esophagus",
      icon: "spline",
    },
    {
      title: "Gynecological",
      body: "Hysterectomies and nodal dissections for uterine and cervical cancers with minimal scarring.",
      href: "/endometrial-cancer-treatment-bangalore/",
      countKey: "endometrium",
      icon: "venus",
    },
    {
      title: "Thoracic",
      body: "VATS and robotic-assisted lung resections for early-stage pulmonary malignancies.",
      href: "/lung-cancer-in-bangalore/",
      countKey: "lung",
      icon: "wind",
    },
  ] satisfies { title: string; body: string; href: string | null; countKey: SurgeryKey; icon: string }[],
  // SOURCE: EXISTING
  other: {
    title: "Other Indications?",
    body: "Talk to our experts to see if you are a candidate for keyhole surgery.",
    cta: { label: "Inquire Now", service: "Consultation" },
  },
  // SOURCE: NEW
  countBadge: (count: number) => `${count} robotic surgeries`,
} as const;

/* ------------------------------------------------------------------ */
/* 10 · #benefits — Benefits                                           */
/* ------------------------------------------------------------------ */

export const benefits = {
  // SOURCE: EXISTING
  heading: "Benefits of Keyhole Surgery",
  items: [
    { title: "Less Pain", body: "Significantly reduced post-op trauma", icon: "smile" },
    { title: "Faster Recovery", body: "Return to daily life in days, not weeks", icon: "timer" },
    { title: "Minimal Scars", body: "Tiny incisions heal with minimal marks", icon: "sparkles" },
    { title: "Low Blood Loss", body: "Less exposure of internal organs", icon: "droplet-off" },
    { title: "Shorter Hospital Stay", body: "Most patients leave within 48-72 hours", icon: "house" },
    { title: "Earlier Adjuvant Therapy", body: "Start Chemo/Radiation sooner if needed", icon: "calendar-check" },
  ],
  image: images.xFrontWhite,
} as const;

/* ------------------------------------------------------------------ */
/* 11 · #doctor — shared DoctorCard (classic look)                     */
/* ------------------------------------------------------------------ */

export const doctor = {
  // SOURCE: EXISTING
  name: "Meet Dr. Sunil Navalgund",
  label: "LEAD SURGICAL ONCOLOGIST",
  lead: "Dr. Sunil Navalgund is a pioneer in minimally invasive cancer surgery.",
  bio: "With thousands of successful robotic and laparoscopic procedures, he brings a level of precision that ensures the best possible clinical outcomes for his patients.",
  credentials: [
    { label: "Education", value: "MCH Surgical Oncology, FIAGES", icon: "graduation-cap" },
    { label: "Expertise", value: "Robotic & GI Oncology", icon: "stethoscope" },
  ],
  cta: { label: "Book Appointment with Dr. Sunil", service: "Consultation" },
  image: images.doctor,
} as const;

/* ------------------------------------------------------------------ */
/* 12 · #media — shared Videos (classic look)                          */
/* ------------------------------------------------------------------ */

export const media = {
  // SOURCE: NEW
  eyebrow: "Watch & learn",
  // SOURCE: NEW
  heading: "Patient stories",
  // SOURCE: EXISTING (YouTube video IDs). Titles are fetched from YouTube at build time.
  // The first video is shown large. Add or reorder IDs here.
  videos: youtubeVideos,

  // SOURCE: NEW (screen-reader / control labels)
  // (the play button reads "Play video: <title>")
  a11y: { play: "Play video", frame: "YouTube video", list: "Videos" },
} as const;

/* ------------------------------------------------------------------ */
/* 13 · #reviews — shared Reviews (classic look)                       */
/* Google reviews, verbatim (reviewers' own spelling is preserved).    */
/* Labels: content/shared/reviews.ts (reviewLabels)                    */
/* ------------------------------------------------------------------ */

export const reviews = {
  // SOURCE: EXISTING
  heading: "Every patient story reflects our commitment to clinical excellence.",
  // SOURCE: EXISTING (quotes: do not correct spelling), shared: content/shared/reviews.ts
  items: googleReviews,
} as const;

/* ------------------------------------------------------------------ */
/* 14–16 · #appointment, #locations, final band: shared sections       */
/* (classic look). Copy: content/shared/sections.ts                    */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Structured data (JSON-LD). Not visible on the page.                 */
/* ------------------------------------------------------------------ */

export const structuredData = {
  pageAbout: "Robotic surgery",
  // Shared with every page: content/shared/organization.ts
  physician: organization.physician,
  clinic: organization.clinic,
} as const;
