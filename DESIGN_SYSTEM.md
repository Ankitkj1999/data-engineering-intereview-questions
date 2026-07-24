# Design System

## Overview
This document defines the visual system for the site's chrome (header, sidebars, TOC) and content components (question cards, progress bars, badges, buttons) — the rules that keep new pages and components looking like one product instead of an assembly of whatever each was built with. See `CONTENT_GUIDELINES.md` for content/SEO conventions and `ROADMAP_GUIDELINES.md` for the roadmap page system; this doc covers only the visual layer.

---

## Table of Contents
1. [Tokens](#tokens)
2. [Radius](#radius)
3. [Shadow](#shadow)
4. [Spacing](#spacing)
5. [Primitives](#primitives)
6. [Roadmap pages: a deliberate scope boundary](#roadmap-pages-a-deliberate-scope-boundary)
7. [Accessibility: amber usage](#accessibility-amber-usage)
8. [Known, deliberate out-of-scope areas](#known-deliberate-out-of-scope-areas)

---

## Tokens

There is **one** authoritative color palette: Starlight's own `--sl-color-*` tokens, defined in `src/styles/theme.css`. Every other token family on the site is a thin `var()` alias on top of it, not an independent palette:

- `--page-*` (the `@pelagornis/page` vendor package's header/sidebar/chat chrome tokens) — aliased in `theme.css`.
- `--brand-green` (the one color role `--sl-color-*` has no equivalent for — a theme-constant "success" green used by done/progress states across `QuestionCard`, `ProgressOverview`, `QuestionList`, and `roadmap.css`).

**Never add a new independent color literal.** If you need a color, either an existing `--sl-color-*`/`--page-*`/`--brand-green` token already means what you want, or (rarely) it belongs as a new alias in `theme.css`, not a literal hex in a component file. This is the rule that broke before: `--page-accent` used to be a stray literal that never actually resolved to the site's amber accent in dark mode, so the header and chat button silently never showed it. Aliasing makes that class of bug structurally impossible — change the source, every consumer updates.

`--sl-color-*` itself stays exactly as Starlight ships it (dark values in the unprefixed `:root`, light values in `:root[data-theme="light"]`) because Starlight's own untouched internals (code blocks, admonitions, search modal, pagination) depend on its exact shape.

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
