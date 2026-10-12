/**
 * Talent Assessment Services sub-page: Behavioral Assessment
 * (`/talent-assessment-services/behavioral-assessment`).
 *
 * Static content for a hand-built, SSG sub-service — served through
 * `lib/content/talent-assessment.js` and the `[slug]` route's section registry
 * (the OD sub-page pattern, TASTE.md §6.3). Fields are `snake_case` to match the
 * shared and assessment-specific sections.
 */

// Every in-page CTA points at the lead form, whose section id is `apply`.
const FORM_ANCHOR = "#apply";

export const BEHAVIORAL_ASSESSMENT = {
  name: "Behavioral Assessment Services",

  seo: {
    title: "Behavioral Assessment Services",
    description:
      "Edstellar behavioral assessments use Everything DiSC, FIRO-B and CliftonStrengths to improve communication, collaboration, management and sales conversations.",
    image:
      "https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/69e883a6e2cc403eabdeeadf_Corporate%20Talent%20Assessment%C2%A0Services%20for%20Workforce%20Readiness.webp",
  },

  breadcrumbs: [
    { href: "/", label: "Home" },
    { href: "/talent-assessment-services", label: "Talent Assessment Services" },
    { label: "Behavioral Assessment" },
  ],

  // Middle-section order (no `inside` section on this page).
  sections: [
    "concept",
    "benefits",
    "instruments",
    "readiness",
    "services",
    "process",
    "outputs",
    "why",
    "related",
    "faqs",
  ],

  // ── Hero (ConsultingHero) ────────────────────────────────────────────────
  hero: {
    title: "Behavioral Assessment Services",
    tagline: "Understand how people work, communicate and collaborate.",
    description:
      "Edstellar runs behavioral assessments for teams, managers and sales professionals. Validated tools such as Everything DiSC, FIRO-B and CliftonStrengths show each person's behavioral style, communication preferences and strengths, and facilitated workshops turn that insight into better teamwork, management and customer conversations.",
    showMeta: true,
    primaryBtnText: "Book a behavioral assessment consultation",
    primaryBtnHref: FORM_ANCHOR,
    secondaryBtnText: "Explore the tools",
    secondaryBtnHref: "#instruments",
    learning_system: {
      title: "One behavioral assessment, four uses",
      footer_text: "Built for development, not selection.",
      items: [
        {
          title: "Onboarding",
          description: "Strong working relationships, early",
          icon: "Users",
        },
        {
          title: "Teams & communication",
          description: "Clearer everyday communication",
          icon: "Network",
        },
        {
          title: "Manager development",
          description: "Managing each person well",
          icon: "Target",
        },
        {
          title: "Sales enablement",
          description: "Conversations that fit the customer",
          icon: "Heart",
        },
      ],
    },
  },

  // ── Proof strip (ProofStats) ─────────────────────────────────────────────
  proof: {
    stats: [
      { value: "13,650+", label: "Assessments" },
      { value: "300+", label: "Clients" },
      { value: "20+", label: "Industries" },
      { value: "ISO 9001 & 27001", label: "Certified" },
    ],
    ctaTitle: "Ready to help your people work better together?",
    primaryBtnText: "Book a consultation",
    primaryBtnHref: FORM_ANCHOR,
    secondaryBtnText: "Download the assessments brochure (PDF)",
    secondaryBtnHref: "/brochures/talent-assessment-services",
  },

  // ── Sticky in-page nav (StickyTabs) ──────────────────────────────────────
  sticky_nav: {
    logo: { src: "/course/Edstellar.svg", alt: "Edstellar" },
    tabs: [
      { id: "concept", label: "Method" },
      { id: "benefits", label: "Benefits" },
      { id: "instruments", label: "Tools" },
      { id: "services", label: "Services" },
      { id: "process", label: "Process" },
      { id: "outputs", label: "Outputs" },
      { id: "why", label: "Why Edstellar" },
      { id: "faq", label: "FAQ" },
    ],
    cta: {
      text: "Book a consultation",
      title: "Book a consultation",
      targetId: "apply",
    },
  },

  // ── Concept: behavior map + four principles (bespoke) ─────────────────────
  concept: {
    section_id: "concept",
    // Drives the behavior-map illustration beside the principles — axis labels,
    // the four plotted points and the caption all come from here.
    map: {
      title:
        "Behavior map: four team members plotted by pace (fast-paced to steady) and focus (tasks to people), showing different behavioral styles in one team.",
      axes: {
        top: "Fast-paced",
        bottom: "Steady",
        left: "Task focus",
        right: "People focus",
      },
      nodes: ["Team lead", "Sales lead", "Analyst", "Designer"],
      caption: "Different styles, one team",
    },
    heading: "Different behavioral styles, <span>one stronger team.</span>",
    description:
      "A behavioral assessment, sometimes called a workplace behavior assessment, shows how people prefer to work, communicate and handle conflict, from pace and priorities to how they respond under pressure. Edstellar uses behavioral assessments for development, built around four principles.",
    principles: [
      {
        title: "A shared language",
        description:
          "Everyone learns a simple, practical language for talking about how they and others work.",
      },
      {
        title: "Style, not right or wrong",
        description:
          "Every style brings strengths; the aim is to understand and adapt, not to judge.",
      },
      {
        title: "Practice in real situations",
        description:
          "Workshops apply the insight to real conversations, meetings, feedback and disagreement.",
      },
      {
        title: "Follow-through at work",
        description:
          "Managers and teams keep using the insight through follow-up sessions and team agreements.",
      },
    ],
  },

  // ── Benefits: dark expanding panels (bespoke, client) ─────────────────────
  benefits: {
    section_id: "benefits",
    heading:
      "Edstellar behavioral assessments that improve <span>everyday working relationships.</span>",
    description:
      "Edstellar's behavioral assessments give teams, managers and sales professionals a practical view of how they and others work, so communication, collaboration and customer conversations improve where it matters.",
    items: [
      {
        title: "Clearer communication",
        icon: "message",
        description:
          "People learn the communication styles colleagues prefer and adapt their own approach, so workplace communication improves.",
      },
      {
        title: "Healthier conflict",
        icon: "puzzle",
        description:
          "Teams handle disagreement openly and productively, using a shared language for their differences, a practical basis for conflict management.",
      },
      {
        title: "Faster onboarding",
        icon: "rocket",
        description:
          "New joiners and their managers understand each other's styles from the first weeks.",
      },
      {
        title: "More effective managers",
        icon: "user-check",
        description:
          "Managers learn to direct, delegate and motivate each person in the way that works for them.",
      },
      {
        title: "Stronger customer conversations",
        icon: "heart",
        description:
          "Sales teams recognize customer styles and adjust how they build relationships.",
      },
      {
        title: "Strengths people can use",
        icon: "star",
        description:
          "CliftonStrengths, a strengths assessment, shows what each person does best, giving coaching and career conversations a positive focus.",
      },
    ],
  },

  // ── Instruments: lifecycle strip + fit table (bespoke) ────────────────────
  instruments: {
    section_id: "instruments",
    heading:
      "Proven behavioral assessment tools, <span>chosen for each purpose.</span>",
    description:
      "Edstellar works with validated behavioral assessment tools, including DiSC assessments, from leading publishers, choosing the right tool for each group and the purpose it supports.",
    table_label: "Behavioral assessment tool fit",
    table_caption:
      "Behavioral assessment tools and how well each fits onboarding, individual development, manager development, teams and communication, and sales enablement, in employee lifecycle order",
    fit_legend: {
      strong: "Strong fit",
      supporting: "Supporting evidence",
      none: "Not used for this",
    },
    lifecycle: {
      title:
        "Where Edstellar behavioral assessment fits in the employee lifecycle",
      audiences: ["All employees", "People managers", "Sales teams"],
      stages: [
        { label: "Campus & pre-hire", active: false },
        { label: "Hiring decisions", active: false },
        { label: "Onboarding", active: true },
        { label: "Individual development", active: true },
        { label: "First-time managers", active: true },
        { label: "Promotion & succession", active: false },
        { label: "Leadership & coaching", active: false },
        { label: "Team & culture", active: true },
        { label: "Safety & compliance", active: false },
      ],
    },
    // Fit values: 2 = strong fit, 1 = supporting evidence, 0 = not used.
    columns: [
      "Onboarding",
      "Individual development",
      "Manager development",
      "Teams & communication",
      "Sales enablement",
    ],
    groups: [
      {
        label: "Behavioral style",
        tools: [
          {
            name: "Everything DiSC® Workplace",
            note: "Behavioral style, communication and collaboration",
            fit: [2, 0, 0, 2, 0],
            best_used:
              "For team workshops and onboarding, with a shared language for every role",
          },
          {
            name: "Everything DiSC® Management",
            note: "Management style and manager effectiveness",
            fit: [0, 0, 2, 0, 0],
            best_used:
              "For first-time and experienced managers in development programs",
          },
          {
            name: "Everything DiSC® Sales",
            note: "Sales communication style and relationship building",
            fit: [2, 2, 0, 0, 2],
            best_used:
              "For sales onboarding and coaching, with a focus on customer relationships",
          },
        ],
      },
      {
        label: "Interpersonal needs and collaboration",
        tools: [
          {
            name: "FIRO-B",
            note: "Interpersonal needs, relationship dynamics and conflict",
            fit: [0, 0, 2, 2, 0],
            best_used:
              "For team dynamics and conflict conversations, as a development tool",
          },
          {
            name: "The Five Behaviors® Personal Development",
            note: "Communication style, conflict approach and collaboration habits",
            fit: [2, 2, 1, 1, 0],
            best_used:
              "For all employees and emerging leaders building collaboration skills, with coaching",
          },
        ],
      },
      {
        label: "Strengths",
        tools: [
          {
            name: "Gallup's CliftonStrengths",
            note: "Natural talents and strengths",
            fit: [2, 2, 2, 2, 0],
            best_used:
              "For coaching, onboarding, first-time managers, team strengths grids and career conversations",
          },
        ],
      },
    ],
    cta: {
      heading: "Get a recommended behavioral program for your teams.",
      description:
        "An Edstellar specialist will match tools to your group and purpose.",
      btn_label: "Talk to a specialist",
      href: FORM_ANCHOR,
    },
  },

  // ── Readiness band (Readiness) ───────────────────────────────────────────
  readiness: {
    section_id: "readiness",
    heading: "Assess your teamwork approach against the <span>essentials.</span>",
    description:
      "A quick check of how your organization builds communication and collaboration today, from onboarding to manager development, and where a behavioral assessment can add even more value.",
    points: [
      "Tool choice and who takes part",
      "Debriefs, workshops and team agreements",
      "Follow-up that keeps the insight in use",
    ],
    cta: {
      label: "Take the free readiness check",
      href: "/tool/talent-assessment-services",
    },
    checklist: {
      title: "Behavioral development checklist",
      items: [
        { label: "Teams share a language for styles", done: true },
        { label: "Managers adapt to each person", done: true },
        { label: "New joiners learn team styles early", done: true },
        { label: "Disagreement is handled openly", done: false },
        { label: "Insight is revisited after workshops", done: false },
      ],
    },
  },

  // ── Services: interactive list + panel (bespoke, client) ──────────────────
  services: {
    section_id: "services",
    heading: "Edstellar behavioral assessment services, <span>end to end.</span>",
    description:
      "From tool choice to follow-up, Edstellar covers every part of a behavioral assessment program.",
    get_label: "You get:",
    items: [
      {
        icon: "target",
        title: "Tool selection and program design",
        summary:
          "Choose the right behavioral tools for each group and purpose, and plan how the insight will be used at work.",
        flow: [
          "DiSC Workplace",
          "DiSC Management",
          "DiSC Sales",
          "FIRO-B",
          "CliftonStrengths",
        ],
        flow_style: "tags",
        caption: "Tools chosen for each group",
        get: "Program design",
      },
      {
        icon: "message",
        title: "Individual profile debriefs",
        summary:
          "Trained facilitators walk each person through their profile and how to use it with colleagues.",
        flow: ["Profile", "Debrief", "Personal actions"],
        flow_style: "arrows",
        caption: "Insight people use the next day",
        get: "Debriefed profiles",
      },
      {
        icon: "users",
        title: "Team communication workshops",
        summary:
          "Facilitated workshops help teams map their styles, talk about differences and agree on how they will work together.",
        flow: ["Team map", "Workshop", "Team agreements"],
        flow_style: "arrows",
        caption: "A shared language for working together",
        get: "Team style map and team agreements",
      },
      {
        icon: "user-check",
        title: "Manager style programs",
        summary:
          "Everything DiSC Management helps managers adapt how they direct, delegate and motivate each person on their team.",
        flow: ["Manager profile", "Workshop", "Action plan"],
        flow_style: "arrows",
        caption: "Managing each person well",
        get: "Manager action plans",
      },
      {
        icon: "trending-up",
        title: "Sales style coaching",
        summary:
          "Everything DiSC Sales helps sales professionals recognize customer styles and adapt how they build relationships.",
        flow: ["Seller style", "Customer style", "Adapted approach"],
        flow_style: "arrows",
        caption: "Conversations that fit the customer",
        get: "Sales style plans",
      },
      {
        icon: "scale",
        title: "Conflict and collaboration sessions",
        summary:
          "FIRO-B and The Five Behaviors Personal Development help people understand their needs in relationships and handle disagreement constructively.",
        flow: ["Needs", "Conversation", "Agreement"],
        flow_style: "arrows",
        caption: "Disagreement that moves work forward",
        get: "Collaboration action plans",
      },
    ],
  },

  // ── Process: six-step rail (bespoke) ─────────────────────────────────────
  process: {
    section_id: "process",
    heading: "The Edstellar behavioral assessment <span>process.</span>",
    description:
      "Edstellar runs behavioral assessments in six steps, from scope to review. Most groups move from kickoff to their first workshop in about four to six weeks.",
    get_label: "You get",
    steps: [
      {
        week: "Week 1",
        title: "Scope",
        description:
          "Agree on the group, the purpose and how the insight will be used.",
        chips: ["Purpose", "Participants"],
        get: "Program scope",
      },
      {
        week: "Weeks 1 to 2",
        title: "Design",
        description: "Choose the tools and design the debriefs and workshops.",
        chips: ["Tool choice", "Workshop design"],
        get: "Program plan",
      },
      {
        week: "Weeks 2 to 3",
        title: "Assess",
        description: "Participants complete their profiles online.",
        chips: ["Online profiles", "Reminders"],
        get: "Individual profiles",
      },
      {
        week: "Weeks 3 to 4",
        title: "Debrief",
        description: "Facilitators debrief profiles one to one or in small groups.",
        chips: ["Debriefs", "Personal actions"],
        get: "Debriefed profiles",
      },
      {
        week: "Weeks 4 to 6",
        title: "Develop",
        description:
          "Team, manager and sales workshops apply the insight to real work.",
        chips: ["Workshops", "Team agreements"],
        get: "Workshop outputs",
      },
      {
        week: "Ongoing",
        title: "Review",
        description:
          "Follow-up sessions keep the insight in use and refresh team agreements.",
        chips: ["Follow-up", "Refresh"],
        get: "Follow-up review",
      },
    ],
  },

  // ── Outputs: grouped by audience (bespoke) ───────────────────────────────
  outputs: {
    section_id: "outputs",
    heading: "Ready-to-use outputs for <span>every decision.</span>",
    description:
      "Every Edstellar behavioral assessment ends with reports and outputs that people can read quickly and act on right away.",
    columns: [
      {
        title: "Individuals",
        subtitle: "Practical self-insight",
        items: [
          {
            icon: "file",
            title: "Personal behavioral profile",
            description:
              "Style, preferences and strengths, with tips for working with others.",
            stage: "Step 4: Debrief",
          },
          {
            icon: "list-check",
            title: "Personal action plan",
            description: "Two or three practical changes to try at work.",
            stage: "Step 4: Debrief",
          },
        ],
      },
      {
        title: "Teams and managers",
        subtitle: "Better ways of working",
        items: [
          {
            icon: "grid",
            title: "Team style map",
            description:
              "How styles are spread across the team, and what that means for how it works.",
            stage: "Step 5: Develop",
          },
          {
            icon: "users",
            title: "Team agreements",
            description:
              "Agreed ways of communicating, deciding and handling disagreement.",
            stage: "Step 5: Develop",
          },
        ],
      },
      {
        title: "HR and L&D",
        subtitle: "A program that sticks",
        items: [
          {
            icon: "user-cog",
            title: "Manager and sales guides",
            description:
              "Practical guides for managing and selling with each style in mind.",
            stage: "Step 5: Develop",
          },
          {
            icon: "trending-up",
            title: "Follow-up review",
            description:
              "What has changed since the workshops and where to focus next.",
            stage: "Step 6: Review",
          },
        ],
      },
    ],
    cta: {
      heading: "Build ways of working that last.",
      description:
        "Scope your behavioral assessment program with an Edstellar specialist.",
      primary: { label: "Plan your program", href: FORM_ANCHOR },
      secondary: {
        label: "Take the readiness check",
        href: "/tool/talent-assessment-services",
      },
    },
  },

  // ── Why Edstellar (WhyUs) ────────────────────────────────────────────────
  why: {
    section_id: "why",
    heading: "Why choose Edstellar for <span>behavioral assessment.</span>",
    description:
      "Edstellar chooses the right behavioral tools for each group, has trained facilitators debrief every profile, and turns the insight into workshops and team agreements, so better ways of working last.",
    difference_label: "The difference",
    items: [
      {
        icon: "link",
        title: "Assessment to development, one partner",
        description:
          "Insight turns into action, because the team that profiles your people also maps every result to training, coaching or OD work.",
        visual: {
          type: "flow",
          items: ["Profile", "Debrief", "Develop"],
          caption: "One team, from measurement to development",
        },
        difference:
          "Many test providers stop at the report. Edstellar connects it to development.",
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
        title: "Expert interpretation, every time",
        description:
          "Trained practitioners read every profile against the role and explain it in plain language, so people understand and use their results.",
        visual: {
          type: "flow",
          items: ["Profile tool", "Team context", "Practitioner"],
          caption: "Every score read in context",
        },
        difference: "Insight people act on, not a score they guess at.",
      },
      {
        icon: "globe",
        title: "Certified assessors, wherever your people are",
        description:
          "Behavioral assessments and workshops run online, in person or blended across 100+ locations, in a format that suits each team.",
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
          "Every engagement runs the same six steps, from scope to review, with validated tools chosen for the purpose at hand.",
        visual: {
          type: "steps",
          items: [1, 2, 3, 4, 5, 6],
          caption: "Scope · Design · Assess · Debrief · Develop · Review",
        },
        difference: "A repeatable system, not a bespoke experiment each time.",
      },
      {
        icon: "sliders",
        title: "The right tool for every purpose",
        description:
          "Edstellar is not tied to a single test publisher, so each group and purpose gets the tool that fits it best.",
        visual: {
          type: "tiers",
          items: ["FIRO-B", "Five Behaviors®", "CliftonStrengths", "Everything DiSC®"],
          caption: "Chosen from leading publishers",
        },
        difference: "The tool fits the purpose, not the other way round.",
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

  // ── Related assessments: carousel (bespoke, client) ──────────────────────
  related: {
    section_id: "related",
    heading: "Complete the picture with <span>related assessments.</span>",
    description:
      "Behavioral insight is strongest alongside other assessments. These Edstellar services complete the view.",
    hub_link: {
      href: "/talent-assessment-services#services",
      label: "Explore all 58 assessments in 14 families",
    },
    tags_label: "Best for",
    cta_label: "Explore",
    items: [
      {
        icon: "users",
        title: "Team Effectiveness Assessment",
        description: "Strengthen how teams trust, work and deliver together.",
        tags: ["Onboarding", "First-time managers", "Team"],
        href: "/team-effectiveness-assessment",
      },
      {
        icon: "layers",
        title: "Psychometric Assessment",
        description:
          "Profile personality, work style and motivation for hiring and development.",
        tags: ["Hiring", "Development", "Promotion"],
        href: "/psychometric-assessment",
      },
      {
        icon: "heart",
        title: "Emotional Intelligence Assessment",
        description: "Measure self-awareness, empathy and resilience at work.",
        tags: ["Development", "Promotion", "Coaching"],
        href: "/emotional-intelligence-assessment",
      },
      {
        icon: "star",
        title: "Leadership Assessment",
        description:
          "Assess leadership capability, potential and succession readiness.",
        tags: ["Hiring", "Promotion", "Coaching"],
        href: "/leadership-assessment",
      },
      {
        icon: "network",
        title: "360-Degree Feedback",
        description: "See how behavior is experienced by manager, peers and reports.",
        tags: ["Development", "Promotion", "Coaching"],
        href: "/organizational-alignment-consulting",
      },
      {
        icon: "user-check",
        title: "Pre-employment Assessment",
        description: "Screen early-career and high-volume hiring quickly and fairly.",
        tags: ["Campus", "Hiring", "Safety"],
        href: "/pre-employment-assessment",
      },
      {
        icon: "clipboard",
        title: "Assessment & Development Centers",
        description:
          "Combine live exercises with psychometrics for high-stakes decisions.",
        tags: ["Hiring", "Promotion", "Coaching"],
        href: "/assessment-development-centers-consulting",
      },
      {
        icon: "wrench",
        title: "Skills Assessment",
        description: "Verify role-specific skills and see where to develop next.",
        tags: ["Hiring", "Onboarding", "Development"],
        href: "/skill-gap-competency-assessment",
      },
      {
        icon: "brain",
        title: "Cognitive Ability & Aptitude Testing",
        description: "Measure reasoning, problem solving and learning ability.",
        tags: ["Campus", "Hiring", "Promotion"],
        href: "/cognitive-ability-assessment",
      },
      {
        icon: "languages",
        title: "English Proficiency Assessment",
        description: "Verify English proficiency for each role, on CEFR levels.",
        tags: ["Hiring", "Onboarding", "Development"],
        href: "/language-proficiency-assessment",
      },
      {
        icon: "building",
        title: "Culture Assessment",
        description: "Understand the culture people experience every day.",
        tags: ["Onboarding", "Coaching", "Culture"],
        href: "/culture-assessment",
      },
      {
        icon: "smile",
        title: "Employee Engagement Survey",
        description: "Measure engagement and act on what drives it.",
        tags: ["Onboarding", "Coaching", "Culture"],
        href: "/employee-engagement-survey",
      },
    ],
  },

  // ── FAQ (Faq) ────────────────────────────────────────────────────────────
  faqs: {
    heading: "Behavioral assessment <span>FAQs.</span>",
    items: [
      {
        question: "What is a behavioral assessment?",
        answer:
          "A behavioral assessment shows how a person prefers to work, communicate and respond to others, for example their pace, priorities and approach to disagreement. Edstellar uses validated behavioral tools for development, team effectiveness, manager development and sales enablement.",
      },
      {
        question: "How is a behavioral assessment different from a personality test?",
        answer:
          "A behavioral assessment focuses on workplace behavior and communication style, and how to adapt it. A broader personality assessment looks at deeper traits and motives. Edstellar covers broader personality profiling through its psychometric assessment service.",
      },
      {
        question: "Which behavioral assessment tools does Edstellar use?",
        answer:
          "Depending on the group, Edstellar uses Everything DiSC Workplace, Everything DiSC Management, Everything DiSC Sales, FIRO-B, The Five Behaviors Personal Development and Gallup's CliftonStrengths.",
      },
      {
        question: "What is a DiSC assessment used for?",
        answer:
          "Everything DiSC helps people understand their own behavioral style and the communication styles of others, so workplace communication and teamwork become more effective. Edstellar uses it for team workshops, onboarding, manager development and sales coaching.",
      },
      {
        question: "What does FIRO-B measure?",
        answer:
          "FIRO-B looks at interpersonal needs, such as how much people seek involvement, influence and closeness with others. Edstellar uses it to explore team dynamics and support conflict management, as a development tool.",
      },
      {
        question: "Can behavioral assessments be used for hiring?",
        answer:
          "Edstellar uses these behavioral tools for development, not for selection decisions. For hiring, Edstellar offers validated pre-employment assessments that are designed for selection.",
      },
      {
        question: "Who benefits from a behavioral assessment?",
        answer:
          "New joiners, teams, first-time and experienced managers, and sales and customer-facing professionals benefit most, as do people using a strengths assessment such as CliftonStrengths for career conversations, along with any group going through change or working across functions.",
      },
      {
        question: "What happens in a behavioral workshop?",
        answer:
          "Participants explore their own profiles, map the styles in their team, practice real situations such as giving feedback or handling disagreement, and agree on practical ways of working together.",
      },
      {
        question: "How long does a behavioral assessment take?",
        answer:
          "Each online profile takes a short time to complete, and most groups move from kickoff to their first workshop in about four to six weeks. Workshops can run in person, online or blended.",
      },
      {
        question: "How is behavioral assessment data protected?",
        answer:
          "Profiles are collected only for the agreed development purpose, access is limited to agreed stakeholders, and individual reports are shared under the confidentiality terms set at scoping. Edstellar holds ISO/IEC 27001:2022 certification for information security management.",
      },
      {
        question: "How much does a behavioral assessment cost?",
        answer:
          "Cost depends on the number of participants, the tools used, and how many debriefs, workshops and follow-up sessions you need. Edstellar scopes each program before quoting, so you pay only for what your goals require.",
      },
    ],
    footer_cta: {
      text: "Talk through your questions with an Edstellar assessment specialist.",
      label: "Ask us directly",
      href: FORM_ANCHOR,
    },
  },

  // ── Lead form (LeadForm) ─────────────────────────────────────────────────
  lead_form: {
    heading: "Plan your behavioral assessment <span>with Edstellar.</span>",
    description:
      "Tell Edstellar the teams or groups you want to develop. A specialist replies within one business day with a scoped response, no automated sales sequence.",
    requirements_label: "Your requirements",
    requirements_placeholder:
      "Tell us about the group, how many people, the purpose (onboarding, teams, manager development or sales) and your timing.",
    submit_label: "Book a consultation",
    sla_note:
      "We reply within one business day with a scoped response, no automated sales sequence.",
    thanks_heading: "Request received.",
    thanks_body:
      "Thanks. A behavioral assessment specialist will reply within one business day with a scoped response.",
  },

  // ── Sticky footer (StickyFooter) ─────────────────────────────────────────
  sticky_footer: {
    form_anchor_id: "apply",
    email: true,
    brochure: {
      href: "/brochures/talent-assessment-services",
      label: "Download brochure",
    },
    cta: { label: "Book a consultation", href: FORM_ANCHOR },
    messages: [
      {
        highlight: "13,650+ assessments",
        suffix: "delivered for 300+ clients worldwide",
      },
      {
        highlight: "Everything DiSC · FIRO-B · CliftonStrengths",
        suffix: "chosen for each group and purpose",
      },
      {
        highlight: "From kickoff to first workshop",
        suffix: "in about four to six weeks",
      },
    ],
  },
};

export default BEHAVIORAL_ASSESSMENT;
