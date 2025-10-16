---
name: AEM Block Development
description: Technical implementation guide for AEM Edge Delivery blocks - DOM manipulation, decoration patterns, and JavaScript best practices. Use when implementing block functionality after content structure is designed.
---

# AEM Block Development

## Overview

This skill covers the technical implementation of AEM blocks AFTER you have:
1. Checked for existing blocks (aem-block-reusability skill)
2. Designed the content structure (aem-content-modeling skill)

**Key principle:** Content structure drives implementation. Don't design structure around your code convenience.

## Block Fundamentals

### Block Structure

Every block consists of:
- **JavaScript file**: `blocks/blockname/blockname.js` - Decoration logic
- **CSS file**: `blocks/blockname/blockname.css` - Scoped styles
- **Content**: HTML structure delivered by AEM backend

### The Decorate Function

```javascript
/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // 1. Load dependencies (if needed)
  // 2. Extract configuration from block (if applicable)
  // 3. Transform DOM
  // 4. Add event listeners
  // 5. Set loaded status (if needed)
}
```

**This function is called automatically** by the AEM page loading system when the block is encountered.

## Inspecting Block HTML

**ALWAYS inspect the HTML before writing code.** Don't make assumptions.

### Methods to Inspect

**1. Local curl (fastest)**
```bash
# View full page HTML
curl http://localhost:3000/path/to/test-page

# View page as plain.html (stripped to content only)
curl http://localhost:3000/path/to/test-page.plain.html
```

**2. Browser console**
```javascript
// Log the block element
console.log(block);

// Log the HTML structure
console.log(block.outerHTML);

// Log all rows
console.log([...block.children]);
```

**3. Preview environment**
```bash
# View from preview environment
curl https://branch--repo--owner.aem.page/path/to/test-page.plain.html
```

### Understanding Block HTML Structure

AEM converts authored tables into HTML with this structure:

**Authored content:**
```
| Block Name |
|------------|
| value1 | value2 | value3 |
| value4 | value5 | value6 |
```

**Delivered HTML:**
```html
<div class="block-name">
  <div>
    <div>value1</div>
    <div>value2</div>
    <div>value3</div>
  </div>
  <div>
    <div>value4</div>
    <div>value5</div>
    <div>value6</div>
  </div>
</div>
```

**Key observations:**
- Block name becomes `class="block-name"` (lowercase, spaces to hyphens)
- Each table row becomes a `<div>` containing child `<div>`s
- Each table cell becomes a `<div>`
- Images become `<picture>` elements with `<img>` inside
- Links become `<a>` elements
- Text content is preserved with semantic HTML (paragraphs, headings, lists, etc.)

## DOM Manipulation Patterns

### Reading Block Structure

**Get all rows:**
```javascript
const rows = [...block.children];
```

**Get cells from a row:**
```javascript
const cells = [...row.children];
```

**Get specific row/cell:**
```javascript
const firstRow = block.children[0];
const firstCell = firstRow.children[0];
```

**Get text content:**
```javascript
const text = cell.textContent.trim();
```

**Get image:**
```javascript
const picture = cell.querySelector('picture');
const img = cell.querySelector('img');
```

**Get link:**
```javascript
const link = cell.querySelector('a');
const href = link?.href;
const linkText = link?.textContent;
```

### Common Transformation Patterns

**Pattern 1: Simple row iteration**
```javascript
export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    // Transform each row
    row.classList.add('item');
  });
}
```

**Pattern 2: Extract configuration from first row**
```javascript
export default async function decorate(block) {
  const config = {};
  const configRow = block.children[0];
  const cells = [...configRow.children];

  // First cell = key, second = value (config block pattern)
  config[cells[0].textContent.trim()] = cells[1].textContent.trim();

  configRow.remove(); // Remove config row after extraction

  // Process remaining rows
  [...block.children].forEach((row) => {
    // Use config to influence decoration
  });
}
```

**Pattern 3: Rebuild DOM structure**
```javascript
export default async function decorate(block) {
  const rows = [...block.children];

  // Create new structure
  const container = document.createElement('div');
  container.classList.add('container');

  rows.forEach((row) => {
    const cells = [...row.children];

    // Build new element from cell data
    const item = document.createElement('div');
    item.classList.add('item');

    const img = cells[0].querySelector('img');
    if (img) item.append(img);

    const text = cells[1].textContent.trim();
    const p = document.createElement('p');
    p.textContent = text;
    item.append(p);

    container.append(item);
  });

  // Replace block contents
  block.textContent = '';
  block.append(container);
}
```

