"use client";

import { useTranslations } from "next-intl";
import { COOKIE_CONSENT_OPEN_EVENT } from "@/lib/cookie-consent";

interface CookieSettingsButtonProps {
  readonly className?: string;
}

/** Brings the consent banner back; withdrawing consent must be as easy as giving it. */
export function CookieSettingsButton({ className }: CookieSettingsButtonProps) {
  const t = useTranslations("footer");

  return (
    <button
      type="button"
      className={className}
      onClick={() => window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT))}
    >
      {t("cookieSettings")}
    </button>
  );
}
