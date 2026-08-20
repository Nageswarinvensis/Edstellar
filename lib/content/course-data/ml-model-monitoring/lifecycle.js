/**
 * lifecycle.js — Lifecycle section
 * Component: components/sections/course/lifecycle (or equivalent)
 */

export const lifecycle = {
  image: { src: "/course/circles.png", alt: "" },
  heading: {
    parts: [
      { text: "The " },
      { text: "monitoring lifecycle", em: true },
      { text: " your team will run." },
    ],
  },
  description:
    "This is the operational loop your teams will run after the training. Select a stage to see what it covers and where it sits in the curriculum.",
  stages: [
    {
      index: "01",
      icon: "trending-up",
      title: "Detect drift",
      modules: "Modules 1–2",
      overview: [
        { text: "Catch " },
        { text: "data and concept drift", strong: true },
        { text: " before it quietly degrades accuracy." },
      ],
      description:
        "Production inputs shift over time. Your teams learn to detect data drift, concept drift, and model staleness using the right statistical tests and detectors.",
      covers: [
        "Statistical tests: KS, Chi-squared, PSI, JS divergence",
        "Advanced detectors: MMD, ADWIN, Page-Hinkley",
        "Concept drift methods: DDM and EDDM",
        "Automated drift monitoring",
      ],
    },
    {
      index: "02",
      icon: "bar-chart",
      title: "Track performance",
      modules: "Module 3",
      overview: [
        { text: "Monitor " },
        { text: "accuracy, error, and slices", strong: true },
        { text: " against agreed thresholds." },
      ],
      description:
        "Beyond a single accuracy number, teams track the right metrics per model type and per data slice, with dashboards that non-technical stakeholders can read.",
      covers: [
        "Classification, regression, and ranking metrics",
        "Slice-based and segment-level performance",
        "Ground truth collection and delayed feedback",
        "Performance dashboards for ML teams",
      ],
    },
    {
      index: "03",
      icon: "bell",
      title: "Alert & respond",
      modules: "Modules 4–5",
      overview: [
        { text: "Fire " },
        { text: "ML-specific alerts", strong: true },
        { text: " and run disciplined incident response." },
      ],
      description:
        "Teams design alert rules that avoid fatigue, route incidents to the right people, and close the loop with post-incident reviews.",
      covers: [
        "Instrumentation and metrics collection",
        "Static and dynamic alert thresholds",
        "Routing via on-call and messaging tools",
        "Incident runbooks and post-incident reviews",
      ],
    },
    {
      index: "04",
      icon: "refresh-cw",
      title: "Retrain & test",
      modules: "Modules 6–7",
      overview: [
        { text: "Trigger " },
        { text: "retraining", strong: true },
        { text: " and roll out safely with A/B and shadow." },
      ],
      description:
        "Teams decide when to retrain, automate the pipeline, and release new models without risking production through controlled experiments.",
      covers: [
        "Scheduled, performance, and drift-triggered retraining",
        "Automated retraining pipelines and registries",
        "A/B testing, traffic splitting, and bandits",
        "Shadow mode and safe deployment strategies",
      ],
    },
    {
      index: "05",
      icon: "search",
      title: "Explain",
      modules: "Module 8",
      overview: [
        { text: "Monitor " },
        { text: "explanations", strong: true },
        { text: " for auditable, stable decisions." },
      ],
      description:
        "In high-stakes settings, explanations must stay consistent. Teams monitor feature importance and explanation stability, and keep audit trails.",
      covers: [
        "Feature-importance monitoring",
        "Explanation stability and consistency checks",
        "Counterfactual and contrastive monitoring",
        "Audit trails for explainable AI",
      ],
    },
    {
      index: "06",
      icon: "scale",
      title: "Govern fairness",
      modules: "Modules 9–10",
      overview: [
        { text: "Track " },
        { text: "bias, fairness, and compliance", strong: true },
        { text: " for responsible ML." },
      ],
      description:
        "Teams measure fairness across groups, watch for bias drift after retraining, and build the reporting that regulated industries require.",
      covers: [
        "Fairness metrics and disparate-impact analysis",
        "Fairness assessment tooling",
        "GDPR and EU AI Act compliance monitoring",
        "Model health score and responsible-AI reporting",
      ],
    },
  ],
};
