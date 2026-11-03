import type * as React from "react";
import { cn } from "@/lib/utils";
import { AIRWAY_BOX, AIRWAY_PATH, forkAt, nodeAt } from "@/components/pages/lung-cancer/airway-path";

type AirwayTrackProps = {
  titles: readonly string[];
  active: number;
  labels: { stepper: string; step: string };
  onSelect: (i: number) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  setNodeRef: (i: number, el: HTMLButtonElement | null) => void;
};

const stateOf = (i: number, active: number) => (i === active ? "active" : i < active ? "past" : "future");

/**
 * The airway with its six step buttons (tablets and desktops; pathway.css hides it on phones and
 * with reduced motion). The drawn airway follows --p on the pinned layout; each fork draws when its
 * step is reached. The buttons are a roving tab stop: arrow keys move between them (AirwayJourney).
 */
export function AirwayTrack({ titles, active, labels, onSelect, onKeyDown, setNodeRef }: AirwayTrackProps) {
  return (
    <div className="lup-track relative" style={{ aspectRatio: `${AIRWAY_BOX.width} / ${AIRWAY_BOX.height}` }}>
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${AIRWAY_BOX.width} ${AIRWAY_BOX.height}`}
        className="absolute inset-0 size-full overflow-visible"
      >
        <defs>
          <linearGradient id="lup-air-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" style={{ stopColor: "var(--accent)" }} />
            <stop offset="0.7" style={{ stopColor: "var(--accent-bright)" }} />
            <stop offset="1" style={{ stopColor: "var(--highlight)" }} />
          </linearGradient>
        </defs>
        {/* The airway's wall: a soft wide band, then the line drawn on it */}
        <path
          d={AIRWAY_PATH}
          fill="none"
          style={{ stroke: "var(--accent-soft)" }}
          strokeWidth="22"
          strokeLinecap="round"
        />
        <path
          d={AIRWAY_PATH}
          pathLength={1}
          fill="none"
          stroke="url(#lup-air-grad)"
          strokeWidth="6"
          strokeLinecap="round"
          className="lup-airDraw"
        />
        {titles.map((title, i) => (
          <path
            key={title}
            d={forkAt(i)}
            pathLength={1}
            fill="none"
            style={{ stroke: "var(--accent-bright)" }}
            strokeWidth="3"
            strokeLinecap="round"
            data-state={stateOf(i, active)}
            className="lup-fork"
          />
        ))}
      </svg>
      <nav aria-label={labels.stepper} className="absolute inset-0">
        <ol onKeyDown={onKeyDown}>
          {titles.map((title, i) => {
            const { left, top } = nodeAt(i);
            return (
              <li key={title} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left, top }}>
                <button
                  ref={(el) => setNodeRef(i, el)}
                  type="button"
                  onClick={() => onSelect(i)}
                  tabIndex={i === active ? 0 : -1}
                  aria-label={`${labels.step} ${i + 1}: ${title}`}
                  aria-current={i === active ? "step" : undefined}
                  data-state={stateOf(i, active)}
                  className={cn(
                    "lup-node relative grid size-12 place-items-center rounded-full bg-surface font-display text-base font-semibold text-accent tabular-nums ring-2 shadow-soft-sm ring-accent-soft",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className="lup-nodeFill absolute inset-0 rounded-full bg-(image:--grad-accent)"
                  />
                  <span aria-hidden="true" className="lup-pulse absolute inset-0 rounded-full" />
                  <span aria-hidden="true" className="lup-nodeNum relative">
                    {i + 1}
                  </span>
                </button>
                <span
                  aria-hidden="true"
                  className={cn(
                    "lup-nodeLabel absolute left-1/2 -translate-x-1/2 text-sm font-semibold whitespace-nowrap text-ink",
                    // opposite the fork: forks rise on even steps, dip on odd ones
                    i % 2 ? "bottom-full mb-2" : "top-full mt-2",
                  )}
                >
                  {title}
                </span>
              </li>
            );
          })}
        </ol>
      </nav>
    </div>
  );
}
