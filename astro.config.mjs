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
				{ label: "GitHub", href: "https://github.com/Ankitkj1999/data-engineering-intereview-questions", icon: "github" },
			],
			sidebar: navigationConfig.sidebar,
			components: {
				Header: "./src/overrides/Header.astro",
				PageFrame: "./src/overrides/PageFrame.astro",
			},
			plugins: [
				pagePlugin({
					docChat: {
						provider: "gemini",
					},
					skipComponents: ["Header", "PageFrame"],
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
