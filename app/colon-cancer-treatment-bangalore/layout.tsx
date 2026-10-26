import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/colorectal-cancer";

// The live URL: /colon-cancer-treatment-bangalore/ (the menu's "Colorectal Cancer").
export default function ColorectalCancerLayout({ children }: LayoutProps<"/colon-cancer-treatment-bangalore">) {
  return (
    <SiteShell
      theme="colorectal"
      headerVariant="light"
      activeHref="/colon-cancer-treatment-bangalore/"
      appointmentHref="#appointment"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
