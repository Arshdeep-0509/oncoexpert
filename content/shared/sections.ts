/**
 * Copy of the sections shared by every page (appointment, locations, final call band).
 * Pages pass these to the shared components in components/shared/.
 *
 * SOURCE tags: see content/types.ts.
 */
import { site } from "@/content/site";

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
    dateTime: "Date / Time",
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
      dateTime: "Please choose a future date and time.",
    },
    // SOURCE: NEW (hidden spam trap label, never visible)
    honeypot: "Leave this field empty",
  },
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
