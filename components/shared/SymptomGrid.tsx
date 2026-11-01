"use client";

import * as React from "react";
import Image from "next/image";
import { Check, ChevronDown } from "lucide-react";
import type { SymptomItem } from "@/content/types";
import type { AppointmentService } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { useMedia } from "@/lib/hooks/use-media";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { symptomIcons } from "@/components/shared/symptom-grid/icons";
import "@/components/shared/symptom-grid/symptom-grid.css";

type CheckProps = {
  mode: "check";
  /** The line shown while nothing is ticked (e.g. the page's live sentence). */
  empty: string;
  /** Once something is ticked: a line and a button; its note is `notePrefix` + the ticked list. */
  result: { some: string; cta: { label: string; service: AppointmentService; cta?: string }; notePrefix: string };
  labels: { group: string; result: string };
};
type DiscloseProps = { mode: "disclose"; labels: { group: string } };

type SymptomGridProps = (CheckProps | DiscloseProps) & {
  items: readonly SymptomItem[];
  /** Analytics prefix of the page, e.g. "ovarian" (symptom_check sends the count only). */
  page: string;
  className?: string;
};

const PHONE = "(max-width: 767px)";

/**
 * A grid of symptom cards (shared; first used on the ovarian page). A 2 × 2 grid on phones (never a
 * swipe row), four across from lg.
 * - "check": each card is a checkbox (role="checkbox", Space or click toggles; teal fill with a
 *   small bounce). A result panel under the grid shows `empty` while nothing is ticked; once one or
 *   more are, a NEW line and a booking button whose note lists them. Nothing is stored; analytics
 *   gets the count only (symptom_check).
 * - "disclose": each card is a button (aria-expanded) that reveals its `body` in place (the space
 *   is reserved); on phones every card is open.
 */
export function SymptomGrid(props: SymptomGridProps) {
  const { items, page, className } = props;
  const [ticked, setTicked] = React.useState<ReadonlySet<string>>(new Set());
  const [open, setOpen] = React.useState<string | null>(null);
  const phone = useMedia(PHONE);

  const toggle = (key: string) => {
    const next = new Set(ticked);
    if (next.has(key)) next.delete(key);
    else next.add(key);
    setTicked(next);
    track({ event: "symptom_check", page, count: next.size });
  };

  const grid = "grid grid-cols-2 gap-3 md:gap-4 lg:grid-cols-4";

  if (props.mode === "disclose") {
    return (
      <ul aria-label={props.labels.group} className={cn(grid, className)}>
        {items.map((item) => {
          const Icon = symptomIcons[item.icon];
          const expanded = open === item.key || phone;
          return (
            <li key={item.key}>
              <div
                data-open={expanded ? "" : undefined}
                className="sgx-card relative flex h-full flex-col rounded-xl bg-surface p-4 ring-1 shadow-soft-sm ring-line md:p-6"
              >
                {item.image ? (
                  <div className="relative -mx-4 -mt-4 mb-2 aspect-[4/3] md:-mx-6 md:-mt-6">
                    <div className="absolute inset-0 overflow-hidden rounded-t-xl">
                      <Image
                        src={item.image.src}
                        alt={item.image.alt}
                        fill
                        sizes="(min-width: 1024px) 290px, 46vw"
                        className="sgx-photo object-cover"
                        style={{ objectPosition: item.image.focal }}
                      />
                    </div>
                    <span className="sgx-icon absolute -bottom-6 left-4 grid size-12 place-items-center rounded-full bg-surface text-accent shadow-soft md:left-6">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                  </div>
                ) : (
                  <span className="sgx-icon grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
                    <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                )}
                <h3
                  className={cn(
                    "text-base leading-snug font-semibold text-ink md:text-lg",
                    item.image ? "mt-7" : "mt-4",
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={expanded}
                    aria-controls={`sgx-${item.key}`}
                    onClick={() => setOpen(open === item.key ? null : item.key)}
                    className="flex min-h-12 w-full items-center justify-between gap-2 text-left after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent"
                  >
                    {item.title}
                    <ChevronDown
                      className="sgx-chev hidden size-5 shrink-0 text-muted md:block"
                      strokeWidth={1.75}
                      aria-hidden="true"
                    />
                  </button>
                </h3>
                <p id={`sgx-${item.key}`} className="sgx-body mt-2 text-base leading-relaxed text-muted">
                  {item.body}
                </p>
              </div>
            </li>
          );
        })}
      </ul>
    );
  }

  const chosen = items.filter((i) => ticked.has(i.key));
  return (
    <div className={className}>
      <div role="group" aria-label={props.labels.group} className={grid}>
        {items.map((item) => {
          const Icon = symptomIcons[item.icon];
          const checked = ticked.has(item.key);
          return (
            <div
              key={item.key}
              role="checkbox"
              aria-checked={checked}
              tabIndex={0}
              onClick={() => toggle(item.key)}
              onKeyDown={(e) => {
                if (e.key !== " ") return;
                e.preventDefault();
                toggle(item.key);
              }}
              className="sgx-check relative flex min-h-36 cursor-pointer flex-col justify-between rounded-xl bg-surface p-4 ring-1 shadow-soft-sm ring-line outline-none focus-visible:ring-2 focus-visible:ring-accent md:p-6"
            >
              <span className="flex items-start justify-between gap-2">
                <span className="sgx-icon grid size-12 place-items-center rounded-full bg-accent-soft text-accent">
                  <Icon className="size-6" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span aria-hidden="true" className="sgx-box grid size-7 place-items-center rounded-md ring-2 ring-line">
                  <Check className="sgx-tick size-4 text-white" strokeWidth={3} />
                </span>
              </span>
              <span className="mt-4 text-base leading-snug font-semibold text-ink md:text-lg">{item.title}</span>
            </div>
          );
        })}
      </div>

      <div
        aria-live="polite"
        aria-label={props.labels.result}
        role="region"
        className="mt-6 flex min-h-[6.5rem] flex-col items-start gap-4 rounded-xl bg-surface p-5 ring-1 ring-line md:flex-row md:items-center md:justify-between md:p-6"
      >
        {chosen.length === 0 ? (
          <p className="measure text-base leading-relaxed text-text md:text-lg">{props.empty}</p>
        ) : (
          <>
            <p className="measure text-base leading-relaxed font-semibold text-ink md:text-lg">{props.result.some}</p>
            <AppointmentButton
              {...props.result.cta}
              note={`${props.result.notePrefix}${chosen.map((c) => c.title).join(", ")}`}
              arrow
              fullWidthOnMobile
              className="shrink-0"
            />
          </>
        )}
      </div>
    </div>
  );
}
