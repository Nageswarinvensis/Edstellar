export const SITE = {
  name: "Edstellar",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.edstellar.com",
  description:
    "Instructor-led corporate training and consulting. Programs scoped to your stack and delivered onsite, virtually, or offsite in 100+ countries.",
  legalName: "Edstellar",
};

/** Course card image used when the CMS sends none, or when the one it sends
 * fails to load. See `components/common/course-image.jsx`. */
export const DEFAULT_COURSE_IMAGE =
  "https://media.edstellar.com/course_default_thumbnile.webp";

/**
 * Languages and regions quoted in hero meta rows across the site.
 * Shared so a change lands on every page at once.
 */
export const DELIVERY_LANGUAGES = [
  "English",
  "Spanish",
  "Mandarin",
  "German",
  "Arabic",
  "Portuguese",
  "Hindi",
  "French",
  "Japanese",
  "Italian",
  "and more",
];

export const DELIVERY_COUNTRIES = [
  "United States",
  "United Kingdom",
  "India",
  "Canada",
  "Germany",
  "France",
  "Netherlands",
  "UAE",
  "Saudi Arabia",
  "Singapore",
  "Australia",
  "Japan",
  "Brazil",
  "South Africa",
];

/**
 * Full country list with dial codes, for lead-capture form country/phone
 * fields. Kept separate from `DELIVERY_COUNTRIES` (a short list quoted in
 * hero copy) since this one drives form logic, not marketing copy.
 */
export const COUNTRY_DIAL_CODES = [
  { name: "United States", dialCode: "+1" },
  { name: "United Kingdom", dialCode: "+44" },
  { name: "India", dialCode: "+91" },
  { name: "Canada", dialCode: "+1" },
  { name: "Australia", dialCode: "+61" },
  { name: "Germany", dialCode: "+49" },
  { name: "France", dialCode: "+33" },
  { name: "Netherlands", dialCode: "+31" },
  { name: "Ireland", dialCode: "+353" },
  { name: "Spain", dialCode: "+34" },
  { name: "Italy", dialCode: "+39" },
  { name: "Sweden", dialCode: "+46" },
  { name: "Norway", dialCode: "+47" },
  { name: "Denmark", dialCode: "+45" },
  { name: "Finland", dialCode: "+358" },
  { name: "Switzerland", dialCode: "+41" },
  { name: "Belgium", dialCode: "+32" },
  { name: "Austria", dialCode: "+43" },
  { name: "Poland", dialCode: "+48" },
  { name: "Portugal", dialCode: "+351" },
  { name: "United Arab Emirates", dialCode: "+971" },
  { name: "Saudi Arabia", dialCode: "+966" },
  { name: "Qatar", dialCode: "+974" },
  { name: "Israel", dialCode: "+972" },
  { name: "South Africa", dialCode: "+27" },
  { name: "Nigeria", dialCode: "+234" },
  { name: "Kenya", dialCode: "+254" },
  { name: "Egypt", dialCode: "+20" },
  { name: "Singapore", dialCode: "+65" },
  { name: "Malaysia", dialCode: "+60" },
  { name: "Japan", dialCode: "+81" },
  { name: "South Korea", dialCode: "+82" },
  { name: "China", dialCode: "+86" },
  { name: "Hong Kong", dialCode: "+852" },
  { name: "Indonesia", dialCode: "+62" },
  { name: "Philippines", dialCode: "+63" },
  { name: "Thailand", dialCode: "+66" },
  { name: "Vietnam", dialCode: "+84" },
  { name: "New Zealand", dialCode: "+64" },
  { name: "Brazil", dialCode: "+55" },
  { name: "Mexico", dialCode: "+52" },
  { name: "Argentina", dialCode: "+54" },
  { name: "Chile", dialCode: "+56" },
  { name: "Colombia", dialCode: "+57" },
  { name: "Turkey", dialCode: "+90" },
  { name: "Other", dialCode: "" },
];

