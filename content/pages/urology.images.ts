/**
 * Image manifest for /urology/ (Urology).
 *
 * New stock photos live in public/images/urology/ and are produced by `npm run images urology`
 * (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this file). Photos reused from other
 * folders (the portrait and its cutout, the doctor's own theatre photo, the colorectal consultation
 * photo) are only checked, never downloaded again. `width` / `height` are the real pixel sizes on disk
 * (stock: 2000px long edge). `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * AI-generated photos were the other option (as on Thyroid); the Higgsfield account had no credits
 * (19 Nov 2026), so every new photo is Pexels stock.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/urology";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const urologyImages = {
  /* Own photos, reused ---------------------------------------------- */

  doctor: {
    file: "dr-sunil-navalgund.png",
    src: "/images/brand/dr-sunil-navalgund.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 20%",
    width: 886,
    height: 1024,
  },
  // #hero: the portrait cut out of its studio backdrop, head to mid-torso (scripts/make-portrait-cutout.mjs
  // with keep 0.86). The LCP image.
  doctorCutout: {
    file: "dr-sunil-navalgund-cutout.png",
    src: "/images/brand/dr-sunil-navalgund-cutout.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 0%",
    width: 886,
    height: 881,
  },
  // Home's hero slide: an operation under the theatre lights (the doctor's own photo).
  // #technology / #leadership.
  theatre: {
    file: "hero-operating-room-wide.jpg",
    src: "/images/home/hero-operating-room-wide.jpg",
    alt: "Surgeons operating under the theatre lights",
    focal: "60% 45%",
    width: 2400,
    height: 1600,
  },

  /* Licensed photos reused from other pages (Pexels) ----------------- */

  // The colorectal page's photo (a senior man and his doctor). #leadership / #specialist.
  consultation: {
    file: "consultation.jpg",
    src: "/images/colorectal-cancer/consultation.jpg",
    pexelsId: 39192358,
    alt: "Doctor talking a senior patient through his treatment plan",
    credit: { photographer: "Vitaly Gariev", url: pexels(39192358) },
    focal: "50% 40%",
    width: 2000,
    height: 1125,
  },

  /* New stock photos ------------------------------------------------- */

  // #hero support: a confident older man (portrait).
  heroMan: {
    file: "older-man-turban.jpg",
    src: `${BASE}/older-man-turban.jpg`,
    pexelsId: 16930356,
    alt: "Older man in a pink turban sitting calmly on a doorstep",
    credit: { photographer: "Mind Change Productions", url: pexels(16930356) },
    focal: "50% 35%",
    width: 1333,
    height: 2000,
  },
  // The final band (the man on the right). Source of og.jpg.
  finalMan: {
    file: "older-man-confident.jpg",
    src: `${BASE}/older-man-confident.jpg`,
    pexelsId: 965663,
    alt: "Older man in a white shirt seated with his hands folded, looking ahead with quiet confidence",
    credit: { photographer: "Krunal Parmar", url: pexels(965663) },
    focal: "62% 35%",
    width: 2000,
    height: 1333,
  },
} as const satisfies Record<string, PageImage>;

export type UrologyImageKey = keyof typeof urologyImages;

/** Social share image, generated from older-man-confident.jpg by the image script. */
export const urologyOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
