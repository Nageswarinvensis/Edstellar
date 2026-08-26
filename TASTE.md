# TASTE — Technical Architecture, Standards, and Engineering Rules

> **Every new page, section, or feature MUST follow these rules.**
> Read this before writing any code. If a decision contradicts these rules, update this document first — then code.

**Project:** Edstellar marketing website
**Stack:** Next.js 15.2.8 (App Router) · JavaScript (no TypeScript) · Tailwind CSS v4 · shadcn/ui · react-hook-form

---

## 0. What This Application Is — And What It Is Not

This is a **public, content-driven marketing website**. Its job is to rank in search, load fast, and convert visitors into leads.

**Consequences that drive every rule below:**

| Because…                                       | Therefore…                                                                                     |
| ---------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Every page is public                           | There is no auth, no session, no user-specific data, no portals                                |
| Search rankings are the primary business asset | Every page must be **fully prerendered HTML**. Content must exist in the initial HTML response |
| Content changes without code deploys           | Dynamic routes use **ISR**, never fully dynamic rendering                                      |
| Conversion happens through forms               | Forms are the only genuinely interactive surface, and are isolated to client leaves            |

> **The single most important rule in this document:** never fetch page content in a Client Component with `useEffect`. That pattern — correct for an authenticated dashboard — renders an empty shell to search crawlers and destroys the SEO value of the page. Content is fetched on the server, at build or revalidation time.

---

## 1. Route Architecture

### 1.1 URL Contract

These URLs are the public contract. They are load-bearing for SEO — **never change or restructure an existing live URL without a `permanent: true` redirect** in `next.config.mjs`.

```
/                                                       Home
/corporate-training                                     Training hub
/corporate-training/{slug}                              Industry | Vendor | Domain
/corporate-training/{domain}/{course-slug}              Course — domain parents only
/learning-development-consulting                        Consulting pillar
/learning-development-consulting/{slug}                 Sub-service
/organizational-development-consulting                  Consulting pillar
/organizational-development-consulting/{slug}           Sub-service
/talent-assessment-services                             Consulting pillar
/talent-assessment-services/{slug}                      Sub-service
/coaching-services                                      Consulting pillar
/resources                                              Resources hub
/resources/articles          · /resources/articles/{slug}
/resources/case-studies      · /resources/case-studies/{slug}
/resources/templates         · /resources/templates/{slug}
/resources/tools             · /resources/tools/{slug}
/resources/brochures         · /resources/brochures/{slug}
/blog                        · /blog/{slug}
/blog/category/{slug}        · /blog/author/{slug}
/trainers                    · /trainers/{slug}
/about-us  /contact-us  /training-management-software  /skill-based-organization
/privacy-policy  /terms-and-conditions
/thank-you/{slug}  /enquiry-now                         No site shell
```

**Blog is not a resource type.** `/blog/{slug}` is the canonical URL for every post. `/resources` lists five types and never duplicates a post under a second URL.

### 1.2 The Single-Segment Taxonomy

`/corporate-training/{slug}` serves **three entity types with three different designs** — industry, vendor, and domain — from **one Next.js route**.

This is not a preference. Route groups add no URL segment, which also means they create no separate URL namespace, so two `[slug]` folders at the same depth is a build error:

```
app/(site)/corporate-training/(industry)/[slug]/page.js
app/(site)/corporate-training/(vendor)/[slug]/page.js
→ "You cannot have two parallel pages that resolve to the same path"
```

The type is therefore resolved **at build time by the content layer**, and the design is selected by picking a template. Two invariants make this safe:

- **Slugs are globally unique across all three types.** `getTrainingSlugs()` throws on a duplicate. A collision must fail the build, never silently shadow a live page.
- **A course belongs to exactly one domain, so it has exactly one URL.** Industry and vendor pages list courses and link to `/corporate-training/{domain}/{course-slug}`. There is no second path to a course, and therefore no duplicate content.

**A course under a non-domain parent is a 404.** `dynamicParams` stays `true`, so `/corporate-training/{industry}/{course-slug}` still reaches the server at runtime even though `generateStaticParams` only emits domain pairs. The guard is that the read takes both segments:

```jsx
const course = await getCourse(slug, courseSlug); // verifies course ∈ this domain
if (!course) notFound();
```

`getCourse(courseSlug)` — one argument — would render a real page under the wrong parent. Never write that signature.

### 1.3 Directory Layout

```
app/
├── layout.js                              fonts, metadataBase, <html>/<body> ONLY
├── sitemap.js  robots.js
├── not-found.js  error.js  global-error.js
│
├── (site)/                                LAYOUT BOUNDARY — the only site shell
│   ├── layout.js                          SiteHeader + <main> + SiteFooter
│   ├── page.js
│   │
│   ├── corporate-training/
│   │   ├── page.js
│   │   └── [slug]/
│   │       ├── page.js                    resolves industry | vendor | domain
│   │       └── [courseSlug]/page.js       domain parents only, else notFound()
│   │
│   ├── (consulting)/                      organization only — NO layout.js
│   │   ├── learning-development-consulting/{page.js, [slug]/page.js}
│   │   ├── organizational-development-consulting/{page.js, [slug]/page.js}
│   │   ├── talent-assessment-services/{page.js, [slug]/page.js}
│   │   └── coaching-services/page.js
│   │
│   ├── resources/                         one route per type, own design each
│   │   ├── page.js
│   │   ├── articles/{page.js, [slug]/page.js}
│   │   ├── case-studies/{page.js, [slug]/page.js}
│   │   ├── templates/{page.js, [slug]/page.js}
│   │   ├── tools/{page.js, [slug]/page.js}
│   │   └── brochures/{page.js, [slug]/page.js}
│   │
│   ├── blog/
│   │   ├── page.js
│   │   ├── [slug]/page.js
│   │   ├── category/[slug]/page.js
│   │   └── author/[slug]/page.js
│   │
│   ├── trainers/{page.js, [slug]/page.js}
│   │
│   ├── (company)/                         organization only — NO layout.js
│   │   ├── about-us/page.js
│   │   ├── contact-us/page.js
│   │   ├── training-management-software/page.js
│   │   └── skill-based-organization/page.js
│   │
│   └── (legal)/                           add layout.js ONLY if these share a design
│       ├── privacy-policy/page.js
│       └── terms-and-conditions/page.js
│
├── (bare)/                                LAYOUT BOUNDARY — no nav, no footer
│   ├── layout.js
│   ├── thank-you/[slug]/page.js
│   └── enquiry-now/page.js
│
├── api/
│   └── leads/route.js
│
└── styles/
    └── blog-content/*.css                 CMS stylesheets, not a route folder
```

