/**
 * toc.js — PageToc + StickyNavbar
 * Components: components/sections/course/page-toc.jsx
 */

export const toc = {
  items: [
    { id: "curriculum", number: "01", label: "Course syllabus", hasModules: true },
    { id: "audience",   number: "02", label: "Who is it for" },
    { id: "certificate",number: "03", label: "Certificate" },
    { id: "delivery",   number: "04", label: "Delivery format" },
    { id: "faq",        number: "05", label: "FAQs" },
    { id: "results",    number: "07", label: "Results" },
  ],
  cta: {
    label: "Request a Proposal",
    href: "#apply",
    note: "A specialist replies within one business day.",
  },
};

export const stickyNav = {
  logo: { src: "/course/Edstellar.svg", alt: "Edstellar" },
  tabs: [
    { id: "about",        label: "About",         active: true  },
    { id: "why-now",      label: "Why now",        active: false },
    { id: "lifecycle",    label: "Lifecycle",      active: false },
    { id: "skills",       label: "Skills",         active: false },
    { id: "outcomes",     label: "Outcomes",       active: false },
    { id: "curriculum",   label: "Curriculum",     active: false },
    { id: "audience",     label: "Audience",       active: false },
    { id: "delivery",     label: "Delivery",       active: false },
    { id: "why-edstellar",label: "Why Edstellar",  active: false },
    { id: "trainers",     label: "Trainers",       active: false },
  ],
};
