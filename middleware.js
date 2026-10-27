import { NextResponse } from "next/server";

/**
 * CMS Redirect Middleware
 *
 * Intercepts every page request before Next.js renders anything, hits the
 * same CMS endpoint the page renderer would use, and — if the CMS returns a
 * 3xx — issues a 301 redirect via NextResponse.redirect().
 *
 * The CMS signals a retired slug by responding with:
 *   HTTP 301 Moved Permanently
 *   Location: /api/v2/site-pages/destination-slug
 *
 * WHY MIDDLEWARE (not Server Components):
 *   permanentRedirect() inside a Server Component is caught by the nearest
 *   Suspense boundary before Next.js converts it to a 3xx, so the page
 *   renders 200. Middleware runs before React, so NextResponse.redirect()
 *   always fires correctly.
 *
 * WHY redirect:"follow" (not "manual"):
 *   Edge runtime (the default middleware runtime, used by both Vercel and
 *   self-hosted Next.js) returns an opaque response (type="opaqueredirect",
 *   status=0) for redirect:"manual" fetches — the status code and Location
 *   header are both unreadable. Using redirect:"follow" (the default) lets
 *   the fetch resolve the redirect normally; response.redirected tells us it
 *   happened, and response.url gives the final CMS URL, which we reverse-map
 *   back to the site path. All CMS slug redirects are permanent, so we always
 *   emit 301 — correct for SEO (passes link equity to the new URL).
 *
 * Cannot import lib/api/client.js or lib/api/endpoints.js — both carry
 * `import "server-only"`, incompatible with the middleware runtime.
 */

// NEXT_PUBLIC_* variables are inlined at build time and available in the edge
// runtime on all hosts (Vercel and self-hosted). Plain CMS_API_URL is
// server-only and is not inlined into the middleware bundle, so it always
// falls back to localhost. NEXT_PUBLIC_CMS_API_URL must be set to the same
// value as CMS_API_URL in the build environment. lib/api/client.js continues
// to use CMS_API_URL — this variable is only read here.
const CMS_BASE = process.env.NEXT_PUBLIC_CMS_API_URL ?? "http://localhost:8000";

/**
 * Maps an incoming pathname to the CMS API URL that owns that slug.
 * Mirrors lib/api/endpoints.js so the middleware hits the same endpoint
 * the page renderer would use.
 */
