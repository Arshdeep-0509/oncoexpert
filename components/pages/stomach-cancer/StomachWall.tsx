import type * as React from "react";
import { understanding } from "@/content/pages/stomach-cancer";
import { cn } from "@/lib/utils";
import { ScrollVar } from "@/components/ui/ScrollVar";

const { wall } = understanding;

/* A stylised stomach (260 × 300): the gullet entering at the top, the J-shaped body, the outlet to
   the right. The magnifier sits on the inner lining of the lower curve. */
const OUTER =
  "M112 6 C 112 34, 110 52, 104 66 C 70 80, 44 120, 48 170 C 52 236, 104 284, 170 282 " +
  "C 214 280, 246 252, 252 214 C 256 190, 242 174, 222 178 C 206 182, 198 198, 182 204 " +
  "C 156 212, 138 192, 138 162 C 138 124, 134 96, 128 74 C 126 50, 130 28, 130 6";
const INNER = "M118 74 C 88 88, 66 124, 70 168 C 74 222, 116 262, 168 260 C 202 258, 228 238, 232 212";
const LENS = { cx: 96, cy: 222, r: 26 };
const CLUSTER = [
  [92, 228, 4],
  [100, 222, 3.2],
  [90, 218, 2.6],
  [102, 232, 2.4],
] as const;

/** Layer fills, inner lining first (decoration, from the theme). */
const LAYER_FILL = ["bg-petal", "bg-surface-warm", "bg-accent-soft", "bg-surface"] as const;

/**
 * The stomach wall: the stomach in line art with a lens on its inner lining, and an inset where the
 * wall peels into its four layers as it scrolls through the screen (ScrollVar --p; transform only).
 * The inner lining holds the small accent cluster ("begins when cells in the stomach lining grow out
 * of control"). One image for screen readers; reduced motion shows it peeled.
 */
export function StomachWall() {
  return (
    <div
      role="img"
      aria-label={wall.a11y}
      className="grid grid-cols-1 items-center gap-6 rounded-3xl bg-surface-alt p-5 ring-1 ring-line sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] md:p-8"
    >
      <svg viewBox="0 0 260 300" className="mx-auto w-full max-w-[220px]">
        <path
          d={OUTER}
          fill="var(--surface)"
          stroke="var(--ink)"
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinejoin="round"
        />
        <path
          d={INNER}
          fill="none"
          stroke="var(--accent-bright)"
          strokeOpacity={0.6}
          strokeWidth={1.5}
          strokeDasharray="4 5"
        />
        {CLUSTER.map(([cx, cy, r]) => (
          <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill="var(--accent)" />
        ))}
        <circle {...LENS} fill="none" stroke="var(--highlight)" strokeWidth={2.5} />
        <path
          d={`M${LENS.cx + 20} ${LENS.cy - 18} L 250 120`}
          stroke="var(--highlight)"
          strokeWidth={1.5}
          strokeDasharray="3 4"
          className="hidden sm:block"
        />
      </svg>

      <ScrollVar range="view" className="gastro-u-inset relative pr-10 pb-10">
        <ol className="grid">
          {wall.layers.map((layer, i) => (
            <li
              key={layer}
              className={cn(
                "gastro-u-layer relative flex min-h-12 items-center gap-3 rounded-xl px-4 py-2.5 text-sm font-semibold text-ink ring-1 ring-line md:text-base",
                LAYER_FILL[i],
              )}
              style={{ "--i": i, zIndex: 4 - i } as React.CSSProperties}
            >
              {i === 0 ? (
                <span aria-hidden="true" className="flex shrink-0 gap-1">
                  {[0, 1, 2].map((k) => (
                    <span key={k} className={cn("rounded-full bg-accent", k === 1 ? "size-2.5" : "size-2")} />
                  ))}
                </span>
              ) : null}
              <span>{layer}</span>
            </li>
          ))}
        </ol>
        <p className="mt-6 flex items-center gap-2 text-sm font-semibold text-accent-hover md:text-base">
          <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-accent" />
          {wall.cluster}
        </p>
      </ScrollVar>
    </div>
  );
}
