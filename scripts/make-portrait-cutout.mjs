/**
 * One-off: cuts Dr. Sunil's head out of the studio backdrop, for the Home hero, where the
 * head breaks out of the top of the ring.
 *
 *   node scripts/make-portrait-cutout.mjs [in.png] [out.png]
 *   default: public/images/brand/dr-sunil-navalgund.png → public/images/brand/dr-sunil-navalgund-head.png
 *
 * The backdrop is a smooth blue-grey studio gradient: its colour is modelled per pixel from the
 * photo's own top rows (left → right) and its two side edges (top → bottom). Each pixel's alpha
 * comes from its colour distance to that model; each row is then filled solid between the head's
 * outer edges (so glasses or highlights never punch holes), the edge is softened, and the
 * backdrop tint is removed from semi-transparent edge pixels (no light halo on navy).
 * Only the top of the photo is kept (head and neck): the rest is never shown outside the ring.
 */
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const input = process.argv[2] ?? path.join(root, "public/images/brand/dr-sunil-navalgund.png");
const output = process.argv[3] ?? path.join(root, "public/images/brand/dr-sunil-navalgund-head.png");

/** Rows kept, as a share of the photo height (the head and neck end above it). */
const KEEP = 0.4;
/** Colour distance (0–441) below which a pixel is backdrop, and above which it is subject. */
const NEAR = 22;
const FAR = 52;

const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const rows = Math.round(H * KEEP);
const at = (x, y) => (y * W + x) * 3;

const mean = (pixels) => {
  const s = [0, 0, 0];
  for (const [x, y] of pixels) for (let c = 0; c < 3; c++) s[c] += data[at(x, y) + c];
  return s.map((v) => v / pixels.length);
};
const band = (x0, x1, y0, y1) => {
  const p = [];
  for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) p.push([x, y]);
  return p;
};

// Backdrop model: colour of the top rows per column + the vertical drift seen at both edges.
const top = Array.from({ length: W }, (_, x) => mean(band(Math.max(0, x - 2), Math.min(W - 1, x + 2), 2, 10)));
const edge = Array.from({ length: rows }, (_, y) =>
  mean([...band(2, 12, Math.max(0, y - 2), y), ...band(W - 13, W - 3, Math.max(0, y - 2), y)]),
);
const edge0 = edge[6];
const backdrop = (x, y) => top[x].map((v, c) => v + edge[y][c] - edge0[c]);

const smooth = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const alpha = new Float32Array(W * rows);
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < W; x++) {
    const b = backdrop(x, y);
    const o = at(x, y);
    const d = Math.hypot(data[o] - b[0], data[o + 1] - b[1], data[o + 2] - b[2]);
    alpha[y * W + x] = smooth((d - NEAR) / (FAR - NEAR));
  }
}

// Fill each row solid between the outer edges of the run that contains the head's centre line.
let centre = Math.round(W / 2);
for (let y = 0; y < rows; y++) {
  const row = alpha.subarray(y * W, (y + 1) * W);
  if (row[centre] < 0.5) continue; // above the head
  let l = centre;
  let r = centre;
  const GAP = 6; // tolerate thin low-contrast gaps (spectacle rims, ear shadows)
  for (let x = centre, miss = 0; x > 0 && miss <= GAP; x--) {
    if (row[x] >= 0.5) {
      l = x;
      miss = 0;
    } else miss++;
  }
  for (let x = centre, miss = 0; x < W - 1 && miss <= GAP; x++) {
    if (row[x] >= 0.5) {
      r = x;
      miss = 0;
    } else miss++;
  }
  for (let x = 0; x < W; x++) if (x < l - GAP || x > r + GAP) row[x] = 0;
  for (let x = l; x <= r; x++) row[x] = 1;
  centre = Math.round((l + r) / 2);
}

// Soften the edge slightly, then build RGBA with the backdrop tint removed from edge pixels.
const soft = await sharp(Buffer.from(Uint8Array.from(alpha, (a) => Math.round(a * 255))), {
  raw: { width: W, height: rows, channels: 1 },
})
  .blur(0.6)
  .extractChannel(0) // blur returns sRGB; keep one channel
  .raw()
  .toBuffer();

const rgba = Buffer.alloc(W * rows * 4);
for (let y = 0; y < rows; y++) {
  for (let x = 0; x < W; x++) {
    const i = y * W + x;
    const a = soft[i] / 255;
    const o = at(x, y);
    const b = backdrop(x, y);
    for (let c = 0; c < 3; c++) {
      // Observed = a·F + (1 − a)·B  →  F = (Observed − (1 − a)·B) / a
      const f = a > 0.02 && a < 0.98 ? (data[o + c] - (1 - a) * b[c]) / a : data[o + c];
      rgba[i * 4 + c] = Math.max(0, Math.min(255, Math.round(f)));
    }
    rgba[i * 4 + 3] = soft[i];
  }
}

await sharp(rgba, { raw: { width: W, height: rows, channels: 4 } })
  .png({ compressionLevel: 9, palette: false })
  .toFile(output);
console.log(`saved ${path.relative(root, output)} (${W}×${rows}, the top ${KEEP * 100}% of ${W}×${H})`);
