/* ── Route shape helpers ──────────────────────────────────────────────────────
   Which rails a page gets is a property of the route, not of the config, and
   two components need the same answer: Header.astro (to decide whether the
   site title belongs in the header, since the fixed sidebar covers the
   header's left column when it's present) and TwoColumnContent.astro (to
   decide whether to render the rail at all). Deriving it in both places by
   hand is how they drift, so it lives here once.

   Previously the answer was `sidebar.length > 0` — the *global* Starlight
   sidebar config, which is non-empty on every route, so every page got the
   curriculum tree whether or not it was part of the curriculum. The homepage,
   all 50 roadmaps, /projects/ and /interview-experiences/ each rendered a
   320px rail of links to somewhere else.
──────────────────────────────────────────────────────────────────────────── */

import type { StarlightRouteData } from "@astrojs/starlight/route-data";

/** Route prefixes whose pages are part of the graded curriculum tree. These —
    and only these — are the pages the left rail actually navigates within. */
const CURRICULUM_PREFIXES = [
	"/level-1-foundations",
	"/level-2-core-concepts",
	"/level-3-technologies",
	"/level-4-advanced",
] as const;
// Deliberately NOT here: /guides. It holds one orphaned Starlight-starter page
// (guides/introduction) that nothing links to and that the sidebar has no entry
// for — so giving it the curriculum rail would show a tree it isn't in, which
// is the exact thing this module exists to stop.

/**
 * True when `pathname` is a curriculum doc page, which is the only place the
 * left sidebar is navigation rather than decoration. Everything else — home,
 * /roadmaps/*, /projects/, /interview-experiences/, /progress/ — reaches its
 * siblings through the header nav instead.
 */
export function hasCurriculumSidebar(pathname: string): boolean {
	// Normalize the trailing slash so "/guides" and "/guides/" agree, and guard
	// the prefix test with "/" so "/level-1-foundations-archive" can't match.
	const path = pathname.replace(/\/+$/, "") || "/";
	return CURRICULUM_PREFIXES.some(
		(prefix) => path === prefix || path.startsWith(`${prefix}/`),
	);
}

type TocItems = NonNullable<StarlightRouteData["toc"]>["items"];

/** Total entries in the tree, not just top-level — a page whose headings are
    one h2 with six h3s under it has a useful TOC, and a flat count would
    read it as having one. */
function countEntries(items: TocItems): number {
	return items.reduce(
		(total, item) => total + 1 + countEntries(item.children ?? []),
		0,
	);
}

/**
 * True when the table of contents has enough in it to be worth a 320px rail.
 *
 * Starlight always synthesizes a first "Overview" entry pointing at `#_top`,
 * so a page with no headings at all still produces a one-item TOC — which is
 * exactly what the homepage, /projects/ and every roadmap page were rendering
 * a full-height panel to display. Discount that synthetic entry and require at
 * least two real headings, since jumping between fewer than two destinations
 * isn't navigation.
 */
export function hasUsefulToc(toc: StarlightRouteData["toc"]): boolean {
	if (!toc) return false;
	return countEntries(toc.items) - 1 >= 2;
}
