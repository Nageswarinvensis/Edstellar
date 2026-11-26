import "server-only";

import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";
import government from "@/content/sectors/government.json";
import universities from "@/content/sectors/universities.json";

/**
 * Sector landing pages — the government and university training pages,
 * which share one design (`components/templates/sector-page.jsx`). The page
 * copy is local JSON (`content/sectors/`). Each page's programs grid comes
 * only from the CMS catalog API; the fixed card values it does not send
 * (delivery label, "View Catalog", image size) are set below.
 */

/**
 * Fixed program-card values the catalog API does not send — the same for
 * every program on a page, so they live here rather than in the JSON. Only
 * the image size differs between the two pages.
 */
const CARD_LABELS = {
  delivery_label: "Instructor-led (On-site/Virtual)",
  catalog_label: "View Catalog",
};
const IMAGE_SIZE = {
  universities: { width: 558, height: 221 },
  government: { width: 372, height: 147 },
};

/**
 * The programs grid from `GET /api/v2/catalogs/{sector}`: each program's copy,
 * image `{ src, alt }` and courses, plus the fixed card values above. A
 * failed or empty response leaves no items, and the Programs section then
 * renders nothing.
 */
async function withCatalog(page, sector) {
  const payload = await apiGet(endpoints.sectorCatalog(sector), {
    revalidate: REVALIDATE.catalog,
  }).catch(() => null);
  const size = IMAGE_SIZE[sector];
  const items = (Array.isArray(payload?.items) ? payload.items : []).map((item) => ({
    ...item,
    catalog_label: item.catalog_label || CARD_LABELS.catalog_label,
    catalog_title: item.catalog_title || item.title,
    image: item.image?.src ? { ...size, ...item.image } : null,
    courses: Array.isArray(item.courses) ? item.courses : [],
  }));

  return {
    ...page,
    programs: { ...page.programs, delivery_label: CARD_LABELS.delivery_label, items },
  };
}

/** Training for Government (`/government-employees-training-courses`) —
 * local copy only (metadata, schema). */
export function getGovernmentPage() {
  return government;
}

/** Training for Government with the programs grid from the CMS catalog. */
export const getGovernmentPageWithCatalog = cache(() => withCatalog(government, "government"));

/** Training for Universities (`/training-for-universities`) — local copy only
 * (metadata, schema). */
export function getUniversitiesPage() {
  return universities;
}

/** Training for Universities with the programs grid from the CMS catalog. */
export const getUniversitiesPageWithCatalog = cache(() => withCatalog(universities, "universities"));
