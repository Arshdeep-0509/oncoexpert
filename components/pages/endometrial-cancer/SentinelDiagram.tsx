"use client";

import * as React from "react";
import { RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

/** The lymph paths from the uterus (viewBox 360 × 320) and the nodes on them. */
const LEFT = "M162 112 C130 142 112 172 104 205 C98 232 92 255 80 282";
const RIGHT = "M198 112 C230 142 248 172 256 205 C262 232 268 255 280 282";
const CENTRE = "M180 132 C180 172 180 212 180 250";
/** The tracer's way: from the uterus to the first node on the left path, the sentinel node. */
const TO_SENTINEL = "M162 112 C130 142 112 172 104 205";
const NODES = [
  { x: 104, y: 205, sentinel: true },
  { x: 80, y: 282 },
  { x: 256, y: 205 },
  { x: 280, y: 282 },
  { x: 180, y: 250 },
] as const;

type SentinelDiagramProps = { labels: { tracer: string; sentinel: string; label: string; replay: string } };

/**
 * The ICG explainer (sentinel.css): the lymph paths draw, a green tracer travels to the first
 * node, which lights up as the sentinel node. Plays once when it comes into view; Replay plays it
 * again (the drawing is re-mounted, so its animations restart). Reduced motion: the final state.
 */
export function SentinelDiagram({ labels }: SentinelDiagramProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [play, setPlay] = React.useState(false);
  const [run, setRun] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setPlay(true);
        io.disconnect();
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="flex flex-col">
      <div
        className="exn-diagram rounded-xl bg-surface p-4 ring-1 shadow-soft ring-line md:p-6"
        data-play={play ? "" : undefined}
      >
        <svg key={run} viewBox="0 0 360 320" role="img" aria-label={labels.label} className="w-full overflow-visible">
          {/* uterus */}
          <path
            d="M150 62 C150 50 162 44 180 44 C198 44 210 50 210 62 C210 96 196 120 187 132 L173 132 C164 120 150 96 150 62Z"
            style={{ fill: "var(--accent-soft)", stroke: "var(--accent-bright)" }}
            strokeWidth="2.5"
          />
          {/* lymph paths */}
          {[LEFT, RIGHT, CENTRE].map((d) => (
            <path
              key={d}
              className="exn-path"
              d={d}
              pathLength={1}
              fill="none"
              style={{ stroke: "var(--line)" }}
              strokeWidth="5"
              strokeLinecap="round"
            />
          ))}
          {/* the tracer's trail, and its travelling glow */}
          <path
            className="exn-trail"
            d={TO_SENTINEL}
            pathLength={1}
            fill="none"
            style={{ stroke: "var(--tracer)" }}
            strokeOpacity="0.55"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            className="exn-glow"
            d={TO_SENTINEL}
            pathLength={1}
            fill="none"
            style={{ stroke: "var(--tracer)" }}
            strokeWidth="10"
            strokeLinecap="round"
          />
          {/* nodes */}
          {NODES.map((n) => (
            <circle
              key={`${n.x}-${n.y}`}
              cx={n.x}
              cy={n.y}
              r="9"
              style={{ fill: "var(--surface)", stroke: "var(--muted)" }}
              strokeOpacity="0.5"
              strokeWidth="2"
            />
          ))}
          {/* the sentinel node lights up, with two pulses */}
          <circle
            className="exn-pulse"
            cx="104"
            cy="205"
            r="11"
            fill="none"
            style={{ stroke: "var(--tracer)" }}
            strokeWidth="2.5"
          />
          <g className="exn-lit">
            <circle cx="104" cy="205" r="20" style={{ fill: "var(--tracer)" }} fillOpacity="0.2" />
            <circle cx="104" cy="205" r="10" style={{ fill: "var(--tracer)" }} />
          </g>
          {/* labels */}
          <g className="exn-label" style={{ fill: "var(--text)" }} fontSize="14" fontWeight="600">
            <text x="112" y="150" textAnchor="end">
              {labels.tracer}
            </text>
            <text x="128" y="210">
              {labels.sentinel}
            </text>
          </g>
        </svg>
      </div>
      <button
        type="button"
        onClick={() => {
          setPlay(true);
          setRun((r) => r + 1);
        }}
        className={cn(
          "mt-3 inline-flex min-h-12 items-center gap-2 self-end rounded-pill bg-surface px-4 text-sm font-semibold text-accent ring-1 shadow-soft-sm ring-line transition-colors hover:bg-accent-soft motion-reduce:hidden",
        )}
      >
        <RotateCcw className="size-4" strokeWidth={1.75} aria-hidden="true" />
        {labels.replay}
      </button>
    </div>
  );
}
