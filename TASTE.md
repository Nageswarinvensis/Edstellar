# TASTE — Technical Architecture, Standards, and Engineering Rules

> **Every new page, section, or feature MUST follow these rules.**
> Read this before writing any code. If a decision contradicts these rules, update this document first — then code.

**Project:** Edstellar marketing website
**Stack:** Next.js 15.2.8 (App Router) · JavaScript (no TypeScript) · Tailwind CSS v4 · shadcn/ui · react-hook-form

---

## 0. What This Application Is — And What It Is Not

This is a **public, content-driven marketing website**. Its job is to rank in search, load fast, and convert visitors into leads.

**Consequences that drive every rule below:**

| Because… | Therefore… |
|---|---|
| Every page is public | There is no auth, no session, no user-specific data, no portals |
| Search rankings are the primary business asset | Every page must be **fully prerendered HTML**. Content must exist in the initial HTML response |
| Content changes without code deploys | Dynamic routes use **ISR**, never fully dynamic rendering |
| Conversion happens through forms | Forms are the only genuinely interactive surface, and are isolated to client leaves |

> **The single most important rule in this document:** never fetch page content in a Client Component with `useEffect`. That pattern — correct for an authenticated dashboard — renders an empty shell to search crawlers and destroys the SEO value of the page. Content is fetched on the server, at build or revalidation time.

---

## 1. Route Architecture

### 1.1 URL Contract

These URLs are the public contract. They are load-bearing for SEO — **never change or restructure an existing live URL without a `permanent: true` redirect** in `next.config.mjs`.

```
/                                              Home
/consulting                                    Consulting index
/consulting/{slug}                             Consulting service page
/corporate-training                            Training index
/corporate-training/{category}                 Category page (e.g. artificial-intelligence)
/corporate-training/{category}/{course-slug}   Course page within that category
/resources                                     Resources hub
/resources/{category}                          Category listing (tools, templates, …)
/resources/{category}/{slug}                   Individual resource
/blog                                          Blog index          (phase 2)
/blog/{slug}                                   Blog post           (phase 2)
```

### 1.2 Directory Layout

```
app/
├── layout.js                  Root: fonts, globals.css, metadataBase, <html>/<body> ONLY
├── not-found.js               Global 404
├── error.js                   Segment error boundary
├── global-error.js            Root error boundary
├── loading.js                 Root streaming fallback
├── sitemap.js                 Generated from the content layer
├── robots.js                  Crawl directives
├── (marketing)/               Route group — shared header/footer shell, adds NO URL segment
│   ├── layout.js              SiteHeader + SiteFooter
│   ├── page.js                /
│   ├── consulting/
│   │   ├── page.js
│   │   └── [slug]/
│   │       ├── page.js
│   │       └── loading.js
│   ├── corporate-training/
│   │   ├── page.js
│   │   └── [category]/
│   │       ├── page.js
│   │       └── [slug]/page.js
│   ├── resources/
│   │   ├── page.js
│   │   └── [category]/
│   │       ├── page.js
│   │       └── [slug]/page.js
│   └── blog/                  Phase 2
│       ├── page.js
│       └── [slug]/page.js
└── api/                       Form submission endpoints only
    └── leads/route.js
```

### 1.3 Rules

- **One route group, `(marketing)`.** Parentheses mean it adds no URL segment. It exists so the header/footer shell lives in exactly one place. Add a second group only when a page needs a genuinely different shell (e.g. a bare landing page with no nav).
- **`corporate-training/[category]` is dynamic**, backed by `lib/content/category.js`. A category page (e.g. `/corporate-training/artificial-intelligence`) lists that category's courses; `[category]/[slug]` is an individual course page within it, backed by `lib/content/courses.js`. Unknown category or slug → `notFound()`.
- **`resources/[category]` is dynamic with a whitelist.** The five categories share one page template. Validate against the whitelist in `lib/content/resources.js` and call `notFound()` on anything else. If a category's template genuinely diverges, promote it to its own static folder — do not add conditional branches to the shared template.
- **Slugs are lowercase kebab-case.** No underscores, no uppercase, no trailing slash. `trailingSlash` stays at its default of `false`.
- **Never place a page file outside a route group** unless it intentionally renders without the site shell.

