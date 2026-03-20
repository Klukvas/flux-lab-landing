import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  readonly hover?: boolean;
}

export function Card({ className, hover = false, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-gray-950",
        hover &&
          "transition-colors hover:border-brand/20 dark:hover:border-brand/20",
        className,
      )}
      {...props}
    />
  );
}
