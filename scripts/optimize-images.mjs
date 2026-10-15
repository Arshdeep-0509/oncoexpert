// Compresses every PNG/JPG under public/images to a max width of 2400px.
// Usage: node scripts/optimize-images.mjs
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "../public/images");
const MAX_WIDTH = 2400;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

for await (const file of walk(ROOT)) {
  const ext = path.extname(file).toLowerCase();
  if (![".png", ".jpg", ".jpeg"].includes(ext)) continue;

  const input = await readFile(file);
  const meta = await sharp(input).metadata();
  let pipeline = sharp(input).resize({ width: MAX_WIDTH, withoutEnlargement: true });
  pipeline =
    ext === ".png"
      ? pipeline.png({ compressionLevel: 9, palette: false, effort: 10 })
      : pipeline.jpeg({ quality: 82, mozjpeg: true });
  const output = await pipeline.toBuffer();

  const rel = path.relative(ROOT, file);
  if (output.length < input.length || (meta.width ?? 0) > MAX_WIDTH) {
    await writeFile(file, output);
    console.log(`${rel}: ${meta.width}x${meta.height} ${input.length} -> ${output.length} bytes`);
  } else {
    console.log(`${rel}: ${meta.width}x${meta.height} already optimal (${input.length} bytes)`);
  }
}
