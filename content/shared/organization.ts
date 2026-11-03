/**
 * Entity facts about the physician and the clinic, shared by every page's structured data
 * (JSON-LD), /llms.txt and the "Medically reviewed" line. One place, so search and answer
 * engines see the same name, credentials, addresses, phone and profiles everywhere. The @ids are
 * stable, so search engines see one physician and one clinic across all pages.
 */
import { site } from "@/content/site";

// PENDING DOCTOR: the profile URLs below. Each is left out of `sameAs` until it is filled in.
const pendingProfiles = {
  // Google Business Profile of OncoXpert (the "Share" link of the business listing).
  googleBusiness: null as string | null,
  // Dr. Sunil Navalgund on Practo.
  practo: null as string | null,
  // Dr. Sunil Navalgund's own LinkedIn (the clinic's company page is in site.socials).
  doctorLinkedIn: null as string | null,
};

export const organization = {
  physicianId: `${site.url}/#dr-sunil-navalgund`,
  clinicId: `${site.url}/#clinic`,
  physician: {
    // SOURCE: EXISTING
    name: "Dr. Sunil Navalgund",
    // PENDING DOCTOR: "Lead Surgical Oncologist" (endometrial, booking) / "Expert Surgical
    // Oncologist" (thyroid) / "SURGICAL ONCOLOGIST" (ovarian): one title for structured data?
    jobTitle: "Lead Surgical Oncologist",
    specialty: "Oncologic",
    // PENDING DOCTOR: "MCH Surgical Oncology, FIAGES" (endometrial) vs "MBBS, MS, MCh (Surgical
    // Oncology)" (colorectal): which is the full, correct list?
    qualifications: "MCH Surgical Oncology, FIAGES",
    // SOURCE: EXISTING (lung page: "Tata Memorial Hospital, Mumbai")
    training: "Tata Memorial Hospital, Mumbai",
    image: "/images/brand/dr-sunil-navalgund.png",
    // NEW: the short description used by the "Medically reviewed" line and llms.txt.
    summary: "Surgical oncologist in Bengaluru",
    sameAs: [pendingProfiles.doctorLinkedIn, pendingProfiles.practo].filter((u): u is string => u !== null),
  },
  clinic: {
    name: "OncoXpert",
    // SOURCE: EXISTING (the logo artwork)
    alternateName: "OncoXpert Comprehensive Cancer Centre",
    telephone: "+91-8002800295",
    logo: "/images/brand/oncoxpert-logo-square.png",
    // SOURCE: EXISTING (site.mainClinic.address)
    // PENDING DOCTOR: the main clinic is "South end clinics … Basavanagudi" here and in the footer,
    // but "South End Clinics, Jayanagar" in the clinic list. Which area is right?
    address: {
      streetAddress: "South end clinics, Old Kanakapura Rd, near Mecon and shell petrol bunk, Basavanagudi",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560004",
      addressCountry: "IN",
    },
    // Facebook, Instagram, LinkedIn and YouTube (site.socials), then the pending profiles.
    sameAs: [...site.socials.links.map((s) => s.href), pendingProfiles.googleBusiness].filter(
      (u): u is string => u !== null,
    ),
  },
  /** The profiles still missing, for the hand-off report. */
  pendingProfiles,
} as const;
