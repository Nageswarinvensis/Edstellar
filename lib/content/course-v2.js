import "server-only";

import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";
import { COURSE_V2 } from "@/content/courses/v2";

/**
 * Opt-in only: `COURSE_V2_PREVIEW=true` in `.env.local` (git-ignored, so it
 * never reaches a deployment). Without it — every server that does not set it
 * explicitly, production included — a "preview" course keeps the old layout.
 * Deliberately not keyed on `VERCEL_ENV`/`NODE_ENV`: those are missing or
 * wrong on a self-hosted box, which would leak the design live.
 */
const PREVIEW_ON = process.env.COURSE_V2_PREVIEW === "true";

/** v2 sections are CMS components whose slug carries this prefix. */
const V2_PREFIX = "course_";

/**
 * The v2-design page for a course, or `null` when the course should render
 * the old layout. Decided by the switch in `content/courses/v2/index.js`:
 * `"live"` everywhere, `"preview"` only where `COURSE_V2_PREVIEW=true`,
 * `"off"` (or not listed) never.
 *
 * Data: the CMS page named by the entry's `cms_slug` (its `course_*`
 * components), over the local JSON as a fallback — see `withFallback`.
 * Wrapped in `cache()` so metadata and the page body share one request.
 */
export const getCourseV2 = cache(async (domain, courseSlug) => {
  const entry = COURSE_V2[`${domain}/${courseSlug}`];
  if (!entry) return null;
  const on = entry.mode === "live" || (entry.mode === "preview" && PREVIEW_ON);
  if (!on) return null;
  if (!entry.cms_slug) return entry.data;

  return withFallback(entry.data, await getV2Sections(entry.cms_slug));
});

/**
 * The `course_*` components of a published CMS page, keyed by component slug
 * — `{}` when the page is missing, unpublished, or the CMS is unreachable, so
 * the page falls back to the local JSON rather than failing.
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
