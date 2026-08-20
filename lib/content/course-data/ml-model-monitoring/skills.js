/**
 * skills.js — Skills section
 * Component: components/sections/course/skills.jsx
 */

export const skills = {
  heading: {
    parts: [
      { text: "ML monitoring " },
      { text: "skills", em: true },
      { text: " your team will gain." },
    ],
  },
  description:
    "These are the core, practical skills your team develops during the program. Tap any card to see what it means in production.",
  items: [
    {
      number: "01",
      title: "Data and Concept Drift Detection",
      description:
        "Detect data drift, concept drift, and distribution shift using statistical tests and modern detectors before accuracy degrades.",
    },
    {
      number: "02",
      title: "Model Performance Metrics Tracking",
      description:
        "Track the right performance metrics per model type and per data slice, with thresholds and guardrails for production.",
    },
    {
      number: "03",
      title: "Monitoring Infrastructure Setup",
      description:
        "Stand up monitoring infrastructure with instrumentation, metrics, dashboards, and dedicated ML monitoring platforms.",
    },
    {
      number: "04",
      title: "Alerting and Incident Response",
      description:
        "Design ML-specific alert rules, route and escalate incidents, and run structured post-incident reviews.",
    },
    {
      number: "05",
      title: "Model Retraining and Lifecycle Management",
      description:
        "Decide when to retrain, automate pipelines, version models, and deploy updates safely across the model lifecycle.",
    },
    {
      number: "06",
      title: "Fairness and Bias Monitoring",
      description:
        "Measure fairness across groups, detect bias drift, and meet compliance requirements for responsible production ML.",
    },
    {
      number: "07",
      title: "MLOps Observability Integration",
      description:
        "Integrate ML monitoring into the wider MLOps and observability stack with tracing, infrastructure-as-code, and health scores.",
    },
  ],
};
