import { earlyDetection } from "@/content/pages/thyroid-cancer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DetectionSwitch } from "@/components/pages/thyroid-cancer/DetectionSwitch";
import "@/components/pages/thyroid-cancer/early-detection.css";

/** 4 · #early-detection "Importance of Early Detection": early vs late, one live sentence each. */
export function EarlyDetection() {
  return (
    <section id="early-detection" aria-labelledby="early-detection-title" className="bg-surface py-(--section-y)">
      <Container>
        <SectionHeading id="early-detection-title" title={earlyDetection.title} align="center" />
        <div className="mt-10">
          <DetectionSwitch
            text={{ early: earlyDetection.early, late: earlyDetection.late }}
            modes={earlyDetection.modes}
            labels={earlyDetection.a11y}
          />
        </div>
      </Container>
    </section>
  );
}
