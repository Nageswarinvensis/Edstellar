/**
 * L&D template / tool pages (`/templates/{slug}`) — only the parts that stay
 * static. Everything else (SEO, breadcrumbs, hero, intro, features, audience, steps, benefits,
 * FAQs) comes from the CMS site page `templates/{slug}`; see
 * `lib/content/templates.js` and `docs/cms/templates/`.
 */

/** The sidebar promo and "Reach Us" strip — the same on every template page,
 * so they stay static rather than being CMS components. */
export const TEMPLATE_SHARED = {
  promo: {
    heading: "Turn Your L&D Strategy Into a <span>Competitive Advantage.</span>",
    cta: { label: "Book Your L&D Strategy Call", href: "/learning-development-consulting-services" },
  },
  reach: {
    heading: "Reach Us:",
    email: "contact@edstellar.com",
    phones: [
      { label: "USA +1 682 297 4830", tel: "+16822974830" },
      { label: "UK +44 151 453 4009", tel: "+441514534009" },
      { label: "India +91 636 483 3830", tel: "+916364833830" },
    ],
  },
};
