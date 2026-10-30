# OncoXpert website

The rebuilt pages of [oncoxpert.in](https://oncoxpert.in), the surgical oncology practice of Dr. Sunil
Navalgund in Bengaluru:

- **Home**: `/`
- **Robotic Surgery**: `/robotic-surgery/`
- **Breast Cancer**: `/breast-cancer-treatment-bangalore/`
- **Book Appointment**: `/book-your-appoinment-page/` (the live address, misspelling included)
- **About Us**: `/about-us/`
- **Colorectal Cancer**: `/colon-cancer-treatment-bangalore/` (the live address)
- **Endometrial Cancer**: `/endometrial-cancer-treatment-bangalore/`

Next.js 16 · TypeScript · Tailwind CSS 4 · Motion · Embla. Developers: read
**[docs/PROJECT.md](docs/PROJECT.md)** (folder map, theme system, components, rules).

---

## Run it

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local     # then fill in RESEND_API_KEY (see "Appointment form")
npm run dev                    # http://localhost:3000 → Home
```

| Command             | What it does                                                  |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Development server                                            |
| `npm run build`     | Production build (must pass before deploying)                 |
| `npm run start`     | Serve the production build                                    |
| `npm run lint`      | ESLint                                                        |
| `npm run typecheck` | TypeScript check                                              |
| `npm run format`    | Format all files with Prettier (`format:check` only checks)   |
| `npm run images`    | Download/resize a page's stock photos (`npm run images home`) |

### Deploy (Vercel)

1. Import the repository in Vercel (framework preset: Next.js, no extra settings).
2. Add the variables from `.env.example`: `RESEND_API_KEY`, `APPOINTMENT_TO_EMAIL`
   (default `info@oncoxpert.in`) and `APPOINTMENT_FROM_EMAIL` (a sender on a domain verified in Resend).
3. Deploy. Pages are prerendered and revalidate daily (footer year, YouTube titles).

---

## Where the words live

Components contain no text. Everything visitors read is in `content/`:

| File                                    | Contains                                                        |
| --------------------------------------- | --------------------------------------------------------------- |
| `content/pages/home.ts`                 | Every section of the Home page: text and numbers                |
| `content/pages/home.images.ts`          | The Home page photos: file, alt text, focal point, size         |
| `content/pages/breast-cancer.ts`        | Every section of the breast page: text, prices, numbers         |
| `content/pages/breast-cancer.images.ts` | The breast page photos: file, alt text, focal point, size       |
| `content/pages/robotic-surgery.ts`      | Every section of the robotic page, its numbers and photos       |
| `content/shared/reviews.ts`             | Google reviews (shared by every page)                           |
| `content/shared/videos.ts`              | YouTube video IDs (shared by every page)                        |
| `content/shared/sections.ts`            | Appointment form, clinic locations and final call band text     |
| `content/pages/book-appointment.ts`     | The Book Appointment page's title and description               |
| `content/pages/about-us.ts`             | Every section of the About Us page                              |
| `content/pages/colorectal-cancer.ts`    | Every section of the Colorectal Cancer page                     |
| `content/pages/endometrial-cancer.ts`   | Every section of the Endometrial Cancer page                    |
| `content/site.ts`                       | Menu, phone, email, address, clinics, socials, footer, WhatsApp |

Every block is tagged with where it came from. Keep the tags when you edit:

- `// SOURCE: EXISTING`: copied from the live site. Do not reword.
- `// SOURCE: DOCTOR`: written by Dr. Sunil. Do not reword.
- `// SOURCE: NEW`: added by us, waiting for the doctor's approval.
- `// PENDING DOCTOR`: something only the doctor can confirm (search the files for it).

Change the text between the quotes only; keep the commas and brackets. Then run `npm run build`: if it
fails, the error names the file and line.

---

## Update prices, numbers and reviews

**Prices** (breast page, _Transparent Care Financing_): `pricing.cards` in
`content/pages/breast-cancer.ts`.

```ts
{ name: "SURGERY", amount: 70000, unit: "onwards", unitLive: "Starting Price", body: "…" },
```

- `amount` is a plain number in rupees, no commas or ₹ (the page shows "₹70,000" by itself).
- `unit` is the doctor's wording and `unitLive` the current website's. `unitSet: "doctor"` or `"live"`
  picks which one the cards show.

**Numbers.** Totals are always calculated. Never type a total in.

- Breast page:
  - (The hero's three floating cards are words, not figures: `hero.highlights`.)
  - `outcomes.responses`: the two rings.
  - `outcomes.stages`: cases and 5-year survival per stage. The "Total cases treated" figure is their sum.
  - `surgery.stat`.
- Robotic page:
  - `surgeryNumbers.counts`: the donut, tiles, the "229" total and the per-cancer badges.
  - `outcomes`: blood loss, stay, pain and scars.

**Reviews**: `content/shared/reviews.ts`. Add a review as a new entry. Copy the text exactly as posted
on Google, including the reviewer's spelling.

```ts
{ id: "first-last", author: "First Last", rating: 5, paragraphs: ["…"] },
```

- The robotic page shows all reviews in file order.
- The breast page shows the ids listed in `reviews.order` in `content/pages/breast-cancer.ts`. Add the
  new `id` there in the position you want.
- To hide a review on one page, add `excludeOn: ["<page slug>"]` to it, for example
  `excludeOn: ["breast-cancer-treatment-bangalore"]`.
- The star average and the review count are calculated.

**Videos**: YouTube IDs in `content/shared/videos.ts`. An ID is the part after `watch?v=`, and the
first one is shown large. Titles and thumbnails come from YouTube automatically.

**Clinics, phone, email, socials**: `content/site.ts`.

---

## Edit the Home page

Everything on `/` is in `content/pages/home.ts`, one block per section, in page order (`hero`,
`surgeon`, `robotic`, `specialties`, `services`, `value`, `approach`, then the shared sections'
settings; the reviews, a shared section, show between `value` and `approach`). Photos are in
`content/pages/home.images.ts`.

**Hero photos** (the background slider): `heroSlides` in `content/pages/home.images.ts`, in slide
order. Every photo is shown whole (as on the live homepage): on desktop at the hero's full height on
the right, on phones and tablets full width above the text. Use 3:2 landscape JPGs of 2400×1600
(crop a portrait photo to 3:2 first), so every slide fills the same frame, and set `width` /
`height` to the file's real size.

**Statistics** (15+ years, 3,000+ patients…): `surgeon.stats`, the four cards around Dr. Sunil's ring
in _Meet Dr. Sunil Navalgund_ and in the About Us hero (same list, so change it once).

```ts
{ value: 3000, suffix: "+", label: "PATIENTS TREATED" },
```

- `value` is a plain number (no commas); the page formats it ("3,000+") and counts up to it.
- Keep four entries: the ring has one card per corner (desktop).

The **"30–40%" cost saving** is `value.items` (`range: { from: 30, to: 40, suffix: "%" }`), marked
`PENDING DOCTOR` until he confirms it.

**Specialty list.** One entry per cancer in `specialties.items`, in display order: `key`, `name`,
`body` (the one-liner), `href` (its page) and `image` (its photo, in `content/pages/home.images.ts`; the first tile is the large one).

- The first entry is the large tile on desktop. Breast is first because it has the rebuilt page.
- When a specialty gets its rebuilt page, change its `href` to the new path, e.g.
  `"/colon-cancer-treatment-bangalore/"`.
- The hero line "Expert care for ___ cancer" cycles through `hero.specialties` (the same keys, in the
  order the ticker shows them).
- **Adding a cancer**: add its key to `SpecialtyKey` at the top of `home.ts`, an entry to
  `specialties.items`, its key to `hero.specialties`, and a line icon in
  `components/pages/home/specialty-icons.tsx` (24px grid, stroke 1.75, like lucide). The bento grid
  is designed for six tiles; with more, ask a developer to check the layout.

**Services**: `services.items`. `action` is either a link (`kind: "link"`, `href`) or opens the form
(`kind: "appointment"`, with the `service` to preselect and a `note` that arrives in the email).

**Reviews on Home**: the ids in `reviews.order`, in the order shown; the link under them is
`reviews.link`. **FAQ**: `faq.items` (each answer is a list of paragraphs; `icon` is one of the icons
in `FaqIcon`, `content/types.ts`). The FAQ's structured data for Google is built from the same items.

**Buttons that name no service** (header, menu, phone bar, FAQ card) preselect
`defaultAppointmentService` ("Consultation").

---

## Swap the stock photos for the doctor's real photos

The breast page and Home (the six cancer specialties and the final call band) use licensed Pexels stock
photos. To replace one with a real photo of the clinic or team (the steps use the breast page; for Home
it is `public/images/home/` and `content/pages/home.images.ts`):

1. **Prepare the photo.** JPG, at most 2000 px on the long edge, about 80% quality. Any photo editor or
   [squoosh.app](https://squoosh.app) can do this. Use a new file name, e.g. `team-consultation.jpg`, so
   browsers don't show the old cached photo. Only use photos you have permission to publish (patients
   need written consent).
2. **Add the file** to `public/images/breast-cancer/`.
3. **Update its entry** in `content/pages/breast-cancer.images.ts`. Find the photo by its key (e.g.
   `consultation`), then:
   - set `file` and `src` to the new name;
   - set `width` and `height` to the file's real pixel size (`npm run images` / `npm run images home`
     lists the size of every file);
   - rewrite `alt` to describe the new photo;
   - set `focal` (CSS object-position, e.g. `"50% 30%"`) to the part that must stay visible when the
     photo is cropped;
   - delete `pexelsId` and `credit`.
4. Run `npm run dev` and check the photo at phone and desktop widths. Then delete the old stock file.

The breast share image (`og.jpg`) is made from `ribbon-minimal.jpg`. Home's is a brand card (the logo
and the portrait on the hero navy) made by `npm run images home`. To use another image, replace
`public/images/<page>/og.jpg` with a 1200×630 JPG (or delete it and run the script again).

