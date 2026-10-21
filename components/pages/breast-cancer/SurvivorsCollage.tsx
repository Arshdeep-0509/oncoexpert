"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { MEDIA, useMedia } from "@/lib/hooks/use-media";

type CollageImage = { src: string; alt: string; focal: string };

/**
 * survivors-group in a tall arch + joy-flowers in a circle overlapping its lower-left edge,
 * both with a soft accent-glow ring. Desktop: the two drift 20px apart as the section
 * scrolls (opposite directions). Phones / reduced motion: still.
 */
export function SurvivorsCollage({ main, secondary }: { main: CollageImage; secondary: CollageImage }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const desktop = useMedia(MEDIA.lg);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [-10, 10]);
  const ySecondary = useTransform(scrollYProgress, [0, 1], [10, -10]);
  const move = desktop && !reduce;

  return (
    <div ref={ref} className="relative mx-auto w-[78vw] max-w-[440px] pb-[14%] pl-[12%] lg:w-full">
      {/* Main: tall arch */}
      <motion.div style={{ y: move ? yMain : 0 }} className="relative">
        <div
          aria-hidden="true"
          className="absolute -inset-4 -z-10 rounded-[999px_999px_40px_40px] bg-accent-glow/25 blur-2xl"
        />
        <div className="relative aspect-[3/4] overflow-hidden rounded-[999px_999px_32px_32px] ring-[6px] ring-accent-glow/35">
          <Image
            src={main.src}
            alt={main.alt}
            fill
            sizes="(max-width: 1023px) 70vw, 400px"
            className="object-cover"
            style={{ objectPosition: main.focal }}
          />
        </div>
      </motion.div>

      {/* Secondary: circle over the arch's lower-left edge */}
      <motion.div style={{ y: move ? ySecondary : 0 }} className="absolute bottom-0 left-0 w-[46%]">
        <div className="relative aspect-square overflow-hidden rounded-full ring-[6px] shadow-soft-lg ring-accent-glow/50">
          <Image
            src={secondary.src}
            alt={secondary.alt}
            fill
            sizes="(max-width: 1023px) 36vw, 200px"
            className="object-cover"
            style={{ objectPosition: secondary.focal }}
          />
        </div>
      </motion.div>
    </div>
  );
}
