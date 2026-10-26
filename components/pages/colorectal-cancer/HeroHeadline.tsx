import type * as React from "react";
import { breadcrumb, hero } from "@/content/pages/colorectal-cancer";
import { cn } from "@/lib/utils";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { at, styles } from "@/components/pages/colorectal-cancer/hero-styles";

const FIRST_WORD = 0.25;
const WORD_GAP = 0.06;

/** Colour at `t` (0–1) along the accent gradient: awareness blue → teal. */
const gradientAt = (t: number) => `color-mix(in oklab, var(--accent-bright) ${Math.round(t * 100)}%, var(--accent))`;

/** One word in its mask; it rises at its turn. Emphasis words carry their slice of the gradient. */
function Word({ word, index, slice }: { word: string; index: number; slice?: { from: number; to: number } }) {
  return (
    <span className={styles.wordMask}>
      <span
        className={cn(styles.word, styles.step, styles.wordRise, slice && styles.gradWord)}
        style={
          {
            "--d": `${(FIRST_WORD + index * WORD_GAP).toFixed(2)}s`,
            ...(slice ? { "--from": gradientAt(slice.from), "--to": gradientAt(slice.to) } : {}),
          } as React.CSSProperties
        }
      >
        {word}
      </span>
    </span>
  );
}

/**
 * Breadcrumb (from md), eyebrow and the H1. Each word rises inside its own mask, 0.06s apart, in
 * reading order. The emphasis phrase ("Organ Preservation") stays on one line, painted with the
 * blue → teal gradient (each word its slice), and its underline draws once the words have landed.
 */
export function HeroHeadline() {
  const words = hero.title.split(" ");
  const emphasis = hero.emphasis.split(" ");
  const from = words.findIndex((_, i) => emphasis.every((w, j) => words[i + j] === w));
  const before = from >= 0 ? words.slice(0, from) : words;
  const after = from >= 0 ? words.slice(from + emphasis.length) : [];

  // Each emphasis word's share of the phrase, by characters (spaces count), for its gradient slice.
  const length = hero.emphasis.length;
  const slices = emphasis.map((w, j) => {
    const start = j === 0 ? 0 : emphasis.slice(0, j).join(" ").length + 1;
    return { from: start / length, to: (start + w.length) / length };
  });

  return (
    <>
      <div className={cn(styles.step, styles.fadeDown)} style={at(0.05)}>
        <Breadcrumb label={breadcrumb.label} items={breadcrumb.items} className="mb-5 max-md:sr-only" />
        <p className="inline-flex min-h-8 items-center gap-2 rounded-pill bg-accent-soft px-3.5 py-1.5 text-xs leading-tight font-semibold tracking-[0.14em] text-accent uppercase">
          <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-highlight" />
          {hero.eyebrow}
        </p>
      </div>

      <h1
        id="hero-title"
        className="mt-4 font-display text-[clamp(1.95rem,8.4vw,2.45rem)] leading-[1.08] tracking-(--display-tracking) text-balance text-ink md:mt-6 md:text-[3.15rem] lg:text-[clamp(2.6rem,3.7vw,3.5rem)]"
      >
        {before.map((word, i) => (
          <span key={i}>
            {i > 0 ? " " : null}
            <Word word={word} index={i} />
          </span>
        ))}
        {from >= 0 ? (
          <>
            {" "}
            <span className={styles.phrase}>
              {emphasis.map((word, j) => (
                <span key={j}>
                  {j > 0 ? " " : null}
                  <Word word={word} index={from + j} slice={slices[j]} />
                </span>
              ))}
              <svg aria-hidden="true" viewBox="0 0 300 20" preserveAspectRatio="none" className={styles.underline}>
                <path
                  d="M4 13 C 60 6, 128 4, 188 8 S 268 15, 296 7"
                  pathLength={1}
                  fill="none"
                  style={{ stroke: "var(--highlight)" }}
                  strokeOpacity={0.7}
                  strokeWidth={5}
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </>
        ) : null}
        {after.map((word, i) => (
          <span key={i}>
            {" "}
            <Word word={word} index={from + emphasis.length + i} />
          </span>
        ))}
      </h1>
    </>
  );
}
