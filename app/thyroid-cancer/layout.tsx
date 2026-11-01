import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/thyroid-cancer";

// The live URL: /thyroid-cancer/.
export default function ThyroidCancerLayout({ children }: LayoutProps<"/thyroid-cancer">) {
  return (
    <SiteShell
      theme="thyroid"
      headerVariant="light"
      activeHref="/thyroid-cancer/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
