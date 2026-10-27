import { SiteShell } from "@/components/layout/SiteShell";

// The live URL, misspelling included: /book-your-appoinment-page/ (site.appointmentCta.href).
// The page is the form, so the header's "For Appointment" scrolls to it (#appointment) and there is
// no phone dock (its Book button would only point at the page you are on). No default service:
// the form keeps "- Select -" unless the link that opened it names one (?service=).
export default function BookAppointmentLayout({ children }: LayoutProps<"/book-your-appoinment-page">) {
  return (
    <SiteShell
      theme="care"
      headerVariant="light"
      activeHref="/book-your-appoinment-page/"
      appointmentHref="#appointment"
      mobileActionBar={false}
      hideWhatsAppOnMobile={false}
    >
      {children}
    </SiteShell>
  );
}
