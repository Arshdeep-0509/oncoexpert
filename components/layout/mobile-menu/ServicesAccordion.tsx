"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site, type NavItem } from "@/content/site";
import type { HeaderVariant } from "@/content/types";
import { cn, focusRing } from "@/lib/utils";
import { isActivePath, prefetchFor } from "@/lib/nav";
import { SheetClose } from "@/components/ui/sheet";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { serviceIcons, ICON_STROKE } from "@/components/layout/nav-icons";
import { menuStyles } from "@/components/layout/mobile-menu/menu-styles";

type ServicesAccordionProps = {
  navItem: NavItem & { children: NonNullable<NavItem["children"]> };
  pathname: string | null;
  variant: HeaderVariant;
  /** Classes of a top-level menu row (the trigger looks like one). */
  rowLink: string;
};

/** A nav item with children: a row that expands into its service links plus "all" link. */
export function ServicesAccordion({ navItem, pathname, variant, rowLink }: ServicesAccordionProps) {
  const s = menuStyles[variant];
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="services" className="border-b-0">
        <AccordionTrigger
          className={cn(
            rowLink,
            "items-center py-0 hover:no-underline [&>svg]:size-5 [&>svg]:translate-y-0 [&>svg]:text-muted",
            focusRing,
          )}
        >
          {navItem.label}
        </AccordionTrigger>
        <AccordionContent className="pb-3">
          <ul className="grid gap-0.5">
            {navItem.children.map((child) => {
              const Icon = serviceIcons[child.icon];
              const current = isActivePath(pathname, child.href);
              return (
                <li key={child.href}>
                  <SheetClose asChild>
                    <Link
                      href={child.href}
                      prefetch={prefetchFor(child.href)}
                      aria-current={current ? "page" : undefined}
                      className="flex min-h-12 items-center gap-3 rounded-xl px-1.5 text-base font-medium text-ink transition-colors hover:bg-surface-alt"
                    >
                      <span className={cn("grid size-9 shrink-0 place-items-center", s.serviceTile)}>
                        <Icon className="size-[17px] text-accent" strokeWidth={ICON_STROKE} aria-hidden="true" />
                      </span>
                      {child.label}
                      {current && variant === "light" ? (
                        <>
                          <span aria-hidden="true" className="ml-auto size-2 shrink-0 rounded-full bg-accent" />
                          <span className="sr-only">({site.a11y.youAreHere})</span>
                        </>
                      ) : null}
                    </Link>
                  </SheetClose>
                </li>
              );
            })}
            <li>
              <SheetClose asChild>
                <Link
                  href={navItem.href}
                  prefetch={prefetchFor(navItem.href)}
                  className="flex min-h-12 items-center justify-between rounded-xl px-1.5 text-base font-semibold text-accent transition-colors hover:bg-surface-alt"
                >
                  {navItem.label}
                  <ArrowRight className="size-4" strokeWidth={ICON_STROKE} aria-hidden="true" />
                </Link>
              </SheetClose>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
