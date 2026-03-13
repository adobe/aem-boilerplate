# JavaScript Guidelines for AEM Blocks

## Basic Block Structure

Every block must export a default `decorate` function that receives the block element as a parameter. The function can be async if needed.

**Basic structure:**

```javascript
/**
 * decorate the block
 * @param {Element} block the block
 */
export default async function decorate(block) {
  // Your decoration logic here
}
```

**Key points:**
- Always export the decorate function as the default export
- The function receives the block DOM element as the first parameter
- Use `async` if you need to await operations (fetching data, loading modules, etc.)
- Include JSDoc comments describing the functions

## DOM Manipulation Patterns

### Good Patterns

**✅ Re-use existing DOM elements when possible:**
```javascript
// Good - re-use the existing element
const paragraph = block.querySelector('p');
paragraph.classList.add('decorated');

// Also good - extract and re-use
const picture = block.querySelector('picture');
const figure = document.createElement('figure');
figure.append(picture); // Re-uses the picture element
block.replaceChildren(figure);

// Avoid - creating new elements unnecessarily
const text = block.querySelector('p').textContent;
const newP = document.createElement('p');
newP.textContent = text;
// This throws away the original <p> and creates a new one
```

**✅ Use semantic HTML:**
```javascript
const blockquote = document.createElement('blockquote');
const figure = document.createElement('figure');
```

**✅ Use spread operator for multiple elements:**
```javascript
const pars = block.querySelectorAll('p');
const container = document.createElement('div');
container.append(...pars);
```

**✅ Replace content efficiently:**
```javascript
block.replaceChildren(newElement);
```

**✅ Query within the block scope:**
```javascript
// Good - scoped to block
const links = block.querySelectorAll('a');

// Avoid - queries entire document
const links = document.querySelectorAll('a');
```

### Bad Patterns

**❌ Don't use innerHTML for complex structures:**
```javascript
// Bad - hard to maintain, XSS risk
block.innerHTML = '<div class="wrapper"><p>Text</p></div>';

// Good - use DOM APIs
const wrapper = document.createElement('div');
wrapper.className = 'wrapper';
const p = document.createElement('p');
p.textContent = 'Text';
wrapper.append(p);
block.append(wrapper);
```

**❌ Don't mutate elements from other blocks:**
```javascript
// Bad - affects global state
const header = document.querySelector('header');
header.classList.add('modified-by-my-block');

// Good - only modify your block
block.classList.add('has-special-behavior');
```

**❌ Don't leave temporary DOM elements:**
```javascript
// Bad - leaves empty paragraphs
const text = block.querySelector('p').textContent;
const newDiv = document.createElement('div');
newDiv.textContent = text;
block.append(newDiv);

// Good - remove the original
const p = block.querySelector('p');
const newDiv = document.createElement('div');
newDiv.textContent = p.textContent;
p.replaceWith(newDiv);
```

## Handling Variants

Blocks can have variant classes applied (e.g., `<div class="my-block dark">`). Check for variants using `classList`:

```javascript
export default async function decorate(block) {
  const isDark = block.classList.contains('dark');
  const isWide = block.classList.contains('wide');

  // Apply variant-specific logic
  if (isDark) {
    // Handle dark variant
  }
}
```

**Key points:**
- Variant classes are added alongside the block class
- Use `classList.contains()` to check for variants
- CSS should handle most variant styling; use JS only for behavior changes

## Common Patterns

### Working with Images

Images in authored content come with srcset and alt attributes from the platform. You can also create optimized images programmatically using `createOptimizedPicture()` from aem.js:

```javascript
import { createOptimizedPicture } from '../../scripts/aem.js';

export default async function decorate(block) {
  // Working with existing images
  const images = block.querySelectorAll('img');
  images.forEach((img) => {
    // Images come with srcset and alt from the platform
    // Wrap in figure if needed
    const figure = document.createElement('figure');
    img.replaceWith(figure);
    figure.append(img);
  });

  // Creating optimized pictures programmatically
  const picture = createOptimizedPicture('/path/to/image.jpg', 'Alt text', false, [{ width: '750' }]);
  block.append(picture);
}
```

### Fetching Data

Use async/await for data fetching:

```javascript
export default async function decorate(block) {
  try {
    const response = await fetch('/path/to/data.json');
    const data = await response.json();

    // Use the data
    renderData(block, data);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Failed to load data:', error);
  }
}
```

