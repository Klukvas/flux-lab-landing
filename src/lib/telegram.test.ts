import { describe, expect, it } from "vitest";
import { formatApplicationMessage } from "./telegram";

const TELEGRAM_MESSAGE_LIMIT = 4096;

const application = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  position: "Go Backend Developer",
  message: "I would love to work on Jobber.",
};

describe("formatApplicationMessage", () => {
  it("appends a source block and escapes HTML in it", () => {
    const message = formatApplicationMessage(application, {
      referrer: "https://www.google.com/",
      landingPage: "/en/careers?utm_source=google&utm_medium=cpc",
      submittedFrom: "/en/careers/go-backend-developer",
      secondsOnForm: 95,
      userAgent: "Mozilla/5.0 <Chrome>",
      country: "UA",
      language: "uk-UA",
    });

    expect(message).toContain("<b>Referrer:</b> https://www.google.com/");
    expect(message).toContain(
      "<b>Landing page:</b> /en/careers?utm_source=google&amp;utm_medium=cpc",
    );
    expect(message).toContain("<b>UTM:</b> source=google, medium=cpc");
    expect(message).toContain(
      "<b>Submitted from:</b> /en/careers/go-backend-developer",
    );
    expect(message).toContain("<b>Country:</b> UA");
    expect(message).toContain("<b>Language:</b> uk-UA");
    expect(message).toContain("<b>Browser:</b> Mozilla/5.0 &lt;Chrome&gt;");
    expect(message).toContain("<b>Time on form:</b> 95s");
  });

  it("calls an empty referrer a direct visit and skips unknown fields", () => {
    const message = formatApplicationMessage(application, {
      referrer: "",
      landingPage: "/en/careers",
    });

    expect(message).toContain("<b>Referrer:</b> direct / none");
    expect(message).not.toContain("UTM");
    expect(message).not.toContain("Country");
    expect(message).not.toContain("Browser");
  });

  it("flags a request that carries none of the form's hidden fields", () => {
    const message = formatApplicationMessage(application, {
      userAgent: "python-requests/2.32",
    });

    expect(message).toContain("did not come through the site form");
    expect(message).not.toContain("python-requests");
  });

  it("shortens the cover letter so the message stays within Telegram's limit", () => {
    const longValue = "y".repeat(2048);
    const message = formatApplicationMessage(
      {
        ...application,
        name: "n".repeat(100),
        position: "p".repeat(200),
        message: "x".repeat(3000),
      },
      {
        referrer: longValue,
        landingPage: longValue,
        submittedFrom: longValue,
        secondsOnForm: 1,
        userAgent: longValue,
        country: "UA",
        language: "uk-UA",
      },
    );

    expect(message.length).toBeLessThanOrEqual(TELEGRAM_MESSAGE_LIMIT);
    expect(message).toContain("x…\n");
    expect(message).toContain("<b>Time on form:</b> 1s");
  });

  it("leaves a short message untouched", () => {
    const message = formatApplicationMessage(application, { referrer: "" });

    expect(message).not.toContain("…");
    expect(message).toContain(
      "<b>Cover Letter:</b>\nI would love to work on Jobber.",
    );
  });
});
