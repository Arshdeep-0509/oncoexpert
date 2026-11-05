import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/breast-cancer";

export default function BreastCancerLayout({ children }: LayoutProps<"/breast-cancer-hospital-bangalore">) {
  return (
    <SiteShell
      theme="breast"
      headerVariant="light"
      activeHref="/breast-cancer-hospital-bangalore/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
