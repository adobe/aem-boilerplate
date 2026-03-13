# Metadata Extraction

Extract and map metadata from source webpages to standard metadata structure.

## Purpose

Metadata extraction preserves SEO and social sharing properties when migrating pages. This resource explains how to map source page metadata to standard properties.

## Key Principles

### Leverage Platform Defaults

The platform automatically generates metadata from page content when not explicitly provided:

- **Title** → Defaults to first H1
- **Description** → Defaults to first paragraph (10+ words)
- **Image** → Defaults to first image or `/default-meta-image.png`
- **Canonical** → Auto-generated from production domain

**Only include metadata when it differs from defaults.**

### Special Properties

The platform provides convenience properties that auto-populate multiple metadata tags:

- `title` → Auto-populates `og:title`, `twitter:title`, `<title>`
- `description` → Auto-populates `og:description`, `twitter:description`
- `image` → Auto-populates `og:image`, `og:image:secure_url`, `twitter:image`

**Use these instead of separate og:* and twitter:* properties.**

## Metadata Extraction Process

Metadata is extracted automatically by the `analyze-webpage.js` script during Step 1 of page import. The script collects:

- `<title>` tag content
- All `<meta>` tags (both `name` and `property` attributes)
- `<link rel="canonical">` href
- JSON-LD structured data (`<script type="application/ld+json">`)

## Mapping to Standard Properties

Use the `metadata-mapping.md` resource for detailed mapping rules. Key decision points:

### Title Mapping

**Decision tree:**
```
Source has <title> tag?
├─ Matches first H1 on page?
│  └─ Omit (use platform default)
└─ Differs from first H1?
   └─ Include as "title" property
```

**Example:**
- Source title: "Buy Widgets Online | WidgetCo"
- First H1: "Buy Widgets Online"
- Decision: Include title (adds brand name, differs from H1)

### Description Mapping

**Decision tree:**
```
Source has meta description?
├─ Matches first paragraph?
│  └─ Consider omitting (use platform default)
├─ More descriptive than first paragraph?
│  └─ Include as "description" property
└─ Differs significantly?
   └─ Include as "description" property
```

**Quality requirements:**
- 150-160 characters ideal
- Unique per page
- Actionable and compelling

### Image Mapping

**Decision tree:**
```
Source has og:image?
├─ Matches first content image?
│  └─ Consider omitting (use platform default)
├─ Custom social image?
│  └─ Include as "image" property
└─ No og:image?
   └─ Check first image, omit if suitable
```

**Quality requirements:**
- Absolute URL (or correct relative path)
- 1200x630 pixels recommended for social sharing
- Appropriate for social preview

### Canonical Mapping

**Decision tree:**
```
Source has canonical link?
├─ Points to same page?
│  └─ Omit (platform auto-generates)
├─ Points to different page?
│  └─ Include as "canonical" property (syndicated content)
└─ Uses .html extension?
   └─ Include, or use bulk metadata for extension pattern
```

### Tags Mapping

**Sources:**
- `<meta name="keywords">` content
- `<meta property="article:tag">` (multiple tags)
- `<meta name="news_keywords">`

**Mapping:**
```
Multiple sources?
└─ Combine into comma-separated "tags" property
   Example: "e-commerce, widgets, online shopping"
```

### Properties to Skip

**Technical metadata (belongs in head.html):**
- `viewport`
- `charset`
- `X-UA-Compatible`
- `theme-color`

**Auto-populated by platform (redundant):**
- `og:url` (use canonical instead)
- `og:title` (use title instead)
- `og:description` (use description instead)
- `twitter:title` (use title instead)
- `twitter:description` (use description instead)
- `twitter:image` (use image instead)

## Handling JSON-LD Structured Data

JSON-LD can contain valuable structured data. Decision tree:

```
Has JSON-LD?
│
├─ Page-specific schema (Article, Product, Event)?
│  │
│  ├─ Small payload (<500 chars)?
│  │  └─ Include in metadata block
│  │
│  └─ Large payload?
│     └─ Implement in client-side JS decoration
│
└─ Site-wide schema (Organization, WebSite)?
   └─ Move to head.html (applies to all pages)
```

**Example - Include in metadata:**
```html
<div>
  <div class="metadata">
    <div>
      <div>schema.org</div>
      <div>{"@context":"https://schema.org","@type":"Article",...}</div>
    </div>
  </div>
</div>
```

