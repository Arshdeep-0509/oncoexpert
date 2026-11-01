import type * as React from "react";
import { understanding } from "@/content/pages/ovarian-cancer";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { ScrollVar } from "@/components/ui/ScrollVar";
import "@/components/pages/ovarian-cancer/understanding.css";

/** The pinned layout (understanding.css uses the same query). */
const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const LINKED = "(max-width: 1023px) and (prefers-reduced-motion: no-preference)";

const FLAT = "M0 40 C 150 40, 300 40, 450 40 S 750 40, 900 40";
const WAVE = "M0 40 C 150 10, 300 70, 450 40 S 750 10, 900 40";

/**
 * 3 · #understanding "the silent killer". Desktop: the section pins for 1.6 screens; each word of
 * the big live sentence brightens from 0.12 to 1 as the scroll passes its threshold (CSS: --p from
 * ScrollVar against each word's --i; React never re-renders). "silent killer" ends in the gradient.
 * Then the second sentence rises and a flat line becomes a gentle wave (two paths crossfading).
 * Phones and tablets: the same, linked to the section's pass through the screen, no pin. Reduced
 * motion: all visible. Screen readers get the paragraph once (the animated words are hidden).
 */
export function Understanding() {
  const words = understanding.lead.split(" ");
  const isEmphasis = (w: string) => understanding.emphasis.some((e) => w.includes(e));
  return (
    <section id="understanding" aria-labelledby="understanding-title" className="relative bg-surface-alt">
      <ScrollVar range="pin" media={PINNED} className="ovu-pin">
        <div className="ovu-stage">
          <ScrollVar range="view" media={LINKED} className="ovu-linked">
            <Container className="py-(--section-y)">
              <h2 id="understanding-title" className="text-sm font-bold tracking-[0.14em] text-accent uppercase">
                {understanding.title}
              </h2>
              <p className="sr-only">
                {understanding.lead} {understanding.rest}
              </p>
              <p
                aria-hidden="true"
                className="mt-6 max-w-[22ch] font-display text-[clamp(2rem,8vw,2.6rem)] leading-[1.12] tracking-(--display-tracking) text-ink md:max-w-[24ch] md:text-[3.25rem] lg:text-[4.25rem]"
                style={{ "--n": words.length } as React.CSSProperties}
              >
                {words.map((w, i) => (
                  <span key={i}>
                    {i > 0 ? " " : null}
                    <span
                      className={cn("ovu-word", isEmphasis(w) && "ovu-grad")}
                      style={{ "--i": i } as React.CSSProperties}
                    >
                      {w}
                    </span>
                  </span>
                ))}
              </p>
              <p aria-hidden="true" className="ovu-rest mt-8 measure text-lg leading-relaxed text-text md:text-xl">
                {understanding.rest}
              </p>
              <svg
                aria-hidden="true"
                viewBox="0 0 900 80"
                preserveAspectRatio="none"
                className="mt-10 h-14 w-full md:h-20"
              >
                <path
                  d={FLAT}
                  fill="none"
                  style={{ stroke: "var(--accent)" }}
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="ovu-flat"
                />
                <path
                  d={WAVE}
                  fill="none"
                  style={{ stroke: "var(--accent)" }}
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="ovu-wave"
                />
              </svg>
            </Container>
          </ScrollVar>
        </div>
      </ScrollVar>
    </section>
  );
}
