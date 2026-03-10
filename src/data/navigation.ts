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
