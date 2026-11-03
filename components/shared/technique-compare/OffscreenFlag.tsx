"use client";

import * as React from "react";

/**
 * Marks the enclosing <section> data-offscreen while it is scrolled away, so its CSS loops can
 * pause (TechniqueCompare's drifting photo). Renders an empty, hidden span.
 */
export function OffscreenFlag() {
  const ref = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    const section = ref.current?.closest("section");
    if (!section) return;
    const io = new IntersectionObserver(([entry]) => section.toggleAttribute("data-offscreen", !entry?.isIntersecting));
    io.observe(section);
    return () => io.disconnect();
  }, []);
  return <span ref={ref} hidden />;
}
