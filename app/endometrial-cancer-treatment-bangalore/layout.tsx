import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/endometrial-cancer";

// The live URL: /endometrial-cancer-treatment-bangalore/.
export default function EndometrialCancerLayout({ children }: LayoutProps<"/endometrial-cancer-treatment-bangalore">) {
  return (
    <SiteShell
      theme="endometrial"
      headerVariant="light"
      activeHref="/endometrial-cancer-treatment-bangalore/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
