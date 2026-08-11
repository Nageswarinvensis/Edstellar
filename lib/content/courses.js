import { cache } from "react";

import { DELIVERY_COUNTRIES, DELIVERY_LANGUAGES } from "@/lib/constants";

/**
 * STATIC CONTENT — TEMPORARY
 *
 * Hand-authored view models transcribed from the approved page designs. The
 * backend is not ready; when it is, only the exported functions at the bottom of
 * this file change. Pages and components already consume the shape below and
 * must not be touched (TASTE.md §5.2).
 *
 * Headings that mix roman and serif-italic type are stored as `parts`, where
 * `em: true` marks the italic accent. Spaces are part of the text.
 *
 * Image and video assets are `null` — the designs ship base64 placeholders that
 * cannot be reused. Sections render a tonal placeholder until real files land in
 * /public. Trainer photos are stock and must be replaced with consent.
 */

const LANGUAGE_TOOLTIP = {
  heading: "Delivered in",
  body: DELIVERY_LANGUAGES.join(", "),
};

const COUNTRY_TOOLTIP = {
  heading: "We have delivered in",
  body: `${DELIVERY_COUNTRIES.join(", ")} and 90+ more countries`,
};

const DELIVERY_META = [
  "Instructor-led group training",
  "Virtual / on-site / off-site",
  { label: "10 languages", tooltip: LANGUAGE_TOOLTIP },
  { label: "100+ countries", tooltip: COUNTRY_TOOLTIP },
];

const PLACEHOLDER_TRAINERS = [
  { name: "Trainer A", photo: null },
  { name: "Trainer B", photo: null },
  { name: "Trainer C", photo: null },
  { name: "Trainer D", photo: null },
];

/* ========================================================================== */
/* DOMAIN HUB PAGES — /corporate-training/domain/{slug}                        */
/* ========================================================================== */

const DOMAIN_COURSES = {
  "artificial-intelligence": {
    slug: "artificial-intelligence",
    name: "Artificial Intelligence",
    seo: {
      title: "Corporate Artificial Intelligence Training",
      description:
        "Instructor-led corporate AI training across generative AI, machine learning, MLOps and governance. Scoped to your stack, delivered onsite or virtually in 100+ countries.",
      ogImage: null,
    },
    hero: {
      headlineParts: [
        { text: "Corporate " },
        { text: "Artificial Intelligence", em: true },
        { text: " Training" },
      ],
      subhead: "Build the people who will run your AI, not just the models.",
      lede: "We build AI capability inside enterprises: the people, the standards and the governance that let an organization run AI itself. Instructor-led programs across generative AI, machine learning, MLOps and governance are how we do it, scoped to your stack and delivered wherever your teams are.",
      meta: DELIVERY_META,
      media: {
        image: null,
        video: null,
        alt: "An enterprise team reviewing AI systems on a shared display",
      },
      actions: [
        { label: "Browse AI programs", href: "#catalog", variant: "primary" },
        { label: "Ask a question", href: "#apply", variant: "ghost" },
      ],
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "IT & Technical", href: "/corporate-training" },
      { label: "Artificial Intelligence" },
    ],
    proof: {
      tone: "light",
      stats: [
        { value: "130", label: "AI programs" },
        { value: "6", label: "Disciplines" },
        { value: "7", label: "Role paths" },
      ],
      trainers: {
        value: "300+",
        label: "AI trainers",
        people: PLACEHOLDER_TRAINERS,
      },
    },
    about: {
      mark: { keyword: "Definition", label: "What this covers" },
      headlineParts: [
        { text: "What is corporate " },
        { text: "AI training", em: true },
        { text: "?" },
      ],
      lede: "Corporate AI training is instructor-led group training that builds an organization's ability to design, deploy, and govern artificial intelligence systems. It spans two tracks: technical depth for the data, engineering, and MLOps teams who build and run models, and broad enablement for the functions who now use AI tools in daily work. Programs are scoped to an employer's stack and delivered to a closed cohort rather than sold as individual seats.",
      more: [
        "The distinction that matters commercially is between capability and access. Individual licenses give people tools; group training gives a team a shared baseline: the same patterns, the same evaluation habits, and the same rules for handling data. For enterprises deploying AI under regulatory obligation, that shared baseline is what an auditor can be shown.",
        "Programs split across two tracks. Technical depth for the data, engineering and MLOps teams who build and run models. Broad enablement for finance, marketing, HR and operations, who now use AI tools daily and are the larger source of ungoverned adoption.",
      ],
    },
  },
};

