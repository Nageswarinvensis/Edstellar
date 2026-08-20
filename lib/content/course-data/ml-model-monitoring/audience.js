/**
 * audience.js — Audience section
 * Component: components/sections/course/audience.jsx
 */

export const audience = {
  heading: {
    parts: [
      { text: "Who should attend this " },
      { text: "ML monitoring", em: true },
      { text: " training?" },
    ],
  },
  description:
    "Two groups matter on a corporate program, and they are not asking the same question. The people in the room want to know what they will build. The people funding it want to know what changes afterwards.",
  groups: [
    {
      id: "participants",
      variant: "light",
      title: "Participants",
      subtitle: "In the room, hands on the stack",
      roles: [
        "ML Engineers",
        "Data Scientists",
        "MLOps Engineers",
        "DevOps Engineers",
        "AI Platform Engineers",
        "Data Engineers",
      ],
    },
    {
      id: "buyers",
      variant: "dark",
      title: "Training buyers",
      subtitle: "Scope it, fund it, measure it",
      roles: [
        "L&D Managers",
        "Heads of L&D",
        "Engineering Leaders",
        "AI/ML Leaders",
        "HR / Talent Development",
      ],
    },
  ],
  prerequisites:
    "Participants should have experience in machine learning model development and Python programming. Where a cohort mixes model builders with platform and data engineers, tell us at scoping and the depth is split accordingly.",
  progression: {
    title: "Skill progression: entry → exit",
    description:
      "Where a typical participant starts and where they finish. Only the first two lines are prerequisites. Everything below is taught from the ground up.",
    items: [
      { skill: "Python for ML",                      entryLevel: "Intermediate", exitLevel: "Advanced",      entryPercent: 50, exitPercent: 65, prerequisite: true },
      { skill: "ML model development",               entryLevel: "Intermediate", exitLevel: "Very Advanced",  entryPercent: 50, exitPercent: 82, prerequisite: true },
      { skill: "Drift detection & statistical tests", entryLevel: "None",         exitLevel: "Very Advanced",  entryPercent: 0,  exitPercent: 92 },
      { skill: "Monitoring infrastructure",           entryLevel: "Basic",        exitLevel: "Very Advanced",  entryPercent: 25, exitPercent: 86 },
      { skill: "Alerting & incident response",        entryLevel: "Basic",        exitLevel: "Very Advanced",  entryPercent: 25, exitPercent: 88 },
      { skill: "Retraining, A/B & shadow deployment", entryLevel: "None",         exitLevel: "Very Advanced",  entryPercent: 0,  exitPercent: 84 },
      { skill: "Explainability & fairness monitoring",entryLevel: "None",         exitLevel: "Advanced",       entryPercent: 0,  exitPercent: 72 },
    ],
  },
  sectionCta: {
    title: "Mixed cohort, or several teams at once?",
    description:
      "Model builders and platform engineers can run at different depths in the same program. Tell us who is attending.",
    cta: { label: "Request a Training Proposal", href: "#apply" },
  },
};
