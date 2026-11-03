import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/ovarian-cancer";

// The live URL: /ovarian-cancer-treatment/.
export default function OvarianCancerLayout({ children }: LayoutProps<"/ovarian-cancer-treatment">) {
  return (
    <SiteShell
      theme="ovarian"
      headerVariant="light"
      activeHref="/ovarian-cancer-treatment/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
