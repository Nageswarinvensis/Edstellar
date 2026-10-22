import "server-only";

import { getTrainingDomains } from "@/lib/content/training-catalog";
import { getBlogMain } from "@/lib/content/blog";
import { MEGA_NAV } from "@/lib/nav-data";

/** Courses shown before "and N more" — the rest are counted, not listed. */
const COURSE_LIMIT = 24;

/** Strip a plural "s" so "skill" finds "skills" and the reverse. */
const stem = (word) => (word.length > 3 && word.endsWith("s") ? word.slice(0, -1) : word);

/** Lower-case words of the query, ignoring 1-letter noise. */
function tokensOf(query) {
  return query
    .toLowerCase()
    .split(/[^a-z0-9&+#.]+/)
    .filter((word) => word.length > 1)
    .map(stem);
}

/**
 * How well `text` matches every token: 0 = not a match; higher = better
 * (the whole query at the start beats it anywhere, which beats scattered words).
 */
function score(text, query, tokens) {
  const haystack = text.toLowerCase();
  if (!tokens.every((token) => haystack.includes(token))) return 0;
  const phrase = query.toLowerCase();
  if (haystack.startsWith(phrase)) return 3;
  if (haystack.includes(phrase)) return 2;
  return 1;
}

const byScore = (a, b) => b.score - a.score || a.label.localeCompare(b.label);

/** An item's own URL slug as words — the last path segment with hyphens as
 * spaces. Lets a slug-style query ("intercultural-communication-course") match,
 * even though no course *title* contains filler like "course" that every slug
 * carries. Matched in addition to the title, so title results are unchanged. */
function slugWords(href) {
  if (!href) return "";
  return (href.split("/").filter(Boolean).pop() ?? "").replace(/-+/g, " ");
}

/** Titles that match the query first, then the rest in the CMS's order. */
function rankPosts(posts, query, tokens) {
  return posts
    .map((post, index) => ({ ...post, strong: score(post.label, query, tokens) > 0, index }))
    .sort((a, b) => Number(b.strong) - Number(a.strong) || a.index - b.index);
}

/** Site pages from the main menu — everything but the training catalog,
 * which is searched from the live CMS list instead. One entry per link. */
function menuPages() {
  const seen = new Map();
  for (const section of MEGA_NAV) {
    for (const group of section.groups) {
      for (const link of group.links) {
        if (!link.href || link.href.startsWith("/corporate-training/") || seen.has(link.href)) continue;
        seen.set(link.href, {
          label: link.label,
          href: link.href,
          section: section.tab,
          description: link.pv?.d ?? "",
        });
      }
    }
  }
  return [...seen.values()];
}

/**
 * Site search for `/search?q=…`. Domains and courses come from the live CMS
 * catalog (`getTrainingDomains`, the same list as the catalog page), blog
 * articles from the CMS blog search, and site pages from the main menu.
 * Matching is every-word, case-insensitive, on names (and page
 * descriptions); the CMS does the blog matching itself.
 */
export async function searchSite(rawQuery) {
  const query = (rawQuery ?? "").trim().slice(0, 100);
  const tokens = tokensOf(query);
  if (!tokens.length) return { query, total: 0, domains: [], courses: [], coursesTotal: 0, posts: [], postsTotal: 0, pages: [] };

  const [domains, blog] = await Promise.all([
    getTrainingDomains(),
    getBlogMain(1, query).catch(() => null),
  ]);

  const domainHits = domains
    .map((domain) => ({ label: domain.name, href: domain.href, count: domain.courses.length, score: score(`${domain.name} ${slugWords(domain.href)}`, query, tokens) }))
    .filter((hit) => hit.score)
    .sort(byScore);

  // A course matches on its own title, or — ranked below those — on the name
  // of its domain, so "soft skills" lists the Soft Skills courses too.
  const matchedDomains = new Set(domainHits.map((hit) => hit.href));
  const courseHits = domains
    .flatMap((domain) =>
      domain.courses.map((course) => {
        const own = score(`${course.label} ${slugWords(course.href)}`, query, tokens);
        return {
          label: course.label,
          href: course.href,
          domain: domain.name,
          score: own ? own + 1 : matchedDomains.has(domain.href) ? 0.5 : 0,
        };
      }),
    )
    .filter((hit) => hit.score)
    .sort(byScore);

  const pageHits = menuPages()
    .map((page) => ({
      ...page,
      score: Math.max(
        score(`${page.label} ${slugWords(page.href)}`, query, tokens) * 2,
        score(page.description, query, tokens),
      ),
    }))
    .filter((hit) => hit.score)
    .sort(byScore);

  const posts = rankPosts(
    (blog?.blogs?.data ?? []).map((post) => ({
      label: post.title,
      href: `/blog/${post.slug}`,
      category: post.category_name ?? "",
    })),
    query,
    tokens,
  );
  const postsTotal = blog?.blogs?.pagination?.total ?? posts.length;

  return {
    query,
    total: domainHits.length + courseHits.length + postsTotal + pageHits.length,
    domains: domainHits,
    courses: courseHits.slice(0, COURSE_LIMIT),
    coursesTotal: courseHits.length,
    posts,
    postsTotal,
    pages: pageHits,
  };
}
