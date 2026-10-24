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

/** What the booking form's useActionState holds: the result, plus the values to refill on an error. */
export type AppointmentFormState = {
  result: AppointmentResult | null;
  values: Partial<Pick<AppointmentInput, "name" | "phone" | "service" | "dateTime">>;
};

/**
 * The same submission as `submitAppointment`, for a <form action>: the booking page's form posts
 * here, so it also works with JavaScript off (a plain POST; the page re-renders with the state).
 * Echoes the visitor's own values back so a no-JS form can refill its fields after an error.
 */
export async function submitAppointmentForm(
  _prev: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  const field = (name: keyof AppointmentInput) => {
    const value = formData.get(name);
    return typeof value === "string" ? value : "";
  };
  const input = {
    name: field("name"),
    phone: field("phone"),
    service: field("service") as AppointmentInput["service"],
    dateTime: field("dateTime"),
    page: field("page"),
    note: field("note"),
    company: field("company"),
  };
  const result = await submitAppointment(input);
  const values = result.ok
    ? {}
    : { name: input.name, phone: input.phone, service: input.service, dateTime: input.dateTime };
  return { result, values };
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
