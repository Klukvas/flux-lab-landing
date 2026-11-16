import { studioStyles as styles } from "./studio-styles";

/** Product marks follow the products' existing identities; unfinished products stay text-only. */
export function ProductMark({ slug }: { readonly slug: string }) {
  if (slug === "fluxradar")
    return (
      <span aria-hidden="true" className={styles.hash}>
        #
      </span>
    );
  if (slug === "washflow")
    return (
      <span aria-hidden="true" className={`${styles.mark} ${styles.washMark}`}>
        <svg viewBox="0 0 40 48">
          <path
            d="M20 3C16 12 5 23 5 32a15 15 0 0 0 30 0C35 23 24 12 20 3Z"
            fill="currentColor"
          />
        </svg>
      </span>
    );
  if (slug === "jobber")
    return (
      <span
        aria-hidden="true"
        className={`${styles.mark} ${styles.cursopusMark}`}
      >
        <svg viewBox="0 0 48 48">
          <path
            d="M32 12a16 16 0 1 0 0 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="6"
          />
          <circle cx="36" cy="24" r="4" fill="currentColor" />
        </svg>
      </span>
    );
  if (slug === "autoflow")
    return (
      <span aria-hidden="true" className={styles.autoMark}>
        <i />
        <i />
        <i />
      </span>
    );
  if (slug === "market")
    return (
      <span
        aria-hidden="true"
        className={`${styles.mark} ${styles.marketMark}`}
      >
        <svg
          viewBox="0 0 48 48"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        >
          <path d="M11 7h22v19M11 7v32l5-3 5 3 5-3M17 16h10m-10 8h7m2 8 5 5 10-12" />
        </svg>
      </span>
    );
  return null;
}
