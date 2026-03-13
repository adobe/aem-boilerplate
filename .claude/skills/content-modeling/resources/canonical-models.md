# The 4 Canonical Block Models

AEM Edge Delivery Services has 4 canonical patterns for structuring block content. These proven patterns can inform your design and help you create effective, author-friendly content structures.

## Model Selection Guide

| Model | When to Use | Examples |
|-------|-------------|----------|
| **Standalone** | Distinct visual or narrative elements | Hero, Blockquote |
| **Collection** | Repeating semi-structured content | Cards, Carousel |
| **Configuration** | API-driven or dynamic content where config controls display | Blog Listing, Search Results |
| **Auto-Blocked** | Simplifying authoring of complex structures and block nesting | Tabs, YouTube Embed |

---

## 1. Standalone Model

### Description

Self-contained blocks using rows or columns as needed for their unique structure. Best for elements that appear once or a few times on a page with a distinct purpose.

### Characteristics

- Unique, one-off structure
- Rows and columns organized for the specific content needs
- Each instance is typically different from others
- Structure carries the semantics of the content

### When to Use

- Hero sections
- Blockquotes
- Feature callouts
- Unique page sections
- Any element with a distinct visual or narrative purpose

### Good Example: Hero Block

```markdown
| Hero |
|------|
| ![Hero image](hero.jpg) |
| # Welcome to Our Site |
| Discover amazing content and start your journey today. [Get Started](cta-link) |
```

**Why this works:**
- ✅ Uses semantic formatting: H1 identifies the heading, paragraphs for body text
- ✅ Flexible structure: could also work with image and text in columns, or all in one cell
- ✅ Decoration code can find elements using query selectors regardless of exact layout
- ✅ Author-friendly: natural content authoring

**Note on flexibility:**
These variations would also work with proper decoration code:
- Image and text in separate columns: `| ![Image](hero.jpg) | # Heading<p>Description text [CTA](link)</p> |`
- All content in one cell: `| ![Image](hero.jpg)<h1>Heading</h1><p>Description text [CTA](link)</p> |`
- Image in one row, heading and text in another (as shown above)
- The key is semantic formatting (H1 for heading, paragraph text, links for CTA), not rigid cell positions

### Bad Example: Hero Block (Anti-Pattern)

```markdown
| Hero |
|------|
| ![Image](hero.jpg) | Welcome | Discover content | Get Started | /cta-link | dark |
```

**Why this fails:**
- ❌ 6 cells in one row (exceeds maximum of 4)
- ❌ Non-semantic: text split across multiple unlabeled cells
- ❌ Split related text across cells unnecessarily
- ❌ Configuration-style variant control in "dark" cell (should use block variant class)
- ❌ Unpredictable: authors must remember which cell is which
- ❌ Author-hostile: too many required cells, no semantic formatting

**How to fix:**
- Simplify to under 4 cells per row
- Use semantic formatting (H1 for heading, paragraphs for text, links for CTA) instead of splitting into separate cells
- Use block variant `| Hero (Dark) |` instead of config cell
- Let decoration code find elements via query selectors, don't require specific cell positions

---

## 2. Collection Model

### Description

Each row represents an item, with columns defining the parts of that item. Ideal for repeating, semi-structured content where each instance follows the same pattern.

### Characteristics

- Rows represent individual items
- Columns are consistent across all rows
- Items have the same structure but different content
- Easy to add/remove items by adding/removing rows

### When to Use

- Card grids
- Carousels
- Image galleries
- Feature lists
- Team member listings
- Any repeating set of similar items

### Good Example: Cards Block

```markdown
| Cards |
|-------|
| ![Product 1](product1.jpg) | ## Product Name<p>High-quality product description goes here.</p><p>[Learn More](link1)</p> |
| ![Product 2](product2.jpg) | ## Another Product<p>Different product with its own description.</p><p>[Learn More](link2)</p> |
| ![Product 3](product3.jpg) | ## Third Product<p>More details about this product offering.</p><p>[Learn More](link3)</p> |
```

**Why this works:**
- ✅ Collection model: each row is one card
- ✅ 2 columns: image and content
- ✅ Consistent structure across all rows
- ✅ Semantic formatting: H2 for card title, paragraph text for description, links for CTA
- ✅ Easy to add/remove cards (add/remove rows)
- ✅ Within 4-cell maximum

**Resulting structure:**
- Each row becomes one card
- Column 1: Card image
- Column 2: Card heading (H2), description (paragraph), and CTA link - decoration code uses query selectors to identify each element

### Bad Example: Cards Block (Anti-Pattern)

```markdown
| Cards |
|-------|
| config | style | grid |
| ![Product 1](product1.jpg) |
| Product Name |
| High-quality product description |
| [Learn More](link1) |
| ![Product 2](product2.jpg) |
| Another Product |
| Different product description |
| [Learn More](link2) |
```

