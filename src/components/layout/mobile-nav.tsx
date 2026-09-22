"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, type Variants } from "framer-motion";
import { Link, usePathname } from "@/i18n/navigation";
import { isNavItemActive, navigationItems } from "@/data/navigation";
import { QUICK_SPRING } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { LocaleSwitcher } from "./locale-switcher";
import { MenuIcon } from "./menu-icon";
import { ThemeToggle } from "./theme-toggle";
import { useMenuSheet } from "./use-menu-sheet";

interface MobileNavProps {
  readonly isOpen: boolean;
  readonly onOpenChange: (isOpen: boolean) => void;
}

const SHEET_ID = "mobile-menu";

// The sheet arrives as one material, then its rows drop in a beat apart from the bar
// that opened them. On the way out everything retraces that path in one quick fade.
const sheetVariants: Variants = {
  open: {
    opacity: 1,
    transition: {
      duration: 0.2,
      ease: "easeOut",
      staggerChildren: 0.03,
      delayChildren: 0.03,
    },
  },
  closed: { opacity: 0, transition: { duration: 0.2, ease: "easeIn" } },
};

const rowVariants: Variants = {
  open: { opacity: 1, y: 0, transition: QUICK_SPRING },
  closed: { opacity: 0, y: -8, transition: { duration: 0.15, ease: "easeIn" } },
};

export function MobileNav({ isOpen, onOpenChange }: MobileNavProps) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const toggleRef = useRef<HTMLButtonElement>(null);
  useMenuSheet({ isOpen, onClose: () => onOpenChange(false), toggleRef });

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => onOpenChange(!isOpen)}
        className="pressable rounded-md p-2 text-gray-500 hover:text-foreground dark:text-gray-400 dark:hover:text-foreground"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={SHEET_ID}
      >
        <MenuIcon isOpen={isOpen} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            id={SHEET_ID}
            variants={sheetVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="material-sheet fixed inset-0 -z-10 overflow-y-auto overscroll-contain pt-12"
          >
            <nav className="mx-auto max-w-7xl px-4 pb-10 pt-6 sm:px-6">
              <ul className="space-y-1">
                {navigationItems.map((item) => {
                  const isCurrent = isNavItemActive(item.href, pathname);
                  return (
                    <motion.li key={item.href} variants={rowVariants}>
                      <Link
                        href={item.href}
                        onClick={() => onOpenChange(false)}
                        aria-current={isCurrent ? "page" : undefined}
                        className={cn(
                          "block rounded-lg px-3 py-2 text-2xl font-semibold transition-colors active:bg-gray-100 dark:active:bg-gray-800/60",
                          isCurrent
                            ? "text-foreground"
                            : "text-gray-500 hover:text-foreground dark:text-gray-400 dark:hover:text-foreground",
                        )}
                      >
                        {t(item.labelKey)}
                      </Link>
                    </motion.li>
                  );
                })}
              </ul>
              <motion.div
                variants={rowVariants}
                className="mt-6 flex items-center gap-2 border-t border-gray-200 pt-6 dark:border-gray-800"
              >
                <ThemeToggle />
                <LocaleSwitcher />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
