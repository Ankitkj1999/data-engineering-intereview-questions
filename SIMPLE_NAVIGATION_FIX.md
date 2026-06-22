# Simple Navigation Fix - Minimal Approach

**Goal**: Fix sidebar ordering without overthinking it. Just make it better.

**Time**: 30 minutes

**Complexity**: Easy

---

## The Problem

Current sidebar uses alphabetical order:
```
Basics comes before Theory (wrong!)
Python comes before SQL (illogical)
Data Warehouses are nested too deep
```

## The Solution

Create one simple JSON file to control the sidebar order.

---

## Step 1: Create Navigation Config (10 minutes)

Create file: `src/config/navigation.json`

```json
{
  "sidebar": [
    {
      "label": "Getting Started",
      "collapsed": false,
      "items": [
        { "label": "Welcome", "link": "/getting-started/" }
      ]
    },
    {
      "label": "Foundations",
      "collapsed": false,
      "items": [
        {
          "label": "SQL",
          "collapsed": false,
          "items": [
            { "label": "Basics", "link": "/level-1-foundations/sql/basics/" },
            { "label": "Theory", "link": "/level-1-foundations/sql/theory/" },
            { "label": "Practice", "link": "/level-1-foundations/sql/practice/" }
          ]
        },
        {
          "label": "Python",
          "collapsed": false,
          "items": [
            { "label": "Basics", "link": "/level-1-foundations/python/basics/" },
            { "label": "Theory", "link": "/level-1-foundations/python/theory/" },
            { "label": "Practice", "link": "/level-1-foundations/python/practice/" }
          ]
        },
        {
          "label": "Data Structures",
          "collapsed": false,
          "items": [
            { "label": "Overview", "link": "/level-1-foundations/data-structure/" }
          ]
        }
      ]
    },
    {
      "label": "Core Concepts",
      "collapsed": false,
      "items": [
        { "label": "Data Modeling", "link": "/level-2-core-concepts/data-modeling/" },
        { "label": "Data Warehousing", "link": "/level-2-core-concepts/data-warehousing/" },
        { "label": "Data Quality", "link": "/level-2-core-concepts/data-quality/" },
        { "label": "Data Governance", "link": "/level-2-core-concepts/data-governance/" }
      ]
    },
    {
      "label": "Data Warehouses",
      "collapsed": false,
      "items": [
        { "label": "Snowflake", "link": "/level-3-technologies/data-warehouses/snowflake/" },
        { "label": "Databricks", "link": "/level-3-technologies/data-warehouses/databricks/" },
        { "label": "BigQuery", "link": "/level-3-technologies/data-warehouses/bigquery/" },
        { "label": "Redshift", "link": "/level-3-technologies/data-warehouses/redshift/" }
      ]
    },
    {
      "label": "Technologies",
      "collapsed": true,
      "items": [
        { "label": "Databases", "link": "/level-3-technologies/databases/" },
        { "label": "Batch Processing", "link": "/level-3-technologies/batch-processing/" },
        { "label": "Streaming", "link": "/level-3-technologies/streaming/" },
        { "label": "Orchestration", "link": "/level-3-technologies/orchestration/" }
      ]
    },
    {
      "label": "Advanced",
      "collapsed": false,
      "items": [
        { "label": "System Design", "link": "/level-4-advanced/system-design/" },
        { "label": "Cost Optimization", "link": "/level-4-advanced/cost-optimization/" },
        { "label": "Observability", "link": "/level-4-advanced/observability/" }
      ]
    }
  ]
}
```

---

## Step 2: Update Astro Config (10 minutes)

Edit: `astro.config.mjs`

Replace the old sidebar section:
```javascript
// OLD - DELETE THIS:
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
  // ... more autogenerate sections
],
```

With this:
```javascript
// NEW - ADD THIS:
import navigationConfig from "./src/config/navigation.json";

// Then in the starlight config:
sidebar: navigationConfig.sidebar,
```

**Full updated astro.config.mjs:**

```javascript
// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import lucode from "lucode-starlight";
import cloudflare from "@astrojs/cloudflare";
import navigationConfig from "./src/config/navigation.json";

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
      sidebar: navigationConfig.sidebar,
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
```

---

## Step 3: Test (10 minutes)

```bash
# Build
npm run build

# Dev server
npm run dev
```

Visit `http://localhost:3000` and verify:
- ✅ Sidebar shows items
- ✅ Items in correct order
- ✅ All links work
- ✅ No errors

---

## That's It!

You now have:
- ✅ Explicit sidebar control
- ✅ Logical ordering (Basics → Theory → Practice)
- ✅ Popular topics highlighted (Data Warehouses at top)
- ✅ Easy to modify later
- ✅ URLs unchanged
- ✅ No breaking changes

---

## If Something Breaks

### Build fails
- Check JSON syntax in navigation.json (use JSONLint)
- Verify all `link` paths match your files

### Sidebar doesn't show
- Restart dev server
- Check astro.config.mjs import line is correct

### Links don't work
- Verify `link` paths are correct (must end with `/`)
- Example: `/level-1-foundations/sql/basics/` ✅
- Wrong: `/level-1-foundations/sql/basics` ❌

---

## Done!

Your sidebar is now organized logically instead of alphabetically. Everything works the same, just looks better.

No filters, no metadata, no complexity. Just clean navigation.