**Why this fails:**
- ❌ Mixing configuration row with content rows
- ❌ Non-semantic: first row should use block variant instead
- ❌ Each card uses 4 separate rows instead of 1 row with columns
- ❌ Unpredictable: hard to tell where one card ends and another begins
- ❌ Author-unfriendly: difficult to add/remove cards
- ❌ Requires counting rows to understand structure

**How to fix:**
- Remove config row, use variant: `| Cards (Grid) |`
- Use columns instead of rows for each card's parts
- One row = one complete card

### Bad Example: Cards with Header Row (Anti-Pattern)

```markdown
| Cards |
|-------|
| Image | Content |
| ![Product 1](product1.jpg) | ## Product Name<p>High-quality product description.</p> |
| ![Product 2](product2.jpg) | ## Another Product<p>Different description.</p> |
```

**Why this fails:**
- ❌ Header row with cell names makes it spreadsheet-like
- ❌ First row (`| Image | Content |`) is not actual content - it's just labels
- ❌ Authors must understand to skip the first row
- ❌ Decoration code must filter out the header row
- ❌ Creates confusion about what is content vs. structure

**How to fix:**
- Remove the header row entirely
- Let semantic formatting and decoration code identify parts of each card
- Each row should be actual content, not labels

---

## 3. Configuration Model

### Description

Two-column key/value pairs for settings or parameters. Use ONLY for API-driven or dynamic content where configuration actually controls behavior or data fetching.

### Characteristics

- Two columns: key (left) and value (right)
- Controls behavior, not content structure
- Often drives API calls or dynamic data
- Minimal visual content

### When to Use

- Blog listings (sort order, filters)
- Search results (query parameters)
- Dynamic data displays
- API-driven components
- True behavioral configuration

### ⚠️ Important Warning

**Do NOT use Configuration model when:**
- Standalone or Collection model would work
- You're just displaying static content
- Configuration could be handled by block variants
- Authors are providing content, not controlling behavior

Configuration models are often overused. Always ask: "Does this truly need dynamic configuration, or am I just making authoring harder?"

### Good Example: Blog Listing Block

```markdown
| Blog Listing |
|--------------|
| limit | 10 |
| sort | date-desc |
| tags | technology,news |
```

**Why this works:**
- ✅ Truly configuration-driven (controls API query)
- ✅ Two-column key/value pairs
- ✅ No visual content (pure config)
- ✅ Controls dynamic behavior (fetch and display blog posts)
- ✅ Appropriate use case for Configuration model

**Resulting behavior:**
- Fetches 10 most recent posts
- Sorted by date descending
- Filtered to posts tagged with "technology" or "news"

### Bad Example: Blockquote (Anti-Pattern)

```markdown
| Blockquote |
|------------|
| text | The best way to predict the future is to invent it. |
| author | Alan Kay |
| style | bordered |
| background | light-gray |
```

**Why this fails:**
- ❌ This is static content, not dynamic configuration
- ❌ Should be Standalone model, not Configuration
- ❌ "style" and "background" should be block variants
- ❌ Forces authors to label their own content
- ❌ More complex than necessary

**How to fix:**
Use Standalone model with semantic formatting:

```markdown
| Blockquote (Bordered, Light) |
|-------------------------------|
| The best way to predict the future is to invent it. |
| *Alan Kay* |
```

- Use block variants for styling
- Use semantic formatting (italic) for attribution
- Let structure speak for itself

---

## 4. Auto-Blocked Model

### Description

Content authored as default content that gets automatically converted into blocks based on pattern detection. Simplifies authoring of complex structures by hiding the "block-ness" from authors.

### Characteristics

- Authors write standard content
- Pattern detection creates blocks automatically
- "Magical" author experience
- Good for common, predictable patterns
- Reduces authoring complexity

### When to Use

- Tab interfaces (heading patterns)
- YouTube embeds (URL detection)
- Common content patterns
- Nested block structures
- Whenever you can hide complexity from authors

### Good Example: Tabs (Auto-Blocked)

**What authors write - three separate sections, each with section metadata:**

```markdown
| Section Metadata |
|------------------|
| style | tabs |

## Getting Started

Follow these steps to set up your account and configure your preferences.

| Hero |
|------|
| ![Welcome](welcome.jpg) | # Welcome<p>Start your journey here.</p> |

---

| Section Metadata |
|------------------|
| style | tabs |

## Advanced Features

Learn about advanced capabilities once you're comfortable with the basics.

- Feature 1: Real-time collaboration
- Feature 2: Advanced analytics
- Feature 3: Custom integrations

---

| Section Metadata |
|------------------|
| style | tabs |

## Troubleshooting

Common issues and how to resolve them quickly.

| Cards |
|-------|
| ![Issue 1](issue1.jpg) | ## Login Problems<p>How to reset your password.</p> |
| ![Issue 2](issue2.jpg) | ## Performance Issues<p>Tips for optimizing performance.</p> |

---
```

