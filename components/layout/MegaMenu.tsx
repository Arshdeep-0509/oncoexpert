"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, type NavChild } from "@/content/site";
import type { HeaderVariant } from "@/content/types";
import { cn, focusRing } from "@/lib/utils";
import { isActivePath } from "@/lib/nav";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ActiveDot } from "@/components/layout/ActiveDot";
import { navLinkClass } from "@/components/layout/nav-link";
import { serviceIcons, ICON_STROKE } from "@/components/layout/nav-icons";

type MegaMenuProps = {
  label: string;
  href: string;
  items: readonly NavChild[];
  onDark: boolean;
  pathname: string | null;
  variant: HeaderVariant;
};

/** Per-variant panel styles ("dark" is the robotic page's original panel). */
const PANEL = {
  dark: {
    content: "ml-[-280px] w-[560px] md:w-[560px]",
    tile: "rounded-xl bg-accent/[0.07] ring-1 ring-accent/10 group-hover/item:bg-accent/[0.12]",
    triggerDot: true,
  },
  light: {
    content: "ml-[-290px] w-[580px] md:w-[580px]",
    tile: "rounded-[12px] bg-accent-soft group-hover/item:bg-accent group-hover/item:text-white",
    triggerDot: false,
  },
} as const;

/**
 * "Our Services" dropdown: a 2-column panel with a footer row linking to the services page.
 * Radix handles Esc, outside click, arrow keys and focus; it opens with fade + 8px slide.
 */
export function MegaMenu({ label, href, items, onDark, pathname, variant }: MegaMenuProps) {
  const active = [href, ...items.map((c) => c.href)].some((href) => isActivePath(pathname, href));
  const panel = PANEL[variant];

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        data-active={active}
        className={cn(
          navLinkClass(onDark),
          focusRing,
          "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent",
          onDark ? "focus:text-white data-[state=open]:text-white" : "focus:text-ink data-[state=open]:text-ink",
        )}
      >
        {active && panel.triggerDot ? <ActiveDot onDark={onDark} /> : null}
        {label}
      </NavigationMenuTrigger>

      <NavigationMenuContent
        className={cn("on-light left-1/2 rounded-[20px] border-line bg-white p-2.5 shadow-card-hover", panel.content)}
      >
        <ul className="grid grid-cols-2 gap-1">
          {items.map((child) => {
            const Icon = serviceIcons[child.icon];
            const current = isActivePath(pathname, child.href);
            return (
              <li key={child.href}>
                <NavigationMenuLink
                  asChild
                  active={current}
                  className={cn(
                    "group/item min-h-11 flex-row items-center gap-3 rounded-xl p-2 text-ink hover:bg-surface-alt focus:bg-surface-alt data-[active=true]:bg-surface-alt",
                    focusRing,
                  )}
                >
                  <Link href={child.href} prefetch={false} aria-current={current ? "page" : undefined}>
                    <span
                      className={cn(
                        "grid size-10 shrink-0 place-items-center text-accent transition-colors duration-300",
                        panel.tile,
                      )}
                    >
                      <Icon className="size-[18px] text-current" strokeWidth={ICON_STROKE} aria-hidden="true" />
                    </span>
                    <span className="text-[15px] font-medium">{child.label}</span>
                    {current && variant === "light" ? (
                      <>
                        <span aria-hidden="true" className="-ml-1 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span className="sr-only">({site.a11y.youAreHere})</span>
                      </>
                    ) : null}
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>

        <div className="mt-2 border-t border-line pt-2">
          <NavigationMenuLink
            asChild
            className={cn(
              "group/all min-h-11 flex-row items-center justify-between rounded-xl px-3 text-[15px] font-semibold text-accent hover:bg-surface-alt hover:text-accent-hover focus:bg-surface-alt focus:text-accent-hover",
              focusRing,
            )}
          >
            <Link href={href} prefetch={false}>
              {label}
              <ArrowRight
                className="size-4 text-accent transition-transform duration-300 ease-out-expo group-hover/all:translate-x-1"
                strokeWidth={ICON_STROKE}
                aria-hidden="true"
              />
            </Link>
          </NavigationMenuLink>
        </div>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
