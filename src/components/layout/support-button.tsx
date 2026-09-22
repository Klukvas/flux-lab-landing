"use client";

import { useEffect, useEffectEvent, useId, useRef, useState } from "react";
import { motion, type Variants } from "framer-motion";
import { useTranslations } from "next-intl";
import { supportFormSchema, type SupportFormData } from "@/lib/validation";
import { trackFormSubmitted } from "@/lib/analytics";
import { QUICK_SPRING, SMOOTH_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { SupportForm, type SupportFormStatus } from "./support-form";

// The panel grows out of the button that opened it and shrinks back into it. It stays
// mounted while closed, so a half-typed message survives an accidental close.
const panelVariants: Variants = {
  open: { opacity: 1, scale: 1, y: 0, transition: QUICK_SPRING },
  closed: { opacity: 0, scale: 0.9, y: 8, transition: QUICK_SPRING },
};

// Arrives just after the hero has settled, so it doesn't compete with the headline.
const BUTTON_ENTRANCE = { ...SMOOTH_SPRING, delay: 0.5 };

const ICON_CLASS =
  "absolute inset-0 h-6 w-6 transition-[opacity,rotate,scale] duration-[450ms] ease-spring";

export function SupportButton() {
  const t = useTranslations("support");
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<SupportFormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const panelId = useId();
  const titleId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const closeFromKeyboard = useEffectEvent(() => {
    setIsOpen(false);
    buttonRef.current?.focus();
  });

  useEffect(() => {
    if (!isOpen) {
      return;
    }
    panelRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      // While a modal layer covers the panel (the open mobile menu marks it inert),
      // Escape belongs to that layer, so one press doesn't close both.
      if (event.key === "Escape" && !panelRef.current?.inert) {
        closeFromKeyboard();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  function handleToggle() {
    // Reopening after a sent message starts a fresh form; closing leaves the panel as it
    // was, so its content doesn't change while it fades out.
    if (!isOpen && status === "success") {
      setStatus("idle");
    }
    setIsOpen(!isOpen);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as SupportFormData;

    const result = supportFormSchema.safeParse(data);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      }
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/support", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
      trackFormSubmitted("support");
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <motion.div
        ref={panelRef}
        id={panelId}
        role="dialog"
        aria-labelledby={titleId}
        tabIndex={-1}
        inert={!isOpen}
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={panelVariants}
        // The transform origin sits on the button's centre (28px in from the right edge,
        // 36px below the panel), so scaling reads as coming out of the button itself.
        className={cn(
          "fixed bottom-22 right-6 z-50 w-80 origin-[calc(100%-28px)_calc(100%+36px)] rounded-xl border border-gray-200 bg-white p-4 shadow-2xl outline-none dark:border-gray-800 dark:bg-gray-950",
          !isOpen && "pointer-events-none",
        )}
      >
        <h3 id={titleId} className="mb-3 text-sm font-semibold text-foreground">
          {t("title")}
        </h3>
        <SupportForm status={status} errors={errors} onSubmit={handleSubmit} />
      </motion.div>

      <motion.button
        ref={buttonRef}
        type="button"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={BUTTON_ENTRANCE}
        onClick={handleToggle}
        className="pressable fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg hover:bg-brand-dark"
        aria-label={t("aria")}
        aria-expanded={isOpen}
        aria-controls={panelId}
      >
        {/* The bubble turns into a close mark in place, so the same button reads as the way out. */}
        <span aria-hidden="true" className="relative block h-6 w-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={cn(ICON_CLASS, isOpen && "rotate-90 scale-50 opacity-0")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 0 1-2.555-.337A5.972 5.972 0 0 1 5.41 20.97a5.969 5.969 0 0 1-.474-.065 4.48 4.48 0 0 0 .978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z"
            />
          </svg>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className={cn(ICON_CLASS, !isOpen && "-rotate-90 scale-50 opacity-0")}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </span>
      </motion.button>
    </>
  );
}
