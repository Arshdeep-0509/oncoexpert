import type { CSSProperties } from "react";

/**
 * Fades the edges a photo's subject runs off (e.g. the arms photo is cut at its top
 * and left), so the cut never reads as a hard line on the page.
 */
export function bleedFade(image: object, size = "28%"): CSSProperties | undefined {
  if (!("bleed" in image) || image.bleed !== "top-left") return undefined;
  const mask = `linear-gradient(to right, transparent, black ${size}), linear-gradient(to bottom, transparent, black ${size})`;
  return { maskImage: mask, maskComposite: "intersect", WebkitMaskComposite: "source-in" };
}
