"use client";

import Error from "next/error";

/**
 * Only for requests that never reach a locale, such as /unknown.php: the root layout
 * renders no <html>, so this page brings its own. Paths under /en or /uk get the
 * localized [locale]/not-found.tsx instead.
 */
export default function RootNotFound() {
  return (
    <html lang="en">
      <body>
        <Error statusCode={404} />
      </body>
    </html>
  );
}
