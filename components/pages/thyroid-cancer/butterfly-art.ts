/**
 * The thyroid hero's line art (viewBox 400 × 320): the gland as a butterfly. The isthmus across the
 * middle, then each lobe as a pair of wings (a pointed upper wing, a rounded lower one) with a few
 * veins. The right lobe mirrors the left about x = 200. Stylised, not anatomical.
 */
export const BUTTERFLY_BOX = { width: 400, height: 320 } as const;
const CENTRE_X = 200;

export const ISTHMUS = "M170 196 C184 204 216 204 230 196";

const LEFT_LOBE =
  "M170 196 C148 190 112 176 92 148 C70 116 62 78 82 60 C102 44 140 58 156 92 " +
  "C168 118 176 160 178 200 C178 232 156 262 128 258 C100 254 88 230 104 214 C120 198 148 198 170 196";
const LEFT_VEINS = ["M168 186 C140 160 112 120 96 86", "M168 206 C150 220 132 230 116 236"];

/** Mirrors an SVG path's absolute coordinates about x = 200 (M/C/L pairs only). */
function mirror(d: string) {
  return d.replace(
    /(-?\d+(?:\.\d+)?) (-?\d+(?:\.\d+)?)/g,
    (_, x: string, y: string) => `${2 * CENTRE_X - Number(x)} ${y}`,
  );
}

export const LOBES = [LEFT_LOBE, mirror(LEFT_LOBE)] as const;
export const VEINS = [LEFT_VEINS, LEFT_VEINS.map(mirror)] as const;
