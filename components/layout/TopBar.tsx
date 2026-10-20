import { Mail, Phone } from "lucide-react";
import type { HeaderVariant } from "@/content/types";
import { cn } from "@/lib/utils";
import { site } from "@/content/site";
import { Container } from "@/components/ui/container";
import { socialIcons } from "@/components/ui/brand-icons";

// 40px bars can't hold 44px targets, so each link's hit area extends past
// its box with an invisible ::after (≥44px).
const hit = "relative after:absolute after:-inset-y-1 after:-inset-x-1 after:content-['']";

/**
 * Utility strip: phone and email left, socials right (ink background, 13px).
 * Scrolls away; only the main bar is sticky.
 * "light": 36px, desktop only. "dark" (robotic page): 40px from tablet up.
 */
export function TopBar({ variant = "dark" }: { variant?: HeaderVariant }) {
  const height = variant === "dark" ? "h-10" : "h-9";
  return (
    <div className={cn("on-dark hidden bg-ink text-[13px] text-white/80", variant === "dark" ? "md:block" : "lg:block")}>
      <Container className={cn("flex items-center justify-between", height)}>
        <div className="flex items-center gap-6">
          <a href={site.contact.phoneHref} className={`${hit} inline-flex h-full items-center gap-2 tabular-nums transition-colors hover:text-accent-glow`}>
            <Phone className="size-3.5" strokeWidth={1.75} aria-hidden="true" />
            {site.contact.phoneDisplay}
          </a>
          <a href={site.contact.emailHref} className={`${hit} inline-flex h-full items-center gap-2 transition-colors hover:text-accent-glow`}>
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
                  className={`${hit} grid ${variant === "dark" ? "size-10" : "size-9"} place-items-center rounded-full transition-colors duration-300 hover:text-accent-glow`}
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
