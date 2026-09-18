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
  "Instructor-led workshops and programs",
  "In-house, virtual or blended",
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
    is_dynamic: false,
    config: {
      og_image: null,
      og_title: "Artificial Intelligence Corporate Training | Edstellar",
      meta_title: "Artificial Intelligence Corporate Training | Edstellar",
      og_image_url: null,
      twitter_card: "summary_large_image",
      twitter_site: "@edstellar",
      canonical_url:
        "https://www.edstellar.com/corporate-training/artificial-intelligence/",
      meta_keywords: null,
      twitter_title: "Artificial Intelligence Corporate Training | Edstellar",
      og_description:
        "Explore Edstellar's Artificial Intelligence training programs covering generative AI, machine learning, deep learning, NLP, and computer vision. Instructor-led courses delivered onsite or virtually in 100+ countries.",
      twitter_creator: null,
      Meta_description:
        "Explore Edstellar's Artificial Intelligence training programs covering generative AI, machine learning, deep learning, NLP, and computer vision. Instructor-led courses delivered onsite or virtually in 100+ countries.",
      twitter_image_url: null,
      twitter_description:
        "Explore Edstellar's Artificial Intelligence training programs covering generative AI, machine learning, deep learning, NLP, and computer vision. Instructor-led courses delivered onsite or virtually in 100+ countries.",
    },
  },
  hero: {
    heading: "Corporate <span>Artificial Intelligence</span> Training",

    subhead: "Build the employees who will run your AI, not just the models.",

    intro_text:
      "We build AI capability inside enterprises: the people, the standards and the governance that let an organization run AI itself. Instructor-led programs across generative AI, machine learning, MLOps and governance are how we do it, scoped to your stack and delivered wherever your teams are.",

    meta: DELIVERY_META,
    media: {
      image: null,
      video: "/category/Home-Animation.mp4",
      alt: "An enterprise team reviewing AI systems on a shared display",
    },
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
        value: "1,000+",
        label: "Organizations trained",
      },
      {
        value: "13+",
        label: "Years delivering",
      },
      {
        value: "ISO 9001 & 27001",
        label: "Certified",
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
      { id: "about", label: "About", active: true },
      { id: "by-topic", label: "By topic", active: false },
      { id: "by-role", label: "By role", active: false },
      { id: "paths", label: "Paths", active: false },
      { id: "delivery", label: "Delivery", active: false },
      { id: "trainers", label: "Trainers", active: false },
      { id: "why-edstellar", label: "Why Edstellar", active: false },
      { id: "faqs", label: "FAQ", active: false },
    ],
  },
  about: {
    heading: "What is corporate <span>AI training</span>?",

    body: [
      "Corporate AI training is instructor-led group training that builds an organization's ability to design, deploy, and govern artificial intelligence systems. It spans two tracks: technical depth for the data, engineering, and MLOps teams who build and run models, and broad enablement for the functions who now use AI tools in daily work. Programs are scoped to an employer's stack and delivered to a closed cohort rather than sold as individual seats.",
    ],
    expanded_body: [
      "The distinction that matters commercially is between capability and access. Individual licenses give people tools; group training gives a team a shared baseline: the same patterns, the same evaluation habits, and the same rules for handling data. For enterprises deploying AI under regulatory obligation, that shared baseline is what an auditor can be shown.",
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
      discipline: "DISCIPLINE",
    },

    heading: "Instructor-led <span>AI programs</span> by topic.",

    description:
      "Pick a topic to see the instructor-led programs in that area of the live catalog.",

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
          href: "#apply",
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
    heading: "Find AI training <span>by role.</span>",

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
            href: "/corporate-training/artificial-intelligence/ai-for-managers-training",
          },
          {
            label: "AI Governance",
            href: "/corporate-training/artificial-intelligence/artificial-intelligence-ai-governance-training",
          },
          {
            label: "Responsible Generative AI",
            href: "/corporate-training/artificial-intelligence/responsible-generative-ai-training",
          },
        ],
      },

      {
        id: "business-operations",
        number: "R02",
        title: "Business & operations",

        description:
          "Non-technical staff using AI tools daily. The focus is safe, effective use and knowing where the limits are.",

        programs: [
          {
            label: "ChatGPT Prompt Engineering",
            href: "/corporate-training/artificial-intelligence/chatgpt-prompt-engineering-training",
          },
          {
            label: "AI for HR",
            href: "/corporate-training/artificial-intelligence/artificial-intelligence-for-human-resource-training",
          },
          {
            label: "AI for Accountants",
            href: "/corporate-training/artificial-intelligence/ai-for-accountants-training",
          },
        ],
      },

      {
        id: "analysts-data-teams",
        number: "R03",
        title: "Analysts & data teams",

        description:
          "Moving from reporting to modelling: the Python, statistics and feature work that precedes any model.",

        programs: [
          {
            label: "Introduction to Machine Learning",
            href: "/corporate-training/artificial-intelligence/introduction-to-machine-learning-training",
          },
          {
            label: "Machine Learning with Python",
            href: "/corporate-training/artificial-intelligence/machine-learning-with-python-training",
          },
          {
            label: "Text Classification with ML",
            href: "/corporate-training/artificial-intelligence/text-classification-with-machine-learning-training",
          },
        ],
      },

      {
        id: "data-scientists-ml-engineers",
        number: "R04",
        title: "Data scientists & ML engineers",

        description:
          "Build, fine-tune and evaluate models properly, including the evaluation work most teams skip.",

        programs: [
          {
            label: "Machine Learning with TensorFlow",
            href: "/corporate-training/artificial-intelligence/machine-learning-with-tensorflow-training",
          },
          {
            label: "ML Model Monitoring",
            href: "/corporate-training/artificial-intelligence/ml-model-monitoring-training",
          },
          {
            label: "MLOps for LLMs",
            href: "/corporate-training/artificial-intelligence/mlops-for-llms-training",
          },
        ],
      },

      {
        id: "software-engineers",
        number: "R05",
        title: "Software engineers",

        description:
          "Ship AI features into real products: APIs, retrieval, agents, and the failure modes that come with them.",

        programs: [
          {
            label: "Building Applications with LangChain",
            href: "/corporate-training/artificial-intelligence/building-applications-with-langchain-training",
          },
          {
            label: "Retrieval-Augmented Generation (RAG) Systems",
            href: "/corporate-training/artificial-intelligence/retrieval-augmented-generation-rag-training",
          },
          {
            label: "Agentic AI Systems",
            href: "/corporate-training/artificial-intelligence/agentic-ai-training",
          },
        ],
      },

      {
        id: "mlops-platform-engineers",
        number: "R06",
        title: "MLOps & platform engineers",

        description:
          "Run models in production: deployment, monitoring, retraining, cost, and the infrastructure underneath.",

        programs: [
          {
            label: "MLOps Foundations",
            href: "/corporate-training/artificial-intelligence/mlops-foundations-training",
          },
          {
            label: "ML Model Monitoring",
            href: "/corporate-training/artificial-intelligence/ml-model-monitoring-training",
          },
          {
            label: "Kubernetes for Machine Learning",
            href: "/corporate-training/artificial-intelligence/kubernetes-for-machine-learning-training",
          },
        ],
      },

      {
        id: "risk-legal-compliance",
        number: "R07",
        title: "Risk, legal & compliance",

        description:
          "Govern AI without having to build it: inventories, risk classification, controls, audit, and regulation.",

        programs: [
          {
            label: "AI Security and Risk Management",
            href: "/corporate-training/artificial-intelligence/ai-security-and-risk-management-training",
          },
          {
            label: "EU AI Act Readiness",
            href: "/corporate-training/artificial-intelligence/eu-ai-act-readiness-training",
          },
          {
            label: "AI Audit and Assurance",
            href: "/corporate-training/artificial-intelligence/ai-audit-and-assurance-training",
          },
        ],
      },

      {
        id: "hr-ld",
        number: "R08",
        title: "HR & L&D",

        description:
          "Assess AI skills across the organization, sequence the rollout, and use AI responsibly inside HR itself.",

        programs: [
          {
            label: "AI for HR and Talent",
            href: "/corporate-training/artificial-intelligence/artificial-intelligence-for-human-resource-training",
          },
          {
            label: "AI Awareness for Employees",
            href: "/corporate-training/artificial-intelligence/chatgpt-prompt-engineering-training",
          },
          {
            label: "Training needs analysis",
            href: "/corporate-training/artificial-intelligence/training-needs-analysis-training",
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
        cta_text: "Request a tailored quote",
        cta_href: "/corporate-training",
      },
    ],
  },
  pathsData: {
    mark: {
      label: "SEVEN ROLE PATHS",
    },

    heading: "Role-based learning Paths <span>for AI teams</span>.",
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
            href: "/corporate-training/artificial-intelligence/introduction-to-machine-learning-training",
            description:
              "The team can tell which problems are modeling problems and which are not.",
          },
          {
            title: "Machine Learning with Python",
            href: "/corporate-training/artificial-intelligence/machine-learning-with-python-training",
            description:
              "Pipelines are written in-house instead of specified out to a vendor.",
          },
          {
            title: "ML Model Monitoring",
            href: "/corporate-training/artificial-intelligence/ml-model-monitoring-training",
            description:
              "Drift is caught by the team, not reported by the customer.",
          },
          {
            title: "MLOps Foundations",
            tag: "PROPOSED",
            description: "A bad release can be rolled back the day it ships.",
          },
        ],

        outcome: "Owns models in production",

        footer:
          "Models reach production and stay there, without a vendor on retainer for every change.",
        button: "VIEW ALL AI TRAINING PROGRAMS",
        href: "#by-topic",
      },

      {
        id: "genai-engineer",
        icon: "sparkles",
        title: "GenAI engineer",
        subtitle: "STARTS Prototypes against an API key",
        meta: "4 STEPS · 72–120 HRS TOTAL",

        items: [
          {
            title: "Generative AI (GenAI)",
            href: "/corporate-training/artificial-intelligence/generative-ai-training",
            description:
              "Model choice becomes a decision with reasons behind it, not a default.",
          },
          {
            title: "Retrieval Augmented Generation (RAG)",
            href: "/corporate-training/artificial-intelligence/retrieval-augmented-generation-rag-training",
            description:
              "Answers are grounded in your own knowledge base instead of invented.",
          },
          {
            title: "AI Evaluation and Red-Teaming",
            tag: "PROPOSED",
            description:
              "Jailbreaks and prompt injection surface in testing, not in production.",
          },
          {
            title: "Agentic AI",
            href: "/corporate-training/artificial-intelligence/agentic-ai-training",
            description:
              "An agent gets tool access with a boundary, and a handover when it reaches one.",
          },
        ],

        outcome: "Ships grounded LLM systems",

        footer:
          "LLM features go live with a known failure mode rather than a demo and a hope.",
        button: "VIEW ALL AI TRAINING PROGRAMS",
        href: "#by-topic",
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
              "Deployment stops being one person's undocumented routine.",
          },
          {
            title: "ML Model Monitoring",
            href: "/corporate-training/artificial-intelligence/ml-model-monitoring-training",
            description:
              "Performance decay shows up on a dashboard rather than in a complaint.",
          },
          {
            title: "LLM Observability",
            href: "/corporate-training/artificial-intelligence/llm-observability-training",
            description:
              "An LLM regression can be traced back to the change that caused it.",
          },
          {
            title: "MLOps for LLMs",
            href: "/corporate-training/artificial-intelligence/mlops-for-llms-training",
            description:
              "Cost, rollout and incident response are governed like any other service.",
          },
        ],

        outcome: "Runs the deployment layer",

        footer:
          "Releases, rollbacks and incidents follow a procedure the whole team can run.",
        button: "VIEW ALL AI TRAINING PROGRAMS",
        href: "#by-topic",
      },

      {
        id: "data-scientist",
        icon: "chart",
        title: "Data scientist",
        subtitle: "STARTS Answers analysis requests",
        meta: "4 STEPS · 56–72 HRS TOTAL",

        items: [
          {
            title: "Introduction to Machine Learning",
            href: "/corporate-training/artificial-intelligence/introduction-to-machine-learning-training",
            description:
              "Method choice is justified before the modeling starts.",
          },
          {
            title: "Machine Learning with Python",
            href: "/corporate-training/artificial-intelligence/machine-learning-with-python-training",
            description:
              "Work moves out of a spreadsheet and into a reproducible pipeline.",
          },
          {
            title: "Text Classification with Machine Learning",
            href: "/corporate-training/artificial-intelligence/text-classification-with-machine-learning-training",
            description:
              "Routing, tagging and document triage stop consuming analyst hours.",
          },
          {
            title: "AI Decision Support Systems",
            href: "/corporate-training/artificial-intelligence/ai-decision-support-systems-training",
            description:
              "Output reaches the decision-maker with its uncertainty attached.",
          },
        ],

        outcome: "Turns analysis into decisions",

        footer:
          "Findings arrive as something a decision-maker can act on, with the uncertainty stated.",
        button: "VIEW ALL AI TRAINING PROGRAMS",
        href: "#by-topic",
      },

      {
        id: "ai-governance-lead",
        icon: "shield",
        title: "AI governance lead",
        subtitle: "STARTS Reconstructs evidence at audit",
        meta: "4 STEPS · 48–84 HRS TOTAL",

        items: [
          {
            title: "Artificial Intelligence (AI) Governance",
            href: "/corporate-training/artificial-intelligence/artificial-intelligence-ai-governance-training",
            description:
              "Every model gets a risk classification first time, not in hindsight.",
          },
          {
            title: "Responsible Generative AI",
            href: "/corporate-training/artificial-intelligence/responsible-generative-ai-training",
            description:
              "Guardrails and bias checks are built into the release, not bolted on after.",
          },
          {
            title: "EU AI Act Implementation",
            tag: "PROPOSED",
            description:
              "Obligations are mapped article by article, with an owner against each.",
          },
          {
            title: "AI Security and Risk Management",
            href: "/corporate-training/artificial-intelligence/ai-security-and-risk-management-training",
            description:
              "A deployed system has a threat model and controls standing behind it.",
          },
        ],

        outcome: "Signs off releases with evidence",

        footer:
          "Risk tier, documentation and evidence exist before the auditor asks, not after.",
        button: "VIEW ALL AI TRAINING PROGRAMS",
        href: "#by-topic",
      },

      {
        id: "ai-product-manager",
        icon: "briefcase",
        title: "AI product manager",
        subtitle: "STARTS Scopes AI from vendor decks",
        meta: "3 STEPS · 32–48 HRS TOTAL",

        items: [
          {
            title: "AI for Managers",
            href: "/corporate-training/artificial-intelligence/ai-for-managers-training",
            description:
              "Build or buy is argued from evidence rather than from a demo.",
          },
          {
            title: "AI Decision Support Systems",
            href: "/corporate-training/artificial-intelligence/ai-decision-support-systems-training",
            description:
              "A feature is specified by the decision it supports, not the model it uses.",
          },
          {
            title: "Artificial Intelligence (AI) Governance",
            href: "/corporate-training/artificial-intelligence/artificial-intelligence-ai-governance-training",
            description:
              "Sequencing accounts for the approval a release will need to clear.",
          },
        ],

        outcome: "Scopes AI that ships",

        footer: "Feasibility is settled before a roadmap commits to it.",
        button: "VIEW ALL AI TRAINING PROGRAMS",
        href: "#by-topic",
      },

      {
        id: "every-function",
        icon: "users",
        title: "Every function",
        subtitle: "STARTS Pastes company data into personal accounts",
        meta: "4 STEPS · 16–24 HRS TOTAL",

        items: [
          {
            title: "ChatGPT Prompt Engineering",
            href: "/corporate-training/artificial-intelligence/chatgpt-prompt-engineering-training",
            description:
              "Output quality stops depending on who happened to write the prompt.",
          },
          {
            title: "AI for Managers",
            href: "/corporate-training/artificial-intelligence/ai-for-managers-training",
            description:
              "Managers can separate a real use case from an expensive one.",
          },
          {
            title: "AI for HR",
            href: "/corporate-training/artificial-intelligence/artificial-intelligence-for-human-resource-training",
            description:
              "Screening support is used without importing bias into hiring.",
          },
          {
            title: "AI for Accountants",
            href: "/corporate-training/artificial-intelligence/ai-for-accountants-training",
            description:
              "Reconciliation and anomaly work speed up without losing the audit trail.",
          },
        ],

        outcome: "Uses AI inside guardrails",

        footer:
          "Daily AI use runs on sanctioned tools, under rules the team can actually recite.",
        button: "VIEW ALL AI TRAINING PROGRAMS",
        href: "#by-topic",
      },
    ],

    note: "Sequences are indicative, not fixed. Discovery establishes where a team already is, and a path usually starts partway along rather than at step one.",
  },
  outcomeData: {
    heading: "Capabilities your organization <span>will gain.</span>",

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
      },
      {
        id: "onsite",
        label: "On-site",
        sublabel: "In-house",
        title: "In-house / on-site",
        description:
          "A trainer comes to your office and works with your team in the room, using your tools and your examples.",
        points: [
          "Delivered at your own premises",
          "Tailored to your stack, data and use cases",
          "Hands-on, high-interaction sessions",
          "Team builds shared context together",
          "Schedule set around your operations",
        ],
      },
      {
        id: "offsite",
        label: "Off-site",
        sublabel: "Away day",
        title: "Away day / off-site",
        description:
          "An immersive session at an external venue, away from day-to-day distractions, for focused learning and team momentum.",
        points: [
          "Dedicated venue away from the office",
          "Full focus with no daily interruptions",
          "Blends training with team building",
          "Ideal for kickoffs and intensive upskilling",
          "Logistics and location arranged with you",
        ],
      },
    ],
    heading: "You pick the <span>format</span>.",
    description:
      "On-site, live virtual, or blended, in 10+ languages, through a vetted global trainer network. Cohort size, schedule and locations are set with you and confirmed in the proposal.",
  },
  trainers: {
    heading: "Meet Your <span>Instructors</span>.",
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
  map_section: {
    heading:
      "Why enterprises choose <span>Edstellar </span>as their AI training provider.",

    description:
      "Edstellar is a corporate training provider delivering instructor-led AI programs to teams of every size, from a single squad to an entire engineering organization, on-site, virtual, or blended, with programs built and led by practitioners. As your AI training provider, we own that end to end: sourcing the trainer, tailoring the program, and standing behind the result.",
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
    heading: "How an AI capability program <span>actually runs</span>.",

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
        description: "The wider engineering catalog this domain sits within.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
    ],
  },
  faqs: {
    heading: "Frequently Asked <span>Questions</span>",

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
        question: "Can programs be customized to our stack?",
        answer:
          "Yes. Each program is designed around your model stack, your data, your team's current level and your governance obligations. Engagements begin with a discovery call to map roles and gaps before a trainer is shortlisted.",
      },

      {
        question: "How many people can attend one cohort?",
        answer:
          "Cohorts are sized to keep instructor-led sessions workable, typically from 5 trainees for a specialist team upwards. Large organizations run parallel cohorts across multiple locations rather than one oversized session.",
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
          "Useful criteria are whether programs are designed around your stack rather than pulled from a catalog, whether delivery is live and instructor-led, whether trainers are practitioners you can trial before committing, and whether outcomes are measured rather than assumed. Ask to see what the post-program report actually contains.",
      },
      {
        question: "Why group training rather than individual licenses?",
        answer:
          "Group training aligns a whole team on the same patterns, tooling and governance rules. Individual licenses produce uneven baselines and ungoverned adoption. A shared baseline is also what an auditor can be shown.",
      },
      {
        question: "Can this AI training be delivered in-house at our offices?",
        answer:
          "Yes. Programs run on-site at your premises, virtually, or blended. In-house delivery keeps a team together, uses your own tools and examples, and is the most common format for groups. Share your location and dates and we confirm trainer availability.",
      },
      {
        question: "Do you train end users when we roll out a new AI system?",
        answer:
          "Yes. End-user training is timed to your go-live, so the people who will use the system are ready on day one. We map who touches the system, agree a training plan against your rollout dates, and follow up after launch to hold adoption.",
      },
      {
        question: "Which languages and countries do you deliver in?",
        answer:
          "We deliver in more than 100 countries and in multiple languages, matching the trainer and materials to each team's location. Sessions are scheduled to your regions and time zones rather than a single head-office time.",
      },
      {
        question: "Is there a minimum group size for a corporate AI program?",
        answer:
          "Programs are built for teams rather than individuals. Cohorts typically start from a small team, and we tailor pacing and price to the group size. Tell us how many people you are training and we recommend the right format.",
      },
    ],
  },
  scopeData: {
    heading:
      "Start a Request for Proposal (RFP) shaped to <span>your needs.</span>",
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
  sticky_footer: {
    messages: [
      {
        highlight: "Instructor-led corporate training",
        suffix: "· One partner, every team",
      },
      {
        highlight: "130 AI programs",
        suffix: ", Across every enterprise AI topic",
      },
      {
        highlight: "6 disciplines",
        suffix: ", Generative AI to governance",
      },
      {
        highlight: "Delivered where your teams are",
        suffix: ", On-site or virtual",
      },
    ],
  },
};

export default artificialIntelligence;
