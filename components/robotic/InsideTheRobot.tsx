"use client";

import * as React from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { insideTheRobot, type ShowcaseStep } from "@/content/pages/robotic-surgery";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/robotic/ui/eyebrow";
import { Reveal, EASE_OUT_EXPO } from "@/components/robotic/ui/reveal";
import { bleedFade } from "@/lib/image-fade";

const steps = insideTheRobot.steps as readonly ShowcaseStep[];
const N = steps.length;
const FADE = 0.05; // half-width of each crossfade, in scroll progress

/** Scroll progress at which step i is centred, and the midpoint between i and i+1. */
const center = (i: number) => i / (N - 1);
const boundary = (i: number) => (i + 0.5) / (N - 1);

/** Consecutive steps that share a photo become one layer (so 01 → 02 is a zoom, not a cut). */
type Layer = { image: ShowcaseStep["image"]; from: number; to: number };
const layers: Layer[] = steps.reduce<Layer[]>((acc, step, i) => {
  const last = acc[acc.length - 1];
  if (last && last.image.src === step.image.src) last.to = i;
  else acc.push({ image: step.image, from: i, to: i });
  return acc;
}, []);

const edgeFade = "[mask-image:radial-gradient(ellipse_75%_75%_at_50%_50%,black_60%,transparent_100%)]";

/* ------------------------------------------------------------------------------------
 * Framing: every step shows its machine at the same on-screen height, centred.
 * Geometry is worked out from the stage size (measured) and each machine's box in its
 * photo (content), so it holds on every screen size.
 * ---------------------------------------------------------------------------------- */

type Size = { w: number; h: number };
type Box = { x: number; y: number; w: number; h: number };

const MAX_W = 0.84; // a machine may use up to 84% of the stage width…
const MAX_H = 0.62; // …and 62% of its height

/** The machine a step features (explicit, or the photo's own subject, or the whole photo). */
const machineOf = (s: ShowcaseStep): Box =>
  s.machine ?? ("subject" in s.image && s.image.subject ? s.image.subject : { x: 0, y: 0, w: 100, h: 100 });

const aspectOf = (img: ShowcaseStep["image"]) => img.width / img.height;

/** The photo contained in the stage, before any zoom. */
function baseBox(img: ShowcaseStep["image"], stage: Size): Size {
  const a = aspectOf(img);
  const h = Math.min(stage.h, stage.w / a);
  return { w: h * a, h };
}

/** One common machine height (px) for all non-overview steps: the largest that fits them all. */
function targetHeight(stage: Size): number {
  return Math.min(
    MAX_H * stage.h,
    ...steps
      .filter((s) => !s.overview)
      .map((s) => {
        const m = machineOf(s);
        const ratio = (m.w / m.h) * aspectOf(s.image); // machine width : height, in pixels
        return (MAX_W * stage.w) / (ratio * (s.size ?? 1));
      }),
  );
}

/** Spotlight: dark shades left and right of the machine (edges in % of the photo box). */
type Spot = { half: number; fade: number };
type Frame = { scale: number; x: string; y: string; spot: Spot };

/** Zoom + shift (relative to the base box) that puts this step's machine centre-stage. */
function frameFor(step: ShowcaseStep, stage: Size): Frame {
  const m = machineOf(step);
  const box = baseBox(step.image, stage);
  const k = step.overview
    ? Math.min((MAX_W * stage.w) / ((m.w / 100) * box.w), (MAX_H * stage.h) / ((m.h / 100) * box.h))
    : (targetHeight(stage) * (step.size ?? 1)) / ((m.h / 100) * box.h);
  const cx = m.x + m.w / 2;
  const cy = m.y + m.h / 2;
  return {
    scale: k,
    // translate % is of the (unscaled) box; scaling happens about the box centre
    x: `${-k * (cx - 50)}%`,
    y: `${-k * (cy - 50)}%`,
    // After the camera move the machine is centred, so its edges sit at 50% ± k·w/2 of the
    // box. Shades start just outside them (+0.6% of the photo) and are fully dark within
    // ~1.5% more, which is inside the ~2% gap to the neighbouring machine.
    spot: { half: k * (m.w / 2 + 0.6), fade: k * 0.9 },
  };
}

/** Measures an element (rounded to whole pixels). */
function useElementSize<T extends HTMLElement>() {
  const ref = React.useRef<T>(null);
  const [size, setSize] = React.useState<Size>({ w: 0, h: 0 });
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      setSize((s) => (s.w === Math.round(width) && s.h === Math.round(height) ? s : { w: Math.round(width), h: Math.round(height) }));
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, size] as const;
}

