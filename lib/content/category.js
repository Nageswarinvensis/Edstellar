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

const PLACEHOLDER_TRAINERS = [
  { name: "Trainer A", photo: null },
  { name: "Trainer B", photo: null },
  { name: "Trainer C", photo: null },
  { name: "Trainer D", photo: null },
];

const DOMAIN_COURSES = {
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

      subhead:
        "Build the people who will run your AI, not just the models.",

      lede:
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
        label: "AI trainers",
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
        { text: "What is corporate " },
        { text: "AI training", em: true },
        { text: "?" },
      ],

      body:[
        "Corporate AI training is instructor-led group training that builds an organisation's ability to design, deploy, and govern artificial intelligence systems. It spans two tracks: technical depth for the data, engineering, and MLOps teams who build and run models, and broad enablement for the functions who now use AI tools in daily work. Programs are scoped to an employer's stack and delivered to a closed cohort rather than sold as individual seats.",
      ],
      more: [
        "The distinction that matters commercially is between capability and access. Individual licences give people tools; group training gives a team a shared baseline: the same patterns, the same evaluation habits, and the same rules for handling data. For enterprises deploying AI under regulatory obligation, that shared baseline is what an auditor can be shown.",
        "Programs split across two tracks. Technical depth for the data, engineering and MLOps teams who build and run models. Broad enablement for finance, marketing, HR and operations, who now use AI tools daily and are the larger source of ungoverned adoption.",
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

      description:"Individual skills are the input. What a board can actually see is the change in how the organisation behaves. These are the shifts that separate a company that has bought AI training from one that has built AI capability.",
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

      note:
        "These are observable states, not projected metrics. Where a shift is achieved, and how quickly, depends on the starting baseline established in discovery.",
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

      features: [
      ],

      relatedLabel: "",

      relatedServices: [
      ],
    },
    capabilityData: {
      heading: {
        parts: [
          { text: "Capability you can point at, " },
          { text: "after the cohort ended.", em: true },
        ],
      },

      description:"Three engagements, summarised. Each links to the full write-up: what the team could not do, what we ran, and what was measurably different ninety days later.",
      items: [
        {
          eyebrow: "Financial services",
          title: "Global payments company, San Francisco",
          problemLabel: "The problem",
          problem:"Models were shipping weekly, but nobody could evidence drift to the risk committee. Reviews stalled on questions the team could not answer from its own tooling.",
          workLabel: "What we ran",
          work:"24 engineers, 2 parallel cohorts, monitoring and governance, 6 weeks",
          result: "4 days",
          resultDescription:"Median time to detect model drift, down from three weeks",
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
          problem:"The data science team could build models but could not hand them to operations. Work stopped at the notebook and the plant kept running on spreadsheets.",
          workLabel: "What we ran",
          work:"40 staff across 4 cohorts, MLOps and deployment, 8 weeks",
          result: "9 of 11",
          resultDescription:"Models moved from notebook to production within two quarters",
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
          problem:"Consultants were using AI daily with no shared standard for what was safe to put in front of a client. Risk and delivery disagreed on where the line was.",
          workLabel: "What we ran",
          work:"60 staff across 4 cohorts, applied AI and governance, 5 weeks",
          result: "+41 pts",
          resultDescription:"Average gain, pre to post technical assessment",
          resultNote: "Edstellar pre and post assessment, n=60",
          caseStudyLabel: "Read the case study",
          caseStudyHref: "#",
          trainingLabel: "Discover AI training programs",
          trainingHref: "/corporate-training",
        },
      ],
      note:"Client names are withheld where the engagement is covered by a confidentiality agreement. Named references are available on request during procurement.",
    },
    faqs: {
      title: {
        parts: [
          { text: "Questions enterprises ask " },
          { text: "before booking.", em: true },
          { text: "." },
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
    domainData: {
      heading: {
        parts: [
          { text: "Explore related " },
          { text: "training domains", em: true },
          { text: "." },
        ],
      },

      description: "AI capability rarely sits alone. These domains are the ones enterprises most often build alongside it.",

      items: [
        {
          title: "Machine Learning Training",
          description:"Model development from data preparation through validation and deployment.",
          type: "Instructor-led",
          link: "View course",
          href: "#",
        },
        {
          title: "Deep Learning Training",
          description:"Neural network architectures, from convolutional and recurrent models to transformers.",
          type: "Instructor-led",
          link: "View course",
          href: "#",
        },
        {
          title: "Natural Language Processing Training",
          description:"Language models, text pipelines and conversational systems for enterprise use.",
          type: "Instructor-led",
          link: "View course",
          href: "#",
        },
        {
          title: "Computer Vision Training",
          description:"Image processing, detection and inspection systems for industrial and product use.",
          type: "Instructor-led",
          link: "View course",
          href: "#",
        },
        {
          title: "ChatGPT Training",
          description:"Prompting, assistants and safe day-to-day use of general-purpose AI tools.",
          type: "Instructor-led",
          link: "View course",
          href: "#",
        },
        {
          title: "Cybersecurity Training",
          description:"Security programs for teams defending the systems AI now runs inside.",
          type: "Instructor-led",
          link: "View course",
          href: "#",
        },
        {
          title: "IT & Technical Training",
          description:"The wider engineering catalogue this domain sits within.",
          type: "Instructor-led",
          link: "View course",
          href: "#",
        },
      ],
    },
  },
};

/* -------------------------------- */
/* CATEGORY GETTER */
/* -------------------------------- */

export const getCategory = cache(async (category) => {
  return DOMAIN_COURSES[category] || null;
});