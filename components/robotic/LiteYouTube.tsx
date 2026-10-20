"use client";

import type { VideoMeta } from "@/lib/youtube";
import { media } from "@/content/pages/robotic-surgery";
import { LiteYouTube as SharedLiteYouTube } from "@/components/shared/LiteYouTube";

/** The shared lite YouTube embed with the robotic page's teal play button. */
export function LiteYouTube({ video, featured = false }: { video: VideoMeta; featured?: boolean }) {
  return (
    <SharedLiteYouTube
      video={video}
      featured={featured}
      label={media.a11y.play(video.title)}
      frameTitle={media.a11y.videoFrame}
      playClassName="bg-teal/55 group-hover:bg-teal/80"
    />
  );
}