function StageLayer({
  layer,
  progress,
  stage,
  sizes,
}: {
  layer: Layer;
  progress: MotionValue<number>;
  /** Measured stage size (px). */
  stage: Size;
  sizes: string;
}) {
  // Opacity: fade in around the boundary before `from`, out around the boundary after `to`.
  const stops: number[] = [];
  const values: number[] = [];
  if (layer.from > 0) {
    stops.push(boundary(layer.from - 1) - FADE, boundary(layer.from - 1) + FADE);
    values.push(0, 1);
  } else {
    stops.push(0);
    values.push(1);
  }
  if (layer.to < N - 1) {
    stops.push(boundary(layer.to) - FADE, boundary(layer.to) + FADE);
    values.push(1, 0);
  } else {
    stops.push(1);
    values.push(1);
  }
  const opacity = useTransform(progress, stops, values);

  // Camera: each step holds its framing for a moment around its centre (HOLD on either
  // side), so the camera has settled while its text shows; it moves between steps.
  const HOLD = 0.04;
  const zoomStops: number[] = [];
  const scales: number[] = [];
  const xs: string[] = [];
  const ys: string[] = [];
  for (let i = layer.from; i <= layer.to; i++) {
    const f = frameFor(steps[i], stage);
    const at = [i > layer.from ? center(i) - HOLD : null, i < layer.to ? center(i) + HOLD : null].filter(
      (v): v is number => v !== null,
    );
    for (const stop of at.length ? at : [center(i)]) {
      zoomStops.push(stop);
      scales.push(f.scale);
      xs.push(f.x);
      ys.push(f.y);
    }
  }
  if (zoomStops.length === 1) {
    // Single-step layers settle gently (6% larger → final size) as they arrive.
    zoomStops.splice(0, 1, Math.max(0, boundary(layer.from - 1) - FADE), center(layer.from));
    scales.splice(0, 1, scales[0] * (layer.from > 0 ? 1.06 : 1), scales[0]);
    xs.push(xs[0]);
    ys.push(ys[0]);
  }
  const scale = useTransform(progress, zoomStops, scales);
  const x = useTransform(progress, zoomStops, xs);
  const y = useTransform(progress, zoomStops, ys);
  const box = baseBox(layer.image, stage);

  return (
    <motion.div className={cn("blend-on-dark absolute inset-0 grid place-items-center", edgeFade)} style={{ opacity }}>
      {/* The box has the photo's aspect ratio, so machine boxes (in % of the photo) are exact. */}
      <motion.div
        className="relative"
        style={{ width: box.w, height: box.h, ...bleedFade(layer.image), scale, x, y }}
      >
        <Image src={layer.image.src} alt={layer.image.alt} fill sizes={sizes} className="object-contain" />
      </motion.div>

      {/* Spotlights: on steps that feature one machine, everything else goes dark. */}
      {steps.slice(layer.from, layer.to + 1).map((s, k) =>
        s.spotlight ? (
          <Spotlight
            key={s.number}
            step={layer.from + k}
            spot={frameFor(s, stage).spot}
            progress={progress}
            box={box}
          />
        ) : null,
      )}
    </motion.div>
  );
}

/**
 * Darkens everything outside an ellipse at the centre of the photo box (where the camera
 * has brought the machine). Fully on while its step is centred, fading out as the camera
 * moves on. The huge black spread covers the area outside the box.
 */
function Spotlight({
  step,
  spot,
  progress,
  box,
}: {
  step: number;
  spot: Spot;
  progress: MotionValue<number>;
  box: Size;
}) {
  const gap = 1 / (N - 1);
  const c = center(step);
  const opacity = useTransform(progress, [c - gap * 0.5, c - 0.015, c + 0.015, c + gap * 0.5], [0, 1, 1, 0], {
    clamp: true,
  });
  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none absolute top-1/2 left-1/2 -translate-1/2"
      style={{
        width: box.w,
        height: box.h,
        opacity,
        background: spotlightGradient(spot),
        boxShadow: "0 0 0 100vmax black",
        willChange: "opacity",
      }}
    />
  );
}

/** Dark left and right of the machine, clear over it (the machines stand side by side). */
const spotlightGradient = ({ half, fade }: Spot) =>
  `linear-gradient(to right, black ${50 - half - fade}%, transparent ${50 - half}%, transparent ${50 + half}%, black ${50 + half + fade}%)`;

