/**
 * Static content for the /who-we-serve page.
 * All sections are driven from this single file; swap the export for an API
 * call later without touching any component.
 */

export const pageData = {
  /* ── Hero ── */
  hero: {
    eyebrow: "Who Edstellar serves",
    heading: "Organizations Edstellar serves, <span>from start-ups to governments.</span>",
    lede: "Edstellar builds workforce capability for start-ups, growing businesses, enterprises, non-profits, educational institutions and public bodies, with consulting, assessments, coaching, managed training and programs delivered in 100 countries and more than 10 languages.",
    primaryBtn: { text: "Talk to an Edstellar expert", href: "#contact" },
    secondaryBtn: { text: "Find your organization type", href: "#types" },
    orbit: [
      { id: "startup",    label: "Start-up",    left: "50.0%", top: "9.0%"  },
      { id: "smb",        label: "SMB",         left: "82.1%", top: "24.4%" },
      { id: "midmarket",  label: "Mid-market",  left: "90.0%", top: "59.1%" },
      { id: "enterprise", label: "Enterprise",  left: "67.8%", top: "86.9%" },
      { id: "nonprofit",  label: "Non-profit",  left: "32.2%", top: "86.9%" },
      { id: "education",  label: "Education",   left: "10.0%", top: "59.1%" },
      { id: "government", label: "Government",  left: "17.9%", top: "24.4%" },
    ],
  },

  /* ── Proof strip ── */
  proof: [
    { value: "100",      label: "countries served" },
    { value: "10+",      label: "delivery languages" },
    { value: "2,000+",   label: "instructor-led programs" },
    { value: "ISO 9001", label: "2015 certified quality" },
    { value: "ISO 27001",label: "2022 certified information security" },
  ],

  /* ── Logo marquee ── */
  logos: {
    label: "Trusted by teams at",
    items: [
      { src: "https://media.edstellar.com/client_logo/Microsoft.webp",          alt: "Microsoft" },
      { src: "https://media.edstellar.com/client_logo/Amazon.webp",   alt: "Amazon" },
      { src: "https://media.edstellar.com/client_logo/Intel2.webp",              alt: "Intel" },
      { src: "https://media.edstellar.com/client_logo/Adobe.webp",               alt: "Adobe" },
      { src: "https://media.edstellar.com/client_logo/JohnsonJohnson_1.webp", alt: "Johnson & Johnson" },
      { src: "https://media.edstellar.com/client_logo/visa.webp",                alt: "VISA" },
      { src: "https://media.edstellar.com/client_logo/Boston_consulting_group.webp", alt: "Boston Consulting Group" },
      { src: "https://media.edstellar.com/client_logo/KPMG.webp",               alt: "KPMG" },
      { src: "https://media.edstellar.com/client_logo/Abb.webp",                alt: "ABB" },
      { src: "https://media.edstellar.com/client_logo/Emerson.webp",            alt: "Emerson" },
      { src: "https://media.edstellar.com/client_logo/Total.webp",              alt: "TotalEnergies" },
      { src: "https://media.edstellar.com/client_logo/Bechtel.webp",            alt: "Bechtel" },
      { src: "https://media.edstellar.com/client_logo/AutoDesk.webp",           alt: "Autodesk" },
      { src: "https://media.edstellar.com/client_logo/Uber.svg",               alt: "Uber" },
      { src: "https://media.edstellar.com/client_logo/MediaTek.webp",           alt: "MediaTek" },
      { src: "https://media.edstellar.com/client_logo/Regeneron_Science_to_Medicine.webp", alt: "Regeneron" },
      { src: "https://media.edstellar.com/client_logo/Aditya_Birla_Group.webp", alt: "Aditya Birla Group" },
      { src: "https://media.edstellar.com/client_logo/Tata_Chemicals.webp",     alt: "Tata Chemicals" },
      { src: "https://media.edstellar.com/client_logo/godrej.webp",             alt: "Godrej" },
      { src: "https://media.edstellar.com/client_logo/Kelloggs.webp",        alt: "Kellogg's" },
      { src: "https://media.edstellar.com/client_logo/Sandvik_Coromant.webp", alt: "Sandvik Coromant" },
      { src: "https://media.edstellar.com/client_logo/littlefuse.webp",         alt: "Littelfuse" },
      { src: "https://media.edstellar.com/client_logo/Smarsh.webp",             alt: "Smarsh" },
      { src: "https://media.edstellar.com/client_logo/Greystar.webp",           alt: "Greystar" },
    ],
  },

  /* ── Sticky section nav ── */
  stickyNav: {
    logo: { src: "/course/Edstellar.svg", alt: "Edstellar" },
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

  /* ── Organization types explorer ── */
  orgExplorer: {
    heading: "Edstellar capability <span>at every scale.</span>",
    lede: "Businesses run from start-up to enterprise, with the social and public sector alongside. Select one to see how Edstellar fits.",
    services: [
      { label: "L&D and OD consulting",   href: "/learning-development-consulting-services" },
      { label: "Training needs analysis", href: "/training-needs-analysis-solutions" },
      { label: "Talent assessments",      href: "/talent-assessment-services" },
      { label: "Coaching",                href: "/coaching-solutions" },
      { label: "Managed training",        href: "/managed-training-services" },
      { label: "Training programs",       href: "/corporate-training-courses" },
      { label: "Academies",               href: "/edstellar-academies" },
    ],
    types: [
      {
        id: "startup",
        label: "Start-up",
        heading: "Start-up",
        tagline: "Lean, fast capability building that keeps pace with growth.",
        ticks: [
          "Focused programs on the skills the next stage of growth needs",
          "Support for first-time managers as teams form",
          "Virtual delivery that fits tight schedules and distributed teams",
          "A training approach that scales as headcount grows",
        ],
        tools: ["Meridian"],
        fit: [1, 2, 2, 2, 2, 3, 1],
      },
      {
        id: "smb",
        label: "Small and medium",
        heading: "Small and medium business",
        tagline: "Learning and development benefits without building a dedicated L&D team.",
        ticks: [
          "Edstellar acts as the L&D function, from needs analysis to delivery",
          "Programs tailored to client-specific work or internal skill gaps",
          "Clear insight into training effectiveness and employee progress",
          "Access to more than 2,000 instructor-led programs across domains",
        ],
        tools: ["Spectra LMS"],
        fit: [2, 3, 2, 2, 3, 3, 1],
      },
      {
        id: "midmarket",
        label: "Mid-market",
        heading: "Mid-market",
        tagline: "Structured learning and development as the organization outgrows informal training.",
        ticks: [
          "An L&D strategy and annual plan built with Edstellar consultants",
          "Needs analysis that directs budget to the skills that matter most",
          "Coaching for managers stepping into larger roles",
          "Managed training that extends a small in-house L&D team",
        ],
        tools: ["Capability Intelligence Platform", "Meridian"],
        fit: [3, 3, 2, 3, 3, 3, 2],
      },
      {
        id: "enterprise",
        label: "Enterprise",
        heading: "Enterprise",
        tagline: "One partner for capability building across business units, locations and languages.",
        ticks: [
          "Training operations centralized across locations and vendors",
          "Assessments at scale, tracked on the Capability Intelligence Platform",
          "Leadership pipelines built through academies and certified coaching",
          "A structured annual calendar with consolidated reporting across units",
        ],
        tools: ["Capability Intelligence Platform", "Spectra LMS", "Zenith", "Meridian"],
        exploreHref: "/enterprise-corporate-training",
        exploreLabel: "Explore enterprise corporate training",
        fit: [3, 3, 3, 3, 3, 3, 3],
      },
      {
        id: "nonprofit",
        label: "Non-profit",
        heading: "Non-profit",
        tagline: "Structured development for staff and volunteers that multiplies impact.",
        ticks: [
          "Systematic training for staff and volunteers, sized to resources",
          "Visibility of training across dispersed teams",
          "Social impact programs alongside core skills training",
          "Programs that strengthen delivery of the organization's mission",
        ],
        tools: ["Spectra LMS"],
        exploreHref: "/type/social-impact-training",
        exploreLabel: "Explore social impact training",
        fit: [2, 2, 1, 2, 2, 3, 1],
      },
      {
        id: "education",
        label: "Education",
        heading: "Educational institutions",
        tagline: "Capability for administrators, faculty and students.",
        ticks: [
          "Leadership programs that help administrators run institutions well",
          "Industry-aligned courses that prepare students for their careers",
          "Faculty development across disciplines",
          "A unified view of training across campuses and offices",
        ],
        tools: ["Spectra LMS"],
        exploreHref: "/training-for-universities",
        exploreLabel: "Explore training for universities",
        fit: [2, 2, 2, 2, 2, 3, 2],
      },
      {
        id: "government",
        label: "Government",
        heading: "Government and public sector",
        tagline: "Department-specific capability with regulatory alignment built in.",
        ticks: [
          "Training coordinated centrally across departments and budgets",
          "Compliance training aligned to each department's regulations",
          "Role-specific programs for the skills each department needs",
          "A consolidated view of training across government entities",
        ],
        tools: ["Capability Intelligence Platform", "Spectra LMS"],
        exploreHref: "/government-employees-training-courses",
        exploreLabel: "Explore training for government",
        fit: [3, 3, 3, 2, 3, 3, 2],
      },
    ],
  },

  /* ── CTA band ── */
  ctaBand: {
    heading: "Edstellar maps the right starting point <span>for your organization.</span>",
    lede: "Share your goals, team size and locations, and an Edstellar expert recommends where to begin.",
    btn: { text: "Talk to an Edstellar expert", href: "#contact" },
  },

  /* ── Industries capability heat map ── */
  industries: {
    heading: "Edstellar builds capability <span>industry by industry.</span>",
    lede: "Every industry runs on different roles, regulations and technology. Edstellar maps the capability each one depends on, measures where teams stand and builds what is missing, with progress tracked on the Capability Intelligence Platform.",
    steps: [
      { n: "01", label: "Map the value chain" },
      { n: "02", label: "Measure where teams stand" },
      { n: "03", label: "Build what is missing" },
      { n: "04", label: "Keep capability visible" },
    ],
    cols: [
      "Compliance and safety",
      "Quality and operations",
      "Technical depth",
      "Digital and AI",
      "Customer and commercial",
      "Leadership",
    ],
    // d2 = Critical, d1 = Important, d0 = Situational
    rows: [
      { label: "Manufacturing",               href: "/industries/manufacturing",          dots: [2,2,2,1,0,2] },
      { label: "Automotive",                  href: "/industries/automotive",             dots: [2,2,2,2,1,1] },
      { label: "Aerospace and defense",       href: "/industries/aerospace-defense",      dots: [2,2,2,1,0,2] },
      { label: "Engineering and construction",href: "/industries/engineering-construction",dots:[2,2,1,1,1,2] },
      { label: "Electronics and semiconductors",href:"/industries/electronics-semiconductors",dots:[1,2,2,2,0,1]},
      { label: "Chemicals",                   href: "/industries/chemicals",              dots: [2,2,2,1,0,1] },
      { label: "Energy and utilities",        href: "/industries/energy-utilities",       dots: [2,1,2,2,1,1] },
      { label: "Oil and gas",                 href: "/industries/oil-gas",                dots: [2,2,2,1,0,2] },
      { label: "Banking and financial services",href:"/industries/banking-financial-services",dots:[2,1,1,2,2,1]},
      { label: "Insurance",                   href: "/industries/insurance",              dots: [2,1,1,2,2,1] },
      { label: "IT services",                 href: "/industries/it-services",            dots: [1,1,2,2,2,2] },
      { label: "Telecommunications",          href: "/industries/telecommunications",     dots: [1,1,2,2,2,1] },
      { label: "Healthcare",                  href: "/industries/healthcare",             dots: [2,2,1,1,2,2] },
      { label: "Pharmaceuticals",             href: "/industries/pharmaceuticals",        dots: [2,2,2,1,1,1] },
      { label: "Retail",                      href: "/industries/retail",                 dots: [1,1,0,2,2,2] },
      { label: "FMCG and consumer goods",     href: "/industries/fmcg-consumer-goods",   dots: [1,2,0,2,2,1] },
      { label: "Logistics and transportation",href: "/industries/logistics-transportation",dots:[2,2,1,2,1,1] },
    ],
  },

  /* ── Roles / leaders map ── */
  roles: {
    heading: "Where Edstellar starts <span>with each leader.</span>",
    lede: "Different leaders bring different goals. These are the usual first steps Edstellar takes with each of them.",
    tiers: [
      {
        tier: "Sets direction",
        cards: [
          {
            role: "CEO and board",
            goal: "Set direction and succession",
            desc: "Strategy, leadership succession and organization-wide transformation.",
            links: [
              { label: "CEO retreats",        href: "/ceo-retreats" },
              { label: "Succession planning", href: "/leadership-succession-planning-consulting" },
            ],
          },
        ],
      },
      {
        tier: "Shapes the people agenda",
        cards: [
          {
            role: "CHRO and HR leaders",
            goal: "Shape the people agenda",
            desc: "Workforce capability, leadership pipelines and talent decisions grounded in evidence.",
            links: [
              { label: "Talent assessments",          href: "/talent-assessment-services" },
              { label: "Organizational development",  href: "/organizational-development-consulting" },
            ],
          },
          {
            role: "L&D leaders",
            goal: "Run learning that moves the business",
            desc: "A training plan tied to business priorities, delivered without adding headcount.",
            links: [
              { label: "Training needs analysis", href: "/training-needs-analysis-solutions" },
              { label: "Managed training",        href: "/managed-training-services" },
            ],
          },
        ],
      },
      {
        tier: "Runs the business",
        cards: [
          {
            role: "Function and business leaders",
            goal: "Get teams ready for what is next",
            desc: "Specific skills for a team, a rollout or a new market, ready when the business needs them.",
            links: [
              { label: "Training programs", href: "/corporate-training-courses" },
              { label: "Coaching",          href: "/coaching-solutions" },
            ],
          },
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
      { heading: "Locations",  lo: "Single location",  hi: "100 countries",    icon: "pin" },
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
        a: "Edstellar works with start-ups, small and medium businesses, mid-market companies, enterprises, non-profits, educational institutions and government and public sector bodies, in 100 countries and more than 10 languages.",
      },
      {
        q: "Can Edstellar support an organization without an in-house L&D team?",
        a: "Yes. Edstellar can act as the L&D function, covering needs analysis, program design, delivery and administration through managed training.",
        link: { text: "managed training", href: "/managed-training-services" },
      },
      {
        q: "Does Edstellar work with government and public sector organizations?",
        a: "Yes. Edstellar delivers department-specific programs, compliance training aligned to regulatory requirements and centrally coordinated training across government entities.",
        link: { text: "training for government employees", href: "/government-employees-training-courses" },
      },
      {
        q: "How does Edstellar support universities and colleges?",
        a: "Edstellar runs leadership programs for administrators, faculty development and industry-aligned courses that prepare students for their careers.",
        link: { text: "training for universities", href: "/training-for-universities" },
      },
      {
        q: "Which industries does Edstellar serve?",
        a: "Edstellar builds capability across 17 industries, including manufacturing, automotive, aerospace and defense, energy, oil and gas, banking, insurance, IT services, telecommunications, healthcare, pharmaceuticals, retail, FMCG and logistics.",
      },
      {
        q: "Can Edstellar deliver training across several countries and languages?",
        a: "Yes. Edstellar delivers in 100 countries and more than 10 languages, through virtual instructor-led, onsite and blended formats, coordinated as one program.",
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
    lede: "Tell us about your organization and what you want to achieve, and an Edstellar specialist will scope the right starting point.",
    form: {
      heading: "Book a consultation",
      submit_label: "Book a consultation",
      requirements_placeholder: "Tell us about your organization: size, locations, the capability you want to build, and preferred timing.",
    },
  },
};
