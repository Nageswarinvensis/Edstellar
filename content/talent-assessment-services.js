/**
 * Content for the Talent Assessment Services pillar/hub page
 * (`/talent-assessment-services`).
 *
 * Hand-built, pure-SSG consulting pillar (TASTE.md §2.2): static data with no
 * reads, no `cache()` and no `fetch`. The page imports it directly and composes
 * sections. Fields are `snake_case` to match the shared and assessment-specific
 * sections. Sub-pages (behavioral, assessment & development centers) live under
 * `content/talent-assessment/` and render through the `[slug]` route.
 */

const FORM_ANCHOR = "#apply";

// Employee-lifecycle stages, in order; each explorer family flags which apply.
const LIFECYCLE_STAGES = [
  "Campus & pre-hire",
  "Hiring decisions",
  "Onboarding",
  "Individual development",
  "First-time managers",
  "Promotion & succession",
  "Leadership & coaching",
  "Team & culture",
  "Safety & compliance",
];

export const TALENT_ASSESSMENT_SERVICES = {
  seo: {
    title: "Talent Assessment Services & Psychometric Testing",
    description:
      "Edstellar talent assessment services cover psychometric tests, pre-employment, skills and leadership assessments, 360 feedback and assessment centers.",
    image:
      "https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/69e883a6e2cc403eabdeeadf_Corporate%20Talent%20Assessment%C2%A0Services%20for%20Workforce%20Readiness.webp",
  },

  breadcrumbs: [
    { href: "/", label: "Home" },
    { label: "Talent Assessment Services" },
  ],

  hero: {
    title: "Talent Assessment Services",
    tagline: "Build the evidence your talent decisions need.",
    description:
      "Edstellar runs online assessments and in-person talent assessments for recruitment, development and succession. Psychometric tests, pre-employment screening and employee assessments measure behavior, skills and potential with validated instruments, verify every rating against a second source, and turn the findings into data-driven talent decisions and development.",
    showMeta: true,
    primaryBtnText: "Book an assessment consultation",
    primaryBtnHref: FORM_ANCHOR,
    secondaryBtnText: "Explore assessment services",
    secondaryBtnHref: "#services",
    learning_system: {
      title: "One verified evidence base",
      footer_text: "Behavior, skills and alignment, verified as one.",
      items: [
        { title: "Behavior", description: "Personality, reasoning and emotional intelligence", icon: "Users" },
        { title: "Skills", description: "Proficiency against the role standard", icon: "Target" },
        { title: "Alignment", description: "360 feedback, potential and culture", icon: "Network" },
        { title: "Simulation", description: "Assessment and development centers", icon: "Heart" },
        { title: "Verification", description: "Manager and assessor confirmation", icon: "RotateCw" },
      ],
    },
  },

  proof: {
    stats: [
      { value: "13,650+", label: "Assessments" },
      { value: "300+", label: "Clients" },
      { value: "20+", label: "Industries" },
      { value: "ISO 9001 & 27001", label: "Certified" },
    ],
    ctaTitle: "Ready to make talent decisions on evidence?",
    primaryBtnText: "Book a consultation",
    primaryBtnHref: FORM_ANCHOR,
    secondaryBtnText: "Download the assessments brochure (PDF)",
    secondaryBtnHref: "/brochures/talent-assessment-services",
  },

  sticky_nav: {
    logo: { src: "/course/Edstellar.svg", alt: "Edstellar" },
    tabs: [
      { id: "problem", label: "Why assess" },
      { id: "maturity-model", label: "Maturity" },
      { id: "services", label: "Types" },
      { id: "suite", label: "Suite" },
      { id: "centers", label: "Centers" },
      { id: "engagement", label: "Engagements" },
      { id: "why", label: "Why Edstellar" },
      { id: "faq", label: "FAQ" },
    ],
    cta: { text: "Book a consultation", title: "Book a consultation", targetId: "apply" },
  },

  positioning: {
    section_id: "problem",
    heading: "Stronger talent decisions start with <span>better evidence.</span>",
    lede: "Most enterprises make their biggest people decisions with less evidence than they would accept for a budget line.",
    body: "Hiring panels trust a good interview. Promotions go to the strongest performer in the current role, whether or not they can lead the next one. Skill records come from self-ratings nobody checks. Each call feels reasonable in the moment, and together they leave the organization guessing about the capability it actually has. A structured talent assessment measures people against the role, not against each other, and verifies every rating before anyone acts on it.",
    issues: [
      {
        icon: "user-x",
        title: "Mis-hires that surface months later",
        description: "Fit problems show up after onboarding, salary and team time are already spent.",
        tag: "Impact: costly hiring",
      },
      {
        icon: "trending-up",
        title: "Top performers promoted into the wrong role",
        description: "Success in the current role is a weak predictor of the next one, so the bench looks deeper than it is.",
        tag: "Impact: thin bench",
      },
      {
        icon: "bar-chart",
        title: "Skill data nobody has verified",
        description: "Unchecked self-ratings send people to programs they do not need while real gaps go untouched.",
        tag: "Impact: misdirected spend",
      },
    ],
  },

  maturity_model: {
    section_id: "maturity-model",
    heading: "The Edstellar assessment <span>maturity model.</span>",
    lede: "Five stages of talent assessment maturity, from ad hoc testing to assessment built into talent management. Edstellar moves your assessment practice up the curve, level by level, until every talent decision runs on verified evidence.",
    axis: "↑ Evidence quality & decision impact",
    levels: [
      { name: "Informal", height: 20, tone: "navy-deep", points: ["Decisions by interview and instinct", "No shared role standard", "Evidence is anecdotal"] },
      { name: "Inconsistent", height: 40, tone: "navy", points: ["Some tools in use", "Each team uses its own scale", "Results are hard to compare"] },
      { name: "Instrumented", height: 60, tone: "navy-soft", points: ["Validated instruments", "Role standards defined", "One scale across the business"] },
      { name: "Integrated", height: 80, tone: "lime-soft", light: true, points: ["Ratings verified by a second source", "Linked to development and succession", "Decisions made on evidence"] },
      { name: "Intelligent", height: 100, tone: "lime", light: true, points: ["Assessment runs every cycle", "Reassessment proves the change", "Data predicts readiness ahead"] },
    ],
    note: "Most enterprises sit at Levels 1–2.",
    more_intro: "The model is a path, not a scorecard you fill in once. Each level is a genuine step change from the one before, so here is what each stage looks like and what it takes to reach the next.",
    more_levels: [
      { n: 1, name: "Informal", description: "Talent decisions rest on interviews, references and the judgment of whoever is in the room. There is no shared definition of what good looks like in a role, so two managers can reach opposite conclusions about the same person. The move to Inconsistent begins when the organization starts using structured tools at all." },
      { n: 2, name: "Inconsistent", description: "Tools are in use, but each team picked its own. Hiring uses one test, development uses another, and ratings sit on different scales, so results cannot be compared across functions or regions. Reaching Instrumented means agreeing role standards and a common set of validated instruments." },
      { n: 3, name: "Instrumented", description: "Assessment is consistent. Validated instruments are matched to role standards and everyone is measured on the same scale. The gap now is trust and use: ratings still rest on a single source, and results rarely change what happens next. Integrated is where verification and the link to development close that gap." },
      { n: 4, name: "Integrated", description: "Every rating is verified by a manager or an assessor, and results feed directly into development plans, succession and mobility decisions. The organization makes talent calls on evidence rather than opinion. The last step is making assessment continuous instead of an annual event." },
      { n: 5, name: "Intelligent", description: "Assessment runs every cycle. Reassessment shows what development changed, readiness for critical roles is visible before a vacancy opens, and capability data shapes workforce planning. Evidence compounds, and the assessment practice becomes a source of advantage rather than an HR process." },
    ],
    more_impact: "<b>What it means for the business.</b> The higher you climb, the more it shows where the business feels it: fewer costly mis-hires, promotions that succeed, a bench you can name for every critical role, and development spend aimed at verified gaps. Near the top of the curve, talent decisions stop being a gamble and start being something you can defend to the board.",
  },

  readiness_cta: {
    section_id: "maturity",
    heading: "Start by measuring your <span>assessment readiness.</span>",
    lede: "Nine questions place your assessment practice on the five-stage curve, show your top diagnostic gaps, and recommend the next step. It takes about three minutes.",
    dims: ["Informal", "Inconsistent", "Instrumented", "Integrated", "Intelligent"],
    cta: { label: "Start the free 3-minute readiness check", href: "/tool/talent-assessment-services" },
  },

  explorer: {
    section_id: "services",
    heading: "Psychometric, skills and leadership assessments, <span>all from Edstellar.</span>",
    lede: "58 psychometric tests, skills and leadership assessments in 14 families, from pre-employment and recruitment tests to employee assessments and full assessment centers. Choose a family to see what it measures, who it suits and where it fits in the employee lifecycle.",
    lifecycle_stages: LIFECYCLE_STAGES,
    families: [
      {
        tab: "Personality & work style",
        title: "Personality & work style",
        description: "Psychometric personality assessments of the traits, preferences and motivators that shape how people work, for role fit and culture fit.",
        segments: [
          { label: "You receive", items: ["Role-fit profile against a job benchmark", "Strengths and watch-outs", "Coaching and interview prompts"] },
          { label: "Audience", items: ["Professional roles", "Managers", "Leaders"] },
          { label: "Use cases", items: ["Role-fit discussions", "Self-awareness and coaching", "Career conversations"] },
        ],
        links: [{ label: "Explore psychometric assessment", href: "/psychometric-assessment" }],
        assessments: [
          { name: "Personality questionnaire", instruments: ["16PF", "16 PF Management", "Saville (Wave® Professional / Focus Styles)"] },
          { name: "Work-style profile", instruments: ["Factors (Talogy)", "Work Style Lens"] },
          { name: "Work preferences and motivation", instruments: ["PAPI", "Saville Workplace Profile"] },
          { name: "Personality type indicator", instruments: ["MBTI"] },
          { name: "Personality plus reasoning predictor", instruments: ["Talogy Caliper™"] },
        ],
        lifecycle: [false, true, true, true, false, true, false, false, false],
      },
      {
        tab: "Leadership & potential",
        title: "Leadership & potential",
        description: "Leadership assessment and executive assessment of capability, high-potential readiness for bigger roles and the risks that can derail it.",
        segments: [
          { label: "You receive", items: ["Readiness rating per target role", "Nine-box placement", "Top three development priorities"] },
          { label: "Audience", items: ["Managers", "Senior leaders", "High potentials"] },
          { label: "Use cases", items: ["Succession planning", "High-potential identification", "Executive coaching"] },
        ],
        links: [{ label: "Explore leadership assessment", href: "/leadership-assessment" }],
        assessments: [
          { name: "Leadership potential assessment", instruments: ["Talogy InView Leadership", "Talogy Caliper™"] },
          { name: "Derailer and risk profile", instruments: ["Hogan (HPI/HDS/MVPI)"] },
          { name: "Leadership style and influence diagnostic", instruments: ["Diamond Leadership (Diamond Power Index®)"] },
          { name: "Leadership behaviors profile", instruments: ["Everything DiSC® Work of Leaders"] },
          { name: "Values and motivators profile", instruments: ["Hogan (HPI/HDS/MVPI)"] },
        ],
        lifecycle: [false, true, false, false, false, true, true, false, false],
      },
      {
        tab: "Multi-rater feedback",
        title: "Multi-rater feedback",
        description: "360-degree feedback on how a person's behavior is experienced by manager, peers and reports.",
        segments: [
          { label: "You receive", items: ["Individual feedback report", "Blind spots and hidden strengths", "Facilitated debrief"] },
          { label: "Audience", items: ["Managers", "Leaders", "High potentials"] },
          { label: "Use cases", items: ["Leadership development", "Succession input", "Progress checks between cycles"] },
        ],
        links: [{ label: "Explore 360-degree feedback", href: "/organizational-alignment-consulting" }],
        assessments: [
          { name: "360-degree feedback", instruments: ["Talogy 360"] },
          { name: "180 and 90-degree pulses", instruments: [] },
          { name: "Inclusive behaviors feedback", instruments: ["Talogy Perceptions™"] },
        ],
        lifecycle: [false, false, false, true, false, true, true, false, false],
      },
      {
        tab: "Cognitive ability",
        title: "Cognitive ability & reasoning",
        description: "Psychometric aptitude tests of how well people reason, solve problems and learn, often used as pre-employment assessments.",
        segments: [
          { label: "You receive", items: ["Percentile scores against a relevant norm group", "Shortlist recommendations", "Interview probes for borderline results"] },
          { label: "Audience", items: ["Graduates", "Analysts", "Managers", "Technical roles"] },
          { label: "Use cases", items: ["Graduate and professional screening", "Selection for analytical roles", "Promotion into complex roles"] },
        ],
        links: [{ label: "Explore cognitive ability testing", href: "/cognitive-ability-assessment" }],
        assessments: [
          { name: "Critical thinking test", instruments: ["WATSON-GLASER™ III"] },
          { name: "Abstract reasoning test", instruments: ["RAVEN'S™ Adaptive"] },
          { name: "Numerical reasoning and data interpretation", instruments: ["NDIT™"] },
          { name: "Verbal reasoning test", instruments: ["Logiks"] },
          { name: "General aptitude battery", instruments: ["Logiks", "DAT™ Next Generation"] },
          { name: "Mechanical comprehension test", instruments: ["BMCT-II"] },
        ],
        lifecycle: [true, true, false, false, false, true, false, false, false],
      },
      {
        tab: "Simulations & centers",
        title: "Simulations & assessment centers",
        description: "Observed behavior in realistic exercises, rated by trained assessors.",
        segments: [
          { label: "You receive", items: ["Competency ratings with evidence", "Readiness rating", "Development plans"] },
          { label: "Audience", items: ["Managers", "Leaders", "High potentials"] },
          { label: "Use cases", items: ["Senior hiring and promotion", "Succession decisions", "Leadership development centers"] },
        ],
        links: [{ label: "Explore assessment & development centers", href: "/talent-assessment-services/assessment-development-centers-consulting" }],
        assessments: [
          { name: "Assessment center", instruments: ["Virtual Assessment Center"] },
          { name: "Development center", instruments: ["VirtualAC™ (Talogy)"] },
          { name: "Virtual assessment center", instruments: ["Virtual Assessment Center", "VirtualAC™ (Talogy)"] },
          { name: "Business simulation", instruments: [] },
          { name: "Role play and in-tray exercises", instruments: [] },
        ],
        lifecycle: [false, true, false, false, false, true, true, false, false],
      },
      {
        tab: "Emotional intelligence",
        title: "Emotional intelligence & resilience",
        description: "Self-awareness, empathy, emotional agility and how people cope under pressure.",
        segments: [
          { label: "You receive", items: ["Emotional intelligence and resilience profile", "Development priorities", "Coaching action plan"] },
          { label: "Audience", items: ["Leaders", "Managers", "High-pressure roles"] },
          { label: "Use cases", items: ["Leadership effectiveness", "Change and transformation readiness", "Coaching focus areas"] },
        ],
        links: [{ label: "Explore emotional intelligence assessment", href: "/emotional-intelligence-assessment" }],
        assessments: [
          { name: "Emotional intelligence profile", instruments: ["EIP3 (Emotional Intelligence Profile)"] },
          { name: "Emotional agility profile", instruments: ["Everything DiSC® Agile EQ™"] },
          { name: "Resilience questionnaire", instruments: ["Resilience Questionnaire (Talogy)"] },
        ],
        lifecycle: [false, false, false, true, false, true, true, false, false],
      },
      {
        tab: "Behavioral style",
        title: "Behavioral style & communication",
        description: "How people communicate, collaborate and respond to others day to day.",
        segments: [
          { label: "You receive", items: ["Individual style report", "Team style map", "Workshop and coaching guides"] },
          { label: "Audience", items: ["All employees", "People managers", "Sales teams"] },
          { label: "Use cases", items: ["Team communication workshops", "Manager capability building", "Sales onboarding and coaching"] },
        ],
        links: [{ label: "Explore behavioral assessment", href: "/talent-assessment-services/behavioral-assessment" }],
        assessments: [
          { name: "Workplace behavioral style profile", instruments: ["Everything DiSC® Workplace Profile", "Everything DiSC Agile"] },
          { name: "Manager style profile", instruments: ["Everything DiSC® Management", "Everything DiSC Development"] },
          { name: "Interpersonal needs profile", instruments: ["FIRO-B"] },
          { name: "Sales communication style", instruments: ["Everything DiSC® Sales"] },
        ],
        lifecycle: [false, false, true, true, true, false, false, true, false],
      },
      {
        tab: "Strengths & careers",
        title: "Strengths & career direction",
        description: "Natural talents, career interests and where people do their best work, for career planning and internal mobility.",
        segments: [
          { label: "You receive", items: ["Personal strengths report", "Career direction options", "Development conversation guide"] },
          { label: "Audience", items: ["All employees", "Early-career talent", "Internal movers"] },
          { label: "Use cases", items: ["Career and mobility conversations", "Onboarding and engagement", "Learning pathway planning"] },
        ],
        links: [{ label: "Explore behavioral assessment", href: "/talent-assessment-services/behavioral-assessment" }],
        assessments: [
          { name: "Strengths profile", instruments: ["Gallup's CliftonStrengths"] },
          { name: "Career interest inventory", instruments: ["Which Career for Me: Professional"] },
          { name: "Work-style lens", instruments: ["Work Style Lens"] },
        ],
        lifecycle: [false, false, true, true, true, false, false, false, false],
      },
      {
        tab: "Team effectiveness",
        title: "Team effectiveness",
        description: "Trust, conflict, commitment, accountability and results across a team.",
        segments: [
          { label: "You receive", items: ["Team report and heatmap", "Facilitated team session", "Agreed team commitments"] },
          { label: "Audience", items: ["Intact teams", "Project groups", "Cross-functional groups"] },
          { label: "Use cases", items: ["Team formation and offsites", "Conflict resolution", "First-time manager teams"] },
        ],
        links: [{ label: "Explore team effectiveness assessment", href: "/team-effectiveness-assessment" }],
        assessments: [
          { name: "Team development profile", instruments: ["The Five Behaviors® Team Development"] },
          { name: "Personal collaboration profile", instruments: ["The Five Behaviors® Personal Development"] },
          { name: "Team strengths grid", instruments: ["Gallup's CliftonStrengths (Team Grid)"] },
          { name: "Team diagnostic", instruments: [] },
        ],
        lifecycle: [false, false, true, false, true, false, false, true, false],
      },
      {
        tab: "Culture & engagement",
        title: "Culture, engagement & climate",
        description: "What people experience at work, and how leadership shapes it.",
        segments: [
          { label: "You receive", items: ["Culture and engagement dashboard", "Gaps by team and level", "Priority actions"] },
          { label: "Audience", items: ["Business units", "Teams", "People leaders"] },
          { label: "Use cases", items: ["Culture change", "Measuring program impact", "Onboarding experience"] },
        ],
        links: [
          { label: "Explore culture assessment", href: "/culture-assessment" },
          { label: "Explore employee engagement survey", href: "/employee-engagement-survey" },
        ],
        assessments: [
          { name: "Engagement and experience pulse", instruments: ["Mindgage"] },
          { name: "Culture and climate survey", instruments: ["Talogy Perceptions™"] },
          { name: "Leadership climate indicator", instruments: ["LCI (Leadership Climate Indicator)"] },
          { name: "Inclusion survey", instruments: ["Talogy Perceptions™"] },
        ],
        lifecycle: [false, false, true, false, false, false, true, true, false],
      },
      {
        tab: "Early careers hiring",
        title: "Early careers & high-volume hiring",
        description: "Pre-employment assessments that screen potential, reliability and fit for large intakes, quickly and fairly, with a consistent candidate experience.",
        segments: [
          { label: "You receive", items: ["Ranked candidate pools", "Fairness monitoring report", "Hiring-manager shortlists"] },
          { label: "Audience", items: ["Graduates and interns", "Entry-level roles", "Hourly roles"] },
          { label: "Use cases", items: ["Campus hiring", "Hourly and frontline hiring", "Top-of-funnel self-selection"] },
        ],
        links: [{ label: "Explore pre-employment assessment", href: "/pre-employment-assessment" }],
        assessments: [
          { name: "Early-careers assessment battery", instruments: ["Talogy Spotlight"] },
          { name: "High-volume screening battery", instruments: ["Talogy I-Grade"] },
          { name: "Values and culture-fit screen", instruments: ["Capture (Talogy)"] },
          { name: "Configurable selection battery", instruments: ["Talogy Hire"] },
        ],
        lifecycle: [true, true, false, false, false, false, false, false, false],
      },
      {
        tab: "Situational judgment",
        title: "Situational judgment & structured interviews",
        description: "The choices people make in realistic work scenarios, scored consistently.",
        segments: [
          { label: "You receive", items: ["Judgment scores by competency", "Interview guides and scorecards", "Panel calibration"] },
          { label: "Audience", items: ["Graduates", "Professional and frontline roles", "Interview panels"] },
          { label: "Use cases", items: ["Early behavioral screening", "Fairer, more consistent interviews", "Development diagnostics"] },
        ],
        links: [{ label: "Explore pre-employment assessment", href: "/pre-employment-assessment" }],
        assessments: [
          { name: "Situational judgment test", instruments: ["Dilemmas Series™ (Talogy)"] },
          { name: "Competency-based interview guide", instruments: ["CBI Smart"] },
          { name: "Structured interview scoring", instruments: ["CBI Smart"] },
        ],
        lifecycle: [true, true, false, true, false, false, false, false, false],
      },
      {
        tab: "Skills & language",
        title: "Skills & language proficiency",
        description: "Skills assessments and skills gap analysis that verify role-specific proficiency for skills-based hiring and development, including English communication.",
        segments: [
          { label: "You receive", items: ["Verified proficiency by skill", "Skill-gap matrix by role", "Training placement"] },
          { label: "Audience", items: ["Customer-facing roles", "Global teams", "Support and technical roles"] },
          { label: "Use cases", items: ["Hiring thresholds for client-facing roles", "Placement into training levels", "Before-and-after training measurement"] },
        ],
        links: [
          { label: "Explore skills assessment", href: "/skill-gap-competency-assessment" },
          { label: "Explore English proficiency assessment", href: "/language-proficiency-assessment" },
        ],
        assessments: [
          { name: "Technical skill proficiency test", instruments: [] },
          { name: "Functional knowledge test", instruments: [] },
          { name: "English proficiency (speaking, writing, reading, listening)", instruments: ["IELTS", "Aptis (British Council)", "EnglishScore"] },
          { name: "Spoken English screen", instruments: ["Versant"] },
          { name: "Baseline English test", instruments: ["Foundation English Test"] },
          { name: "Digital and AI readiness", instruments: [] },
        ],
        lifecycle: [true, true, true, true, false, false, false, false, false],
      },
      {
        tab: "Safety & risk",
        title: "Safety, risk & compliance",
        description: "Attitudes and behaviors that predict safe, reliable and compliant work.",
        segments: [
          { label: "You receive", items: ["Risk flags at hiring", "Safety culture profile", "Targeted coaching"] },
          { label: "Audience", items: ["Manufacturing", "Oil and gas", "Logistics and operations"] },
          { label: "Use cases", items: ["Hiring for safety-critical roles", "Safety culture programs", "Compliance risk reduction"] },
        ],
        links: [{ label: "Explore pre-employment assessment", href: "/pre-employment-assessment" }],
        assessments: [
          { name: "Safety attitudes assessment", instruments: ["Safety DNA"] },
          { name: "Risk behavior profile", instruments: ["Safety DNA"] },
          { name: "Integrity and reliability screen", instruments: ["Talogy I-Grade"] },
        ],
        lifecycle: [true, true, false, false, false, false, false, false, true],
      },
    ],
    cta: {
      heading: "Not sure which assessments fit your roles?",
      description: "Edstellar's assessors will recommend the right mix for each talent decision.",
      btn_label: "Get a recommended assessment mix",
      href: FORM_ANCHOR,
    },
  },

  suite: {
    section_id: "suite",
    heading: "Edstellar's own assessment tools, for leaders, people and <span>teams.</span>",
    lede: "Alongside validated third-party instruments, Edstellar runs its own talent assessment tools: Zenith, Orbit and Polaris. Each answers one talent question, and they are designed to work together, so the findings from one feed the next.",
    tools: [
      {
        mark: "Z",
        name: "Zenith",
        kicker: "Leadership assessment",
        description: "Zenith assesses leaders against twelve competencies in four clusters, from leading strategy to leading results. It also surfaces derailers, blind spots and learning agility to show who is ready for a bigger role.",
        badges: [{ n: "12", label: "competencies" }, { n: "4", label: "clusters" }],
        extras: ["Derailers", "Blind spots", "Learning agility"],
        use_cases: ["Succession planning", "High-potential identification", "Leadership development"],
        audience: "Managers, Senior leaders, High potentials",
        cta: { label: "Explore Zenith", href: "/zenith" },
      },
      {
        mark: "O",
        name: "Orbit",
        kicker: "360-degree feedback",
        description: "Orbit gathers ratings from a person's manager, peers, direct reports and the person themselves. It shows where self-view and others' view differ, with comments grouped by rater type and kept anonymous.",
        badges: [{ n: "4", label: "rater groups" }],
        extras: ["Anonymous comments", "Grouped by rater"],
        use_cases: ["Leadership development", "Development planning", "Progress checks between cycles"],
        audience: "Managers, Leaders, High potentials",
        cta: { label: "Explore Orbit", href: "/orbit" },
      },
      {
        mark: "P",
        name: "Polaris",
        kicker: "Team diagnostic and intervention",
        description: "Polaris diagnoses a team across six dimensions: trust, alignment, communication, decision making, leadership and performance. It combines the sponsor's view before the session with an in-room pulse during it.",
        badges: [{ n: "6", label: "dimensions" }, { n: "2", label: "views" }],
        extras: ["Sponsor view, before", "Team pulse, in the room"],
        use_cases: ["Team offsites", "Conflict resolution", "New or merged teams"],
        audience: "Intact teams, Leadership teams, Project teams",
        cta: { label: "Explore Polaris", href: "/polaris" },
      },
    ],
  },

  centers: {
    section_id: "centers",
    heading: "Inside an Edstellar assessment <span>center.</span>",
    lede: "A center places people in realistic situations from the target role while trained assessors watch what they actually do. Several exercises, several assessors and a structured integration session make it the most robust evidence for high-stakes talent decisions. Edstellar runs centers in person or as a virtual assessment center.",
    columns: [
      {
        kicker: "To decide",
        title: "Assessment center",
        question: "Who should get the role?",
        meta: [
          { label: "Results go to", value: "The hiring manager and the decision panel" },
          { label: "Main output", value: "A ranked readiness rating for each candidate" },
        ],
        examples_label: "Typical examples",
        examples: [
          "Selecting a regional sales head from external finalists",
          "Promoting team leads into first-line manager roles",
          "Choosing graduates for a management trainee program",
          "Filling a plant or site head role from internal candidates",
          "Shortlisting candidates for a senior leadership position",
          "Selecting high potentials into a talent pool",
        ],
        exercises_label: "Exercises used",
        exercises: ["In-tray exercise", "Case study analysis", "Group discussion", "Presentation", "Fact-finding exercise", "Competency-based interview"],
      },
      {
        dark: true,
        kicker: "To develop",
        title: "Development center",
        question: "What does this person need to grow?",
        meta: [
          { label: "Results go to", value: "The participant first, then their manager" },
          { label: "Main output", value: "An individual development plan" },
        ],
        examples_label: "Typical examples",
        examples: [
          "Building a successor pool for critical roles",
          "Launching a high-potential leadership program",
          "Developing first-time managers after promotion",
          "Setting development plans for newly appointed senior managers",
          "Preparing leaders for a merger or restructuring",
          "Checking readiness before an international assignment",
        ],
        exercises_label: "Exercises used",
        exercises: ["Role play", "Business simulation", "Group discussion", "Case study analysis", "Presentation", "In-tray exercise"],
      },
    ],
    cta: {
      label: "Explore assessment & development centers",
      href: "/talent-assessment-services/assessment-development-centers-consulting",
    },
  },

  engagement: {
    section_id: "engagement",
    heading: "The Edstellar talent assessment <span>process.</span>",
    description: "Edstellar's talent assessment services run in six steps, from scoping the roles to reassessing the results. A typical cohort takes about six weeks from kickoff to development plans, and timelines scale with population size and the number of instruments.",
    get_label: "You get",
    steps: [
      { week: "Week 1", title: "Scope", description: "Run a job analysis, then define role profiles and the competency framework.", chips: ["Stakeholder interviews", "Role profiles"], get: "Scope and role profiles" },
      { week: "Weeks 1 to 2", title: "Design", description: "Select validated tools, configure them and pilot with a small group.", chips: ["Tool selection", "Pilot"], get: "Configured instrument set" },
      { week: "Weeks 2 to 4", title: "Assess", description: "Run assessments online or in person, with quality checks throughout.", chips: ["Delivery", "Manager verification"], get: "Verified results" },
      { week: "Weeks 4 to 5", title: "Debrief", description: "Practitioners analyze results and debrief individuals and leaders.", chips: ["Gap analysis", "Debriefs"], get: "Debrief and gap report" },
      { week: "Weeks 5 to 6", title: "Develop", description: "Map findings to programs, coaching or organizational development.", chips: ["Learning pathways", "Action plans"], get: "Development plans" },
      { week: "After development", title: "Reassess", description: "Measure change against the baseline and report the result.", chips: ["Reassessment", "Impact report"], get: "Before-and-after report" },
    ],
  },

  transformation: {
    section_id: "transform",
    heading: "Your talent decisions, <span>on evidence.</span>",
    lede: "By the end of the six-step engagement, your assessment practice moves from informal and inconsistent to integrated and intelligent, with talent decisions you can defend.",
    before_label: "Before: where most organizations start",
    before: [
      "Hiring decided on interview impressions",
      "Promotions based on current performance alone",
      "Skill records built on unchecked self-ratings",
      "Every team using its own tools and scales",
      "Assessment reports filed and forgotten",
    ],
    after_label: "After: with Edstellar",
    after: [
      "Role-based assessment for every critical hire",
      "Readiness measured before anyone is promoted",
      "Every rating verified against a second source",
      "One standard and one scale across the business",
      "Findings that start development and get reassessed",
    ],
    cta: {
      heading: "Ready to put your talent decisions on evidence?",
      description: "Scope your first assessment engagement with an Edstellar specialist.",
      primary: { label: "Plan your assessment engagement", href: FORM_ANCHOR },
      secondary: { label: "Take the readiness check", href: "/tool/talent-assessment-services" },
    },
  },

  why: {
    section_id: "why",
    heading: "Why choose Edstellar for <span>talent assessments.</span>",
    description: "A vendor-neutral talent assessment partner that selects validated instruments from leading publishers for each role, verifies every rating, and connects the findings to development and talent management, so the evidence holds up when someone challenges it.",
    difference_label: "The difference",
    items: [
      {
        icon: "link",
        title: "Assessment to development, one partner",
        description: "Findings turn into action, because the team that assesses also maps every result to training, coaching or OD work.",
        visual: { type: "flow", items: ["Assess", "Interpret", "Develop"], caption: "One team, from measurement to development" },
        difference: "Many assessment vendors stop at the report. Edstellar connects it to development.",
      },
      {
        icon: "chip",
        title: "Runs on the Capability Intelligence Platform",
        description: "You always know who is ready and where the gaps sit, with a live picture of verified skills between assessment cycles.",
        visual: { type: "signal", title: "Capability signal", status: "Live", items: ["Verified:74", "Skills:56", "Bench:63"] },
        difference: "Your skills data stays live, not frozen in a PDF.",
      },
      {
        icon: "chart",
        title: "A built-in verification layer",
        description: "Line managers confirm or adjust every self-rating and assessors add observed evidence, with an audit trail for each disagreement.",
        visual: { type: "flow", items: ["Self", "Manager", "Assessor"], caption: "Three sources, one verified rating" },
        difference: "Ratings you can defend, not self-reports you hope are right.",
      },
      {
        icon: "globe",
        title: "Certified assessors, wherever your people are",
        description: "Assessments run online, in person or blended across 100+ locations, configured for the language and context of each region.",
        visual: { type: "regions", items: ["APAC", "Middle East", "Europe", "Americas"], caption: "Online · in-person · blended" },
        difference: "The same standard in every country you assess.",
      },
      {
        icon: "list",
        title: "A proven method, not improvisation",
        description: "Every engagement runs the same six steps, from scope to reassessment, with validated instruments chosen for what they predict.",
        visual: { type: "steps", items: [1, 2, 3, 4, 5, 6], caption: "Scope · Design · Assess · Debrief · Develop · Reassess" },
        difference: "A repeatable system, not a bespoke experiment each time.",
      },
      {
        icon: "sliders",
        title: "One partner across measurement, skills and structure",
        description: "When findings call for new skills or a different organization, assessments, L&D and OD come from one partner, not three vendors.",
        visual: { type: "tiers", items: ["L&D", "OD", "Assessments"], caption: "One partner, one conversation" },
        difference: "Measure, develop and restructure, from one team.",
      },
    ],
    trust: {
      heading: "Trusted across industries and regions",
      industries: [
        { label: "Financial services", icon: "landmark" },
        { label: "Technology", icon: "monitor" },
        { label: "Healthcare", icon: "cross" },
        { label: "Manufacturing", icon: "factory" },
        { label: "Retail & consumer", icon: "bag" },
        { label: "Aviation & maritime", icon: "zap" },
      ],
      more_label: "20+ in all",
      regions_label: "Delivered across",
      regions: ["APAC", "Middle East", "Europe", "Americas"],
      caption_strong: "Fortune 500",
      caption: "clients served worldwide",
    },
  },

  related_links: {
    section_id: "related",
    heading: "Where the evidence <span>goes next.</span>",
    lede: "Assessment data does the most when it feeds the work that follows. These Edstellar services pick up where the findings leave off.",
    items: [
      { kicker: "Prioritize", title: "Training Needs Analysis", description: "Turn individual results into an organization-wide view of which gaps to close first.", cta: "Diagnose the gaps", href: "/training-needs-analysis" },
      { kicker: "Develop", title: "Corporate Training Programs", description: "Close the gaps you found with 2,000+ instructor-led programs across domains.", cta: "Browse programs", href: "/corporate-training" },
      { kicker: "Develop", title: "Coaching Solutions", description: "Turn 360 and development-center findings into one-to-one leadership growth.", cta: "Explore coaching", href: "/coaching-services" },
      { kicker: "Restructure", title: "Organizational Development", description: "When the findings point to structure, culture or succession, OD takes them further.", cta: "Explore OD consulting", href: "/organizational-development-consulting" },
      { kicker: "Build", title: "L&D Consulting", description: "Design the learning strategy and system that keeps capability growing.", cta: "Build capability", href: "/learning-development-consulting-services" },
    ],
  },

  faqs: {
    heading: "Talent assessment services <span>FAQs.</span>",
    items: [
      { question: "What is a talent assessment?", answer: "A talent assessment is a structured, repeatable way to measure an individual's capabilities, behaviors and potential against a defined standard, using validated instruments and more than one source of evidence. It produces data you can defend in recruitment, hiring, promotion, succession and development decisions." },
      { question: "How is a talent assessment different from a training needs analysis?", answer: "A training needs analysis works at the level of the organization and its roles: it identifies which capability gaps matter most and what training should close them. A talent assessment works at the level of the individual: it measures how capable, ready or suited each person is. Many engagements use both, with the assessment data feeding the needs analysis." },
      { question: "Which types of talent assessment does Edstellar offer?", answer: "Edstellar runs 58 assessments in 14 families: cognitive ability, personality and work style, behavioral style, emotional intelligence and resilience, strengths and career direction, leadership and potential, situational judgment and structured interviews, skills and language proficiency, early careers and high-volume hiring, multi-rater feedback, team effectiveness, culture and engagement, safety and risk, and simulations and assessment centers." },
      { question: "Does Edstellar have its own assessment tools?", answer: "Yes. Alongside validated third-party instruments, Edstellar runs its own tools: Zenith for leadership assessment, Orbit for 360-degree feedback, and Polaris for team diagnostics." },
      { question: "What is the difference between an assessment center and a development center?", answer: "Both use the same method: <a href=\"/talent-assessment-services/assessment-development-centers-consulting\">several realistic exercises</a> observed by trained assessors. An assessment center is run to make a decision, such as a hire or a promotion, and its results go to the decision panel. A development center is run to help the participant grow, so detailed feedback goes to the participant first and the main output is a development plan." },
      { question: "How do you make sure an assessment is valid and fair?", answer: "Edstellar selects instruments with published reliability and validity evidence, scopes them to role profiles rather than generic skill lists, and triangulates at least two sources of evidence for each decision. Results are interpreted by trained practitioners, and norm groups are checked for relevance to your workforce and regions. Results are also reviewed for adverse impact between groups, so the process stays fair and free from avoidable bias." },
      { question: "Can assessments be run virtually and across countries?", answer: "Yes. Edstellar runs online assessments with remote proctoring, in-person and blended assessments, and virtual assessment centers across more than 100 delivery locations. Instruments and exercises are configured for the language and context of each region." },
      { question: "What happens after the assessment reports are delivered?", answer: "Practitioners debrief stakeholders, convert findings into prioritized development actions, and connect them to training programs, coaching or organizational development work. A reassessment cycle then measures the capability change against the original baseline." },
      { question: "How is candidate and employee data protected?", answer: "Assessment data is collected only for the stated purpose, access is limited to agreed stakeholders, and individual results are reported under the confidentiality terms set at scoping. Edstellar holds ISO/IEC 27001:2022 certification for information security management." },
      { question: "What psychometric assessments does Edstellar use?", answer: "Edstellar uses psychometric personality questionnaires, cognitive and aptitude tests, emotional intelligence profiles and situational judgment tests, selected from leading test publishers for each role, so every psychometric test fits the job. Every instrument is chosen for the decision at hand, whether that is hiring, employee assessment for development, or succession." },
      { question: "Can Edstellar run pre-employment assessments for high-volume hiring?", answer: "Yes. For recruitment at scale, including campus and high-volume hiring, Edstellar combines short online screening batteries, aptitude tests and situational judgment tests into one hiring assessment, with ranked shortlists for each role and fairness monitoring across candidate groups." },
      { question: "Does Edstellar offer leadership assessment for succession planning?", answer: "Yes. Edstellar combines leadership assessment, 360-degree feedback and development centers to show who is ready now, who is ready later, and what each high-potential leader needs to grow into a critical role." },
      { question: "How much do talent assessment services cost?", answer: "Cost depends on the number of people assessed, the instruments chosen, whether assessors run live exercises such as an assessment center, and how much debriefing and development planning you need. Edstellar scopes each engagement before quoting, so you pay only for the evidence your decision requires." },
      { question: "How long does a talent assessment engagement take?", answer: "A typical cohort engagement takes about six weeks from kickoff to development plans. Online psychometric and skills assessments can be completed within days, while assessment centers and reassessment add time depending on population size." },
    ],
  },

  lead_form: {
    heading: "Book an assessment <span>consultation.</span>",
    description: "Tell Edstellar the talent decision you are facing. A specialist replies within one business day with a scoped response, no automated sales sequence.",
    requirements_label: "Your requirements",
    requirements_placeholder: "Tell us about the roles, the talent decision (hiring, promotion, succession or development), how many people and your timing.",
    submit_label: "Book a consultation",
    sla_note: "We reply within one business day with a scoped response, no automated sales sequence.",
    thanks_heading: "Request received.",
    thanks_body: "Thanks. A talent assessment specialist will reply within one business day with a scoped response.",
  },

  sticky_footer: {
    form_anchor_id: "apply",
    email: true,
    brochure: { href: "/brochures/talent-assessment-services", label: "Download brochure" },
    cta: { label: "Book a consultation", href: FORM_ANCHOR },
    messages: [
      { highlight: "58 assessments in 14 families", suffix: "vendor-neutral, chosen for each role" },
      { highlight: "Every rating verified", suffix: "against a second source" },
      { highlight: "From kickoff to development plans", suffix: "in about six weeks" },
    ],
  },
};

export default TALENT_ASSESSMENT_SERVICES;
