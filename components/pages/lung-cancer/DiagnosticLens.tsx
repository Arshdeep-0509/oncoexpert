"use client";

import * as React from "react";
import type { TestKey } from "@/content/pages/lung-cancer";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { LensArt } from "@/components/pages/lung-cancer/LensArt";

const ADVANCE_MS = 5000;

type DiagnosticLensProps = {
  tests: readonly { key: TestKey; title: string; caption: string }[];
  labels: { tests: string; lens: string };
};

/**
 * The diagnostic lens: a 320px circle showing one test as line art, chosen with ARIA tabs (arrow
 * keys, Home / End, roving tab stop). Each change turns the ring 120° and crossfades the art
 * (diagnosis.css, lud-). It advances by itself every 5s while on screen, until the first
 * interaction; hovering or focusing it holds it; never with reduced motion. A visitor's choice
 * sends lung_test_select.
 */
export function DiagnosticLens({ tests, labels }: DiagnosticLensProps) {
  // The selected test and how many thirds the ring has turned (always forward).
  const [{ index, turns }, setLens] = React.useState({ index: 0, turns: 0 });
  const [touched, setTouched] = React.useState(false);
  const [held, setHeld] = React.useState(false);
  const [inView, setInView] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const id = React.useId();
  const count = tests.length;

  const go = (i: number) => setLens((s) => ({ index: i, turns: s.turns + ((i - s.index + count) % count) }));

  const choose = (i: number, focus = false) => {
    setTouched(true);
    go(i);
    if (focus) tabRefs.current[i]?.focus();
    track({ event: "lung_test_select", label: tests[i].title });
  };

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(!!entry?.isIntersecting), { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  React.useEffect(() => {
    if (touched || held || !inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setLens((s) => ({ index: (s.index + 1) % count, turns: s.turns + 1 })),
      ADVANCE_MS,
    );
    return () => window.clearInterval(timer);
  }, [touched, held, inView, count]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    const next =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? (index + 1) % count
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? (index - 1 + count) % count
          : e.key === "Home"
            ? 0
            : e.key === "End"
              ? count - 1
              : null;
    if (next === null) return;
    e.preventDefault();
    choose(next, true);
  };

  const test = tests[index];

  return (
    <div
      ref={rootRef}
      onPointerEnter={() => setHeld(true)}
      onPointerLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHeld(false);
      }}
      className="mx-auto w-full max-w-[400px]"
    >
      {/* The lens */}
      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${index}`}
        className="relative mx-auto aspect-square w-full max-w-[320px]"
      >
        <svg
          viewBox="0 0 320 320"
          aria-hidden="true"
          className="lud-ring absolute inset-0 size-full"
          style={{ "--turn": `${turns * 120}deg` } as React.CSSProperties}
        >
          <circle cx="160" cy="160" r="156" fill="none" style={{ stroke: "var(--line)" }} strokeWidth="2" />
          <circle
            cx="160"
            cy="160"
            r="156"
            fill="none"
            style={{ stroke: "var(--accent)" }}
            strokeWidth="3"
            strokeLinecap="round"
            pathLength={3}
            strokeDasharray="0.62 2.38"
            transform="rotate(-90 160 160)"
          />
          {[0, 120, 240].map((deg) => (
            <circle
              key={deg}
              cx={Number((160 + 156 * Math.sin((deg * Math.PI) / 180)).toFixed(2))}
              cy={Number((160 - 156 * Math.cos((deg * Math.PI) / 180)).toFixed(2))}
              r="5"
              style={{ fill: "var(--accent-bright)" }}
            />
          ))}
        </svg>
        <div className="absolute inset-[9%] overflow-hidden rounded-full bg-surface ring-1 shadow-soft ring-line">
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_50%_40%,var(--accent-soft),transparent_70%)]" />
          {tests.map((t, i) => (
            <div key={t.key} data-active={i === index ? "" : undefined} className="lud-art absolute inset-[14%]">
              <LensArt test={t.key} />
            </div>
          ))}
        </div>
      </div>

      {/* The three tests */}
      <div
        role="tablist"
        aria-label={labels.tests}
        onKeyDown={onKeyDown}
        className="mt-6 grid grid-cols-[auto_auto_auto] gap-1 rounded-pill bg-surface p-1.5 ring-1 shadow-soft-sm ring-line max-[289px]:grid-cols-1 max-[289px]:rounded-2xl min-[440px]:grid-cols-3 min-[440px]:gap-1.5"
      >
        {tests.map((t, i) => (
          <button
            key={t.key}
            ref={(el) => {
              tabRefs.current[i] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${i}`}
            aria-selected={i === index}
            aria-controls={`${id}-panel`}
            tabIndex={i === index ? 0 : -1}
            onClick={() => choose(i)}
            className={cn(
              "min-h-12 rounded-pill px-1 text-[13px] leading-tight font-semibold transition-colors min-[440px]:px-2 min-[440px]:text-[14px] md:text-[15px]",
              i === index ? "bg-accent text-white shadow-soft-sm" : "text-ink hover:bg-accent-soft",
            )}
          >
            {t.title}
          </button>
        ))}
      </div>

      <p key={test.key} className="lud-caption mt-4 min-h-[3.25rem] text-center text-base leading-relaxed text-muted">
        <span className="sr-only">{labels.lens}: </span>
        {test.caption}
      </p>
    </div>
  );
}
