# CSS Guidelines for AEM Blocks

## Block Scoping

**All CSS selectors must be scoped to the block.** This is critical to prevent style leakage between blocks.

**✅ Good - scoped to block:**
```css
main .my-block {
  padding: 1rem;
}

main .my-block h2 {
  font-size: var(--heading-font-size-m);
}
```

**❌ Bad - not scoped:**
```css
/* This will affect ALL h2 elements on the page */
h2 {
  font-size: var(--heading-font-size-m);
}

/* This will affect elements outside the block */
.item {
  padding: 1rem;
}
```

**Scoping pattern:**
- Always start selectors with `main .{block-name}`
- This ensures styles only apply within your block
- Use additional classes for sub-elements within the block

**⚠️ Special note on `-wrapper` and `-container` classes:**

The platform automatically adds `.{block-name}-wrapper` and `.{block-name}-container` divs *outside* your block. If you need to style elements with these class names *inside* your block, you must scope them carefully:

```css
/* ❌ Bad - will affect the wrapper OUTSIDE your block */
main .my-block-wrapper {
  padding: 2rem;
}

/* ✅ Good - only affects wrappers INSIDE your block */
main .my-block .my-block-wrapper {
  padding: 2rem;
}

/* Better - avoid using these class names inside your block */
main .my-block .inner-wrapper {
  padding: 2rem;
}
```

**Best practice:** Avoid using `-wrapper` or `-container` suffix for classes inside your block to prevent confusion.

## Naming Conventions

Use BEM-like naming for elements within your block:

```css
/* Block */
main .my-block {
  /* block styles */
}

/* Element - using descriptive class names */
main .my-block .item {
  /* item styles */
}

main .my-block .item-title {
  /* item title styles */
}

/* Modifier/variant */
main .my-block.dark {
  /* dark variant styles */
}

main .my-block.wide .item {
  /* item styles in wide variant */
}
```

**Key points:**
- Use lowercase with hyphens for class names (kebab-case)
- Choose descriptive, semantic names
- Avoid generic names like `.container`, `.wrapper` - be specific to your block

## CSS Custom Properties (Variables)

Leverage CSS custom properties defined in `styles/styles.css` for consistency:

**Colors:**
```css
main .my-block {
  background-color: var(--background-color);
  color: var(--text-color);
}

main .my-block a:any-link {
  color: var(--link-color);
}

main .my-block a:hover {
  color: var(--link-hover-color);
}
```

**Typography:**
```css
main .my-block h2 {
  font-family: var(--heading-font-family);
  font-size: var(--heading-font-size-m);
}

main .my-block p {
  font-family: var(--body-font-family);
  font-size: var(--body-font-size-m);
}
```

**Layout:**
```css
main .my-block {
  max-width: var(--max-content-width);
  padding-inline: var(--inline-section-padding);
}
```

**Available custom properties:**
- Colors: `--clr-*`, `--link-color`, `--background-color`, `--text-color`, etc.
- Fonts: `--body-font-family`, `--heading-font-family`, `--fixed-font-family`
- Font sizes: `--heading-font-size-*`, `--body-font-size-*`
- Layout: `--max-content-width`, `--inline-section-padding`

See `styles/styles.css` for the complete list.

## Mobile-First Responsive Design

Write styles mobile-first, then add media queries for larger screens:

```css
/* Mobile styles (default) */
main .my-block {
  padding: 1rem;
  flex-direction: column;
}

/* Tablet and up */
@media (width >= 600px) {
  main .my-block {
    padding: 2rem;
  }
}

/* Desktop and up */
@media (width >= 900px) {
  main .my-block {
    flex-direction: row;
    padding: 4rem;
  }
}
```

**Standard breakpoints:**
- Mobile: default (< 600px)
- Tablet: `@media (width >= 600px)`
- Desktop: `@media (width >= 900px)`

**Modern syntax:**
- Use range syntax: `(width >= 600px)` instead of `(min-width: 600px)`
- Use logical properties where appropriate

## Modern CSS Features

Use modern CSS features for better maintainability and performance:

**Logical properties:**
```css
/* Use logical properties for internationalization */
main .my-block {
  padding-inline: 1rem; /* left/right in LTR, right/left in RTL */
  padding-block: 2rem; /* top/bottom */
  margin-inline-start: 1rem; /* left in LTR */
  border-inline-start: 2px solid black;
}
```

**Modern layout:**
```css
/* Flexbox */
main .my-block {
  display: flex;
  gap: 1rem; /* Better than margin hacks */
  flex-wrap: wrap;
}

/* Grid */
main .my-block {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
```

**Modern color syntax:**
```css
main .my-block {
  background-color: rgb(0 0 0 / 20%); /* Modern RGB with alpha */
  color: hsl(200 50% 50%); /* HSL syntax */
}
```

## Keep Specificity Low

Avoid overly specific selectors:

**✅ Good - low specificity:**
```css
main .my-block .item {
  padding: 1rem;
}

main .my-block .item-title {
  font-size: 1.5rem;
}
```

**❌ Bad - high specificity:**
```css
main .my-block div div div.item {
  padding: 1rem;
}

main div.my-block > div > h2.item-title {
  font-size: 1.5rem;
}
```

**Best practices:**
- Use classes, not tag names when possible
- Avoid ID selectors
- Keep selector chains short (2-3 levels max)
- Don't nest deeper than necessary

## Handling Variants

Use the variant class alongside the block class:

```css
/* Base block */
main .my-block {
  background-color: var(--background-color);
  color: var(--text-color);
}

/* Dark variant */
main .my-block.dark {
  background-color: var(--dark-color);
  color: var(--clr-white);
}

/* Wide variant */
main .my-block.wide {
  max-width: 100%;
}

/* Combining variants */
main .my-block.dark.wide {
  /* Styles for both dark and wide */
}
```

## Performance Considerations

**Minimize reflows and repaints:**
```css
/* Prefer transforms over position changes */
main .my-block .item {
  transform: translateX(10px); /* Better performance */
}

/* Avoid this: */
main .my-block .item {
  left: 10px; /* Triggers reflow */
}
```

**Use will-change sparingly:**
```css
/* Only for elements that will definitely animate */
main .my-block .animated-item {
  will-change: transform;
}
```

**Avoid expensive properties on large elements:**
```css
/* Be careful with these on large areas: */
/* box-shadow, border-radius, opacity, filters */
```

## Code Style

**Formatting:**
- Use 2-space indentation
- One selector per line for multiple selectors
- Opening brace on same line as selector
- One property per line
- Space after colon in property declarations
- No space before colon
- End all declarations with semicolon

**Example:**
```css
main .my-block,
main .my-block .item {
  display: flex;
  padding: 1rem;
  gap: 1rem;
}
```

**Order of properties** (recommended):
1. Layout (display, position, top, left, etc.)
2. Box model (width, height, margin, padding, border)
3. Visual (background, color, font, etc.)
4. Animation/transform

## Common Patterns

### Reset list styles
```css
main .my-block ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
```

### Center content
```css
main .my-block {
  max-width: var(--max-content-width);
  margin-inline: auto;
}
```

### Aspect ratio containers
```css
main .my-block .video-container {
  aspect-ratio: 16 / 9;
}
```

### Truncate text
```css
main .my-block .truncated {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
```

## Anti-Patterns to Avoid

**❌ Don't use !important:**
```css
/* Avoid this */
main .my-block {
  color: red !important;
}

/* Fix specificity issues properly instead */
```

**❌ Don't style elements outside your block:**
```css
/* Bad - modifies header globally */
main .my-block {
  /* ... */
}

header {
  background: red;
}
```

**❌ Don't hardcode values when variables exist:**
```css
/* Bad */
main .my-block {
  font-family: 'Lato', sans-serif;
  color: #666;
}

/* Good */
main .my-block {
  font-family: var(--body-font-family);
  color: var(--text-color);
}
```

**❌ Don't use absolute positioning for layout:**
```css
/* Prefer flexbox or grid for layout */
/* Use absolute positioning only for visual effects */
```