### 1.4 Route Groups: Two Kinds, One Rule

A route group does exactly two things: it removes its own name from the URL, and it *allows* a `layout.js` for that subtree. That gives two distinct uses which must not be confused.

| Kind | Contains `layout.js` | Cost | Use it |
| ---- | -------------------- | ---- | ------ |
| **Layout boundary** | Yes | Crossing it **unmounts and remounts** the shell | Only when the chrome genuinely differs |
| **Organization** | No | None whatsoever | Freely, when a level has too many siblings |

- **There are three layout boundaries at most: `(site)`, `(bare)`, and optionally `(legal)`.** Never one per section. Four groups each rendering the same header means four copies of one shell, and navigating between them remounts `SiteHeader` — resetting dropdown state, the scroll-progress bar, and the `header-visibility` store mid-navigation.
- **`(consulting)`, `(company)` and any future grouping contain no `layout.js`.** They exist to keep the file tree readable and have zero runtime effect. Adding a `layout.js` to one of them converts it into a boundary — do not do that casually.
- **Never create a second root layout.** `app/layout.js` stays the single root; sibling groups nest under it. Multiple roots turn every cross-group navigation into a full page load.

### 1.5 Rules

- **Consulting pillars are top-level URLs, so the root namespace is reserved.** Every pillar slug competes with `/blog`, `/trainers`, `/about-us`. Consequently: **never add a root-level `app/(site)/[slug]/`** — it would silently swallow every static page on the site.
- **Slugs are lowercase kebab-case.** No underscores, no uppercase. `trailingSlash` stays at its default of `false`.
- **Every page lives inside a layout boundary.** A `page.js` directly under `app/` renders with no shell and no `<main>` landmark.
- **A repeating page shape is a `[slug]` route, not another `page.js`.** Before hand-building a static page, check whether it is the same design as three others with different copy. If it is, it belongs behind `lib/content/` with one template. Twenty JSON entries are maintainable; twenty hand-edited page files are not.
- **Unknown slug → `notFound()`.** Always.

---

## 2. Rendering Strategy

### 2.1 Core Principle

**Everything is prerendered. Nothing important is fetched in the browser.**

Every page is either fully static (SSG) or statically generated with periodic revalidation (ISR). There is no legitimate reason for a page on this site to render dynamically per request.

### 2.2 Rendering Decision Table

| Page                                          | Content source | Rendering                   | `revalidate` |
| --------------------------------------------- | -------------- | --------------------------- | ------------ |
| Home                                          | Content layer  | ISR                         | `3600`       |
| `/corporate-training`                         | Content layer  | ISR                         | `3600`       |
| `/corporate-training/{slug}` (all three types) | Content layer  | **SSG — all** + ISR         | `3600`       |
| `/corporate-training/{domain}/{course}`       | CMS            | **SSG — top N** + ISR tail  | `3600`       |
| Consulting pillar pages                       | Hardcoded      | Pure SSG                    | —            |
| Consulting `/{slug}` sub-services             | Content layer  | **SSG + ISR**               | `3600`       |
| `/resources` hub + five type listings         | Content layer  | ISR                         | `3600`       |
| `/resources/{type}/{slug}`                    | Content layer  | **SSG + ISR**               | `3600`       |
| `/blog`, `/blog/{slug}`, category, author     | CMS            | **SSG + ISR**               | `300`        |
| `/trainers`, `/trainers/{slug}`               | Content layer  | **SSG + ISR**               | `3600`       |
| Company + legal pages                         | Hardcoded      | Pure SSG                    | —            |

### 2.3 Prerender Strategy at Scale

The catalog runs to a few thousand courses, so the build cannot prerender everything. The split is deliberate and lives in the content layer, never in a page:

```js
// lib/content/courses.js
export const getPrerenderedCoursePaths = cache(async () => { /* top N */ });
export const getAllCoursePaths         = cache(async () => { /* every course */ });
```

- **`generateStaticParams` calls `getPrerenderedCoursePaths`.** Taxonomy pages — every domain, industry and vendor — are few and cheap, so those are prerendered in full, always.
- **`sitemap.js` calls `getAllCoursePaths`.** These two sets are different on purpose and must never be collapsed into one function.
- **`dynamicParams` stays `true`** so the long tail renders on first request and is cached from then on.

> **The trap this avoids.** Catalog filtering and pagination are client-side (§2.5), so page 2 of a listing exists only as a query string on a static page — it gives crawlers no link path to the courses on it. The sitemap is therefore the *only* discovery route for the long tail. If the sitemap were built from the same "top N" list as the prerender, every course outside that cutoff would become uncrawlable — which, for a course catalog, means most of the inventory is invisible. Two functions, two purposes.

### 2.4 Rules

