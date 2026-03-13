# Testing Troubleshooting Guide

Common issues encountered during testing and how to resolve them.

## Tests Fail After Changes

### Unit Tests Fail

**Symptoms:**
- Test suite runs but some tests fail
- Error messages about unexpected values or behaviors

**Diagnosis:**

1. **Read the error message carefully**
   - What assertion failed?
   - What was expected vs actual?
   - Which test file and line number?

2. **Determine the cause:**
   - Did you break existing functionality?
   - Did requirements change?
   - Is the test incorrect?

**Solutions:**

**If you broke functionality:**
```bash
# Fix the code, not the test
# Re-run tests
npm test
```

**If requirements changed:**
```bash
# Update the test to match new requirements
# Ensure the change is intentional
npm test
```

**If testing a specific file:**
```bash
# Run just one test file for faster feedback
npm test -- test/utils/my-utility.test.js
```

**If debugging a specific test:**
```bash
# Use test.only to run just one test
it.only('should do something', () => {
  // This test will be the only one that runs
});
```

### Browser Tests Fail

**Symptoms:**
- Browser test script throws errors
- Screenshots not generated
- Timeouts occur

**Common Issues and Solutions:**

**Issue: Dev server not running**
```bash
# Start the dev server
aem up

# Verify it's accessible
curl http://localhost:3000
```

**Issue: Test content doesn't exist**
- Verify the URL manually in a browser
- Check that content is published/previewed
- Ensure path in test script is correct

**Issue: Block not decorated**
```javascript
// Add wait for specific selector
await page.waitForSelector('.my-block');

// Or wait for network idle
await page.waitForLoadState('networkidle');

// Or increase timeout
await page.waitForSelector('.my-block', { timeout: 10000 });
```

**Issue: Timing problems**
```javascript
// Wait for animations to complete
await page.waitForTimeout(500);

// Wait for specific state
await page.waitForFunction(() => {
  return document.querySelector('.my-block').classList.contains('loaded');
});
```

**Issue: Elements not clickable**
```javascript
// Wait for element to be clickable
await page.locator('.button').click({ force: false });

// Or scroll into view first
await page.locator('.button').scrollIntoViewIfNeeded();
await page.locator('.button').click();
```

## Linting Fails

### Common Linting Issues

**Unused variables**
```javascript
// Error: 'foo' is defined but never used
const foo = 'bar';

// Fix: Remove unused variable
// Or use it
```

**Missing semicolons**
```javascript
// Error: Missing semicolon
const foo = 'bar'

// Fix: Add semicolon
const foo = 'bar';
```

**Incorrect indentation**
```bash
# Auto-fix indentation issues
npm run lint:fix
```

**Console.log statements**
```javascript
// Error: Unexpected console statement
console.log('debug info');

// Fix Option 1: Remove it
// (remove the line)

// Fix Option 2: Disable rule for this line
// eslint-disable-next-line no-console
console.log('debug info');
```

**Import issues**
```javascript
// Error: Unable to resolve path to module
import { foo } from './utils';

// Fix: Add .js extension
import { foo } from './utils.js';
```

**Airbnb style violations**
```javascript
// Error: Expected a line break after this opening brace
import { foo, bar } from './utils.js';

// Fix: Let lint:fix handle it
// Or manually format:
import {
  foo,
  bar,
} from './utils.js';
```

### Quick Fixes

**Auto-fix everything possible:**
```bash
npm run lint:fix
```

**Check what would be fixed:**
```bash
npm run lint:js -- --fix-dry-run
```

**Lint specific files:**
```bash
npm run lint:js -- test/utils/my-test.test.js
```

## GitHub Checks Fail

### Checks Don't Run

**Issue: PSI checks not running**

**Cause:** Missing test link in PR description

**Solution:**
```markdown
## Testing
Preview: https://branch--repo--owner.aem.page/path/to/test
```

The test link MUST be in the PR description for PSI checks to run.

**Issue: Actions workflow disabled**

Check repository settings → Actions → ensure workflows are enabled.

### PSI Checks Fail

**Issue: Poor performance score**

**Common causes:**
- Too much JavaScript loaded eagerly
- CSS blocking render
- Large unoptimized images
- Third-party scripts in eager phase

**Solutions:**

**Move JavaScript to lazy or delayed phase:**
```javascript
// In scripts.js, move non-LCP code to loadLazy() or loadDelayed()
```

