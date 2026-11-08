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
type Appointment = Omit<AppointmentInput, "company">;
/** One destination's outcome. "off": its environment variables are not set. */
type ChannelResult = "delivered" | "failed" | "off";

/**
 * Where appointment requests go: an email (Resend) and a row in the Google Sheet, in parallel.
 * Delivered when at least one of them stored it; "unavailable" when neither is set up.
 */
async function deliverAppointment(data: Appointment): Promise<DeliveryResult> {
  const [email, sheet] = await Promise.all([deliverByEmail(data), deliverToSheet(data)]);
  // Which destination failed, never the request itself (no patient details in logs).
  if (email === "failed") console.error("appointment: email delivery failed");
  if (sheet === "failed") console.error("appointment: Google Sheet delivery failed");

  if (email === "delivered" || sheet === "delivered") return { delivered: true };
  if (email === "off" && sheet === "off") return { delivered: false, reason: "unavailable" };
  return { delivered: false, reason: "failed" };
}

/**
 * A row in the Google Sheet (Name | Contact Number | Service Required | Date), through the Apps
 * Script web app in scripts/google-sheets/appointments.gs. Needs GOOGLE_SHEETS_WEBHOOK_URL and
 * GOOGLE_SHEETS_WEBHOOK_SECRET.
 */
async function deliverToSheet(data: Appointment): Promise<ChannelResult> {
  const url = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
  const secret = process.env.GOOGLE_SHEETS_WEBHOOK_SECRET;
  if (!url || !secret) return "off";

  try {
    // Apps Script answers with a redirect to the JSON result; fetch follows it.
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret, name: data.name, phone: data.phone, service: data.service, date: data.date }),
      cache: "no-store",
      signal: AbortSignal.timeout(15_000),
    });
    if (!res.ok) return "failed";
    const result: unknown = await res.json().catch(() => null);
    return (result as { ok?: unknown } | null)?.ok === true ? "delivered" : "failed";
  } catch {
    return "failed";
  }
}

/** An email to the clinic (Resend). Needs RESEND_API_KEY. */
async function deliverByEmail(data: Appointment): Promise<ChannelResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return "off";

  const to = process.env.APPOINTMENT_TO_EMAIL || "info@oncoxpert.in";
  // Must be an address on a domain verified in Resend (onboarding@resend.dev only reaches the account owner).
  const from = process.env.APPOINTMENT_FROM_EMAIL || "OncoXpert Website <onboarding@resend.dev>";

  const page = data.page || "Website";
  const lines = [
    `Name: ${data.name}`,
    `Contact Number: ${data.phone}`,
    `Service Required: ${data.service}`,
    `Date: ${data.date || "-"}`,
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
    return error ? "failed" : "delivered";
  } catch {
    return "failed";
  }
}
