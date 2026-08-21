import { cache } from "react";

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

const CATEGORIES = {
  "artificial-intelligence": {
    slug: "artificial-intelligence",

    name: "Artificial Intelligence",

    seo: {
      title: "Corporate Artificial Intelligence Training",
      description:
        "Instructor-led corporate AI training across generative AI, machine learning, MLOps and governance. Scoped to your stack, delivered onsite or virtually in 100+ countries.",
      ogImage: null,
    },

    hero: {
      headlineParts: [
        { text: "Corporate " },
        { text: "Artificial Intelligence", em: true },
        { text: " Training" },
      ],

      subhead: "Build the people who will run your AI, not just the models.",

      lede: "We build AI capability inside enterprises: the people, the standards and the governance that let an organization run AI itself. Instructor-led programs across generative AI, machine learning, MLOps and governance are how we do it, scoped to your stack and delivered wherever your teams are.",

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
        label: "IT & Technical",
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
        { id: "outcomes", label: "Outcomes", active: false },
        { id: "transformation", label: "Transformation", active: false },
        { id: "industries", label: "Industries", active: false },
        { id: "programs", label: "Programs", active: false },
        { id: "paths", label: "Paths", active: false },
        { id: "governance", label: "Governance", active: false },
        { id: "trainers", label: "Trainers", active: false },
        { id: "proof", label: "Proof", active: false },
        { id: "method", label: "Method", active: false },
        { id: "faq", label: "FAQ", active: false },
        { id: "related", label: "Related", active: false },
        { id: "ask-a-quation", label: "Ask a Quation", active: false },
      ],
    },
    about: {
      headlineParts: [
        { text: "What is corporate " },
        { text: "AI training", em: true },
        { text: "?" },
      ],

      body: [
        "Corporate AI training is instructor-led group training that builds an organisation's ability to design, deploy, and govern artificial intelligence systems. It spans two tracks: technical depth for the data, engineering, and MLOps teams who build and run models, and broad enablement for the functions who now use AI tools in daily work. Programs are scoped to an employer's stack and delivered to a closed cohort rather than sold as individual seats.",
      ],
      more: [
        "The distinction that matters commercially is between capability and access. Individual licences give people tools; group training gives a team a shared baseline: the same patterns, the same evaluation habits, and the same rules for handling data. For enterprises deploying AI under regulatory obligation, that shared baseline is what an auditor can be shown.",
        "Programs split across two tracks. Technical depth for the data, engineering and MLOps teams who build and run models. Broad enablement for finance, marketing, HR and operations, who now use AI tools daily and are the larger source of ungoverned adoption.",
      ],
      // cta-bannerdata.js
      ctaBannerData: [
        {
          variant: "light",
          eyebrow: "BUILD VERSUS BUY AI TALENT",
          heading:
            "Close the AI skills gap with the engineers you already employ.",
          ctaText: "Upskill Your Teams with AI Training Programs",
          ctaHref: "/corporate-training",
        },
      ],
    },
    whyNow: {
      heading: {
        parts: [
          { text: "Adoption moved. Hiring cannot " },
          { text: "keep up", em: true },
          { text: ". Waiting compounds." },
        ],
      },
      ctaBannerData: [
        {
          variant: "light",
          eyebrow: "BUILD VERSUS BUY AI TALENT",
          heading: "Close the AI skills gap with the engineers you already employ.",
          ctaText: "Upskill Your Teams with AI Training Programs",
          ctaHref: "/corporate-training",
        },
      ],

      description:
        "Three forces are acting on your teams at the same time: what changed in the field, why hiring cannot close the gap, and what standing still costs.",

      accordion: [
        {
          id: "shifts",
          question: {
            parts: [
              { text: "Adoption is nearly universal. " },
              { text: "Production is not.", em: true },
            ],
          },
          lede: "Five things moved in the last eighteen months, and each one changed what a team has to be able to do. The pattern across all five is the same: the technology arrived faster than the capability to run it, and the gap is where budgets are currently being spent without return.",
          note: "Figures are attributed to the analyst or study that published them. Where forecasts differ between sources we have said so rather than picking the most favorable number.",
          shifts: [
            {
              icon: "agents",
              figure: "~40%",
              figureCaption:
                "of enterprise apps embed an agent by end of 2026, from under 5% a year earlier",
              title: "Assistants became agents",
              tag: "the agentic shift",
              quote: {
                parts: [
                  { text: "Software stopped answering and started " },
                  { text: "pursuing a goal", strong: true },
                  { text: "." },
                ],
              },
              description: {
                parts: [
                  {
                    text: "The shift is from software that answers a question to software that pursues a goal: planning steps, calling tools, reading the result and adapting. ",
                  },
                  {
                    text: "MIT Sloan and BCG put agentic adoption at 35% in two years",
                    strong: true,
                  },
                  { text: ", a curve that took earlier AI roughly eight." },
                ],
              },
              source: "Gartner; MIT Sloan and BCG",
              demands: "Agent design, tool access and bounded autonomy",
              program: { label: "Agentic AI Training", status: "proposed" },
            },
            {
              icon: "gap",
              figure: "41%",
              figureCaption: "of agent deployments actually reach production",
              title: "The gap is capability, not technology",
              tag: "the production gap",
              quote: {
                parts: [
                  { text: "Almost everyone has adopted. " },
                  { text: "Fewer than half", strong: true },
                  { text: " have shipped." },
                ],
              },
              description: {
                parts: [
                  { text: "Adoption has crossed roughly " },
                  { text: "80% of US enterprises", strong: true },
                  {
                    text: ", but under half of those deployments reach production. The reasons given are consistent: missing guardrails, weak evaluation harnesses, unclear ownership, and the difficulty of connecting agents safely to real systems.",
                  },
                ],
              },
              source: "2026 industry adoption data",
              demands: "Evaluation, guardrails and clear ownership",
              program: {
                label: "AI Evaluation and Red-Teaming",
                status: "proposed",
              },
            },
            {
              icon: "cost",
              figure: "25x",
              figureCaption:
                "more tokens per task, against a 10x fall in unit price",
              title: "Cheaper models, larger bills",
              tag: "inference economics",
              quote: {
                parts: [
                  { text: "Unit prices fell. " },
                  { text: "Bills went up", strong: true },
                  { text: " anyway." },
                ],
              },
              description: {
                parts: [
                  {
                    text: "A 2024 chatbot exchange consumed around 2,000 tokens. A 2026 agentic workflow that plans, calls tools, retries and self-verifies can consume ",
                  },
                  {
                    text: "50,000 or more for a single transaction",
                    strong: true,
                  },
                  {
                    text: ". Gartner expects inference costs to fall over 90% by 2030 and warns enterprises will not feel it, because agentic workloads burn far more tokens than the generative use cases that came before.",
                  },
                ],
              },
              source: "Gartner",
              demands: "Cost-aware architecture and model routing",
              program: {
                label: "AI Inference Economics and Model Routing",
                status: "gap",
              },
            },
            {
              icon: "small",
              figure: "Smallest",
              figureCaption: "model that provably clears your accuracy bar",
              title: "Small models took the routine work",
              tag: "model routing",
              quote: {
                parts: [
                  { text: "The win is not smaller models. It is " },
                  { text: "knowing which to call", strong: true },
                  { text: "." },
                ],
              },
              description: {
                parts: [
                  {
                    text: "The winning pattern is not small instead of large. It is orchestration: route each step to the smallest model that clears the bar, with a calibrated escalation path to a frontier model for the steps that genuinely need one. Purpose-built models trained on domain data now beat general-purpose ones on specialized tasks.",
                  },
                ],
              },
              source: "Gartner; AT&T 2026 outlook",
              demands: "Knowing when small is sufficient, and proving it",
              program: {
                label: "AI Inference Economics and Model Routing",
                status: "gap",
              },
            },
            {
              icon: "proto",
              figure: "Standard",
              figureCaption: "tool interfaces replaced bespoke integrations",
              title: "Tool access got a protocol",
              tag: "integration",
              quote: {
                parts: [
                  {
                    text: "Giving an agent real capability got cheap. So did ",
                  },
                  { text: "giving it the wrong one", strong: true },
                  { text: "." },
                ],
              },
              description: {
                parts: [
                  {
                    text: "Connecting a model to real systems used to be bespoke work per integration. A shared protocol layer has changed that, which lowers the cost of giving an agent real capability and correspondingly raises the cost of giving it the wrong capability.",
                  },
                ],
              },
              source: "Model Context Protocol adoption, 2026",
              demands: "Safe, standardized system integration",
              program: {
                label: "Agent Tooling and Integration Safety",
                status: "gap",
              },
            },
          ],
        },
        {
          id: "demand",
          question: {
            parts: [
              { text: "AI demand is outpacing the talent " },
              { text: "you can hire", em: true },
              { text: "." },
            ],
          },
          lede: "Generative AI, machine learning, and MLOps roles compete for the same scarce candidates. Hiring alone cannot close a gap this wide, and the build-versus-buy calculation has moved decisively toward building from the teams you already have.",
          stats: [
            {
              value: "39%",
              description:
                "of workers' core skills are expected to change by 2030, driven by AI and automation, faster than most hiring pipelines can refill.",
              source: "WEF Future of Jobs Report, 2025",
            },
            {
              value: "78%",
              description:
                "of organizations now use AI in at least one business function, which intensifies demand for teams who can build and run it safely.",
              source: "McKinsey State of AI, 2024",
            },
            {
              value: "$4.4T",
              description:
                "in potential annual value from generative AI, value that stays locked unless employees are trained to capture it.",
              source: "McKinsey, 2023",
            },
          ],
        },
        {
          id: "pressures",
          question: {
            parts: [
              { text: "The organizations that " },
              { text: "do nothing", em: true },
              { text: " are not standing still." },
            ],
          },
          lede: "Not adopting AI is itself a decision with consequences, and they compound. These four pressures compound quietly, and none of them wait for a budget cycle.",
          note: "Figures are published research, linked at source. Outcomes vary by sector, model footprint, and governance maturity.",
          pressures: [
            {
              kicker: "Regulatory exposure",
              figure: "7%",
              unit: "of global annual turnover",
              description:
                "The EU AI Act sets its own penalty ceilings: up to 7% of worldwide annual turnover or 35 million euros for prohibited practices, and 3% or 15 million for other breaches. Obligations attach to the deploying organization, not the model vendor.",
              source: "EU AI Act, penalty provisions",
            },
            {
              kicker: "Lead time",
              figure: "Months",
              unit: "to build capability, not weeks",
              description:
                "Obligation dates do not move, but capability takes discovery, delivery and assessment cycles to build. Organizations that start when the deadline is already visible are starting late, and no amount of budget compresses a learning curve.",
              source: "Pattern, not a published statistic",
            },
            {
              kicker: "Key-person risk",
              figure: "2-3",
              unit: "people hold the capability",
              description:
                "In most organizations the working knowledge of the models sits with a handful of individuals. Their departure is an outage, and it is a risk that grows quietly while nothing appears to be wrong.",
              source: "Observed in discovery engagements",
            },
            {
              kicker: "Stalled pilots",
              figure: "Demo",
              unit: "is where most AI stops",
              description:
                "Pilots clear a demo and then stall, because reaching production needs deployment, monitoring and governance skills that no proof of concept required. The spend is already made; the return is not.",
              source: "Pattern, not a published statistic",
            },
          ],
        },
      ],
    },
    outcomesData : {
      heading: {
        parts: [
          { text: "We do not train AI users. We " },
          { text: "build ", },
          { text: "the people who will run it.", em: true },
        ],
      },
      description:"Two tracks means two ceilings, and both are a success. Everyone starts in the same place; where a team stops depends on whether it uses AI or builds it. A marketing team reaching fluent is an arrival, not a stalled journey.",
      image: {
            src: "/course/circles.png",
            alt: "circle",
          },

      stages: [
        {
          label: "EVERYONE STARTS HERE",
          title: "AI-curious",
          description:
            "Aware the tools exist. No shared standard, no agreed rules for company data.",
          tags: [],
          active: false,
        },

        {
          label: "",
          title: "AI-fluent",
          description:
            "Uses AI daily inside agreed guardrails, with the same patterns across the team.",
          tags: ["ChatGPT Prompt Engineering", "AI for Managers"],
          active: true,
        },

        {
          label: "TEAMS WHO USE AI",
          title: "AI-productive",
          description:
            "Applies AI to its own function's work and can judge when the output is good enough to act on.",
          tags: ["AI for HR", "AI for Accountants", "AI Decision Support Systems"],
          active: true,
        },

        {
          label: "TEAMS WHO BUILD AI",
          title: "AI-capable",
          description:
            "Builds, evaluates and deploys its own systems, and can tell a working model from a convincing one.",
          tags: [
            "Machine Learning with Python",
            "Generative AI (GenAI)",
            "Retrieval Augmented Generation (RAG)",
            "ML Model Monitoring",
          ],
          active: true,
        },

        {
          label: "",
          title: "AI-self-sustaining",
          description:
            "Governs what it builds and refreshes its own practice as the tooling moves, without waiting for us.",
          tags: [
            "MLOps Foundations (proposed)",
            "AI Evaluation and Red-Teaming (proposed)",
            "Artificial Intelligence (AI) Governance",
            "EU AI Act Implementation (proposed)",
          ],
          active: true,
        },
      ],
      note: "Teams that reach the top of either track stop consuming AI and start improving it. Programs named above are drawn from the catalog below. Steps marked proposed are gaps we have identified and can build; they are not currently listed.",
      ctaBannerData: [
      {
        variant: "light",
        eyebrow: "AI capability building, one ceiling at a time",
        heading: "The training that moves a team from AI-fluent to AI-capable.",
        ctaText: "Compare AI Training Programs",
        ctaHref: "/corporate-training",
      },
     ],
    },
    cardData: {
      heading: {
        parts: [
          { text: "Capability is an " },
          { text: "organisational", em: true },
          { text: " state, not a set of certificates." },
        ],
      },

      description:
        "Individual skills are the input. What a board can actually see is the change in how the organisation behaves. These are the shifts that separate a company that has bought AI training from one that has built AI capability.",
      beforeLabel: "Before",
      afterLabel: "After capability is built",

      rows: [
        {
          before:
            "AI use is invisible. Staff paste company data into personal accounts because no sanctioned path exists.",
          after:
            "Adoption runs on approved tools with agreed data-handling rules, and the organisation can see what is being used.",
        },
        {
          before:
            "Two or three people understand the models. Everything queues behind them, and their leaving is an outage.",
          after:
            "Capability is distributed across the team. Work continues when any one person is unavailable.",
        },
        {
          before:
            "Whether a model is good enough is a matter of individual judgment, argued case by case.",
          after:
            "Shared evaluation standards decide it, and the same bar applies to every release.",
        },
        {
          before:
            "Governance is discovered during an audit, then reconstructed backwards under time pressure.",
          after:
            "Documentation, risk classification and evidence are produced as the work happens.",
        },
        {
          before:
            "Every change to a model or pipeline needs a vendor, a statement of work and a wait.",
          after:
            "The team makes its own changes, and brings in help for scale rather than for basics.",
        },
        {
          before:
            "AI is a set of pilots that impress in a demo and stall before production.",
          after:
            "Systems reach production because someone in-house can deploy, monitor and retrain them.",
        },
      ],

      note: "These are observable states, not projected metrics. Where a shift is achieved, and how quickly, depends on the starting baseline established in discovery.",
      ctaBannerData: [
        {
          variant: "light",
          eyebrow: "An AI operating model covers the whole organization",
          heading:
            "Organizational AI capability needs every function, not just engineering.",
          ctaText: "Browse AI Training Programs",
          ctaHref: "/corporate-training",
        },
      ],
    },
    industriesData : {
  title: {
    main: "AI training by ",
    italic: "industry",
    suffix: ", scoped to your sector's process."
  },
  subtitle:
    "Every program runs as a closed cohort for your team, on-site or virtual, on your own data and systems. What changes by sector is the roles we put in the room and the working thing they leave with. Eighteen sectors are written out below as examples of the fit, not the limit of it.",
  
  infoBoxes: {
    left: {
      label: "BEFORE WE SCOPE A COHORT, WE TEST THE PROCESS YOU WANT TO CHANGE",
      points: [
        { text: "It runs at ", bold: "volume", suffix: ": the same shape of decision, many times over." },
        { text: "The ", bold: "signal already exists", suffix: " in data you hold." },
        { text: "Judgment is ", bold: "pattern-shaped", suffix: ", not novel each time." },
        { text: "Approximately right is useful", bold: "", suffix: ", because a person reviews the output." }
      ]
    },
    right: {
      label: "AND WE WILL SAY SO WHEN TRAINING IS THE WRONG ANSWER",
      points: [
        { text: "The decision is ", bold: "one-off", suffix: ", so there is no pattern to learn." },
        { text: "There is ", bold: "no history", suffix: ", only opinion about what should happen." },
        { text: "An error is ", bold: "unrecoverable and unreviewed", suffix: ", with nobody in the loop." }
      ]
    }
  },

  catalogSectors: [
    {
      id: "pharma",
      icon: "flask",
      title: "Pharmaceuticals and life sciences",
      description: "Teams call us when enrollment slips and site forecasts are guesswork.",
      cohort: "Clinical operations, biostatistics, data management",
      builds: "Eligibility matching and enrollment forecasting on your own protocol, documented to the standard an inspector accepts.",
      btnText: "AI in Clinical Trials →"
    },
    {
      id: "cybersecurity",
      icon: "shield",
      title: "Cybersecurity operations",
      description: "Called in when half the alert queue is noise and the analysts know it.",
      cohort: "SOC analysts, detection engineers, security leads",
      builds: "Triage and correlation models tuned to your own alert baseline, in the tooling your SOC already runs.",
      btnText: "AI for Cybersecurity Professionals →"
    },
    {
      id: "finance",
      icon: "bank",
      title: "Financial services and accounting",
      description: "Brought in when every close consumes the finance team's capacity.",
      cohort: "Controllers, financial analysts, shared-service teams",
      builds: "Transaction matching, ledger anomaly detection and first-pass variance explanation, with the audit trail attached.",
      btnText: "AI for Accountants →"
    },
    {
      id: "retail",
      icon: "cart",
      title: "Retail & Supply Chain",
      description: "Deployed when stockouts hit during peak seasonal demand.",
      cohort: "Supply chain managers, inventory planners",
      builds: "Demand forecasting models trained on localized promotional history and warehouse throughput data.",
      btnText: "AI for Supply Chain →"
    },
    {
      id: "cybersecurity",
      icon: "shield",
      title: "Cybersecurity operations",
      description: "Called in when half the alert queue is noise and the analysts know it.",
      cohort: "SOC analysts, detection engineers, security leads",
      builds: "Triage and correlation models tuned to your own alert baseline, in the tooling your SOC already runs.",
      btnText: "AI for Cybersecurity Professionals →"
    },
    {
      id: "finance",
      icon: "bank",
      title: "Financial services and accounting",
      description: "Brought in when every close consumes the finance team's capacity.",
      cohort: "Controllers, financial analysts, shared-service teams",
      builds: "Transaction matching, ledger anomaly detection and first-pass variance explanation, with the audit trail attached.",
      btnText: "AI for Accountants →"
    }
  ],

  proposedSectors: [
    {
      id: "healthcare",
      icon: "plus",
      title: "Healthcare delivery",
      description: "Asked for when documentation eats the clinical day and imaging queues keep growing.",
      cohort: "Clinical informatics, IT, quality and governance leads",
      scope: "Built to order: note generation, imaging triage and coding support, validated for human-in-the-loop use.",
      badge: "NO PROGRAM YET",
      btnText: "Clinical AI Deployment and Validation →"
    },
    {
      id: "insurance",
      icon: "key",
      title: "Insurance",
      description: "Asked for when claims and underwriting calls have to be explainable on request.",
      cohort: "Underwriting, claims operations, actuarial and model risk",
      scope: "Built to order: claims triage and first-pass pricing, with model risk management and adverse-action explainability.",
      badge: "NO PROGRAM YET",
      btnText: "AI for Underwriting and Claims →",
      btnActive: true
    },
    {
      id: "legal",
      icon: "file",
      title: "Legal and professional services",
      description: "Asked for when review scales with matter size rather than with billable hours.",
      cohort: "Practice groups, knowledge management, legal operations",
      scope: "Built to order: clause extraction and precedent retrieval that cites its source, with hallucination risk handled openly.",
      badge: "NO PROGRAM YET",
      btnText: "AI for Legal and Contract Review →"
    },
    {
      id: "manufacturing",
      icon: "cog",
      title: "Advanced Manufacturing",
      description: "Asked for when equipment downtime halts production schedules unpredictably.",
      cohort: "Plant engineers, maintenance supervisors, operations",
      scope: "Built to order: sensor anomaly detection and predictive maintenance alerts integrated into shop-floor workflows.",
      badge: "NO PROGRAM YET",
      btnText: "AI for Manufacturing Operations →"
    },
    {
      id: "insurance",
      icon: "key",
      title: "Insurance",
      description: "Asked for when claims and underwriting calls have to be explainable on request.",
      cohort: "Underwriting, claims operations, actuarial and model risk",
      scope: "Built to order: claims triage and first-pass pricing, with model risk management and adverse-action explainability.",
      badge: "NO PROGRAM YET",
      btnText: "AI for Underwriting and Claims →",
      btnActive: true
    },
    {
      id: "legal",
      icon: "file",
      title: "Legal and professional services",
      description: "Asked for when review scales with matter size rather than with billable hours.",
      cohort: "Practice groups, knowledge management, legal operations",
      scope: "Built to order: clause extraction and precedent retrieval that cites its source, with hallucination risk handled openly.",
      badge: "NO PROGRAM YET",
      btnText: "AI for Legal and Contract Review →"
    }
  ]
},
    marqueeData: {
      eyebrow: "BUILT AGAINST YOUR STACK",

      heading: {
        highlight:
          "Programs are designed around what you already run, not a reference architecture we prefer.",
      },
      description:
        "If your stack is not listed, it is almost certainly still covered.",

      items: [
        "LlamaIndex",
        "Hugging Face",
        "Vector databases",
        "Feature stores",
        "Your data warehouse",
        "Copilot",
        "ChatGPT Enterprise",
        "Your own fine-tunes",
        "GPT",
        "Claude",
        "Gemini",
        "Llama",
        "Mistral",
        "Copilot",
        "ChatGPT Enterprise",
        "Your own fine-tunes",
        "GPT",
        "Claude",
      ],

      disclaimer:
        "All names and marks shown are the property of their respective owners. Their appearance here indicates coverage in our training, not partnership, affiliation or endorsement.",
    },
    pathsData: {
      mark: {
        label: "SEVEN ROLE PATHS",
      },

      heading: {
        parts: [
          { text: "A catalog tells you what exists. " },
          { text: "A path tells you " },
          { text: "what comes first.", em: true },
        ],
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

      note:
        "Sequences are indicative, not fixed. Discovery establishes where a team already is, and a path usually starts partway along rather than at step one.",
    },
    governanceData : {
      image: {
        src: "/course/circles.png",
        alt: "circle",
      },

      heading: {
            parts: [
              { text: "Training aligned to the frameworks " },
              { text: "you answer to.", em: true },
              { text: "" },
            ],
          },
      description:"Deployment now stalls on one question: can you govern it? Ungoverned AI is an enterprise risk rather than a missed opportunity, and training changes the risk arithmetic in three specific places.",
      pillars: [
        {
          number: "01",
          title: "Govern",
          description:
            "Teams who know how the frameworks actually work can classify a model's risk tier, document the controls around it, and produce evidence an auditor will accept. Untrained teams discover the requirement during the audit.",
          label: "CLASSIFICATION AND EVIDENCE",
        },
        {
          number: "02",
          title: "Validate",
          description:
            "Drift, bias, prompt injection and ungrounded output are all testable before release. Where evaluation and adversarial testing are routine engineering practice, models reach production proven rather than assumed.",
          label: "EVALUATION BEFORE RELEASE",
        },
        {
          number: "03",
          title: "Enable",
          description:
            "Shadow AI grows wherever staff have no sanctioned path. Broad enablement on approved tools, prompts and data handling replaces unmanaged tool use with adoption the organization can actually see.",
          label: "SANCTIONED ADOPTION",
        },
      ],

      frameworkLabel: "FRAMEWORKS THESE PROGRAMS ARE BUILT AGAINST",
      frameworks: [
        {
          name: "EU AI Act",
          meta: "EU",
        },
        {
          name: "NIST AI RMF",
          meta: "US",
        },
        {
          name: "ISO/IEC 42001",
          meta: "GLOBAL",
        },
        {
          name: "ISO/IEC 23894",
          meta: "GLOBAL",
        },
        {
          name: "GDPR",
          meta: "EU",
        },
        {
          name: "Sector rules",
          meta: "VARIES",
        },
      ],

      tabs: [
        {
          name: "EU AI Act",
          region: "EU",
          title: "EU AI Act",
          status: "EU · MANDATORY",
          description:
            "A risk-based regulatory framework governing the development, deployment and use of artificial intelligence systems across the European Union.",
          points: [
            {
              title: "GOVERN",
              description:
                "Risk classification, accountability and documented controls for regulated AI systems.",
            },
            {
              title: "MEASURE",
              description:
                "Evidence-based assessment of safety, transparency and compliance requirements.",
            },
            {
              title: "MANAGE",
              description:
                "Operational controls that keep AI systems aligned throughout their lifecycle.",
            },
          ],
        },

        {
          name: "NIST AI RMF",
          region: "US",
          title: "NIST AI RMF",
          status: "US · VOLUNTARY · LIVE",
          description:
            "A voluntary framework structured around four functions: govern, map, measure and manage. It is not law, which is precisely why it has been adopted so widely as the working scaffolding for AI risk programs, including well outside the US.",
          points: [
            {
              title: "GOVERN",
              description:
                "Ownership, policy and accountability that survives staff turnover.",
            },
            {
              title: "MEASURE",
              description:
                "Evaluation that produces evidence rather than confidence.",
            },
            {
              title: "MANAGE",
              description:
                "A response path for when a model behaves badly in production.",
            },
          ],
        },

        {
          name: "ISO/IEC 42001",
          region: "GLOBAL",
          title: "ISO/IEC 42001",
          status: "GLOBAL · MANAGEMENT SYSTEM",
          description:
            "An international management-system standard designed to help organizations establish, implement, maintain and continually improve responsible AI governance.",
          points: [
            {
              title: "GOVERN",
              description:
                "Establish policies, ownership and organizational responsibilities.",
            },
            {
              title: "MEASURE",
              description:
                "Monitor AI objectives, controls and performance through evidence.",
            },
            {
              title: "MANAGE",
              description:
                "Continuously improve the AI management system as risks evolve.",
            },
          ],
        },

        {
          name: "ISO/IEC 23894",
          region: "GLOBAL",
          title: "ISO/IEC 23894",
          status: "GLOBAL · AI RISK",
          description:
            "Guidance for organizations managing risks associated with artificial intelligence systems across planning, development, deployment and operational use.",
          points: [
            {
              title: "IDENTIFY",
              description:
                "Recognize AI-specific risks across the complete system lifecycle.",
            },
            {
              title: "EVALUATE",
              description:
                "Assess likelihood, impact and the effectiveness of risk controls.",
            },
            {
              title: "TREAT",
              description:
                "Apply proportionate actions to reduce and manage identified risks.",
            },
          ],
        },

        {
          name: "GDPR",
          region: "EU",
          title: "GDPR",
          status: "EU · DATA PROTECTION",
          description:
            "A data protection framework establishing requirements for processing personal data, with important implications for AI systems that collect, process or infer information about individuals.",
          points: [
            {
              title: "GOVERN",
              description:
                "Define accountability and lawful foundations for personal-data processing.",
            },
            {
              title: "MEASURE",
              description:
                "Assess privacy impact, controls and evidence around data processing.",
            },
            {
              title: "MANAGE",
              description:
                "Maintain appropriate safeguards throughout the AI system lifecycle.",
            },
          ],
        },

        {
          name: "Sector rules",
          region: "VARIES",
          title: "Sector Rules",
          status: "VARIES · INDUSTRY SPECIFIC",
          description:
            "Industry-specific requirements add another layer of governance where AI operates in regulated or high-impact environments.",
          points: [
            {
              title: "GOVERN",
              description:
                "Translate sector obligations into clear organizational ownership.",
            },
            {
              title: "MEASURE",
              description:
                "Create evidence that demonstrates compliance with applicable rules.",
            },
            {
              title: "MANAGE",
              description:
                "Embed regulatory controls into day-to-day AI operations.",
            },
          ],
        },
      ],

      footer:"Programs are framework-aligned skills training. Edstellar is not a certification body and does not issue framework certifications.",
        ctaBannerData: [
            {
              variant: "light",
              eyebrow: "BUILD VERSUS BUY AI TALENT",
              heading: "Close the AI skills gap with the engineers you already employ.",
              ctaText: "Upskill Your Teams with AI Training Programs",
              ctaHref: "/corporate-training",
            },
          ],
    },
    trainers: {
      heading: {
        parts: [
          { text: "Practitioners who run AI in production, " },
          { text: "not generalists ", em: true },
          { text: "working from slides." },
        ],
      },

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
      note: "Trainers are matched to your stack and delivery window at scheduling. We confirm your assigned trainer, with a full profile, before the program is booked, and you can sit in on a trial session first.",
    },
    mapsectionData: {
      headlineParts: [
        { text: "Why enterprises choose " },
        { text: "Edstellar ", em: true },
        { text: "for AI." },
      ],

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
          secondaryValue: "27001",
          label: "Certified",
        },
      ],

      features: [],

      relatedLabel: "",

      relatedServices: [],
    },
    capabilityData: {
      heading: {
        parts: [
          { text: "Capability you can point at, " },
          { text: "after the cohort ended.", em: true },
        ],
      },

      description:
        "Three engagements, summarised. Each links to the full write-up: what the team could not do, what we ran, and what was measurably different ninety days later.",
      items: [
        {
          eyebrow: "Financial services",
          title: "Global payments company, San Francisco",
          problemLabel: "The problem",
          problem:
            "Models were shipping weekly, but nobody could evidence drift to the risk committee. Reviews stalled on questions the team could not answer from its own tooling.",
          workLabel: "What we ran",
          work: "24 engineers, 2 parallel cohorts, monitoring and governance, 6 weeks",
          result: "4 days",
          resultDescription:
            "Median time to detect model drift, down from three weeks",
          resultNote: "Client-reported, 90 days after delivery",
          caseStudyLabel: "Read the case study",
          caseStudyHref: "#",
          trainingLabel: "Discover AI training programs",
          trainingHref: "/corporate-training",
        },

        {
          eyebrow: "Specialty chemicals",
          title: "Manufacturer, EMEA",
          problemLabel: "The problem",
          problem:
            "The data science team could build models but could not hand them to operations. Work stopped at the notebook and the plant kept running on spreadsheets.",
          workLabel: "What we ran",
          work: "40 staff across 4 cohorts, MLOps and deployment, 8 weeks",
          result: "9 of 11",
          resultDescription:
            "Models moved from notebook to production within two quarters",
          resultNote: "Client-reported, Q2 review",
          caseStudyLabel: "Read the case study",
          caseStudyHref: "#",
          trainingLabel: "Discover AI training programs",
          trainingHref: "/corporate-training",
        },

        {
          eyebrow: "Professional services",
          title: "Top-3 consulting firm, Boston",
          problemLabel: "The problem",
          problem:
            "Consultants were using AI daily with no shared standard for what was safe to put in front of a client. Risk and delivery disagreed on where the line was.",
          workLabel: "What we ran",
          work: "60 staff across 4 cohorts, applied AI and governance, 5 weeks",
          result: "+41 pts",
          resultDescription: "Average gain, pre to post technical assessment",
          resultNote: "Edstellar pre and post assessment, n=60",
          caseStudyLabel: "Read the case study",
          caseStudyHref: "#",
          trainingLabel: "Discover AI training programs",
          trainingHref: "/corporate-training",
        },
      ],
      note: "Client names are withheld where the engagement is covered by a confidentiality agreement. Named references are available on request during procurement.",
    },
    methodData : {
      lifecycle: {
        heading: [
          { text: "How an AI capability program, " },
          { text: "actually runs.", em: true },
        ],

        description: "Every engagement runs the same five stages, from capability baseline through to the refresh cycle.",

        stages: [
          {
            number: "01",
            title: "Discover",
            description:
              "We meet your CTO and L&D team to baseline what your data, engineering and product people can actually do today, against the roles you need them to fill.",
            timing: "WEEK 1–2",
          },
          {
            number: "02",
            title: "Design",
            description:
              "Programs are assembled against your model stack, your data, and the governance regime you operate under, then trainers are shortlisted from the vetted bench.",
            timing: "WEEK 2–4",
          },
          {
            number: "03",
            title: "Deliver",
            description:
              "Closed-cohort instructor-led sessions in your language and timezone, with GPU sandboxes, notebooks and retrieval or agent environments shipped alongside.",
            timing: "SCHEDULED TO YOUR CALENDAR",
            active: true,
          },
          {
            number: "04",
            title: "Assess",
            description:
              "Pre and post technical assessments establish a measurable change in capability, benchmarked against role frameworks.",
            timing: "IMMEDIATELY AFTER DELIVERY",
          },
          {
            number: "05",
            title: "Sustain",
            description:
              "Retrospectives, refresher modules and skill-refresh tracking keep the investment from decaying, and the measured gaps feed the next cycle.",
            timing: "QUARTERLY",
          },
        ],

        footer:
          "STAGE 05 FEEDS THE NEXT CYCLE: THE GAPS IT MEASURES BECOME THE NEXT DISCOVER",
      },

      services: {
        eyebrow: "ALSO FROM EDSTELLAR",

        items: [
          {
            title: "Talent assessments",
            description:
              "Psychometric, behavioral, leadership and 360-degree assessment.",
          },
          {
            title: "Training needs analysis",
            description:
              "Needs analysis, gap identification, and a training roadmap.",
          },
          {
            title: "L&D consulting",
            description:
              "Learning strategy, content, technology and ROI measurement.",
          },
          {
            title: "OD consulting",
            description:
              "Org design, succession planning and cultural change.",
          },
          {
            title: "Managed training services",
            description:
              "Training outsourcing, vendor management, logistics and administration.",
          },
          {
            title: "Coaching solutions",
            description:
              "Executive and manager coaching that keeps skills in use.",
          },
        ],
      },
    },
    ldData: {
  heading: {
    parts: [
      { text: "For HR and L&D leads" },
    ],
  },
  description:
    "The five stages above are what we run. This is the same month from your side: what you decide, what you bring, and what lands on your desk.",

  cards: [
    {
      title: "Sizing a cohort",
      highlight: {
        number: "5",
        label: "MINIMUM PER COHORT",
      },
      body: "Below five you lose the peer discussion that makes live instruction worth paying for over individual licenses.",
      callout: {
        title: "Split by current level",
        text: "Not by team or seniority. A cohort where half the room waits for the other half is the most common way these fail.",
      },
      diagram: {
        left: "ONE ROOM",
        right: "PARALLEL, SAME WEEK",
      },
      link: {
        text: "How many can attend",
        href: "#", // replace with real URL
      },
      cta: {
        label: "Request a Cohort Proposal",
        href: "#", // replace with real URL
      },
    },
    {
      title: "What we need at discovery",
      intro: "Six inputs. Bring these and the first call maps roles instead of gathering facts.",
      checklist: [
        {
          title: "Headcount by role",
          description: "The roles you need them to fill, not the titles they hold today",
        },
        {
          title: "Current capability",
          description: "An honest read of what your data, engineering and product people can do now",
        },
        {
          title: "Model stack and data",
          description: "What you run, and where your data sits",
        },
        {
          title: "Governance regime",
          description: "The obligations you answer to",
        },
        {
          title: "Any fixed date",
          description: "An audit, a launch, an obligation deadline",
        },
        {
          title: "Sign-off and audience",
          description: "Who approves, and who needs to see the outcome afterwards",
        },
      ],
      cta: {
        label: "Request a Scoped Proposal",
        href: "#",
      },
    },
    {
      title: "The first 30 days",
      intro: "What lands on your desk, in order.",
      timeline: [
        {
          number: "01",
          period: "WEEK 1",
          title: "Discovery call",
          description: "Role and capability mapping against role-based benchmarks.",
        },
        {
          number: "02",
          period: "WEEKS 2–4",
          title: "Curriculum and trainers",
          description: "Assembled against your stack and obligations. Trainers shortlisted from the vetted bench and profiles shared with you.",
        },
        {
          number: "03",
          period: "BEFORE YOU COMMIT",
          title: "Trial session",
          description: "You sit in with the shortlisted trainer before anything is signed.",
        },
        {
          number: "04",
          period: "FROM THERE",
          title: "Delivery scheduled",
          description: "Run to your calendar, in your language and timezone.",
        },
      ],
      cta: {
        label: "Request a Proposal and Timeline",
        href: "#",
      },
    },
  ],
},
    faqs: {
      title: {
        parts: [
          { text: "Questions enterprises ask " },
          { text: "before booking.", em: true },
          { text: "" },
        ],
      },

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
    relatedCategoriesData: {
      heading: {
        parts: [
          { text: "Explore related " },
          { text: "training domains", em: true },
          { text: "." },
        ],
      },

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
          description:
            "The wider engineering catalogue this domain sits within.",
          type: "Instructor-led",
          link: "View course",
          href: "#",
        },
      ],
    },
    leadForm: {
      title: {
        parts: [
          { text: "Ask us about " },
          { text: "AI training", em: true },
          { text: " for your teams." },
        ],
      },
      description:
        "Tell us which teams you are training and what they need to be able to do. Anything you filtered in the catalog comes through with your message.",
      slaNote:
        "We reply within one business day with a tailored proposal, no automated sales sequence.",
      pricingHref: "https://www.edstellar.com/corporate-training-pricing#table",
    },
  },
};

export const getCategory = cache(async (category) => {
  return CATEGORIES[category] || null;
});

export const getCategorySlugs = cache(async () => Object.keys(CATEGORIES));
