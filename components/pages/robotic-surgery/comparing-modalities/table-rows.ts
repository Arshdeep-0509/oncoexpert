import { compare } from "@/content/pages/robotic-surgery";

export type Modality = (typeof compare.modalities)[number];

/** Row heights shared by the label column and every modality card, so rows line up. */
export const HEAD = "h-[96px]";
export const ROW = "h-[76px]";
