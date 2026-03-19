interface LogoProps {
  readonly size?: "sm" | "md";
}

const sizeClasses = {
  sm: "text-lg gap-1.5",
  md: "text-xl gap-2",
} as const;

export function Logo({ size = "md" }: LogoProps) {
  return (
    <span className={`flex items-center font-semibold ${sizeClasses[size]}`}>
      <span className="font-mono tracking-tight">
        <span className="text-[#5B4FD2] dark:text-[#7B6EF6]">[</span>
        <span className="mx-px text-[#12102A] dark:text-white"> F </span>
        <span className="text-[#5B4FD2] dark:text-[#7B6EF6]">]</span>
      </span>

      <span className="text-[#12102A] dark:text-white">
        <span className="font-bold">flux-lab</span>
        <span className="text-[#5B4FD2] dark:text-[#7B6EF6]">.dev</span>
      </span>

      <span
        className="ml-px inline-block h-[1em] w-[2px] translate-y-[1px] bg-[#5B4FD2] dark:bg-[#7B6EF6] animate-blink"
        aria-hidden="true"
      />
    </span>
  );
}