**Pattern 4: Handle optional fields gracefully**
```javascript
export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];

    // Required field
    const title = cells[0]?.textContent.trim();
    if (!title) return; // Skip malformed rows

    // Optional fields - check existence
    const img = cells[1]?.querySelector('img');
    const link = cells[2]?.querySelector('a');

    // Build element, include optional parts only if present
    const item = document.createElement('div');
    if (img) item.append(img.cloneNode(true));

    const heading = document.createElement('h3');
    heading.textContent = title;

    if (link) {
      link.textContent = '';
      link.append(heading);
      item.append(link);
    } else {
      item.append(heading);
    }

    row.replaceWith(item);
  });
}
```

### Working with Images

**Get optimized image:**
```javascript
const picture = cell.querySelector('picture');
const img = cell.querySelector('img');

// Images from AEM are already optimized with:
// - Multiple source formats (webp, etc.)
// - Responsive srcset
// - Lazy loading attributes

// Just move/clone the picture element:
newElement.append(picture);
```

**Modify image attributes:**
```javascript
const img = cell.querySelector('img');
if (img) {
  img.alt = 'Descriptive alt text';
  img.loading = 'lazy'; // Usually already set
}
```

**Extract image URL:**
```javascript
const img = cell.querySelector('img');
const imageSrc = img?.src;
```

### Working with Links

**Extract link data:**
```javascript
const link = cell.querySelector('a');
if (link) {
  const href = link.href;
  const text = link.textContent.trim();
  const title = link.title;
}
```

**Wrap content in link:**
```javascript
const link = cell.querySelector('a');
if (link) {
  const href = link.href;
  link.textContent = ''; // Clear existing content
  link.append(newContent); // Add new content
}
```

**Create new link:**
```javascript
const a = document.createElement('a');
a.href = url;
a.textContent = 'Click here';
a.title = 'Descriptive title';
```

### Working with Rich Content

**Get formatted content (preserving HTML):**
```javascript
// Cell may contain paragraphs, headings, lists, etc.
const content = cell.innerHTML;

// Or clone the content
const contentClone = cell.cloneNode(true);
newElement.append(contentClone);
```

**Get plain text (stripping HTML):**
```javascript
const plainText = cell.textContent.trim();
```

## Block Variants

Variants modify block behavior without changing the JavaScript file.

**Authored:**
```
| Block Name (Variant1, Variant2) |
|---------------------------------|
| content |
```

**Delivered HTML:**
```html
<div class="block-name variant1 variant2">
  <div>content</div>
</div>
```

**Detect variants in JavaScript:**
```javascript
export default async function decorate(block) {
  const isVariant1 = block.classList.contains('variant1');
  const isVariant2 = block.classList.contains('variant2');

  if (isVariant1) {
    // Apply variant1-specific behavior
  }

  if (isVariant2) {
    // Apply variant2-specific behavior
  }
}
```

**CSS for variants:**
```css
/* Base block styles */
.block-name {
  /* Default styles */
}

/* Variant-specific styles */
.block-name.variant1 {
  /* Override for variant1 */
}

.block-name.variant2 {
  /* Override for variant2 */
}
```

## CSS Scoping Rules

**CRITICAL: All CSS selectors MUST be scoped to the block class.**

This prevents style conflicts between blocks and ensures maintainability.

### ❌ Wrong - Unscoped Selectors

```css
.search-input {
  padding: 1rem;
}

.item-label {
  font-weight: bold;
}
```

**Problem:** These selectors will match ANY element with these classes across the entire page, causing conflicts.

### ✅ Correct - Fully Scoped Selectors

```css
.block-name .search-input {
  padding: 1rem;
}

.block-name .item-label {
  font-weight: bold;
}

/* For elements you create dynamically */
.block-name input {
  padding: 1rem;
}
```

**Why this matters:**
- Prevents conflicts with other blocks
- Makes CSS predictable and maintainable
- Follows CSS specificity best practices
- Essential for composable architecture

