"use client";

import Image from "next/image";
import { motion, useIsPresent, useMotionValue, useMotionValueEvent, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { bleedFade } from "@/lib/image-fade";
import {
  CROSSFADE_SECONDS,
  IMAGE_SIZES,
  KEN_BURNS_SCALE,
  photoBox,
  type Slide,
} from "@/components/pages/robotic-surgery/hero-slider/stage";

/**
 * One photo in the hero stage. The stage box is the same size for every slide; all photos
 * are black-background shots, so they sit directly on the black hero.
 */
export function SlideLayer({
  slide,
  index,
  progress,
  reduce,
}: {
  slide: Slide;
  index: number;
  progress: MotionValue<number>;
  reduce: boolean;
}) {
  const isPresent = useIsPresent();
  const scale = useMotionValue(1);

  // Ken Burns: 1.0 → 1.07 across the slide's 6s; frozen once the slide starts leaving.
  useMotionValueEvent(progress, "change", (v) => {
    if (isPresent && !reduce) scale.set(1 + KEN_BURNS_SCALE * v);
  });

  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: reduce ? 0 : CROSSFADE_SECONDS, ease: [0.4, 0, 0.2, 1] }}
    >
      <motion.div className="absolute inset-0 will-change-transform" style={{ scale }}>
        <div className="absolute" style={{ ...photoBox(slide), ...bleedFade(slide) }}>
          <Image
            src={slide.src}
            alt={slide.alt}
            fill
            sizes={IMAGE_SIZES}
            preload={index === 0}
            fetchPriority={index === 0 ? "high" : "auto"}
            loading={index === 0 ? "eager" : undefined}
            className={cn("select-none", slide.subject ? "object-fill" : "object-cover")}
            draggable={false}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
