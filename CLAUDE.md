# Edstellar — Agent Instructions

**Read [`TASTE.md`](./TASTE.md) before writing any code in this repository.** It is the authoritative architecture and standards document. If a request conflicts with it, say so and update `TASTE.md` first — then code.

## Project

Public **marketing website** for Edstellar. Next.js 15.2.8 App Router · **JavaScript only, never TypeScript** · Tailwind CSS v4 · shadcn/ui · react-hook-form.

Route contract: `/consulting/{slug}`, `/corporate-training/domain/{course-slug}`, `/corporate-training/vendor/{course-slug}`, `/resources/{category}/{slug}`, `/blog/{slug}` (phase 2). Full detail in TASTE.md §1.

## Non-negotiables

1. **Never create `.ts` or `.tsx` files.** This project is JavaScript. shadcn is configured with `"tsx": false`.
2. **Every page is prerendered.** SSG or ISR — never `force-dynamic`. Page content is fetched on the **server** and passed down as props. Never fetch page content in a Client Component; it renders an empty shell to crawlers and destroys the page's SEO value. This is the opposite of the right pattern for an authenticated dashboard — do not carry that habit in here.
3. **Never put `"use client"` on `page.js` or `layout.js`.** Push it to the smallest interactive leaf.
4. **`params` and `searchParams` are Promises in Next 15.** Always `await params`.
5. **Every page exports `metadata` or `generateMetadata`** with title, description, and canonical. A page without metadata does not ship.
6. **Unknown slug → `notFound()`**, never a 200 response saying "not found" (soft 404).
7. **Use `<Text>` and `<Box>`** from `components/ui/` instead of raw `h1`–`h5`/`p`/`span`/`div`.
8. **Never edit `components/ui/` shadcn files** — the CLI regenerates them. Wrap or compose instead.
9. **All content reads go through `lib/content/`.** Pages never call a CMS or database directly.
10. **Tailwind only** — no inline styles, no hardcoded hex. Tokens live in the `@theme` block in `app/globals.css`; there is no `tailwind.config.js`.

## Gotchas verified in this codebase

- **Overriding `text-*` on a `<Text>` silently deletes its `leading-*`.** In Tailwind v4 `text-*` sets font-size *and* line-height, so `tailwind-merge` treats a later `text-*` as superseding an earlier `leading-*`. Whenever you pass a size override, restate the line-height in the same `className` — or override only the responsive variant (`max-lg:text-[…]`), which does not conflict. This bit all four sections on the first pass.
- **There is no `asChild`** — `components/ui/` is Base UI, which uses a `render` prop: `<CtaButton render={<Link href="/x" />}>`. Passing `asChild` silently nests an anchor inside a button.
- **`text-md` is not a real Tailwind class** (the scale is `text-sm`/`text-base`/`text-lg`). It has been removed from `Text.jsx`; don't reintroduce it.
- **Fonts are Sora (display), Cormorant Garamond (serif italic accent), DM Sans (body), DM Mono (kickers/meta)** — loaded via `next/font` and mapped to `font-display` / `font-serif` / `font-body` / `font-mono`. Inter is no longer used.
- **Emphasis inside headings is olive `text-olive`, not lime.** Lime fails contrast on paper; the designs use `#6f8c0f` for accent text on light backgrounds and reserve lime for dark ones.
- **`react-phone-input-2` is client-only**, needs `import "react-phone-input-2/lib/style.css"` in that same client file, and must be wired through react-hook-form's `<Controller>`. Tailwind overrides need `!` prefixes.
- **`@hookform/resolvers` is not installed**, so zod-resolver validation is unavailable. `zod` is only a transitive dependency — add it to `package.json` before importing it directly.
- **`components/ui/` is built on `@base-ui/react`**, not Radix. The `radix-ui` dependency is installed but unused — see TASTE.md §13.

## Commands

```bash
nvm use 24.19.0     # required — shells default to 22.17.0
npm run dev
npm run build       # must pass before any change is considered done
npm run lint
```
