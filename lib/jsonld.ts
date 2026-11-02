import type { CancerPageSeo, ConditionFacts, Location, OfferFacts, PageMeta, QuickAnswer } from "@/content/types";
import { approvals } from "@/content/shared/approvals";
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
    ...(physician.sameAs.length ? { sameAs: physician.sameAs } : {}),
  };
}

/** The clinic (MedicalClinic, a MedicalOrganization). */
export function clinicNode() {
  const { physician, clinic } = org;
  return {
    "@type": "MedicalClinic",
    "@id": org.clinicId,
    name: clinic.name,
    alternateName: clinic.alternateName,
    url: site.url,
    logo: `${site.url}${clinic.logo}`,
    telephone: clinic.telephone,
    email: site.contact.email,
    address: { "@type": "PostalAddress", ...clinic.address },
    medicalSpecialty: physician.specialty,
    sameAs: clinic.sameAs,
    hasMap: site.mainClinic.mapHref,
    // The clinics where the doctor sees patients (the Locations section on every page).
    location: site.locations.map((l) => ({ "@type": "Place", name: `${l.name}, ${l.area}`, hasMap: l.mapHref })),
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

const abs = (href: string) => new URL(href, site.url).toString();

/** BreadcrumbList for a page: `items` from Home to the page itself. */
function breadcrumbNode(pageUrl: string, items: readonly { label: string; href: string }[]) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${pageUrl}#breadcrumb`,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: abs(item.href),
    })),
  };
}

/** FAQPage from the "Quick answers" (only when they are rendered on the page). */
function faqPageNode(pageUrl: string, items: readonly QuickAnswer[]) {
  return {
    "@type": "FAQPage",
    "@id": `${pageUrl}#faq`,
    isPartOf: { "@id": `${pageUrl}#webpage` },
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** The page's MedicalCondition; empty lists are left out. */
function conditionNode(pageUrl: string, c: ConditionFacts) {
  return {
    "@type": "MedicalCondition",
    "@id": `${pageUrl}#condition`,
    name: c.name,
    ...(c.alternateName.length ? { alternateName: c.alternateName } : {}),
    ...(c.possibleTreatment.length
      ? { possibleTreatment: c.possibleTreatment.map((name) => ({ "@type": "MedicalTherapy", name })) }
      : {}),
    ...(c.signOrSymptom.length
      ? { signOrSymptom: c.signOrSymptom.map((name) => ({ "@type": "MedicalSignOrSymptom", name })) }
      : {}),
  };
}

/** Package prices as Offers (INR; a starting price as priceSpecification.minPrice). */
function offerNodes(pageUrl: string, offers: readonly OfferFacts[]) {
  return offers.map((o, i) => ({
    "@type": "Offer",
    "@id": `${pageUrl}#offer-${i + 1}`,
    name: o.name,
    priceCurrency: "INR",
    ...(o.from
      ? { priceSpecification: { "@type": "PriceSpecification", priceCurrency: "INR", minPrice: o.price } }
      : { price: o.price }),
    itemOffered: { "@type": "Service", name: o.name, provider: { "@id": org.clinicId } },
    offeredBy: { "@id": org.clinicId },
  }));
}

/** Speakable parts of a page: elements marked data-speakable (hero summary, quick answers). */
const speakable = { "@type": "SpeakableSpecification", cssSelector: ["[data-speakable]"] };

/** The "Medically reviewed" facts, only once the doctor has reviewed the page (approvals). */
const review = () =>
  approvals.medicalReview && approvals.lastReviewed
    ? { reviewedBy: { "@id": org.physicianId }, lastReviewed: approvals.lastReviewed }
    : {};

type CancerGraphInput = {
  meta: PageMeta;
  seo: CancerPageSeo;
  breadcrumb: readonly { label: string; href: string }[];
  /** The page's EXISTING text about the doctor. */
  physicianDescription: string;
};

/**
 * One @graph for a cancer page: MedicalWebPage (about its MedicalCondition, speakable, reviewed
 * once approved), Physician, MedicalClinic, BreadcrumbList, FAQPage when the quick answers are
 * shown, Offers when the prices are approved.
 */
export function cancerPageGraph({ meta, seo, breadcrumb, physicianDescription }: CancerGraphInput) {
  const url = meta.canonical;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MedicalWebPage",
        "@id": `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": `${url}#condition` },
        audience: { "@type": "Patient" },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: abs(meta.ogImage.src),
        speakable,
        publisher: { "@id": org.clinicId },
        ...review(),
      },
      conditionNode(url, seo.condition),
      physicianNode(physicianDescription),
      clinicNode(),
      breadcrumbNode(url, breadcrumb),
      ...(approvals.quickAnswers ? [faqPageNode(url, seo.quickAnswers)] : []),
      ...(approvals.packageOffers ? offerNodes(url, seo.offers) : []),
    ],
  };
}

/**
 * The booking page: a WebPage about the MedicalClinic, which carries a ReserveAction whose target
 * is this page (the appointment form).
 */
export function bookingGraph(meta: PageMeta) {
  const url = meta.canonical;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${site.url}/#website` },
        about: { "@id": org.clinicId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        // The page has no hero paragraph of its own: its H1 ("Need Clarity?") and the definition.
        speakable: { ...speakable, cssSelector: ["#appointment-title", ...speakable.cssSelector] },
      },
      {
        ...clinicNode(),
        potentialAction: {
          "@type": "ReserveAction",
          name: "Book an appointment",
          target: {
            "@type": "EntryPoint",
            urlTemplate: url,
            inLanguage: "en-IN",
            actionPlatform: ["https://schema.org/DesktopWebPlatform", "https://schema.org/MobileWebPlatform"],
          },
          result: { "@type": "Reservation", name: "Appointment with Dr. Sunil Navalgund" },
        },
      },
      breadcrumbNode(url, [
        { label: "Home", href: "/" },
        { label: "Book Appointment", href: new URL(url).pathname },
      ]),
    ],
  };
}

/** The About page: a ProfilePage whose main entity is the Physician. */
export function aboutGraph(meta: PageMeta, physicianDescription: string) {
  const url = meta.canonical;
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${url}#webpage`,
        url,
        name: meta.title,
        description: meta.description,
        inLanguage: "en-IN",
        isPartOf: { "@id": `${site.url}/#website` },
        mainEntity: { "@id": org.physicianId },
        breadcrumb: { "@id": `${url}#breadcrumb` },
        primaryImageOfPage: abs(meta.ogImage.src),
        speakable,
      },
      physicianNode(physicianDescription),
      clinicNode(),
      breadcrumbNode(url, [
        { label: "Home", href: "/" },
        { label: "About Us", href: new URL(url).pathname },
      ]),
    ],
  };
}
