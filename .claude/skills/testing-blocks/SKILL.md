---
name: testing-blocks
description: Guide for testing code changes in AEM Edge Delivery projects including blocks, scripts, and styles. Use this skill after making code changes and before opening a pull request to validate functionality. Covers unit testing for utilities and logic, browser testing with Playwright, linting, and guidance on what to test and how
---

# Testing Blocks

This skill guides you through testing code changes in AEM Edge Delivery Services projects. Testing follows a value-versus-cost philosophy: create and maintain tests when the value they bring exceeds the cost of creation and maintenance.

**CRITICAL: Browser validation is MANDATORY. You cannot complete this skill without providing proof of functional testing in a real browser environment.**

## Related Skills

- **content-driven-development**: Test content created during CDD serves as the basis for testing
- **building-blocks**: Invokes this skill during Step 5 for comprehensive testing
- **block-collection-and-party**: May provide reference test patterns from similar blocks

## When to Use This Skill

Use this skill:
- ✅ After implementing or modifying blocks
- ✅ After changes to core scripts (scripts.js, delayed.js, aem.js)
- ✅ After style changes (styles.css, lazy-styles.css)
- ✅ After configuration changes that affect functionality
- ✅ Before opening any pull request with code changes

This skill is typically invoked by the **building-blocks** skill during Step 5 (Test Implementation).

## Testing Workflow

Track your progress:

- [ ] Step 1: Run linting and fix issues
- [ ] Step 2: Perform browser validation (MANDATORY)
- [ ] Step 3: Determine if unit tests are needed (optional)
- [ ] Step 4: Run existing tests and verify they pass

## Step 1: Run Linting

**Run linting first to catch code quality issues:**

```bash
npm run lint
```

**If linting fails:**
```bash
npm run lint:fix
```

**Manually fix remaining issues** that auto-fix couldn't handle.

**Success criteria:**
- ✅ Linting passes with no errors
- ✅ Code follows project standards

**Mark complete when:** `npm run lint` passes with no errors

---

## Step 2: Browser Validation (MANDATORY)

**CRITICAL: You must test in a real browser and provide proof.**

### What to Test

Load test content URL(s) in browser and validate:
- ✅ Block/functionality renders correctly
- ✅ Responsive behavior (mobile, tablet, desktop viewports)
- ✅ No console errors
- ✅ Visual appearance matches requirements/acceptance criteria
- ✅ Interactive behavior works (if applicable)
- ✅ All variants render correctly (if applicable)

### How to Test

**Choose the method that makes most sense given your available tools:**

**Option 1: Browser/Playwright MCP (Recommended)**

If you have MCP browser or Playwright tools available, use them directly:
- Navigate to test content URL
- Take accessibility snapshots to inspect rendered content (preferred for interaction)
- Take screenshots at different viewports for visual validation
  - Consider both full-page screenshots and element-specific screenshots of the block being tested
- Interact with elements as needed
- Most efficient for agents with tool access

**Option 2: Playwright automation**

Write one (or more) temporary test scripts to validate functionality with playwright and capture snapshots/screenshots for inspection and validation.

```javascript
// test-my-block.js (temporary - don't commit)
import { chromium } from 'playwright';

async function test() {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  // Navigate and wait for block
  await page.goto('http://localhost:3000/path/to/test');
  await page.waitForSelector('.my-block');

  // Inspect accessibility tree (useful for validating structure)
  const accessibilityTree = await page.accessibility.snapshot();
  console.log('Accessibility tree:', JSON.stringify(accessibilityTree, null, 2));
  
  // Optionally save to file for easier analysis
  await require('fs').promises.writeFile(
    'accessibility-tree.json',
    JSON.stringify(accessibilityTree, null, 2)
  );

  // Test viewports and take screenshots
  await page.setViewportSize({ width: 375, height: 667 });
  await page.screenshot({ path: 'mobile.png', fullPage: true });
  await page.locator('.my-block').screenshot({ path: 'mobile-block.png' });

  await page.setViewportSize({ width: 768, height: 1024 });
  await page.screenshot({ path: 'tablet.png', fullPage: true });
  await page.locator('.my-block').screenshot({ path: 'tablet-block.png' });

  await page.setViewportSize({ width: 1200, height: 800 });
  await page.screenshot({ path: 'desktop.png', fullPage: true });
  await page.locator('.my-block').screenshot({ path: 'desktop-block.png' });

  // Check for console errors
  page.on('console', msg => console.log('Browser:', msg.text()));

  await browser.close();
}

test().catch(console.error);
```

Run: `node test-my-block.js` then delete the script and analyze the resulting artifacts.

