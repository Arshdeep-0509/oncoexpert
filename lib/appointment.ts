"use server";

import "server-only";
import { z } from "zod";
import { Resend } from "resend";
import {
  appointmentSchema,
  normalizePhone,
  type AppointmentInput,
  type AppointmentResult,
} from "@/lib/appointment-schema";

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

type DeliveryResult = { delivered: true } | { delivered: false; reason: "unavailable" | "failed" };

/**
 * Where appointment requests go (email via Resend). Swap this function for Google Sheets,
 * a CRM, etc.; submitAppointment only depends on its result.
 */
async function deliverAppointment(data: Omit<AppointmentInput, "company">): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { delivered: false, reason: "unavailable" };

  const to = process.env.APPOINTMENT_TO_EMAIL || "info@oncoxpert.in";
  // Must be an address on a domain verified in Resend (onboarding@resend.dev only reaches the account owner).
  const from = process.env.APPOINTMENT_FROM_EMAIL || "OncoXpert Website <onboarding@resend.dev>";

  const page = data.page || "Website";
  const lines = [
    `Name: ${data.name}`,
    `Contact Number: ${data.phone}`,
    `Service Required: ${data.service}`,
    `Date / Time: ${data.dateTime || "-"}`,
    ...(data.note ? [`Note: ${data.note}`] : []),
    "",
    `Sent from the ${page} page appointment form.`,
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New appointment request - ${page} page`,
      text: lines.join("\n"),
    });
    return error ? { delivered: false, reason: "failed" } : { delivered: true };
  } catch {
    return { delivered: false, reason: "failed" };
  }
}