/* ========================================================================== */
/* VENDOR COURSE PAGES — /corporate-training/vendor/{slug}                     */
/* ========================================================================== */

const CATEGORY_COURSES = {
  "ml-model-monitoring": {
    slug: "ml-model-monitoring",
    name: "ML Model Monitoring",
    seo: {
      title: "ML Model Monitoring Corporate Training",
      description:
        "Instructor-led ML Model Monitoring training covering drift detection, performance tracking, alerting, retraining and fairness governance. Delivered onsite, virtually or hybrid.",
      ogImage: null,
    },
    hero: {
      headlineParts: [
        { text: "ML Model " },
        { text: "Monitoring", em: true },
        { text: " Corporate Training" },
      ],
      subhead: "Keep production ML models accurate, fair, and trusted.",
      lede: "ML Model Monitoring corporate training gives your ML, data science, and MLOps teams the confidence to run production models at scale, covering drift detection, performance tracking, alerting, retraining, and fairness governance. Customized, expert-led group training for employees, delivered onsite, live virtual, or hybrid to teams in 100+ countries.",
      meta: DELIVERY_META,
      media: {
        image: "/course/hero-photo.jpg",
        video: null,
        alt: "A team reviewing production model health metrics on a shared dashboard",
      },
      actions: [
        {
          label: "View course outline",
          href: "#curriculum",
          variant: "primary",
        },
        { label: "Enquire now", href: "#apply", variant: "ghost" },
      ],

      groupQuote: {
        prompt: "Need more than one program?",
        label: "Get a group quote",
        href: "#group-quote",
      },
    },
    breadcrumbs: [
      { label: "Home", href: "/" },
      { label: "IT & Technical", href: "/corporate-training" },
      {
        label: "Artificial Intelligence",
        href: "/corporate-training/domain/artificial-intelligence",
      },
      {
        label: "Machine Learning",
        href: "/corporate-training/domain/machine-learning",
      },
      { label: "ML Model Monitoring" },
    ],
    proof: {
      tone: "dark",
      badges: [
        "Drift detection",
        "Performance tracking",
        "Alerting & response",
        "Retraining & A/B",
        "Explainability",
        "Fairness & compliance",
      ],
      stats: [
        { value: "24–40", label: "Hours" },
        { value: "10", label: "Modules" },
        { value: "8", label: "Hands-on labs" },
      ],
      trainers: {
      value: "4.8/5",
      label: "47 reviews",
      people: [
      {
        photo: "https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/6a69c57f6097d45480150d76_avtar.svg",
      },
    ],
      count: "4+",
      trainerLabel: "Expert trainers",
      meetLabel: "Meet them",
      stars: 5,
    },
      actions: [
        { label: "Watch preview", href: "#preview", type: "preview" },
        { label: "Download brochure", href: "#brochure", type: "brochure" },
      ],
    },
  "ClientsLogosData" : {
  heading: "Trusted by teams at",

  logos: [
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a9c115c2a0faf78d5187_Abb.webp",
      alt: "ABB",
      title: "ABB",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6aa7c4dc52f902b965f86_Aditya%20Birla%20Group.webp",
      alt: "Aditya Birla Group",
      title: "Aditya Birla Group",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b587f256c7ca56ef383708_Adobe.webp",
      alt: "Adobe",
      title: "Adobe",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/698469c6a91cef644870febe_Amazon%201%20%281%29.webp",
      alt: "Amazon",
      title: "Amazon",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6aa97d7f1555ba95b5394_AutoDesk.webp",
      alt: "Autodesk",
      title: "Autodesk",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a9d8e0dd2f35457d1311_Emerson.webp",
      alt: "Emerson",
      title: "Emerson",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a94748156eb2b452d94e_godrej.webp",
      alt: "Godrej",
      title: "Godrej",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b587b637a6028400026a71_Intel2.webp",
      alt: "Intel",
      title: "Intel",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/69846266b0acf082e648fdb0_Johnson%26Johnson%201.webp",
      alt: "Johnson & Johnson",
      title: "Johnson & Johnson",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b588572d0fd67c6424af0a_MediaTek.webp",
      alt: "MediaTek",
      title: "MediaTek",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b5873a89529b86f470b686_Microsoft.webp",
      alt: "Microsoft",
      title: "Microsoft",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a9601c7bda326efbe969_nrsc.webp",
      alt: "NRSC",
      title: "NRSC",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/69846830ede4cc2aea05d48a_Sportskeeda%201.webp",
      alt: "Sportskeeda",
      title: "Sportskeeda",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b5887637a6028400031b44_Tata_Chemicals.webp",
      alt: "Tata Chemicals",
      title: "Tata Chemicals",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b6a98ed7f1555ba95a94c2_Total.webp",
      alt: "Total",
      title: "Total",
    },
    {
      src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/68b9218334a6bbb7e0046a57_visa.webp",
      alt: "Visa",
      title: "Visa",
    },
  ],
},
stickyNavbarData : {
  logo: {
    src: "/images/edstellar-logo.svg",
    alt: "Edstellar",
  },

  tabs: [
    { id: "about", label: "About", active: true },
    { id: "why-now", label: "Why now", active: false },
    { id: "lifecycle", label: "Lifecycle", active: false },
    { id: "skills", label: "Skills", active: false },
    { id: "outcomes", label: "Outcomes", active: false },
    { id: "curriculum", label: "Curriculum", active: false },
    { id: "audience", label: "Audience", active: false },
    { id: "delivery", label: "Delivery", active: false },
    { id: "why-edstellar", label: "Why Edstellar", active: false },
    { id: "trainers", label: "Trainers", active: false },
  ],
},
    about: {
      mark: { roman: "I", keyword: "About", label: "A two-minute primer" },
      headlineParts: [
        { text: "What is " },
        { text: "ML model monitoring", em: true },
        { text: "?" },
      ],
      body: [
        "ML Model Monitoring is a critical discipline for organizations that deploy machine learning models in production and need them to stay accurate, reliable, fair, and compliant over time. This corporate training covers the complete production monitoring lifecycle, so your teams can operate ML systems with confidence.",
      ],
      more: [
        "The program spans data and concept drift detection, performance metric tracking, alerting infrastructure, retraining pipelines, A/B testing, explainability monitoring, and fairness governance. Through hands-on labs with real production monitoring tools, incident simulations, and case-driven exercises, participants build the operational expertise to maintain robust ML monitoring systems that protect model performance and organizational trust.",
        "Edstellar's instructor-led course is designed for ML engineering, data science, and MLOps teams, and is delivered virtually or onsite, fully tailored to your stack and your production reality.",
      ],
      contrast: {
        label: "Traditional software monitoring versus ML model monitoring",
        columns: ["Traditional software monitoring", "ML model monitoring"],
        rows: [
          [
            "Watches uptime and errors",
            "Watches accuracy, drift, and fairness",
          ],
          ["Fails loudly when it breaks", "Degrades silently as data shifts"],
          [
            "Fixed logic, stable over time",
            "Behavior decays without code changes",
          ],
          ["Pass or fail checks", "Statistical drift and threshold guardrails"],
          ["Redeploy to fix", "Retrain, A/B test, and govern"],
        ],
      },
    },

  },
};

/* ========================================================================== */
/* READS — the only surface pages depend on                                    */
/* ========================================================================== */

/**
 * Wrapped in `cache()` so `generateMetadata` and the page body share one read
 * per request instead of doing the work twice (TASTE.md §5.2).
 * Returns `null` for a missing record — calling `notFound()` is the page's call.
 */
export const getDomainCourse = cache(
  async (slug) => DOMAIN_COURSES[slug] ?? null,
);

export const getCategoryCourse = cache(
  async (slug) => CATEGORY_COURSES[slug] ?? null,
);

export const getDomainCourseSlugs = cache(async () =>
  Object.keys(DOMAIN_COURSES),
);

export const getCategoryCourseSlugs = cache(async () =>
  Object.keys(CATEGORY_COURSES),
);
