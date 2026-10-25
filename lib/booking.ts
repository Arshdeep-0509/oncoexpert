import { site, type AppointmentService } from "@/content/site";

/** "Second Opinion" → "second-opinion" (also maps the live site's "consulation" spelling). */
export const serviceSlug = (service: string) =>
  service.toLowerCase().replace("consulation", "consultation").replace(/\s+/g, "-");

/**
 * The booking page with a service preselected, e.g. /book-your-appoinment-page/?service=second-opinion
 * (the booking form reads ?service=). Works without JavaScript too: it is a plain link.
 */
export const bookingHref = (service: AppointmentService) =>
  `${site.appointmentCta.href}?service=${serviceSlug(service)}`;