**What gets created - auto-blocked into one tabs block:**

```html
<div class="tabs">
  <div>
    <div><h2>Getting Started</h2></div>
    <div>
      <p>Follow these steps to set up your account and configure your preferences.</p>
      <div class="hero"><!-- Hero block content --></div>
    </div>
  </div>
  <div>
    <div><h2>Advanced Features</h2></div>
    <div>
      <p>Learn about advanced capabilities once you're comfortable with the basics.</p>
      <ul>
        <li>Feature 1: Real-time collaboration</li>
        <li>Feature 2: Advanced analytics</li>
        <li>Feature 3: Custom integrations</li>
      </ul>
    </div>
  </div>
  <div>
    <div><h2>Troubleshooting</h2></div>
    <div>
      <p>Common issues and how to resolve them quickly.</p>
      <div class="cards"><!-- Cards block content --></div>
    </div>
  </div>
</div>
```

**Why this works:**
- ✅ Authors create natural sections (separated by `---`) with H2 headings and content
- ✅ Section metadata (`style | tabs`) signals intent to auto-block
- ✅ Multiple consecutive sections with `style | tabs` metadata get merged into one tabs block
- ✅ Each section becomes one tab: H2 = tab title, everything else = tab content
- ✅ No need to understand block syntax
- ✅ Can mix default content and blocks within tab content
- ✅ Simplifies complex authoring
- ✅ Feels "magical" when it works

### Good Example: YouTube Embed (Auto-Blocked)

**What authors write:**

```markdown
![Video preview image](video-preview.jpg)
https://www.youtube.com/watch?v=dQw4w9WgXcQ
```

**What gets created:**

```html
<div class="embed embed-youtube">
  <div>
    <div>
      <picture>
        <img src="video-preview.jpg" alt="Video preview image">
      </picture>
    </div>
    <div>
      <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">https://www.youtube.com/watch?v=dQw4w9WgXcQ</a>
    </div>
  </div>
</div>
```

**Why this works:**
- ✅ Authors just paste image and URL in sequence
- ✅ Pattern detection creates the embed block
- ✅ Image immediately preceding YouTube URL becomes the preview/poster image
- ✅ If no image, block still works with just the URL
- ✅ Minimal author effort
- ✅ Consistent behavior

### When NOT to Use Auto-Blocked

Auto-blocking requires:
- Predictable, detectable patterns
- Implementation of auto-blocking logic in `scripts.js`
- Patterns that are truly common and repeatable

Don't create auto-blocking for:
- One-off special cases
- Complex patterns that are hard to detect reliably
- Cases where explicit blocks would be clearer

---

## Choosing the Right Model

Content modeling is an art, not a science. There are often multiple valid approaches, and the "right" model depends on context, authoring needs, and implementation constraints.

**Review the detailed examples above** for each canonical model to understand their characteristics, strengths, and when they're most appropriate. Pay special attention to the "Why this works" and "Why this fails" explanations.

**Key considerations:**
- **Standalone** is the most flexible and often a safe default choice
- **Collection** works well when you have clear repeating items
- **Configuration** is frequently overused - only use for truly dynamic, API-driven content
- **Auto-Blocked** requires careful pattern design but can be worth it to make authors' lives easier

When in doubt, start with Standalone or Collection - they're simpler and more author-friendly than Configuration or Auto-Blocked.

### Common Mistakes

**Using Configuration when Standalone/Collection would work:**
```markdown
❌ BAD (unnecessary config)
| Card |
|------|
| image | hero.jpg |
| title | Welcome |

✅ GOOD (Standalone)
| Card |
|------|
| ![Welcome](hero.jpg) |
| **Welcome** |
```

**Using Standalone when Collection would work:**
```markdown
❌ BAD (repeating standalone pattern)
Multiple separate blocks for each card

✅ GOOD (Collection)
| Cards |
|-------|
| ![Card 1](img1.jpg) | **Title 1** |
| ![Card 2](img2.jpg) | **Title 2** |
```

**Over-engineering Auto-Blocked:**
```markdown
❌ BAD (complex pattern for rare use case)
Auto-detecting "testimonial quotes" by looking for:
- Italic paragraphs
- Followed by bold text
- In specific section types
Only appears 2-3 times on entire site, not worth the complexity

✅ GOOD (explicit block for clarity)
| Blockquote |
|------------|
| This product changed how we work. Absolutely essential. |
| *Sarah Johnson, CEO* |

Simple, clear, and easy for authors to create when needed
```

## Summary

- **Standalone**: Unique elements, flexible structure
- **Collection**: Repeating items, rows = items, columns = parts
- **Configuration**: Dynamic behavior only, not static content
- **Auto-Blocked**: Common patterns, "magical" authoring

When in doubt, prefer simpler models (Standalone or Collection) over complex ones (Configuration or Auto-Blocked).
