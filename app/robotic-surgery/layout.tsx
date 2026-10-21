import { SiteShell } from "@/components/layout/SiteShell";
import { images } from "@/content/pages/robotic-surgery";

export default function RoboticSurgeryLayout({ children }: LayoutProps<"/robotic-surgery">) {
  return (
    <SiteShell
      theme="robotic"
      headerVariant="dark"
      appointmentHref="#appointment"
      footerArt={images.armsBlack}
      mobileActionBar={false}
    >
      {children}
    </SiteShell>
  );
}
