/**
 * Image manifest for /ovarian-cancer-hospital/ (Ovarian Cancer).
 *
 * New stock photos live in public/images/ovarian-cancer/ and are produced by `npm run images ovarian`
 * (scripts/fetch-images.mjs reads `file`, `src` + `pexelsId` from this file). Photos reused from other
 * folders (portrait, Home's licensed specialty photo, the endometrial and colorectal photos) are only
 * checked, never downloaded again. `width` / `height` are the real pixel sizes on disk (stock: 2000px
 * long edge). `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * SOURCE: NEW (alt text). Stock photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/ovarian-cancer";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const ovarianImages = {
  // #hero: AI-generated (Higgsfield, gpt_image_2_5), the client review, 4 Nov 2026. Transparent; cropped
  // to the uterus, tubes and ovaries, its lower edge faded. PENDING DOCTOR: check the anatomy.
  heroOvaries: {
    file: "hero-ovaries.webp",
    src: `${BASE}/hero-ovaries.webp`,
    alt: "3D illustration of the uterus, fallopian tubes and both ovaries",
    focal: "50% 50%",
    width: 1400,
    height: 735,
  },
  // #final-cta: AI-generated (Higgsfield, gpt_image_2_5), the client review, 4 Nov 2026. Not real patients.
  finalFriends: {
    file: "final-friends.jpg",
    src: `${BASE}/final-friends.jpg`,
    alt: "Two women friends laughing together on a garden bench",
    focal: "75% 25%",
    width: 2000,
    height: 1131,
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

  /* Licensed photos reused from other pages (Pexels) ----------------- */

  // Home's photo for the ovarian specialty tile. #understanding.
  anatomy: {
    file: "specialty-ovarian-diagram.jpg",
    src: "/images/home/specialty-ovarian-diagram.jpg",
    pexelsId: 7467100,
    alt: "Illustration of the female reproductive system: the uterus and both ovaries",
    credit: { photographer: "Nadezhda Moryak", url: pexels(7467100) },
    focal: "50% 50%",
    width: 2000,
    height: 1333,
  },
  // The endometrial page's photo. #diagnostics / #second-opinion.
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
  // The colorectal page's photo. #treatments → Chemotherapy.
  infusion: {
    file: "infusion.jpg",
    src: "/images/colorectal-cancer/infusion.jpg",
    pexelsId: 6129691,
    alt: "A nurse adjusting an IV infusion beside a patient monitor",
    credit: { photographer: "RDNE Stock project", url: pexels(6129691) },
    focal: "50% 40%",
    width: 2000,
    height: 1333,
  },

  /* New stock photos ------------------------------------------------- */

  // #hero or the final band: support, friendship (one wears teal). Source of og.jpg.
  friendsLaughing: {
    file: "friends-laughing.jpg",
    src: `${BASE}/friends-laughing.jpg`,
    pexelsId: 7920193,
    alt: "Two women in sarees laughing together",
    credit: { photographer: "Sakshi Patwa", url: pexels(7920193) },
    focal: "50% 30%",
    width: 1333,
    height: 2000,
  },
  // #warning-signs: a calm, attentive moment.
  womanCalm: {
    file: "woman-calm.jpg",
    src: `${BASE}/woman-calm.jpg`,
    pexelsId: 20158866,
    alt: "Woman in a yellow saree sitting calmly by a stone wall",
    credit: { photographer: "Karan Mridha", url: pexels(20158866) },
    focal: "50% 35%",
    width: 1600,
    height: 2000,
  },
  // #outcomes: hope.
  womanSmiling: {
    file: "woman-smiling.jpg",
    src: `${BASE}/woman-smiling.jpg`,
    pexelsId: 5469670,
    alt: "Smiling woman in a printed sari standing by a wooden doorway",
    credit: { photographer: "Mehmet Turgut Kirkgoz", url: pexels(5469670) },
    focal: "40% 40%",
    width: 2000,
    height: 1333,
  },
  // #treatments → Fertility Preservation.
  youngFamily: {
    file: "young-family.jpg",
    src: `${BASE}/young-family.jpg`,
    pexelsId: 30012175,
    alt: "Young couple smiling at their newborn",
    credit: { photographer: "Dream_ maKkerzz", url: pexels(30012175) },
    focal: "50% 35%",
    width: 1333,
    height: 2000,
  },
  /* #warning-signs card photos (NEW, Pexels) ---------------------------- */

  // The endometrial page's photo, for "Pelvic pain".
  pelvicPain: {
    file: "abdominal-pain.jpg",
    src: "/images/endometrial-cancer/abdominal-pain.jpg",
    pexelsId: 5938365,
    alt: "Woman lying on a sofa, holding her lower abdomen in discomfort",
    credit: { photographer: "Sora Shimazaki", url: pexels(5938365) },
    focal: "75% 40%",
    width: 2000,
    height: 1333,
  },
  bloating: {
    file: "bloating.jpg",
    src: `${BASE}/bloating.jpg`,
    pexelsId: 7298911,
    alt: "A woman's hands resting on her stomach",
    credit: { photographer: "Kindel Media", url: pexels(7298911) },
    focal: "50% 50%",
    width: 2000,
    height: 1127,
  },
  fullQuickly: {
    file: "full-quickly.jpg",
    src: `${BASE}/full-quickly.jpg`,
    pexelsId: 7272617,
    alt: "Woman at a table who has lost interest in her bowl of soup",
    credit: { photographer: "Pexels", url: pexels(7272617) },
    focal: "55% 45%",
    width: 2000,
    height: 1333,
  },
  restroom: {
    file: "restroom.jpg",
    src: `${BASE}/restroom.jpg`,
    pexelsId: 5341491,
    alt: "Round restroom sign on a wooden door",
    credit: { photographer: "Pexels", url: pexels(5341491) },
    focal: "78% 50%",
    width: 2000,
    height: 1333,
  },
} as const satisfies Record<string, PageImage>;

export type OvarianImageKey = keyof typeof ovarianImages;

/** Social share image, generated from friends-laughing.jpg by the image script. */
export const ovarianOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
