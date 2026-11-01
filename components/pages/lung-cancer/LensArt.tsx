import type * as React from "react";
import type { TestKey } from "@/content/pages/lung-cancer";

/** Shared stroke style of the lens drawings (viewBox 200 × 200). */
const line = {
  fill: "none",
  style: { stroke: "var(--accent)" },
  strokeWidth: 2.5,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
const soft = { ...line, style: { stroke: "var(--accent-bright)" }, strokeOpacity: 0.45, strokeWidth: 2 } as const;
/** A filled dot in a theme colour. */
const dot = (color: string) => ({ stroke: "none", style: { fill: color } });

/** Bronchoscopy: the airways, and a thin scope travelling down into the right bronchus. */
function Bronchoscopy() {
  return (
    <>
      <path {...soft} d="M100 20 V78 M100 78 C88 92 72 100 58 112 M100 78 C112 92 128 98 142 108" />
      <path
        {...soft}
        d="M58 112 C50 128 44 146 42 166 M58 112 C66 128 70 146 72 164 M142 108 C150 126 156 146 158 166 M142 108 C136 126 132 146 130 164"
      />
      <path {...line} d="M100 14 V80 C92 90 80 98 68 108" strokeWidth={3.5} />
      <circle cx="66" cy="110" r="5" {...dot("var(--accent)")} />
      <circle cx="66" cy="110" r="12" {...soft} strokeOpacity={0.6} />
      <path {...soft} d="M74 116 L90 128 M74 104 L92 98" strokeDasharray="2 5" />
    </>
  );
}

/** CT-guided biopsy: a CT slice through the chest (both lungs) and a fine needle to a small spot. */
function Biopsy() {
  return (
    <>
      <ellipse {...soft} cx="100" cy="108" rx="78" ry="56" />
      <path {...line} d="M60 74 C40 82 34 112 42 134 C50 150 74 150 86 138 C94 128 92 92 84 78 C78 70 68 70 60 74 Z" />
      <path
        {...line}
        d="M140 74 C160 82 166 112 158 134 C150 150 126 150 114 138 C106 128 108 92 116 78 C122 70 132 70 140 74 Z"
      />
      <circle cx="100" cy="122" r="7" {...soft} />
      <circle cx="140" cy="104" r="4" {...dot("var(--highlight)")} />
      <path {...line} d="M188 46 L144 101" strokeWidth={2} />
      <path {...line} d="M180 40 L196 52" strokeWidth={4} />
    </>
  );
}

/** PET-CT: the scanner ring around a calm figure; a few soft points of activity in the chest. */
function PetCt() {
  return (
    <>
      <circle {...soft} cx="100" cy="100" r="80" />
      <circle {...line} cx="100" cy="100" r="68" strokeDasharray="4 7" />
      <circle {...line} cx="100" cy="58" r="12" />
      <path {...line} d="M78 168 C76 132 80 96 100 86 C120 96 124 132 122 168" />
      <path {...soft} d="M90 104 C84 118 86 134 92 142 M110 104 C116 118 114 134 108 142" />
      <circle cx="94" cy="118" r="4.5" {...dot("var(--highlight)")} />
      <circle cx="94" cy="118" r="10" {...dot("var(--highlight)")} fillOpacity="0.18" />
      <circle cx="109" cy="128" r="3" {...dot("var(--accent-bright)")} />
    </>
  );
}

const art: Record<TestKey, () => React.JSX.Element> = { bronchoscopy: Bronchoscopy, biopsy: Biopsy, petct: PetCt };

/** One test's line art (decorative: the lens names the test in text). */
export function LensArt({ test }: { test: TestKey }) {
  const Art = art[test];
  return (
    <svg viewBox="0 0 200 200" aria-hidden="true" className="size-full overflow-visible">
      <Art />
    </svg>
  );
}
