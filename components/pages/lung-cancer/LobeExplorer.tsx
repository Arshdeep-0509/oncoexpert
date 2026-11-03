"use client";

import * as React from "react";
import type { LobeKey, SurgeryMode } from "@/content/pages/lung-cancer";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import { LobeDiagram } from "@/components/pages/lung-cancer/LobeDiagram";

const MODES: readonly SurgeryMode[] = ["lobectomy", "pneumonectomy"];

type LobeExplorerProps = {
  modes: Record<SurgeryMode, string>;
  lobes: readonly { key: LobeKey; name: string; side: "left" | "right" }[];
  preserved: string;
  summary: Record<SurgeryMode, string>;
  labels: { modes: string; lobes: string; lobe: string; hint: string };
};

const fill = (text: string, values: Record<string, string | number>) =>
  text.replace(/\{(\w+)\}/g, (_, k: string) => String(values[k] ?? ""));

/**
 * The lobe explorer: a Lobectomy | Pneumonectomy radiogroup (arrow keys, roving tab stop) above
 * both lungs as five lobe buttons. Lobectomy: the chosen lobe is hatched and lifts out, the rest
 * glow; Pneumonectomy: the whole right lung lifts out. Choosing a lobe switches to Lobectomy. The
 * caption counts the lobes kept; a polite live region says what changed. Changes send
 * lung_surgery_toggle.
 */
export function LobeExplorer({ modes, lobes, preserved, summary, labels }: LobeExplorerProps) {
  const [mode, setMode] = React.useState<SurgeryMode>("lobectomy");
  const [lobe, setLobe] = React.useState<LobeKey>("rightUpper");
  const [preview, setPreview] = React.useState<LobeKey | null>(null);
  const radios = React.useRef<(HTMLButtonElement | null)[]>([]);

  const removed = React.useMemo(
    () =>
      new Set<LobeKey>(mode === "pneumonectomy" ? lobes.filter((l) => l.side === "right").map((l) => l.key) : [lobe]),
    [mode, lobe, lobes],
  );
  const name = lobes.find((l) => l.key === lobe)?.name ?? "";
  const caption = fill(preserved, { kept: lobes.length - removed.size, total: lobes.length });
  const status = `${fill(summary[mode], { lobe: name })} ${caption}.`;

  const chooseMode = (next: SurgeryMode, focus = false) => {
    if (focus) radios.current[MODES.indexOf(next)]?.focus();
    if (next === mode) return;
    setMode(next);
    track({ event: "lung_surgery_toggle", label: next });
  };
  const chooseLobe = (key: LobeKey) => {
    setLobe(key);
    setMode("lobectomy");
    track({ event: "lung_surgery_toggle", label: `lobectomy:${key}` });
  };
  const onRadioKey = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowUp", "ArrowDown"].includes(e.key)) return;
    e.preventDefault();
    chooseMode(mode === "lobectomy" ? "pneumonectomy" : "lobectomy", true);
  };

  return (
    <div className="mx-auto w-full max-w-[460px]">
      <div
        role="radiogroup"
        aria-label={labels.modes}
        onKeyDown={onRadioKey}
        className="lu-sx-modes relative mx-auto grid max-w-sm grid-cols-2 rounded-pill bg-surface p-1.5 ring-1 shadow-soft-sm ring-line"
        data-mode={mode}
      >
        <span
          aria-hidden="true"
          className="lu-sx-thumb absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-pill bg-(image:--grad-accent)"
        />
        {MODES.map((m, i) => (
          <button
            key={m}
            ref={(el) => {
              radios.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={mode === m}
            tabIndex={mode === m ? 0 : -1}
            onClick={() => chooseMode(m)}
            className={cn(
              "relative min-h-12 rounded-pill px-3 text-[15px] font-semibold transition-colors duration-300",
              mode === m ? "text-white" : "text-ink",
            )}
          >
            {modes[m]}
          </button>
        ))}
      </div>

      <div className="relative mt-6 aspect-[400/380]">
        <LobeDiagram
          lobes={lobes.map((l) => ({ key: l.key, label: fill(labels.lobe, { lobe: l.name }) }))}
          removed={removed}
          preview={mode === "lobectomy" ? preview : null}
          groupLabel={labels.lobes}
          selected={mode === "lobectomy" ? lobe : null}
          onSelect={chooseLobe}
          onPreview={setPreview}
        />
      </div>

      <p className="mt-2 text-center font-display text-xl font-semibold text-ink">{caption}</p>
      <p className="mt-1 text-center text-base text-muted">{labels.hint}</p>
      <p aria-live="polite" className="sr-only">
        {status}
      </p>
    </div>
  );
}
