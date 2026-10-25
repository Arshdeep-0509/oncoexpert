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

const index = (i: number) => String(i + 1).padStart(2, "0");

/**
 * #journey, "The Path to Excellence": the four stages, Foundation → Founding.
 * Desktop: the section pins for ~2.5 screens of scroll (a tall box with a sticky stage, so
 * nothing else on the page moves). Left: the heading and a stepper of the four stages, its line
 * filling down with the scroll, the active stage's number scaled up. Right: a deck, the active
 * stage's card large in front; each next card flips up into place as its stage becomes active
 * and the earlier ones stay stacked behind it (ScrollVar writes --p and data-step; about.css
 * does the rest).
 * Phones and tablets: a vertical timeline with ScrollFillLine; the cards slide in from
 * alternating sides. Reduced motion: a static vertical list.
 */
export function Journey() {
  return (
    <section id="journey" aria-labelledby="journey-title" data-tone="alt" className="relative bg-surface-alt">
      <ScrollVar range="pin" steps={journey.stages.length} media={PINNED} className={styles.pin}>
        <div className={styles.pinStage}>
          <Container className="grid gap-12 py-(--section-y) lg:grid-cols-12 lg:items-center lg:gap-x-16">
            <div className="lg:col-span-5">
              <SectionHeading
                id="journey-title"
                title={journey.title}
                emphasis={journey.emphasis}
                intro={journey.intro}
              />

              {/* Stepper (pinned layout only; the cards carry the content) */}
              <div aria-hidden="true" className={cn(styles.stepper, "mt-10")}>
                <span className="absolute top-6 bottom-6 left-[21px] w-0.5 overflow-hidden rounded-full bg-line">
                  <span className={cn(styles.stepFill, "block h-full w-full bg-(image:--grad-accent)")} />
                </span>
                <ol className="grid gap-1.5">
                  {journey.stages.map((stage, i) => (
                    <li key={stage.stage} className={cn(styles.stepRow, "relative flex items-center gap-5 py-2.5")}>
                      <span
                        className={cn(
                          styles.stepNum,
                          "z-10 grid size-11 shrink-0 place-items-center rounded-full bg-surface font-display text-sm font-bold text-accent tabular-nums ring-1 shadow-soft-sm ring-line",
                        )}
                      >
                        {index(i)}
                      </span>
                      <span className={styles.stepText}>
                        <span className="block text-[11px] font-semibold tracking-[0.18em] text-accent uppercase">
                          {stage.stage}
                        </span>
                        <span className="mt-0.5 block font-display text-base font-bold text-ink">{stage.title}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <div className="relative lg:col-span-7">
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
                      {index(i)}
                    </span>
                    <InView className={cn(styles.slide, "h-full")} threshold={0.4}>
                      <article
                        className={cn(
                          styles.stageCard,
                          "relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface p-6 shadow-soft md:p-8 lg:justify-end lg:p-12 lg:shadow-soft-lg",
                        )}
                      >
                        {/* The stage's number, large and faint (decorative) */}
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute -top-3 right-5 font-display text-[5rem] leading-none font-bold tracking-[-0.05em] text-accent-soft tabular-nums md:text-[7rem] lg:-top-4 lg:right-8 lg:text-[11rem]"
                        >
                          {index(i)}
                        </span>
                        <p className="relative inline-flex self-start rounded-pill bg-accent-soft px-3 py-1 text-xs font-semibold tracking-[0.18em] text-accent uppercase">
                          {stage.stage}
                        </p>
                        <h3 className="relative mt-4 font-display text-xl leading-snug font-bold text-ink md:text-2xl lg:mt-5 lg:text-[2rem] lg:leading-tight">
                          {stage.title}
                        </h3>
                        <p className="relative mt-3 max-w-[48ch] text-[15px] leading-relaxed text-muted md:text-base lg:mt-4 lg:text-lg">
                          {stage.body}
                        </p>
                        {/* A thin logo-gradient rule along the bottom */}
                        <span
                          aria-hidden="true"
                          className="absolute inset-x-0 bottom-0 h-1 bg-(image:--grad-accent) opacity-80"
                        />
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
