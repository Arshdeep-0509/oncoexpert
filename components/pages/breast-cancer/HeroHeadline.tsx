import { breadcrumb, hero } from "@/content/pages/breast-cancer";
import { cn } from "@/lib/utils";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Breadcrumb } from "@/components/shared/Breadcrumb";
import { at, styles } from "@/components/pages/breast-cancer/hero-styles";

/** Breadcrumb, eyebrow and the H1: lines rise in turn; the emphasis line gets a drawn underline. */
export function HeroHeadline() {
  const lines = hero.headline;
  return (
    <div className="md:col-start-1 md:row-start-2 lg:col-span-6">
      <div className={cn(styles.step, styles.fadeDown)} style={at(0.1)}>
        <Breadcrumb label={breadcrumb.label} items={breadcrumb.items} className="mb-5 max-md:sr-only" />
        <Eyebrow>{hero.eyebrow}</Eyebrow>
      </div>

      <h1
        id="hero-title"
        className="mt-5 font-display text-[clamp(2.1rem,8.5vw,2.6rem)] leading-[1.04] tracking-[-0.02em] [overflow-wrap:normal] [hyphens:manual] text-ink md:mt-6 md:text-[clamp(2.4rem,5.6vw,4.6rem)]"
      >
        {lines.map((text, i) => {
          const isEmphasis = i === hero.emphasisLine;
          return (
            <span key={text} className={cn(styles.lineMask, i === 0 && "mb-1 md:mb-2")}>
              <span
                className={cn(
                  styles.line,
                  styles.step,
                  styles.rise,
                  i === 0 && "text-[0.7em] leading-[1.15] md:text-[0.6em]",
                )}
                style={at(0.2 + i * 0.12)}
              >
                {isEmphasis ? (
                  <span className={cn(styles.gradientText, "relative inline-block italic")}>
                    {text}
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 300 20"
                      preserveAspectRatio="none"
                      className={styles.underline}
                    >
                      <path
                        d="M4 13 C 55 6, 120 4, 180 8 S 268 15, 296 7"
                        pathLength={1}
                        fill="none"
                        style={{ stroke: "var(--accent)" }}
                        strokeOpacity={0.55}
                        strokeWidth={3}
                        strokeLinecap="round"
                        vectorEffect="non-scaling-stroke"
                      />
                    </svg>
                  </span>
                ) : (
                  text
                )}
              </span>
            </span>
          );
        })}
      </h1>
    </div>
  );
}
