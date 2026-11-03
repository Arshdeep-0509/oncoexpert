"use client";

import * as React from "react";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { DetectionDiagram } from "@/components/pages/thyroid-cancer/DetectionDiagram";

type State = "early" | "late";
const STATES: readonly State[] = ["early", "late"];
const AUTOPLAY = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

type DetectionSwitchProps = {
  text: Record<State, string>;
  modes: Record<State, string>;
  labels: { modes: string; early: string; late: string };
};

/**
 * Early vs late (early-detection.css, tye-): a radiogroup (arrow keys, roving tab stop) over the
 * diagram; the live sentence for the chosen state sits under it (polite live region). On desktop it
 * plays early → late once when it comes into view, then waits for the visitor. Reduced motion: the
 * CSS shows two static panels side by side instead. A choice sends thyroid_detection_toggle.
 */
export function DetectionSwitch({ text, modes, labels }: DetectionSwitchProps) {
  const [state, setState] = React.useState<State>("early");
  const touched = React.useRef(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const radios = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el || !window.matchMedia(AUTOPLAY).matches) return;
    let timer = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        io.disconnect();
        timer = window.setTimeout(() => {
          if (!touched.current) setState("late");
        }, 1600);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(timer);
    };
  }, []);

  const choose = (next: State, focus = false) => {
    touched.current = true;
    if (focus) radios.current[STATES.indexOf(next)]?.focus();
    if (next === state) return;
    setState(next);
    track({ event: "thyroid_detection_toggle", label: next });
  };
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    choose(state === "early" ? "late" : "early", true);
  };

  return (
    <div ref={rootRef}>
      {/* Motion allowed: the switch and one diagram */}
      <div className="tye-live">
        <div
          role="radiogroup"
          aria-label={labels.modes}
          onKeyDown={onKeyDown}
          data-state={state}
          className="tye-modes relative mx-auto grid max-w-md grid-cols-2 rounded-pill bg-surface p-1.5 ring-1 shadow-soft-sm ring-line"
        >
          <span
            aria-hidden="true"
            className="tye-thumb absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-pill bg-(image:--grad-accent)"
          />
          {STATES.map((s, i) => (
            <button
              key={s}
              ref={(el) => {
                radios.current[i] = el;
              }}
              type="button"
              role="radio"
              aria-checked={state === s}
              tabIndex={state === s ? 0 : -1}
              onClick={() => choose(s)}
              className={cn(
                "relative min-h-12 rounded-pill px-3 text-[15px] font-semibold transition-colors duration-300",
                state === s ? "text-white" : "text-ink",
              )}
            >
              {modes[s]}
            </button>
          ))}
        </div>
        <div className="mx-auto mt-8 aspect-[300/260] w-full max-w-[420px]">
          <DetectionDiagram state={state} label={labels[state]} />
        </div>
        <p
          aria-live="polite"
          className="mx-auto mt-6 max-w-xl text-center text-lg leading-relaxed font-semibold text-ink md:text-xl"
        >
          {text[state]}
        </p>
      </div>

      {/* Reduced motion: both states, side by side */}
      <div className="tye-static grid gap-8 md:grid-cols-2">
        {STATES.map((s) => (
          <figure key={s} className="rounded-xl bg-surface p-6 ring-1 ring-line">
            <div className="mx-auto aspect-[300/260] w-full max-w-[360px]">
              <DetectionDiagram state={s} label={labels[s]} />
            </div>
            <figcaption className="mt-4 text-center">
              <span className="block text-sm font-bold tracking-[0.1em] text-accent uppercase">{modes[s]}</span>
              <span className="mt-2 block text-base leading-relaxed text-ink md:text-lg">{text[s]}</span>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
