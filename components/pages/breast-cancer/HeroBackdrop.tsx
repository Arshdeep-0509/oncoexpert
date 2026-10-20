"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";
import { MEDIA, useMedia } from "@/lib/use-media";
import { styles } from "./hero-styles";

/**
 * Three large soft blobs (blush, peach, petal) drifting on 22–30s loops (transform only),
 * plus a 3% grain. On desktop the blobs fade out as the hero scrolls away.
 */
export function HeroBackdrop() {
  const desktop = useMedia(MEDIA.lg);
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const fade = useTransform(scrollY, [0, 700], [1, 0], { clamp: true });

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
      <motion.div
        style={{ opacity: desktop && !reduce ? fade : 1 }}
        className={cn("absolute inset-0", styles.step, styles.fadeIn)}
      >
        {/* Soft blobs as radial gradients (not filter: blur): same look, far cheaper to paint. */}
        <div className={cn(styles.blob, styles.drift1, "-top-[18%] -right-[12%] size-[80vw] max-h-[860px] max-w-[860px] bg-[radial-gradient(closest-side,var(--petal),transparent)] opacity-70")} />
        <div className={cn(styles.blob, styles.drift2, "-bottom-[20%] -left-[16%] size-[74vw] max-h-[780px] max-w-[780px] bg-[radial-gradient(closest-side,var(--surface-warm),transparent)] opacity-95")} />
        <div className={cn(styles.blob, styles.drift3, "top-[30%] left-[30%] size-[56vw] max-h-[620px] max-w-[620px] bg-[radial-gradient(closest-side,var(--surface-alt),transparent)] opacity-90")} />
      </motion.div>
      <div className={styles.grain} />
    </div>
  );
}
