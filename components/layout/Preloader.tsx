"use client";

import * as React from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { getLenis } from "@/lib/lenis";
import { INTRO_EXIT_START_MS, INTRO_TOTAL_MS, introDisabled } from "@/lib/intro";

/*
 * Intro preloader. Sequence (seconds from first paint):
 *   0.0  the gradient ring draws itself (two halves from the top)
 *   0.3  the three swooshes + dots are "drawn" by a clockwise brush sweep
 *   1.2  the ribbon and hands grow out of the centre
 *   1.4  ONCO·XPERT rises letter by letter
 *   2.0  rules extend, "Comprehensive Cancer Centre" fades up
 *   2.4  COMPASSION • EXPERTISE • EXCELLENCE settles in
 *   3.3  the badge eases forward and the page is revealed
 * It is all CSS (keyframes `pl-*` in globals.css) so it plays from first paint and always
 * finishes, even without JS; JS only locks scrolling and removes it afterwards.
 *
 * The mark is the real logo artwork (brand/oncoxpert-mark.png, cropped from the round logo).
 */

const EXIT = INTRO_EXIT_START_MS / 1000;
const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

const MARK = {
  src: "/images/brand/oncoxpert-mark.png",
  width: 437,
  height: 397,
  // Centre and radius of the white inner circle, measured on the artwork.
  cx: "44.85%",
  cy: "58.44%",
  /** Inner circle radius as % of the mark's width (used with cqw units). */
  r: 29.06,
  /** Same radius for clip-path circle(), which measures % against √((w²+h²)/2). */
  clipR: "31%",
};

const BLUE = "#0B40B2";
const ORANGE = "#F15A22";

const anim = (name: string, duration: number, delay: number, timing = ease) =>
  `${name} ${duration}s ${timing} ${delay}s both`;

