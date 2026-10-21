import { cn } from "@/lib/utils";
import { pills } from "@/components/pages/robotic-surgery/pills";
import type { FormStyles } from "@/components/shared/appointment/form";

// The form itself is shared by every page (components/shared/appointment). These are the
// robotic page's original field styles, passed in so its look is unchanged.

const inputClass =
  "h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-ink transition-colors placeholder:text-muted/70 hover:border-muted/50 focus-visible:border-primary aria-[invalid=true]:border-destructive";

const submitClass = cn(pills.primary, "mt-1 h-14 w-full disabled:opacity-70");

export const roboticFormStyles: FormStyles = { input: inputClass, select: "!h-12", submit: submitClass };
