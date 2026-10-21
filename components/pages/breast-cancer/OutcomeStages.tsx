"use client";

import * as React from "react";
import { useInView } from "motion/react";
import type { StageOutcome } from "@/content/pages/breast-cancer";
import { cn } from "@/lib/utils";
import { ProgressRing } from "@/components/ui/ProgressRing";
import { Counter } from "@/components/ui/Counter";

const STAGGER = 0.12;

/**
 * One card per stage: survival ring, caption, and "{cases} Stage X Cases" with a bar whose
 * length is relative to the largest stage. Rings and bars animate once when the cards
 * enter view, 0.12s apart. 2×2 on phones/tablets, 4 in a row on desktop. Not swiped:
 * people compare them. Decorative for screen readers (OutcomesTable has the numbers).
 */
export function OutcomeStages({ stages, survivalLabel }: { stages: readonly StageOutcome[]; survivalLabel: string }) {
  const ref = React.useRef<HTMLUListElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const max = Math.max(...stages.map((s) => s.cases));

  return (
    <ul ref={ref} aria-hidden="true" className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
      {stages.map((s, i) => (
        <li key={s.stage} className="flex flex-col rounded-lg border border-line bg-surface p-4 shadow-soft-sm md:p-6">
          <p className="font-display text-lg leading-none text-ink md:text-[1.4rem]">{s.stage}</p>

          <div className="mt-4 flex items-center gap-3 md:mt-5 md:flex-col md:items-start md:gap-4 lg:flex-row lg:items-center">
            <ProgressRing
              value={s.survival5y}
              size={72}
              thickness={7}
              sizeMd={104}
              thicknessMd={9}
              delay={i * STAGGER}
              label={`${s.survival5y}%`}
            >
              <span className="font-display text-base font-semibold text-ink md:text-xl">
                <Counter value={s.survival5y} suffix="%" delay={i * STAGGER} reserveWidth />
              </span>
            </ProgressRing>
            <p className="text-[12px] leading-snug font-semibold text-muted md:text-[13px]">{survivalLabel}</p>
          </div>

          <div className="mt-auto pt-5">
            <p className="text-[13px] leading-snug text-text md:text-sm">
              <span className="font-display text-lg font-semibold text-ink tabular-nums md:text-xl">{s.cases}</span>{" "}
              {s.caseLabel}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-accent-soft">
              <div
                className={cn(
                  "h-full origin-left rounded-full bg-accent transition-transform duration-1000 ease-out-expo",
                )}
                style={{
                  transform: `scaleX(${inView ? s.cases / max : 0})`,
                  transitionDelay: inView ? `${0.2 + i * STAGGER}s` : "0s",
                }}
              />
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
