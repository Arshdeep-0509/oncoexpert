"use client";

import * as React from "react";
import { ArrowUpRight, Droplet, Wind, type LucideIcon } from "lucide-react";
import type { SymptomIcon } from "@/content/pages/lung-cancer";
import { track } from "@/lib/analytics";

const icons: Record<SymptomIcon, LucideIcon> = { cough: Wind, blood: Droplet };

type SymptomCardProps = { icon: SymptomIcon; title: string; when: string; hint: string; id: string };

/**
 * One symptom (EXISTING title) and its NEW "when to see a doctor" line, as a hover card. On devices
 * that can hover, the card shows its icon, title and a hint; hovering or focusing it (Tab stops on
 * the card) slides an accent panel with the line over it (diagnosis.css). Touch screens show the
 * line under the title. The first hover or focus sends lung_symptom_open.
 */
export function SymptomCard({ icon, title, when, hint, id }: SymptomCardProps) {
  const sent = React.useRef(false);
  const Icon = icons[icon];
  const titleId = `${id}-title`;
  const opened = () => {
    if (sent.current) return;
    sent.current = true;
    track({ event: "lung_symptom_open", label: title });
  };

  return (
    <article
      tabIndex={0}
      aria-labelledby={titleId}
      onMouseEnter={opened}
      onFocus={opened}
      className="lud-sym relative flex h-full min-h-44 flex-col overflow-hidden rounded-xl border border-line bg-surface p-5 shadow-soft-sm outline-none focus-visible:ring-2 focus-visible:ring-accent md:p-6"
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-full bg-accent-soft text-accent">
        <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
      </span>
      <h3 id={titleId} className="mt-4 font-display text-xl leading-snug text-ink">
        {title}
      </h3>
      <p
        aria-hidden="true"
        className="lud-hint mt-auto flex items-center gap-1.5 pt-3 text-sm font-semibold text-accent"
      >
        {hint}
        <ArrowUpRight className="size-4" strokeWidth={2} />
      </p>
      <div className="lud-when mt-3">
        <p className="lud-whenLabel text-sm font-bold tracking-[0.08em] uppercase">{hint}</p>
        <p className="mt-1.5 text-base leading-relaxed">{when}</p>
      </div>
    </article>
  );
}
