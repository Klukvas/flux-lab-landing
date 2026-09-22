"use client";

import { useTranslations } from "next-intl";

export type SupportFormStatus = "idle" | "sending" | "success" | "error";

interface SupportFormProps {
  readonly status: SupportFormStatus;
  readonly errors: Readonly<Record<string, string>>;
  readonly onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const FIELD_CLASS =
  "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder-gray-400 transition-colors focus:border-foreground focus:outline-none focus:ring-1 focus:ring-foreground dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100 dark:placeholder-gray-500";

export function SupportForm({ status, errors, onSubmit }: SupportFormProps) {
  const t = useTranslations("support");

  if (status === "success") {
    return (
      <p role="status" className="text-sm text-foreground">
        {t("success")}
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="space-y-1">
        <input
          id="support-subject"
          name="subject"
          placeholder={t("subject")}
          aria-label={t("subject")}
          required
          className={FIELD_CLASS}
        />
        {errors.subject && (
          <p className="text-xs text-red-500">{errors.subject}</p>
        )}
      </div>
      <div className="space-y-1">
        <textarea
          id="support-message"
          name="message"
          placeholder={t("message")}
          aria-label={t("message")}
          rows={3}
          required
          className={FIELD_CLASS}
        />
        {errors.message && (
          <p className="text-xs text-red-500">{errors.message}</p>
        )}
      </div>
      {status === "error" && (
        <p role="alert" className="text-xs text-red-500">
          {t("error")}
        </p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="pressable w-full rounded-md bg-brand px-4 py-2 text-sm font-medium text-white hover:bg-brand-dark disabled:opacity-50"
      >
        {status === "sending" ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
