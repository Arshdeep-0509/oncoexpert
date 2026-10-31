import Image from "next/image";
import { HeartHandshake } from "lucide-react";
import { team } from "@/content/pages/breast-cancer";
import { breastImages } from "@/content/pages/breast-cancer.images";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { InView } from "@/components/ui/InView";
import "@/components/pages/breast-cancer/team.css";

/** Class names from team.css (plain CSS, `bteam-` prefix). */
const styles = {
  stage: "bteam-stage",
  glow: "bteam-glow",
  outline: "bteam-outline",
  frame: "bteam-frame",
  photo: "bteam-photo",
  curtain: "bteam-curtain",
  badge: "bteam-badge",
} as const;

/**
 * #team "Our Team" (dark band, between #planning and #surgery): the team photo with the heading,
 * intro and three short points. Desktop: text left, photo right; tablets: the photo wide, then the
 * text and the points in a row of three; phones: the photo, the text, the points as a compact
 * list. On reveal a
 * curtain slides off the photo while it settles, an accent outline draws behind it and the badge
 * pops in (team.css); the points rise in turn.
 */
export function TeamSection() {
  const photo = breastImages[team.image];

  return (
    <Section id="team" tone="plum" aria-labelledby="team-title" className="overflow-hidden max-md:py-14">
      <div className="grid items-center gap-10 md:gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-5">
          <Reveal>
            <SectionHeading
              id="team-title"
              eyebrow={team.eyebrow}
              title={team.title}
              emphasis={team.emphasis}
              intro={team.intro}
              onDark
            />
          </Reveal>

          <Reveal
            as="ul"
            stagger
            delay={0.1}
            className="mt-7 grid gap-2.5 md:mt-9 md:grid-cols-3 md:gap-3 lg:grid-cols-1"
          >
            {team.points.map((point) => (
              <div
                key={point}
                className="flex h-full items-center gap-3 rounded-2xl bg-white/[0.06] px-4 py-3 ring-1 ring-white/10"
              >
                <span
                  aria-hidden="true"
                  className="grid size-9 shrink-0 place-items-center rounded-full bg-accent-glow/15 text-accent-glow"
                >
                  <HeartHandshake className="size-[18px]" strokeWidth={1.75} />
                </span>
                <span className="text-[15px] leading-snug font-semibold text-white">{point}</span>
              </div>
            ))}
          </Reveal>
        </div>

        <InView className={`${styles.stage} max-lg:order-first lg:col-span-7`} threshold={0.3}>
          <div aria-hidden="true" className={styles.glow} />
          <div aria-hidden="true" className={styles.outline} />
          <div className={styles.frame}>
            <div className={styles.photo}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes="(min-width: 1024px) 700px, 100vw"
                className="object-cover"
                style={{ objectPosition: photo.focal }}
              />
            </div>
            <span aria-hidden="true" className={styles.curtain} />
          </div>
          <p
            className={`${styles.badge} bottom-3 left-3 inline-flex items-center gap-2 rounded-pill bg-white/95 px-3.5 py-2 text-[13px] font-semibold text-ink shadow-soft-lg md:bottom-5 md:left-5 md:text-sm`}
          >
            <span aria-hidden="true" className="size-2 rounded-full bg-accent" />
            {team.badge}
          </p>
        </InView>
      </div>
    </Section>
  );
}
