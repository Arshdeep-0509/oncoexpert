/**
 * Image manifest for /stomach-cancer/ (Stomach Cancer).
 *
 * New stock photos live in public/images/stomach-cancer/ and are produced by `npm run images stomach`
 * (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this file). Photos reused from other
 * folders (the portrait and its cutout, the doctor's own robotic photo, the colorectal laparoscopy
 * photo, the robotic page's stomach render) are only checked, never downloaded again. `width` /
 * `height` are the real pixel sizes on disk (stock: 2000px long edge). `focal` is the CSS
 * object-position used whenever the photo is cropped.
 *
 * AI-generated photos were the other option (as on Thyroid); the Higgsfield account had no credits
 * (19 Nov 2026), so every new photo is Pexels stock. Still wanted: an older person enjoying food (the
 * two meal photos are a family dinner).
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/stomach-cancer";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const stomachImages = {
  /* Own photos, reused ---------------------------------------------- */

  doctor: {
    file: "dr-sunil-navalgund.png",
    src: "/images/brand/dr-sunil-navalgund.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 20%",
    width: 886,
    height: 1024,
  },
  // The head cut out of the portrait (the live #surgeon block shows a cutout).
  doctorCutout: {
    file: "dr-sunil-navalgund-head.png",
    src: "/images/brand/dr-sunil-navalgund-head.png",
    alt: "Dr. Sunil Navalgund",
    focal: "50% 50%",
    width: 886,
    height: 410,
  },
  // Home's hero slide: Dr. Sunil at the patient cart beside the draped robotic arms.
  // #techniques → Robotic Precision.
  robotic: {
    file: "hero-robotic-arms-wide.jpg",
    src: "/images/home/hero-robotic-arms-wide.jpg",
    alt: "Dr. Sunil Navalgund beside the draped arms of the surgical robot",
    focal: "35% 40%",
    width: 2400,
    height: 1600,
  },
  // The robotic page's stomach render (AI-generated, Higgsfield). #understanding.
  anatomy: {
    file: "cancer-stomach.jpg",
    src: "/images/robotic/cancer-stomach.jpg",
    alt: "Illustration of the human stomach",
    focal: "50% 50%",
    width: 1024,
    height: 1024,
  },

  /* Licensed photos reused from other pages (Pexels) ----------------- */

  // The colorectal page's photo. #techniques → Laparoscopic Expertise.
  laparoscopy: {
    file: "laparoscopy.jpg",
    src: "/images/colorectal-cancer/laparoscopy.jpg",
    pexelsId: 26212702,
    alt: "Surgical team performing keyhole surgery, the camera view on the monitor",
    credit: { photographer: "shirin olyaei", url: pexels(26212702) },
    focal: "50% 50%",
    width: 2000,
    height: 1333,
  },

  /* New stock photos ------------------------------------------------- */

  // #hero support: eating together again. Source of og.jpg.
  heroMeal: {
    file: "family-dinner.jpg",
    src: `${BASE}/family-dinner.jpg`,
    pexelsId: 8818660,
    alt: "Family sharing a traditional Indian meal at home, smiling and talking",
    credit: { photographer: "Yan Krukau", url: pexels(8818660) },
    focal: "55% 40%",
    width: 2000,
    height: 1333,
  },
  // The final band (focal point on the middle couple, so faces stay in view in the narrow phone crop).
  finalMeal: {
    file: "family-table.jpg",
    src: `${BASE}/family-table.jpg`,
    pexelsId: 8818741,
    alt: "A family gathered around a table set with Indian dishes in a warm, decorated room",
    credit: { photographer: "Yan Krukau", url: pexels(8818741) },
    focal: "60% 60%",
    width: 2000,
    height: 1333,
  },
  // #warning-signs: Persistent Pain, Weight Loss, Appetite Loss, Chronic Nausea.
  symptomPain: {
    file: "symptom-pain.jpg",
    src: `${BASE}/symptom-pain.jpg`,
    pexelsId: 5938358,
    alt: "Person sitting with both hands pressed to the upper abdomen",
    credit: { photographer: "Sora Shimazaki", url: pexels(5938358) },
    focal: "50% 45%",
    width: 2000,
    height: 1333,
  },
  symptomWeight: {
    file: "symptom-weight.jpg",
    src: `${BASE}/symptom-weight.jpg`,
    pexelsId: 6550832,
    alt: "Feet in socks on a digital bathroom scale",
    credit: { photographer: "Andres Ayrton", url: pexels(6550832) },
    focal: "55% 50%",
    width: 2000,
    height: 1333,
  },
  symptomAppetite: {
    file: "symptom-appetite.jpg",
    src: `${BASE}/symptom-appetite.jpg`,
    pexelsId: 6874269,
    alt: "Older woman resting her head on her hand over a barely touched plate",
    credit: { photographer: "Teona Swift", url: pexels(6874269) },
    focal: "50% 35%",
    width: 1333,
    height: 2000,
  },
  symptomNausea: {
    file: "symptom-nausea.jpg",
    src: `${BASE}/symptom-nausea.jpg`,
    pexelsId: 4584059,
    alt: "Woman holding a hand over her mouth, feeling unwell",
    credit: { photographer: "Ketut Subiyanto", url: pexels(4584059) },
    focal: "50% 35%",
    width: 1331,
    height: 2000,
  },
} as const satisfies Record<string, PageImage>;

export type StomachImageKey = keyof typeof stomachImages;

/** Social share image, generated from family-dinner.jpg by the image script. */
export const stomachOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
