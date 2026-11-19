import { techniques } from "@/content/pages/stomach-cancer";
import { stomachImages } from "@/content/pages/stomach-cancer.images";
import { TechniqueCompare } from "@/components/shared/TechniqueCompare";

const [robotic, laparoscopic] = techniques.sides.map((side) => ({ ...side, image: stomachImages[side.image] }));

/**
 * 5 · #approach "Robotic Precision vs Laparoscopic Expertise" (surface) on the shared TechniqueCompare:
 * below 1024px a tab switch, from 1024px both side by side; the robotic side links to
 * /robotic-surgery/. `technique_switch` with page "stomach".
 */
export function Approach() {
  return (
    <TechniqueCompare
      id="approach"
      tone="surface"
      title={techniques.title}
      sides={[robotic, laparoscopic]}
      labels={techniques.labels}
      page="stomach"
    />
  );
}
