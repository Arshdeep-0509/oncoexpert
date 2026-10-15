"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";
import { site } from "@/content/site";
import { cn } from "@/lib/utils";
import { WhatsappIcon } from "@/components/ui/brand-icons";
import { EASE_OUT_EXPO } from "@/components/ui/reveal";

const wa = site.whatsapp;

/** Floating WhatsApp button (bottom right, safe-area aware) with a small chat card. */
export function WhatsAppWidget() {
  const [open, setOpen] = React.useState(false);
  const reduce = useReducedMotion();
  const rootRef = React.useRef<HTMLDivElement>(null);
  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const cardRef = React.useRef<HTMLDivElement>(null);
  const cardId = React.useId();
  const titleId = React.useId();

  // Esc closes (focus returns to the button); clicking outside closes.
  React.useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      buttonRef.current?.focus();
    };
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    cardRef.current?.focus();
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  return (
    <div
      ref={rootRef}
      className="on-light fixed right-[max(16px,env(safe-area-inset-right))] bottom-[max(16px,env(safe-area-inset-bottom))] z-40 flex flex-col items-end"
    >
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={cardRef}
            id={cardId}
            role="dialog"
            aria-labelledby={titleId}
            tabIndex={-1}
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: reduce ? 0 : 0.35, ease: EASE_OUT_EXPO }}
            className="relative mb-3 w-[min(320px,calc(100vw-32px))] overflow-hidden rounded-[20px] border border-border bg-white text-[15px] leading-relaxed text-text shadow-card-hover outline-none"
          >
            <div className="border-b border-border bg-surface px-5 pt-4 pb-3.5 pr-14">
              <p id={titleId} className="font-display text-base font-semibold text-ink">
                {wa.greeting}
              </p>
              <p className="text-muted">{wa.question}</p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                buttonRef.current?.focus();
              }}
              aria-label={site.a11y.closeWhatsapp}
              className="absolute top-2 right-2 grid size-11 place-items-center rounded-full text-muted transition-colors hover:bg-white hover:text-ink"
            >
              <X className="size-[18px]" strokeWidth={1.75} aria-hidden="true" />
            </button>

            <div className="px-5 pt-4 pb-5">
              <p>{wa.intro}</p>
              <ul className="mt-1.5 text-ink">
                {wa.topics.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
              <p className="mt-3 text-muted">{wa.closing}</p>
              <a
                href={wa.href}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 flex h-12 items-center justify-center gap-2 rounded-full bg-whatsapp px-5 font-semibold text-ink transition-[filter] hover:brightness-95"
              >
                <WhatsappIcon size={18} />
                {wa.openLabel}
                <span className="sr-only">{site.a11y.newTab}</span>
              </a>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <button
        ref={buttonRef}
        type="button"
        aria-label={site.a11y.openWhatsapp}
        aria-expanded={open}
        aria-controls={open ? cardId : undefined}
        onClick={() => setOpen((v) => !v)}
        className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-[0_2px_6px_rgb(0_0_0/0.15),0_12px_28px_-8px_rgb(37_211_102/0.55)] transition-transform duration-300 ease-out-expo motion-safe:hover:scale-[1.04]"
      >
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-full bg-whatsapp",
            !open && "motion-safe:animate-wa-pulse",
          )}
        />
        <span className="relative">
          {open ? (
            <X className="size-6" strokeWidth={1.75} aria-hidden="true" />
          ) : (
            <WhatsappIcon size={28} />
          )}
        </span>
      </button>
    </div>
  );
}
