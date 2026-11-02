import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService, images } from "@/content/pages/robotic-surgery";

export default function RoboticSurgeryLayout({ children }: LayoutProps<"/robotic-surgery">) {
  return (
    <SiteShell
      theme="robotic"
      headerVariant="dark"
      footerArt={images.armsBlack}
      mobileActionBar={false}
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
