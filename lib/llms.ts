import type { CancerPageSeo } from "@/content/types";
import { pages } from "@/content/pages";
import { aboutSeo } from "@/content/pages/about-us.seo";
import { bookSeo } from "@/content/pages/book-appointment.seo";
import { colorectalSeo } from "@/content/pages/colorectal-cancer.seo";
import { endometrialSeo } from "@/content/pages/endometrial-cancer.seo";
import { lungSeo } from "@/content/pages/lung-cancer.seo";
import { ovarianSeo } from "@/content/pages/ovarian-cancer.seo";
import { thyroidSeo } from "@/content/pages/thyroid-cancer.seo";
import { approvals } from "@/content/shared/approvals";
import { organization as org } from "@/content/shared/organization";
import { site } from "@/content/site";

/*
 * /llms.txt and /llms-full.txt (llmstxt.org): a plain-text summary of the practice for AI answer
 * engines, generated from the registry and the content files, so it never drifts from the pages.
 * SOURCE: NEW (the wording around the facts). PENDING DOCTOR: approve both files.
 * Quick answers and dated figures are included only once approved (content/shared/approvals.ts).
 */

const cancer: Partial<Record<keyof typeof pages, CancerPageSeo>> = {
  "colon-cancer-treatment-bangalore": colorectalSeo,
  "endometrial-cancer-treatment-bangalore": endometrialSeo,
  "lung-cancer-in-bangalore": lungSeo,
  "ovarian-cancer-treatment": ovarianSeo,
  "thyroid-cancer": thyroidSeo,
};

// SOURCE: NEW (one line per page that has no .seo.ts file).
const purposes: Partial<Record<keyof typeof pages, string>> = {
  home: "The practice: services, robotic surgery, the doctor, outcomes, reviews, videos, FAQs and clinic locations.",
  "robotic-surgery":
    "Robotic cancer surgery with the da Vinci system: benefits, the cancers it treats, recovery and surgery numbers.",
  "breast-cancer-treatment-bangalore":
    "Breast cancer treatment: diagnosis, surgery options, outcomes, care financing, the surgeon and FAQs.",
  "book-your-appoinment-page": bookSeo.purpose,
  "about-us": aboutSeo.purpose,
};

const purposeOf = (key: keyof typeof pages) => cancer[key]?.purpose ?? purposes[key] ?? "";

function header() {
  const { physician, clinic } = org;
  const a = clinic.address;
  return [
    `# ${clinic.name}`,
    "",
    `> ${clinic.alternateName}: the cancer surgery practice of ${physician.name}, a ${physician.summary.charAt(0).toLowerCase()}${physician.summary.slice(1)}, India. Robotic, laparoscopic and open cancer surgery, second opinions and follow-up.`,
    "",
    `- Doctor: ${physician.name}, ${physician.jobTitle} (${physician.qualifications}; trained at ${physician.training})`,
    `- Phone: ${site.contact.phoneDisplay}`,
    `- Email: ${site.contact.email}`,
    `- Main clinic: ${a.streetAddress}, ${a.addressLocality}, ${a.addressRegion} ${a.postalCode}`,
    `- Clinics: ${site.locations.map((l) => `${l.name} (${l.area})`).join("; ")}`,
    `- Book an appointment: ${site.url}${site.appointmentCta.href}`,
    ...(clinic.sameAs.length ? [`- Profiles: ${clinic.sameAs.join(", ")}`] : []),
  ];
}

function pageLines() {
  return (Object.keys(pages) as (keyof typeof pages)[]).map((key) => {
    const p = pages[key];
    return `- [${p.meta.title}](${p.meta.canonical}): ${purposeOf(key)}`;
  });
}

/** /llms.txt: the practice, then one line per page. */
export function llmsTxt() {
  return [...header(), "", "## Pages", "", ...pageLines(), ""].join("\n");
}

/** /llms-full.txt: as llms.txt, plus each cancer page's condition facts (and, once approved, its answers). */
export function llmsFullTxt() {
  const sections = (Object.keys(cancer) as (keyof typeof pages)[]).flatMap((key) => {
    const seo = cancer[key];
    if (!seo) return [];
    const c = seo.condition;
    const dated = approvals.citableStats ? seo.stats.filter((s) => s.date) : [];
    return [
      "",
      `## ${seo.name}`,
      "",
      `Page: ${pages[key].meta.canonical}`,
      ...(approvals.definitions ? ["", seo.definition] : []),
      "",
      ...(c.alternateName.length ? [`- Also called: ${c.alternateName.join(", ")}`] : []),
      ...(c.signOrSymptom.length ? [`- Signs and symptoms: ${c.signOrSymptom.join(", ")}`] : []),
      `- Treatments: ${c.possibleTreatment.join(", ")}`,
      ...dated.map((s) => `- ${s.sentence} (${s.source}, updated ${s.date})`),
      ...(approvals.quickAnswers ? seo.quickAnswers.flatMap((q) => ["", `### ${q.question}`, "", q.answer]) : []),
    ];
  });
  return [...header(), "", "## Pages", "", ...pageLines(), ...sections, ""].join("\n");
}
