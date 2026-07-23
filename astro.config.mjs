// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import pagePlugin from "@pelagornis/page";
import cloudflare from "@astrojs/cloudflare";
import navigationConfig from "./src/config/navigation.json";

// https://astro.build/config
export default defineConfig({
	site: "https://example.com",
	integrations: [
		starlight({
			title: "Data Engineering Questions",
			description: "Master data engineering through comprehensive interview questions and explanations",
			head: [
				{
					tag: "meta",
					attrs: {
						name: "robots",
						content: "noindex, nofollow",
					},
				},
				{
					tag: "link",
					attrs: { rel: "preconnect", href: "https://fonts.googleapis.com" },
				},
				{
					tag: "link",
					attrs: { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: true },
				},
				{
					tag: "link",
					attrs: {
						rel: "stylesheet",
						href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=IBM+Plex+Mono:wght@400;500;600&display=swap",
					},
				},
			],
			social: [
				{ label: "GitHub", href: "https://github.com/Ankitkj1999/data-engineering-intereview-questions", icon: "github" },
			],
			sidebar: navigationConfig.sidebar,
			customCss: ["./src/styles/theme.css", "./src/styles/primitives.css"],
			components: {
				Header: "./src/overrides/Header.astro",
				PageFrame: "./src/overrides/PageFrame.astro",
				Sidebar: "./src/overrides/Sidebar.astro",
				TwoColumnContent: "./src/overrides/TwoColumnContent.astro",
			},
			plugins: [
				pagePlugin({
					docChat: {
						provider: "gemini",
					},
					skipComponents: ["Header", "PageFrame", "Sidebar", "TwoColumnContent"],
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
