"use client";

import { useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { Link } from "@/i18n/navigation";
import { ProductMark } from "./product-mark";
import { studioStyles as styles } from "./studio-styles";

export type ShowcaseProduct = {
  readonly slug: string;
  readonly name: string;
  readonly status: string;
  readonly statusLabel: string;
  readonly tagline?: string;
  readonly summary: string;
  readonly href?: string;
  readonly preview?: ReactNode;
};

type ProductShowcaseProps = {
  readonly products: readonly ShowcaseProduct[];
  readonly label: string;
  readonly viewLabel: string;
};

/** Manual selection keeps the portfolio compact; only one product's preview mounts. */
export function ProductShowcase({
  products,
  label,
  viewLabel,
}: ProductShowcaseProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const selected = products[selectedIndex];
  if (!selected) return null;

  function onKeyDown(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const nextIndex =
      event.key === "Home"
        ? 0
        : event.key === "End"
          ? products.length - 1
          : event.key === "ArrowRight"
            ? (index + 1) % products.length
            : event.key === "ArrowLeft"
              ? (index - 1 + products.length) % products.length
              : null;
    if (nextIndex === null) return;
    event.preventDefault();
    setSelectedIndex(nextIndex);
    tabs.current[nextIndex]?.focus();
  }

  return (
    <>
      <div className={styles.showcaseTabs} role="tablist" aria-label={label}>
        {products.map((product, index) => (
          <button
            key={product.slug}
            ref={(element) => {
              tabs.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`project-tab-${product.slug}`}
            aria-label={`${product.name} ${product.statusLabel}`}
            aria-controls="project-panel"
            aria-selected={index === selectedIndex}
            tabIndex={index === selectedIndex ? 0 : -1}
            className={styles.showcaseTab}
            onClick={() => setSelectedIndex(index)}
            onKeyDown={(event) => onKeyDown(event, index)}
          >
            <ProductMark slug={product.slug} />
            <span>
              <strong>{product.name}</strong>
              <small>{product.statusLabel}</small>
            </span>
          </button>
        ))}
      </div>
      <article
        id="project-panel"
        key={selected.slug}
        role="tabpanel"
        aria-labelledby={`project-tab-${selected.slug}`}
        tabIndex={0}
        className={`${styles.showcasePanel} ${selected.slug === "fluxradar" ? styles.showcaseReport : ""} ${!selected.preview ? styles.showcaseTeaser : ""}`}
      >
        <div className={styles.productIntro}>
          <div className={styles.productHeading}>
            <ProductMark slug={selected.slug} />
            <div>
              <div className={styles.nameAndStatus}>
                <h3>{selected.name}</h3>
                <span
                  className={
                    selected.status === "beta"
                      ? styles.beta
                      : selected.status === "active"
                        ? styles.activeStatus
                        : styles.development
                  }
                >
                  {selected.statusLabel}
                </span>
              </div>
              {selected.tagline && (
                <p className={styles.tagline}>{selected.tagline}</p>
              )}
            </div>
          </div>
          <p className={styles.productSummary}>{selected.summary}</p>
          {selected.href && (
            <Link href={selected.href} className={styles.productLink}>
              {viewLabel}
              <span aria-hidden="true">↗</span>
            </Link>
          )}
        </div>
        {selected.preview}
      </article>
    </>
  );
}
