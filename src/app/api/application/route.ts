import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { applicationFormSchema } from "@/lib/validation";
import {
  formatApplicationMessage,
  sendTelegramMessage,
} from "@/lib/telegram";
import { checkRateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  try {
    const headersList = await headers();
    const ip = headersList.get("x-forwarded-for")?.split(",")[0] ?? "unknown";

    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: "Too many requests" },
        { status: 429 },
      );
    }

    const body = await request.json();
    const result = applicationFormSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 },
      );
    }

    const text = formatApplicationMessage(result.data);
    await sendTelegramMessage(text);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/application]", error);
    return NextResponse.json(
      { success: false, error: "Failed to send application" },
      { status: 500 },
    );
  }
}