---

## 2. Rendering Strategy

### 2.1 Core Principle

**Everything is prerendered. Nothing important is fetched in the browser.**

Every page is either fully static (SSG) or statically generated with periodic revalidation (ISR). There is no legitimate reason for a page on this site to render dynamically per request.

### 2.2 Rendering Decision Table

| Page | Content source | Rendering | `revalidate` |
|---|---|---|---|
| Home | Editorial, changes often | ISR | `3600` |
| `/consulting` index | Content layer | ISR | `3600` |
| `/consulting/{slug}` | Content layer | **SSG + ISR** via `generateStaticParams` | `3600` |
| `/corporate-training` index | Content layer | ISR | `3600` |
| `/corporate-training/{category}` | Content layer | **SSG + ISR** via `generateStaticParams` | `3600` |
| `/corporate-training/{category}/{course-slug}` | Content layer | **SSG + ISR** via `generateStaticParams` | `3600` |
| `/resources` hub | Content layer | ISR | `3600` |
| `/resources/{category}` | Content layer | **SSG + ISR** | `3600` |
| `/resources/{category}/{slug}` | Content layer | **SSG + ISR** | `3600` |
| `/blog` index | CMS | ISR | `300` |
| `/blog/{slug}` | CMS | **SSG + ISR** | `300` |
| Legal / static copy | Hardcoded | Pure SSG | — |

### 2.3 Rules

- **Every dynamic route exports `generateStaticParams`.** Course and resource pages are the money pages; they must exist as static HTML at build time, not be generated on first visit.
- **Every ISR page exports `revalidate` explicitly.** Never leave it undefined and never rely on the default.
- **Never `export const dynamic = "force-dynamic"`.** If you think you need it, you have misunderstood the requirement.
- **Never call `cookies()`, `headers()`, or `searchParams` in a page that should be static** — each one opts the entire route into dynamic rendering and silently kills your ISR. If you need a query parameter (filters, pagination, search), read it in a **Client Component** with `useSearchParams()` so the page stays static.
- **`dynamicParams`:** leave at the default `true` so newly published content is served without a redeploy. Set to `false` only for a genuinely closed set.
- **Unknown slug → `notFound()`.** Always. Returning a page that says "not found" with a 200 status is a soft 404 and search engines will penalise it. `notFound()` returns a real HTTP 404.

### 2.4 Canonical Page Pattern

Copy this shape for every dynamic content page.

```jsx
// app/(marketing)/corporate-training/[category]/[slug]/page.js
import { notFound } from "next/navigation";

import { getCategoryCourse, getCategoryCourseSlugs } from "@/lib/content/courses";
import { buildMetadata } from "@/lib/seo/metadata";
import { courseJsonLd, breadcrumbJsonLd } from "@/lib/seo/json-ld";
import JsonLd from "@/components/seo/json-ld";
import CourseHero from "@/components/sections/course-hero";
import CourseOutline from "@/components/sections/course-outline";
import LeadForm from "@/components/forms/lead-form";

export const revalidate = 3600;

export async function generateStaticParams() {
  const slugs = await getCategoryCourseSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { category, slug } = await params;      // params is a Promise in Next 15
  const course = await getCategoryCourse(slug);
  if (!course) return {};

  return buildMetadata({
    title: course.metaTitle,
    description: course.metaDescription,
    path: `/corporate-training/${category}/${slug}`,
    image: course.ogImage,
  });
}

export default async function CoursePage({ params }) {
  const { slug } = await params;
  const course = await getCategoryCourse(slug);

  if (!course) notFound();                       // real 404, never a soft 404

  return (
    <>
      <JsonLd data={[courseJsonLd(course), breadcrumbJsonLd(course.breadcrumbs)]} />
      <CourseHero course={course} />
      <CourseOutline modules={course.modules} />
      <LeadForm courseSlug={slug} />             {/* the only client leaf */}
    </>
  );
}
```

