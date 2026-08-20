/**
 * why-now.js — WhyNow section
 * Component: components/sections/course/why-now (or equivalent)
 */

export const whyNow = {
  heading: {
    parts: [
      { text: "Why " },
      { text: "ML model monitoring", em: true },
      { text: " matters now." },
    ],
  },
  description:
    "That silent decay is not hypothetical, and it is no longer only an engineering concern. Three forces have turned production monitoring from good practice into an operational requirement: degradation is now measured rather than assumed, the tooling market is consolidating fast around ML observability, and regulators mandate post-market monitoring for high-risk AI. This training closes the gap between deploying models and actually operating them.",
  stats: [
    { value: "91%",   description: "of ML models degrade over time" },
    { value: "40.5%", description: "MLOps market CAGR to 2030" },
    { value: "€15M",  description: "maximum EU AI Act penalty" },
    { value: "24–40", description: "hours of hands-on training" },
  ],
  cards: [
    {
      eyebrow: "SILENT DEGRADATION",
      title: "91% of models",
      description:
        "A peer-reviewed study in Scientific Reports tested 128 model–dataset pairs across healthcare, finance, transportation and weather, and found temporal degradation in 91% of them, which the researchers call AI aging. Nothing in the code changes; the world does.",
      tags: ["Data drift", "Concept drift", "Model staleness", "AI aging"],
    },
    {
      eyebrow: "MARKET GROWTH",
      title: "$16.6B by 2030",
      description:
        "The global MLOps market is projected to reach USD 16.6 billion by 2030, growing at a 40.5% compound annual rate from 2025, with monitoring and governance among the fastest-moving components of the stack.",
      tags: ["MLOps platforms", "ML observability", "Model governance"],
    },
    {
      eyebrow: "REGULATORY PRESSURE",
      title: "2 December 2027",
      description:
        "The EU AI Act mandates post-market monitoring for high-risk AI systems. The Digital Omnibus on AI, given final approval on 29 June 2026, deferred stand-alone Annex III obligations from August 2026 to 2 December 2027: a longer runway, not a lighter one.",
      tags: ["EU AI Act", "Post-market monitoring", "Annex III", "Conformity assessment"],
    },
  ],
  platforms: {
    eyebrow:
      "EVERY MAJOR PLATFORM NOW SHIPS MODEL MONITORING, WHICH IS WHY THE SKILLS GAP IS URGENT",
    items: [
      { name: "Microsoft",  product: "Azure ML model monitoring" },
      { name: "Google",     product: "Vertex AI Model Monitoring" },
      { name: "AWS",        product: "SageMaker Model Monitor" },
      { name: "Databricks", product: "Lakehouse Monitoring" },
      { name: "IBM",        product: "watsonx.governance" },
    ],
  },
};
