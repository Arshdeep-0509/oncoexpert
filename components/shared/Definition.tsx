import type * as React from "react";
import { approvals } from "@/content/shared/approvals";
import { cn } from "@/lib/utils";

type DefinitionProps = {
  /** The page's NEW one-sentence answer: who, what, where (content/pages/<page>.seo.ts). */
  text: string;
  onDark?: boolean;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * The plain one-sentence definition under a page's H1 ("Dr. Sunil Navalgund, a surgical
 * oncologist in Bengaluru, treats …"), marked speakable. Renders nothing until the doctor
 * approves the definitions (approvals.definitions).
 */
export function Definition({ text, onDark = false, className, style }: DefinitionProps) {
  if (!approvals.definitions) return null;
  return (
    <p
      data-speakable
      className={cn("measure text-base", onDark ? "text-white/75" : "text-muted", className)}
      style={style}
    >
      {text}
    </p>
  );
}
