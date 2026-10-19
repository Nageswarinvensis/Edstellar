/**
 * Request for Proposal (`/request-for-proposal`, the URL in the design's
 * canonical) — local content; the CMS has no page for it. Headings mark
 * their italic phrase with `<span>`. Icon names map to lucide icons in
 * `components/sections/rfp/icons.js`. A link with `href: null` (a page or
 * file not available yet) renders without a link.
 *
 * Design: `Edstellar-New-Lanch SETUP/request-for-proposal 1.html`.
 */
const SUBMIT = { label: "Submit your RFP", href: "#submit" };

export const RFP_PAGE = {
  seo: {
    title: "Corporate Training RFP & Tender Responses",
    description:
      "Submit your RFP, RFQ or tender to Edstellar for an integrated proposal covering corporate training, consulting, assessments and coaching for your organization.",
    path: "/request-for-proposal",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Request for proposal", href: null },
  ],

  hero: {
    heading: "Send Edstellar your training RFP, <span>one proposal for every service you need.</span>",
    description:
      "Training across 77 domains, L&D and OD consulting, assessments and coaching, answered in one complete proposal within 15 working days of clarifications. Edstellar responds to RFPs, RFQs, government tenders and procurement portals.",
    primary_cta: SUBMIT,
    secondary_cta: { label: "Download the procurement pack", href: "#procurement" },
    documents: [
      { label: "RFP", text: "Request for proposal" },
      { label: "RFQ", text: "Request for quotation" },
      { label: "Tender", text: "Tenders and portals" },
    ],
    result: "One Edstellar proposal",
    promises: [
      { title: "15 working days", text: "From clarifications to your proposal" },
      { title: "Your template", text: "Answered in your format or portal" },
      { title: "NDA on request", text: "Signed before details are shared" },
      { title: "100 countries", text: "One point of contact" },
    ],
  },

  strip: [
    { value: "100", label: "countries" },
    { value: "10+", label: "languages" },
    { value: "2,000+", label: "instructor-led programs" },
    { value: "ISO", label: "9001:2015" },
    { value: "ISO", label: "27001:2022" },
  ],

  section_nav: {
    items: [
      { id: "scope", label: "Scope" },
      { id: "timeline", label: "Timeline" },
      { id: "proposal", label: "Proposal" },
      { id: "procurement", label: "Procurement" },
      { id: "government", label: "Government" },
      { id: "submit", label: "Submit" },
      { id: "faq", label: "FAQ" },
    ],
    cta: SUBMIT,
  },

  scope: {
    heading: "Every Edstellar service line, <span>in one response.</span>",
    description:
      "Send one RFP that spans several services and countries, and Edstellar answers it as one integrated proposal, written in your template or entered through your portal.",
    formats: [
      { tag: "RFP", title: "Requests for proposal", text: "The full proposal, from approach to commercials." },
      { tag: "RFQ", title: "Requests for quotation", text: "Commercials for a program you have already defined." },
      { tag: "Tender", title: "Government tenders and portals", text: "Answered through the portal and its document checklist." },
    ],
    formats_note: "RFIs and expressions of interest are welcome through the same form.",
    services: [
      { icon: "book", title: "Corporate training", text: "Instructor-led programs across 77 domains", href: "/corporate-training-catalog" },
      { icon: "compass", title: "L&D consulting", text: "Learning strategy, design and governance", href: "/learning-development-consulting-services" },
      { icon: "network", title: "OD consulting", text: "Structure, culture, leadership and change", href: "/organizational-development-consulting" },
      { icon: "search", title: "Training needs analysis", text: "Skill gaps mapped and ranked by impact", href: "/training-needs-analysis-solutions" },
      { icon: "target", title: "Talent assessments", text: "Psychometric, leadership, 360 and more", href: "/talent-assessment-services" },
      { icon: "chat", title: "Coaching", text: "Executive, leadership and team coaching", href: "/coaching-solutions" },
      { icon: "layers", title: "Managed training", text: "End-to-end training operations", href: "/managed-learning-services/managed-training" },
      { icon: "star", title: "Academies", text: "AI and leadership academies", href: null },
      { icon: "mountain", title: "Leadership retreats", text: "Curated, invite-only retreats", href: "/leadership-retreats" },
    ],
    bid_lead: {
      lead: "One bid lead for the whole RFP.",
      text: "Questions, updates and the final proposal come from one person, whichever services are in scope.",
    },
  },

  timeline: {
    heading: "How Edstellar answers your RFP in <span>15 working days.</span>",
    description:
      "The clock starts the day your clarifications are answered. Select a stage to see what Edstellar does and what is needed from you.",
    start: { title: "Clarifications answered", text: "The clock starts" },
    end: { title: "Proposal submitted", text: "Your template or portal" },
    labels: { does: "Edstellar does", you: "Your part" },
    stages: [
      {
        from: 1, to: 3, days: "Days 1 to 3", short: "1 to 3", name: "Requirement analysis",
        tab: "Requirement analysis",
        text: "Edstellar's bid team reads every requirement against your answers and confirms the scope, audiences and success measures before any design work starts.",
        does: ["Maps every requirement and evaluation criterion", "Confirms audiences, locations and languages", "Assigns subject experts to each service line"],
        you: ["Confirm the scope summary", "Flag any changes to dates or headcount", "Updates from one bid lead"],
      },
      {
        from: 4, to: 8, days: "Days 4 to 8", short: "4 to 8", name: "Solution design",
        tab: "Solution design",
        text: "Edstellar's bid team turns the confirmed scope into a program: the approach, the curriculum adapted to your context, and how it will be delivered across your locations and languages.",
        does: ["Selects the approach and methodology", "Adapts the curriculum to your roles", "Plans delivery by location and language"],
        you: ["Answer any follow-up questions", "Share templates or standards to follow", "Updates from one bid lead"],
      },
      {
        from: 9, to: 11, days: "Days 9 to 11", short: "9 to 11", name: "Trainer shortlist",
        tab: "Trainer shortlist",
        text: "Trainers are matched to the subject, the audience and your goals, and their profiles are prepared for your approval as part of the proposal.",
        does: ["Matches trainers on subject and audience", "Checks availability for your dates", "Prepares trainer profiles"],
        you: ["Share any trainer requirements", "Note preferred delivery languages", "Updates from one bid lead"],
      },
      {
        from: 12, to: 13, days: "Days 12 to 13", short: "12 to 13", name: "Commercials and compliance",
        tab: "Commercials",
        text: "Commercials are prepared in the format your RFP asks for, and every compliance document and questionnaire is completed.",
        does: ["Prepares commercials in your format", "Completes questionnaires and declarations", "Attaches certificates and company documents"],
        you: ["Share any vendor forms to fill", "Confirm the commercial format", "Updates from one bid lead"],
      },
      {
        from: 14, to: 14, days: "Day 14", short: "14", name: "Quality review",
        tab: "Review",
        text: "The full proposal is checked against every requirement in your RFP, so nothing asked for is missing when it reaches your evaluation panel.",
        does: ["Checks every requirement is answered", "Reviews format, length and file rules", "Signs off the final proposal"],
        you: ["Nothing needed from you", "Final dates confirmed", "Updates from one bid lead"],
      },
      {
        from: 15, to: 15, days: "Day 15", short: "15", name: "Proposal submitted",
        tab: "Submit",
        text: "Your complete proposal arrives in your template, by email or through your procurement portal, on or before day 15.",
        does: ["Submits in your template or portal", "Sends a copy to your contact", "Stays available for questions"],
        you: ["Review the proposal", "Invite Edstellar to present, if you wish", "Updates from one bid lead"],
      },

    ],
    before: { label: "Before the clock:", text: "your RFP reaches a bid lead, who sends clarification questions." },
    after: { label: "After day 15:", text: "a presentation if you invite one, contracting, then your client success manager is assigned." },
  },

  band: {
    heading: "Send your RFP today, <span>your bid lead replies next.</span>",
    primary_cta: SUBMIT,
    secondary_cta: { label: "See the procurement pack", href: "#procurement" },
  },

  includes: {
    heading: "Every Edstellar proposal <span>includes.</span>",
    description: "Eight parts in every response, arranged in the order and format your RFP asks for.",
    items: [
      { title: "Understanding of your requirement", text: "Your goals, scope and evaluation criteria, restated so both sides agree on the brief." },
      { title: "Approach and methodology", text: "How Edstellar will deliver, using the 5A method where a consulting stage applies." },
      { title: "Adapted curriculum and outcomes", text: "Modules, levels and exercises fitted to your roles, with learning outcomes for each." },
      { title: "Trainer profiles for your approval", text: "Matched trainers with their subject expertise and delivery experience." },
      { title: "Delivery and logistics plan", text: "Formats, schedules, locations, languages and time zones for every cohort." },
      { title: "Assessment and reporting", text: "Knowledge checks, practical exercises and what you receive after each program." },
      { title: "Commercials", text: "Prepared in the structure your RFP or RFQ specifies." },
      { title: "Compliance documents", text: "Completed questionnaires, declarations, certificates and vendor forms." },
    ],
  },

  procurement: {
    heading: "The Edstellar procurement pack, <span>ready for your vendor review.</span>",
    description:
      "Download the core documents now. Everything else your procurement team needs is prepared on request and sent with the proposal.",
    downloads: {
      title: "Download now",
      text: "Available to every buyer, no form needed.",
      // The design's /downloads/*.pdf links return 404 on the live site, so
      // `href` stays null (the row offers the form instead) until the real
      // files are uploaded — then set `href` and `meta` (e.g. "PDF, 1.2 MB").
      items: [
        { title: "Edstellar company profile", meta: "PDF", href: null },
        { title: "ISO 9001:2015 certificate", meta: "PDF", href: null },
        { title: "ISO 27001:2022 certificate", meta: "PDF", href: null },
      ],
      unavailable: "Request in the form",
    },
    on_request: {
      title: "On request",
      text: "Ask in the form, and the bid lead sends these with your proposal.",
      items: [
        "Mutual NDA, signed before you share full details",
        "Completed vendor registration forms",
        "Information security questionnaire responses",
        "Data processing agreement (GDPR and India DPDP Act)",
        "Company registration and tax documents",
        "Insurance certificates",
        "Trainer CVs for the proposed program",
      ],
      cta: { label: "Request documents in the form", href: "#submit" },
    },
  },

  government: {
    heading: "Government tenders and procurement portals, <span>answered on their terms.</span>",
    description:
      "Edstellar works with government and public-sector organizations and responds to their tenders in the format, sequence and channel each tender sets.",
    cta: { label: "See who Edstellar serves", href: "/who-we-serve" },
    items: [
      { icon: "browser", title: "Responds through your portal", text: "Registration, bid submission and document uploads follow the portal’s own process." },
      { icon: "list", title: "Follows your document checklist", text: "Formats, declarations and technical and commercial bids prepared as the tender specifies." },
      { icon: "chat", title: "One bid lead for pre-bid queries", text: "Clarifications and pre-bid meetings handled by the same person who submits the bid." },
    ],
  },

  why: {
    heading: "Why buyers shortlist <span>Edstellar.</span>",
    description:
      "A capability transformation partner that answers your RFP across services and countries, and stays with you after the award.",
    items: [
      { value: "100", title: "Countries for delivery", text: "Programs delivered in 100 countries and more than 10 languages." },
      { value: "77", title: "Training domains", text: "More than 2,000 instructor-led programs to build from." },
      { value: "1", title: "Client success manager", text: "One dedicated contact per account once your program starts." },
      { value: "2", title: "ISO certifications", text: "ISO 9001:2015 quality and ISO 27001:2022 information security." },
    ],
  },

  submit: {
    heading: "Send Edstellar your <span>RFP.</span>",
    description:
      "Share the document and a few details. Your bid lead replies with clarification questions, and your proposal follows within 15 working days of your answers.",
    org_types: ["Start-up", "SMB", "Mid-market", "Enterprise", "Non-profit", "Education", "Government"],
    doc_types: ["RFP", "RFQ", "Tender or portal", "RFI", "EOI"],
    headcounts: ["Up to 50 people", "50 to 250 people", "250 to 1,000 people", "1,000 to 5,000 people", "5,000+ people"],
    services: [
      "Corporate training",
      "L&D consulting",
      "OD consulting",
      "Training needs analysis",
      "Talent assessments",
      "Coaching",
      "Managed training",
      "Academies",
      "Leadership retreats",
    ],
    files: { title: "Drop your RFP documents here", hint: "PDF, DOCX or XLSX · up to 5 files · 25MB in total", button: "Browse files", max_files: 5, max_mb: 25 },
    submit_label: "Submit your RFP",
    submit_note: "Your bid lead replies with clarification questions first.",
    after: {
      kicker: "After you submit",
      heading: "Your proposal in <span>15 working days.</span>",
      steps: [
        { title: "Your RFP reaches a bid lead", text: "One contact from submission to award" },
        { title: "Clarification questions", text: "Sent in one batch, or a short call" },
        { title: "Your answers start the clock", text: "Day 0 of 15 working days" },
        { title: "Proposal submitted on day 15", text: "In your template or through your portal" },
      ],
      points: ["NDA signed on request", "ISO 27001:2022 certified information security", "RFQs, tenders, RFIs and EOIs welcome"],
    },
  },

  faqs: {
    heading: "RFP and tender <span>FAQs.</span>",
    items: [
      { question: "How long does Edstellar take to respond to an RFP?", answer: "Edstellar sends a complete proposal within 15 working days of your clarifications being answered. The proposal covers the approach, curriculum, trainer profiles, delivery plan, commercials and compliance documents." },
      { question: "When does the 15-working-day response time start?", answer: "The clock starts on the day your answers to the bid lead's clarification questions arrive. Before that, the bid lead reviews your RFP and sends the questions in one batch, or holds a short call if that is quicker for you." },
      { question: "Which formats does Edstellar respond to?", answer: "Edstellar responds to requests for proposal (RFP), requests for quotation (RFQ), government tenders and procurement portal listings. Requests for information (RFI) and expressions of interest (EOI) are welcome too." },
      { question: "Does Edstellar respond to RFIs and expressions of interest?", answer: "Yes. Submit an RFI or EOI through the same form and choose the document type, so the right team prepares the response." },
      { question: "Does Edstellar respond to government tenders and procurement portals?", answer: "Yes. Edstellar responds to government and public-sector tenders through the portal's own process, follows the tender's formats and document checklist, and handles pre-bid queries through one bid lead." },
      { question: "Can Edstellar answer in our own RFP template?", answer: "Yes. Edstellar answers in your template, questionnaire or portal format, so your evaluation panel can compare responses side by side." },
      { question: "Will Edstellar sign an NDA before we share the RFP?", answer: "Yes. Tick \"An NDA is required\" on the form, and Edstellar signs a mutual NDA before you share full details." },
      { question: "Which procurement documents can Edstellar provide?", answer: "The company profile and the ISO 9001:2015 and ISO 27001:2022 certificates, plus vendor registration forms, security questionnaire responses, a data processing agreement, company and tax documents, insurance certificates and trainer CVs, all on request." },
      { question: "Can one proposal cover several services or countries?", answer: "Yes. Edstellar answers multi-service RFPs in one integrated proposal with one point of contact, and delivers in 100 countries and more than 10 languages." },
      { question: "Who will be our point of contact during and after the RFP?", answer: "One bid lead manages your RFP from submission to award. Once Edstellar is selected, your account gets a dedicated client success manager who stays your single point of contact across every program." },
    ],
  },
};