/**
 * Shared work-email validation for lead-capture forms (LeadForm, the
 * group-quote wizard's own contact step). A personal-mail domain is rejected
 * so leads arrive with an identifiable organization.
 */
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const FREE_MAIL_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "yahoo.co.in",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "me.com",
  "aol.com",
  "proton.me",
  "protonmail.com",
  "gmx.com",
  "mail.com",
  "yandex.com",
  "mail.ru",
  "qq.com",
  "163.com",
  "126.com",
  "rediffmail.com",
  "zoho.com",
]);

/**
 * Global site navigation. Single source of truth for SiteHeader and its
 * mobile menu — both read from this list so a link change lands once.
 */
export const NAV_LINKS = [
  { label: "Corporate Training", href: "/corporate-training" },
  { label: "Coaching Services", href: "/coaching-solutions" },
  { label: "Consulting", href: "/learning-development-consulting-services" },
  { label: "Trainers", href: "/trainer-platform" },
  { label: "Resources", href: "/learning-development-resources" },
];

export const HEADER_CTA = {
  label: "View Pricing",
  href: "/corporate-training-pricing",
};

/** Primary header CTA — the "Build your brief" button that opens the composer. */
export const MEGA_CTA = {
  label: "Build your brief",
  title: "Build a brief, get matched programs and services",
};

/**
 * Footer link groups (footer option C v3, launch). Two rows: the five service
 * groups (`FOOTER_SERVICES`), then Company, Resources and Work with Edstellar
 * (`FOOTER_MORE`). Hrefs are this app's real routes where the design used the
 * live site's (e.g. `/executive-coaching` → `/coaching-solutions/executive-coaching`).
 * The design's FAQs, Webinars, Podcasts, Cookie policy and Accessibility links
 * are left out until those pages exist.
 *
 * `main` links are the group's hub pages (brighter); `stages` are the 5A
 * stages a service belongs to, which the footer's 5A rail highlights;
 * `all` marks a "View all …" link; `sub` is a labelled sub-list.
 */
/** Hover titles for the "Also from Edstellar" service cards (course and domain
 * pages), keyed by the card's link. */
export const SERVICE_LINK_TITLES = {
  "/talent-assessment-services": "Click here to view talent assessment services",
  "/training-needs-analysis-services": "Click here to view training needs analysis services",
  "/learning-development-consulting-services": "Click here to view L&D consulting services",
  "/organizational-development-consulting": "Click here to view organizational development consulting services",
  "/managed-learning-services/managed-training": "Click here to view managed training services",
  "/coaching-solutions": "Click here to view coaching solutions",
};

/** Service pages the CMS still links by an old URL that now only 301s.
 * The domain pages' "From Edstellar" block (`fromedstellarData`) is stored
 * once per domain — 77 records — all sending the old TNA URL (Nov 2026), so
 * the link is corrected where it renders instead of costing every visitor a
 * redirect. Drop an entry once the CMS sends the current URL. */
export const RENAMED_SERVICE_PATHS = {
  "/training-needs-analysis-solutions": "/training-needs-analysis-services",
};

