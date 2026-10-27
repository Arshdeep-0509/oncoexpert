import Image from "next/image";
import Link from "next/link";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import {
  footerHeadingClass as headingClass,
  footerLinkClass as linkClass,
  quickLinks,
  services,
} from "@/components/layout/footer/footer-links";
import { FooterMobileLinks } from "@/components/layout/footer/FooterMobileLinks";
import { FooterContact } from "@/components/layout/footer/FooterContact";
import { CopyrightLine } from "@/components/layout/footer/CopyrightLine";
import { prefetchFor } from "@/lib/nav";

/** Optional faint photo in the corner, screen-blended (use a photo on a black background). */
export type FooterArt = { src: string; width: number; height: number };

type SiteFooterProps = {
  /** Page-specific art in the corner. Without it, a very faint glow in the accent colour. */
  art?: FooterArt;
  /**
   * Phones: "accordion" collapses the link groups and gives the contact block big tap
   * targets; "stacked" lists everything (the robotic page's original footer).
   */
  mobileLayout?: "accordion" | "stacked";
  /** Leave room under the copyright line for the floating MobileActionBar on phones (8px gap + 60px dock + 8px). */
  reserveActionBar?: boolean;
};

export function SiteFooter({ art, mobileLayout = "stacked", reserveActionBar = false }: SiteFooterProps) {
  const accordion = mobileLayout === "accordion";

  return (
    <footer data-tone="ink" className="relative isolate overflow-hidden bg-ink text-white">
      {art ? (
        /* Faint page-specific art in the corner; screen blend drops the photo's black background. */
        <Image
          src={art.src}
          alt=""
          aria-hidden="true"
          width={art.width}
          height={art.height}
          sizes="(min-width: 1024px) 720px, 90vw"
          className="pointer-events-none absolute -right-24 -bottom-16 -z-10 w-[90vw] max-w-[720px] opacity-[0.06] blend-on-dark select-none"
        />
      ) : (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-48 -right-48 -z-10 size-[560px] rounded-full bg-[radial-gradient(closest-side,var(--accent-glow),transparent)] opacity-[0.14]"
        />
      )}

      <Container
        className={cn(
          "grid gap-12 pt-[72px] pb-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_0.7fr_1.35fr] lg:gap-10 lg:pt-24 lg:pb-16",
          accordion && "max-md:gap-10",
        )}
      >
        {/* 1 · Brand */}
        <div className="max-w-xs">
          <Link
            href="/"
            aria-label={site.a11y.home}
            className="inline-block rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_rgb(0_0_0/0.25)]"
          >
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              sizes="170px"
              className="h-10 w-auto blend-on-light"
            />
          </Link>
          <p className="mt-6 text-[15px] leading-relaxed text-white/70">{site.footer.tagline}</p>
        </div>

        {accordion ? <FooterMobileLinks /> : null}

        {/* 2 · Services */}
        <nav aria-label={site.a11y.footerServices} className={cn(accordion && "max-md:hidden")}>
          <p className={headingClass}>
            <Link
              href={services.href}
              prefetch={prefetchFor(services.href)}
              className="transition-colors hover:text-white"
            >
              {services.label}
            </Link>
          </p>
          <ul>
            {services.children?.map((s) => (
              <li key={s.href}>
                <Link href={s.href} prefetch={prefetchFor(s.href)} className={linkClass}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 3 · Quick links (no heading on desktop: columns 2–3 add no new copy) */}
        <nav aria-label={site.a11y.footerQuickLinks} className={cn(accordion && "max-md:hidden")}>
          {/* Invisible spacer matching the column headings, so the lists line up on desktop. */}
          <p aria-hidden="true" className={`${headingClass} invisible hidden lg:block`}>
            {" " /* non-breaking space: gives the spacer one line of height */}
          </p>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={prefetchFor(l.href)} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <FooterContact accordion={accordion} />
      </Container>

      <div className="border-t border-white/10">
        <Container
          className={cn(
            "flex min-h-16 items-center py-5 text-sm text-white/55",
            reserveActionBar && "max-md:pb-[calc(20px+76px+env(safe-area-inset-bottom))]",
          )}
        >
          <p>
            <CopyrightLine />
          </p>
        </Container>
      </div>
    </footer>
  );
}
