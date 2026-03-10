"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@/i18n/navigation";
import { navigationItems } from "@/data/navigation";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";

export function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("nav");

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="rounded-md p-2 text-gray-500 hover:text-foreground dark:text-gray-400 dark:hover:text-foreground transition-colors"
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          )}
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/70"
          >
            <nav className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
              <ul className="space-y-2">
                {navigationItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-500 hover:text-foreground dark:text-gray-400 dark:hover:text-foreground transition-colors"
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-4 flex items-center gap-2 border-t border-gray-200 pt-4 dark:border-gray-800">
                <ThemeToggle />
                <LocaleSwitcher />
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
