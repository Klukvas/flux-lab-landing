export interface NavItem {
  readonly labelKey: string;
  readonly href: string;
}

export const navigationItems: readonly NavItem[] = [
  { labelKey: 'home', href: '/' },
  { labelKey: 'projects', href: '/projects' },
  { labelKey: 'services', href: '/services' },
  { labelKey: 'blog', href: '/blog' },
  { labelKey: 'about', href: '/about' },
  { labelKey: 'careers', href: '/careers' },
  { labelKey: 'contact', href: '/contact' },
] as const;

/** A section stays current on its detail pages too (/projects/washflow keeps Projects lit). */
export function isNavItemActive(href: string, pathname: string): boolean {
  if (href === '/') {
    return pathname === '/';
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
