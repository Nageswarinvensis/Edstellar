/**
 * Corporate Training hub (`/corporate-training`) — local copy; the CMS has
 * no page for it. The domain list is NOT here: it comes from the CMS
 * sitemap API (`lib/content/training-catalog.js`), so every domain link is
 * a page that exists.
 *
 * Headings mark their italic phrase with `<span>`. Paragraphs may carry an
 * inline link as `[label](href)`. Icon names map to lucide icons in
 * `components/sections/corporate_training_hub/parts.jsx`. A link with
 * `href: null` renders as "Coming soon" (the design marks those pages as
 * not yet built). Links to pages this site does not have yet keep their
 * live-site URL.
 *
 * Design: `Edstellar-New-Lanch SETUP/Edstellar_Corporate_Training_Hub 6.html`.
 */
const CONTACT = { label: "Request a training proposal", href: "#contact" };
const CATALOG = { label: "Browse the training catalog", href: "/corporate-training-catalog" };

export const CORPORATE_TRAINING_HUB = {
  seo: {
    // The root layout's title template adds " | Edstellar".
    title: "Corporate Training Services Company",
    description:
      "Edstellar is a global corporate training services company offering 2,000+ instructor-led programs, delivered onsite or virtually in 100+ countries.",
    path: "/corporate-training",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Corporate Training", href: null },
  ],

  hero: {
    heading: "Corporate Training Services Company for <span>Global Enterprises</span>",
    lede: "Edstellar is a corporate training company for global enterprises. We deliver 2,000+ instructor-led corporate training programs across 76 domains, tailored to your roles and run onsite or virtually.",
    definition:
      "Train one team or the whole workforce. Start with a domain, a role or a business goal, and we shape the program, the trainer and the delivery plan around it.",
    primary_cta: CONTACT,
    secondary_cta: CATALOG,
    microcopy: "Share your requirement, even if you haven't chosen a course.",
    image: {
      src: "https://media.edstellar.com/website_assets/onsite-instructor-led.webp",
      alt: "Illustration of an instructor guiding colleagues through a collaborative tabletop exercise in a bright office.",
      width: 1672,
      height: 941,
    },
    confidence: [
      { icon: "monitor", label: "2,000+ programs" },
      { icon: "layers", label: "76 domains" },
      { icon: "users", label: "5,000+ vetted trainers" },
      { icon: "pin", label: "100+ countries" },
      { icon: "languages", label: "10+ languages" },
      { icon: "shield", label: "ISO 9001 & 27001" },
    ],
  },

  proof: [
    { value: "2,000+", label: "instructor-led programs" },
    { value: "76", label: "training domains" },
    { value: "5,000+", label: "qualified trainers" },
    { value: "100+", label: "countries" },
    { value: "10+", label: "languages" },
    { value: "ISO", label: "9001:2015 and 27001:2022 certified" },
  ],

  services: {
    id: "training-services",
    heading: "Corporate training services built around your <span>business.</span>",
    intro:
      "Your need may be one skill gap, a technology rollout or a priority across several functions. We bring program choice, tailoring and delivery into one conversation.",
    starts_label: "Common starting points",
    items: [
      {
        kicker: "01 · One team, one skill",
        title: "Targeted team training",
        description:
          "A focused program for one group, such as a technical team adopting a new tool or managers building core people skills.",
        bullets: [
          "One team or role group",
          "Level and exercises set to the group's experience",
          "Onsite or live virtual, one cohort",
        ],
        starts: ["New tool rollout", "Team ways of working"],
        link: { label: "Plan a team program", href: "#contact" },
      },
      {
        kicker: "02 · Many teams, one plan",
        title: "Multi-cohort training programs",
        description:
          "One coordinated program across teams, sites or career stages, with shared foundations and role-specific modules.",
        bullets: [
          "Several functions, sites or levels",
          "Cohort plan, sequence and logistics in one schedule",
          "Onsite, virtual and blended cohorts",
        ],
        starts: ["Regional rollout", "Role-based curriculum"],
        link: { label: "Plan a multi-cohort program", href: "#contact" },
      },
      {
        kicker: "03 · The whole workforce",
        title: "Workforce-wide academies",
        description:
          "A long-running academy for one priority skill set, such as AI fluency or leadership, with tracks for every level.",
        bullets: [
          "Tracks from all-staff to specialist",
          "Assessments before and after each track",
          "Runs across the year, in many languages",
        ],
        starts: ["AI academy", "Leadership academy"],
        link: { label: "Plan an academy", href: "#contact" },
      },
    ],
    managed: {
      lead: "Need training run for you all year?",
      text: "Our managed training services handle scheduling, suppliers and admin across your whole training calendar.",
      cta: { label: "Explore managed training services", href: "/managed-learning-services/managed-training" },
    },
  },

  programs: {
    id: "training-programs",
    heading: "Corporate training programs across <span>76 domains.</span>",
    intro:
      "More than 2,000 instructor-led programs, from artificial intelligence and cloud to leadership, sales, compliance and sustainability. Find your domain and go straight to its programs.",
    list_title: "All training domains",
    search_label: "Find a domain",
    search_placeholder: "Filter 76 domains, e.g. data, safety, SAP",
    empty: "No domain matches that search. [Tell Edstellar what your team needs](/contact-us) and a specialist will suggest the right program.",
    cta: { label: "Browse the full corporate training catalog", href: "/corporate-training-catalog" },
    microcopy: "See every program, outline and duration in one place.",
  },

  organization: {
    id: "by-organization",
    heading: "Corporate Training Shaped to <span>Your Organization</span>",
    intro:
      "Start from the kind of organization you are, the industry you work in, or the outcome you need. Each route leads to a page built for that starting point.",
    coming_soon: "Coming soon",
    lanes: [
      {
        icon: "building",
        title: "Who you are",
        kicker: "Organization type",
        items: [
          { label: "Enterprise corporate training", href: null },
          { label: "Mid-market corporate training", href: null },
          { label: "Small and medium business training", href: null },
          { label: "Government and public sector", href: "/government-employees-training-courses" },
          { label: "Educational institutions", href: "/training-for-universities" },
        ],
        more: { label: "All organizations Edstellar serves", href: "/who-we-serve" },
      },
      {
        icon: "factory",
        title: "Where you work",
        kicker: "Industry",
        items: [
          { label: "Manufacturing", href: null },
          { label: "Automotive", href: null },
          { label: "Banking and financial services", href: null },
          { label: "More industries", href: null },
        ],
        more: { label: "Industries Edstellar serves", href: "/who-we-serve" },
      },
      {
        icon: "target",
        title: "What you need",
        kicker: "Goal",
        highlight: true,
        items: [
          { label: "Build AI capability across the workforce", tag: "AI Academy", href: null },
          { label: "Develop leaders at every level", tag: "Leadership Academy", href: null },
          { label: "Find and prioritize skill gaps", tag: "TNA", href: "/training-needs-analysis-services" },
          { label: "Run training at scale", tag: "Managed Training", href: "/managed-learning-services/managed-training" },
          { label: "Support leaders one to one", tag: "Coaching", href: "/coaching-solutions" },
        ],
      },
    ],
  },

  system: {
    id: "capability-system",
    heading: "Corporate training inside a complete capability <span>system.</span>",
    intro:
      "Training is the Activate step of Edstellar's 5A method. The steps around it make sure the right people learn the right skills, and that the change lasts.",
    current_tag: "Corporate training",
    footer_note: "Need more than training? See our [capability development services](/platforms/capability-os).",
    stages: [
      {
        name: "Assess",
        tagline: "Find the gap",
        links: [
          { label: "Training needs analysis", href: "/training-needs-analysis-services" },
          { label: "Capability OS", href: null },
        ],
      },
      {
        name: "Analyze",
        tagline: "Prioritize",
        links: [
          { label: "Skills & proficiency assessment", href: "/talent-assessment-services/skills-proficiency-assessment" },
          { label: "L&D consulting", href: "/learning-development-consulting-services" },
        ],
      },
      {
        name: "Architect",
        tagline: "Design the learning",
        links: [
          { label: "Learning content design", href: "/learning-development-consulting-services/learning-content-design-development" },
        ],
      },
      {
        name: "Activate",
        tagline: "Deliver the training",
        current: true,
        links: [
          { label: "Corporate training programs", href: "/corporate-training-catalog" },
          { label: "Managed training services", href: "/managed-learning-services/managed-training" },
          { label: "Coaching", href: "/coaching-solutions" },
        ],
      },
      {
        name: "Advance",
        tagline: "Sustain and measure",
        links: [
          { label: "Orbit 360 feedback", href: null },
          { label: "Spectra LMS", href: null },
        ],
      },
    ],
  },

  approach: {
    id: "our-approach",
    heading: "How our corporate training services <span>work.</span>",
    intro:
      "Good training starts with a clear requirement. We connect the business need, the content and the delivery plan.",
    steps: [
      {
        tab: "Goals",
        title: "Set the business and learning goals.",
        text: "Share the target roles, current experience, and the outcomes people should reach. Edstellar turns these into clear learning priorities and success measures. When gaps are not yet clear, a training needs analysis identifies them first.",
      },
      {
        tab: "Tailor",
        title: "Fit the program to your teams.",
        text: "Topics, level, examples, and exercises are adapted to your working context, so practice mirrors the conversations and tasks your people handle every day.",
      },
      {
        tab: "Deliver",
        title: "Match trainers and run delivery.",
        text: "Trainers are matched to your subject, audience, and goals. Schedules, materials, and logistics are coordinated across every cohort and location.",
      },
      {
        tab: "Apply",
        title: "Check progress and plan application.",
        text: "Knowledge checks, practical exercises, and scenario tasks show what participants can do. Edstellar then helps you plan how the learning is applied at work.",
      },
    ],
    cta: CONTACT,
  },

  delivery: {
    id: "training-delivery",
    heading: "Onsite and virtual corporate training, wherever your teams <span>work.</span>",
    intro:
      "We run onsite, live virtual, blended and offsite training in 100+ countries and 10+ languages, planned around your locations, time zones and dates.",
    labels: { best_for: "Best for", planning: "We plan" },
    languages: ["English", "Spanish", "Mandarin", "German", "Arabic", "Portuguese", "French", "Japanese", "Italian", "Hindi"],
    items: [
      {
        tab: "Onsite",
        title: "Onsite instructor-led training",
        image: {
          src: "https://media.edstellar.com/website_assets/onsite-instructor-led.webp",
          alt: "Illustration of an instructor guiding colleagues through a collaborative tabletop exercise in a bright office.",
        },
        text: "Face-to-face training at your workplace, built around the tools, spaces and tasks your team uses every day.",
        best_for: "Hands-on practice and team alignment",
        planning: "Venue, equipment, labs, trainer travel",
      },
      {
        tab: "Virtual",
        title: "Live virtual training",
        image: {
          src: "https://media.edstellar.com/website_assets/live-virtual.webp",
          alt: "Illustration of a learner joining a live instructor-led video session with a notebook beside her laptop.",
        },
        text: "Live online sessions with an instructor, so teams across sites can ask questions and practice without travel.",
        best_for: "Teams across sites and time zones",
        planning: "Time zones, session length, platform access",
      },
      {
        tab: "Blended & offsite",
        title: "Blended and offsite programs",
        image: {
          src: "https://media.edstellar.com/website_assets/offsite.webp",
          alt: "Illustration of colleagues discussing leadership ideas at an offsite meeting room overlooking trees and water.",
        },
        text: "Mix in-person and virtual sessions, or take leaders off site for programs that need space to reflect.",
        best_for: "Multi-site rollouts and leadership programs",
        planning: "Session plan, venue, travel",
      },
    ],
  },

  reasons: {
    id: "why-edstellar",
    heading: "Why enterprises choose Edstellar as their corporate training <span>provider.</span>",
    intro:
      "Corporate training is where most clients start with Edstellar. It is backed by the diagnosis, design and measurement that turn training into lasting capability.",
    items: [
      {
        icon: "Users",
        title: "Trainers matched to your requirement",
        text: "Every engagement gets trainers with the subject depth, industry context and language your audience needs.",
      },
      {
        icon: "FileText",
        title: "Tailored, not off the shelf",
        text: "Topics, level, examples and exercises fit your roles and tools, from light adaptation to new content.",
      },
      {
        icon: "Globe",
        title: "Global delivery in 10+ languages",
        text: "Onsite and virtual training in 100+ countries, scheduled across your teams' time zones.",
      },
      {
        icon: "Link",
        title: "One partner from diagnosis to delivery",
        text: "Training needs analysis, design, delivery, coaching and measurement sit with one team and one point of contact.",
      },
      {
        icon: "List",
        title: "Procurement-ready",
        text: "We answer RFPs, RFQs and tenders in one integrated proposal within 15 working days of clarifications.",
      },
      {
        icon: "ShieldCheck",
        title: "Certified quality and security",
        text: "ISO 9001:2015 for quality management and ISO 27001:2022 for information security.",
      },
    ],
  },

  faqs: {
    id: "faqs",
    heading: "Corporate Training <span>FAQs</span>",
    items: [
      {
        question: "What is corporate training?",
        answer:
          "Corporate training is instructor-led learning that builds the job skills a business needs, for a defined group of employees. It starts from a business goal, is tailored to the roles taking part, and is measured by what people do differently at work.",
      },
      {
        question: "How many corporate training programs does Edstellar offer?",
        answer:
          "Edstellar offers 2,000+ instructor-led corporate training programs across 76 domains, from AI, cloud and cybersecurity to leadership, sales, compliance and sustainability. See the full corporate training catalog",
        answer_links: [
          { text: "corporate training catalog", href: "/corporate-training-catalog", title: "Browse the full corporate training catalog" },
        ],
      },
      {
        question: "Can you tailor corporate training to our roles?",
        answer:
          "Yes. We can select topics, adjust the level, and adapt examples and exercises to your work. Share the roles, experience, tools and goals. The amount of tailoring is agreed during scoping, from small changes to new content.",
      },
      {
        question: "How do you choose a trainer for our team?",
        answer:
          "We match trainers on subject depth, industry context, language and delivery experience. Add any tools, certifications or language needs to your brief, and tell us if you want to review profiles first.",
      },
      {
        question: "Can you deliver training across our locations and time zones?",
        answer:
          "Yes. Edstellar delivers training in 100+ countries and 10+ languages, onsite, live virtual or blended, with sessions scheduled across your teams' time zones so every cohort follows the same program.",
      },
      {
        question: "How do you measure the impact of corporate training?",
        answer:
          "We agree the measures when the program is designed. That can include participant feedback, pre and post assessments, evidence of new skills at work, and the business metric the program should move.",
      },
      {
        question: "How much does corporate training cost?",
        answer:
          "Edstellar prices corporate training by trainee license: one license covers one trainee for one 8-hour training day. The total depends on the topic, number of cohorts, duration, format, locations and tailoring. See corporate training pricing",
        answer_links: [
          { text: "corporate training pricing", href: "/corporate-training-pricing", title: "View corporate training pricing" },
        ],
      },
      {
        question: "Do you respond to RFPs and tenders?",
        answer:
          "Yes. Edstellar answers RFPs, RFQs, government tenders and procurement portals with one integrated proposal, within 15 working days of clarifications. Send your RFP.",
        answer_links: [
          { text: "Send your RFP", href: "#contact", title: "Send your RFP to Edstellar" },
        ],
      },
      {
        question: "What is the difference between corporate training and managed training services?",
        answer:
          "Corporate training delivers specific programs for your teams. Managed training services run your whole training operation, including scheduling, suppliers and learner support, to agreed service levels.",
        answer_links: [
          { text: "Managed training services", href: "/managed-learning-services/managed-training", title: "Learn about managed training services" },
        ],
      },
    ],
    closing: {
      text: "Give your team a clear next step in its development. Share your training requirement, including the roles, team size, locations, and timing, and Edstellar will shape a program around it.",
      primary_cta: CONTACT,
      secondary_cta: CATALOG,
    },
  },

  form: {
    id: "contact",
    heading: "Request a corporate training <span>proposal.</span>",
    description: "Share the roles, team size, locations and timing. Edstellar will shape a program around it.",
    bullets: [
      "Program options and an outline for your teams",
      "Trainer profiles matched to your brief",
      "Format, schedule and license count",
    ],
    rfp_note: "Running a formal tender?",
    rfp_cta: { label: "Send us your RFP", href: "/request-for-proposal", title: "Send your RFP to Edstellar" },
    message_label: "Training topic or domain",
    message_placeholder: "e.g. Generative AI for managers, or \"not sure yet\"",
    submit_label: "Request a proposal",
  },
};
