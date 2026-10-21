import * as React from "react";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export type ButtonVariant = "primary" | "secondary" | "ghost" | "onDark";

const base =
  "group/btn inline-flex min-h-12 items-center justify-center gap-2 rounded-pill px-6 py-3 text-[15px] leading-tight font-semibold text-balance text-center transition-[background-color,border-color,color,box-shadow] duration-300 disabled:pointer-events-none disabled:opacity-50";

const variants: Record<ButtonVariant, string> = {
  /** Solid accent pill: the main action of a section. */
  primary: "bg-accent text-white shadow-(--accent-shadow) hover:bg-accent-hover",
  /** Outline pill on light backgrounds. */
  secondary: "border border-line bg-surface text-ink hover:border-accent/40 hover:text-accent",
  /** Text-only, for tertiary actions. */
  ghost: "px-3 text-accent hover:bg-accent-soft hover:text-accent-hover",
  /** White pill on dark (plum) bands. */
  onDark: "bg-white text-ink shadow-soft hover:bg-accent-soft",
};

type CommonProps = {
  variant?: ButtonVariant;
  /** Stretch to the full width under 768px (stacked CTAs on phones). */
  fullWidthOnMobile?: boolean;
  /** Icon after the label; it nudges right on hover. */
  icon?: LucideIcon;
  /** Icon before the label (static). */
  leadingIcon?: LucideIcon;
  /** Analytics label, pushed as `cta_click` (see components/layout/AnalyticsListener). */
  cta?: string;
  className?: string;
  children: React.ReactNode;
};

type ButtonAsLink = CommonProps & { href: string } & Omit<React.ComponentProps<"a">, keyof CommonProps | "href">;
type ButtonAsButton = CommonProps & { href?: undefined } & Omit<React.ComponentProps<"button">, keyof CommonProps>;

export type ButtonProps = ButtonAsLink | ButtonAsButton;

export function buttonClasses({
  variant = "primary",
  fullWidthOnMobile = false,
  className,
}: Pick<CommonProps, "variant" | "fullWidthOnMobile" | "className"> = {}) {
  return cn(base, variants[variant], fullWidthOnMobile && "w-full md:w-auto", className);
}

/**
 * Pill button / link. With `href` it renders a link: next/link for site paths,
 * a plain <a> for tel:, mailto:, external URLs and in-page #anchors.
 */
export function Button(props: ButtonProps) {
  const { variant, fullWidthOnMobile, icon: Icon, leadingIcon: Lead, cta, className, children, ...rest } = props;
  const classes = buttonClasses({ variant, fullWidthOnMobile, className });
  const content = (
    <>
      {Lead ? <Lead className="size-[18px] shrink-0" strokeWidth={1.75} aria-hidden="true" /> : null}
      <span>{children}</span>
      {Icon ? (
        <Icon
          className="size-[18px] shrink-0 transition-transform duration-300 ease-out-expo group-hover/btn:translate-x-1"
          strokeWidth={1.75}
          aria-hidden="true"
        />
      ) : null}
    </>
  );

  if (rest.href !== undefined) {
    const { href, ...anchorProps } = rest as ButtonAsLink;
    const plain = /^(tel:|mailto:|https?:|#)/.test(href);
    if (plain) {
      const external = /^https?:/.test(href);
      return (
        <a
          href={href}
          data-cta={cta}
          className={classes}
          {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          {...anchorProps}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} prefetch={false} data-cta={cta} className={classes} {...anchorProps}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as Omit<ButtonAsButton, keyof CommonProps>;
  return (
    <button type="button" data-cta={cta} className={classes} {...buttonProps}>
      {content}
    </button>
  );
}
