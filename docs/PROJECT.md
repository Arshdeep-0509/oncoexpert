# OncoXpert website: project guide

Read this first, every step. oncoxpert.in is a surgical oncology practice in Bengaluru led by
Dr. Sunil Navalgund. We rebuild it page by page. Most visitors are on phones: design mobile-first.

## Stack

- Next.js 16 (App Router, Cache Components, `trailingSlash: true`), TypeScript strict
- Tailwind CSS v4 (tokens in CSS, no config file), shadcn/ui only for Sheet, Accordion,
  NavigationMenu, Dialog, Select
- `motion` (import from `"motion/react"`), lucide-react (stroke width 1.75), Embla (+ autoplay)
- react-hook-form + zod, Resend (appointment form), clsx + tailwind-merge (`cn()`)
- sharp (dev): `npm run images` downloads and resizes page photos
- Fonts (next/font, loaded once in `app/layout.tsx`): Plus Jakarta Sans 400–800 (UI/body),
  Fraunces variable + italic (breast display), Inter (robotic body)

Commands: `npm run dev` · `npm run build` · `npm run lint` · `npm run images`

## Folder map

```
app/
  layout.tsx                    html, body, fonts, providers only (no header/footer)
  globals.css                   imports tokens + themes; @theme inline token → utility map
  robotic-surgery/              layout.tsx = <SiteShell theme="robotic" headerVariant="dark">
  breast-cancer-treatment-bangalore/
                                layout.tsx = <SiteShell theme="breast" headerVariant="light">
components/
  layout/    SiteShell, SiteHeader (+TopBar), MegaMenu, MobileMenu(+Sheet), SiteFooter,
             MobileActionBar, WhatsAppButton, ScrollProgress, ThemeSync, Providers, Preloader
  shared/    sections reused by many pages: Reviews, Videos, Faq, AppointmentSection,
             Locations, FinalCta (+ SectionPlaceholder while pages are scaffolded)
  ui/        primitives: container, section, section-heading, eyebrow, button, reveal,
             counter, swipe-row, chip, progress-ring (+ shadcn: sheet, accordion, dialog,
             navigation-menu, select, brand-icons)
  pages/<page>/   sections used only by that page
  robotic/        the robotic page's sections and its own primitives (robotic/ui). Frozen.
content/
  types.ts                      shared content types
  site.ts                       nav, contact, socials, locations, footer, WhatsApp, a11y labels
  shared/reviews.ts             Google reviews (verbatim)
  shared/videos.ts              YouTube IDs
  pages/<page>.ts               every word on a page
  pages/<page>.images.ts        image manifest (file, alt, credit, focal point, size)
  pages/index.ts                page registry (slug, path, title, theme, themeColor, meta)
lib/        cn(), seo.ts (metadata/viewport), content.ts (totals, ₹ formatting), appointment
styles/
  tokens.css                    shared neutrals + neutral defaults for every semantic token
  themes/<name>.css             one theme per page
scripts/fetch-images.mjs
```

## Theme system

- Components NEVER hardcode a colour or font. Use semantic utilities only:
  `bg-surface` `bg-surface-alt` `bg-surface-warm` `text-ink` `text-text` `text-muted`
  `bg-accent` `text-accent` `hover:bg-accent-hover` `bg-accent-soft` `text-accent-glow`
  `bg-petal` `text-gold` `border-line` `font-display` `font-serif` `rounded-sm|md|lg|xl|pill`
  `shadow-soft-sm|soft|soft-lg` `shadow-card` `py-(--section-y)` `bg-(image:--grad-hero)`.
- `SiteShell` renders `<div data-theme="…">` around header, page and footer. The theme file
  redefines the tokens on that element. Server-rendered, so it applies on first paint.
  `ThemeSync` mirrors it onto `<html>` so Radix portals (sheet, dialog, select) match.
- Colours are mapped with `@theme inline` (`--color-accent: var(--accent)`), so a utility
  reads the variable wherever it is used. Fonts and radii are non-inline Tailwind keys
  (`styles/tokens.css`, `@theme static`) that themes override directly
  (`--font-display: var(--font-serif)`).
- Robotic page names (`primary`, `glow`, `border`, `navy`, `teal`, `slate`) still exist for
  `components/robotic` only. New code uses the semantic names.
- The robotic page must keep looking exactly the same. Do not edit `components/robotic`,
  `styles/themes/robotic.css` or the robotic primitives in `components/robotic/ui`.
