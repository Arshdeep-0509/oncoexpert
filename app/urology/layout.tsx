import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/urology";

// The live URL: /urology/.
export default function UrologyLayout({ children }: LayoutProps<"/urology">) {
  return (
    <SiteShell theme="urology" headerVariant="light" activeHref="/urology/" defaultService={defaultAppointmentService}>
      {children}
    </SiteShell>
  );
}
