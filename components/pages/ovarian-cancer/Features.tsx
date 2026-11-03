import { features } from "@/content/pages/ovarian-cancer";
import { Container } from "@/components/ui/Container";
import { SwipeRow } from "@/components/ui/SwipeRow";
import { FeatureCard } from "@/components/pages/ovarian-cancer/FeatureCard";
import "@/components/pages/ovarian-cancer/features.css";

/**
 * 2 · #features: the four live labels as flip cards with custom line icons; the back holds a NEW
 * detail and "Learn more" (→ #treatments-<key>). Desktop a row of four, tablets 2 × 2, phones a
 * swipe row.
 */
export function Features() {
  return (
    <section id="features" aria-label={features.a11y.label} className="bg-surface py-12 md:py-16">
      <Container>
        <SwipeRow label={features.a11y.label} gridClassName="md:grid-cols-2 lg:grid-cols-4 md:gap-5">
          {features.items.map((item) => (
            <FeatureCard key={item.label} {...item} learnMore={features.learnMore} flipLabel={features.a11y.flip} />
          ))}
        </SwipeRow>
      </Container>
    </section>
  );
}
