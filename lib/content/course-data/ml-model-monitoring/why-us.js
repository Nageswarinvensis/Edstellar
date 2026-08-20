/**
 * why-us.js — WhyEds section
 * Component: components/sections/course/whyEds.jsx
 */

export const whyUs = {
  heading: {
    parts: [
      { text: "Where this fits in your team's " },
      { text: "learning path.", em: true },
    ],
  },
  description:
    "In the standard ML lifecycle, monitoring sits after deployment, not after model building. You ship a model, keep it healthy in production, turn what monitoring tells you into managed risk, then extend the same discipline as your systems change.",
  programs: [
    {
      id: "machine-learning-python",
      eyebrow: "BUILD AND SHIP FIRST",
      title: "Machine Learning with Python",
      description:
        "Develop models and get them serving in production. There is nothing to monitor until something is deployed.",
      image: "/course/machine learning.webp",
      imageAlt: "Machine Learning with Python training",
      imageTitle: "Machine Learning with Python",
      duration: "DURATION ON REQUEST",
      href: "#",
      featured: false,
    },
    {
      id: "ml-model-monitoring",
      eyebrow: "MONITOR",
      title: "ML Model Monitoring",
      description:
        "Detect drift, track performance, alert, retrain, and evidence fairness once the model is live.",
      image: "/course/ml model.webp",
      imageAlt: "ML Model Monitoring training",
      imageTitle: "ML Model Monitoring",
      duration: "24–40 HOURS",
      href: "#",
      featured: true,
    },
    {
      id: "ai-security-risk",
      eyebrow: "THEN GOVERN",
      title: "AI Security and Risk Management",
      description:
        "Turn monitoring signals into managed model risk, controls, and governance evidence.",
      image: "/course/AI security.webp",
      imageAlt: "AI Security and Risk Management training",
      imageTitle: "AI Security and Risk Management",
      duration: "DURATION ON REQUEST",
      href: "#",
      featured: false,
    },
    {
      id: "mlops-llms",
      eyebrow: "GO FURTHER",
      title: "MLOps for LLMs",
      description:
        "Carry the same drift, evaluation, and incident practice across to LLM systems.",
      image: "/course/MLOps.webp",
      imageAlt: "MLOps for LLMs training",
      imageTitle: "MLOps for LLMs",
      duration: "DURATION ON REQUEST",
      href: "#",
      featured: false,
    },
  ],
  relatedLabel: "More related courses",
  relatedCourses: [
    { title: "LLM Observability Training",                    meta: "16 – 24 HRS", type: "INSTRUCTOR-LED", href: "#", cta: "VIEW COURSE →" },
    { title: "MLOps for LLMs Training",                      meta: "12 – 24 HRS", type: "INSTRUCTOR-LED", href: "#", cta: "VIEW COURSE →" },
    { title: "AI Decision Support Systems Training",          meta: "16 – 24 HRS", type: "INSTRUCTOR-LED", href: "#", cta: "VIEW COURSE →" },
    { title: "Vector Database for AI Systems Training",       meta: "12 – 24 HRS", type: "INSTRUCTOR-LED", href: "#", cta: "VIEW COURSE →" },
    { title: "Machine Learning with Scikit-Learn Training",   meta: "16 – 24 HRS", type: "INSTRUCTOR-LED", href: "#", cta: "VIEW COURSE →" },
    { title: "Implementing an AI Management System Training", meta: "16 – 24 HRS", type: "INSTRUCTOR-LED", href: "#", cta: "VIEW COURSE →" },
  ],
};
