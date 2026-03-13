---
name: building-blocks
description: Guide for implementing code changes in AEM Edge Delivery Services. Handles block development (new or modified), core functionality changes (scripts.js, styles, delayed.js, etc.), or both. Use this skill for all implementation work guided by the content-driven-development workflow.
---

# Building Blocks

This skill guides you through implementing AEM Edge Delivery blocks following established patterns and best practices. Blocks transform authored content into rich, interactive experiences through JavaScript decoration and CSS styling.

**IMPORTANT: This skill should ONLY be invoked from the content-driven-development skill during Step 5 (Implementation).**

If you are not already following the CDD process, STOP and invoke the **content-driven-development** skill first.

## Related Skills

- **content-driven-development**: MUST be invoked before using this skill to ensure content and content models are ready
- **block-collection-and-party**: Use to find similar blocks for patterns
- **testing-blocks**: Automatically invoked during Step 5 for comprehensive testing

## When to Use This Skill

This skill is invoked automatically by **content-driven-development** during Step 5 (Implementation). It handles:

**Block Development:**
- Creating new block files and structure
- Implementing JavaScript decoration
- Adding CSS styling

**Core Functionality:**
- Scripts.js modifications (decoration, utilities, auto-blocking)
- Global styles (styles.css, lazy-styles.css)
- Delayed functionality (delayed.js)
- Configuration changes

**Combined:**
- Blocks with supporting core changes (utilities, global styles, etc.)

Prerequisites (verified by CDD):
- ✅ Test content exists (in CMS or local drafts)
- ✅ Content model is defined/documented (if applicable)
- ✅ Test content URL is available
- ✅ Dev server is running

## Block Implementation Workflow

Track your progress:
- [ ] Step 1: Find similar blocks for patterns (if new block or major changes)
- [ ] Step 2: Create or modify block structure (files and directories)
- [ ] Step 3: Implement JavaScript decoration (skip if CSS-only)
- [ ] Step 4: Add CSS styling
- [ ] Step 5: Test implementation (invokes testing-blocks skill)

**Note:** If your changes require core modifications (utilities in scripts.js, global styles, etc.), make those changes first, test them, then return to this workflow. See "When Modifying Core Files" below.

## Step 1: Find Similar Blocks

**When to use:** Creating new blocks or making major structural modifications

**Skip this step when:** Making minor modifications to existing blocks (CSS tweaks, small decoration changes)

**Quick start:**

1. Search the codebase for similar blocks:
   ```bash
   ls blocks/
   ```

2. Use the **block-collection-and-party** skill to find reference implementations

3. Review patterns from similar blocks:
   - DOM manipulation strategies
   - CSS architecture
   - Variant handling
   - Performance optimizations

## Step 2: Create or Modify Block Structure

### For New Blocks:

1. Create the block directory and files:
   ```bash
   mkdir -p blocks/{block-name}
   touch blocks/{block-name}/{block-name}.js
   touch blocks/{block-name}/{block-name}.css
   ```

2. Basic JavaScript structure:
   ```javascript
   /**
    * decorate the block
    * @param {Element} block the block
    */
   export default async function decorate(block) {
     // Your decoration logic here
   }
   ```

3. Basic CSS structure:
   ```css
   /* All selectors scoped to block */
   main .{block-name} {
     /* block styles */
   }
   ```

### For Existing Blocks:

1. Locate the block directory: `blocks/{block-name}/`
2. Review current implementation:
   ```bash
   # View the initial HTML structure from the server
   curl http://localhost:3000/{test-content-path}
   ```
3. Understand existing decoration logic and styles

## Step 3: Implement JavaScript Decoration

**Essential pattern - re-use existing DOM elements:**

