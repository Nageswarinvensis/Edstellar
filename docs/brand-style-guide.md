# Edstellar Brand & Publishing Style Guide

> Version 1.0 — November 2026
> Audience: Content, Publishing, and Marketing teams
> Source of truth: design system tokens in `app/globals.css`

---

## 1. Brand Voice

Edstellar is a **capability transformation partner** — not a software vendor, not a staffing agency. We deliver consulting, talent assessments, coaching, and corporate training across 100+ countries in 10+ languages.

**Write as a trusted expert, not a salesperson.** Our voice is clear, direct, and confident. We explain complex ideas in plain language and avoid buzzword-heavy corporate-speak. Every sentence should earn its place.

**Global, not generic.** Our audience spans regions, industries, and seniority levels. Avoid idioms or cultural references that don't travel. Use active voice and concrete specifics (numbers, outcomes, examples) wherever possible.

**Capable, not boastful.** Lead with what we enable for clients — not how great we think we are. The proof is in results and reach.

---

## 2. Typography

### Font Families

| Role | Font | When to use |
|------|------|-------------|
| Display / Headings | **Sora** | All headings H1–H5, navigation labels |
| Serif italic accent | **Cormorant Garamond** (italic only) | Emphasis words inside headings — one or two words maximum |
| Body copy, UI | **DM Sans** | All running text, UI labels, captions |
| Kickers, meta labels | **DM Mono** | Section kickers ("CASE STUDY"), date stamps, category tags |

### Type Scale & Usage

| Element | Size | Leading | Weight | Typical use |
|---------|------|---------|--------|-------------|
| H1 | 38–44px (fluid) | 1.05 | 500 | Page hero headline — one per page |
| H2 | 32–38px (fluid) | 1.08 | 500 | Major section headings |
| H3 | 20–26px (fluid) | 1.15 | 500 | Sub-section or card headings |
| H4 | 18px | snug | 600 | Feature labels, accordion titles |
| H5 | 16px | snug | 600 | Small callouts, sidebar headings |
| Body (p) | 16px | 1.7 | 400 | All running copy |
| Small (label/span) | 14px | — | 400 | Captions, footnotes, meta text |

**Usage notes:**

- **H1** — one per page, always. It is the page's SEO anchor and visual centrepiece. Keep it under ~12 words.
- **H2** — use for distinct content sections that a reader could navigate to. Think "table of contents" entries.
- **H3** — use inside a section for sub-topics, or as the title of a card/tile component.
- **H4/H5** — inline labels or small structural elements. Never use them as a workaround to make text smaller; use `small` / body copy instead.
- **Body copy** — 16px at a 1.7 line-height is intentional for readability. Do not reduce leading on body text.
- **Kicker labels** (DM Mono) — always uppercase, short (1–3 words). They set context before the heading, not after.

---

## 3. Color Palette

### Light Background Colors

| Name | Hex | Typical use |
|------|-----|-------------|
| `paper` | `#FAFAF7` | Default page background — most sections |
| `paper-warm` | `#F2F0E8` | Warm alternating sections |
| `paper-cream` | `#EDE9DD` | Richer cream sections, pull-quotes |
| `white` | `#FFFFFF` | Cards, modals, form surfaces |
| `sand` | `#F5F3EB` | Client logo band, light accent strip |

### Dark Background Colors

| Name | Hex | Typical use |
|------|-----|-------------|
| `navy` | `#0A1628` | Footer, hero sections, strong CTAs |
| `navy-soft` | `#14233D` | Softer dark sections, mid-page emphasis |
| `navy-deep` | `#050D1A` | Deepest dark — legal bar only |

### Text Colors

| Name | Value | Use |
|------|-------|-----|
| `ink` | `#0A1628` | Headings, bold labels on light backgrounds |
| `ink-muted` | `#0A1628` at 65% opacity | Body copy on light backgrounds — minimum for WCAG AA |
| `on-dark` | `#FAFAF7` | All text on navy/dark backgrounds |
| `on-dark-muted` | `rgba(250,250,247,0.60)` | Supporting/muted text on dark backgrounds |

### Accent Colors

| Name | Hex | Use |
|------|-----|-----|
| `lime` | `#C8F135` | Primary accent on **dark backgrounds only** |
| `lime-soft` | `#E4F89A` | Hover states, subtle highlights on dark |
| `olive` | `#566e0b` | Emphasis text and inline accents on **light backgrounds** |
| `gold` | `#C3A36F` | Leadership retreats and executive coaching contexts |
| `error` | `#B3261E` | Form validation errors only |

### Color Rules — DO and DON'T

