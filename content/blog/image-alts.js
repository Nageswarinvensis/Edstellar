/**
 * Alt text for blog body images, keyed by the image's file name.
 *
 * The CMS blog body carries its own `<img alt>`, but these images had an
 * empty, missing or off-topic alt (image alt audit, Oct 2026). This map wins
 * over whatever the body says, on every post that uses the image. An empty
 * string marks an image as decorative.
 */
export const BLOG_IMAGE_ALTS = {
  "10-most-in-demand-skill-in-namibia.webp": "Top 10 in-demand skills in Namibia",
  "10-most-in-demand-skills-in-kenya.webp": "Top 10 in-demand skills in Kenya",
  "top-9-corporate-training-solutions-in-poland.webp": "Top 9 corporate training companies in Poland",
  "65180d598fac7160ecef74de-skill-based-employee-development-plan.webp":
    "Edstellar corporate training for skills development",
  "651812b457a22aeb65c063c4-corporate-training.webp": "Join Edstellar's global corporate trainer network",
  // The "What's New" box's background and icon.
  "mask-group-2.svg": "",
  "ripple-1x-2-5s-200px-200px-5.svg": "",
};

/**
 * Broken `<img src>` values in the CMS body, mapped to the real image URL.
 * The Namibia post had its alt text pasted into `src`, so the image 404s.
 * Remove an entry once the CMS body is fixed.
 */
export const BLOG_IMAGE_SRC_FIXES = {
  "10 Most In-Demand Skills in Namibia":
    "https://media.edstellar.com/blogs/content/10-most-in-demand-skill-in-namibia.webp",
};
