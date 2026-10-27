"use client";

import * as React from "react";
import { CalendarDays, ChevronDown, Droplet, TriangleAlert, Waves, type LucideIcon } from "lucide-react";
import type { SymptomIcon } from "@/content/pages/endometrial-cancer";
import { useMedia } from "@/lib/hooks/use-media";
import { cn } from "@/lib/utils";

const icons: Record<SymptomIcon, LucideIcon> = {
  drop: Droplet,
  calendar: CalendarDays,
  alert: TriangleAlert,
  pelvic: Waves,
};

/** Phones: every card open, always (symptoms.css). */
const PHONE = "(max-width: 767px)";

type SymptomCardProps = { icon: SymptomIcon; title: string; body: string; id: string };

/**
 * One warning sign. From 768px a disclosure: the title is a button (aria-expanded) that opens or
 * closes the description; a mouse hovering opens it too. On phones the description is always shown
 * (and the button reports it as expanded). The whole card is the button's target.
 */
export function SymptomCard({ icon, title, body, id }: SymptomCardProps) {
  const [open, setOpen] = React.useState(false);
  const phone = useMedia(PHONE);
  const Icon = icons[icon];
  const bodyId = `${id}-body`;

  return (
    <article
      data-open={open ? "" : undefined}
      className="exs-card relative flex h-full flex-col overflow-hidden rounded-lg border border-line bg-surface p-6 shadow-soft-sm md:p-7"
    >
      <ChevronDown
        aria-hidden="true"
        className="exs-chev absolute top-7 right-6 hidden size-5 text-muted md:block"
        strokeWidth={1.75}
      />
      <div className="exs-head">
        <span className="exs-icon grid size-12 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="mt-5 pr-8 font-display text-xl leading-snug text-ink md:text-[1.375rem]">
          <button
            type="button"
            aria-expanded={open || phone}
            aria-controls={bodyId}
            onClick={() => setOpen((o) => !o)}
            className="text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </button>
        </h3>
      </div>
      <span aria-hidden="true" className="exs-rule mt-4 block h-0.5 w-12 rounded-full bg-(image:--grad-accent)" />
      <p id={bodyId} className={cn("exs-body mt-3 text-[15px] leading-relaxed text-muted md:text-base")}>
        {body}
      </p>
    </article>
  );
}
