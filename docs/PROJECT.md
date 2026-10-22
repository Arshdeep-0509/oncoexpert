# OncoXpert website: project guide

Read this first. oncoxpert.in is a surgical oncology practice in Bengaluru led by Dr. Sunil Navalgund.
The site is rebuilt page by page. Most visitors are on phones: design mobile-first.

Pages so far: **Home** (`/`), **Robotic Surgery** (`/robotic-surgery/`) and **Breast Cancer**
(`/breast-cancer-treatment-bangalore/`). They share one site shell and one set of section components;
each page has its own theme.

## Stack

- Next.js 16 (App Router, Cache Components, `trailingSlash: true`), TypeScript strict
- Tailwind CSS v4 (tokens in CSS, no config file); shadcn/ui only for Sheet, Accordion, NavigationMenu,
  Select
- `motion` (import from `"motion/react"`), lucide-react (stroke width 1.75), Embla (+ autoplay), Lenis
- react-hook-form + zod, Resend (appointment form), clsx + tailwind-merge (`cn()`)
- Prettier + prettier-plugin-tailwindcss (class order), ESLint (next config), knip (dead-code check)
- sharp (dev): `npm run images [page]` downloads and resizes a page's stock photos and makes its og.jpg
- Fonts (next/font, loaded once in `app/layout.tsx`): Plus Jakarta Sans (UI/body, home display), Fraunces
  (breast display, emphasis words), Inter (robotic body)

| Command                 | Does                                                             |
| ----------------------- | ---------------------------------------------------------------- |
| `npm run dev`           | dev server on :3000                                              |
| `npm run build`         | production build (must pass)                                     |
| `npm run lint`          | ESLint                                                           |
| `npm run typecheck`     | `tsc --noEmit`                                                   |
| `npm run format`        | Prettier (write); `format:check` to check                        |
| `npm run images [page]` | fetch + resize a page's photos, make its og.jpg (default breast) |
| `npx knip`              | unused files, exports, types, packages                           |

Before committing: `npm run typecheck && npm run lint && npm run format:check && npm run build`.

## Folder map

