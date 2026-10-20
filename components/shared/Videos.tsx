import type { SectionTone } from "@/content/types";
import { getVideos } from "@/lib/youtube";
import { Section } from "@/components/ui/section";
import { SectionHeading } from "@/components/ui/section-heading";
import { SwipeRow } from "@/components/ui/swipe-row";
import { Reveal } from "@/components/ui/reveal";
import { LiteYouTube } from "./LiteYouTube";

type VideosProps = {
  id?: string;
  tone?: SectionTone;
  eyebrow: string;
  title: string;
  /** YouTube IDs (content/shared/videos.ts); the first is featured. */
  ids: readonly string[];
  labels: { play: string; frame: string; list: string };
};

/**
 * #videos: lite YouTube embeds (thumbnail + play button; the iframe loads on tap).
 * Titles come from YouTube oEmbed at build time and are hidden if that fails.
 * Desktop: 1 featured (full width) + 3 small in a row below. Phones: a swipe row of 16:9 cards.
 */
export async function Videos({ id = "videos", tone = "alt", eyebrow, title, ids, labels }: VideosProps) {
  const videos = await getVideos(ids);
  const label = (t: string | null) => (t ? `${labels.play}: ${t}` : labels.play);
  const [featured, ...rest] = videos;

  return (
    <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
      <Reveal>
        <SectionHeading id={`${id}-title`} eyebrow={eyebrow} title={title} />
      </Reveal>

      {/* Desktop / tablet */}
      {featured ? (
        <div className="mx-auto mt-12 hidden max-w-[1000px] gap-6 md:grid">
          <Reveal>
            <LiteYouTube video={featured} featured label={label(featured.title)} frameTitle={labels.frame} />
          </Reveal>
          <Reveal stagger className="grid gap-6 md:grid-cols-3" delay={0.08}>
            {rest.map((v) => (
              <LiteYouTube
                key={v.id}
                video={v}
                label={label(v.title)}
                frameTitle={labels.frame}
                sizes="(min-width: 1024px) 320px, 33vw"
              />
            ))}
          </Reveal>
        </div>
      ) : null}

      {/* Phones */}
      <Reveal className="mt-8 md:hidden">
        <SwipeRow label={labels.list}>
          {videos.map((v) => (
            <LiteYouTube key={v.id} video={v} label={label(v.title)} frameTitle={labels.frame} sizes="82vw" />
          ))}
        </SwipeRow>
      </Reveal>
    </Section>
  );
}
