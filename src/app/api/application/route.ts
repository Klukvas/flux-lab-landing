import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { SITE_NAME } from "@/lib/constants";
import { applicationFormSchema, validateResumeFile } from "@/lib/validation";
import {
  formatApplicationMessage,
  sendTelegramMessage,
  sendTelegramDocument,
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

    const formData = await request.formData();

    const textData = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      position: formData.get("position") as string,
      message: formData.get("message") as string,
    };

    const result = applicationFormSchema.safeParse(textData);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: "Invalid form data" },
        { status: 400 },
      );
    }

    const file = formData.get("resume") as File | null;
    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, error: "Resume file is required" },
        { status: 400 },
      );
    }

    const fileValidation = validateResumeFile(file);
    if (!fileValidation.valid) {
      return NextResponse.json(
        { success: false, error: fileValidation.error },
        { status: 400 },
      );
    }

    const text = formatApplicationMessage(result.data);
    await sendTelegramMessage(text);
    await sendTelegramDocument(
      file,
      `[${SITE_NAME}] Resume: ${result.data.name}`,
    );

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[api/application]", error);
    return NextResponse.json(
      { success: false, error: "Failed to send application" },
      { status: 500 },
    );
  }
}
