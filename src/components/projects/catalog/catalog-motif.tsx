import type { CSSProperties } from "react";
import type { ProjectCatalogMotif } from "@/types";
import type { ProjectText } from "./use-project-text";
import styles from "./catalog-motif-styles.module.css";

/** Mood levels for the LifeSpan day grid: a fixed pattern, so server and client render alike. */
const DAY_LEVELS = [0.15, 0.35, 0.6, 0.9, 0.25, 0.5, 0.75] as const;
const DAY_COUNT = 42;

interface CatalogMotifProps {
  readonly motif: ProjectCatalogMotif;
  readonly text: ProjectText;
}

export function CatalogMotif({ motif, text }: CatalogMotifProps) {
  switch (motif.kind) {
    case "finding":
      return (
        <div className={styles.finding}>
          <span className={styles.findingBadge}>
            {text("catalog.motif.badge", motif.badge)}
          </span>
          <p>{text("catalog.motif.text", motif.text)}</p>
          <small>{text("catalog.motif.hint", motif.hint)}</small>
        </div>
      );
    case "stages":
      return (
        <div className={styles.stages}>
          {motif.stages.map((stage, index) => (
            <span
              key={stage.label}
              style={{ "--dot": stage.color } as CSSProperties}
            >
              {text(`catalog.motif.stages.${index}`, stage.label)}
              <em>{stage.count}</em>
            </span>
          ))}
        </div>
      );
    case "schedule": {
      const free = text("catalog.motif.freeLabel", motif.freeLabel);
      const busy = text("catalog.motif.busyLabel", motif.busyLabel);
      return (
        <div className={styles.schedule}>
          {motif.rows.map((row, rowIndex) => (
            <div key={row.label} className={styles.scheduleRow}>
              <span className={styles.scheduleLabel}>
                {text(`catalog.motif.rows.${rowIndex}`, row.label)}
              </span>
              {row.slots.map((slot, slotIndex) => (
                <span
                  // Slots have no identity beyond their place in the row.
                  key={slotIndex}
                  className={
                    slot === "free" ? styles.slotFree : styles.slotBusy
                  }
                >
                  {slot === "free" ? free : busy}
                </span>
              ))}
            </div>
          ))}
        </div>
      );
    }
    case "listing":
      return (
        <div className={styles.listing}>
          <div>
            <small>{text("catalog.motif.caption", motif.caption)}</small>
            <b>{motif.price}</b>
          </div>
          <span aria-hidden="true">→</span>
        </div>
      );
    case "receipt":
      return (
        <div className={styles.receipt}>
          <b>{text("catalog.motif.title", motif.title)}</b>
          {motif.lines.map((line, index) => (
            <div key={line.label} className={styles.receiptLine}>
              <span>{text(`catalog.motif.lines.${index}`, line.label)}</span>
              <span>{line.amount}</span>
            </div>
          ))}
          <div className={styles.receiptTotal}>
            <span>{text("catalog.motif.totalLabel", motif.totalLabel)}</span>
            <span>{motif.total}</span>
          </div>
        </div>
      );
    case "days":
      return (
        <div className={styles.days}>
          {Array.from({ length: DAY_COUNT }, (_, index) => (
            <i
              key={index}
              style={
                {
                  "--level": DAY_LEVELS[(index * 5) % DAY_LEVELS.length],
                } as CSSProperties
              }
            />
          ))}
          <small>{text("catalog.motif.caption", motif.caption)}</small>
        </div>
      );
    case "product":
      return (
        <div className={styles.product}>
          <span className={styles.productImage} aria-hidden="true" />
          <div className={styles.productBody}>
            <small>{motif.brand}</small>
            <b>{text("catalog.motif.name", motif.name)}</b>
            <span className={styles.productPrice}>
              {text("catalog.motif.price", motif.price)}
            </span>
            <span className={styles.productStock}>
              {text("catalog.motif.stock", motif.stock)}
            </span>
          </div>
          <span className={styles.productAction}>
            {text("catalog.motif.action", motif.action)}
          </span>
        </div>
      );
  }
}
