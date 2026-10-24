import type * as React from "react";

/**
 * The doctor portrait's edge treatment: it sits zoomed-out on its own studio backdrop
 * (--portrait-backdrop) and fades into it. Sides fade ∩ (long top fade ∪ short fade around the
 * head, which reaches the photo's top edge). Used by DoctorPortrait and the About hero.
 */
export const portraitMaskStyle: React.CSSProperties = {
  maskImage: [
    "linear-gradient(to right, transparent, black 9%, black 91%, transparent)",
    "linear-gradient(to bottom, transparent 1.5%, black 24%)",
    "radial-gradient(ellipse 24% 18% at 50% 0%, black 55%, transparent 100%)",
  ].join(", "),
  maskComposite: "intersect, add, add",
  WebkitMaskComposite: "source-in, source-over, source-over",
};
