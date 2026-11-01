import { understanding } from "@/content/pages/thyroid-cancer";
import { Container } from "@/components/ui/Container";
import { AnatomyExplorer } from "@/components/pages/thyroid-cancer/AnatomyExplorer";
import "@/components/pages/thyroid-cancer/understanding.css";

/** 2 · #understanding "Understanding Thyroid Cancer": the neck anatomy explorer. */
export function Understanding() {
  return (
    <section id="understanding" aria-labelledby="understanding-title" className="bg-surface py-(--section-y)">
      <Container>
        <AnatomyExplorer
          title={
            <h2 id="understanding-title" className="heading-2 text-ink">
              {understanding.lines.map((line, i) => (
                <span key={line}>
                  {i > 0 ? " " : null}
                  <span className="md:block">{line}</span>
                </span>
              ))}
            </h2>
          }
          body={understanding.body}
          hotspots={understanding.hotspots}
          labels={understanding.a11y}
        />
      </Container>
    </section>
  );
}
