/**
 * Scaffolding every domain page shares. Mirrors `content/courses/defaults.js`
 * — merged in beneath every domain by `lib/content/domains.js` so a section
 * the CMS has not modeled yet (the client-logo strip) still renders.
 */

import { CLIENT_LOGOS_DATA } from "@/lib/constants";

/**
 * Every domain's breadcrumb trail starts with the same two crumbs — only the
 * trailing, domain-specific crumb(s) differ. `deepMerge` never merges arrays
 * (TASTE.md: a later array is the complete list, not a splice target), so
 * this can't live inside `DOMAIN_DEFAULTS` the way object fields do; each
 * domain spreads it directly instead: `breadcrumbs: [...BREADCRUMB_PREFIX,
 * { label: "..." }]`.
 */
export const BREADCRUMB_PREFIX = [
  { href: "/", label: "Home" },
  { href: "/corporate-training", label: "Corporate Training" },
];

export const DOMAIN_DEFAULTS = {
  ClientsLogosData: CLIENT_LOGOS_DATA,

  /**
   * Every course card's delivery badge (INSTRUCTOR-LED · ON-SITE · VIRTUAL)
   * — every course across every domain ships in the same three formats
   * today, so this is the fallback `program.jsx` reads when a course object
   * doesn't set its own `delivery`, rather than repeating this identical
   * object on every one of 100+ course entries.
   */
  delivery: {
    instructorLed: true,
    onSite: true,
    virtual: true,
  },
  sticky_nav: {
    logo: {
      src: "/course/Edstellar.svg",
      alt: "Edstellar",
    },
    tabs: [
      { id: "about", label: "About", active: true },
      { id: "by-topic", label: "By topic", active: false },
      { id: "by-role", label: "By role", active: false },
      { id: "paths", label: "Paths", active: false },
      { id: "delivery", label: "Delivery", active: false },
      { id: "trainers", label: "Trainers", active: false },
      { id: "why-edstellar", label: "Why Edstellar", active: false },
      { id: "faqs", label: "FAQ", active: false },
    ],
  },
  stickyFooter: {
    email: "contact@edstellar.com",
    catalog: {
      label: "Catalog",
      href: "#by-topic",
    },
    brochure: {
      label: "Brochure",
      href: "#apply",
    },
    form_anchor_id: "apply",
  },
};
