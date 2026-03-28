"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Button, Input, Textarea } from "@/components/ui";
import {
  applicationFormSchema,
  validateResumeFile,
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

    const textData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      position: formData.get("position") as string,
      message: formData.get("message") as string,
    } satisfies ApplicationFormData;

    const fieldErrors: Record<string, string> = {};

    const result = applicationFormSchema.safeParse(textData);
    if (!result.success) {
      for (const issue of result.error.issues) {
        const path = issue.path[0];
        if (typeof path === "string") {
          fieldErrors[path] = issue.message;
        }
      }
    }

    const file = formData.get("resume") as File | null;
    if (!file || file.size === 0) {
      fieldErrors.resume = t("resumeRequired");
    } else {
      const fileValidation = validateResumeFile(file);
      if (!fileValidation.valid) {
        fieldErrors.resume = fileValidation.error;
      }
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setErrors({});
    setStatus("sending");

    try {
      const response = await fetch("/api/application", {
        method: "POST",
        body: formData,
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
      <div className="space-y-1">
        <label
          htmlFor="resume"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          {t("resume")}
        </label>
        <input
          id="resume"
          name="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          required
          className="block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 file:mr-3 file:rounded-md file:border-0 file:bg-brand file:px-3 file:py-1 file:text-sm file:font-medium file:text-white hover:file:bg-brand-dark dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100"
        />
        {errors.resume && (
          <p className="text-sm text-red-500">{errors.resume}</p>
        )}
      </div>
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
