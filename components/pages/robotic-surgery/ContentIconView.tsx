import { createElement } from "react";
import { Sparkles, type LucideProps } from "lucide-react";
import { contentIcons, type ContentIcon } from "@/components/pages/robotic-surgery/content-icons";

/** Renders the lucide icon for a content key (stroke width 1.75, decorative by default). */
export function ContentIconView({ name, ...props }: { name: string } & LucideProps) {
  return createElement(contentIcons[name as ContentIcon] ?? Sparkles, {
    strokeWidth: 1.75,
    "aria-hidden": true,
    ...props,
  });
}
