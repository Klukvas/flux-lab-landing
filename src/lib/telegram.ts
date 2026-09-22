import { SITE_NAME } from "@/lib/constants";
import { extractUtmParams, type SubmissionSource } from "@/lib/traffic-source";

const FETCH_TIMEOUT_MS = 5000;
const SITE_TAG = `<b>[${SITE_NAME}]</b>`;
/** Telegram rejects longer messages outright, which would lose the whole application. */
const TELEGRAM_MESSAGE_LIMIT = 4096;
const TRUNCATION_MARK = "…";
/** Referrers and user agents can be huge; one line each is all the reader needs. */
const MAX_SOURCE_DETAIL_LENGTH = 200;

function escapeTelegramHtml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export function formatContactMessage(data: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): string {
  return [
    `${SITE_TAG} New Contact Message`,
    "",
    `<b>Name:</b> ${escapeTelegramHtml(data.name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(data.email)}`,
    `<b>Subject:</b> ${escapeTelegramHtml(data.subject)}`,
    `<b>Message:</b>\n${escapeTelegramHtml(data.message)}`,
  ].join("\n");
}

export function formatApplicationMessage(
  data: {
    name: string;
    email: string;
    position: string;
    message: string;
  },
  source: SubmissionSource,
): string {
  const build = (coverLetter: string) =>
    [
      `${SITE_TAG} New Job Application`,
      "",
      `<b>Name:</b> ${escapeTelegramHtml(data.name)}`,
      `<b>Email:</b> ${escapeTelegramHtml(data.email)}`,
      `<b>Position:</b> ${escapeTelegramHtml(data.position)}`,
      `<b>Cover Letter:</b>\n${escapeTelegramHtml(coverLetter)}`,
      "",
      ...formatSourceLines(source),
    ].join("\n");
  return fitToTelegramLimit(build, data.message);
}

/**
 * The cover letter is the only field long enough to push a message over the
 * limit, so it is the part that gets shortened. Escaping only ever makes text
 * longer, so cutting the raw letter by the overflow is always enough.
 */
function fitToTelegramLimit(
  build: (coverLetter: string) => string,
  coverLetter: string,
): string {
  const message = build(coverLetter);
  const overflow = message.length - TELEGRAM_MESSAGE_LIMIT;
  if (overflow <= 0) {
    return message;
  }
  const keep = Math.max(
    0,
    coverLetter.length - overflow - TRUNCATION_MARK.length,
  );
  return build(coverLetter.slice(0, keep) + TRUNCATION_MARK);
}

function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) {
    return text;
  }
  return text.slice(0, maxLength - TRUNCATION_MARK.length) + TRUNCATION_MARK;
}

function describeReferrer(referrer: string | undefined): string | undefined {
  if (referrer === undefined) {
    return undefined;
  }
  return referrer === "" ? "direct / none" : referrer;
}

/** Where the applicant came from. Unknown values are left out rather than shown as "unknown". */
function formatSourceLines(source: SubmissionSource): string[] {
  const browserFields = [
    source.referrer,
    source.landingPage,
    source.submittedFrom,
    source.secondsOnForm,
  ];
  if (browserFields.every((field) => field === undefined)) {
    // The site form always sends these, so their absence means the request bypassed it.
    return [
      "<b>Source:</b> no browser data, request did not come through the site form",
    ];
  }

  const utm = Object.entries(extractUtmParams(source.landingPage))
    .map(([key, value]) => `${key}=${value}`)
    .join(", ");
  const details: ReadonlyArray<readonly [string, string | undefined]> = [
    ["Referrer", describeReferrer(source.referrer)],
    ["Landing page", source.landingPage],
    ["UTM", utm || undefined],
    ["Submitted from", source.submittedFrom],
    ["Country", source.country],
    ["Language", source.language],
    ["Browser", source.userAgent],
    [
      "Time on form",
      source.secondsOnForm === undefined
        ? undefined
        : `${source.secondsOnForm}s`,
    ],
  ];

  return [
    "<b>Source</b>",
    ...details.flatMap(([label, value]) =>
      value
        ? [
            `<b>${label}:</b> ${escapeTelegramHtml(truncate(value, MAX_SOURCE_DETAIL_LENGTH))}`,
          ]
        : [],
    ),
  ];
}

export function formatSupportMessage(data: {
  subject: string;
  message: string;
}): string {
  return [
    `${SITE_TAG} Support Request`,
    "",
    `<b>Subject:</b> ${escapeTelegramHtml(data.subject)}`,
    `<b>Message:</b>\n${escapeTelegramHtml(data.message)}`,
  ].join("\n");
}

function getTelegramCredentials() {
  const botToken = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!botToken || !chatId) {
    throw new Error("TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID must be set");
  }

  return { botToken, chatId };
}

export async function sendTelegramDocument(
  file: File,
  caption: string,
): Promise<void> {
  const { botToken, chatId } = getTelegramCredentials();

  const formData = new FormData();
  formData.append("chat_id", chatId);
  formData.append("document", file, file.name);
  formData.append("caption", caption);
  formData.append("parse_mode", "HTML");

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendDocument`,
      {
        method: "POST",
        body: formData,
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Telegram API error: ${response.status} ${body}`);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}

export async function sendTelegramMessage(text: string): Promise<void> {
  const { botToken, chatId } = getTelegramCredentials();

  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(
      `https://api.telegram.org/bot${botToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text,
          parse_mode: "HTML",
        }),
        signal: controller.signal,
      },
    );

    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Telegram API error: ${response.status} ${body}`);
    }
  } finally {
    clearTimeout(timeoutId);
  }
}
