"use client";

import * as React from "react";

type ScrollVarProps = React.ComponentProps<"div"> & {
  /**
   * "view": 0 when the element's top enters the bottom of the screen, 1 when its bottom leaves
   * the top (parallax). "pin": 0 when its top reaches the top of the screen, 1 when its bottom
   * reaches the bottom (a tall section with a sticky child: progress through the pinned scroll).
   * "top": 0 while its top is on screen, 1 once it has scrolled its own height out of the top (a
   * hero's parallax: 0 at the top of the page, so nothing moves when the page hydrates).
   */
  range: "view" | "pin" | "top";
  /** Also set data-step = the current step (0 … steps-1), each step an equal share of the range. */
  steps?: number;
  /** Only track while this media query matches (e.g. the pinned desktop layout). */
  media?: string;
};

/**
 * Writes the scroll progress of this element to its own style as `--p` (0–1), and optionally
 * `data-step`, so page CSS can drive transform/opacity from it. Listens only while the element is
 * near the screen, updates once per frame, never re-renders React.
 */
export function ScrollVar({ range, steps, media, children, ...props }: ScrollVarProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mql = media ? window.matchMedia(media) : null;
    let frame = 0;
    let listening = false;

    const update = () => {
      frame = 0;
      const box = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const p =
        range === "pin"
          ? -box.top / Math.max(1, box.height - vh)
          : range === "top"
            ? -box.top / Math.max(1, box.height)
            : (vh - box.top) / Math.max(1, vh + box.height);
      const clamped = Math.min(1, Math.max(0, p));
      el.style.setProperty("--p", clamped.toFixed(4));
      if (steps) el.dataset.step = String(Math.min(steps - 1, Math.floor(clamped * steps)));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    const listen = (on: boolean) => {
      if (on === listening) return;
      listening = on;
      if (on) {
        window.addEventListener("scroll", onScroll, { passive: true });
        window.addEventListener("resize", onScroll, { passive: true });
        update();
      } else {
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
      }
    };

    const io = new IntersectionObserver(([entry]) => listen(!!entry?.isIntersecting && (!mql || mql.matches)), {
      rootMargin: "200px 0px",
    });
    io.observe(el);
    const onMedia = () => {
      io.unobserve(el);
      io.observe(el);
    };
    mql?.addEventListener("change", onMedia);
    return () => {
      io.disconnect();
      mql?.removeEventListener("change", onMedia);
      listen(false);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [range, steps, media]);

  return (
    <div ref={ref} {...props}>
      {children}
    </div>
  );
}
