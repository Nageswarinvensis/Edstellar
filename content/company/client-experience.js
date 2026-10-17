/**
 * Client Experience (`/exceptional-customer-experience`, the live site's
 * URL) — local content; the CMS has no page for it. Headings mark their
 * italic phrase with `<span>`; a paragraph may carry one inline link as
 * `[label](href)`. Icon names map to lucide icons in
 * `components/sections/client_experience/icons.js`.
 *
 * Design: `Edstellar-New-Lanch SETUP/exceptional-customer-experience 6.html`.
 */
const EXPERT_CTA = { label: "Talk to an Edstellar expert", href: "#contact" };
const STEPS = ["Define", "Adapt", "Deliver", "Assess"];

export const CLIENT_EXPERIENCE = {
  seo: {
    title: "Client Experience and Training Support",
    description:
      "A dedicated Edstellar client success manager for every account, matched trainers and full program support, from the first brief to learning applied at work.",
    path: "/exceptional-customer-experience",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Client experience", href: null },
  ],

  hero: {
    heading: "The Edstellar client experience, <span>one partner from brief to results.</span>",
    description:
      "Every Edstellar account has one dedicated client success manager who plans with you, matches the right trainers and coordinates every program detail, across every team and location.",
    primary_cta: EXPERT_CTA,
    secondary_cta: { label: "See how an engagement runs", href: "#journey" },
    badges: [
      { icon: "user", label: "Dedicated CSM per account" },
      { icon: "check", label: "Matched trainers" },
    ],
  },

  facts: [
    { value: "2,000+", label: "Instructor-led programs" },
    { value: "100", label: "Countries with Edstellar delivery" },
    { value: "10+", label: "Delivery languages" },
    { value: "ISO 9001 · 27001", label: "ISO 9001:2015 and ISO 27001:2022 certified" },
  ],

  section_nav: {
    items: [
      { id: "journey", label: "Journey" },
      { id: "team", label: "Your team" },
      { id: "delivery", label: "Delivery" },
      { id: "why", label: "Why Edstellar" },
      { id: "faq", label: "FAQ" },
      { id: "contact", label: "Contact" },
    ],
    cta: EXPERT_CTA,
  },

  journey: {
    heading: "How Edstellar runs every training engagement, <span>step by step.</span>",
    description:
      "Relevant learning starts with a clear requirement. Edstellar works with your team to connect the business need, the learning content and the delivery plan, with your client success manager beside you at every step.",
    center: { kicker: "At every step", title: "Your client success manager" },
    labels: { share: "You share", csm: "Your client success manager", receive: "You receive" },
    steps: [
      {
        name: "Define",
        title: "Define the business and learning goals.",
        text: "Share the target roles, current experience and the tasks people should perform after training. Edstellar turns these into clear learning priorities and success measures. When skill gaps are not yet clear, a [training needs analysis](/training-needs-analysis-solutions) identifies them first.",
        share: ["Target roles and teams", "Current experience levels", "Tasks people should perform after training"],
        csm: ["Runs the requirement conversation with your team", "Brings in a learning consultant", "Recommends a training needs analysis when gaps are unclear"],
        receive: ["Clear learning priorities", "Agreed success measures"],
      },
      {
        name: "Adapt",
        title: "Adapt the program to your teams.",
        text: "Edstellar adapts topics, level, examples and exercises to your working context, so practice mirrors the conversations and tasks your people handle every day.",
        share: ["Your working context and tools", "Real situations your people face", "Preferred delivery mode and language"],
        csm: ["Coordinates the learning consultant and trainer on tailoring", "Keeps your feedback in every revision"],
        receive: ["A program outline fitted to your teams", "Examples and exercises from your context"],
      },
      {
        name: "Deliver",
        title: "Match trainers and coordinate delivery.",
        text: "Edstellar matches your trainer and coordinates delivery, so your teams can focus on the learning.",
        share: ["Dates, locations and time zones", "Participant lists", "Your approval of the trainer profile"],
        csm: ["Matches your trainer", "Coordinates delivery"],
        receive: ["A trainer you have approved", "A confirmed schedule for every cohort"],
      },
      {
        name: "Assess",
        title: "Assess progress and plan application.",
        text: "Knowledge checks, practical exercises and scenario-based tasks show what participants can do. Edstellar then helps you plan how the learning is applied at work.",
        share: ["Time for knowledge checks and exercises", "Participant feedback", "Priorities for applying the learning"],
        csm: ["Reviews results and feedback with you", "Helps plan application at work", "Plans the next programs with you"],
        receive: ["A view of what participants can now do", "A plan for applying the learning at work"],
      },
    ],
  },

  team: {
    heading: "Your Edstellar team, <span>one contact at the center.</span>",
    description:
      "Your client success manager stays with you through every step and every program on your account, and brings in Edstellar specialists when each step needs them.",
    who_label: "Who",
    steps: STEPS,
    // `from`/`to`: the first and last step (0–3) each role works across.
    roles: [
      { name: "Your client success manager", note: "One per account", from: 0, to: 3, text: "Your single point of contact, for every program on your account", lead: true },
      { name: "Learning consultants", note: "Program design", from: 0, to: 1, text: "Shape your learning priorities, then fit the program to your teams" },
      { name: "Trainers", note: "Matched to your program", from: 1, to: 2, text: "Tailor examples and exercises, then lead every session" },
      { name: "Delivery coordinators", note: "Behind every session", from: 2, to: 2, text: "Run the logistics" },
    ],
  },

  cta: {
    heading: "Plan your next program with <span>an Edstellar client success manager.</span>",
    description: "Share your goals and teams. Your client success manager takes it from there.",
    button: EXPERT_CTA,
  },

  delivery: {
    heading: "Edstellar delivery, <span>handled around your teams.</span>",
    description: "In the Deliver step, Edstellar takes care of two things: the right trainer, and everything around the trainer.",
    trainer: {
      icon: "presentation",
      title: "Your trainer",
      text: "Matched on subject, audience and goals, briefed on your adapted program, and approved by you before delivery.",
      brief_label: "Your brief",
      brief: ["Subject", "Audience", "Goals"],
      profile: {
        title: "Matched trainer profile",
        subtitle: "Shared with you before delivery",
        rows: ["Subject expertise", "Experience with your audience", "Fit with your program goals"],
        matched: "Matched",
        status: "Awaiting your approval",
      },
      note: "Illustrative",
    },
    around: {
      icon: "calendar",
      title: "Everything around the trainer",
      text: "Coordinated across every cohort and location, so your team stays focused on the learning.",
      items: [
        { title: "Scheduling", text: "Sessions planned across locations and time zones." },
        { title: "Participant registration", text: "Participants registered and kept informed." },
        { title: "Program materials", text: "Prepared for your adapted program." },
        { title: "Venue or virtual setup", text: "Rooms or online sessions ready before participants arrive." },
      ],
      badge: "Coordinated by your client success manager",
    },
  },

  why: {
    heading: "Why organizations choose <span>Edstellar.</span>",
    description: "A capability transformation partner with the reach, range and tools to support every program you run.",
    items: [
      { value: "Fit first", title: "Vendor-neutral recommendations", text: "Programs and tools chosen for your goals, not tied to one publisher." },
      { value: "77", title: "Training domains", text: "More than 2,000 instructor-led programs across 77 domains." },
      { value: "8", title: "Edstellar tools", text: "Edstellar's own tools for assessment, learning, coaching and capability tracking." },
      { value: "3", title: "Delivery modes", text: "Virtual, onsite or blended, in more than 10 languages." },
    ],
  },

  related: {
    heading: "More from Edstellar.",
    items: [
      { icon: "layers", tag: "Service", title: "Managed training services", text: "Hand Edstellar the full running of your training calendar.", link: "Explore managed training", href: "/managed-learning-services/managed-training", featured: true },
      { icon: "book", tag: "Programs", title: "Corporate training programs", text: "Instructor-led programs across 77 domains.", link: "Browse programs", href: "/corporate-training-catalog" },
      { icon: "target", tag: "Service", title: "L&D consulting", text: "Strategy, design and governance for your learning function.", link: "Explore consulting", href: "/learning-development-consulting-services" },
      { icon: "chat", tag: "Service", title: "Coaching", text: "One-on-one coaching with certified coaches on Meridian.", link: "Explore coaching", href: "/coaching-solutions" },
      { icon: "building", tag: "Company", title: "About Edstellar", text: "Edstellar as your capability transformation partner.", link: "About Edstellar", href: "/about-us" },
    ],
  },

  faqs: {
    heading: "Client experience <span>FAQs.</span>",
    items: [
      { question: "Who will be my point of contact at Edstellar?", answer: "A dedicated client success manager. Every Edstellar account has one, and the same person stays with you for every program on your account." },
      { question: "How does Edstellar match trainers to our program?", answer: "On the subject, your audience and the goals of the program. The matched trainer is then briefed on the program adapted for your teams." },
      { question: "Can we approve the trainer before the program starts?", answer: "Yes. The matched trainer profile is shared with you before delivery begins." },
      { question: "How does Edstellar adapt a program to our teams?", answer: "Edstellar fits topics, level, examples and exercises to your working context, so practice mirrors the tasks your people handle every day." },
      { question: "Which parts of a training program does Edstellar handle?", answer: "Scheduling, participant registration, program materials, and venue or virtual setup, coordinated by your client success manager." },
      { question: "Can Edstellar run programs for teams in several countries?", answer: "Yes. Edstellar delivers in 100 countries and more than 10 languages, virtually, onsite or blended." },
      { question: "What happens after a program ends?", answer: "Your client success manager reviews the results and participant feedback with you, helps you plan how the learning is applied at work, and plans the next program with you." },
      { question: "How do we start working with Edstellar?", answer: "Share your teams and goals through the form on this page. An Edstellar expert will get back to you to start the Define step. If skill gaps are not yet clear, a training needs analysis can identify them first." },
    ],
  },

  form: {
    heading: "Talk to an <span>Edstellar expert.</span>",
    description: "Tell Edstellar about your teams and goals. An Edstellar expert will get back to you to start the Define step with you.",
    points: [
      { icon: "user", title: "A dedicated client success manager", text: "One point of contact for every program on your account." },
      { icon: "check", title: "Trainers matched to your program", text: "Profiles shared for your approval before delivery." },
      { icon: "globe", title: "Delivery wherever your teams are", text: "100 countries, 10+ languages, virtual, onsite or blended." },
    ],
    message_label: "Your requirements",
    message_placeholder: "Teams, topics, locations and timing",
    sla_note: "An Edstellar expert will be in touch to start the Define step with you.",
    submit_label: "Talk to an Edstellar expert",
  },
};
