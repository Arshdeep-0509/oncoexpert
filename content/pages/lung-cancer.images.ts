/**
 * Image manifest for /lung-cancer-in-bangalore/ (Lung Cancer).
 *
 * New stock photos live in public/images/lung-cancer/ and are produced by `npm run images lung`
 * (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this file). Photos reused from other
 * folders (portrait, robotic, Home's licensed specialty photo, the colorectal keyhole photo) are only
 * checked, never downloaded again. `width` / `height` are the real pixel sizes on disk (stock: 2000px
 * long edge). `focal` is the CSS object-position used whenever the photo is cropped.
 * Decorative photos (`decorative: true`) have alt="" and are rendered with aria-hidden.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/lung-cancer";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const lungImages = {
  // #pathway: AI-generated (Higgsfield, gpt_image_2_5), the client review, 5 Nov 2026. Not real patients or staff.
  stepBiopsy: {
    file: "step-biopsy.jpg",
    src: `${BASE}/step-biopsy.jpg`,
    alt: "Gloved hands holding a flexible bronchoscope in a procedure room",
    focal: "45% 40%",
    width: 1024,
    height: 688,
  },
  stepPetct: {
    file: "step-pet-ct.jpg",
    src: `${BASE}/step-pet-ct.jpg`,
    alt: "Radiographer reassuring a patient on a PET-CT scanner table",
    focal: "55% 45%",
    width: 1024,
    height: 688,
  },
  stepPlanning: {
    file: "step-planning.jpg",
    src: `${BASE}/step-planning.jpg`,
    alt: "Doctors reviewing a chest CT scan together at a tumor board",
    focal: "55% 30%",
    width: 1024,
    height: 688,
  },
  stepRecovery: {
    file: "step-recovery.jpg",
    src: `${BASE}/step-recovery.jpg`,
    alt: "Man on a morning walk in a park with his wife, breathing deeply",
    focal: "45% 20%",
    width: 1024,
    height: 688,
  },
  /* Own photos, reused ---------------------------------------------- */

  // The live hero and #surgeon both show the portrait.
  doctor: {
    file: "dr-sunil-navalgund.png",
    src: "/images/brand/dr-sunil-navalgund.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 20%",
    width: 886,
    height: 1024,
  },
  // #techniques → Robotic Surgery (the DaVinci system).
  roboticArms: {
    file: "davinci-arms-black.jpg",
    src: "/images/robotic/davinci-arms-black.jpg",
    alt: "Close-up of the four numbered robotic arms converging on the surgical field",
    focal: "60% 60%",
    width: 1200,
    height: 839,
  },

  /* Licensed photos reused from other pages (Pexels) ----------------- */

  // Home's photo for the lung specialty tile. #diagnosis.
  chestXray: {
    file: "specialty-lung.jpg",
    src: "/images/home/specialty-lung.jpg",
    pexelsId: 7579819,
    alt: "Doctor reviewing a chest X-ray of the lungs",
    credit: { photographer: "cottonbro studio", url: pexels(7579819) },
    focal: "55% 35%",
    width: 2000,
    height: 1333,
  },
  // The colorectal page's photo. #techniques → VATS (keyhole surgery).
  keyhole: {
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

  // #hero / #surgery: calm, easy breathing. Source of og.jpg.
  // The thyroid page's photo, for the pathway's Symptoms step.
  cough: {
    file: "cough.jpg",
    src: "/images/thyroid-cancer/cough.jpg",
    pexelsId: 8817795,
    alt: "Man in glasses covering a cough with his hand",
    credit: { photographer: "Towfiqu Barbhuiya", url: pexels(8817795) },
    focal: "50% 35%",
    width: 2000,
    height: 1334,
  },
  breathingCalm: {
    file: "breathing-calm.jpg",
    src: `${BASE}/breathing-calm.jpg`,
    pexelsId: 26382826,
    alt: "Woman breathing calmly with a hand on her chest, seated on a bench in a misty pine forest",
    credit: { photographer: "Chirayu Vyas", url: pexels(26382826) },
    focal: "50% 60%",
    width: 1333,
    height: 2000,
  },
  // #pathway: Biopsy / PET-CT.
  xrayReview: {
    file: "xray-review.jpg",
    src: `${BASE}/xray-review.jpg`,
    pexelsId: 7579828,
    alt: "Doctor holding a chest X-ray up to the light",
    credit: { photographer: "cottonbro studio", url: pexels(7579828) },
    focal: "50% 35%",
    width: 1333,
    height: 2000,
  },
  // #pathway: Planning.
  consultation: {
    file: "consultation.jpg",
    src: `${BASE}/consultation.jpg`,
    pexelsId: 7579820,
    alt: "Doctor going through a chest X-ray with a patient",
    credit: { photographer: "cottonbro studio", url: pexels(7579820) },
    focal: "45% 40%",
    width: 2000,
    height: 1333,
  },
  // #stage-iv / #survival: hope.
  seniorSmile: {
    file: "senior-smile.jpg",
    src: `${BASE}/senior-smile.jpg`,
    pexelsId: 19424220,
    alt: "Older man in a checked headscarf smiling warmly outdoors",
    credit: { photographer: "Vikesh zen", url: pexels(19424220) },
    focal: "50% 35%",
    width: 1500,
    height: 2000,
  },
  // Decorative: the dawn sky behind #stage-iv or the final band.
  dawnBreath: {
    file: "dawn-breath.jpg",
    src: `${BASE}/dawn-breath.jpg`,
    pexelsId: 1051838,
    alt: "",
    decorative: true,
    credit: { photographer: "Prasanth Inturi", url: pexels(1051838) },
    focal: "50% 55%",
    width: 2000,
    height: 1199,
  },
  // Decorative: clear sky texture for the "clean air" bands.
  clearSky: {
    file: "clear-sky.jpg",
    src: `${BASE}/clear-sky.jpg`,
    pexelsId: 912110,
    alt: "",
    decorative: true,
    credit: { photographer: "Elia Clerici", url: pexels(912110) },
    focal: "50% 50%",
    width: 2000,
    height: 1333,
  },
} as const satisfies Record<string, PageImage>;

export type LungImageKey = keyof typeof lungImages;

/** Social share image, generated from breathing-calm.jpg by the image script. */
export const lungOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
