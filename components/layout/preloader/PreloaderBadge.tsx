import type * as React from "react";
import { Fragment } from "react";
import Image from "next/image";
import { site } from "@/content/site";
import { BLUE, EXIT, MARK, ORANGE, anim } from "@/components/layout/preloader/preloader-anim";

/**
 * The intro badge: gradient ring, logo mark, wordmark, tagline and values. Static markup;
 * every step is a CSS animation, so it plays from first paint, even without JS.
 */
export function PreloaderBadge() {
  const { preloader } = site;
  const letters = [...preloader.brandLead]
    .map((ch) => ({ ch, color: BLUE }))
    .concat([...preloader.brandTail].map((ch) => ({ ch, color: ORANGE })));

  const markImage = (
    <Image
      src={MARK.src}
      alt=""
      aria-hidden="true"
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
      className="[container-type:inline-size] relative aspect-square w-[min(240px,56svh)] md:w-[min(40vw,300px,56svh)] xl:w-[min(260px,56svh)]"
      style={{ animation: anim("pl-badge-out", 0.6, EXIT, "cubic-bezier(0.4, 0, 0.2, 1)") }}
    >
      {/* Gradient ring: two halves drawn from the top, meeting at the bottom */}
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" fill="none">
        <defs>
          <linearGradient id="pl-ring-r" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--logo-ring-right-1)" }} />
            <stop offset="0.4" style={{ stopColor: "var(--logo-ring-right-2)" }} />
            <stop offset="0.75" style={{ stopColor: "var(--logo-ring-right-3)" }} />
            <stop offset="1" style={{ stopColor: "var(--logo-ring-end)" }} />
          </linearGradient>
          <linearGradient id="pl-ring-l" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" style={{ stopColor: "var(--logo-ring-left-1)" }} />
            <stop offset="0.45" style={{ stopColor: "var(--logo-ring-left-2)" }} />
            <stop offset="0.8" style={{ stopColor: "var(--logo-ring-left-3)" }} />
            <stop offset="1" style={{ stopColor: "var(--logo-ring-end)" }} />
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
          className="[container-type:inline-size] relative w-[48cqw]"
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
              <span
                className="inline-block"
                style={{ color: l.color, animation: anim("pl-rise", 0.6, 1.4 + i * 0.055) }}
              >
                {l.ch}
              </span>
            </span>
          ))}
        </p>

        {/* Tagline with rules */}
        <div className="mt-[1.8cqw] flex w-[74cqw] items-center gap-[2cqw]">
          <span
            className="h-[0.45cqw] flex-1 origin-right rounded-full"
            style={{ background: BLUE, animation: anim("pl-line", 0.6, 2.0) }}
          />
          <span
            className="text-[4cqw] leading-none font-medium whitespace-nowrap text-(--preloader-text)"
            style={{ animation: anim("pl-fade-up", 0.6, 2.1) }}
          >
            {preloader.tagline}
          </span>
          <span
            className="h-[0.45cqw] flex-1 origin-left rounded-full"
            style={{ background: BLUE, animation: anim("pl-line", 0.6, 2.0) }}
          />
        </div>

        <span
          className="mt-[2cqw] h-px w-[58cqw] bg-(--preloader-line)"
          style={{ animation: anim("pl-line", 0.6, 2.3) }}
        />

        {/* Values */}
        <p
          className="mt-[1.8cqw] flex items-center gap-[1.2cqw] text-[2.6cqw] leading-none font-semibold tracking-[0.16em] whitespace-nowrap"
          style={{ color: BLUE, animation: anim("pl-track", 0.8, 2.4) }}
        >
          {preloader.values.map((v, i) => (
            <Fragment key={v}>
              {i > 0 ? <span style={{ color: ORANGE }}>•</span> : null}
              <span>{v}</span>
            </Fragment>
          ))}
        </p>
      </div>
    </div>
  );
}
