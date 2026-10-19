/**
 * Leadership Retreats (`/leadership-retreats`) — local content; the CMS has
 * no page for it. Icon names map to lucide icons in
 * `components/sections/leadership_retreats/icons.js`. Headings mark their
 * accent phrase with `<span>`, the CMS convention, for `RichHeading`.
 *
 * Design: `Edstellar-New-Lanch SETUP/leadership-retreats 8.html`.
 */
export const LEADERSHIP_RETREATS = {
  seo: {
    title: "Leadership & Private Team Retreats",
    description:
      "Explore Edstellar's invite-only leadership retreats for executives and teams, with tailored topics, expert faculty, curated destinations and peer networking.",
    path: "/leadership-retreats",
  },
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Leadership retreats", href: null },
  ],

  hero: {
    kicker: "Imperium by Edstellar",
    heading: "Leadership retreats by Edstellar, <span>for leaders shaping the next decade.</span>",
    description:
      "Invite-only retreats for CXOs, senior leaders and leadership teams, designed around what they want from their time away. Edstellar curates the topics, faculty, destination and networking to match.",
    primary_cta: { label: "Request an invitation", href: "#contact" },
    secondary_cta: { label: "Speak to an advisor", href: "#contact" },
    facts: [
      { icon: "mail", label: "By invitation" },
      { icon: "spark", label: "Custom program" },
      { icon: "pin", label: "Premium venues" },
      { icon: "lock", label: "Confidential" },
    ],
    table: {
      title: "Who is at the table",
      subtitle: "A curated group",
      note: "Peers matched to each retreat",
      aria_label: "Illustrative seating: CXOs, senior leaders and rising leaders, with two faculty",
      // Seats clockwise from the top. The legend below reads from these keys.
      seats: [
        "faculty", "cxo", "senior", "cxo", "rising", "senior", "cxo", "senior", "cxo", "rising",
        "senior", "cxo", "senior", "faculty", "cxo", "senior", "cxo", "rising", "senior", "cxo",
        "senior", "cxo", "rising", "senior", "cxo", "senior", "cxo", "rising",
      ],
      legend: [
        { key: "cxo", label: "CXOs" },
        { key: "senior", label: "Senior leaders" },
        { key: "rising", label: "Rising leaders" },
        { key: "faculty", label: "Faculty" },
      ],
    },
  },

  section_nav: {
    items: [
      { id: "audience", label: "Who it's for" },
      { id: "days", label: "How it works" },
      { id: "experience", label: "Experience" },
      { id: "private", label: "Private retreats" },
      { id: "outcomes", label: "Outcomes" },
      { id: "join", label: "How to join" },
      { id: "faq", label: "FAQs" },
    ],
    cta: { label: "Request an invitation", href: "#contact" },
  },

  audience: {
    heading: "Built for the leaders <span>who set direction.</span>",
    description:
      "Each retreat brings together leaders carrying decisions of similar weight, so every session and conversation is relevant to the person in the next seat.",
    items: [
      {
        seat: "cxo",
        icon: "crown",
        title: "CXOs",
        description: "Founders and C-level leaders setting the direction for the business.",
        leaves_with: "A clear direction and the priorities to back it.",
      },
      {
        seat: "senior",
        icon: "brief",
        title: "Senior leaders",
        description: "Business unit heads, vice presidents and directors who turn strategy into results.",
        leaves_with: "A wider strategic view and the confidence to lead across functions.",
      },
      {
        seat: "rising",
        icon: "spark",
        title: "Rising leaders",
        description: "High-potential leaders preparing to step into larger enterprise roles.",
        leaves_with: "A clear leadership identity and a plan for the next role.",
      },
    ],
    leaves_with_label: "Leaves with",
    cta: { label: "Request an invitation", href: "#contact" },
  },

  design_flow: {
    heading: "Every retreat is designed <span>around its leaders.</span>",
    description:
      "Edstellar starts from the leaders' brief and curates the topics, faculty, destination and networking to match. Nothing is fixed until the brief is clear.",
    brief: {
      title: "Your brief",
      icon: "mail",
      items: [
        { icon: "target", title: "Goals", description: "The decisions and challenges to work on" },
        { icon: "compass", title: "Topics", description: "Leadership, strategy, specialized or niche subjects" },
        { icon: "pin", title: "Destination", description: "Preferred regions and style of venue" },
        { icon: "cal", title: "Timing", description: "Dates and duration" },
        { icon: "group", title: "Group", description: "Who attends and how many" },
      ],
    },
    steps: ["Listen", "Design", "Curate", "Host"],
    core: { title: "Edstellar", subtitle: "curates" },
    retreat: {
      title: "Your retreat",
      icon: "check",
      items: [
        { icon: "sliders", title: "Program", description: "Sessions designed around those goals" },
        { icon: "star", title: "Faculty", description: "Practitioners and experts matched to each topic" },
        { icon: "pin", title: "Setting", description: "A luxury destination and premium venue" },
        { icon: "cal", title: "Format", description: "A schedule and pace that fit the leaders' calendars" },
        { icon: "chat", title: "Networking", description: "Peer circles, curated introductions and shared dinners" },
      ],
    },
    footnote: "Every retreat closes with a personal roadmap for each leader, with optional Meridian coaching.",
  },

  experience: {
    heading: "Every detail is handled, <span>so leaders can focus.</span>",
    items: [
      {
        icon: "pin",
        title: "Luxury destinations",
        description: "Premium locations and private venues chosen for each group, for quiet, focus and time outdoors.",
      },
      {
        icon: "lock",
        title: "Invite-only and confidential",
        description: "A curated group of leaders, selected by invitation, in a setting built for candor.",
      },
      {
        icon: "concierge",
        title: "Fully managed",
        description: "White-glove service from arrival to departure, so leaders give the retreat their full attention.",
      },
    ],
    included: {
      title: "Included in every retreat",
      items: [
        "A program designed around your brief",
        "Faculty and experts matched to your topics",
        "Pre-retreat preparation and a post-retreat roadmap",
        "Travel, stays and venue, fully managed",
        "A dedicated concierge throughout",
        "Curated networking and time for renewal",
      ],
      cta: { label: "Request an invitation", href: "#contact" },
    },
  },

  formats: {
    heading: "Private retreats <span>for your leadership team.</span>",
    description:
      "Imperium also designs retreats for one organization's leadership team, designed the same way, around your strategy and your team.",
    switch_label: "Show retreat format",
    items: [
      {
        key: "private",
        tab: "Private retreat",
        kicker: "For one organization",
        title: "Private retreat",
        rows: [
          { label: "Who attends", value: "Your executive team, senior leaders or board" },
          { label: "Program", value: "Built around your strategy and priorities" },
          { label: "Peer learning", value: "Alignment within your own leadership team" },
          { label: "Destination", value: "Chosen with you" },
        ],
        cta: { label: "Plan a private retreat", href: "#contact" },
      },
      {
        key: "open",
        tab: "Open retreat",
        kicker: "For individual leaders",
        title: "Open retreat",
        rows: [
          { label: "Who attends", value: "Leaders from different organizations" },
          { label: "Program", value: "Designed around the interests of the group" },
          { label: "Peer learning", value: "Leaders from other industries and regions" },
          { label: "Destination", value: "A premium destination curated for the group" },
        ],
        cta: { label: "Request an invitation", href: "#contact" },
      },
    ],
  },

  outcomes: {
    heading: "Leaders return with clarity, <span>energy and a plan.</span>",
    description:
      "The retreat ends with a plan, not a souvenir. These are the outcomes every retreat is designed around.",
    items: [
      {
        icon: "compass",
        title: "Clarity",
        points: [
          { title: "Clear strategic direction", description: "Long-term priorities each leader can explain and defend." },
          { title: "Confident decisions", description: "High-stakes choices tested in candid peer dialogue." },
        ],
      },
      {
        icon: "sun",
        title: "Energy",
        points: [
          { title: "Renewed energy", description: "Time away that restores focus, presence and resilience." },
          { title: "A future-ready mindset", description: "Tools to read disruption early and adapt with intent." },
        ],
      },
      {
        icon: "flag",
        title: "A plan",
        highlight: true,
        points: [
          { title: "An actionable roadmap", description: "A personal plan for the months after the retreat." },
          { title: "A global peer network", description: "Trusted relationships with leaders facing similar decisions." },
        ],
      },
    ],
  },

  join: {
    heading: "Three steps <span>to your retreat.</span>",
    items: [
      {
        icon: "mail",
        title: "Request an invitation",
        description: "Share your role, organization and what you want from the retreat.",
      },
      {
        icon: "chat",
        title: "Share your brief",
        description: "A conversation with an advisor on your goals, topics, destination and timing.",
      },
      {
        icon: "check",
        title: "Receive your retreat",
        description: "Edstellar curates the program and confirms the destination, dates and preparation.",
        highlight: true,
        cta: { label: "Request an invitation", href: "#contact" },
      },
    ],
  },

  about: {
    mark: { title: "Imperium", subtitle: "by Edstellar" },
    heading: "Imperium, Edstellar's <span>executive retreat division.</span>",
    description:
      "Imperium runs Edstellar's leadership retreats, working alongside Edstellar's consulting, assessment and coaching teams, so a retreat can become part of a wider leadership program.",
    links_label: "Build a wider program with",
    links: [
      { label: "L&D consulting", href: "/learning-development-consulting-services" },
      { label: "Organizational development", href: "/organizational-development-consulting" },
      { label: "Talent assessments", href: "/talent-assessment-services" },
      { label: "Coaching", href: "/coaching-solutions" },
    ],
  },

  faqs: {
    heading: "Leadership retreat <span>FAQs.</span>",
    items: [
      {
        question: "What is an Edstellar leadership retreat?",
        answer:
          "An invite-only retreat designed by Edstellar around the leaders who attend. Leaders share what they want from their time away, and Edstellar curates the topics, faculty, destination and networking to match. Retreats are run by Imperium, Edstellar's executive retreat division.",
      },
      {
        question: "Who attends the retreats?",
        answer:
          "CXOs, senior leaders such as business unit heads, vice presidents and directors, and rising leaders preparing for larger roles. Each group is curated by invitation so leaders sit with peers facing decisions of similar weight.",
      },
      {
        question: "Can we choose the topics?",
        answer:
          "Yes. Topics come from the brief and can include leadership themes, strategy and foresight, specialized or niche subjects, and structured networking. Edstellar matches faculty and experts to each topic.",
      },
      {
        question: "How long is a retreat, and how many leaders attend?",
        answer:
          "Both are set by the brief. Groups are kept small enough for every leader to take part in every conversation, and private retreats are sized to your team.",
      },
      {
        question: "Where are the retreats held?",
        answer:
          "In luxury destinations and premium venues chosen around the leaders' preferences. The destination and dates are confirmed once the program is designed.",
      },
      {
        question: "Are the conversations confidential?",
        answer:
          "Yes. Retreats are invite-only and conversations stay within the group, so leaders can speak candidly about real decisions.",
      },
      {
        question: "How is a leadership retreat different from a corporate offsite?",
        answer:
          "An offsite is usually planning and team time. A leadership retreat is designed around a brief, with faculty-led sessions, curated networking and a personal roadmap for each leader. A private retreat can combine both for one leadership team.",
      },
      {
        question: "Can Edstellar run a private retreat for our leadership team?",
        answer:
          "Yes. Imperium designs private retreats for one organization's executive team, senior leaders or board, built around your strategy. Speak to an advisor to plan one.",
      },
      {
        question: "How much does a retreat cost?",
        answer:
          "The investment depends on the destination, duration and program, and your advisor shares it once your brief is clear.",
      },
    ],
  },

  form: {
    heading: "Request an <span>invitation.</span>",
    description:
      "Tell us about your role and what you want from the retreat. A retreat advisor will reply within one business day.",
    interest_options: [
      { value: "open", label: "An open retreat with leaders from other organizations" },
      { value: "private", label: "A private retreat for my leadership team" },
      { value: "unsure", label: "Not sure yet" },
    ],
    message_placeholder:
      "Tell us about your role, what you want from the retreat, and any topics, destinations or timing you have in mind.",
    sla_note: "A retreat advisor replies within one business day, no automated sales sequence.",
    submit_label: "Request an invitation",
  },
};
