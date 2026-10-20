import { SiteShell } from "@/components/layout/SiteShell";

export default function BreastCancerLayout({ children }: LayoutProps<"/breast-cancer-treatment-bangalore">) {
  return (
    <SiteShell
      theme="breast"
      headerVariant="light"
      activeHref="/breast-cancer-treatment-bangalore/"
      appointmentHref="#appointment"
      // No brand intro on this page: it would delay the hero (LCP) by ~3s on phones.
      intro={false}
    >
      {children}
    </SiteShell>
  );
}
