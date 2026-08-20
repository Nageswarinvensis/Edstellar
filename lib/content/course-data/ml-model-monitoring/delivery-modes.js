/**
 * delivery-modes.js — DeliveryModes section
 * Component: components/sections/course/delivery-modes.jsx
 */

export const deliveryModes = {
  heading: {
    parts: [
      { text: "Training delivery: " },
      { text: "onsite, virtual", em: true },
      { text: ", and offsite." },
    ],
  },
  description:
    "We design training your teams actually engage with, then deliver it the way that suits you, in 10+ languages through a vetted global trainer network.",
  tabs: [
    {
      id: "virtual",
      label: "Virtual",
      sublabel: "Online",
      title: "Virtual / online",
      description:
        "Expert-led live sessions delivered anywhere, with consistency and easy scheduling.",
      points: [
        "Delivered anywhere worldwide",
        "Standardized content for consistent outcomes",
        "Join from your own workspace, no travel",
        "Scales to large groups across sites",
        "Interactive tools keep remote learners engaged",
      ],
      image: "/course/vertual.webp",
      alt: "Virtual Training",
    },
    {
      id: "onsite",
      label: "On-site",
      sublabel: "In-house",
      title: "On-site (in-house)",
      description: "Immersive, instructor-led learning at your office.",
      points: [
        "Trainers run face-to-face at your office",
        "Setup and content tailored to your workplace and tools",
        "Group exercises drive collaboration",
        "Live demos plus hands-on practice",
        "Direct trainer access to clarify doubts",
      ],
      image: "/course/on-site.webp",
      alt: "On-site Training",
    },
    {
      id: "offsite",
      label: "Off-site",
      sublabel: "Away day",
      title: "Off-site",
      description:
        "Focused, instructor-led group learning away from everyday distractions.",
      points: [
        "We host your teams at a venue of your choice",
        "Built-in group activities for bonding",
        "Full uninterrupted schedule for focus and retention",
        "Boosts morale and signals commitment",
      ],
      image: "/course/off-site.webp",
      alt: "Off-site Training",
    },
  ],
  sectionCta: {
    title: "Want a format that fits around your releases?",
    description:
      "Full days, half days across weeks, or split by module. Tell us the delivery window and we schedule the cohort around it.",
    cta: { label: "Request a Training Proposal", href: "#apply" },
  },
};
