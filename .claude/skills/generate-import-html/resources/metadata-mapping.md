# Metadata Mapping Reference

Detailed mapping rules for converting source webpage metadata to standard metadata properties.

## Special Properties Reference

### canonical
- **Used in:** `<link rel="canonical">`, `<meta property="og:url">`, `<meta name="twitter:url">`
- **Default:** Auto-generated using production domain
- **When to include:** Only if pointing to different page (e.g., syndicated content)

### canonical:extension
- **Purpose:** Defines file extension for canonical URLs (e.g., `.html`)
- **Best practice:** Use in bulk metadata sheet for site-wide consistency
- **Example:** `canonical:extension: .html`

### description
- **Used in:** `<meta name="description">`, `<meta property="og:description">`, `<meta name="twitter:description">`
- **Default:** First paragraph with 10+ words
- **When to include:** Only if custom description needed for SEO/social

### image
- **Used in:** `<meta property="og:image">`, `<meta property="og:image:secure_url">`, `<meta name="twitter:image">`
- **Default:** First image on page, or `/default-meta-image.png`
- **When to include:** Custom social sharing image
- **Requirements:** Absolute URL, 1200x630 recommended

### title
- **Used in:** `<title>`, `<meta property="og:title">`, `<meta name="twitter:title">`
- **Default:** First H1 on page
- **When to include:** Only if differs from first H1

### title:suffix
- **Purpose:** Automatically appends suffix to title (e.g., `| Adobe`)
- **Best practice:** Use in bulk metadata sheet
- **Example:** `title:suffix: | Adobe`

### tags
- **Rendered as:** `<meta property="article:tag">` (one per tag)
- **Format:** Comma-separated or bullet list
- **Example:** `web development, edge delivery, performance`

### json-ld
- **Rendered as:** `<script type="application/ld+json">`
- **Note:** Consider client-side JS or head.html as alternatives
- **Use case:** Page-specific structured data

---

## Detailed Mapping Rules

### Title Mapping

```
Source                    → Property
──────────────────────────────────────────
<title>                   → title (only if differs from first H1)
og:title                  → title (if different from <title>)
twitter:title             → title (if different from <title>)

Note: Platform auto-populates og:title and twitter:title from title
```

**Decision Logic:**
1. Extract `<title>`, `og:title`, `twitter:title` from source
2. If all consistent → Use single `title` property
3. If inconsistent → Document conflict, choose best one (typically `<title>`)
4. If title will match first H1 in content → Omit (rely on platform default)

**Examples:**

```markdown
# Scenario 1: Consistent title, differs from H1
Source:
  <title>About Us | Acme Corp</title>
  <meta property="og:title" content="About Us | Acme Corp">
  <meta name="twitter:title" content="About Us | Acme Corp">
  Page has H1: "About Our Company"

Metadata:
  title: About Us | Acme Corp

Reason: Title is consistent across sources but differs from H1
```

```markdown
# Scenario 2: Title matches H1
Source:
  <title>About Our Company</title>
  Page has H1: "About Our Company"

Metadata:
  (omit title property)

Reason: Platform will use H1 as default
```

```markdown
# Scenario 3: Inconsistent titles
Source:
  <title>About Us | Acme Corp</title>
  <meta property="og:title" content="Learn About Acme Corporation">

Metadata:
  title: About Us | Acme Corp

Note: Document the conflict. Chose <title> as primary.
Alternative: Use og:title value if it's better for social sharing.
```

---

### Description Mapping

```
Source                    → Property
──────────────────────────────────────────
<meta name="description"> → description
og:description            → description (if different from meta description)
twitter:description       → description (if different from meta description)

Note: Platform auto-populates og:description and twitter:description from description
```

**Decision Logic:**
1. Extract all description sources
2. If consistent → Use single `description` property
3. If inconsistent → Choose best one (typically meta description)
4. If matches first paragraph (10+ words) → Consider omitting

**Examples:**

```markdown
# Scenario 1: Consistent description
Source:
  <meta name="description" content="Learn about our company history and values">
  <meta property="og:description" content="Learn about our company history and values">

Metadata:
  description: Learn about our company history and values
```

```markdown
# Scenario 2: Matches first paragraph
Source:
  <meta name="description" content="Welcome to our website">
  First paragraph: "Welcome to our website. We are glad you're here."

Metadata:
  (consider omitting description)

Note: Platform will use first paragraph. Consider if meta description is sufficient.
```

---

### Image Mapping

```
Source                    → Property
──────────────────────────────────────────
og:image                  → image
twitter:image             → image (if different from og:image)

Note: Platform auto-populates og:image and twitter:image from image
```

**Decision Logic:**
1. Prefer `og:image` as primary source
2. If `twitter:image` differs → Choose best or document
3. If image is first image on page → Consider omitting
4. Ensure absolute URL or correct relative path

**Examples:**

```markdown
# Scenario 1: Custom social image
Source:
  <meta property="og:image" content="https://example.com/social-share.jpg">
  First image on page: hero-background.jpg

Metadata:
  image: https://example.com/social-share.jpg

Reason: Custom social sharing image differs from first page image
```

