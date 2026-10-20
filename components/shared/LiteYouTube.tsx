"use client";

import * as React from "react";
import Image from "next/image";
import { Play } from "lucide-react";
import type { VideoMeta } from "@/lib/youtube";
import { cn } from "@/lib/utils";

type LiteYouTubeProps = {
  video: VideoMeta;
  featured?: boolean;
  /** Accessible name of the play button, e.g. "Play video: <title>". */
  label: string;
  /** iframe title when YouTube gave no video title. */
  frameTitle: string;
  /** Colour of the glass play button, e.g. "bg-accent/55 group-hover:bg-accent/80". */
  playClassName?: string;
  /** Image sizes for small (non-featured) cards. */
  sizes?: string;
};

/**
 * Lite embed: a thumbnail + glass play button. The youtube-nocookie iframe (and all of
 * YouTube's JS) loads only after a tap, then autoplays.
 */
export function LiteYouTube({
  video,
  featured = false,
  label,
  frameTitle,
  playClassName = "bg-accent/55 group-hover:bg-accent/80",
  sizes = "(min-width: 1024px) 300px, (min-width: 640px) 33vw, 100vw",
}: LiteYouTubeProps) {
  const [playing, setPlaying] = React.useState(false);

  return (
    <figure className="group">
      <div className="relative aspect-video overflow-hidden rounded-[20px] bg-black shadow-card">
        {playing ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&modestbranding=1`}
            title={video.title ?? frameTitle}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 size-full"
          />
        ) : (
          <button
            type="button"
            onClick={() => setPlaying(true)}
            aria-label={label}
            data-cta="Play video"
            className="absolute inset-0 size-full"
          >
            <Image
              src={video.thumbnail}
              alt=""
              fill
              sizes={featured ? "(min-width: 1024px) 960px, 100vw" : sizes}
              className="object-cover transition-transform duration-700 ease-out-expo motion-safe:group-hover:scale-[1.03]"
            />
            <span aria-hidden="true" className="absolute inset-0 bg-linear-to-t from-black/45 via-transparent to-transparent" />
            <span
              aria-hidden="true"
              className={cn(
                "absolute top-1/2 left-1/2 grid -translate-1/2 place-items-center rounded-full border border-white/30 text-white shadow-[0_10px_30px_rgb(0_0_0/0.35)] backdrop-blur-md transition-[background-color,scale] duration-500 ease-out-expo motion-safe:group-hover:scale-105",
                playClassName,
                featured ? "size-20" : "size-14",
              )}
            >
              <Play className={cn("translate-x-[2px] fill-current", featured ? "size-7" : "size-5")} strokeWidth={1.75} />
            </span>
          </button>
        )}
      </div>
      {video.title ? (
        <figcaption className={cn("mt-3 leading-snug font-medium text-ink", featured ? "text-lg" : "line-clamp-2 text-[15px]")}>
          {video.title}
        </figcaption>
      ) : null}
    </figure>
  );
}