The doctor's portrait is `public/images/brand/dr-sunil-navalgund.png`, used by every page. Replace the
file with one of the same framing and update `width`/`height` in `surgeon.image`
(`content/pages/breast-cancer.ts`), `images.doctor` (`content/pages/robotic-surgery.ts`) and `doctor`
(`content/pages/home.images.ts`), then delete `public/images/home/og.jpg` and run `npm run images home`.
The portrait ring (Home's _Meet Dr. Sunil Navalgund_ and the About Us hero) also shows his head cut out of the photo (it breaks out of the ring): run
`node scripts/make-portrait-cutout.mjs` to remake `dr-sunil-navalgund-head.png` from the new portrait
and check it at 390 and 1440 px (the cut works on a plain studio backdrop like the current one).

Robotic page photos live in `public/images/robotic/` and `images` / `robotPhotos` in
`content/pages/robotic-surgery.ts`. The hero slider shows `robotPhotos`. It is on pure black, so use
black-background shots (`node scripts/make-black-bg.mjs in.jpg out.jpg` makes one from a white product
shot) or real photographs (`bg: "photo"`).

---

## Add a new cancer page

Example: a colorectal cancer page. A developer can do this without changing any shared component. Full
checklist in [docs/PROJECT.md](docs/PROJECT.md#add-a-page).

1. **Theme**: copy `styles/themes/breast.css` to `styles/themes/colorectal.css`, rename
   `[data-theme="colorectal"]`, and set the colours and display font. `@import` it in
   `app/globals.css` and add `"colorectal"` to `ThemeName` in `content/types.ts`.
2. **Words**: create `content/pages/colorectal-cancer.ts` (copy the breast file as a template) and tag
   every block `EXISTING` / `DOCTOR` / `NEW`. Add `colorectal-cancer.images.ts` for its photos.
3. **Register** the page in `content/pages/index.ts` (slug, title, description, theme, theme colour).
   The sitemap and robots file pick it up.
4. **Route**:
   - `app/colorectal-cancer-treatment-bangalore/layout.tsx`: `<SiteShell theme="colorectal" headerVariant="light">`.
   - `page.tsx`: metadata, viewport and the list of sections.
5. **Sections**:
   - Reuse the shared ones from `components/shared/`: Reviews, Videos, Faq, AppointmentSection, Locations,
     FinalCta and DoctorCard. They take the page's colours automatically.
   - Build page-only sections in `components/pages/colorectal-cancer/`.
6. **Menu**: add the page to `site.nav` in `content/site.ts` (Services).
7. **Check**: `npm run typecheck && npm run lint && npm run build`, then look at it at 375, 768 and
   1440 px wide and run Lighthouse (mobile).

---

## Appointment form

- Validation: react-hook-form + zod (`lib/appointment-schema.ts`, shared with the server).
- Submission and delivery: the Server Action in `lib/appointment.ts` emails each request via Resend
  ("New appointment request - <page> page"). To send to Google Sheets or a CRM instead, replace
  `deliverAppointment` in that file; nothing else changes.
- Without `RESEND_API_KEY` the form shows its error message and asks people to call. It never pretends
  a request was sent.
- Spam: a hidden honeypot field. Filled-in submissions are dropped silently.
- The form lives on one page, `/book-your-appoinment-page/`: Name, Contact Number, Service Required and
  Date. Every appointment button on the site opens that page. Link to it with a service already chosen:
  `/book-your-appoinment-page/?service=second-opinion` (also `consultation`, `consultation-for-surgery`,
  `follow-up`); `&note=…` adds a note to the email.
- Its words (heading, labels, messages) are in `content/shared/sections.ts` (`appointmentSection`).

## Analytics

Google Tag Manager (`GTM-PBNWCFV7`, set in `content/site.ts`) loads on the visitor's first interaction
or after 12 s, so it never delays the first paint. `dataLayer` events:

| Event            | When                    | Fields                  |
| ---------------- | ----------------------- | ----------------------- |
| `phone_click`    | any `tel:` link         | `location` (section id) |
| `whatsapp_click` | any WhatsApp link       | `location`              |
| `cta_click`      | any CTA button          | `label`, `location`     |
| `form_submit`    | appointment form submit | `status`, `service`     |

`label` is the button's text. Where the same text repeats in one section, the label names the item:
on Home the service cards send "Chemotherapy: Book a Consultation" and so on, and the specialty tiles
send the cancer's name.
