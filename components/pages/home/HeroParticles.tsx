"use client";

import dynamic from "next/dynamic";
import { useMedia } from "@/lib/hooks/use-media";

// Loaded only on desktop with motion allowed: phones never download it.
const ParticlesLayer = dynamic(
  () => import("@/components/pages/home/HeroParticlesLayer").then((m) => m.HeroParticlesLayer),
  { ssr: false },
);

/** 12 tiny luminous particles rising slowly behind the hero (desktop only, decorative). */
export function HeroParticles() {
  const enabled = useMedia("(min-width: 1024px) and (prefers-reduced-motion: no-preference)");
  return enabled ? <ParticlesLayer /> : null;
}
