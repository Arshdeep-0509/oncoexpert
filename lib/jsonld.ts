import type { Location } from "@/content/types";
import { organization as org } from "@/content/shared/organization";
import { site } from "@/content/site";

/*
 * Structured data (JSON-LD) nodes shared by every page. The @ids are stable, so search engines
 * see one physician and one clinic across the site; each page links its own nodes to them.
 */

/** The physician. `description`: the page's EXISTING text about the doctor. */
export function physicianNode(description: string) {
  const { physician, clinic } = org;
  return {
    "@type": "Physician",
    "@id": org.physicianId,
    name: physician.name,
    jobTitle: physician.jobTitle,
    medicalSpecialty: physician.specialty,
    description,
    hasCredential: physician.qualifications,
    image: `${site.url}${physician.image}`,
    telephone: clinic.telephone,
    worksFor: { "@id": org.clinicId },
  };
}

/** The clinic (MedicalClinic, a MedicalOrganization). */
export function clinicNode() {
  const { physician, clinic } = org;
  return {
    "@type": "MedicalClinic",
    "@id": org.clinicId,
    name: clinic.name,
    url: site.url,
    logo: `${site.url}${clinic.logo}`,
    telephone: clinic.telephone,
    email: site.contact.email,
    address: { "@type": "PostalAddress", ...clinic.address },
    medicalSpecialty: physician.specialty,
    sameAs: site.socials.links.map((s) => s.href),
    hasMap: site.mainClinic.mapHref,
  };
}

type FaqSource = { question: string; answer: readonly string[]; showLocations?: boolean };

/** FAQ cards as schema.org Questions; an answer that lists the clinics on the page lists them here too. */
export function faqQuestions(items: readonly FaqSource[], locations: readonly Location[]) {
  return items.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: [...item.answer, ...(item.showLocations ? locations.map((l) => `${l.name}, ${l.area}`) : [])].join(" "),
    },
  }));
}

/** A <script type="application/ld+json"> payload: JSON with "<" escaped, so it can never close the tag. */
export const jsonLdHtml = (data: unknown) => JSON.stringify(data).replace(/</g, "\\u003c");