**Note the Next 15 breaking change:** `params` and `searchParams` are Promises. Always `await params`. Destructuring them synchronously is a bug that will not always fail loudly.

---

## 3. Server vs Client Components

### 3.1 Decision Rule

**Default to Server Component. Add `"use client"` only for browser APIs, event handlers, or React state.**

On this site, Server Components should be the overwhelming majority. If more than a handful of files carry `"use client"`, something has gone wrong.

### 3.2 Classification Table

| File | Type | Reason |
|---|---|---|
| `app/layout.js` | **Server** | Fonts + CSS only |
| `(marketing)/layout.js` | **Server** | Static header/footer shell |
| All `page.js` | **Server** | Content must be in the HTML |
| `components/sections/*` | **Server** | Presentational content blocks |
| `components/ui/Text` · `Box` | **Server** | No interactivity |
| `site-header.jsx` | **Client** | Mobile menu toggle, dropdowns |
| `components/forms/*` | **Client** | react-hook-form, user input |
| Accordion / tabs / carousel usage | **Client** | shadcn interactive primitives |
| Filter and pagination controls | **Client** | `useSearchParams`, local state |
| Analytics / consent banner | **Client** | Browser APIs |

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

| Page | Schema types |
|---|---|
| Root layout | `Organization`, `WebSite` |
| Course pages | `Course` (+ `provider`, `hasCourseInstance`, `offers`) |
| Consulting pages | `Service` |
| Resource pages | `CreativeWork` (or `HowTo` for tools) |
| Blog posts | `BlogPosting` (+ `author`, `datePublished`) |
| Every deep page | `BreadcrumbList` |
| Pages with an FAQ section | `FAQPage` |

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

```
lib/
├── content/            All content reads — the ONLY place that knows the data source
│   ├── category.js     getCategory, getCategorySlugs
│   ├── courses.js      getCategoryCourse, getCategoryCourseSlugs, getCategoryCourses
│   ├── consulting.js
│   ├── resources.js    RESOURCE_CATEGORIES whitelist + reads
│   └── blog.js         Phase 2
├── seo/
│   ├── metadata.js     buildMetadata()
│   └── json-ld.js      Schema builders
├── constants.js        Site name, base URL, nav config, social links
└── utils.js            cn() — shadcn
```

### 5.2 Rules

- **Pages never talk to a CMS, database, or external API directly.** They call `lib/content/*`. When the content source changes, exactly one directory changes and no page is touched.
- **Every content function is wrapped in React's `cache()`** so `generateMetadata` and the page body share one fetch per request.
- **Content functions return `null` for a missing record.** They do not throw and do not call `notFound()` — that is the page's decision.
- **Return shaped view models, not raw CMS payloads.** Pages must not contain CMS field names like `acf.field_2847`.
- **Every `fetch` sets an explicit cache directive** (`{ next: { revalidate: 3600 } }`). Never leave caching to chance.
- **Secrets are server-only.** Any environment variable prefixed `NEXT_PUBLIC_` is embedded in the client bundle and is public. API keys and tokens never carry that prefix.

---

## 6. Component Architecture

### 6.1 Structure

```
components/
├── ui/                 Design system primitives — shadcn + Text + Box. No business logic.
├── sections/           Composable page sections (hero, feature-grid, faq, cta-band, testimonials)
├── layout/             site-header.jsx, site-footer.jsx, mobile-nav.jsx, breadcrumbs.jsx
├── forms/              lead-form.jsx, contact-form.jsx, newsletter-form.jsx
├── seo/                json-ld.jsx
└── shared/             Cross-page domain components (course-card, resource-card, pagination)
```

### 6.2 Rules