- **Every dynamic route exports `generateStaticParams`.**
- **Every ISR page exports `revalidate` explicitly.** Never rely on the default.
- **Never `export const dynamic = "force-dynamic"`.** If you think you need it, you have misunderstood the requirement.
- **Never call `cookies()`, `headers()`, or read the page's `searchParams`** in a page that should be static — each one opts the whole route into dynamic rendering and silently kills ISR.
- **Unknown slug → `notFound()`.** A 200 response saying "not found" is a soft 404 and will be penalised.
- **Never add a root-level `app/loading.js`.** It wraps every route in a Suspense boundary, so Next commits an HTTP **200** along with the loading shell before `notFound()` can set a 404 — turning every unknown slug on the site into a soft 404. This was measured, not theorised: with a root `loading.js` present, `/corporate-training/not-a-domain/some-course` returned `200` and a spinner; removing it returned `404`. On a site where every page is prerendered there is nothing to stream, so the file has no upside. A `loading.js` inside a specific segment that genuinely streams is fine.

### 2.5 Catalog Filtering and Pagination

Industry, vendor and domain pages all list courses with filters and pagination. That interactivity must not cost the page its static rendering.

- **The page is a Server Component and passes the full course list down as props.** It never reads `searchParams`.
- **The catalog is a client leaf reading `useSearchParams()`.** This is the entire reason the distinction exists: `useSearchParams` in a leaf keeps the route static, while `searchParams` on the page makes it dynamic.
- **The canonical URL is always the unfiltered one.** A filtered or paginated view must never self-canonicalise.

```
components/sections/catalog/
├── course-catalog.jsx      "use client" — filters, pagination, useSearchParams
├── catalog-filters.jsx     "use client"
└── course-card.jsx         Server — presentational
```

### 2.6 Canonical Page Pattern

Copy this shape for every dynamic content page. Note how little is in it: resolve, guard, emit structured data, hand off to a template.

```jsx
// app/(site)/corporate-training/[slug]/[courseSlug]/page.js
import { notFound } from "next/navigation";

import { getCourse, getPrerenderedCoursePaths } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";
import CoursePageTemplate from "@/components/templates/training/course-page";

export const revalidate = 3600;

export async function generateStaticParams() {
  // Top N only — the long tail renders on first request via ISR (§2.3).
  const paths = await getPrerenderedCoursePaths();
  return paths.map(({ domain, course }) => ({ slug: domain, courseSlug: course }));
}

export async function generateMetadata({ params }) {
  const { slug, courseSlug } = await params; // params is a Promise in Next 15
  const course = await getCourse(slug, courseSlug);
  if (!course) return {};

  return buildMetadata({
    title: course.seo.title,
    description: course.seo.description,
    path: `/corporate-training/${slug}/${courseSlug}`,
    image: course.seo.ogImage,
  });
}

export default async function CoursePage({ params }) {
  const { slug, courseSlug } = await params;

  // Both segments. A one-argument read would render this course under any
  // parent, including an industry or vendor slug (§1.2).
  const course = await getCourse(slug, courseSlug);

  if (!course) notFound(); // real 404, never a soft 404

  return (
    <>
      <JsonLd
        data={[
          courseJsonLd(course),
          breadcrumbJsonLd(course.breadcrumbs),
        ]}
      />
      <CoursePageTemplate data={course} />
    </>
  );
}
```

**Three things this shape gets right:**

- **`generateMetadata` and the body both call `getCourse`.** That is not a double fetch — the read is wrapped in `cache()` (§5.2), so it happens once per request.
- **The page holds no design.** Section order and theming live in the template (§6.3), which is what lets `/corporate-training/{slug}` serve three different designs from one route.
- **`notFound()` covers three distinct failures at once**: the course does not exist, the parent slug is not a domain, or the course belongs to a different domain. All three are 404s, and the two-argument read is what makes that true.

**Note the Next 15 breaking change:** `params` and `searchParams` are Promises. Always `await params`. Destructuring them synchronously is a bug that will not always fail loudly.

---

## 3. Server vs Client Components

### 3.1 Decision Rule

**Default to Server Component. Add `"use client"` only for browser APIs, event handlers, or React state.**

On this site, Server Components should be the overwhelming majority. If more than a handful of files carry `"use client"`, something has gone wrong.

### 3.2 Classification Table

| File                              | Type       | Reason                         |
| --------------------------------- | ---------- | ------------------------------ |
| `app/layout.js`                   | **Server** | Fonts + CSS only               |
| `(site)/layout.js`                | **Server** | Static header/footer shell     |
| All `page.js`                     | **Server** | Content must be in the HTML    |
| `components/sections/*`           | **Server** | Presentational content blocks  |
| `components/ui/Text` · `Box`      | **Server** | No interactivity               |
| `site-header.jsx`                 | **Client** | Mobile menu toggle, dropdowns  |
| `components/forms/*`              | **Client** | react-hook-form, user input    |
| Accordion / tabs / carousel usage | **Client** | shadcn interactive primitives  |
| Filter and pagination controls    | **Client** | `useSearchParams`, local state |
| Analytics / consent banner        | **Client** | Browser APIs                   |

### 3.3 Rules

- **Never put `"use client"` on a `page.js` or `layout.js`.** No exceptions on this site.
- **Push the boundary to the smallest leaf.** An FAQ section is a Server Component that renders a client `<Accordion>` — the section itself, and all its text content, stay on the server and in the HTML.
- **A Server Component may render a Client Component; the reverse is impossible.** Compose by passing rendered children down, not by importing server code into client files.
- **Never pass functions as props** across the server→client boundary. Props must be serialisable.
- **Content always arrives as props from a Server Component.** A Client Component must never fetch page content.
- **Importing a client component does not make the importer a client component.** Only the leaf needs the directive.

---

## 4. SEO — Non-Negotiable

