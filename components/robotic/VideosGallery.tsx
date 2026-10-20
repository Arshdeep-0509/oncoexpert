import { media } from "@/content/pages/robotic-surgery";
import { getVideos } from "@/lib/youtube";
import { Section } from "@/components/robotic/ui/section";
import { SectionHeading } from "@/components/robotic/ui/section-heading";
import { Reveal } from "@/components/robotic/ui/reveal";
import { LiteYouTube } from "@/components/robotic/LiteYouTube";

export async function VideosGallery() {
  const [featured, ...rest] = await getVideos(media.videos);

  return (
    <Section id="media" tone="white">
      <Reveal>
        <SectionHeading eyebrow={media.eyebrow} title={media.heading} />
      </Reveal>

      {featured ? (
        <div className="mx-auto mt-12 max-w-[960px]">
          <Reveal>
            <LiteYouTube video={featured} featured />
          </Reveal>
          <Reveal stagger className="mt-8 grid gap-6 sm:grid-cols-3">
            {rest.map((v) => (
              <LiteYouTube key={v.id} video={v} />
            ))}
          </Reveal>
        </div>
      ) : null}

      {/* The photo gallery lives in the Inside the Robot section. */}
    </Section>
  );
}
