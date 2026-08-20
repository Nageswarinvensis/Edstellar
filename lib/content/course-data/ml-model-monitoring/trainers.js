/**
 * trainers.js — Trainers section
 * Component: components/sections/course/trainers.jsx
 */

export const trainers = {
  heading: {
    parts: [
      { text: "Learn from " },
      { text: "world-class", em: true },
      { text: " ML monitoring practitioners." },
    ],
  },
  description:
    "Every session is led by a practitioner who has run monitoring for models in production, not a generalist working from slides.",
  people: [
    {
      name: "Daniel Roth",
      image: "/course/hero-photo.jpg",
      role: "Principal MLOps engineer",
      years: "12+ years in production ML",
      rating: "4.9",
      sessions: "180+",
      spec: ["Drift detection", "Observability stack", "Dashboards"],
    },
    {
      name: "Marco Bianchi",
      image: "/course/image2.png",
      role: "Staff ML engineer, platform",
      years: "10+ years in production ML",
      rating: "4.8",
      sessions: "140+",
      spec: ["Retraining pipelines", "A/B & shadow deploys", "Orchestration"],
    },
    {
      name: "Annika Lund",
      image: "/course/image3.png",
      role: "Lead data scientist, model risk",
      years: "9+ years in regulated ML",
      rating: "4.9",
      sessions: "120+",
      spec: ["Fairness monitoring", "Explainability", "EU AI Act"],
    },
    {
      name: "Priya Raghavan",
      image: "/course/image4.png",
      role: "SRE lead, ML systems",
      years: "11+ years in reliability",
      rating: "4.8",
      sessions: "160+",
      spec: ["Alerting design", "Incident response", "Tracing"],
    },
  ],
  note: "Trainers are matched to your stack and delivery window at scheduling. We confirm your assigned trainer, with a full profile, before the program is booked.",
};
