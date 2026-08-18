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
/* CATEGORY COURSE PAGES — /corporate-training/vendor/{slug}                     */
/* ========================================================================== */

const CATEGORY_COURSES = {
  "ml-model-monitoring": {
    slug: "ml-model-monitoring",
    category: "artificial-intelligence",
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
            photo: "/course/Avatar.webp",
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
    ClientsLogosData: {
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
    stickyNavbarData: {
      logo: {
        src: "/course/Edstellar.svg",
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
    whyNow: {
      heading: {
        parts: [
          {
            text: "Why ",
          },
          {
            text: "ML model monitoring",
            em: true,
          },
          {
            text: " matters now.",
          },
        ],
      },

      description:
        "That silent decay is not hypothetical, and it is no longer only an engineering concern. Three forces have turned production monitoring from good practice into an operational requirement: degradation is now measured rather than assumed, the tooling market is consolidating fast around ML observability, and regulators mandate post-market monitoring for high-risk AI. This training closes the gap between deploying models and actually operating them.",

      stats: [
        {
          value: "91%",
          description: "of ML models degrade over time",
        },
        {
          value: "40.5%",
          description: "MLOps market CAGR to 2030",
        },
        {
          value: "€15M",
          description: "maximum EU AI Act penalty",
        },
        {
          value: "24–40",
          description: "hours of hands-on training",
        },
      ],

      cards: [
        {
          eyebrow: "SILENT DEGRADATION",
          title: "91% of models",
          description:
            "A peer-reviewed study in Scientific Reports tested 128 model–dataset pairs across healthcare, finance, transportation and weather, and found temporal degradation in 91% of them, which the researchers call AI aging. Nothing in the code changes; the world does.",
          tags: ["Data drift", "Concept drift", "Model staleness", "AI aging"],
        },

        {
          eyebrow: "MARKET GROWTH",
          title: "$16.6B by 2030",
          description:
            "The global MLOps market is projected to reach USD 16.6 billion by 2030, growing at a 40.5% compound annual rate from 2025, with monitoring and governance among the fastest-moving components of the stack.",
          tags: ["MLOps platforms", "ML observability", "Model governance"],
        },

        {
          eyebrow: "REGULATORY PRESSURE",
          title: "2 December 2027",
          description:
            "The EU AI Act mandates post-market monitoring for high-risk AI systems. The Digital Omnibus on AI, given final approval on 29 June 2026, deferred stand-alone Annex III obligations from August 2026 to 2 December 2027: a longer runway, not a lighter one.",
          tags: [
            "EU AI Act",
            "Post-market monitoring",
            "Annex III",
            "Conformity assessment",
          ],
        },
      ],

      platforms: {
        eyebrow:
          "EVERY MAJOR PLATFORM NOW SHIPS MODEL MONITORING, WHICH IS WHY THE SKILLS GAP IS URGENT",

        items: [
          {
            name: "Microsoft",
            product: "Azure ML model monitoring",
          },
          {
            name: "Google",
            product: "Vertex AI Model Monitoring",
          },
          {
            name: "AWS",
            product: "SageMaker Model Monitor",
          },
          {
            name: "Databricks",
            product: "Lakehouse Monitoring",
          },
          {
            name: "IBM",
            product: "watsonx.governance",
          },
        ],
      },
    },
    mapsectionData: {
      headlineParts: [
        { text: "Why choose Edstellar for " },
        { text: "ML monitoring ", em: true },
        { text: "training." },
      ],

      description:
        "Edstellar is a corporate training provider delivering instructor-led ML Model Monitoring programs to teams of every size, from a single squad to an entire engineering organization, on-site, virtual, or blended, with hands-on programs built and led by practitioners.",

      image: {
        src: "/course/map1.png",
        alt: "Global delivery map",
      },

      stats: [
        {
          value: "10,000+",
          label: "EXPERT TRAINERS",
        },
        {
          value: "1,000+",
          label: "ORGANIZATIONS TRAINED",
        },
        {
          value: "13+",
          label: "YEARS DELIVERING",
        },
        {
          value: "ISO 9001",
          connector: "&",
          secondaryValue: "27001",
          label: "CERTIFIED",
        },
      ],

      features: [
        {
          icon: "🎓",
          title: "Experienced Trainers",
          description:
            "Trainers from a vetted global network bring years of industry expertise, keeping every session practical and impactful.",
        },
        {
          icon: "✓",
          title: "Proven Quality",
          description:
            "With a strong global track record, Edstellar is known for quality and engaging delivery.",
          hover: true,
        },
        {
          icon: "⚙️",
          title: "Industry-Relevant Curriculum",
          description:
            "Programs are built by experts to match the demands of today’s industry.",
        },
        {
          icon: "🧩",
          title: "Fully Customizable",
          description:
            "Every program can be tailored to your organization’s goals and your production stack.",
        },
        {
          icon: "🤝",
          title: "Comprehensive Support",
          description:
            "We provide pre- and post-session support for a complete learning experience.",
        },
        {
          icon: "🌐",
          title: "Global, Multilingual Delivery",
          description:
            "We deliver across multiple locations and languages to support diverse global teams.",
        },
      ],

      relatedLabel: "ALSO FROM EDSTELLAR",

      relatedServices: [
        {
          title: "Talent assessments",
          description:
            "Psychometric, behavioral, leadership and 360-degree assessment.",
          href: "#",
        },
        {
          title: "Training needs analysis",
          description:
            "Needs analysis, gap identification, and a training roadmap.",
          href: "#",
          hover: true,
        },
        {
          title: "L&D consulting",
          description:
            "Learning strategy, content, technology and ROI measurement.",
          href: "#",
        },
        {
          title: "OD consulting",
          description: "Org design, succession planning and cultural change.",
          href: "#",
        },
        {
          title: "Managed training services",
          description:
            "Training outsourcing, vendor management, logistics and administration.",
          href: "#",
        },
        {
          title: "Coaching solutions",
          description:
            "Executive and manager coaching that keeps skills in use.",
          href: "#",
        },
      ],
    },
    lifecycle: {
      image: {
        src: "/course/circles.png",
        alt: "",
      },
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
    },

    skills: {
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
    },

    outcomes: {
      heading: {
        parts: [
          { text: "Learning " },
          { text: "outcomes", em: true },
          { text: " of this training." },
        ],
      },
      description:
        "These outcomes become the success measures we build your curriculum and KPIs around.",
      items: [
        "Master data drift and concept drift detection techniques for maintaining model accuracy in production.",
        "Develop comprehensive ML model performance tracking and evaluation workflows.",
        "Build production monitoring infrastructure with dashboards, alerts, and observability tooling.",
        "Apply model retraining strategies and lifecycle management practices for sustained ML performance.",
        "Gain expertise in A/B testing and shadow deployment for safe production model updates.",
        "Learn fairness, bias, and compliance monitoring practices for responsible ML in production.",
      ],
    },

    curriculum: {
      heading: {
        parts: [
          { text: "ML Model Monitoring " },
          { text: "course outline", em: true },
          { text: "." },
        ],
      },
      description:
        "Filter by what your team needs most, open any module for the detail, then build an agenda to send with your quote request.",

      badge: {
        title: "Designed by Edstellar and industry practitioners",
        description:
          "Built by engineers who run ML monitoring in production, then tailored to your stack before delivery.",
      },

      method: {
        steps: [
          {
            label: "Learn",
            parts: [
              {
                text: "Concept and context for each monitoring capability, and why it matters in production.",
              },
            ],
          },
          {
            label: "Practice",
            parts: [
              { text: "8 hands-on labs", strong: true },
              {
                text: " on a live monitoring stack, including what to do when a model drifts.",
              },
            ],
          },
          {
            label: "Apply",
            parts: [
              {
                text: "Bring each technique to your own models, stack, and governance requirements.",
              },
            ],
          },
        ],
        split: [
          { key: "learn", label: "Learn", percent: 14 },
          { key: "practice", label: "Practice", percent: 68 },
          { key: "apply", label: "Apply", percent: 18 },
        ],
        note: "Weighted toward hands-on practice. Labs run against a live monitoring stack with injected drift, not slides.",
        formats: ["Multi-day bootcamp", "Weekly sessions", "Blended"],
        capsule: ["8 labs", "+ capstone", "24–40 hours"],
        capsuleNote: "customized to your team's depth and schedule",
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
              "Trace a deployed model end to end: set up a baseline monitoring dashboard and establish what “healthy” looks like before drift begins.",
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
    },

    audience: {
      heading: {
        parts: [
          { text: "Who should attend this " },
          { text: "ML monitoring", em: true },
          { text: " training?" },
        ],
      },
      description:
        "Filter by function to see which roles this corporate training is shaped for.",

      filters: [
        { id: "all", label: "Everyone" },
        { id: "mlds", label: "ML & data science" },
        { id: "mlops", label: "MLOps & platform" },
        { id: "dataprod", label: "Data & product" },
      ],
      groupLabels: {
        mlds: "ML & DS",
        mlops: "MLOps",
        dataprod: "Data & Product",
      },
      roles: [
        { role: "ML Engineers & Data Scientists", group: "mlds" },
        { role: "MLOps & DevOps Engineers", group: "mlops" },
        { role: "AI Platform & Infrastructure Engineers", group: "mlops" },
        { role: "Data Engineers Supporting ML Pipelines", group: "dataprod" },
        { role: "AI Product Managers", group: "dataprod" },
        { role: "Analytics Engineers & Data Architects", group: "dataprod" },
      ],
      prerequisites:
        "Participants should have experience in machine learning model development and Python programming.",

      progression: {
        title: "Skill progression: entry → exit",
        description:
          "Where a typical participant starts and where they finish. Only the first two lines are prerequisites. Everything below is taught from the ground up.",
        items: [
          {
            skill: "Python for ML",
            entryLevel: "Intermediate",
            exitLevel: "Advanced",
            entryPercent: 50,
            exitPercent: 65,
            prerequisite: true,
          },
          {
            skill: "ML model development",
            entryLevel: "Intermediate",
            exitLevel: "Very Advanced",
            entryPercent: 50,
            exitPercent: 82,
            prerequisite: true,
          },
          {
            skill: "Drift detection & statistical tests",
            entryLevel: "None",
            exitLevel: "Very Advanced",
            entryPercent: 0,
            exitPercent: 92,
          },
          {
            skill: "Monitoring infrastructure",
            entryLevel: "Basic",
            exitLevel: "Very Advanced",
            entryPercent: 25,
            exitPercent: 86,
          },
          {
            skill: "Alerting & incident response",
            entryLevel: "Basic",
            exitLevel: "Very Advanced",
            entryPercent: 25,
            exitPercent: 88,
          },
          {
            skill: "Retraining, A/B & shadow deployment",
            entryLevel: "None",
            exitLevel: "Very Advanced",
            entryPercent: 0,
            exitPercent: 84,
          },
          {
            skill: "Explainability & fairness monitoring",
            entryLevel: "None",
            exitLevel: "Advanced",
            entryPercent: 0,
            exitPercent: 72,
          },
        ],
      },
    },
    deliveryModes: {
      heading: {
        parts: [
          { text: "Training delivery: " },
          { text: "onsite, virtual", em: true },
          { text: ", and offsite." },
        ],
      },
      description:
        "We design training your teams actually engage with, then deliver it the way that suits you, in 10+ languages through a vetted global trainer network.",
      tabs: [
        {
          id: "virtual",
          label: "Virtual",
          sublabel: "Online",
          title: "Virtual / online",
          description:
            "Expert-led live sessions delivered anywhere, with consistency and easy scheduling.",
          points: [
            "Delivered anywhere worldwide",
            "Standardized content for consistent outcomes",
            "Join from your own workspace, no travel",
            "Scales to large groups across sites",
            "Interactive tools keep remote learners engaged",
          ],
          image: "/course/vertual.webp",
          alt: "virtual Training",
          title: "virtual Training",
        },
        {
          id: "onsite",
          label: "On-site",
          sublabel: "In-house",
          title: "On-site (in-house)",
          description: "Immersive, instructor-led learning at your office.",
          points: [
            "Trainers run face-to-face at your office",
            "Setup and content tailored to your workplace and tools",
            "Group exercises drive collaboration",
            "Live demos plus hands-on practice",
            "Direct trainer access to clarify doubts",
          ],
          image: "/course/on-site.webp",
          alt: "On-site Training",
          title: "On-site Training",
        },
        {
          id: "offsite",
          label: "Off-site",
          sublabel: "Away day",
          title: "Off-site",
          description:
            "Focused, instructor-led group learning away from everyday distractions.",
          points: [
            "We host your teams at a venue of your choice",
            "Built-in group activities for bonding",
            "Full uninterrupted schedule for focus and retention",
            "Boosts morale and signals commitment",
          ],
          image: "/course/off-site.webp",
          alt: "off-site Training",
          title: "off-site Training",
        },
      ],
    },
    groupQuote: {
      title: {
        parts: [
          { text: "Get a proposal " },
          { text: "shaped to your needs", em: true },
          { text: "." },
        ],
      },
      description:
        "Answer three quick questions about team size, scope, and how often you need the program run, then send the request from the last step. Everything you choose travels with it, so you only fill this in once.",
      lockedProgram: "ML Model Monitoring Training",
    },
    trainers: {
      heading: {
        parts: [
          { text: "Learn from " },
          { text: "world-class", em: true },
          { text: " ML monitoring practitioners." },
        ],
      },

      description:
        "Every session is led by a practitioner who has run monitoring for models in production, not a generalist working from slides.",

      // Placeholder roster — generic names, stand-in stats. Real trainer
      // profiles are matched at scheduling (see `note`). Swap for the real
      // roster when it exists; don't invent a specific named person's photo,
      // rating, or session history in the meantime.
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
          spec: [
            "Retraining pipelines",
            "A/B & shadow deploys",
            "Orchestration",
          ],
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
    },
    customizedTraining: {
      eyebrow: "100+ COUNTRIES · 10+ LANGUAGES",

      title: "Get Customized Expert-led Training for Your Teams",

      description:
        "One partner for instructor-led corporate training, delivered the way your teams work.",

      cta: {
        label: "Request a Training Quote",
        href: "#contact",
      },

      benefits: [
        "Customized Training Delivery",
        "Scale Your Training: Small to Large Teams",
        "In-person Onsite, Live Virtual or Hybrid Training Modes",
        "Plan from 2000+ Industry-ready Training Programs",
        "8 Hands-On Labs on Live Infrastructure, Led by Industry Experts",
      ],
    },
    certificate: {
      title: {
        parts: [
          { text: "Your ML Model Monitoring " },
          { text: "training certificate", em: true },
          { text: "." },
        ],
      },

      description:
        "On successful completion, employees receive an Edstellar course completion certificate, recognizing their commitment to ongoing learning and professional development. It validates the skills they have built and motivates them to keep growing and contribute to organizational success.",

      highlight: {
        title: "Earned, not attended.",
        description:
          "Awarded on completion of all 8 hands-on labs and the capstone project.",
      },

      certificateCard: {
        title: "Certificate of Completion",
        subtitle: "ML MODEL MONITORING · EDSTELLAR",
        icon: "star",
      },
    },
    faqs: {
      title: {
        parts: [
          { text: "ML Model Monitoring training " },
          { text: "FAQs", em: true },
          { text: "." },
        ],
      },

      items: [
        {
          question: "What is ML Model Monitoring training?",
          answer:
            "It is an instructor-led corporate training program that teaches teams how to keep production machine learning models accurate, reliable, fair, and compliant over time. It covers the full monitoring lifecycle: data and concept drift detection, performance tracking, alerting and incident response, retraining and lifecycle management, A/B testing, explainability, and fairness and compliance monitoring.",
        },

        {
          question: "How long is the training and what is the format?",
          answer:
            "The program typically runs 24 to 40 hours, instructor-led, delivered virtually, onsite, or offsite, in 10+ languages, and is fully customizable to your team's schedule, experience level, and production stack.",
        },

        {
          question: "Which tools and techniques does the course cover?",
          answer:
            "Hands-on labs use real production tooling, alongside drift tests such as Kolmogorov-Smirnov and Population Stability Index, attribution methods for explainability, and fairness assessment tooling. A range of ML observability platforms are also covered.",
        },

        {
          question: "Who should attend?",
          answer:
            "It suits ML engineers and data scientists, MLOps and DevOps engineers, AI platform and infrastructure engineers, data engineers supporting ML pipelines, AI product managers, analytics engineers, and data architects.",
        },

        {
          question: "What are the prerequisites?",
          answer:
            "Participants should have experience in machine learning model development and Python programming.",
        },

        {
          question:
            "Do participants receive a certificate, and can the training be customized?",
          answer:
            "Yes. On successful completion, employees receive an Edstellar course completion certificate. The curriculum, examples, and labs are fully customized to your industry, tools, and production environment, and delivered for teams onsite, offsite, or virtually worldwide.",
        },
      ],
    },

    leadForm: {
      title: {
        parts: [
          { text: "Request " },
          { text: "ML Model Monitoring", em: true },
          { text: " training for your team." },
        ],
      },
      description:
        "Tell us what your team needs. Anything you selected in the course outline comes through with your request.",
      slaNote:
        "We reply within one business day with a tailored proposal, no automated sales sequence.",
      pricingHref: "https://www.edstellar.com/corporate-training-pricing#table",
    },

    stickyFooter: {
      formAnchorId: "apply",

      messages: [
        {
          highlight: "Instructor-led corporate training",
          rest: "· One partner, every team",
        },
        {
          highlight: "Virtual · On-site · Off-site",
          rest: ", your choice of mode",
        },
        {
          highlight: "10 modules · 24–40 hours",
          rest: ", fully customized to your stack",
        },
        {
          highlight: "100+ countries · 10+ languages",
          rest: ", delivered where your teams are",
        },
        {
          highlight: "Hands-on with real tooling",
          rest: ": drift, dashboards, alerting",
        },
        {
          highlight: "Drift, alerting, retraining, fairness",
          rest: ", the full monitoring lifecycle",
        },
      ],

      cta: {
        label: "Request a Training Quote",
        href: "#apply",
      },
    },
    WhyEds: {
      headingParts: [
        { text: "Where this fits in your team's " },
        { text: "learning path.", em: true },
      ],

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
        {
          title: "LLM Observability Training",
          meta: "16 – 24 HRS",
          type: "INSTRUCTOR-LED",
          href: "#",
          cta: "VIEW COURSE →",
        },
        {
          title: "MLOps for LLMs Training",
          meta: "12 – 24 HRS",
          type: "INSTRUCTOR-LED",
          href: "#",
          cta: "VIEW COURSE →",
        },
        {
          title: "AI Decision Support Systems Training",
          meta: "16 – 24 HRS",
          type: "INSTRUCTOR-LED",
          href: "#",
          cta: "VIEW COURSE →",
        },
        {
          title: "Vector Database for AI Systems Training",
          meta: "12 – 24 HRS",
          type: "INSTRUCTOR-LED",
          href: "#",
          cta: "VIEW COURSE →",
        },
        {
          title: "Machine Learning with Scikit-Learn Training",
          meta: "16 – 24 HRS",
          type: "INSTRUCTOR-LED",
          href: "#",
          cta: "VIEW COURSE →",
        },
        {
          title: "Implementing an AI Management System Training",
          meta: "16 – 24 HRS",
          type: "INSTRUCTOR-LED",
          href: "#",
          cta: "VIEW COURSE →",
        },
      ],
    },
    SlideData: {
      headingParts: [
        { text: "ML monitoring training " },
        { text: "results", em: true },
        { text: " from real teams." },
      ],
      items: [
        {
          id: "result-1",
          quote:
            "Edstellar's virtual ML Model Monitoring training gave our ML platform team the operational discipline needed to manage production models at scale. Within 60 days, we deployed a centralised drift monitoring system across 40 production models, reduced undetected degradation incidents by 70%, and cut mean time to detect from 3 weeks to under 48 hours.",
          name: "Suresh Raghavan",
          role: "Head of ML Platform · Global Insurance Technology Company",
          image: "/course/image.png",
        },

        {
          id: "result-2",
          quote:
            "The onsite training was exactly what our data science and engineering teams needed to operate production models responsibly. The hands-on labs with real production tooling were directly applicable to our stack. Post-training, we built alerting and retraining pipelines that reduced model-related incidents by 55% in the first quarter.",
          name: "Meghna Pillai",
          role: "VP of AI Operations · Leading Retail Technology Enterprise",
          image: "/course/image3.png",
        },

        {
          id: "result-3",
          quote:
            "We ran our entire ML and MLOps team through Edstellar's intensive program off-site. The coverage from drift detection to fairness monitoring and lifecycle management gave our team a unified operational playbook. Our model health dashboard now covers 100% of production models and compliance audit prep dropped by 40%.",
          name: "Deepa Krishnan",
          role: "Chief Machine Learning Officer · Multinational FinTech Group",
          image: "/course/image4.png",
        },

        {
          id: "result-4",
          quote:
            "Edstellar's IT and technical training programs have been instrumental in strengthening our engineering teams and building future-ready capabilities. The hands-on approach and expert guidance improved technical depth, problem-solving, and execution across projects.",
          name: "Aditi Rao",
          role: "L&D Head · Global Technology Company",
          image: "/course/Rectangle.svg",
        },
      ],
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

export const getCategoryCourse = cache(
  async (slug) => CATEGORY_COURSES[slug] ?? null,
);

export const getCategoryCourseSlugs = cache(async () =>
  Object.keys(CATEGORY_COURSES),
);

export const getCategoryCourses = cache(async () =>
  Object.values(CATEGORY_COURSES),
);
