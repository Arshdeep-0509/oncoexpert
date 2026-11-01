"use client";

import * as React from "react";
import { Check, RotateCcw } from "lucide-react";
import type { AppointmentService } from "@/content/site";
import type { TreatmentKey } from "@/content/pages/ovarian-cancer";
import { cn, focusRing } from "@/lib/utils";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { TreatmentArt } from "@/components/pages/ovarian-cancer/TreatmentArt";

type TreatmentPanelProps = {
  item: { key: TreatmentKey; title: string; body: string; bullets: readonly string[] };
  ask: { label: string; service: AppointmentService; notePrefix: string };
  replayLabel: string;
};

/**
 * One treatment: its illustration (plays when the panel mounts; HIPEC has a Replay button), the
 * live title, text and bullets (their checks draw), and "Ask about <option>", which opens the
 * booking page with the option as the note.
 */
export function TreatmentPanel({ item, ask, replayLabel }: TreatmentPanelProps) {
  const [replay, setReplay] = React.useState(0);
  const label = ask.label.replace("{option}", item.title);
  return (
    <div className="ovt-panelIn grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:items-center md:gap-10">
      <div className="relative mx-auto aspect-[5/4] w-full max-w-[320px] rounded-xl bg-surface-alt p-4 md:max-w-none">
        <TreatmentArt treatment={item.key} replay={replay} />
        {item.key === "hipec" ? (
          <button
            type="button"
            onClick={() => setReplay((r) => r + 1)}
            aria-label={replayLabel}
            className={cn(
              "absolute right-2 bottom-2 grid size-12 place-items-center rounded-full bg-surface text-accent shadow-soft-sm motion-reduce:hidden",
              focusRing,
            )}
          >
            <RotateCcw className="size-5" strokeWidth={1.75} aria-hidden="true" />
          </button>
        ) : null}
      </div>
      <div>
        <h3 className="font-display text-2xl leading-snug text-ink md:text-[1.75rem]">{item.title}</h3>
        <p className="mt-3 measure text-base leading-relaxed text-text md:text-lg">{item.body}</p>
        <ul className="mt-5 grid gap-3">
          {item.bullets.map((b, k) => (
            <li key={b} className="flex items-center gap-3 text-base font-semibold text-ink">
              <span className="grid size-7 shrink-0 place-items-center rounded-full bg-accent text-white">
                <Check
                  className="ovt-check size-4"
                  strokeWidth={3}
                  aria-hidden="true"
                  style={{ "--k": k } as React.CSSProperties}
                />
              </span>
              {b}
            </li>
          ))}
        </ul>
        <div className="mt-7">
          <AppointmentButton
            label={label}
            service={ask.service}
            note={`${ask.notePrefix}${item.title}`}
            cta={`ovarian:treatments:ask-${item.key}`}
            variant="secondary"
            arrow
            fullWidthOnMobile
          />
        </div>
      </div>
    </div>
  );
}
