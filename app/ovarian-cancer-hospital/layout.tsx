import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/ovarian-cancer";

// The URL: /ovarian-cancer-hospital/.
export default function OvarianCancerLayout({ children }: LayoutProps<"/ovarian-cancer-hospital">) {
  return (
    <SiteShell
      theme="ovarian"
      headerVariant="light"
      activeHref="/ovarian-cancer-hospital/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
