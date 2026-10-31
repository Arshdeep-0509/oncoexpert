"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDIA, useMedia } from "@/lib/hooks/use-media";
import { styles } from "@/components/pages/breast-cancer/hero-styles";

type HeroPhoto = { src: string; alt: string; focal: string };

type HeroStageProps = {
  photo: HeroPhoto;
  labels: { pause: string; play: string };
  /** Ribbon and highlight cards, positioned around the photo (server-rendered). */
  children?: React.ReactNode;
  className?: string;
};

/**
 * The hero's photo, with no frame: a hopeful woman whose edges dissolve into the blush, in front
 * of a soft glowing "sun" and two thin rings in the accent gradient that draw themselves and then
 * turn very slowly. The photo settles in and then breathes (a slow zoom). The pause button stops
 * the loops (they also stop off-screen); desktop adds a gentle scroll parallax. Phones: a square
 * crop, full width; from md the whole picture. The photo is the LCP image: painted from the
 * start, it only ever moves (never fades in).
 */
export function HeroStage({ photo, labels, children, className }: HeroStageProps) {
  const reduce = useReducedMotion();
  const desktop = useMedia(MEDIA.lg);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const [userPaused, setUserPaused] = React.useState(false);
  const [onScreen, setOnScreen] = React.useState(true);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Desktop only: the visual drifts down 40px over the first 900px of scroll.
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 900], [0, 40], { clamp: true });
  const useParallax = desktop && !reduce;

  return (
    <motion.div
      ref={rootRef}
      style={{ y: useParallax ? parallax : 0 }}
      data-paused={userPaused || !onScreen ? "" : undefined}
      className={cn(styles.stage, "relative", className)}
    >
      {/* The soft sun behind her */}
      <div
        aria-hidden="true"
        className={cn(styles.halo, styles.step, styles.fadeIn)}
        style={{ "--d": "0.1s" } as React.CSSProperties}
      />

      {/* Two thin rings: drawn in, then turning slowly in opposite directions */}
      <svg aria-hidden="true" viewBox="0 0 200 200" className={styles.orbit}>
        <defs>
          <linearGradient id="bloom-orbit-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--accent)" }} />
            <stop offset="0.6" style={{ stopColor: "var(--highlight, var(--accent))", stopOpacity: 0.7 }} />
            <stop offset="1" style={{ stopColor: "var(--accent)", stopOpacity: 0.1 }} />
          </linearGradient>
        </defs>
        <g className={styles.orbitTurn}>
          <circle className={styles.orbitPath} cx="100" cy="100" r="96" pathLength={1} />
        </g>
        <g className={styles.orbitTurnBack}>
          <circle className={cn(styles.orbitPath, styles.orbitDashed)} cx="100" cy="100" r="86" pathLength={1} />
        </g>
      </svg>

      {/* The photo: frameless, its edges melting into the hero */}
      <div className={styles.portrait} style={{ "--focal": photo.focal } as React.CSSProperties}>
        <div className={cn(styles.settle, styles.step)} style={{ "--d": "0.2s" } as React.CSSProperties}>
          <div className={styles.breathe}>
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              preload
              fetchPriority="high"
              sizes="(max-width: 767px) 100vw, (max-width: 1023px) 46vw, 680px"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      {!reduce ? (
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? labels.play : labels.pause}
          className="absolute bottom-[6%] left-[5%] z-10 grid size-11 place-items-center rounded-full bg-white/90 text-ink ring-1 shadow-soft-sm ring-line transition-colors hover:bg-white md:right-[7%] md:bottom-[7%] md:left-auto"
        >
          {userPaused ? (
            <Play className="size-4 translate-x-px" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      ) : null}

      {children}
    </motion.div>
  );
}
