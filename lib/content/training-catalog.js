import "server-only";

import { cache } from "react";

import { apiGet } from "@/lib/api/client";
import { endpoints, REVALIDATE } from "@/lib/api/endpoints";

/**
 * Training domains and their courses, from the CMS's `/api/v2/sitemap` —
 * the one list of every published domain and course. Shared by the
 * Corporate Training hub's domain list, the course catalog
 * (`/corporate-training-catalog`) and the HTML sitemap, so all three always
 * agree and only ever link to pages that exist.
 *
 * That endpoint sends slugs only. Domain names come from each domain's own
 * record; course labels, which have no title source short of one request
 * per course (2,000+), are built from the slug via `labelFromSlug`.
 */

/** Words a plain title-case would get wrong. */
const WORD_CASE = {
  ai: "AI", ml: "ML", mlops: "MLOps", llm: "LLM", llms: "LLMs", nlp: "NLP", iot: "IoT",
  api: "API", apis: "APIs", aws: "AWS", gcp: "GCP", sql: "SQL", nosql: "NoSQL", crm: "CRM",
  erp: "ERP", sap: "SAP", hr: "HR", hris: "HRIS", hrms: "HRMS", it: "IT", ui: "UI", ux: "UX",
  rpa: "RPA", gis: "GIS", esg: "ESG", grc: "GRC", hse: "HSE", devops: "DevOps",
  devsecops: "DevSecOps", finops: "FinOps", gitops: "GitOps", ci: "CI", cd: "CD", iso: "ISO",
  gdpr: "GDPR", pmp: "PMP", kpi: "KPI", kpis: "KPIs", okr: "OKR", okrs: "OKRs", b2b: "B2B",
  b2c: "B2C", saas: "SaaS", paas: "PaaS", iaas: "IaaS", cms: "CMS", seo: "SEO", ppc: "PPC",
  bi: "BI", etl: "ETL", ios: "iOS", macos: "macOS", javascript: "JavaScript",
  typescript: "TypeScript", php: "PHP", html: "HTML", css: "CSS", net: ".NET", "2d": "2D",
  "3d": "3D", "5g": "5G", ar: "AR", vr: "VR", xr: "XR", qa: "QA", cx: "CX", cxo: "CXO", cxos: "CXOs", ehs: "EHS",
  ot: "OT", ics: "ICS", scada: "SCADA", plc: "PLC", cad: "CAD", bim: "BIM", sre: "SRE",
  soc: "SOC", siem: "SIEM", iam: "IAM", vpn: "VPN", dei: "DEI", ld: "L&D", gst: "GST",
  ifrs: "IFRS", gaap: "GAAP", ipo: "IPO", rd: "R&D", csr: "CSR", ehr: "EHR",
  gmp: "GMP", fda: "FDA", haccp: "HACCP",
};
const MINOR_WORDS = new Set(["and", "or", "of", "for", "to", "in", "the", "with", "on", "a", "an", "at", "by", "vs"]);

/** `agile-leadership-for-it-teams` → "Agile Leadership for IT Teams". */
export function labelFromSlug(slug) {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word, index) => {
      if (WORD_CASE[word]) return WORD_CASE[word];
      if (index > 0 && MINOR_WORDS.has(word)) return word;
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/** A course slug's last segment as a link label, in the live sitemap's
 * "… Training" form: `agile-leadership-course` → "Agile Leadership Training". */
export function courseLabel(slug) {
  const label = labelFromSlug(slug.replace(/-course$/, ""));
  return /\btraining$/i.test(label) ? label : `${label} Training`;
}

/**
 * The raw `{ domains, courses, site_pages, blogs }` index. The dev CMS
 * sometimes answers 200 with an empty body, which `apiGet` reports as
 * `null`; that is retried once, then thrown. Throwing, rather than handing
 * back nothing, means a cached page keeps its last good version and a build
 * fails loudly, instead of a page being cached as a 404 or an empty list.
 */
export const getSitemapIndex = cache(async () => {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const index = await apiGet(endpoints.sitemap(), { revalidate: REVALIDATE.cms });
    if (index?.domains?.length) return index;
  }
  throw new Error("CMS sitemap API returned no domains (/api/v2/sitemap)");
});

/** One domain's display name from its own record; the slug if that fails. */
async function domainName(slug) {
  const payload = await apiGet(endpoints.domainPage(slug), {
    revalidate: REVALIDATE.cms,
  }).catch(() => null);
  return payload?.domain?.name || labelFromSlug(slug);
}

const byLabel = (a, b) => a.label.localeCompare(b.label, "en", { sensitivity: "base" });

/**
 * Every domain, A–Z by name, each with its courses A–Z:
 * `{ slug, name, href, courses: { slug, label, href }[] }[]`.
 */
export const getTrainingDomains = cache(async () => {
  const index = await getSitemapIndex();
  const slugs = (index.domains ?? []).map((item) => item.slug);
  const names = await Promise.all(slugs.map(domainName));

  const coursesOf = new Map(slugs.map((slug) => [slug, []]));
  for (const { slug } of index.courses ?? []) {
    const [domain, course] = slug.split("/");
    if (!domain || !course || !coursesOf.has(domain)) continue;
    coursesOf.get(domain).push({ slug: course, label: courseLabel(course), href: `/corporate-training/${slug}` });
  }

  return slugs
    .map((slug, index) => ({
      slug,
      name: names[index],
      href: `/corporate-training/${slug}`,
      courses: coursesOf.get(slug).sort(byLabel),
    }))
    .sort((a, b) => a.name.localeCompare(b.name, "en", { sensitivity: "base" }));
});
