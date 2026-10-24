import { SiteShell } from "@/components/layout/SiteShell";
import { defaultAppointmentService } from "@/content/pages/book-appointment";

// The live URL, misspelling included: /book-your-appoinment-page/ (site.appointmentCta.href).
export default function BookAppointmentLayout({ children }: LayoutProps<"/book-your-appoinment-page">) {
  return (
    <SiteShell
      theme="care"
      headerVariant="light"
      activeHref="/book-your-appoinment-page/"
      appointmentHref="#appointment"
      defaultService={defaultAppointmentService}
    >
      {children}
    </SiteShell>
  );
}
