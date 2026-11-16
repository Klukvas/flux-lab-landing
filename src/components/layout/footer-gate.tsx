"use client";

import type { ReactNode } from "react";
import { usePathname } from "@/i18n/navigation";

/** Pages that fill the whole screen under the header and leave the footer out. */
const FULL_SCREEN_PATHS: ReadonlySet<string> = new Set(["/projects"]);

/** Renders the footer everywhere except on full-screen pages such as the projects catalog. */
export function FooterGate({ children }: { readonly children: ReactNode }) {
  const pathname = usePathname();
  return FULL_SCREEN_PATHS.has(pathname) ? null : children;
}
