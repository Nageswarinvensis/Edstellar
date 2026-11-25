/**
 * Static content for the /who-we-serve page.
 * All sections are driven from this single file; swap the export for an API
 * call later without touching any component.
 */

const PLATFORMS = {
  "Spectra LMS":    { href: "/platforms/spectra-lms",   title: "Spectra LMS: Edstellar's learning management system" },
  "Capability OS":  { href: "/platforms/capability-os",  title: "Capability OS: skills analytics platform" },
  "TNA/TNI Engine": { href: "/platforms/tna-tni-engine", title: "TNA/TNI Engine: training needs analysis software" },
  "Zenith":         { href: "/platforms/zenith",         title: "Zenith: leadership assessment and development centers" },
  "Orbit":          { href: "/platforms/orbit",          title: "Orbit: 360-degree feedback tool" },
  "Polaris":        { href: "/platforms/polaris",        title: "Polaris: team effectiveness sessions" },
  "Meridian":       { href: "/platforms/meridian",       title: "Meridian: AI-assisted virtual coaching" },
  "Stellar AI":     { href: null,                        title: "Stellar AI: training recommendations (coming soon)" },
  "Spica":          { href: null,                        title: "Spica: English language assessment (coming soon)" },
};

function tools(...names) {
  return names.map((name) => ({ name, ...PLATFORMS[name] }));
}

