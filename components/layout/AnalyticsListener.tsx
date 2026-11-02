"use client";

import { useEffect } from "react";
import { ctaLabel, track } from "@/lib/analytics";

/**
 * One delegated listener instead of wiring every link:
 *  - tel: links            → phone_click
 *  - wa.me links            → whatsapp_click
 *  - elements with data-cta → cta_click (label = <page>:<section>:<action>, text = data-cta)
 * `location` (and `section`, same value) is the id of the nearest section (or header/footer).
 */
export function AnalyticsListener() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const target = e.target as Element | null;
      const el = target?.closest<HTMLElement>("a, button");
      if (!el) return;
      const location =
        el.closest<HTMLElement>("section[id]")?.id ?? el.closest("header, footer")?.tagName.toLowerCase() ?? "page";
      const href = el.getAttribute("href") ?? "";

      if (href.startsWith("tel:")) track({ event: "phone_click", location });
      else if (href.includes("wa.me/")) track({ event: "whatsapp_click", location });
      if (el.dataset.cta)
        track({
          event: "cta_click",
          label: ctaLabel(window.location.pathname, location, el.dataset.cta),
          text: el.dataset.cta,
          location,
          section: location,
        });
    };
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);

  return null;
}
