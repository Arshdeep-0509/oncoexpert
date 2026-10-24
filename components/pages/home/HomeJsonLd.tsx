import { faq, meta, surgeon } from "@/content/pages/home";
import { organization as org } from "@/content/shared/organization";
import { site } from "@/content/site";
import { clinicNode, faqQuestions, jsonLdHtml, physicianNode } from "@/lib/jsonld";

/**
 * Home's structured data, all in one @graph: WebSite, the page itself as an FAQPage (its
 * questions are #faq's, which therefore emits none of its own), MedicalClinic and Physician.
 * The clinic and physician @ids are the ones every page uses (content/shared/organization.ts).
 */
export function HomeJsonLd() {
  const websiteId = `${site.url}/#website`;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: meta.canonical,
        name: org.clinic.name,
        inLanguage: "en-IN",
        publisher: { "@id": org.clinicId },
      },
      {
        "@type": "FAQPage",
        "@id": `${meta.canonical}#webpage`,
        url: meta.canonical,
        name: meta.title,
        description: meta.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": websiteId },
        about: { "@id": org.clinicId },
        mainEntity: faqQuestions(faq.items, site.locations),
      },
      clinicNode(),
      physicianNode(surgeon.training.body),
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLdHtml(graph) }} />;
}
