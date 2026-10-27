"use client";

import * as React from "react";

/**
 * Touch screens have no hover: a tap on an #approach card toggles its hover state
 * (data-active, approach.css); tapping another card moves it there. Renders nothing.
 */
export function ApproachTap() {
  React.useEffect(() => {
    const section = document.getElementById("approach");
    if (!section || !window.matchMedia("(hover: none)").matches) return;
    const onClick = (e: MouseEvent) => {
      const card = (e.target as Element).closest<HTMLElement>("[data-card]");
      if (!card) return;
      const wasActive = card.hasAttribute("data-active");
      section.querySelectorAll("[data-card][data-active]").forEach((el) => el.removeAttribute("data-active"));
      card.toggleAttribute("data-active", !wasActive);
    };
    section.addEventListener("click", onClick);
    return () => section.removeEventListener("click", onClick);
  }, []);

  return null;
}
