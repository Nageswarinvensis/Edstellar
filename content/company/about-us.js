/**
 * About Us (`/about-us`) — local content; the CMS has no `about-us` page.
 * Headings mark their italic phrase with `<span>`. Icon names map to lucide
 * icons in `components/sections/about/icons.js`. Links point at this site's
 * own routes; the few pages it does not have yet keep their live-site URL.
 *
 * Design: `Edstellar-New-Lanch SETUP/about-us 59.html`.
 */
import { CLIENT_LOGOS } from "@/content/company/client-logos";

const CONSULTATION = { label: "Book a consultation", href: "#contact" };
const LIVE = "https://www.edstellar.com";

export const ABOUT_US = {
  seo: {
    title: "About Edstellar",
    description:
      "Learn about Edstellar, our purpose, values and approach to capability transformation, and how we help organizations develop their people and teams.",
    path: "/about-us",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "About Us", href: null },
  ],

  hero: {
    heading: "Your <span>Capability Transformation Partner</span>",
    description:
      "Edstellar helps organizations build the capability their strategy depends on. Through its 5A methodology, Edstellar assesses the capability your strategy needs, analyzes the gaps, architects the solution, activates training and coaching, and advances results cycle after cycle, all as one connected program.",
    primary_cta: CONSULTATION,
    secondary_cta: { label: "See how Edstellar works", href: "#method" },
  },

  section_nav: {
    items: [
      { id: "story", label: "Logo" },
      { id: "purpose", label: "Purpose" },
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

  story: {
    heading: "The story behind the <span>Edstellar logo.</span>",
    description: "The Edstellar logo was designed around one idea: capable people are the key to organizational success.",
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
        description: "Knowledge and capability keep expanding outward, because learning is a continuous journey, not a single event.",
      },
      { title: "Shifting shades", description: "The changing tones show that capability must keep adapting as the demands of work change." },
      { title: "A key-shaped outline", description: "Employees equipped with the right capability are the key that unlocks organizational success." },
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
    description: "Where Edstellar is going, how it gets there, and the values it holds along the way.",
    vision: {
      label: "Vision",
      question: "Where Edstellar is going",
      text: "To be the most trusted <span>capability transformation partner</span> for organizations around the world.",
    },
    mission: {
      label: "Mission",
      question: "How Edstellar gets there",
      text: "To help organizations build the capability their strategy needs by connecting assessment, analysis, design, delivery and measurement into one accountable program, delivered by the best experts, tools and practices.",
    },
    values: {
      label: "Values",
      question: "How Edstellar works",
      items: [
        { title: "Excel", text: "Hold every program, assessment and engagement to a high, measurable standard." },
        { title: "Elevate", text: "Raise the capability of people, teams and organizations, with evidence leaders can use." },
        { title: "Empower", text: "Give clients the insight and tools to keep building capability on their own." },
      ],
    },
  },

  glance: {
    heading: "Edstellar <span>at a glance.</span>",
    description: "The depth behind every Edstellar capability program, from assessment to delivery.",
    stats: [
      { value: "2,000+", label: "instructor-led training programs" },
      { value: "77", label: "training domains in the catalog" },
      { value: "5,000+", label: "qualified trainers and coaches" },
      { value: "58", label: "assessments across 14 families" },
      { value: "50+", label: "coaching programs" },
      { value: "100", label: "countries delivered in" },
      { value: "10+", label: "delivery languages" },
      { value: "10", label: "industries served" },
    ],
  },

  reach: {
    heading: "Capability programs delivered across <span>100 countries.</span>",
    description:
      "From its base in Bengaluru, India, Edstellar delivers to organizations across the Americas, EMEA, MENA and APAC, in the language and format each workforce needs.",
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
    heading: "Who Edstellar works with, and the problems <span>it solves.</span>",
    description:
      "From growth-stage companies to global organizations and government, Edstellar starts with the capability problem in front of each organization, then brings in the right service and tool to solve it.",
    problem_label: "The typical problem",
    solution_label: "How Edstellar solves it",
    segments: [
      {
        stage: "Stage 1",
        title: "Growth-stage companies",
        size: "Up to 200 employees",
        problem: "Managers are promoted fast, without the skills to lead growing teams.",
        solution: "Edstellar starts with a training needs analysis, then runs first-time manager programs and one-on-one coaching on Meridian.",
        tags: ["Training needs analysis", "First-time manager programs", "Meridian"],
      },
      {
        stage: "Stage 2",
        title: "Mid-size companies",
        size: "200 to 1,000 employees",
        problem: "Teams struggle to align, collaborate and deliver together as functions multiply.",
        solution: "Edstellar diagnoses how teams work with Polaris and Orbit, then runs targeted team interventions and role-based learning journeys.",
        tags: ["Talent assessments", "Polaris", "Orbit"],
      },
      {
        stage: "Stage 3",
        title: "Large enterprises",
        size: "1,000 to 10,000 employees",
        problem: "Training budgets are spent, but the impact on performance is hard to show.",
        solution: "Edstellar designs role-based journeys for each function, runs them on Spectra LMS and measures proficiency before and after.",
        tags: ["Learning strategy and design", "Spectra LMS", "Learning analytics and ROI"],
      },
      {
        stage: "Stage 4",
        title: "Global organizations",
        size: "10,000+ employees",
        problem: "The strategy is moving faster than the workforce's skills, across every country.",
        solution: "Edstellar maps the capability the strategy needs, measures where the workforce stands and builds one enterprise roadmap across regions.",
        tags: ["L&D consulting", "Capability Intelligence Platform", "TNA/TNI Engine"],
      },
      {
        stage: "Public sector",
        title: "Government and education",
        size: "Any size",
        problem: "Public institutions need capability programs that meet procurement governance.",
        solution: "Edstellar delivers programs with the governance, documentation and reporting that public procurement requires.",
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
    heading: "The Edstellar 5A methodology, <span>one connected method.</span>",
    description:
      "Every Edstellar engagement runs on the same five steps: Assess, Analyze, Architect, Activate and Advance. Organizations can begin at any step, and each cycle builds on the one before it rather than starting over.",
    services_label: "Edstellar services",
    tools_label: "Edstellar platforms and tools",
    output_label: "Output:",
    steps: [
      {
        name: "Assess",
        description: "Read the business strategy, roles and workforce plan to define what capability the plan needs.",
        services: [
          { label: "L&D consulting", href: "/learning-development-consulting-services" },
          { label: "Organizational development consulting", href: "/organizational-development-consulting" },
        ],
        tools: ["Capability Intelligence Platform"],
        output: "Capability brief",
      },
      {
        name: "Analyze",
        description: "Analyze the skill gaps from your training needs analysis and assessments.",
        services: [
          { label: "Training needs analysis", href: "/training-needs-analysis-solutions" },
          { label: "Talent assessments", href: "/talent-assessment-services" },
          { label: "Skills-based organization", href: `${LIVE}/skill-based-organization` },
        ],
        tools: ["TNA/TNI Engine", "Zenith", "Orbit", "Polaris"],
        output: "Skills-gap report",
      },
      {
        name: "Architect",
        description: "Architect the strategy, content, technology and governance that close the priority gaps.",
        services: [
          { label: "Learning strategy and design", href: "/learning-development-consulting-services/learning-strategy-design" },
          { label: "Learning content design", href: "/learning-development-consulting-services/learning-content-development" },
          { label: "Learning technology", href: "/learning-development-consulting-services/learning-technology" },
        ],
        tools: ["Stellar AI"],
        output: "Strategy and roadmap",
      },
      {
        name: "Activate",
        description: "Roll out blended delivery across teams, through training programs, coaching and managed services.",
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
        description: "Measure, govern and improve each cycle, so the function compounds rather than resets.",
        services: [
          { label: "Learning governance, analytics and ROI", href: `${LIVE}/learning-governance-analytics-roi-consulting` },
          { label: "Learning engagement and sustainment", href: `${LIVE}/learning-engagement-sustainment-consulting` },
        ],
        tools: ["Capability Intelligence Platform", "Spectra LMS"],
        output: "Measured results and the next cycle's priorities",
      },
    ],
  },

  tools: {
    heading: "Edstellar's own platforms and tools power <span>every stage.</span>",
    description:
      "Edstellar builds its own learning, assessment and coaching technology, so clients get one connected data trail from the first assessment to the final measure of change.",
    explore_label: "Explore",
    groups: [
      {
        kicker: "Enterprise platforms",
        title: "For the whole organization",
        description: "Run across every function and location.",
        items: [
          {
            icon: "monitor",
            name: "Spectra LMS",
            stages: "Activate · Advance",
            description: "Edstellar's enterprise learning management system, hosting and tracking learning from enrollment to completion.",
          },
          {
            icon: "layers",
            name: "Capability Intelligence Platform",
            stages: "Assess · Analyze · Advance",
            description: "Brings assessment and psychometric results together into one live view of workforce capability.",
            href: null, // page not ready yet
          },
          {
            icon: "filter",
            name: "TNA/TNI Engine",
            stages: "Analyze",
            description: "Turns employee, job-description and skills data into skill-gap matrices and training roadmaps.",
            href: null, // page not ready yet
          },
          {
            icon: "sparkles",
            name: "Stellar AI",
            stages: "Architect",
            description: "Recommends training programs by job role, skills and experience level.",
            href: null, // page not ready yet
          },
        ],
      },
      {
        kicker: "Focused tools",
        title: "For selected leaders, teams and employees",
        description: "Used with the leaders, teams and employees an engagement targets.",
        items: [
          {
            icon: "star",
            name: "Zenith",
            stages: "Analyze",
            description: "Edstellar's own leadership assessment for selection, succession and development decisions.",
            href: null, // page not ready yet
          },
          {
            icon: "orbit",
            name: "Orbit",
            stages: "Analyze",
            description: "Edstellar's 360-degree feedback tool, gathering structured input from managers, peers and reports.",
            href: null, // page not ready yet
          },
          {
            icon: "users",
            name: "Polaris",
            stages: "Analyze · Activate",
            description: "Edstellar's team intervention tool for understanding and strengthening how teams work together.",
            href: null, // page not ready yet
          },
          {
            icon: "chat",
            name: "Meridian",
            stages: "Activate",
            description: "AI-assisted virtual one-on-one coaching that connects leaders with certified coaches.",
            href: null, // page not ready yet
          },
        ],
      },
    ],
  },

  experts: {
    heading: "A global network of trainers and coaches, <span>matched to every need.</span>",
    stat: { value: "5,000+", label: "qualified trainers and coaches, screened for subject expertise, industry experience and facilitation quality" },
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
    heading: "Industries and organizations that build capability <span>with Edstellar.</span>",
    description:
      "More than 120 organizations across 10 industries work with Edstellar. Choose an industry to see the organizations Edstellar works with.",
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

  shift: {
    heading: "Edstellar has grown from training partner to <span>capability partner.</span>",
    description:
      "Training remains a core strength. What changed is where Edstellar starts and where it finishes: with the capability your business needs, not with a course request.",
    from_label: "A training partner",
    to_label: "Edstellar as capability partner",
    rows: [
      { from: "Starts with a course request", to: "Starts with a capability goal", detail: "Linked to the business strategy and the roles that deliver it." },
      { from: "Picks programs from a catalog", to: "Assesses and analyzes first", detail: "Assessments and skills data show where capability stands before anything is designed." },
      { from: "Runs one-off sessions", to: "Builds connected journeys", detail: "Training, coaching and on-the-job support work together toward one outcome." },
      { from: "Reports attendance and feedback", to: "Measures change in capability", detail: "Proficiency and behavior are tracked before and after, and reported to leaders." },
      { from: "Training as an event", to: "Capability as a continuous function", detail: "Each cycle's results set the baseline for the next, so capability keeps growing." },
    ],
  },

  faqs: {
    heading: "Frequently asked questions about <span>Edstellar.</span>",
    description: "Answers to the questions organizations ask most before partnering with Edstellar.",
    items: [
      {
        question: "What does a capability transformation partner do?",
        answer:
          "A capability transformation partner helps an organization build the skills, leadership and team strength its strategy needs, end to end. Edstellar does this through its 5A methodology: it assesses the capability the strategy needs, analyzes the skill gaps, architects the strategy and solution, activates training, coaching and managed services, and advances results by measuring and improving each cycle.",
      },
      {
        question: "How is Edstellar different from a corporate training vendor?",
        answer:
          "A training vendor delivers the courses it is asked for. Edstellar starts with the capability goal, analyzes the gap with assessments and skills data, and connects consulting, training, coaching and managed services so the outcome can be measured. Training is one step of the 5A methodology rather than the whole engagement.",
      },
      {
        question: "Does Edstellar still deliver corporate training programs?",
        answer:
          "Yes. Edstellar offers more than 2,000 instructor-led programs across 77 domains, delivered by a network of more than 5,000 qualified trainers.",
      },
      {
        question: "Which platforms and tools has Edstellar built?",
        answer:
          "Edstellar has built its own Capability Intelligence Platform, the TNA/TNI Engine, the Zenith leadership assessment, the Orbit 360-degree feedback tool, Polaris for team intervention, Meridian for AI-assisted one-on-one coaching and Stellar AI. Its enterprise learning management system, Spectra LMS, hosts and tracks learning at scale.",
      },
      {
        question: "Can Edstellar support just one step of the 5A methodology?",
        answer:
          "Yes. Many organizations begin with a single step, such as a training needs analysis, a leadership assessment or a coaching program, and extend the partnership as their goals grow. Each step produces an output that the next step builds on.",
      },
      {
        question: "Where does Edstellar deliver its services?",
        answer:
          "From Bengaluru, India, Edstellar delivers to the Americas, EMEA, MENA and APAC, in 100 countries and more than 10 languages, through virtual, onsite and offsite formats.",
      },
      {
        question: "Does Edstellar work with smaller companies and government organizations?",
        answer:
          "Yes. Edstellar works with organizations of every size, from growth-stage companies to global enterprises, as well as government departments, public institutions and universities. Smaller organizations often begin with a single step of the 5A methodology, while larger ones run enterprise-wide programs.",
      },
      {
        question: "How does Edstellar choose trainers and coaches for a program?",
        answer:
          "Edstellar matches each program to experts from its network of more than 5,000 trainers and coaches by subject, industry experience, language and region. Clients review the shortlisted experts before the program is confirmed, and participant ratings shape future matching.",
      },
      {
        question: "Which certifications does Edstellar hold?",
        answer: "Edstellar is certified to ISO 9001:2015 for quality management and ISO 27001:2022 for information security management.",
      },
      {
        question: "How do we start working with Edstellar?",
        answer:
          "Share your capability goal through the consultation form. An Edstellar consultant will discuss your teams and priorities and recommend where to start in the 5A methodology.",
      },
    ],
  },

  cta: {
    heading: "Start building capability <span>with Edstellar.</span>",
    description:
      "Tell Edstellar the capability your organization needs. A consultant will recommend where to start in the 5A methodology and what the first step would deliver.",
    primary_cta: CONSULTATION,
    secondary_cta: { label: "Explore consulting", href: "/learning-development-consulting-services" },
  },

  form: {
    heading: "Talk to Edstellar about your <span>capability goals.</span>",
    description: "Share what your organization is working toward. Edstellar will respond with a suggested starting point in the 5A methodology.",
    message_label: "Your requirements",
    message_placeholder: "Tell us the capability you want to build, the teams involved, locations and timelines.",
    sla_note: "We reply within one business day with a scoped response, no automated sales sequence.",
    submit_label: "Book a consultation",
  },
};