This site's value is its search visibility. These rules are not optional polish.

### 4.1 Metadata

- **Every page exports `metadata` (static) or `generateMetadata` (dynamic).** A page with no metadata does not ship.
- **`metadataBase` is set once in the root layout** so all Open Graph and canonical URLs resolve absolute. Without it, OG images break in every scraper.
- **Every page declares its canonical URL** via `alternates.canonical`. Listing pages with filters must canonicalise to the unfiltered URL.
- **All metadata construction goes through `lib/seo/metadata.js`.** Do not hand-assemble metadata objects in page files — one helper guarantees every page gets title, description, canonical, OG, and Twitter tags consistently.
- Titles use the root layout's `%s | Edstellar` template. Keep the page portion under ~60 characters, descriptions under ~155.
- **`generateMetadata` and the page body may both fetch the same content.** This is correct and not a double fetch — wrap content-layer reads in `cache()` (Section 5) so the request is deduplicated.

### 4.2 Structured Data (JSON-LD)

Emit JSON-LD via the `<JsonLd>` component. One builder per content type in `lib/seo/json-ld.js`.

| Page                      | Schema types                                           |
| ------------------------- | ------------------------------------------------------ |
| Root layout               | `Organization`, `WebSite`                              |
| Course pages              | `Course` (+ `provider`, `hasCourseInstance`, `offers`) |
| Consulting pages          | `Service`                                              |
| Resource pages            | `CreativeWork` (or `HowTo` for tools)                  |
| Blog posts                | `BlogPosting` (+ `author`, `datePublished`)            |
| Every deep page           | `BreadcrumbList`                                       |
| Pages with an FAQ section | `FAQPage`                                              |

**Rule: structured data must describe what is actually visible on the page.** Marking up content the user cannot see is cloaking and risks manual action.

### 4.3 Crawl Infrastructure

- **`app/sitemap.js` is generated from the content layer**, never hand-maintained. A new course must appear in the sitemap automatically. Include `lastModified`.
- **`app/robots.js`** references the sitemap and disallows `/api/`.
- **One `<h1>` per page**, and it must be the real page heading. Use `<Text as="h1">`.
- **Every image has meaningful `alt` text.** Decorative images get `alt=""`.
- **Redirects for any changed URL** go in `next.config.mjs` with `permanent: true`.

---

## 5. Content & Data Layer

### 5.1 Structure

Content is split in two: **`content/` is what, `lib/content/` is how.**

```
content/                        Static page content. No reads, no cache(), no fetch.
├── domains/
│   ├── index.js                DOMAINS registry, keyed by slug
│   └── artificial-intelligence.js
├── courses/
│   ├── index.js                COURSES_BY_DOMAIN ownership + fallbacks
│   └── ml-model-monitoring.json
└── group-quote-catalog.js

lib/
├── api/                        The ONLY fetch in the codebase. See §5.3.
│   ├── client.js
│   └── endpoints.js
├── content/                    All content reads — every one wrapped in cache()
│   ├── taxonomy.js             resolveTrainingSlug · getTrainingSlugs · collision guard
│   ├── domains.js              getDomain · getDomainSlugs · getDomains
│   ├── industries.js           getIndustry · getIndustrySlugs
│   ├── vendors.js              getVendor · getVendorSlugs
│   ├── courses.js              getCourse(domain, slug) · getAllCoursePaths
│   │                           · getPrerenderedCoursePaths
│   ├── consulting.js           CONSULTING_PILLARS + sub-service reads
│   ├── resources.js            RESOURCE_TYPES + per-type reads
│   ├── blog.js                 posts, categories, authors
│   ├── trainers.js
│   └── shape/
│       └── deep-merge.js       Fallback-under-CMS overlay. See §5.5.
├── seo/                        metadata.js · json-ld.js
├── client/                     Browser-only stores (header-visibility)
├── constants.js  slug.js  utils.js
```

**Adding a domain is two edits:** a file in `content/domains/`, and one line in its `index.js`. No route, read, template or section changes.

**`taxonomy.js` is load-bearing.** It is the only module that knows what kind of thing a slug is, and it owns the collision guard: `getTrainingSlugs()` throws if one slug is claimed by two types. A collision must fail the build — silently shadowing a live page is a failure you would otherwise find in a traffic graph weeks later.

### 5.2 Rules

- **Pages never talk to a CMS, database, or external API directly.** They call `lib/content/*`. When the content source changes, exactly one directory changes and no page is touched.
- **Every content function is wrapped in React's `cache()`** so `generateMetadata` and the page body share one fetch per request.
- **Content functions return `null` for a missing record.** They do not throw and do not call `notFound()` — that is the page's decision.
- **Reads that scope a child to a parent take both segments.** `getCourse(domain, slug)`, never `getCourse(slug)`. A one-argument read is what lets a course render under the wrong parent (§1.2).
- **Secrets are server-only.** Any environment variable prefixed `NEXT_PUBLIC_` is embedded in the client bundle and is public. API keys, tokens and API base URLs never carry that prefix.

### 5.3 The API Boundary

**`lib/api/client.js` contains the only `fetch` in this codebase.** Every network call goes through `apiGet`; `lib/content/*` calls it and nothing else does.

```
lib/api/
├── client.js       apiGet() — the single fetch. `import "server-only"`.
└── endpoints.js    Every external URL, and the revalidation window for each.
```

- **`apiGet` requires an explicit `revalidate`** and throws without one, so caching can never be left to chance.
- **404 becomes `null`, everything else throws.** A missing record is the page's decision to turn into `notFound()`; a 500 is a broken integration and must not be silently rendered as an empty page.
- **Both modules carry `import "server-only"`.** This makes the boundary structural rather than aspirational: if a Client Component ever imports them, directly or through a chain, the build fails instead of leaking an API base URL into the browser bundle.
- **Nothing logs a response body.** Upstream payloads can carry lead data, so `ApiError` includes the URL with its query string stripped and never the body (§7.1).

