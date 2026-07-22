# Content Guidelines for Data Engineering Questions

## Overview
This document outlines SEO best practices, content standards, and technical requirements for maintaining and adding new pages to the Data Engineering Questions knowledge base.

---

## Table of Contents
1. [Content Page Pattern](#content-page-pattern)
2. [Frontmatter Standards](#frontmatter-standards)
3. [Content Structure](#content-structure)
4. [SEO Guidelines](#seo-guidelines)
5. [Markdown Formatting](#markdown-formatting)
6. [Code Examples](#code-examples)
7. [Internal Linking](#internal-linking)
8. [Directory Organization](#directory-organization)
9. [Meta Tags & Robots](#meta-tags--robots)

---

## Content Page Pattern

**One page per topic by default.** A topic only gets a second page when its interview questions are a genuinely different *question format* — never because the subject is "foundational," never because there's a lot of content. A big topic gets narrower (e.g. "Data Warehouses" split per vendor, already done), not multi-page.

### Default single-page shape
Applies to everything in `level-2-core-concepts`, `level-3-technologies`, `level-4-advanced`, and most of `level-1-foundations`:

1. **Quick Summary** — 1-2 sentence overview
2. **Key Concepts** — the core ideas, briefly
3. **Interview Questions** — rendered with `QuestionCard`/`QuestionList` (see below), not plain markdown Q&A
4. **Common Interview Scenarios** — real-world framing
5. **Further Reading** — 2-3 links, **our own existing pages first** (direct link to a page, or an anchor into a section of one), external sources only when nothing internal covers it

### Current exceptions (format-driven, not tier-driven)
- **Python** — two pages, `theory.md` (conceptual Q&A) and `practice.md` (coding problems). These are genuinely different question formats (explain-this vs. write-this-function), not different depth.
- **Data Structures** — one page, practice-only shape (`practice.md`-style content). It's inherently coding-problem territory; there's no separate "theory" format to split out.
- Everything else, including SQL, is single-page. SQL's old theory/practice split was never a real format difference (both were prose Q&A) — it's been merged into one page.

Don't add a new exception without a concrete reason the question *format* differs, not just that the topic is large or foundational-feeling.

### No dedicated tutorial/"basics" pages
Roadmaps (`src/pages/roadmaps/*.astro`) are the curriculum/checklist layer — each roadmap topic already carries a short `desc` blurb (see `ROADMAP_GUIDELINES.md`), which is the "quick basics" layer. This site does not also maintain full from-scratch tutorials (no `basics.md` anywhere). Anything a page needs to explain to make sense of its interview questions belongs in that page's own **Key Concepts** section, kept brief — not a separate tutorial page.

### Interview questions must use `QuestionCard`/`QuestionList`
Any section presenting interview Q&A uses the `QuestionCard` and `QuestionList` components (`src/components/mdx/`), not plain markdown headings with bolded answers. This is what powers per-question "mark as done" progress tracking. Plain markdown Q&A sections are a sign a page hasn't been migrated yet, not an accepted alternative.

### Known gap (being fixed incrementally, one topic at a time)
Several existing pages predate this decision — most visibly Hadoop, Spark, Hive, and Flink, which are long narrative essays rather than the single-page template above, and most topics still use plain markdown Q&A instead of `QuestionCard`. Don't use these pages as a reference for new content; treat this document as the source of truth instead.

---

## Frontmatter Standards

Every markdown file **MUST** include YAML frontmatter with the following fields:

### Required Fields
```yaml
---
title: [Page Title] | [Key Focus Area/Context]
description: [Detailed description 150-160 characters that describes the page content and includes target keywords]
---
```

### Title Guidelines
- **Format**: Keep it SHORT and clear for sidebar/browser tabs
- **In Markdown H1**: Use the longer, more descriptive version for page display
- **Examples**:
  - Title (frontmatter): `SQL`
  - H1 (markdown): `SQL Interview Questions: Syntax, Joins & Query Design`
  - Title (frontmatter): `Python Theory`
  - H1 (markdown): `Python Theory: Core Concepts for Data Engineering`
- **Length**: 20-35 characters ideal (so sidebar displays well)
- **Keywords**: Include primary keyword naturally
- **Avoid**: Generic titles like "Questions" or "Guide"

**Why this matters:**
- Frontmatter title appears in sidebar navigation → keep SHORT
- H1 in markdown provides richer context on the page itself
- Avoids duplicate H1s (SEO issue)
- Better user experience in navigation

### Description Guidelines
- **Length**: 150-160 characters (sweet spot for search results)
- **Include**: Main topic, key subtopics, and target keywords
- **Format**: Benefit-focused, natural language
- **Examples**:
  - ✅ "Master SQL fundamentals with practical examples. Learn SELECT, WHERE, JOINs, aggregation, and data modification. Complete beginner's guide."
  - ❌ "SQL basics and commands"
- **Keywords**: Include 2-3 target search phrases naturally

---

## Content Structure

### H1 (Main Title)
**DO NOT include an explicit H1 in markdown.** Starlight automatically renders the frontmatter `title` as the page's H1. Adding a markdown H1 creates a duplicate title on the rendered page (bad for UX and SEO).

**Correct approach:**
- Frontmatter `title`: SHORT (20-35 chars, for sidebar and auto-rendered H1)
- First markdown heading: **Start with H2** using descriptive subtitle format
- Format H2 as: `## [Main Topic]: [Descriptive Subtitle]`

**Examples** (frontmatter → markdown):
```yaml
# ✅ CORRECT
---
title: SQL
---
## SQL Interview Questions: Syntax, Joins & Query Design
```

```yaml
# ❌ WRONG - Creates duplicate H1
---
title: SQL
---
# SQL Interview Questions: Syntax, Joins & Query Design
## SQL Interview Questions: Syntax, Joins & Query Design
```

**Why this matters:**
- Starlight theme automatically renders frontmatter title as H1
- Adding a markdown H1 creates duplicate titles on the page
- Hurts user experience (redundant heading)
- Hurts SEO (duplicate H1 is a markup error)
- Reference: the SQL page does this correctly (no markdown H1)

### H2 (First Markdown Heading - After H1 is Auto-Rendered)
- **Use as the first markdown heading** (since frontmatter title renders as H1)
- **Format**: `## [Main Topic]: [Descriptive Subtitle]`
- **Purpose**: Provide richer context and SEO keywords on the page itself
- **Include**: Subtitle with additional keywords/context
- **Examples**:
  ```markdown
  ## SQL Interview Questions: Syntax, Joins & Query Design
  
  ## Python Theory: Core Concepts for Data Engineering
  
  ## Data Warehouses: Analytics & OLAP Architecture
  ```

**Key difference from frontmatter title:**
- Frontmatter `title`: SHORT (20-35 chars, appears in sidebar navigation)
- H2 heading: LONGER (descriptive, includes keywords, appears on page below auto-rendered title)

### H3 (Section Subsections)
- **Use for subsections under H2**: `### [Specific Item]`
- **Examples**:
  - `### INNER JOIN`
  - `### COUNT Function`
  - `### Primary Key`

### H4+ (Details)
- Use sparingly for additional nesting
- Generally not recommended

---

## SEO Guidelines

### 1. Table of Contents (TOC)
**REQUIRED** for pages with multiple sections:

```markdown
## Table of Contents
- [Section 1](#section-1)
- [Section 2](#section-2)
- [Subsection 2.1](#subsection-21)
```

**Benefits:**
- Improves SEO (internal linking)
- Better user navigation
- Helps search engines understand page structure
- Increases page engagement

### 2. Keyword Optimization
- **Primary keyword**: Mention 2-3 times in first 100 words
- **LSI keywords**: Include related terms naturally
- **Avoid**: Keyword stuffing or unnatural phrasing
- **Target**: Long-tail keywords (3+ words)
- **Examples**:
  - Primary: "SQL JOINs"
  - LSI: "INNER JOIN", "LEFT JOIN", "table relationships", "combining data"

### 3. Content Length
- **Minimum**: 300 words per section
- **Optimal**: 1,500-2,500 words per page
- **More is better** for SEO if content remains valuable
- **Quality over quantity**: Avoid fluff

### 4. Heading Hierarchy
- **Follow proper hierarchy**: H1 → H2 → H3
- **Don't skip levels**: No jumping from H1 to H3
- **Use for structure**: Not for emphasis
- **Bold for emphasis** instead: `**Important concept**`

### 5. External & Internal Links
- **Internal links**: Link to related topics (minimum 2-3 per page)
- **External links**: Reference authoritative sources (open in new tab)
- **Anchor text**: Descriptive, keyword-rich
- **Example**: 
  ```markdown
  [Learn more about SQL Joins](/level-1-foundations/sql/#joins)
  ```

### 6. Meta Description Best Practices
✅ **Good Examples:**
- "Master SQL fundamentals with practical examples. Learn SELECT, WHERE, JOINs, aggregation, and data modification. Complete beginner's guide."
- "Comprehensive Python guide covering data types, OOP, generators, concurrency, and best practices for data engineering."

❌ **Bad Examples:**
- "SQL basics and commands" (too generic)
- "Learn SQL" (too vague)
- "This page has SQL information about basics and stuff" (unclear)

---

## Markdown Formatting

### Bold for Key Concepts
Use `**Term**` to highlight important concepts:
```markdown
**SQL Fundamentals** is the foundation of database management.
**ACID properties** ensure transaction reliability.
```

### Code Formatting
Inline code: `` `SELECT * FROM table` ``
- Use for: SQL keywords, column names, variable names

### Code Blocks
Triple backticks with language specification:
```markdown
\`\`\`sql
SELECT column1, column2
FROM table_name
WHERE condition;
\`\`\`
```

**Language Identifiers to Use:**
- `sql` - SQL queries
- `python` - Python code
- `javascript` - JavaScript/Node.js
- `bash` - Command line
- `json` - JSON format
- `yaml` - YAML configuration

### Lists
**Ordered lists** for sequential steps:
```markdown
1. First step
2. Second step
3. Third step
```

**Unordered lists** for non-sequential items:
```markdown
- Item 1
- Item 2
- Item 3
```

**Nested lists** for hierarchical information:
```markdown
- Main point
  - Sub-point 1
  - Sub-point 2
```

### Tables
Use markdown tables for comparisons:
```markdown
| Feature | SQL | NoSQL |
|---------|-----|-------|
| Schema | Structured | Flexible |
| ACID | Yes | No |
```

### Blockquotes
Use sparingly for important notes:
```markdown
> **Important**: Always use WHERE in DELETE queries to avoid removing all data.
```

---

## Code Examples

### SQL Examples
- **Always include comments** explaining what the query does
- **Use consistent naming**: Lowercase keywords, CamelCase for identifiers
- **Include alias**: Use table aliases for multi-table queries
- **Format consistently**: Proper indentation and line breaks

```sql
-- ✅ Good: Clear, commented, properly formatted
SELECT 
    e.employee_name,           -- Employee name column
    d.department_name,         -- Department name
    e.salary
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
WHERE e.salary > 50000
ORDER BY e.salary DESC;

-- ❌ Avoid: Unclear, no comments, poor formatting
select e.employee_name,d.department_name,e.salary from employees e inner join departments d on e.department_id=d.id where e.salary>50000 order by e.salary desc;
```

### Python Examples
- Include docstrings for functions
- Use meaningful variable names
- Include comments for complex logic

```python
def calculate_average_salary(employees):
    """Calculate average salary from employee list."""
    if not employees:
        return 0
    return sum(emp['salary'] for emp in employees) / len(employees)
```

---

## Internal Linking

### When to Link
- **Related topics**: Link to prerequisite or advanced topics
- **Cross-references**: Link to examples of concepts
- **Navigation**: Link to parent/sibling sections
- **Minimum**: 2-3 internal links per page

### Link Format
```markdown
[Link Text](/path/to/page/) or [Link Text](/path/to/page/#section)
```

### Link Examples
- ✅ `[Learn about JOINs](/level-1-foundations/sql/#joins)`
- ✅ `[SQL Interview Questions](/level-1-foundations/sql/)`
- ✅ `[Advanced Queries](/level-3-technologies/databases/bigquery/)`
- ❌ `[Click here](/level-1-foundations/sql/)` (non-descriptive)

---

## Directory Organization

### Structure
```
level-1-foundations/
├── data-structure/
│   └── index.md (single page: concepts + interview/coding questions)
├── python/
│   ├── index.md (landing, links to theory + practice)
│   ├── theory.md (conceptual interview Q&A)
│   └── practice.md (coding problems)
└── sql/
    └── index.md (single page: concepts + interview questions)
```

### Naming Conventions
- **Lowercase**: All file names lowercase
- **Hyphens**: Use hyphens for multiple words
- **Examples**: `data-structures.md`, `data-modeling.md`

### Folder Types
- **index.md**: The topic's page for single-page topics; a short landing page for the handful of topics with more than one page (currently only Python — see [Content Page Pattern](#content-page-pattern))
- **theory.md** / **practice.md**: Only exist where a topic has an explicit format-based exception (currently only Python)

---

## Meta Tags & Robots

### Current Meta Tags (Site-Wide)
The site currently has:
```html
<meta name="robots" content="noindex, nofollow">
```

### When Launching to Real Domain
**Remove noindex** from `astro.config.mjs`:
1. Find the `head` configuration in starlight integration
2. Remove the robots meta tag
3. Rebuild and deploy

### robots.txt (After Launch)
Create `/public/robots.txt`:
```text
User-agent: *
Allow: /
Disallow: /admin/
Sitemap: https://yourdomain.com/sitemap.xml
```

---

## Page-Specific Guidelines

### Index Pages (Overviews)
- **Length**: 200-400 words
- **Purpose**: Introduce topic and guide to subtopics
- **Content**:
  - Topic overview
  - List of subtopics with brief descriptions
  - Links to detailed pages
  
**Example Structure:**
```markdown
# Topic Name

[Introduction paragraph]

## Topics Covered
- [Topic 1](#): Brief description
- [Topic 2](#): Brief description
- [Topic 3](#): Brief description

Essential context about why this matters.
```

### Topic Pages (default, single page)
- **Length**: 1,500-2,500 words
- **Purpose**: Interview-ready understanding of one concept or technology
- **Content**: Quick Summary → Key Concepts → Interview Questions (`QuestionCard`/`QuestionList`) → Common Interview Scenarios → Further Reading — see [Content Page Pattern](#content-page-pattern)

### Theory Pages (Python exception only)
- **Length**: 2,000-3,000 words
- **Purpose**: Interview questions on concepts and design principles
- **Content**: `QuestionCard`/`QuestionList` entries covering concept definitions, context, use cases, and advanced considerations

### Practice Pages (Python and Data Structures)
- **Length**: 1,500-2,500 words minimum
- **Purpose**: Prepare for interviews with hands-on coding exercises
- **Content**: `QuestionCard`/`QuestionList` entries covering real-world scenarios, edge cases, and solution walkthroughs

---

## Checklist for New Pages

Before publishing a new page, verify:

### Content Quality
- [ ] NO explicit H1 in markdown (frontmatter title renders as H1 automatically)
- [ ] First markdown heading is H2 (not H1)
- [ ] Table of contents present (if 5+ sections)
- [ ] Minimum 300 words per section
- [ ] All code examples have comments
- [ ] Page length appropriate for type (basics/theory/practice)

### SEO
- [ ] Title follows format: `[Topic] | [Context]`
- [ ] Description is 150-160 characters
- [ ] Primary keyword in first 100 words
- [ ] Minimum 2-3 internal links
- [ ] Proper heading hierarchy (H1 → H2 → H3)
- [ ] Meta description is compelling

### Formatting
- [ ] No commented-out H1
- [ ] Consistent markdown formatting
- [ ] Code blocks have language identifiers
- [ ] Bold used for key concepts
- [ ] Tables use proper markdown syntax
- [ ] No spelling or grammar errors

### Structure
- [ ] Frontmatter properly formatted
- [ ] File in correct directory
- [ ] File name follows conventions (lowercase, hyphens)
- [ ] Links use correct format and paths
- [ ] All links point to existing pages

### Final Check
- [ ] Build runs successfully: `npm run build`
- [ ] Page displays correctly at dev server
- [ ] All links are working
- [ ] No console errors or warnings

---

## Example: Complete Page Template

```markdown
---
title: [Topic] | [Context/Level]
description: [Detailed description with keywords, 150-160 characters]
---

# [Main Topic]: [Subtitle]

**[One-sentence value proposition or context]**

## Table of Contents
- [Section 1](#section-1)
- [Section 2](#section-2)

---

## Section 1

[Introduction to concept with context and keywords naturally included]

### Subsection 1.1

[Detailed explanation with code examples]

```sql
-- Example code with comments
SELECT * FROM table
```

[Explanation of example and use cases]

---

## Section 2

[Continue with similar structure]

---

## Next Steps

- [Link to related topic](/path/)
- [Link to advanced topic](/path/)
```

---

## Common Mistakes to Avoid

❌ **Explicit H1 in markdown**: Creates duplicate title rendering
```markdown
# Title
## Title (repeated)
```
✅ **Correct**: Remove markdown H1, let frontmatter render as H1
```markdown
## Title: Descriptive Subtitle
```

❌ **Commented H1**: `<!-- # Title -->`  
✅ **Correct**: Don't include H1 in markdown at all

❌ **Generic description**: `SQL questions and answers`  
✅ **Keyword-rich description**: `Master SQL fundamentals with practical examples. Learn SELECT, WHERE, JOINs, and aggregation functions.`

❌ **Vague links**: `[Click here](#)`  
✅ **Descriptive links**: `[Learn about SQL JOINs](/level-1-foundations/sql/#joins)`

❌ **No code comments**: Code blocks without explanation  
✅ **Well-commented code**: Inline comments explaining purpose and syntax

❌ **Poor structure**: Random headings, no hierarchy  
✅ **Logical structure**: Clear frontmatter title → H2 → H3 hierarchy

❌ **No internal links**: Isolated pages  
✅ **Connected content**: 2-3 internal links per page to related topics

---

## Tools & Commands

### Build and Test Locally
```bash
# Build the project
npm run build

# Start development server
npm run dev

# Deploy to Cloudflare
npm run deploy
```

### Check for Issues
- Run build to catch syntax errors
- Check dev server at `http://localhost:4321/`
- Verify all internal links work
- Check page appears in sitemap

---

## Questions or Updates?

When modifying guidelines, update this document to reflect changes. Keep this document as the single source of truth for content standards.

`.kiro/specs/content-organization-plan.md` has been retired (2026-07-21) — its directory structure was already built, and its still-relevant content template is now the Pattern B definition above. Its unexecuted extras (frontmatter `difficulty`/`timeEstimate`/`prerequisites` fields, a dedicated "Learning Path" page) were never adopted anywhere in the codebase and are not part of the current plan; revisit only if a real need shows up.

---

**Last Updated**: July 21, 2026  
**Status**: Active - All new pages should follow these guidelines