| Rule | Correct | Incorrect |
|------|---------|-----------|
| Accent on light background | `olive` text | `lime` text — fails contrast |
| Accent on dark background | `lime` text | `olive` text — disappears |
| Body copy on light | `ink-muted` | `ink/40` or `ink/60` — fails WCAG AA |
| Body copy on dark | `on-dark-muted` | `on-dark/40` — too faint |
| Error states | `error (#B3261E)` | Any other red |

---

## 4. Text on Dark Backgrounds

Dark sections (navy, navy-soft, navy-deep) follow a strict rule set:

- **Headings** — use `on-dark` (`#FAFAF7`). Never pure white (`#FFFFFF`) — it creates harsh contrast.
- **Body copy** — use `on-dark-muted` (`rgba(250,250,247,0.60)`). This is the minimum opacity for WCAG AA compliance on small text.
- **Emphasis / accent words in headings** — use `lime` (`#C8F135`). This is the only context where lime is appropriate.
- **Dividers / rules** — use `on-dark-rule` (`rgba(250,250,247,0.12)`). Never use an `ink`-based rule on dark.
- **Kicker labels** — use `lime` or `on-dark-muted` depending on emphasis needed.

> Do not use `olive` on any dark background. It disappears.

---

## 5. Emphasis & Accent

### Serif Italic (Cormorant Garamond)

Used for one or two words inside a heading to create visual rhythm and warmth. Rules:

- Maximum 2–3 consecutive words per heading
- Always italic — never upright Cormorant
- Colour is inherited from the heading (ink on light, on-dark on dark, lime as accent)
- Never use on body copy — Cormorant is a heading accent only

**Example:**
"Build capabilities that *endure*." — the word *endure* in Cormorant italic, the rest in Sora.

### Olive (emphasis on light backgrounds)

- Use for a key word or phrase that needs colour emphasis in a heading on a `paper`, `paper-warm`, or `paper-cream` background
- Keep it to 1–4 words — olive is a highlight, not a paragraph colour
- Do not use olive on body copy; use regular `ink` or `ink-muted`

### Lime (emphasis on dark backgrounds)

- Mirror of olive — same usage rules, dark-background context only
- Also used for primary CTA button fills on dark sections
- Never combine lime text with a lime background

### Gold

- Reserved exclusively for Leadership Retreats and Executive Coaching sections
- Do not repurpose for general accent use

---

## 6. Spacing & Layout

### Maximum Content Width

The design system max content width is **1280px** (`xl` breakpoint). Pages are horizontally centered within this container.

### Breakpoints

| Token | Value | Context |
|-------|-------|---------|
| `sm` | 640px | Small tablets, large phones |
| `md` | 758px | Tablet portrait |
| `lg` | 1024px | Laptop / tablet landscape |
| `xl` | 1280px | Desktop — max content width |

### Border Radius Standards

| Context | Radius |
|---------|--------|
| Small elements (chips, tags, badges) | 8px |
| Cards, panels, modals | 14px |
| Large feature cards, section frames | 22px |

### Dividers & Rules

- Section dividers on light backgrounds: `rule` (`rgba(10,22,40,0.12)`)
- Stronger rules (table headers, card borders): `rule-strong` (`rgba(10,22,40,0.22)`)
- All rules on dark backgrounds: `on-dark-rule` (`rgba(250,250,247,0.12)`)

> Never use a solid hex colour for dividers — always use the opacity-based rule tokens.

---

## 7. Do's and Don'ts — Quick Reference

| # | Rule |
|---|------|
| ✓ | **One H1 per page.** It is the SEO anchor. Never stack two H1s. |
| ✓ | **Use olive for accent text on light backgrounds.** Lime on light fails contrast. |
| ✓ | **Use lime for accent text and CTAs on dark backgrounds.** Olive on dark is invisible. |
| ✓ | **Body copy must use `ink-muted` (65% opacity) — never lighter.** Values below 65% fail WCAG AA for 16px text. |
| ✓ | **Kicker labels are DM Mono, uppercase, 1–3 words.** They appear above the heading, not below. |
| ✓ | **Cormorant Garamond is for heading emphasis only.** Never use it in body copy or UI labels. |
| ✓ | **Page backgrounds use `paper` (`#FAFAF7`) as default.** Pure white is for surface elements (cards, modals). |
| ✓ | **Section dividers use opacity-based rule tokens.** Never hardcode a hex border colour. |
| ✗ | **Never use `lime` on a light (`paper` / `white`) background.** |
| ✗ | **Never use `olive` on a dark (`navy`) background.** |
| ✗ | **Never set body copy below `ink-muted` (65%).** `ink/40`, `ink/50`, `ink/60` are all off-limits for text. |
| ✗ | **Never use Inter.** The brand fonts are Sora, Cormorant Garamond, DM Sans, and DM Mono. |
| ✗ | **Never use `text-md`.** It is not a valid size in the type scale. Use `text-base` (16px) or `text-lg`. |
| ✗ | **Never hardcode hex colours or pixel values in content.** All values must reference design tokens. |
| ✗ | **Never place emphasis spans in body copy.** Coloured emphasis (olive/lime) is for headings only. |
| ✗ | **Never use `gold` outside Leadership Retreats / Executive Coaching contexts.** |

