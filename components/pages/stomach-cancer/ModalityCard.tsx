import {
  Crosshair,
  Dna,
  Hand,
  HeartPulse,
  Network,
  ScanEye,
  ShieldCheck,
  TrendingUp,
  type LucideIcon,
} from "lucide-react";
import type { TreatmentPointIcon, treatments } from "@/content/pages/stomach-cancer";
import { cn } from "@/lib/utils";

type Item = (typeof treatments)["items"][number];

const pointIcons: Record<TreatmentPointIcon, LucideIcon> = {
  nodes: Network,
  survival: HeartPulse,
  visualization: ScanEye,
  tremor: Hand,
  targeted: Crosshair,
  "side-effects": ShieldCheck,
  genetics: Dna,
  response: TrendingUp,
};

/**
 * One modality on the journey: the chip, an optional role ("The operation"), the title, the live
 * text and its two points with icons. `compact`: the FLOT reminder after surgery (chip, title and
 * the phase's note only).
 */
export function ModalityCard({
  item,
  role,
  compact = false,
  note,
  className,
}: {
  item: Item;
  role?: string;
  compact?: boolean;
  note?: string;
  className?: string;
}) {
  return (
    <article
      id={compact ? undefined : `gastro-modality-${item.key}`}
      className={cn(
        "flex h-full flex-col rounded-2xl bg-surface p-5 ring-1 shadow-soft-sm ring-line md:p-6",
        compact && "border border-dashed border-accent/40 bg-surface/70 shadow-none ring-0",
        className,
      )}
    >
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-pill bg-accent-soft px-3 py-1 text-xs font-bold tracking-[0.12em] text-accent-hover">
          {item.tag}
        </span>
        {role ? <span className="text-sm font-semibold text-muted">{role}</span> : null}
      </div>
      <h3 className="mt-3 font-display text-xl leading-snug font-(--display-weight) tracking-(--display-tracking) text-ink md:text-2xl">
        {item.title}
      </h3>
      {compact ? (
        note ? (
          <p className="mt-2 text-base leading-relaxed text-muted">{note}</p>
        ) : null
      ) : (
        <>
          <p className="mt-2 text-base leading-relaxed text-muted">{item.body.join(" ")}</p>
          <ul className="mt-auto grid gap-2.5 pt-5">
            {item.points.map((pt) => {
              const Icon = pointIcons[pt.icon];
              return (
                <li key={pt.label} className="flex items-center gap-3 text-base text-text">
                  <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-surface-warm text-accent">
                    <Icon className="size-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  {pt.label}
                </li>
              );
            })}
          </ul>
        </>
      )}
    </article>
  );
}
