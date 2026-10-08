import { DELIVERY_COUNTRIES, DELIVERY_LANGUAGES } from "@/lib/constants";

const LANGUAGE_TOOLTIP = {
  heading: "Delivered in",
  body: DELIVERY_LANGUAGES.join(", "),
};

const COUNTRY_TOOLTIP = {
  heading: "We have delivered in",
  body: `${DELIVERY_COUNTRIES.join(", ")} and 90+ more countries`,
};

const DELIVERY_META = [
  "Instructor-led workshops and programs",
  "In-house, virtual or blended",
  { label: "10 languages", tooltip: LANGUAGE_TOOLTIP },
  { label: "100+ countries", tooltip: COUNTRY_TOOLTIP },
];
/**
 * Scaffolding every domain page shares. Mirrors `content/courses/defaults.js`
 * — merged in beneath every domain by `lib/content/domains.js` so a section
 * the CMS has not modeled yet still renders.
 */

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
  /**
   * Fallback hero CTAs. A domain modeled purely in the CMS may not have its
   * `hero.actions` filled in yet; these three generic buttons render until it
   * does. `deepMerge` leaves them untouched when the CMS sends its own
   * `hero.actions` (an array replaces wholesale) and fills them in when it
   * doesn't (an absent/`null` field falls back) — so a domain that configures
   * its own hero buttons keeps them, and one that hasn't still shows CTAs.
   */
  hero: {
    // Delivery meta row (`<HeroMeta>`). The CMS `hero` doesn't send `meta`, so
    // every domain shares this fallback.
    meta: DELIVERY_META,
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
    email: true,
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
  /**
   * The catalog section's UI chrome — filter labels, badges, pagination and
   * card button text — is identical for every domain; only the course list
   * and heading are domain-specific and come from the CMS. A domain modeled
   * purely in the CMS (no local content file) still needs these labels, so
   * they live here and the CMS's `programData` merges on top (TASTE.md §5.4).
   */
  programData: {
    filters: {
      allDisciplines: "All disciplines",
    },
    catalog: {
      showingLabel: "SHOWING",
      ofLabel: "OF",
      liveCatalogLabel: "IN THE LIVE CATALOG",
      searchPlaceholder: "Search programs",
      noResults:
        "No program matches that combination in this selection. We build custom programs where nothing fits.",
      actions: [
        { label: "Ask for a Match", href: "#apply", variant: "primary" },
      ],
      courseCount: 0,
      deliveryBadge: {
        instructorLed: "INSTRUCTOR-LED",
        separator: "·",
        onSite: "ON-SITE",
        virtual: "VIRTUAL",
      },
      card: {
        viewProgram: "VIEW PROGRAM",
        requestProgram: "REQUEST PROGRAM",
        durationOnRequest: "DURATION ON REQUEST",
        hoursSuffix: "HRS",
        proposedLabel: "PROPOSED",
        proposedProgramLabel: "PROPOSED PROGRAM",
      },
      pagination: {
        previous: "PREVIOUS",
        next: "NEXT",
        allProgramsSuffix: "ALL",
      },
    },
  },
};
