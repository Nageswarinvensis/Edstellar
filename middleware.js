import { NextResponse } from "next/server";

// Node.js runtime is required so fetch with redirect:'manual' returns the real
// HTTP status code. Edge runtime returns an opaque response (status=0) for
// manual-redirect fetches, making it impossible to detect 3xx responses.
// This shows a build warning on Next.js 15 stable but works correctly —
// do NOT add experimental.nodeMiddleware to next.config (canary-only, causes
// a hard build error on stable).
export const runtime = "nodejs";

/**
 * CMS Redirect Middleware
 *
 * Intercepts every page request before Next.js renders anything, hits the
 * same CMS endpoint the page renderer would use, and — if the CMS returns a
 * 3xx — issues the correct HTTP redirect via NextResponse.redirect().
 *
 * The CMS signals a retired slug by responding with:
 *   HTTP 301 Moved Permanently
 *   Location: destination-slug          ← bare slug, no leading slash
 *   { "redirect": { … }, "components": […] }
 *
 * WHY MIDDLEWARE (not Server Components):
 *   permanentRedirect() inside a Server Component is caught by the nearest
 *   Suspense boundary before Next.js converts it to a 3xx, so the page
 *   renders 200. Middleware runs before React, so NextResponse.redirect()
 *   always fires correctly.
 *
 * Cannot import lib/api/client.js or lib/api/endpoints.js — both carry
 * `import "server-only"`, incompatible with the middleware runtime.
 */

const CMS_BASE = process.env.CMS_API_URL ?? "http://localhost:8000";

const REDIRECT_STATUSES = new Set([301, 302, 307, 308, 410]);

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

  // Corporate training, consulting pillars, resources, and all other site
  // pages — preserving nested path segments.
  return `${CMS_BASE}/api/v2/site-pages/${slug.split("/").map(encodeURIComponent).join("/")}`;
}

export async function middleware(request) {
  const { pathname, search } = request.nextUrl;

  // Skip Next.js internals, static assets, and API routes.
  if (
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/api/") ||
    /\.(ico|png|jpg|jpeg|svg|webp|avif|gif|css|js|woff2?|ttf|otf|map)$/.test(pathname)
  ) {
    return NextResponse.next();
  }

  const cmsUrl = getCmsUrl(pathname);
  if (!cmsUrl) return NextResponse.next();

  try {
    const res = await fetch(cmsUrl, {
      headers: { Accept: "application/json" },
      // Must not auto-follow — we need to read the 3xx status and Location
      // header ourselves. Requires Node.js runtime (see top of file).
      redirect: "manual",
    });

    if (!REDIRECT_STATUSES.has(res.status)) {
      // 200 or 404 — pass through to the page renderer unchanged.
      return NextResponse.next();
    }

    // 410 Gone — rewrite to the branded /gone page while preserving the 410
    // status so crawlers de-index the URL.
    if (res.status === 410) {
      return NextResponse.rewrite(new URL("/gone", request.url), { status: 410 });
    }

    // The CMS puts the destination in the Location header as a bare slug,
    // e.g. "software-development/net-architecture-design-patterns-course".
    const location = res.headers.get("location");
    if (!location) return NextResponse.next();

    const destPath =
      location.startsWith("/") || location.startsWith("http")
        ? location
        : `/${location}`;

    const dest = new URL(destPath, request.url);
    dest.search = search; // preserve query string
    return NextResponse.redirect(dest, { status: res.status });
  } catch {
    // CMS unreachable — fail open, pass through to the page renderer.
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