**Option 3: Manual browser testing**

Use a standard web browser with dev tools:
1. Navigate to test content: `http://localhost:3000/path/to/test/content`
2. Use browser dev tools responsive mode to test viewports:
   - Mobile: <600px (e.g., 375px)
   - Tablet: 600-900px (e.g., 768px)
   - Desktop: >900px (e.g., 1200px)
3. Check console for errors at each viewport
4. Take screenshots as proof (browser screenshot tool or dev tools)

### Validation Against Acceptance Criteria

**If acceptance criteria provided (from CDD Step 2):**
- Review each criterion
- Test specific scenarios mentioned
- Verify all criteria are met

**If design/mockup screenshots provided:**
- Compare implementation to design
- Verify visual alignment
- Note any intentional deviations

### Proof of Testing

**You must provide:**
- ✅ Screenshots of test content in browser (at least one viewport)
- ✅ Confirmation no console errors
- ✅ Confirmation acceptance criteria met (if provided)

**Success criteria:**
- ✅ All test content loads and renders correctly
- ✅ Responsive behavior validated across viewports
- ✅ No console errors
- ✅ Screenshots captured as proof
- ✅ Acceptance criteria validated (if provided)

**Mark complete when:** Browser testing complete with screenshots as proof

---

## Step 3: Unit Tests (Optional)

**Determine if unit tests are needed for this change.**

**Write unit tests when:**
- ✅ Logic-heavy functions (calculations, transformations)
- ✅ Utility functions used across multiple blocks
- ✅ Data processing or API integrations
- ✅ Complex business logic

**Skip unit tests when:**
- ❌ Simple DOM manipulation
- ❌ CSS-only changes
- ❌ Straightforward decoration logic
- ❌ Changes easily validated in browser

**For guidance on what to test:** See `resources/testing-philosophy.md`

**If unit tests needed:**

```bash
# Verify test setup (see resources/vitest-setup.md if not configured)
npm test

# Write test for utility function
# test/utils/my-utility.test.js
import { describe, it, expect } from 'vitest';
import { myUtility } from '../../scripts/utils/my-utility.js';

describe('myUtility', () => {
  it('should transform input correctly', () => {
    expect(myUtility('input')).toBe('OUTPUT');
  });
});
```

**For detailed unit testing guidance:** See `resources/unit-testing.md`

**Success criteria:**
- ✅ Unit tests written for logic-heavy code
- ✅ Tests pass: `npm test`
- ✅ OR determined unit tests not needed

**Mark complete when:** Unit tests written and passing, or determined not needed

---

## Step 4: Run Existing Tests

**Verify your changes don't break existing functionality:**

```bash
npm test
```

**If tests fail:**
1. Read error message carefully
2. Run single test to isolate: `npm test -- path/to/test.js`
3. Fix code or update test if expectations changed
4. Re-run full test suite

**Success criteria:**
- ✅ All existing tests pass
- ✅ No regressions introduced

**Mark complete when:** `npm test` passes with no failures

## Troubleshooting

For detailed troubleshooting guide, see `resources/troubleshooting.md`.

**Common issues:**

### Tests fail
- Read error message carefully
- Run single test: `npm test -- path/to/test.js`
- Fix code or update test

### Linting fails
- Run `npm run lint:fix`
- Manually fix remaining issues

### Browser tests fail
- Verify dev server running: `aem up --html-folder drafts`
- Check test content exists in `drafts/tmp/`
- Verify URL uses `/tmp/` path: `http://localhost:3000/drafts/tmp/my-block`
- Add waits: `await page.waitForSelector('.block')`

## Resources

- **Unit Testing:** `resources/unit-testing.md` - Complete guide to writing and maintaining unit tests
- **Troubleshooting:** `resources/troubleshooting.md` - Solutions to common testing issues
- **Vitest Setup:** `resources/vitest-setup.md` - One-time configuration guide
- **Testing Philosophy:** `resources/testing-philosophy.md` - Guide on what and how to test

## Integration with Building Blocks Skill

The **building-blocks** skill invokes this skill during Step 5 (Test Implementation).

**Inputs received from building-blocks:**
- Block name being tested
- Test content URL(s) (from CDD Step 4)
- Any variants that need testing
- Screenshots of existing implementation/design/mockup to verify against (if provided)
- Acceptance criteria to verify (from CDD Step 2)

**Expected outputs to return to building-blocks:**
- ✅ Confirmation all testing steps complete
- ✅ Screenshots from browser testing as proof
- ✅ Confirmation linting passes
- ✅ Confirmation tests pass
- ✅ Any issues discovered and resolved