**Optimize images:**
- Use WebP format
- Lazy load below-the-fold images
- Use appropriate dimensions

**Defer non-critical CSS:**
```css
/* Move non-LCP styles to lazy-styles.css */
```

**Review performance report:**
```bash
# Check details in GitHub PR checks
gh pr checks

# Click on failed check for details
```

### Linting Checks Fail in CI

**Issue: Tests pass locally but fail in CI**

**Cause:** Linting not run locally or different config

**Solution:**
```bash
# Always run lint before committing
npm run lint

# Ensure .eslintrc.js is committed
git add .eslintrc.js
git commit -m "Add eslint config"
```

## Tests Pass Locally But Fail in CI

### Different Node Version

**Symptoms:**
- Syntax errors in CI
- Missing features

**Solution:**

Check CI Node version matches local:
```bash
# Check local version
node --version

# Add .nvmrc if needed
echo "20" > .nvmrc
git add .nvmrc
git commit -m "Add nvmrc for consistent Node version"
```

### Missing Dependencies

**Symptoms:**
- Module not found errors in CI
- Dependencies work locally

**Solution:**

```bash
# Ensure package.json is up to date
git add package.json package-lock.json
git commit -m "Update dependencies"

# Or regenerate lock file
rm package-lock.json
npm install
git add package-lock.json
```

### Environment Differences

**Symptoms:**
- Tests dependent on local files fail
- Absolute paths don't work

**Solution:**

Use relative paths and environment-agnostic code:
```javascript
// Bad: Absolute path
const path = '/Users/me/project/file.js';

// Good: Relative path
const path = './file.js';
```

### Race Conditions

**Symptoms:**
- Tests sometimes pass, sometimes fail
- Timing-dependent failures

**Solution:**

Add proper waits:
```javascript
// Bad: No wait
it('should update text', async () => {
  await updateText();
  expect(getText()).toBe('updated');
});

// Good: Wait for update
it('should update text', async () => {
  await updateText();
  await waitFor(() => getText() === 'updated');
  expect(getText()).toBe('updated');
});
```

## Vitest-Specific Issues

### Module Resolution Errors

**Error:**
```
Failed to resolve import './utils.js'
```

**Solution:**

Check import paths are correct:
```javascript
// From test/utils/my-test.test.js
// Importing from scripts/utils/my-utility.js

// Correct:
import { myUtility } from '../../scripts/utils/my-utility.js';

// Wrong (missing ../../):
import { myUtility } from 'scripts/utils/my-utility.js';
```

### jsdom Errors

**Error:**
```
document is not defined
```

**Solution:**

Ensure vitest.config.js has jsdom environment:
```javascript
export default defineConfig({
  test: {
    environment: 'jsdom', // Important!
  },
});
```

### Coverage Not Generated

**Error:**
```
Coverage provider not found
```

**Solution:**

Install coverage package:
```bash
npm install --save-dev @vitest/coverage-v8
```

## Getting Help

If you're stuck:

1. **Read the error message completely** - Often contains the solution
2. **Check the documentation** - vitest.dev, playwright.dev
3. **Search existing issues** - GitHub issues for Vitest/Playwright
4. **Simplify** - Create minimal reproduction of the issue
5. **Ask for help** - Include error messages and context

## Preventive Measures

**To avoid issues:**

- ✅ Run `npm test` before every commit
- ✅ Run `npm run lint` before every commit
- ✅ Use `npm run test:watch` during development
- ✅ Test in browser manually before opening PR
- ✅ Include test links in PR descriptions
- ✅ Monitor `gh pr checks` after creating PR

**Don't:**
- ❌ Skip testing locally
- ❌ Commit failing tests
- ❌ Ignore linting errors
- ❌ Force push without re-running tests
- ❌ Merge PRs with failing checks

## Quick Diagnostic Commands

```bash
# Check Node version
node --version

# Check npm version
npm --version

# Verify Vitest installed
npm list vitest

# Verify test config
cat vitest.config.js

# Check dev server running
curl http://localhost:3000

# Verify git status
git status

# Check GitHub PR status
gh pr checks
```

## Next Steps

After resolving issues:

1. Re-run all checks
2. Verify everything passes
3. Commit fixes if needed
4. Update documentation if issue was unclear
5. Help others avoid the same issue

Remember: Every error is a learning opportunity. Take time to understand why something failed, not just how to fix it.
