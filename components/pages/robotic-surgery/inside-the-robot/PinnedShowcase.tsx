"use client";

import { motion, useTransform } from "motion/react";
import { insideTheRobot } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { useElementSize } from "@/lib/hooks/use-element-size";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { center, N, steps } from "@/components/pages/robotic-surgery/inside-the-robot/geometry";
import { useShowcaseProgress } from "@/components/pages/robotic-surgery/inside-the-robot/use-showcase-progress";
import { StageLayers } from "@/components/pages/robotic-surgery/inside-the-robot/StageLayers";

/** Desktop: sticky photo stage on the left (60%), the steps scrolling past on the right. */
export function PinnedShowcase() {
  const { trackRef, scrollYProgress, active } = useShowcaseProgress();
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [stageRef, stage] = useElementSize<HTMLDivElement>();

  return (
    <div ref={trackRef} className="relative grid grid-cols-[60%_40%]" style={{ height: `${N * 100}svh` }}>
      {/* Sticky stage */}
      <div className="relative">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div aria-hidden="true" className="absolute inset-0 precision-grid opacity-60" />
          {/* Stage = the area below the navbar, so machines are centred in what is visible. */}
          <div ref={stageRef} className="absolute inset-x-0 top-[72px] bottom-0">
            <StageLayers progress={scrollYProgress} stage={stage} sizes="(min-width: 1440px) 1500px, 110vw" />
          </div>

          <Eyebrow variant="classic" onDark className="absolute top-[104px] left-8 xl:left-12">
            {insideTheRobot.eyebrow}
          </Eyebrow>

          {/* Progress rail */}
          <div aria-hidden="true" className="absolute top-1/2 right-6 h-[44svh] w-px -translate-y-1/2 bg-white/15">
            <motion.div className="absolute inset-0 origin-top bg-glow" style={{ scaleY: railScale }} />
            {steps.map((s, i) => (
              <span
                key={s.number}
                className={cn(
                  "absolute left-1/2 size-2.5 -translate-1/2 rounded-full border transition-colors duration-500",
                  i <= active ? "border-glow bg-glow" : "border-white/30 bg-black",
                )}
                style={{ top: `${center(i) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol className="relative">
        {steps.map((s, i) => (
          <li
            key={s.number}
            aria-current={i === active ? "step" : undefined}
            className={cn(
              "relative flex h-svh items-center pr-8 pl-10 transition-opacity duration-700 xl:pr-16",
              i === active ? "opacity-100" : "opacity-35",
            )}
          >
            <div className="relative max-w-[30rem]">
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -top-[0.62em] -left-2 font-display text-[9rem] leading-none font-extrabold text-transparent tabular-nums transition-[-webkit-text-stroke-color] duration-700 select-none [-webkit-text-stroke-width:1px]",
                  i === active
                    ? "[-webkit-text-stroke-color:rgb(45_212_191/0.28)]"
                    : "[-webkit-text-stroke-color:rgb(255_255_255/0.1)]",
                )}
              >
                {s.number}
              </span>
              <p className="relative type-eyebrow text-glow tabular-nums">{s.number}</p>
              <h3 className="relative mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.02em] text-white">
                {s.title}
              </h3>
              <p className="relative mt-4 text-lg leading-relaxed text-white/65">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}
