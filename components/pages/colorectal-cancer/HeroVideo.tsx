"use client";

import * as React from "react";

/**
 * The looping colon video, over the still that shares its first frame (HeroVisual). Silent and
 * decorative. It follows the hero's data-paused and data-offscreen (MotionToggle), and never
 * starts with reduced motion, which leaves the still.
 */
export function HeroVideo({ src }: { src: string }) {
  const ref = React.useRef<HTMLVideoElement>(null);

  React.useEffect(() => {
    const video = ref.current;
    const hero = video?.closest("section");
    if (!video || !hero) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const sync = () => {
      if (hero.hasAttribute("data-paused") || hero.hasAttribute("data-offscreen")) video.pause();
      else video.play().catch(() => {});
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(hero, { attributes: true, attributeFilter: ["data-paused", "data-offscreen"] });
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      muted
      loop
      playsInline
      preload="auto"
      aria-hidden="true"
      className="absolute inset-0 size-full object-cover"
    />
  );
}
