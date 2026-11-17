/**
 * The brochure behind a consulting page's brochure buttons, for its
 * `BrochureGate` drawer. Every consulting pillar and sub-page has one at
 * `consulting-brochure/{page slug}.html` on the media host — an HTML page,
 * not a PDF. The CMS sets it once per page in `page.meta["consulting-brochure"]`;
 * while that is empty the file named after the page's slug is used.
 */

const BASE = "https://media.edstellar.com/consulting-brochure";

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

const titleCase = (slug) =>
  slug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());

/** `BrochureGate`'s `{ brochureKey, title }` for the consulting page at
 * `path`, its CMS site-page path ("coaching-solutions",
 * "talent-assessment-services/360-degree-feedback"). Only the key reaches the
 * page — the URL is resolved on the server (`lib/content/brochures.js`) so it
 * stays out of the page source. */
export function consultingBrochure(path) {
  const slug = path.split("/").pop();
  return {
    brochureKey: `consulting:${path}`,
    title: `${NAMES[slug] ?? titleCase(slug)} brochure`,
  };
}

/** The brochure file named after the page's slug — the fallback while the
 * page's `meta["consulting-brochure"]` is empty in the CMS. */
export const consultingBrochureUrl = (path) => `${BASE}/${path.split("/").pop()}.html`;
