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
 * Domain content: DevOps Training.
 *
 * Pure content. No reads, no `cache()`, no fetch — those live in
 * `lib/content/domains.js`. Adding a domain means adding a file here and one
 * line to `content/domains/index.js`; nothing else changes.
 *
 * Deliberately narrower than `artificial-intelligence.js`: `why_now` (cited
 * research figures) and `capability` (named client case studies) are left
 * out rather than filled with invented statistics or fabricated client
 * outcomes — both components null-guard cleanly when their data is absent.
 * Backfill them once real figures/case studies exist for this domain.
 */
const devopsTraining = {
  slug: "devops-training",

  name: "DevOps Training",

  seo: {
    meta_title: "Corporate DevOps Training",
    Meta_description:
      "Instructor-led corporate DevOps training across platform engineering, CI/CD, infrastructure as code and site reliability. Scoped to your stack, delivered onsite or virtually in 100+ countries.",
    og_image_url: null,
  },

  hero: {
    heading_parts: [
      { text: "Corporate " },
      { text: "DevOps", is_italic: true },
      { text: " Training" },
    ],

    subhead: "Build the platform team that ships without waiting on tickets.",

    intro_text:
      "We build DevOps capability inside enterprises: the people, the pipelines and the platform practices that let engineering teams deploy safely and often. Instructor-led programs across platform engineering, CI/CD, infrastructure as code and site reliability are how we do it, scoped to your stack and delivered wherever your teams are.",

    meta: DELIVERY_META,
    media: {
      image: null,
      video: "/category/Home-Animation.mp4",
      alt: "An engineering team reviewing a deployment pipeline on a shared display",
    },

    actions: [
      {
        label: "Browse DevOps programs",
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
      label: "DevOps",
    },
  ],

  client_logos: {
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

  sticky_nav: {
    logo: {
      src: "/course/Edstellar.svg",
      alt: "Edstellar",
    },

    tabs: [
      { id: "about", label: "About", active: true },
      { id: "capability", label: "Transformation", active: false },
      { id: "stack", label: "Stack", active: false },
      { id: "trainers", label: "Trainers", active: false },
      { id: "why-edstellar", label: "Proof", active: false },
      { id: "faqs", label: "FAQ", active: false },
    ],
  },

  about: {
    heading_parts: [
      { text: "What is corporate " },
      { text: "DevOps training", is_italic: true },
      { text: "?" },
    ],

    body: [
      "Corporate DevOps training is instructor-led group training that builds an organisation's ability to design, automate and operate its own delivery pipeline. It spans platform engineering, CI/CD pipeline design, infrastructure as code, container orchestration and site reliability practices. Programs are scoped to an employer's stack and delivered to a closed cohort rather than sold as individual seats.",
    ],
    expanded_body: [
      "The distinction that matters commercially is between tooling and capability. Buying a platform gives a team software; group training gives a team a shared way of operating it — the same deployment patterns, the same on-call habits, and the same rules for what ships without review.",
      "Programs typically split across two tracks: platform and infrastructure engineers who build and operate the delivery system, and application teams who consume it day to day and need to work with it safely.",
    ],
    cta_banner: [
      {
        variant: "light",
        eyebrow: "BUILD VERSUS BUY PLATFORM TALENT",
        heading:
          "Close the DevOps skills gap with the engineers you already employ.",
        cta_text: "Upskill Your Teams with DevOps Training Programs",
        cta_href: "/corporate-training",
      },
    ],
  },

  card: {
    heading: {
      parts: [
        { text: "Capability is an " },
        { text: "organisational", is_italic: true },
        { text: " state, not a set of certificates." },
      ],
    },

    description:
      "Individual skills are the input. What a board can actually see is the change in how the organisation ships software. These are the shifts that separate a company that has bought DevOps tooling from one that has built platform capability.",
    before_label: "Before",
    after_label: "After capability is built",

    rows: [
      {
        before:
          "Deploys go through a change ticket and wait for a release window.",
        after:
          "Teams ship through a self-service pipeline with automated checks in front of it.",
      },
      {
        before:
          "Two or three people understand the deploy scripts. Everything queues behind them.",
        after:
          "Pipeline and infrastructure knowledge is distributed across the team.",
      },
      {
        before:
          "Infrastructure changes are made by hand, and drift is discovered during an incident.",
        after:
          "Infrastructure is defined as code, reviewed like application code, and drift is caught before it ships.",
      },
      {
        before:
          "An incident means paging whoever wrote the service, if they still work there.",
        after:
          "On-call runs on shared runbooks and observability that any rostered engineer can act on.",
      },
      {
        before:
          "Every environment is provisioned slightly differently from the last one.",
        after:
          "Environments are reproducible from the same templates, from local to production.",
      },
    ],

    note: "These are observable states, not projected metrics. Where a shift is achieved, and how quickly, depends on the starting baseline established in discovery.",
    cta_banner: [
      {
        variant: "light",
        eyebrow: "A DELIVERY PLATFORM COVERS THE WHOLE ORGANIZATION",
        heading:
          "Platform capability needs every team that ships, not just the platform team.",
        cta_text: "Browse DevOps Training Programs",
        cta_href: "/corporate-training",
      },
    ],
  },

  marquee: {
    eyebrow: "BUILT AGAINST YOUR STACK",

    heading: {
      highlight:
        "Programs are designed around what you already run, not a reference architecture we prefer.",
    },
    description:
      "If your stack is not listed, it is almost certainly still covered.",

    items: [
      "Kubernetes",
      "Docker",
      "Terraform",
      "Helm",
      "Jenkins",
      "GitHub Actions",
      "GitLab CI",
      "ArgoCD",
      "Prometheus",
      "Grafana",
      "AWS",
      "Azure",
      "Google Cloud",
      "Ansible",
      "Crossplane",
      "Backstage",
    ],

    disclaimer:
      "All names and marks shown are the property of their respective owners. Their appearance here indicates coverage in our training, not partnership, affiliation or endorsement.",
  },

  map_section: {
    heading_parts: [
      { text: "Why enterprises choose " },
      { text: "Edstellar ", is_italic: true },
      { text: "for DevOps." },
    ],

    description:
      "Edstellar is a corporate training provider delivering instructor-led DevOps programs to teams of every size, from a single squad to an entire engineering organisation, on-site, virtual, or blended, with programs built and led by practitioners.",
    image: {
      src: "/course/map1.png",
      alt: "Global delivery map",
    },

    stats: [
      {
        value: "10,000+",
        label: "Expert trainers",
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

  method: {
    lifecycle: {
      heading: [
        { text: "How a DevOps capability program, " },
        { text: "actually runs.", is_italic: true },
      ],

      description:
        "Every engagement runs the same five stages, from capability baseline through to the refresh cycle.",

      stages: [
        {
          number: "01",
          title: "Discover",
          description:
            "We meet your platform lead and L&D team to baseline what your engineers can actually do today, against the delivery pipeline you want to run.",
          timing: "WEEK 1–2",
        },
        {
          number: "02",
          title: "Design",
          description:
            "Programs are assembled against your stack, your cloud provider, and your existing pipeline, then trainers are shortlisted from the vetted bench.",
          timing: "WEEK 2–4",
        },
        {
          number: "03",
          title: "Deliver",
          description:
            "Closed-cohort instructor-led sessions in your language and timezone, with sandbox clusters and pipeline environments shipped alongside.",
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
          description: "Org design, succession planning and cultural change.",
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

  faqs: {
    title: {
      parts: [
        { text: "Questions enterprises ask " },
        { text: "before booking.", is_italic: true },
        { text: "" },
      ],
    },

    items: [
      {
        question: "Which roles and teams is this DevOps training built for?",
        answer:
          "Enterprise platform, infrastructure and SRE teams: DevOps engineers, platform engineers, SREs, cloud engineers, and application developers who need to work safely with the delivery pipeline. Programs are scoped separately for platform builders and for the teams who consume the platform.",
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
          "Yes. Each program is designed around your cloud provider, your existing pipeline tooling and your team's current level. Engagements begin with a discovery call to map roles and gaps before a trainer is shortlisted.",
      },
      {
        question: "How many people can attend one cohort?",
        answer:
          "Cohorts are sized to keep instructor-led sessions workable, typically from 5 trainees for a specialist team upwards. Large organisations run parallel cohorts across multiple locations rather than one oversized session.",
      },
      {
        question: "How do you vet DevOps trainers?",
        answer:
          "Every trainer passes a technical domain assessment, a live delivery evaluation by a senior practitioner, and reference checks from past corporate cohorts. Trainers are matched by stack alignment and geography, and you can request a trial session before committing.",
      },
      {
        question: "How is effectiveness measured?",
        answer:
          "Every cohort runs pre and post technical assessments to establish a measurable skills delta, benchmarked against role frameworks and shared in a post-program report.",
      },
      {
        question: "How do we choose a DevOps training provider?",
        answer:
          "Useful criteria are whether programs are designed around your stack rather than pulled from a catalogue, whether delivery is live and instructor-led, whether trainers are practitioners you can trial before committing, and whether outcomes are measured rather than assumed.",
      },
      {
        question: "Why group training rather than individual licences?",
        answer:
          "Group training aligns a whole team on the same deployment patterns, tooling and on-call practices. Individual licences produce uneven baselines. A shared baseline is also what an incident review can point back to.",
      },
    ],
  },

  related_domains: {
    heading: {
      parts: [
        { text: "Explore related " },
        { text: "training domains", is_italic: true },
        { text: "." },
      ],
    },

    description:
      "DevOps capability rarely sits alone. These categories are the ones enterprises most often build alongside it.",

    items: [
      {
        title: "Cloud Engineering Training",
        description:
          "Provisioning, networking and cost management across major cloud providers.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "Site Reliability Engineering Training",
        description:
          "SLOs, incident response, and operating production systems at scale.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "Cybersecurity Training",
        description:
          "Security programs for teams defending the systems the platform runs.",
        type: "Instructor-led",
        link: "View course",
        href: "#",
      },
      {
        title: "Artificial Intelligence Training",
        description:
          "Generative AI, machine learning, MLOps and governance for enterprise teams.",
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

  lead_form: {
    title: {
      parts: [
        { text: "Ask us about " },
        { text: "DevOps training", is_italic: true },
        { text: " for your teams." },
      ],
    },
    description:
      "Tell us which teams you are training and what they need to be able to do. Anything you filtered in the catalog comes through with your message.",
    sla_note:
      "We reply within one business day with a tailored proposal, no automated sales sequence.",
    pricing_href: "https://www.edstellar.com/corporate-training-pricing#table",
  },
};

export default devopsTraining;
