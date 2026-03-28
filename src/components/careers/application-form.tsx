"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Textarea } from "@/components/ui";
import {
  applicationFormSchema,
  type ApplicationFormData,
} from "@/lib/validation";

type FormStatus = "idle" | "sending" | "success" | "error";

export function ApplicationForm() {
  const t = useTranslations("careers.form");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(
      formData.entries(),
    ) as unknown as ApplicationFormData;

    const result = applicationFormSchema.safeParse(data);
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
      const response = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      if (!response.ok) {
        throw new Error("Request failed");
      }

      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="rounded-xl border border-gray-200 bg-white p-6 text-center dark:border-gray-800 dark:bg-gray-950">
        <p className="text-foreground">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        id="name"
        name="name"
        label={t("name")}
        error={errors.name}
        required
      />
      <Input
        id="email"
        name="email"
        type="email"
        label={t("email")}
        error={errors.email}
        required
      />
      <Input
        id="position"
        name="position"
        label={t("position")}
        error={errors.position}
        required
      />
      <Input
        id="resume"
        name="resume"
        type="url"
        label={t("resume")}
        error={errors.resume}
        required
      />
      <Textarea
        id="message"
        name="message"
        label={t("message")}
        rows={4}
        error={errors.message}
        required
      />
      {status === "error" && (
        <p className="text-sm text-red-500">{t("error")}</p>
      )}
      <Button type="submit" disabled={status === "sending"}>
        {status === "sending" ? t("sending") : t("submit")}
      </Button>
    </form>
  );
}
