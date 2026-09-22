import { describe, expect, it } from 'vitest';
import { isNavItemActive } from './navigation';

describe('isNavItemActive', () => {
  it('marks a section current on its own page and its detail pages', () => {
    expect(isNavItemActive('/projects', '/projects')).toBe(true);
    expect(isNavItemActive('/projects', '/projects/washflow')).toBe(true);
  });

  it('does not match a different section that shares a prefix', () => {
    expect(isNavItemActive('/blog', '/blogroll')).toBe(false);
  });

  it('marks Home current only on the home page', () => {
    expect(isNavItemActive('/', '/')).toBe(true);
    expect(isNavItemActive('/', '/projects')).toBe(false);
  });
});
