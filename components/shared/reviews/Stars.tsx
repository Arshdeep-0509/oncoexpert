import { Star } from "lucide-react";
import { reviewLabels } from "@/content/shared/reviews";
import { cn } from "@/lib/utils";

/** 5 stars in the theme's --gold (empty stars in --line). */
export function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={cn("flex gap-0.5", className)} role="img" aria-label={reviewLabels.a11y.rating(rating)}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          aria-hidden="true"
          className={cn("size-4", i < Math.round(rating) ? "fill-gold text-gold" : "fill-line text-line")}
          strokeWidth={1.75}
        />
      ))}
    </span>
  );
}
