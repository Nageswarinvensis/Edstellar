/**
 * Scaffolding every domain page shares. Mirrors `content/courses/defaults.js`
 * — merged in beneath every domain by `lib/content/domains.js` so a section
 * the CMS has not modeled yet still renders.
 */

/**
 * Every domain's breadcrumb trail starts with the same two crumbs — only the
 * trailing, domain-specific crumb(s) differ. `deepMerge` never merges arrays
 * (TASTE.md: a later array is the complete list, not a splice target), so
 * this can't live inside `DOMAIN_DEFAULTS` the way object fields do; each
 * domain spreads it directly instead: `breadcrumbs: [...BREADCRUMB_PREFIX,
 * { label: "..." }]`.
 */
export const BREADCRUMB_PREFIX = [
  { href: "/", label: "Home" },
  { href: "/corporate-training", label: "Corporate Training" },
];

export const DOMAIN_DEFAULTS = {
  /**
   * Every course card's delivery badge (INSTRUCTOR-LED · ON-SITE · VIRTUAL)
   * — every course across every domain ships in the same three formats
   * today, so this is the fallback `program.jsx` reads when a course object
   * doesn't set its own `delivery`, rather than repeating this identical
   * object on every one of 100+ course entries.
   */
  delivery: {
    instructorLed: true,
    onSite: true,
    virtual: true,
  },
  /**
   * Fallback hero CTAs. A domain modeled purely in the CMS may not have its
   * `hero.actions` filled in yet; these three generic buttons render until it
   * does. `deepMerge` leaves them untouched when the CMS sends its own
   * `hero.actions` (an array replaces wholesale) and fills them in when it
   * doesn't (an absent/`null` field falls back) — so a domain that configures
   * its own hero buttons keeps them, and one that hasn't still shows CTAs.
   */
  hero: {
    actions: [
      { label: "Browse Programs", href: "#by-topic", variant: "primary" },
      { label: "Ask a Question", href: "#apply", variant: "secondary" },
      { label: "Download Brochure", href: "#apply", variant: "outline" },
    ],
  },
  sticky_nav: {
    logo: {
      src: "/course/Edstellar.svg",
      alt: "Edstellar",
    },
    tabs: [
      { id: "about", label: "About", active: true },
      { id: "by-topic", label: "By topic", active: false },
      { id: "by-role", label: "By role", active: false },
      { id: "paths", label: "Paths", active: false },
      { id: "delivery", label: "Delivery", active: false },
      { id: "trainers", label: "Trainers", active: false },
      { id: "why-edstellar", label: "Why Edstellar", active: false },
      { id: "faqs", label: "FAQ", active: false },
    ],
  },
  stickyFooter: {
    email: true,
    catalog: {
      label: "Catalog",
      href: "#by-topic",
    },
    brochure: {
      label: "Brochure",
      href: "#apply",
    },
    form_anchor_id: "apply",
  },
  /**
   * The catalog section's UI chrome — filter labels, badges, pagination and
   * card button text — is identical for every domain; only the course list
   * and heading are domain-specific and come from the CMS. A domain modeled
   * purely in the CMS (no local content file) still needs these labels, so
   * they live here and the CMS's `programData` merges on top (TASTE.md §5.4).
   */
  /**
   * "Explore compliance training by topic" (`#topics`). Read verbatim by
   * `sections/domain/topics.jsx`. `heading`/`popular.heading` wrap the italic
   * accent phrase in a `<span>`, the convention `RichHeading` splits on.
   * `icon` is a string key into the component's `topicIcons` map;
   * `rank_variant` (gold/flame/mint/lilac) and `tag_variant`
   * (orange/blue/green) map to Tailwind color classes inside the component.
   * Popular-card image paths are placeholders and may 404 — the card renders
   * fine without them.
   */
  topicsData: {
    heading: "Explore compliance training <span>by topic</span>",
    lede: "Six areas carry most of the catalog. Start where your obligations are heaviest.",
    all_link: { label: "All sub-categories" },
    topics: [
      {
        icon: "lock",
        name: "Data Privacy & Protection",
        count: "59 programs",
      },
      {
        icon: "landmark",
        name: "Financial Services Regulation",
        count: "42 programs",
      },
      {
        icon: "briefcase",
        name: "Employment & Labour Law Compliance",
        count: "23 programs",
      },
      {
        icon: "shield",
        name: "AML & Financial Crime",
        count: "20 programs",
      },
      {
        icon: "hard-hat",
        name: "Occupational Health & Safety",
        count: "20 programs",
      },
      {
        icon: "scale",
        name: "Ethics, Anti-Bribery & Integrity",
        count: "17 programs",
      },
    ],
    popular: {
      heading: "Popular compliance <span>programs</span>",
      lede: "Most in-demand compliance training programs for today's organizations.",
      all_link: { label: "All 294 programs" },
      programs: [
        {
          image: "/course/ml-model-monitoring-about.jpg",
          image_alt: "Judge's gavel and brass scales on a desk",
          rank_label: "#1 Most Popular",
          rank_variant: "gold",
          tag: "Ethics, Anti-Bribery & Integrity",
          tag_variant: "orange",
          title: "UK Bribery Act 2010 Compliance",
          duration: "~ 24 Hours",
          delivery: "Virtual / Onsite",
          description:
            "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active integrity program.",
        },
        {
          image: "/course/ml-model-monitoring-about.jpg",
          image_alt: "Laptop screen showing a padlock over network lines",
          rank_label: "#2 High Demand",
          rank_variant: "flame",
          tag: "Data Privacy & Protection",
          tag_variant: "blue",
          title: "GDPR Awareness & Role-Based Data Protection",
          duration: "~ 24 Hours",
          delivery: "Virtual / Onsite",
          description:
            "Reduces breach, fine, and complaint risk by making personal data handling compliant.",
        },
        {
          image: "/course/ml-model-monitoring-about.jpg",
          image_alt: "Workplace policy document and pen on a desk",
          rank_label: "#3 Trending",
          rank_variant: "mint",
          tag: "Workplace Conduct & Harassment",
          tag_variant: "green",
          title: "Prevention of Sexual Harassment (POSH)",
          duration: "~ 24 Hours",
          delivery: "Virtual / Onsite",
          description:
            "Meets statutory harassment-prevention duties and lowers complaint and litigation risk.",
        },
        {
          image: "/course/ml-model-monitoring-about.jpg",
          image_alt:
            "Binders labelled Code of Conduct, Business Ethics and Compliance",
          rank_label: "#4 In Demand",
          rank_variant: "lilac",
          tag: "Ethics, Anti-Bribery & Integrity",
          tag_variant: "orange",
          title: "Code of Conduct & Workplace Ethics",
          duration: "~ 24 Hours",
          delivery: "Virtual / Onsite",
          description:
            "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active integrity program.",
        },
      ],
    },
  },
  bundlesData: {
    heading: "Compliance <span>bundles</span> for whole teams",
    lede: "Curated training packs that onboard a function at once, drawn from how these programs are grouped.",
    filters: [
      { label: "All bundles", cat: "all", count: 8 },
      { label: "Ethics & Conduct", cat: "Ethics & Conduct", count: 2 },
      { label: "Data Privacy", cat: "Data Privacy", count: 1 },
      { label: "Financial Crime", cat: "Financial Crime", count: 2 },
      { label: "Governance", cat: "Governance", count: 2 },
      { label: "Cyber & Audit", cat: "Cyber & Audit", count: 1 },
    ],
    bundles: [
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Brass scales of justice on an office desk",
        badge: "Best seller",
        icon: "scale",
        icon_variant: "orange",
        name: "Ethics & Integrity Program",
        description:
          "Code of conduct, anti-bribery, conflicts of interest and a speak-up culture for every employee.",
        program_count: "9 programs",
        audience: "For All Employees",
        href: "#",
        cat: "Ethics & Conduct",
        programs: [
          {
            number: "01",
            title: "Anti-Bribery & Corruption for Financial Institutions",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "Code of Conduct & Workplace Ethics",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title: "Competition & Antitrust Compliance",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title: "Conflicts of Interest & Gifts & Hospitality",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "05",
            title: "EU Whistleblower Directive Implementation",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "06",
            title: "Global Code of Conduct & Business Ethics",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "07",
            title: "Government Ethics, Integrity & Anti-Corruption",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "08",
            title:
              "Whistleblower Programs & Speak-Up Culture (EU Whistleblowing Directive)",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "09",
            title: "Whistleblowing & Speak-Up Culture",
            description:
              "Prevents bribery, misconduct, and retaliation exposure and shows regulators an active…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Laptop showing a padlock shield for data protection",
        icon: "lock",
        icon_variant: "blue",
        name: "Enterprise Data Privacy Program",
        description:
          "GDPR, regional privacy laws, breach readiness and data protection by design across systems.",
        program_count: "8 programs",
        audience: "For IT & Data Teams",
        href: "#",
        cat: "Data Privacy",
        programs: [
          {
            number: "01",
            title: "Data Privacy Fundamentals (PII, DPIA, Consent)",
            description:
              "Reduces breach, fine, and complaint risk by making personal data handling compliant",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "GDPR Awareness & Role-Based Data Protection",
            description:
              "Reduces breach, fine, and complaint risk by making personal data handling compliant",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title: "Global Data Privacy Awareness",
            description:
              "Reduces breach, fine, and complaint risk by making personal data handling compliant",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title: "Data Privacy & Protection Programme Management",
            description:
              "Reduces breach, fine, and complaint risk by making personal data handling compliant",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "05",
            title: "Data Privacy, Classification & Retention",
            description:
              "Reduces breach, fine, and complaint risk by making personal data handling compliant",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "06",
            title: "ISO 32001 Privacy Information Management",
            description:
              "Reduces breach, fine, and complaint risk by making personal data handling compliant",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "07",
            title: "Privacy by Design & Data Protection Engineering",
            description:
              "Reduces breach, fine, and complaint risk by making personal data handling compliant",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "08",
            title:
              "Privacy Laws of Canada, Japan & Brazil (PIPEDA, APPI, LGPD)",
            description:
              "Reduces breach, fine, and complaint risk by making personal data handling compliant",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Columned bank building among office towers",
        icon: "landmark",
        icon_variant: "gold",
        name: "AML & Financial Crime Program",
        description:
          "AML, KYC, sanctions screening and transaction monitoring for financial-crime defence.",
        program_count: "7 programs",
        audience: "For Risk & Finance",
        href: "#",
        cat: "Financial Crime",
        programs: [
          {
            number: "01",
            title: "AML/CFT Foundations for Financial Institutions",
            description:
              "Meets AML/CFT obligations and reduces exposure to regulatory fines and criminal misuse",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "AML, KYC & Financial Crime Compliance",
            description:
              "Meets AML/CFT obligations and reduces exposure to regulatory fines and criminal misuse",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title: "Financial Crime Prevention: AML, KYC & Sanctions",
            description:
              "Meets AML/CFT obligations and reduces exposure to regulatory fines and criminal misuse",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title: "KYC, Customer Due Diligence & Enhanced Due Diligence",
            description:
              "Meets AML/CFT obligations and reduces exposure to regulatory fines and criminal misuse",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "05",
            title:
              "Role-Based AML/CFT/CPF for Boards, First Line & Compliance Teams",
            description:
              "Meets AML/CFT obligations and reduces exposure to regulatory fines and criminal misuse",
            duration: "~ 24 Hours",
            audience: "People Managers",
            href: "#",
          },
          {
            number: "06",
            title: "Trade-Based Money Laundering",
            description:
              "Meets AML/CFT obligations and reduces exposure to regulatory fines and criminal misuse",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "07",
            title: "Transaction Monitoring & Suspicious Activity Investigation",
            description:
              "Meets AML/CFT obligations and reduces exposure to regulatory fines and criminal misuse",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Binders labelled Regulations, Policies and Compliance",
        icon: "file",
        icon_variant: "teal",
        name: "Compliance Program Excellence",
        description:
          "Build and run a compliance function: program management, risk assessment and regulatory change.",
        program_count: "8 programs",
        audience: "For Compliance Teams",
        href: "#",
        cat: "Governance",
        programs: [
          {
            number: "01",
            title: "Compliance Programme Management (ISO 37301)",
            description:
              "Runs compliance as a managed program rather than a set of separate obligations",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "ISO 31000 Risk Management in Digital Transformation",
            description:
              "Runs compliance as a managed program rather than a set of separate obligations",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title: "RegTech & Automated Regulatory Reporting",
            description:
              "Runs compliance as a managed program rather than a set of separate obligations",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title: "Regulatory Change Management",
            description:
              "Runs compliance as a managed program rather than a set of separate obligations",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "05",
            title: "Regulatory Impact Assessment & Better Regulation",
            description:
              "Runs compliance as a managed program rather than a set of separate obligations",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "06",
            title: "RSA Archer",
            description:
              "Runs compliance as a managed program rather than a set of separate obligations",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "07",
            title: "Third-Party Compliance & Due Diligence",
            description:
              "Runs compliance as a managed program rather than a set of separate obligations",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "08",
            title: "ISO 37301 Compliance Management Lead Auditor",
            description:
              "Runs compliance as a managed program rather than a set of separate obligations",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Hand signing a document with a pen",
        icon: "coins",
        icon_variant: "purple",
        name: "Digital Asset Compliance Program",
        description:
          "Crypto and virtual-asset obligations: MiCA, the FATF travel rule and blockchain analytics.",
        program_count: "4 programs",
        audience: "For Risk & Finance",
        href: "#",
        cat: "Financial Crime",
        programs: [
          {
            number: "01",
            title: "AML/CFT for Fintech & Crypto Businesses",
            description:
              "Meets licensing, Travel Rule, and AML expectations for crypto and virtual asset activity",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "Virtual Asset AML: Travel Rule & Blockchain Analytics",
            description:
              "Meets licensing, Travel Rule, and AML expectations for crypto and virtual asset activity",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title:
              "Crypto-Asset & Digital Asset Compliance (MiCA, FATF Travel Rule)",
            description:
              "Meets licensing, Travel Rule, and AML expectations for crypto and virtual asset activity",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title: "MiCA Crypto-Asset Regulation Compliance",
            description:
              "Meets licensing, Travel Rule, and AML expectations for crypto and virtual asset activity",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Meeting room with conversation icons on the glass",
        icon: "scale",
        icon_variant: "green",
        name: "Conduct & Market Integrity Program",
        description:
          "Market abuse, insider dealing and conduct rules for regulated trading environments.",
        program_count: "5 programs",
        audience: "For Risk & Finance",
        href: "#",
        cat: "Ethics & Conduct",
        programs: [
          {
            number: "01",
            title: "Conduct Risk & Consumer Protection",
            description:
              "Keeps licensed financial firms aligned with their regulator's rules and supervisory…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "Insider Trading & Market Conduct",
            description:
              "Keeps licensed financial firms aligned with their regulator's rules and supervisory…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title: "Market Abuse & Insider Trading Compliance",
            description:
              "Keeps licensed financial firms aligned with their regulator's rules and supervisory…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title: "MiFID II & Securities Markets Regulation",
            description:
              "Keeps licensed financial firms aligned with their regulator's rules and supervisory…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "05",
            title: "PSD2/PSD3 & Payment Services Regulation",
            description:
              "Keeps licensed financial firms aligned with their regulator's rules and supervisory…",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Laptop showing accessibility and compliance icons",
        icon: "network",
        icon_variant: "sky",
        name: "Cyber Compliance & Audit Readiness",
        description:
          "Security compliance, control testing and audit-ready evidence across frameworks.",
        program_count: "5 programs",
        audience: "For IT & Security",
        href: "#",
        cat: "Cyber & Audit",
        programs: [
          {
            number: "01",
            title: "PCI DSS v4.0.1 Compliance for Payment Environments",
            description:
              "Turns cyber regulations and frameworks into implemented, auditable controls",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "Cloud Compliance & Governance Frameworks",
            description:
              "Turns cyber regulations and frameworks into implemented, auditable controls",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title: "Cloud Compliance, Governance & Data Sovereignty",
            description:
              "Turns cyber regulations and frameworks into implemented, auditable controls",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title:
              "EU Cyber Resilience Act (CRA) for Product & Engineering Teams",
            description:
              "Turns cyber regulations and frameworks into implemented, auditable controls",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "05",
            title: "SOC 2 Readiness & Audit Preparation",
            description:
              "Turns cyber regulations and frameworks into implemented, auditable controls",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Hard hat and safety glasses on a desk",
        icon: "file",
        icon_variant: "red",
        name: "Pharma & MedTech Compliance Program",
        description:
          "Curated compliance programs grouped to train a function together with a shared baseline.",
        program_count: "13 programs",
        audience: "For All Employees",
        href: "#",
        cat: "Governance",
        programs: [
          {
            number: "01",
            title: "EU MDR & IVDR Medical Device Compliance",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "EU Medical Device Regulation Readiness",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title: "Good Distribution Practice (GDP) for Pharmaceuticals",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title: "Good Laboratory Practice (GLP) & Data Integrity (ALCOA+)",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "05",
            title: "Good Manufacturing Practice for Pharma & Biotech",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "06",
            title: "GxP & GMP Compliance for Pharma Manufacturing",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "07",
            title: "GxP Data Integrity & ALCOA+",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "08",
            title: "Pharmaceutical Sales Compliance & Promotional Practices",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "09",
            title: "Pharmaceutical Serialisation & Track-&-Trace Compliance",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "10",
            title: "Regulatory Affairs for Pharma & Medical Devices",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "11",
            title: "Regulatory Affairs: FDA, EMA, MHRA & CDSCO Submissions",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "12",
            title:
              "Software as a Medical Device (SaMD) & AI/ML Device Regulation",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "13",
            title: "Software as a Medical Device (SaMD) & IEC 62304",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
      {
        image: "/course/ml-model-monitoring-about.jpg",
        image_alt: "Hard hat and safety glasses on a desk",
        icon: "file",
        icon_variant: "red",
        name: "Pharma & MedTech Compliance Program",
        description:
          "Curated compliance programs grouped to train a function together with a shared baseline.",
        program_count: "13 programs",
        audience: "For All Employees",
        href: "#",
        cat: "Governance",
        programs: [
          {
            number: "01",
            title: "EU MDR & IVDR Medical Device Compliance",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "02",
            title: "EU Medical Device Regulation Readiness",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "03",
            title: "Good Distribution Practice (GDP) for Pharmaceuticals",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "04",
            title: "Good Laboratory Practice (GLP) & Data Integrity (ALCOA+)",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "05",
            title: "Good Manufacturing Practice for Pharma & Biotech",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "06",
            title: "GxP & GMP Compliance for Pharma Manufacturing",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "07",
            title: "GxP Data Integrity & ALCOA+",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "08",
            title: "Pharmaceutical Sales Compliance & Promotional Practices",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "09",
            title: "Pharmaceutical Serialisation & Track-&-Trace Compliance",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "10",
            title: "Regulatory Affairs for Pharma & Medical Devices",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "11",
            title: "Regulatory Affairs: FDA, EMA, MHRA & CDSCO Submissions",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "12",
            title:
              "Software as a Medical Device (SaMD) & AI/ML Device Regulation",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
          {
            number: "13",
            title: "Software as a Medical Device (SaMD) & IEC 62304",
            description:
              "Keeps products inspection-ready and submissions on track with health regulators",
            duration: "~ 24 Hours",
            audience: "All Employees",
            href: "#",
          },
        ],
      },
    ],
    all_link: { label: "View all 63 compliance bundles", href: "#" },
  },
  exploreCategoriesData: {
    heading: "Categories worth <span>exploring next</span>",
    lede: "Where compliance teams most often cross-train, based on how these courses are classified.",
    all_link: { label: "All categories", href: "#" },
    categories: [
      { icon: "gavel", name: "Governance", count: "93 courses", href: "#" },
      {
        icon: "shield",
        name: "Risk & Compliance",
        count: "93 courses",
        href: "#",
      },
      {
        icon: "landmark",
        name: "Banking & Financial Services",
        count: "71 courses",
        href: "#",
      },
      {
        icon: "network",
        name: "Information Security",
        count: "59 courses",
        href: "#",
      },
      {
        icon: "users",
        name: "Leadership & Management",
        count: "22 courses",
        href: "#",
      },
    ],
  },
  programData: {
    eyebrow: {
      discipline: "DISCIPLINE",
    },
    filters: {
      allDisciplines: "All disciplines",
    },
    catalog: {
      showingLabel: "SHOWING",
      ofLabel: "OF",
      liveCatalogLabel: "IN THE LIVE CATALOG",
      searchPlaceholder: "Search programs",
      noResults:
        "No program matches that combination in this selection. We build custom programs where nothing fits.",
      actions: [
        { label: "Ask for a Match", href: "#apply", variant: "primary" },
      ],
      courseCount: 0,
      deliveryBadge: {
        instructorLed: "INSTRUCTOR-LED",
        separator: "·",
        onSite: "ON-SITE",
        virtual: "VIRTUAL",
      },
      card: {
        viewProgram: "VIEW PROGRAM",
        requestProgram: "REQUEST PROGRAM",
        durationOnRequest: "DURATION ON REQUEST",
        hoursSuffix: "HRS",
        proposedLabel: "PROPOSED",
        proposedProgramLabel: "PROPOSED PROGRAM",
      },
      pagination: {
        previous: "PREVIOUS",
        next: "NEXT",
        allProgramsSuffix: "ALL",
      },
    },
  },
};