### 5.4 Field Naming: the CMS Shape Is the Contract

**Components read the CMS's field names, unchanged.** `heading_parts` stays `heading_parts` from the API response all the way into the JSX. There is no translation table and no adapter layer.

```jsx
// The CMS sends `heading_parts`; the section reads `heading_parts`.
<RichHeading parts={hero.heading_parts} />
```

- **CMS component slugs are the view-model keys**, exactly as sent — including `Testimonials`, `WhyEds` and `mapsectionData`. The casing is inconsistent because the CMS's is; adopting it verbatim is what removes the mapping.
- **Local content files use the same names.** `content/courses/*.json` and `content/domains/*.js` are written in the CMS's casing so the fallback merge is a plain overlay with no conversion step.
- **Data fields are `snake_case`. Component props and variables stay `camelCase`.** The boundary is: anything that came from content is snake_case, anything that is code is camelCase.
- **Heading emphasis is `is_italic`, not `em`.** `RichHeading` reads `part.is_italic` because that is what the CMS sends. A literal `{ text, em: true }` anywhere in a component is a bug that renders without emphasis and fails silently.

**What this buys:** one convention end to end, no mapping to keep in sync, and a broken section traceable by grepping the CMS field name itself.

**What it costs, stated plainly:** renaming a field in the CMS now ripples out to every component that reads it, instead of being absorbed by one line in a map. That is the accepted trade — `grep -r field_name components/` finds every site before the rename.

### 5.5 The Fallback Merge

Not every section is modeled upstream yet, so `lib/content/courses.js` deep-merges per-course fallback content *underneath* the CMS response.

- **The CMS wins on every field it actually sends.** `undefined` and `null` count as "not supplied" and fall back, so a field the CMS has not filled in does not blank the page.
- **Arrays replace, they never merge element-wise.** A CMS `modules: [...]` is the complete list; splicing it against a stale fallback would interleave two different curricula.
- **The merge is deep**, so the fallback also fills gaps *inside* a CMS component — `hero.actions`, `hero.meta` and `pageToc.cta` are not modeled upstream but live in the same objects that are.
- **Delete a fallback key the moment the backend starts sending it.** A stale fallback that is never reached is invisible dead content.

---

## 6. Component Architecture

### 6.1 Structure

```
components/
├── ui/                 Design system primitives — shadcn + Text + Box. No business logic.
├── templates/          One file per page design. See §6.3.
├── sections/
│   ├── shared/         hero · client-logos · faq · trainers · testimonials · map
│   │                   cta-banner · sticky-footer · proof-bar · lead-band
│   ├── catalog/        course-catalog · catalog-filters · course-card
│   ├── course/         curriculum · certificate · audience · delivery-modes · outcomes
│   ├── domain/         why-now · capability · method · related-categories
│   ├── industry/  vendor/  consulting/  resources/
├── forms/              lead-form · group-quote · contact-form · newsletter-form
├── layout/             site-header · site-footer · mobile-nav
├── seo/                json-ld.jsx
└── shared/             breadcrumbs · reveal · rich-heading · read-more
```

**The one rule that keeps these folders honest: a section moves to `sections/shared/` the moment a second template imports it.** This is mechanical and not a judgement call. A section folder named after a page type must contain only sections used by *that* page type — otherwise the folder name is a lie and nobody can tell what is safe to change.

Templates own layout and order. Sections own presentation. `forms/` owns the interactive leaves.

### 6.2 Rules

- **Use `<Text>` instead of raw `h1`–`h5`, `p`, `span`.** Use `<Box>` instead of raw `div`.
- **Never edit files in `components/ui/`** except to add a genuinely new primitive. They are regenerated by the shadcn CLI and your changes will be overwritten. Compose or wrap instead.
- **No business logic and no data fetching in `components/ui/`.**
- **Sections are dumb and take props.** A section never fetches. This keeps them reusable across page types and trivially previewable.
- **One concern per file.** Data shaping, presentation, and interactivity do not share a file.
- **Sections must be composable in any order** — no section may depend on another being rendered above it.

---

### 6.3 The Template Layer

A **template** is the full body of one page design. It is the layer between a route and its sections, and it is where "industry pages look different from vendor pages" actually lives — because all three types share a single route (§1.2) and therefore cannot use separate `layout.js` files.

```
components/templates/
├── training/     domain-page · industry-page · vendor-page · course-page
├── consulting/   pillar-page · service-page
├── resources/    article-page · case-study-page · template-page · tool-page · brochure-page
├── blog/         post-page · listing-page · author-page
└── trainers/     directory-page · trainer-page
```

The route stays thin; the template owns the design:

```jsx
// app/(site)/corporate-training/[slug]/page.js
export default async function TrainingPage({ params }) {
  const { slug } = await params;
  const entry = await resolveTrainingSlug(slug); // { type, data } | null
  if (!entry) notFound();

  switch (entry.type) {
    case "domain":   return <DomainPage   data={entry.data} />;
    case "industry": return <IndustryPage data={entry.data} />;
    case "vendor":   return <VendorPage   data={entry.data} />;
  }
}
```

```jsx
// components/templates/training/industry-page.jsx
export default function IndustryPage({ data }) {
  return (
    <Box data-theme="industry">
      <Hero hero={data.hero} />
      <ProofBar proof={data.proof} />
      <CourseCatalog courses={data.courses} />
      <Faq faqs={data.faqs} />
      <LeadBand data={data.leadForm} />
    </Box>
  );
}
```

**Rules:**

