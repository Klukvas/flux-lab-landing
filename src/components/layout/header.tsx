"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { isNavItemActive, navigationItems } from "@/data/navigation";
import { Container } from "@/components/ui";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "./theme-toggle";
import { LocaleSwitcher } from "./locale-switcher";
import { MobileNav } from "./mobile-nav";
import { useScrolledPast } from "./use-scrolled-past";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const hasContentUnderneath = useScrolledPast(0);
  // The menu belongs to the page it was opened on, so moving to another page (a menu
  // link, the Back button) closes it without an effect to keep the two in sync. A
  // language switch remounts the whole locale layout, which closes it as well.
  const [menuPathname, setMenuPathname] = useState<string | null>(null);
  const isMenuOpen = menuPathname === pathname;

  function setMenuOpen(isOpen: boolean) {
    setMenuPathname(isOpen ? pathname : null);
  }

  return (
    // Open, the menu is a modal sheet: it has to cover the floating buttons (z-50) and
    // the cookie card (z-[60]), which it has just made inert.
    <header className={cn("sticky top-0", isMenuOpen ? "z-[70]" : "z-50")}>
      {/* Scroll edge: the bar stays clear until content scrolls under it, then its
          material and hairline fade in. The open menu brings its own material, so the
          bar's steps aside instead of stacking one translucent layer on another. The
          blur lives on this layer, not on <header>, because a blurred ancestor would
          stop the menu sheet's own blur from reaching the page. */}
      <div
        aria-hidden="true"
        className={cn(
          "material-bar absolute inset-0 -z-10 border-b border-gray-200/60 transition-opacity duration-200 contrast-more:border-gray-400 dark:border-gray-800/60",
          hasContentUnderneath && !isMenuOpen ? "opacity-100" : "opacity-0",
        )}
      />
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
              {navigationItems.slice(1).map((item) => {
                const isCurrent = isNavItemActive(item.href, pathname);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isCurrent ? "page" : undefined}
                      className={cn(
                        "rounded-md px-3 py-2 text-sm font-medium transition-colors hover:text-brand dark:hover:text-brand",
                        isCurrent
                          ? "text-foreground"
                          : "text-gray-500 dark:text-gray-400",
                      )}
                    >
                      {t(item.labelKey)}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-1">
            <div className="hidden lg:flex lg:items-center lg:gap-1">
              <ThemeToggle />
              <LocaleSwitcher />
            </div>
            <MobileNav isOpen={isMenuOpen} onOpenChange={setMenuOpen} />
          </div>
        </div>
      </Container>
    </header>
  );
}
