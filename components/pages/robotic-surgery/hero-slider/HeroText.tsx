"use client";

import * as React from "react";
import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { EASE_OUT_EXPO } from "@/lib/motion";
import { introRemainingSeconds } from "@/lib/intro";
import { AppointmentButton } from "@/components/shared/AppointmentButton";
import { pillLook } from "@/components/pages/robotic-surgery/pills";
import { contentIcons } from "@/components/pages/robotic-surgery/content-icons";

const textItem = (delay: number, reduce: boolean) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
      };

/**
 * The hero's text column: headline words rise in one after another (the accent word in a
 * white → glow gradient), then the subtitle, highlights and buttons, after the intro.
 * Tablet: headline left, highlights right; desktop: one column beside the stage.
 */
export function HeroText() {
  const reduce = !!useReducedMotion();
  // While the intro preloader plays, hold the entrance animations.
  const [intro] = React.useState(introRemainingSeconds);

  const [accentWord, ...restWords] = hero.title.startsWith(hero.titleAccent)
    ? [hero.titleAccent, ...hero.title.slice(hero.titleAccent.length).trim().split(" ")]
    : ["", ...hero.title.split(" ")];
  const words = [accentWord, ...restWords].filter(Boolean);

  return (
    <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:block">
      <h1 id="hero-title" className="type-h1 text-white md:col-start-1">
        {words.map((word, i) => (
          <React.Fragment key={`${word}-${i}`}>
            <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
              <motion.span
                className={cn(
                  "inline-block",
                  i === 0 && accentWord && "bg-linear-to-r from-white from-20% to-glow bg-clip-text text-transparent",
                )}
                initial={reduce ? false : { y: "100%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: intro + 0.15 + i * 0.08 }}
              >
                {word}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : null}
          </React.Fragment>
        ))}
      </h1>

      <motion.p
        className="mt-5 max-w-[30ch] text-[1.25rem] leading-relaxed text-white/70 md:col-start-1"
        {...textItem(intro + 0.55, reduce)}
      >
        {hero.subtitle}
      </motion.p>

      <ul className="mt-8 grid grid-cols-2 gap-3 md:col-start-2 md:row-span-2 md:row-start-1 md:mt-2 lg:mt-8">
        {hero.highlights.map((h, i) => {
          const Icon = contentIcons[h.icon];
          return (
            <motion.li
              key={h.label}
              {...textItem(intro + 0.75 + i * 0.1, reduce)}
              className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-[15px] leading-snug font-medium text-white/90 backdrop-blur-md"
            >
              <Icon className="size-[18px] shrink-0 text-glow" strokeWidth={1.75} aria-hidden="true" />
              {h.label}
            </motion.li>
          );
        })}
      </ul>

      <motion.div className="mt-9 flex flex-wrap gap-3 md:col-span-2 lg:col-span-1" {...textItem(intro + 1.25, reduce)}>
        <AppointmentButton {...hero.ctas.primary} look={pillLook.glow} arrow />
        <AppointmentButton {...hero.ctas.secondary} look={pillLook.ghostDark} />
      </motion.div>
    </div>
  );
}
