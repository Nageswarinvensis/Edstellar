import {
  CLIENT_LOGOS_DATA,
  DELIVERY_COUNTRIES,
  DELIVERY_LANGUAGES,
} from "@/lib/constants";

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
  ClientsLogosData: CLIENT_LOGOS_DATA,

  about: {
    // Extracted from the source's inline base64 <img> and saved as a real
    // static asset — `#about`'s only media in that file, no CMS field for it.
    media: {
      src: "/course/ml-model-monitoring-about.jpg",
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
      title: "Want this program tailored to your team?",
      description:
        "Tell us your training needs: what your team already works with, the level they’re at, and the topics you want them to focus on. We’ll adjust the modules, duration and hands-on labs, and send you a customized outline for your group.",
      cta: { label: "Get a Tailored Outline", href: APPLY_ANCHOR },
    },

    // The real `curriculum` component (verified against
    // `data-science/ml-model-monitoring-course`) sends `meta`, `filters`,
    // `heading`, `modules`, `description`, `author_credit` and
    // `method.summary_pills` — so none of those are authored here. These
    // six `method` fields are the ones it does *not* send, so they're what
    // stays static; a real CMS record starting to send any of them would
    // simply override it, same as any other field.
    method: {
      steps: [
        {
          label: "Assess",
          parts: [
            { text: "Baseline each participant’s level before module 01" },
          ],
        },
        {
          label: "Learn",
          parts: [
            { text: "Build strong foundations in instructor-led sessions" },
          ],
        },
        {
          label: "Practice",
          parts: [{ text: "Reinforce skills through hands-on labs" }],
        },
        {
          label: "Apply",
          parts: [
            { text: "Work on real-world scenarios and a capstone project" },
          ],
        },
      ],
      split: [
        { phase_key: "assess", label: "Assess", percent: 4 },
        { phase_key: "learn", label: "Learn", percent: 13 },
        { phase_key: "practice", label: "Practice", percent: 65 },
        { phase_key: "apply", label: "Apply", percent: 18 },
      ],
      note: "A short <b>pre-training assessment sets each participant’s entry level</b>, so the program starts where your team actually is. The rest is weighted toward hands-on practice: labs run against a live monitoring stack with injected drift, not slides.",
      formats: ["Multi-day program", "Weekly sessions", "Split into batches"],
      summary_note:
        "<b>Entry level set by the assessment.</b> Depth and schedule customized to your team.",
      // Extracted from the source's inline base64 <img> and saved as a real
      // static asset — no CMS field for it.
      media: {
        src: "/course/ml-model-monitoring-method.jpg",
        alt: "A team reviewing a model monitoring dashboard together on a laptop",
      },
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

  mapsectionData: {
    image: {
      src: "/course/map1.png",
      alt: "Global delivery map",
    },
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
