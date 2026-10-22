/**
 * Corporate Training hub (`/corporate-training`) — local copy; the CMS has
 * no page for it. The 77-domain list is NOT here: it comes from the CMS
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
const LIVE = "https://www.edstellar.com";
const CONTACT = { label: "Discuss Your Training Needs", href: "/contact-us" };
const CATALOG = { label: "Browse All Training Programs", href: "/corporate-training-catalog" };

export const CORPORATE_TRAINING_HUB = {
  seo: {
    title: "Corporate Training for Workforce Development",
    description:
      "Build workforce skills with Edstellar's corporate training, tailored to your business goals with expert trainers, customized programs and flexible delivery.",
    path: "/corporate-training",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Corporate Training", href: null },
  ],

  hero: {
    heading: "Corporate Training for Your <span>Workforce</span>",
    lede: "Build the skills your people need for the work ahead. Edstellar delivers more than 2,000 instructor-led corporate training programs across 77 domains, tailored to your roles and run onsite or virtually for a single team or a workforce-wide initiative.",
    definition:
      "Corporate training develops employees' job-related knowledge and skills around a business requirement. Start with a training domain, your type of organization, or the capability you want to build, and Edstellar shapes the engagement around your roles, learning goals, and delivery needs.",
    primary_cta: CONTACT,
    secondary_cta: { label: "Explore Training Programs", href: "#training-programs" },
    microcopy: "Share your business requirement, even if you haven't chosen a course.",
    image: {
      src: "https://media.edstellar.com/website_assets/onsite-instructor-led.webp",
      alt: "Illustration of an instructor guiding colleagues through a collaborative tabletop exercise in a bright office.",
      width: 1672,
      height: 941,
    },
    confidence: [
      { icon: "users", label: "2,000+ programs across 77 domains" },
      { icon: "presentation", label: "Trainers matched to your teams" },
      { icon: "sliders", label: "Onsite, virtual and hybrid delivery" },
    ],
  },

  proof: [
    { value: "2,000+", label: "instructor-led programs" },
    { value: "77", label: "training domains" },
    { value: "5,000+", label: "qualified trainers" },
    { value: "100+", label: "countries" },
    { value: "10+", label: "languages" },
    { value: "ISO", label: "9001:2015 and 27001:2022 certified" },
  ],

  services: {
    id: "training-services",
    heading: "Corporate Training Services Built Around <span>Your Business</span>",
    intro:
      "Your training requirement may be a focused skill gap, a new technology rollout, or a development priority across several functions. Edstellar brings program selection, customization, and delivery into one conversation, scoped to the work your teams need to do.",
    rows_labels: { best_for: "Best for", shapes: "Edstellar shapes", format: "Typical format" },
    starts_label: "Common starting points",
    items: [
      {
        kicker: "One team, one capability",
        title: "Targeted Team Training",
        description:
          "A focused program for a defined group, such as a technical team adopting a new tool, managers building essential people skills, or a project team aligning on a shared way of working.",
        best_for: "A single team or role group with one clear skill need",
        shapes: "Level, content, practice activities, and duration around the group's current experience",
        format: "Onsite or live virtual workshops for one cohort",
        starts: ["New tool rollout", "Manager essentials", "Team ways of working"],
        link: { label: "Plan a team program", href: "/contact-us" },
      },
      {
        kicker: "Many teams, one coordinated plan",
        title: "Multi-Cohort Capability Programs",
        description:
          "A broader program that runs across teams, locations, or career stages, combining shared foundations with training suited to each role so every cohort works toward relevant goals.",
        best_for: "Capability building across several functions, sites, or levels",
        shapes: "Cohort structure, program sequence, and delivery arrangements in one plan",
        format: "Blended onsite, virtual, and hybrid cohorts on a shared schedule",
        starts: ["Workforce-wide AI skills", "Leadership pipeline", "Multi-site rollouts"],
        link: { label: "Plan a capability program", href: "/contact-us" },
        dark: true,
      },
    ],
    managed: {
      lead: "Need training run for you on an ongoing basis?",
      text: "Edstellar's managed training services take care of scheduling, vendors, and administration across your whole training calendar.",
      cta: { label: "Explore Managed Training Services", href: "/managed-learning-services/managed-training" },
    },
  },

  programs: {
    id: "training-programs",
    heading: "Corporate Training Programs Across <span>77 Domains</span>",
    intro:
      "Edstellar offers more than 2,000 instructor-led corporate training programs across 77 domains, from artificial intelligence and cloud computing to leadership, sales, compliance and sustainability. Find your domain and go straight to its programs.",
    list_title: "All training domains",
    search_label: "Find a domain",
    search_placeholder: "Try cloud, sales or safety",
    empty: "No domain matches that search. [Tell Edstellar what your team needs](/contact-us) and a specialist will suggest the right program.",
    cta: { label: "Browse the Corporate Training Catalog", href: "/corporate-training-catalog" },
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
          { label: "Find and prioritize skill gaps", tag: "TNA", href: "/training-needs-analysis-solutions" },
          { label: "Run training at scale", tag: "Managed Training", href: "/managed-learning-services/managed-training" },
          { label: "Support leaders one to one", tag: "Coaching", href: "/coaching-solutions" },
        ],
      },
    ],
  },

  system: {
    id: "capability-system",
    heading: "Corporate Training Inside a Complete <span>Capability System</span>",
    intro:
      "Training is the Activate stage of Edstellar's 5A method. The stages around it make sure the right people learn the right skills and that the change lasts, so a training engagement can start from a diagnosis and continue into coaching, measurement and sustainment.",
    current_tag: "Corporate training",
    stages: [
      {
        name: "Assess",
        tagline: "Find the capability gap",
        links: [
          { label: "Training Needs Analysis", href: "/training-needs-analysis-solutions" },
          { label: "Talent Assessments", href: "/talent-assessment-services" },
          { label: "Capability Intelligence Platform", href: null },
        ],
      },
      {
        name: "Analyze",
        tagline: "Prioritize what matters",
        links: [
          { label: "Skill Gap & Competency Benchmarking", href: "/talent-assessment-services/skill-gap-competency-assessment" },
          { label: "Learning & Development Consulting", href: "/learning-development-consulting-services" },
        ],
      },
      {
        name: "Architect",
        tagline: "Design the learning",
        links: [
          { label: "Learning Strategy & Design", href: "/learning-development-consulting-services/learning-strategy-design" },
          { label: "Learning Content Design & Development", href: "/learning-development-consulting-services/learning-content-development" },
          { label: "Edstellar Academies", href: null },
        ],
      },
      {
        name: "Activate",
        tagline: "Deliver the training",
        current: true,
        links: [
          { label: "Corporate training programs", href: "/corporate-training-catalog" },
          { label: "Instructor-Led Training", href: `${LIVE}/instructor-led-training-services` },
          { label: "Coaching", href: "/coaching-solutions" },
          { label: "Managed Training Services", href: "/managed-learning-services/managed-training" },
        ],
      },
      {
        name: "Advance",
        tagline: "Sustain and measure",
        links: [
          { label: "Learning Governance, Analytics & ROI", href: null },
          { label: "Learning Engagement & Sustainment", href: null },
          { label: "Spectra LMS", href: null },
        ],
      },
    ],
  },

  approach: {
    id: "our-approach",
    heading: "How Edstellar Designs and Delivers <span>Your Training</span>",
    intro:
      "Relevant learning starts with a clear requirement. We work with your team to connect the business need, the learning content, and the delivery plan.",
    steps: [
      {
        tab: "Define",
        title: "Define the Business and Learning Goals",
        text: "Share the target roles, current experience, and the tasks people should perform after training. Edstellar turns these into clear learning priorities and success measures. When skill gaps are not yet clear, a [training needs analysis](/training-needs-analysis-solutions) identifies them first.",
      },
      {
        tab: "Adapt",
        title: "Adapt the Program to Your Teams",
        text: "Edstellar adapts topics, level, examples, and exercises to your working context, so practice mirrors the conversations and tasks your people handle every day.",
      },
      {
        tab: "Deliver",
        title: "Match Trainers and Coordinate Delivery",
        text: "Edstellar matches trainers to your subject, audience, and goals, then coordinates schedules, materials, and logistics across every cohort and location.",
      },
      {
        tab: "Assess",
        title: "Assess Progress and Plan Application",
        text: "Knowledge checks, practical exercises, and scenario-based tasks show what participants can do. Edstellar then helps you plan how the learning is applied at work.",
      },
    ],
    cta: CONTACT,
  },

  delivery: {
    id: "training-delivery",
    heading: "Training Delivery for Onsite and Distributed <span>Teams</span>",
    intro:
      "Choose delivery around the learning activities and the people taking part. Edstellar runs onsite, live virtual, hybrid, and offsite training for teams in more than 100 countries and in 10+ languages, planned around your locations, time zones, and dates.",
    labels: { best_for: "Best for", planning: "Planning covers" },
    items: [
      {
        tab: "Onsite",
        title: "Onsite Instructor-Led Training",
        image: {
          src: "https://media.edstellar.com/website_assets/onsite-instructor-led.webp",
          alt: "Illustration of an instructor guiding colleagues through a collaborative tabletop exercise in a bright office.",
        },
        text: "Face-to-face training at your workplace, built around the tools, spaces, and shared tasks your team uses every day.",
        best_for: "Hands-on practice and team alignment",
        planning: "Venue, equipment, labs, schedules, trainer travel",
      },
      {
        tab: "Virtual",
        title: "Live Virtual Training",
        image: {
          src: "https://media.edstellar.com/website_assets/live-virtual.webp",
          alt: "Illustration of a learner joining a live instructor-led video session with a notebook beside her laptop.",
        },
        text: "Live online sessions with an instructor, so distributed teams can ask questions and work through guided activities without travel.",
        best_for: "Teams spread across sites and time zones",
        planning: "Time zones, session length, platform access, practice environments",
      },
      {
        tab: "Hybrid & offsite",
        title: "Hybrid and Offsite Options",
        image: {
          src: "https://media.edstellar.com/website_assets/offsite.webp",
          alt: "Illustration of colleagues discussing leadership ideas at an offsite meeting room overlooking trees and water.",
        },
        text: "Combine in-person and virtual sessions, or take the group off site for leadership and team programs that need space to reflect.",
        best_for: "Mixed locations and leadership programs",
        planning: "Session structure, venue, travel arrangements",
      },
    ],
  },

  reasons: {
    id: "why-edstellar",
    heading: "Why Organizations Choose <span>Edstellar</span>",
    intro:
      "Edstellar is a capability transformation partner. Corporate training is where most organizations start, backed by the diagnosis, design, and measurement that turn training into lasting capability.",
    feature: {
      mark: "5A",
      title: "One Partner From Diagnosis to Delivery",
      text: "Training needs analysis, program design, delivery, coaching, and measurement sit with one team, so your L&D and business leaders work from one plan and one point of contact.",
      stages: ["Assess", "Analyze", "Architect", "Activate", "Advance"],
      current: "Activate",
    },
    items: [
      {
        mark: "5,000+",
        title: "Trainers Matched to Your Requirement",
        text: "Edstellar matches each engagement to trainers with the subject expertise and practical experience your audience needs, based on the roles, tools, and goals in your brief.",
      },
      {
        mark: "100+",
        title: "Global Delivery in 10+ Languages",
        text: "Edstellar delivers onsite and virtual training in more than 100 countries, scheduled across your teams' time zones and languages.",
      },
      {
        mark: "ISO",
        title: "Certified Quality and Information Security",
        text: "Edstellar is certified to ISO 9001:2015 for quality management and ISO 27001:2022 for information security, so your training data and delivery follow audited processes.",
      },
    ],
  },

  faqs: {
    id: "faqs",
    heading: "Corporate Training <span>FAQs</span>",
    items: [
      {
        question: "How many corporate training programs does Edstellar offer?",
        answer:
          "Edstellar offers more than 2,000 instructor-led corporate training programs across 77 domains, from artificial intelligence, cloud computing and cybersecurity to leadership, sales, compliance and sustainability. Browse the domains on this page or the full corporate training catalog.",
      },
      {
        question: "Can you tailor corporate training to our roles and business context?",
        answer:
          "Yes. Tailoring can include selecting topics, adjusting the level, and adapting examples or exercises to the work participants do. Share your team's roles, current experience, tools, and learning goals. The amount of adaptation is agreed during scoping, from changes to an existing program to more extensive content development. Any required materials, licenses, or practice environments are also identified at that stage.",
      },
      {
        question: "Can we combine training across several skill areas or teams?",
        answer:
          "Yes. A broader requirement can be planned across skill areas and cohorts, with content suited to each audience. Start with the business priorities and the groups involved, then establish the program sequence, delivery arrangements, and evaluation needs. If you also need ongoing administration or coordination across training vendors, our managed training services address that wider operational scope.",
      },
      {
        question: "How do you select a trainer for our team?",
        answer:
          "Trainer matching starts with the subject, learning objectives, and participant profile. Relevant practical experience and the context in which your team will use the skills inform the match. Include any specialist knowledge, tool experience, language needs, or qualification requirements in your brief. Discuss any additional trainer-review requirements during scoping so they can be considered for the engagement.",
      },
      {
        question: "Can you deliver training across our locations and time zones?",
        answer:
          "Yes. Edstellar delivers corporate training in more than 100 countries and in 10+ languages, onsite, live virtual, or hybrid, with sessions scheduled across your teams' time zones. Edstellar reviews the topic, participant locations, language, and dates to build a delivery plan that keeps every cohort on the same program.",
      },
      {
        question: "How will we evaluate learning and workplace application?",
        answer:
          "Agree the evaluation approach when defining the program. Assessments can examine knowledge or demonstrated skills; workplace application requires evidence from the job, such as work samples or manager observations. Follow-up measurement depends on agreed responsibilities, access to data, and time to apply the learning. Edstellar agrees the assessments and reporting with you when the program is designed, and its learning governance and analytics consulting covers longer-term measurement.",
      },
      {
        question: "What affects the cost and timeline of a corporate training program?",
        answer:
          "Key factors include the topic, learning level, number and structure of cohorts, training duration, delivery format, locations, and customization required. Trainer availability and preparation needs also influence scheduling. Labs, software, travel, and follow-up support may affect the scope and cost. Share your target dates and budget parameters so these can inform the discussion and the proposal's assumptions.",
      },
    ],
    closing: {
      text: "Give your team a clear next step in its development. Share your training requirement, including the roles, team size, locations, and timing, and Edstellar will shape a program around it.",
      primary_cta: CONTACT,
      secondary_cta: CATALOG,
    },
  },
};
