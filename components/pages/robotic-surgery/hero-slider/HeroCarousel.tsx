"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, animate, useMotionValue, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { hero } from "@/content/pages/robotic-surgery";
import { site } from "@/content/site";
import { introRemainingSeconds } from "@/lib/intro";
import { IMAGE_SIZES, SLIDE_SECONDS } from "@/components/pages/robotic-surgery/hero-slider/stage";
import { SlideLayer } from "@/components/pages/robotic-surgery/hero-slider/SlideLayer";
import { IndicatorBar } from "@/components/pages/robotic-surgery/hero-slider/IndicatorBar";

/**
 * The hero's photo stage: crossfading slides every 6s with a Ken Burns zoom, indicator
 * bars and a pause button. Autoplay waits for the intro and pauses on hover, while the
 * tab is hidden, when paused by the visitor, and always with reduced motion.
 */
export function HeroCarousel() {
  const reduce = !!useReducedMotion();
  const slides = hero.slides;
  const total = slides.length;

  const [index, setIndex] = React.useState(0);
  const [userPaused, setUserPaused] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const [tabHidden, setTabHidden] = React.useState(false);
  // While the intro preloader plays, hold the entrance animations and the autoplay.
  const [intro] = React.useState(introRemainingSeconds);
  const [introPlaying, setIntroPlaying] = React.useState(intro > 0);
  const [warm, setWarm] = React.useState(false);
  const progress = useMotionValue(0);
  const paused = userPaused || hovered || tabHidden || reduce || introPlaying;

  React.useEffect(() => {
    if (!introPlaying) return;
    const t = window.setTimeout(() => setIntroPlaying(false), intro * 1000);
    return () => window.clearTimeout(t);
  }, [introPlaying, intro]);

  React.useEffect(() => {
    const onVisibility = () => setTabHidden(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // Slides 2..n load only after the page, including slide 1, has loaded.
  React.useEffect(() => {
    const ready = () => setWarm(true);
    if (document.readyState === "complete") {
      const t = setTimeout(ready, 250);
      return () => clearTimeout(t);
    }
    window.addEventListener("load", ready, { once: true });
    return () => window.removeEventListener("load", ready);
  }, []);

  // Drive the 6s progress; it pauses in place and resumes from where it stopped.
  React.useEffect(() => {
    if (paused) return;
    const controls = animate(progress, 1, {
      duration: SLIDE_SECONDS * (1 - progress.get()),
      ease: "linear",
      onComplete: () => {
        progress.set(0);
        setIndex((i) => (i + 1) % total);
      },
    });
    return () => controls.stop();
  }, [paused, index, progress, total]);

  const goTo = (i: number) => {
    progress.set(0);
    setIndex(i);
  };

  return (
    <div className="lg:col-span-7 lg:col-start-6 lg:row-start-1">
      <div
        role="group"
        aria-roledescription={site.a11y.carousel}
        aria-label={hero.a11y.region}
        onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        // Same 4:3 box for every photo; on tablets it is capped by height so the text fits.
        className="relative isolate mx-auto aspect-[4/3] w-full md:w-[min(100%,calc(46svh*4/3))] lg:w-full lg:max-w-[calc(min(72svh,720px)*4/3)]"
      >
        {/* Glow, breathing */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10 m-auto aspect-square w-[70%] rounded-full bg-glow opacity-[0.18] blur-[90px] motion-safe:animate-glow-breathe"
        />
        {/* Precision grid */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -inset-x-[10%] inset-y-0 -z-10 precision-grid"
        />

        {/* Slides on pure black. The wrapper (not each photo) is screen-blended so the photos'
            black merges with the page and the glow/grid show through; edges fade so a
            photo never ends in a hard line. */}
        <div
          className="absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_58%,transparent_100%)] blend-on-dark"
          aria-live={userPaused ? "polite" : "off"}
        >
          <AnimatePresence initial={false}>
            <SlideLayer key={index} slide={slides[index]} index={index} progress={progress} reduce={reduce} />
          </AnimatePresence>
        </div>

        {/* Warm the cache for slides 2..n once slide 1 is in. */}
        {warm
          ? slides
              .slice(1)
              .map((s) => (
                <Image
                  key={s.src}
                  src={s.src}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes={IMAGE_SIZES}
                  loading="eager"
                  className="invisible object-cover"
                />
              ))
          : null}
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center justify-center gap-3 lg:justify-start">
        <div className="flex items-center gap-1">
          {slides.map((s, i) => (
            <IndicatorBar
              key={s.src}
              active={i === index}
              progress={progress}
              reduce={reduce}
              label={hero.a11y.goTo(i + 1, total)}
              onClick={() => goTo(i)}
            />
          ))}
        </div>
        {!reduce ? (
          <button
            type="button"
            onClick={() => setUserPaused((p) => !p)}
            aria-label={userPaused ? hero.a11y.play : hero.a11y.pause}
            aria-pressed={userPaused}
            className="grid size-11 place-items-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-white/40 hover:text-white"
          >
            {userPaused ? (
              <Play className="size-4" strokeWidth={1.75} aria-hidden="true" />
            ) : (
              <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
            )}
          </button>
        ) : null}
      </div>
    </div>
  );
}
