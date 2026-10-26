/**
 * Image manifest for /colon-cancer-treatment-bangalore/ (Colorectal Cancer).
 *
 * New stock photos live in public/images/colorectal-cancer/ and are produced by
 * `npm run images colorectal` (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this
 * file). Photos reused from other folders (portrait, robotic, Home's licensed specialty photo) are
 * only checked, never downloaded again. `width` / `height` are the real pixel sizes on disk
 * (stock: 2000px long edge). `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/colorectal-cancer";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const colorectalImages = {
  /* Own photos, reused ---------------------------------------------- */

  doctor: {
    file: "dr-sunil-navalgund.png",
    src: "/images/brand/dr-sunil-navalgund.png",
    alt: "Dr. Sunil Navalgund, Surgical Oncologist",
    focal: "50% 20%",
    width: 886,
    height: 1024,
  },
  // Minimally Invasive Excellence → Robotic Surgery. Black background: blends away on the blue bands.
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
    alt: "The wristed instruments of the da Vinci robotic system",
    focal: "50% 40%",
    width: 1717,
    height: 2576,
  },
  // Home's licensed photo for the colorectal specialty tile (Pexels).
  anatomyModel: {
    file: "specialty-colorectal-model.jpg",
    src: "/images/home/specialty-colorectal-model.jpg",
    pexelsId: 8471918,
    alt: "Anatomical model of the abdomen showing the intestines",
    credit: { photographer: "MART PRODUCTION", url: pexels(8471918) },
    focal: "80% 55%",
    width: 2000,
    height: 1333,
  },
  // #path, PET-CT step: the breast page's licensed photo (Pexels).
  imagingScan: {
    file: "imaging-scan.jpg",
    src: "/images/breast-cancer/imaging-scan.jpg",
    pexelsId: 15277954,
    alt: "Patient being prepared for an advanced imaging scan",
    credit: { photographer: "Charlss GonzHu", url: pexels(15277954) },
    focal: "60% 50%",
    width: 2000,
    height: 1333,
  },
  // #path, Staging step: the booking page's licensed photo (Pexels).
  consultationReport: {
    file: "consultation-report.jpg",
    src: "/images/book-appointment/consultation-report.jpg",
    pexelsId: 39192334,
    alt: "A doctor going through a medical report with a patient at the desk",
    credit: { photographer: "Vitaly Gariev", url: pexels(39192334) },
    focal: "60% 55%",
    width: 2000,
    height: 1125,
  },

  /* New stock photos ------------------------------------------------- */

  consultation: {
    file: "consultation.jpg",
    src: `${BASE}/consultation.jpg`,
    pexelsId: 39192358,
    alt: "Doctor talking a senior patient through his treatment plan",
    credit: { photographer: "Vitaly Gariev", url: pexels(39192358) },
    focal: "50% 40%",
    width: 2000,
    height: 1125,
  },
  laparoscopy: {
    file: "laparoscopy.jpg",
    src: `${BASE}/laparoscopy.jpg`,
    pexelsId: 26212702,
    alt: "Surgical team performing keyhole surgery, the camera view on the monitor",
    credit: { photographer: "shirin olyaei", url: pexels(26212702) },
    focal: "50% 50%",
    width: 2000,
    height: 1333,
  },
  recoveryWalk: {
    file: "recovery-walk.jpg",
    src: `${BASE}/recovery-walk.jpg`,
    pexelsId: 12013184,
    alt: "Senior couple walking together on a park path",
    credit: { photographer: "Radik 2707", url: pexels(12013184) },
    focal: "55% 55%",
    width: 2000,
    height: 1333,
  },
  hopeSmile: {
    file: "hope-smile.jpg",
    src: `${BASE}/hope-smile.jpg`,
    pexelsId: 16447736,
    alt: "Smiling senior man outdoors",
    credit: { photographer: "Lisa and everlast jorney", url: pexels(16447736) },
    focal: "50% 30%",
    width: 2000,
    height: 1663,
  },
} as const satisfies Record<string, PageImage>;

export type ColorectalImageKey = keyof typeof colorectalImages;

/** Social share image, generated from consultation.jpg by the image script. */
export const colorectalOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
