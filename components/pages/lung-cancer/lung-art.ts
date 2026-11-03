/**
 * The hero's line art (viewBox 400 × 400): a pair of lungs drawn as one bronchial tree. The
 * trachea, then three waves of branches (main bronchi, lobar, segmental twigs), then the outline of
 * both lungs, then the alveoli at the twig tips. Computed once at module load (no randomness), so
 * server and client render the same markup.
 * The patient's right lung (viewer's left) has three lobes; the left lung two, with the cardiac
 * notch on its inner edge.
 */

type Point = readonly [number, number];

export const ART_BOX = 400;
/** The carina: where the trachea divides. Alveoli pop in by their distance from it. */
const CARINA: Point = [200, 132];

/** A gently bowed branch from `a` to `b` (quadratic curve, control point off the chord). */
function twig(a: Point, b: Point, bow = 0.14) {
  const [x0, y0] = a;
  const [x1, y1] = b;
  const mx = (x0 + x1) / 2 - (y1 - y0) * bow;
  const my = (y0 + y1) / 2 + (x1 - x0) * bow;
  return `M${x0} ${y0} Q${mx.toFixed(1)} ${my.toFixed(1)} ${x1} ${y1}`;
}

export const TRACHEA = `M200 28 C200 62 200 100 ${CARINA[0]} ${CARINA[1]}`;

const R_MAIN: Point = [146, 176];
const L_MAIN: Point = [262, 172];
const R_UP: Point = [116, 128];
const R_MID: Point = [102, 214];
const R_LOW: Point = [132, 270];
const L_UP: Point = [288, 126];
const L_LOW: Point = [276, 272];

/** The three waves of branches, drawn one after another. */
export const BRANCH_WAVES: readonly (readonly string[])[] = [
  [`M200 132 C188 150 168 162 ${R_MAIN[0]} ${R_MAIN[1]}`, `M200 132 C214 148 238 160 ${L_MAIN[0]} ${L_MAIN[1]}`],
  [
    twig(R_MAIN, R_UP, -0.12),
    twig(R_MAIN, R_MID, 0.08),
    twig(R_MAIN, R_LOW, 0.06),
    twig(L_MAIN, L_UP, 0.12),
    twig(L_MAIN, L_LOW, -0.06),
  ],
  [],
];

/** The segmental twigs: [from, to]. Their tips carry the alveoli. */
const TWIGS: readonly (readonly [Point, Point])[] = [
  [R_UP, [100, 106]],
  [R_UP, [130, 102]],
  [R_MID, [80, 204]],
  [R_MID, [90, 238]],
  [
    [139, 228],
    [112, 246],
  ],
  [R_LOW, [106, 292]],
  [R_LOW, [126, 310]],
  [R_LOW, [152, 302]],
  [L_UP, [306, 104]],
  [L_UP, [274, 102]],
  [
    [283, 146],
    [310, 156],
  ],
  [
    [270, 222],
    [300, 236],
  ],
  [L_LOW, [302, 292]],
  [L_LOW, [278, 312]],
  [L_LOW, [252, 300]],
];
(BRANCH_WAVES[2] as string[]).push(...TWIGS.map(([a, b], i) => twig(a, b, i % 2 ? 0.16 : -0.16)));

/** Both lungs' outlines. */
export const OUTLINES = [
  "M176 118 C150 104 112 124 92 174 C74 220 66 282 76 324 C84 356 120 360 152 346 C174 336 184 312 184 282 C184 236 186 160 176 118 Z",
  "M224 118 C250 104 288 124 308 174 C326 220 334 282 324 324 C316 356 282 360 252 348 C238 342 236 326 246 314 C230 306 218 288 218 262 C218 220 214 160 224 118 Z",
] as const;

/** Offsets of the alveoli around each twig tip (a small cluster of three). */
const CLUSTER: readonly (readonly [number, number, number])[] = [
  [-7, -6, 5],
  [7, -5, 4.2],
  [0, 8, 4.6],
];

export type Alveolus = { cx: number; cy: number; r: number; /** 0–1: distance from the carina */ t: number };

const dist = ([x, y]: Point) => Math.hypot(x - CARINA[0], y - CARINA[1]);

/** ~40 alveoli (15 tips × 3, the five nearest the carina dropped), nearest first. */
export const ALVEOLI: readonly Alveolus[] = (() => {
  const all = TWIGS.flatMap(([, [x, y]]) =>
    CLUSTER.map(([dx, dy, r]) => ({ cx: x + dx, cy: y + dy, r, d: dist([x + dx, y + dy]) })),
  ).sort((a, b) => a.d - b.d);
  const kept = all.slice(5);
  const near = kept[0].d;
  const far = kept[kept.length - 1].d;
  return kept.map(({ cx, cy, r, d }) => ({ cx, cy, r, t: (d - near) / (far - near) }));
})();
