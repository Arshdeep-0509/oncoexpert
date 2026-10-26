/**
 * Image manifest for /endometrial-cancer-treatment-bangalore/ (Endometrial Cancer).
 *
 * New stock photos live in public/images/endometrial-cancer/ and are produced by
 * `npm run images endometrial` (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this
 * file). Photos reused from other folders (portrait, robotic, Home's licensed specialty photo) are
 * only checked, never downloaded again. `width` / `height` are the real pixel sizes on disk
 * (stock: 2000px long edge). `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/endometrial-cancer";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const endometrialImages = {
  /* Own photos, reused ---------------------------------------------- */

  doctor: {
    file: "dr-sunil-navalgund.png",
    src: "/images/brand/dr-sunil-navalgund.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 20%",
    width: 886,
    height: 1024,
  },
  // Advanced Surgical Precision → Robotic Surgery ("Gold Standard").
  roboticInstruments: {
    file: "davinci-x-instruments-black.jpg",
    src: "/images/robotic/davinci-x-instruments-black.jpg",
    alt: "The wristed instruments of the da Vinci robotic system",
    focal: "50% 40%",
    width: 1717,
    height: 2576,
  },
  // Home's licensed photo for the endometrial specialty tile (Pexels).
  ultrasound: {
    file: "specialty-endometrial.jpg",
    src: "/images/home/specialty-endometrial.jpg",
    pexelsId: 7108415,
    alt: "Doctor performing an abdominal ultrasound scan on a woman",
    credit: { photographer: "Pavel Danilyuk", url: pexels(7108415) },
    focal: "50% 50%",
    width: 2000,
    height: 1335,
  },

  /* New stock photos ------------------------------------------------- */

  consultation: {
    file: "consultation.jpg",
    src: `${BASE}/consultation.jpg`,
    pexelsId: 7579831,
    alt: "Doctor smiling as she explains a report to a patient",
    credit: { photographer: "cottonbro studio", url: pexels(7579831) },
    focal: "40% 45%",
    width: 2000,
    height: 1333,
  },
  motherDaughter: {
    file: "mother-daughter.jpg",
    src: `${BASE}/mother-daughter.jpg`,
    pexelsId: 37627041,
    alt: "Mother and daughter in sarees sharing a hug",
    credit: { photographer: "Ventara Films", url: pexels(37627041) },
    focal: "50% 35%",
    width: 2000,
    height: 1334,
  },
  womanSmiling: {
    file: "woman-smiling.jpg",
    src: `${BASE}/woman-smiling.jpg`,
    pexelsId: 13760267,
    alt: "Older woman in a peach scarf smiling warmly",
    credit: { photographer: "Mehmet Turgut Kirkgoz", url: pexels(13760267) },
    focal: "50% 30%",
    width: 2000,
    height: 1500,
  },
} as const satisfies Record<string, PageImage>;

export type EndometrialImageKey = keyof typeof endometrialImages;

/** Social share image, generated from woman-smiling.jpg by the image script. */
export const endometrialOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
