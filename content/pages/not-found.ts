/**
 * Every word on the "page not found" screen (app/not-found.tsx). Pages that are linked from the
 * menu but not rebuilt yet (Urology, Stomach Cancer, Our Services, Blogs) land here, so it says the
 * page is being prepared rather than missing.
 *
 * SOURCE: NEW (all of it). PENDING DOCTOR: approve the wording.
 */
export const notFound = {
  eyebrow: "Under construction",
  title: "This page is under construction",
  body: "It will be updated soon. Meanwhile, you can book a consultation or read about the cancers we treat.",
  home: { label: "Back to home", href: "/" },
  book: "Book Consultation",
  more: "Cancers we treat",
  // The page's <title> (search engines get a 404 status: this page is not indexed).
  meta: { title: "Page under construction | OncoXpert" },
} as const;
