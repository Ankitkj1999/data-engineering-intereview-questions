# Content Guidelines for Data Engineering Interview Questions

## Overview
This document outlines SEO best practices, content standards, and technical requirements for maintaining and adding new pages to the Data Engineering Interview Questions knowledge base.

---

## Table of Contents
1. [Frontmatter Standards](#frontmatter-standards)
2. [Content Structure](#content-structure)
3. [SEO Guidelines](#seo-guidelines)
4. [Markdown Formatting](#markdown-formatting)
5. [Code Examples](#code-examples)
6. [Internal Linking](#internal-linking)
7. [Directory Organization](#directory-organization)
8. [Meta Tags & Robots](#meta-tags--robots)

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
  - Title (frontmatter): `SQL Basics`
  - H1 (markdown): `SQL Basics: Essential Syntax & Commands`
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
- **Use once per page** - Active (not commented out)
- **Format**: `# [Main Topic]: [Descriptive Subtitle]`
- **Purpose**: Provide richer context than the frontmatter title
- **Include**: Subtitle with additional keywords/context
- **Examples**:
  ```markdown
  # SQL Basics: Essential Syntax & Commands
  
  # Python Theory: Core Concepts for Data Engineering
  
  # Data Warehouses: Analytics & OLAP Architecture
  ```

**Important:** Keep frontmatter `title` SHORT (for sidebar), use H1 for fuller description (for page)

### H2 (Section Headers)
- **Use for main topics**: `## [Topic Name]`
- **Include**: Descriptive and SEO-friendly
- **Examples**:
  - `## SQL Fundamentals`
  - `## Data Warehouses vs Databases`
  - `## Aggregation Functions`

### H3 (Subsections)
- **Use for subtopics**: `### [Specific Item]`
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
  [Learn more about SQL Joins](/level-1-foundations/sql/theory/#joins)
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
- ✅ `[Learn about JOINs](/level-1-foundations/sql/theory/#joins)`
- ✅ `[SQL Basics](/level-1-foundations/sql/basics/)`
- ✅ `[Advanced Queries](/level-3-technologies/databases/bigquery/)`
- ❌ `[Click here](/level-1-foundations/sql/theory/)` (non-descriptive)

---

## Directory Organization

### Structure
```
level-1-foundations/
├── data-structure/
│   ├── index.md (overview)
│   ├── practice.md (interview questions)
│   └── theory.md (concepts)
├── python/
│   ├── index.md
│   ├── theory.md
│   ├── practice.md
│   └── basics.md (syntax & fundamentals)
└── sql/
    ├── index.md
    ├── basics.md (syntax & commands)
    ├── theory.md (concepts & design)
    └── practice.md (interview questions)
```

### Naming Conventions
- **Lowercase**: All file names lowercase
- **Hyphens**: Use hyphens for multiple words
- **Examples**: `data-structures.md`, `sql-theory.md`

### Folder Types
- **index.md**: Overview/landing page for the section
- **basics.md**: Practical syntax, commands, and fundamentals
- **theory.md**: Concepts, design principles, architecture
- **practice.md**: Interview questions and scenarios

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

### Basics Pages
- **Length**: 1,500-2,500 words
- **Purpose**: Teach practical syntax and commands
- **Content**:
  - Code examples with explanations
  - Step-by-step tutorials
  - Common use cases
  - Best practices
  - Common mistakes

### Theory Pages
- **Length**: 2,000-3,000 words
- **Purpose**: Explain concepts and design principles
- **Content**:
  - Concept definitions
  - Context and background
  - Use cases and benefits
  - Detailed explanations
  - Advanced considerations

### Practice Pages
- **Length**: 1,500-2,500 words minimum
- **Purpose**: Prepare for interviews
- **Content**:
  - Questions with full answers
  - Real-world scenarios
  - Edge cases and variations
  - Explanation of solutions
  - Common follow-up questions

---

## Checklist for New Pages

Before publishing a new page, verify:

### Content Quality
- [ ] H1 title is active (not commented out)
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

❌ **Commented H1**: `<!-- # Title -->`  
✅ **Active H1**: `# Title`

❌ **Generic description**: `SQL questions and answers`  
✅ **Keyword-rich description**: `Master SQL fundamentals with practical examples. Learn SELECT, WHERE, JOINs, and aggregation functions.`

❌ **Vague links**: `[Click here](#)`  
✅ **Descriptive links**: `[Learn about SQL JOINs](/level-1-foundations/sql/theory/#joins)`

❌ **No code comments**: Code blocks without explanation  
✅ **Well-commented code**: Inline comments explaining purpose and syntax

❌ **Poor structure**: Random headings, no hierarchy  
✅ **Logical structure**: Clear H1 → H2 → H3 hierarchy

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

---

**Last Updated**: June 20, 2026  
**Status**: Active - All new pages should follow these guidelines
