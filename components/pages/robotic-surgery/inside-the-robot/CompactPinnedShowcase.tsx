"use client";

import { AnimatePresence, motion, useReducedMotion, useTransform } from "motion/react";
import { insideTheRobot } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { useElementSize } from "@/lib/hooks/use-element-size";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { center, N, steps } from "@/components/pages/robotic-surgery/inside-the-robot/geometry";
import { useShowcaseProgress } from "@/components/pages/robotic-surgery/inside-the-robot/use-showcase-progress";
import { StageLayers } from "@/components/pages/robotic-surgery/inside-the-robot/StageLayers";

/**
 * Phones and tablets: the same scroll-driven tour, stacked. The sticky viewport
 * holds the photo stage on top (zoom + crossfades) and the active step's text below.
 */
export function CompactPinnedShowcase() {
  const { trackRef, scrollYProgress, active } = useShowcaseProgress();
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const reduce = useReducedMotion();
  const step = steps[active];
  const [stageRef, stage] = useElementSize<HTMLDivElement>();

  // Tapping a dot scrolls to that step's position in the track.
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * center(i), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={trackRef} className="relative" style={{ height: `${N * 90}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-[76px] pb-6">
        {/* Stage */}
        <div ref={stageRef} className="relative min-h-0 flex-1">
          <div aria-hidden="true" className="absolute inset-0 precision-grid opacity-60" />
          <StageLayers progress={scrollYProgress} stage={stage} sizes="(min-width: 768px) 200vw, 260vw" />
          <Eyebrow variant="classic" onDark className="absolute top-3 left-5 md:left-8">
            {insideTheRobot.eyebrow}
          </Eyebrow>
        </div>

        <Container className="shrink-0">
          {/* Progress rail with tappable step dots */}
          <div className="relative mt-3 flex items-center justify-between">
            <div aria-hidden="true" className="absolute inset-x-[22px] top-1/2 h-px -translate-y-1/2 bg-white/15">
              <motion.div className="absolute inset-0 origin-left bg-glow" style={{ scaleX: railScale }} />
            </div>
            {steps.map((s, i) => (
              <button
                key={s.number}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${s.number} ${s.title}`}
                aria-current={i === active ? "step" : undefined}
                className="relative grid size-11 place-items-center"
              >
                <span
                  className={cn(
                    "size-2.5 rounded-full border transition-colors duration-500",
                    i <= active ? "border-glow bg-glow" : "border-white/30 bg-black",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Active step */}
          <div className="relative mt-3 min-h-[188px] md:min-h-[170px]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.number}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 right-0 font-display text-[5.5rem] leading-none font-extrabold text-transparent tabular-nums select-none [-webkit-text-stroke:1px_rgb(45_212_191/0.25)] md:text-[7rem]"
                >
                  {step.number}
                </span>
                <p className="relative type-eyebrow text-glow tabular-nums">{step.number}</p>
                <h3 className="relative mt-2 font-display text-[clamp(1.5rem,5vw,2rem)] leading-[1.15] font-bold tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
                <p className="relative mt-2 max-w-[44ch] leading-relaxed text-white/65">{step.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </div>
  );
}
