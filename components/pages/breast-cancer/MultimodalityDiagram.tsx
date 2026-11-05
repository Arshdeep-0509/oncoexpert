"use client";

import * as React from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play, Ribbon } from "lucide-react";
import type { Treatment } from "@/content/pages/breast-cancer";
import { cn } from "@/lib/utils";
import { treatmentIcons } from "@/components/pages/breast-cancer/treatment-icons";
import "@/components/pages/breast-cancer/care-plan.css";

type MultimodalityDiagramProps = {
  label: string;
  centre: string;
  nodes: readonly { key: Treatment; label: string }[];
  a11y: { pause: string; play: string };
};

/** Wait for the entrance before the first treatment lights, then one treatment per beat. */
const FIRST_BEAT_MS = 1500;
const BEAT_MS = 2600;

/** A curve from a tile's edge to the rim of the hub, in the box's pixels. */
function connector(tile: DOMRect, hub: DOMRect, box: DOMRect) {
  const hubX = hub.left + hub.width / 2 - box.left;
  const hubY = hub.top + hub.height / 2 - box.top;
  const left = tile.left - box.left;
  const top = tile.top - box.top;
  const beside = tile.right <= hub.left || tile.left >= hub.right;

  // Beside the hub (md+): leave from the tile's inner side. Above or below it (phones): from its
  // top or bottom edge.
  const startX = beside ? (left < hubX ? left + tile.width : left) : left + tile.width / 2;
  const startY = beside ? top + tile.height / 2 : top < hubY ? top + tile.height : top;

  const angle = Math.atan2(startY - hubY, startX - hubX);
  const endX = hubX + Math.cos(angle) * (hub.width / 2);
  const endY = hubY + Math.sin(angle) * (hub.height / 2);
  const bendX = beside ? endX : startX;
  const bendY = beside ? startY : endY;
  return `M ${startX} ${startY} Q ${bendX} ${bendY} ${endX} ${endY}`;
}

/**
 * "Your care plan" at the centre, the four treatments feeding into it. On scroll the hub and tiles
 * pop in and the connectors draw. Then each treatment lights in turn: a pulse runs down its
 * connector and the hub ripples when it arrives. Hovering a tile holds it lit. The loop stops
 * off-screen and with the pause button; reduced motion shows the finished diagram (care-plan.css).
 */
