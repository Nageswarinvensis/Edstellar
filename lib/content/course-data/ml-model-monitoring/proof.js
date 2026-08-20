/**
 * proof.js — CategoryInfo (proof bar)
 * Component: components/sections/course/courseInfo.jsx
 */

export const proof = {
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
    people: [{ photo: "/course/Avatar.webp" }],
    count: "4+",
    trainerLabel: "Expert trainers",
    meetLabel: "Meet them",
    stars: 5,
  },
  actions: [
    { label: "Watch preview", href: "#preview", type: "preview" },
    { label: "Download brochure", href: "#brochure", type: "brochure" },
  ],
};
