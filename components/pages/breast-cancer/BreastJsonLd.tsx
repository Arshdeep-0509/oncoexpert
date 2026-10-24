import { meta, structuredData, surgeon } from "@/content/pages/breast-cancer";
import { organization as org } from "@/content/shared/organization";
import { clinicNode, jsonLdHtml, physicianNode } from "@/lib/jsonld";

/**
 * MedicalWebPage (about: the page's MedicalCondition) + Physician + MedicalClinic,
 * linked in one @graph. BreadcrumbList (hero) and FAQPage (#faq) are emitted by those sections.
 */
export function BreastJsonLd() {
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
      physicianNode(surgeon.bio),
      clinicNode(),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(graph) }} />;
}
