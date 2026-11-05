import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/colorectal-cancer";

// The URL: /colon-cancer-hospital-bangalore/ (the menu's "Colorectal Cancer").
export default function ColorectalCancerLayout({ children }: LayoutProps<"/colon-cancer-hospital-bangalore">) {
  return (
    <SiteShell
      theme="colorectal"
      headerVariant="light"
      activeHref="/colon-cancer-hospital-bangalore/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
