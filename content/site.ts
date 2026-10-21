/**
 * Site-wide content: navigation, contact details, socials, footer, WhatsApp popup.
 *
 * SOURCE tags:
 *   EXISTING → copied from the live site (oncoxpert.in). Render exactly.
 *   DOCTOR   → new statement from Dr. Sunil. Render exactly.
 *   NEW      → labels/captions we added. Pending the doctor's approval.
 *
 * URLs are relative so they keep working as the rest of the site moves to Next.js.
 */

import type { Location } from "@/content/types";

/** Icon keys are mapped to lucide icons in components/layout/nav-icons.tsx. */
export type ServiceIcon =
  "breast" | "colorectal" | "endometrial" | "lung" | "urology" | "stomach" | "ovarian" | "thyroid";

export type NavChild = { label: string; href: string; icon: ServiceIcon };
export type NavItem = { label: string; href: string; children?: readonly NavChild[] };

export type SocialKey = "facebook" | "instagram" | "linkedin" | "youtube";

export const site = {
  // SOURCE: EXISTING
  name: "OncoXpert",
  url: "https://oncoxpert.in",

  logo: {
    // brand/oncoxpert-logo.png, trimmed and with its white background made transparent (same look on white).
    src: "/images/brand/oncoxpert-logo-transparent.png",
    width: 946,
    height: 266,
    // SOURCE: NEW
    alt: "OncoXpert Comprehensive Cancer Centre",
  },

  // SOURCE: EXISTING ("About US" → "About Us" per approved fix)
  nav: [
    { label: "Home", href: "/" },
    { label: "Robotic Surgery", href: "/robotic-surgery/" },
    {
      label: "Our Services",
      href: "/our-services/",
      children: [
        { label: "Breast Cancer", href: "/breast-cancer-treatment-bangalore/", icon: "breast" },
        { label: "Colorectal Cancer", href: "/colon-cancer-treatment-bangalore/", icon: "colorectal" },
        { label: "Endometrial Cancer", href: "/endometrial-cancer-treatment-bangalore/", icon: "endometrial" },
        { label: "Lung Cancer", href: "/lung-cancer-in-bangalore/", icon: "lung" },
        { label: "Urology", href: "/urology/", icon: "urology" },
        { label: "Stomach Cancer", href: "/stomach-cancer/", icon: "stomach" },
        { label: "Ovarian Cancer", href: "/ovarian-cancer-treatment/", icon: "ovarian" },
        { label: "Thyroid Cancer", href: "/thyroid-cancer/", icon: "thyroid" },
      ],
    },
    { label: "About Us", href: "/about-us/" },
    { label: "Blogs", href: "/blog-1/" },
  ] satisfies readonly NavItem[],

  // SOURCE: EXISTING
  // `href` keeps the live URL spelling ("appoinment"). Pages can override the
  // target via the Navbar `appointmentHref` prop, e.g. "#appointment".
  appointmentCta: {
    label: "For Appointment",
    href: "/book-your-appoinment-page/",
  },

  // SOURCE: EXISTING
  contact: {
    phoneDisplay: "+91 8002 8002 95",
    phoneHref: "tel:+918002800295",
    email: "info@oncoxpert.in",
    emailHref: "mailto:info@oncoxpert.in",
  },

  // SOURCE: EXISTING
  mainClinic: {
    label: "Main Clinic Location",
    address:
      "South end clinics, Old Kanakapura Rd, near Mecon and shell petrol bunk, Basavanagudi, Bengaluru, Karnataka 560004",
    mapHref: "https://maps.app.goo.gl/jM5SVCXp6iHMGHcS8",
  },

  // SOURCE: EXISTING (clinic locations; shown by the Locations section on every page)
  locations: [
    {
      name: "South End Clinics",
      area: "Jayanagar",
      mapHref: "https://share.google/mNL5rEF9Ughai9bgl",
      image: { src: "/images/locations/south-end-clinics.webp", width: 512, height: 294 },
    },
    {
      name: "SPARSH Hospital",
      area: "RR Nagar",
      mapHref: "https://share.google/xmRyLd7Tkaf1fnlBQ",
      image: { src: "/images/locations/sparsh-hospital.webp", width: 512, height: 335 },
    },
    {
      name: "Joshis Clinic",
      area: "Sahakara Nagar",
      mapHref: "https://share.google/ydsuRZi3sietkT4LR",
      image: { src: "/images/locations/joshis-clinic.webp", width: 1024, height: 655 },
    },
  ] satisfies Location[],

  // SOURCE: EXISTING
  socials: {
    label: "Our Social Media Handles",
    links: [
      {
        key: "facebook",
        label: "Facebook",
        href: "https://www.facebook.com/people/OncoXpert-Comprehensive-Cancer-Center/61591338666654/",
      },
      { key: "instagram", label: "Instagram", href: "https://www.instagram.com/oncoxpert.in/" },
      { key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/oncoxpertindia" },
      { key: "youtube", label: "YouTube", href: "https://www.youtube.com/@Oncoxpertblr" },
    ] satisfies readonly { key: SocialKey; label: string; href: string }[],
  },

  footer: {
    // SOURCE: EXISTING
    brand: "OncoXpert",
    // SOURCE: EXISTING
    tagline: "Expert oncology care bridging world-class technology with compassionate healing.",
    // SOURCE: NEW
    copyright: (year: number) => `© ${year} OncoXpert. All rights reserved.`,
    // SOURCE: NEW (mobile footer: title of the quick-links accordion)
    quickLinks: "Quick Links",
  },

  // SOURCE: EXISTING (live WhatsApp chat popup)
  whatsapp: {
    href: "https://wa.me/918002800295",
    greeting: "👋 Welcome to OncoXpert",
    question: "Need expert cancer care?",
    intro: "💬 Chat with our Cancer Care Team for:",
    topics: ["• Consultation", "• Second Opinion", "• Appointment Booking"],
    closing: "We're here to help.",
    openLabel: "Open Chat",
  },

  // Mobile action bar (fixed to the bottom of the screen under 768px).
  actionBar: {
    // SOURCE: NEW
    call: "Call",
    whatsapp: "WhatsApp",
    book: "Book Appointment",
  },

  // SOURCE: EXISTING ("Service Required" options of the appointment form)
  appointmentServices: ["Consultation", "Second Opinion", "Consultation For Surgery", "Follow Up"],

  // Google Tag Manager container (loaded via @next/third-parties)
  analytics: { gtmId: "GTM-PBNWCFV7" },

  // SOURCE: EXISTING (wording from the OncoXpert logo artwork), shown by the intro preloader
  preloader: {
    brandLead: "ONCO",
    brandTail: "XPERT",
    tagline: "Comprehensive Cancer Centre",
    values: ["COMPASSION", "EXPERTISE", "EXCELLENCE"],
  },

  // SOURCE: NEW (screen-reader-only labels; never shown as body copy)
  a11y: {
    skipToContent: "Skip to content",
    mainNav: "Main",
    mobileNav: "Mobile",
    footerServices: "Our services",
    footerQuickLinks: "Quick links",
    home: "OncoXpert home",
    call: "Call OncoXpert",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    menuTitle: "Menu",
    openWhatsapp: "Chat with OncoXpert on WhatsApp",
    closeWhatsapp: "Close chat",
    current: "current page",
    newTab: "(opens in a new tab)",
    carousel: "carousel",
    slide: "slide",
    actionBar: "Quick contact",
    youAreHere: "You are here",
  },
} as const;

type Site = typeof site;

/** "Service Required" options of the appointment form. */
export type AppointmentService = Site["appointmentServices"][number];