```markdown
# Scenario 2: Matches first image
Source:
  <meta property="og:image" content="https://example.com/hero.jpg">
  First image on page: https://example.com/hero.jpg

Metadata:
  (consider omitting image)

Reason: Platform will use first image as default
```

---

### Canonical Mapping

```
Source                         → Property
─────────────────────────────────────────────
<link rel="canonical">         → canonical (only if custom URL needed)
og:url                         → canonical (if consistent with link rel)
twitter:url                    → canonical (if consistent with link rel)

Note: Platform auto-generates canonical if omitted
```

**Decision Logic:**
1. If canonical points to same page → Omit (Platform auto-generates)
2. If canonical points to different page → Include (syndicated content)
3. If URL needs extension → Consider `canonical:extension` in bulk metadata

**Examples:**

```markdown
# Scenario 1: Same page canonical
Source:
  <link rel="canonical" href="https://example.com/about">
  Current page: https://example.com/about

Metadata:
  (omit canonical)

Reason: Platform will auto-generate canonical for same page
```

```markdown
# Scenario 2: Syndicated content
Source:
  <link rel="canonical" href="https://originalsource.com/article">
  Current page: https://example.com/republished-article

Metadata:
  canonical: https://originalsource.com/article

Reason: Points to original source for syndicated content
```

---

### Tags Mapping

```
Source                    → Property
──────────────────────────────────────────
article:tag (multiple)    → tags (comma-separated or bullet list)
keywords                  → tags (if article:tag not present)
```

**Format Options:**
- **Comma-separated:** `tag1, tag2, tag3`
- **Bullet list:** Each tag on new line with bullet

**Examples:**

```markdown
# Scenario 1: Multiple article:tag
Source:
  <meta property="article:tag" content="web development">
  <meta property="article:tag" content="performance">
  <meta property="article:tag" content="edge delivery">

Metadata:
  tags: web development, performance, edge delivery
```

```markdown
# Scenario 2: Keywords fallback
Source:
  <meta name="keywords" content="web, development, seo">
  (no article:tag present)

Metadata:
  tags: web, development, seo
```

---

### Other Standard Properties

```
Source                    → Property
──────────────────────────────────────────
author / article:author   → author
robots                    → robots
article:published_time    → article:published_time
article:modified_time     → article:modified_time
```

**Include these as-is when present and relevant.**

---

## Properties to Skip

### Handled Elsewhere (Not Metadata)

Skip these - they belong in `head.html`:
- `viewport`
- `charset`
- `X-UA-Compatible`
- `theme-color`

### Auto-populated by Platform

Skip these - platform generates from canonical/title/description:
- `og:url` (if same as canonical)
- `twitter:url` (if same as canonical)
- `og:title` (if same as title)
- `twitter:title` (if same as title)
- `og:description` (if same as description)
- `twitter:description` (if same as description)

---

## Metadata Categories

### Essential SEO (always include if present and differs from defaults)
- `title`
- `description`
- `keywords` / `tags`
- `robots`
- `canonical` (if points elsewhere)

### Social Sharing (map to special properties)
- `og:title` → `title`
- `og:description` → `description`
- `og:image` → `image`
- `twitter:title` → `title`
- `twitter:description` → `description`
- `twitter:image` → `image`

### Article/Content (include if content is article-type)
- `article:published_time` → `article:published_time` (keep as-is)
- `article:modified_time` → `article:modified_time` (keep as-is)
- `article:author` → `author`
- `article:tag` → `tags`

### Site-level (consider bulk metadata instead)
- `og:site_name`
- `og:locale`
- `twitter:site`
- `canonical:extension`
- `title:suffix`

---

## JSON-LD Decision Guidelines

### Use Metadata Block (json-ld property)

**When:**
- ✅ Schema is unique to this page
- ✅ Schema uses page-specific data (title, date, author from this page)
- ✅ Quick migration is priority

**Example:**
```json
{
  "@type": "Article",
  "headline": "This Page's Title",
  "datePublished": "2024-01-15",
  "author": "John Doe"
}
```

### Use Client-side JS (scripts.js decoration)

**When:**
- ✅ Schema needs dynamic generation
- ✅ Schema pulls from page content at runtime
- ✅ Want consistency across multiple page types

### Use head.html

**When:**
- ✅ Schema is site-wide (Organization, WebSite)
- ✅ Schema is identical across all pages
- ✅ No page-specific data needed

**Example:**
```json
{
  "@type": "Organization",
  "name": "Acme Corp",
  "url": "https://example.com"
}
```

---

## Quality Guidelines

**Title:**
- Under 60 characters for good SERP display
- Include primary keyword
- Avoid keyword stuffing

**Description:**
- 150-160 characters optimal for SERP display
- Compelling call-to-action
- Include relevant keywords naturally

**Image:**
- Absolute URL or correct relative path
- 1200x630 pixels recommended for social sharing
- Under 1MB file size
- Relevant to page content

**Tags:**
- 3-7 tags per page
- Relevant to content
- Consistent with site taxonomy
