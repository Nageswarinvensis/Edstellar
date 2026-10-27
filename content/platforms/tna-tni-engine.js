export const tnaTniEngine = {
  seo: {
    title: "TNA/TNI Engine: Training Needs Analysis Tool · Edstellar",
    description:
      "Edstellar's TNA/TNI Engine runs the full training needs analysis cycle, from employee data to a validated, prioritized training roadmap, calendar and IDPs.",
    ogImage: "https://www.edstellar.com/og/tna-tni-engine.webp",
  },

  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Platforms", href: "/platforms" },
    { label: "TNA/TNI Engine", href: null },
  ],

  hero: {
    heading: "TNA/TNI Engine",
    subheadingLine2: "Every training need, <span>backed by evidence</span>.",
    subheading:
      "Edstellar's TNA/TNI Engine runs your complete training needs analysis and training needs identification cycle, from raw employee data to a validated, prioritized training roadmap and calendar.",
    points: [
      "Self, manager, assessment and focus-group evidence behind every need",
      "Needs ranked by gap, criticality and headcount",
      "A TNA report, roadmap, calendar and IDPs at the end of one cycle",
    ],
    ctas: [
      { label: "Request a demo", href: "#contact", variant: "primary" },
      { label: "See how it works", href: "#how-it-works", variant: "secondary" },
    ],
  },

  evidence: {
    heading: "Training needs confirmed by <span>four sources of evidence</span>.",
    subheading:
      "The TNA/TNI Engine never treats a single survey answer as a training need. Each need is built from four independent sources on the same person, then tested before it reaches the plan.",
    sources: [
      { title: "Self-rating", desc: "How employees see their own proficiency" },
      { title: "Manager rating", desc: "What managers observe in the role" },
      { title: "Assessments", desc: "Objective scores from skills and talent assessments" },
      { title: "Focus groups", desc: "Why the gap exists, from the people doing the work" },
    ],
    outcomes: [
      {
        tag: "Corroborates",
        style: "dark",
        title: "The need goes ahead with more confidence.",
        desc: "The gap moves into the TNI with its evidence attached.",
      },
      {
        tag: "Contradicts",
        style: "outline",
        title: "The gap is routed to the right owner.",
        desc: "Process, tooling or structure causes become non-training interventions.",
      },
      {
        tag: "Extends",
        style: "lime",
        title: "A new need is added to the framework.",
        desc: "It enters through a governed, versioned framework amendment.",
      },
    ],
    safeguards: [
      {
        title: "Rating calibration",
        body: "Department Heads review flagged ratings and calibrate with an attributed reason. Original ratings are always kept.",
      },
      {
        title: "Perception gap",
        body: "The difference between self and manager ratings is shown as its own signal, so you know how far to trust each gap.",
      },
    ],
  },

  howItWorks: {
    heading: "One TNA/TNI cycle, from raw data to a <span>training calendar</span>.",
    subheading:
      "Twelve steps in five phases. Each phase hands a finished output to the next, so the analysis always runs on approved data and a locked framework.",
    phases: [
      {
        id: "setup",
        label: "Set up",
        stepsRange: "Steps 01–03",
        intro: {
          heading: "Set up the cycle, the data and the framework.",
          body: "A guided setup captures how your organization is shaped. Your people data comes in clean, and the framework the analysis runs against is approved and locked.",
          handover: "A clean employee master and a locked, versioned competency framework",
        },
        steps: [
          { number: "01", title: "Organization setup", body: "Cycle dates, departments, job-level bands, industry template, currency and data residency, captured once in a guided setup." },
          { number: "02", title: "Data import", body: "Employee master, job descriptions, competency framework and assessment results come in through Excel, HRIS sync or manual entry, with column mapping, a dry run and a readiness check before anything is applied." },
          { number: "03", title: "Competency framework", body: "Skills and competencies by role, job level and department, in your own domain taxonomy, each with a required proficiency level and a criticality rating." },
        ],
      },
      {
        id: "assess",
        label: "Assess",
        stepsRange: "Step 04",
        intro: {
          heading: "Assess every employee against their own role.",
          body: "The survey is generated from the locked framework, so each person rates only the skills and competencies their role actually needs.",
          handover: "A skills matrix and the list of gaps to probe in focus groups",
        },
        steps: [
          { number: "04", title: "Skills survey", body: "Employees self-assess and their managers rate the same items on a 7-point half-step proficiency scale, with behavioral statements for competencies. Employees can add their own development requests. Assessment results sit alongside the ratings as an objective measure, and survey analysis flags the gaps worth probing." },
        ],
      },
      {
        id: "validate",
        label: "Validate",
        stepsRange: "Steps 05–06",
        intro: {
          heading: "Validate the ratings before they become needs.",
          body: "Department Heads bring consistency across teams, and focus groups test the survey findings with the people closest to the work.",
          handover: "Calibrated ratings and themes tied to the findings they test",
        },
        steps: [
          { number: "05", title: "Rating calibration", body: "Department Heads review flagged manager ratings and either send them back for revision or calibrate with an attributed override and a reason. HR oversees every change." },
          { number: "06", title: "Focus group discussions", body: "Selected participants in mixed cross-functional groups discuss the flagged gaps. Every theme is tied to the survey finding it tests and tagged corroborates, contradicts or extends." },
        ],
      },
      {
        id: "analyze",
        label: "Analyze",
        stepsRange: "Steps 07–09",
        intro: {
          heading: "Analyze the gaps that matter most.",
          body: "All four sources reconcile into one need set, gaps are ranked, and the findings are written up for leadership.",
          handover: "An approved TNA report with prioritized needs",
        },
        steps: [
          { number: "07", title: "Consolidation", body: "Self rating, manager rating, assessment results and focus-group evidence reconcile into one source-traced need set per person." },
          { number: "08", title: "Gap analysis", body: "Role-by-skill and role-by-competency matrices, priority from gap × criticality × headcount, and the perception gap between self and manager ratings." },
          { number: "09", title: "TNA report", body: "Executive summary, priority needs, domain-level gap charts, findings and recommendations, edited in draft and then approved and locked." },
        ],
      },
      {
        id: "plan",
        label: "Plan",
        stepsRange: "Steps 10–12",
        intro: {
          heading: "Plan programs, dates and individual paths.",
          body: "Needs become programs, programs become a roadmap and calendar, and every employee receives a plan of their own.",
          handover: "A roadmap, a training calendar, IDPs and learning paths",
        },
        steps: [
          { number: "10", title: "TNI and programs", body: "Individual needs deduplicated into programs and ranked, plus non-training interventions for process, tooling and OD gaps, each routed to the right owner." },
          { number: "11", title: "Roadmap and training calendar", body: "A quarter-wise roadmap within your cycle window, blackout dates and capacity, scheduled into a training calendar with cohorts and sessions." },
          { number: "12", title: "IDPs and learning paths", body: "An individual development plan for each employee, rolled up to department and organization, and a sequenced learning path paced against training capacity." },
        ],
      },
    ],
  },

  ai: {
    heading: "AI drafts the work, <span>your team decides</span>.",
    subheading:
      "The TNA/TNI Engine uses AI to draft the slow parts of a cycle. A person reviews every draft and chooses one of three actions.",
    actions: [
      { key: "Accept", body: "Use the AI draft as it is.", highlight: true },
      { key: "Modify", body: "Correct the draft before it is saved.", highlight: false },
      { key: "Manual", body: "Set the draft aside and do the step yourself.", highlight: false },
    ],
    chips: [
      "Job description parsing",
      "Skill matching",
      "Focus-group synthesis",
      "Program grouping",
      "Learning paths",
      "Report narrative",
    ],
    note: "Every action is logged, and AI can be switched off for any step.",
  },

  roles: {
    heading: "One Edstellar engine with a home for <span>every role</span>.",
    subheading:
      "Four role-based portals. Each person sees only the records in their scope, from the whole organization down to their own plan.",
    items: [
      {
        scope: "Whole organization",
        title: "Admin (HR or L&D)",
        points: [
          "Runs setup, data import and the framework",
          "Deploys the survey and schedules focus groups",
          "Approves the TNA report, roadmap and calendar",
          "Manages users, roles and the audit log",
        ],
      },
      {
        scope: "Their department",
        title: "Department Head",
        points: [
          "Sees every team in the department",
          "Reviews flagged manager ratings",
          "Calibrates or sends ratings back, with a reason",
          "Reviews department gaps and plans",
        ],
      },
      {
        scope: "Their team",
        title: "Manager",
        points: [
          "Rates each direct report",
          "Sees the gaps the team shares",
          "Reviews and adjusts team development plans",
          "Accepts or modifies learning-path steps",
        ],
      },
      {
        scope: "Their own record",
        title: "Employee",
        points: [
          "Completes their self-assessment",
          "Adds their own development requests",
          "Sees their skills, gaps and plan",
          "Follows their learning path",
        ],
      },
    ],
  },

  features: {
    heading: "TNA/TNI Engine features for <span>every stage of the cycle</span>.",
    modules: [
      {
        title: "Organization setup",
        count: "05",
        points: [
          "Guided five-step setup",
          "Industry templates for fields and standards",
          "Job-level bands you can rename",
          "Custom fields",
          "Cycle window, currency and data residency",
        ],
      },
      {
        title: "Data import",
        count: "06",
        points: [
          "Excel upload with column mapping",
          "HRIS sync",
          "Manual entry",
          "Dry run and readiness check",
          "Job description and framework import",
          "Assessment results import",
        ],
      },
      {
        title: "Competency framework",
        count: "05",
        points: [
          "Skills dictionary in your own taxonomy",
          "Required level by role, level and department",
          "Criticality from C1 to C4",
          "Flagged items resolved before lock",
          "Versioned sign-off and governed amendments",
        ],
      },
      {
        title: "Skills survey",
        count: "06",
        points: [
          "Questions generated for each role",
          "Self and manager rating",
          "7-point half-step proficiency scale",
          "Behavioral statements for competencies",
          "Completion tracking and reminders",
          "Employee development requests",
        ],
      },
      {
        title: "Validation",
        count: "05",
        points: [
          "Exception-based rating calibration",
          "Send-back to managers",
          "Focus-group grouping, scheduling and invites",
          "AI extraction from session notes",
          "Corroborates, contradicts and extends tagging",
        ],
      },
      {
        title: "Gap analysis",
        count: "05",
        points: [
          "Role × skill and role × competency matrices",
          "Priority from gap × criticality × headcount",
          "Perception gap by department and item",
          "Individual gap profiles",
          "Coverage and low-confidence flags",
        ],
      },
      {
        title: "Reports and planning",
        count: "06",
        points: [
          "Composable TNA report, edited then locked",
          "TNI with deduplicated program demand",
          "Non-training interventions routed to owners",
          "Quarter-wise roadmap with blackout windows",
          "Training calendar with cohorts and sessions",
          "IDPs and sequenced learning paths",
        ],
      },
      {
        title: "Governance and access",
        count: "05",
        points: [
          "Four role-based portals",
          "Row-level data scope",
          "Editable permission matrix",
          "Accept, modify and manual AI control",
          "Activity and AI audit logs",
        ],
      },
    ],
  },

  deliverables: {
    heading: "Everything an Edstellar TNA/TNI cycle <span>hands over</span>.",
    subheading:
      "Seven outputs, each traceable to the evidence behind it, so HR, leadership, managers and employees each receive the part they act on.",
    items: [
      {
        number: "01",
        title: "TNA report",
        body: "Executive summary, priority needs, domain-level gap charts, findings and recommendations.",
        use: "Take one evidence-backed case to leadership.",
      },
      {
        number: "02",
        title: "Prioritized needs",
        body: "Every need with its gap, criticality, headcount and the sources that raised it.",
        use: "Fund the needs that matter most first.",
      },
      {
        number: "03",
        title: "TNI and programs",
        body: "Needs grouped into programs, with audiences and cohorts kept intact.",
        use: "Brief training delivery on real, measured demand.",
      },
      {
        number: "04",
        title: "Non-training interventions",
        body: "Process, tooling and OD gaps, each with a recommended owner.",
        use: "Keep the training budget for needs training can close.",
      },
      {
        number: "05",
        title: "Quarter-wise roadmap",
        body: "Programs sequenced by priority within your dates, blackouts and capacity.",
        use: "Show leadership the plan for the whole cycle.",
      },
      {
        number: "06",
        title: "Training calendar",
        body: "Sessions, cohorts and dates scheduled from the approved roadmap.",
        use: "Hand delivery a schedule that is ready to run.",
      },
      {
        number: "07",
        title: "IDPs and learning paths",
        body: "A development plan and a sequenced learning path for every employee.",
        use: "Give managers and employees their own next steps.",
      },
    ],
  },

  form: {
    heading: "Connect with Edstellar for a <span>TNA/TNI Engine demo</span>.",
    subheading:
      "See a complete cycle on sample data, from setup to the training calendar, and talk through how you would run it.",
    intent: "tna-tni-engine",
    submitLabel: "Request a demo",
    sla_note: "We reply within one business day to arrange your demo, no automated sales sequence.",
    successMessage:
      "An Edstellar consultant will be in touch within one business day to arrange your TNA/TNI Engine demo.",
    nextSteps: [
      {
        number: "1",
        title: "Share your context",
        desc: "Headcount in scope, roles and when your next cycle starts.",
      },
      {
        number: "2",
        title: "See the Engine run a sample cycle",
        desc: "Every portal, from Admin to Employee, and the outputs at the end.",
      },
      {
        number: "3",
        title: "Choose how you run it",
        desc: "With Edstellar's consultants, or deployed by your own team.",
      },
    ],
    extraSelect: {
      name: "employees_in_scope",
      label: "Employees in scope",
      optional: true,
      options: ["Under 250", "250 to 1,000", "1,000 to 5,000", "5,000 to 20,000", "Over 20,000"],
    },
    requirementsPlaceholder:
      "Your next TNA cycle, the roles in scope, or anything you want the demo to cover",
  },
};