1. **A template is a Server Component. No `"use client"`, ever.** A template is the entire page body — a directive here moves the whole page out of the HTML and destroys the page's SEO value.
2. **Exactly one data prop**, the record from `lib/content/`. Templates never fetch and never import from `lib/content/` themselves. Keys are the CMS's own component slugs, unchanged (§5.4).
3. **Composition only** — section order plus the theme wrapper. No layout markup of its own, no business logic.
4. **A template never imports another template.** Nesting recreates exactly the shadowing problem that page-type section folders caused.
5. **Two templates that differ only in section order is correct and expected.** Do not collapse them into one config-driven component: a readable file beats indirection you cannot grep.

> **Deferred, not forbidden.** The CMS already returns `page_components` as `{ component_slug, config }` pairs, so section order *could* be data-driven. Today the CMS owns content and the template owns order, which is the right default while each type has its own bespoke design. If marketing ever needs to reorder sections without a deploy, that is one new file — `lib/section-registry.js` mapping slug → component — and the API shape already supports it. Do not build it speculatively.

---

## 7. Forms & Lead Capture

Forms are the conversion path and the only real interactivity on the site.

### 7.1 Rules

- **All forms are Client Components** using **react-hook-form**. Uncontrolled inputs keep re-renders minimal.
- **A form lives in `components/forms/` and is rendered as a leaf** by a Server Component section. The page around it stays static.
- **Validate on both sides.** Client-side for UX, server-side in the route handler for integrity. Never trust the client.
- **Submit to `app/api/leads/route.js`** (or a Server Action). Return proper status codes — `422` for validation failures, `429` for rate limiting.
- **Every public form has spam protection** — honeypot field plus rate limiting by IP at minimum.
- **Never log personally identifiable information.** No email addresses or phone numbers in server logs or analytics events.
- **Always render success and error states.** A form that silently does nothing on failure loses the lead.
- Disable the submit button while submitting and give it an accessible busy state.

### 7.2 Phone Input

`react-phone-input-2` has three constraints that will bite you:

1. **It is client-only.** It must live inside a `"use client"` file.
2. **Its stylesheet must be imported in that client file** — `import "react-phone-input-2/lib/style.css"`. Importing it from a Server Component will not apply correctly.
3. **It does not register with react-hook-form directly.** Wrap it in RHF's `<Controller>`.

```jsx
"use client";

import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";

// …inside the form
<Controller
  name="phone"
  control={control}
  rules={{ required: "Phone number is required" }}
  render={({ field }) => (
    <PhoneInput
      country="in"
      value={field.value}
      onChange={(value) => field.onChange(value)}
      inputClass="!w-full !h-9 !text-sm"
      containerClass="!w-full"
    />
  )}
/>;
```

It ships its own CSS, so Tailwind overrides need `!` importance prefixes. Keep those overrides in the form component, never patch the vendor stylesheet.

> **Dependency note:** schema validation with zod requires `@hookform/resolvers`, which is **not currently installed**. `zod` itself is present only as a transitive dependency — if you import it directly, add it to `package.json` first. Until then, use react-hook-form's built-in `rules`.

---

## 8. Performance

Core Web Vitals are a ranking factor. Treat regressions as bugs.

**Budgets:** LCP < 2.5s · CLS < 0.1 · INP < 200ms · First Load JS < 150 kB per route.

### 8.1 Always

- **`next/image` for every image**, never a raw `<img>`. Always set `width`/`height` (or `fill` with a sized parent) to reserve space and prevent layout shift.
- **`priority` on the LCP image only** — typically the hero. Adding it to more images makes LCP worse, not better.
- **Set `sizes` on any responsive image.** Without it Next ships the largest variant to phones.
- **`next/font` only** — already wired for Inter and Geist Mono. Never add a CDN font `<link>`.
- **Lazy load heavy, below-the-fold components** with `next/dynamic` — charts (`recharts`), carousels, maps, video embeds.
- **Reserve space for anything that loads late** so nothing shifts.

### 8.2 Never

- Never fetch in `(site)/layout.js` — it blocks every page on the site.
- Never import a whole library for one function.
- Never add a `"use client"` directive to fix an error you have not diagnosed.
- Never ship third-party scripts without `next/script` and an appropriate `strategy` (`afterInteractive` or `lazyOnload`).
- Never let a tracking script block the main thread during page load.

---

## 9. Styling

- **Tailwind utility classes only.** No `style={{}}` props, no CSS modules, no styled-components.
- **`cn()` from `lib/utils.js` for all conditional or merged classes.**
- **Component variants use `class-variance-authority`**, following the shadcn pattern.
- **Colors come from the CSS variables in `app/globals.css`** — `bg-background`, `text-muted-foreground`, `border-border`. **Never hardcode a hex value in a component.** A hex code in JSX is a bug.
- **Mobile-first.** Write the base style for small screens, then layer `sm:` `md:` `lg:`.
- **Tailwind v4 is configured in CSS, not JS.** New design tokens go in the `@theme` block in `globals.css`. There is no `tailwind.config.js` and one should not be added.
- **Breakpoints are the designs' own**, not Tailwind's defaults: `sm` 621px, `md` 821px, `lg` 1141px, `xl` 1181px. The designs are authored desktop-first with max-width queries, so `max-sm:` / `max-md:` / `max-lg:` are used heavily and are correct here.
- **Fonts:** `font-display` (Sora) for headings, `font-serif` (Cormorant Garamond) for the italic accent phrase inside a heading, `font-body` (DM Sans) for copy, `font-mono` (DM Mono) for uppercase kickers and meta rows.
- **Accent text on light backgrounds is `text-olive`, never `text-lime`.** Lime on paper fails contrast; it is only legible on navy. `.block.dark` sections flip to lime.
- **`text-md` does not exist.** The scale is `text-sm`, `text-base`, `text-lg`.

