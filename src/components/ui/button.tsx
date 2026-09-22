import { forwardRef, type ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "inverted";
type ButtonSize = "sm" | "md" | "lg";

interface ButtonStyleOptions {
  readonly variant?: ButtonVariant;
  readonly size?: ButtonSize;
  readonly className?: string;
}

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    Omit<ButtonStyleOptions, "className"> {}

const variantStyles: Record<ButtonVariant, string> = {
  primary: "border border-transparent bg-brand text-white hover:bg-brand-dark",
  inverted: "border border-transparent bg-white text-[#3D32A8] hover:bg-gray-100",
  secondary:
    "border border-transparent bg-gray-100 text-gray-900 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700",
  outline:
    "border border-gray-300 text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-900",
  ghost:
    "border border-transparent text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-4 py-2 text-base",
  lg: "px-6 py-3 text-lg",
};

/**
 * Button styling for elements that are not a <button>. A link styled this way stays a
 * single link, instead of a button nested inside a link (two tab stops, invalid HTML).
 */
export function buttonStyles({
  variant = "primary",
  size = "md",
  className,
}: ButtonStyleOptions = {}): string {
  return cn(
    "pressable inline-flex items-center justify-center rounded-md font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
    variantStyles[variant],
    sizeStyles[size],
    className,
  );
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={buttonStyles({ variant, size, className })}
        {...props}
      />
    );
  },
);

Button.displayName = "Button";
