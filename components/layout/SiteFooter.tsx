import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { ArrowRight, Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { socialIcons } from "@/components/ui/brand-icons";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

// Columns 2 and 3 reuse the nav data.
const services = site.nav.find((item) => item.children)!;
const quickLinks = site.nav.filter((item) => !item.children);

// The static shell is prerendered, so "now" is read inside a cached scope
// that refreshes daily (Cache Components forbids bare new Date() in prerender).
async function CopyrightLine() {
  "use cache";
  cacheLife("days");
  return <>{site.footer.copyright(new Date().getFullYear())}</>;
}

const linkClass =
  "inline-flex min-h-11 items-center text-[15px] text-white/70 transition-colors duration-300 hover:text-accent-glow";
const headingClass = "type-eyebrow mb-3 text-accent-glow";

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
  /** Leave room under the copyright line for the fixed MobileActionBar on phones. */
  reserveActionBar?: boolean;
};

function MobileLinkGroups() {
  const trigger =
    "min-h-14 items-center py-0 text-base font-semibold text-white hover:no-underline [&>svg]:size-5 [&>svg]:translate-y-0 [&>svg]:text-accent-glow";
  const link = "flex min-h-12 items-center text-[15px] text-white/75 transition-colors hover:text-accent-glow";
  return (
    <Accordion type="multiple" className="border-y border-white/10 md:hidden">
      <AccordionItem value="services" className="border-white/10">
        <AccordionTrigger className={trigger}>{services.label}</AccordionTrigger>
        <AccordionContent>
          <ul>
            {services.children?.map((s) => (
              <li key={s.href}>
                <Link href={s.href} prefetch={false} className={link}>
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={services.href} prefetch={false} className={cn(link, "gap-2 font-semibold text-accent-glow")}>
                {services.label}
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="quick-links" className="border-b-0">
        <AccordionTrigger className={trigger}>{site.footer.quickLinks}</AccordionTrigger>
        <AccordionContent>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

export function SiteFooter({ art, mobileLayout = "stacked", reserveActionBar = false }: SiteFooterProps) {
  const accordion = mobileLayout === "accordion";
  // Big tap targets for the contact links on phones (accordion layout).
  const contactLink = cn(linkClass, "gap-3", accordion && "max-md:min-h-12 max-md:text-base");

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
          className="blend-on-dark pointer-events-none absolute -right-24 -bottom-16 -z-10 w-[90vw] max-w-[720px] opacity-[0.06] select-none"
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
          <Link href="/" aria-label={site.a11y.home} className="inline-block rounded-2xl bg-white px-4 py-3 shadow-[0_8px_24px_rgb(0_0_0/0.25)]">
            <Image
              src={site.logo.src}
              alt={site.logo.alt}
              width={site.logo.width}
              height={site.logo.height}
              sizes="170px"
              className="blend-on-light h-10 w-auto"
            />
          </Link>
          <p className="mt-6 text-[15px] leading-relaxed text-white/70">{site.footer.tagline}</p>
        </div>

        {accordion ? <MobileLinkGroups /> : null}

        {/* 2 · Services */}
        <nav aria-label={site.a11y.footerServices} className={cn(accordion && "max-md:hidden")}>
          <p className={headingClass}>
            <Link href={services.href} prefetch={false} className="transition-colors hover:text-white">
              {services.label}
            </Link>
          </p>
          <ul>
            {services.children?.map((s) => (
              <li key={s.href}>
                <Link href={s.href} prefetch={false} className={linkClass}>
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
                <Link href={l.href} prefetch={false} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* 4 · Contact */}
        <div>
          <p className={headingClass}>{site.mainClinic.label}</p>
          <a
            href={site.mainClinic.mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex gap-3 py-2 text-[15px] leading-relaxed text-white/70 transition-colors hover:text-white"
          >
            <MapPin className="mt-1 size-4 shrink-0 text-accent-glow" strokeWidth={1.75} aria-hidden="true" />
            <span>
              {site.mainClinic.address}
              <span className="sr-only"> {site.a11y.newTab}</span>
            </span>
          </a>
          <div className="flex flex-col items-start">
            <a href={site.contact.phoneHref} className={cn(contactLink, "tabular-nums")}>
              <Phone className="size-4 text-accent-glow" strokeWidth={1.75} aria-hidden="true" />
              {site.contact.phoneDisplay}
            </a>
            <a href={site.contact.emailHref} className={contactLink}>
              <Mail className="size-4 text-accent-glow" strokeWidth={1.75} aria-hidden="true" />
              {site.contact.email}
            </a>
          </div>

          <p className={`${headingClass} mt-8`}>{site.socials.label}</p>
          <ul className="flex gap-2">
            {site.socials.links.map((s) => {
              const Icon = socialIcons[s.key];
              return (
                <li key={s.key}>
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${s.label} ${site.a11y.newTab}`}
                    className={cn(
                      "grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-accent-glow/60 hover:text-accent-glow",
                      accordion && "max-md:size-12",
                    )}
                  >
                    <Icon size={18} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </Container>

      <div className="border-t border-white/10">
        <Container
          className={cn(
            "flex min-h-16 items-center py-5 text-sm text-white/55",
            reserveActionBar && "max-md:pb-[calc(20px+64px+env(safe-area-inset-bottom))]",
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
