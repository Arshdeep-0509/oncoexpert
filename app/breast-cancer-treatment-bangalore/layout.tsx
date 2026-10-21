import { SiteShell } from "@/components/layout/SiteShell";

export default function BreastCancerLayout({ children }: LayoutProps<"/breast-cancer-treatment-bangalore">) {
  return (
    <SiteShell
      theme="breast"
      headerVariant="light"
      activeHref="/breast-cancer-treatment-bangalore/"
      appointmentHref="#appointment"
    >
      {children}
    </SiteShell>
  );
}