export const pageData = {
  /* ── Hero ── */
  hero: {
    eyebrow: null,
    heading: "Organizational training and development, <span>from start-ups to governments.</span>",
    lede: "Edstellar works with seven types of organizations, from start-ups and small businesses to enterprises, non-profits, educational institutions and governments. Find yours to see the usual problems, first steps and tools.",
    primaryBtn: { text: "Talk to an Edstellar expert", href: "#contact", title: "Talk to an Edstellar expert about your organization's training and development needs" },
    secondaryBtn: { text: "Find your organization type", href: "#types", title: "Jump to organization types on the who we serve page" },
    trustBar: [
      "100+ countries",
      "10+ languages",
      "2,000+ programs",
      "ISO 9001 & 27001",
    ],
    jumpCard: {
      header: "Jump to your organization",
      badge: "7 types",
      groups: [
        {
          label: "Growing businesses",
          items: [
            { label: "Start-ups",           href: "#startup",    title: "Jump to start-ups section" },
            { label: "Small and mid-sized", href: "#smb",        title: "Jump to small and mid-sized businesses section" },
            { label: "Mid-market",          href: "#midmarket",  title: "Jump to mid-market organizations section" },
          ],
        },
        {
          label: "Larger and public organizations",
          items: [
            { label: "Enterprise",  href: "#enterprise",  title: "Jump to enterprise and multinational section" },
            { label: "Non-profit",  href: "#nonprofit",   title: "Jump to non-profits section" },
            { label: "Education",   href: "#education",   title: "Jump to educational institutions section" },
            { label: "Government",  href: "#government",  title: "Jump to government and public sector section" },
          ],
        },
      ],
      note: "Not sure which fits? Compare all seven below.",
      noteHref: "#compare",
    },
  },

  /* ── Proof strip ── */
  proof: [
    { value: "100+",      label: "countries served" },
    { value: "10+",      label: "delivery languages" },
    { value: "2,000+",   label: "instructor-led programs" },
    { value: "ISO 9001", label: "2015 certified quality" },
    { value: "ISO 27001",label: "2022 certified information security" },
  ],

  /* ── Sticky section nav ── */
  stickyNav: {
    logo: { src: "/course/edstellar.svg", alt: "Edstellar" },
    tabs: [
      { id: "types",      label: "Organization types" },
      { id: "industries", label: "Industries" },
      { id: "roles",      label: "Leaders" },
      { id: "global",     label: "Global delivery" },
      { id: "why",        label: "Why Edstellar" },
      { id: "tools",      label: "Tools" },
      { id: "faq",        label: "FAQs" },
    ],
    cta: { text: "Talk to an expert", targetId: "contact" },
  },

  /* ── Organization types grid ── */
  orgExplorer: {
    heading: "Training and development for every kind of <span>organization.</span>",
    lede: "Organizational training and development has to fit the organization. Growing businesses come first: they are the companies most likely to need Edstellar as their L&D team. Larger and public organizations use the same model at scale.",
    groups: [
      {
        label: "Growing businesses",
        subtitle: "Start-up to mid-market",
        ids: ["startup", "smb", "midmarket"],
      },
      {
        label: "Larger and public organizations",
        subtitle: "Enterprise, social and public sector",
        ids: ["enterprise", "nonprofit", "education", "government"],
      },
    ],
    types: [
      {
        id: "startup",
        label: "Start-ups",
        chip: "Growing",
        tagline: "Lean, fast skill building that keeps pace with growth.",
        problem: "Managers are promoted fast, without the skills to lead.",
        ticks: [
          "Focused programs on the skills the next stage of growth needs",
          "Support for first-time managers as teams form",
          "Virtual delivery that fits tight schedules and distributed teams",
          "One program at a time, with no long contract",
        ],
        starts_with: [
          { label: "Corporate training", href: "/corporate-training", title: "Corporate training for start-ups" },
          { label: "Coaching",           href: "/coaching-solutions",  title: "Coaching for start-up teams" },
        ],
        tools: tools("Spectra LMS", "Meridian"),
      },
      {
        id: "smb",
        label: "Small and mid-sized businesses",
        chip: "Growing",
        tagline: "Learning and development without building a dedicated L&D team.",
        problem: "Training happens ad hoc, with no one owning L&D.",
        ticks: [
          "Edstellar acts as your L&D team, from needs analysis to delivery",
          "Programs tailored to your work and your internal skill gaps",
          "Clear reporting on training effectiveness and employee progress",
          "Access to 2,000+ instructor-led programs across 76 domains",
        ],
        starts_with: [
          { label: "Managed learning services",  href: "/managed-learning-services",        title: "Managed learning services for small and mid-sized businesses" },
          { label: "Training needs analysis",    href: "/training-needs-analysis-services", title: "Training needs analysis for small and mid-sized businesses" },
        ],
        tools: tools("Spectra LMS", "TNA/TNI Engine"),
      },
      {
        id: "midmarket",
        label: "Mid-market",
        chip: "Growing",
        tagline: "Structured L&D as you outgrow informal training.",
        problem: "Teams struggle to align as functions multiply.",
        ticks: [
          "An L&D strategy and annual plan built with Edstellar consultants",
          "Needs analysis that directs budget to the skills that matter most",
          "Coaching for managers stepping into larger roles",
          "Managed learning that extends a small in-house L&D team",
        ],
        starts_with: [
          { label: "Training needs analysis", href: "/training-needs-analysis-services",          title: "Training needs analysis for mid-market companies" },
          { label: "L&D consulting",          href: "/learning-development-consulting-services",  title: "L&D consulting for mid-market companies" },
        ],
        tools: tools("Capability OS", "Meridian"),
      },
      {
        id: "enterprise",
        label: "Enterprise and multinational",
        chip: "Enterprise",
        tagline: "Enterprise learning and development across business units, countries and languages.",
        problem: "Training spend is high, but impact is hard to show.",
        ticks: [
          "Training operations centralized across locations and vendors",
          "Assessments at scale, tracked in Capability OS",
          "Leadership pipelines built through academies and certified coaching",
          "One program for international staff in multinational companies, in their languages",
        ],
        starts_with: [
          { label: "Managed learning services", href: "/managed-learning-services",    title: "Managed learning services for enterprise" },
          { label: "Talent assessments",        href: "/talent-assessment-services",   title: "Talent assessments for enterprise" },
        ],
        tools: tools("Capability OS", "Spectra LMS", "Zenith", "Meridian"),
      },
      {
        id: "nonprofit",
        label: "Non-profit",
        chip: "Social sector",
        tagline: "Staff learning and development that multiplies impact.",
        problem: null,
        ticks: [
          "Systematic training for staff and volunteers, sized to resources",
          "Visibility of training across dispersed teams",
          "Social impact programs alongside core skills training",
          "Programs that strengthen delivery of your mission",
        ],
        starts_with: [
          { label: "Corporate training", href: "/corporate-training", title: "Corporate training for non-profits" },
        ],
        tools: tools("Spectra LMS"),
      },
      {
        id: "education",
        label: "Educational institutions",
        chip: "Education",
        tagline: "Training and development for administrators, faculty and students.",
        problem: null,
        ticks: [
          "Leadership programs that help administrators run institutions well",
          "Industry-aligned courses that prepare students for their careers",
          "Faculty development across disciplines",
          "A unified view of training across campuses and offices",
        ],
        starts_with: [
          { label: "Training for universities", href: "/training-for-universities", title: "Training and development for universities and colleges" },
        ],
        tools: tools("Spectra LMS"),
      },
      {
        id: "government",
        label: "Government and public sector",
        chip: "Public sector",
        tagline: "Training and development in the public sector, with regulatory alignment built in.",
        problem: "Programs must meet procurement governance.",
        ticks: [
          "Training coordinated centrally across departments and budgets",
          "Compliance training aligned to each department's regulations",
          "Role-specific programs for the skills each department needs",
          "A consolidated view of training across government entities",
        ],
        starts_with: [
          { label: "Training for government employees", href: "/government-employees-training-courses", title: "Training for government employees" },
        ],
        tools: tools("Capability OS", "Spectra LMS"),
      },
    ],
  },

  /* ── Organization comparison table ── */
  compare: {
    heading: "How Edstellar adapts to each <span>organization.</span>",
    lede: "The same services, shaped differently for each type of organization: where it usually starts, and how training is delivered.",
    footnote: "Size bands match the company-size options on the Managed learning services form; confirm with sales before launch.",
    cta: {
      label: "Read Edstellar success stories",
      href: "/success-stories",
      title: "Edstellar success stories and case studies",
    },
    rows: [
      { org: "Start-ups",                    size: "1 to 50",      firstStep: "One training program or a first-time manager coaching track",  delivery: "Virtual" },
      { org: "Small and mid-sized businesses", size: "51 to 200",  firstStep: "A training needs analysis, then Edstellar runs L&D",           delivery: "Virtual or blended" },
      { org: "Mid-market",                   size: "200 to 1,000", firstStep: "A yearly L&D plan built with Edstellar consultants",            delivery: "Blended" },
      { org: "Enterprise and multinational",  size: "1,000+",      firstStep: "Assessments at scale, then managed learning across countries",   delivery: "Onsite, virtual and blended" },
      { org: "Non-profits",                  size: "Any size",     firstStep: "Core skills training sized to resources",                       delivery: "Virtual or blended" },
      { org: "Educational institutions",     size: "Any size",     firstStep: "Leadership and faculty development programs",                   delivery: "Onsite or blended" },
      { org: "Government and public sector",  size: "Any size",    firstStep: "Department-specific and compliance programs",                   delivery: "Onsite or blended" },
    ],
  },

  /* ── CTA band ── */
  ctaBand: {
    heading: "Edstellar maps the right starting point <span>for your organization.</span>",
    lede: "Share your goals, team size and locations, and an Edstellar expert recommends where to begin.",
    btn: { text: "Talk to an Edstellar expert", href: "#contact" },
  },

  /* ── Industries ── */
  industries: {
    heading: "Training and development, industry by <span>industry.</span>",
    lede: "Every industry runs on different roles, regulations and technology, from training and development in IT companies and the pharmaceutical sector to logistics. Edstellar maps the skills each one depends on, measures where teams stand and builds what is missing, with progress tracked in Capability OS.",
    steps: [
      { n: "01", label: "Map the value chain",       desc: "The roles and skills your industry depends on." },
      { n: "02", label: "Measure where teams stand", desc: "A baseline by role, team and location." },
      { n: "03", label: "Build what is missing",     desc: "Training, coaching and consulting for the gaps." },
      { n: "04", label: "Keep skills visible",       desc: "Progress tracked and reported to leaders." },
    ],
    industries: [
      { label: "Manufacturing",                  href: null },
      { label: "Automotive",                     href: "/corporate-training/automotive",  title: "Training and development for the automotive industry" },
      { label: "Aerospace and defense",          href: null },
      { label: "Engineering and construction",   href: null },
      { label: "Electronics and semiconductors", href: null },
      { label: "Chemicals",                      href: null },
      { label: "Energy and utilities",           href: null },
      { label: "Oil and gas",                    href: null },
      { label: "Banking and financial services", href: null },
      { label: "Insurance",                      href: null },
      { label: "IT services",                    href: null },
      { label: "Telecommunications",             href: null },
      { label: "Healthcare",                     href: null },
      { label: "Pharmaceuticals",                href: null },
      { label: "Retail",                         href: "/corporate-training/retail",      title: "Training and development for retail businesses" },
      { label: "FMCG and consumer goods",        href: null },
      { label: "Logistics and transportation",   href: null },
    ],
  },

  /* ── Roles / leaders ── */
  roles: {
    heading: "Where Edstellar starts with each <span>leader.</span>",
    lede: "Different leaders bring different goals. These are the usual first steps, including for growing companies where one person owns all of people development.",
    cards: [
      {
        id: "founders",
        chip: "Growing companies",
        role: "Founders and HR leads",
        goal: "Get L&D running without hiring a team.",
        desc: "Plan, run and report on training from one partner.",
        links: [
          { label: "Managed learning services", href: "/managed-learning-services",    title: "Managed learning services and learning and development outsourcing" },
          { label: "Corporate training",        href: "/corporate-training",           title: "Corporate training: 2,000+ instructor-led programs across 76 domains" },
        ],
      },
      {
        id: "ceo",
        chip: "Sets direction",
        role: "CEO and board",
        goal: "Set direction and succession.",
        desc: "Strategy, leadership succession and organization-wide change.",
        links: [
          { label: "Leadership retreats", href: "/leadership-retreats",                        title: "Leadership retreats: offsite programs for executive and senior leadership teams" },
          { label: "OD consulting",       href: "/organizational-development-consulting",      title: "Organizational development (OD) consulting services" },
        ],
      },
      {
        id: "chro",
        chip: "Shapes the people agenda",
        role: "CHRO and HR leaders",
        goal: "Shape the people agenda.",
        desc: "Leadership pipelines and talent decisions grounded in evidence.",
        links: [
          { label: "Talent assessments", href: "/talent-assessment-services",             title: "Talent assessment services: psychometrics, 360-degree feedback and assessment centers" },
          { label: "OD consulting",      href: "/organizational-development-consulting",  title: "Organizational development (OD) consulting services" },
        ],
      },
      {
        id: "ld",
        chip: "Runs learning",
        role: "L&D leaders",
        goal: "Run learning that moves the business.",
        desc: "A training plan tied to business priorities, delivered without adding headcount.",
        links: [
          { label: "Training needs analysis",   href: "/training-needs-analysis-services",          title: "Training needs analysis services: find and rank your team's skill gaps" },
          { label: "Managed learning services", href: "/managed-learning-services",                 title: "Managed learning services and learning and development outsourcing" },
        ],
      },
      {
        id: "function",
        chip: "Runs the business",
        role: "Function and business leaders",
        goal: "Get teams ready for what is next.",
        desc: "Specific skills for a team, a rollout or a new market, ready when the business needs them.",
        links: [
          { label: "Corporate training", href: "/corporate-training",   title: "Corporate training: 2,000+ instructor-led programs across 76 domains" },
          { label: "Coaching",           href: "/coaching-solutions",   title: "Coaching solutions: executive, leadership and team coaching" },
        ],
      },
    ],
  },

  /* ── Global delivery ── */
  global: {
    heading: "Edstellar delivers <span>wherever your teams work.</span>",
    lede: "One program, coordinated across countries, languages and time zones, so every location gets the same quality.",
    scaleHeading: "How Edstellar delivers globally, at any scale",
    scale: [
      { heading: "Team size",  lo: "Small teams",      hi: "Enterprise-wide",  icon: "users" },
      { heading: "Locations",  lo: "Single location",  hi: "100+ countries",    icon: "pin" },
      { heading: "Languages",  lo: "One language",     hi: "10+ languages",    icon: "lang" },
    ],
    modes: [
      { icon: "screen", label: "Virtual instructor-led", desc: "Live sessions with Edstellar trainers, wherever teams sit" },
      { icon: "pin",    label: "Onsite",                 desc: "Trainers at your offices, plants and campuses" },
      { icon: "blend",  label: "Blended",                desc: "Live sessions combined with self-paced learning on Spectra LMS" },
    ],
  },

  /* ── Why Edstellar ── */
  why: {
    heading: "Organizations choose Edstellar <span>for reach and range.</span>",
    lede: "Consulting, assessments, coaching, managed training, programs and academies under one roof. Every engagement follows the Edstellar 5A methodology.",
    flow: {
      heading: "One partner across the employee lifecycle",
      steps: [
        { n: "01", label: "Assess",    desc: "Set a clear baseline of current capability." },
        { n: "02", label: "Analyze",   desc: "Find the gaps that matter most to the business." },
        { n: "03", label: "Architect", desc: "Design the roadmap, programs and formats." },
        { n: "04", label: "Activate",  desc: "Deliver consulting, programs and coaching." },
        { n: "05", label: "Advance",   desc: "Track progress and plan the next wave." },
      ],
    },
    tiles: [
      { big: "8",          unit: "Edstellar tools",              heading: "Edstellar's own tools",            desc: "Eight Edstellar platforms and tools, from Spectra LMS to Meridian, support every engagement." },
      { big: "3",          unit: "coaching accreditation bodies", heading: "Certified coaches",                desc: "Edstellar coaches hold ICF (PCC or MCC), ICC or EMCC certification." },
      { big: "2",          unit: "ISO certifications",            heading: "Certified quality and security",   desc: "ISO 9001:2015 certified quality management and ISO 27001:2022 certified information security." },
      { big: "Fit-first",  unit: "vendor-neutral selection",      heading: "Vendor-neutral by design",        desc: "Instruments, content and trainers are chosen for fit, not tied to a single publisher." },
    ],
    moreHref: "/success-stories",
  },

  /* ── Tools grid ── */
  tools: {
    heading: "Edstellar's own platforms and tools power <span>every stage.</span>",
    lede: "Edstellar builds its own learning, assessment and coaching technology, so clients get one connected data trail from the first assessment to the final measure of change.",
    note: "Stage tags refer to the Edstellar 5A methodology: Assess, Analyze, Architect, Activate, Advance.",
    cols: [
      {
        heading: "For the whole organization",
        sub: "Run across every function and location.",
        tools: [
          { name: "Spectra LMS",                    stage: "Activate · Advance",         desc: "Edstellar's enterprise learning management system. It hosts, delivers and tracks learning across the organization, from enrollment to completion reporting.", href: null },
          { name: "Capability Intelligence Platform",stage: "Assess · Analyze · Advance", desc: "Brings assessment and psychometric results together into one live view of workforce capability.", href: null }, // page not ready yet
          { name: "TNA/TNI Engine",                  stage: "Analyze",                    desc: "Turns employee, job-description and skills data into skill-gap matrices and training roadmaps.", href: null }, // page not ready yet
          { name: "Stellar AI",                      stage: "Architect",                  desc: "Recommends training programs by job role, skills and experience level.", href: null }, // page not ready yet
        ],
      },
      {
        heading: "For selected leaders, teams and employees",
        sub: "Used with the leaders, teams and employees an engagement targets.",
        tools: [
          { name: "Zenith",   stage: "Analyze",           desc: "Edstellar's own leadership assessment for selection, succession and development decisions.", href: null }, // page not ready yet
          { name: "Orbit",    stage: "Analyze",           desc: "Edstellar's 360-degree feedback tool, gathering structured input from managers, peers and reports.", href: null }, // page not ready yet
          { name: "Polaris",  stage: "Analyze · Activate",desc: "Edstellar's team intervention tool for understanding and strengthening how teams work together.", href: null }, // page not ready yet
          { name: "Meridian", stage: "Activate",          desc: "AI-assisted virtual one-on-one coaching that connects leaders with certified coaches.", href: null }, // page not ready yet
        ],
      },
    ],
  },

  /* ── FAQ ── */
  faq: {
    heading: "Who we serve <span>FAQs.</span>",
    items: [
      {
        q: "What types of organizations does Edstellar work with?",
        a: "Edstellar works with start-ups, small and mid-sized businesses, mid-market companies, enterprises, non-profits, educational institutions and government and public sector bodies, in 100+ countries and 10+ languages.",
      },
      {
        q: "How does Edstellar support enterprise learning and development?",
        a: "For enterprises and multinational companies, Edstellar centralizes training operations across countries and vendors, trains international staff in their languages, runs assessments at scale in Capability OS, builds leadership pipelines through academies and certified coaching, and reports across business units through managed learning services.",
        link: { text: "managed learning services", href: "/managed-learning-services", title: "Managed learning services and learning and development outsourcing" },
      },
      {
        q: "Does Edstellar work with non-profits?",
        a: "Yes. Edstellar runs systematic training for staff and volunteers, sized to the organization's resources, with visibility of training across dispersed teams and programs that strengthen delivery of the mission.",
      },
      {
        q: "Can Edstellar support an organization without an in-house L&D team?",
        a: "Yes. Edstellar can act as the L&D function, covering needs analysis, program design, delivery and administration through managed training.",
        link: { text: "managed training", href: "/managed-learning-services/managed-training", title: "Managed training services and learning and development outsourcing" },
      },
      {
        q: "Does Edstellar provide training and development in the public sector?",
        a: "Yes. Edstellar delivers department-specific programs, compliance training aligned to regulatory requirements and centrally coordinated training across government entities. See training for government employees.",
        link: { text: "training for government employees", href: "/government-employees-training-courses", title: "Training for government employees and the public sector" },
      },
      {
        q: "How does Edstellar support universities and colleges?",
        a: "Edstellar runs leadership programs for administrators, faculty development and industry-aligned courses that prepare students for their careers. See training for universities.",
        link: { text: "training for universities", href: "/training-for-universities", title: "Training for universities, colleges and faculty" },
      },
      {
        q: "Which industries does Edstellar serve?",
        a: "Edstellar builds capability across 17 industries, including manufacturing, automotive, aerospace and defense, energy, oil and gas, banking, insurance, IT services, telecommunications, healthcare, pharmaceuticals, retail, FMCG and logistics.",
      },
      {
        q: "Can Edstellar deliver training across several countries and languages?",
        a: "Yes. Edstellar delivers in 100+ countries and 10+ languages, through virtual instructor-led, onsite and blended formats, coordinated as one program.",
      },
      {
        q: "How does an engagement with Edstellar usually start?",
        a: "Most engagements start with a conversation with an Edstellar expert, followed by a diagnostic such as a training needs analysis or a capability assessment. From there, every engagement follows the Edstellar 5A methodology: Assess, Analyze, Architect, Activate and Advance.",
      },
      {
        q: "Does Edstellar offer its own technology?",
        a: "Yes. Edstellar's own technology includes Spectra LMS, the Capability Intelligence Platform, the TNA/TNI Engine and Stellar AI for organization-wide use, and Zenith, Orbit, Polaris and Meridian for leadership assessment, 360-degree feedback, team effectiveness and coaching.",
      },
    ],
  },

  /* ── Contact form ── */
  contact: {
    heading: "Book an Edstellar <span>consultation.</span>",
    lede: "Tell us your organization type, size and goals, and an Edstellar specialist will recommend the right first step for organizations like yours.",
    bullets: [
      "The usual first step for your organization type",
      "Examples from similar organizations",
      "A scoped proposal within one business day",
    ],
    form: {
      heading: "Book a consultation",
      submit_label: "Book a consultation",
      submit_title: "Book a consultation with an Edstellar expert",
      requirements_placeholder: "Tell us about your organization: size, locations, the capability you want to build, and preferred timing.",
    },
  },
};
