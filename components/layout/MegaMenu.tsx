"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { NavChild } from "@/content/site";
import { cn, focusRing } from "@/lib/utils";
import { isActivePath } from "@/lib/nav";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ActiveDot, navLinkClass } from "@/components/layout/nav-link";
import { serviceIcons, ICON_STROKE } from "@/components/layout/nav-icons";

type MegaMenuProps = {
  label: string;
  href: string;
  items: readonly NavChild[];
  onDark: boolean;
  pathname: string | null;
};

/** "Our Services" dropdown: a 2-column, ~560px panel. Radix handles Esc, outside click and arrow keys. */
export function MegaMenu({ label, href, items, onDark, pathname }: MegaMenuProps) {
  const active = [href, ...items.map((c) => c.href)].some((href) => isActivePath(pathname, href));

  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger
        data-active={active}
        className={cn(
          navLinkClass(onDark),
          focusRing,
          "bg-transparent hover:bg-transparent focus:bg-transparent data-[state=open]:bg-transparent data-[state=open]:hover:bg-transparent data-[state=open]:focus:bg-transparent",
          onDark
            ? "focus:text-white data-[state=open]:text-white"
            : "focus:text-ink data-[state=open]:text-ink",
        )}
      >
        {active ? <ActiveDot onDark={onDark} /> : null}
        {label}
      </NavigationMenuTrigger>

      <NavigationMenuContent className="on-light left-1/2 ml-[-280px] w-[560px] md:w-[560px] rounded-[20px] border-border bg-white p-2.5 shadow-card-hover">
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
                    "group/item min-h-11 flex-row items-center gap-3 rounded-xl p-2 text-ink hover:bg-surface focus:bg-surface data-[active=true]:bg-surface",
                    focusRing,
                  )}
                >
                  <Link href={child.href} prefetch={false} aria-current={current ? "page" : undefined}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/[0.07] ring-1 ring-primary/10 transition-colors duration-300 group-hover/item:bg-primary/[0.12]">
                      <Icon className="size-[18px] text-primary" strokeWidth={ICON_STROKE} aria-hidden="true" />
                    </span>
                    <span className="text-[15px] font-medium">{child.label}</span>
                  </Link>
                </NavigationMenuLink>
              </li>
            );
          })}
        </ul>

        <div className="mt-2 border-t border-border pt-2">
          <NavigationMenuLink
            asChild
            className={cn(
              "group/all min-h-11 flex-row items-center justify-between rounded-xl px-3 text-[15px] font-semibold text-primary hover:bg-surface hover:text-primary-hover focus:bg-surface focus:text-primary-hover",
              focusRing,
            )}
          >
            <Link href={href} prefetch={false}>
              {label}
              <ArrowRight
                className="size-4 text-primary transition-transform duration-300 ease-out-expo group-hover/all:translate-x-1"
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
