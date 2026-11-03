import Image from "next/image";
import type { SymptomItem } from "@/content/types";
import { cn } from "@/lib/utils";
import { symptomIcons } from "@/components/shared/symptom-grid/icons";

/**
 * A "disclose" card (SymptomGrid): the photo (optional) with the icon as a badge, the title, then
 * the description. On devices that can hover, the description waits over the photo and slides up
 * on a dark gradient when the card is hovered or focused (Tab stops on the card); on touch screens
 * it simply sits under the title. The text is always in the page for screen readers.
 */
export function HoverCard({ item }: { item: SymptomItem }) {
  const Icon = symptomIcons[item.icon];
  const titleId = `sgx-${item.key}-title`;
  return (
    <article
      tabIndex={0}
      aria-labelledby={titleId}
      data-photo={item.image ? "" : undefined}
      className="sgx-card relative flex h-full flex-col overflow-hidden rounded-xl bg-surface ring-1 shadow-soft-sm ring-line outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {item.image ? (
        <div className="relative aspect-[4/3] shrink-0">
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 290px, 46vw"
              className="sgx-photo object-cover"
              style={{ objectPosition: item.image.focal }}
            />
          </div>
          <span className="sgx-icon absolute -bottom-6 left-4 z-10 grid size-12 place-items-center rounded-full bg-surface text-accent shadow-soft md:left-6">
            <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
          </span>
        </div>
      ) : (
        <span className="sgx-icon mx-4 mt-4 grid size-12 place-items-center rounded-full bg-accent-soft text-accent md:mx-6 md:mt-6">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
      )}
      <h3
        id={titleId}
        className={cn(
          "px-4 pb-4 text-base leading-snug font-semibold text-ink md:px-6 md:pb-6 md:text-lg",
          item.image ? "pt-9" : "pt-4",
        )}
      >
        {item.title}
      </h3>
      {item.body ? (
        <p className="sgx-body -mt-2 px-4 pb-4 text-base leading-relaxed text-muted md:px-6 md:pb-6">{item.body}</p>
      ) : null}
    </article>
  );
}
