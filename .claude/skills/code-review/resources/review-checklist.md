# PR Review Checklist

Detailed checklist for reviewing Edge Delivery Services pull requests. Use this as a reference when reviewing PRs.

## PR Structure Checklist

### Required Elements

| Item | Description | Priority |
|------|-------------|----------|
| Preview URL (Before) | URL showing current state on main branch | BLOCKING |
| Preview URL (After) | URL showing changes on feature branch | BLOCKING |
| PR Description | Clear explanation of what and why | BLOCKING |
| Scope Alignment | Changes match title/description | HIGH |
| Issue Reference | Link to GitHub issue (for bug fixes) | RECOMMENDED |
| Test Plan | How changes were tested | RECOMMENDED |

### Preview URL Format

```
Before: https://main--{repo}--{owner}.aem.page/{path-to-test-content}
After: https://{branch}--{repo}--{owner}.aem.page/{path-to-test-content}
```

### PR Description Template

```markdown
## Description
[What changed and why]

## Related Issue
Fix #<issue-number>

## Test URLs
- Before: https://main--{repo}--{owner}.aem.page/{path}
- After: https://{branch}--{repo}--{owner}.aem.page/{path}

## Types of Changes
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Styling change
- [ ] Refactor

## Checklist
- [ ] Linting passes
- [ ] Tested across viewports
- [ ] No console errors
- [ ] Performance validated
```

---

## JavaScript Checklist

### Linting & Style

| Check | Severity | Notes |
|-------|----------|-------|
| ESLint passes | BLOCKING | airbnb-base config |
| No `eslint-disable` without justification | HIGH | Specific disables with comments OK |
| No global `eslint-disable` | BLOCKING | Never acceptable |
| ES6+ features | MEDIUM | Use modern syntax |
| Import extensions | MEDIUM | Include `.js` extensions |

### Architecture

| Check | Severity | Notes |
|-------|----------|-------|
| No frameworks in critical path | HIGH | Affects LCP/TBT |
| Libraries via `loadScript()` | HIGH | Not in head.html |
| Consider IntersectionObserver | MEDIUM | For heavy libraries |
| aem.js unmodified | BLOCKING | Submit upstream PRs |
| No new build steps | HIGH | Without team consensus |

### Code Patterns

| Check | Severity | Notes |
|-------|----------|-------|
| Re-use existing DOM | MEDIUM | Don't recreate elements |
| Scoped selectors | HIGH | Block-specific |
| No hardcoded config | MEDIUM | Externalize values |
| No debug console logs | HIGH | Clean up before merge |
| Proper error handling | MEDIUM | Where appropriate |
| No CSS in JS | HIGH | Use CSS classes |

### Anti-Patterns to Flag

```javascript
// ANTI-PATTERN: Inline styles
element.style.color = 'red';
element.style.display = 'none';

// PREFERRED: CSS classes
element.classList.add('error');
element.classList.add('hidden');

// ANTI-PATTERN: innerHTML with styles
el.innerHTML = '<style>.foo { color: red; }</style>';

// PREFERRED: External CSS
// Add styles to block's CSS file

// ANTI-PATTERN: Hardcoded values
const API_URL = 'https://api.example.com';
const TIMEOUT = 5000;

// PREFERRED: Configuration
import { API_URL, TIMEOUT } from './config.js';

// ANTI-PATTERN: Global disable
/* eslint-disable */
function doSomething() { }

// PREFERRED: Specific disable with reason
/* eslint-disable-next-line no-param-reassign -- DOM element modification */
element.disabled = true;
```

---

## CSS Checklist

### Linting & Style

| Check | Severity | Notes |
|-------|----------|-------|
| Stylelint passes | BLOCKING | Standard config |
| No `!important` without justification | HIGH | Prefer specificity |
| Property order preserved | MEDIUM | Don't reorder in functional PRs |

### Scoping & Selectors

