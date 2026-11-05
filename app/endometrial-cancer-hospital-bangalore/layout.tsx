import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/endometrial-cancer";

// The URL: /endometrial-cancer-hospital-bangalore/.
export default function EndometrialCancerLayout({ children }: LayoutProps<"/endometrial-cancer-hospital-bangalore">) {
  return (
    <SiteShell
      theme="endometrial"
      headerVariant="light"
      activeHref="/endometrial-cancer-hospital-bangalore/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