export const FOOTER_SERVICES = [
  {
    heading: "Consulting",
    links: [
      {
        label: "Training needs analysis",
        href: "/training-needs-analysis-services",
        title: "Click here to view training needs analysis services",
        main: true,
        stages: ["assess", "analyze"],
      },
      {
        label: "L&D consulting",
        href: "/learning-development-consulting-services",
        title: "Click here to view L&D consulting services",
        main: true,
        stages: ["analyze", "architect"],
      },
      {
        label: "Learning strategy and design",
        href: "/learning-development-consulting-services/learning-strategy",
        title: "Click here to view learning strategy and design consulting services",
        stages: ["analyze", "architect"],
      },
      {
        label: "Learning content development",
        href: "/learning-development-consulting-services/learning-content-design-development",
        title: "Click here to view learning content development services",
        stages: ["architect"],
      },
      {
        label: "Learning technology consulting",
        href: "/learning-development-consulting-services/learning-technology",
        title: "Click here to view learning technology consulting services",
        stages: ["architect", "activate"],
      },
      {
        label: "OD consulting",
        href: "/organizational-development-consulting",
        title: "Click here to view organizational development consulting services",
        main: true,
        stages: ["analyze", "architect"],
      },
      {
        label: "Change management",
        href: "/organizational-development-consulting/change-management",
        title: "Click here to view change management consulting services",
        stages: ["architect", "advance"],
      },
      {
        label: "Leadership effectiveness",
        href: "/organizational-development-consulting/leadership-effectiveness",
        title: "Click here to view leadership effectiveness consulting services",
        stages: ["architect", "activate"],
      },
      {
        label: "Organization design",
        href: "/organizational-development-consulting/organization-design",
        title: "Click here to view organization design consulting services",
        stages: ["analyze", "architect"],
      },
      {
        label: "View all OD consulting services",
        href: "/organizational-development-consulting",
        title: "Click here to view all organizational development consulting services",
        main: true,
        all: true,
        stages: ["analyze", "architect"],
      },
    ],
  },
  [
    {
      heading: "Coaching",
      links: [
        {
          label: "Coaching solutions",
          href: "/coaching-solutions",
          title: "Click here to view Edstellar's coaching solutions",
          main: true,
          stages: ["activate", "advance"],
        },
        {
          label: "Executive coaching",
          href: "/coaching-solutions/executive-coaching",
          title: "Click here to view the executive coaching program",
          stages: ["activate", "advance"],
        },
        {
          label: "Leadership coaching",
          href: "/coaching-solutions/leadership-coaching",
          title: "Click here to view the leadership coaching program",
          stages: ["activate", "advance"],
        },
        {
          label: "First-time manager coaching",
          href: "/coaching-solutions/first-time-manager-coaching",
          title: "Click here to view the first-time manager coaching program",
          stages: ["activate", "advance"],
        },
        {
          label: "Career transition coaching",
          href: "/coaching-solutions/career-transition-coaching",
          title: "Click here to view the career transition coaching program",
          stages: ["activate", "advance"],
        },
        {
          label: "Performance coaching",
          href: "/coaching-solutions/performance-coaching",
          title: "Click here to view the performance coaching program",
          stages: ["activate", "advance"],
        },
        {
          label: "Team coaching",
          href: "/coaching-solutions/team-coaching",
          title: "Click here to view the team coaching program",
          stages: ["activate", "advance"],
        },
      ],
    },
    {
      heading: "Managed learning",
      links: [
        {
          label: "Managed learning services",
          href: "/managed-learning-services",
          title: "Click here to view managed learning services",
          main: true,
          stages: ["architect", "activate", "advance"],
        },
        {
          label: "Managed training services",
          href: "/managed-learning-services/managed-training",
          title: "Click here to view managed training services",
          stages: ["activate"],
        },
      ],
    },
  ],
  {
    heading: "Corporate training",
    links: [
      {
        label: "Training catalog",
        href: "/corporate-training-catalog",
        title: "Click here to view the corporate training catalog",
        main: true,
        stages: ["architect", "activate"],
      },
      {
        sub: "Popular domains",
        links: [
          {
            label: "Artificial intelligence",
            href: "/corporate-training/ai",
            title: "Click here to view artificial intelligence training programs",
            stages: ["activate"],
          },
          {
            label: "Cybersecurity",
            href: "/corporate-training/cybersecurity",
            title: "Click here to view cybersecurity training programs",
            stages: ["activate"],
          },
          {
            label: "Strategic leadership",
            href: "/corporate-training/leadership",
            title: "Click here to view strategic leadership training programs",
            stages: ["activate"],
          },
          {
            label: "Soft skills",
            href: "/corporate-training/soft-skills",
            title: "Click here to view soft skills training programs",
            stages: ["activate"],
          },
        ],
      },
      {
        label: "View all 77 domains",
        href: "/corporate-training",
        title: "Click here to view all corporate training domains",
        main: true,
        all: true,
        stages: ["architect", "activate"],
      },
      {
        label: "View all 2,000+ instructor-led training courses",
        href: "/corporate-training-catalog",
        title: "Click here to view the corporate training catalog",
        main: true,
        all: true,
        stages: ["activate"],
      },
    ],
  },
  {
    heading: "Platforms and tools",
    links: [
      {
        links: [
          { label: "Capability OS", href: "/platforms/capability-os", title: "Click here to view the Capability OS platform", native: true },
          { label: "TNA/TNI Engine", href: "/platforms/tna-tni-engine", title: "Click here to view the TNA/TNI Engine platform", native: true },
          { label: "Zenith", href: "/platforms/zenith", title: "Click here to view the Zenith platform", native: true },
          { label: "Polaris", href: "/platforms/polaris", title: "Click here to view the Polaris platform", native: true },
          { label: "Meridian", href: "/platforms/meridian", title: "Click here to view the Meridian platform", native: true },
          { label: "Orbit", href: "/platforms/orbit", title: "Click here to view the Orbit platform", native: true },
          { label: "Spica" },
          { label: "Spectra LMS", href: "/platforms/spectra-lms", title: "Click here to view the Spectra LMS platform", native: true },
        ],
      },
    ],
  },
  {
    heading: "Talent assessments",
    links: [
      {
        label: "Talent assessment services",
        href: "/talent-assessment-services",
        title: "Click here to view talent assessment services",
        main: true,
        stages: ["assess"],
      },
      {
        label: "Pre-employment assessment",
        href: "/talent-assessment-services/pre-employment-assessment",
        title: "Click here to view the pre-employment assessment",
        stages: ["assess"],
      },
      {
        label: "Psychometric assessment",
        href: "/talent-assessment-services/psychometric-assessment",
        title: "Click here to view the psychometric assessment",
        stages: ["assess"],
      },
      {
        label: "360-degree feedback",
        href: "/talent-assessment-services/360-degree-feedback",
        title: "Click here to view the 360-degree feedback assessment",
        stages: ["assess", "advance"],
      },
      {
        label: "Leadership assessment",
        href: "/talent-assessment-services/leadership-assessment",
        title: "Click here to view the leadership assessment",
        stages: ["assess"],
      },
      {
        label: "Employee engagement survey",
        href: "/talent-assessment-services/employee-engagement-survey",
        title: "Click here to view the employee engagement survey",
        stages: ["assess", "advance"],
      },
      {
        label: "View all assessments",
        href: "/talent-assessment-services",
        title: "Click here to view all talent assessment services",
        main: true,
        all: true,
        stages: ["assess"],
      },
    ],
  },
];

