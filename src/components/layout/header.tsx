"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { navigationItems } from "@/data/navigation";
import { Container } from "@/components/ui";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";

export function Header() {
  const t = useTranslations("nav");

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200/50 bg-white/70 backdrop-blur-xl dark:border-gray-800/50 dark:bg-gray-950/70">
      <Container>
        <div className="flex h-12 items-center justify-between">
          <Link
            href="/"
            className="flex items-center"
            aria-label="flux-lab.dev — home"
          >
            <Logo size="md" />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {navigationItems.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="rounded-md px-3 py-2 text-sm font-medium text-gray-500 hover:text-foreground dark:text-gray-400 dark:hover:text-foreground transition-colors"
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              <ThemeToggle />
              <LocaleSwitcher />
            </div>
            <MobileNav />
          </div>
        </div>
      </Container>
    </header>
  );
}
