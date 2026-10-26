import { DELIVERY_COUNTRIES, DELIVERY_LANGUAGES } from "@/lib/constants";

const APPLY_ANCHOR = "#apply";

const DELIVERY_META = [
  "Instructor-led group training",
  "Virtual / on-site / hybrid",
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
  about: {
    // Extracted from the source's inline base64 <img> and saved as a real
    // static asset — `#about`'s only media in that file, no CMS field for it.
    media: {
      src: "/course/about_course.webp",
      alt: "An instructor leading a corporate training session with a team around a boardroom table",
    },

    inclusions: {
      banner: {
        text: "Build your team's skills. Anywhere in the world.",
      },
    },
    chips: [
      { title: "Real-world use cases", subtitle: "from day one" },
      { title: "Instructor-led training", subtitle: "for your teams" },
      { title: "Delivered globally", subtitle: "in 100+ countries" },
    ],
  },

  hero: {
    meta: DELIVERY_META,
    actions: [
      {
        label: "View Training Outline",
        href: "#curriculum",
        variant: "primary",
      },
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
      label: "Get a Custom Proposal",
      href: APPLY_ANCHOR,
      note: "We'll review your needs and get back to you with a tailored approach.",
    },
  },

  // Turns on the enquiry bar's email pill (contact@edstellar.com, set in
  // components/common/sticky-footer.jsx), mirroring the domain pages. The CMS
  // `stickyFooter` component's messages/brochure deep-merge on top of this.
  stickyFooter: {
    email: true,
    form_anchor_id: "apply",
  },

  curriculum: {
    section_cta: {
      title: "Customize this program tailored to your team?",
      description:
        "Tell us your training needs: what your team already works with, the level they’re at, and the topics you want them to focus on. We’ll adjust the modules, duration and hands-on labs, and send you a customized outline for your group.",
      cta: { label: "Get a Tailored Outline", href: APPLY_ANCHOR },
    },
  },

  audience: {
    section_cta: {
      title:
        "Different Teams, Locations, Time Zones, or Languages? We've Got You Covered.",
      description:
        "Whether your teams are spread across countries, time zones, languages, or experience levels, we deliver tailored training programs that ensure a consistent learning experience across your global workforce.",
      cta: { label: "Customize Your Training", href: APPLY_ANCHOR },
    },
  },

  deliveryModes: {
    section_cta: {
      title: "Need a customized training format that works for your team?",
      description:
        "Our training delivery is customized to your team's schedule, full days, half days, sessions spread across weeks, or modular formats. Share your preferred timeline, and we'll plan the training around it.",
      cta: { label: "Plan Your Training", href: APPLY_ANCHOR },
    },
  },

  mapsectionData: {
    image: {
      src: "/course/world-map.webp",
      alt: "Global delivery map",
    },
    stats: [
      { value: "10,000+", label: "EXPERT TRAINERS" },
      { value: "5+", label: "YEARS DELIVERING" },
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
