# Unit Testing Guide

Unit tests are keeper tests for logic-heavy code that benefits from automated regression testing. This guide covers when to write unit tests, how to structure them, and best practices for maintainable test suites.

## When to Write Unit Tests

Write unit tests for:
- **Pure functions** - Functions with no side effects that transform inputs to outputs
- **Utility libraries** - Shared helper functions used across blocks
- **Data processors** - Code that parses, transforms, or validates data
- **API integrations** - Functions that interact with external services
- **Complex algorithms** - Business logic, calculations, or conditional flows

Do NOT write unit tests for:
- Block decoration functions (test these in browser)
- DOM manipulation logic (test in browser)
- CSS styles (test in browser)
- Simple getters/setters
- Code that primarily renders UI

## Prerequisites

This guide assumes Vitest is already configured in the project. If not, see `vitest-setup.md` for one-time setup instructions.

**Verify test setup exists:**

```bash
npm test  # Should run without errors (even if no tests exist yet)
```

If the command fails or Vitest is not installed, consult `vitest-setup.md`.

**Important:** Ensure test files are not served to production by adding them to `.hlxignore`:

```
# .hlxignore
test/
*.test.js
```

This prevents test files from being accessible on your live site.

## Writing Unit Tests

### File Location and Naming

Place test files next to the code they test:
- `scripts/utils/my-utility.js` → `test/utils/my-utility.test.js`
- `blocks/hero/utils.js` → `test/blocks/hero/utils.test.js`

**Naming convention:** `{filename}.test.js`

### Test Structure

```javascript
import { describe, it, expect } from 'vitest';
import { myUtility } from '../../scripts/utils/my-utility.js';

describe('myUtility', () => {
  it('should transform input correctly', () => {
    const input = { foo: 'bar' };
    const result = myUtility(input);
    expect(result).toEqual({ foo: 'BAR' });
  });

  it('should handle edge cases', () => {
    expect(myUtility(null)).toBeNull();
    expect(myUtility({})).toEqual({});
  });
});
```

### Running Tests

```bash
npm test                 # Run all tests once
npm run test:watch      # Run tests in watch mode
npm run test:ui         # Open interactive UI
npm run test:coverage   # Generate coverage report
```

## What Makes a Good Unit Test

**Good unit tests are:**
- **Fast** - Run in milliseconds
- **Isolated** - Test one function/unit at a time
- **Repeatable** - Same input always produces same output
- **Self-validating** - Pass or fail clearly, no manual inspection
- **Focused** - Test one behavior per test case

## Complete Example

Here's an example of a keeper test that's worth maintaining:

```javascript
// scripts/utils/url-helpers.js
export function normalizeUrl(url, base) {
  if (!url) return '';
  if (url.startsWith('http://') || url.startsWith('https://')) return url;
  if (url.startsWith('/')) return `${base}${url}`;
  return `${base}/${url}`;
}

// test/utils/url-helpers.test.js
import { describe, it, expect } from 'vitest';
import { normalizeUrl } from '../../scripts/utils/url-helpers.js';

describe('normalizeUrl', () => {
  const base = 'https://example.com';

  it('returns empty string for null/undefined', () => {
    expect(normalizeUrl(null, base)).toBe('');
    expect(normalizeUrl(undefined, base)).toBe('');
  });

  it('returns absolute URLs unchanged', () => {
    expect(normalizeUrl('https://other.com/path', base)).toBe('https://other.com/path');
    expect(normalizeUrl('http://other.com/path', base)).toBe('http://other.com/path');
  });

  it('prepends base to root-relative URLs', () => {
    expect(normalizeUrl('/path/to/page', base)).toBe('https://example.com/path/to/page');
  });

  it('prepends base with slash to relative URLs', () => {
    expect(normalizeUrl('path/to/page', base)).toBe('https://example.com/path/to/page');
  });
});
```

**Why this test is worth maintaining:**
- URL normalization is used across many blocks
- Bugs here would break multiple features
- Logic is complex enough to benefit from regression tests
- Test is fast and easy to maintain

## Testing with jsdom

When testing DOM-dependent code, jsdom provides a browser-like environment:

```javascript
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('DOM manipulation', () => {
  let document;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    document = dom.window.document;
    global.document = document;
  });

  it('should create elements', () => {
    const div = document.createElement('div');
    div.textContent = 'Hello';
    expect(div.textContent).toBe('Hello');
  });
});
```

## Integration Tests

Integration tests validate that multiple components work together correctly. These fall into the "keeper" category if they test critical workflows.

**When to write integration tests:**
- Auto-blocking logic that depends on multiple functions
- Complex workflows spanning multiple utilities
- Critical user journeys that depend on multiple blocks

Integration tests use the same Vitest setup as unit tests but test multiple components together.

**Example integration test:**

```javascript
// test/integration/auto-blocking.test.js
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';
import { buildAutoBlocks } from '../../scripts/scripts.js';

describe('Auto-blocking integration', () => {
  let document;

  beforeEach(() => {
    const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>');
    document = dom.window.document;
    global.document = document;
  });

  it('should auto-block hero from first section with image', () => {
    const main = document.createElement('main');
    const section = document.createElement('div');
    const picture = document.createElement('picture');
    section.appendChild(picture);
    main.appendChild(section);

    buildAutoBlocks(main);

    const hero = main.querySelector('.hero');
    expect(hero).toBeTruthy();
    expect(hero.querySelector('picture')).toBeTruthy();
  });
});
```

Integration tests are worth maintaining if:
- The workflow is critical to site functionality
- Multiple teams/developers work on related code
- Bugs in this integration would be expensive to fix

## Best Practices

1. **Test behavior, not implementation** - Focus on what the function does, not how it does it
2. **Use descriptive test names** - Test names should explain what they're testing
3. **One assertion per test** - Or multiple assertions testing the same behavior
4. **Avoid test interdependence** - Each test should be able to run independently
5. **Keep tests simple** - Tests should be easier to understand than the code they test
6. **Mock external dependencies** - API calls, file system access, etc.
7. **Test edge cases** - Null, undefined, empty strings, boundary values

## Common Patterns

### Testing async functions

```javascript
it('should fetch data asynchronously', async () => {
  const result = await fetchData();
  expect(result).toBeDefined();
});
```

### Using beforeEach for setup

```javascript
describe('Calculator', () => {
  let calculator;

  beforeEach(() => {
    calculator = new Calculator();
  });

  it('should add numbers', () => {
    expect(calculator.add(2, 3)).toBe(5);
  });
});
```

### Testing error conditions

```javascript
it('should throw error for invalid input', () => {
  expect(() => {
    validateInput('invalid');
  }).toThrow('Invalid input');
});
```

## Next Steps

Once you've written unit tests:
1. Run tests during development with `npm run test:watch`
2. Run full test suite before commits with `npm test`
3. Monitor coverage with `npm run test:coverage`
4. Keep tests updated as code evolves
