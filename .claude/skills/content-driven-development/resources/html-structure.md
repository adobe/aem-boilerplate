# HTML File Structure for Test Content

When creating local `.plain.html` files for testing blocks in the `drafts/` folder, follow this structure to match how AEM Edge Delivery Services processes authored content.

## Important Change: Plain HTML Format

**The AEM CLI now automatically wraps HTML content with the headful structure (head, header, footer).** When you create `.plain.html` files, you ONLY need to provide the section content.

**What you create:**
- ✅ Section divs with content: `<div>...</div>` (one per section)
- ✅ Blocks as `<div class="block-name">` with nested divs
- ✅ Default content (headings, paragraphs, links, images)
- ✅ Section metadata blocks when needed

**What the AEM CLI adds automatically:**
- ❌ `<html>`, `<head>`, `<body>` tags
- ❌ `<header>` and `<footer>` elements
- ❌ `<main>` wrapper
- ❌ Head content (comes from project's head.html)

## Plain HTML Structure

```html
<div>
  <!-- Section 1: Mixed content - default content and a block -->
  <h1>Page Heading</h1>
  <p>This is regular paragraph content.</p>

  <div class="block-name">
    <!-- Block content goes here -->
    <div>
      <div>Block content cell 1</div>
      <div>Block content cell 2</div>
    </div>
  </div>

  <p>More content after the block.</p>
</div>

<div>
  <!-- Section 2: Block in its own section -->
  <div class="block-name variant-name">
    <!-- Block content -->
  </div>
</div>

<div>
  <!-- Section 3: Multiple blocks in one section -->
  <div class="block-one">
    <!-- First block content -->
  </div>

  <div class="block-two">
    <!-- Second block content -->
  </div>
</div>
```

## File Naming Convention

**IMPORTANT:** HTML files must use the `.plain.html` extension:
- ✅ `drafts/hero-test.plain.html`
- ✅ `drafts/blocks/cards.plain.html`
- ❌ `drafts/hero-test.html` (old format, no longer used)

## Running with Local HTML

**Start dev server with:**
```bash
aem up --html-folder drafts
```

**Preview URLs:**
- File: `drafts/hero-test.plain.html` → URL: `http://localhost:3000/drafts/hero-test`
- File: `drafts/blocks/cards.plain.html` → URL: `http://localhost:3000/drafts/blocks/cards`
- **Special case:** `drafts/blog/index.plain.html` → URL: `http://localhost:3000/drafts/blog/` (NOT `/drafts/`)

## Section Structure

Content is organized into **sections** (top-level `<div>` elements).

### Basic Sections

```html
<div>
  <!-- Section 1 content -->
</div>

<div>
  <!-- Section 2 content -->
</div>
```

**Important notes about sections:**
- Sections can contain blocks, default content, or a mix of both
- A single section can contain multiple blocks
- There are no strict rules about when to create a new section vs. adding to an existing one
- This varies by project and authoring practices
- Some blocks may require or assume they are in their own section (check block documentation)

### Section Metadata

Sections can include metadata to define styling and behavior using a special `section-metadata` div.

**In HTML (using section-metadata div):**
```html
<div>
  <div class="section-metadata">
    <div>
      <div>Style</div>
      <div>dark</div>
    </div>
  </div>
  <!-- Section content with dark background styling -->
</div>
```

**In markdown (Section Metadata table):**
```markdown
+------------------------------+
| Section Metadata             |
+------------------+-----------+
| style            | dark      |
+------------------+-----------+
```

**How it works:**
- The `section-metadata` div is placed at the beginning of a section
- It uses a nested div structure to represent key-value pairs (like a table)
- The platform processes this metadata and applies it to the parent section
- After processing, the `section-metadata` div is removed from the DOM
- Metadata values become CSS classes or data attributes on the section

**Common section styles:**
- `light` - White or light background
- `dark` - Dark background with light text
- `grey` - Grey or off-white background
- `accent` - Branded color background

**Style naming best practices:**
- Use consistent names across sections with same visual treatment
- Don't create unique style names for every section
- Example: If 3 sections have white backgrounds, use "light" for all 3

**Example with multiple sections:**
```html
<!-- Section 1: Light background -->
<div>
  <div class="section-metadata">
    <div>
      <div>Style</div>
      <div>light</div>
    </div>
  </div>
  <div class="hero">
    <div><div><h1>Welcome</h1></div></div>
  </div>
</div>

<!-- Section 2: Dark background -->
<div>
  <div class="section-metadata">
    <div>
      <div>Style</div>
      <div>dark</div>
    </div>
  </div>
  <div class="cards">
    <div>
      <div>Card 1</div>
      <div>Card 2</div>
    </div>
  </div>
</div>

<!-- Section 3: Light background (reuses "light") -->
<div>
  <div class="section-metadata">
    <div>
      <div>Style</div>
      <div>light</div>
    </div>
  </div>
  <h2>About Our Company</h2>
  <p>This section has default content, not blocks.</p>
</div>
```

**For guidance on identifying sections and assigning styles:**
Use the **page-decomposition** skill when migrating pages.

## Section Content Types

Sections can contain any combination of:

### 1. Default Content

Regular HTML elements like headings, paragraphs, lists, etc.

```html
<div>
  <h1>Main Heading</h1>
  <h2>Subheading</h2>
  <p>Paragraph with <strong>bold</strong> and <em>italic</em> text.</p>
  <ul>
    <li>Unordered list item</li>
  </ul>
  <ol>
    <li>Ordered list item</li>
  </ol>
</div>
```

**Supported default elements:**
- Headings: `<h1>`, `<h2>`, `<h3>`, `<h4>`, `<h5>`, `<h6>`
- Paragraphs: `<p>`
- Lists: `<ul>`, `<ol>`, `<li>`
- Inline formatting: `<strong>`, `<em>`, `<a>`
- Images: Use `<picture>` elements with `<source>` and `<img>` tags (see Images section below)
- Code blocks: `<pre>`, `<code>`
- Block quotes: `<blockquote>`

### 2. Blocks

Blocks are `<div>` elements with specific class names that trigger decoration logic.

**Basic block structure:**
```html
<div>
  <div class="block-name">
    <!-- Block content structured based on content model -->
  </div>
</div>
```

**Block with variant:**
```html
<div>
  <div class="block-name variant-name">
    <!-- Block content -->
  </div>
</div>
```

**Multiple variants:**
```html
<div>
  <div class="block-name variant-one variant-two">
    <!-- Block content -->
  </div>
</div>
```

### 3. Icons

Icons are authored using the `:iconName:` syntax and are processed into `<span>` elements with icon classes.

**Author input:**
```
:profile:
```

**HTML output:**
```html
<span class="icon icon-profile"></span>
```

**Important notes about icons:**
- Icons can be wrapped in links, strong, em, or other inline elements
- The icon name corresponds to an SVG file in `/icons/` (e.g., `:profile:` → `/icons/profile.svg`)
- Icon spans use two classes: `icon` (base class) and `icon-{name}` (specific icon)
- Icons are inline elements and can be combined with text

**Examples:**

Icon in a link:
```html
<a href="/profile"><span class="icon icon-profile"></span> View Profile</a>
```

Icon with emphasis:
```html
<strong><span class="icon icon-star"></span> Featured</strong>
```

Icon by itself:
```html
<p><span class="icon icon-home"></span></p>
```

### 4. Images

Images should always use the `<picture>` element with `<source>` elements for responsive images and format optimization.

**Basic picture structure:**
```html
<picture>
  <source type="image/webp" srcset="/media/image.jpg?width=2000&format=webply&optimize=medium" media="(min-width: 600px)">
  <source type="image/webp" srcset="/media/image.jpg?width=750&format=webply&optimize=medium">
  <source srcset="/media/image.jpg?width=2000&format=jpeg&optimize=medium" media="(min-width: 600px)">
  <img loading="lazy" alt="Image description" src="/media/image.jpg?width=750&format=jpeg&optimize=medium">
</picture>
```

**Key aspects of picture elements:**
- Multiple `<source>` elements provide WebP format with fallbacks
- Use `media` attributes for responsive breakpoints (typically `(min-width: 600px)` for desktop)
- Include width query parameters (`?width=750` for mobile, `?width=2000` for desktop)
- Add `format` and `optimize=medium` parameters for image optimization
- The final `<img>` element is the fallback
- Always include `alt` attribute for accessibility
- Use `loading="lazy"` for images below the fold, `loading="eager"` for above-the-fold images

**Standard responsive breakpoints:**
```html
<picture>
  <!-- WebP desktop (600px+) -->
  <source type="image/webp" srcset="/media/image.jpg?width=2000&format=webply&optimize=medium" media="(min-width: 600px)">

  <!-- WebP mobile -->
  <source type="image/webp" srcset="/media/image.jpg?width=750&format=webply&optimize=medium">

  <!-- JPEG desktop (600px+) -->
  <source srcset="/media/image.jpg?width=2000&format=jpeg&optimize=medium" media="(min-width: 600px)">

  <!-- JPEG mobile (fallback) -->
  <img loading="lazy" alt="Descriptive alt text" src="/media/image.jpg?width=750&format=jpeg&optimize=medium">
</picture>
```

**Important notes:**
- Place images in the `/media/` folder or appropriate project location
- Always provide meaningful `alt` text for accessibility
- Use `loading="eager"` only for hero/above-the-fold images
- The platform's `createOptimizedPicture()` JavaScript helper generates this structure automatically in decoration code

**Simplified picture format for examples:**

For brevity, examples in this document may show simplified picture tags:
```html
<picture>
  <img src="/media/image.jpg" alt="Description">
</picture>
```

In actual test files, you can use either:
1. The full responsive structure shown above (recommended for realistic testing)
2. The simplified format (acceptable for quick prototyping, though less realistic)

## Block Content Structure

The internal structure of a block depends on its content model. Blocks typically use nested `<div>` elements to represent the table-like structure from authoring.

### Simple Block Example

A hero block with an image and text:

```html
<div class="hero">
  <div>
    <div>
      <picture>
        <img src="/media/hero-image.jpg" alt="Hero image description">
      </picture>
    </div>
  </div>
  <div>
    <div>
      <h1>Hero Heading</h1>
      <p>Hero description text</p>
    </div>
  </div>
</div>
```

### Block with Multiple Rows

A cards block with multiple items:

```html
<div class="cards">
  <div>
    <div>
      <picture>
        <img src="/media/card1.jpg" alt="Card 1">
      </picture>
    </div>
    <div>
      <h3>Card 1 Title</h3>
      <p>Card 1 description</p>
    </div>
  </div>
  <div>
    <div>
      <picture>
        <img src="/media/card2.jpg" alt="Card 2">
      </picture>
    </div>
    <div>
      <h3>Card 2 Title</h3>
      <p>Card 2 description</p>
    </div>
  </div>
  <div>
    <div>
      <picture>
        <img src="/media/card3.jpg" alt="Card 3">
      </picture>
    </div>
    <div>
      <h3>Card 3 Title</h3>
      <p>Card 3 description</p>
    </div>
  </div>
</div>
```

### Block Structure Mapping

The nested `<div>` structure in HTML corresponds to the table structure in authoring:

**In document authoring (table):**
```
| Block Name        |
|-------------------|
| Cell 1   | Cell 2 |
| Cell 3   | Cell 4 |
```

**In HTML:**
```html
<div class="block-name">
  <div>                    <!-- Row 1 -->
    <div>Cell 1</div>      <!-- Column 1 -->
    <div>Cell 2</div>      <!-- Column 2 -->
  </div>
  <div>                    <!-- Row 2 -->
    <div>Cell 3</div>      <!-- Column 1 -->
    <div>Cell 4</div>      <!-- Column 2 -->
  </div>
</div>
```

## Complete Example

Here's a complete example of a test `.plain.html` file for a hero block:

**File:** `drafts/hero-test.plain.html`

```html
<!-- Hero block section -->
<div>
  <div class="hero">
    <div>
      <div>
        <picture>
          <img src="/media/hero-image.jpg" alt="Welcome to our site">
        </picture>
      </div>
    </div>
    <div>
      <div>
        <h1>Welcome to Our Site</h1>
        <p>This is a compelling hero message that encourages visitors to take action.</p>
        <p><a href="/contact">Get Started</a></p>
      </div>
    </div>
  </div>
</div>

<!-- Regular content section -->
<div>
  <h2>About This Test</h2>
  <p>This page demonstrates the hero block in action.</p>
</div>

<!-- Hero block with variant -->
<div>
  <div class="hero dark">
    <div>
      <div>
        <picture>
          <img src="/media/hero-dark.jpg" alt="Dark variant hero">
        </picture>
      </div>
    </div>
    <div>
      <div>
        <h2>Dark Variant Hero</h2>
        <p>Testing the dark variant of the hero block.</p>
      </div>
    </div>
  </div>
</div>
```

**Preview at:** `http://localhost:3000/drafts/hero-test`

## Important Notes

**File location:**
- Create test HTML files in the `drafts/` folder
- Can be organized in subfolders: `drafts/blocks/hero/test.plain.html`
- Always use `.plain.html` extension

**Running with local HTML:**
- Start dev server with: `aem up --html-folder drafts`
- This tells the dev server to serve HTML files from the drafts folder
- The CLI automatically wraps your plain HTML with head, header, and footer

**Section organization:**
- Sections can contain any mix of blocks and default content
- No strict rules about section boundaries - depends on project and authoring needs
- Some blocks may require being in their own section - check block documentation

**Images:**
- Use `<picture>` elements with proper responsive structure (see Images section)
- Reference images from the `/media/` folder or appropriate location
- Always include `alt` attributes for accessibility

**Testing considerations:**
- Test multiple variants in the same file by adding multiple sections
- Include edge cases in your test content
- Use realistic content, not placeholder text

**Content model alignment:**
- The HTML structure must match your block's expected content model
- Consult your content model documentation when structuring blocks
- The decoration JavaScript will process this structure at two levels:
  - Page-level decoration (e.g., `decorateMain` in `scripts.js`) processes all content
  - Block-specific decoration (`blocks/{block-name}/{block-name}.js`) processes individual blocks
- Classes and enhanced markup are typically added during decoration, not in the authored HTML

## When to Create CMS Content Instead

Local HTML files are useful for quick iteration, but remember:

- **For PRs:** You need actual CMS content for PSI validation links
- **For documentation:** CMS content can serve as author documentation
- **For collaboration:** CMS content is easier for non-developers to review

Always plan to create CMS content before finalizing your PR, even if you start with local HTML for rapid development.