```
app/
  layout.tsx                 html, body, fonts, providers, Preloader (no header/footer)
  page.tsx                   / Home: renders its own <SiteShell theme="home" …> (see "Home route")
  globals.css                imports tokens + themes; @theme inline token → utility map; shared keyframes
  sitemap.ts, robots.ts      from content/pages/index.ts
  robotic-surgery/           layout.tsx = <SiteShell theme="robotic" …>; page.tsx = sections in order
  breast-cancer-treatment-bangalore/   same, theme="breast"
components/
  layout/                    the site shell, shared by every page
    SiteShell, SiteHeader, TopBar, MegaMenu, MobileMenu, MobileMenuSheet, SiteFooter,
    MobileActionBar, WhatsAppButton, ScrollProgress, Preloader, AppointmentProvider, ThemeSync, …
    header/ footer/ mobile-menu/ preloader/   parts of the bigger shell components
  shared/                    sections every page reuses (each has a `look`, see below)
    Reviews, Videos, Faq, AppointmentSection, Locations, FinalCta, DoctorCard, DoctorPortrait,
    AppointmentButton, Breadcrumb, LiteYouTube
    appointment/             the form (lazy-loaded), its placeholder, Field, FormStyles type
    reviews/                 ReviewsCarousel, ReviewCard, Stars, GoogleMark
  ui/                        primitives: Button, Chip, Container, Counter, Eyebrow, ProgressRing, Reveal,
                             ScrollFillLine, Section, SectionHeading, SwipeRow, text-styles.ts,
                             brand-icons.tsx (icon set) + shadcn: accordion, navigation-menu, select, sheet
  pages/home/                sections used only by Home; SectionPlaceholder until each is built.
                             Hero "Orbit": HomeHero + hero.css (prefix `orbit-`), hero-styles.ts, HeroRing,
                             HeroHeadline, HeroStats, HeroTrustStrip (server) and the islands HeroTicker,
                             HeroCounter, HeroParallax, HeroMotionToggle, HeroParticles(Layer).
                             SurgeonSection (+ SurgeonStats, JourneyTimeline + journey.css),
                             RoboticSection (+ robotic-band.css)
  pages/breast-cancer/       sections used only by the breast page (+ hero.css, hero-styles.ts)
  pages/robotic-surgery/     sections used only by the robotic page (+ pills.ts, form-styles.ts,
                             content-icons.ts); hero-slider/ inside-the-robot/ surgery-numbers/
                             comparing-modalities/ hold the parts of its bigger sections
content/
  types.ts                   shared content types (SectionTone, SectionLook, Review, …)
  site.ts                    nav, contact, socials, clinics, footer, WhatsApp, appointment services, a11y labels
  shared/                    reviews.ts (Google reviews, verbatim), videos.ts (YouTube IDs),
                             sections.ts (appointment / locations / final band copy), organization.ts (JSON-LD facts)
  pages/index.ts             page registry: slug, path, title, theme, themeColor, sitemapPriority?, meta
  pages/<page>.ts            every word and number on that page
  pages/<page>.images.ts     image manifest (file, alt, credit, focal point, size)
lib/
  appointment.ts             Server Action + email delivery (Resend)
  appointment-schema.ts      zod schema shared by the form and the server
  seo.ts                     metadata / viewport helpers
  format.ts                  formatRupees, initials
  utils.ts                   cn, focusRing, sumBy
  hooks/                     use-media, use-element-by-id, use-element-size, use-autoplay-carousel
  analytics.ts, intro.ts, lenis.ts, motion.ts (EASE_OUT_EXPO), nav.ts, image-fade.ts, youtube.ts
styles/
  tokens.css                 shared palette, third-party brand colours, neutral defaults for every token
  themes/home.css, themes/breast.css, themes/robotic.css   one theme per page
scripts/
  fetch-images.mjs           npm run images [page]: reads content/pages/<page>.images.ts
  make-black-bg.mjs          one-off: black-background copy of a white product shot (robotic photos)
  make-portrait-cutout.mjs   one-off: Dr. Sunil's head cut out of the portrait (Home hero ring)
public/images/               brand/ locations/ home/ breast-cancer/ robotic/
```

### Naming

- Component files: `PascalCase.tsx`, one exported component each (internal helpers may live alongside).
- Everything else: `kebab-case` (`.ts`, `.css`, folders). Exceptions: the four shadcn files in
  `components/ui` (kept as generated, also excluded from Prettier) and `brand-icons.tsx` (an icon set).
- Named exports only; default exports only where Next.js requires them (`app/**/page|layout`, `sitemap`,
  `robots`). Import with `@/…` everywhere (CSS `@import`s in `globals.css` stay relative).
- Server components by default. `"use client"` only on interactive islands; a server section passes them
  plain props (icon keys or flags, never functions or lucide components).
- Components over ~200 lines get split: parts go in a kebab-case folder named after the section.

## Theme system

- Components never hardcode a colour or font (no hex, no font names). They use semantic utilities:
  `bg-surface` `bg-surface-alt` `bg-surface-warm` `text-ink` `text-text` `text-muted` `bg-accent`
  `text-accent` `hover:bg-accent-hover` `bg-accent-soft` `text-accent-glow` `bg-highlight` `bg-petal` `text-gold`
  `border-line` `font-display` `font-serif` `rounded-sm|md|lg|xl|pill` `shadow-soft-sm|soft|soft-lg`
  `shadow-card` `py-(--section-y)` `bg-(image:--grad-hero)`. Fixed brand artwork colours (logo, Google
  mark, WhatsApp, the portrait backdrop) are tokens in `styles/tokens.css` too.
- `SiteShell` renders `<div data-theme="…">` around header, page and footer; the theme file redefines
  the tokens on that element (server-rendered, so it applies on first paint). `ThemeSync` mirrors it onto
  `<html>` so Radix portals (sheet, select) match.
- Colours are mapped with `@theme inline` (`--color-accent: var(--accent)`), so a utility reads the
  variable wherever it is used. Fonts and radii are non-inline Tailwind keys (`@theme static` in
  `styles/tokens.css`) that themes override directly (`--font-display: var(--font-serif)`).
