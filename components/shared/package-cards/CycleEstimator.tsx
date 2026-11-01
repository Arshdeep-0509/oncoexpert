"use client";

import * as React from "react";
import { animate, useReducedMotion } from "motion/react";
import type { PackageEstimator } from "@/content/types";
import { track } from "@/lib/analytics";

const format = (n: number) => `₹${Math.round(n).toLocaleString("en-IN")}`;
const DEBOUNCE_MS = 600;

/**
 * The cycle estimator under the cards: a native range slider (48px thumb, package-cards.css) and
 * the computed sentence "6 cycles × ₹16,000 = from ₹96,000", whose total counts from the last value
 * to the new one. The slider's aria-valuetext reads the sentence. estimator_change is sent once the
 * slider rests (debounced).
 */
export function CycleEstimator({ estimator, page }: { estimator: PackageEstimator; page: string }) {
  const [n, setN] = React.useState(estimator.initial);
  const totalRef = React.useRef<HTMLSpanElement>(null);
  const shown = React.useRef(estimator.initial * estimator.unitPrice);
  const reduce = useReducedMotion();
  const id = React.useId();
  const total = n * estimator.unitPrice;

  React.useEffect(() => {
    const el = totalRef.current;
    if (!el) return;
    if (reduce) {
      el.textContent = format(total);
      shown.current = total;
      return;
    }
    const controls = animate(shown.current, total, {
      duration: 0.5,
      ease: "easeOut",
      onUpdate: (v) => {
        el.textContent = format(v);
        shown.current = v;
      },
    });
    return () => controls.stop();
  }, [total, reduce]);

  React.useEffect(() => {
    if (n === estimator.initial) return;
    const t = window.setTimeout(() => track({ event: "estimator_change", cycles: n, page }), DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [n, estimator.initial, page]);

  const sentence = (totalText: string) =>
    estimator.sentence
      .replace("{n}", String(n))
      .replace("{price}", format(estimator.unitPrice))
      .replace("{total}", totalText);
  const [before] = estimator.sentence.split("{total}");

  return (
    <div className="mt-10 rounded-xl bg-surface p-6 ring-1 shadow-soft-sm ring-line md:p-8">
      <h3 className="font-display text-xl text-ink md:text-2xl">{estimator.title}</h3>
      <label htmlFor={id} className="mt-5 block text-base font-semibold text-ink">
        {estimator.label}
      </label>
      <input
        id={id}
        type="range"
        min={estimator.min}
        max={estimator.max}
        step={1}
        value={n}
        aria-valuetext={sentence(format(total))}
        onChange={(e) => setN(Number(e.target.value))}
        className="pkc-range mt-3 w-full"
      />
      <p className="mt-5 font-display text-2xl text-ink tabular-nums md:text-[1.75rem]">
        {before.replace("{n}", String(n)).replace("{price}", format(estimator.unitPrice))}
        <span ref={totalRef} className="font-semibold text-accent">
          {format(total)}
        </span>
      </p>
    </div>
  );
}
