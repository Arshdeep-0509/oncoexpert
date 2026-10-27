"use client";

import * as React from "react";
import type { PrecisionContent } from "@/content/pages/endometrial-cancer";
import { cn } from "@/lib/utils";
import { PrecisionDetails } from "@/components/pages/endometrial-cancer/PrecisionDetails";
import { styles } from "@/components/pages/endometrial-cancer/precision-styles";

type Key = "robotic" | "laparoscopic";
const KEYS: readonly Key[] = ["robotic", "laparoscopic"];

type PrecisionSwitchProps = {
  content: Pick<PrecisionContent, "robotic" | "laparoscopic" | "tabs" | "a11y">;
  images: Record<Key, { src: string; focal: string }>;
};

/**
 * Phones and tablets: the live page's two switches ("Robotic Expertise" | "Minimally Invasive") as
 * ARIA tabs (arrow keys, Home / End, roving tab stop) over one panel whose details re-enter on each
 * change. The robotic panel is the dark one, its lens zooming slowly.
 */
export function PrecisionSwitch({ content, images }: PrecisionSwitchProps) {
  const [selected, setSelected] = React.useState<Key>("robotic");
  const tabs = React.useRef<Record<Key, HTMLButtonElement | null>>({ robotic: null, laparoscopic: null });
  const id = React.useId();

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = KEYS.indexOf(selected);
    const next =
      e.key === "ArrowRight" || e.key === "ArrowLeft"
        ? KEYS[(i + 1) % 2]
        : e.key === "Home"
          ? KEYS[0]
          : e.key === "End"
            ? KEYS[1]
            : null;
    if (!next) return;
    e.preventDefault();
    setSelected(next);
    tabs.current[next]?.focus();
  };

  const robotic = selected === "robotic";

  return (
    <div>
      <div
        role="tablist"
        aria-label={content.a11y.tabs}
        data-selected={selected}
        onKeyDown={onKeyDown}
        className={cn(
          styles.tabs,
          "relative mx-auto grid max-w-md grid-cols-2 rounded-pill bg-surface p-1.5 ring-1 shadow-soft-sm ring-line",
        )}
      >
        <span
          aria-hidden="true"
          className={cn(
            styles.thumb,
            "absolute inset-y-1.5 left-1.5 w-[calc(50%-6px)] rounded-pill bg-(image:--grad-accent) shadow-(--accent-shadow)",
          )}
        />
        {KEYS.map((key) => (
          <button
            key={key}
            ref={(el) => {
              tabs.current[key] = el;
            }}
            type="button"
            role="tab"
            id={`${id}-tab-${key}`}
            aria-selected={selected === key}
            aria-controls={`${id}-panel`}
            tabIndex={selected === key ? 0 : -1}
            onClick={() => setSelected(key)}
            className={cn(
              styles.tab,
              "relative min-h-12 rounded-pill px-3 text-[15px] leading-tight font-semibold text-ink",
            )}
          >
            <span className={styles.tabBase}>{content.tabs[key]}</span>
            <span aria-hidden="true" className={styles.tabOn}>
              {content.tabs[key]}
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${selected}`}
        className={cn(
          styles.panel,
          "mt-6 rounded-xl p-6 shadow-soft md:p-8",
          robotic ? "bg-ink" : "border border-line bg-surface",
        )}
      >
        <div key={selected}>
          <PrecisionDetails
            approach={content[selected]}
            image={images[selected]}
            zoom={robotic}
            onDark={robotic}
            animate
          />
        </div>
      </div>
    </div>
  );
}
