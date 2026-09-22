import type { ReactNode } from "react";

/**
 * Pass-through: <html> and <body> are rendered by [locale]/layout.tsx so that lang
 * follows the page's language. Next still needs a root layout for app/not-found.tsx.
 */
export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return children;
}
