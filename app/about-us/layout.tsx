import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/about-us";

export default function AboutUsLayout({ children }: LayoutProps<"/about-us">) {
  return (
    <SiteShell
      theme="care"
      headerVariant="light"
      heroTone="dark"
      activeHref="/about-us/"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
