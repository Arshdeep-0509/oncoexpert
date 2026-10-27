import { site, type AppointmentService } from "@/content/site";

/** "Second Opinion" → "second-opinion" (also maps the live site's "consulation" spelling). */
const serviceSlug = (service: string) =>
  service.toLowerCase().replace("consulation", "consultation").replace(/\s+/g, "-");

/** The service a `?service=` slug names, if any (the booking page's form reads it). */
export const serviceFromSlug = (slug: string | null) =>
  site.appointmentServices.find((s) => serviceSlug(s) === slug) ?? null;

/**
 * The booking page, optionally with a service preselected, a note for the request and the path of
 * the page the visitor came from (for the email), e.g.
 * /book-your-appoinment-page/?service=consultation-for-surgery&note=Package%3A%20Laparoscopic
 * Every appointment button on the site links here. A plain link: works without JavaScript too.
 */
export const bookingHref = (service?: AppointmentService | null, note?: string | null, from?: string) => {
  const params = new URLSearchParams();
  if (service) params.set("service", serviceSlug(service));
  if (note) params.set("note", note);
  if (from) params.set("from", from);
  const query = params.toString();
  return query ? `${site.appointmentCta.href}?${query}` : site.appointmentCta.href;
};
