"use client";

import * as React from "react";
import { Phone } from "lucide-react";
import { bookingForm } from "@/content/pages/book-appointment";
import { appointmentSection } from "@/content/shared/sections";
import { site } from "@/content/site";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { buttonClasses } from "@/components/ui/Button";
import { at, styles } from "@/components/pages/book-appointment/booking-styles";

/**
 * After a delivered request: a check mark that draws itself, the confirmation text and two
 * ways to reach the clinic right away. The text takes focus so screen readers announce it.
 */
export function SuccessPanel() {
  const ref = React.useRef<HTMLParagraphElement>(null);
  React.useEffect(() => ref.current?.focus({ preventScroll: true }), []);

  return (
    <div className="flex flex-col items-center py-6 text-center md:py-10" role="status">
      <svg viewBox="0 0 64 64" className="size-20 text-accent" aria-hidden="true">
        <circle
          className={styles.checkCircle}
          cx="32"
          cy="32"
          r="29"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          transform="rotate(-90 32 32)"
        />
        <path
          className={styles.checkMark}
          d="M20 33.5 28.5 42 45 24"
          pathLength={1}
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <p
        ref={ref}
        tabIndex={-1}
        className={`${styles.successIn} mt-6 measure font-display text-xl leading-snug font-semibold text-ink outline-none md:text-2xl`}
        style={at(0.8)}
      >
        {appointmentSection.form.success}
      </p>
      <div className={`${styles.successIn} mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row`} style={at(1)}>
        <a href={site.contact.phoneHref} data-cta={bookingForm.success.call} className={buttonClasses()}>
          <Phone className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
          {bookingForm.success.call}
        </a>
        <a
          href={site.whatsapp.href}
          target="_blank"
          rel="noopener noreferrer"
          data-cta={bookingForm.success.whatsapp}
          className={buttonClasses({ variant: "secondary" })}
        >
          <span className="text-whatsapp">
            <WhatsappIcon size={18} />
          </span>
          {bookingForm.success.whatsapp}
          <span className="sr-only">{bookingForm.a11y.newTab}</span>
        </a>
      </div>
    </div>
  );
}
