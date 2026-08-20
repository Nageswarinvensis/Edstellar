/**
 * curriculum.js — Curriculum section
 * Component: components/sections/course/curriculum.jsx
 */

export const curriculum = {
  heading: {
    parts: [
      { text: "ML Model Monitoring " },
      { text: "course outline", em: true },
      { text: "." },
    ],
  },
  description:
    "Filter by what your team needs most, open any module for the detail, then build an agenda to send with your quote request.",
  meta: [
    { value: "10",    label: "modules" },
    { value: "24–40", label: "hours" },
    { value: "8",     label: "hands-on labs" },
    { value: "1",     label: "capstone" },
  ],
  badge: {
    title: "Designed by Edstellar and industry practitioners",
    description:
      "Built by engineers who run ML monitoring in production, then tailored to your stack before delivery.",
  },
  method: {
    steps: [
      {
        label: "Learn",
        parts: [{ text: "Concept and context for each monitoring capability, and why it matters in production." }],
      },
      {
        label: "Practice",
        parts: [
          { text: "8 hands-on labs", strong: true },
          { text: " on a live monitoring stack, including what to do when a model drifts." },
        ],
      },
      {
        label: "Apply",
        parts: [{ text: "Bring each technique to your own models, stack, and governance requirements." }],
      },
    ],
    split: [
      { key: "learn",    label: "Learn",    percent: 14 },
      { key: "practice", label: "Practice", percent: 68 },
      { key: "apply",    label: "Apply",    percent: 18 },
    ],
    note: "Weighted toward hands-on practice. Labs run against a live monitoring stack with injected drift, not slides.",
    formats: ["Multi-day bootcamp", "Weekly sessions", "Blended"],
    capsule: ["8 labs", "+ capstone", "24–40 hours"],
    capsuleNote: "customized to your team's depth and schedule",
    toolsLabel: "Tools participants will practice on",
    tools: [
      "Python", "scikit-learn", "Evidently", "Deepchecks", "Great Expectations",
      "Prometheus", "Grafana", "OpenTelemetry", "MLflow", "Airflow",
      "Kubeflow", "Seldon Core", "BentoML", "SHAP", "Alibi Detect",
      "Fairlearn", "Docker", "Kubernetes", "Terraform", "PagerDuty",
      "Amazon SageMaker", "Azure ML", "Vertex AI",
    ],
  },
  filters: [
    { id: "all",         label: "All modules" },
    { id: "foundations", label: "Foundations" },
    { id: "detect",      label: "Detect & measure" },
    { id: "operate",     label: "Operate & alert" },
    { id: "retrain",     label: "Retrain & test" },
    { id: "govern",      label: "Govern & comply" },
  ],
  modules: [
    {
      number: "01",
      title: "Introduction to ML Model Monitoring",
      subtitle: "Why monitoring matters and the monitoring landscape",
      tags: ["foundations"],
      band: "Learn",
      hours: 4.25,
      topics: 19,
      groups: [
        {
          title: "Why ML Model Monitoring Matters",
          items: [
            "Traditional software monitoring versus ML model monitoring",
            "How model performance degrades silently in production",
            "Business and regulatory drivers for robust monitoring",
            "Real-world incidents caused by unmonitored degradation",
          ],
        },
        {
          title: "The ML Monitoring Landscape",
          items: [
            "Key domains: data quality, performance, and fairness",
            "Batch versus real-time ML deployment contexts",
            "Overview of ML monitoring tools and platforms",
            "Positioning monitoring within the MLOps lifecycle",
          ],
        },
        {
          title: "Types of ML Model Degradation",
          items: [
            "Data drift: changes in input feature distributions",
            "Concept drift: changes in feature-target relationships",
            "Model staleness without observable input changes",
            "Infrastructure and pipeline degradation",
          ],
        },
        {
          title: "Monitoring Goals, KPIs, Architecture & Roadmap",
          items: [
            "Monitoring objectives aligned to business purpose",
            "KPIs: accuracy, drift score, latency, error rate",
            "Collectors, analyzers, and alerters architecture",
            "Maturity levels and an incremental roadmap",
          ],
        },
      ],
      lab: {
        kind: "intro",
        title: "Trace a model's health signals",
        description:
          "Trace a deployed model end to end: set up a baseline monitoring dashboard and establish what "healthy" looks like before drift begins.",
      },
    },
    {
      number: "02",
      title: "Data Drift and Distribution Shift Detection",
      subtitle: "From statistical tests to a production drift system",
      tags: ["detect"],
      band: "Practice",
      hours: 3.75,
      topics: 17,
      groups: [
        {
          title: "Understanding Data Drift in Production",
          items: [
            "Types and root causes of data drift",
            "Covariate, prior probability, and dataset shift",
            "Impact of undetected drift on decisions",
          ],
        },
        {
          title: "Statistical & Advanced Drift Tests",
          items: [
            "Kolmogorov-Smirnov and Chi-squared tests",
            "Population Stability Index and JS divergence",
            "Wasserstein distance and MMD",
            "ADWIN and Page-Hinkley sequential detection",
          ],
        },
        {
          title: "Concept Drift Detection Methods",
          items: [
            "Error-rate-based concept drift detection",
            "DDM and EDDM detection methods",
            "Gradual versus sudden concept drift",
          ],
        },
        {
          title: "Drift monitoring and system design",
          items: [
            "Automated reports for drift and data quality",
            "Target drift and prediction drift monitoring",
            "Reference dataset selection and baselines",
            "Dashboard design for drift visibility",
          ],
        },
      ],
      lab: {
        kind: "lab",
        title: "Detect distribution drift",
        description:
          "Instrument a deployed model, inject synthetic distribution shift, and configure drift reports that surface it before accuracy drops.",
      },
    },
    {
      number: "03",
      title: "Model Performance Metrics and Evaluation",
      subtitle: "Metrics, slices, ground truth, and dashboards",
      tags: ["detect"],
      band: "Practice",
      hours: 3.25,
      topics: 14,
      groups: [
        {
          title: "Metrics for Classification & Regression",
          items: [
            "Accuracy, precision, recall, F1, AUC-ROC, AUC-PR",
            "Calibration: reliability diagrams and ECE",
            "MAE, RMSE, MAPE, and residual analysis",
            "Business-aligned error metrics",
          ],
        },
        {
          title: "Ranking, Recommendation & Feedback",
          items: [
            "NDCG, MAP, MRR for recommendation models",
            "CTR and conversion as proxy signals",
            "Ground truth collection and delayed feedback",
            "Proxy labels when ground truth is unavailable",
          ],
        },
        {
          title: "Slice-Based Monitoring & Dashboards",
          items: [
            "Segment-level performance tracking",
            "Automated slice discovery and SLAs",
            "Time-series performance visualisation",
            "Communicating status to stakeholders",
          ],
        },
      ],
      lab: {
        kind: "lab",
        title: "Track performance decay",
        description:
          "Build a performance-tracking pipeline that logs precision, recall, and calibration over time, then detect where a degrading model crosses your alerting threshold.",
      },
    },
    {
      number: "04",
      title: "Monitoring Infrastructure and Tooling",
      subtitle: "Instrumentation, metrics, and dashboard platforms",
      tags: ["operate"],
      band: "Practice",
      hours: 3.25,
      topics: 14,
      groups: [
        {
          title: "Instrumentation, Logging & Metrics",
          items: [
            "Logging prediction inputs, outputs, and metadata",
            "Sampling strategies for cost-effective logging",
            "PII and sensitive data handling in logs",
            "Metrics instrumentation and querying",
          ],
        },
        {
          title: "Visualisation & Platforms",
          items: [
            "Dashboards for ML monitoring",
            "ML observability platforms",
            "Open-source versus commercial selection",
            "Integrating platforms with MLOps toolchains",
          ],
        },
        {
          title: "Tracing & Infrastructure as Code",
          items: [
            "Distributed tracing for ML pipelines",
            "Latency bottleneck and root cause analysis",
            "Monitoring config with Terraform and Helm",
            "Version-controlled dashboards and alert rules",
          ],
        },
      ],
      lab: {
        kind: "lab",
        title: "Stand up a monitoring stack",
        description:
          "Wire a live model's health metrics through a metrics exporter and a dashboard you design.",
      },
    },
    {
      number: "05",
      title: "Alerting and Incident Response",
      subtitle: "Alert design, routing, runbooks, and reviews",
      tags: ["operate"],
      band: "Practice",
      hours: 2.75,
      topics: 12,
      groups: [
        {
          title: "Alert Rules & Anomaly Detection",
          items: [
            "Static and dynamic thresholds for ML signals",
            "Multi-condition alert rules and alert fatigue",
            "Seasonality-adjusted and ML-based anomaly detection",
          ],
        },
        {
          title: "Routing, Severity & Runbooks",
          items: [
            "Integrating on-call and messaging tools",
            "On-call rotation and escalation policies",
            "Incident severity and business-impact classification",
            "Runbooks for common monitoring incidents",
          ],
        },
        {
          title: "Post-Incident Reviews",
          items: [
            "Root cause analysis for ML production incidents",
            "Identifying monitoring gaps from incidents",
            "Corrective actions and monitoring improvements",
          ],
        },
      ],
      lab: {
        kind: "lab",
        title: "Run an incident response",
        description:
          "Configure tiered alerts on model-health signals, route them through your on-call tool, and respond to a simulated production drift incident.",
      },
    },
    {
      number: "06",
      title: "Model Retraining and Lifecycle Management",
      subtitle: "Triggers, pipelines, registries, and deployment",
      tags: ["retrain"],
      band: "Practice",
      hours: 3.0,
      topics: 13,
      groups: [
        {
          title: "Retraining Triggers & Pipelines",
          items: [
            "Scheduled, performance, and drift-triggered retraining",
            "Cost-benefit analysis for retraining frequency",
            "Automated retraining pipeline architecture",
            "Human-in-the-loop approval workflows",
          ],
        },
        {
          title: "Versioning, Registry & Deployment",
          items: [
            "Model registry and metadata management",
            "Promotion from development to production",
            "Blue-green, canary, and shadow rollouts",
            "Automated rollback triggers",
          ],
        },
        {
          title: "Deprecation & Continuous Training",
          items: [
            "Criteria for deprecating and retiring models",
            "Continuous training integrated with CI/CD",
            "Pipeline orchestration",
          ],
        },
      ],
      lab: {
        kind: "lab",
        title: "Automate retraining",
        description:
          "Build a retraining trigger that fires when drift crosses a threshold, then validate the new model before it ships.",
      },
    },
    {
      number: "07",
      title: "A/B Testing and Shadow Deployment",
      subtitle: "Experiments, bandits, and safe validation",
      tags: ["retrain"],
      band: "Practice",
      hours: 3.0,
      topics: 13,
      groups: [
        {
          title: "A/B Testing Principles & Infrastructure",
          items: [
            "Designing controlled A/B experiments for models",
            "Significance, power, and sample size",
            "Traffic splitting and feature flags",
            "Experiment isolation to prevent contamination",
          ],
        },
        {
          title: "Shadow Mode & Bandits",
          items: [
            "Shadow mode architecture for challenger models",
            "Comparing shadow predictions against production",
            "Epsilon-greedy, UCB, and Thompson sampling",
            "Contextual bandits for model selection",
          ],
        },
        {
          title: "Experiment Analysis & Feedback",
          items: [
            "Frequentist versus Bayesian analysis",
            "Handling novelty effects and selection bias",
            "Linking online feedback to model versions",
          ],
        },
      ],
      lab: {
        kind: "lab",
        title: "Shadow-deploy a challenger",
        description:
          "Deploy a challenger model in shadow mode beside production, compare live outputs, and design the rule for promoting it.",
      },
    },
    {
      number: "08",
      title: "Explainability and Interpretability Monitoring",
      subtitle: "Attribution, stability, and audit trails",
      tags: ["govern"],
      band: "Practice",
      hours: 2.75,
      topics: 12,
      groups: [
        {
          title: "Why & How to Monitor Explainability",
          items: [
            "Business and regulatory drivers for explainability",
            "Explanation drift as a concept-drift signal",
            "Global, local, and counterfactual monitoring",
          ],
        },
        {
          title: "Explanation stability",
          items: [
            "Tracking global feature importance over time",
            "Local attribution for individual prediction audits",
            "Stability and consistency across versions",
            "Counterfactual validity and proximity",
          ],
        },
        {
          title: "Audit Trails at Scale",
          items: [
            "Logging explanations alongside predictions",
            "Explanation versioning tied to model and data",
            "Caching and sampling for high-throughput systems",
          ],
        },
      ],
      lab: {
        kind: "lab",
        title: "Monitor explanations",
        description:
          "Add attribution-based explanation monitoring, then detect when feature attributions shift: drift that accuracy metrics alone miss.",
      },
    },
    {
      number: "09",
      title: "Bias, Fairness, and Compliance Monitoring",
      subtitle: "Fairness metrics, bias drift, and regulation",
      tags: ["govern"],
      band: "Apply",
      hours: 3.0,
      topics: 13,
      groups: [
        {
          title: "Fairness Concepts & Detection",
          items: [
            "Demographic parity, equalised odds, individual fairness",
            "Choosing metrics for the use-case context",
            "Disparate-impact analysis on production outputs",
            "Fairness assessment tooling",
          ],
        },
        {
          title: "Bias Drift & Compliance",
          items: [
            "Tracking fairness metric trends over time",
            "How bias can worsen after retraining",
            "GDPR, EU AI Act, and sector-specific requirements",
            "Right-to-explanation and audit-trail requirements",
          ],
        },
        {
          title: "Safety & Responsible-AI Reporting",
          items: [
            "Content safety and toxicity monitoring",
            "Adversarial input detection",
            "Model cards and governance review processes",
          ],
        },
      ],
      lab: {
        kind: "lab",
        title: "Audit for fairness",
        description:
          "Instrument fairness metrics across protected groups, set compliance thresholds, and generate the audit trail an EU AI Act reviewer would ask for.",
      },
    },
    {
      number: "10",
      title: "Building a Scalable MLOps Monitoring Strategy",
      subtitle: "Architecture, model fleets, cost, and a capstone",
      tags: ["foundations", "operate"],
      band: "Apply",
      hours: 3.0,
      topics: 14,
      groups: [
        {
          title: "Architecture & Model Health Score",
          items: [
            "Centralised versus federated monitoring",
            "Patterns for batch, real-time, and edge ML",
            "Combining drift, performance, fairness, and latency",
            "Threshold-based health-score alerting",
          ],
        },
        {
          title: "Fleets, Cost & Culture",
          items: [
            "Monitoring hundreds of models efficiently",
            "Prioritizing depth by business criticality",
            "Cost management and sampling strategies",
            "Building a monitoring-first team culture",
          ],
        },
        {
          title: "Capstone: Enterprise Monitoring System",
          items: [
            "Design a monitoring system for a model fleet",
            "Implement drift detection, alerts, and dashboards",
            "Configure retraining triggers and lifecycle workflows",
            "Present architecture and runbooks to stakeholders",
          ],
        },
      ],
      lab: {
        kind: "capstone",
        title: "Design a monitoring strategy",
        description:
          "Capstone: consolidate drift, performance, and fairness signals for a multi-model environment into one operations view, with a team response playbook.",
      },
    },
  ],
  sectionCta: {
    title: "Want this syllabus re-weighted to your gaps?",
    description:
      "The ten modules are not fixed hours. Tell us where monitoring stops today and we rebuild the running order around it.",
    cta: { label: "Request a Training Proposal", href: "#apply" },
  },
};
