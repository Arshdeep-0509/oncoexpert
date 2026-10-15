import { z } from "zod";
import { appointment, appointmentServices } from "@/content/robotic-surgery";

const { errors } = appointment.form;

/** 10-digit Indian mobile (starts 6–9), optional +91 / 91 prefix; spaces and dashes ignored. */
export const normalizePhone = (value: string) => value.replace(/[\s-]/g, "");
const INDIAN_MOBILE = /^(?:\+?91)?[6-9]\d{9}$/;

/** Allow a minute of clock skew between the browser and the server. */
const SKEW_MS = 60_000;

// Shared by the client form (react-hook-form + zodResolver) and the server action.
export const appointmentSchema = z.object({
  name: z.string().trim().min(1, errors.name).max(80, errors.name),
  phone: z
    .string()
    .trim()
    .refine((v) => INDIAN_MOBILE.test(normalizePhone(v)), errors.phone),
  service: z.enum(appointmentServices, { error: errors.service }),
  // datetime-local value ("YYYY-MM-DDTHH:mm"); optional, but never in the past.
  dateTime: z
    .string()
    .trim()
    .refine((v) => v === "" || (!Number.isNaN(Date.parse(v)) && Date.parse(v) >= Date.now() - SKEW_MS), errors.dateTime),
  /** Honeypot: real visitors never see or fill this. */
  company: z.string().optional(),
});

export type AppointmentInput = z.infer<typeof appointmentSchema>;

export type AppointmentResult =
  | { ok: true }
  | { ok: false; reason: "invalid" | "unavailable" | "failed"; fieldErrors?: Partial<Record<keyof AppointmentInput, string[]>> };
