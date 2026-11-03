import Image from "next/image";
import { Check } from "lucide-react";
import type { SymptomItem } from "@/content/types";
import { cn } from "@/lib/utils";
import { symptomIcons } from "@/components/shared/symptom-grid/icons";

type CheckCardProps = { item: SymptomItem; checked: boolean; onToggle: () => void };

/**
 * A "check" card (SymptomGrid): a checkbox (role="checkbox"; Space or a click toggles). With a
 * photo, the photo fills the card under a dark gradient and the title is white; ticked, the card
 * gets an accent ring and its box fills.
 */
export function CheckCard({ item, checked, onToggle }: CheckCardProps) {
  const Icon = symptomIcons[item.icon];
  const photo = item.image;
  return (
    <div
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key !== " ") return;
        e.preventDefault();
        onToggle();
      }}
      data-photo={photo ? "" : undefined}
      className={cn(
        "sgx-check relative isolate flex cursor-pointer flex-col justify-between overflow-hidden rounded-xl p-4 ring-1 shadow-soft-sm outline-none focus-visible:ring-2 focus-visible:ring-accent md:p-6",
        photo ? "min-h-44 bg-ink ring-white/10 md:min-h-56" : "min-h-36 bg-surface ring-line",
      )}
    >
      {photo ? (
        <>
          <Image
            src={photo.src}
            alt=""
            fill
            sizes="(min-width: 1024px) 290px, 46vw"
            className="sgx-photo -z-20 object-cover"
            style={{ objectPosition: photo.focal }}
          />
          <span
            aria-hidden="true"
            className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,color-mix(in_srgb,var(--ink)_92%,transparent)_30%,color-mix(in_srgb,var(--ink)_25%,transparent))]"
          />
        </>
      ) : null}
      <span className="flex items-start justify-between gap-2">
        <span
          className={cn(
            "sgx-icon grid size-12 place-items-center rounded-full text-accent",
            photo ? "bg-surface/95" : "bg-accent-soft",
          )}
        >
          <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <span
          aria-hidden="true"
          className={cn(
            "sgx-box grid size-7 place-items-center rounded-md ring-2",
            photo ? "bg-ink/30 ring-white/85" : "ring-line",
          )}
        >
          <Check className="sgx-tick size-4 text-white" strokeWidth={3} />
        </span>
      </span>
      <span className={cn("mt-4 text-base leading-snug font-semibold md:text-lg", photo ? "text-white" : "text-ink")}>
        {item.title}
      </span>
    </div>
  );
}