export function MultimodalityDiagram({ label, centre, nodes, a11y }: MultimodalityDiagramProps) {
  const reduce = useReducedMotion();
  const figureRef = React.useRef<HTMLElement>(null);
  const boxRef = React.useRef<HTMLDivElement>(null);
  const hubRef = React.useRef<HTMLDivElement>(null);
  const tileRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const revealed = useInView(figureRef, { once: true, amount: 0.35 });
  const onScreen = useInView(figureRef, { amount: 0.1 });

  const [geo, setGeo] = React.useState<{ w: number; h: number; paths: string[] } | null>(null);
  const [beat, setBeat] = React.useState(-1);
  const [held, setHeld] = React.useState<number | null>(null);
  const [userPaused, setUserPaused] = React.useState(false);

  // The connectors follow the measured tiles, so they meet them at every screen size.
  React.useEffect(() => {
    const boxEl = boxRef.current;
    const hubEl = hubRef.current;
    if (!boxEl || !hubEl) return;
    const measure = () => {
      const box = boxEl.getBoundingClientRect();
      const hub = hubEl.getBoundingClientRect();
      const paths = tileRefs.current.flatMap((tile) =>
        tile ? [connector(tile.getBoundingClientRect(), hub, box)] : [],
      );
      setGeo({ w: box.width, h: box.height, paths });
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(boxEl);
    return () => ro.disconnect();
  }, []);

  const running = revealed && onScreen && !userPaused && !reduce && held === null;
  React.useEffect(() => {
    if (!running) return;
    const id = setTimeout(() => setBeat((b) => b + 1), beat < 0 ? FIRST_BEAT_MS : BEAT_MS);
    return () => clearTimeout(id);
  }, [running, beat]);

  const cycled = beat >= 0 && !reduce ? beat % nodes.length : null;
  const active = held ?? cycled;

  return (
    <figure
      ref={figureRef}
      aria-label={label}
      data-in={revealed ? "" : undefined}
      data-paused={userPaused || !onScreen ? "" : undefined}
      className="cplan"
    >
      <div ref={boxRef} className="relative mx-auto max-w-[920px]">
        {geo ? (
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-visible"
            width={geo.w}
            height={geo.h}
            viewBox={`0 0 ${geo.w} ${geo.h}`}
          >
            {geo.paths.map((d, i) => (
              <g key={i} fill="none">
                <path d={d} className="cplan-track" />
                <path
                  d={d}
                  pathLength={1}
                  className="cplan-line"
                  data-active={active === i ? "" : undefined}
                  style={{ "--i": i } as React.CSSProperties}
                />
                {running && cycled === i ? <path key={beat} d={d} pathLength={1} className="cplan-pulse" /> : null}
              </g>
            ))}
          </svg>
        ) : null}

        <ul className="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[136px] md:gap-y-[172px]">
          {nodes.map((node, i) => {
            const Icon = treatmentIcons[node.key];
            const right = i % 2 === 1;
            const lit = active === i;
            return (
              <li
                key={node.key}
                ref={(el) => {
                  tileRefs.current[i] = el;
                }}
                onMouseEnter={() => setHeld(i)}
                onMouseLeave={() => setHeld(null)}
                className={cn("min-w-0", right ? "md:justify-self-end" : "md:justify-self-start")}
              >
                <div
                  data-active={lit ? "" : undefined}
                  style={{ "--i": i } as React.CSSProperties}
                  className={cn(
                    "cplan-tile flex min-h-[104px] flex-col justify-center gap-2.5 rounded-lg bg-surface p-3.5 ring-1 transition-[box-shadow,translate] duration-300",
                    "md:min-h-0 md:w-[200px] md:flex-row md:items-center md:justify-start md:gap-3 md:px-4 md:py-3.5 lg:w-[230px]",
                    right ? "max-md:items-end max-md:text-right" : "max-md:items-start",
                    lit ? "shadow-soft-lg ring-accent/40" : "shadow-soft ring-line",
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-[12px] transition-colors duration-300 md:size-11",
                      lit ? "bg-accent text-white" : "bg-accent-soft text-accent",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-[14px] font-semibold text-ink md:text-base">{node.label}</span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* The hub. Its outer box stays unscaled, so the connectors can measure it during the entrance. */}
        <div
          ref={hubRef}
          className="absolute top-1/2 left-1/2 z-10 size-[120px] -translate-x-1/2 -translate-y-1/2 md:size-[184px] lg:size-[200px]"
        >
          <div className="cplan-hub relative grid size-full place-items-center rounded-full bg-surface-alt ring-1 shadow-soft ring-line">
            {running && cycled !== null ? <span key={beat} aria-hidden="true" className="cplan-ripple" /> : null}
            <span aria-hidden="true" className="cplan-orbit" />
            <div className="relative flex flex-col items-center gap-1 px-4 text-center md:gap-2 md:px-6">
              <span className="grid size-8 place-items-center rounded-full bg-accent text-white shadow-(--accent-shadow) md:size-11">
                <Ribbon className="size-4 md:size-5" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <span className="text-[12px] leading-tight font-semibold text-ink md:font-display md:text-xl md:font-normal">
                {centre}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden by CSS, not by `reduce`: the server can't know the setting, so the markup must match. */}
      <div className="mx-auto mt-4 flex max-w-[920px] justify-end motion-reduce:hidden">
        <button
          type="button"
          onClick={() => setUserPaused((p) => !p)}
          aria-label={userPaused ? a11y.play : a11y.pause}
          className="grid size-11 place-items-center rounded-full bg-surface text-muted ring-1 ring-line transition-colors outline-none hover:text-accent focus-visible:ring-2 focus-visible:ring-accent"
        >
          {userPaused ? (
            <Play className="size-4" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <Pause className="size-4" strokeWidth={1.75} aria-hidden="true" />
          )}
        </button>
      </div>
    </figure>
  );
}
