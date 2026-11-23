import "server-only";

import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";
import { COURSE_V2_DEFAULTS } from "@/content/courses/v2";

/** v2 sections are CMS components whose slug carries this prefix. */
const V2_PREFIX = "course_";

/**
 * The v2-design data for a course: its CMS page's `course_*` components over
 * the shared local defaults (`content/courses/v2/defaults.json`) — see
 * `withFallback`.
 *
 * Whether a course uses the v2 design at all is the CMS flag
 * `page.meta.is_new_design` (read into `course.is_new_design` by
 * `lib/content/courses.js`); the route checks it before calling this.
 * Wrapped in `cache()`; the CMS read itself is shared with `getCourse`.
 */
export const getCourseV2 = cache(async (domain, courseSlug) => {
  return withFallback(COURSE_V2_DEFAULTS, await getV2Sections(`${domain}/${courseSlug}`));
});

/**
 * The `course_*` components of a published CMS page, keyed by component slug
 * — `{}` when the page is missing, unpublished, or the CMS is unreachable, so
 * the page falls back to the local defaults rather than failing.
 */
async function getV2Sections(cmsSlug) {
  let payload;
  try {
    payload = await apiGet(endpoints.cmsPage(cmsSlug), { revalidate: REVALIDATE.course });
  } catch (error) {
    console.error(`[course-v2] CMS read failed for ${cmsSlug}; using local JSON.`, error);
    return {};
  }
  const page = payload?.page;
  if (!page || page.slug !== cmsSlug || (page.status && page.status !== "published")) return {};

  const sections = {};
  for (const component of payload.components ?? []) {
    if (component.component_slug?.startsWith(V2_PREFIX)) sections[component.component_slug] = component.config;
  }
  return sections;
}

/**
 * CMS data over local data, field by field.
 *
 * A CMS value counts as "not there" when it is `null`, `""`, `[]` or missing,
 * and the local value is used instead. That matters beyond copy: the CMS
 * sends placeholder `logo_paths: []` on monogram tools, and the toolkit picks
 * logo-vs-monogram on that field's truthiness. Objects merge key by key;
 * arrays of the same length merge item by item; otherwise the CMS wins.
 */
function withFallback(local, cms) {
  if (isBlank(cms)) return local;
  if (isPlainObject(local) && isPlainObject(cms)) {
    const out = { ...local };
    for (const key of Object.keys(cms)) {
      const merged = withFallback(local[key], cms[key]);
      if (merged === undefined) delete out[key];
      else out[key] = merged;
    }
    return out;
  }
  if (Array.isArray(cms)) {
    // Item by item against the local array when the lengths match; otherwise
    // still cleaned, so a CMS-only list loses its blank placeholders too.
    const pair = Array.isArray(local) && local.length === cms.length ? local : [];
    return cms.map((item, i) => withFallback(pair[i], item)).filter((item) => item !== undefined);
  }
  return isPlainObject(cms) ? withFallback({}, cms) : cms;
}

function isBlank(value) {
  return value == null || value === "" || (Array.isArray(value) && value.length === 0);
}

function isPlainObject(value) {
  return value !== null && typeof value === "object" && !Array.isArray(value);
}
