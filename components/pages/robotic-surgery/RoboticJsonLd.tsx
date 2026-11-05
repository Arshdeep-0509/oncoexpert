import { doctor, meta, structuredData } from "@/content/pages/robotic-surgery";
import { organization as org } from "@/content/shared/organization";
import { clinicNode, jsonLdHtml, physicianNode, review, speakable } from "@/lib/jsonld";

/** MedicalWebPage + Physician + MedicalClinic, linked in one @graph. */
export function RoboticJsonLd() {
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
        speakable,
        publisher: { "@id": org.clinicId },
        ...review(),
      },
      physicianNode(`${doctor.lead} ${doctor.bio}`),
      clinicNode(),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(graph) }} />;
}