### 9.1 The `<Text>` / tailwind-merge trap

In Tailwind v4 a `text-*` utility sets **both** font-size and line-height. `tailwind-merge` knows this, so a `text-*` passed via `className` supersedes the `leading-*` baked into the `Text` variant — and the line-height silently vanishes.

```jsx
// WRONG — kills the variant's leading-[1.05]
<Text as="h1" className="text-[clamp(30px,3.5vw,47px)]" />

// RIGHT — restate the line-height alongside the size
<Text as="h1" className="text-[clamp(27px,3.2vw,40px)] leading-[1.08]" />

// ALSO RIGHT — a variant-prefixed override does not conflict, so the base survives
<Text as="h1" className="max-lg:text-[clamp(32px,5vw,50px)]" />
```

Rule: **never pass a bare `text-*` size to a `Text` component without also passing `leading-*`.** If the size you want equals the variant's default, don't pass it at all.

---

### 9.2 Per-Page-Type Theming

Industry, vendor and domain pages each have their own visual treatment while sharing most of their sections. Forking a section per type is the wrong answer — the fix is semantic tokens scoped by the template's `data-theme`.

```css
/* app/globals.css — inside the plain @theme block */
@theme {
  --color-page-accent: var(--color-olive);
  --color-page-surface: var(--color-paper-warm);
}

[data-theme="industry"] { --color-page-accent: …; --color-page-surface: …; }
[data-theme="vendor"]   { --color-page-accent: …; --color-page-surface: …; }
```

Sections then use `bg-page-surface` and `text-page-accent`, and render correctly under all three designs with no changes. This is what makes a shared `sections/shared/hero.jsx` possible at all.

> **`@theme` vs `@theme inline` — this will bite you.** `globals.css` has both blocks. Utilities generated from the **plain `@theme`** block compile to `var(--color-*)`, so redefining `--color-page-accent` in a `[data-theme]` scope works. The **`@theme inline`** block inlines values past that indirection, so overriding one of its `--color-*` names silently does nothing — you would have to override the underlying variable it points at. **Put new themeable tokens in the plain `@theme` block only**, and leave the inline shadcn set alone.

**A hex value in JSX is a bug.** If a section needs a color the tokens do not cover, add the token — do not inline the hex. The existing `#F5F3EB` / `#07162C` literals scattered through `sections/` are the reason those sections cannot be reused across page types.

---

## 10. Accessibility

- Semantic landmarks on every page: one `<main>`, plus `<nav>`, `<header>`, `<footer>`.
- **Heading levels descend without skipping.** Never pick a heading level for its font size — that is what `className` is for.
- All interactive elements are keyboard reachable with a visible focus ring. Never `outline: none` without a replacement.
- Icon-only buttons carry an `aria-label`.
- Text meets WCAG AA contrast (4.5:1 body, 3:1 large).
- Form inputs have real `<label>` elements, and errors are linked via `aria-describedby` and announced.
- Respect `prefers-reduced-motion` for any non-trivial animation.

---

## 11. File Naming

| Type              | Convention               | Example                                                      |
| ----------------- | ------------------------ | ------------------------------------------------------------ |
| Route files       | Next.js reserved names   | `page.js`, `layout.js`, `loading.js`, `error.js`, `route.js` |
| Dynamic segments  | camelCase in brackets    | `[courseSlug]`, `[slug]`, `[category]`                       |
| Route groups      | parenthesised, lowercase | `(site)`, `(bare)`, `(consulting)`                           |
| Components        | `kebab-case.jsx`         | `components/sections/shared/hero.jsx`                        |
| Design primitives | `PascalCase.jsx`         | `components/ui/Text.jsx`, `components/ui/Box.jsx`            |
| Utilities         | `kebab-case.js`          | `lib/seo/metadata.js`                                        |
| Hooks             | `use-*.js`               | `hooks/use-media-query.js`                                   |
| Constants         | `SCREAMING_SNAKE_CASE`   | `RESOURCE_TYPES`, `COURSES_BY_DOMAIN`                        |
| **Content fields**| **`snake_case`**         | `heading_parts`, `sla_note`, `is_italic` — the CMS's own names (§5.4) |
| Props & variables | `camelCase`              | `deliveryModes={...}`, `const workload = …`                  |

| Templates         | `kebab-case.jsx`         | `components/templates/training/industry-page.jsx`             |

`Text.jsx` and `Box.jsx` are deliberately PascalCase because they are used as JSX elements and read as types, matching their component names. Every other component file is kebab-case. Do not "fix" this inconsistency in one direction only.

---

## 12. Checklist for Every New Page

Architecture

- [ ] Does the URL match the contract in §1.1? If it replaces a live URL, is a `permanent` redirect added?
- [ ] Is it inside `(site)/` so it gets the site shell and `<main>` landmark?
- [ ] Is `page.js` a Server Component with **no** `"use client"`?

Rendering

- [ ] Is `revalidate` exported explicitly?
- [ ] For a dynamic route, is `generateStaticParams` implemented?
- [ ] Does a missing record call `notFound()` rather than rendering a "not found" message?
- [ ] Have I avoided `cookies()`, `headers()`, and `searchParams` in the page?

SEO

- [ ] Does the page export `generateMetadata` (or `metadata`) with title, description, and canonical?
- [ ] Is the right JSON-LD emitted, including `BreadcrumbList`?
- [ ] Will this page appear in `sitemap.js` automatically?
- [ ] Exactly one `<h1>`, and do heading levels descend correctly?

Components & Data

