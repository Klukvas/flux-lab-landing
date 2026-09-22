import { notFound } from "next/navigation";

/** Unknown paths under a locale render [locale]/not-found.tsx inside the site layout. */
export default function UnknownPage() {
  notFound();
}
