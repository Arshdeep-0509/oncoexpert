import { BadgeCheck } from "lucide-react";
import { approvals } from "@/content/shared/approvals";
import { organization as org } from "@/content/shared/organization";
import { medicalReviewLine } from "@/content/shared/sections";
import { cn } from "@/lib/utils";

const DATE = new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" });

/**
 * "Medically reviewed by Dr. Sunil Navalgund · Last reviewed <date>", matching the page's
 * reviewedBy / lastReviewed structured data (lib/jsonld.ts). Renders nothing until the doctor has
 * reviewed the pages (approvals.medicalReview and lastReviewed).
 */
export function ReviewLine({ className }: { className?: string }) {
  if (!approvals.medicalReview || !approvals.lastReviewed) return null;
  const date = DATE.format(new Date(`${approvals.lastReviewed}T00:00:00Z`));
  return (
    <p className={cn("flex items-start gap-2 text-base text-muted", className)}>
      <BadgeCheck className="mt-0.5 size-5 shrink-0 text-accent" strokeWidth={1.75} aria-hidden="true" />
      <span>
        <span className="whitespace-nowrap">{medicalReviewLine.reviewedBy}</span>{" "}
        <a href="/about-us/" className="font-semibold whitespace-nowrap text-ink underline-offset-4 hover:underline">
          {org.physician.name}
        </a>
        <span aria-hidden="true"> · </span>
        <span className="whitespace-nowrap">{medicalReviewLine.lastReviewed.replace("{date}", date)}</span>
      </span>
    </p>
  );
}
