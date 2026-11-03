import type * as React from "react";
import type { LobeKey } from "@/content/pages/lung-cancer";
import { AIRWAY, LOBE_BOX, LOBE_SHAPES } from "@/components/pages/lung-cancer/lobes";

type LobeDiagramProps = {
  lobes: readonly { key: LobeKey; label: string }[];
  /** Lobes shown removed (hatched, lifted out). */
  removed: ReadonlySet<LobeKey>;
  /** A lobe previewed on hover (half-lifted), not yet chosen. */
  preview: LobeKey | null;
  groupLabel: string;
  selected: LobeKey | null;
  onSelect: (key: LobeKey) => void;
  onPreview: (key: LobeKey | null) => void;
};

/**
 * Both lungs as five lobe buttons (surgery.css, lu-sx-). Removed lobes are hatched and lift out;
 * the lobes kept glow. Each lobe is a focusable SVG button (Enter / Space) with its own label; a
 * mouse hovering a lobe previews it. Transitions: transform and opacity, 0.5s.
 */
export function LobeDiagram({ lobes, removed, preview, groupLabel, selected, onSelect, onPreview }: LobeDiagramProps) {
  const onKey = (key: LobeKey) => (e: React.KeyboardEvent) => {
    if (e.key !== "Enter" && e.key !== " ") return;
    e.preventDefault();
    onSelect(key);
  };

  return (
    <svg
      viewBox={`0 0 ${LOBE_BOX.width} ${LOBE_BOX.height}`}
      role="group"
      aria-label={groupLabel}
      className="lu-sx-art size-full overflow-visible"
    >
      <defs>
        <pattern id="lu-sx-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <rect width="8" height="8" style={{ fill: "var(--surface)" }} />
          <line x1="0" y1="0" x2="0" y2="8" style={{ stroke: "var(--muted)" }} strokeWidth="2.5" strokeOpacity="0.45" />
        </pattern>
      </defs>
      <path
        d={AIRWAY}
        fill="none"
        style={{ stroke: "var(--accent)" }}
        strokeWidth="7"
        strokeLinecap="round"
        strokeOpacity="0.55"
      />
      {lobes.map(({ key, label }) => {
        const shape = LOBE_SHAPES[key];
        const isRemoved = removed.has(key);
        return (
          <g
            key={key}
            role="button"
            tabIndex={0}
            aria-label={label}
            aria-pressed={selected === key}
            data-removed={isRemoved ? "" : undefined}
            data-preview={preview === key && !isRemoved ? "" : undefined}
            className="lu-sx-lobe cursor-pointer outline-none"
            style={{ "--lx": `${shape.lift[0]}px`, "--ly": `${shape.lift[1]}px` } as React.CSSProperties}
            onClick={() => onSelect(key)}
            onKeyDown={onKey(key)}
            onPointerEnter={(e) => e.pointerType === "mouse" && onPreview(key)}
            onPointerLeave={(e) => e.pointerType === "mouse" && onPreview(null)}
          >
            <path d={shape.d} className="lu-sx-glow" strokeWidth="14" strokeLinejoin="round" />
            <path d={shape.d} className="lu-sx-fill" strokeWidth="2.5" strokeLinejoin="round" />
            <path
              d={shape.d}
              className="lu-sx-hatch"
              fill="url(#lu-sx-hatch)"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />
            <path d={shape.d} className="lu-sx-focus" fill="none" strokeWidth="4" strokeLinejoin="round" />
          </g>
        );
      })}
    </svg>
  );
}
