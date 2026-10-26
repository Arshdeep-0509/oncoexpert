"use client";

import * as React from "react";
import Image from "next/image";
import { Bot, ClipboardCheck, HeartPulse, Microscope, ScanLine, UsersRound, type LucideIcon } from "lucide-react";
import type { PathIcon } from "@/content/pages/colorectal-cancer";
import { getLenis } from "@/lib/lenis";
import { cn } from "@/lib/utils";
import { ScrollFillLine } from "@/components/ui/ScrollFillLine";
import { InView } from "@/components/ui/InView";
import { ROAD_BOX, ROAD_PATH, milestoneAt } from "@/components/pages/colorectal-cancer/path-road";
import { styles } from "@/components/pages/colorectal-cancer/path-styles";

const icons: Record<PathIcon, LucideIcon> = {
  colonoscopy: Microscope,
  scan: ScanLine,
  staging: UsersRound,
  planning: ClipboardCheck,
  surgery: Bot,
  recovery: HeartPulse,
};

/** The layouts (path.css uses the same queries). */
const PINNED = "(min-width: 1024px) and (prefers-reduced-motion: no-preference)";
const ROW = "(min-width: 768px)";

export type PathStep = {
  icon: PathIcon;
  title: string;
  body: string;
  image: { src: string; alt: string; focal: string };
};

type PathTimelineProps = {
  /** Title and intro (server-rendered). */
  heading: React.ReactNode;
  steps: readonly PathStep[];
  labels: { steps: string; milestones: string; step: string; progress: string };
};

const index = (i: number) => String(i + 1).padStart(2, "0");
const stateOf = (i: number, active: number) => (i === active ? "active" : i < active ? "past" : "future");

/**
 * The six steps (layouts: path.css). Pinned (desktop): the scroll through the tall box sets the
 * active step and --p; the road, milestones, deck and photo follow. Row (tablet, desktop with
 * reduced motion): the row's horizontal scroll sets --row-p and the active card. Phones: a plain
 * vertical timeline. The milestone buttons jump to a step: the page scroll (pinned) or the row.
 */
