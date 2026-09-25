/**
 * Trainer detail page — all static content, in page order.
 *
 * One block per section. The page passes each block to its section as the
 * `data` prop; the section reads its wording and data from there.
 *
 * Placeholders in copy — `{name}` = trainer's first name, `{city}` = their
 * city, `{count}` = a number — are filled per page. Headings mark their
 * italic phrase with `<span>` for RichHeading.
 *
 * Anything the CMS sends (name, photo, city, skills, work history, …) is NOT
 * here — it comes from the trainer record. Everything below is static until
 * the CMS is connected for it.
 */
export const TRAINERS_DATA = {
  // ==========================================================================
  // SHARED — used by several sections
  // Hero, About, Reach & languages, FAQ and SEO all read these, so they
  // stay in one place and can't disagree.
  // ==========================================================================
  sharedData: {
    languages: [
      {
        name: "English",
        proficiency: "Native / full delivery",
        level: "100%",
      },
      {
        name: "French",
        proficiency: "Professional / full delivery",
        level: "88%",
      },
    ],
    deliveryMode: "Onsite & Virtual",
  },

  // ==========================================================================
  // BREADCRUMB
  // The trainer's name is added as the last crumb by the page.
  // ==========================================================================
  BreadcrumbData: [
    {
      href: "/",
      label: "Home",
    },
    {
      href: "/trainer",
      label: "Trainers",
    },
  ],

  // ==========================================================================
  // 1. HERO
  // `stats[].key` picks the value shown under each label.
  // ==========================================================================
  heroData: {
    availabilityBadge: "Available to book",
    primaryCta: {
      text: "Talk to Edstellar Consultant",
      href: "#contact",
    },
    secondaryCta: {
      text: "See delivery reach",
      href: "#reach-languages",
    },
    stats: [
      {
        key: "base_location",
        label: "BASE LOCATION",
      },
      {
        key: "trainer_since",
        label: "TRAINER SINCE",
      },
      {
        key: "languages",
        label: "LANGUAGES",
      },
      {
        key: "delivery",
        label: "DELIVERY",
      },
    ],
    deliveryReach: "West Africa & EMEA",
  },

  // ==========================================================================
  // 2. STICKY NAV
  // ==========================================================================
  stickyNavbarData: {
    logo: {
      src: "/course/Edstellar.svg",
      alt: "Edstellar",
    },
    tabs: [
      {
        id: "about",
        label: "About",
        active: true,
      },
      {
        id: "reach-languages",
        label: "Reach & Languages",
        active: false,
      },
      {
        id: "location",
        label: "Location",
        active: false,
      },
      {
        id: "expertise",
        label: "Expertise",
        active: false,
      },
      {
        id: "experience",
        label: "Experience",
        active: false,
      },
      {
        id: "engagements",
        label: "Engagements",
        active: false,
      },
      {
        id: "ratings",
        label: "Ratings",
        active: false,
      },
      {
        id: "accreditations",
        label: "Accreditations",
        active: false,
      },
      {
        id: "education",
        label: "Education",
        active: false,
      },
      {
        id: "faqs",
        label: "FAQ",
        active: false,
      },
    ],
  },

  // ==========================================================================
  // 3. ABOUT
  // `glance_rows[].key` picks the value shown beside each label.
  // ==========================================================================
  aboutData: {
    heading: "About <span>{name}.</span>",
    glance_heading: "At a glance",
    glance_rows: [
      {
        key: "base",
        label: "Base",
      },
      {
        key: "trainer_since",
        label: "Trainer since",
      },
      {
        key: "primary_domain",
        label: "Primary domain",
      },
      {
        key: "languages",
        label: "Languages",
      },
      {
        key: "delivery",
        label: "Delivery",
      },
      {
        key: "travels_for_onsite",
        label: "Travels for onsite",
      },
    ],
    cta: {
      text: "Talk to Edstellar Consultant",
      href: "#contact",
    },
    primaryDomain: "Corporate Training",
    travelsOnsite: "Yes",
  },

  // ==========================================================================
  // 4. REACH & LANGUAGES
  // ==========================================================================
  reachData: {
    heading: "Delivery <span>reach,</span> in detail.",
    description:
      "Which languages {name} trains in, and how each region is served, so a buyer knows exactly what a session with {name} looks like from their location.",
    languages_heading: "Languages of delivery",
    languages_note:
      "Materials, exercises and assessment are delivered in the chosen language, not just spoken translation.",
    coverage_heading: "Regional coverage",
    timezone_label: "Home timezone",
    timezone_note:
      "Virtual cohorts are scheduled to overlap the team's hours, not the trainer's.",
    regionalCoverage: [
      {
        badge: "ONSITE",
        isLime: true,
        title: "West Africa",
        desc: "Nigeria, Ghana, Côte d'Ivoire, Senegal",
      },
      {
        badge: "VIRTUAL",
        isLime: false,
        title: "EMEA",
        desc: "Live instructor-led across European & Middle East timezones",
      },
      {
        badge: "VIRTUAL",
        isLime: false,
        title: "Americas & APAC",
        desc: "Scheduled to the team's working hours",
      },
      {
        badge: "TRAVEL",
        isLime: true,
        title: "Onsite elsewhere on request",
        desc: "For multi-day or enterprise engagements",
      },
    ],
  },

  // ==========================================================================
  // 5. LOCATION
  // `detail_rows[].key` picks the value shown beside each label.
  // ==========================================================================
  locationData: {
    heading: "Based in {city}, <span>open to travel.</span>",
    home_base_label: "Home Base",
    travel_pill: "Willing to travel for onsite delivery",
    nearby_label: "Also Serves Nearby",
    detail_rows: [
      {
        key: "country",
        label: "Country",
      },
      {
        key: "city",
        label: "City",
      },
      {
        key: "metro_region",
        label: "Metro / region",
      },
      {
        key: "timezone",
        label: "Timezone",
      },
      {
        key: "onsite_radius",
        label: "Onsite radius",
      },
      {
        key: "willing_to_travel",
        label: "Willing to travel",
      },
      {
        key: "virtual_delivery",
        label: "Virtual delivery",
      },
    ],
    locationDetail: {
      metroRegion: "Lagos State, South-West",
      timezone: "WAT (UTC+1)",
      onsiteRadius: "West Africa",
      willingToTravel: "Yes, for multi-day & enterprise",
      virtualDelivery: "Global, timezone-matched",
    },
    nearbyCities: ["Ibadan", "Abeokuta", "Abuja", "Port Harcourt", "Accra"],
  },

  // ==========================================================================
  // 6. AREAS OF EXPERTISE
  // Cards come from the CMS's courses; `skills` is only the fallback for a
  // trainer with none. `skillTiers` labels the cards by rank.
  // ==========================================================================
  expertiseData: {
    heading: "Areas of <span>expertise.</span>",
    description:
      "Topics {name} delivers as a corporate trainer, with depth shown by years of active delivery rather than self-rated stars.",
    show_all_label: "Show all {count} areas of expertise",
    show_less_label: "Show less",
    skillTiers: [
      {
        type: "Flagship",
        level: "95%",
      },
      {
        type: "Core",
        level: "88%",
      },
      {
        type: "Core",
        level: "82%",
      },
      {
        type: "Established",
        level: "74%",
      },
      {
        type: "Established",
        level: "66%",
      },
      {
        type: "Active",
        level: "58%",
      },
    ],
    skillTierDefault: {
      type: "Active",
      level: "50%",
    },
    skills: [
      {
        title: "Leadership Development",
        type: "Flagship",
        years: "11 years delivering",
        since: "Since 2013",
        level: "95%",
      },
      {
        title: "Change Management",
        type: "Core",
        years: "10 years delivering",
        since: "Since 2014",
        level: "90%",
      },
      {
        title: "Team Effectiveness",
        type: "Core",
        years: "9 years delivering",
        since: "Since 2015",
        level: "85%",
      },
      {
        title: "Emotional Intelligence",
        type: "Established",
        years: "7 years delivering",
        since: "Since 2017",
        level: "75%",
      },
      {
        title: "Coaching Skills for Managers",
        type: "Established",
        years: "6 years delivering",
        since: "Since 2018",
        level: "65%",
      },
      {
        title: "Difficult Conversations",
        type: "Active",
        years: "5 years delivering",
        since: "Since 2019",
        level: "55%",
      },
    ],
  },

  // ==========================================================================
  // 7. PROFESSIONAL EXPERIENCE
  // The timeline itself comes from the CMS (`meta.work_history`).
  // ==========================================================================
  experienceData: {
    heading: "Professional <span>experience.</span>",
    description: "The operating background that informs how {name} trains.",
    empty_text: "No professional experience details available.",
  },

  // ==========================================================================
  // 8. SELECTED ENGAGEMENTS
  // ==========================================================================
  engagementsData: {
    heading: "Selected <span>engagements.</span>",
    description:
      "A sample of programs {name} has delivered. Clients are described by sector and scope rather than named, unless permission to name them is on record.",
    note: "Engagements shown are anonymized samples. Per brand guidelines §23.1 / §23.3, a named client, logo or specific result publishes only with the client's permission and a verifiable source.",
    engagements: [
      {
        sector: "Financial services",
        title: "Leading through a core-banking migration",
        scope: ["West Africa", "120 managers", "Blended"],
        outcome:
          "A change-leadership program run alongside a major system rollout, equipping managers to carry their teams through the transition.",
        outcome_note: "Outcome figures pending client sign-off.",
      },
      {
        sector: "Telecommunications",
        title: "First-time manager foundations",
        scope: ["Multi-country", "6 cohorts", "Virtual"],
        outcome:
          "A cohort-based leadership track for newly promoted managers across several markets, delivered in English and French.",
        outcome_note: "Outcome figures pending client sign-off.",
      },
      {
        sector: "Public sector",
        title: "Change management for a service reform",
        scope: ["Onsite", "Senior leadership", "Multi-day"],
        outcome:
          "A senior-leadership engagement supporting a large-scale service reform, focused on stakeholder alignment and adoption.",
        outcome_note: "Outcome figures pending client sign-off.",
      },
    ],
  },

  // ==========================================================================
  // 9. RATINGS & TESTIMONIALS
  // ==========================================================================
  ratingsData: {
    heading: "Ratings & <span>testimonials.</span>",
    description:
      "Feedback from teams {name} has trained. Every rating and quote shown here comes from real, consented post-program evaluations.",
    evaluations_label: "from {count} evaluations*",
    note: "Ratings, evaluation counts and quotes are illustrative placeholders in this template. Per brand guidelines §23.1 / §23.2, they publish only when populated from real, consented client evaluations with attribution on record.",
    ratingSummary: {
      score: "4.9",
      evaluations: 84,
    },
    ratingMetrics: [
      {
        label: "Content quality",
        score: "4.9",
        percentage: 98,
      },
      {
        label: "Facilitation",
        score: "5.0",
        percentage: 100,
      },
      {
        label: "Practical relevance",
        score: "4.8",
        percentage: 96,
      },
      {
        label: "Would recommend",
        score: "4.9",
        percentage: 98,
      },
    ],
    testimonials: [
      {
        quote:
          "She did not hand us a change model and leave. She sat with our managers through the objections they were actually getting and rebuilt their approach in the room. Three months on, adoption is holding.",
        initial: "D",
        title: "Director of Transformation, [Sector]",
      },
      {
        quote:
          "We run teams across four countries and needed one facilitator who could hold a room without losing nuance. The feedback was the most consistent we have had from any program.",
        initial: "H",
        title: "Head of L&D, [Company]",
      },
    ],
  },

  // ==========================================================================
  // 10. CERTIFICATIONS, ACCREDITATIONS & EDUCATION
  // Education entries come from the CMS (`meta.education`).
  // ==========================================================================
  accreditationsData: {
    heading: "Certifications & <span>accreditations.</span>",
    description:
      "Professional certifications a trainer holds in their domain. Displayed with the issuing body and year; badges use each partner's official artwork per §23.4.",
    note: "Accreditation names shown are sample credentials. Real badges use each partner's official logo files and usage rules per §23.4, and a lapsed credential comes down.",
    education_heading: "Education.",
    certifications: [
      {
        title: "Prosci Certified",
        subtitle: "Change Practitioner",
        issuer: "Prosci",
        year: "2016",
      },
      {
        title: "ICF Accredited",
        subtitle: "Associate Certified Coach",
        issuer: "ICF",
        year: "2018",
      },
      {
        title: "SHRM-SCP",
        subtitle: "Senior Certified Professional",
        issuer: "SHRM",
        year: "2015",
      },
      {
        title: "Edstellar Verified",
        subtitle: "Trainer credentials reviewed",
        issuer: "Edstellar",
        year: "2023",
      },
    ],
  },

  // ==========================================================================
  // 11. CTA
  // ==========================================================================
  ctaTrainerData: {
    sectionId: "contact",
    heading: "Want {name} for your <span>next program</span>?",
    subtitle:
      "Talk to an Edstellar consultant and we will confirm availability, delivery mode, and timezone for your team.",
    button: {
      text: "Talk to Edstellar Consultant",
      href: "#contact",
      showArrow: true,
    },
  },

  // ==========================================================================
  // 12. OTHER TRAINERS
  // The trainer whose page it is gets filtered out by `slug`.
  // ==========================================================================
  otherTrainersData: {
    heading: "Other <span>trainers</span>.",
    trainers: [
      {
        slug: "daniel-roth",
        name: "Daniel Roth",
        image: "/course/hero-photo.jpg",
        role: "Principal MLOps engineer",
        years: "12+ years in production ML",
        rating: "4.9",
        sessions: "180+",
        specializations: [
          "Drift detection",
          "Observability stack",
          "Dashboards",
        ],
      },
      {
        slug: "marco-bianchi",
        name: "Marco Bianchi",
        image: "/course/image2.png",
        role: "Staff ML engineer, platform",
        years: "10+ years in production ML",
        rating: "4.8",
        sessions: "140+",
        specializations: [
          "Retraining pipelines",
          "A/B & shadow deploys",
          "Orchestration",
        ],
      },
      {
        slug: "annika-lund",
        name: "Annika Lund",
        image: "/course/image3.png",
        role: "Lead data scientist, model risk",
        years: "9+ years in regulated ML",
        rating: "4.9",
        sessions: "120+",
        specializations: ["Fairness monitoring", "Explainability", "EU AI Act"],
      },
      {
        slug: "priya-raghavan",
        name: "Priya Raghavan",
        image: "/course/image4.png",
        role: "SRE lead, ML systems",
        years: "11+ years in reliability",
        rating: "4.8",
        sessions: "160+",
        specializations: ["Alerting design", "Incident response", "Tracing"],
      },
      {
        slug: "lucas-moreau",
        name: "Lucas Moreau",
        image: "/course/image.png",
        role: "ML platform architect",
        years: "13+ years in data platforms",
        rating: "4.9",
        sessions: "200+",
        specializations: [
          "Feature stores",
          "Model serving",
          "Cost optimisation",
        ],
      },
    ],
  },

  // ==========================================================================
  // 13. FAQ
  // Question/answer templates, filled per trainer by the page.
  // ==========================================================================
  faqData: {
    heading: "Working with <span>{name}</span>.",
    items: [
      {
        question:
          "Where is {name} based and where can {name} deliver training?",
        answer:
          "{name} is based in {city}, {country}, and delivers both onsite and live virtual training. Onsite delivery beyond {city} is arranged for multi-day or enterprise engagements, confirmed with an Edstellar consultant.",
      },
      {
        question: "What languages does {name} train in?",
        answer:
          "{name} delivers full programs in {languages}, including materials, exercises, and assessment, not spoken translation alone.",
      },
      {
        question: "What topics does {name} train?",
        answer: "{topics}",
      },
      {
        question: "Does {name} deliver virtual as well as onsite training?",
        answer:
          "Yes. {name} delivers both onsite and live virtual instructor-led programs. Virtual cohorts are scheduled to overlap your team's working hours rather than the trainer's timezone.",
      },
      {
        question: "How do I book {name} for my team?",
        answer:
          "Talk to an Edstellar consultant. They confirm availability, delivery mode, language, and timezone before scheduling.",
      },
    ],
    topics: {
      core_and_related:
        "{name}'s core areas are {core}, with related programs in {related}.",
      core_only: "{name}'s core areas are {core}.",
    },
  },
};
