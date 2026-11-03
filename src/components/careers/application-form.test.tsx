import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { describe, expect, it } from "vitest";
import messages from "@/i18n/messages/en.json";
import { ApplicationForm } from "./application-form";

const consentLabel = messages.careers.form.marketingConsent;

function renderConsentCheckbox(): HTMLInputElement {
  render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <ApplicationForm />
    </NextIntlClientProvider>,
  );
  return screen.getByRole("checkbox", { name: consentLabel });
}

function submittedConsent(checkbox: HTMLInputElement) {
  if (!checkbox.form) {
    throw new Error("The consent checkbox is not inside the form");
  }
  return new FormData(checkbox.form).get("marketingConsent");
}

describe("ApplicationForm", () => {
  it("offers the mailing list as an unticked, optional checkbox", () => {
    const consent = renderConsentCheckbox();

    expect(consent).not.toBeChecked();
    expect(consent).not.toBeRequired();
  });

  // The API route treats only the exact value "yes" as consent.
  it("submits consent only once the applicant ticks the box", () => {
    const consent = renderConsentCheckbox();
    expect(submittedConsent(consent)).toBeNull();

    fireEvent.click(consent);

    expect(submittedConsent(consent)).toBe("yes");
  });
});