- **Use `<Text>` instead of raw `h1`–`h5`, `p`, `span`.** Use `<Box>` instead of raw `div`.
- **Never edit files in `components/ui/`** except to add a genuinely new primitive. They are regenerated by the shadcn CLI and your changes will be overwritten. Compose or wrap instead.
- **No business logic and no data fetching in `components/ui/`.**
- **Sections are dumb and take props.** A section never fetches. This keeps them reusable across page types and trivially previewable.
- **One concern per file.** Data shaping, presentation, and interactivity do not share a file.
- **Sections must be composable in any order** — no section may depend on another being rendered above it.

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
/>
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

- Never fetch in `(marketing)/layout.js` — it blocks every page on the site.
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

| Type | Convention | Example |
|---|---|---|
| Route files | Next.js reserved names | `page.js`, `layout.js`, `loading.js`, `error.js`, `route.js` |
| Dynamic segments | camelCase in brackets | `[courseSlug]`, `[slug]`, `[category]` |
| Route groups | parenthesised, lowercase | `(marketing)` |
| Components | `kebab-case.jsx` | `components/sections/course-hero.jsx` |
| Design primitives | `PascalCase.jsx` | `components/ui/Text.jsx`, `components/ui/Box.jsx` |
| Utilities | `kebab-case.js` | `lib/seo/metadata.js` |
| Hooks | `use-*.js` | `hooks/use-media-query.js` |
| Constants | `SCREAMING_SNAKE_CASE` | `RESOURCE_CATEGORIES` |

`Text.jsx` and `Box.jsx` are deliberately PascalCase because they are used as JSX elements and read as types, matching their component names. Every other component file is kebab-case. Do not "fix" this inconsistency in one direction only.

---

## 12. Checklist for Every New Page

Architecture
- [ ] Does the URL match the contract in §1.1? If it replaces a live URL, is a `permanent` redirect added?
- [ ] Is it inside `(marketing)/` so it gets the site shell?
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

Performance & A11y
- [ ] `next/image` everywhere, with `priority` on the LCP image only and `sizes` on responsive ones?
- [ ] Are heavy below-the-fold components dynamically imported?
- [ ] Tailwind classes only, no hardcoded hex, no inline styles?
- [ ] Keyboard navigable with visible focus, labelled inputs, meaningful `alt` text?

---

## 13. Open Items

Resolve these before or during the first feature build; each one is a real decision, not a placeholder.

1. **Content source is undecided.** These rules keep it isolated behind `lib/content/` precisely so the choice can be deferred — but it must be made before real page work starts. It determines revalidation strategy and whether on-demand revalidation webhooks are needed. `lib/content/courses.js` currently holds hand-transcribed static view models; swapping in the API should touch only its three exported reads.
2. **The five resource categories are not yet named.** `RESOURCE_CATEGORIES` in `lib/content/resources.js` must be the single source of truth, consumed by `generateStaticParams`, the whitelist check, and `sitemap.js`.
3. **No real image or video assets.** The designs ship base64 placeholders that cannot be reused, so `hero.media` is `null` on every record and `HeroMedia` renders a tonal placeholder. Trainer avatars fall back to initials. Real files must land in `/public` with consent for the trainer portraits before launch.
4. **Primitive library conflict is unresolved.** `components/ui/` is built on `@base-ui/react`; the `radix-ui` dependency is installed but unused. Settle this before writing components against either API. Note this also means **`asChild` does not exist** — use Base UI's `render` prop.
5. **`@hookform/resolvers` is not installed**, so schema-based form validation is unavailable (§7.1).
6. **Next.js 15.2.8 carries 26 high-severity advisories** (SSRF, cache poisoning, XSS, middleware bypass). For a public internet-facing site this is a live risk, not a theoretical one. Upgrade within 15.x unless the pin is contractually required.
7. **Site header and footer do not exist.** `app/(marketing)/layout.js` renders only the `<main>` landmark. The sticky subnav, scroll-progress bar and side rail from the designs are also outstanding.
8. **Sections remain** across the category and course templates, including the group-quote wizard and the category catalog with filters and pagination.
