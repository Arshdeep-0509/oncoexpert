import { cn } from "@/lib/utils";
import { pillPrimary } from "@/components/robotic/ui/buttons";
import { AppointmentFormPlaceholder as SharedPlaceholder, type FormStyles } from "@/components/shared/appointment/form-ui";

// The form itself is shared by every page (components/shared/appointment). These are the
// robotic page's original field styles, passed in so its look is unchanged.

export { Field, formCopy } from "@/components/shared/appointment/form-ui";

export const inputClass =
  "h-12 w-full rounded-xl border border-border bg-white px-4 text-base text-ink transition-colors placeholder:text-muted/70 hover:border-muted/50 focus-visible:border-primary aria-[invalid=true]:border-destructive";

export const submitClass = cn(pillPrimary, "mt-1 h-14 w-full disabled:opacity-70");

export const roboticFormStyles: FormStyles = { input: inputClass, select: "!h-12", submit: submitClass };

export function AppointmentFormPlaceholder() {
  return <SharedPlaceholder styles={roboticFormStyles} />;
}