| Check | Severity | Notes |
|-------|----------|-------|
| Block-scoped selectors | BLOCKING | `.block-name .selector` |
| Prefixed private classes | MEDIUM | `block-name-private` |
| Simple, readable selectors | MEDIUM | Add classes vs complex selectors |
| ARIA attributes for states | LOW | `[aria-expanded="true"]` |

### Responsive Design

| Check | Severity | Notes |
|-------|----------|-------|
| Mobile-first approach | HIGH | Base = mobile, media queries for larger |
| Standard breakpoints | HIGH | 600px, 900px, 1200px |
| min-width only | MEDIUM | Don't mix with max-width |
| All viewports tested | HIGH | Mobile, tablet, desktop |

### Frameworks & Preprocessors

| Check | Severity | Notes |
|-------|----------|-------|
| No Sass/Less/PostCSS | HIGH | Without team consensus |
| No Tailwind/etc | HIGH | Without team consensus |
| Native CSS features | MEDIUM | Evergreen browser support |

### Anti-Patterns to Flag

```css
/* ANTI-PATTERN: Unscoped selector */
.title {
  font-size: 2rem;
}

/* PREFERRED: Block-scoped */
main .hero .title {
  font-size: 2rem;
}

/* ANTI-PATTERN: !important overuse */
.button {
  background: blue !important;
  color: white !important;
}

/* PREFERRED: Higher specificity */
main .hero .button {
  background: blue;
  color: white;
}

/* ANTI-PATTERN: Mixed breakpoint directions */
@media (max-width: 599px) {
  .block { padding: 1rem; }
}
@media (min-width: 900px) {
  .block { padding: 2rem; }
}

/* PREFERRED: Consistent mobile-first */
.block {
  padding: 1rem; /* mobile */
}
@media (min-width: 600px) {
  .block { padding: 1.5rem; }
}
@media (min-width: 900px) {
  .block { padding: 2rem; }
}

/* ANTI-PATTERN: Complex, unreadable selectors */
.block > div:first-child > ul > li:nth-child(2) > a {
  color: red;
}

/* PREFERRED: Add semantic classes */
.block .nav-link-secondary {
  color: red;
}
```

---

## Performance Checklist

| Check | Severity | Notes |
|-------|----------|-------|
| Lighthouse mobile green | BLOCKING | Ideally 100 |
| Lighthouse desktop green | BLOCKING | Ideally 100 |
| No libs in head.html | BLOCKING | Critical path |
| No layout shifts | HIGH | CLS impact |
| Images optimized | HIGH | Size and format |
| IntersectionObserver for heavy ops | MEDIUM | Defer loading |
| No sync blocking operations | HIGH | Render blocking |
| Reasonable bundle size | MEDIUM | No unnecessary minification |

### Performance Testing

```bash
# Check preview URLs with PSI
# Mobile
https://pagespeed.web.dev/analysis?url=https://{branch}--{repo}--{owner}.aem.page/{path}&form_factor=mobile

# Desktop
https://pagespeed.web.dev/analysis?url=https://{branch}--{repo}--{owner}.aem.page/{path}&form_factor=desktop
```

---

## Content & Authoring Checklist

| Check | Severity | Notes |
|-------|----------|-------|
| Author-friendly structure | MEDIUM | Easy to understand |
| Backward compatibility | HIGH | Existing content works |
| No breaking migrations | HIGH | Content shouldn't need updates |
| No hardcoded strings | MEDIUM | Use placeholders/spreadsheets |
| No committed binaries | HIGH | Unless code-referenced |

---

## Security Checklist

| Check | Severity | Notes |
|-------|----------|-------|
| No secrets committed | BLOCKING | API keys, passwords, etc |
| No XSS vulnerabilities | BLOCKING | Sanitize user input |
| No innerHTML with user data | BLOCKING | Use textContent |
| CSP headers (tools) | HIGH | For tool pages |
| External links safe | MEDIUM | rel="noopener noreferrer" |
| No eval() or Function() | BLOCKING | Code injection risk |

### Security Patterns

