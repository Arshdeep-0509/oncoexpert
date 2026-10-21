"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { Ribbon } from "lucide-react";
import type { Treatment } from "@/content/pages/breast-cancer";
import { cn } from "@/lib/utils";
import { treatmentIcons } from "@/components/pages/breast-cancer/treatment-icons";

type MultimodalityDiagramProps = {
  label: string;
  centre: string;
  nodes: readonly { key: Treatment; label: string }[];
};

// Node centres in % of the desktop diagram box (centre at 50/50).
const POSITIONS = [
  { x: 15, y: 22 },
  { x: 85, y: 22 },
  { x: 15, y: 78 },
  { x: 85, y: 78 },
] as const;

const ease = "ease-[cubic-bezier(0.22,1,0.36,1)]";

/**
 * "Your care plan" at the centre, the four treatments around it.
 * md+: nodes joined to the centre by thin accent lines that draw in on scroll (scaleX); nodes pop
 * in one by one; hovering a node highlights its line.
 * Phones: a 2×2 grid of tiles around a small centre badge (no lines).
 */
export function MultimodalityDiagram({ label, centre, nodes }: MultimodalityDiagramProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.35 });
  const [hovered, setHovered] = React.useState<number | null>(null);
  // Line lengths/angles depend on the box size (nodes are placed in %).
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<{ w: number; h: number } | null>(null);
  React.useEffect(() => {
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <figure ref={ref} aria-label={label} data-in={inView ? "" : undefined} className="group/d relative">
      {/* ---------- md+: centre, lines, nodes ---------- */}
      <div ref={boxRef} className="relative hidden h-[400px] md:block lg:h-[420px]">
        {/* Lines: thin bars from the centre to each node, drawn in with scaleX (transform only). */}
        {size
          ? POSITIONS.map((p, i) => {
              const dx = ((p.x - 50) / 100) * size.w;
              const dy = ((p.y - 50) / 100) * size.h;
              const length = Math.hypot(dx, dy);
              const angle = (Math.atan2(dy, dx) * 180) / Math.PI;
              const active = hovered === i;
              return (
                <span
                  key={i}
                  aria-hidden="true"
                  className={cn(
                    "absolute top-1/2 left-1/2 h-0.5 origin-left rounded-full bg-accent transition-[transform,opacity] duration-1000",
                    ease,
                    active ? "opacity-100" : hovered === null ? "opacity-40" : "opacity-15",
                  )}
                  style={{
                    width: length,
                    marginTop: -1,
                    transform: `rotate(${angle}deg) scaleX(${inView ? 1 : 0}) scaleY(${active ? 1.4 : 0.65})`,
                    transitionDelay: inView && hovered === null ? `${i * 0.12}s` : "0s",
                  }}
                />
              );
            })
          : null}

        {/* Centre */}
        <div className="absolute top-1/2 left-1/2 grid size-[184px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface-alt ring-1 shadow-soft ring-line lg:size-[200px]">
          <div className="absolute inset-3 rounded-full border border-dashed border-accent/30" aria-hidden="true" />
          <div className="relative flex flex-col items-center gap-2 px-6 text-center">
            <span className="grid size-11 place-items-center rounded-full bg-accent text-white shadow-(--accent-shadow)">
              <Ribbon className="size-5" strokeWidth={1.75} aria-hidden="true" />
            </span>
            <span className="font-display text-xl leading-tight text-ink">{centre}</span>
          </div>
        </div>

        {/* Nodes */}
        <ul>
          {nodes.map((node, i) => {
            const Icon = treatmentIcons[node.key];
            const p = POSITIONS[i];
            return (
              <li
                key={node.key}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div
                  className={cn(
                    "flex w-[200px] scale-90 items-center gap-3 rounded-lg bg-surface px-4 py-3.5 opacity-0 ring-1 transition-[scale,opacity,box-shadow] duration-500 group-data-[in]/d:scale-100 group-data-[in]/d:opacity-100 lg:w-[230px]",
                    ease,
                    hovered === i ? "shadow-soft-lg ring-accent/40" : "shadow-soft ring-line",
                  )}
                  style={{ transitionDelay: inView ? `${0.4 + i * 0.12}s` : "0s" }}
                >
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-[12px] transition-colors duration-300",
                      hovered === i ? "bg-accent text-white" : "bg-accent-soft text-accent",
                    )}
                  >
                    <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <span className="text-base font-semibold text-ink">{node.label}</span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ---------- phones: 2×2 tiles around a centre badge ---------- */}
      <div className="relative md:hidden">
        <ul className="grid grid-cols-2 gap-3">
          {nodes.map((node, i) => {
            const Icon = treatmentIcons[node.key];
            const right = i % 2 === 1;
            const bottom = i >= 2;
            return (
              <li
                key={node.key}
                className={cn(
                  "flex min-h-[124px] scale-90 flex-col gap-2.5 rounded-lg bg-surface-alt p-4 opacity-0 ring-1 ring-line transition-[scale,opacity] duration-500 group-data-[in]/d:scale-100 group-data-[in]/d:opacity-100",
                  ease,
                  right ? "items-end text-right" : "items-start",
                  bottom ? "justify-end" : "justify-start",
                )}
                style={{ transitionDelay: inView ? `${i * 0.1}s` : "0s" }}
              >
                <span className="grid size-10 place-items-center rounded-[12px] bg-accent-soft text-accent">
                  <Icon className="size-5" strokeWidth={1.75} aria-hidden="true" />
                </span>
                <span className="text-[15px] font-semibold text-ink">{node.label}</span>
              </li>
            );
          })}
        </ul>
        <div className="absolute top-1/2 left-1/2 grid size-[92px] -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-surface text-center ring-4 shadow-soft ring-surface">
          <div className="flex flex-col items-center gap-1 px-2">
            <Ribbon className="size-4 text-accent" strokeWidth={1.75} aria-hidden="true" />
            <span className="text-[11px] leading-tight font-semibold text-ink">{centre}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}
