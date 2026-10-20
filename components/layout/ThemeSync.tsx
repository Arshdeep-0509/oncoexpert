"use client";

import { useEffect } from "react";
import type { ThemeName } from "@/content/types";

/**
 * Mirrors the page theme onto <html data-theme="…">.
 * The SiteShell wrapper already themes everything on first paint; this only matters
 * for things rendered outside it: Radix portals (mobile menu sheet, dialogs, select
 * menus), which mount in <body> after hydration.
 */
export function ThemeSync({ theme }: { theme: ThemeName }) {
  useEffect(() => {
    const html = document.documentElement;
    const previous = html.dataset.theme;
    html.dataset.theme = theme;
    return () => {
      if (html.dataset.theme !== theme) return;
      if (previous) html.dataset.theme = previous;
      else delete html.dataset.theme;
    };
  }, [theme]);

  return null;
}