export const FOOTER_MORE = [
  {
    heading: "Company",
    links: [
      {
        label: "About us",
        href: "/about-us",
        title: "Click here to view more about Edstellar",
      },
      {
        label: "Who we serve",
        href: "/who-we-serve",
        title: "Click here to view who Edstellar serves",
      },
      {
        label: "Clients",
        href: "/clients",
        title: "Click here to view Edstellar's clients",
      },
      {
        label: "Client experience",
        href: "/exceptional-customer-experience",
        title: "Click here to view Edstellar's client experience",
      },
      {
        label: "Success stories",
        href: "/success-stories",
        title: "Click here to view client success stories",
      },
      {
        label: "Leadership retreats",
        href: "/leadership-retreats",
        title: "Click here to view Edstellar's leadership retreats",
        stages: ["activate"],
      },
      {
        label: "Careers",
        href: "/careers",
        title: "Click here to view careers at Edstellar",
      },
      {
        label: "Contact us",
        href: "/contact-us",
        title: "Click here to view Edstellar's contact details",
      },
    ],
  },
  {
    heading: "Resources",
    links: [
      {
        label: "Blog",
        href: "/blog",
        title: "Click here to view the Edstellar blog",
      },
      {
        label: "L&D resources",
        href: "/learning-development-resources",
        title: "Click here to view Edstellar's L&D resources",
      },
      {
        label: "Templates",
        href: "/learning-development-templates",
        title: "Click here to view L&D templates",
      },
    ],
  },
  {
    heading: "Work with Edstellar",
    links: [
      {
        label: "Request for proposal",
        href: "/request-for-proposal",
        title: "Click here to view the request for proposal form",
      },
      {
        label: "Partner with Edstellar",
        href: "/partner-program",
        title: "Click here to view the Edstellar partner program",
      },
      {
        label: "Become a trainer",
        href: "/trainer-platform",
        title: "Click here to view how to become an Edstellar trainer",
      },
      {
        label: "Write for us",
        href: "/become-a-guest-author",
        title: "Click here to become a guest author",
      },
    ],
  },
];

