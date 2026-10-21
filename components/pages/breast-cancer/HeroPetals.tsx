"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { MEDIA, useMedia } from "@/lib/hooks/use-media";

// Loaded only on desktop with motion allowed: phones never download it.
const PetalsLayer = dynamic(
  () => import("@/components/pages/breast-cancer/HeroPetalsLayer").then((m) => m.HeroPetalsLayer),
  {
    ssr: false,
  },
);

/** 8 small petals drifting down the hero (desktop only, decorative). */
export function HeroPetals() {
  const desktop = useMedia(MEDIA.lg);
  const reduce = useReducedMotion();
  return desktop && !reduce ? <PetalsLayer /> : null;
}
