import Image from "next/image";
import Link from "next/link";
import { cacheLife } from "next/cache";
import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { images } from "@/content/robotic-surgery";
import { Container } from "@/components/ui/container";
import { socialIcons } from "@/components/ui/brand-icons";

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
  "inline-flex min-h-11 items-center text-[15px] text-white/70 transition-colors duration-300 hover:text-glow";
const headingClass = "type-eyebrow mb-3 text-glow";

export function Footer() {
  return (
    <footer data-tone="ink" className="relative isolate overflow-hidden bg-ink text-white">
      {/* Faint da Vinci arms in the corner; screen blend drops the photo's black background. */}
      <Image
        src={images.armsBlack.src}
        alt=""
        aria-hidden="true"
        width={images.armsBlack.width}
        height={images.armsBlack.height}
        sizes="(min-width: 1024px) 720px, 90vw"
        className="blend-on-dark pointer-events-none absolute -right-24 -bottom-16 -z-10 w-[90vw] max-w-[720px] opacity-[0.06] select-none"
      />

      <Container className="grid gap-12 pt-[72px] pb-12 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_0.7fr_1.35fr] lg:gap-10 lg:pt-24 lg:pb-16">
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

        {/* 2 · Services */}
        <nav aria-label={site.a11y.footerServices}>
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

        {/* 3 · Quick links (no heading: columns 2–3 add no new copy) */}
        <nav aria-label={site.a11y.footerQuickLinks}>
          {/* Invisible spacer matching the column headings, so the lists line up on desktop. */}
          <p aria-hidden="true" className={`${headingClass} invisible hidden lg:block`}>
            {" "}
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
            <MapPin className="mt-1 size-4 shrink-0 text-glow" strokeWidth={1.75} aria-hidden="true" />
            <span>
              {site.mainClinic.address}
              <span className="sr-only"> {site.a11y.newTab}</span>
            </span>
          </a>
          <div className="flex flex-col items-start">
          <a href={site.contact.phoneHref} className={`${linkClass} gap-3 tabular-nums`}>
            <Phone className="size-4 text-glow" strokeWidth={1.75} aria-hidden="true" />
            {site.contact.phoneDisplay}
          </a>
          <a href={site.contact.emailHref} className={`${linkClass} gap-3`}>
            <Mail className="size-4 text-glow" strokeWidth={1.75} aria-hidden="true" />
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
                    className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors duration-300 hover:border-glow/60 hover:text-glow"
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
        <Container className="flex min-h-16 items-center py-5 text-sm text-white/55">
          <p>
            <CopyrightLine />
          </p>
        </Container>
      </div>
    </footer>
  );
}
