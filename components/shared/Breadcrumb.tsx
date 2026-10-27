import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { prefetchFor } from "@/lib/nav";

type BreadcrumbProps = {
  label: string;
  items: readonly { label: string; href: string }[];
  className?: string;
};

/** Visible trail (last item = current page) plus BreadcrumbList structured data. */
export function Breadcrumb({ label, items, className }: BreadcrumbProps) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.label,
      item: new URL(item.href, site.url).toString(),
    })),
  };

  return (
    <nav aria-label={label} className={className}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ol className="flex flex-wrap items-center gap-1 text-[13px] leading-none text-muted">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={item.href} className="flex items-center gap-1">
              {last ? (
                <span aria-current="page" className="font-medium text-ink">
                  {item.label}
                </span>
              ) : (
                <>
                  <Link
                    href={item.href}
                    prefetch={prefetchFor(item.href)}
                    className={cn("inline-flex min-h-8 items-center transition-colors hover:text-accent")}
                  >
                    {item.label}
                  </Link>
                  <ChevronRight className="size-3.5 opacity-60" strokeWidth={1.75} aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
