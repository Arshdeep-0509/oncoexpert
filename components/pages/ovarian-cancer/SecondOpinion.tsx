import type * as React from "react";
import { secondOpinion } from "@/content/pages/ovarian-cancer";
import { Container } from "@/components/ui/Container";
import { InView } from "@/components/ui/InView";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import "@/components/pages/ovarian-cancer/second-opinion.css";

/**
 * 7 · #second-opinion: a teal band (accent-hover → accent, white text ≥ 5.4:1). Once in view the
 * live question rises word by word, then its question mark dissolves into a check (once). An
 * onDark "Second Opinion" button opens the booking page.
 */
export function SecondOpinion() {
  const title = secondOpinion.title;
  const mark = title.endsWith("?") ? "?" : "";
  const words = (mark ? title.slice(0, -1) : title).split(" ");
  return (
    <section
      id="second-opinion"
      aria-labelledby="second-opinion-title"
      className="on-dark relative isolate overflow-hidden bg-accent bg-[linear-gradient(120deg,var(--accent-hover),var(--accent))] py-(--section-y) text-white"
    >
      <Container className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
        <InView threshold={0.6} className="ovs-q">
          <h2 id="second-opinion-title" className="heading-2 text-white">
            {words.map((w, i) => (
              <span key={i} className="ovs-mask">
                <span className="ovs-word" style={{ "--i": i } as React.CSSProperties}>
                  {w}
                  {i === words.length - 1 && mark ? (
                    <span className="ovs-markWrap">
                      <span className="ovs-mark">{mark}</span>
                      <svg aria-hidden="true" viewBox="0 0 24 24" className="ovs-check">
                        <path
                          d="M5 12.5l4.5 4.5L19 7.5"
                          pathLength={1}
                          fill="none"
                          style={{ stroke: "var(--accent-glow)" }}
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  ) : null}
                </span>
                {i < words.length - 1 ? " " : null}
              </span>
            ))}
          </h2>
          <p className="mt-4 measure text-lg text-white/85 md:text-xl">{secondOpinion.body}</p>
        </InView>
        <AppointmentButton {...secondOpinion.cta} variant="onDark" arrow fullWidthOnMobile className="shrink-0" />
      </Container>
    </section>
  );
}
