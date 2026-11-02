/**
 * Search and answer-engine facts for /book-your-appoinment-page/: the definition under the H1 and
 * llms.txt's line.
 * SOURCE: NEW. PENDING DOCTOR: the definition (shown once approved: content/shared/approvals.ts).
 */
import { site } from "@/content/site";

const clinics = site.locations.map((l) => `${l.name} (${l.area})`);

export const bookSeo = {
  definition: `Book a consultation, second opinion or surgery consultation with Dr. Sunil Navalgund, a surgical oncologist in Bengaluru, at ${clinics.slice(0, -1).join(", ")} or ${clinics.at(-1)}.`,
  purpose:
    "The appointment form: name, contact number, service required (Consultation, Second Opinion, Consultation For Surgery, Follow Up) and a preferred date; the clinic calls back to confirm.",
} as const;
