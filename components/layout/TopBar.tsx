import { Mail, Phone } from "lucide-react";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { socialIcons } from "@/components/ui/brand-icons";

// 40px bars can't hold 44px targets, so each link's hit area extends past
// its box with an invisible ::after (≥44px).
const hit = "relative after:absolute after:-inset-y-1 after:-inset-x-1 after:content-['']";

/** Utility strip (tablet and up). Scrolls away; only the main navbar is sticky. */
export function TopBar() {
  return (
    <div className="on-dark hidden bg-ink text-[13px] text-white/80 md:block">
      <Container className="flex h-10 items-center justify-between">
        <div className="flex items-center gap-6">
          <a href={site.contact.phoneHref} className={`${hit} inline-flex h-10 items-center gap-2 tabular-nums transition-colors hover:text-glow`}>
            <Phone className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            {site.contact.phoneDisplay}
          </a>
          <a href={site.contact.emailHref} className={`${hit} inline-flex h-10 items-center gap-2 transition-colors hover:text-glow`}>
            <Mail className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            {site.contact.email}
          </a>
        </div>

        <ul className="-mr-2.5 flex items-center" aria-label={site.socials.label}>
          {site.socials.links.map((s) => {
            const Icon = socialIcons[s.key];
            return (
              <li key={s.key}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${s.label} ${site.a11y.newTab}`}
                  className={`${hit} grid size-10 place-items-center rounded-full transition-colors duration-300 hover:text-glow`}
                >
                  <Icon size={15} />
                </a>
              </li>
            );
          })}
        </ul>
      </Container>
    </div>
  );
}
