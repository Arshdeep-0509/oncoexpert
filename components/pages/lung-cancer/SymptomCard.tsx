"use client";

import * as React from "react";
import { ChevronDown, Droplet, Wind, type LucideIcon } from "lucide-react";
import type { SymptomIcon } from "@/content/pages/lung-cancer";
import { track } from "@/lib/analytics";
import { useMedia } from "@/lib/hooks/use-media";

const icons: Record<SymptomIcon, LucideIcon> = { cough: Wind, blood: Droplet };

/** Phones: every card open (diagnosis.css shows the line there regardless). */
const PHONE = "(max-width: 767px)";

type SymptomCardProps = { icon: SymptomIcon; title: string; when: string; id: string };

/**
 * One symptom (EXISTING title) with a NEW "when to see a doctor" line. From 768px a disclosure: the
 * title is a button (aria-expanded) that reveals the line in place. The line always keeps its space
 * (reserved height; only opacity and transform change), so nothing below moves. Phones: open, and
 * the button reports it. Opening sends lung_symptom_open.
 */
export function SymptomCard({ icon, title, when, id }: SymptomCardProps) {
  const [open, setOpen] = React.useState(false);
  const phone = useMedia(PHONE);
  const Icon = icons[icon];
  const bodyId = `${id}-when`;

  const toggle = () => {
    if (!open) track({ event: "lung_symptom_open", label: title });
    setOpen(!open);
  };

  return (
    <article
      data-open={open ? "" : undefined}
      className="lud-sym relative flex h-full flex-col rounded-xl border border-line bg-surface p-5 shadow-soft-sm md:p-6"
    >
      <div className="flex items-center gap-4">
        <span className="lud-symIcon grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
          <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
        </span>
        <h3 className="min-w-0 flex-1 font-display text-xl leading-snug text-ink">
          <button
            type="button"
            aria-expanded={open || phone}
            aria-controls={bodyId}
            onClick={toggle}
            className="min-h-12 w-full text-left after:absolute after:inset-0 after:rounded-xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
          >
            {title}
          </button>
        </h3>
        <ChevronDown
          aria-hidden="true"
          className="lud-chev hidden size-5 shrink-0 text-muted md:block"
          strokeWidth={1.75}
        />
      </div>
      <p id={bodyId} className="lud-when mt-3 text-base leading-relaxed text-muted">
        {when}
      </p>
    </article>
  );
}
