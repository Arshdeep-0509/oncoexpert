# OncoXpert website

**Start with [docs/PROJECT.md](docs/PROJECT.md)**: stack, folder map, theme system, content rules,
responsive rules and the add-a-page checklist.

## Robotic Surgery page

The rebuilt **Robotic Surgery** page for [oncoxpert.in](https://oncoxpert.in/robotic-surgery/),
with the new site navbar and footer.

Next.js 16 (App Router, Cache Components) · TypeScript · Tailwind CSS 4 · shadcn/ui · Motion · Embla · Lenis.

---

## Run it

Requires Node.js 20 or newer.

```bash
npm install
cp .env.example .env.local     # then fill in RESEND_API_KEY (see below)
npm run dev                    # http://localhost:3000 → redirects to /robotic-surgery/
```

| Command         | What it does                         |
| --------------- | ------------------------------------ |
| `npm run dev`   | Development server                   |
| `npm run build` | Production build (must pass)         |
| `npm run start` | Serve the production build           |
| `npm run lint`  | ESLint                               |

### Deploy (Vercel)

1. Import the repository in Vercel. Framework preset: Next.js (no extra settings).
2. Add the environment variables from `.env.example`:
   - `RESEND_API_KEY`: needed for the appointment form to send email.
   - `APPOINTMENT_TO_EMAIL`: inbox for requests (default `info@oncoxpert.in`).
   - `APPOINTMENT_FROM_EMAIL`: a sender on a domain verified in Resend.
3. Deploy. The page is prerendered and revalidates daily (that refreshes the footer year
   and the YouTube video titles).

Without `RESEND_API_KEY` the form shows its error message and asks people to call. It never
pretends a request was sent.

---

## Where the words live

Every word on the page is in two files. Components contain no copy.

| File                          | Contains                                                          |
| ----------------------------- | ----------------------------------------------------------------- |
| `content/pages/robotic-surgery.ts`  | All page sections, numbers, gallery, alt text                     |
| `content/shared/*.ts`         | Google reviews and YouTube IDs (shared by every page)             |
| `content/site.ts`             | Navigation, phone, email, address, socials, footer, WhatsApp text |

Each block is tagged with its source:

- `// SOURCE: EXISTING`: copied from the live site. Do not reword.
- `// SOURCE: DOCTOR`: written by Dr. Sunil. Do not reword.
- `// SOURCE: NEW`: labels we added, pending the doctor's approval.

Patient reviews are quotes: keep their original spelling.

---

## Update the surgery numbers

Open `content/pages/robotic-surgery.ts` and find `surgeryNumbers`:

```ts
counts: [
  { key: "colorectal", label: "Colorectal", count: 51 },
  { key: "stomach", label: "Stomach", count: 32 },
  ...
]
```

Change the `count` values. Everything else follows automatically:

- the big total ("229") is **calculated**, never typed;
- the donut chart, the stat tiles and the "{count} robotic surgeries" badges on the
  *Cancers We Treat* cards all read from the same list.

The outcome percentages (blood loss, hospital stay, pain) and the scar sizes are in
`outcomes` in the same file.

## Add photos to the hero slider

1. Put the image in `public/images/gallery/` (JPG or WebP, at most 2400 px wide;
   `node scripts/optimize-images.mjs` compresses everything in `public/images`).
2. Add an entry to `robotPhotos` in `content/pages/robotic-surgery.ts`:

```ts
export const robotPhotos = [
  ...,
  {
    src: "/images/gallery/operating-room-team.jpg",
    alt: "Dr. Sunil Navalgund and the surgical team at the da Vinci console",
    width: 2400,   // the file's real pixel size
    height: 1600,
    bg: "photo",   // "photo" for normal photographs; "white" only for cut-out product shots
  },
];
```

The hero slider picks it up with no code changes; every photo is shown in the same-size
frame. Always write a descriptive `alt`.

## Add or change videos

Videos are YouTube IDs in `content/shared/videos.ts` (shared by every page). The ID is the part
after `watch?v=` in a YouTube link:

```ts
videos: ["nV-3cYw4f3w", "f9C2rx-d3vA", "5eQ4jZxbz4U", "3PQkYqAZLoY"],
```

The first ID is shown large. Titles and thumbnails are fetched from YouTube automatically
at build time. The YouTube player only loads when a visitor presses play.

## Other common edits

- **Clinic locations / map links**: `locations` in `content/site.ts` (shared by every page). Joshis Clinic
  has no photo yet: add `public/images/locations/joshis-clinic.webp` and set its `image`.
- **Phone, email, socials, address**: `content/site.ts`.
- **Hero slides**: `hero.slides`. `position` / `mobilePosition` set the focal point of each photo.

---

## Analytics

Google Tag Manager (`GTM-PBNWCFV7`, set in `content/site.ts`) loads via `@next/third-parties`
on the visitor's first interaction (scroll, tap, key) or after 12 s, so it never delays the
first paint. These `dataLayer` events are pushed (and queued until GTM is ready):

| Event            | When                                   | Fields                     |
| ---------------- | -------------------------------------- | -------------------------- |
| `phone_click`    | any `tel:` link                        | `location` (section id)    |
| `whatsapp_click` | any WhatsApp link                      | `location`                 |
| `cta_click`      | any CTA button                         | `label`, `location`        |
| `form_submit`    | appointment form submit                | `status`, `service`        |

## Appointment form

- Validation: react-hook-form + zod (`lib/appointment-schema.ts`, shared with the server).
- Submission: Server Action `submitAppointment` in `lib/appointment.ts`.
- Delivery: `lib/appointment-delivery.ts` (Resend). To send to Google Sheets or a CRM instead,
  replace `deliverAppointment` there; nothing else changes.
- Spam: a hidden honeypot field. Filled submissions are dropped silently.

## Project layout

```
app/                    layout, global styles, /robotic-surgery page
components/layout/      top bar, navbar, mega menu, mobile menu, footer, WhatsApp, analytics
components/robotic/     one file per page section
components/ui/          design-system pieces + shadcn/ui components
content/                ALL copy and data
lib/                    form schema + server action, analytics, helpers
public/images/          robotic/, brand/, locations/, gallery/
scripts/                optimize-images.mjs
```
