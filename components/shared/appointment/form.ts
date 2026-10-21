import { appointmentSection } from "@/content/shared/sections";

/** The form's labels and messages (content/shared/sections.ts). */
export const formCopy = appointmentSection.form;

/** Per-page field styling (the robotic page keeps its original classes). */
export type FormStyles = {
  input: string;
  /** Extra classes for the service <Select> trigger (height override). */
  select: string;
  submit: string;
};