- [ ] Is all content fetched on the server and passed down as props?
- [ ] Is `"use client"` only on interactive leaves?
- [ ] Do all content reads go through `lib/content/`?
- [ ] Am I using `<Text>` and `<Box>` instead of raw tags?
- [ ] Does the page hand off to a template rather than composing sections itself?
- [ ] Is every section it uses in the right folder — moved to `sections/shared/` if a second template now imports it?
- [ ] Are page-type colours coming from `data-theme` tokens rather than hex literals?

Performance & A11y

- [ ] `next/image` everywhere, with `priority` on the LCP image only and `sizes` on responsive ones?
- [ ] Are heavy below-the-fold components dynamically imported?
- [ ] Tailwind classes only, no hardcoded hex, no inline styles?
- [ ] Keyboard navigable with visible focus, labelled inputs, meaningful `alt` text?

---

## 13. Open Items

Each of these is a real decision or a known gap, not a placeholder.

### Blocking a launch

1. **No lead destination.** `app/api/leads/route.js` validates, rate-limits and honeypots correctly, but `deliverLead()` throws `LeadDestinationNotConfigured` — the CRM or transactional-email target is a business decision. It throws rather than silently succeeding, because a form that reports success while discarding the lead is worse than one that reports failure. **On a site whose sole business goal is conversion, this outranks everything else here.**
2. **Rate limiting is in-memory**, so it is correct for one instance and useless across several. Move to a shared store before running more than one.
3. **Forms still submit to nothing.** `components/forms/lead-form.jsx` calls `setSubmitted(values)` locally and never POSTs to `/api/leads`. Wiring it is small; it is listed separately from item 1 because both halves are needed.

### URL decisions, unresolved

4. **Trailing slashes.** The consulting URL examples were written with a trailing slash; `trailingSlash` is at its default `false`, so Next 308s to the non-slash form. If the live site serves trailing slashes today, this is a deliberate config decision plus a redirect audit.
5. **The `-services` rename was deliberately NOT done.** The routes still ship as `learning-development-consulting-services`, matching the live URLs, because renaming a ranking URL without a redirect plan is not a refactor. `talent-assessment-services` and `coaching-services` are in the same position.
6. **Consulting sub-services are assumed template-driven** — each pillar has a `[slug]` child sharing one template, matching what was already in the repo. If each sub-service is bespoke like the pillars, they become static folders.

### Content not yet modeled

7. **Industry and vendor content does not exist.** `lib/content/industries.js` and `vendors.js` return empty, so `/corporate-training/{slug}` resolves domains only. The taxonomy, route and template registry all handle three types already — adding one is a `content/` directory, a read, and one line in the route's `TEMPLATES` map.
8. **Resources, consulting sub-services and trainers return empty.** Their routes, metadata and reads exist; only content is missing.
9. **The prerender cutoff is undefined.** `getPrerenderedCoursePaths` currently returns the whole catalog. "Top N" needs a real rule — traffic, domain priority, or a CMS flag — before the catalog reaches a few thousand courses (§2.3).
10. **`content/courses/index.js` exists only because the CMS has no index endpoint.** When the backend grows a list route, that registry is what it replaces, and `lib/content/courses.js` is the only file that changes.

### Known upstream gaps

0. **`seo` copy is duplicated across courses in the CMS.** `phishing-awareness-training` returns ML Model Monitoring's `meta_title` and `Meta_description` verbatim, so two live pages share one title and description — a duplicate-metadata problem that dilutes both. Its `hero`, `breadcrumbs` and body content are correct; only the `seo` component was not updated. **This is a content fix in the CMS, not a code fix** — the route now falls back to `page.title` when `seo` is absent entirely, but no code can detect copy that is present and wrong.

11. **`Testimonials` and `SlideData` are the same content.** The CMS models it as `Testimonials`; the local fallback carries it as `SlideData`. The course template renders `Testimonials` only — rendering both would put the same quotes on the page twice. `sections/course/slide-section.jsx` is kept because it is the alternative visual treatment of that data, and which one ships is a design call. **Both were rendering nothing before this refactor**, so there is no regression either way.
12. **`about.inclusions.columns[]` has no `heading` from the CMS** where the local fallback did. The column headings render blank until the backend sends them.
13. **Four sections are built but unwired**: `sections/course/{outcomes,lifecycle,lifecycle-stages,why-now}.jsx` and `common/topic-pills.jsx`. They are kept, not deleted — they read like unfinished work rather than dead code. Wire them or remove them deliberately.

### Quality debt

14. **~100 hardcoded hex literals across `sections/`** (`#F5F3EB`, `#07162C`, `#64748B`, …) where tokens already exist. This is what currently blocks the `data-theme` approach in §9.2 and therefore blocks section reuse across page types.
15. **`components/ui/` carries 43 unused primitives** out of 63, plus unused dependencies (`recharts`, `radix-ui`, `cmdk`, `input-otp`, `react-day-picker`, `react-resizable-panels`) and `typescript` in devDependencies on a JavaScript-only project.
16. **Forms are not split into a server section plus a client leaf** as §7.1 requires. `lead-form.jsx` (297 lines) and `group-quote.jsx` (1,103 lines) are wholly client components, so their copy ships in the JS bundle as well as the HTML. This is a bundle-size cost, not an SEO one — client components are still server-rendered — which is why it is listed here and not above.
17. **`@hookform/resolvers` is not installed**, so schema-based form validation is unavailable (§7.1).
18. **Next.js 15.2.8 carries known high-severity advisories** (SSRF, cache poisoning, XSS, middleware bypass). For a public internet-facing site this is a live risk. Upgrade within 15.x unless the pin is contractually required.
19. **No real image or video assets.** `hero.media` is `null` on every record and `HeroMedia` renders a tonal placeholder. Trainer avatars fall back to initials. Real files must land in `/public`, with consent for the trainer portraits, before launch.
