"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui";
import type { ConsentChoice } from "@/lib/cookie-consent";

/** Shared by the modal and the corner card so both variants stay word-for-word identical. */
export const CONSENT_TITLE_ID = "cookie-consent-title";

export interface ConsentPromptProps {
  readonly onDecide: (choice: ConsentChoice) => void;
}

export function ConsentPrompt({ onDecide }: ConsentPromptProps) {
  const t = useTranslations("cookieConsent");

  return (
    <>
      <p id={CONSENT_TITLE_ID} className="font-bold text-foreground">
        {t("title")}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-400">
        {t("description")}{" "}
        <Link href="/privacy" className="text-brand underline">
          {t("learnMore")}
        </Link>
      </p>
      <div className="mt-4 flex gap-3">
        <Button size="sm" className="flex-1" onClick={() => onDecide("granted")}>
          {t("accept")}
        </Button>
        <Button
          size="sm"
          variant="outline"
          className="flex-1"
          onClick={() => onDecide("denied")}
        >
          {t("decline")}
        </Button>
      </div>
    </>
  );
}