- Browser bar colour: each page exports `generateViewport` → `pageViewport(pages[slug])`.

### Add a page (no shared component changes)

1. `styles/themes/<name>.css`: `[data-theme="<name>"] { --ink … --accent … --font-display … }`,
   and `@import` it in `app/globals.css`. Add `<name>` to `ThemeName` in `content/types.ts`.
2. `content/pages/<name>.ts` (+ `<name>.images.ts` if it has photos).
3. Add the page to `content/pages/index.ts` (slug, path, title, theme, themeColor, meta).
4. `app/<slug>/layout.tsx`: `<SiteShell theme="<name>" headerVariant="light|dark">`.
5. `app/<slug>/page.tsx`: `metadata = pageMetadata(page)`, `generateViewport`, sections.
6. Page-only sections in `components/pages/<name>/`; reuse `components/shared/` sections.

## Content rules

- ALL visible text lives in `/content`. Components never hardcode copy (incl. aria labels).
- Tag every block:
  - `// SOURCE: EXISTING` copied from the live page. Render exactly.
  - `// SOURCE: DOCTOR` from the doctor's own document. Render exactly.
  - `// SOURCE: NEW` labels or headings we added. Pending the doctor's approval.
- Never paraphrase, shorten or "improve" EXISTING or DOCTOR text. Only the spelling fixes a
  step explicitly lists are allowed. Review quotes keep the reviewers' own spelling.
- All numbers (prices, percentages, case counts) are numbers in content. Totals are computed
  (`lib/content.ts → totalAmount`), never typed in.
- Images: `next/image` everywhere, with real `width`/`height` from the manifest, correct
  `sizes`, and `style={{ objectPosition: img.focal }}` when cropped. Decorative images get
  `alt=""` and `aria-hidden`.

## Page CSS

- CSS modules do not work here: the Turbopack rule in `next.config.ts` (Tailwind loader for
  every `*.css`) turns `.module.css` into plain CSS. Page-specific CSS is a plain file next to
  the component with a unique class/keyframe prefix (e.g. `components/pages/breast-cancer/hero.css`,
  prefix `bloom-`), imported once by the section, plus a typed class map (`hero-styles.ts`).
- Load-time entrance animations wait for the intro preloader:
  `animation-delay: calc(var(--intro-delay, 0s) + …)` (set in `globals.css`).
- Animations go inside `@media (prefers-reduced-motion: no-preference)`; the default styles are
  the final state.

## Primitives (components/ui)

- `Container`: 1240px + gutter (`--gutter`: 20px, 32px from md).
- `Section`: `id`, `tone` = `surface | alt | warm | plum`; padding `--section-y`
  (clamp 64–128px).
- `SectionHeading`: `eyebrow`, `title`, `emphasis` (ONE word of the title, Fraunces italic,
  accent), `intro`, `align`, `onDark`, `as`.
- `Eyebrow`: accent-soft pill, 12px uppercase, tracking 0.16em, tiny ribbon icon.
- `Button`: `primary | secondary | ghost | onDark`, min-height 48px, `fullWidthOnMobile`,
  `icon` (nudges right on hover), `leadingIcon`, `href` → link, `cta` → analytics label.
- `Reveal`: fade + rise 24px (16px under 768), 0.7s, ease [0.22,1,0.36,1], once at 15%,
  `stagger` = 0.08s per child. CSS opacity/translate only.
- `Counter`: counts up in view, tabular-nums, `prefix` / `suffix` ("₹", "%", "k").
- `SwipeRow`: the core mobile pattern. Under 768px a scroll-snap row (cards 82% wide, next
  one peeks, edge fade, dots); from md a grid (`gridClassName`).
- `Chip`, `ProgressRing` (fills to a % in view; transform-only).
- `ScrollFillLine`: 2px timeline track whose accent fill grows with scroll (scaleY).
- `SwipeRow` extras: `hint` ("Swipe", fades after the first swipe) and per-index `itemClassName`
  (an array, so server components can pass grid spans).
- Client components only receive serialisable props: pass icon keys or flags, never a lucide icon.
- Motion: `<MotionConfig reducedMotion="user">` at the root, plus a CSS
  `prefers-reduced-motion` block. Animate ONLY transform and opacity.

## Responsive rules

- Design at 375px first, then 768, 1024, 1280, 1440. Must look intentional at 360 and 1920.
- Mobile layouts may be completely different from desktop: re-order, stack, or switch to a
  `SwipeRow`. Never just shrink the desktop.