- Layout and motion are tokens as well: `--section-y`, `--gutter`, `--header-h`, `--reveal-y`,
  `--reveal-amount`, `--wa-pulse-duration`.
- The robotic theme also defines its original palette names (`primary`, `glow`, `navy`, `teal`, `slate`,
  `border`); only robotic code and the `classic` looks use them.

### Theme recipe

```css
/* styles/themes/<name>.css */
[data-theme="<name>"] {
  /* palette */
  --ink: …;
  --text: …;
  --muted: …;
  --surface: …;
  --surface-alt: …;
  --surface-warm: …;
  --accent: …;
  --accent-hover: …;
  --accent-soft: …;
  --accent-glow: …;
  --highlight: …; /* optional second brand colour, decoration only (home: logo orange) */
  --petal: …;
  --gold: …;
  --line: …;
  --grad-hero: …;
  --grad-plum: …;
  --grad-accent: …;
  /* type */
  --font-display: var(--font-serif); /* or var(--font-jakarta) … */
  /* optional: radii, shadows, --section-y, --gutter, --header-h, --reveal-y, --reveal-amount */
}
```

Anything a theme leaves out falls back to the neutral defaults in `styles/tokens.css`. List the
contrast of every text/background pair in the theme file's header comment (see `themes/home.css`).

### Header over the hero

`SiteShell` takes two independent header props:

- `headerVariant`: the bar's sizes and layout. `"dark"` = the robotic page's original bar (80 → 68px,
  40px top bar from md, CTA from md, stacked mobile footer); `"light"` = the shared bar (64px; 76 → 64px
  on desktop, 36px top bar from lg, CTA from lg, accordion mobile footer).
- `heroTone`: the tone of the hero the transparent bar floats over; `"dark"` gives white text and the
  white logo pill. Defaults to `headerVariant`.

Robotic = `dark` + dark hero, breast = `light` + light hero, home = `light` sizes over a `dark` hero.

## Shared sections and looks

The shared sections both pages use take `look?: "soft" | "classic"` (`SectionLook`; `Faq` and
`Breadcrumb` have only the soft look so far):

- `soft` (default): rounded pills, display serif, swipe rows on phones (the breast page).
- `classic`: the robotic page's original markup and classes, kept pixel-identical.

Each component keeps its looks in a class map at the top of the file (`const looks = { soft, classic }`).
A new page normally uses `soft` and re-themes it with its theme file. `Eyebrow` and `SectionHeading` take
the same values as `variant`.

| Component            | Props (besides `id`, `tone`, `look`)                                                                                                                                 |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Reviews`            | `title`, `reviews` (`reviewsFor(slug, order)` from content/shared)                                                                                                   |
| `Videos`             | `eyebrow`, `title`, `ids`, `labels`                                                                                                                                  |
| `Faq` (no `look`)    | `title`, `contactTitle`, `items` (`question`, `answer`, `icon`), `locations`: every Q&A as an animated card in a masonry grid, contact card last (+ FAQPage JSON-LD) |
| `AppointmentSection` | `page` (email subject), `formStyles?`                                                                                                                                |
| `Locations`          | none (clinics from content)                                                                                                                                          |
| `FinalCta`           | `image` (soft: `{src, focal}`; classic: `{src, width, height}`)                                                                                                      |
| `DoctorCard`         | `label`, `name`, `title?`, `lead?`, `bio`, `emphasis?`, `badges?`, `credentials?`, `cta`, `ctaLook?`, `image`                                                        |
| `AppointmentButton`  | `label`, `service?`, `note?`, `variant?` or `look?` (a page's own link classes)                                                                                      |

- The appointment form is one component. `useAppointment().openAppointment(service?, note?)` scrolls to
  `#appointment` below the header, preselects the service, stores the note and focuses Name; without
  `#appointment` on the page it navigates to the booking page. The server action emails "New appointment
  request - <page> page". Needs `RESEND_API_KEY` (+ `APPOINTMENT_TO_EMAIL`, `APPOINTMENT_FROM_EMAIL`).
