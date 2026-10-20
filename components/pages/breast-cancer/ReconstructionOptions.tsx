"use client";

import * as React from "react";
import { useInView } from "motion/react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * The reconstruction sub-options as small tiles that light up one after another when
 * scrolled into view (an accent overlay fades in: opacity only). Reduced motion: lit at once.
 */
export function ReconstructionOptions({ options }: { options: readonly string[] }) {
  const ref = React.useRef<HTMLUListElement>(null);
  const lit = useInView(ref, { once: true, amount: 0.6 });

  return (
    <ul ref={ref} className="mt-5 grid gap-2.5 sm:grid-cols-3">
      {options.map((option, i) => (
        <li
          key={option}
          className="relative isolate flex min-h-14 items-center gap-2.5 overflow-hidden rounded-[14px] border border-line bg-surface px-4 py-3 text-[15px] font-semibold text-ink"
        >
          <span
            aria-hidden="true"
            className={cn("absolute inset-0 -z-10 bg-accent-soft transition-opacity duration-700", lit ? "opacity-100" : "opacity-0")}
            style={{ transitionDelay: lit ? `${0.25 + i * 0.3}s` : "0s" }}
          />
          <span
            aria-hidden="true"
            className={cn(
              "grid size-6 shrink-0 place-items-center rounded-full bg-accent text-white transition-[opacity,scale] duration-500",
              lit ? "scale-100 opacity-100" : "scale-50 opacity-0",
            )}
            style={{ transitionDelay: lit ? `${0.35 + i * 0.3}s` : "0s" }}
          >
            <Check className="size-3.5" strokeWidth={2.25} />
          </span>
          {option}
        </li>
      ))}
    </ul>
  );
}
