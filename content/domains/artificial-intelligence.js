import { DELIVERY_COUNTRIES, DELIVERY_LANGUAGES } from "@/lib/constants";

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

/**
 * Domain content: Artificial Intelligence.
 *
 * Pure content. No reads, no `cache()`, no fetch — those live in
 * `lib/content/domains.js`. Adding a domain means adding a file here and one
 * line to `content/domains/index.js`; nothing else changes.
 */
const artificialIntelligence = {
  slug: "artificial-intelligence",

  name: "Artificial Intelligence",

  seo: {
    meta_title: "Corporate Artificial Intelligence Training",
    meta_description:
      "Instructor-led corporate AI training across generative AI, machine learning, MLOps and governance. Scoped to your stack, delivered onsite or virtually in 100+ countries.",
    og_image_url: null,
  },
  hero: {
    heading: "Corporate <span>Artificial Intelligence</span> Training",

    subhead: "Build the people who will run your AI, not just the models.",

    intro_text:
      "We build AI capability inside enterprises: the people, the standards and the governance that let an organization run AI itself. Instructor-led programs across generative AI, machine learning, MLOps and governance are how we do it, scoped to your stack and delivered wherever your teams are.",

    meta: DELIVERY_META,
    media: {
      image: null,
      video: "/category/Home-Animation.mp4",
      alt: "An enterprise team reviewing AI systems on a shared display",
    },

    actions: [
      {
        label: "Browse AI programs",
        href: "#catalog",
        variant: "primary",
      },
      {
        label: "Ask a question",
        href: "#apply",
        variant: "ghost",
      },
      {
        label: "Download Brochure",
        href: "#apply",
        variant: "ghost",
      },
    ],
  },
  breadcrumbs: [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Corporate Training",
      href: "/corporate-training",
    },
    {
      label: "Artificial Intelligence",
    },
  ],
  proof: {
    tone: "light",

    stats: [
      {
        value: "130",
        label: "AI programs",
      },
      {
        value: "6",
        label: "Disciplines",
      },
      {
        value: "7",
        label: "Role paths",
      },
    ],

    trainers: {
      value: "300+",
      label: "Vetted AI trainers",
      people: [
        {
          photo: "/course/Avatar.webp",
        },
      ],
    },
  },
  sticky_nav: {
    logo: {
      src: "/course/Edstellar.svg",
      alt: "Edstellar",
    },
    tabs: [
      { id: "most-requested", label: "Most requested", active: true },
      { id: "about", label: "About", active: false },
      { id: "by-discipline", label: "By discipline", active: false },
      { id: "by-role", label: "By role", active: false },
      { id: "paths", label: "Paths", active: false },
      { id: "outcomes", label: "Outcomes", active: false },
      { id: "delivery", label: "Delivery", active: false },
      { id: "trainers", label: "Trainers", active: false },
      { id: "proof", label: "Proof", active: false },
      { id: "why-edstellar", label: "Why Edstellar", active: false },
      { id: "how-delivered", label: "How it’s delivered", active: false },
      { id: "from-edstellar", label: "More from Edstellar", active: false },
      { id: "related-domains", label: "Related domains", active: false },
      { id: "faqs", label: "FAQ", active: false },
      { id: "scope", label: "Scope an RFP", active: false },
      { id: "apply", label: "Ask a Quation", active: false },
    ],
  },
  requestedData: {
    heading: {
      before: "Most-requested",
      emphasis: "AI training topics.",
      after: "",
    },

    description:
      "A snapshot of where demand is concentrated across the AI training we are asked to run, from broad literacy that reaches every employee to the deep technical and governance work that runs models in production.",
    note: "Most organizations ask for two tracks at once: a broad literacy rollout for every employee, and a deeper technical track for the teams building and operating models. We scope both in a single engagement.",
    label: "Share of incoming requests",

    items: [
      {
        label: "Org-wide AI literacy",
        value: 38,
      },
      {
        label: "Generative AI & LLMs",
        value: 27,
      },
      {
        label: "MLOps & engineering",
        value: 19,
      },
      {
        label: "AI governance",
        value: 16,
      },
    ],
  },
  about: {
    heading: "What is corporate <span>AI training</span>?",

    body: [
      "Corporate AI training is instructor-led group training that builds an organisation's ability to design, deploy, and govern artificial intelligence systems. It spans two tracks: technical depth for the data, engineering, and MLOps teams who build and run models, and broad enablement for the functions who now use AI tools in daily work. Programs are scoped to an employer's stack and delivered to a closed cohort rather than sold as individual seats.",
    ],
    expanded_body: [
      "The distinction that matters commercially is between capability and access. Individual licences give people tools; group training gives a team a shared baseline: the same patterns, the same evaluation habits, and the same rules for handling data. For enterprises deploying AI under regulatory obligation, that shared baseline is what an auditor can be shown.",
      "Programs split across two tracks. Technical depth for the data, engineering and MLOps teams who build and run models. Broad enablement for finance, marketing, HR and operations, who now use AI tools daily and are the larger source of ungoverned adoption.",
    ],
    // cta-bannerdata.js
    cta_banner: [
      {
        variant: "light",
        eyebrow: "BUILD VERSUS BUY AI TALENT",
        heading:
          "Close the AI skills gap with the engineers you already employ.",
        cta_text: "Upskill Your Teams with AI Training Programs",
        cta_href: "/corporate-training",
      },
    ],
  },
  programData: {
    eyebrow: {
      discipline: "DISCIPLINEs",
    },

    heading: {
      before: "Instructor-led",
      emphasis: "AI programs,",
      after: " filtered to your team.",
    },

    description:
      "A selection from the live catalog. Combine a discipline and a role to narrow it.",

    filters: {
      allDisciplines: "All disciplines",
    },

    catalog: {
      showingLabel: "SHOWING",
      ofLabel: "OF",
      liveCatalogLabel: "IN THE LIVE CATALOG",
      searchPlaceholder: "Search programs",
      noResults:
        "No program matches that combination in this selection. The live catalog holds 130 AI programs, and we build custom programs where nothing fits.",

      actions: [
        {
          label: "Ask for a Match",
          href: "#catalog",
          variant: "primary",
        },
      ],

      courseCount: 130,

      deliveryBadge: {
        instructorLed: "INSTRUCTOR-LED",
        separator: "·",
        onSite: "ON-SITE",
        virtual: "VIRTUAL",
      },

      card: {
        viewProgram: "VIEW PROGRAM",
        requestProgram: "REQUEST PROGRAM",
        durationOnRequest: "DURATION ON REQUEST",
        hoursSuffix: "HRS",
        proposedLabel: "PROPOSED",
        proposedProgramLabel: "PROPOSED PROGRAM",
      },

      pagination: {
        previous: "PREVIOUS",
        next: "NEXT",
        allProgramsSuffix: "ALL",
      },

      courses: [
        {
          id: "genai-training",

          title: "Generative AI (GenAI) Training",

          description:
            "Build and deploy generative models including LLMs, diffusion models and transformer architectures.",

          discipline: "Generative AI",

          disciplineTags: ["Generative AI"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/667d2c13668e8cd560984f05_Generative%20AI%20with%20Large%20Language%20Models%20Training%201200x600.webp",
            alt: "Generative AI Training",
            title: "Generative AI (GenAI) Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 24,
            max: 32,
          },

          proposed: false,

          href: "/course/generative-ai-training",
        },

        {
          id: "rag-training",

          title: "Retrieval Augmented Generation (RAG) Training",

          description:
            "Build RAG pipelines combining vector databases with LLMs for grounded answers from enterprise knowledge.",

          discipline: "Generative AI",

          disciplineTags: ["Generative AI"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/6984353e51bbb54859fb2679_1200%20x%20600%20-%20Retrieval%20Augmented%20Generation%20(RAG)%20Training.webp",
            alt: "Retrieval Augmented Generation Training",
            title: "Retrieval Augmented Generation (RAG) Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 12,
            max: 24,
          },

          proposed: false,

          href: "/course/retrieval-augmented-generation-training",
        },

        {
          id: "agentic-ai-training",

          title: "Agentic AI Training",

          description:
            "Design autonomous agents that reason, plan and execute multi-step tasks with tool integration and memory.",

          discipline: "Generative AI",

          disciplineTags: ["Generative AI"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/683823f3003ba05730fd3c65_1200_x_600_-__Agentic_AI.webp",
            alt: "Agentic AI Training",
            title: "Agentic AI Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 20,
            max: 40,
          },

          proposed: false,

          href: "/course/agentic-ai-training",
        },

        {
          id: "llm-observability",

          title: "LLM Observability Training",

          description:
            "Monitor and optimize LLM behavior with observability practices that improve reliability.",

          discipline: "Generative AI",

          disciplineTags: ["Generative AI"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/6a1ea20f3b763cd90d946319_1200%20x%20600%20-%20LLM%20Observability.webp",
            alt: "LLM Observability Training",
            title: "LLM Observability Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 16,
            max: 24,
          },

          proposed: false,

          href: "/course/llm-observability-training",
        },

        {
          id: "mlops-llms",

          title: "MLOps for LLMs Training",

          description:
            "Operate LLM systems in production: versioning, rollout, cost control and incident response.",

          discipline: "Generative AI",

          disciplineTags: ["Generative AI", "MLOps"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/6a16e58144ce089fe9c52414_1200%20x%20600%20-MLOps%20for%20LLMs%20Training.webp",
            alt: "MLOps for LLMs Training",
            title: "MLOps for LLMs Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "request",
          },

          proposed: false,

          href: "/course/mlops-for-llms-training",
        },

        {
          id: "ai-evaluation",

          title: "AI Evaluation and Red-Teaming",

          description:
            "Adversarial testing for LLM systems: jailbreaks, prompt injection, grounding failures and refusal behavior.",

          discipline: "Generative AI",

          disciplineTags: ["Generative AI", "Governance"],

          image: {
            src: "",
            alt: "",
            title: "",
          },

          delivery: {
            instructorLed: false,
            onSite: false,
            virtual: false,
          },

          duration: {
            type: "range",
            min: 16,
            max: 24,
          },

          proposed: true,

          href: "/course/ai-evaluation-red-teaming",
        },

        {
          id: "machine-learning",

          title: "Introduction to Machine Learning Training",

          description:
            "Foundations of supervised and unsupervised learning for teams new to modeling.",

          discipline: "Machine Learning",

          disciplineTags: ["Machine Learning"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/667d11099e1e44f675d148df_Introduction%20to%20Machine%20Learning%20Training%201200x600.webp",
            alt: "Introduction to Machine Learning Training",
            title: "Introduction to Machine Learning Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "request",
          },

          proposed: false,

          href: "/course/introduction-to-machine-learning-training",
        },

        {
          id: "machine-learning-python",

          title: "Machine Learning with Python Training",

          description:
            "Implement ML pipelines in Python for classification, regression and clustering, through to deployment.",

          discipline: "Machine Learning",

          disciplineTags: ["Machine Learning"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/667d5582cb3e5b7a1bd0d241_Machine%20Learning%20with%20Python%20Training%201200x600.webp",
            alt: "Machine Learning with Python Training",
            title: "Machine Learning with Python Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 40,
            max: 48,
          },

          proposed: false,

          href: "/course/machine-learning-with-python-training",
        },

        {
          id: "machine-learning-scikit",

          title: "Machine Learning with Scikit-Learn Training",

          description:
            "Predictive modeling and evaluation workflows using the scikit-learn ecosystem.",

          discipline: "Machine Learning",

          disciplineTags: ["Machine Learning"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/662f3c8cbd1f828c697c3968_Machine_Learning_with_Scikit-Learn_Course.webp",
            alt: "Machine Learning with Scikit-Learn Training",
            title: "Machine Learning with Scikit-Learn Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "request",
          },

          proposed: false,

          href: "/course/machine-learning-with-scikit-learn-training",
        },

        {
          id: "deep-learning-training",

          title: "Deep Learning Training",

          description:
            "Build deep learning solutions using neural networks, optimization techniques and modern architectures.",

          discipline: "Machine Learning",

          disciplineTags: ["Machine Learning"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/667d5582cb3e5b7a1bd0d241_Machine%20Learning%20with%20Python%20Training%201200x600.webp",
            alt: "Deep Learning Training",
            title: "Deep Learning Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 24,
            max: 40,
          },

          proposed: false,

          href: "/course/deep-learning-training",
        },

        {
          id: "generative-ai-python",

          title: "Generative AI with Python Training",

          description:
            "Learn practical generative AI development using Python, LLMs, prompting and model integration.",

          discipline: "Generative AI",

          disciplineTags: ["Generative AI"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/667d2c13668e8cd560984f05_Generative%20AI%20with%20Large%20Language%20Models%20Training%201200x600.webp",
            alt: "Generative AI with Python Training",
            title: "Generative AI with Python Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 24,
            max: 32,
          },

          proposed: false,

          href: "/course/generative-ai-with-python-training",
        },

        {
          id: "llm-engineering",

          title: "LLM Engineering Training",

          description:
            "Develop production-ready LLM applications with prompting, retrieval, evaluation and deployment workflows.",

          discipline: "Generative AI",

          disciplineTags: ["Generative AI"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/6a16e58144ce089fe9c52414_1200%20x%20600%20-MLOps%20for%20LLMs%20Training.webp",
            alt: "LLM Engineering Training",
            title: "LLM Engineering Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 20,
            max: 32,
          },

          proposed: false,

          href: "/course/llm-engineering-training",
        },

        {
          id: "mlops-training",

          title: "MLOps Training",

          description:
            "Build reliable machine learning operations workflows covering deployment, monitoring, versioning and governance.",

          discipline: "MLOps",

          disciplineTags: ["MLOps"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/6a16e58144ce089fe9c52414_1200%20x%20600%20-MLOps%20for%20LLMs%20Training.webp",
            alt: "MLOps Training",
            title: "MLOps Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 16,
            max: 24,
          },

          proposed: false,

          href: "/course/mlops-training",
        },

        {
          id: "ai-governance",

          title: "AI Governance Training",

          description:
            "Build practical AI governance frameworks for responsible development, deployment, monitoring and risk management.",

          discipline: "Governance",

          disciplineTags: ["Governance"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/662f3c8cbd1f828c697c3968_Machine_Learning_with_Scikit-Learn_Course.webp",
            alt: "AI Governance Training",
            title: "AI Governance Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 16,
            max: 24,
          },

          proposed: false,

          href: "/course/ai-governance-training",
        },

        {
          id: "ai-product-management",

          title: "AI Product Management Training",

          description:
            "Learn how to scope, evaluate and operationalize AI products from discovery through production.",

          discipline: "Applied AI",

          disciplineTags: ["Applied AI"],

          image: {
            src: "https://cdn.prod.website-files.com/6484144ee6dda9d4b9ab7f57/683823f3003ba05730fd3c65_1200_x_600_-__Agentic_AI.webp",
            alt: "AI Product Management Training",
            title: "AI Product Management Training",
          },

          delivery: {
            instructorLed: true,
            onSite: true,
            virtual: true,
          },

          duration: {
            type: "range",
            min: 16,
            max: 24,
          },

          proposed: false,

          href: "/course/ai-product-management-training",
        },
      ],
    },
  },
  byRoleData: {
    heading: {
      before: "Find AI training",
      emphasis: "by role.",
      after: "",
    },

    description:
      "The same AI initiative asks different things of different people. Start from the role you are training and work outward.",

    roles: [
      {
        id: "executives-sponsors",
        number: "R01",
        title: "Executives & sponsors",

        description:
          "Enough fluency to fund, scope and challenge AI work, and to know what good evidence of control looks like.",

        programs: [
          {
            label: "AI for Managers",
            href: "#",
          },
          {
            label: "AI Governance",
            href: "#",
          },
          {
            label: "Responsible Generative AI",
            href: "#",
          },
        ],
      },

      {
        id: "business-operations",
        number: "R02",
        title: "Business & operations",

        description:
          "Practical AI fluency for teams shaping processes, workflows and operational decisions.",

        programs: [
          {
            label: "AI for Business",
            href: "#",
          },
          {
            label: "AI Workflow Automation",
            href: "#",
          },
          {
            label: "Generative AI for Productivity",
            href: "#",
          },
        ],
      },

      {
        id: "analysts-data-teams",
        number: "R03",
        title: "Analysts & data teams",

        description:
          "Build the practical skills needed to work with AI, data and analytical workflows across the organization.",

        programs: [
          {
            label: "AI for Data Analysis",
            href: "#",
          },
          {
            label: "Machine Learning Fundamentals",
            href: "#",
          },
          {
            label: "Generative AI for Data Teams",
            href: "#",
          },
        ],
      },

      {
        id: "data-scientists-ml-engineers",
        number: "R04",
        title: "Data scientists & ML engineers",

        description:
          "Advance model development, evaluation and production practices for modern machine learning systems.",

        programs: [
          {
            label: "Machine Learning",
            href: "#",
          },
          {
            label: "Deep Learning",
            href: "#",
          },
          {
            label: "MLOps",
            href: "#",
          },
        ],
      },

      {
        id: "software-engineers",
        number: "R05",
        title: "Software engineers",

        description:
          "Develop the engineering skills required to build, integrate and operate AI-powered applications.",

        programs: [
          {
            label: "Generative AI Engineering",
            href: "#",
          },
          {
            label: "LLM Engineering",
            href: "#",
          },
          {
            label: "Agentic AI",
            href: "#",
          },
        ],
      },

      {
        id: "mlops-platform-engineers",
        number: "R06",
        title: "MLOps & platform engineers",

        description:
          "Operate reliable AI systems with strong deployment, monitoring, observability and governance practices.",

        programs: [
          {
            label: "MLOps for LLMs",
            href: "#",
          },
          {
            label: "LLM Observability",
            href: "#",
          },
          {
            label: "AI Infrastructure",
            href: "#",
          },
        ],
      },

      {
        id: "risk-legal-compliance",
        number: "R07",
        title: "Risk, legal & compliance",

        description:
          "Understand AI risk, governance and compliance requirements across the AI lifecycle.",

        programs: [
          {
            label: "AI Governance",
            href: "#",
          },
          {
            label: "Responsible AI",
            href: "#",
          },
          {
            label: "AI Risk Management",
            href: "#",
          },
        ],
      },

      {
        id: "hr-ld",
        number: "R08",
        title: "HR & L&D",

        description:
          "Build the capability to plan, deploy and measure AI learning programs across the workforce.",

        programs: [
          {
            label: "AI Skills Strategy",
            href: "#",
          },
          {
            label: "AI Literacy for Employees",
            href: "#",
          },
          {
            label: "AI Learning Programs",
            href: "#",
          },
        ],
      },
    ],
    ctaBannerData: [
      {
        variant: "light",
        eyebrow: "",
        heading:
          "Training a role that is not listed, or a mix of them? Tell us who you are training and what they need to do, and we build the shortlist.",
        ctaText: "Request a tailored quote",
        ctaHref: "/corporate-training",
      },
    ],
  },
  pathsData: {
    mark: {
      label: "SEVEN ROLE PATHS",
    },

    heading: {
      before: "A catalog tells you what exists. A path tells you",
      emphasis: "what comes first.",
      after: "",
    },

    description:
      "The filters above return a set. They do not tell you the order to take it in, and order is most of the value: monitoring before deployment teaches nothing, and governance before a model exists is theory. Each path below runs from where a role stands today to what it owns at the end, and every stop names the problem it takes off the team.",

    paths: [
      {
        id: "ml-engineer",
        icon: "brain",
        title: "ML engineer",
        subtitle: "STARTS Builds models in notebooks",
        meta: "4 STEPS · 80–104 HRS TOTAL",

        items: [
          {
            title: "Introduction to Machine Learning",
            description:
              "The team can identify which business problems are suitable for machine learning.",
          },
          {
            title: "Machine Learning with Python",
            description:
              "Models and pipelines are built in-house instead of depending entirely on external vendors.",
          },
          {
            title: "ML Model Monitoring",
            description:
              "Model drift and performance degradation are detected before they affect customers.",
          },
          {
            title: "MLOps Foundations",
            tag: "PROPOSED",
            description:
              "Production models can be deployed, monitored and rolled back through a repeatable process.",
          },
        ],

        outcome: "Owns models in production",

        footer:
          "Models reach production and stay there without requiring a vendor for every change or incident.",
        button: "VIEW ALL AI TRAINING PROGRAMS →",
        href: "#",
      },

      {
        id: "genai-engineer",
        icon: "sparkles",
        title: "GenAI engineer",
        subtitle: "STARTS Prototypes against an API key",
        meta: "4 STEPS · 72–120 HRS TOTAL",

        items: [
          {
            title: "Generative AI Foundations",
            description:
              "The team understands the capabilities, limitations and practical use cases of modern generative AI.",
          },
          {
            title: "Retrieval Augmented Generation",
            description:
              "LLM responses are grounded in trusted company knowledge instead of relying only on model memory.",
          },
          {
            title: "AI Evaluation & Red-Teaming",
            tag: "PROPOSED",
            description:
              "Prompt injection, hallucination and other failure modes are discovered before production.",
          },
          {
            title: "Agentic AI",
            description:
              "AI agents can use tools within defined boundaries while knowing when to hand control back to a human.",
          },
        ],

        outcome: "Ships grounded LLM systems",

        footer:
          "LLM features move from promising prototypes to controlled production systems with measurable quality.",
        button: "VIEW ALL AI TRAINING PROGRAMS →",
        href: "#",
      },

      {
        id: "mlops-engineer",
        icon: "workflow",
        title: "MLOps engineer",
        subtitle: "STARTS Deploys models by hand",
        meta: "4 STEPS · 56–80 HRS TOTAL",

        items: [
          {
            title: "MLOps Foundations",
            tag: "PROPOSED",
            description:
              "Model deployment becomes a documented and repeatable engineering process.",
          },
          {
            title: "ML Model Monitoring",
            description:
              "Teams can monitor model health, data drift and performance after deployment.",
          },
          {
            title: "LLM Observability",
            description:
              "LLM quality, latency, usage and cost can be tracked across production workloads.",
          },
          {
            title: "MLOps for LLMs",
            description:
              "LLM releases, rollbacks and incidents are managed using production-ready operating practices.",
          },
        ],

        outcome: "Runs the deployment layer",

        footer:
          "Releases, rollbacks and incidents follow a repeatable procedure that the whole engineering team can run.",
        button: "VIEW ALL AI TRAINING PROGRAMS →",
        href: "#",
      },

      {
        id: "ai-product-engineer",
        icon: "package",
        title: "AI product engineer",
        subtitle: "STARTS Ships features without AI ownership",
        meta: "4 STEPS · 64–88 HRS TOTAL",

        items: [
          {
            title: "AI Product Foundations",
            description:
              "Product teams learn where AI can create measurable value instead of adding technology without purpose.",
          },
          {
            title: "LLM Application Design",
            description:
              "AI experiences are designed around user outcomes, workflows and reliable product behavior.",
          },
          {
            title: "AI Evaluation & Quality",
            tag: "PROPOSED",
            description:
              "AI features are tested against defined quality standards before customers discover failures.",
          },
          {
            title: "Production AI Delivery",
            description:
              "AI capabilities move from experimentation into reliable, maintainable product experiences.",
          },
        ],

        outcome: "Owns AI product delivery",

        footer:
          "AI features ship with clear ownership, measurable quality and a defined path from prototype to production.",
        button: "VIEW ALL AI TRAINING PROGRAMS →",
      },

      {
        id: "ai-governance-lead",
        icon: "shield",
        title: "AI governance lead",
        subtitle: "STARTS Defines policy without technical context",
        meta: "4 STEPS · 48–72 HRS TOTAL",

        items: [
          {
            title: "AI Risk Foundations",
            description:
              "Teams learn how to identify and prioritize the risks introduced by AI systems.",
          },
          {
            title: "Responsible AI",
            description:
              "Governance principles are connected to real models, data, workflows and business decisions.",
          },
          {
            title: "AI Evaluation Frameworks",
            tag: "PROPOSED",
            description:
              "AI systems are assessed against defined business, quality, safety and compliance expectations.",
          },
          {
            title: "AI Governance Operations",
            description:
              "Governance becomes an operational process with clear controls, owners and evidence.",
          },
        ],

        outcome: "Runs practical AI governance",

        footer:
          "AI decisions have traceable controls, accountable owners and documented evidence throughout the lifecycle.",
        button: "VIEW ALL AI TRAINING PROGRAMS →",
      },

      {
        id: "ai-security-engineer",
        icon: "lock",
        title: "AI security engineer",
        subtitle: "STARTS Secures conventional applications",
        meta: "4 STEPS · 56–80 HRS TOTAL",

        items: [
          {
            title: "AI Security Foundations",
            description:
              "Security teams understand the new attack surfaces introduced by models, agents and AI applications.",
          },
          {
            title: "Prompt Injection & Abuse",
            description:
              "Adversarial prompts and unsafe model behavior are tested before they become production incidents.",
          },
          {
            title: "Model & Data Security",
            tag: "PROPOSED",
            description:
              "Sensitive data, model access and AI workflows are protected across the application stack.",
          },
          {
            title: "AI Security Operations",
            description:
              "AI security controls become part of deployment, monitoring and incident response workflows.",
          },
        ],

        outcome: "Secures AI systems in production",

        footer:
          "AI attack surfaces are identified, monitored and controlled as part of the normal security operating model.",
        button: "VIEW ALL AI TRAINING PROGRAMS →",
      },

      {
        id: "ai-platform-engineer",
        icon: "server",
        title: "AI platform engineer",
        subtitle: "STARTS Builds shared infrastructure",
        meta: "4 STEPS · 72–96 HRS TOTAL",

        items: [
          {
            title: "AI Platform Foundations",
            description:
              "Engineering teams establish the infrastructure patterns required to build and operate AI systems.",
          },
          {
            title: "Model Serving",
            description:
              "Models can be deployed consistently without creating bespoke infrastructure for every workload.",
          },
          {
            title: "AI Observability",
            tag: "PROPOSED",
            description:
              "Platform teams gain visibility into reliability, latency, usage and cost across AI workloads.",
          },
          {
            title: "Production AI Platforms",
            description:
              "Teams operate a repeatable platform that allows AI workloads to scale without multiplying complexity.",
          },
        ],

        outcome: "Runs the AI platform layer",

        footer:
          "AI teams ship faster because infrastructure, deployment and observability are standardized across workloads.",
        button: "VIEW ALL AI TRAINING PROGRAMS →",
      },
    ],

    note: "Sequences are indicative, not fixed. Discovery establishes where a team already is, and a path usually starts partway along rather than at step one.",
  },
  outcomeData: {
    heading: {
      before: "Capabilities your organization",
      emphasis: "will gain.",
      after: "",
    },

    description:
      "Domain-level outcomes, not course objectives. These are the capabilities L&D and engineering leaders are usually asked to evidence.",

    items: [
      {
        id: "safe-everyday-ai-use",
        number: "C01",
        title: "Safe everyday AI use",
        description:
          "Staff who know what to put into a model, what not to, and when a human has to decide.",
      },

      {
        id: "build-and-ship-models",
        number: "C02",
        title: "Build and ship models",
        description:
          "End-to-end delivery from problem framing and features through training, packaging, and release.",
      },

      {
        id: "evaluate-before-deploying",
        number: "C03",
        title: "Evaluate before deploying",
        description:
          "Offline and online evaluation, benchmark design, red teaming, and honest reporting of limits.",
      },

      {
        id: "operate-models-production",
        number: "C04",
        title: "Operate models in production",
        description:
          "Drift detection, performance tracking, alerting, incident response, and retraining pipelines.",
      },

      {
        id: "engineer-ai-products",
        number: "C05",
        title: "Engineer AI into products",
        description:
          "Retrieval, agents, tool use, latency and cost control, and graceful degradation in real applications.",
      },

      {
        id: "govern-ai-risk",
        number: "C06",
        title: "Govern AI risk",
        description:
          "Model inventory, risk classification, documented controls, and audit-ready evidence.",
      },

      {
        id: "meet-regulatory-obligations",
        number: "C07",
        title: "Meet regulatory obligations",
        description:
          "ISO/IEC 42001 alignment, EU AI Act readiness, sector rules, and privacy-by-design for AI systems.",
      },

      {
        id: "scale-the-practice",
        number: "C08",
        title: "Scale the practice",
        description:
          "Platform standards, reusable components, cost management, and an internal capability ladder.",
      },
    ],
  },
  DeliveryModesdata: {
    tabs: [
      {
        id: "virtual",
        label: "Online / Virtual",
        title:
          "Expert-led live sessions delivered anywhere, with consistency and easy scheduling.",
        points: [
          "Delivered anywhere worldwide",
          "Standardized content for consistent outcomes",
          "Join from your own workspace, no travel",
          "Scales to large groups across sites",
          "Interactive tools keep remote learners engaged",
        ],
        sublabel: "",
        description: "",
      },
      {
        id: "onsite",
        label: "In-house / On-site",
        title:
          "A trainer comes to your office and works with your team in the room, using your tools and your examples.",
        points: [
          "Delivered at your own premises",
          "Tailored to your stack, data and use cases",
          "Hands-on, high-interaction sessions",
          "Team builds shared context together",
          "Schedule set around your operations",
        ],
        sublabel: "",
        description: "",
      },
      {
        id: "offsite",
        label: "Away day / Off-site",
        title:
          "An immersive session at an external venue, away from day-to-day distractions, for focused learning and team momentum.",
        points: [
          "Dedicated venue away from the office",
          "Full focus with no daily interruptions",
          "Blends training with team building",
          "Ideal for kickoffs and intensive upskilling",
          "Logistics and location arranged with you",
        ],
        sublabel: "",
        description: "",
      },
    ],
    heading: "AI training delivery formats.",
    description:
      "On-site, live virtual, or blended, in 10+ languages, through a vetted global trainer network. Cohort size, schedule and locations are set with you and confirmed in the proposal.",
  },
  trainers: {
    heading:
      "Practitioners who run AI in production, <span>not generalists </span>working from slides.",

    description:
      "Every trainer passes a technical domain assessment, a live delivery evaluation by a senior practitioner, and reference checks from past corporate cohorts. Nobody reaches a cohort on a CV alone.",
    people: [
      {
        name: "Daniel Roth",
        image: "/course/hero-photo.jpg",
        role: "Principal MLOps engineer",
        years: "12+ years in production ML",
        rating: "4.9",
        sessions: "180+",
        specializations: [
          "Drift detection",
          "Observability stack",
          "Dashboards",
        ],
      },
      {
        name: "Marco Bianchi",
        image: "/course/image2.png",
        role: "Staff ML engineer, platform",
        years: "10+ years in production ML",
        rating: "4.8",
        sessions: "140+",
        specializations: [
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
        specializations: ["Fairness monitoring", "Explainability", "EU AI Act"],
      },
      {
        name: "Priya Raghavan",
        image: "/course/image4.png",
        role: "SRE lead, ML systems",
        years: "11+ years in reliability",
        rating: "4.8",
        sessions: "160+",
        specializations: ["Alerting design", "Incident response", "Tracing"],
      },
    ],
    note: "Trainers are matched to your stack and delivery window at scheduling. We confirm your assigned trainer, with a full profile, before the program is booked, and you can sit in on a trial session first.",
  },
  ResultsData: {
    heading: {
      before: "AI training results from",
      emphasis: "real teams.",
      after: "",
    },

    description:
      "Three engagements across the portfolio: a literacy rollout, an engineering deep-dive, and a governance build.",

    items: [
      {
        id: "literacy-rollout",
        stat: "2,400",
        description:
          "Every employee went through AI awareness before we opened up the tools. Support tickets about “can I put this in the chatbot” basically stopped.",
        person: "HEAD OF L&D",
        meta: "GLOBAL INSURER · LITERACY ROLLOUT, 11 WEEKS",
      },

      {
        id: "engineering-track",
        stat: "6 → 1",
        description:
          "Deployment used to take six weeks of hand-offs. After the MLOps and monitoring programs the team rebuilt the pipeline themselves and it takes one.",
        person: "DIRECTOR OF DATA SCIENCE",
        meta: "PAYMENTS PLATFORM · ENGINEERING TRACK, 150 HRS",
      },

      {
        id: "governance-track",
        stat: "42",
        description:
          "We came in with a spreadsheet of models nobody trusted. We left with a real inventory, risk tiers, and a control set our auditors accepted.",
        person: "CHIEF RISK OFFICER",
        meta: "RETAIL BANK · GOVERNANCE TRACK, 72 HRS",
      },
    ],
  },
  map_section: {
    heading: "Why enterprises choose <span>Edstellar </span>for AI.",

    description:
      "Edstellar is a corporate training provider delivering instructor-led AI programs to teams of every size, from a single squad to an entire engineering organisation, on-site, virtual, or blended, with programs built and led by practitioners.",
    image: {
      src: "/course/map1.png",
      alt: "Global delivery map",
    },

    stats: [
      {
        value: "300+",
        label: "Vetted AI trainers",
      },
      {
        value: "1,000+",
        label: "Organisations trained",
      },
      {
        value: "13+",
        label: "Years delivering",
      },
      {
        value: "ISO 9001",
        connector: "&",
        secondary_value: "27001",
        label: "Certified",
      },
    ],

    features: [],

    related_label: "",

    related_services: [],
  },
  deliveredData: {
    heading: "How an AI training program <span>is delivered.</span>",

    description:
      "Every engagement runs the same five stages, from capability baseline through to the refresh cycle.",

    stages: [
      {
        id: "discover",
        number: "01",
        title: "Discover",
        description:
          "We meet your CTO and L&D team to baseline what your data, engineering and product people can actually do today, against the roles you need them to fill.",
        meta: "Week 1–2",
      },
      {
        id: "design",
        number: "02",
        title: "Design",
        description:
          "Programs are assembled against your model stack, your data, and the governance regime you operate under, then trainers are shortlisted from the vetted bench.",
        meta: "Week 2–4",
      },
      {
        id: "deliver",
        number: "03",
        title: "Deliver",
        description:
          "Closed-cohort instructor-led sessions in your language and timezone, with GPU sandboxes, notebooks and retrieval or agent environments shipped alongside.",
        meta: "Scheduled to your calendar",
      },
      {
        id: "assess",
        number: "04",
        title: "Assess",
        description:
          "Pre and post technical assessments establish a measurable change in capability, benchmarked against role frameworks.",
        meta: "Immediately after delivery",
      },
      {
        id: "sustain",
        number: "05",
        title: "Sustain",
        description:
          "Retrospectives, refresher modules and skill-refresh tracking keep the investment from decaying, and the measured gaps feed the next cycle.",
        meta: "Quarterly",
      },
    ],

    note: "Stage 05 feeds the next cycle: the gaps it measures become the next Discover.",
  },
  fromedstellarData: {
    label: "Also from Edstellar",

    items: [
      {
        id: "talent-assessments",
        title: "Talent assessments",
        description:
          "Psychometric, behavioral, leadership and 360-degree assessment.",
        href: "#",
      },
      {
        id: "training-needs-analysis",
        title: "Training needs analysis",
        description:
          "Needs analysis, gap identification, and a training roadmap.",
        href: "#",
      },
      {
        id: "ld-consulting",
        title: "L&D consulting",
        description:
          "Learning strategy, content, technology and ROI measurement.",
        href: "#",
      },
      {
        id: "od-consulting",
        title: "OD consulting",
        description: "Org design, succession planning and cultural change.",
        href: "#",
      },
      {
        id: "managed-training-services",
        title: "Managed training services",
        description:
          "Training outsourcing, vendor management, logistics and administration.",
        href: "#",
      },
      {
        id: "coaching-solutions",
        title: "Coaching solutions",
        description: "Executive and manager coaching that keeps skills in use.",
        href: "#",
      },
    ],
  },
  relatedCategoriesData: {
    heading: "Explore related <span>training domains.</span>",

    description:
      "AI capability rarely sits alone. These categories are the ones enterprises most often build alongside it.",

    items: [
      {
        title: "Machine Learning Training",
        description:
          "Model development from data preparation through validation and deployment.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "Deep Learning Training",
        description:
          "Neural network architectures, from convolutional and recurrent models to transformers.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "Natural Language Processing Training",
        description:
          "Language models, text pipelines and conversational systems for enterprise use.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "Computer Vision Training",
        description:
          "Image processing, detection and inspection systems for industrial and product use.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "ChatGPT Training",
        description:
          "Prompting, assistants and safe day-to-day use of general-purpose AI tools.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "Cybersecurity Training",
        description:
          "Security programs for teams defending the systems AI now runs inside.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "IT & Technical Training",
        description: "The wider engineering catalogue this domain sits within.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
    ],
  },
  faqs: {
    heading: "Questions enterprises ask <span>before booking.</span>",

    items: [
      {
        question: "Which roles and teams is this AI training built for?",
        answer:
          "Enterprise data, engineering and product teams: ML engineers, data scientists, MLOps engineers, data analysts, AI product managers and developers adopting AI, plus governance and risk owners. A separate enablement track covers finance, marketing, HR and operations staff who use AI tools without building them.",
      },

      {
        question: "How is the training delivered?",
        answer:
          "Instructor-led and live, as a closed cohort for your team, on-site or virtually. There are no self-paced or recorded modules. You choose the format, location, language and schedule.",
      },

      {
        question: "What is the difference between ILT and VILT?",
        answer:
          "ILT is instructor-led training delivered in person, with a trainer at your premises. VILT is the live online equivalent, run in real time rather than recorded. Both include hands-on labs and live interaction with the trainer. The choice is driven by location and logistics, not by depth of content.",
      },

      {
        question: "Can programs be customised to our stack?",
        answer:
          "Yes. Each program is designed around your model stack, your data, your team's current level and your governance obligations. Engagements begin with a discovery call to map roles and gaps before a trainer is shortlisted.",
      },

      {
        question: "How many people can attend one cohort?",
        answer:
          "Cohorts are sized to keep instructor-led sessions workable, typically from 5 trainees for a specialist team upwards. Large organisations run parallel cohorts across multiple locations rather than one oversized session.",
      },

      {
        question: "How do you vet AI trainers?",
        answer:
          "Every trainer passes a technical domain assessment, a live delivery evaluation by a senior reviewer, and reference checks from past corporate cohorts. Trainers are matched by domain expertise, stack alignment and geography, and you can request a trial session before committing.",
      },
      {
        question: "How is effectiveness measured?",
        answer:
          "Every cohort runs pre and post technical assessments to establish a measurable skills delta, benchmarked against role frameworks and shared in a post-program report. Where applicable, outcomes map to model accuracy, time to deployment and adoption rates.",
      },
      {
        question: "Which governance frameworks do you cover?",
        answer:
          "Programs are built against the EU AI Act, the NIST AI Risk Management Framework and ISO/IEC 42001, with sector overlays where relevant. These are framework-aligned skills programs; Edstellar is not a certification body and does not issue framework certifications.",
      },
      {
        question: "How do we choose an AI training provider?",
        answer:
          "Useful criteria are whether programs are designed around your stack rather than pulled from a catalogue, whether delivery is live and instructor-led, whether trainers are practitioners you can trial before committing, and whether outcomes are measured rather than assumed. Ask to see what the post-program report actually contains.",
      },
      {
        question: "Why group training rather than individual licences?",
        answer:
          "Group training aligns a whole team on the same patterns, tooling and governance rules. Individual licences produce uneven baselines and ungoverned adoption. A shared baseline is also what an auditor can be shown.",
      },
    ],
  },
  scopeData: {
  heading: "Start an RFP shaped to <span>your needs.</span>",
    description:
      "Tell us roughly how many people need training and we'll show you the package this usually maps to. Nothing is fixed until we've scoped it with you.",
    tabLabel: "HOW MANY TEAM MEMBERS NEED AI TRAINING?",

    tabs: [
      {
        id: "1-25",
        label: "1–25",
        participants: "1–25 PARTICIPANTS",
        title: "Single cohort",
        description:
          "One or two programs for a single team, delivered as a closed cohort. The usual entry point for a first AI engagement.",
        items: [
          "One cohort of up to 25 participants",
          "Curriculum customized to your stack",
          "Onsite, virtual, or offsite delivery",
          "Certificates and completion report",
        ],
        actions: [
          {
            label: "Request this quote",
            href: "#apply",
          },
          {
            label: "Adjust programs",
            href: "#apply",
          },
        ],
      },

      {
        id: "26-150",
        label: "26–150",
        participants: "26–150 PARTICIPANTS",
        title: "Scaled cohort",
        description:
          "Multiple cohorts or programs for larger teams, with delivery structured around your workforce and training requirements.",
        items: [
          "Multiple cohorts across teams",
          "Curriculum customized to your stack",
          "Onsite, virtual, or offsite delivery",
          "Certificates and completion reporting",
        ],
        actions: [
          {
            label: "Request this quote",
            href: "#apply",
          },
          {
            label: "Adjust programs",
            href: "#apply",
          },
        ],
      },

      {
        id: "151-1000",
        label: "151–1,000",
        participants: "151–1,000 PARTICIPANTS",
        title: "Enterprise rollout",
        description:
          "A broader training rollout designed for multiple teams, functions, and locations with a coordinated delivery approach.",
        items: [
          "Enterprise-wide cohort planning",
          "Role-specific curriculum options",
          "Flexible delivery across locations",
          "Completion and impact reporting",
        ],
        actions: [
          {
            label: "Request this quote",
            href: "#apply",
          },
          {
            label: "Adjust programs",
            href: "#apply",
          },
        ],
      },

      {
        id: "1000-plus",
        label: "1,000+",
        participants: "1,000+ PARTICIPANTS",
        title: "Organization-wide",
        description:
          "A large-scale AI capability program designed around your organization, operating model, teams, and rollout priorities.",
        items: [
          "Organization-wide rollout planning",
          "Customized learning architecture",
          "Flexible global delivery",
          "Measurement and completion reporting",
        ],
        actions: [
          {
            label: "Request this quote",
            href: "#apply",
          },
          {
            label: "Adjust programs",
            href: "#apply",
          },
        ],
      },
    ],
  },
  lead_form: {
    heading: "Ask us about <span>AI training</span> for your teams.",
    description:
      "Tell us which teams you are training and what they need to be able to do. Anything you filtered in the catalog comes through with your message.",
    sla_note:
      "We reply within one business day with a tailored proposal, no automated sales sequence.",
    pricing_href: "https://www.edstellar.com/corporate-training-pricing#table",
  },
};

export default artificialIntelligence;
