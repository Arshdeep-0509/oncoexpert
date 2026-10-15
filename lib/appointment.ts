"use server";

import { z } from "zod";
import { appointmentSchema, normalizePhone, type AppointmentInput, type AppointmentResult } from "@/lib/appointment-schema";
import { deliverAppointment } from "@/lib/appointment-delivery";

/** Server Action behind the appointment form. Never reports success unless the request was delivered. */
export async function submitAppointment(input: AppointmentInput): Promise<AppointmentResult> {
  const parsed = appointmentSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, reason: "invalid", fieldErrors: z.flattenError(parsed.error).fieldErrors };
  }

  const { company, ...data } = parsed.data;
  // Honeypot filled → a bot. Drop it quietly (bots get no signal to adapt to).
  if (company) return { ok: true };

  const result = await deliverAppointment({ ...data, phone: normalizePhone(data.phone) });
  if (!result.delivered) return { ok: false, reason: result.reason };
  // Never log patient details.
  return { ok: true };
}
