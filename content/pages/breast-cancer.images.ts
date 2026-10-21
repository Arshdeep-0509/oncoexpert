/**
 * Image manifest for /breast-cancer-treatment-bangalore/.
 *
 * Files live in public/images/breast-cancer/ and are produced by `npm run images`
 * (scripts/fetch-images.mjs reads `file` + `pexelsId` from this file).
 * `width` / `height` are the real pixel sizes on disk after resizing (2000px long edge).
 * `focal` is the CSS object-position used whenever the photo is cropped.
 *
 * SOURCE: NEW (alt text). All photos: Pexels licence, credit kept for reference.
 */
import type { PageImage } from "@/content/types";

const BASE = "/images/breast-cancer";

const pexels = (id: number) => `https://www.pexels.com/photo/${id}/`;

export const breastImages = {
  heroWoman1: {
    file: "hero-woman-1.jpg",
    src: `${BASE}/hero-woman-1.jpg`,
    pexelsId: 29480426,
    alt: "Smiling woman in a pink saree",
    credit: { photographer: "Monojit Dutta", url: pexels(29480426) },
    focal: "50% 30%",
    width: 1333,
    height: 2000,
  },
  heroWoman2: {
    file: "hero-woman-2.jpg",
    src: `${BASE}/hero-woman-2.jpg`,
    pexelsId: 15984371,
    alt: "Confident middle-aged woman smiling",
    credit: { photographer: "R.O.Y", url: pexels(15984371) },
    focal: "50% 25%",
    width: 1333,
    height: 2000,
  },
  heroWoman3: {
    file: "hero-woman-3.jpg",
    src: `${BASE}/hero-woman-3.jpg`,
    pexelsId: 36483814,
    alt: "Smiling woman in a traditional sari",
    credit: { photographer: "Capture Point", url: pexels(36483814) },
    focal: "50% 30%",
    width: 1333,
    height: 2000,
  },
  consultation: {
    file: "consultation.jpg",
    src: `${BASE}/consultation.jpg`,
    pexelsId: 7659876,
    alt: "Doctor discussing a treatment plan with a patient",
    credit: { photographer: "Thirdman", url: pexels(7659876) },
    focal: "50% 50%",
    width: 1333,
    height: 2000,
  },
  ribbonHands: {
    file: "ribbon-hands.jpg",
    src: `${BASE}/ribbon-hands.jpg`,
    pexelsId: 8385468,
    alt: "Hands holding a pink breast cancer awareness ribbon",
    credit: { photographer: "Tara Winstead", url: pexels(8385468) },
    focal: "50% 50%",
    width: 2000,
    height: 1333,
  },
  ribbonMinimal: {
    file: "ribbon-minimal.jpg",
    src: `${BASE}/ribbon-minimal.jpg`,
    pexelsId: 3900426,
    alt: "Pink awareness ribbon on a soft pink background",
    credit: { photographer: "Anna Shvets", url: pexels(3900426) },
    focal: "30% 50%",
    width: 2000,
    height: 1333,
  },
  planningCalendar: {
    file: "planning-calendar.jpg",
    src: `${BASE}/planning-calendar.jpg`,
    pexelsId: 7805673,
    alt: "Calendar and pen beside a pink ribbon",
    credit: { photographer: "Leeloo The First", url: pexels(7805673) },
    focal: "50% 50%",
    width: 2000,
    height: 1335,
  },
  imagingScan: {
    file: "imaging-scan.jpg",
    src: `${BASE}/imaging-scan.jpg`,
    pexelsId: 15277954,
    alt: "Patient being prepared for an advanced imaging scan",
    credit: { photographer: "Charlss GonzHu", url: pexels(15277954) },
    focal: "60% 50%",
    width: 2000,
    height: 1333,
  },
  pathologyLab: {
    file: "pathology-lab.jpg",
    src: `${BASE}/pathology-lab.jpg`,
    pexelsId: 9574398,
    alt: "Pathologist examining a sample under a microscope",
    credit: { photographer: "Tima Miroshnichenko", url: pexels(9574398) },
    focal: "40% 40%",
    width: 2000,
    height: 1333,
  },
  surgeryTeam: {
    file: "surgery-team.jpg",
    src: `${BASE}/surgery-team.jpg`,
    pexelsId: 2324837,
    alt: "Surgical team at work in the operating theatre",
    credit: { photographer: "Pavel Sorokin", url: pexels(2324837) },
    focal: "30% 40%",
    width: 2000,
    height: 1333,
  },
  survivorsGroup: {
    file: "survivors-group.jpg",
    src: `${BASE}/survivors-group.jpg`,
    pexelsId: 33958774,
    alt: "Women of three generations together",
    credit: { photographer: "Ashish Keshkar", url: pexels(33958774) },
    focal: "50% 55%",
    width: 1333,
    height: 2000,
  },
  joyFlowers: {
    file: "joy-flowers.jpg",
    src: `${BASE}/joy-flowers.jpg`,
    pexelsId: 36294597,
    alt: "Woman laughing among pink flowers",
    credit: { photographer: "Souhityo Das", url: pexels(36294597) },
    focal: "40% 30%",
    width: 1333,
    height: 2000,
  },
  recoveryFamily: {
    file: "recovery-family.jpg",
    src: `${BASE}/recovery-family.jpg`,
    pexelsId: 34607627,
    alt: "Mother and daughter smiling together",
    credit: { photographer: "Michael Takahashi", url: pexels(34607627) },
    focal: "50% 35%",
    width: 1125,
    height: 2000,
  },
  recoveryWalk: {
    file: "recovery-walk.jpg",
    src: `${BASE}/recovery-walk.jpg`,
    pexelsId: 32648375,
    alt: "Woman on a morning walk in a park",
    credit: { photographer: "David Kanigan", url: pexels(32648375) },
    focal: "50% 50%",
    width: 2000,
    height: 1333,
  },
  petalsTexture: {
    file: "petals-texture.jpg",
    src: `${BASE}/petals-texture.jpg`,
    pexelsId: 4622764,
    // Decorative: render with alt="" and aria-hidden.
    alt: "",
    decorative: true,
    credit: { photographer: "Kaboompics", url: pexels(4622764) },
    focal: "50% 50%",
    width: 1333,
    height: 2000,
  },
} as const satisfies Record<string, PageImage>;

export type BreastImageKey = keyof typeof breastImages;

/** Social share image, generated from ribbon-minimal.jpg by the image script. */
export const breastOgImage = { src: `${BASE}/og.jpg`, width: 1200, height: 630 } as const;
