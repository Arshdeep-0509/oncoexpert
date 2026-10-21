import type { SectionLook } from "@/content/types";

/**
 * Text styles used by several sections. A variant map rather than components because
 * the elements vary (h2 / p) and some sit inside staggered reveals, where each child
 * must be its own element.
 */
export const textStyles = {
  /** An h2 directly under an <Eyebrow>, when SectionHeading can't be used (e.g. staggered reveals). */
  title: { soft: "heading-2 mt-4 text-ink", classic: "type-h2 mt-4 text-ink" } satisfies Record<SectionLook, string>,
  /** Body copy under a card's title. */
  cardBody: "mt-2 text-[15px] leading-relaxed text-muted",
} as const;
