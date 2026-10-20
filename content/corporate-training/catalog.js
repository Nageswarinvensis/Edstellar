/**
 * Corporate Training Catalog (`/corporate-training-catalog`, the live
 * site's URL) — local copy. The domains and every course in them are NOT
 * here: they come from the CMS sitemap API (`lib/content/training-catalog.js`),
 * so every course link is a page that exists.
 *
 * Headings mark their italic phrase with `<span>`.
 *
 * Design: `Edstellar-New-Lanch SETUP/corporate-training-catalog 27.html`.
 */
const FULL_CATALOG_PDF =
  "https://media.edstellar.com/brochures/all-courses-catalog.pdf";

export const CATALOG_PAGE = {
  seo: {
    title: "Corporate Training Courses & Course Catalog",
    description:
      "Browse Edstellar's corporate training courses by domain. Explore program details and find courses that match your team's skills and development priorities.",
    path: "/corporate-training-catalog",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Corporate Training", href: "/corporate-training" },
    { label: "Corporate Training Catalog", href: null },
  ],

  hero: {
    heading: "Corporate Training Catalog",
    subheading: "Every Edstellar program, organized by domain.",
    description:
      "Browse 77 training domains and 2,000+ instructor-led programs in one place, from artificial intelligence and cloud computing to leadership, sales and compliance. Open any domain to see all of its courses and request a program tailored to your team.",
    meta: ["Instructor-led", "Onsite / virtual / blended", "10+ languages", "100+ countries"],
    primary_cta: { label: "Browse the domains", href: "#catalog" },
    secondary_cta: { label: "Request a quote", href: "#contact" },
    image: {
      src: "https://media.edstellar.com/website/Catelog-1.webp",
      alt: "Edstellar corporate training catalog of instructor-led programs",
      width: 640,
      height: 560,
    },
  },

  proof: {
    stats: [
      { value: "2,000+", label: "Programs" },
      { value: "77", label: "Domains" },
      { value: "5,000+", label: "Trainers" },
      { value: "300+", label: "Clients" },
    ],
    credential: { value: "ISO 9001 & 27001", label: "Certified" },
    prompt: "Not sure where to start?",
    actions: [
      { icon: "target", label: "Start with a needs analysis", href: "/training-needs-analysis-solutions" },
      { icon: "download", label: "Download the full catalog (PDF)", href: FULL_CATALOG_PDF },
    ],
  },

  catalog: {
    search_label: "Search domains and courses",
    search_placeholder: "Search domains or courses",
    letters_label: "Jump to letter",
    // Course tiles shown before "Show all N courses".
    preview: 9,
    empty: {
      heading: "No domains match your search.",
      text: "Try a broader topic, or tell Edstellar what your team needs. Programs can be tailored or designed around your goals.",
      reset: "Clear search",
      cta: { label: "Request a custom program", href: "#contact" },
    },
    domain_link: "View all {name} training",
  },

  // "Build your brief" card beside the catalog. Its sentence options and fields
  // are the navigation brief composer's own (`BRIEF` in lib/nav-data.js), and
  // it sends to the same Zoho form ("GlobalNavigationForm").
  brief: {
    title: "Build your brief",
    intro: "Fill in the blanks or describe what you need, and an Edstellar expert gets back to you.",
  },

  faqs: {
    heading: "Corporate training catalog <span>FAQs.</span>",
    items: [
      {
        question: "How many training domains are in the Edstellar catalog?",
        answer:
          "The catalog groups 2,000+ instructor-led programs into 77 domains, from artificial intelligence and cloud computing to leadership, sales, compliance and sustainability. Open any domain on this page to see every course in it.",
      },
      {
        question: "Can Edstellar customize a course from the catalog?",
        answer:
          "Yes. Every catalog course can be tailored to your team. Share your audience, goals and timelines, and Edstellar adapts the outline, examples and exercises with the trainer before delivery.",
      },
      {
        question: "Are catalog courses delivered onsite or online?",
        answer:
          "Both. Every course is instructor-led and can be delivered onsite at your location or as live virtual training, and blended formats combine the two.",
      },
      {
        question: "Can I download the Edstellar training catalog?",
        answer: "Yes. Download the complete catalog as a PDF from the top of this page.",
      },
      {
        question: "How do I find the right course for my team?",
        answer:
          "Search the catalog by domain, course or skill, or jump to a letter in the A to Z list. If you are not sure where to start, Edstellar's Training Needs Analysis identifies the skill gaps to prioritize first.",
      },
      {
        question: "How do I get a quote for corporate training?",
        answer:
          "Use the form on this page to share the domain or course, team size and preferred format. Edstellar responds with a tailored proposal.",
      },
    ],
    closing: { text: "Still have a question about the catalog?", cta: { label: "Ask us directly", href: "#contact" } },
  },

  form: {
    heading: "Request a corporate training <span>quote.</span>",
    description:
      "Tell us which domains and courses you are considering. We reply within one business day with a scoped response, no automated sales sequence.",
    message_label: "Your requirements",
    message_placeholder:
      "Tell us about your team: domains or courses of interest, team size, timing, and the outcomes you are trying to move.",
    sla_note: "We reply within one business day with a scoped response, no automated sales sequence.",
    submit_label: "Request a quote",
  },
};