```javascript
// ANTI-PATTERN: XSS vulnerability
element.innerHTML = userInput;

// PREFERRED: Safe text content
element.textContent = userInput;

// ANTI-PATTERN: Unsafe URL construction
const url = `https://api.example.com?q=${userInput}`;

// PREFERRED: URL encoding
const url = `https://api.example.com?q=${encodeURIComponent(userInput)}`;

// ANTI-PATTERN: Missing rel attribute
<a href="https://external.com" target="_blank">Link</a>

// PREFERRED: Secure external links
<a href="https://external.com" target="_blank" rel="noopener noreferrer">Link</a>
```

---

## Visual Validation Checklist

### Screenshot Capture

| Check | Severity | Notes |
|-------|----------|-------|
| Desktop screenshot captured | HIGH | 1200px viewport |
| Mobile screenshot captured | HIGH | 375px viewport |
| Tablet screenshot captured | MEDIUM | 768px viewport |
| Block-specific screenshot | MEDIUM | If block changes |
| Before/After comparison | MEDIUM | For visual changes |

### Visual Assessment

| Check | Severity | Notes |
|-------|----------|-------|
| Layout correct across viewports | HIGH | No broken layouts |
| No visual regressions | HIGH | Compare to main branch |
| Colors consistent | MEDIUM | With design system |
| Typography correct | MEDIUM | Font sizes, weights |
| Images display properly | HIGH | Size, aspect ratio |
| Icons visible | HIGH | All icons render |
| Dark mode works | MEDIUM | If applicable |
| Animations smooth | LOW | If applicable |

### Common Visual Issues

| Issue | What to Look For |
|-------|------------------|
| Layout breaks | Elements overlapping, overflowing, misaligned |
| Text issues | Truncation, overflow, wrong font, poor contrast |
| Image problems | Wrong size, aspect ratio, missing, broken |
| Responsive failures | Layout not adapting to viewport |
| Spacing issues | Inconsistent margins, padding |
| Color problems | Wrong colors, poor contrast, dark mode issues |
| Icon issues | Missing, wrong size, wrong color |

### Screenshot Commands

```bash
# Using the capture-screenshots.js utility
cd .claude/skills/pr-review/scripts
npm install
node capture-screenshots.js <after-url> [before-url] [output-dir] [block-selector]

# Examples
node capture-screenshots.js https://branch--repo--owner.aem.page/path
node capture-screenshots.js https://branch--repo--owner.aem.page/path https://main--repo--owner.aem.page/path
node capture-screenshots.js https://branch--repo--owner.aem.page/path "" ./screenshots ".hero"
```

### Embedding Screenshots in PR Comment

```markdown
## Visual Preview

### Desktop (1200px)
![Desktop Screenshot](path/to/desktop.png)

### Mobile (375px)
![Mobile Screenshot](path/to/mobile.png)

<details>
<summary>Additional Screenshots</summary>

### Tablet (768px)
![Tablet Screenshot](path/to/tablet.png)

### Block Detail
![Block Screenshot](path/to/block.png)

</details>
```

---

## Accessibility Checklist

| Check | Severity | Notes |
|-------|----------|-------|
| Semantic HTML | HIGH | Proper element usage |
| Heading hierarchy | HIGH | Sequential, no skips |
| Alt text for images | HIGH | Descriptive |
| ARIA labels | MEDIUM | For interactive elements |
| Keyboard navigation | HIGH | Tab order, focus states |
| Color contrast | HIGH | WCAG AA compliance |
| Focus visible | MEDIUM | Clear focus indicators |

---

## Review Severity Guide

### BLOCKING (Must Fix)
- PR cannot be merged until resolved
- Examples: security issues, linting failures, missing preview URLs, breaking changes

### HIGH (Should Fix)
- Should be resolved before merge
- Examples: performance issues, accessibility violations, code quality concerns

### MEDIUM (Recommended)
- Strong recommendation to fix
- Examples: best practice violations, maintainability concerns

### LOW (Consider)
- Nice-to-have improvements
- Examples: code style preferences, documentation enhancements
