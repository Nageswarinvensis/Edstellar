/**
 * approach.js — MapSection (Why Edstellar + approach steps)
 * Component: components/sections/course/mapsection.jsx
 */

export const approach = {
  heading: {
    parts: [
      { text: "Why choose Edstellar for " },
      { text: "ML monitoring ", em: true },
      { text: "training." },
    ],
  },
  description:
    "Edstellar is a corporate training provider delivering instructor-led ML Model Monitoring programs to teams of every size, from a single squad to an entire engineering organization, on-site, virtual, or blended, with hands-on programs built and led by practitioners.",
  image: {
    src: "/course/map1.png",
    alt: "Global delivery map",
  },
  stats: [
    { value: "10,000+", label: "EXPERT TRAINERS" },
    { value: "13+",     label: "YEARS DELIVERING" },
    { value: "1,000+",  label: "ORGANIZATIONS TRAINED" },
    { value: "ISO 9001", connector: "&", secondaryValue: "27001", label: "CERTIFIED" },
  ],
  features: [
    {
      icon: "✏️",
      title: "Curriculum built for your models",
      description:
        "Modules, examples and labs are rewritten around the models your team runs in production. What arrives is not a catalog course with your logo on it.",
    },
    {
      icon: "⚙️",
      title: "Runs on your production stack",
      description:
        "Labs point at your cloud, your model registry and your observability tooling, so what the team builds during the program is what they keep afterwards.",
    },
    {
      icon: "🧪",
      title: "Hands-on labs, not slides",
      description:
        "Drift gets injected, alerts fire, and someone has to diagnose it. Every module ends with the team doing the thing rather than watching it.",
    },
    {
      icon: "👤",
      title: "Led by practitioners",
      description:
        "Every session is built and led by someone who has run monitoring on production models, so the question behind the question gets a real answer.",
    },
    {
      icon: "👥",
      title: "The team learns together",
      description:
        "ML, MLOps and platform engineers work the same incident in one room. The handoffs between them are usually where monitoring was failing.",
    },
    {
      icon: "🌐",
      title: "Delivered where your teams sit",
      description:
        "Onsite, virtual or hybrid, across time zones and in 10+ languages, with one plan covering every location.",
    },
    {
      icon: "🗓️",
      title: "Scheduled around your releases",
      description:
        "Full days, half days across weeks, or split by module. Cohorts are scheduled so delivery does not stop while the team is learning.",
    },
    {
      icon: "📊",
      title: "Assessments and reporting",
      description:
        "Pre- and post-training assessment, cohort-level reporting, and a skills view your L&D team can take into the next planning cycle.",
    },
  ],
  steps: {
    heading: {
      parts: [
        { text: "The Edstellar approach to " },
        { text: "ML Model Monitoring training", em: true },
        { text: "." },
      ],
    },
    description:
      "Six stages from first conversation to measured outcome. Every program is scoped against your stack and your release calendar, not assembled from a catalog shelf.",
    items: [
      { number: "01", title: "Consult",   description: "We start with your monitoring reality: what is in production, what broke last quarter, and which teams own the response." },
      { number: "02", title: "Plan",      description: "A scoped roadmap with module sequence, cohort split and the dates that fit around your release calendar." },
      { number: "03", title: "Align",     description: "A practitioner trainer matched to your stack, briefed on your tooling before the first session." },
      { number: "04", title: "Customize", description: "Exercises rebuilt around your models and your alerting, so the practice transfers on Monday." },
      { number: "05", title: "Execute",   description: "Instructor-led delivery, on-site, virtual or blended, with hands-on labs rather than slideware." },
      { number: "06", title: "Evaluate",  description: "Impact measured against a number you already track, plus competency evidence for every participant." },
    ],
  },
  relatedLabel: "ALSO FROM EDSTELLAR",
  relatedServices: [
    { title: "Talent assessments",       description: "Psychometric, behavioral, leadership and 360-degree assessment.", href: "#" },
    { title: "Training needs analysis",  description: "Needs analysis, gap identification, and a training roadmap.", href: "#", hover: true },
    { title: "L&D consulting",           description: "Learning strategy, content, technology and ROI measurement.", href: "#" },
    { title: "OD consulting",            description: "Org design, succession planning and cultural change.", href: "#" },
    { title: "Managed training services",description: "Training outsourcing, vendor management, logistics and administration.", href: "#" },
    { title: "Coaching solutions",       description: "Executive and manager coaching that keeps skills in use.", href: "#" },
  ],
};
