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
const CONTACT = { label: "Request a training proposal", href: "#contact", title: "Click here to request a corporate training proposal from Edstellar" };
const CATALOG = { label: "Browse the training catalog", href: "/corporate-training-catalog", title: "Click here to browse the full Edstellar corporate training catalog" };

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
    { value: "5,000+", label: "vetted trainers and coaches" },
    { value: "100+", label: "countries delivered in" },
  ],

  clients: {
    intro: "Corporate training clients include",
    names: "Microsoft, Amazon, Intel, Adobe, Visa, KPMG, Boston Consulting Group, Johnson & Johnson, ABB, Emerson, Bechtel, Regeneron, Uber, Autodesk, Cummins, Sandvik and Dayforce.",
    see: { label: "See all clients", href: "/clients", title: "Click here to see all Edstellar clients" },
  },

  top_programs: {
    id: "most-requested-programs",
    heading: "Most requested corporate training <span>programs.</span>",
    kicker: "The programs enterprise teams ask for most right now. Every one can be tailored to your roles, tools and level.",
    items: [
      { tag: "AI", label: "Generative AI", href: "/corporate-training/ai/generative-ai-course", title: "Click here to view the Generative AI training program" },
      { tag: "AI", label: "Agentic AI", href: "/corporate-training/ai/agentic-ai-course", title: "Click here to view the Agentic AI training program" },
      { tag: "AI", label: "Prompt & context engineering for enterprise teams", href: "/corporate-training/ai/prompt-context-engineering-for-enterprise-teams-course", title: "Click here to view the Prompt Engineering training program" },
      { tag: "AI", label: "AI governance", href: "/corporate-training/ai/ai-governance-course", title: "Click here to view the AI Governance training program" },
      { tag: "Leadership", label: "Leadership in the age of AI", href: "/corporate-training/leadership/leadership-in-the-age-of-ai-course", title: "Click here to view the Leadership in the Age of AI training program" },
      { tag: "Soft Skills", label: "Emotional intelligence at work", href: "/corporate-training/soft-skills/emotional-intelligence-at-work-course", title: "Click here to view the Emotional Intelligence training program" },
      { tag: "Leadership", label: "Transformational leadership", href: "/corporate-training/leadership/transformational-leadership-course", title: "Click here to view the Transformational Leadership training program" },
      { tag: "AI", label: "AI change management & workforce transformation", href: "/corporate-training/ai/ai-change-management-workforce-transformation-course", title: "Click here to view the AI Change Management training program" },
      { tag: "Leadership", label: "Executive communication & influence", href: "/corporate-training/leadership/executive-communication-influence-course", title: "Click here to view the Executive Communication training program" },
      { tag: "Soft Skills", label: "Collaboration in hybrid & AI-augmented teams", href: "/corporate-training/soft-skills/collaborative-intelligence-course", title: "Click here to view the Collaboration Skills training program" },
    ],
    cta_label: "View program",
  },

  definition: {
    id: "what-is-corporate-training",
    heading: "What is corporate <span>training?</span>",
    kicker: "A short answer, and when it is the right tool.",
    body: [
      "<strong>Corporate training</strong> is instructor-led learning that builds the job skills a business needs, for a defined group of employees. Good corporate training starts from a business goal, fits the roles in the room, and ends with people doing something new at work.",
      "Edstellar's corporate training services cover the full path: program choice, tailoring, trainer matching, delivery and evaluation. When the need is bigger than training, it plugs into our [capability development services](/).",
    ],
    fit_heading: "Corporate training is the right fit when",
    fit_items: [
      "You know the skill gap, or a training needs analysis has found it",
      "A group needs the same skills by a set date, such as a tool rollout",
      "Teams in several locations need one consistent program",
      "You want live practice with an expert, not self-paced content",
    ],
    fit_link: { match: "capability development services", href: "/", title: "Click here to view capability development services" },
  },

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
        link: { label: "Plan a team program", href: "#contact", title: "Click here to plan a targeted team training program" },
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
        link: { label: "Plan a multi-cohort program", href: "#contact", title: "Click here to plan a multi-cohort corporate training program" },
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
        link: { label: "Plan an academy", href: "#contact", title: "Click here to plan a workforce-wide training academy" },
      },
    ],
    managed: {
      lead: "Need training run for you all year?",
      text: "Our managed training services handle scheduling, suppliers and admin across your whole training calendar.",
      cta: { label: "Explore managed training services", href: "/managed-learning-services/managed-training", title: "Click here to explore Edstellar managed training services" },
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
    cta: { label: "Browse the full corporate training catalog", href: "/corporate-training-catalog", title: "Click here to browse the full Edstellar corporate training catalog" },
    microcopy: "See every program, outline and duration in one place.",
  },

  organization: {
    id: "by-organization",
    heading: "Employee training programs for every <span>level.</span>",
    intro: "Start from the people you need to train, or from the outcome you need. Every route goes to a live page.",
    lanes: [
      {
        title: "By role",
        items: [
          { label: "Executives and senior leaders", sub: "Strategy, executive communication, leading through AI", href: "/corporate-training/leadership", title: "Click here to view leadership training for executives" },
          { label: "People managers", sub: "Coaching, feedback, performance and change", href: "/corporate-training/leadership", title: "Click here to view training for people managers" },
          { label: "Technical and IT teams", sub: "AI, cloud, cybersecurity, data and DevOps", href: "/corporate-training/ai", title: "Click here to view training for technical and IT teams" },
          { label: "Sales and customer teams", sub: "Sales, negotiation and customer experience", href: "/corporate-training/sales", title: "Click here to view training for sales and customer teams" },
          { label: "All employees", sub: "Compliance, wellbeing, AI fluency and soft skills", href: "/corporate-training/soft-skills", title: "Click here to view training for all employees" },
        ],
      },
      {
        title: "By goal",
        items: [
          { label: "Find and rank skill gaps first", sub: "Training needs analysis", href: "/training-needs-analysis-services", title: "Click here to learn about training needs analysis" },
          { label: "Support leaders one to one", sub: "Coaching solutions", href: "/coaching-solutions", title: "Click here to learn about coaching solutions" },
          { label: "Run training at scale, all year", sub: "Managed training services", href: "/managed-learning-services/managed-training", title: "Click here to learn about managed training services" },
          { label: "Send one RFP for several services", sub: "RFP and tender responses", href: "/request-for-proposal", title: "Click here to send an RFP to Edstellar" },
          { label: "Serve a public sector workforce", sub: "Government training", href: "/government-employees-training-courses", title: "Click here to view government employee training" },
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
    footer_note: "Need more than training? See our [capability development services](/).",
    stages: [
      {
        name: "Assess",
        tagline: "Find the gap",
        links: [
          { label: "Training needs analysis", href: "/training-needs-analysis-services", title: "Click here to learn about training needs analysis" },
          { label: "Capability OS", href: null },
        ],
      },
      {
        name: "Analyze",
        tagline: "Prioritize",
        links: [
          { label: "Skills & proficiency assessment", href: "/talent-assessment-services/skills-proficiency-assessment", title: "Click here to learn about skills and proficiency assessment" },
          { label: "L&D consulting", href: "/learning-development-consulting-services", title: "Click here to learn about L&D consulting services" },
        ],
      },
      {
        name: "Architect",
        tagline: "Design the learning",
        links: [
          { label: "Learning content design", href: "/learning-development-consulting-services/learning-content-design-development", title: "Click here to learn about learning content design and development" },
        ],
      },
      {
        name: "Activate",
        tagline: "Deliver the training",
        current: true,
        links: [
          { label: "Corporate training programs", href: "/corporate-training-catalog", title: "Click here to browse corporate training programs" },
          { label: "Managed training services", href: "/managed-learning-services/managed-training", title: "Click here to learn about managed training services" },
          { label: "Coaching", href: "/coaching-solutions", title: "Click here to learn about coaching solutions" },
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

  trainers: {
    id: "corporate-trainers",
    heading: "5,000+ vetted corporate trainers, matched to your <span>brief.</span>",
    kicker: "Our trainers are working practitioners, not full-time lecturers. Each one is vetted before joining, and matched to your program on four points.",
    criteria: [
      { num: "01", title: "Subject depth", text: "Proven expertise in the exact topic and tools your team uses." },
      { num: "02", title: "Industry context", text: "Experience in your sector, so examples and cases fit your work." },
      { num: "03", title: "Language and region", text: "A trainer who speaks your teams' language and knows their market." },
      { num: "04", title: "Delivery fit", text: "Onsite or virtual experience at the level of your audience." },
    ],
    cta: { label: "Explore the trainer network", href: "/trainer-platform", title: "Click here to explore Edstellar's trainer network" },
  },

  pricing: {
    id: "corporate-training-pricing",
    heading: "How corporate training pricing <span>works.</span>",
    kicker: "Simple, license-based pricing. You pay for the training your teams actually attend, on any program, virtual or onsite.",
    license: {
      tag: "Trainee licenses",
      title: "One license = one trainee for one 8-hour training day.",
      text: "A half-day session uses half a license. Use licenses across any program in the catalog, for any team.",
      formula: [
        { value: "20 trainees", op: "×" },
        { value: "2 days", op: "=" },
        { value: "40 licenses", op: null },
      ],
      cta: { label: "See prices and packages", href: "/corporate-training-pricing", title: "Click here to view corporate training pricing and packages" },
    },
    factors: [
      { title: "Topic and level", text: "Specialist and advanced topics can need more preparation." },
      { title: "Cohorts and duration", text: "The number of groups and days in the program." },
      { title: "Delivery format", text: "Onsite delivery can add venue and trainer travel." },
      { title: "Tailoring", text: "From light adaptation to new content and exercises." },
      { title: "Labs and tools", text: "Software, licenses or practice environments, if needed." },
      { title: "Locations and languages", text: "Several countries or languages in one program." },
    ],
  },

  effectiveness: {
    id: "training-effectiveness",
    heading: "How we measure training <span>effectiveness.</span>",
    kicker: "You agree the measures when the program is designed, not after it ends. Most programs report on all four levels.",
    footer: "Confirm which levels are standard in every engagement versus available on request.",
    levels: [
      {
        level: "Level 1",
        title: "Reaction",
        text: "How participants rated the session, the trainer and the relevance to their job.",
        evidence: "Post-session survey",
      },
      {
        level: "Level 2",
        title: "Learning",
        text: "What people can now do, shown in knowledge checks, exercises and scenario tasks.",
        evidence: "Pre and post assessment",
      },
      {
        level: "Level 3",
        title: "Behavior",
        text: "Whether the new skills show up at work in the weeks after training.",
        evidence: "Manager observation, work samples, Orbit 360",
      },
      {
        level: "Level 4",
        title: "Results",
        text: "The business metric the program was meant to move, agreed before it starts.",
        evidence: "Your KPI, tracked with you",
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
