"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { OverviewContent } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";

type CarePlan = OverviewContent["carePlan"];
type Panel = CarePlan["panels"][number];

/**
 * "Your care plan": the four treatments as photo tiles, two per row at every size. While a panel crosses the screen its
 * photo moves slower than the page (parallax) and its caption drifts the other way, so each one
 * feels like a window. Reduced motion: still photos.
 */
export function CarePlanParallax({ eyebrow, title, panels }: CarePlan) {
  return (
    <div className="mx-auto max-w-[960px]">
      <div className="mb-8 text-center md:mb-12">
        <p className="text-sm font-semibold tracking-[0.14em] text-accent uppercase">{eyebrow}</p>
        <h3 className="mt-3 font-display text-[1.75rem] leading-tight text-ink md:text-[2.25rem]">{title}</h3>
      </div>
      <ol className="grid grid-cols-2 gap-3 sm:gap-5 md:gap-6">
        {panels.map((panel, i) => (
          <ParallaxPanel key={panel.key} panel={panel} index={i} />
        ))}
      </ol>
    </div>
  );
}

function ParallaxPanel({ panel, index }: { panel: Panel; index: number }) {
  const ref = React.useRef<HTMLLIElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  // The photo is 30% taller than the panel, so it can travel ±15% without showing an edge.
  const photoY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  const captionY = useTransform(scrollYProgress, [0, 1], [0, -14]); // only upward, so the caption never slips past the bottom edge
  const img = breastImages[panel.image];

  return (
    <li
      ref={ref}
      className="relative isolate aspect-[3/4] overflow-hidden rounded-[18px] shadow-soft sm:aspect-[4/3] md:rounded-[24px]"
    >
      <motion.div style={{ y: reduce ? 0 : photoY }} className="absolute inset-x-0 -top-[15%] -bottom-[15%] -z-10">
        <Image
          src={img.src}
          alt={img.alt}
          fill
          sizes="(max-width: 960px) 50vw, 480px"
          className="object-cover"
          style={{ objectPosition: img.focal }}
        />
      </motion.div>
      {/* Legibility: dark at the bottom, where the caption sits. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_top,rgb(20_12_16/0.82),rgb(20_12_16/0.35)_45%,transparent_75%)]"
      />
      <motion.div
        style={{ y: reduce ? 0 : captionY }}
        className="absolute inset-x-0 bottom-0 p-3 text-white sm:p-5 md:p-7"
      >
        <span className="font-display text-[11px] tracking-[0.2em] text-white/70 tabular-nums md:text-sm">
          {String(index + 1).padStart(2, "0")}
        </span>
        <h4 className="mt-1 font-display text-[clamp(0.8125rem,4vw,1.125rem)] leading-tight break-words sm:text-[1.5rem] md:mt-2 md:text-[1.875rem]">
          {panel.label}
        </h4>
        <p className="mt-1.5 hidden max-w-[42ch] text-sm leading-snug text-white/85 md:mt-2 md:block md:text-base md:leading-relaxed">
          {panel.body}
        </p>
      </motion.div>
    </li>
  );
}
