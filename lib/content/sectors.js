import "server-only";

import government from "@/content/sectors/government.json";
import universities from "@/content/sectors/universities.json";

/**
 * Sector landing pages — the government and university training pages,
 * which share one design (`components/templates/sector-page.jsx`). Both are
 * local JSON (`content/sectors/`) until the CMS has a page for them; the
 * field names are snake_case so the sections will not change when it does.
 */

/** Training for Government (`/government-employees-training-courses`). */
export function getGovernmentPage() {
  return government;
}

/** Training for Universities (`/training-for-universities`). */
export function getUniversitiesPage() {
  return universities;
}
