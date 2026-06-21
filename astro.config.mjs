// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import lucode from "lucode-starlight";
import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [
		starlight({
			title: "Data Engineering Interview Questions",
			description: "Master data engineering through comprehensive interview questions and explanations",
			head: [
				{
					tag: "meta",
					attrs: {
						name: "robots",
						content: "noindex, nofollow",
					},
				},
			],
			social: [
				{ label: "GitHub", href: "https://github.com", icon: "github" },
			],
			sidebar: [
				{
					label: "Getting Started",
					items: [
						{ autogenerate: { directory: "getting-started" } },
					],
				},
				{
					label: "Level 1: Foundations",
					items: [
						{ autogenerate: { directory: "level-1-foundations" } },
					],
				},
				{
					label: "Level 2: Core Concepts",
					items: [
						{ autogenerate: { directory: "level-2-core-concepts" } },
					],
				},
				{
					label: "Level 3: Technologies",
					items: [
						{ autogenerate: { directory: "level-3-technologies" } },
					],
				},
				{
					label: "Level 4: Advanced",
					items: [
						{ autogenerate: { directory: "level-4-advanced" } },
					],
				},
			],
			plugins: [
				lucode({
					navLinks: [
						{ label: "Docs", link: "/getting-started/" },
						{ label: "GitHub", link: "https://github.com", attrs: { target: "_blank", rel: "noreferrer" } },
					],
					footerText: "Built with [Lucode Starlight](https://github.com/lucas-labs/lucode-starlight-theme) & [Astro](https://astro.build)",
				}),
			],
		}),
	],
	adapter: cloudflare({
		imageService: "cloudflare",
		platformProxy: {
			enabled: true,
		},
		wasmModuleImportMeta: "true",
	}),
});
