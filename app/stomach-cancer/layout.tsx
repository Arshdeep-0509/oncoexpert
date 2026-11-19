import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/stomach-cancer";

// The live URL: /stomach-cancer/.
export default function StomachCancerLayout({ children }: LayoutProps<"/stomach-cancer">) {
  return (
    <SiteShell
      theme="stomach"
      headerVariant="light"
      activeHref="/stomach-cancer/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
