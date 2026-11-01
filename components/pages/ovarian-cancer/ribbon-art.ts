/**
 * The ovarian hero's line art (viewBox 520 × 600). One teal line: it starts as an awareness
 * ribbon (a tail and a loop, bottom left), climbs the left side, curls into the left ovary, rises
 * along the left tube to the top of the uterus, crosses it, runs down the right tube, curls into
 * the right ovary and descends the right side. The arch-framed portrait sits under the crown.
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

/** The arch the portrait sits in (its outline draws, then the photo rises behind a cover). */
const ARCH = { x: 140, y: 120, width: 240, height: 460 } as const;
export const ARCH_PATH = `M${ARCH.x} ${ARCH.y + ARCH.height} V${ARCH.y + ARCH.width / 2} A${ARCH.width / 2} ${ARCH.width / 2} 0 0 1 ${ARCH.x + ARCH.width} ${ARCH.y + ARCH.width / 2} V${ARCH.y + ARCH.height}`;

/** Five seeds around the line: [cx, cy, r]. They pop in, then float. */
export const SEEDS = [
  [104, 176, 6],
  [416, 176, 6],
  [52, 318, 4.5],
  [474, 296, 4.5],
  [260, 26, 4.5],
] as const;

/** The arch as percentages of the box, for the HTML portrait layered over the SVG. */
export const archBox = {
  left: `${(ARCH.x / RIBBON_BOX.width) * 100}%`,
  top: `${(ARCH.y / RIBBON_BOX.height) * 100}%`,
  width: `${(ARCH.width / RIBBON_BOX.width) * 100}%`,
  height: `${(ARCH.height / RIBBON_BOX.height) * 100}%`,
};
