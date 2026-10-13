/**
 * Renders scripts/og/og-default.html to public/og-default.png at 1200x630, the size the
 * metadata declares. Run with `node scripts/og/render.mjs`; it needs a Chromium that
 * Playwright can launch (`pnpm exec playwright install chromium`, or point
 * PLAYWRIGHT_CHROMIUM at an executable).
 */
import { fileURLToPath } from "node:url";
import path from "node:path";
import { chromium } from "@playwright/test";

const here = path.dirname(fileURLToPath(import.meta.url));
const template = path.join(here, "og-default.html");
const output = path.resolve(here, "../../public/og-default.png");

const browser = await chromium.launch({ executablePath: process.env.PLAYWRIGHT_CHROMIUM || undefined });
try {
  const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });
  await page.goto(`file://${template}`);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  await page.screenshot({ path: output, type: "png" });
  console.log(`wrote ${output}`);
} finally {
  await browser.close();
}
