"use client";

import Link from "next/link";
import { site } from "@/content/site";
import type { HeaderVariant } from "@/content/types";
import { isActivePath, prefetchFor } from "@/lib/nav";
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { ActiveDot } from "@/components/layout/ActiveDot";
import { navLinkClass } from "@/components/layout/nav-link";
import { headerVariants } from "@/components/layout/header/header-variants";

/** Desktop links (lg+): plain links plus a mega menu for items with children. */
export function DesktopNav({
  current,
  onDark,
  variant,
}: {
  current: string | null;
  onDark: boolean;
  variant: HeaderVariant;
}) {
  const v = headerVariants[variant];
  return (
    <NavigationMenu viewport={false} aria-label={site.a11y.mainNav} className="hidden lg:flex">
      <NavigationMenuList className="gap-0.5">
        {site.nav.map((item) => {
          if (item.children) {
            return (
              <MegaMenu
                key={item.href}
                label={item.label}
                href={item.href}
                items={item.children}
                onDark={onDark}
                pathname={current}
                variant={variant}
              />
            );
          }
          const active = isActivePath(current, item.href);
          return (
            <NavigationMenuItem key={item.href}>
              <Link
                href={item.href}
                prefetch={prefetchFor(item.href)}
                data-active={active}
                aria-current={active ? "page" : undefined}
                className={navLinkClass(onDark)}
              >
                {active && v.activeDot ? <ActiveDot onDark={onDark} /> : null}
                {item.label}
              </Link>
            </NavigationMenuItem>
          );
        })}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