export function Preloader() {
  const [gone, setGone] = React.useState(false);
  const overlayRef = React.useRef<HTMLDivElement>(null);
  const { preloader } = site;

  React.useEffect(() => {
    const html = document.documentElement;
    if (introDisabled()) {
      const id = requestAnimationFrame(() => setGone(true));
      return () => cancelAnimationFrame(id);
    }
    // Keep the page still while the intro plays; release it when the exit fade ends
    // (the CSS animation is the clock; a timer is only a safety net).
    const previous = html.style.overflow;
    html.style.overflow = "hidden";
    getLenis()?.stop();
    const finish = () => {
      html.style.overflow = previous;
      getLenis()?.start();
      setGone(true);
    };
    const el = overlayRef.current;
    const onEnd = (e: AnimationEvent) => {
      if (e.target === el && e.animationName === "pl-exit") finish();
    };
    // If the page hydrated late (slow first load), the exit may already be over:
    // the animationend event was missed, so finish now.
    const exit = el?.getAnimations().find((a) => (a as CSSAnimation).animationName === "pl-exit");
    if (exit?.playState === "finished") {
      const id = requestAnimationFrame(finish);
      return () => cancelAnimationFrame(id);
    }
    el?.addEventListener("animationend", onEnd);
    // Safety net, measured from page start (not from hydration).
    const safety = window.setTimeout(finish, Math.max(0, INTRO_TOTAL_MS - performance.now()) + 400);
    return () => {
      el?.removeEventListener("animationend", onEnd);
      window.clearTimeout(safety);
      html.style.overflow = previous;
    };
  }, []);

  if (gone) return null;

  const letters = [...preloader.brandLead]
    .map((ch) => ({ ch, color: BLUE }))
    .concat([...preloader.brandTail].map((ch) => ({ ch, color: ORANGE })));

  const markImage = (
    <Image
      src={MARK.src}
      alt=""
      width={MARK.width}
      height={MARK.height}
      sizes="(min-width: 640px) 260px, 50vw"
      // Lazy: when a page turns the intro off, the hidden (display: none) overlay never fetches it.
      loading="lazy"
      className="absolute inset-0 size-full select-none"
      draggable={false}
    />
  );

  return (
    <div
      ref={overlayRef}
      aria-hidden="true"
      // 100vw/100dvh (not inset-0) so it is centred on the whole screen even while a
      // desktop scrollbar is still showing, and never shifts when scrolling locks.
      className="preloader font-brand-text fixed top-0 left-0 z-[200] grid h-dvh w-screen place-items-center bg-white"
      style={{ animation: anim("pl-exit", 0.6, EXIT, "cubic-bezier(0.4, 0, 0.2, 1)") }}
    >
      <div
        className="relative aspect-square w-[min(240px,56svh)] md:w-[min(40vw,300px,56svh)] xl:w-[min(260px,56svh)] [container-type:inline-size]"
        style={{ animation: anim("pl-badge-out", 0.6, EXIT, "cubic-bezier(0.4, 0, 0.2, 1)") }}
      >
        {/* Gradient ring: two halves drawn from the top, meeting at the bottom */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" fill="none">
          <defs>
            <linearGradient id="pl-ring-r" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#E5157A" />
              <stop offset="0.4" stopColor="#7A2FB8" />
              <stop offset="0.75" stopColor="#2563D9" />
              <stop offset="1" stopColor="#0FA3A0" />
            </linearGradient>
            <linearGradient id="pl-ring-l" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#F0592A" />
              <stop offset="0.45" stopColor="#F7941D" />
              <stop offset="0.8" stopColor="#8DB43C" />
              <stop offset="1" stopColor="#0FA3A0" />
            </linearGradient>
          </defs>
          {["M50 1.4A48.6 48.6 0 0 1 50 98.6", "M50 1.4A48.6 48.6 0 0 0 50 98.6"].map((d, i) => (
            <path
              key={d}
              d={d}
              stroke={`url(#pl-ring-${i ? "l" : "r"})`}
              strokeWidth="0.9"
              strokeLinecap="round"
              pathLength={1}
              style={{
                strokeDasharray: 1,
                strokeDashoffset: 1,
                animation: anim("pl-draw", 1.4, 0, "cubic-bezier(0.65, 0, 0.35, 1)"),
              }}
            />
          ))}
        </svg>

        <div className="absolute inset-0 flex scale-[0.86] flex-col items-center justify-center pb-[2cqw]">
          {/* Logo mark */}
          <div
            className="relative w-[48cqw] [container-type:inline-size]"
            style={{ aspectRatio: `${MARK.width} / ${MARK.height}` }}
          >
            {/* Swooshes + dots, painted in by a clockwise brush sweep (centre excluded) */}
            <div
              className="absolute inset-0"
              style={
                {
                  "--sweep": "400deg",
                  maskImage: `conic-gradient(from -75deg at ${MARK.cx} ${MARK.cy}, black calc(var(--sweep) - 16deg), transparent var(--sweep)), radial-gradient(circle ${MARK.r + 0.2}cqw at ${MARK.cx} ${MARK.cy}, transparent 98%, black 100%)`,
                  maskComposite: "intersect",
                  WebkitMaskComposite: "source-in",
                  animation: anim("pl-sweep", 1.1, 0.3, "cubic-bezier(0.5, 0, 0.3, 1)"),
                } as React.CSSProperties
              }
            >
              {markImage}
            </div>
            {/* Ribbon + hands grow out from the centre */}
            <div
              className="absolute inset-0"
              style={
                {
                  "--clip-x": MARK.cx,
                  "--clip-y": MARK.cy,
                  "--clip-r": MARK.clipR,
                  clipPath: `circle(${MARK.clipR} at ${MARK.cx} ${MARK.cy})`,
                  animation: anim("pl-center", 0.75, 1.15),
                } as React.CSSProperties
              }
            >
              {markImage}
            </div>
          </div>

          {/* Wordmark */}
          <p className="mt-[2cqw] font-brand text-[11cqw] leading-none font-bold tracking-[0.03em]">
            {letters.map((l, i) => (
              <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
                <span className="inline-block" style={{ color: l.color, animation: anim("pl-rise", 0.6, 1.4 + i * 0.055) }}>
                  {l.ch}
                </span>
              </span>
            ))}
          </p>

          {/* Tagline with rules */}
          <div className="mt-[1.8cqw] flex w-[74cqw] items-center gap-[2cqw]">
            <span className="h-[0.45cqw] flex-1 origin-right rounded-full" style={{ background: BLUE, animation: anim("pl-line", 0.6, 2.0) }} />
            <span className="text-[4cqw] leading-none font-medium whitespace-nowrap text-[#3a3f4b]" style={{ animation: anim("pl-fade-up", 0.6, 2.1) }}>
              {preloader.tagline}
            </span>
            <span className="h-[0.45cqw] flex-1 origin-left rounded-full" style={{ background: BLUE, animation: anim("pl-line", 0.6, 2.0) }} />
          </div>

          <span className="mt-[2cqw] h-px w-[58cqw] bg-[#e3e6ee]" style={{ animation: anim("pl-line", 0.6, 2.3) }} />

          {/* Values */}
          <p
            className="mt-[1.8cqw] flex items-center gap-[1.2cqw] text-[2.6cqw] leading-none font-semibold tracking-[0.16em] whitespace-nowrap"
            style={{ color: BLUE, animation: anim("pl-track", 0.8, 2.4) }}
          >
            {preloader.values.map((v, i) => (
              <React.Fragment key={v}>
                {i > 0 ? <span style={{ color: ORANGE }}>•</span> : null}
                <span>{v}</span>
              </React.Fragment>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