- Every page with a hero gives it `id="hero"`; the form section is `id="appointment"`.

## Primitives (components/ui)

- `Container`: 1240px + `--gutter`.
- `Section`: `id`, `tone` = `surface | alt | warm | plum | white | black | ink`; padding `--section-y`.
- `SectionHeading`: `eyebrow`, `title`, `emphasis` (one word of a string title, serif italic, accent),
  `intro`, `align`, `onDark`, `as`, `variant`.
- `Eyebrow`: `soft` = accent-soft pill with a ribbon icon; `classic` = the label text alone.
- `Button`: `primary | secondary | ghost | onDark`, min-height 48px, `fullWidthOnMobile`, `icon`,
  `leadingIcon`, `href` → link, `cta` → analytics label. `buttonClasses()` for non-button elements.
- `Reveal`: fade + rise by `--reveal-y` over 0.7s, once, when `--reveal-amount` of it is visible;
  `stagger` = 0.08s per child. CSS opacity/translate only; reduced motion shows the content at once.
- `Counter` (counts up in view over `duration`, default 1.6s; `reserveWidth` keeps CLS at 0), `ProgressRing` (transform-only fill),
  `Chip`, `ScrollFillLine` (its scroll range is `SCROLL_FILL_OFFSET`, so a timeline can light stops in
  step with the fill), `SwipeRow` (under 768px a scroll-snap row with peek, dots and hint; from md a
  grid), `textStyles` (shared text class strings).

## Content rules

- All visible text, aria labels and alt text live in `/content`. Components contain no copy.
- Tag every block:
  - `// SOURCE: EXISTING`: copied from the live page. Render exactly.
  - `// SOURCE: DOCTOR`: from the doctor's own document. Render exactly.
  - `// SOURCE: NEW`: labels or headings we added, pending the doctor's approval.
  - `// PENDING DOCTOR: …`: something only the doctor can confirm.
- Never paraphrase, shorten or "improve" EXISTING or DOCTOR text; only listed, approved fixes. Review
  quotes keep the reviewers' own spelling.
- Numbers are numbers in content; totals are computed (`sumBy`), never typed in.
- Images: `next/image` everywhere, real `width`/`height` from the manifest, correct `sizes`,
  `style={{ objectPosition: img.focal }}` when cropped. Decorative images get `alt=""` and `aria-hidden`.

## Add a page

1. **Theme**: `styles/themes/<name>.css` (recipe above), `@import` it in `app/globals.css`, add
   `<name>` to `ThemeName` in `content/types.ts`.
2. **Content**: `content/pages/<name>.ts` with every word, SOURCE-tagged, plus `<name>.images.ts` if it
   has photos (and a `pageName` / `pageSlug` export for the form and reviews).
3. **Registry**: add the page to `content/pages/index.ts` (slug, path, title, theme, themeColor, meta);
   sitemap and robots pick it up.
