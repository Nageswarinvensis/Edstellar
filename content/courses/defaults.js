/**
 * Scaffolding every course page shares.
 *
 * None of this is course-specific — the delivery facts row, the hero buttons,
 * the "want this adapted?" CTA under each section, and the trust stats are the
 * same on every course. The CMS does not model them, so they are merged in
 * beneath every course by `lib/content/courses.js`.
 *
 * **This is what lets a brand-new CMS course render complete with no code
 * change and no hand-authored fallback file.** Anything genuinely specific to
 * one course belongs in that course's own JSON, not here.
 *
 * Field names and casing follow the CMS convention (TASTE.md §5.4) so the
 * merge is a plain overlay.
 *
 * **`about` and `curriculum` are the same on every course by product
 * decision, not by omission.** `lib/content/courses.js`'s `toCourse` strips
 * both keys out of the CMS response before merging, so even a course whose
 * CMS record sends its own `about`/`Curriculum` component still renders this
 * shared copy — there is no per-course override for either section right
 * now. Content sourced verbatim from `Course final sep21.html`'s `#about`
 * and `#curriculum` blocks (a rendered snapshot of the approved design, not
 * a mockup). `curriculum.modules[].tags` has no source in that file (its
 * filter chips render, but nothing in the static export ties a module to
 * one) — assigned two-per-category by subject matter so all five filters
 * have modules.
 *
 * `skills`, `audience` and `faqs.items` are sourced the same way, from
 * `#skills`, `#audience` and `#faqs` (these three lack a CMS-override guard
 * in `toCourse` — no course has ever sent any of these components, so there
 * was nothing to strip).
 */

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
    heading:
      "Program Overview: What is <span>ML Model Monitoring Corporate Training?</span>",
    body: [
      "ML Model Monitoring corporate training is how your team learns to catch a failing model before a customer does. A model that worked at launch does not stay working, and nobody gets an error when it stops. The program focuses on the skills to cover that loop end to end, from the first drift signal to the retraining call.",
      "Edstellar scopes the program with your team before delivery: modules, group size and dates agreed up front. The labs then run on your own production stack, your models and your tooling, so the work is real from day one. Sessions are instructor-led by practitioners who monitor production models for a living, delivered virtual, onsite or hybrid across 100+ countries. Every group gets program materials, pre- and post-training assessment, group reporting to your L&D team, and a dedicated program coordinator.",
    ],
    // Extracted from the source's inline base64 <img> and saved as a real
    // static asset — `#about`'s only media in that file, no CMS field for it.
    media: {
      src: "/course/ml-model-monitoring-about.jpg",
      alt: "An instructor leading a corporate training session with a team around a boardroom table",
    },
    inclusions: {
      heading: "What's Included in this Workshop for Your Enterprise Teams",
      columns: [
        {
          heading: "In the program",
          steps: [
            {
              title: "Core concepts and real-world use cases",
              description:
                "Understand drift, performance tracking, alerting and more.",
            },
            {
              title: "Hands-on labs on your production stack",
              description: "Work with real tools and datasets.",
            },
            {
              title: "Live, instructor-led sessions with Q&A",
              description:
                "Work through practical problems with your trainer.",
            },
            {
              title: "Assessment and group reporting",
              description:
                "Pre- and post-training assessment, reported to your L&D team.",
            },
            {
              title: "Program materials and support",
              description:
                "Labs, templates, certificate of completion and a dedicated program coordinator.",
            },
          ],
        },
        {
          heading: "Delivery & Logistics",
          items: [
            "Training delivered at any of your offices globally",
            "10+ languages",
            "Schedule around your releases",
            "Group size set along with you",
            "Run as one cohort or split into batches",
            "Instructor-led (virtual/onsite/hybrid)",
            "Recurring and annual options",
            "Trainer sourcing, matching and logistics",
          ],
          banner: {
            text: "Build your team's skills. Anywhere in the world.",
          },
        },
      ],
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
      title: "Want this syllabus re-weighted to your gaps?",
      description:
        "The modules can be adapted to your needs. Tell us what your team already knows, and we’ll customize the training curriculum around it.",
      cta: { label: "Customize Your Training Today", href: APPLY_ANCHOR },
    },

    heading: "ML Model Monitoring Course <span>Topics & Program Outline</span>",
    description:
      "Filter by what your team needs most, open any module for the topics, duration and labs, then build an agenda to send with your quote request. Every module can be dropped, extended or re-sequenced.",
    author_credit: {
      title: "Designed by Edstellar and industry practitioners",
      description:
        "Built by engineers who run ML monitoring in production, then tailored to your stack before delivery.",
    },
    meta: [
      { value: "10", label: "modules" },
      { value: "24-40", label: "hours" },
      { value: "8", label: "hands-on labs" },
      { value: "1", label: "capstone" },
    ],
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
      summary_pills: ["8 labs", "1 capstone", "24–40 hours"],
      summary_note:
        "<b>Entry level set by the assessment.</b> Depth and schedule customized to your team.",
      // Extracted from the source's inline base64 <img> and saved as a real
      // static asset — no CMS field for it.
      media: {
        src: "/course/ml-model-monitoring-method.jpg",
        alt: "A team reviewing a model monitoring dashboard together on a laptop",
      },
    },
    filters: [
      { id: "all", label: "All modules" },
      { id: "foundations", label: "Foundations" },
      { id: "detect", label: "Detect & measure" },
      { id: "operate", label: "Operate & alert" },
      { id: "retrain", label: "Retrain & test" },
      { id: "govern", label: "Govern & comply" },
    ],
    modules: [
      {
        number: "01",
        title: "Introduction to ML Model Monitoring",
        learning_phase: "Learn",
        topics: 4,
        hours: 4.25,
        tags: ["foundations"],
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
            "Trace a deployed model end to end: set up a baseline monitoring dashboard and establish what healthy looks like before drift begins.",
        },
      },
      {
        number: "02",
        title: "Data Drift and Distribution Shift Detection",
        learning_phase: "Practice",
        topics: 4,
        hours: 3.75,
        tags: ["detect"],
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
        learning_phase: "Practice",
        topics: 3,
        hours: 3.25,
        tags: ["detect"],
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
              "Time-series performance visualization",
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
        learning_phase: "Practice",
        topics: 3,
        hours: 3.25,
        tags: ["foundations"],
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
            title: "Visualization & Platforms",
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
        learning_phase: "Practice",
        topics: 3,
        hours: 2.75,
        tags: ["operate"],
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
        learning_phase: "Practice",
        topics: 3,
        hours: 3,
        tags: ["retrain"],
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
        learning_phase: "Practice",
        topics: 3,
        hours: 3,
        tags: ["retrain"],
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
        learning_phase: "Practice",
        topics: 3,
        hours: 2.75,
        tags: ["govern"],
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
        learning_phase: "Apply",
        topics: 3,
        hours: 3,
        tags: ["govern"],
        groups: [
          {
            title: "Fairness Concepts & Detection",
            items: [
              "Demographic parity, equalized odds, individual fairness",
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
        learning_phase: "Apply",
        topics: 3,
        hours: 3,
        tags: ["operate"],
        groups: [
          {
            title: "Architecture & Model Health Score",
            items: [
              "Centralized versus federated monitoring",
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
  },

  skills: {
    heading: "Key <span>Skills and Outcomes</span> Your Team Will Gain",
    description:
      "The practical skills your team will build during the program, and what each one lets them do in your own production workflows. Together they are the monitoring capability your team takes away.",
    items: [
      {
        title: "Data and Concept Drift Detection",
        description:
          "Detect data drift, concept drift, and distribution shift using statistical tests and modern detectors before accuracy degrades.",
      },
      {
        title: "Model Performance Metrics Tracking",
        description:
          "Track the right performance metrics per model type and per data slice, with thresholds and guardrails for production.",
      },
      {
        title: "Monitoring Infrastructure Setup",
        description:
          "Stand up monitoring infrastructure with instrumentation, metrics, dashboards, and dedicated ML monitoring platforms.",
      },
      {
        title: "Alerting and Incident Response",
        description:
          "Design ML-specific alert rules, route and escalate incidents, and run structured post-incident reviews.",
      },
      {
        title: "Model Retraining and Lifecycle Management",
        description:
          "Decide when to retrain, automate pipelines, version models, and deploy updates safely across the model lifecycle.",
      },
      {
        title: "Fairness and Bias Monitoring",
        description:
          "Measure fairness across groups, detect bias drift, and meet compliance requirements for responsible production ML.",
      },
      {
        title: "MLOps Observability Integration",
        description:
          "Integrate ML monitoring into the wider MLOps and observability stack with tracing, infrastructure-as-code, and health scores.",
      },
    ],
  },

  audience: {
    section_cta: {
      title: "Mixed cohort, or several teams at once?",
      description:
        "We can tailor the training to different teams, roles, and experience levels within the same program.",
      cta: { label: "Share Your Requirements", href: APPLY_ANCHOR },
    },

    heading:
      "Which Employees Should Attend this ML Model Monitoring Group Training?",
    description:
      "This program is for the engineers, technical leads and managers who build, deploy or operate machine learning models, and for the teams responsible for keeping those models accurate and compliant in production.",
    roles: [
      [
        "ML Engineers",
        "Data Scientists",
        "MLOps Engineers",
        "DevOps Engineers",
        "AI Platform Engineers",
        "Data Engineers",
      ],
      [
        "Product Managers",
        "Business Analysts",
        "Data & AI Product Owners",
        "IT Managers",
        "Digital Transformation Leads",
      ],
      [
        "L&D Managers",
        "Heads of L&D",
        "Engineering Leaders",
        "AI/ML Leaders",
        "HR / Talent Development",
      ],
    ],
    prerequisites:
      "Participants should have experience in machine learning model development and Python programming. Where a group mixes model builders with platform and data engineers, tell us at scoping and we split the depth by level.",
    progression: {
      title: "Skill Levels for Your Teams",
      description: "Where a typical participant starts and where they finish.",
      levels: ["Foundation", "Intermediate", "Advanced", "Very Advanced"],
      bands: [
        {
          label: "Prerequisites (build first)",
          variant: "pre",
          rows: [
            { skill: "Python for ML", prerequisite: true, entry: 1, exit: 2 },
            {
              skill: "ML model development",
              prerequisite: true,
              entry: 1,
              exit: 3,
            },
          ],
        },
        {
          label: "Taught in this program: no prior experience needed",
          variant: "taught",
          rows: [
            {
              skill: "Drift detection & statistical tests",
              prerequisite: false,
              entry: 0,
              exit: 3,
            },
            {
              skill: "Monitoring infrastructure",
              prerequisite: false,
              entry: 0,
              exit: 3,
            },
            {
              skill: "Alerting & incident response",
              prerequisite: false,
              entry: 0,
              exit: 3,
            },
            {
              skill: "Retraining, A/B & shadow deployment",
              prerequisite: false,
              entry: 0,
              exit: 3,
            },
            {
              skill: "Explainability & fairness monitoring",
              prerequisite: false,
              entry: 0,
              exit: 2,
            },
          ],
        },
      ],
      note: "Only the first two lines are prerequisites. Everything below is taught from the ground up.",
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

  faqs: {
    section_cta: {
      title: "Question not answered here?",
      description:
        "Put it in the request. A training specialist answers it directly, within one business day.",
      cta: { label: "Talk to our Expert", href: APPLY_ANCHOR },
    },

    heading: "Frequently Asked <span>Questions</span>",
    items: [
      {
        question: "What is ML Model Monitoring training?",
        answer:
          "An instructor-led corporate training program that teaches your team to keep production models accurate, reliable, fair and compliant over time: drift detection, performance tracking, alerting and incident response, retraining, explainability and fairness governance.",
      },
      {
        question: "How long does the program run?",
        answer:
          "24 to 40 hours, instructor-led, delivered virtually, onsite or hybrid in 10+ languages. The schedule is built around your release calendar, so the hours land where the team can actually attend without leaving on-call cover thin.",
      },
      {
        question: "Which tools does the program cover?",
        answer:
          "Labs run on real production tooling: drift tests such as Kolmogorov–Smirnov and Population Stability Index, attribution methods for explainability, fairness assessment libraries, and the observability platforms your engineers already operate.",
      },
      {
        question: "What are the prerequisites?",
        answer:
          "Working experience with machine learning model development and Python. No prior monitoring or MLOps background is assumed. Module 01 starts from why monitoring matters and builds the vocabulary every later lab depends on.",
      },
      {
        question: "Do participants receive a certificate?",
        answer:
          "Yes. On successful completion each participant receives an Edstellar program completion certificate recording the program, the hours and the date. It is issued by Edstellar and is not a third-party or awarding-body certification.",
      },
      {
        question: "Can the course be customized for our team and our stack?",
        answer:
          "Yes. Examples and labs are built around your models, your tooling and your production environment, so the drift tests and dashboards participants build in the room are the ones they maintain on Monday.",
      },
      {
        question: "Can you train Small Groups and Large Groups?",
        answer:
          "Yes. A single squad and a rollout across every office are both workable. Small groups run in one block around a release window; large groups run as staggered cohorts across sites and dates, so cover is never left thin. Every participant still builds their own dashboards.",
      },
      {
        question: "Do you offer corporate training solutions?",
        answer:
          "Yes. Edstellar covers 2,000+ programs, so this program can be bought on its own or as one track inside a wider L&D plan: pooled hours, one contract and a single reporting line across everything your people take.",
      },
      {
        question: "Do you train teams in multiple offices and countries?",
        answer:
          "Yes. One contract and one schedule cover every office that takes part, delivered virtual, onsite or hybrid across 100+ countries, with consolidated reporting so L&D sees every cohort in one place.",
      },
      {
        question: "Why choose Edstellar as your training partner?",
        answer:
          "Because the program runs on your production stack rather than a generic syllabus, is led by practitioners who operate models in production, and is scheduled around your releases. Tell us what your team needs and a specialist scopes it.",
      },
      {
        question: "What are your available dates?",
        answer:
          "Dates are set with you rather than published. Tell us the window you have in mind and we confirm trainer availability against it, usually within one business day. Short-notice requests are workable; three to four weeks of lead time gives the widest choice of trainers.",
      },
      {
        question: "What support do you provide after the training?",
        answer:
          "Post-training support runs for 30 days: your team can raise questions with the trainer, and the lab environment, templates and recordings stay available. You also get group reporting and, where useful, a follow-up session once the monitoring is live.",
      },
      {
        question: "Can we see trainer profiles before booking?",
        answer:
          "Yes. Shortlisted trainer profiles come with the proposal: production experience, tools they work with, sectors and languages. You choose, and you can ask for an introductory call with the trainer before the dates are confirmed.",
      },
      {
        question: "Which languages can the program be delivered in?",
        answer:
          "English by default, with 10+ other languages available including Spanish, Mandarin, German, Arabic, Portuguese, Hindi, French and Japanese. Materials can be translated separately from delivery if your team prefers to read in one language and learn in another.",
      },
      {
        question: "How do we get a quote?",
        answer:
          "Send your group size, preferred dates and delivery mode (virtual, onsite or hybrid) and we return a customized proposal within one business day. Purchase orders, payment terms, NDAs and vendor registration are handled by your account coordinator.",
      },
    ],
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
