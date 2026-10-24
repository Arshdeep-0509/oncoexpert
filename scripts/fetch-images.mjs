/**
 * Downloads a page's stock photos from Pexels, resizes them and writes its og.jpg.
 *
 *   npm run images              the breast page (content/pages/breast-cancer.images.ts)
 *   npm run images home         content/pages/home.images.ts
 *   npm run images book         content/pages/book-appointment.images.ts
 *   npm run images about        content/pages/about-us.images.ts
 *   npm run images breast       a unique prefix of a manifest name works too
 *
 * Reads `file`, `src` and `pexelsId` from content/pages/<page>.images.ts (the single source of
 * truth; `${BASE}` in `src` is the manifest's `const BASE`). Missing files with a `pexelsId` are
 * downloaded at 2400px, resized to max 2000px on the long edge (mozjpeg q80) and saved at their
 * `src` under public/. Files that already exist are skipped. Entries without a `pexelsId` are own
 * photos (possibly in another folder, e.g. brand/): they are only checked, never downloaded.
 * Then writes og.jpg (1200×630) into the page's BASE folder, using the page's recipe below.
 * Prints the final pixel size of every file so the manifest's width/height can be checked.
 * Exits with code 1 if anything fails.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const pagesDir = path.join(root, "content/pages");
const publicDir = path.join(root, "public");
const MAX_EDGE = 2000;
const OG = { width: 1200, height: 630 };

const exists = (p) =>
  fs.access(p).then(
    () => true,
    () => false,
  );

/* ---------------------------------------------------------------- */
/* Which manifest                                                    */
/* ---------------------------------------------------------------- */

const arg = process.argv[2] ?? "breast-cancer";
const manifests = (await fs.readdir(pagesDir)).filter((f) => f.endsWith(".images.ts")).map((f) => f.slice(0, -10));
const matches = manifests.includes(arg) ? [arg] : manifests.filter((m) => m.startsWith(arg));
if (matches.length !== 1) {
  console.error(`No single image manifest matches "${arg}". Available: ${manifests.join(", ")}`);
  process.exit(1);
}
const page = matches[0];
const manifestPath = path.join(pagesDir, `${page}.images.ts`);
const source = await fs.readFile(manifestPath, "utf8");

const base = source.match(/const BASE\s*=\s*"([^"]+)"/)?.[1];
if (!base) throw new Error(`No const BASE = "/images/…" in ${manifestPath}`);
const outDir = path.join(publicDir, base);
const resolveSrc = (src) => path.join(publicDir, src.replaceAll("${BASE}", base));

