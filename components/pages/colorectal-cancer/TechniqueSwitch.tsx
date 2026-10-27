"use client";

import * as React from "react";
import Image from "next/image";
import type { TechniquesContent } from "@/content/pages/colorectal-cancer";
import { cn } from "@/lib/utils";
import { TechniqueDetails } from "@/components/pages/colorectal-cancer/TechniqueDetails";
import { styles } from "@/components/pages/colorectal-cancer/techniques-styles";

type Key = "robotic" | "laparoscopic";
const KEYS: readonly Key[] = ["robotic", "laparoscopic"];

type TechniqueSwitchProps = {
  content: Pick<TechniquesContent, "robotic" | "laparoscopic" | "idealForLabel" | "link" | "a11y">;
  images: Record<Key, { src: string; alt: string; focal: string }>;
};

/**
 * Phones and tablets: a segmented Robotic | Laparoscopic switch (ARIA tabs: arrow keys, Home /
 * End, roving tab stop) and one panel that morphs between them. The photo and the big letter
 * crossfade; the details are keyed by the selection, so they re-enter (techniques.css).
 */
export function TechniqueSwitch({ content, images }: TechniqueSwitchProps) {
  const [selected, setSelected] = React.useState<Key>("robotic");
  const tabs = React.useRef<Record<Key, HTMLButtonElement | null>>({ robotic: null, laparoscopic: null });
  const id = React.useId();

  const onKeyDown = (e: React.KeyboardEvent) => {
    const i = KEYS.indexOf(selected);
    const next =
      e.key === "ArrowRight"
        ? KEYS[(i + 1) % 2]
        : e.key === "ArrowLeft"
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

  const technique = content[selected];

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
            <span className={styles.tabBase}>{content[key].title}</span>
            <span aria-hidden="true" className={styles.tabOn}>
              {content[key].title}
            </span>
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${selected}`}
        className="mt-6 overflow-hidden rounded-xl border border-line bg-surface shadow-soft md:grid md:grid-cols-[42%_1fr]"
      >
        {/* Photo + letter: both techniques stacked, the selected one shown */}
        <div className="relative aspect-[16/9] overflow-hidden bg-ink md:aspect-auto md:min-h-full">
          {KEYS.map((key) => (
            <div
              key={key}
              data-active={selected === key ? "" : undefined}
              className={cn(styles.layer, "absolute inset-0")}
            >
              <Image
                src={images[key].src}
                alt={selected === key ? images[key].alt : ""}
                fill
                sizes="(min-width: 768px) 300px, 100vw"
                className="object-cover"
                style={{ objectPosition: images[key].focal }}
              />
              <span
                aria-hidden="true"
                className="absolute right-4 bottom-1 font-display text-[5.5rem] leading-none font-semibold text-white/70"
              >
                {content[key].letter}
              </span>
            </div>
          ))}
        </div>
        <div key={selected} className="flex flex-col p-6 md:p-8">
          <TechniqueDetails
            technique={technique}
            idealForLabel={content.idealForLabel}
            link={selected === "robotic" ? content.link : undefined}
            animate
          />
        </div>
      </div>
    </div>
  );
}
