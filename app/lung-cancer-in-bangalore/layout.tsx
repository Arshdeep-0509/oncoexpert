import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/lung-cancer";

// The live URL: /lung-cancer-in-bangalore/.
export default function LungCancerLayout({ children }: LayoutProps<"/lung-cancer-in-bangalore">) {
  return (
    <SiteShell
      theme="lung"
      headerVariant="light"
      activeHref="/lung-cancer-in-bangalore/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
