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
 * Domain content: Soft Skills Training.
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
const softSkillsTraining = {
  slug: "soft-skills-training",

  name: "Soft Skills Training",

  seo: {
    meta_title: "Corporate Soft Skills Training",
    Meta_description:
      "Instructor-led corporate soft skills training across communication, collaboration, email etiquette and workplace professionalism. Scoped to your teams, delivered onsite or virtually in 100+ countries.",
    og_image_url: null,
  },

  hero: {
    heading: "Corporate <span>Soft Skills</span> Training",

    subhead: "Build the habits that make every other skill land.",

    intro_text:
      "We build soft skills capability inside enterprises: the communication, collaboration and professionalism habits that let technical and non-technical teams work well together. Instructor-led programs across communication, email etiquette, teamwork and workplace professionalism are how we do it, scoped to your teams and delivered wherever they are.",

    meta: DELIVERY_META,
    media: {
      image: null,
      video: "/category/Home-Animation.mp4",
      alt: "A team collaborating in a workplace training session",
    },

    actions: [
      {
        label: "Browse Soft Skills programs",
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
      label: "Professional Development",
      href: "/corporate-training",
    },
    {
      label: "Soft Skills",
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
      { id: "stack", label: "Programs", active: false },
      { id: "trainers", label: "Trainers", active: false },
      { id: "why-edstellar", label: "Proof", active: false },
      { id: "faqs", label: "FAQ", active: false },
    ],
  },

  about: {
    heading: "What is corporate <span>soft skills training</span>?",

    body: [
      "Corporate soft skills training is instructor-led group training that builds an organisation's communication, collaboration and workplace professionalism. It covers areas like written and verbal communication, email etiquette, teamwork and cross-functional collaboration. Programs are scoped to an employer's teams and delivered to a closed cohort rather than sold as individual seats.",
    ],
    expanded_body: [
      "The distinction that matters commercially is between individual habit and team norm. A single course gives one person a skill; group training gives a whole team the same shared standard for how they write, present and collaborate — which is what actually changes day-to-day work.",
      "Programs typically split by function: teams that interface heavily with clients or other departments, and specialist teams for whom communication is a secondary skill they still need to be reliable at.",
    ],
    cta_banner: [
      {
        variant: "light",
        eyebrow: "PROFESSIONALISM AT SCALE",
        heading: "Give every team the same communication standard.",
        cta_text: "Upskill Your Teams with Soft Skills Training Programs",
        cta_href: "/corporate-training",
      },
    ],
  },

  card: {
    heading: "Capability is an <span>organisational</span> state, not a set of certificates.",

    description:
      "Individual skills are the input. What a board can actually see is the change in how the organisation communicates and works together. These are the shifts that separate a company that has bought soft skills content from one that has built the habit.",
    before_label: "Before",
    after_label: "After capability is built",

    rows: [
      {
        before:
          "Emails and messages read differently depending on who wrote them, and tone causes friction across teams.",
        after:
          "A shared, agreed standard for written communication travels with every team.",
      },
      {
        before:
          "Meetings run long and decisions get lost because nobody owns facilitation.",
        after:
          "Meetings run to a structure the whole team recognises and can facilitate.",
      },
      {
        before:
          "Feedback is avoided or delivered badly, and small issues become large ones.",
        after:
          "Feedback is given directly and received without defensiveness, as a matter of habit.",
      },
      {
        before:
          "Cross-functional handoffs rely on whoever happens to be good at explaining things.",
        after:
          "Handoffs follow a consistent communication pattern regardless of who is involved.",
      },
    ],

    note: "These are observable states, not projected metrics. Where a shift is achieved, and how quickly, depends on the starting baseline established in discovery.",
    cta_banner: [
      {
        variant: "light",
        eyebrow: "COMMUNICATION IS A TEAM SPORT",
        heading: "A shared standard needs the whole team trained together, not one person.",
        cta_text: "Browse Soft Skills Training Programs",
        cta_href: "/corporate-training",
      },
    ],
  },

  map_section: {
    heading: "Why enterprises choose <span>Edstellar </span>for soft skills.",

    description:
      "Edstellar is a corporate training provider delivering instructor-led soft skills programs to teams of every size, from a single squad to an entire organisation, on-site, virtual, or blended, with programs built and led by practitioners.",
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
      heading: "How a soft skills capability program, <span>actually runs.</span>",

      description:
        "Every engagement runs the same five stages, from capability baseline through to the refresh cycle.",

      stages: [
        {
          number: "01",
          title: "Discover",
          description:
            "We meet your L&D team to baseline how your teams currently communicate and where friction actually shows up day to day.",
          timing: "WEEK 1–2",
        },
        {
          number: "02",
          title: "Design",
          description:
            "Programs are assembled against your team's function, seniority mix and communication channels, then trainers are shortlisted from the vetted bench.",
          timing: "WEEK 2–4",
        },
        {
          number: "03",
          title: "Deliver",
          description:
            "Closed-cohort instructor-led sessions in your language and timezone, with role-play, real writing samples and live practice built in.",
          timing: "SCHEDULED TO YOUR CALENDAR",
          active: true,
        },
        {
          number: "04",
          title: "Assess",
          description:
            "Pre and post assessments establish a measurable change in capability, benchmarked against role expectations.",
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
    heading: "Questions enterprises ask <span>before booking.</span>",

    items: [
      {
        question: "Which roles and teams is this soft skills training built for?",
        answer:
          "Any team where communication, collaboration or professionalism affects the work — client-facing teams, cross-functional teams, and specialist teams who need reliable written and verbal communication as a secondary skill.",
      },
      {
        question: "How is the training delivered?",
        answer:
          "Instructor-led and live, as a closed cohort for your team, on-site or virtually. There are no self-paced or recorded modules. You choose the format, location, language and schedule.",
      },
      {
        question: "What is the difference between ILT and VILT?",
        answer:
          "ILT is instructor-led training delivered in person, with a trainer at your premises. VILT is the live online equivalent, run in real time rather than recorded. Both include practice exercises and live interaction with the trainer. The choice is driven by location and logistics, not by depth of content.",
      },
      {
        question: "Can programs be customised to our teams?",
        answer:
          "Yes. Each program is designed around your team's function, seniority mix and the communication channels they actually use. Engagements begin with a discovery call to map current habits and gaps before a trainer is shortlisted.",
      },
      {
        question: "How many people can attend one cohort?",
        answer:
          "Cohorts are sized to keep instructor-led sessions workable, typically from 5 trainees for a specialist team upwards. Large organisations run parallel cohorts across multiple locations rather than one oversized session.",
      },
      {
        question: "How do you vet soft skills trainers?",
        answer:
          "Every trainer passes a delivery evaluation by a senior reviewer and reference checks from past corporate cohorts. Trainers are matched by function and geography, and you can request a trial session before committing.",
      },
      {
        question: "How is effectiveness measured?",
        answer:
          "Cohorts run pre and post assessments to establish a measurable change in habits and confidence, benchmarked against role expectations and shared in a post-program report.",
      },
      {
        question: "Why group training rather than individual courses?",
        answer:
          "Group training gives a whole team the same shared standard for how they write, present and collaborate. Individual courses produce uneven habits that don't reinforce each other day to day.",
      },
    ],
  },

  related_domains: {
    heading: "Explore related <span>training domains</span>.",

    description:
      "Soft skills rarely sit alone. These categories are the ones enterprises most often build alongside it.",

    items: [
      {
        title: "DevOps Training",
        description:
          "Platform engineering, CI/CD, infrastructure as code and site reliability.",
        type: "Instructor-led",
        link: "View course",
        href: "/corporate-training/devops-training",
      },
      {
        title: "Artificial Intelligence Training",
        description:
          "Generative AI, machine learning, MLOps and governance for enterprise teams.",
        type: "Instructor-led",
        link: "View course",
        href: "/corporate-training/artificial-intelligence",
      },
      {
        title: "Leadership Training",
        description:
          "People management, delegation and decision-making for new and existing managers.",
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
    heading: "Ask us about <span>soft skills training</span> for your teams.",
    description:
      "Tell us which teams you are training and what they need to be able to do. Anything you filtered in the catalog comes through with your message.",
    sla_note:
      "We reply within one business day with a tailored proposal, no automated sales sequence.",
    pricing_href: "https://www.edstellar.com/corporate-training-pricing#table",
  },
};

export default softSkillsTraining;
