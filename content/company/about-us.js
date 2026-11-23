/**
 * About Us (`/about-us`) — local content; the CMS has no `about-us` page.
 * Headings mark their italic phrase with `<span>`. Icon names map to lucide
 * icons in `components/sections/about/icons.js`. Links point at this site's
 * own routes; the few pages it does not have yet keep their live-site URL.
 *
 * Design: `Edstellar-New-Lanch SETUP/about-us 59.html`.
 */
import { CLIENT_LOGOS } from "@/content/company/client-logos";

const CONSULTATION = { label: "Book a consultation", href: "#contact", title: "Click here to book a consultation" };

export const ABOUT_US = {
  seo: {
    title: "About Edstellar | Learning & Development Solutions Company",
    description:
      "Edstellar is a learning and development solutions company for growing businesses worldwide. Meet the team, our story, values and 5A method, in 100+ countries.",
    path: "/about-us",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "About Us", href: null },
  ],

  hero: {
    heading: "About <span>Edstellar</span>",
    entity_line: "A learning and development solutions company for growing businesses, worldwide.",
    description:
      "Most growing companies don't have a full L&D team. We give them one: L&D and OD consulting, assessments, corporate training, coaching and our own platforms from one partner, sized to each company's stage and delivered in 100+ countries and 10+ languages.",
    primary_cta: CONSULTATION,
    secondary_cta: { label: "See how Edstellar works", href: "#method", title: "Click here to see how Edstellar works" },
  },

  section_nav: {
    items: [
      { id: "journey", label: "Story" },
      { id: "purpose", label: "Purpose" },
      { id: "what-we-do", label: "What we do" },
      { id: "reach", label: "Global delivery" },
      { id: "solve", label: "Who we serve" },
      { id: "method", label: "5A method" },
      { id: "tools", label: "Platforms and tools" },
      { id: "experts", label: "Experts" },
      { id: "clients", label: "Industries" },
      { id: "faq", label: "FAQs" },
    ],
    cta: CONSULTATION,
  },

  journey: {
    heading: "From corporate training company to L&D <span>partner.</span>",
    description: "How Edstellar grew from training into the full L&D function, and why it now starts with the skills your business needs, not with a course request.",
    paragraphs: [
      "Edstellar started with a simple job: give companies great instructor-led training, in any topic, anywhere their people work.",
      "Clients kept asking harder questions. Which skills matter most? Did the training change anything? And who should run all of this when there is no L&D team? To answer them, we added L&D and OD consulting, assessments, coaching and managed learning, then built our own platforms to measure skills before and after.",
      "Training is still a core strength. What changed is how much of L&D we can carry: one program for one team, a yearly plan, or the whole L&D function for a company that has never had one.",
    ],
    timeline: [
      { year: "2021", text: "Edstellar launches as a corporate training company." },
      { year: "2022", text: "The catalog grows to 2,000+ instructor-led programs across 76 domains, with 5,000+ trainers." },
      { year: "2023", text: "L&D and OD consulting, talent assessments and coaching join the offer." },
      { year: "2024", text: "Edstellar builds its own platforms, from Spectra LMS to Capability OS, Zenith and Meridian, and launches managed learning services." },
      { year: "2026", text: "Edstellar becomes a learning and development solutions company for growing businesses worldwide, from one program to a fully managed L&D function." },
    ],
    compare: {
      from_label: "A training vendor",
      to_label: "Edstellar as your L&D partner",
      rows: [
        { label: "Starts with", from: "A course request", to: "The skills your business needs next", detail: "Linked to your goals and the roles that deliver them." },
        { label: "First step", from: "Picks programs from a catalog", to: "Assesses and analyzes first", detail: "Skills data shows where your people stand before anything is designed." },
        { label: "Who runs it", from: "Your HR team, on top of everything else", to: "Edstellar, alongside your team", detail: "From one program to the whole L&D function." },
        { label: "Reports", from: "Attendance and feedback", to: "Skill change and business results", detail: "Proficiency and behavior tracked before and after." },
        { label: "Over time", from: "Training as an event", to: "L&D as a continuous function", detail: "Each cycle's results set the baseline for the next." },
      ],
    },
  },

  story: {
    heading: "The story behind the <span>Edstellar logo.</span>",
    description: "Ed stands for employee development. Stellar stands for people who shine at work. The logo is built on one idea: capable people unlock organizational success.",
    logo: {
      src: "https://media.edstellar.com/website_assets/edstellar-logo-story.webp",
      alt: "The Edstellar logo: the letter e inside three concentric rings, followed by the word edstellar",
      width: 441,
      height: 181,
    },
    name_parts: [
      { part: "Ed", meaning: "Employee Development, the heart of Edstellar's mission." },
      { part: "Stellar", meaning: "High-performing people who shine within their organizations." },
    ],
    items: [
      { title: "The e at the core", description: "The employee sits at the center of everything Edstellar does." },
      {
        title: "Three concentric rings",
        description: "Capability keeps growing outward. Learning is a journey, not an event.",
      },
      { title: "Shifting shades", description: "Capability must keep adapting as work changes." },
      { title: "A key-shaped outline", description: "Capable people are the key to organizational success." },
    ],
  },

  values: {
    heading: "Edstellar's core values, <span>the three Es.</span>",
    description: "Each value grows from the one before it, just as the rings in the Edstellar logo grow outward from the core.",
    items: [
      {
        title: "Excel",
        tag: "The standard Edstellar holds",
        description: "Hold every program, assessment and engagement to a high and measurable standard of quality, so clients can rely on the result.",
      },
      {
        title: "Elevate",
        tag: "The change Edstellar creates",
        description: "Raise the capability of people, teams and organizations, and show the change in evidence leaders can use.",
      },
      {
        title: "Empower",
        tag: "The ownership Edstellar builds",
        description: "Support clients through every step and give them the insight and tools to keep building capability on their own.",
      },
    ],
  },

  purpose: {
    heading: "The purpose that guides <span>Edstellar.</span>",
    description: "Where we are going, how we get there, and the values we hold along the way.",
    vision: {
      label: "Vision",
      question: "Where we are going",
      text: "To be the most trusted learning and development partner for growing companies <span>around the world.</span>",
    },
    mission: {
      label: "Mission",
      question: "How we get there",
      text: "To give every company, whatever its size, the L&D strategy, programs and delivery it needs, from one <span>accountable partner.</span>",
    },
    values: {
      label: "Values",
      question: "How we work",
      items: [
        { title: "Excel", tag: "The standard we hold", text: "We hold every program, assessment and engagement to a high, measurable standard, so clients can rely on the result." },
        { title: "Elevate", tag: "The change we create", text: "We raise the skills of people, teams and organizations, and show the change in evidence leaders can use." },
        { title: "Empower", tag: "The ownership we build", text: "We give clients the insight and tools to keep developing their people as they grow." },
      ],
    },
  },

  what_we_do: {
    id: "what-we-do",
    heading: "What Edstellar <span>does.</span>",
    kicker: "Eleven learning and development solutions in three layers. Start with one program, plan a year of L&D, or let us run L&D for you.",
    footer_note: "See the full picture on our [learning and development solutions](/) page, or compare [managed L&D engagement models](/managed-learning-services).",
    groups: [
      {
        num: "01",
        tag: "Diagnose and design",
        title: "Strategy and <span>consulting</span>",
        items: [
          { label: "Training needs analysis", href: "/training-needs-analysis-services", title: "Click here to learn about training needs analysis" },
          { label: "Talent assessments", href: "/talent-assessment-services", title: "Click here to learn about talent assessments" },
          { label: "L&D consulting", href: "/learning-development-consulting-services", title: "Click here to learn about L&D consulting" },
          { label: "OD consulting", href: "/organizational-development-consulting", title: "Click here to learn about OD consulting" },
        ],
      },
      {
        num: "02",
        tag: "Build skills",
        title: "Learning and talent <span>programs</span>",
        items: [
          { label: "Corporate training", href: "/corporate-training", title: "Click here to learn about corporate training" },
          { label: "Leadership development (Zenith)", href: "/leadership-retreats", title: "Click here to learn about leadership development" },
          { label: "Coaching", href: "/coaching-solutions", title: "Click here to learn about coaching solutions" },
          { label: "Team effectiveness (Polaris)", href: "/", title: "Click here to learn about team effectiveness" },
        ],
      },
      {
        num: "03",
        tag: "Deliver and run",
        title: "Delivery and <span>enablement</span>",
        items: [
          { label: "Managed learning services", href: "/managed-learning-services", title: "Click here to learn about managed learning services" },
          { label: "Spectra LMS", href: "/", title: "Click here to learn about Spectra LMS" },
          { label: "Capability OS", href: "/platforms/capability-os", title: "Click here to explore Capability OS" },
        ],
      },
    ],
  },

  glance: {
    heading: "Edstellar <span>at a glance.</span>",
    description: "The facts people (and search engines) look for first: who we are, where we are, and the depth behind every program.",
    facts: [
      { label: "What we do", value: "Learning and development solutions" },
      { label: "Founded", value: "2021" },
      { label: "Headquarters", value: "Bengaluru, India" },
      { label: "Offices", value: "US, UK, India" },
      { label: "Delivery", value: "100+ countries, 10+ languages" },
      { label: "Certifications", value: "ISO 9001:2015, ISO 27001:2022" },
    ],
    stats: [
      { value: "2,000+", label: "instructor-led training programs" },
      { value: "76", label: "training domains" },
      { value: "5,000+", label: "qualified trainers and coaches" },
      { value: "58", label: "assessments across 14 families" },
      { value: "50+", label: "coaching programs" },
      { value: "100+", label: "countries delivered in" },
      { value: "10+", label: "delivery languages" },
      { value: "200+", label: "organizations served" },
    ],
  },

  reach: {
    heading: "A global company, <span>close to your teams.</span>",
    description:
      "Teams in the United States, the United Kingdom and India, delivering L&D programs across the Americas, EMEA, MENA and APAC — in the language, format and time zone each workforce needs, from small teams to global enterprises.",
    offices: [
      { region: "Americas", country: "United States", city: "Lewisville, Texas", phone: "+1 682 297 4830" },
      { region: "EMEA", country: "United Kingdom", phone: "+44 151 453 4009" },
      { region: "APAC & HQ", country: "India", city: "Bengaluru", phone: "+91 636 483 3830" },
    ],
    languages: ["English", "Spanish", "Mandarin", "German", "Arabic", "Portuguese", "French", "Japanese", "Italian", "Hindi"],
    scale_title: "How Edstellar delivers globally, at any scale",
    scales: [
      { icon: "users", label: "Team size", from: "Small teams", to: "Enterprise-wide" },
      { icon: "pin", label: "Locations", from: "Single location", to: "Multiple global locations" },
      { icon: "languages", label: "Languages", from: "One language", to: "Multiple languages" },
    ],
    map: {
      src: "https://media.edstellar.com/website_assets/world-delivery-map.svg",
      alt: "World map with dots across the countries where Edstellar delivers capability programs",
    },
    promises: [
      { icon: "check", label: "Local experts", description: "Trainers and coaches from the global network who know the region and speak the language." },
      { icon: "check", label: "One standard everywhere", description: "The same program design, materials and quality checks in every country." },
      { icon: "check", label: "Managed logistics", description: "Venues, scheduling and administration handled through managed training services." },
    ],
    formats: [
      { icon: "monitor", label: "Virtual", description: "Live, instructor-led sessions and coaching, wherever teams are based." },
      { icon: "building", label: "Onsite", description: "Programs delivered at your offices, plants and regional sites." },
      { icon: "pin", label: "Offsite", description: "Immersive programs and workshops away from the day-to-day." },
      { icon: "languages", label: "Multilingual", description: "Facilitation for linguistically diverse workforces." },
    ],
  },

  solve: {
    heading: "Who we work with, and the problems <span>we solve.</span>",
    description:
      "We start with the problem in front of each company, then bring in the right service and tool. Smaller companies often use Edstellar as their L&D team.",
    problem_label: "The typical problem",
    solution_label: "How Edstellar solves it",
    segments: [
      {
        stage: "Stage 1",
        title: "Growth-stage",
        size: "Up to 200 employees",
        problem: "Managers are promoted fast, without the skills to lead.",
        solution: "Training needs analysis, first-time manager programs and coaching on Meridian.",
        tags: ["Training needs analysis", "First-time manager programs", "Meridian"],
      },
      {
        stage: "Stage 2",
        title: "Mid-size",
        size: "200 to 1,000",
        problem: "Teams struggle to align as functions multiply.",
        solution: "Team diagnostics with Polaris and Orbit, then targeted team programs.",
        tags: ["Talent assessments", "Polaris", "Orbit"],
      },
      {
        stage: "Stage 3",
        title: "Large enterprise",
        size: "1,000 to 10,000",
        problem: "Training spend is high, but impact is hard to show.",
        solution: "Role-based journeys on Spectra LMS, with proficiency measured before and after.",
        tags: ["Learning strategy", "Spectra LMS", "Learning analytics and ROI"],
      },
      {
        stage: "Stage 4",
        title: "Global organization",
        size: "10,000+",
        problem: "Strategy moves faster than skills, in every country.",
        solution: "One skills map and one L&D roadmap across regions.",
        tags: ["L&D consulting", "Capability OS", "TNA/TNI Engine"],
      },
      {
        stage: "Public sector",
        title: "Government and education",
        size: "Any size",
        problem: "Programs must meet procurement governance.",
        solution: "Delivery with the documentation and reporting public buyers require.",
        tags: ["Government programs", "University programs"],
        links: [
          { label: "Training for government", href: "/government-employees-training-courses" },
          { label: "Training for universities", href: "/training-for-universities" },
        ],
      },
    ],
    challenges_title: "Everyday training challenges, solved along the way",
    challenges: [
      { title: "Budget constraints", text: "Programs scoped to the gaps that matter most." },
      { title: "Scheduling conflicts", text: "Virtual, onsite and offsite, in every time zone." },
      { title: "Scattered training administration", text: "Managed services and one LMS for every program." },
      { title: "Inconsistent training quality", text: "Vetted trainers and one standard everywhere." },
      { title: "Diverse learning needs", text: "Blended journeys built by role and level." },
      { title: "Training across geographies", text: "Delivery across the Americas, EMEA, MENA and APAC." },
    ],
  },

  method: {
    heading: "The Edstellar 5A method, <span>one connected cycle.</span>",
    description:
      "Every engagement runs the same five steps. Start at any step. Each cycle builds on the last instead of starting over.",
    services_label: "Edstellar services",
    tools_label: "Edstellar platforms and tools",
    output_label: "Output:",
    steps: [
      {
        name: "Assess",
        description: "Define the capability need. Read the strategy, roles and workforce plan, and map where capability stands today.",
        services: [
          { label: "L&D consulting", href: "/learning-development-consulting-services" },
          { label: "Organizational development consulting", href: "/organizational-development-consulting" },
        ],
        tools: ["Capability OS", "Talent assessments", "OD consulting"],
        output: "Capability brief",
      },
      {
        name: "Analyze",
        description: "Find the priority gaps. Rank skill gaps by business impact, using training needs analysis and assessments.",
        services: [
          { label: "Training needs analysis", href: "/training-needs-analysis-services" },
          { label: "Talent assessments", href: "/talent-assessment-services" },
        ],
        tools: ["TNA/TNI Engine", "Zenith", "Orbit"],
        output: "Skills-gap report",
      },
      {
        name: "Architect",
        description: "Design the solution. Design the strategy, content, technology and governance that close the priority gaps.",
        services: [
          { label: "Learning strategy", href: "/learning-development-consulting-services/learning-strategy" },
          { label: "Learning content design and development", href: "/learning-development-consulting-services/learning-content-design-development" },
          { label: "Learning technology", href: "/learning-development-consulting-services/learning-technology" },
        ],
        tools: ["Stellar AI"],
        output: "Strategy and roadmap",
      },
      {
        name: "Activate",
        description: "Deliver at scale. Roll out training, coaching and managed services across teams and locations.",
        services: [
          { label: "Corporate training programs", href: "/corporate-training" },
          { label: "Coaching solutions", href: "/coaching-solutions" },
          { label: "Managed training services", href: "/managed-learning-services/managed-training" },
        ],
        tools: ["Spectra LMS", "Meridian", "Polaris"],
        output: "Live programs",
      },
      {
        name: "Advance",
        description: "Measure and advance. Measure the change, govern and improve, so each cycle builds on the last.",
        services: [
          { label: "Learning governance, analytics and ROI", href: null },
          { label: "Learning engagement and sustainment", href: null },
        ],
        tools: ["Capability OS", "Spectra LMS"],
        output: "Impact report and next priorities",
      },
    ],
  },

  tools: {
    heading: "Our own platforms power <span>every stage.</span>",
    description:
      "We build our own learning, assessment and coaching technology, so clients get one data trail from the first assessment to the final measure of change.",
    explore_label: "Explore",
    groups: [
      {
        kicker: "Enterprise platforms",
        title: "For the whole organization",
        items: [
          {
            icon: "monitor",
            name: "Spectra LMS",
            stages: "Activate · Advance",
            description: "Hosts and tracks learning from enrollment to completion.",
          },
          {
            icon: "layers",
            name: "Capability OS",
            stages: "Assess · Analyze · Advance",
            description: "One live view of workforce capability from every assessment.",
            href: null,
          },
          {
            icon: "filter",
            name: "TNA/TNI Engine",
            stages: "Assess · Analyze",
            description: "Turns employee and skills data into gap matrices and training roadmaps.",
            href: null,
          },
          {
            icon: "sparkles",
            name: "Stellar AI",
            stages: "Architect",
            description: "Recommends training by role, skills and experience level.",
            href: null,
          },
        ],
      },
      {
        kicker: "Focused tools",
        title: "For selected leaders, teams and employees",
        items: [
          {
            icon: "star",
            name: "Zenith",
            stages: "Assess · Activate",
            description: "Leadership assessment for selection, succession and development.",
            href: null,
          },
          {
            icon: "orbit",
            name: "Orbit",
            stages: "Assess · Advance",
            description: "360-degree feedback from managers, peers and reports.",
            href: null,
          },
          {
            icon: "users",
            name: "Polaris",
            stages: "Activate",
            description: "Facilitated team sessions that strengthen how teams work together.",
            href: null,
          },
          {
            icon: "chat",
            name: "Meridian",
            stages: "Activate · Advance",
            description: "AI-assisted one-on-one coaching with certified coaches.",
            href: null,
          },
        ],
      },
    ],
  },

  experts: {
    heading: "5,000+ trainers and coaches, <span>matched to every need.</span>",
    description: "Corporate trainers, executive coaches, certified assessors, instructional designers and industry practitioners, screened for expertise, industry experience and facilitation quality.",
    stat: { value: "5,000+", label: "qualified trainers and coaches" },
    roles_label: "Experts in the network",
    roles: [
      "Corporate trainers",
      "Executive and leadership coaches",
      "Certified assessors",
      "Subject-matter experts",
      "Industry practitioners",
      "Instructional designers",
    ],
    primary_cta: { label: "Explore the expert network", href: "/trainer-platform" },
    secondary_cta: { label: "Join as a trainer or coach", href: "https://login.edstellar.com/register" },
    match_title: "How Edstellar matches an expert",
    steps: [
      { title: "Define the need", text: "The capability goal, audience, language and location for the program." },
      { title: "Match the expert", text: "Edstellar shortlists experts by subject, industry experience, language and region." },
      { title: "Review and confirm", text: "Clients review expert profiles and can meet them before the program is confirmed." },
      { title: "Deliver and rate", text: "Every program is rated by participants, and the ratings shape future matching." },
    ],
  },

  clients: {
    heading: "One L&D partner, close to every <span>team.</span>",
    description:
      "Teams in the United States, the United Kingdom and India deliver global training and development across the Americas, EMEA, MENA and APAC: the same program in every location, in the language and format each workforce needs.",
    choose_label: "Choose an industry",
    all_label: "All industries",
    initial: 24,
    industries: [
      { key: "T", label: "Technology and media" },
      { key: "M", label: "Manufacturing and industrial" },
      { key: "U", label: "Education and public sector" },
      { key: "S", label: "Consulting and professional services" },
      { key: "F", label: "Banking and financial services" },
      { key: "P", label: "Pharma and healthcare" },
      { key: "C", label: "Consumer and retail" },
      { key: "E", label: "Energy, agri and resources" },
      { key: "R", label: "Real estate and construction" },
      { key: "L", label: "Logistics and mobility" },
    ],
    logos: CLIENT_LOGOS,
  },

  trust: {
    heading: "Certified, secure and procurement<span>-ready.</span>",
    kicker: "What security, legal and procurement teams usually ask for, in one place.",
    items: [
      {
        title: "ISO 9001:2015",
        text: "Certified quality management",
        href: null,
      },
      {
        title: "ISO 27001:2022",
        text: "Certified information security management",
        href: null,
      },
      {
        title: "Procurement pack",
        text: "RFP, RFQ and tender responses within 15 working days of clarifications.",
        href: "/request-for-proposal",
        title_attr: "Click here to view Edstellar procurement and RFP information",
      },
      {
        title: "Policies",
        text: "Modern slavery statement, privacy policy, terms and conditions.",
        href: "/privacy-policy",
        title_attr: "Click here to view Edstellar policies",
      },
    ],
  },

  shift: {
    heading: "Edstellar has grown from corporate training company to <span>L&D partner.</span>",
    description:
      "Training remains a core strength. What changed is how much of L&D Edstellar can carry: one program for one team, a yearly plan, or the whole L&D function.",
    from_label: "A training vendor",
    to_label: "Edstellar as your L&D partner",
    rows: [
      { from: "Starts with a course request", to: "Starts with the skills your business needs next", detail: "Linked to your goals and the roles that deliver them." },
      { from: "Picks programs from a catalog", to: "Assesses and analyzes first", detail: "Skills data shows where your people stand before anything is designed." },
      { from: "Your HR team runs it, on top of everything else", to: "Edstellar, alongside your team", detail: "From one program to the whole L&D function." },
      { from: "Reports attendance and feedback", to: "Reports skill change and business results", detail: "Proficiency and behavior tracked before and after." },
      { from: "Training as an event", to: "L&D as a continuous function", detail: "Each cycle's results set the baseline for the next." },
    ],
  },

  work_with_us: {
    id: "work-with-us",
    heading: "Work with <span>Edstellar.</span>",
    items: [
      { title: "Careers", text: "Join the team building capability for global enterprises.", href: "/careers", title_attr: "Click here to view career opportunities at Edstellar" },
      { title: "Become a trainer", text: "Join our network of 5,000+ trainers and coaches.", href: "/trainer-platform", title_attr: "Click here to become an Edstellar trainer" },
      { title: "Partner with us", text: "Referral and reseller programs for consultants and firms.", href: "/partner-program", title_attr: "Click here to learn about Edstellar partner programs" },
      { title: "Write for us", text: "Share your expertise with L&D and HR leaders.", href: "/become-a-guest-author", title_attr: "Click here to write for Edstellar" },
    ],
  },

  faqs: {
    heading: "Questions about <span>Edstellar.</span>",
    description: "Answers to the questions organizations ask most before partnering with Edstellar.",
    items: [
      {
        question: "What does Edstellar do?",
        answer:
          "Edstellar is a learning and development solutions company. It gives growing companies the L&D support they need, from one partner: L&D and OD consulting, talent assessments, corporate training, coaching, managed learning services and its own platforms, delivered in 100+ countries and 10+ languages.",
      },
      {
        question: "When was Edstellar founded?",
        answer:
          "Edstellar was founded in 2021 as a corporate training company and has since grown into a learning and development solutions partner for companies worldwide.",
      },
      {
        question: "Where is Edstellar based?",
        answer:
          "Edstellar is headquartered in Bengaluru, India, with teams in the United States and the United Kingdom. It delivers in 100+ countries and 10+ languages across the Americas, EMEA, MENA and APAC.",
      },
      {
        question: "Is Edstellar a corporate training company?",
        answer:
          "Corporate training is one part of what Edstellar does, with 2,000+ instructor-led programs. As a learning and development solutions company, Edstellar also finds the skill gaps first, adds coaching, consulting and managed learning where they help, and measures the change.",
        answer_links: [{ text: "2,000+ corporate training programs", href: "/corporate-training" }],
      },
      {
        question: "Who does Edstellar work with?",
        answer:
          "Edstellar works with start-ups, small and mid-sized businesses, global enterprises and the public sector. Many smaller clients have no L&D team, so Edstellar plans, runs and reports on learning for them; larger clients use Edstellar alongside their own L&D team.",
      },
      {
        question: "Which platforms has Edstellar built?",
        answer:
          "Edstellar has built Capability OS, the TNA/TNI Engine, Stellar AI, the Spectra LMS, Zenith for leadership assessment, Orbit for 360-degree feedback, Polaris for team effectiveness and Meridian for AI-assisted coaching.",
      },
      {
        question: "How does Edstellar choose trainers and coaches?",
        answer:
          "Edstellar matches experts from its network of 5,000+ trainers and coaches by subject, industry experience, language and region. Clients review the shortlist and can meet experts before confirming, and participant ratings shape future matches.",
      },
      {
        question: "Which certifications does Edstellar hold?",
        answer: "Edstellar is certified to ISO 9001:2015 for quality management and ISO 27001:2022 for information security management.",
      },
      {
        question: "How do we start working with Edstellar?",
        answer:
          "Book a 30-minute consultation. A consultant will discuss your teams and priorities and recommend where to start: one program for one team, a yearly L&D plan built from a training needs analysis, or managed learning services.",
      },
    ],
  },

  cta: {
    heading: "Start your L&D program <span>with Edstellar.</span>",
    description:
      "Tell Edstellar the L&D challenge your organization is facing. A consultant will recommend where to start and what the first step would deliver.",
    primary_cta: CONSULTATION,
    secondary_cta: { label: "Explore consulting", href: "/learning-development-consulting-services", title: "Click here to explore consulting services" },
  },

  form: {
    heading: "Talk to Edstellar about your <span>L&D goals.</span>",
    description: "Tell us the L&D challenge your organization is facing. A consultant will recommend where to start and what the first step would deliver.",
    message_label: "Your requirements",
    message_placeholder: "Tell us the capability you want to build, the teams involved, locations and timelines.",
    sla_note: "We reply within one business day with a scoped response, no automated sales sequence.",
    submit_label: "Book a consultation",
  },
};
