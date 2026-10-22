/**
 * Image manifest for / (Home).
 *
 * New stock photos live in public/images/home/ and are produced by `npm run images home`
 * (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this file). Own photos reused
 * from other folders (portrait, robotic, clinics) have no `pexelsId`: the script only checks
 * that they exist. `width` / `height` are the real pixel sizes on disk (stock: 2000px long edge).
 * `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/home";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const homeImages = {
  /* Own photos, reused ---------------------------------------------- */

  // Transparent PNG: sits on the theme's portrait backdrop (components/shared/DoctorPortrait).
  doctor: {
    file: "dr-sunil-navalgund.png",
    src: "/images/brand/dr-sunil-navalgund.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 20%",
    width: 886,
    height: 1024,
  },
  // Black-background shots: on navy they blend away with `blend-on-dark`.
  roboticSystem: {
    file: "davinci-system-black.jpg",
    src: "/images/robotic/davinci-system-black.jpg",
    alt: "The complete da Vinci system: vision cart, patient cart and surgeon console",
    focal: "50% 50%",
    width: 2400,
    height: 1600,
  },
  roboticArms: {
    file: "davinci-arms-black.jpg",
    src: "/images/robotic/davinci-arms-black.jpg",
    alt: "Close-up of the four numbered robotic arms converging on the surgical field",
    focal: "60% 60%",
    width: 1200,
    height: 839,
  },
  roboticInstruments: {
    file: "davinci-x-instruments-black.jpg",
    src: "/images/robotic/davinci-x-instruments-black.jpg",
    alt: "da Vinci robotic arms fitted with surgical instruments and a 3D camera",
    focal: "50% 55%",
    width: 1717,
    height: 2576,
  },
  clinicSouthEnd: {
    file: "south-end-clinics.webp",
    src: "/images/locations/south-end-clinics.webp",
    alt: "South End Clinics, Jayanagar",
    focal: "50% 50%",
    width: 512,
    height: 294,
  },
  clinicSparsh: {
    file: "sparsh-hospital.webp",
    src: "/images/locations/sparsh-hospital.webp",
    alt: "SPARSH Hospital, RR Nagar",
    focal: "50% 50%",
    width: 512,
    height: 335,
  },
  clinicJoshis: {
    file: "joshis-clinic.webp",
    src: "/images/locations/joshis-clinic.webp",
    alt: "Joshis Clinic, Sahakara Nagar",
    focal: "50% 50%",
    width: 1024,
    height: 655,
  },

  /* Specialties: Breast reuses the breast page's licensed photo; five new stock photos ---- */

  specialtyBreast: {
    file: "ribbon-hands.jpg",
    src: "/images/breast-cancer/ribbon-hands.jpg",
    pexelsId: 8385468,
    alt: "Hands holding a pink breast cancer awareness ribbon",
    credit: { photographer: "Tara Winstead", url: pexels(8385468) },
    focal: "50% 50%",
    width: 2000,
    height: 1333,
  },
  specialtyColorectal: {
    file: "specialty-colorectal.jpg",
    src: `${BASE}/specialty-colorectal.jpg`,
    pexelsId: 39192354,
    alt: "Senior man in a consultation with his doctor",
    credit: { photographer: "Vitaly Gariev", url: pexels(39192354) },
    focal: "45% 45%",
    width: 2000,
    height: 1125,
  },
  specialtyEndometrial: {
    file: "specialty-endometrial.jpg",
    src: `${BASE}/specialty-endometrial.jpg`,
    pexelsId: 7108415,
    alt: "Doctor performing an abdominal ultrasound scan on a woman",
    credit: { photographer: "Pavel Danilyuk", url: pexels(7108415) },
    focal: "50% 50%",
    width: 2000,
    height: 1335,
  },
  specialtyLung: {
    file: "specialty-lung.jpg",
    src: `${BASE}/specialty-lung.jpg`,
    pexelsId: 7579819,
    alt: "Doctor reviewing a chest X-ray of the lungs",
    credit: { photographer: "cottonbro studio", url: pexels(7579819) },
    focal: "55% 35%",
    width: 2000,
    height: 1333,
  },
  specialtyThyroid: {
    file: "specialty-thyroid.jpg",
    src: `${BASE}/specialty-thyroid.jpg`,
    pexelsId: 3985305,
    alt: "Doctor examining a smiling woman's neck",
    credit: { photographer: "Gustavo Fring", url: pexels(3985305) },
    focal: "55% 35%",
    width: 2000,
    height: 1333,
  },
  specialtyOvarian: {
    file: "specialty-ovarian.jpg",
    src: `${BASE}/specialty-ovarian.jpg`,
    pexelsId: 39192333,
    alt: "Doctor in a consultation with a woman patient",
    credit: { photographer: "Vitaly Gariev", url: pexels(39192333) },
    focal: "60% 40%",
    width: 2000,
    height: 1125,
  },

  /* Final call band ----------------------------------------------- */

  finalCouple: {
    file: "final-couple.jpg",
    src: `${BASE}/final-couple.jpg`,
    pexelsId: 19811308,
    alt: "Smiling elderly couple outdoors, holding a flower",
    credit: { photographer: "Ekam Juneja", url: pexels(19811308) },
    focal: "50% 30%",
    width: 1674,
    height: 2000,
  },
} as const satisfies Record<string, PageImage>;

export type HomeImageKey = keyof typeof homeImages;

/** Social share image: the portrait and the logo on the hero navy, made by `npm run images home`. */
export const homeOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
