"use client";

import * as React from "react";
import type { SpareMode, organPreservation } from "@/content/pages/urology";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type Content = (typeof organPreservation)["spare"];

const MODES: readonly SpareMode[] = ["spare", "remove"];

/* The kidney (320 × 280): hilum on the left, the tumour on the upper outer pole. The wedge is the
   kidney clipped by a sector around the tumour; the rest is the kidney with that sector masked out. */
const KIDNEY =
  "M178 34 C 232 34, 266 84, 262 144 C 258 206, 226 252, 174 252 C 136 252, 120 224, 134 196 " +
  "C 144 176, 142 160, 130 144 C 114 122, 118 88, 134 64 C 146 46, 160 34, 178 34 Z";
const SECTOR = "M200 116 Q 196 90 210 0 L320 0 L320 96 Q 280 104 200 116 Z";
const CUT = "M211 38 Q 197 84 200 116 Q 230 112 259 101";
const TUMOUR = { cx: 236, cy: 76, r: 17 };

/**
 * "Spare vs Remove" on the Partial Nephrectomy card. Spare: the cut line draws around the tumour,
 * then only the wedge lifts away and the healthy kidney stays in the accent. Remove: the whole
 * kidney lifts away, a dashed outline left behind. A two-option radio group (arrow keys); a polite
 * live caption per state; `urology_preservation_toggle`.
 */
export function SpareRemove({ content }: { content: Content }) {
  const [mode, setMode] = React.useState<SpareMode>("spare");
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const select = (next: SpareMode, focus = false) => {
    if (next !== mode) track({ event: "urology_preservation_toggle", label: content.options[next] });
    setMode(next);
    if (focus) refs.current[MODES.indexOf(next)]?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    const i = MODES.indexOf(mode);
    const next =
      e.key === "Home"
        ? 0
        : e.key === "End"
          ? 1
          : (i + (e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 1) + 2) % 2;
    select(MODES[next], true);
  };

  return (
    <div className="uro-pv-spare" data-mode={mode}>
      <div
        role="radiogroup"
        aria-label={content.group}
        onKeyDown={onKeyDown}
        className="relative mx-auto grid w-full max-w-[280px] grid-cols-2 rounded-pill bg-surface p-1 ring-1 ring-line"
      >
        <span
          aria-hidden="true"
          className="uro-pv-thumb absolute inset-y-1 left-1 w-[calc(50%-4px)] rounded-pill bg-accent"
        />
        {MODES.map((m, i) => (
          <button
            key={m}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={mode === m}
            tabIndex={mode === m ? 0 : -1}
            onClick={() => select(m)}
            className={cn(
              "relative z-10 min-h-12 rounded-pill px-4 text-sm font-semibold transition-colors duration-300 outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
              mode === m ? "text-white" : "text-muted hover:text-ink",
            )}
          >
            {content.options[m]}
          </button>
        ))}
      </div>

      <svg
        role="img"
        aria-label={content.a11y[mode]}
        viewBox="0 0 320 280"
        className="mx-auto mt-4 block w-full max-w-[340px]"
      >
        <defs>
          <clipPath id="uro-pv-wedge">
            <path d={SECTOR} />
          </clipPath>
          <mask id="uro-pv-rest" maskUnits="userSpaceOnUse" x="0" y="0" width="320" height="280">
            <rect width="320" height="280" fill="white" />
            <path d={SECTOR} fill="black" />
          </mask>
        </defs>

        {/* The outline left behind when the whole kidney is removed */}
        <path d={KIDNEY} className="uro-pv-ghost" />

        <g className="uro-pv-whole">
          {/* Healthy kidney (everything but the wedge) */}
          <g mask="url(#uro-pv-rest)">
            <path d={KIDNEY} className="uro-pv-kidney" />
          </g>
          {/* The wedge with the tumour */}
          <g className="uro-pv-wedge">
            <g clipPath="url(#uro-pv-wedge)">
              <path d={KIDNEY} className="uro-pv-wedgeFill" />
            </g>
            {/* The cut edge travels with the wedge, so it reads as one piece */}
            <path d={CUT} className="uro-pv-wedgeEdge" />
            <circle {...TUMOUR} className="uro-pv-tumour" />
          </g>
          {/* Ureter and vessels at the hilum */}
          <path d="M132 176 C 104 186, 92 214, 96 262" className="uro-pv-duct" />
          <path d="M134 150 C 104 146, 70 150, 30 150" className="uro-pv-duct" />
        </g>

        <path d={CUT} pathLength={1} className="uro-pv-cut" />

        {/* Labels (from content) */}
        <g aria-hidden="true" className="uro-pv-labels">
          <g className="uro-pv-label uro-pv-labelTumour">
            <path d="M266 50 L288 30" className="uro-pv-leader" />
            <text x="312" y="22" className="uro-pv-text" textAnchor="end">
              {content.marks.tumour}
            </text>
          </g>
          <g className="uro-pv-label uro-pv-labelKept">
            <text x="196" y="176" className="uro-pv-text uro-pv-textAccent" textAnchor="middle">
              {content.marks.kept}
            </text>
          </g>
          <g className="uro-pv-label uro-pv-labelCut">
            <path d="M200 118 L176 128" className="uro-pv-leader" />
            <text x="172" y="134" className="uro-pv-text" textAnchor="end">
              {content.marks.cut}
            </text>
          </g>
        </g>
      </svg>

      <p
        aria-live="polite"
        className="mx-auto mt-3 min-h-[4.5em] max-w-[34ch] text-center text-sm leading-relaxed text-muted md:text-base"
      >
        {content.captions[mode]}
      </p>
    </div>
  );
}