export function PathTimeline({ heading, steps, labels }: PathTimelineProps) {
  const [active, setActive] = React.useState(0);
  const pinRef = React.useRef<HTMLDivElement>(null);
  const listRef = React.useRef<HTMLOListElement>(null);
  const count = steps.length;

  // Pinned: progress through the tall box, once per frame, only while it is near the screen.
  React.useEffect(() => {
    const pin = pinRef.current;
    if (!pin) return;
    const mql = window.matchMedia(PINNED);
    let frame = 0;
    let listening = false;
    const update = () => {
      frame = 0;
      const box = pin.getBoundingClientRect();
      const p = Math.min(1, Math.max(0, -box.top / Math.max(1, box.height - window.innerHeight)));
      pin.style.setProperty("--p", p.toFixed(4));
      setActive(Math.min(count - 1, Math.floor(p * count)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      const method = on ? "addEventListener" : "removeEventListener";
      window[method]("scroll", onScroll, { passive: true });
      window[method]("resize", onScroll, { passive: true });
      if (on) update();
    };
    const io = new IntersectionObserver(([entry]) => listen(!!entry?.isIntersecting && mql.matches), {
      rootMargin: "200px 0px",
    });
    io.observe(pin);
    const onMedia = () => {
      io.unobserve(pin);
      io.observe(pin);
    };
    mql.addEventListener("change", onMedia);
    return () => {
      io.disconnect();
      mql.removeEventListener("change", onMedia);
      listen(false);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  // Row: horizontal scroll position → progress bar and active card.
  React.useEffect(() => {
    const list = listRef.current;
    const pin = pinRef.current;
    if (!list || !pin) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      if (window.matchMedia(PINNED).matches || !window.matchMedia(ROW).matches) return;
      const max = list.scrollWidth - list.clientWidth;
      const p = max > 0 ? list.scrollLeft / max : 0;
      pin.style.setProperty("--row-p", p.toFixed(4));
      const first = list.children[0] as HTMLElement | undefined;
      const stride = first ? first.offsetWidth + parseFloat(getComputedStyle(list).columnGap || "0") : 1;
      setActive(p >= 0.995 ? count - 1 : Math.min(count - 1, Math.round(list.scrollLeft / stride)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    list.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      list.removeEventListener("scroll", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [count]);

  const jump = (i: number) => {
    const pin = pinRef.current;
    const list = listRef.current;
    if (!pin || !list) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (window.matchMedia(PINNED).matches) {
      // The middle of step i's share of the pinned scroll.
      const box = pin.getBoundingClientRect();
      const top = window.scrollY + box.top + ((i + 0.5) / count) * (box.height - window.innerHeight);
      const lenis = getLenis();
      if (lenis) lenis.scrollTo(top);
      else window.scrollTo({ top, behavior: reduce ? "auto" : "smooth" });
    } else {
      const card = list.children[i] as HTMLElement | undefined;
      if (!card) return;
      list.scrollTo({
        left: card.offsetLeft - list.offsetLeft - parseFloat(getComputedStyle(list).paddingLeft),
        behavior: reduce ? "auto" : "smooth",
      });
    }
  };

  return (
    <div ref={pinRef} className={styles.pin}>
      <div className={styles.stage}>
        <div className="mx-auto grid w-full max-w-[calc(1240px+var(--gutter)*2)] gap-10 px-(--gutter) py-(--section-y) lg:grid-cols-12 lg:items-center lg:gap-x-14">
          {/* Left: heading; on the pinned layout, the step's photo under it */}
          <div className="lg:col-span-5">
            {heading}
            <div
              aria-hidden="true"
              className={cn(
                styles.frame,
                "relative mt-8 aspect-[4/3] overflow-hidden rounded-xl bg-surface-alt shadow-soft",
              )}
            >
              {steps.map((step, i) => (
                <Image
                  key={step.title}
                  src={step.image.src}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 460px, 1px"
                  data-active={i === active ? "" : undefined}
                  className={cn(styles.photo, "object-cover")}
                  style={{ objectPosition: step.image.focal }}
                />
              ))}
              <span className="absolute inset-0 rounded-xl ring-1 ring-black/5 ring-inset" />
            </div>
          </div>

          <div className="relative min-w-0 lg:col-span-7">
            {/* The road with its milestones (pinned); the milestone row (row layout) */}
            <div className="relative lg:mb-10">
              <svg
                aria-hidden="true"
                viewBox={`0 0 ${ROAD_BOX.width} ${ROAD_BOX.height}`}
                className={cn(styles.road, "w-full overflow-visible")}
              >
                <defs>
                  <linearGradient id="cxp-road-grad" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" style={{ stopColor: "var(--accent)" }} />
                    <stop offset="1" style={{ stopColor: "var(--accent-bright)" }} />
                  </linearGradient>
                </defs>
                <path
                  d={ROAD_PATH}
                  fill="none"
                  style={{ stroke: "var(--line)" }}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray="1 16"
                />
                <path
                  d={ROAD_PATH}
                  pathLength={1}
                  fill="none"
                  stroke="url(#cxp-road-grad)"
                  strokeWidth="10"
                  strokeLinecap="round"
                  className={styles.roadDraw}
                />
              </svg>
              <nav aria-label={labels.milestones} className={cn(styles.nav, "max-lg:mb-6")}>
                <ol className={styles.navList}>
                  {steps.map((step, i) => (
                    <li
                      key={step.title}
                      style={{ "--x": milestoneAt(i).left, "--y": milestoneAt(i).top } as React.CSSProperties}
                    >
                      <button
                        type="button"
                        onClick={() => jump(i)}
                        aria-label={`${labels.step} ${i + 1}: ${step.title}`}
                        aria-current={i === active ? "step" : undefined}
                        data-state={stateOf(i, active)}
                        className={cn(
                          styles.milestone,
                          "grid size-12 place-items-center rounded-full bg-surface font-display text-[15px] font-semibold text-accent tabular-nums ring-1 shadow-soft-sm ring-line",
                        )}
                      >
                        <span aria-hidden="true" className={styles.mDone} />
                        <span aria-hidden="true" className={styles.mFill} />
                        <span aria-hidden="true">{index(i)}</span>
                        <span aria-hidden="true" className={styles.mOn}>
                          {index(i)}
                        </span>
                      </button>
                    </li>
                  ))}
                </ol>
              </nav>
            </div>

            {/* The steps: vertical (phones), a row (tablets), a deck (pinned) */}
            <div className="relative">
              <ScrollFillLine className={cn(styles.line, "absolute top-6 bottom-6 left-[23px]")} />
              <ol ref={listRef} aria-label={labels.steps} className={styles.list}>
                {steps.map((step, i) => {
                  const Icon = icons[step.icon];
                  return (
                    <li key={step.title} className={cn(styles.step, "relative")}>
                      <span
                        aria-hidden="true"
                        className={cn(
                          styles.num,
                          "z-10 grid size-12 place-items-center rounded-full bg-surface font-display text-[15px] font-semibold text-accent tabular-nums ring-1 shadow-soft-sm ring-line",
                        )}
                      >
                        {index(i)}
                      </span>
                      <InView className={cn(styles.slide, "h-full")} threshold={0.4}>
                        <article
                          data-state={stateOf(i, active)}
                          className={cn(
                            styles.card,
                            "relative flex h-full flex-col overflow-hidden rounded-xl border border-line bg-surface shadow-soft-sm",
                          )}
                        >
                          <span aria-hidden="true" className={styles.cardRing} />
                          <div className={cn(styles.thumb, "relative aspect-[16/9] shrink-0 overflow-hidden")}>
                            <Image
                              src={step.image.src}
                              alt=""
                              fill
                              sizes="(min-width: 768px) 340px, 1px"
                              className="object-cover"
                              style={{ objectPosition: step.image.focal }}
                            />
                          </div>
                          <div className="relative flex flex-1 items-start gap-5 p-5 md:p-6 lg:items-center lg:gap-7 lg:p-9">
                            <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent-soft text-accent lg:size-16">
                              <Icon className="size-6 lg:size-8" strokeWidth={1.5} aria-hidden="true" />
                            </span>
                            <div className="min-w-0">
                              <p className="font-display text-sm font-semibold text-accent tabular-nums lg:text-base">
                                <span className="sr-only">{labels.step} </span>
                                {index(i)}
                              </p>
                              <h3 className="mt-0.5 font-display text-xl leading-snug text-ink lg:text-[2rem] lg:leading-tight">
                                {step.title}
                              </h3>
                              <p className="mt-1.5 text-[15px] leading-relaxed text-muted lg:mt-2 lg:text-lg">
                                {step.body}
                              </p>
                            </div>
                          </div>
                        </article>
                      </InView>
                    </li>
                  );
                })}
              </ol>
              <div
                role="progressbar"
                aria-label={labels.progress}
                aria-valuemin={1}
                aria-valuemax={count}
                aria-valuenow={active + 1}
                className={cn(styles.progress, "mt-5 h-1 overflow-hidden rounded-full bg-line")}
              >
                <div className={cn(styles.progressFill, "h-full w-full rounded-full bg-(image:--grad-accent)")} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