---

## 8. Accessibility Minimums

All published content must meet **WCAG AA** at minimum.

| Context | Minimum contrast ratio | Compliant token |
|---------|----------------------|-----------------|
| Body text on light background | 4.5:1 | `ink-muted` (65%) |
| Body text on dark background | 4.5:1 | `on-dark-muted` (60%) |
| Large text / headings on light | 3:1 | `ink` |
| Large text / headings on dark | 3:1 | `on-dark` |
| Olive accent text on paper | 4.5:1 | `olive (#566e0b)` ✓ |
| Lime accent text on navy | 4.5:1 | `lime (#C8F135)` ✓ |

> The olive token is `#566e0b` — darker than any lime-green you may see in design mockups. This is intentional; lighter greens fail contrast for small text on paper backgrounds.

---

*For implementation details, component architecture, and CMS field conventions, see [`TASTE.md`](../TASTE.md).*

---

## 9. AI Prompting Reference — For Section Creation

When using AI tools (ChatGPT, Claude, etc.) to generate new page sections or content blocks, include the following context in your prompt so the AI uses the correct design system.

### Tech Stack
- **Framework:** Next.js 15 App Router — JavaScript only (no TypeScript)
- **Styling:** Tailwind CSS v4 — all styling via Tailwind utility classes, no inline styles
- **Components:** shadcn/ui (Base UI based) — use `<Text>` and `<Box>` instead of raw HTML tags
- **No `tailwind.config.js`** — all tokens live in `app/globals.css` under `@theme`

### Tailwind Color Classes
| Use | Class |
|-----|-------|
| Page background | `bg-paper` |
| Warm section bg | `bg-paper-warm` |
| Cream section bg | `bg-paper-cream` |
| Dark section bg | `bg-navy` |
| Soft dark bg | `bg-navy-soft` |
| Heading text (light bg) | `text-ink` |
| Body text (light bg) | `text-ink-muted` |
| Heading text (dark bg) | `text-paper` |
| Muted text (dark bg) | `text-paper/60` |
| Lime accent (dark bg) | `text-lime` |
| Olive accent (light bg) | `text-olive` |
| Lime background | `bg-lime` |
| Border / rule (light) | `border-ink/[0.12]` |
| Border / rule (dark) | `border-paper/[0.12]` |

### Tailwind Font Classes
| Use | Class |
|-----|-------|
| Display headings | `font-display` (Sora) |
| Serif italic accent | `font-serif` (Cormorant Garamond) |
| Body copy | `font-body` (DM Sans) |
| Kicker / meta labels | `font-mono` (DM Mono) |

### Tailwind Type Scale Classes
| Element | Classes |
|---------|---------|
| H1 | `text-[clamp(38px,3.5vw,44px)] leading-[1.05] tracking-[-0.035em] font-medium font-display` |
| H2 | `text-[clamp(32px,3.2vw,38px)] leading-[1.08] tracking-[-0.03em] font-medium font-display` |
| H3 | `text-[clamp(20px,2vw,26px)] leading-[1.15] tracking-[-0.02em] font-medium font-display` |
| H4 | `text-lg leading-snug tracking-[-0.01em] font-semibold font-display` |
| H5 | `text-base leading-snug font-semibold font-display` |
| Body | `text-base leading-[1.7] font-body` |
| Small | `text-sm font-body` |
| Kicker | `text-xs font-mono uppercase tracking-widest` |

### Border Radius Classes
| Size | Class |
|------|-------|
| Small (chips, tags) | `rounded-[8px]` |
| Cards, panels | `rounded-[14px]` |
| Large cards | `rounded-[22px]` |

### Sample AI Prompt Template

> "Create a Next.js section component for the Edstellar website using the following rules:
> - JavaScript only, no TypeScript
> - Tailwind CSS v4 for all styling — no inline styles
> - Use `<Box>` instead of `<div>`, `<Text as="h2">` instead of `<h2>`, etc.
> - Background: `bg-navy` (dark section)
> - Headings: `text-paper font-display font-medium`
> - Body text: `text-paper/60 font-body`
> - Accent color: `text-lime` for emphasis words
> - Border radius on cards: `rounded-[14px]`
> - Max content width: `max-w-[1360px] mx-auto px-10`
> - Server Component — no `'use client'` unless interactive
> - No TypeScript types or interfaces"
