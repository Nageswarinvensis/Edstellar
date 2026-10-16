import { NextResponse } from "next/server";

/**
 * CMS Redirect Middleware
 *
 * Calls a dedicated CMS redirect-lookup endpoint that returns JSON —
 * no redirect:'manual' needed, so this runs safely on the Edge runtime
 * (the only runtime available on Next.js 15 stable without experimental flags).
 *
 * Expected response from the backend:
 *   { "status": 301, "location": "/destination-slug" }  ← redirect
 *   404 or { "location": null }                         ← no redirect, pass through
 *
 * Cannot import lib/api/client.js or lib/api/endpoints.js — both carry
 * `import "server-only"`, incompatible with middleware.
 */

const CMS_BASE = process.env.CMS_API_URL ?? "http://localhost:8000";

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

  // Strip leading slash → bare slug the CMS understands.
  const slug = pathname.replace(/^\/+/, "");
  if (!slug) return NextResponse.next();

  try {
    const res = await fetch(
      `${CMS_BASE}/api/v2/redirects?path=${encodeURIComponent(pathname)}`,
      { headers: { Accept: "application/json" } },
    );

    // 404 or any non-OK response means no redirect rule exists — pass through.
    if (!res.ok) return NextResponse.next();

    const data = await res.json();

    // No destination → no redirect.
    if (!data?.location) return NextResponse.next();

    // 410 Gone — rewrite to the /gone page so the user sees a branded error,
    // while { status: 410 } ensures crawlers receive the correct HTTP status
    // and de-index the URL.
    if (data.status === 410) {
      return NextResponse.rewrite(new URL("/gone", request.url), { status: 410 });
    }

    const destPath = data.location.startsWith("/") || data.location.startsWith("http")
      ? data.location
      : `/${data.location}`;

    const dest = new URL(destPath, request.url);
    dest.search = search;

    return NextResponse.redirect(dest, { status: data.status ?? 301 });
  } catch {
    // CMS unreachable — fail open.
    return NextResponse.next();
  }
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml).*)",
  ],
};
