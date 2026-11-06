/**
 * Options for the consulting enquiry form (`components/forms/consulting-form.jsx`).
 *
 * `CONSULTING_GROUPS` sets "Primary consulting interest" and "Current
 * challenge" per consulting area (see below).
 */

export const COMPANY_SIZES = [
  "Startup (1–50 employees)",
  "Small Business (51–200 employees)",
  "Mid-Size Organization (201–1,000 employees)",
  "Large Enterprise (1,001–5,000 employees)",
  "Global Enterprise / Fortune 500 (5,000+ employees)",
  "Government Agency",
  "Non-Profit Organization",
];

/**
 * "Primary consulting interest" and "Current challenge", grouped by consulting
 * area. A form shows only its own area's pages and challenges (the page
 * passes the area's `key` as `group`), plus the "other" group's
 * "Not Sure Yet" on every form. Edit here only: the dropdowns and the
 * server-side check (`lib/leads/submit-lead.js`) are all built from this.
 */
export const CONSULTING_GROUPS = [
  {
    key: "ld",
    label: "L&D Consulting",
    pages: [
      "L&D Consulting Services",
      "Learning Strategy and Design",
      "Learning Content Development",
      "Learning Technology Consulting",
    ],
    challenges: [
      "No clear learning strategy tied to business goals",
      "Training runs on request, not on a plan",
      "Difficulty measuring learning impact and ROI",
      "Low learner engagement and completion",
      "Outdated or generic training content",
      "Need custom content built for our roles",
      "Need content in more than one language",
      "LMS selection, implementation or migration",
      "Learning tools and vendors are fragmented",
      "Need to bring AI into how we learn",
    ],
  },
  {
    key: "tna",
    label: "Training Needs Analysis",
    pages: [
      "Training Needs Analysis Services",
    ],
    challenges: [
      "No clear picture of skill or capability gaps",
      "Training requests are ad hoc, not based on data",
      "Training budget not linked to business priorities",
      "Unsure which programs to run first",
      "No competency framework to measure against",
      "Needs differ across roles, teams or locations",
      "Past training did not close the gaps",
      "Need a training plan for a new strategy or growth phase",
    ],
  },
  {
    key: "od",
    label: "OD Consulting",
    pages: [
      "OD Consulting Services",
      "Change Management Consulting",
      "Leadership Effectiveness Consulting",
      "Organization Design Consulting",
      "Succession Planning Consulting",
      "Performance Management Consulting",
      "Employee Engagement Consulting",
      "Culture Transformation Consulting",
      "Strategic Workforce Planning",
      "DEI Consulting",
    ],
    challenges: [
      "Restructuring, merger or major change underway",
      "Change initiatives stall or meet resistance",
      "Leadership gaps at one or more levels",
      "No successors ready for critical roles",
      "Unclear roles, structure or decision rights",
      "Performance management not driving results",
      "Low engagement or rising attrition",
      "Culture does not support the strategy",
      "Workforce plan not aligned to business plans",
      "Inclusion goals not reflected in hiring or growth",
    ],
  },
  {
    key: "assess",
    label: "Talent Assessments",
    pages: [
      "Talent Assessment Services",
      "Pre-employment Assessment",
      "Psychometric Assessment",
      "360-degree Feedback",
      "Leadership Assessment",
      "Employee Engagement Survey",
      "Skill Proficiency Assessment",
      "Cognitive Ability Assessment",
      "Behavioral Assessment",
      "Assessment and Development Centers",
      "Emotional Intelligence Assessment",
      "Team Effectiveness Assessment",
      "Culture Assessment",
      "English Proficiency Assessment",
    ],
    challenges: [
      "Hiring decisions lack objective data",
      "High-volume hiring with uneven quality",
      "No objective basis for promotion or succession",
      "High-potential talent not identified",
      "Skill levels unknown or not benchmarked",
      "Leaders lack structured multi-rater feedback",
      "Engagement or culture not measured",
      "Team dynamics affecting performance",
      "English proficiency affecting customer or global roles",
      "Need an assessment or development center",
    ],
  },
  {
    key: "coaching",
    label: "Coaching",
    pages: [
      "Coaching Solutions",
      "Executive Coaching",
      "Leadership Coaching",
      "First-time Manager Coaching",
      "Career Transition Coaching",
      "Performance Coaching",
      "Team Coaching",
    ],
    challenges: [
      "Senior leaders need support in a bigger role",
      "Leaders need sharper influence and executive presence",
      "First-time managers struggling with the move",
      "Employees in a role change or career transition",
      "Performance below expectations in key roles",
      "Teams with low trust or friction",
      "High performers at risk of leaving",
      "Need a structured coaching program at scale",
    ],
  },
  {
    key: "managed",
    label: "Managed Learning",
    pages: [
      "Managed Learning Services",
      "Managed Training Services",
    ],
    challenges: [
      "L&D team too small for the workload",
      "No dedicated L&D function in place",
      "Training calendar hard to run across locations",
      "Too many training vendors to manage",
      "Logistics and administration take too much time",
      "Inconsistent training quality across units",
      "Little visibility into completion and impact",
      "Need to scale training without adding headcount",
    ],
  },
  {
    key: "other",
    label: "Other",
    pages: [
      "Not Sure Yet",
    ],
    challenges: [
      "Skills not keeping pace with business change",
      "Leadership and management capability gaps",
      "Low engagement or high attrition",
      "Unsure where to start with capability building",
      "Need one partner to run L&D end to end",
    ],
  },
];

/** Every primary interest (page name), across all groups. */
export const CONSULTING_INTERESTS = CONSULTING_GROUPS.flatMap((group) => group.pages);

/** Each primary interest → its group's challenges. */
export const CHALLENGES_BY_INTEREST = Object.fromEntries(
  CONSULTING_GROUPS.flatMap((group) => group.pages.map((page) => [page, group.challenges])),
);

export const EMPLOYEES_IMPACTED = [
  "Less than 50",
  "50-100",
  "101-250",
  "251-500",
  "501-1,000",
  "1,000-2,500",
  "2,500-5,000",
  "5,000+",
  "Not sure yet",
];

export const TIMELINES = [
  "Immediate (Within 1 month)",
  "Short-term (1-3 months)",
  "Medium-term (3-6 months)",
  "Long-term (6-12 months)",
  "Exploratory (12+ months)",
];

export const BUDGET_RANGES = [
  "Less than $25,000",
  "$25,000 - $50,000",
  "$50,000 - $100,000",
  "$100,000 - $250,000",
  "$250,000 - $500,000",
  "$500,000+",
  "Budget not yet allocated",
];
