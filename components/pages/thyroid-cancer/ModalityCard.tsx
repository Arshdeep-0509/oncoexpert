import {
  Activity,
  Atom,
  BadgeIndianRupee,
  Microscope,
  Network,
  Scissors,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { ModalityIcon, StrengthIcon } from "@/content/pages/thyroid-cancer";
import { cn } from "@/lib/utils";

const icons: Record<ModalityIcon | StrengthIcon, LucideIcon> = {
  thyroidectomy: Scissors,
  "neck-dissection": Network,
  radioiodine: Atom,
  monitoring: Activity,
  volume: Users,
  diagnosis: Microscope,
  "nerve-monitor": ShieldCheck,
  affordable: BadgeIndianRupee,
};

type ModalityCardProps = {
  icon: ModalityIcon | StrengthIcon;
  title: string;
  body: string;
  /** The live words `phrase` become a link to `href` (nothing is added to the text). */
  link?: { phrase: string; href: string };
  group: "treatments" | "why";
  className?: string;
};

/**
 * One modality card (modalities.css, tym-): the icon in a circle (it draws on reveal, fills on
 * hover), the live title and text. Server-rendered; the filter hides it through data-group.
 */
export function ModalityCard({ icon, title, body, link, group, className }: ModalityCardProps) {
  const Icon = icons[icon];
  const at = link ? body.indexOf(link.phrase) : -1;
  return (
    <article
      data-group={group}
      className={cn(
        // Phones: a little tighter, two to a row; from md as before.
        "tym-card flex h-full flex-col gap-3 rounded-xl bg-surface p-4 ring-1 shadow-soft-sm ring-line md:gap-4 md:p-6",
        className,
      )}
    >
      <span className="tym-icon grid size-10 place-items-center rounded-full bg-accent-soft text-accent md:size-12">
        <Icon className="tym-draw size-5 md:size-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 className="font-display text-base leading-snug wrap-break-word hyphens-auto text-ink md:text-xl md:hyphens-manual">
        {title}
      </h3>
      <p className="text-base leading-relaxed text-muted">
        {link && at >= 0 ? (
          <>
            {body.slice(0, at)}
            <a
              href={link.href}
              className="font-semibold text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
            >
              {link.phrase}
            </a>
            {body.slice(at + link.phrase.length)}
          </>
        ) : (
          body
        )}
      </p>
    </article>
  );
}
