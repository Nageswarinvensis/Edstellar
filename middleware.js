import { NextResponse } from "next/server";

// Edge Runtime returns opaque redirect (status=0) for redirect:'manual' fetches.
// Node.js runtime returns the real HTTP status — required for CMS redirect detection.
export const runtime = "nodejs";

/**
 * CMS Redirect Middleware
 *
 * Intercepts page requests BEFORE Next.js renders anything, queries the CMS
 * for the incoming slug using the same endpoint the page renderer would use,
 * and issues the correct HTTP redirect using NextResponse.redirect() —
 * which is immune to React Suspense boundaries.
 *
 * WHY MIDDLEWARE (not Server Components):
 *   permanentRedirect() thrown inside a Server Component is caught by the
 *   nearest Suspense boundary before Next.js can convert it to a 3xx
 *   response, so the page renders as 200 instead. Middleware runs before
 *   React rendering, so NextResponse.redirect() always fires correctly.
 *
 * WHY NO REDIRECT LOOPS:
 *   We never manipulate trailing slashes — that is Next.js's job
 *   (trailingSlash defaults to false in this project). Middleware only fires
 *   when the CMS returns a 3xx/410. Normal 200/404 responses pass straight
 *   through via NextResponse.next().
 *
 * Cannot import lib/api/client.js or lib/api/endpoints.js because both carry
 * `import "server-only"`, which is intentionally incompatible with middleware.
 * The CMS base URL is read from the same env var but inline here.
 */

const CMS_BASE =
  process.env.CMS_API_URL ?? "http://localhost:8000";

const REDIRECT_STATUSES = new Set([301, 302, 307, 308, 410]);

/**
 * Maps an incoming pathname to the CMS API URL that owns that slug.
 * Mirrors the logic in lib/api/endpoints.js so the middleware hits the
 * same endpoint the page renderer would.
 *
 * Returns null for paths that have no CMS backing (home root, etc.).
 */
function getCmsUrl(pathname) {
  // Strip leading and trailing slashes → bare slug.
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug) return null;

  // Blog author profile.
  if (slug.startsWith("blog/author/")) {
    const rest = slug.slice("blog/author/".length);
    return `${CMS_BASE}/api/v2/blog/authors/${encodeURIComponent(rest)}`;
  }

  // Blog category listing.
  if (slug.startsWith("blog/category/")) {
    const rest = slug.slice("blog/category/".length);
    return `${CMS_BASE}/api/v2/blog/categories/${encodeURIComponent(rest)}`;
  }

  // Individual blog post.
  if (slug.startsWith("blog/")) {
    const rest = slug.slice("blog/".length);
    return `${CMS_BASE}/api/v2/blog/${encodeURIComponent(rest)}`;
  }

  // Trainer profile.
  if (slug.startsWith("trainer/")) {
    const rest = slug.slice("trainer/".length);
    return `${CMS_BASE}/api/v2/trainer/${encodeURIComponent(rest)}`;
  }

  // Everything else (corporate-training pages, consulting pillars, resources,
  // top-level site pages) → site-pages, preserving nested path segments.
  return `${CMS_BASE}/api/v2/site-pages/${slug
    .split("/")
    .map(encodeURIComponent)
    .join("/")}`;
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Skip Next.js internals, static assets, and API routes — they never have
  // CMS redirect rules and calling the CMS for them wastes time.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    /\.(ico|png|jpg|jpeg|svg|webp|avif|gif|css|js|woff2?|ttf|otf|map)$/.test(
      pathname,
    )
  ) {
    return NextResponse.next();
  }

  const cmsUrl = getCmsUrl(pathname);
  if (!cmsUrl) return NextResponse.next();

  try {
    const res = await fetch(cmsUrl, {
      headers: { Accept: "application/json" },
      // Must not auto-follow: we need to read the 3xx status ourselves.
      redirect: "manual",
    });

    if (!REDIRECT_STATUSES.has(res.status)) {
      // Normal 200 or 404 — pass through to the page renderer unchanged.
      return NextResponse.next();
    }

    // 410 Gone — permanently removed. Return bare 410 so crawlers de-index it.
    if (res.status === 410) {
      return new NextResponse(null, { status: 410 });
    }

    // The CMS puts the destination in the Location header as a bare slug
    // (e.g. "software-development/net-architecture-design-patterns-course"),
    // not a full URL. Prepend "/" to turn it into an absolute path.
    const location = res.headers.get("location");
    if (!location) {
      // 3xx with no Location — nothing we can do, pass through.
      return NextResponse.next();
    }

    const destPath =
      location.startsWith("/") || location.startsWith("http")
        ? location
        : `/${location}`;

    const dest = new URL(destPath, request.url);
    // Preserve any query string from the original request.
    dest.search = search;

    return NextResponse.redirect(dest, { status: res.status });
  } catch {
    // CMS unreachable — fail open: pass through to the page renderer.
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths EXCEPT:
     *   _next/static  — built JS/CSS assets
     *   _next/image   — image optimisation endpoint
     *   favicon.ico, robots.txt, sitemap.xml
     */
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
