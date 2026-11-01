/**
 * Image manifest for /thyroid-cancer/ (Thyroid Cancer).
 *
 * New stock photos live in public/images/thyroid-cancer/ and are produced by `npm run images thyroid`
 * (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this file). Photos reused from other
 * folders (portrait, Home's licensed specialty photo, the endometrial consultation photo) are only
 * checked, never downloaded again. `width` / `height` are the real pixel sizes on disk (stock: 2000px
 * long edge). `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/thyroid-cancer";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const thyroidImages = {
  /* Own photos, reused ---------------------------------------------- */

  doctor: {
    file: "dr-sunil-navalgund.png",
    src: "/images/brand/dr-sunil-navalgund.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 20%",
    width: 886,
    height: 1024,
  },

  /* Licensed photos reused from other pages (Pexels) ----------------- */

  // Home's photo for the thyroid specialty tile. #symptoms.
  neckExam: {
    file: "specialty-thyroid.jpg",
    src: "/images/home/specialty-thyroid.jpg",
    pexelsId: 3985305,
    alt: "Doctor examining a smiling woman's neck",
    credit: { photographer: "Gustavo Fring", url: pexels(3985305) },
    focal: "55% 35%",
    width: 2000,
    height: 1333,
  },
  // The endometrial page's photo. #second-opinion.
  consultation: {
    file: "consultation.jpg",
    src: "/images/endometrial-cancer/consultation.jpg",
    pexelsId: 7579831,
    alt: "Doctor smiling as she explains a report to a patient",
    credit: { photographer: "cottonbro studio", url: pexels(7579831) },
    focal: "40% 45%",
    width: 2000,
    height: 1333,
  },

  /* New stock photos ------------------------------------------------- */

  // #hero: a confident smile, the neck in view. Source of og.jpg.
  youngWoman: {
    file: "young-woman-smiling.jpg",
    src: `${BASE}/young-woman-smiling.jpg`,
    pexelsId: 5151189,
    alt: "Young woman in a sari smiling over her shoulder in a forest",
    credit: { photographer: "Azraq Al Rezoan", url: pexels(5151189) },
    focal: "50% 30%",
    width: 1333,
    height: 2000,
  },
  // #understanding.
  womanGarden: {
    file: "woman-garden.jpg",
    src: `${BASE}/woman-garden.jpg`,
    pexelsId: 13650900,
    alt: "Smiling woman in a traditional embroidered top against green leaves",
    credit: { photographer: "Dax Photoshoper", url: pexels(13650900) },
    focal: "50% 30%",
    width: 1333,
    height: 2000,
  },
  // #early-detection / #modalities → Monitoring (neck ultrasounds).
  ultrasound: {
    file: "ultrasound.jpg",
    src: `${BASE}/ultrasound.jpg`,
    pexelsId: 16388113,
    alt: "An ultrasound machine showing a scan on its screen",
    credit: { photographer: "Jorge Chan", url: pexels(16388113) },
    focal: "50% 40%",
    width: 2000,
    height: 1333,
  },
  // #outcomes: hope.
  seniorSmile: {
    file: "senior-smile.jpg",
    src: `${BASE}/senior-smile.jpg`,
    pexelsId: 6137038,
    alt: "Older man smiling broadly outdoors",
    credit: { photographer: "Pranavsinh suratia", url: pexels(6137038) },
    focal: "50% 35%",
    width: 2000,
    height: 1333,
  },
  // The final band.
  womanSaree: {
    file: "woman-saree.jpg",
    src: `${BASE}/woman-saree.jpg`,
    pexelsId: 12726134,
    alt: "Smiling woman in a green saree in a garden",
    credit: { photographer: "BANU FILM ADS", url: pexels(12726134) },
    focal: "50% 25%",
    width: 1333,
    height: 2000,
  },
} as const satisfies Record<string, PageImage>;

export type ThyroidImageKey = keyof typeof thyroidImages;

/** Social share image, generated from young-woman-smiling.jpg by the image script. */
export const thyroidOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
