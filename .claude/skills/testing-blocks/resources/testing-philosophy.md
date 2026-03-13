# Testing Philosophy

**Core Principles:** 

- Create and maintain tests when the value they bring that exceeds the cost of creation and maintenance. Other things should and must be tested, but these tests can be temporary and not maintained long term
- Browser Tests, even when not maintained long term, are critical to ensuring functionality works before opening a PR

## Browser Tests

Most of your testing effort should focus on browser testing. This is where you validate that blocks actually work as intended in a real browser environment.

✅ **Always run browser tests for:**
- Every block you create or modify
- Visual layout and responsive behavior across breakpoints
- DOM structure and content transformation
- Interactive features (clicks, hovers, keyboard navigation)
- Accessibility (ARIA labels, focus management, screen reader compatibility)
- Integration between blocks and the page
- Performance (LCP, CLS, visual regressions)

Browser tests are **required before opening any PR**. They catch issues that unit tests cannot: rendering bugs, CSS conflicts, responsive breakdowns, accessibility failures, and real user interaction problems.

**Important:** Browser tests are considered **temporary** and should **not be committed** to source control. They serve their purpose during development and PR validation, but don't need long-term maintenance. Once your PR is merged and the code is in production, these tests have done their job.

## Unit Tests

✅ **Write unit tests for:**
- Logic-heavy utility functions used across multiple blocks
- Data processing and transformation logic
- API integrations and external service interactions
- Complex algorithms or business logic
- Shared libraries and helper functions

These tests provide lasting value because they catch regressions in reused code, serve as living documentation, and are fast and easy to maintain.

❌ **Don't write unit tests for:**
- Specifc DOM structures or UI Layouts
- Visual appearance validation
- Block-specific decoration logic or rendering behavior

These tests are still critical and must be tested, but we do that with browser testing. We don't want to commit these tests to git or maintain them long term.