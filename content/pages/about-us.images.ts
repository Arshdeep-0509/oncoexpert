/**
 * Image manifest for /about-us/ (About Us).
 *
 * New stock photos live in public/images/about-us/ and are produced by `npm run images about`
 * (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this file). Own photos reused
 * from other folders (portrait, robotic, clinics) have no `pexelsId`: the script only checks that
 * they exist. `width` / `height` are the real pixel sizes on disk (stock: 2000px long edge).
 * `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/about-us";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const aboutImages = {
  /* Own photos, reused ---------------------------------------------- */

  // The live page shows this portrait twice (hero card and the "10+" block).
  doctor: {
    file: "dr-sunil-navalgund.png",
    src: "/images/brand/dr-sunil-navalgund.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 20%",
    width: 886,
    height: 1024,
  },
  // The head cut out of the same photo (as on Home), so it breaks out of the hero's ring
  // (DoctorRing). Decorative: the portrait above carries the alt.
  doctorHead: {
    file: "dr-sunil-navalgund-head.png",
    src: "/images/brand/dr-sunil-navalgund-head.png",
    alt: "",
    decorative: true,
    focal: "50% 0%",
    width: 886,
    height: 410,
  },
  // Surgical Expertise → Robotic Surgery card. Black background: blends away on navy.
  roboticArms: {
    file: "davinci-arms-black.jpg",
    src: "/images/robotic/davinci-arms-black.jpg",
    alt: "Close-up of the four numbered robotic arms converging on the surgical field",
    focal: "60% 60%",
    width: 1200,
    height: 839,
  },
  // Surgical Expertise → Breast Cancer tile: the breast page's licensed photo (Home reuses it too).
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
  /* GI and Uro-Oncology tiles (Surgical Expertise) ------------------------------------------- */

  // GI Oncology: the stomach and intestines on an anatomical model (Home's Colorectal photo, reused).
  expertiseGi: {
    file: "specialty-colorectal-model.jpg",
    src: "/images/home/specialty-colorectal-model.jpg",
    pexelsId: 8471918,
    alt: "Anatomical model of the abdomen showing the stomach and intestines",
    credit: { photographer: "MART PRODUCTION", url: pexels(8471918) },
    focal: "50% 60%",
    width: 2000,
    height: 1333,
  },
  // Uro-Oncology: a pair of kidney models with their ureters, in the middle of the photo.
  expertiseUro: {
    file: "uro-oncology-kidneys.jpg",
    src: `${BASE}/uro-oncology-kidneys.jpg`,
    pexelsId: 7269618,
    alt: "Anatomical models of a pair of kidneys with their ureters, among other organ models",
    credit: { photographer: "Kaboompics", url: pexels(7269618) },
    focal: "45% 78%",
    width: 2000,
    height: 1333,
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

  /* New stock photo (1) ---------------------------------------------- */

  // #final-cta. Cropped to the hands (focal), so it never stands in for Dr. Sunil.
  careHands: {
    file: "care-hands.jpg",
    src: `${BASE}/care-hands.jpg`,
    pexelsId: 7578798,
    alt: "A doctor with a clipboard listening to a patient across the consultation table",
    credit: { photographer: "cottonbro studio", url: pexels(7578798) },
    focal: "50% 60%",
    width: 1333,
    height: 2000,
  },
} as const satisfies Record<string, PageImage>;

export type AboutImageKey = keyof typeof aboutImages;

/** Social share image: the portrait and the logo on the care theme's ivory, made by `npm run images about`. */
export const aboutOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
