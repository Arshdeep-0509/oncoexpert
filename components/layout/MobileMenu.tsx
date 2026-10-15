"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { getLenis } from "@/lib/lenis";
import { BurgerIcon } from "@/components/layout/burger-icon";

// The drawer (Radix Dialog + Accordion) isn't needed for the first paint: its code
// starts loading when a finger/pointer reaches the button, and mounts on first tap.
const loadSheet = () => import("@/components/layout/MobileMenuSheet");
const MobileMenuSheet = dynamic(loadSheet, { ssr: false });

type MobileMenuProps = {
  onDark: boolean;
  pathname: string | null;
  appointmentHref: string;
  className?: string;
};

export function MobileMenu({ onDark, pathname, appointmentHref, className }: MobileMenuProps) {
  const [open, setOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Pause Lenis while the sheet is open (Radix locks body scroll).
  React.useEffect(() => {
    const lenis = getLenis();
    if (open) lenis?.stop();
    else lenis?.start();
  }, [open]);

  const prefetch = () => void loadSheet();

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        aria-label={site.a11y.openMenu}
        aria-haspopup="dialog"
        aria-expanded={open}
        onPointerEnter={prefetch}
        onPointerDown={prefetch}
        onFocus={prefetch}
        onClick={() => {
          setMounted(true);
          setOpen(true);
        }}
        className={cn(
          "grid size-11 place-items-center rounded-full transition-colors duration-300",
          onDark ? "text-white hover:bg-white/10" : "text-ink hover:bg-surface",
          className,
        )}
      >
        <BurgerIcon open={open} />
      </button>
      {mounted ? (
        <MobileMenuSheet
          open={open}
          onOpenChange={setOpen}
          pathname={pathname}
          appointmentHref={appointmentHref}
          triggerRef={triggerRef}
        />
      ) : null}
    </>
  );
}
