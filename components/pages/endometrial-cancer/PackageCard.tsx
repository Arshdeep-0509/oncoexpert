import type * as React from "react";
import { packages, type PackagesContent } from "@/content/pages/endometrial-cancer";
import { cn } from "@/lib/utils";
import { Counter } from "@/components/ui/Counter";
import { AppointmentButton } from "@/components/shared/AppointmentButton";

type Package = PackagesContent["packages"][number];

/**
 * One care package: name, line, the price (counts up from 0; formatted from the number, en-IN
 * grouping: ₹1,90,000), "Starting at", the three features (their checks draw in turn) and the
 * button (opens the form with the package as its note). The featured card has a gradient border,
 * the "Premium" ribbon and the primary button. Tablets: a wide card, text left and features right.
 */
export function PackageCard({ pkg, id }: { pkg: Package; id: string }) {
  const featured = "featured" in pkg && pkg.featured;
  return (
    <div className={cn("h-full", featured && "rounded-[26px] bg-(image:--grad-accent) p-[2px] shadow-soft-lg")}>
      <article
        aria-labelledby={id}
        className={cn(
          "relative flex h-full flex-col rounded-3xl bg-surface p-6 md:grid md:grid-cols-2 md:grid-rows-[auto_1fr] md:gap-x-10 md:p-8 lg:flex",
          !featured && "border border-line shadow-soft-sm",
        )}
      >
        {featured ? (
          <p className="absolute top-5 right-5 rounded-pill bg-ink px-3 py-1 text-xs font-semibold tracking-[0.14em] text-white uppercase">
            {packages.ribbon}
          </p>
        ) : null}
        <div className="md:col-start-1 md:row-start-1">
          <h3 id={id} className="pr-24 font-display text-2xl leading-tight text-ink">
            {pkg.name}
          </h3>
          <p className="mt-2 text-[15px] leading-relaxed text-muted">{pkg.body}</p>
          <p className="mt-6 font-display text-[2.5rem] leading-none font-semibold text-ink md:text-[2.75rem]">
            <Counter value={pkg.amount} prefix="₹" duration={1.4} delay={0.25} reserveWidth />
          </p>
          <p className="mt-2 text-sm font-semibold tracking-[0.04em] text-accent">{packages.priceLabel}</p>
        </div>

        <ul className="mt-6 grid gap-3 border-t border-line pt-6 md:col-start-2 md:row-span-2 md:row-start-1 md:mt-0 md:self-center md:border-t-0 md:border-l md:pt-0 md:pl-10 lg:mt-6 lg:self-auto lg:border-t lg:border-l-0 lg:pt-6 lg:pl-0">
          {pkg.features.map((f, i) => (
            <li key={f} className="flex items-start gap-3 text-[15px] leading-snug text-text">
              <span className="mt-px grid size-5 shrink-0 place-items-center rounded-full bg-accent-soft">
                <svg
                  viewBox="0 0 16 16"
                  aria-hidden="true"
                  className="epk-check size-3.5"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <path
                    d="M3.5 8.5 L6.5 11.5 L12.5 4.5"
                    pathLength={1}
                    fill="none"
                    style={{ stroke: "var(--accent)" }}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-8 md:col-start-1 md:row-start-2 md:mt-6 md:self-end lg:mt-auto lg:self-auto lg:pt-8">
          <AppointmentButton
            {...pkg.cta}
            cta={`${pkg.cta.label} (${pkg.name})`}
            variant={featured ? "primary" : "secondary"}
            arrow
            className="w-full"
          />
        </div>
      </article>
    </div>
  );
}
