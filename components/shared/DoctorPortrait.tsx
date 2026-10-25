"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { portraitMaskStyle } from "@/lib/portrait";

type DoctorPortraitProps = {
  image: { src: string; alt: string };
  /** Colour of the soft glow behind the arch, e.g. "bg-accent-glow/40". */
  glowClassName: string;
  /** Width constraints of the frame, e.g. "max-w-[420px]". */
  className?: string;
  sizes?: string;
};

/**
 * Dr. Sunil's portrait in a tall arch, used by every page's doctor section.
 * The frame is filled with the photo's own studio backdrop so the photo can sit zoomed-out
 * inside the arch (head clear of the curve, edges fading invisibly), and it drifts ~40px
 * inside the arch as the section scrolls past (no parallax with reduced motion).
 */
export function DoctorPortrait({
  image,
  glowClassName,
  className,
  sizes = "(min-width: 480px) 400px, 92vw",
}: DoctorPortraitProps) {
  const reduce = useReducedMotion();
  const frameRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-20, 20]);

  return (
    <div ref={frameRef} className={cn("relative mx-auto w-full max-w-[420px]", className)}>
      {/* Soft glow behind the frame */}
      <div
        aria-hidden="true"
        className={cn(
          "absolute inset-x-6 top-16 -bottom-6 -z-10 rounded-[200px_200px_24px_24px] blur-[60px]",
          glowClassName,
        )}
      />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[200px_200px_24px_24px] border border-white bg-(image:--portrait-backdrop) shadow-[0_30px_60px_-30px_rgb(var(--shadow-rgb)/0.45)]">
        <motion.div className="absolute inset-x-[4%] top-[14%] -bottom-6" style={{ y: reduce ? 0 : y }}>
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes={sizes}
            className="object-contain object-bottom"
            style={portraitMaskStyle}
          />
        </motion.div>
      </div>
    </div>
  );
}
