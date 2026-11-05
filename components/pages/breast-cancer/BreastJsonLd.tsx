import { breadcrumb, faq, meta, structuredData, surgeon } from "@/content/pages/breast-cancer";
import { organization as org } from "@/content/shared/organization";
import { site } from "@/content/site";
import { breadcrumbNode, clinicNode, faqQuestions, jsonLdHtml, physicianNode, review, speakable } from "@/lib/jsonld";

/**
 * MedicalWebPage (about: the page's MedicalCondition) + BreadcrumbList + Physician + MedicalClinic +
 * FAQPage (the #faq section's questions), linked in one @graph.
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
        speakable,
        publisher: { "@id": org.clinicId },
        ...review(),
      },
      breadcrumbNode(meta.canonical, breadcrumb.items),
      physicianNode(surgeon.bio),
      clinicNode(),
      {
        "@type": "FAQPage",
        "@id": `${meta.canonical}#faq`,
        isPartOf: { "@id": `${meta.canonical}#webpage` },
        mainEntity: faqQuestions(faq.items, site.locations),
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(graph) }} />;
}
