"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "motion/react";
import { MEDIA, useMedia } from "@/lib/hooks/use-media";

// Loaded only on desktop with motion allowed: phones and tablets never download it.
const BloomLayer = dynamic(
  () => import("@/components/pages/endometrial-cancer/HeroBloomLayer").then((m) => m.HeroBloomLayer),
  { ssr: false },
);

/** The petal bloom turning slowly behind the line art (desktop only, decorative). */
export function HeroBloom() {
  const desktop = useMedia(MEDIA.lg);
  const reduce = useReducedMotion();
  return desktop && !reduce ? <BloomLayer /> : null;
}
