import { techniques } from "@/content/pages/lung-cancer";
import { lungImages } from "@/content/pages/lung-cancer.images";
import { TechniqueCompare } from "@/components/shared/TechniqueCompare";

const [robotic, vats] = techniques.sides.map((side) => ({ ...side, image: lungImages[side.image] }));

/** 6 · #techniques: Robotic (DaVinci) vs VATS on the shared TechniqueCompare. */
export function Techniques() {
  return (
    <TechniqueCompare
      id="techniques"
      tone="surface"
      title={techniques.title}
      sides={[robotic, vats]}
      labels={techniques.labels}
      page="lung"
    />
  );
}
