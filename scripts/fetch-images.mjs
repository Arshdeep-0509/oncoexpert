/**
 * Downloads the breast cancer page photos from Pexels, resizes them and writes og.jpg.
 *
 *   npm run images
 *
 * Reads `file` + `pexelsId` pairs from content/pages/breast-cancer.images.ts (the single
 * source of truth), downloads each at 2400px, resizes to max 2000px on the long edge
 * (mozjpeg q80) into public/images/breast-cancer/, and skips files that already exist.
 * Entries without a `pexelsId` are own photos: they are only checked, never downloaded.
 * Then creates og.jpg (1200×630, cover crop) from ribbon-minimal.jpg.
 * Prints the final pixel size of every file so the manifest's width/height can be checked.
 * Exits with code 1 if any download fails.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "content/pages/breast-cancer.images.ts");
const outDir = path.join(root, "public/images/breast-cancer");
const MAX_EDGE = 2000;

const source = await fs.readFile(manifestPath, "utf8");
// One chunk per manifest entry, so an entry without a pexelsId (an own photo) is never
// paired with the next entry's id.
const entries = source
  .split(/(?=\bfile:\s*")/)
  .slice(1)
  .map((chunk) => ({
    file: chunk.match(/^file:\s*"([^"]+)"/)[1],
    id: chunk.match(/\bpexelsId:\s*(\d+)/)?.[1],
  }));
if (entries.length === 0) throw new Error(`No images found in ${manifestPath}`);

await fs.mkdir(outDir, { recursive: true });

const exists = (p) =>
  fs.access(p).then(
    () => true,
    () => false,
  );

const failed = [];
for (const { file, id } of entries) {
  const dest = path.join(outDir, file);
  if (await exists(dest)) {
    console.log(`skip   ${file}`);
    continue;
  }
  if (!id) {
    // An own photo (no Pexels id): it must already be in public/images/breast-cancer/.
    failed.push(file);
    console.error(`FAILED ${file} (no pexelsId and the file is missing)`);
    continue;
  }
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (OncoXpert image script)" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    await sharp(input)
      .rotate() // honour EXIF orientation
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true })
      .toFile(dest);
    console.log(`saved  ${file}`);
  } catch (error) {
    failed.push(file);
    console.error(`FAILED ${file} (${url}): ${error.message}`);
  }
}

// Social share image
const ogSource = path.join(outDir, "ribbon-minimal.jpg");
const ogDest = path.join(outDir, "og.jpg");
if (await exists(ogDest)) {
  console.log("skip   og.jpg");
} else if (await exists(ogSource)) {
  await sharp(ogSource)
    .resize(1200, 630, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(ogDest);
  console.log("saved  og.jpg");
} else {
  failed.push("og.jpg");
  console.error("FAILED og.jpg (ribbon-minimal.jpg is missing)");
}

console.log("\nSizes on disk:");
for (const { file } of [...entries, { file: "og.jpg" }]) {
  const p = path.join(outDir, file);
  if (!(await exists(p))) continue;
  const { width, height } = await sharp(p).metadata();
  const kb = Math.round((await fs.stat(p)).size / 1024);
  console.log(`  ${file.padEnd(24)} ${width}×${height}  ${kb} KB`);
}

if (failed.length) {
  console.error(`\n${failed.length} file(s) failed: ${failed.join(", ")}`);
  process.exit(1);
}
