import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { quickLinks, services } from "@/components/layout/footer/footer-links";

/** Phones (accordion layout): the services and quick links as collapsible groups. */
export function FooterMobileLinks() {
  const trigger =
    "min-h-14 items-center py-0 text-base font-semibold text-white hover:no-underline [&>svg]:size-5 [&>svg]:translate-y-0 [&>svg]:text-accent-glow";
  const link = "flex min-h-12 items-center text-[15px] text-white/75 transition-colors hover:text-accent-glow";
  return (
    <Accordion type="multiple" className="border-y border-white/10 md:hidden">
      <AccordionItem value="services" className="border-white/10">
        <AccordionTrigger className={trigger}>{services.label}</AccordionTrigger>
        <AccordionContent>
          <ul>
            {services.children?.map((s) => (
              <li key={s.href}>
                <Link href={s.href} prefetch={false} className={link}>
                  {s.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href={services.href} prefetch={false} className={cn(link, "gap-2 font-semibold text-accent-glow")}>
                {services.label}
                <ArrowRight className="size-4" strokeWidth={1.75} aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="quick-links" className="border-b-0">
        <AccordionTrigger className={trigger}>{site.footer.quickLinks}</AccordionTrigger>
        <AccordionContent>
          <ul>
            {quickLinks.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false} className={link}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