### Loading Additional Modules

Use regular imports for modules that are always needed:

```javascript
import { someFunction } from '../../scripts/utils.js';

export default async function decorate(block) {
  someFunction(block);
}
```

Use dynamic imports for modules that are conditionally needed or can be loaded later:

```javascript
export default async function decorate(block) {
  // Conditionally load a module
  if (block.classList.contains('advanced')) {
    const { advancedFunction } = await import('../../scripts/advanced.js');
    advancedFunction(block);
  }

  // Or defer loading until later
  setTimeout(async () => {
    const { heavyModule } = await import('../../scripts/heavy.js');
    heavyModule.init(block);
  }, 0);
}
```

### Handling Multiple Content Patterns

Sometimes a block might have different content structures:

```javascript
export default async function decorate(block) {
  const rows = block.querySelectorAll(':scope > div');

  // Pattern 1: Single row with image and text
  if (rows.length === 1) {
    // Handle simple pattern
  }

  // Pattern 2: Multiple rows
  if (rows.length > 1) {
    // Handle complex pattern
  }
}
```

**Note:** Try to avoid this. Multiple content patterns increase complexity. Work with content authors to agree on a single, clear content model when possible.

## Code Style

This project uses Airbnb ESLint configuration with some modifications:

**Key rules:**
- Use ES6+ features (const, let, arrow functions, template literals)
- Always include `.js` extension in imports: `import { foo } from './bar.js';`
- Use single quotes for strings
- No semicolons are enforced, but be consistent
- Use 2-space indentation
- Unix line endings (LF)
- Parameter reassignment is allowed for properties: `block.foo = 'bar'`

**Naming conventions:**
- Use camelCase for variables and functions
- Use PascalCase for classes
- Use UPPER_CASE for constants

**File naming:**
- Block files must match block name: `my-block.js`, `my-block.css`
- Use kebab-case for file names

## Performance Considerations

**Minimize work in the decoration function:**
- Only do what's necessary to achieve the desired structure
- Defer expensive operations (heavy calculations, large data fetching) when possible
- Remember: blocks in the first section load eagerly and affect LCP

**Example - defer heavy work:**
```javascript
export default async function decorate(block) {
  // Do minimal initial decoration
  block.classList.add('initialized');

  // Defer expensive work
  setTimeout(async () => {
    const data = await fetchHeavyData();
    renderComplexUI(block, data);
  }, 0);
}
```

**Example - use Intersection Observer to load only when viewed:**
```javascript
export default async function decorate(block) {
  // Useful for embeds like YouTube videos, heavy widgets, etc.
  const observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      observer.disconnect();
      // Load heavy content only when block is visible
      loadYouTubeEmbed(block);
    }
  });

  observer.observe(block);
}
```

## Helper Functions

You can import helpful utilities from `scripts/aem.js`:

```javascript
import {
  buildBlock,
  decorateBlock,
  loadBlock,
  loadCSS,
  loadScript,
  toClassName,
  getMetadata,
  createOptimizedPicture,
} from '../../scripts/aem.js';
```

Common helpers:
- `toClassName(text)` - Converts text to a valid CSS class name
- `getMetadata(name)` - Gets page metadata value
- `loadCSS(href)` - Loads a CSS file and returns a promise that resolves when loaded
- `loadScript(url, attrs)` - Loads a JavaScript file with optional attributes (async, type, etc.)
- `createOptimizedPicture(src, alt, eager, breakpoints)` - Creates a responsive picture element with optimized images
- `buildBlock(name, cells)` - Programmatically creates a block DOM structure. **Note:** For the block to fully display, it must be decorated and loaded after being built and added to the DOM. In most cases, you'll need to call `decorateBlock()` and `loadBlock()` after building.

**Example - building and loading a block:**
```javascript
// Create the block
const myBlock = buildBlock('my-block', [[document.createElement('p')]]);

// Blocks must be wrapped in a div and placed inside a section
const wrapper = document.createElement('div');
wrapper.append(myBlock);

// Add to a section (either find existing or create new)
const section = document.querySelector('main .section') || document.querySelector('main > div');
section.append(wrapper);

// Decorate and load (required in most contexts)
decorateBlock(myBlock);
await loadBlock(myBlock);
```

See `scripts/aem.js` for the complete list (but remember: NEVER MODIFY aem.js).
