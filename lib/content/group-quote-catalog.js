// Real Edstellar program names, grouped for the group-quote wizard's catalog
// picker (`components/sections/course/group-quote.jsx`). Whichever program
// name matches a course page's `groupQuote.lockedProgram` is pre-selected and
// locked in that page's picker, so this list itself carries no lock state.
export const GROUP_QUOTE_CATALOG = [
  {
    group: "Artificial intelligence",
    items: [
      { name: "ML Model Monitoring Training", hours: "16 - 24 hrs" },
      { name: "Machine Learning with Python Training", hours: "40 - 48 hrs" },
      { name: "Machine Learning with Scikit-Learn Training", hours: "" },
      { name: "Machine Learning with TensorFlow Training", hours: "" },
      { name: "Machine Learning with R Training", hours: "" },
      { name: "Introduction to Machine Learning Training", hours: "" },
      { name: "Generative AI (GenAI) Training", hours: "24 - 32 hrs" },
      {
        name: "Retrieval Augmented Generation (RAG) Training",
        hours: "12 - 24 hrs",
      },
      { name: "Agentic AI Training", hours: "20 - 40 hrs" },
      { name: "LLM Observability Training", hours: "16 - 24 hrs" },
      { name: "MLOps for LLMs Training", hours: "" },
      { name: "AI Decision Support Systems Training", hours: "16 - 24 hrs" },
      { name: "Multi-Modal Vector Search Training", hours: "16 - 24 hrs" },
      { name: "Reinforcement Learning Training", hours: "" },
      { name: "Deep Learning Training", hours: "" },
      { name: "Computer Vision Training", hours: "" },
      { name: "Natural Language Processing Training", hours: "" },
    ],
  },
  {
    group: "AI governance and risk",
    items: [
      {
        name: "Artificial Intelligence (AI) Governance Training",
        hours: "16 - 24 hrs",
      },
      { name: "Responsible Generative AI Training", hours: "20 - 40 hrs" },
      { name: "AI Security and Risk Management Training", hours: "" },
      { name: "AI for Compliance Managers Training", hours: "" },
      { name: "AI for Cybersecurity Professionals Training", hours: "20 - 40 hrs" },
    ],
  },
  {
    group: "Applied AI by function",
    items: [
      { name: "ChatGPT Prompt Engineering Training", hours: "16 - 24 hrs" },
      { name: "AI for Managers Training", hours: "" },
      { name: "AI for HR Training", hours: "" },
      { name: "AI for Accountants Training", hours: "" },
      { name: "AI in Clinical Trials Training", hours: "" },
      { name: "Artificial Intelligence for Logistics Training", hours: "" },
    ],
  },
  {
    group: "Data and platforms",
    items: [
      { name: "Big Data Training", hours: "" },
      { name: "Database Management System Training", hours: "" },
      { name: "Advanced Networking Training", hours: "" },
    ],
  },
  {
    group: "Other categories",
    items: [
      { name: "Cybersecurity Training", hours: "" },
      { name: "Leadership Training", hours: "" },
    ],
  },
];

// Tier figures are Edstellar's published package structure. No discount
// percentage is stated: the saving depends on the program mix.
export const LICENSE_PACKAGES = [
  {
    name: "Starter",
    figure: "120",
    unit: "trainee licenses",
    hours: "64 hours of group training",
    who: "Tailored for SMBs",
  },
  {
    name: "Growth",
    figure: "320",
    unit: "trainee licenses",
    hours: "160 hours of group training",
    who: "Ideal for growing SMBs",
    best: true,
  },
  {
    name: "Enterprise",
    figure: "800",
    unit: "trainee licenses",
    hours: "400 hours of group training",
    who: "Designed for large corporations",
  },
  {
    name: "Custom",
    figure: "Unlimited",
    unit: "trainee licenses",
    hours: "Duration set by the rollout",
    who: "Multi-region and multi-year",
  },
];
