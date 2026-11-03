/**
 * The ovarian hero's line art (viewBox 520 × 600). One teal line: it starts as an awareness
 * ribbon (a tail and a loop, bottom left), climbs the left side, curls into the left ovary, rises
 * along the left tube to the top of the uterus, crosses it, runs down the right tube, curls into
 * the right ovary and descends the right side. Inside it, the treatment story (below).
 * Stylised, not anatomical.
 */
export const RIBBON_BOX = { width: 520, height: 600 } as const;

export const RIBBON_PATH = [
  "M132 590",
  // the ribbon: tail, loop
  "C112 548 74 506 76 460",
  "C78 418 120 400 136 428",
  "C150 452 128 482 102 470",
  "C78 458 70 420 78 380",
  // up the left side
  "C88 320 64 260 70 214",
  // the left ovary
  "C74 180 92 160 110 158",
  "C132 156 140 180 124 192",
  "C108 204 86 190 92 170",
  // the left tube, the top of the uterus, the right tube
  "C100 146 150 120 196 104",
  "C214 98 218 70 240 56",
  "C254 46 266 46 280 56",
  "C302 70 306 98 324 104",
  "C370 120 420 146 428 170",
  // the right ovary
  "C434 190 412 204 396 192",
  "C380 180 388 156 410 158",
  // down the right side
  "C428 160 446 180 450 214",
  "C456 260 432 320 442 380",
  "C450 430 470 470 476 520",
].join(" ");

/*
 * The treatment story inside the ribbon (HeroStory). Stylised, not anatomical.
 * The uterus hangs from the two tubes where the ribbon crosses them (196,104 and 324,104).
 */
export const UTERUS_PATH = "M196 104 C200 190 226 262 260 270 C294 262 320 190 324 104";
export const CANAL_PATH = "M260 270 C258 292 262 312 260 334";

/** Centres of the ribbon's two ovary curls. */
export const OVARIES = [
  [108, 176],
  [412, 176],
] as const;

/** Tumour deposits on the left ovary [cx, cy, r]: they appear, then are removed one by one. */
export const TUMOURS = [
  [84, 150, 7],
  [132, 148, 6],
  [142, 186, 8],
  [88, 206, 6],
  [120, 216, 7],
  [70, 180, 5],
] as const;

/** The precision ring that finds them (a circle drawn as a path, so it can draw). */
const RING = { cx: 108, cy: 180, r: 58 } as const;
export const RING_PATH = `M${RING.cx} ${RING.cy - RING.r} a${RING.r} ${RING.r} 0 1 1 0 ${RING.r * 2} a${RING.r} ${RING.r} 0 1 1 0 ${-RING.r * 2}`;

/** HIPEC: three warm waves across the lower abdomen. */
const wave = (y: number, amp: number) => {
  const x0 = 150;
  const step = 55;
  let d = `M${x0} ${y}`;
  for (let i = 0; i < 4; i++) {
    const x = x0 + i * step;
    d += ` C${x + step * 0.35} ${y - amp} ${x + step * 0.65} ${y + amp} ${x + step} ${y}`;
  }
  return d;
};
export const WAVES = [wave(400, 14), wave(436, 12), wave(472, 10)] as const;

/** Recovery: a check in a circle at the centre of the uterus. */
export const CHECK_CIRCLE = { cx: 260, cy: 186, r: 32 } as const;
export const CHECK_PATH = "M245 187 l10 10 l21 -22";

/** Five seeds around the line: [cx, cy, r]. They pop in, then float. */
export const SEEDS = [
  [104, 176, 6],
  [416, 176, 6],
  [52, 318, 4.5],
  [474, 296, 4.5],
  [260, 26, 4.5],
] as const;
