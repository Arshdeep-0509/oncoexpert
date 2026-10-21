import { meta, structuredData, surgeon } from "@/content/pages/breast-cancer";
import { organization as org } from "@/content/shared/organization";
import { site } from "@/content/site";

/**
 * MedicalWebPage (about: the page's MedicalCondition) + Physician + MedicalClinic,
 * linked in one @graph. BreadcrumbList (hero) and FAQPage (#faq) are emitted by those sections.
 */
export function BreastJsonLd() {
  const { physician, clinic } = org;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${meta.canonical}#webpage`,
        url: meta.canonical,
        name: meta.title,
        description: meta.description,
        inLanguage: "en-IN",
        about: { "@type": "MedicalCondition", name: structuredData.pageAbout },
        reviewedBy: { "@id": org.physicianId },
        publisher: { "@id": org.clinicId },
      },
      {
        "@type": "Physician",
        "@id": org.physicianId,
        name: physician.name,
        jobTitle: physician.jobTitle,
        medicalSpecialty: physician.specialty,
        description: surgeon.bio,
        hasCredential: physician.qualifications,
        image: `${site.url}${physician.image}`,
        telephone: clinic.telephone,
        worksFor: { "@id": org.clinicId },
      },
      {
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
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output; "<" escaped so the payload can never close the script tag.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