**Example - Move to head.html:**
```html
<!-- head.html -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "WidgetCo",
  "url": "https://widgetco.com"
}
</script>
```

## Generating the Metadata Block

### HTML Format

Place at the end of `<main>` content, before closing `</main>` tag:

```html
<div>
  <div class="metadata">
    <div>
      <div>title</div>
      <div>Buy Widgets Online | WidgetCo</div>
    </div>
    <div>
      <div>description</div>
      <div>Shop our extensive collection of high-quality widgets with fast shipping and expert support.</div>
    </div>
    <div>
      <div>image</div>
      <div><img src="./media_social-image.jpg" alt="WidgetCo social preview"></div>
    </div>
    <div>
      <div>tags</div>
      <div>e-commerce, widgets, online shopping</div>
    </div>
  </div>
</div>
```

### Markdown Format

Place at the end of the document:

```markdown
---

## Metadata

| Property    | Value                                                                           |
|-------------|---------------------------------------------------------------------------------|
| title       | Buy Widgets Online \| WidgetCo                                                  |
| description | Shop our extensive collection of high-quality widgets with fast shipping.       |
| image       | ![WidgetCo social preview](./media_social-image.jpg)                            |
| tags        | e-commerce, widgets, online shopping                                            |
```

## Documenting Decisions

When generating metadata blocks, document why properties were included or omitted:

```markdown
## Metadata Decisions

### Included Properties
- **title**: "Buy Widgets Online | WidgetCo" - Differs from H1, includes brand
- **description**: Custom SEO description - More compelling than first paragraph
- **image**: ./media_social-image.jpg - Custom social image, not first content image
- **tags**: "e-commerce, widgets, online shopping" - Mapped from article:tag properties

### Omitted Properties
- **canonical**: Points to same page URL - platform will auto-generate
- **og:title, twitter:title**: Redundant - platform auto-populates from title
- **og:description**: Redundant - platform auto-populates from description
- **viewport**: Technical metadata - Belongs in head.html

### Recommendations
- Consider bulk metadata sheet if many pages use canonical with .html extension
- Monitor social preview rendering (Twitter Card Validator, Facebook Debugger)
```

## Quality Checks

Before finalizing the metadata block:

- ✅ **Title**: Under 60 characters (55-60 ideal)
- ✅ **Description**: 150-160 characters
- ✅ **Image**: Absolute URL or correct relative path
- ✅ **Image**: 1200x630 pixels for optimal social sharing
- ✅ **No redundancy**: Removed og:*/twitter:* properties that platform auto-populates
- ✅ **Defaults leveraged**: Omitted properties that match platform defaults

## Troubleshooting

### No metadata found

**Cause:** Page has minimal or no metadata tags

**Solution:** Extract defaults from page content:
- Title → First H1
- Description → First paragraph (if 10+ words)
- Image → First image with suitable dimensions

### Inconsistent metadata

**Cause:** `<title>`, `og:title`, `twitter:title` all differ

**Solution:**
1. Identify most appropriate version (usually og:title or <title>)
2. Document the inconsistency in decision notes
3. Recommend to user if clarification needed

### Large JSON-LD payload

**Cause:** Complex structured data (>500 characters)

**Solution:**
- Don't include in metadata block (bloats page)
- Recommend client-side JS decoration (load async)
- Or move to head.html if site-wide

### Relative image URLs

**Cause:** `og:image` is relative path, not absolute

**Solution:**
```javascript
// Convert relative to absolute
const baseUrl = new URL(sourceUrl).origin;
const absoluteImageUrl = new URL(relativeImagePath, baseUrl).href;
```

## Related Resources

- **metadata-mapping.md** - Comprehensive mapping rules and examples
- https://www.aem.live/docs/metadata - Platform metadata documentation
- https://www.aem.live/developer/block-collection/metadata - Metadata block reference

## Integration Notes

The metadata extraction process is integrated into the page-import workflow:

1. **Step 1**: `analyze-webpage.js` extracts raw metadata from source page
2. **Step 2-3**: Analyze content structure (identify H1, first paragraph, first image)
3. **Step 4**: Map metadata to standard properties, generate metadata block
4. **Step 5**: Append metadata block to end of generated HTML (unless user explicitly skips)

The metadata block is included by default. To skip: user must explicitly request "no metadata" or "skip metadata".
