const FETCH_TIMEOUT_MS = 5000;

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
    "<b>New Contact Message</b>",
    "",
    `<b>Name:</b> ${escapeTelegramHtml(data.name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(data.email)}`,
    `<b>Subject:</b> ${escapeTelegramHtml(data.subject)}`,
    `<b>Message:</b>\n${escapeTelegramHtml(data.message)}`,
  ].join("\n");
}

export function formatApplicationMessage(data: {
  name: string;
  email: string;
  position: string;
  message: string;
}): string {
  return [
    "<b>New Job Application</b>",
    "",
    `<b>Name:</b> ${escapeTelegramHtml(data.name)}`,
    `<b>Email:</b> ${escapeTelegramHtml(data.email)}`,
    `<b>Position:</b> ${escapeTelegramHtml(data.position)}`,
    `<b>Cover Letter:</b>\n${escapeTelegramHtml(data.message)}`,
  ].join("\n");
}

export function formatSupportMessage(data: {
  subject: string;
  message: string;
}): string {
  return [
    "<b>Support Request</b>",
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
