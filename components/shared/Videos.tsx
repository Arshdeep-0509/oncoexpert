import type { SectionLook, SectionTone } from "@/content/types";
import { getVideos } from "@/lib/youtube";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { Reveal } from "@/components/ui/Reveal";
import { LiteYouTube } from "@/components/shared/LiteYouTube";

type VideosProps = {
  id?: string;
  tone?: SectionTone;
  look?: SectionLook;
  eyebrow: string;
  title: string;
  /** YouTube IDs (content/shared/videos.ts); the first is featured. */
  ids: readonly string[];
  /** `list` labels the phone swipe row (soft look only). */
  labels: { play: string; frame: string; list: string };
};

/** Play-button colour of the classic look. */
const CLASSIC_PLAY = "bg-teal/55 group-hover:bg-teal/80";

/**
 * #videos: lite YouTube embeds (thumbnail + play button; the iframe loads on tap).
 * Titles come from YouTube oEmbed at build time and are hidden if that fails.
 * soft: 1 featured (full width) + 3 small in a row below on desktop; a swipe row of
 * 16:9 cards on phones. classic: featured + a 3-column row at every width.
 */
export async function Videos({ id = "videos", tone = "alt", look = "soft", eyebrow, title, ids, labels }: VideosProps) {
  const videos = await getVideos(ids);
  const label = (t: string | null) => (t ? `${labels.play}: ${t}` : labels.play);
  const [featured, ...rest] = videos;

  if (look === "classic") {
    return (
      <Section id={id} tone={tone} aria-labelledby={`${id}-title`}>
        <Reveal>
          <SectionHeading id={`${id}-title`} variant="classic" eyebrow={eyebrow} title={title} />
        </Reveal>

        {featured ? (
          <div className="mx-auto mt-12 max-w-[960px]">
            <Reveal>
              <LiteYouTube
                video={featured}
                featured
                label={label(featured.title)}
                frameTitle={labels.frame}
                playClassName={CLASSIC_PLAY}
              />
            </Reveal>
            <Reveal stagger className="mt-8 grid gap-6 sm:grid-cols-3">
              {rest.map((v) => (
                <LiteYouTube
                  key={v.id}
                  video={v}
                  label={label(v.title)}
                  frameTitle={labels.frame}
                  playClassName={CLASSIC_PLAY}
                />
              ))}
            </Reveal>
          </div>
        ) : null}
      </Section>
    );
  }

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