4. **Route**: `app/<slug>/layout.tsx` = `<SiteShell theme="<name>" headerVariant="light|dark">`
   (+ `heroTone` when the hero's tone differs, see "Header over the hero");
   `app/<slug>/page.tsx` exports `metadata`, `generateViewport` (`pageViewport(pages[slug])`) and lists
   the sections. Give the hero `id="hero"`.

### Home route

`/` is `app/page.tsx`, and a `layout.tsx` beside it would be the root layout, which wraps every route
(the other pages would get two shells). So Home's page renders its own `<SiteShell theme="home"
headerVariant="light" heroTone="dark">` around its sections. Home has no child routes, so a layout's only
advantage (staying mounted across child navigations) does not apply: the rendered tree is the same. 5. **Sections**: reuse `components/shared/*` (Reviews, Videos, Faq, AppointmentSection, Locations,
FinalCta, DoctorCard) with the default `soft` look; write page-only sections in
`components/pages/<name>/`. 6. **Nav**: add the page to `site.nav` in `content/site.ts` if it should appear in the menus. 7. **Check**: typecheck, lint, format, build; look at 375 / 768 / 1440; run Lighthouse (mobile).

## Page CSS

- CSS modules do not work here: the Turbopack rule in `next.config.ts` (Tailwind loader for every
  `*.css`) turns `.module.css` into plain CSS. Page CSS is a plain file next to the section with a unique
  class/keyframe prefix (e.g. `components/pages/breast-cancer/hero.css`, prefix `bloom-`) plus a typed
  class map (`hero-styles.ts`).
- Load-time entrance animations wait for the intro: `animation-delay: calc(var(--intro-delay, 0s) + …)`.
- Animations sit in `@media (prefers-reduced-motion: no-preference)`; the default styles are the final
  state. Animate only transform and opacity.

## Responsive rules

- Design at 375px first, then 768, 1024, 1280, 1440; must look intentional at 360 and 1920.
- Mobile layouts may differ completely from desktop (re-order, stack, `SwipeRow`); never just shrink.
- Body text ≥ 16px, line length ≤ 68ch (`measure`), tap targets ≥ 48px, 20px gutters.
- No horizontal page scroll (only inside `SwipeRow`). Use `svh`; respect `env(safe-area-inset-*)`.
- Phones get the `MobileActionBar` dock (Call · WhatsApp · Book Appointment), floating 8px above the
  bottom edge. It appears once the hero has scrolled away and stays visible while scrolling in either
  direction; it hides only over #appointment and while the keyboard is open. The Book pill sizes to its label (fits from 320px); its colours are
  the `--grad-cta` / `--cta-glow` tokens. The footer reserves room for it and `SiteShell` hides the
  floating WhatsApp button under 768px.

## Performance notes

- The brand intro (preloader) plays on every full page load / refresh, on every page; there is no
  per-page opt-out. It covers the page for ~3.3s, so anything that animates or auto-advances on load
  must wait for it: CSS via `--intro-delay`, JS via `introRemainingSeconds()` (`lib/intro.ts`).
  In-site navigation does not replay it (the root layout stays mounted).
- Known issue: `--intro-delay` comes from `.preloader ~ [data-theme]`, so it drops to 0 when the
  overlay unmounts (end of its fade, intro + 0.8s; earlier on slow loads, where the overlay's safety
  timer, counted from navigation start, fires before the CSS fade ends). Every entrance animation
  still running then jumps to its end. The Home hero pins its own `--intro` on hydration
  (`HeroMotionToggle`); the breast hero does not yet, and the overlay timer is unchanged, so the
  other pages keep their current behaviour.
- Loops longer than 5s on Home stop on hover/focus or with a pause control; the hero's button
  (`data-paused` on #hero) stops every hero loop, and leaving the screen does too (`data-offscreen`).
- Never hide the hero LCP image behind clip-path / opacity at load; reveal it with a transform on a
  cover element.
- Avoid `filter: blur()` / `backdrop-filter` on large or animated elements above the fold.
- Do not add `content-visibility: auto` to sections: it broke scroll-to-#appointment.
- Lighthouse on a Windows laptop: a fresh Chrome adds ~2s to first paint. Compare with a warm Chrome
  (`--port`) or PageSpeed Insights on the deployed site.

## Status

- Home: foundation. Theme (`themes/home.css`), every word of the live homepage in
  `content/pages/home.ts`, images (`home.images.ts`, `npm run images home`, og.jpg), registry, sitemap
  (priority 1) and one placeholder per block still to build (#specialties, #services, #approach,
  #value, #reviews, #videos, #faq, #appointment, #locations, #final-cta).
  Built: #hero ("Orbit": gradient ring with the portrait, ticker, stat chips, trust marquee),
  #surgeon (portrait, training-journey timeline, stats band) and #robotic (dark band with the
  da Vinci arms and the 8 features).
  Waiting on the doctor's PENDING items in `content/pages/home.ts`.
- Robotic Surgery: live design, rebuilt on the shared components (`classic` look), pixel-identical.
- Breast Cancer: all 17 sections, SEO (JSON-LD, sitemap, robots), analytics. Waiting on the doctor's
  PENDING items in `content/pages/breast-cancer.ts`.
