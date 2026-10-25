/**
 * Image manifest for /book-your-appoinment-page/ (Book Appointment).
 *
 * New stock photos live in public/images/book-appointment/ and are produced by
 * `npm run images book` (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this file).
 * Own photos reused from other folders (portrait, clinics) have no `pexelsId`: the script only
 * checks that they exist. `width` / `height` are the real pixel sizes on disk (stock: 2000px long
 * edge). `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/book-appointment";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const bookImages = {
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

  /* New stock photos (2) --------------------------------------------- */

  // #how-it-works: a calm, smiling first consultation.
  consultationDesk: {
    file: "consultation-desk.jpg",
    src: `${BASE}/consultation-desk.jpg`,
    pexelsId: 7579831,
    alt: "Smiling doctor talking with a patient across her desk",
    credit: { photographer: "cottonbro studio", url: pexels(7579831) },
    focal: "45% 45%",
    width: 2000,
    height: 1333,
  },
  // #final-cta and the og.jpg. Faceless (hands and the report only), so it never stands in for Dr. Sunil.
  consultationReport: {
    file: "consultation-report.jpg",
    src: `${BASE}/consultation-report.jpg`,
    pexelsId: 39192334,
    alt: "A doctor going through a medical report with a patient at the desk",
    credit: { photographer: "Vitaly Gariev", url: pexels(39192334) },
    focal: "60% 55%",
    width: 2000,
    height: 1125,
  },
} as const satisfies Record<string, PageImage>;

export type BookImageKey = keyof typeof bookImages;

/** Social share image: the logo and the report photo on the care theme's ivory, made by `npm run images book`. */
export const bookOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