/** All layers for a measured stage; remounted when the stage size changes. */
function StageLayers({ progress, stage, sizes }: { progress: MotionValue<number>; stage: Size; sizes: string }) {
  if (!stage.w || !stage.h) return null;
  return (
    <>
      {layers.map((layer) => (
        <StageLayer
          key={`${layer.image.src}-${layer.from}-${stage.w}x${stage.h}`}
          layer={layer}
          progress={progress}
          stage={stage}
          sizes={sizes}
        />
      ))}
    </>
  );
}

/** Scroll progress over a pinned track, plus the step it currently shows. */
function useShowcaseProgress() {
  const trackRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const [active, setActive] = React.useState(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    setActive((a) => (a === next ? a : next));
  });
  return { trackRef, scrollYProgress, active };
}

function PinnedShowcase() {
  const { trackRef, scrollYProgress, active } = useShowcaseProgress();
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [stageRef, stage] = useElementSize<HTMLDivElement>();

  return (
    <div ref={trackRef} className="relative grid grid-cols-[60%_40%]" style={{ height: `${N * 100}svh` }}>
      {/* Sticky stage */}
      <div className="relative">
        <div className="sticky top-0 h-svh overflow-hidden">
          <div aria-hidden="true" className="precision-grid absolute inset-0 opacity-60" />
          {/* Stage = the area below the navbar, so machines are centred in what is visible. */}
          <div ref={stageRef} className="absolute inset-x-0 top-[72px] bottom-0">
            <StageLayers progress={scrollYProgress} stage={stage} sizes="(min-width: 1440px) 1500px, 110vw" />
          </div>

          <Eyebrow onDark className="absolute top-[104px] left-8 xl:left-12">
            {insideTheRobot.eyebrow}
          </Eyebrow>

          {/* Progress rail */}
          <div aria-hidden="true" className="absolute top-1/2 right-6 h-[44svh] w-px -translate-y-1/2 bg-white/15">
            <motion.div className="absolute inset-0 origin-top bg-glow" style={{ scaleY: railScale }} />
            {steps.map((s, i) => (
              <span
                key={s.number}
                className={cn(
                  "absolute left-1/2 size-2.5 -translate-1/2 rounded-full border transition-colors duration-500",
                  i <= active ? "border-glow bg-glow" : "border-white/30 bg-black",
                )}
                style={{ top: `${center(i) * 100}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Steps */}
      <ol className="relative">
        {steps.map((s, i) => (
          <li
            key={s.number}
            aria-current={i === active ? "step" : undefined}
            className={cn(
              "relative flex h-svh items-center pr-8 pl-10 transition-opacity duration-700 xl:pr-16",
              i === active ? "opacity-100" : "opacity-35",
            )}
          >
            <div className="relative max-w-[30rem]">
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute -top-[0.62em] -left-2 font-display text-[9rem] leading-none font-extrabold text-transparent tabular-nums transition-[-webkit-text-stroke-color] duration-700 select-none [-webkit-text-stroke-width:1px]",
                  i === active ? "[-webkit-text-stroke-color:rgb(45_212_191/0.28)]" : "[-webkit-text-stroke-color:rgb(255_255_255/0.1)]",
                )}
              >
                {s.number}
              </span>
              <p className="type-eyebrow relative text-glow tabular-nums">{s.number}</p>
              <h3 className="relative mt-3 font-display text-[clamp(1.75rem,2.6vw,2.5rem)] leading-[1.15] font-bold tracking-[-0.02em] text-white">
                {s.title}
              </h3>
              <p className="relative mt-4 text-lg leading-relaxed text-white/65">{s.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  );
}

/**
 * Phones and tablets: the same scroll-driven tour, stacked. The sticky viewport
 * holds the photo stage on top (zoom + crossfades) and the active step's text below.
 */
function CompactPinnedShowcase() {
  const { trackRef, scrollYProgress, active } = useShowcaseProgress();
  const railScale = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const reduce = useReducedMotion();
  const step = steps[active];
  const [stageRef, stage] = useElementSize<HTMLDivElement>();

  // Tapping a dot scrolls to that step's position in the track.
  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const range = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + range * center(i), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div ref={trackRef} className="relative" style={{ height: `${N * 90}svh` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden pt-[76px] pb-6">
        {/* Stage */}
        <div ref={stageRef} className="relative min-h-0 flex-1">
          <div aria-hidden="true" className="precision-grid absolute inset-0 opacity-60" />
          <StageLayers progress={scrollYProgress} stage={stage} sizes="(min-width: 768px) 200vw, 260vw" />
          <Eyebrow onDark className="absolute top-3 left-5 md:left-8">
            {insideTheRobot.eyebrow}
          </Eyebrow>
        </div>

        <Container className="shrink-0">
          {/* Progress rail with tappable step dots */}
          <div className="relative mt-3 flex items-center justify-between">
            <div aria-hidden="true" className="absolute inset-x-[22px] top-1/2 h-px -translate-y-1/2 bg-white/15">
              <motion.div className="absolute inset-0 origin-left bg-glow" style={{ scaleX: railScale }} />
            </div>
            {steps.map((s, i) => (
              <button
                key={s.number}
                type="button"
                onClick={() => goTo(i)}
                aria-label={`${s.number} ${s.title}`}
                aria-current={i === active ? "step" : undefined}
                className="relative grid size-11 place-items-center"
              >
                <span
                  className={cn(
                    "size-2.5 rounded-full border transition-colors duration-500",
                    i <= active ? "border-glow bg-glow" : "border-white/30 bg-black",
                  )}
                />
              </button>
            ))}
          </div>

          {/* Active step */}
          <div className="relative mt-3 min-h-[188px] md:min-h-[170px]" aria-live="polite">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={step.number}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
                className="relative"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-5 right-0 font-display text-[5.5rem] leading-none font-extrabold text-transparent tabular-nums select-none [-webkit-text-stroke:1px_rgb(45_212_191/0.25)] md:text-[7rem]"
                >
                  {step.number}
                </span>
                <p className="type-eyebrow relative text-glow tabular-nums">{step.number}</p>
                <h3 className="relative mt-2 font-display text-[clamp(1.5rem,5vw,2rem)] leading-[1.15] font-bold tracking-[-0.02em] text-white">
                  {step.title}
                </h3>
                <p className="relative mt-2 max-w-[44ch] leading-relaxed text-white/65">{step.body}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </div>
    </div>
  );
}

/** Reduced-motion card image: the same framing as the scroll tour, in a fixed 4:3 card. */
const CARD: Size = { w: 400, h: 300 };

function StepCardImage({ step }: { step: ShowcaseStep }) {
  const f = frameFor(step, CARD);
  const box = baseBox(step.image, CARD);
  const boxStyle = {
    width: `${(box.w / CARD.w) * 100}%`,
    height: `${(box.h / CARD.h) * 100}%`,
    left: `${50 - (box.w / CARD.w) * 50}%`,
    top: `${50 - (box.h / CARD.h) * 50}%`,
  };
  return (
    <div className={cn("relative aspect-[4/3] overflow-hidden", edgeFade)}>
      <div
        className="absolute"
        style={{ ...boxStyle, ...bleedFade(step.image), transform: `translate(${f.x}, ${f.y}) scale(${f.scale})` }}
      >
        <Image src={step.image.src} alt={step.image.alt} fill sizes="(min-width: 768px) 100vw, 200vw" className="object-contain" />
      </div>
      {step.spotlight ? (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute"
          style={{ ...boxStyle, background: spotlightGradient(f.spot), boxShadow: "0 0 0 100vmax black" }}
        />
      ) : null}
    </div>
  );
}

function StepList() {
  return (
    <Container className="py-[72px]">
      <Eyebrow onDark>{insideTheRobot.eyebrow}</Eyebrow>
      <Reveal stagger className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((s) => (
          <article key={s.number} className="overflow-hidden rounded-[22px] border border-white/10 bg-black">
            <StepCardImage step={s} />

            <div className="p-6">
              <p className="type-eyebrow text-glow tabular-nums">{s.number}</p>
              <h3 className="type-h3 mt-2 text-white">{s.title}</h3>
              <p className="mt-2 text-white/65">{s.body}</p>
            </div>
          </article>
        ))}
      </Reveal>
    </Container>
  );
}

/**
 * Scroll-driven tour of the machine: side-by-side pinned on desktop, stacked pinned
 * on phones/tablets, and a plain card list with prefers-reduced-motion (pure CSS switch).
 */
export function InsideTheRobot() {
  return (
    <section id="inside-the-robot" data-tone="black" aria-label={insideTheRobot.eyebrow} className="relative bg-black text-white">
      <div className="hidden lg:motion-safe:block">
        <PinnedShowcase />
      </div>
      <div className="hidden motion-safe:max-lg:block">
        <CompactPinnedShowcase />
      </div>
      <div className="hidden motion-reduce:block">
        <StepList />
      </div>

    </section>
  );
}
