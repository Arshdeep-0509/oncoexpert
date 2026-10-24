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
  // Surgical Expertise → Robotic Surgery card. Black background: blends away on navy.
  roboticArms: {
    file: "davinci-arms-black.jpg",
    src: "/images/robotic/davinci-arms-black.jpg",
    alt: "Close-up of the four numbered robotic arms converging on the surgical field",
    focal: "60% 60%",
    width: 1200,
    height: 839,
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
