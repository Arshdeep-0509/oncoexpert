import { doctor, meta, structuredData } from "@/content/pages/robotic-surgery";
import { site } from "@/content/site";

/** MedicalWebPage + Physician + MedicalClinic, linked in one @graph. */
export function JsonLd() {
  const clinicId = `${site.url}/#clinic`;
  const physicianId = `${site.url}/#dr-sunil-navalgund`;
  const { clinic, physician } = structuredData;

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
        about: { "@type": "MedicalProcedure", name: structuredData.pageAbout },
        reviewedBy: { "@id": physicianId },
        publisher: { "@id": clinicId },
      },
      {
        "@type": "Physician",
        "@id": physicianId,
        name: physician.name,
        jobTitle: physician.jobTitle,
        medicalSpecialty: physician.specialty,
        description: doctor.paragraphs.join(" "),
        hasCredential: physician.qualifications,
        image: `${site.url}${doctor.image.src}`,
        telephone: clinic.telephone,
        worksFor: { "@id": clinicId },
      },
      {
        "@type": "MedicalClinic",
        "@id": clinicId,
        name: clinic.name,
        url: site.url,
        logo: `${site.url}${meta.ogImage.src}`,
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
