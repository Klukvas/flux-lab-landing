import { cn } from "@/lib/utils";

interface MenuIconProps {
  readonly isOpen: boolean;
}

const BAR =
  "absolute left-[3.75px] h-[1.5px] w-[16.5px] rounded-full bg-current transition-[translate,rotate,opacity] duration-[450ms] ease-spring";

/** Three bars that fold into an X and back, so the icon shows what the next tap does. */
export function MenuIcon({ isOpen }: MenuIconProps) {
  return (
    <span aria-hidden="true" className="relative block h-6 w-6">
      <span
        className={cn(BAR, "top-[6px]", isOpen && "translate-y-[5.25px] rotate-45")}
      />
      <span className={cn(BAR, "top-[11.25px]", isOpen && "opacity-0")} />
      <span
        className={cn(
          BAR,
          "top-[16.5px]",
          isOpen && "-translate-y-[5.25px] -rotate-45",
        )}
      />
    </span>
  );
}
