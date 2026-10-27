/**
 * Copy of the sections shared by every page (appointment, locations, final call band).
 * Pages pass these to the shared components in components/shared/.
 *
 * SOURCE tags: see content/types.ts.
 */
import { site } from "@/content/site";
import type { ReviewId } from "@/content/shared/reviews";
import { youtubeVideos } from "@/content/shared/videos";

/* ------------------------------------------------------------------ */
/* #appointment                                                        */
/* ------------------------------------------------------------------ */

export const appointmentSection = {
  // SOURCE: EXISTING
  eyebrow: "GET IN TOUCH",
  heading: "Need Clarity?",
  body: "Whether it’s a new diagnosis or you’re seeking a second opinion on surgical options, our specialists are here to provide clear, compassionate guidance.",
  form: {
    // SOURCE: EXISTING ("Consulation" on the live site → "Consultation", approved fix)
    title: "Appointment Form",
    name: "Name",
    phone: "Contact Number",
    service: "Service Required",
    servicePlaceholder: "- Select -",
    services: site.appointmentServices,
    // SOURCE: NEW (the live label is "Date / Time"; the form now asks for a date only)
    date: "Date",
    // SOURCE: EXISTING
    submit: "Submit Form",
    // SOURCE: NEW
    sending: "Sending…",
    success: "Thank you! Our team will call you shortly to confirm your appointment.",
    error: "Something went wrong. Please call +91 8002 8002 95.",
    // SOURCE: NEW (validation messages)
    errors: {
      name: "Please enter your name.",
      phone: "Please enter a valid 10-digit Indian mobile number.",
      service: "Please choose a service.",
      date: "Please choose today or a later date.",
    },
    // SOURCE: NEW (hidden spam trap label, never visible)
    honeypot: "Leave this field empty",
  },
} as const;

/* ------------------------------------------------------------------ */
/* #reviews and #videos (the booking and about pages; Home and the     */
/* breast page still keep their own copies of the same strings)        */
/* ------------------------------------------------------------------ */

export const reviewsSection = {
  // SOURCE: EXISTING (as displayed: the live markup is sentence case, capitalised by CSS)
  title: "Every Patient Story Reflects Our Commitment To Clinical Excellence.",
  // SOURCE: NEW (label; replaces the live "Verified by Trustindex" badge). The link is EXISTING:
  // the live site's "Main Clinic Location" Google profile (site.mainClinic).
  // PENDING DOCTOR: the doctor has three Google profiles (one per clinic); confirm which one
  // these reviews are on.
  link: { label: "Read all reviews on Google", href: site.mainClinic.mapHref },
  // The live order (identical on Home, the booking page and the about page).
  order: [
    "muralidharan-chinnusamy",
    "veena-iyer",
    "shwetha-jayaraj",
    "padmavathi-p",
    "jayashree-ajith",
    "friendly-work",
    "narasimhamurthy-sm",
    "vasudeva-murthy",
    "mangala-music",
  ],
} as const satisfies { title: string; link: { label: string; href: string }; order: readonly ReviewId[] };

export const videosSection = {
  // SOURCE: NEW (the live pages show their videos without a heading; same words as Home)
  eyebrow: "Watch & learn",
  title: "Hear from our experts",
  // SOURCE: EXISTING (video IDs, content/shared/videos.ts)
  ids: youtubeVideos,
  // SOURCE: NEW (screen-reader labels)
  a11y: { play: "Play video", frame: "YouTube video", list: "Videos" },
} as const;

/* ------------------------------------------------------------------ */
/* #locations                                                          */
/* ------------------------------------------------------------------ */

export const locationsSection = {
  // SOURCE: EXISTING
  heading: "Our Clinical Locations",
  intro:
    "Visit any of our cancer care centers across Bengaluru for expert consultations and advanced surgical oncology care.",
  items: site.locations,
  // SOURCE: NEW
  mapLabel: "Open in Maps",
  // SOURCE: NEW (alt text)
  imageAlt: (name: string, area: string) => `${name}, ${area}`,
  // SOURCE: NEW (screen-reader label of the phone swipe row)
  a11y: { list: "Clinic locations" },
} as const;

/* ------------------------------------------------------------------ */
/* Final call band                                                     */
/* ------------------------------------------------------------------ */

export const finalCtaSection = {
  // SOURCE: EXISTING
  text: "Call 8002 8002 95 For Appointments",
  href: "tel:+918002800295",
} as const;
