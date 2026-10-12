/**
 * Talent Assessment Services sub-page: Assessment & Development Centers
 * (`/talent-assessment-services/assessment-development-centers-consulting`).
 *
 * Static content for a hand-built, SSG sub-service. No reads/fetch/cache here —
 * `lib/content/talent-assessment.js` registers and serves it, and the `[slug]`
 * route renders it through a section registry (the OD sub-page pattern,
 * TASTE.md §6.3). Fields are `snake_case` to match the shared and
 * assessment-specific sections. Adding another sub-page is a new file like this
 * plus one line in the reader's registry.
 */

const FORM_ANCHOR = "#apply";

export const ASSESSMENT_DEVELOPMENT_CENTERS = {
  name: "Assessment & Development Center Services",

  seo: {
    title: "Assessment & Development Center Services",
    description:
      "Edstellar designs and runs assessment and development centers, in person or virtual, with realistic exercises and trained assessors for promotion and growth.",
    image:
      "https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/69e883a6e2cc403eabdeeadf_Corporate%20Talent%20Assessment%C2%A0Services%20for%20Workforce%20Readiness.webp",
  },

  breadcrumbs: [
    { href: "/", label: "Home" },
    { href: "/talent-assessment-services", label: "Talent Assessment Services" },
    { label: "Assessment & Development Centers" },
  ],

  // Middle-section order for this page (the `[slug]` route renders the frame).
  sections: [
    "concept",
    "benefits",
    "instruments",
    "inside",
    "readiness",
    "services",
    "process",
    "outputs",
    "why",
    "related",
    "faqs",
  ],

  hero: {
    title: "Assessment & Development Center Services",
    tagline: "See how people perform before you decide.",
    description:
      "Edstellar designs and runs assessment and development centers in person, as a virtual assessment center or in a hybrid format. Realistic exercises, psychometric tools and trained assessors show how people actually work, so promotion, succession and development decisions rest on observed evidence.",
    showMeta: true,
    primaryBtnText: "Book a center design consultation",
    primaryBtnHref: FORM_ANCHOR,
    secondaryBtnText: "Explore the tools",
    secondaryBtnHref: "#instruments",
    learning_system: {
      title: "One center design, four decisions",
      footer_text: "Observed behavior, interpreted by trained assessors.",
      items: [
        { title: "Promotion", description: "Readiness for the next level", icon: "Target" },
        { title: "Succession", description: "Ready-now and ready-later successors", icon: "Network" },
        { title: "Hiring", description: "Senior and graduate selection", icon: "Users" },
        { title: "Development", description: "Rich feedback and growth plans", icon: "RotateCw" },
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
    ctaTitle: "Ready to make your biggest talent decisions on observed evidence?",
    primaryBtnText: "Book a consultation",
    primaryBtnHref: FORM_ANCHOR,
    secondaryBtnText: "Download the assessments brochure (PDF)",
    secondaryBtnHref: "/brochures/talent-assessment-services",
  },

  sticky_nav: {
    logo: { src: "/course/Edstellar.svg", alt: "Edstellar" },
    tabs: [
      { id: "concept", label: "Method" },
      { id: "benefits", label: "Benefits" },
      { id: "instruments", label: "Tools" },
      { id: "inside", label: "Exercises" },
      { id: "services", label: "Services" },
      { id: "process", label: "Process" },
      { id: "outputs", label: "Outputs" },
      { id: "why", label: "Why Edstellar" },
      { id: "faq", label: "FAQ" },
    ],
    cta: { text: "Book a consultation", title: "Book a consultation", targetId: "apply" },
  },

  concept: {
    section_id: "concept",
    art: "competency-grid",
    // Decorative example grid shown beside the principles — every value here
    // drives the illustration (columns, row labels, observed cells, caption).
    grid: {
      columns: ["Decision", "Influence", "Leadership", "Communication"],
      rows: [
        { label: "In-tray", seen: [true, false, false, true] },
        { label: "Role play", seen: [false, true, true, true] },
        { label: "Group discussion", seen: [true, true, true, false] },
        { label: "Presentation", seen: [false, true, false, true] },
      ],
      caption: "Every competency, seen twice or more",
    },
    heading: "Many exercises, many observers, <span>one fair decision.</span>",
    description:
      "An assessment center and a development center use the same method: several realistic assessment center exercises, observed by trained assessors against clear competencies, with every competency seen in at least two different exercises, by at least two assessors. An assessment center informs a decision; a development center builds a growth plan. Edstellar designs both around four principles.",
    principles: [
      {
        title: "Realistic exercises",
        description:
          "In-tray exercises, role plays, group discussions, presentations and business simulations mirror the real challenges of the role.",
      },
      {
        title: "Clear competencies",
        description:
          "Job analysis and your competency framework set the five to eight competencies that matter most at the target level, and each one is observed at least twice.",
      },
      {
        title: "Trained assessors",
        description:
          "Assessors observe, record, classify and evaluate behavior consistently, using shared rating scales.",
      },
      {
        title: "An integration session",
        description:
          "In the wash-up session, assessors compare notes and agree every rating on the evidence, not on impressions.",
      },
    ],
  },

  benefits: {
    section_id: "benefits",
    heading:
      "Edstellar assessment and development centers that turn performance into <span>clear decisions.</span>",
    description:
      "Edstellar's assessment and development center services give leaders and HR the strongest evidence available for high-stakes talent decisions, so promotion, succession, hiring and leadership development all build on observed behavior.",
    items: [
      {
        title: "See real behavior, not just answers",
        icon: "eye",
        description:
          "Realistic exercises show how people actually plan, decide, influence and lead, alongside psychometric assessments.",
      },
      {
        title: "Promote with confidence",
        icon: "trending-up",
        description:
          "Assess readiness for the next level before the promotion or leadership hiring decision, so new leaders start strong.",
      },
      {
        title: "Build a stronger succession bench",
        icon: "users",
        description:
          "Identify high-potential employees and ready-now successors with evidence several assessors agree on, for confident succession planning.",
      },
      {
        title: "Richer development feedback",
        icon: "clipboard",
        description:
          "Development centers give each participant detailed feedback, high-potential insight and a clear growth plan.",
      },
      {
        title: "Fair, consistent and defensible",
        icon: "shield",
        description:
          "Multiple exercises, trained assessors and structured integration reduce bias and give every decision a documented rationale.",
      },
      {
        title: "In person, virtual or hybrid",
        icon: "globe",
        description:
          "Run centers on site, as a virtual or online assessment center or in a hybrid format, so cohorts across locations follow one rating standard.",
      },
    ],
  },

  instruments: {
    section_id: "instruments",
    heading: "Proven center tools, <span>chosen for each decision.</span>",
    description:
      "Edstellar combines realistic exercises with validated psychometric and leadership tools from leading publishers, choosing reliable instruments for the type of center and the decision each one supports.",
    table_label: "Assessment and development center tool fit",
    table_caption:
      "Tools used in assessment and development centers and how well each fits hiring decisions, assessment centers, development centers, and promotion and succession, in employee lifecycle order",
    fit_legend: {
      strong: "Strong fit",
      supporting: "Supporting evidence",
      none: "Not used for this",
    },
    lifecycle: {
      title:
        "Where Edstellar assessment and development centers fit in the employee lifecycle",
      audiences: ["Managers", "Leaders", "High potentials"],
      stages: [
        { label: "Campus & pre-hire", active: false },
        { label: "Hiring decisions", active: true },
        { label: "Onboarding", active: false },
        { label: "Individual development", active: false },
        { label: "First-time managers", active: false },
        { label: "Promotion & succession", active: true },
        { label: "Leadership & coaching", active: true },
        { label: "Team & culture", active: false },
        { label: "Safety & compliance", active: false },
      ],
    },
    columns: [
      "Hiring decisions",
      "Assessment center",
      "Development center",
      "Promotion & succession",
    ],
    groups: [
      {
        label: "Virtual center platforms",
        tools: [
          {
            name: "Virtual Assessment Center",
            note: "Role readiness through simulation-based leadership exercises",
            fit: [2, 2, 2, 2],
            best_used: "For leadership decisions where observed behavior matters most",
          },
          {
            name: "VirtualAC™ (Talogy)",
            note: "Observed behavior in simulations and leadership readiness",
            fit: [2, 2, 2, 2],
            best_used:
              "For high-stakes leadership decisions and development centers, with trained assessors and a clear competency model",
          },
        ],
      },
      {
        label: "Psychometric tools used alongside exercises",
        tools: [
          {
            name: "Talogy Caliper™",
            note: "Personality plus cognitive predictor of potential",
            fit: [2, 2, 0, 2],
            best_used: "In assessment centers for promotion and succession, with role benchmarking",
          },
          {
            name: "Hogan (HPI/HDS/MVPI)",
            note: "Leadership potential, derailers, values and motivators",
            fit: [2, 2, 2, 2],
            best_used: "With role profiling and qualified interpretation",
          },
          {
            name: "Saville (Wave® Professional / Focus Styles)",
            note: "Personality, competency potential, motives and culture fit",
            fit: [2, 2, 2, 2],
            best_used: "With job profiling and trained interpretation",
          },
        ],
      },
      {
        label: "Development center tools",
        tools: [
          {
            name: "Talogy InView Leadership",
            note: "Leadership potential, personality and capability",
            fit: [2, 0, 2, 2],
            best_used: "In development centers for succession, alongside other evidence",
          },
          {
            name: "Diamond Leadership (Diamond Power Index®)",
            note: "Use of power, influence and leadership efficacy",
            fit: [0, 0, 2, 2],
            best_used: "As a development diagnostic with a facilitated debrief",
          },
          {
            name: "Talogy 360",
            note: "Multi-rater feedback on leadership behavior",
            fit: [0, 0, 2, 2],
            best_used: "For development feedback, kept separate from pay decisions",
          },
          {
            name: "EIP3 (Emotional Intelligence Profile)",
            note: "Emotional intelligence and interpersonal effectiveness",
            fit: [0, 0, 2, 2],
            best_used: "For development with coaching and action planning",
          },
        ],
      },
    ],
    cta: {
      heading: "Get a recommended center design for your roles.",
      description:
        "An Edstellar specialist will match exercises and tools to your roles and decisions.",
      btn_label: "Talk to a specialist",
      href: FORM_ANCHOR,
    },
  },

  inside: {
    section_id: "inside",
    heading: "Inside an Edstellar assessment <span>and development center.</span>",
    description:
      "Realistic assessment center exercises, a competency matrix that observes every competency at least twice, and three formats that fit how your people work.",
    tabs: [
      {
        label: "Exercises",
        kind: "exercises",
        line_label: "Reveals:",
        items: [
          {
            icon: "inbox",
            title: "In-tray exercise",
            description: "A day's emails, reports and requests to prioritize and act on under time pressure.",
            line: "Planning, prioritizing, decision making",
          },
          {
            icon: "message",
            title: "Role play",
            description: "A meeting with a trained role player: a struggling team member, an unhappy client, a negotiation.",
            line: "Influence, coaching, handling conflict",
          },
          {
            icon: "file",
            title: "Case study analysis",
            description: "Business information to analyze, ending in a written or spoken recommendation.",
            line: "Analysis, commercial judgment, strategy",
          },
          {
            icon: "users",
            title: "Group discussion",
            description: "A group tackles a shared problem with no appointed leader.",
            line: "Collaboration, influence, emerging leadership",
          },
          {
            icon: "presentation",
            title: "Presentation",
            description: "A plan or recommendation presented to a panel, followed by challenging questions.",
            line: "Communication, structure, composure",
          },
          {
            icon: "search",
            title: "Fact-finding exercise",
            description: "Partial information to start, then questions to a resource person to reach a decision.",
            line: "Inquiry, information gathering, decisiveness",
          },
          {
            icon: "line-chart",
            title: "Business simulation",
            description: "A simulated unit run over several rounds as market conditions change.",
            line: "Strategic thinking, adaptability, results focus",
          },
          {
            icon: "user-check",
            title: "Competency-based interview",
            description: "Structured questions on past behavior, probing each target competency in turn.",
            line: "Track record, self-awareness",
          },
        ],
      },
      {
        label: "Competency matrix",
        kind: "matrix",
        intro:
          "Each competency is observed in at least two different exercises, by at least two assessors. One strong or weak moment never decides a rating. A typical leadership center looks like this.",
        note: "Example matrix for a leadership center. The real matrix is built from your competency framework.",
        columns: [
          "In-tray",
          "Role play",
          "Case study",
          "Group discussion",
          "Presentation",
          "Interview",
        ],
        rows: [
          { competency: "Strategic thinking", observed: [false, false, true, false, true, true] },
          { competency: "Decision making", observed: [true, false, true, true, false, false] },
          { competency: "Influencing", observed: [false, true, false, true, true, false] },
          { competency: "People leadership", observed: [false, true, false, true, false, true] },
          { competency: "Communication", observed: [true, true, false, false, true, false] },
          { competency: "Results orientation", observed: [true, false, true, false, false, true] },
        ],
      },
      {
        label: "Formats",
        kind: "formats",
        line_label: "Best for:",
        items: [
          {
            icon: "map-pin",
            title: "In person",
            description: "At your site or a venue, with role players and assessors in the room.",
            line: "Centers where presence and group dynamics matter most",
          },
          {
            icon: "monitor",
            title: "Virtual",
            description: "Exercises run online with live role players, remote assessors and secure document sharing.",
            line: "Global and distributed cohorts",
          },
          {
            icon: "link",
            title: "Hybrid",
            description: "Some participants or assessors in the room, others online, on one shared schedule and one rating standard.",
            line: "Cohorts that combine on-site and remote participants",
          },
        ],
      },
    ],
    cta: { label: "Plan a center with Edstellar", href: FORM_ANCHOR },
  },

  readiness: {
    section_id: "readiness",
    heading: "Assess your center design against the <span>essentials.</span>",
    description:
      "A quick check of how your organization runs assessment and development centers today, from competencies to feedback, and where the method can add even more value.",
    points: [
      "Competencies, exercises and the assessment matrix",
      "Assessor training, calibration and integration",
      "Participant feedback and development follow-through",
    ],
    cta: { label: "Take the free readiness check", href: "/tool/talent-assessment-services" },
    checklist: {
      title: "Center readiness checklist",
      items: [
        { label: "Competencies are defined for the role", done: true },
        { label: "Exercises reflect real challenges", done: true },
        { label: "Assessors are trained and calibrated", done: true },
        { label: "Evidence is integrated in one session", done: false },
        { label: "Every participant gets feedback", done: false },
      ],
    },
  },

  services: {
    section_id: "services",
    heading: "Edstellar assessment and development center services, <span>end to end.</span>",
    description:
      "From the competency matrix to participant feedback, Edstellar covers every part of an assessment or development center.",
    get_label: "You get:",
    items: [
      {
        icon: "target",
        title: "Competency and center design",
        summary:
          "Define the competencies for each role and build the matrix that maps every competency to at least two exercises.",
        flow: ["Problem solving", "Planning", "Influencing", "Leading people"],
        flow_style: "bars",
        caption: "Competencies mapped to exercises",
        get: "Center design and assessment matrix",
      },
      {
        icon: "layers",
        title: "Exercise design and simulation",
        summary:
          "Design realistic exercises and business simulations that mirror the role, from in-tray tasks to role plays.",
        flow: [
          "In-tray",
          "Role play",
          "Case study",
          "Group discussion",
          "Presentation",
          "Fact-finding",
          "Business simulation",
          "Competency-based interview",
        ],
        flow_style: "tags",
        flow_highlight: 6,
        caption: "Exercises chosen for each role",
        get: "Role-relevant exercise set",
      },
      {
        icon: "globe",
        title: "Virtual assessment centers",
        summary:
          "Run the full center online with live role players, remote assessors and secure document sharing, or combine on-site and online participants in a hybrid center.",
        flow: ["In person", "Virtual", "Hybrid"],
        flow_style: "tags",
        flow_highlight: 1,
        caption: "One rating standard in every format",
        get: "Virtual center experience",
      },
      {
        icon: "book",
        title: "Assessor training and calibration",
        summary:
          "Train Edstellar assessors, and your own managers if you wish, to observe, record, classify and evaluate behavior, and calibrate them on practice recordings before the day.",
        flow: ["Assessor training", "Practice recordings", "Calibration"],
        flow_style: "arrows",
        caption: "Consistent ratings from every assessor",
        get: "Calibrated assessor panel",
      },
      {
        icon: "scale",
        title: "Integration and decisions",
        summary:
          "Lead the wash-up session where assessors compare notes and agree every rating on the evidence across exercises, not on impressions.",
        flow: ["Exercise ratings", "Wash-up session", "Agreed rating"],
        flow_style: "arrows",
        caption: "Every rating reflects the full picture",
        get: "Integrated ratings and recommendations",
      },
      {
        icon: "list",
        title: "Feedback and development plans",
        summary:
          "Give each participant feedback and a report, give leaders the group view, and turn the findings into development plans.",
        flow: ["Center evidence", "Feedback session", "Development plan"],
        flow_style: "arrows",
        caption: "Every participant leaves with next steps",
        get: "Feedback reports and development plans",
      },
    ],
  },

  process: {
    section_id: "process",
    heading: "The Edstellar assessment and development center <span>process.</span>",
    description:
      "Edstellar runs every assessment and development center in six steps, from defining the target role to development plans. A typical cohort takes about six weeks from kickoff to development plans, depending on the number of participants and exercises.",
    get_label: "You get",
    steps: [
      {
        week: "Week 1",
        title: "Define the target role",
        description: "Job analysis sets the five to eight competencies that matter most at the target level.",
        chips: ["Job analysis", "Competencies"],
        get: "Competency model for the target role",
      },
      {
        week: "Weeks 1 to 2",
        title: "Design the exercises",
        description: "Exercises are built or adapted to your business context, and every competency is mapped to at least two of them.",
        chips: ["Exercises", "Assessment matrix"],
        get: "Center design and assessment matrix",
      },
      {
        week: "Week 2",
        title: "Train the assessors",
        description: "Edstellar assessors, and your own managers if you wish, are trained and calibrated on practice recordings before the day.",
        chips: ["Assessor training", "Calibration"],
        get: "Calibrated assessor panel",
      },
      {
        week: "Weeks 2 to 4",
        title: "Run the center",
        description: "Participants rotate through the exercises while assessors observe, record, classify and evaluate what they actually do.",
        chips: ["In person, virtual or hybrid", "Observation"],
        get: "Observed evidence",
      },
      {
        week: "Weeks 4 to 5",
        title: "Integrate the evidence",
        description: "In the wash-up session, assessors compare notes and agree every rating on the evidence, not on impressions.",
        chips: ["Wash-up session", "Agreed ratings"],
        get: "Integrated ratings",
      },
      {
        week: "Weeks 5 to 6",
        title: "Feed back and plan",
        description: "Each participant receives feedback and a report, leaders receive the group view, and findings become development plans.",
        chips: ["Feedback", "Development plans"],
        get: "Reports, group view and development plans",
      },
    ],
  },

  outputs: {
    section_id: "outputs",
    heading: "Ready-to-use outputs for <span>every decision.</span>",
    description:
      "Every Edstellar center ends with assessment center reports and outputs that people can read quickly and act on right away.",
    columns: [
      {
        title: "Participants and coaches",
        subtitle: "Feedback that builds growth",
        items: [
          {
            icon: "file",
            title: "Competency-by-competency report",
            description: "Every competency rated, with the observed evidence from each exercise.",
            stage: "Step 6: Feed back",
          },
          {
            icon: "list-check",
            title: "Individual development plan",
            description: "A development plan for every participant, agreed in the feedback session.",
            stage: "Step 6: Feed back",
          },
        ],
      },
      {
        title: "Decision panels",
        subtitle: "Confident, defensible decisions",
        items: [
          {
            icon: "trending-up",
            title: "Readiness rating",
            description: "A readiness rating for each target role, agreed in the wash-up session.",
            stage: "Step 5: Integrate",
          },
          {
            icon: "grid",
            title: "Nine-box placement",
            description: "Each participant placed on the nine-box grid against performance data.",
            stage: "Step 6: Feed back",
          },
        ],
      },
      {
        title: "HR and L&D",
        subtitle: "A center you can reuse",
        items: [
          {
            icon: "target",
            title: "Group heatmap",
            description: "Strengths and gaps across the whole cohort, competency by competency.",
            stage: "Step 6: Feed back",
          },
          {
            icon: "layers",
            title: "Assessment matrix and exercises",
            description: "A tested center design, ready to run again.",
            stage: "Step 2: Design",
          },
        ],
      },
    ],
    cta: {
      heading: "Design a center you can rely on.",
      description: "Scope your assessment or development center with an Edstellar specialist.",
      primary: { label: "Plan your center", href: FORM_ANCHOR },
      secondary: { label: "Take the readiness check", href: "/tool/talent-assessment-services" },
    },
  },

  why: {
    section_id: "why",
    heading: "Why choose Edstellar for <span>assessment and development centers.</span>",
    description:
      "Edstellar designs realistic exercises for each role, trains every assessor, and connects center results to development and succession, so your biggest talent decisions rest on observed evidence.",
    difference_label: "The difference",
    items: [
      {
        icon: "link",
        title: "Assessment to development, one partner",
        description:
          "Center results turn into action, because the team that runs your center also maps every result to programs, coaching or OD work.",
        visual: {
          type: "flow",
          items: ["Observe", "Debrief", "Develop"],
          caption: "One team, from measurement to development",
        },
        difference: "Many center providers stop at the ratings. Edstellar connects it to development.",
      },
      {
        icon: "chip",
        title: "Runs on the Capability Intelligence Platform",
        description:
          "You always know who is ready and where the gaps sit, with a live picture of verified skills between assessment cycles.",
        visual: {
          type: "signal",
          title: "Capability signal",
          status: "Live",
          items: ["Profiled:74", "Debriefed:56", "Developing:63"],
        },
        difference: "Your skills data stays live, not frozen in a PDF.",
      },
      {
        icon: "chart",
        title: "Trained assessors, every time",
        description:
          "Assessors are trained and calibrated before every center, and integrate evidence together, so ratings are consistent and fair.",
        visual: {
          type: "flow",
          items: ["Exercises", "Assessors", "Integration"],
          caption: "Several observers, one agreed rating",
        },
        difference: "Ratings several assessors agree on, not one opinion.",
      },
      {
        icon: "globe",
        title: "Certified assessors, wherever your people are",
        description:
          "Centers run in person, virtually or blended across 100+ locations, with exercises adapted to each region.",
        visual: {
          type: "regions",
          items: ["APAC", "Middle East", "Europe", "Americas"],
          caption: "Online · in-person · blended",
        },
        difference: "The same standard in every country you assess.",
      },
      {
        icon: "list",
        title: "A proven method, not improvisation",
        description:
          "Every center runs the same six steps, from scope to review, with exercises and tools chosen for the decision at hand.",
        visual: {
          type: "steps",
          items: [1, 2, 3, 4, 5, 6],
          caption: "Define · Design · Train · Run · Integrate · Feed back",
        },
        difference: "A repeatable system, not a bespoke experiment each time.",
      },
      {
        icon: "sliders",
        title: "The right tools for every center",
        description:
          "Edstellar is not tied to a single publisher, so each center combines the exercises and tools that fit the role best.",
        visual: {
          type: "tiers",
          items: ["Hogan", "Talogy Caliper™", "VirtualAC™", "Virtual Assessment Center"],
          caption: "Chosen from leading publishers",
        },
        difference: "The center fits the role, not the other way round.",
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

  related: {
    section_id: "related",
    heading: "Complete the picture with <span>related assessments.</span>",
    description:
      "Center evidence is strongest alongside other assessments. These Edstellar services complete the view.",
    hub_link: {
      href: "/talent-assessment-services#services",
      label: "Explore all 58 assessments in 14 families",
    },
    tags_label: "Best for",
    cta_label: "Explore",
    items: [
      { icon: "star", title: "Leadership Assessment", description: "Assess leadership capability, potential and succession readiness.", tags: ["Hiring", "Promotion", "Coaching"], href: "/leadership-assessment" },
      { icon: "layers", title: "Psychometric Assessment", description: "Profile personality, work style and motivation for hiring and development.", tags: ["Hiring", "Development", "Promotion"], href: "/psychometric-assessment" },
      { icon: "network", title: "360-Degree Feedback", description: "See how behavior is experienced by manager, peers and reports.", tags: ["Development", "Promotion", "Coaching"], href: "/organizational-alignment-consulting" },
      { icon: "brain", title: "Cognitive Ability & Aptitude Testing", description: "Measure reasoning, problem solving and learning ability.", tags: ["Campus", "Hiring", "Promotion"], href: "/cognitive-ability-assessment" },
      { icon: "heart", title: "Emotional Intelligence Assessment", description: "Measure self-awareness, empathy and resilience at work.", tags: ["Development", "Promotion", "Coaching"], href: "/emotional-intelligence-assessment" },
      { icon: "user-check", title: "Pre-employment Assessment", description: "Screen early-career and high-volume hiring quickly and fairly.", tags: ["Campus", "Hiring", "Safety"], href: "/pre-employment-assessment" },
      { icon: "users", title: "Behavioral Assessment", description: "Profile behavioral style, strengths and career direction.", tags: ["Onboarding", "Development", "Team"], href: "/behavioral-assessment" },
      { icon: "smile", title: "Team Effectiveness Assessment", description: "Strengthen how teams trust, work and deliver together.", tags: ["Onboarding", "First-time managers", "Team"], href: "/team-effectiveness-assessment" },
      { icon: "wrench", title: "Skills Assessment", description: "Verify role-specific skills and see where to develop next.", tags: ["Hiring", "Onboarding", "Development"], href: "/skill-gap-competency-assessment" },
      { icon: "languages", title: "English Proficiency Assessment", description: "Verify English proficiency for each role, on CEFR levels.", tags: ["Hiring", "Onboarding", "Development"], href: "/language-proficiency-assessment" },
      { icon: "building", title: "Culture Assessment", description: "Understand the culture people experience every day.", tags: ["Onboarding", "Coaching", "Culture"], href: "/culture-assessment" },
      { icon: "star", title: "Employee Engagement Survey", description: "Measure engagement and act on what drives it.", tags: ["Onboarding", "Coaching", "Culture"], href: "/employee-engagement-survey" },
    ],
  },

  faqs: {
    heading: "Assessment and development center <span>FAQs.</span>",
    items: [
      {
        question: "What is an assessment center?",
        answer:
          "An assessment center is a structured process in which participants complete several realistic exercises, such as in-tray tasks, role plays, group discussions and presentations, while trained assessors observe and rate their behavior against clear competencies. It gives strong, observed evidence for hiring, promotion and succession decisions.",
      },
      {
        question: "What is the difference between an assessment center and a development center?",
        answer:
          "Both use the same method of realistic exercises and trained assessors. An assessment center is run to inform a decision, such as leadership hiring, promotion or succession planning, and its results go to a decision panel. A development center is run to help participants grow, so detailed feedback goes to the participant first and the main output is a leadership development plan.",
      },
      {
        question: "Which exercises are used in an assessment center?",
        answer:
          "Edstellar centers draw on in-tray exercises, role plays, case study analysis, group discussions, presentations, fact-finding exercises, business simulations and competency-based interviews. Each exercise reveals different competencies, for example an in-tray exercise shows planning and prioritizing, and a role play shows influence and coaching. Exercises are chosen and adapted to your business context.",
      },
      {
        question: "Can Edstellar run a virtual assessment center?",
        answer:
          "Yes. Edstellar runs virtual assessment centers, also called online assessment centers, with online exercises, live role players, remote assessors and secure document sharing, using platforms such as Virtual Assessment Center and VirtualAC from Talogy. Hybrid centers are also available, with some participants or assessors in the room and others online, on one shared schedule and one rating standard.",
      },
      {
        question: "Which psychometric tools are used alongside center exercises?",
        answer:
          "Depending on the decision, Edstellar adds psychometric assessments such as Talogy Caliper, Hogan and Saville Wave in assessment centers, and Talogy InView Leadership, Diamond Leadership, Talogy 360 and EIP3 in development centers.",
      },
      {
        question: "Who are the assessors?",
        answer:
          "Assessors are Edstellar practitioners and, if you wish, your own managers. Every assessor is trained to observe, record, classify and evaluate behavior, and is calibrated on practice recordings before the day.",
      },
      {
        question: "How do you keep centers fair and free from bias?",
        answer:
          "Each competency is observed in at least two different exercises, by at least two assessors, so one strong or weak moment never decides a rating. Ratings use shared scales, and assessors agree every rating on the evidence in a structured wash-up session. Results are also reviewed for adverse impact between groups, so decisions stay fair and defensible.",
      },
      {
        question: "How long does an assessment center take?",
        answer:
          "The time participants spend in the center depends on the number of exercises and is agreed at scoping, in person or virtually. A typical engagement takes about six weeks from scoping to development plans.",
      },
      {
        question: "Who receives the results?",
        answer:
          "Each participant receives feedback and a competency-by-competency report, and leaders receive the group view, including a cohort heatmap, readiness ratings and nine-box placement. For a development center, detailed feedback goes to the participant first and forms the basis of their development plan.",
      },
      {
        question: "How is assessment center data protected?",
        answer:
          "Center data is collected only for the agreed purpose, access is limited to agreed stakeholders, and reports are shared under the confidentiality terms set at scoping. Edstellar holds ISO/IEC 27001:2022 certification for information security management.",
      },
      {
        question: "How much does an assessment center cost?",
        answer:
          "Cost depends on the number of participants, the exercises and tools used, whether the center runs in person or virtually, the number of assessors and how much feedback and development planning you need. Edstellar scopes each center before quoting, so you pay only for what your decision requires.",
      },
    ],
    footer_cta: {
      text: "Talk through your questions with an Edstellar assessment specialist.",
      label: "Ask us directly",
      href: FORM_ANCHOR,
    },
  },

  lead_form: {
    heading: "Plan your assessment or development center <span>with Edstellar.</span>",
    description:
      "Tell Edstellar the roles and decisions you want observed evidence for. A specialist replies within one business day with a scoped response, no automated sales sequence.",
    requirements_label: "Your requirements",
    requirements_placeholder:
      "Tell us about the roles, the decision (promotion, succession, hiring or development), how many participants, the format you prefer and your timing.",
    submit_label: "Book a consultation",
    sla_note:
      "We reply within one business day with a scoped response, no automated sales sequence.",
    thanks_heading: "Request received.",
    thanks_body:
      "Thanks. An assessment and development center specialist will reply within one business day with a scoped response.",
  },

  sticky_footer: {
    form_anchor_id: "apply",
    email: true,
    brochure: { href: "/brochures/talent-assessment-services", label: "Download brochure" },
    cta: { label: "Book a consultation", href: FORM_ANCHOR },
    messages: [
      { highlight: "Realistic exercises, trained assessors", suffix: "for promotion, succession and development" },
      { highlight: "In person, virtual or hybrid", suffix: "one rating standard in every format" },
      { highlight: "From kickoff to development plans", suffix: "in about six weeks" },
    ],
  },
};

export default ASSESSMENT_DEVELOPMENT_CENTERS;
