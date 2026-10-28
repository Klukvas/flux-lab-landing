"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import { ThemedImage } from "./themed-image";

interface ScreenshotZoomProps {
  readonly src: string;
  /** The dark-theme variant, shown instead of `src` while the dark theme is active. */
  readonly srcDark?: string;
  readonly alt: string;
  readonly isPriority?: boolean;
  /** The frame's aspect class. Carousel slides share the wide default so they line up. */
  readonly aspectClassName?: string;
  /** How wide the thumbnail renders, so the browser fetches a fitting size. */
  readonly sizes?: string;
  /** The zoom button's accessible name, for images that are not screenshots. */
  readonly openLabel?: string;
  /** The dialog's close button name, paired with `openLabel`. */
  readonly closeLabel?: string;
}

/**
 * A screenshot that opens full size on click. The frame keeps every slide the same
 * height, so wide shots shrink to fit inside it rather than losing their edges; the
 * dialog then shows the whole thing as large as the screen allows.
 */
export function ScreenshotZoom({
  src,
  srcDark,
  alt,
  isPriority,
  aspectClassName = "aspect-[2/1]",
  sizes = "(max-width: 768px) 100vw, 60vw",
  openLabel,
  closeLabel,
}: ScreenshotZoomProps) {
  const t = useTranslations("projects");
  const dialogRef = useRef<HTMLDialogElement>(null);

  return (
    <>
      <button
        type="button"
        onClick={() => dialogRef.current?.showModal()}
        aria-label={openLabel ?? t("openScreenshot", { title: alt })}
        className={cn(
          "group relative block",
          aspectClassName,
          "w-full cursor-zoom-in bg-gray-950",
        )}
      >
        <ThemedImage
          src={src}
          srcDark={srcDark}
          alt={alt}
          className="object-contain object-top"
          sizes={sizes}
          isPriority={isPriority}
        />
        <span
          aria-hidden="true"
          className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-black/50 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100"
        >
          <ExpandIcon />
        </span>
      </button>

      {/* A native modal dialog brings Escape, focus trapping and an inert page for free.
          Any click inside closes it, as image viewers usually do. */}
      <dialog
        ref={dialogRef}
        aria-label={alt}
        onClick={() => dialogRef.current?.close()}
        className="m-0 h-dvh max-h-none w-dvw max-w-none cursor-zoom-out bg-transparent p-4 backdrop:bg-black/85 backdrop:backdrop-blur-sm sm:p-8"
      >
        <div className="relative h-full w-full">
          <ThemedImage
            src={src}
            srcDark={srcDark}
            alt={alt}
            className="object-contain"
            sizes="100vw"
          />
        </div>
        <button
          type="button"
          aria-label={closeLabel ?? t("closeScreenshot")}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 text-white backdrop-blur-sm hover:bg-black/80"
        >
          <CloseIcon />
        </button>
      </dialog>
    </>
  );
}

function ExpandIcon() {
  return (
    <svg
      className="h-4 w-4"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
    </svg>
  );
}
