/**
 * faqs.js — FAQ section
 * Component: components/sections/course/faq.jsx
 */

export const faqs = {
  title: {
    parts: [
      { text: "ML Model Monitoring training " },
      { text: "FAQs", em: true },
      { text: "." },
    ],
  },
  items: [
    {
      question: "What is ML Model Monitoring training?",
      answer:
        "It is an instructor-led corporate training program that teaches teams how to keep production machine learning models accurate, reliable, fair, and compliant over time. It covers the full monitoring lifecycle: data and concept drift detection, performance tracking, alerting and incident response, retraining and lifecycle management, A/B testing, explainability, and fairness and compliance monitoring.",
    },
    {
      question: "How long is the training and what is the format?",
      answer:
        "The program typically runs 24 to 40 hours, instructor-led, delivered virtually, onsite, or offsite, in 10+ languages, and is fully customizable to your team's schedule, experience level, and production stack.",
    },
    {
      question: "Which tools and techniques does the course cover?",
      answer:
        "Hands-on labs use real production tooling, alongside drift tests such as Kolmogorov-Smirnov and Population Stability Index, attribution methods for explainability, and fairness assessment tooling. A range of ML observability platforms are also covered.",
    },
    {
      question: "Who should attend?",
      answer:
        "Participants are ML engineers, data scientists, MLOps engineers, DevOps engineers, AI platform engineers, and data engineers supporting ML pipelines. Programs are usually bought by L&D managers, heads of L&D, engineering leaders, AI/ML leaders, and HR or talent development teams.",
    },
    {
      question: "What are the prerequisites?",
      answer:
        "Participants should have experience in machine learning model development and Python programming.",
    },
    {
      question: "Do participants receive a certificate, and can the training be customized?",
      answer:
        "Yes. On successful completion, employees receive an Edstellar course completion certificate. The curriculum, examples, and labs are fully customized to your industry, tools, and production environment, and delivered for teams onsite, offsite, or virtually worldwide.",
    },
  ],
  sectionCta: {
    title: "Question not answered here?",
    description:
      "Put it in the request. A training specialist answers it directly, within one business day.",
    cta: { label: "Request a Training Proposal", href: "#apply" },
  },
};
