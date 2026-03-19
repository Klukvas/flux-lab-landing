interface LogoProps {
  readonly size?: "sm" | "md";
}

const sizeClasses = {
  sm: "text-lg gap-1.5",
  md: "text-xl gap-2",
} as const;

export function Logo({ size = "md" }: LogoProps) {
  return (
    <span className={`flex items-center font-bold ${sizeClasses[size]}`}>
      <span className="font-mono tracking-tight" aria-hidden="true">
        <span className="text-brand">[</span>
        <span className="mx-px text-foreground"> F </span>
        <span className="text-brand">]</span>
      </span>

      <span>
        <span className="text-foreground">flux-lab</span>
        <span className="text-brand">.dev</span>
      </span>

      <span
        className="ml-px inline-block h-[1em] w-[2px] translate-y-[1px] bg-brand animate-blink"
        aria-hidden="true"
      />
    </span>
  );
}
