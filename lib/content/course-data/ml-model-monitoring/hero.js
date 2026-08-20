/**
 * hero.js — CategoryHero + breadcrumbs
 * Component: components/sections/course/course-hero.jsx
 */

export const hero = {
  parts: [
    { text: "ML Model " },
    { text: "Monitoring", em: true },
    { text: " Corporate Training" },
  ],
  subhead: "Keep production ML models accurate, fair, and trusted.",
  lede: "ML Model Monitoring corporate training gives your ML, data science, and MLOps teams the confidence to run production models at scale, covering drift detection, performance tracking, alerting, retraining, and fairness governance. Customized, expert-led group training for employees, delivered onsite, live virtual, or hybrid to teams in 100+ countries.",
  meta: [
    "Instructor-led group training",
    "Virtual / on-site / off-site",
    { label: "10 languages", tooltip: { heading: "Delivered in", body: "English, Spanish, French, German, Portuguese, Arabic, Japanese, Mandarin, Hindi, Dutch" } },
    { label: "100+ countries", tooltip: { heading: "We have delivered in", body: "United States, United Kingdom, Germany, France, India, Singapore, UAE, Australia, Canada, Netherlands and 90+ more countries" } },
  ],
  media: {
    image: "/course/hero-photo.jpg",
    video: null,
    alt: "A team reviewing production model health metrics on a shared dashboard",
  },
  actions: [
    { label: "View course outline", href: "#curriculum", variant: "primary" },
    { label: "Enquire now", href: "#apply", variant: "ghost" },
  ],
  groupQuote: {
    prompt: "Need more than one program?",
    label: "Get a group quote",
    href: "#group-quote",
  },
};

export const breadcrumbs = [
  { label: "Home", href: "/" },
  { label: "IT & Technical", href: "/corporate-training" },
  { label: "Artificial Intelligence", href: "/corporate-training/artificial-intelligence" },
  { label: "ML Model Monitoring" },
];
