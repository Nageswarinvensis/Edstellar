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
  "training-needs-analysis-services": "Training Needs Analysis",
  "diversity-equity-inclusion": "Diversity, Equity & Inclusion",
  "360-degree-feedback": "360-Degree Feedback",
  "assessment-development-centers": "Assessment & Development Centers",
  "behavioral-assessment": "Behavioral Assessment",
  "skills-proficiency-assessment": "Skills & Proficiency Assessment",
  "learning-content-design-development": "Learning Content Design & Development",
  "cognitive-ability-aptitude-testing": "Cognitive Ability & Aptitude Testing",
  "first-time-manager-coaching": "First-Time Manager Coaching",
  "pre-employment-assessment": "Pre-Employment Assessment",
};

/**
 * Pages whose slug was renamed in the CMS (Nov 2026) while their brochure on
 * the media host still sits at the old file name — new slug → old file. Drop
 * an entry once the media host has `{new slug}.html`.
 */
const FILES = {
  "training-needs-analysis-services": "training-needs-analysis-solutions",
  "learning-strategy": "learning-strategy-design",
  "learning-content-design-development": "learning-content-development",
  "leadership-effectiveness": "leadership-effectiveness-planning",
  "cognitive-ability-aptitude-testing": "cognitive-ability-assessment",
  "english-proficiency-assessment": "language-proficiency-assessment",
  "skills-proficiency-assessment": "skill-gap-competency-assessment",
};

const titleCase = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

/** `BrochureGate`'s `{ brochure, title }` for the consulting page at `slug`
 * (its last path segment). */
export function consultingBrochure(slug) {
  return {
    brochure: `${BASE}/${FILES[slug] ?? slug}.html`,
    title: `${NAMES[slug] ?? titleCase(slug)} brochure`,
  };
}
