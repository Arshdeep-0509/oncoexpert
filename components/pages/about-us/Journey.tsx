import { journey } from "@/content/pages/about-us";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ScrollFillLine } from "@/components/ui/ScrollFillLine";
import { ScrollVar } from "@/components/ui/ScrollVar";
import { InView } from "@/components/ui/InView";
import { styles } from "@/components/pages/about-us/about-styles";
import "@/components/pages/about-us/about.css";

/** The layout that pins (about.css uses the same query). */
const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";

/**
 * #journey, "The Path to Excellence": the four stages, Foundation → Founding.
 * Desktop: the section pins for ~2.5 screens of scroll (a tall box with a sticky stage, so
 * nothing else on the page moves); the line fills with the scroll, each stage's card flips up
 * as its stage becomes active (and stays up), and the active stage's number scales up
 * (ScrollVar writes --p and data-step; about.css does the rest).
 * Phones and tablets: a vertical timeline with ScrollFillLine; the cards slide in from
 * alternating sides. Reduced motion: a static vertical list.
 */
export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" data-tone="alt" className="relative bg-surface-alt">
      <ScrollVar range="pin" steps={journey.stages.length} media={PINNED} className={styles.pin}>
        <div className={styles.pinStage}>
          <Container className="py-(--section-y)">
            <SectionHeading
              id="journey-title"
              title={journey.title}
              emphasis={journey.emphasis}
              intro={journey.intro}
            />

            <div className="relative mt-12 md:mt-16">
              {/* Horizontal line through the numbers (pinned layout): base + scroll fill */}
              <div
                aria-hidden="true"
                className={cn(styles.hLine, "absolute top-6 right-0 left-6 h-0.5 overflow-hidden rounded-full bg-line")}
              >
                <div className={cn(styles.hLineFill, "h-full w-full bg-(image:--grad-accent)")} />
              </div>
              {/* Vertical line (phones, tablets, reduced motion) */}
              <ScrollFillLine className={cn(styles.vLine, "absolute top-6 bottom-6 left-[23px]")} />

              <ol className={styles.stages}>
                {journey.stages.map((stage, i) => (
                  <li key={stage.stage} className={cn(styles.stage, "relative")}>
                    <span
                      aria-hidden="true"
                      className={cn(
                        styles.num,
                        "z-10 grid size-12 place-items-center rounded-full bg-surface font-display text-base font-bold text-accent tabular-nums ring-1 shadow-soft-sm ring-line",
                      )}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <InView className={styles.slide} threshold={0.4}>
                      <article
                        className={cn(
                          styles.stageCard,
                          "rounded-xl border border-line bg-surface p-6 shadow-soft md:p-7 lg:min-h-[260px]",
                        )}
                      >
                        <p className="text-xs font-semibold tracking-[0.18em] text-accent uppercase">{stage.stage}</p>
                        <h3 className="mt-3 heading-3 text-ink">{stage.title}</h3>
                        <p className="mt-3 text-[15px] leading-relaxed text-muted">{stage.body}</p>
                      </article>
                    </InView>
                  </li>
                ))}
              </ol>
            </div>
          </Container>
        </div>
      </ScrollVar>
    </section>
  );
}
