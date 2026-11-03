"use client";

import * as React from "react";
import { track } from "@/lib/analytics";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { ScrollFillLine } from "@/components/ui/ScrollFillLine";
import { ScrollVar } from "@/components/ui/ScrollVar";
import { AirwayTrack } from "@/components/pages/lung-cancer/AirwayTrack";
import { StepCard, type JourneyStep } from "@/components/pages/lung-cancer/StepCard";

/** The layouts (pathway.css uses the same queries). */
const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const ROW = "(min-width: 768px) and (max-width: 1023px) and (prefers-reduced-motion: no-preference)";

type AirwayJourneyProps = {
  heading: React.ReactNode;
  steps: readonly JourneyStep[];
  labels: { steps: string; stepper: string; step: string; status: string; progress: string };
};

const stateOf = (i: number, active: number) => (i === active ? "active" : i < active ? "past" : "future");

/**
 * The six steps, in three layouts (pathway.css). Pinned (desktop): ScrollVar writes --p and
 * data-step through 2.5 screens of scroll; the airway draws, the active node scales and pulses,
 * the card slides out left and in from the right. Row (tablets): a snap row with a progress bar
 * and the node stepper. Phones: a vertical timeline, cards from alternating sides. Reduced motion:
 * a static list. Nodes jump to a step (Lenis on the pinned layout), set aria-current="step",
 * answer to arrow keys, and a polite live region names the step.
 */
export function AirwayJourney({ heading, steps, labels }: AirwayJourneyProps) {
  const [active, setActive] = React.useState(0);
  const stageRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLOListElement>(null);
  const nodes = React.useRef<(HTMLButtonElement | null)[]>([]);
  const count = steps.length;

  // Pinned: mirror ScrollVar's data-step (on the pin box) into React.
  React.useEffect(() => {
    const pin = stageRef.current?.parentElement;
    if (!pin) return;
    const read = () => {
      if (window.matchMedia(PINNED).matches && pin.dataset.step) setActive(Number(pin.dataset.step));
    };
    const mo = new MutationObserver(read);
    mo.observe(pin, { attributes: true, attributeFilter: ["data-step"] });
    return () => mo.disconnect();
  }, []);

  // Row: horizontal scroll → progress bar and active card.
  React.useEffect(() => {
    const list = listRef.current;
    const pin = stageRef.current?.parentElement;
    if (!list || !pin) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!window.matchMedia(ROW).matches) return;
      const max = list.scrollWidth - list.clientWidth;
      const p = max > 0 ? list.scrollLeft / max : 0;
      pin.style.setProperty("--row-p", p.toFixed(4));
      const first = list.children[0] as HTMLElement | undefined;
      const stride = first ? first.offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0") : 1;
      setActive(p >= 0.995 ? count - 1 : Math.min(count - 1, Math.round(list.scrollLeft / stride)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      list.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  const select = (i: number) => {
    const pin = stageRef.current?.parentElement;
    const list = listRef.current;
    if (!pin || !list) return;
    setActive(i);
    track({ event: "lung_pathway_step", label: steps[i].title, step: i + 1 });
    if (window.matchMedia(PINNED).matches) {
      // The middle of step i's share of the pinned scroll.
      const box = pin.getBoundingClientRect();
      const top = window.scrollY + box.top + ((i + 0.5) / count) * (box.height - window.innerHeight);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: "smooth" });
    } else {
      const card = list.children[i] as HTMLElement | undefined;
      if (card)
        list.scrollTo({
          left: card.offsetLeft - list.offsetLeft - parseFloat(getComputedStyle(list).paddingLeft),
          behavior: "smooth",
        });
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? Math.min(count - 1, active + 1)
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? Math.max(0, active - 1)
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? count - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    select(next);
    nodes.current[next]?.focus();
  };

  return (
    <ScrollVar range="pin" steps={count} media={PINNED} className="lup-pin">
      <div ref={stageRef} className="lup-stage">
        <div className="mx-auto w-full max-w-[calc(1240px+var(--gutter)*2)] px-(--gutter) pt-(--section-y)">
          {heading}

          <div className="lup-trackWrap mt-10 mb-14">
            <AirwayTrack
              titles={steps.map((s) => s.title)}
              active={active}
              labels={labels}
              onSelect={select}
              onKeyDown={onKeyDown}
              setNodeRef={(i, el) => {
                nodes.current[i] = el;
              }}
            />
          </div>

          <div className="relative mt-8">
            <ScrollFillLine className="lup-line absolute top-6 bottom-6 left-[23px]" />
            <ol ref={listRef} aria-label={labels.steps} className="lup-list">
              {steps.map((step, i) => (
                <li key={step.title} className="lup-step relative">
                  <span
                    aria-hidden="true"
                    className="lup-num z-10 grid size-12 place-items-center rounded-full bg-surface font-display text-base font-semibold text-accent tabular-nums ring-2 shadow-soft-sm ring-accent-soft"
                  >
                    {i + 1}
                  </span>
                  <InView className="lup-slide h-full" threshold={0.35}>
                    <StepCard step={step} index={i} state={stateOf(i, active)} stepLabel={labels.step} />
                  </InView>
                </li>
              ))}
            </ol>
            <div
              role="progressbar"
              aria-label={labels.progress}
              aria-valuemin={1}
              aria-valuemax={count}
              aria-valuenow={active + 1}
              className={cn("lup-progress mt-5 h-1 overflow-hidden rounded-full bg-line")}
            >
              <div className="lup-progressFill h-full w-full rounded-full bg-(image:--grad-accent)" />
            </div>
          </div>

          <p aria-live="polite" className="sr-only">
            {labels.status.replace("{n}", String(active + 1)).replace("{total}", String(count))}
          </p>
        </div>
      </div>
    </ScrollVar>
  );
}