/** The footer's 5A rail: Edstellar's five stages, in order. */
export const FOOTER_STAGES = [
  { key: "assess", label: "Assess" },
  { key: "analyze", label: "Analyze" },
  { key: "architect", label: "Architect" },
  { key: "activate", label: "Activate" },
  { key: "advance", label: "Advance" },
];

/**
 * The pre-footer band, by page family. Pages that already end with a contact
 * or lead form get no band (it would repeat the form's ask); see
 * `footerBandFor` in `components/layout/footer-band.jsx`.
 */
export const FOOTER_BANDS = {
  consulting: {
    heading: "Plan your next capability program with ",
    emphasis: "an Edstellar consultant.",
    cta: {
      label: "Book a consultation",
      href: "/contact-us",
      title: "Click here to book a consultation with Edstellar",
    },
  },
  resources: {
    heading: "Put these ideas to work with ",
    emphasis: "free L&D templates.",
    cta: {
      label: "Explore L&D templates",
      href: "/learning-development-templates",
      title: "Click here to explore L&D templates",
    },
  },
};

/** Country phone lines and email, shown in the footer brand column. */
export const FOOTER_CONTACT = [
  {
    label: "United States",
    value: "+1 682 297 4830",
    href: "tel:+16822974830",
    title: "Call Edstellar",
  },
  {
    label: "United Kingdom",
    value: "+44 151 453 4009",
    href: "tel:+441514534009",
    title: "Call Edstellar",
  },
  {
    label: "India",
    value: "+91 636 483 3830",
    href: "tel:+916364833830",
    title: "Call Edstellar",
  },
  {
    label: "Email",
    value: "contact@edstellar.com",
    href: "mailto:contact@edstellar.com",
    title: "Email Edstellar",
  },
];

/** ISO certification badges in the footer — shown as badges, not links. */
export const FOOTER_CERTS = [
  { title: "ISO 9001:2015", label: "Quality management" },
  { title: "ISO 27001:2022", label: "Information security" },
];

/** Social profiles, rendered as icon links. `key` selects the icon. */
export const FOOTER_SOCIAL = [
  {
    key: "linkedin",
    label: "Edstellar on LinkedIn",
    title: "Click here to visit Edstellar on LinkedIn",
    href: "https://www.linkedin.com/company/edstellarofficial/",
  },
  {
    key: "youtube",
    label: "Edstellar on YouTube",
    title: "Click here to visit Edstellar on YouTube",
    href: "https://www.youtube.com/@edstellarofficial",
  },
  {
    key: "x",
    label: "Edstellar on X",
    title: "Click here to visit Edstellar on X",
    href: "https://x.com/edstellarglobal",
  },
  {
    key: "facebook",
    label: "Edstellar on Facebook",
    title: "Click here to visit Edstellar on Facebook",
    href: "https://www.facebook.com/edstellarofficial/",
  },
  {
    key: "instagram",
    label: "Edstellar on Instagram",
    title: "Click here to visit Edstellar on Instagram",
    href: "https://www.instagram.com/edstellarofficial/",
  },
];

export const FOOTER_LEGAL_LINKS = [
  { label: "Privacy policy", href: "/privacy-policy", title: "Click here to view the privacy policy" },
  { label: "Terms and conditions", href: "/terms-conditions", title: "Click here to view the terms and conditions" },
  {
    label: "Modern slavery statement",
    href: "/modern-slavery-statement",
    title: "Click here to view the modern slavery statement",
  },
  { label: "Sitemap", href: "/sitemap", title: "Click here to view the sitemap" },
];
