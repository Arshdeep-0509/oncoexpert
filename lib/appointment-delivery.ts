import "server-only";
import { Resend } from "resend";
import type { AppointmentInput } from "@/lib/appointment-schema";

/**
 * Where appointment requests go. Swap this module for Google Sheets, a CRM, etc.;
 * the server action only depends on `deliverAppointment`.
 */
export type DeliveryResult = { delivered: true } | { delivered: false; reason: "unavailable" | "failed" };

export async function deliverAppointment(data: Omit<AppointmentInput, "company">): Promise<DeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { delivered: false, reason: "unavailable" };

  const to = process.env.APPOINTMENT_TO_EMAIL || "info@oncoxpert.in";
  // Must be an address on a domain verified in Resend (onboarding@resend.dev only reaches the account owner).
  const from = process.env.APPOINTMENT_FROM_EMAIL || "OncoXpert Website <onboarding@resend.dev>";

  const lines = [
    `Name: ${data.name}`,
    `Contact Number: ${data.phone}`,
    `Service Required: ${data.service}`,
    `Date / Time: ${data.dateTime || "-"}`,
    "",
    "Sent from the Robotic Surgery page appointment form.",
  ];

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `Appointment request: ${data.service} (${data.name})`,
      text: lines.join("\n"),
    });
    return error ? { delivered: false, reason: "failed" } : { delivered: true };
  } catch {
    return { delivered: false, reason: "failed" };
  }
}
