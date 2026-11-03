import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/breast-cancer";

export default function BreastCancerLayout({ children }: LayoutProps<"/breast-cancer-treatment-bangalore">) {
  return (
    <SiteShell
      theme="breast"
      headerVariant="light"
      activeHref="/breast-cancer-treatment-bangalore/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
