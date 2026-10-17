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
  "https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/69ef2b22fcefd48cb366f1d5_Combined%20Catalog%20A5.pdf";

export const CATALOG_PAGE = {
  seo: {
    title: "Corporate Training Catalog: 2,000+ Courses",
    description:
      "Browse Edstellar's corporate training catalog: 2,000+ instructor-led courses across 77 domains, from AI and cloud to leadership and compliance, onsite or virtual.",
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
      src: "https://cdn.prod.website-files.com/6482a3cf7db698c2a80cc5e6/68ca55b30ffd53df55be810a_Catelog-1.webp",
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

  brief: {
    title: "Build a brief",
    intro: "Customize a program for your team: fill in the blanks and a consultant builds it with you.",
    // The sentence: "We need {service} for {who} in {where}."
    blanks: { service: "a service", who: "a team", where: "our sector" },
    titles: { service: "Services and platforms", who: "Roles and teams", where: "Industries" },
    hints: { service: "e.g. a train-the-trainer program", who: "e.g. our graduate intake", where: "e.g. renewable energy" },
    custom_label: "Not listed? Describe it",
    custom_button: "Use this",
    own_label: "Or write your requirement",
    own_placeholder: "e.g. A two-day negotiation workshop for 20 sales managers, delivered onsite in Dubai",
    send_text: "A training consultant shapes a program around your brief and replies within one business day.",
    blank_error: "Fill in the sentence or write your requirement above.",
    email_label: "Work email",
    email_error: "Enter a valid work email address.",
    phone_label: "Phone",
    phone_error: "Enter a phone number we can reach you on.",
    submit: "Send your brief",
    reset: "Start over",
    fine_print: "We use these to send the brief and nothing else. No newsletter, no list.",
    options: {
    service: [
      { label: "corporate training", group: "Corporate training" },
      { label: "a leadership program", group: "Corporate training" },
      { label: "a certification pathway", group: "Corporate training" },
      { label: "onsite delivery", group: "Corporate training" },
      { label: "consulting", group: "Consulting" },
      { label: "a training needs analysis", group: "Consulting" },
      { label: "talent assessments", group: "Consulting" },
      { label: "a capability roadmap", group: "Consulting" },
      { label: "learning content development", group: "Consulting" },
      { label: "a training ROI review", group: "Consulting" },
      { label: "coaching", group: "Coaching" },
      { label: "managed training", group: "Managed training" },
      { label: "a trainer bench", group: "Managed training" },
      { label: "training administration", group: "Managed training" },
      { label: "a skills platform", group: "Platforms" },
      { label: "an LMS", group: "Platforms" },
      { label: "a virtual classroom", group: "Platforms" },
      { label: "skills analytics", group: "Platforms" },
      { label: "a capability academy", group: "Academies" },
    ],
    who: [
      { label: "executive committees", group: "Role" },
      { label: "senior leaders", group: "Role" },
      { label: "mid-level managers", group: "Role" },
      { label: "first-time managers", group: "Role" },
      { label: "engineering managers", group: "Role" },
      { label: "program managers", group: "Role" },
      { label: "technical leads", group: "Role" },
      { label: "high-potential talent", group: "Role" },
      { label: "individual contributors", group: "Role" },
      { label: "board members", group: "Role" },
      { label: "country and site heads", group: "Role" },
      { label: "frontline supervisors", group: "Role" },
      { label: "internal trainers", group: "Role" },
      { label: "new hires", group: "Role" },
      { label: "engineering and IT", group: "Team" },
      { label: "ML and data teams", group: "Team" },
      { label: "cybersecurity", group: "Team" },
      { label: "product and design", group: "Team" },
      { label: "operations and plant", group: "Team" },
      { label: "maintenance and reliability", group: "Team" },
      { label: "quality and safety", group: "Team" },
      { label: "field service", group: "Team" },
      { label: "procurement and supply chain", group: "Team" },
      { label: "sales and CX", group: "Team" },
      { label: "customer support", group: "Team" },
      { label: "finance", group: "Team" },
      { label: "legal and compliance", group: "Team" },
      { label: "HR and L&D", group: "Team" },
      { label: "project teams", group: "Team" },
      { label: "the whole organization", group: "Team" },
    ],
    where: [
      { label: "manufacturing", group: "Industry" },
      { label: "banking and finance", group: "Industry" },
      { label: "technology and software", group: "Industry" },
      { label: "healthcare", group: "Industry" },
      { label: "logistics", group: "Industry" },
      { label: "energy and utilities", group: "Industry" },
      { label: "retail", group: "Industry" },
      { label: "pharma and life sciences", group: "Industry" },
      { label: "automotive", group: "Industry" },
      { label: "insurance", group: "Industry" },
      { label: "media and telecom", group: "Industry" },
      { label: "professional services", group: "Industry" },
      { label: "aerospace and defense", group: "Industry" },
      { label: "construction", group: "Industry" },
      { label: "oil and gas", group: "Industry" },
      { label: "government and public sector", group: "Industry" },
      { label: "mining and metals", group: "Industry" },
      { label: "education", group: "Industry" },
      { label: "hospitality and travel", group: "Industry" },
      { label: "agriculture and food", group: "Industry" },
    ],
    },
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
