import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { SectionTone } from "@/content/types";
import type { AppointmentService } from "@/content/site";
import { pageList } from "@/content/pages";
import { site } from "@/content/site";
import { relatedSection } from "@/content/shared/sections";
import { bookingHref } from "@/lib/booking";
import { prefetchFor } from "@/lib/nav";
import { Section } from "@/components/ui/Section";
import { serviceIcons } from "@/components/layout/nav-icons";
import { ReviewLine } from "@/components/shared/ReviewLine";

type RelatedTreatmentsProps = {
  /** The current page's path; it is left out of the strip. */
  path: string;
  /** Analytics prefix, e.g. "lung" (labels: lung:related:<slug>). */
  page: string;
  /** The service the "Book an appointment" link preselects (the page's default). */
  service: AppointmentService;
  tone?: SectionTone;
};

// The rebuilt cancer pages in the Services menu's order and words (site.nav, EXISTING).
const built = new Set(pageList.map((p) => p.path));
const services = site.nav
  .flatMap((item) => ("children" in item && item.children ? item.children : []))
  .filter((s) => built.has(s.href));

/**
 * The internal links at the end of every rebuilt cancer page (#related, before the final band):
 * the other cancer pages as cards (menu labels and icons), then About, Booking and Home as text
 * links, and the "Medically reviewed" line once approved. Server-rendered, no JavaScript.
 */
export function RelatedTreatments({ path, page, service, tone = "surface" }: RelatedTreatmentsProps) {
  const others = services.filter((s) => s.href !== path);
  const links = [
    { label: relatedSection.about, href: "/about-us/", key: "about" },
    { label: relatedSection.book, href: bookingHref(service, null, path), key: "book" },
    { label: relatedSection.home, href: "/", key: "home" },
  ];
  return (
    <Section id="related" tone={tone} aria-labelledby="related-title">
      <h2 id="related-title" className="heading-3 text-ink">
        {relatedSection.title}
      </h2>
      <p className="mt-3 measure text-base text-muted">{relatedSection.intro}</p>
      <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {others.map((s) => {
          const Icon = serviceIcons[s.icon];
          const slug = s.href.replaceAll("/", "");
          return (
            <li key={s.href}>
              <Link
                href={s.href}
                prefetch={prefetchFor(s.href)}
                data-cta={`${page}:related:${slug}`}
                className="group flex min-h-14 items-center gap-3 rounded-xl bg-surface px-4 py-3 font-semibold text-ink ring-1 shadow-soft-sm ring-line transition-transform duration-300 outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-accent motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-accent-soft text-accent">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                {s.label}
                <ArrowRight
                  className="ml-auto size-4 shrink-0 text-accent transition-transform duration-300 group-hover:translate-x-0.5 motion-reduce:transition-none"
                  aria-hidden="true"
                />
              </Link>
            </li>
          );
        })}
      </ul>
      <nav aria-label={relatedSection.more} className="mt-6">
        <ul className="flex flex-wrap gap-x-6 gap-y-1">
          {links.map((l) => (
            <li key={l.key}>
              <Link
                href={l.href}
                prefetch={prefetchFor(l.href)}
                data-cta={`${page}:related:${l.key}`}
                className="inline-flex min-h-12 items-center gap-1.5 rounded-md font-semibold text-accent underline-offset-4 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-accent"
              >
                {l.label}
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <ReviewLine className="mt-6" />
    </Section>
  );
}
