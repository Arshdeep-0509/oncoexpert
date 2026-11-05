import { breadcrumb, meta, structuredData, surgeon } from "@/content/pages/breast-cancer";
import { organization as org } from "@/content/shared/organization";
import { breadcrumbNode, clinicNode, jsonLdHtml, physicianNode } from "@/lib/jsonld";

/**
 * MedicalWebPage (about: the page's MedicalCondition) + BreadcrumbList + Physician + MedicalClinic,
 * linked in one @graph. FAQPage (#faq) is emitted by that section.
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
        breadcrumb: { "@id": `${meta.canonical}#breadcrumb` },
        reviewedBy: { "@id": org.physicianId },
        publisher: { "@id": org.clinicId },
      },
      breadcrumbNode(meta.canonical, breadcrumb.items),
      physicianNode(surgeon.bio),
      clinicNode(),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(graph) }} />;
}
