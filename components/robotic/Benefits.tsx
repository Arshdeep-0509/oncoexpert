"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { benefits } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { Section } from "@/components/robotic/ui/section";
import { SectionHeading } from "@/components/robotic/ui/section-heading";
import { Reveal, EASE_OUT_EXPO } from "@/components/robotic/ui/reveal";
import { ContentIconView } from "@/components/robotic/icons";

export function Benefits() {
  const reduce = useReducedMotion();
  const view = { once: true, amount: 0.35 } as const;
  const img = benefits.image;

  return (
    <Section id="benefits" tone="white" className="overflow-hidden">
      {/* Tablet and desktop: the robot, faint, at the side (white photo on #FFF, multiply) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 -right-64 -z-10 hidden aspect-[1717/2576] h-[115%] -translate-y-1/2 opacity-[0.06] md:block lg:opacity-[0.07]"
      >
        <Image src={img.src} alt="" fill sizes="520px" className="blend-on-light object-contain" />
      </div>

      <Reveal>
        <SectionHeading title={benefits.heading} />
      </Reveal>

      <ol className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
        {benefits.items.map((item, i) => {
          const delay = i * 0.08;
          return (
            <motion.li
              key={item.title}
              className={cn(
                "relative py-9",
                i % 2 === 0 ? "sm:pr-8" : "sm:px-8",
                i % 3 === 0 ? "lg:pr-10 lg:pl-0" : "lg:px-10",
              )}
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={view}
              transition={{ duration: 0.7, ease: EASE_OUT_EXPO, delay }}
            >
              {/* Dividers draw in: a top rule on every item, a left rule between columns */}
              <motion.span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-px origin-left bg-border"
                initial={reduce ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={view}
                transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: delay + 0.1 }}
              />
              <motion.span
                aria-hidden="true"
                className={cn(
                  "absolute inset-y-6 left-0 hidden w-px origin-top bg-border",
                  i % 2 !== 0 && "sm:block",
                  i % 3 !== 0 ? "lg:block" : "lg:hidden",
                )}
                initial={reduce ? false : { scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={view}
                transition={{ duration: 1, ease: EASE_OUT_EXPO, delay: delay + 0.2 }}
              />

              <div className="flex items-center justify-between">
                <ContentIconView name={item.icon} className="size-7 text-primary" />
                <span aria-hidden="true" className="text-xs font-semibold tracking-[0.2em] text-muted/70 tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="type-h3 mt-6 text-ink">{item.title}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.body}</p>
            </motion.li>
          );
        })}
      </ol>
    </Section>
  );
}
