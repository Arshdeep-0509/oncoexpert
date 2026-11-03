import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Construction } from "lucide-react";
import { notFound } from "@/content/pages/not-found";
import { pageList } from "@/content/pages";
import { site } from "@/content/site";
import { prefetchFor } from "@/lib/nav";
import { SiteShell } from "@/components/layout/SiteShell";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { AppointmentButton } from "@/components/shared/AppointmentButton";

export const metadata: Metadata = { title: { absolute: notFound.meta.title }, robots: { index: false } };

// The rebuilt cancer pages, in the Services menu's order and words.
const built = new Set(pageList.map((p) => p.path));
const services = site.nav
  .flatMap((item) => ("children" in item && item.children ? item.children : []))
  .filter((s) => built.has(s.href));

/**
 * Any address with no page (Next serves this with a 404 status): "This page is under construction"
 * with the site's header and footer, a way home, a booking button and the cancer pages. The menu
 * still links pages that are not rebuilt yet (Urology, Stomach Cancer, Our Services, Blogs).
 */
export default function NotFound() {
  return (
    <SiteShell theme="care" headerVariant="light" defaultService="Consultation">
      <section
        aria-labelledby="not-found-title"
        className="bg-surface-alt pt-[calc(var(--header-h)+56px)] pb-(--section-y) md:pt-[calc(var(--header-h)+96px)]"
      >
        <Container className="flex flex-col items-center text-center">
          <span className="grid size-16 place-items-center rounded-2xl bg-accent-soft text-accent">
            <Construction className="size-8" strokeWidth={1.75} aria-hidden="true" />
          </span>
          <p className="mt-6 text-sm font-bold tracking-[0.12em] text-accent uppercase">{notFound.eyebrow}</p>
          <h1 id="not-found-title" className="mt-3 heading-1 text-ink">
            {notFound.title}
          </h1>
          <p className="mt-5 measure text-base text-muted md:text-lg">{notFound.body}</p>
          <div className="mt-8 flex w-full flex-col justify-center gap-3 sm:w-auto sm:flex-row">
            <AppointmentButton
              label={notFound.book}
              service="Consultation"
              cta="not-found:hero:book-consultation"
              arrow
              fullWidthOnMobile
            />
            <Button href={notFound.home.href} variant="secondary" cta="not-found:hero:home" fullWidthOnMobile>
              {notFound.home.label}
            </Button>
          </div>

          <h2 className="mt-14 text-sm font-bold tracking-[0.12em] text-muted uppercase">{notFound.more}</h2>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {services.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  prefetch={prefetchFor(s.href)}
                  data-cta={`not-found:services:${s.href.replaceAll("/", "")}`}
                  className="inline-flex min-h-12 items-center gap-1.5 rounded-pill bg-surface px-4 font-semibold text-ink ring-1 shadow-soft-sm ring-line hover:text-accent focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
                >
                  {s.label}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>
    </SiteShell>
  );
}