- Body text ≥ 16px; line length ≤ 68ch (`measure`); tap targets ≥ 48px; 20px side gutters.
- Never any horizontal page scroll (only inside `SwipeRow`). `SiteShell` clips x-overflow.
- Use `svh` for tall sections; respect `env(safe-area-inset-*)`.
- Phones get the fixed `MobileActionBar` (Call · WhatsApp · For Appointment); `SiteShell`
  reserves its space. The floating WhatsApp button is hidden under 768px on those pages.

## Site shell (components/layout)

- `SiteShell` props: `theme`, `headerVariant`, `activeHref`, `appointmentHref` ("#appointment"
  on pages with the form, otherwise `site.appointmentCta.href`), `footerArt`, `mobileActionBar`.
  It renders SkipLink, TopBar, SiteHeader, `<main id="main">`, SiteFooter, MobileActionBar,
  WhatsAppButton, all inside `AppointmentProvider`.
- Header variants: "light" = 36px utility bar from lg; bar 64px on phones/tablets, 76 → 64px
  on desktop after 24px; transparent over `#hero`, then white/85 + blur + hairline + shadow-sm.
  "dark" = the robotic page's original sizes (80 → 68px, utility bar from md). One
  IntersectionObserver watches the hero and a scroll sentinel; no scroll listeners.
- Every page with a hero gives it `id="hero"`; the form section is `id="appointment"` and its
  Name input has `name="name"`.
- `useAppointment().openAppointment(service?, note?)`: scrolls to #appointment below the
  sticky header, preselects the service, stores the note, focuses Name; without #appointment
  it navigates to the booking page. Forms read `service`, `note` and `requestId`.
- `MobileActionBar` (< md): hidden over the hero, over #appointment and while the keyboard is
  open. The footer reserves its height under the copyright line.
- Element lookups by id from layout components go through `lib/use-element-by-id.ts`: the
  page below the shell can mount later or be re-created.

## Shared sections

- `components/shared/DoctorPortrait`: Dr. Sunil's arch portrait (photo-sampled backdrop, masks,
  parallax). Used by the robotic MeetTheDoctor and by `DoctorCard`.
- `components/shared/DoctorCard`: the doctor section for every new page (label, name, title,
  bio + emphasis, badges, CTA), themed by the page.
- Totals are computed with `lib/content.ts` (`sumBy`, `totalAmount`), never typed into content.

## Shared sections (components/shared) — every page reuses these

- `Reviews` (title + `reviewsFor(slug, order)` from content/shared/reviews.ts; hide a review on a
  page with `excludeOn: ["<slug>"]`), `Videos` (IDs from content/shared/videos.ts), `Faq`
  (FAQPage JSON-LD from the same items), `AppointmentSection` (prop `page`, e.g. "Breast Cancer"),
  `Locations`, `FinalCta` (prop `image`). Copy: content/shared/sections.ts.
- The appointment form is shared (components/shared/appointment); the robotic page passes its own
  field styles. The server action emails "New appointment request - <page> page" with the note.
  Needs `RESEND_API_KEY` (+ `APPOINTMENT_TO_EMAIL`, `APPOINTMENT_FROM_EMAIL`) in .env.local / Vercel.
- Structured data facts: content/shared/organization.ts. Sitemap/robots: app/sitemap.ts, app/robots.ts
  (from content/pages/index.ts).

## Performance notes

- `<SiteShell intro={false}>` turns the brand intro (preloader) off for a page. It covers the page
  for ~3.3s, which costs LCP / Speed Index; the breast page turns it off, the robotic page keeps it.
- Hero LCP image: never hide it behind clip-path / opacity at load; reveal it with a transform on a
  cover element instead, so the photo paints immediately.
- Avoid `filter: blur()` / `backdrop-filter` on large or animated elements above the fold (costly
  to paint in software rendering, which Lighthouse/PageSpeed use). Use radial gradients.
- Do not add `content-visibility: auto` to sections: it broke scroll-to-#appointment positions.
- Lighthouse on a Windows laptop: a fresh Chrome instance adds ~2s to first paint (environment
  artefact). Compare against a warm Chrome (`--port`) or PageSpeed Insights on the deployed site.

## Status

- Robotic Surgery: built (frozen).
- Site shell: STEP 2 done (header, mega menu, mobile menu, action bar, WhatsApp, footer,
  appointment context).
- Breast Cancer: STEP 6 done: all 17 sections built, SEO (JSON-LD, sitemap, robots), analytics, QA.
  STEP 7 (launch) remains.