function getCmsUrl(pathname) {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug) return null;

  if (slug.startsWith("blog/author/")) {
    return `${CMS_BASE}/api/v2/blog/authors/${encodeURIComponent(slug.slice("blog/author/".length))}`;
  }
  if (slug.startsWith("blog/category/")) {
    return `${CMS_BASE}/api/v2/blog/categories/${encodeURIComponent(slug.slice("blog/category/".length))}`;
  }
  if (slug.startsWith("blog/")) {
    return `${CMS_BASE}/api/v2/blog/${encodeURIComponent(slug.slice("blog/".length))}`;
  }
  if (slug.startsWith("trainer/")) {
    return `${CMS_BASE}/api/v2/trainer/${encodeURIComponent(slug.slice("trainer/".length))}`;
  }

  // Corporate training is NOT a site page — probe the real endpoints so
  // retired domain/course slugs are caught by the redirect mechanism.
  // - /corporate-training/{domain}         → /api/v2/domains/{domain}
  // - /corporate-training/{domain}/{course} → /api/v2/pages/{domain}/{course}
  // The listing page itself has no redirect target, so skip it.
  if (slug === "corporate-training") return null;
  if (slug.startsWith("corporate-training/")) {
    const rest = slug.slice("corporate-training/".length);
    const parts = rest.split("/");
    if (parts.length === 1) {
      return `${CMS_BASE}/api/v2/domains/${encodeURIComponent(parts[0])}`;
    }
    if (parts.length === 2) {
      return `${CMS_BASE}/api/v2/pages/${encodeURIComponent(parts[0])}/${encodeURIComponent(parts[1])}`;
    }
    return null; // 4+ segments don't exist
  }

  // The blog index is a listing, not a redirectable slug (individual posts are
  // caught by the `blog/` branch above); skip its always-404 site-pages probe.
  if (slug === "blog") return null;

  // Consulting pillars, resources, and all other flat/nested site pages —
  // preserving nested path segments.
  return `${CMS_BASE}/api/v2/site-pages/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

/**
 * Reverse-maps a final CMS API URL (after following redirects) back to the
 * site pathname. The CMS Location header is an absolute or root-relative API
 * URL; stripping the API prefix gives the site slug.
 * Returns null if the URL is not a recognised CMS API path.
 */
function sitePathFromCmsUrl(finalUrl) {
  let path;
  try {
    path = new URL(finalUrl).pathname;
  } catch {
    return null;
  }

  if (path.startsWith("/api/v2/blog/authors/")) {
    return `/blog/author/${path.slice("/api/v2/blog/authors/".length)}`;
  }
  if (path.startsWith("/api/v2/blog/categories/")) {
    return `/blog/category/${path.slice("/api/v2/blog/categories/".length)}`;
  }
  if (path.startsWith("/api/v2/blog/")) {
    return `/blog/${path.slice("/api/v2/blog/".length)}`;
  }
  if (path.startsWith("/api/v2/trainer/")) {
    return `/trainer/${path.slice("/api/v2/trainer/".length)}`;
  }
  if (path.startsWith("/api/v2/domains/")) {
    return `/corporate-training/${path.slice("/api/v2/domains/".length)}`;
  }
  if (path.startsWith("/api/v2/pages/")) {
    return `/corporate-training/${path.slice("/api/v2/pages/".length)}`;
  }
  if (path.startsWith("/api/v2/site-pages/")) {
    return `/${path.slice("/api/v2/site-pages/".length)}`;
  }
  return null;
}

/** Blog listings whose pagination swaps posts in place on the client
 * (components/sections/blog/common/blog-posts.jsx), so their URL never
 * carries a page number. */
const BLOG_LISTING = /^\/blog(\/(author|category)\/[^/]+)?\/?$/;

/** Adds X-Robots-Tag: noindex to the response on non-production deployments so
 * Vercel preview URLs are never indexed even if robots.txt is bypassed. */
function withNoindexOnPreview(response) {
  if (process.env.VERCEL_ENV !== "production") {
    response.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return response;
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // A stray `?page=` on a blog listing (an old link, a stale bookmark) goes
  // back to the canonical URL. Done here, not in the page, because reading
  // `searchParams` in a page makes it render on every request instead of ISR.
  if (BLOG_LISTING.test(pathname) && request.nextUrl.searchParams.has("page")) {
    const clean = request.nextUrl.clone();
    clean.searchParams.delete("page");
    return withNoindexOnPreview(NextResponse.redirect(clean));
  }

  // Skip Next.js internals, static assets, and API routes.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    /\.(ico|png|jpg|jpeg|svg|webp|avif|gif|css|js|woff2?|ttf|otf|map)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cmsUrl = getCmsUrl(pathname);
  if (!cmsUrl) return withNoindexOnPreview(NextResponse.next());

  try {
    // Default redirect:"follow" works in both edge and Node.js runtimes.
    // redirect:"manual" returns an opaque response (status=0) in edge runtime,
    // making it impossible to read the status or Location header.
    const res = await fetch(cmsUrl, {
      headers: { Accept: "application/json" },
    });

    // 410 Gone — rewrite to the branded /gone page while preserving the 410
    // status so crawlers de-index the URL. 410 is not a redirect so it is
    // never followed; we read it directly from the response.
    if (res.status === 410) {
      return withNoindexOnPreview(
        NextResponse.rewrite(new URL("/gone", request.url), { status: 410 })
      );
    }

    // No redirect was followed — 200 or 404, pass through to the page renderer.
    // Next.js edge runtime never sets res.redirected even when a redirect was
    // followed; compare the final URL against the requested one instead.
    const followed = new URL(res.url).href !== new URL(cmsUrl).href;
    if (!followed) {
      return withNoindexOnPreview(NextResponse.next());
    }

    // A redirect was followed. res.url is the final CMS URL after all hops;
    // reverse-map it to the site path and issue a permanent 301.
    const sitePath = sitePathFromCmsUrl(res.url);
    if (!sitePath) return withNoindexOnPreview(NextResponse.next());

    const dest = new URL(sitePath, request.url);
    dest.search = search; // preserve query string
    return withNoindexOnPreview(NextResponse.redirect(dest, { status: 301 }));
  } catch {
    // CMS unreachable — fail open, pass through to the page renderer.
    return withNoindexOnPreview(NextResponse.next());
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
