import type * as React from "react";
import { quote } from "@/content/pages/about-us";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { styles } from "@/components/pages/about-us/about-styles";
import "@/components/pages/about-us/about.css";

/** Seconds between words, and the first word's delay (about.css: 0.35s + --i × 0.06s). */
const FIRST = 0.35;
const GAP = 0.06;
/** "Treating Patients, Not Just Cancer…": the opening phrase, set in the accent. */
const LEAD_WORDS = 5;

/**
 * #quote: "Treating Patients, Not Just Cancer…" in very large display type on the soft hero
 * gradient. As it enters the screen an oversized quote mark draws itself, the words fade in one
 * by one, then the attribution. Reduced motion: all shown at once.
 */
export function QuoteSection() {
  const words = quote.text.split(" ");
  const after = FIRST + words.length * GAP + 0.3;
  return (
    <section
      id="quote"
      aria-label={quote.attribution}
      className="relative overflow-hidden bg-surface bg-(image:--grad-hero)"
    >
      <Container className="py-(--section-y)">
        <InView threshold={0.35} className="relative mx-auto max-w-[62rem]">
          <svg
            aria-hidden="true"
            viewBox="0 0 100 64"
            className={cn(styles.qmark, "mb-4 h-16 w-auto text-accent md:mb-6 md:h-24")}
            fill="none"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path
              pathLength={1}
              d="M40 6 C22 12 8 26 8 42 C8 53 15 60 24 60 C32 60 38 54 38 46 C38 38 32 32 24 32 C20 32 17 33 14 35"
            />
            <path
              pathLength={1}
              d="M90 6 C72 12 58 26 58 42 C58 53 65 60 74 60 C82 60 88 54 88 46 C88 38 82 32 74 32 C70 32 67 33 64 35"
            />
            {/* The balls of the two marks, filled once the strokes are drawn */}
            <circle cx="23.5" cy="46" r="13" fill="currentColor" stroke="none" />
            <circle cx="73.5" cy="46" r="13" fill="currentColor" stroke="none" />
          </svg>
          <figure>
            <blockquote>
              <p className="font-display text-[clamp(1.9rem,5.2vw,4.25rem)] leading-[1.1] font-bold tracking-[-0.03em] text-ink">
                {words.map((word, i) => (
                  <span key={i}>
                    {i > 0 ? " " : null}
                    <span
                      className={cn(styles.qword, i < LEAD_WORDS && "text-accent")}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {word}
                    </span>
                  </span>
                ))}
              </p>
            </blockquote>
            <figcaption
              className={cn(
                styles.attribution,
                "mt-8 flex items-center gap-3 text-sm font-semibold tracking-[0.2em] text-muted md:mt-10",
              )}
              style={{ "--after": `${after.toFixed(2)}s` } as React.CSSProperties}
            >
              <span aria-hidden="true" className="h-px w-10 bg-highlight" />
              {quote.attribution}
            </figcaption>
          </figure>
        </InView>
      </Container>
    </section>
  );
}
