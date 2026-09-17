/**
 * Scaffolding every domain page shares. Mirrors `content/courses/defaults.js`
 * — merged in beneath every domain by `lib/content/domains.js` so a section
 * the CMS has not modeled yet (the client-logo strip) still renders.
 */

import { CLIENT_LOGOS_DATA } from "@/lib/constants";

export const DOMAIN_DEFAULTS = {
  ClientsLogosData: CLIENT_LOGOS_DATA,
  hero: {
    actions: [
      {
        label: "Browse AI programs",
        href: "#catalog",
        variant: "primary",
      },
      {
        label: "Ask a question",
        href: "#apply",
        variant: "ghost",
      },
      {
        label: "Download Brochure",
        href: "#apply",
        variant: "ghost",
      },
    ],
  },
  sticky_footer: {
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
