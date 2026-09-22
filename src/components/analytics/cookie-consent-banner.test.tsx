import { fireEvent, render, screen } from "@testing-library/react";
import { NextIntlClientProvider } from "next-intl";
import { afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import messages from "@/i18n/messages/en.json";
import { CONSENT_COOKIE_NAME } from "@/lib/cookie-consent";
import { CookieConsentBanner } from "./cookie-consent-banner";

vi.mock("@/i18n/navigation", () => ({
  usePathname: () => "/",
  Link: ({ href, children }: { href: string; children: React.ReactNode }) => (
    <a href={href}>{children}</a>
  ),
}));

function renderBanner() {
  return render(
    <NextIntlClientProvider locale="en" messages={messages}>
      <CookieConsentBanner />
    </NextIntlClientProvider>,
  );
}

function setConsentCookie(value: string) {
  document.cookie = `${CONSENT_COOKIE_NAME}=${value}; path=/`;
}

describe("CookieConsentBanner", () => {
  beforeAll(() => {
    // jsdom has <dialog> but not its modal API.
    HTMLDialogElement.prototype.showModal ??= function showModal(
      this: HTMLDialogElement,
    ) {
      this.open = true;
    };
  });

  afterEach(() => {
    document.cookie = `${CONSENT_COOKIE_NAME}=; Max-Age=0; path=/`;
  });

  it("asks for consent when no choice is stored", () => {
    renderBanner();

    expect(screen.getByText(messages.cookieConsent.title)).toBeInTheDocument();
  });

  it("stays hidden once the visitor has accepted", () => {
    setConsentCookie("granted");

    renderBanner();

    expect(screen.queryByText(messages.cookieConsent.title)).toBeNull();
  });

  it("offers a way back after a decline instead of the full prompt", () => {
    setConsentCookie("denied");

    renderBanner();

    expect(screen.queryByText(messages.cookieConsent.title)).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: messages.cookieConsent.reopen }),
    );
    expect(screen.getByText(messages.cookieConsent.title)).toBeInTheDocument();
  });

  it("stores the visitor's choice and closes the prompt", () => {
    renderBanner();

    fireEvent.click(
      screen.getByRole("button", { name: messages.cookieConsent.accept }),
    );

    expect(document.cookie).toContain(`${CONSENT_COOKIE_NAME}=granted`);
    expect(screen.queryByText(messages.cookieConsent.title)).toBeNull();
  });
});
