# Vitest Setup Guide

This guide covers the one-time setup of Vitest for unit testing in AEM Edge Delivery projects. Once configured, you won't need to repeat these steps.

## Installation

Install Vitest and required dependencies:

```bash
npm install --save-dev vitest @vitest/ui jsdom
```

Optional but recommended for coverage reports:

```bash
npm install --save-dev @vitest/coverage-v8
```

## Configuration

Create `vitest.config.js` in the project root:

```javascript
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      exclude: [
        'node_modules/',
        'test/',
        '**/*.config.js',
      ],
    },
  },
});
```

### Configuration Options Explained

- **environment: 'jsdom'** - Provides browser-like environment for testing DOM code
- **globals: true** - Makes `describe`, `it`, `expect` available without imports
- **coverage** - Configures code coverage reporting (optional but useful)

## Package.json Scripts

Add test scripts to your `package.json`:

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

### Script Descriptions

- **`npm test`** - Run all tests once (use in CI or before commits)
- **`npm run test:watch`** - Run tests in watch mode (use during development)
- **`npm run test:ui`** - Open interactive web UI for tests
- **`npm run test:coverage`** - Generate code coverage report

## Directory Structure

Create directories for test files:

```bash
mkdir -p test/utils
mkdir -p test/blocks
```

### Recommended Structure

```
project-root/
├── scripts/
│   └── utils/
│       └── my-utility.js
├── blocks/
│   └── hero/
│       ├── hero.js
│       ├── hero.css
│       └── utils.js
└── test/
    ├── utils/
    │   └── my-utility.test.js
    └── blocks/
        └── hero/
            └── utils.test.js
```

**Test file naming:** `{filename}.test.js`

## Verify Installation

Run tests to verify setup:

```bash
npm test
```

If no tests exist yet, you should see:

```
No test files found, exiting with code 0
```

Create a simple test to verify everything works:

```javascript
// test/example.test.js
import { describe, it, expect } from 'vitest';

describe('Vitest setup', () => {
  it('should be configured correctly', () => {
    expect(true).toBe(true);
  });
});
```

Run tests again:

```bash
npm test
```

You should see the test pass. Once verified, delete `test/example.test.js`.

## Usage with jsdom

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

## CI Integration

For GitHub Actions or other CI, tests run automatically with:

```bash
npm test
```

Consider adding to your CI workflow:

```yaml
- name: Run tests
  run: npm test

- name: Generate coverage
  run: npm run test:coverage
```

## Troubleshooting

**"vitest: command not found"**
- Ensure `vitest` is in `devDependencies` in package.json
- Run `npm install`

**"Cannot find module 'jsdom'"**
- Install jsdom: `npm install --save-dev jsdom`

**Tests not finding imports**
- Check import paths are correct relative to test file location
- Ensure files being tested export the functions properly

**Coverage not working**
- Install coverage provider: `npm install --save-dev @vitest/coverage-v8`

## Next Steps

Once setup is complete:
1. Write unit tests following the patterns in the main **testing-blocks** skill
2. Run tests during development with `npm run test:watch`
3. Run full test suite before commits with `npm test`
4. Monitor coverage with `npm run test:coverage`

This is a one-time setup. Once configured, focus on writing valuable tests rather than configuration.