**Rule:** Every selector must start with `.block-name` (your block's class).

## Async Operations and Loading

### Loading External Dependencies

**Load library (if absolutely necessary):**
```javascript
export default async function decorate(block) {
  // Only if truly needed - avoid dependencies when possible
  const lib = await import('./lib.js');

  // Use library
  lib.doSomething(block);
}
```

### Fetching Data

**Fetch JSON data:**
```javascript
export default async function decorate(block) {
  const endpoint = block.querySelector('a')?.href;

  if (endpoint) {
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      // Use data to populate block
      data.items.forEach((item) => {
        // Create elements from data
      });
    } catch (error) {
      console.error('Failed to load data:', error);
      // Show error state or fallback
    }
  }
}
```

### Loading State

**Add loading indicator:**
```javascript
export default async function decorate(block) {
  // Add loading class
  block.classList.add('loading');

  // Perform async operation
  await doSomethingAsync();

  // Remove loading class
  block.classList.remove('loading');
  block.classList.add('loaded');
}
```

**CSS for loading state:**
```css
.block-name.loading {
  opacity: 0.5;
  pointer-events: none;
}

.block-name.loading::after {
  content: 'Loading...';
  display: block;
}
```

## Event Handlers

### Adding Event Listeners

**Click events:**
```javascript
export default async function decorate(block) {
  const button = block.querySelector('.button');

  button.addEventListener('click', (e) => {
    e.preventDefault();
    // Handle click
  });
}
```

**Event delegation (for dynamic content):**
```javascript
export default async function decorate(block) {
  block.addEventListener('click', (e) => {
    const button = e.target.closest('.button');
    if (button) {
      e.preventDefault();
      // Handle button click
    }
  });
}
```

**Keyboard accessibility:**
```javascript
button.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    // Handle activation
  }
});
```

## Responsive Design

### Mobile-First Approach

**CSS breakpoints (from AGENTS.md):**
```css
/* Mobile styles (default) */
.block-name {
  display: block;
}

/* Tablet (600px+) */
@media (min-width: 600px) {
  .block-name {
    display: flex;
  }
}

/* Desktop (900px+) */
@media (min-width: 900px) {
  .block-name {
    max-width: 1200px;
  }
}

/* Large desktop (1200px+) */
@media (min-width: 1200px) {
  .block-name {
    /* Large screen styles */
  }
}
```

### JavaScript for Responsive Behavior

**Detect viewport size (if necessary):**
```javascript
export default async function decorate(block) {
  const isMobile = window.matchMedia('(max-width: 599px)').matches;
  const isTablet = window.matchMedia('(min-width: 600px) and (max-width: 899px)').matches;
  const isDesktop = window.matchMedia('(min-width: 900px)').matches;

  // Apply behavior based on viewport
  if (isMobile) {
    // Mobile-specific behavior
  }
}
```

**Listen for viewport changes:**
```javascript
const mediaQuery = window.matchMedia('(min-width: 900px)');

function handleViewportChange(e) {
  if (e.matches) {
    // Desktop behavior
  } else {
    // Mobile/tablet behavior
  }
}

mediaQuery.addEventListener('change', handleViewportChange);
handleViewportChange(mediaQuery); // Initial check
```

## Accessibility

### ARIA Labels and Roles

**Add ARIA attributes:**
```javascript
const button = document.createElement('button');
button.setAttribute('aria-label', 'Close dialog');
button.setAttribute('aria-expanded', 'false');
```

**For custom interactive elements:**
```javascript
const customButton = document.createElement('div');
customButton.setAttribute('role', 'button');
customButton.setAttribute('tabindex', '0');
customButton.addEventListener('click', handleClick);
customButton.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    handleClick();
  }
});
```

### Focus Management

**Manage focus for interactive elements:**
```javascript
const dialog = document.createElement('div');
dialog.setAttribute('role', 'dialog');
dialog.setAttribute('aria-modal', 'true');

// When opening dialog
dialog.style.display = 'block';
dialog.querySelector('button').focus();

// Trap focus within dialog
dialog.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    // Trap focus logic
  }
});
```

## Performance Considerations

### Minimize DOM Operations

**Bad - multiple reflows:**
```javascript
// ❌ WRONG - causes multiple reflows
rows.forEach((row) => {
  row.style.width = '100px';
  row.style.height = '50px';
  row.classList.add('item');
});
```

**Good - batch operations:**
```javascript
// ✅ CORRECT - minimize reflows
const fragment = document.createDocumentFragment();

rows.forEach((row) => {
  row.style.cssText = 'width: 100px; height: 50px';
  row.classList.add('item');
  fragment.append(row);
});

block.append(fragment);
```

### Lazy Loading

**Lazy load images (usually already handled by AEM):**
```javascript
const img = cell.querySelector('img');
if (img && !img.loading) {
  img.loading = 'lazy';
}
```

**Lazy load functionality:**
```javascript
export default async function decorate(block) {
  // Set up structure immediately
  block.classList.add('ready');

  // Lazy load expensive operations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Load expensive functionality when visible
        loadExpensiveFeature(block);
        observer.disconnect();
      }
    });
  });

  observer.observe(block);
}
```

### Avoid Dependencies

**Prefer vanilla JavaScript over libraries:**
```javascript
// ❌ WRONG - unnecessary dependency
import $ from 'jquery';
$('.block-name').addClass('active');

// ✅ CORRECT - vanilla JS
document.querySelectorAll('.block-name').forEach((el) => {
  el.classList.add('active');
});
```

**Use native browser APIs:**
```javascript
// Native fetch instead of axios
fetch(url).then(r => r.json()).then(data => { /* ... */ });

// Native DOM manipulation instead of jQuery
element.classList.add('class');
element.addEventListener('click', handler);
```

## Common Patterns and Examples

### Example 1: Simple Card Grid

**Content structure:**
```
| Cards |
|-------|
| image1.jpg | Title 1 | Description 1 |
| image2.jpg | Title 2 | Description 2 |
```

**JavaScript:**
```javascript
export default async function decorate(block) {
  const rows = [...block.children];

  rows.forEach((row) => {
    const cells = [...row.children];
    const picture = cells[0].querySelector('picture');
    const title = cells[1].textContent.trim();
    const description = cells[2].textContent.trim();

    // Build card structure
    row.classList.add('card');
    row.innerHTML = '';

    if (picture) {
      const imageWrapper = document.createElement('div');
      imageWrapper.classList.add('card-image');
      imageWrapper.append(picture);
      row.append(imageWrapper);
    }

    const content = document.createElement('div');
    content.classList.add('card-content');

    const h3 = document.createElement('h3');
    h3.textContent = title;
    content.append(h3);

    const p = document.createElement('p');
    p.textContent = description;
    content.append(p);

    row.append(content);
  });
}
```

**CSS:**
```css
.cards {
  display: grid;
  gap: 1rem;
  grid-template-columns: 1fr;
}

@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}

.cards .card {
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
}

.cards .card-image img {
  width: 100%;
  height: auto;
  display: block;
}

.cards .card-content {
  padding: 1rem;
}
```

### Example 2: Tabbed Content

**Content structure:**
```
| Tabs |
|------|
| Tab 1 | Content for tab 1 |
| Tab 2 | Content for tab 2 |
```

**JavaScript:**
```javascript
export default async function decorate(block) {
  const rows = [...block.children];

  // Create tab buttons container
  const tabButtons = document.createElement('div');
  tabButtons.classList.add('tabs-buttons');

  // Create content container
  const tabContents = document.createElement('div');
  tabContents.classList.add('tabs-contents');

  rows.forEach((row, index) => {
    const cells = [...row.children];
    const tabLabel = cells[0].textContent.trim();
    const tabContent = cells[1];

    // Create button
    const button = document.createElement('button');
    button.classList.add('tab-button');
    button.textContent = tabLabel;
    button.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
    button.setAttribute('role', 'tab');

    // Create content panel
    const panel = document.createElement('div');
    panel.classList.add('tab-panel');
    panel.setAttribute('role', 'tabpanel');
    panel.append(tabContent);

    if (index === 0) {
      button.classList.add('active');
      panel.classList.add('active');
    } else {
      panel.style.display = 'none';
    }

    // Click handler
    button.addEventListener('click', () => {
      // Deactivate all
      tabButtons.querySelectorAll('.tab-button').forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
      });
      tabContents.querySelectorAll('.tab-panel').forEach((p) => {
        p.classList.remove('active');
        p.style.display = 'none';
      });

      // Activate clicked
      button.classList.add('active');
      button.setAttribute('aria-selected', 'true');
      panel.classList.add('active');
      panel.style.display = 'block';
    });

    tabButtons.append(button);
    tabContents.append(panel);
  });

  // Replace block content
  block.textContent = '';
  block.append(tabButtons);
  block.append(tabContents);
}
```

### Example 3: Hero with Background Image

**Content structure:**
```
| Hero |
|------|
| Headline text |
| Subheadline text |
| cta-button.jpg |
| background.jpg |
```

**JavaScript:**
```javascript
export default async function decorate(block) {
  const rows = [...block.children];

  const headline = rows[0]?.textContent.trim();
  const subheadline = rows[1]?.textContent.trim();
  const ctaImage = rows[2]?.querySelector('picture');
  const backgroundImage = rows[3]?.querySelector('img');

  // Set background
  if (backgroundImage) {
    block.style.backgroundImage = `url(${backgroundImage.src})`;
    block.style.backgroundSize = 'cover';
    block.style.backgroundPosition = 'center';
  }

  // Build content
  block.innerHTML = '';

  const content = document.createElement('div');
  content.classList.add('hero-content');

  if (headline) {
    const h1 = document.createElement('h1');
    h1.textContent = headline;
    content.append(h1);
  }

  if (subheadline) {
    const p = document.createElement('p');
    p.textContent = subheadline;
    content.append(p);
  }

  if (ctaImage) {
    content.append(ctaImage);
  }

  block.append(content);
}
```

## Testing Your Block

### Local Testing

1. **Create test content** in `drafts/agent/blockname-test.html` (see aem-development-workflow skill)
2. **Start server** with HTML folder: `aem up --html-folder=./drafts/agent`
3. **Test at** `http://localhost:3000/drafts/agent/blockname-test`
4. **Use browser DevTools** to inspect and debug

### Console Debugging

```javascript
export default async function decorate(block) {
  console.log('Block element:', block);
  console.log('Block HTML:', block.outerHTML);
  console.log('Rows:', [...block.children]);

  // Your decoration code
}
```

### Responsive Testing

- Use browser DevTools device emulation
- Test at 599px (mobile), 600px (tablet), 900px (desktop), 1200px+ (large)
- Test with Puppeteer/Playwright if available

## Common Mistakes to Avoid

### ❌ Assuming Field Presence

**Wrong:**
```javascript
const title = row.children[1].textContent; // Crashes if cell doesn't exist
```

**Correct:**
```javascript
const title = row.children[1]?.textContent.trim() || 'Default';
```

### ❌ Modifying Original Elements Destructively

**Wrong:**
```javascript
const img = cell.querySelector('img');
cell.innerHTML = ''; // Destroys the image
// Now img is detached from DOM
```

**Correct:**
```javascript
const img = cell.querySelector('img');
const imgClone = img.cloneNode(true); // Or move it before clearing
cell.innerHTML = '';
cell.append(imgClone);
```

### ❌ Not Handling Empty Blocks

**Wrong:**
```javascript
export default async function decorate(block) {
  const firstRow = block.children[0]; // Crashes if no rows
  const title = firstRow.children[0].textContent;
}
```

**Correct:**
```javascript
export default async function decorate(block) {
  if (!block.children.length) return; // Handle empty block

  const firstRow = block.children[0];
  if (!firstRow?.children.length) return; // Handle empty row

  const title = firstRow.children[0]?.textContent.trim();
}
```

### ❌ Assuming Specific Content Format

**Wrong:**
```javascript
// Assumes cell contains plain text
const name = cell.textContent;
```

**Correct:**
```javascript
// Check what's actually in the cell
const link = cell.querySelector('a');
const name = link ? link.textContent.trim() : cell.textContent.trim();
```

### ❌ Breaking Accessibility

**Wrong:**
```javascript
const div = document.createElement('div');
div.addEventListener('click', handleClick); // Not keyboard accessible
```

**Correct:**
```javascript
const button = document.createElement('button');
button.addEventListener('click', handleClick); // Keyboard accessible by default
```

## Quick Reference

### DOM Traversal
```javascript
[...block.children]              // All rows
[...row.children]                // All cells in row
cell.querySelector('img')        // Find image
cell.querySelector('a')          // Find link
cell.querySelector('picture')    // Find picture element
cell.textContent.trim()          // Get text content
```

### DOM Creation
```javascript
document.createElement('div')
element.classList.add('class')
element.setAttribute('attr', 'value')
element.append(child)
element.textContent = 'text'
element.innerHTML = '<p>html</p>'
```

### Common Operations
```javascript
element.remove()                 // Remove from DOM
element.replaceWith(newElement)  // Replace element
element.cloneNode(true)          // Deep clone
block.textContent = ''           // Clear contents
```

## The Bottom Line

**Block development workflow:**
1. **Inspect the HTML** - Use curl/console.log, don't assume
2. **Handle variations gracefully** - Authors will omit/add fields
3. **Transform the DOM** - Extract data, rebuild structure
4. **Add interactivity** - Event listeners, ARIA attributes
5. **Style responsively** - Mobile-first CSS with breakpoints
6. **Test thoroughly** - Local HTML, responsive, accessibility

**Remember:**
- Content structure comes FIRST (designed before coding)
- Authors may deviate from structure - code defensively
- Vanilla JS only - avoid dependencies
- Mobile-first, responsive design
- Accessibility is not optional

**Always refer to:**
- aem-content-modeling skill for structure design
- aem-development-workflow skill for testing and PR process
- aem-block-reusability skill before starting implementation
