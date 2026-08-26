/**
 * Scaffolding every course page shares.
 *
 * None of this is course-specific — the delivery facts row, the hero buttons,
 * the "want this adapted?" CTA under each section, and the trust stats are the
 * same on every course. The CMS does not model them, so they are merged in
 * beneath every course by `lib/content/courses.js`.
 *
 * **This is what lets a brand-new CMS course render complete with no code
 * change and no hand-authored fallback file.** Anything genuinely specific to
 * one course belongs in that course's own JSON, not here.
 *
 * Field names and casing follow the CMS convention (TASTE.md §5.4) so the
 * merge is a plain overlay.
 */

import { DELIVERY_COUNTRIES, DELIVERY_LANGUAGES } from "@/lib/constants";

const APPLY_ANCHOR = "#apply";

const DELIVERY_META = [
  "Instructor-led group training",
  "Virtual / on-site / off-site",
  {
    label: "10 languages",
    tooltip: { heading: "Delivered in", body: DELIVERY_LANGUAGES.join(", ") },
  },
  {
    label: "100+ countries",
    tooltip: {
      heading: "We have delivered in",
      body: `${DELIVERY_COUNTRIES.join(", ")} and 90+ more countries`,
    },
  },
];

export const COURSE_DEFAULTS = {
  hero: {
    meta: DELIVERY_META,
    actions: [
      { label: "View course outline", href: "#curriculum", variant: "primary" },
      { label: "Enquire now", href: APPLY_ANCHOR, variant: "ghost" },
    ],
    group_quote: {
      prompt: "Need more than one program?",
      label: "Get a group quote",
      href: "#group-quote",
    },
  },

  pageToc: {
    cta: {
      label: "Request a Proposal",
      href: APPLY_ANCHOR,
      note: "A specialist replies within one business day.",
    },
  },

  curriculum: {
    section_cta: {
      title: "Want this syllabus re-weighted to your gaps?",
      description:
        "The modules can be adapted to your needs. Tell us what your team already knows, and we’ll customize the training curriculum around it.",
      cta: { label: "Customize Your Training Today", href: APPLY_ANCHOR },
    },
  },

  audience: {
    section_cta: {
      title: "Mixed cohort, or several teams at once?",
      description:
        "We can tailor the training to different teams, roles, and experience levels within the same program.",
      cta: { label: "Share Your Requirements", href: APPLY_ANCHOR },
    },
  },

  deliveryModes: {
    section_cta: {
      title: "Need a training format that works for your team?",
      description:
        "Full days, half days across weeks, or split by module. Tell us the delivery window and we schedule the cohort around it.",
      cta: { label: "Plan Your Training", href: APPLY_ANCHOR },
    },
  },

  faqs: {
    section_cta: {
      title: "Question not answered here?",
      description:
        "Put it in the request. A training specialist answers it directly, within one business day.",
      cta: { label: "Talk to our Expert", href: APPLY_ANCHOR },
    },
  },

  mapsectionData: {
    stats: [
      { value: "10,000+", label: "EXPERT TRAINERS" },
      { value: "13+", label: "YEARS DELIVERING" },
      { value: "1,000+", label: "ORGANIZATIONS TRAINED" },
      {
        value: "ISO 9001",
        connector: "&",
        secondary_value: "27001",
        label: "CERTIFIED",
      },
    ],
  },
};
