import { Mail, MapPin, Phone } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { socialIcons } from "@/components/ui/brand-icons";
import {
  footerHeadingClass as headingClass,
  footerLinkClass as linkClass,
} from "@/components/layout/footer/footer-links";

/** Column 4: main clinic address, phone, email and social links. */
export function FooterContact({ accordion }: { accordion: boolean }) {
  // Big tap targets for the contact links on phones (accordion layout).
  const contactLink = cn(linkClass, "gap-3", accordion && "max-md:min-h-12 max-md:text-base");
  return (
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
  );
}
