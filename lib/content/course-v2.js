import "server-only";

import { COURSE_V2 } from "@/content/courses/v2";

/**
 * Opt-in only: `COURSE_V2_PREVIEW=true` in `.env.local` (git-ignored, so it
 * never reaches a deployment). Without it — every server that does not set it
 * explicitly, production included — a "preview" course keeps the old layout.
 * Deliberately not keyed on `VERCEL_ENV`/`NODE_ENV`: those are missing or
 * wrong on a self-hosted box, which would leak the design live.
 */
const PREVIEW_ON = process.env.COURSE_V2_PREVIEW === "true";

/**
 * The v2-design page for a course, or `null` when the course should render
 * the old layout. Decided by the switch in `content/courses/v2/index.js`:
 * `"live"` everywhere, `"preview"` only where `COURSE_V2_PREVIEW=true`,
 * `"off"` (or not listed) never.
 *
 * The data is local JSON — the CMS has no v2 fields yet.
 */
export function getCourseV2(domain, courseSlug) {
  const entry = COURSE_V2[`${domain}/${courseSlug}`];
  if (!entry) return null;
  if (entry.mode === "live") return entry.data;
  if (entry.mode === "preview" && PREVIEW_ON) return entry.data;
  return null;
}
