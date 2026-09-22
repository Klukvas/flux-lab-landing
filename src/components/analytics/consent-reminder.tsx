"use client";

import { useTranslations } from "next-intl";

interface ConsentReminderProps {
  readonly onOpen: () => void;
}

function CookieIcon() {
  return (
    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5z" />
      <circle cx="8.5" cy="9.5" r="1" fill="currentColor" />
      <circle cx="8" cy="15" r="1" fill="currentColor" />
      <circle cx="13" cy="16" r="1" fill="currentColor" />
      <circle cx="14.5" cy="11" r="1" fill="currentColor" />
    </svg>
  );
}

/** Small corner pill shown after a decline, so a visitor who changes their mind can find the choice again. */
export function ConsentReminder({ onOpen }: ConsentReminderProps) {
  const t = useTranslations("cookieConsent");

  return (
    <button
      type="button"
      onClick={onOpen}
      title={t("reopenHint")}
      className="fixed bottom-6 left-6 z-50 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-white px-3 py-2 text-xs font-semibold text-brand shadow-lg transition-colors hover:border-brand hover:bg-brand/10 dark:bg-gray-950"
    >
      <CookieIcon />
      {t("reopen")}
    </button>
  );
}
