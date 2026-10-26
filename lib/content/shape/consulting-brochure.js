/**
 * The brochure behind a consulting page's brochure buttons, for its
 * `BrochureGate` drawer. Every consulting pillar and sub-page has one at
 * `consulting-brochures/{page slug}.html` on the media host — an HTML page,
 * not a PDF. Derived from the slug rather than read from the CMS, whose
 * brochure links disagree with each other (`#contact`, `/brochures/{pillar}`,
 * the www host) from section to section on the same page.
 */

const BASE = "https://media.edstellar.com/consulting-brochures";

/** Names the title-cased slug gets wrong. */
const NAMES = {
  "coaching-solutions": "Coaching",
  "learning-development-consulting-services": "L&D Consulting",
  "organizational-development-consulting": "Organizational Development",
  "talent-assessment-services": "Talent Assessment",
  "training-needs-analysis-solutions": "Training Needs Analysis",
  "diversity-equity-inclusion": "Diversity, Equity & Inclusion",
  "360-degree-feedback": "360-Degree Feedback",
  "assessment-development-centers": "Assessment & Development Centers",
  "behavioral-psychological-profiling": "Behavioral & Psychological Profiling",
  "skill-gap-competency-assessment": "Skill Gap & Competency Assessment",
  "first-time-manager-coaching": "First-Time Manager Coaching",
  "pre-employment-assessment": "Pre-Employment Assessment",
};

const titleCase = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

/** `BrochureGate`'s `{ brochure, title }` for the consulting page at `slug`
 * (its last path segment). */
export function consultingBrochure(slug) {
  return {
    brochure: `${BASE}/${slug}.html`,
    title: `${NAMES[slug] ?? titleCase(slug)} brochure`,
  };
}
