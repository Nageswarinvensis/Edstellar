import artificialIntelligence from "./artificial-intelligence";
import devopsTraining from "./devops-training";
import softSkillsTraining from "./soft-skills-training";

/**
 * The domain registry. One entry per domain, keyed by URL slug.
 *
 * `lib/content/domains.js` is the only module that reads this — everything
 * else goes through those reads (TASTE.md §5.2).
 */
export const DOMAINS = {
  "artificial-intelligence": artificialIntelligence,
  "devops-training": devopsTraining,
  "soft-skills-training": softSkillsTraining,
};
