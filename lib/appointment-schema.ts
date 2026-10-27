import { z } from "zod";
import { appointmentSection } from "@/content/shared/sections";

const { errors, services: appointmentServices } = appointmentSection.form;

/** 10-digit Indian mobile (starts 6–9), optional +91 / 91 prefix; spaces and dashes ignored. */
export const normalizePhone = (value: string) => value.replace(/[\s-]/g, "");
const INDIAN_MOBILE = /^(?:\+?91)?[6-9]\d{9}$/;

/** A date is valid until the end of that day in Bengaluru (IST), wherever the server runs. */
const endOfDayIst = (date: string) => Date.parse(`${date}T23:59:59+05:30`);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Shared by the client form (react-hook-form + zodResolver) and the server action.
export const appointmentSchema = z.object({
  name: z.string().trim().min(1, errors.name).max(80, errors.name),
  phone: z
    .string()
    .trim()
    .refine((v) => INDIAN_MOBILE.test(normalizePhone(v)), errors.phone),
  service: z.enum(appointmentServices, { error: errors.service }),
  // A date input's value ("YYYY-MM-DD"); optional, but never before today.
  date: z
    .string()
    .trim()
    .refine((v) => v === "" || (ISO_DATE.test(v) && endOfDayIst(v) >= Date.now()), errors.date),
  /** Hidden: the form's page and where the visitor came from, e.g. "Book Appointment via /about-us/". */
  page: z.string().trim().max(120).optional(),
  /** Hidden: context from the button that opened the form, e.g. "Package request". */
  note: z.string().trim().max(120).optional(),
  /** Honeypot: real visitors never see or fill this. */
  company: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export type AppointmentResult =
  | { ok: true }
  | {
      ok: false;
      reason: "invalid" | "unavailable" | "failed";
      fieldErrors?: Partial<Record<keyof AppointmentInput, string[]>>;
    };