// One chunk per manifest entry, so an entry without a pexelsId (an own photo) is never
// paired with the next entry's id.
const entries = source
  .split(/(?=\bfile:\s*")/)
  .slice(1)
  .map((chunk) => {
    const file = chunk.match(/^file:\s*"([^"]+)"/)[1];
    const src = chunk.match(/\bsrc:\s*[`"]([^`"]+)[`"]/)?.[1] ?? `\${BASE}/${file}`;
    return { file, dest: resolveSrc(src), id: chunk.match(/\bpexelsId:\s*(\d+)/)?.[1] };
  });
if (entries.length === 0) throw new Error(`No images found in ${manifestPath}`);

console.log(`${page}: ${entries.length} images → ${path.relative(root, outDir)}\n`);
await fs.mkdir(outDir, { recursive: true });

/* ---------------------------------------------------------------- */
/* Photos                                                            */
/* ---------------------------------------------------------------- */

const failed = [];
for (const { file, dest, id } of entries) {
  if (await exists(dest)) {
    console.log(`skip   ${file}`);
    continue;
  }
  if (!id) {
    // An own photo (no Pexels id): it must already be on disk.
    failed.push(file);
    console.error(`FAILED ${file} (no pexelsId and ${path.relative(root, dest)} is missing)`);
    continue;
  }
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2400`;
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (OncoXpert image script)" } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const input = Buffer.from(await res.arrayBuffer());
    await fs.mkdir(path.dirname(dest), { recursive: true });
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

/* ---------------------------------------------------------------- */
/* Social share image, one recipe per page                           */
/* ---------------------------------------------------------------- */

/** Cover crop of one of the page's photos. */
const coverFrom = (file) => async (dest) => {
  const input = path.join(outDir, file);
  if (!(await exists(input))) throw new Error(`${file} is missing`);
  await sharp(input)
    .resize(OG.width, OG.height, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(dest);
};

/**
 * Brand card: the hero navy with its two glows (styles/themes/home.css --grad-hero), the logo
 * on a white card (as in the header over a dark hero) and the portrait in a rounded frame with
 * the logo ring's blue → teal → orange edge. No rendered text: the logo carries the name.
 */
const brandCard = async (dest) => {
  const { width: W, height: H } = OG;
  const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${body}</svg>`);
  const frame = { x: 760, y: 56, w: 372, h: 518, r: 36 };
  const card = { x: 72, y: 222, w: 584, h: 186, r: 28 };

  const background = svg(`
    <defs>
      <linearGradient id="base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1633"/><stop offset="1" stop-color="#0c1b3f"/></linearGradient>
      <radialGradient id="blue" cx="0.88" cy="0.06" r="0.6"><stop offset="0" stop-color="#0b40b2" stop-opacity="0.6"/><stop offset="0.7" stop-color="#0b40b2" stop-opacity="0"/></radialGradient>
      <radialGradient id="orange" cx="0.06" cy="0.96" r="0.5"><stop offset="0" stop-color="#f15a22" stop-opacity="0.22"/><stop offset="0.7" stop-color="#f15a22" stop-opacity="0"/></radialGradient>
      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563d9"/><stop offset="0.55" stop-color="#0fa3a0"/><stop offset="1" stop-color="#f0592a"/></linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#base)"/>
    <rect width="${W}" height="${H}" fill="url(#blue)"/>
    <rect width="${W}" height="${H}" fill="url(#orange)"/>
    <rect x="${frame.x - 3}" y="${frame.y - 3}" width="${frame.w + 6}" height="${frame.h + 6}" rx="${frame.r + 3}" fill="url(#ring)"/>
    <rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="${card.r}" fill="#ffffff"/>
    <rect x="${card.x + 48}" y="${card.y + card.h + 36}" width="120" height="4" rx="2" fill="url(#ring)"/>
    <circle cx="${card.x + 186}" cy="${card.y + card.h + 38}" r="4" fill="#f15a22"/>`);

  const portrait = await sharp(path.join(publicDir, "images/brand/dr-sunil-navalgund.png"))
    .resize(frame.w, frame.h, { fit: "cover", position: "top" })
    .composite([
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.w}" height="${frame.h}"><rect width="${frame.w}" height="${frame.h}" rx="${frame.r}"/></svg>`,
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const logoWidth = card.w - 96;
  const logo = await sharp(path.join(publicDir, "images/brand/oncoxpert-logo-transparent.png"))
    .resize({ width: logoWidth })
    .toBuffer({ resolveWithObject: true });

  await sharp(background)
    .composite([
      { input: portrait, left: frame.x, top: frame.y },
      {
        input: logo.data,
        left: card.x + 48,
        top: card.y + Math.round((card.h - logo.info.height) / 2),
      },
    ])
    .flatten({ background: "#0a1633" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(dest);
};

/**
 * Care card (booking and about pages): the light sibling of the brand card. The care hero's ivory
 * with its two mists (styles/themes/care.css --grad-hero), the logo on a white card with a hairline,
 * and a photo in a rounded frame with the logo ring's edge. `photo` is a path under public/;
 * `position` is sharp's crop position. No rendered text: the logo carries the name.
 */
const careCard = (photo, position) => async (dest) => {
  const { width: W, height: H } = OG;
  const svg = (body) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}">${body}</svg>`);
  const frame = { x: 760, y: 56, w: 372, h: 518, r: 36 };
  const card = { x: 72, y: 222, w: 584, h: 186, r: 28 };

  const background = svg(`
    <defs>
      <linearGradient id="base" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fbf8f4"/><stop offset="1" stop-color="#ffffff"/></linearGradient>
      <radialGradient id="blue" cx="0.92" cy="0" r="0.6"><stop offset="0" stop-color="#0b40b2" stop-opacity="0.12"/><stop offset="0.7" stop-color="#0b40b2" stop-opacity="0"/></radialGradient>
      <radialGradient id="orange" cx="0" cy="1" r="0.5"><stop offset="0" stop-color="#f15a22" stop-opacity="0.1"/><stop offset="0.7" stop-color="#f15a22" stop-opacity="0"/></radialGradient>
      <linearGradient id="ring" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2563d9"/><stop offset="0.55" stop-color="#0fa3a0"/><stop offset="1" stop-color="#f0592a"/></linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#base)"/>
    <rect width="${W}" height="${H}" fill="url(#blue)"/>
    <rect width="${W}" height="${H}" fill="url(#orange)"/>
    <rect x="${frame.x - 3}" y="${frame.y - 3}" width="${frame.w + 6}" height="${frame.h + 6}" rx="${frame.r + 3}" fill="url(#ring)"/>
    <rect x="${card.x}" y="${card.y}" width="${card.w}" height="${card.h}" rx="${card.r}" fill="#ffffff" stroke="#e3e8f0" stroke-width="2"/>
    <rect x="${card.x + 48}" y="${card.y + card.h + 36}" width="120" height="4" rx="2" fill="url(#ring)"/>
    <circle cx="${card.x + 186}" cy="${card.y + card.h + 38}" r="4" fill="#f15a22"/>`);

  const framed = await sharp(path.join(publicDir, photo))
    .resize(frame.w, frame.h, { fit: "cover", position })
    .flatten({ background: "#ffffff" })
    .composite([
      {
        input: Buffer.from(
          `<svg xmlns="http://www.w3.org/2000/svg" width="${frame.w}" height="${frame.h}"><rect width="${frame.w}" height="${frame.h}" rx="${frame.r}"/></svg>`,
        ),
        blend: "dest-in",
      },
    ])
    .png()
    .toBuffer();

  const logoWidth = card.w - 96;
  const logo = await sharp(path.join(publicDir, "images/brand/oncoxpert-logo-transparent.png"))
    .resize({ width: logoWidth })
    .toBuffer({ resolveWithObject: true });

  await sharp(background)
    .composite([
      { input: framed, left: frame.x, top: frame.y },
      {
        input: logo.data,
        left: card.x + 48,
        top: card.y + Math.round((card.h - logo.info.height) / 2),
      },
    ])
    .flatten({ background: "#fbf8f4" })
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(dest);
};

const ogRecipes = {
  "breast-cancer": coverFrom("ribbon-minimal.jpg"),
  home: brandCard,
  "about-us": careCard("images/brand/dr-sunil-navalgund.png", "top"),
  "book-appointment": careCard("images/book-appointment/consultation-report.jpg", "attention"),
};

const ogDest = path.join(outDir, "og.jpg");
if (await exists(ogDest)) {
  console.log("skip   og.jpg");
} else if (!ogRecipes[page]) {
  console.log(`(no og.jpg recipe for ${page})`);
} else {
  try {
    await ogRecipes[page](ogDest);
    console.log("saved  og.jpg");
  } catch (error) {
    failed.push("og.jpg");
    console.error(`FAILED og.jpg: ${error.message}`);
  }
}

/* ---------------------------------------------------------------- */
/* Report                                                            */
/* ---------------------------------------------------------------- */

console.log("\nSizes on disk:");
for (const { file, dest } of [...entries, { file: "og.jpg", dest: ogDest }]) {
  if (!(await exists(dest))) continue;
  const { width, height } = await sharp(dest).metadata();
  const kb = Math.round((await fs.stat(dest)).size / 1024);
  console.log(
    `  ${file.padEnd(32)} ${`${width}×${height}`.padEnd(11)} ${String(kb).padStart(4)} KB  ${path.relative(publicDir, dest)}`,
  );
}

if (failed.length) {
  console.error(`\n${failed.length} file(s) failed: ${failed.join(", ")}`);
  process.exit(1);
}
