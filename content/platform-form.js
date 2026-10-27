/**
 * Options for the platform enquiry form (`public/edpf.js`, on the static
 * `/platforms/{slug}` pages)
 * — the values, in the same order, of Zoho's "EdstellarPlatforms" form.
 * Company size, employees impacted, timeline and budget are the consulting
 * form's lists (`content/consulting-form.js`), which Zoho shares.
 *
 * Zoho keeps every platform's challenges in one flat dropdown, grouped by
 * platform in order; `CHALLENGES_BY_PLATFORM` is that grouping, so each
 * platform page offers only its own challenges (plus "Something else").
 */

/** Zoho `Dropdown` — the platform the enquiry is about. */
export const PLATFORMS = [
  "Spectra LMS",
  "Capability Intelligence Platform",
  "TNA/TNI Engine",
  "Zenith",
  "Orbit",
  "Polaris",
  "Meridian",
  "Not sure yet",
];

/** Each platform page's form `intent` → its `PLATFORMS` value. */
export const PLATFORM_BY_INTENT = {
  "spectra-lms": "Spectra LMS",
  "tna-tni-engine": "TNA/TNI Engine",
  orbit: "Orbit",
  polaris: "Polaris",
  meridian: "Meridian",
};

/** The catch-all at the end of Zoho's challenge list, offered on every page. */
export const OTHER_CHALLENGE = "Something else";

/** Zoho `Dropdown3` — "Current challenge", grouped by platform. */
export const CHALLENGES_BY_PLATFORM = {
  "Spectra LMS": [
    "Low learner engagement or completion",
    "Learners need to learn on mobile",
    "Learning is scattered across tools and spreadsheets",
    "Hard to see engagement and learning impact",
    "Running blended programs at scale",
    "Moving from another LMS",
  ],
  "Capability Intelligence Platform": [
    "No single view of workforce capability",
    "Assessment results sit across tools and vendors",
    "Hard to spot skill gaps across teams",
    "Linking assessment results to development",
    "Planning future skills and roles",
    "Reporting capability to leadership",
  ],
  "TNA/TNI Engine": [
    "Training needs rest on opinion, not evidence",
    "Skill gaps are not measured by role",
    "The annual TNA takes too long to run",
    "The training plan is not tied to business priorities",
    "Hard to justify the training budget",
    "Turning needs into a training calendar",
  ],
  Zenith: [
    "Identifying high-potential leaders",
    "Succession planning for key roles",
    "Selecting or promoting leaders objectively",
    "Building a leadership pipeline",
    "Developing leaders after an assessment",
    "Thin leadership bench strength",
  ],
  Orbit: [
    "Running 360-degree feedback for leaders",
    "Getting honest, anonymous feedback",
    "Turning feedback into development plans",
    "Replacing a manual or survey-based 360",
    "Building a feedback culture",
    "Multi-rater feedback for a large group",
  ],
  Polaris: [
    "A pattern keeps repeating and nothing shifts it",
    "The leadership team cannot get on the same page",
    "The team is in open conflict",
    "Trust needs repair after an incident",
    "We just merged, restructured or reorganized",
    "A new leader has taken over an established team",
    "The team delivers, but burnout and turnover show",
  ],
  Meridian: [
    "Developing senior leaders",
    "Preparing successors",
    "Supporting first-time managers",
    "Leaders moving into new roles",
    "Turning around performance",
    "Keeping high potentials",
  ],
  "Not sure yet": [
    "Building workforce capability",
    "Finding and closing skill gaps",
    "Developing leaders",
    "Improving team effectiveness",
    "Raising learning engagement",
    "Giving leaders better feedback",
  ],
};

/** Zoho `MultipleChoice` — "Also interested in". `value` is Zoho's option
 * (it abbreviates the Capability Intelligence Platform); `label` is shown. */
export const ALSO_INTERESTED = [
  { value: "Spectra LMS", label: "Spectra LMS" },
  { value: "CIP", label: "Capability Intelligence Platform" },
  { value: "TNA/TNI Engine", label: "TNA/TNI Engine" },
  { value: "Zenith", label: "Zenith" },
  { value: "Orbit", label: "Orbit" },
  { value: "Polaris", label: "Polaris" },
];

/** The challenges a platform's form offers: its own, then the catch-all. */
export function challengesFor(platform) {
  return [...(CHALLENGES_BY_PLATFORM[platform] ?? CHALLENGES_BY_PLATFORM["Not sure yet"]), OTHER_CHALLENGE];
}
