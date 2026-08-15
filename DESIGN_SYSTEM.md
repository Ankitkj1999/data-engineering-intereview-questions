# Design System

## Overview
This document defines the visual system for the site's chrome (header, sidebars, TOC) and content components (question cards, progress bars, badges, buttons) — the rules that keep new pages and components looking like one product instead of an assembly of whatever each was built with. See `CONTENT_GUIDELINES.md` for content/SEO conventions and `ROADMAP_GUIDELINES.md` for the roadmap page system; this doc covers only the visual layer.

---

## Table of Contents
1. [Tokens](#tokens)
2. [Theme carriers: the one vendor trap](#theme-carriers-the-one-vendor-trap)
3. [Layout: which routes get which rails](#layout-which-routes-get-which-rails)
4. [Navigation](#navigation)
5. [Radius](#radius)
6. [Shadow](#shadow)
7. [Spacing](#spacing)
8. [Primitives](#primitives)
9. [Roadmap pages: a deliberate scope boundary](#roadmap-pages-a-deliberate-scope-boundary)
10. [Accessibility: amber usage](#accessibility-amber-usage)
11. [Known, deliberate out-of-scope areas](#known-deliberate-out-of-scope-areas)

---

## Tokens

There is **one** authoritative color palette: Starlight's own `--sl-color-*` tokens, defined in `src/styles/theme.css`. Every other token family on the site is a thin `var()` alias on top of it, not an independent palette:

- `--page-*` (the `@pelagornis/page` vendor package's header/sidebar/chat chrome tokens) — aliased in `theme.css`.
- `--brand-green` (the one color role `--sl-color-*` has no equivalent for — a theme-constant "success" green used by done/progress states across `QuestionCard`, `ProgressOverview`, `QuestionList`, and `roadmap.css`).

**Never add a new independent color literal.** If you need a color, either an existing `--sl-color-*`/`--page-*`/`--brand-green` token already means what you want, or (rarely) it belongs as a new alias in `theme.css`, not a literal hex in a component file. This is the rule that broke before: `--page-accent` used to be a stray literal that never actually resolved to the site's amber accent in dark mode, so the header and chat button silently never showed it. Aliasing makes that class of bug structurally impossible — change the source, every consumer updates.

`--sl-color-*` itself stays exactly as Starlight ships it (dark values in the unprefixed `:root`, light values in `:root[data-theme="light"]`) because Starlight's own untouched internals (code blocks, admonitions, search modal, pagination) depend on its exact shape.

**`--sl-color-*` is declared on `:root` only; the `--page-*` aliases are declared on `:root, [data-theme]`.** That asymmetry is deliberate — see the next section.

## Theme carriers: the one vendor trap

`@pelagornis/page` declares its own complete `--page-*` palette twice (light in `:root`, dark in a bare `[data-theme="dark"]`), and its runtime stamps `data-theme` onto elements **inside** the document: `<body>`, `.page-header`, `.page-footer-container`, `.page-mobile-menu-overlay`, and its `<page-select>`. Starlight's theme toggle only ever writes to `<html>`.

Left alone, those disagree: `<html data-theme="light">` above `<body data-theme="dark">`, with the vendor's dark block still matching on `body` and re-declaring the whole `--page-*` palette to dark literals that the entire page inherits. That produced light-mode text on dark-mode surfaces — the reason the theme toggle was effectively broken until this was fixed. Two halves keep it working, and **both are load-bearing**:

1. **`src/styles/theme.css`** declares the `--page-*` aliases on `:root, [data-theme]`, so they out-weigh the vendor's block at every carrier. This is safe *because* they're aliases — each resolves a `--sl-color-*` token, and those live on `:root` alone and inherit down, so every carrier lands on the theme the root is actually in.
2. **`src/overrides/Header.astro`** mirrors the root's `data-theme` onto every carrier (`syncThemeCarriers`, plus a subtree `MutationObserver` filtered to that one attribute, since the vendor stamps them during its own init).

**Never declare `--sl-color-*` on anything but `:root`** — that's what lets a descendant disagree with the root about which theme is in effect, which is the whole bug.

## Layout: which routes get which rails

Both rails are earned per route, decided in one place: **`src/lib/route.ts`**.

| Rail | Shown when | Why |
|---|---|---|
| Left sidebar (`hasCurriculumSidebar`) | Path is under `/level-1-foundations`, `/level-2-core-concepts`, `/level-3-technologies`, `/level-4-advanced` | It's the curriculum tree — it can only navigate *within* the curriculum |
| Right TOC (`hasUsefulToc`) | The page has ≥2 real headings | Starlight synthesizes an "Overview" entry even for a page with none |

This replaced `sidebar.length > 0` (Starlight's *global* config, non-empty on every route) and a bare `toc` truthiness check. Between them, the homepage, all 50 roadmaps, `/projects/`, `/interview-experiences/` and `/progress/` each rendered a 320px tree of links to somewhere else *and* a 320px panel showing one dead word.

Two consequences worth knowing before changing layout CSS:

- **The sidebar starts below the header** (`top: var(--page-header-height)`, `z-index: 50`), not at `top: 0`. It used to span the full viewport at `z-index: 150` and draw *over* the header's left column, which is why the site title was duplicated into the rail and hidden in the header. The header now carries real navigation in exactly that space, so there is one site title, in the header. `Sidebar.astro` is just the scrolling nav list.
- **Offsets are scoped to `.with-sidebar` / `.with-toc`.** Don't reintroduce an unconditional `margin-left: var(--page-sidebar-width)`. Watch source order too: the trailing `.page-toc-sidebar` rules sit *after* the `@media (min-width: 1280px)` block at equal specificity, and a `position`/`width` there silently beats the desktop block — that bug kept the TOC in flow at a hardcoded 320px and cost the reading column ~320px on every doc page.

Railless routes cap themselves (`#home-root`, `#progress-root`, `#rm-root`, `#rm-index`, `.pj`, `.ie`). A new full-width page **must** set its own `max-width`, or it inherits nothing but the 1200px wrapper and runs to ~1100px of prose.

## Navigation

`src/config/navigation.json` holds both halves:

- **`header.primary`** — the top-level bar. Two entries (`Roadmaps`, `Questions`) name a key in `header.menus` and open a panel; the rest are plain links. Each carries a **`match`** array of the route prefixes that section owns, rendered to `data-match` and used for the active state. **This is not the same as `href` and must not be derived from it:** `Questions` links to `/level-1-foundations/sql/` because a leaf topic is the sensible place to land, but it stands for all four `level-*` trees. Matching on `href` lit the tab on 1 of 29 question topics.
- **`header.menus`** — grouped columns, an optional `featured` card, and an optional `more` footer link. Panels open on `:hover` and `:focus-within` with no JS; every trigger is a real link to a real landing page, so a tap on touch still goes somewhere.
- **`sidebar`** — the curriculum tree only. Roadmaps, Projects, Interviews and Progress live in the header now, not here.

Header nav used to be read from `process.env.PAGE_NAVIGATION`, which is set nowhere in the repo — the parse always yielded `undefined` and the `<nav>` never rendered at all.

## Radius

**One radius, one exception.** Every card, panel, button, and input uses `var(--page-radius-lg)` (8px — already the vendor's own scale, not a new token). The only other radius in active use is `var(--page-radius-full)` (a true pill), reserved strictly for status/count/difficulty **badges** — never a nav item, never a button. Before this was standardized, hardcoded radii ranged across nine different values (2px–24px) with no pattern; if you're tempted to write a raw `border-radius: Npx`, use `var(--page-radius-lg)` instead unless it's genuinely a pill.

## Shadow

**Flat by default.** Cards, panels, the header, and the sidebars carry a hairline border (`var(--page-border)` / `var(--sl-color-gray-5)`) and no shadow. Shadow (`var(--page-shadow-sm)` or `var(--page-shadow-lg)` for a full-height overlay) is reserved for things that actually float above the page: the mobile sidebar drawer, dropdowns, the search modal. A hover state gets a border-color shift and a 1px lift (`translateY(-1px)`), not a shadow.

## Spacing

Use the vendor's existing `--page-space-*` scale (already loaded, already a complete-enough scale) rather than inventing a parallel one.

## Primitives

Two tiers, in `src/styles/primitives.css` (CSS classes, loaded sitewide via `astro.config.mjs`'s `customCss`) and `src/components/ui/` (real Astro components):

| Primitive | What it's for | Use it for |
|---|---|---|
| `.ds-panel` | Flat, hairline-bordered surface | Header, both sidebars, TOC — anywhere that should read as "site chrome," not "content card" |
| `.ds-card-interactive` | Bordered card, left accent bar, hover lift | Any clickable content card (homepage stage/roadmap cards, `QuestionCard`) |
| `.ds-icon-btn` | Square icon button on a neutral tint | Header icon controls |
| `.ds-pill` / `.ds-pill--accent` / `--success` / `--danger` / `--neutral` | Tinted status/count pill | Underlies `Badge.astro` — use the component, not this class directly, unless the markup isn't Astro-owned (see below) |
| `.ds-progress-track` / `.ds-progress-fill` | Progress bar recipe | Underlies `ProgressBar.astro` — same rule |
| `Button.astro` | `variant: primary \| secondary \| ghost`, `href` or `type` | Any call-to-action button/link this site renders |
| `Badge.astro` | `tone: accent \| success \| danger \| neutral`, `dot` | Any status/difficulty/topic tag |
| `ProgressBar.astro` | `value`, `max`, `label` | Any progress indicator |

**Rule of thumb:** if you're rendering real Astro markup, use the Tier-2 component (`Button`/`Badge`/`ProgressBar`). If you're styling markup this site doesn't render (a vendor component's own DOM — Search/ThemeSelect/LanguageSelect/SocialIcons/MobileMenuToggle come from `@pelagornis/page`, not this repo) or markup built client-side via JS (see below), target it by selector using the Tier-1 CSS classes/tokens directly.

A note on `!important`: the vendor's own stylesheets (`header-icons.css`, `components.css`, `layout.css`) are unlayered and use `!important` heavily. Selectors targeting vendor-rendered elements (the header icon buttons) still need `!important` to win — that's load-bearing, not cruft. For markup this site fully owns, prefer specificity (repeating a class selector, e.g. `.page-sidebar-link.page-sidebar-link.page-sidebar-link`, as `SidebarSublist.astro` already does) over adding more `!important`.

## Roadmap pages: a deliberate scope boundary

The roadmap pages (`src/pages/roadmaps/*.astro`) build their nodes, panels, and badges via client-side JavaScript `innerHTML` templates, not Astro markup — see `ROADMAP_GUIDELINES.md`. This means `roadmap.css` can only share **CSS recipes** (the same custom properties, the same radius/color tokens) with `primitives.css` and the `ui/` components — it cannot import or render `Button.astro`/`Badge.astro`/`ProgressBar.astro`. Keep `roadmap.css`'s visual language in sync with the rest of the system by hand; don't try to make it consume the Astro components.

Every roadmap page must be `<style is:global>@import "/src/styles/roadmap.css";</style>` with **zero** inline `rm-*` rules of its own — forking this file (as `python.astro` once did) silently drops any fix or feature added to the shared file afterward.

## Accessibility: amber usage

The site's accent amber swaps per theme (`#f59e0b` dark / `#e26523` light) specifically so it stays legible — but even the light-mode value is only ~3.2:1 against white, which clears WCAG's 3:1 non-text threshold (icons, borders, filled backgrounds with white text) but falls short of the 4.5:1 required for small colored text on a light surface. **Use amber for icons, borders, and pill backgrounds — not as the text color of small text sitting directly on a light background.**

## Known, deliberate out-of-scope areas

- **Starlight-internal components** (code blocks, admonitions, the search modal, pagination) are untouched by this system. Forking them would mean maintaining a divergent copy of Starlight's own styling for no benefit the site's users have asked for.
- **Vendor-rendered header controls** (Search, ThemeSelect, LanguageSelect, SocialIcons, MobileMenuToggle) are restyled by selector, not replaced — their markup belongs to `@pelagornis/page`, not this repo.
