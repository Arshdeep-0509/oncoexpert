"use client";

import * as React from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Pause, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEDIA, useMedia } from "@/lib/use-media";
import { styles } from "./hero-styles";

const INTERVAL_MS = 5500;

export type HeroSlide = { src: string; alt: string; focal: string };

type HeroStageProps = {
  slides: readonly HeroSlide[];
  labels: { slideshow: string; pause: string; play: string };
  /** Ribbon and stat cards, positioned around the arch (server-rendered). */
  children?: React.ReactNode;
  className?: string;
};

/**
 * The arch with the crossfading portraits (5.5s, 1.2s fade, slow Ken Burns), a pause/play
 * button, and on desktop a gentle parallax. Autoplay stops when the visitor pauses it, when
 * the hero is off-screen or the tab is hidden, and with reduced motion (slide 1 stays).
 */
export function HeroStage({ slides, labels, children, className }: HeroStageProps) {
  const reduce = useReducedMotion();
  const desktop = useMedia(MEDIA.lg);
  const rootRef = React.useRef<HTMLDivElement>(null);

  // `previous` keeps its Ken Burns running while it fades out.
  const [{ active, previous }, setSlide] = React.useState<{ active: number; previous: number | null }>({
    active: 0,
    previous: null,
  });
  const [userPaused, setUserPaused] = React.useState(false);
  const [onScreen, setOnScreen] = React.useState(true);
  const [tabVisible, setTabVisible] = React.useState(true);
  // Slides 2–3 are only requested once the first (the LCP image) has loaded.
  const [loadRest, setLoadRest] = React.useState(false);

  React.useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setOnScreen(entry.isIntersecting));
    io.observe(el);
    const onVisibility = () => setTabVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  const playing = !reduce && !userPaused && onScreen && tabVisible && loadRest;

  React.useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => {
      setSlide(({ active: a }) => ({ active: (a + 1) % slides.length, previous: a }));
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [playing, slides.length]);

  // Desktop only: the stage drifts down 40px over the first 900px of scroll (moves slower than the page).
  const { scrollY } = useScroll();
  const parallax = useTransform(scrollY, [0, 900], [0, 40], { clamp: true });
  const useParallax = desktop && !reduce;

  return (
    <motion.div ref={rootRef} style={{ y: useParallax ? parallax : 0 }} className={cn("relative", className)}>
      {/* 10px blush ring, offset and rotated behind the arch */}
      <div
        aria-hidden="true"
        className={cn(styles.arch, "absolute inset-0 translate-x-3 translate-y-3 rotate-3 border-[10px] border-petal/80")}
      />

      <div
        role="group"
        aria-roledescription="carousel"
        aria-label={labels.slideshow}
        data-paused={playing ? undefined : ""}
        className={cn(styles.stage, styles.arch, "relative aspect-[4/5] overflow-hidden bg-petal shadow-soft-lg")}
      >
        {/* Entrance: a blush panel shrinks upward to reveal the photo (transform only). */}
        <span
          aria-hidden="true"
          className={cn(styles.archCover, styles.step, "absolute inset-0 z-[5] bg-petal")}
          style={{ "--d": "0.5s" } as React.CSSProperties}
        />
        {slides.map((slide, i) => {
          if (i > 0 && !loadRest) return null;
          const isActive = i === active;
          const animate = isActive || i === previous;
          return (
            <div
              key={slide.src}
              className={cn(styles.slide, "absolute inset-0")}
              data-active={isActive ? "" : undefined}
              aria-hidden={!isActive}
            >
              <Image
                src={slide.src}
                alt={slide.alt}
                fill
                sizes="(max-width: 767px) 84vw, (max-width: 1023px) 45vw, 520px"
                {...(i === 0 ? { fetchPriority: "high" as const, loading: "eager" as const } : {})}
                onLoad={i === 0 ? () => window.setTimeout(() => setLoadRest(true), 600) : undefined}
                className={cn("object-cover", animate && styles.kenBurns)}
                style={{ objectPosition: slide.focal }}
              />
            </div>
          );
        })}

        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? labels.play : labels.pause}
          className="absolute right-3 bottom-3 z-10 grid size-11 place-items-center rounded-full bg-white/90 text-ink shadow-soft-sm ring-1 ring-line transition-colors hover:bg-white md:right-4 md:bottom-4"
        >
          {userPaused ? (
            <Play className="size-4 translate-x-px" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </div>

      {children}
    </motion.div>
  );
}
