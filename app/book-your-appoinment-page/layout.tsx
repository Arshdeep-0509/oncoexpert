import { SiteShell } from "@/components/layout/SiteShell";

// The live URL, misspelling included: /book-your-appoinment-page/ (site.appointmentCta.href).
// No phone dock and no floating WhatsApp button under 768px: the form is always close, and its
// sticky step buttons own the bottom of the screen. No default service: the form's first step asks.
export default function BookAppointmentLayout({ children }: LayoutProps<"/book-your-appoinment-page">) {
  return (
    <SiteShell
      theme="care"
      headerVariant="light"
      activeHref="/book-your-appoinment-page/"
      appointmentHref="#appointment"
      mobileActionBar={false}
      hideWhatsAppOnMobile
    >
      {children}
    </SiteShell>
  );
}
