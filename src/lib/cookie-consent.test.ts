import { describe, expect, it } from "vitest";
import {
  CONSENT_COOKIE_MAX_AGE_SECONDS,
  expireAnalyticsCookies,
  parseConsentChoice,
  readConsentFromCookieString,
  serializeConsentCookie,
  toGtagConsentParams,
} from "./cookie-consent";

describe("parseConsentChoice", () => {
  it("accepts only the two known values", () => {
    expect(parseConsentChoice("granted")).toBe("granted");
    expect(parseConsentChoice("denied")).toBe("denied");
    expect(parseConsentChoice("yes")).toBeNull();
    expect(parseConsentChoice(undefined)).toBeNull();
  });
});

describe("readConsentFromCookieString", () => {
  it("finds the consent cookie among other cookies", () => {
    expect(
      readConsentFromCookieString("theme=dark; cookie_consent=granted; _ga=GA1.1.1"),
    ).toBe("granted");
  });

  it("returns null when the cookie is missing or tampered with", () => {
    expect(readConsentFromCookieString("")).toBeNull();
    expect(readConsentFromCookieString("theme=dark")).toBeNull();
    expect(readConsentFromCookieString("cookie_consent=maybe")).toBeNull();
  });

  it("ignores cookies whose name merely ends with the consent cookie name", () => {
    expect(readConsentFromCookieString("old_cookie_consent=granted")).toBeNull();
  });
});

describe("serializeConsentCookie", () => {
  it("writes a six-month, site-wide, lax cookie", () => {
    expect(serializeConsentCookie("denied", { secure: false })).toBe(
      `cookie_consent=denied; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; Path=/; SameSite=Lax`,
    );
  });

  it("adds the Secure attribute only over https", () => {
    expect(serializeConsentCookie("granted", { secure: true })).toMatch(/; Secure$/);
    expect(serializeConsentCookie("granted", { secure: false })).not.toMatch(/Secure/);
  });
});

describe("toGtagConsentParams", () => {
  it("lets only analytics storage follow the choice and keeps ads denied", () => {
    expect(toGtagConsentParams("granted")).toEqual({
      analytics_storage: "granted",
      ad_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
    });
    expect(toGtagConsentParams("denied").analytics_storage).toBe("denied");
  });
});

describe("expireAnalyticsCookies", () => {
  it("expires every GA cookie on the bare host and each parent domain", () => {
    const assignments = expireAnalyticsCookies(
      "cookie_consent=denied; _ga=GA1.1.1.1; _ga_ABC123=GS2.1",
      "www.flux-lab.dev",
    );

    expect(assignments).toEqual([
      "_ga=; Max-Age=0; Path=/",
      "_ga=; Max-Age=0; Path=/; Domain=www.flux-lab.dev",
      "_ga=; Max-Age=0; Path=/; Domain=flux-lab.dev",
      "_ga_ABC123=; Max-Age=0; Path=/",
      "_ga_ABC123=; Max-Age=0; Path=/; Domain=www.flux-lab.dev",
      "_ga_ABC123=; Max-Age=0; Path=/; Domain=flux-lab.dev",
    ]);
  });

  it("leaves the consent cookie and unrelated cookies alone", () => {
    expect(expireAnalyticsCookies("cookie_consent=granted; theme=dark; _gat=1", "flux-lab.dev")).toEqual([]);
  });

  it("uses only the host-less form on localhost", () => {
    expect(expireAnalyticsCookies("_ga=GA1.1.1.1", "localhost")).toEqual([
      "_ga=; Max-Age=0; Path=/",
    ]);
  });
});
