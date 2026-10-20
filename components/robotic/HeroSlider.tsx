"use client";

import * as React from "react";
import Image from "next/image";
import {
  AnimatePresence,
  animate, motion,
  useIsPresent,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "motion/react";
import { Pause, Play } from "lucide-react";
import { hero } from "@/content/pages/robotic-surgery";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { EASE_OUT_EXPO } from "@/components/robotic/ui/reveal";
import { pillGhostDark, pillGlow } from "@/components/robotic/ui/buttons";
import { AppointmentButton } from "@/components/robotic/AppointmentButton";
import { contentIcons } from "@/components/robotic/icons";
import { introRemainingSeconds } from "@/lib/intro";
import { bleedFade } from "@/lib/image-fade";

const SLIDE_SECONDS = 6;
const CROSSFADE_SECONDS = 1.2;
const KEN_BURNS_SCALE = 0.07;
const IMAGE_SIZES = "(min-width: 1304px) 720px, (min-width: 1024px) 56vw, (min-width: 768px) 62vw, 100vw";

type Slide = (typeof hero.slides)[number];

/**
 * One photo in the hero stage. The stage box is the same size for every slide; all photos
 * are black-background shots, so they sit directly on the black hero.
 */
function SlideLayer({
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

/** The stage is 4:3, so its height is 3/4 of its width. */
const STAGE_RATIO = 3 / 4;

/**
 * Same machine size on every slide, as large as possible: every machine gets the same
 * height (% of the stage height) and is centred. That height is the largest at which the
 * widest machine still fits in 86% of the stage width (the edge fade starts beyond that),
 * capped at 64% so tall machines keep breathing room above and below.
 */
const MAX_WIDTH = 86; // % of the stage width a machine may use
const MAX_HEIGHT = 64; // % of the stage height
const SUBJECT_HEIGHT = Math.min(
  MAX_HEIGHT,
  ...hero.slides
    .filter((sl) => sl.subject)
    .map((sl) => {
      const s = sl.subject!;
      const ratio = (s.w / s.h) * (sl.width / sl.height); // machine width : height, in pixels
      return MAX_WIDTH / (STAGE_RATIO * ratio);
    }),
);

function photoBox(slide: Slide): React.CSSProperties {
  const s = slide.subject;
  if (!s) return { inset: 0 }; // real photographs simply cover the stage
  const heightPct = (SUBJECT_HEIGHT * 100) / s.h; // photo height, % of the stage height
  const widthPct = heightPct * STAGE_RATIO * (slide.width / slide.height); // % of the stage width
  return {
    width: `${widthPct}%`,
    height: `${heightPct}%`,
    left: `${50 - ((s.x + s.w / 2) / 100) * widthPct}%`,
    top: `${50 - ((s.y + s.h / 2) / 100) * heightPct}%`,
  };
}

const textItem = (delay: number, reduce: boolean) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.7, ease: EASE_OUT_EXPO, delay },
      };

export function HeroSlider() {
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

  const [accentWord, ...restWords] = hero.title.startsWith(hero.titleAccent)
    ? [hero.titleAccent, ...hero.title.slice(hero.titleAccent.length).trim().split(" ")]
    : ["", ...hero.title.split(" ")];
  const words = [accentWord, ...restWords].filter(Boolean);

  return (
    <section
      id="hero"
      data-tone="black"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-black text-white"
    >
      <Container className="grid min-h-svh grid-cols-1 content-center gap-y-8 pt-[96px] pb-[88px] md:min-h-[calc(100svh-40px)] lg:grid-cols-12 lg:items-center lg:gap-x-8 lg:pt-[104px] lg:pb-24">
        {/* Image stage (first on mobile) */}
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
            <div aria-hidden="true" className="precision-grid pointer-events-none absolute -inset-x-[10%] inset-y-0 -z-10" />

            {/* Slides on pure black. The wrapper (not each photo) is screen-blended so the photos'
                black merges with the page and the glow/grid show through; edges fade so a
                photo never ends in a hard line. */}
            <div
              className="blend-on-dark absolute inset-0 [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black_58%,transparent_100%)]"
              aria-live={userPaused ? "polite" : "off"}
            >
              <AnimatePresence initial={false}>
                <SlideLayer
                  key={index}
                  slide={slides[index]}
                  index={index}
                  progress={progress}
                  reduce={reduce}
                />
              </AnimatePresence>
            </div>

            {/* Warm the cache for slides 2..n once slide 1 is in. */}
            {warm
              ? slides.slice(1).map((s) => (
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

        {/* Text (tablet: headline left, highlights right; desktop: one column beside the stage) */}
        <div className="md:grid md:grid-cols-2 md:items-start md:gap-x-10 lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:block">
          <h1 id="hero-title" className="type-h1 text-white md:col-start-1">
            {words.map((word, i) => (
              <React.Fragment key={`${word}-${i}`}>
                <span className="inline-block overflow-hidden pb-[0.1em] align-bottom">
                  <motion.span
                    className={cn(
                      "inline-block",
                      i === 0 && accentWord && "bg-linear-to-r from-white from-20% to-glow bg-clip-text text-transparent",
                    )}
                    initial={reduce ? false : { y: "100%" }}
                    animate={{ y: "0%" }}
                    transition={{ duration: 0.9, ease: EASE_OUT_EXPO, delay: intro + 0.15 + i * 0.08 }}
                  >
                    {word}
                  </motion.span>
                </span>
                {i < words.length - 1 ? " " : null}
              </React.Fragment>
            ))}
          </h1>

          <motion.p className="mt-5 max-w-[30ch] text-[1.25rem] leading-relaxed text-white/70 md:col-start-1" {...textItem(intro + 0.55, reduce)}>
            {hero.subtitle}
          </motion.p>

          <ul className="mt-8 grid grid-cols-2 gap-3 md:col-start-2 md:row-span-2 md:row-start-1 md:mt-2 lg:mt-8">
            {hero.highlights.map((h, i) => {
              const Icon = contentIcons[h.icon];
              return (
                <motion.li
                  key={h.label}
                  {...textItem(intro + 0.75 + i * 0.1, reduce)}
                  className="flex items-center gap-3 rounded-2xl border border-white/12 bg-white/[0.06] px-4 py-3 text-[15px] leading-snug font-medium text-white/90 backdrop-blur-md"
                >
                  <Icon className="size-[18px] shrink-0 text-glow" strokeWidth={1.75} aria-hidden="true" />
                  {h.label}
                </motion.li>
              );
            })}
          </ul>

          <motion.div className="mt-9 flex flex-wrap gap-3 md:col-span-2 lg:col-span-1" {...textItem(intro + 1.25, reduce)}>
            <AppointmentButton {...hero.ctas.primary} className={pillGlow} arrow />
            <AppointmentButton {...hero.ctas.secondary} className={pillGhostDark} />
          </motion.div>
        </div>
      </Container>

      {/* Scroll cue */}
      <a
        href="#overview"
        aria-label={hero.a11y.scrollCue}
        className="absolute bottom-5 left-1/2 hidden h-14 w-11 -translate-x-1/2 justify-center md:flex"
      >
        <span aria-hidden="true" className="relative h-12 w-px bg-white/15">
          <span className="absolute -left-[2.5px] top-0 size-1.5 rounded-full bg-glow motion-safe:animate-scroll-dot" />
        </span>
      </a>
    </section>
  );
}


function IndicatorBar({
  active,
  progress,
  reduce,
  label,
  onClick,
}: {
  active: boolean;
  progress: MotionValue<number>;
  reduce: boolean;
  label: string;
  onClick: () => void;
}) {
  const scaleX = useTransform(progress, (v) => (reduce ? 1 : v));
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      aria-current={active ? "true" : undefined}
      className="group flex h-11 w-9 items-center sm:w-12"
    >
      <span className="relative h-[3px] w-full overflow-hidden rounded-full bg-white/20 transition-colors group-hover:bg-white/35">
        {active ? (
          <motion.span className="absolute inset-0 origin-left rounded-full bg-glow" style={{ scaleX }} />
        ) : null}
      </span>
    </button>
  );
}
