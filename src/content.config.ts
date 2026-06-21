import { glob } from "astro/loaders";
import { docsSchema, i18nSchema } from "@astrojs/starlight/schema";
import { defineCollection } from "astro:content";
import { ExtendDocsSchema } from "lucode-starlight/schema";

export const collections = {
	docs: defineCollection({
		loader: glob({ base: "./src/content/docs", pattern: "**/*.{md,mdx}" }),
		schema: docsSchema({ extend: ExtendDocsSchema }),
	}),
	i18n: defineCollection({ type: "data", schema: i18nSchema() }),
};