```javascript
export default async function decorate(block) {
  // Platform delivers images as <picture> elements with <source> tags
  const picture = block.querySelector('picture');
  const heading = block.querySelector('h2');

  // Create new structure, re-using existing elements
  const figure = document.createElement('figure');
  figure.append(picture);  // Re-uses picture element

  const wrapper = document.createElement('div');
  wrapper.className = 'content-wrapper';
  wrapper.append(heading, figure);

  block.replaceChildren(wrapper);

  // Only check variants when they affect decoration logic
  // CSS-only variants like 'dark', 'wide' don't need JS
  if (block.classList.contains('carousel')) {
    // Carousel variant needs different DOM structure/behavior
    setupCarousel(block);
  }
}
```

**For complete JavaScript guidelines including:**
- Advanced DOM manipulation patterns
- Fetching data and loading modules
- Performance optimization techniques
- Helper functions from aem.js
- Code style and linting rules

**Read `resources/js-guidelines.md`**

## Step 4: Add CSS Styling

**Essential patterns - scoped, responsive, using custom properties:**

```css
/* All selectors MUST be scoped to block */
main .my-block {
  /* Use CSS custom properties for consistency */
  background-color: var(--background-color);
  color: var(--text-color);
  font-family: var(--body-font-family);
  max-width: var(--max-content-width);

  /* Mobile-first styles (default) */
  padding: 1rem;
  flex-direction: column;
}

main .my-block h2 {
  font-family: var(--heading-font-family);
  font-size: var(--heading-font-size-m);
}

main .my-block .item {
  display: flex;
  gap: 1rem;
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

/* Variants - most are CSS-only */
main .my-block.dark {
  background-color: var(--dark-color);
  color: var(--clr-white);
}
```

**For complete CSS guidelines including:**
- All available CSS custom properties
- Modern CSS features (grid, logical properties, etc.)
- Performance optimization
- Naming conventions
- Common patterns and anti-patterns

**Read `resources/css-guidelines.md`**

**Note on iterative validation:** While building, you can test changes in your browser as you go (load test content URL, check console, verify layout and functionality). For comprehensive testing guidance including browser testing techniques, responsive testing, and validation approaches, see the testing-blocks skill invoked in Step 5.

## Step 5: Test Implementation

**After implementation is complete, invoke the testing-blocks skill.**

The testing-blocks skill will guide you through:
- Browser testing (functionality, responsive behavior across viewports)
- Linting and fixing issues
- Writing unit tests for logic-heavy utilities (if needed)
- Screenshot capture for validation
- Performance validation

**Provide the testing-blocks skill with:**
- Block name being tested
- Test content URL(s) (from step 4 of CDD process)
- Any variants that need testing
- Screenshots of existing implementation/design/mockup to verify against
- Acceptance criteria to verify (from step 2 of CDD process)

**After testing is complete, return to CDD workflow.**

---

## When Modifying Core Files

If your changes require modifying core files (scripts.js, styles.css, delayed.js), follow these principles:

**Common core files:**
- **scripts.js** - Decoration utilities, auto-blocking logic, page loading
- **styles.css** - Global styles (eager), CSS custom properties
- **lazy-styles.css** - Global styles (lazy loaded)
- **delayed.js** - Marketing, analytics, third-party integrations

**Key principles:**

1. **Make core changes first** (before block changes that depend on them)
2. **Test core changes independently** with existing content before using in blocks
3. **Consider impact** - core changes can affect multiple blocks/pages
4. **Test thoroughly** - verify no regressions in existing functionality
5. **Keep it minimal** - only add what's necessary
6. **Document with code comments** - most core changes don't need separate docs

**Testing core changes:**
- Test with existing content URLs that use affected functionality
- For auto-blocking: test pages that should/shouldn't trigger it
- For global styles: test across multiple blocks and pages
- Check console for errors
- Verify responsive behavior

**For detailed patterns:**
- JavaScript: See `resources/js-guidelines.md`
- CSS: See `resources/css-guidelines.md`

---

## Reference Materials

- `resources/js-guidelines.md` - Complete JavaScript patterns and best practices
- `resources/css-guidelines.md` - Complete CSS patterns and best practices
