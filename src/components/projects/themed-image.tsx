import Image from "next/image";
import { cn } from "@/lib/utils";

interface ThemedImageProps {
  readonly src: string;
  /** The dark-theme variant. Without it, `src` is shown in both themes. */
  readonly srcDark?: string;
  readonly alt: string;
  readonly className?: string;
  readonly sizes?: string;
  /** Dark is the site's default theme, so only the dark variant is preloaded. */
  readonly isPriority?: boolean;
}

/**
 * Shows the screenshot that matches the active theme. Both variants are in the markup and
 * CSS hides one, so the right one is visible from first paint with no hydration flicker;
 * the hidden one is lazy and never downloaded.
 */
export function ThemedImage({
  src,
  srcDark,
  alt,
  className,
  sizes,
  isPriority,
}: ThemedImageProps) {
  if (!srcDark) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={className}
        sizes={sizes}
        priority={isPriority}
      />
    );
  }

  return (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className={cn(className, "dark:hidden")}
        sizes={sizes}
      />
      <Image
        src={srcDark}
        alt={alt}
        fill
        className={cn(className, "hidden dark:block")}
        sizes={sizes}
        priority={isPriority}
      />
    </>
  );
}
