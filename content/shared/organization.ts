/**
 * Facts about the physician and the clinic for structured data (JSON-LD), shared by every
 * page. Not visible on the page. The @ids are stable, so search engines see one physician
 * and one clinic across all pages.
 */
import { site } from "@/content/site";

export const organization = {
  physicianId: `${site.url}/#dr-sunil-navalgund`,
  clinicId: `${site.url}/#clinic`,
  physician: {
    name: "Dr. Sunil Navalgund",
    jobTitle: "Lead Surgical Oncologist",
    specialty: "Oncologic",
    qualifications: "MCH Surgical Oncology, FIAGES",
    image: "/images/brand/dr-sunil-navalgund.png",
  },
  clinic: {
    name: "OncoXpert",
    telephone: "+91-8002800295",
    logo: "/images/brand/oncoxpert-logo-square.png",
    address: {
      streetAddress: "South end clinics, Old Kanakapura Rd, near Mecon and shell petrol bunk, Basavanagudi",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560004",
      addressCountry: "IN",
    },
  },
} as const;
