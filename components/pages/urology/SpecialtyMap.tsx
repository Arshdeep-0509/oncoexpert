import type { SpecialtyKey } from "@/content/pages/urology";
import { cn } from "@/lib/utils";
import { HOTSPOTS, LIGHTS, MAP_BOX, SHAPES } from "@/components/pages/urology/specialty-map";
import { spStyles as s } from "@/components/pages/urology/specialties-styles";

/** Is `shape` lit for the active specialty? */
const litBy = (active: SpecialtyKey | null, shape: string) =>
  active ? (LIGHTS[active] as readonly string[]).includes(shape) : false;

/** A shape drawn twice: a soft glow (shown when lit) under the line. */
function Organ({ d, lit }: { d: string; lit: boolean }) {
  return (
    <g className={s.organ} data-lit={lit ? "" : undefined}>
      <path d={d} className={s.glow} />
      <path d={d} className={s.line} />
    </g>
  );
}

/**
 * The genitourinary map (line art, no hooks: the dashboard island passes `active`). The SVG is one
 * image with a label from content; the pins are drawn here, their buttons sit over it (the island).
 */
export function SpecialtyMap({ active, label }: { active: SpecialtyKey | null; label: string }) {
  const { prostate, markers } = SHAPES;
  return (
    <svg role="img" aria-label={label} viewBox={`0 0 ${MAP_BOX.width} ${MAP_BOX.height}`} className="size-full">
      {/* Dashboard grid and the centre line */}
      <g aria-hidden="true">
        <defs>
          <pattern id="uro-sp-grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="var(--line)" />
          </pattern>
        </defs>
        <rect width={MAP_BOX.width} height={MAP_BOX.height} fill="url(#uro-sp-grid)" />
        <path d={`M180 24 V${MAP_BOX.height - 8}`} stroke="var(--line)" strokeWidth={1} strokeDasharray="3 5" />
      </g>

      <g aria-hidden="true">
        {SHAPES.ureters.map((d) => (
          <path key={d} d={d} className={s.duct} />
        ))}
        {SHAPES.kidneys.map((d) => (
          <Organ key={d} d={d} lit={litBy(active, "kidneys")} />
        ))}
        {SHAPES.adrenals.map((d) => (
          <Organ key={d} d={d} lit={litBy(active, "adrenals")} />
        ))}
        <Organ d={SHAPES.bladder} lit={litBy(active, "bladder")} />
        <g className={s.organ} data-lit={litBy(active, "prostate") ? "" : undefined}>
          <ellipse {...prostate} className={s.glow} />
          <ellipse {...prostate} className={s.line} />
        </g>
        <g className={s.organ} data-lit={litBy(active, "urethra") ? "" : undefined}>
          <path d={SHAPES.urethra} className={s.glow} />
          <path d={SHAPES.urethra} className={cn(s.line, s.duct)} />
        </g>
        {(["testicular", "penile"] as const).map((key) => (
          <g key={key} className={s.organ} data-lit={litBy(active, key) ? "" : undefined}>
            <circle cx={markers[key].cx} cy={markers[key].cy} r={11} className={s.ring} />
            <circle cx={markers[key].cx} cy={markers[key].cy} r={4} className={s.dot} />
          </g>
        ))}
        {/* Pins */}
        {(Object.keys(HOTSPOTS) as SpecialtyKey[])
          .filter((key) => key !== "testicular" && key !== "penile")
          .map((key) => (
            <circle
              key={key}
              cx={HOTSPOTS[key].cx}
              cy={HOTSPOTS[key].cy}
              r={3}
              className={s.pin}
              data-lit={active === key ? "" : undefined}
            />
          ))}
      </g>
    </svg>
  );
}
