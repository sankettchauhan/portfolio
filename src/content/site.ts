/**
 * Navigation. `href`s starting with "/#" scroll to a homepage section and
 * still work from subpages.
 */
export type NavItem = { label: string; href: string };

export const navItems: NavItem[] = [
  { label: "Experience", href: "/#experience" },
  { label: "Projects", href: "/#projects" },
  { label: "Arcade", href: "/#arcade" },
  { label: "Writing", href: "/#writing" },
  { label: "Contact", href: "/#contact" },
];
