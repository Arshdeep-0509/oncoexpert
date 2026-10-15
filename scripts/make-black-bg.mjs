// Creates a black-background copy of a white-background product shot.
// Background = near-white pixels connected to the image border (flood fill), so white
// parts of the machine itself are kept. The cut edge is softened by a small blur.
// Usage: node scripts/make-black-bg.mjs <input.jpg> <output.jpg> [threshold=236]
import sharp from "sharp";

const [input, output, thr = "236"] = process.argv.slice(2);
const T = Number(thr);
const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;
const bg = new Uint8Array(W * H);
const isLight = (p) => data[p * 3] >= T && data[p * 3 + 1] >= T && data[p * 3 + 2] >= T;
const stack = [];
for (let x = 0; x < W; x++) stack.push(x, (H - 1) * W + x);
for (let y = 0; y < H; y++) stack.push(y * W, y * W + W - 1);
while (stack.length) {
  const p = stack.pop();
  if (bg[p] || !isLight(p)) continue;
  bg[p] = 255;
  const x = p % W, y = (p / W) | 0;
  if (x > 0) stack.push(p - 1);
  if (x < W - 1) stack.push(p + 1);
  if (y > 0) stack.push(p - W);
  if (y < H - 1) stack.push(p + W);
}
// soft matte: blur the background mask slightly, then blend pixel → black by it
const { data: matte, info: mi } = await sharp(Buffer.from(bg), { raw: { width: W, height: H, channels: 1 } })
  .blur(1.2)
  .extractChannel(0)
  .raw()
  .toBuffer({ resolveWithObject: true });
if (mi.channels !== 1 || mi.width !== W) throw new Error("unexpected matte format " + JSON.stringify(mi));
const out = Buffer.alloc(W * H * 3);
for (let p = 0; p < W * H; p++) {
  const k = 1 - matte[p] / 255;
  for (let c = 0; c < 3; c++) out[p * 3 + c] = Math.round(data[p * 3 + c] * k);
}
await sharp(out, { raw: { width: W, height: H, channels: 3 } }).jpeg({ quality: 86, mozjpeg: true }).toFile(output);
console.log("wrote", output, `${W}x${H}`, "background", Math.round((bg.reduce((a, v) => a + (v ? 1 : 0), 0) / (W * H)) * 100) + "%");
