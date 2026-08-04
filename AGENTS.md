# AGENTS.md

This project uses Edge Delivery Services in Adobe Experience Manager Sites as a Cloud Service, built on [aem-boilerplate](https://github.com/adobe/aem-boilerplate). 

Follow the patterns in this codebase and instructions in this file while working in this repository.

When facing trade-offs, follow this order: *Intuitive* (author-friendly) > *Simple* (minimal) > *Consistent* (matches existing patterns).

## Commands

- **Install**: `npm install` (or `npm ci`)
- **Lint**: `npm run lint`
- **Lint (fix)**: `npm run lint:fix`
- **Local dev**: `npx -y @adobe/aem-cli up --no-open --forward-browser-logs` (or `npm install -g @adobe/aem-cli` then `aem up`)
  - Server at http://localhost:3000 with auto-reload
  - View: playwright, puppeteer, or browser; if unavailable, ask human for feedback
  - Inspect delivered HTML/DOM: `curl http://localhost:3000/{path}` (or `.plain.html`) or `console.log` in code

## Stack

- Node.js 24; npm only (not pnpm/yarn)
- ESLint 8.57.1 with eslint-config-airbnb-base; Stylelint 17.2.0 with stylelint-config-standard
- AEM Edge Delivery: https://www.aem.live/

## Hard constraints

- **No runtime dependencies.** Zero production deps for optimal performance and automatic code-splitting via `/blocks/`.
- **No build step.** Code runs as ES modules in the browser. Do not add bundlers, transpilers, or build tools.
- **Do not modify:** `scripts/aem.js` (core AEM library), `package-lock.json` (let npm manage it), `node_modules/` (generated), `head.html` (global head content).
- **Always use `.js` in imports.** ESLint and native ES modules require it: `import { foo } from './bar.js';`

## Requirements

- **Security:**
  - Client-side code is public; do not commit secrets (API keys, passwords)
  - Use `.hlxignore` (same format as `.gitignore`) to exclude files from being served
- **Accessibility:**
  - Valid heading hierarchy; `alt` required on all images—empty (`alt=""`) for decorative, descriptive for content
  - Meet WCAG 2.1 AA
- **Performance:**
  - Optimize developer-committed images/assets in git (author-uploaded images are auto-optimized)
  - Use `lazy-styles.css` and `delayed.js` for non-critical resources
  - PageSpeed must score 100 (see https://www.aem.live/developer/keeping-it-100)
- **Responsiveness:** 
  - Default styles target mobile (no `max-width` queries)
  - Define breakpoints at 600/900/1200px
- **Localization:** 
  - No hard-coded user-facing text (e.g. labels, error messages)
  - Make all strings configurable or data-driven

## Code style

- Airbnb (ESLint), Stylelint standard
- **JavaScript**: ES6+ native modules; no transpiling or build
- **CSS**: Native CSS (features with equal or better browser support than ES6 modules); no preprocessors or frameworks
- **HTML**: Semantic HTML5 elements with ARIA attributes

## Project structure

```
├── blocks/{blockname}/
│   ├── {blockname}.js    # Block decoration
│   └── {blockname}.css   # Block styles
├── styles/
│   ├── styles.css        # LCP-critical global styles
│   ├── lazy-styles.css   # Below-fold styles
│   └── fonts.css         # Font declarations
├── scripts/
│   ├── aem.js            # Core AEM library for page decoration logic
│   ├── scripts.js        # Page decoration entry point and global utilities
│   └── delayed.js        # Delayed functionality (e.g. martech/analytics)
├── icons/                # SVG files; reference in code with <span class="icon icon-{name}"></span>
├── fonts/                # Web fonts
├── head.html             # Global <head> content
└── 404.html              # Custom error page
```

**Organization**:
- Global reusable code → `scripts/scripts.js`, `styles/styles.css`; block-specific code → block folders
- Check existing utilities in `scripts/aem.js` and `scripts/scripts.js` before writing new ones
  - New utilities → `scripts/scripts.js` (not `aem.js`)
- Check inherited styles from `styles/styles.css` before adding block CSS (use cascade)

## Page architecture

- **Content structure**: Pages are composed of sections → sections contain default content (text, headings, links) and blocks
  - See [content structure](https://www.aem.live/developer/markup-sections-blocks) and [markup reference](https://www.aem.live/developer/markup-reference)
  - **Test content**: For local development without authored content:
    - Create static HTML files in `drafts/` folder
    - Pass `--html-folder drafts` when starting dev server
    - Use `.html` or `.plain.html` extensions
- **Three-phase loading**: Pages load in phases for performance (eager → LCP, lazy → rest, delayed → martech); see `loadPage()` in `scripts.js`

## Block architecture

**File structure**: Every block lives in `blocks/{blockname}/` with two files: `{blockname}.css` and `{blockname}.js` (must export default `decorate(block)`).

```javascript
// blocks/example/example.js
/** @param {Element} block */
export default async function decorate(block) {
  // 1. Load dependencies
  // 2. Extract configuration
  // 3. Transform DOM
  // 4. Add event listeners
}
```

**Block content**:
- Expected HTML = contract between author and developer; decide structure before coding
- Keep structure simple for authors working in documents; handle missing/extra fields without breaking
- If structure requires hidden conventions or non-obvious formatting in authoring, redesign—authors work in documents, not code

**Scoping**: Blocks are self-contained.
- JS: Work only within the `block` element passed to `decorate()`—don't touch elements outside the block
- CSS: Scope all selectors to the block. Bad: `.item-list`. Good: `.{blockname} .item-list`. 
- Avoid `.{blockname}-container` and `.{blockname}-wrapper` (reserved for sections)

**Auto-blocking**: Blocks can also be created programmatically from content patterns; see `buildAutoBlocks()` in `scripts.js`.

## Environments

URL construction uses `{repo}` and `{owner}` from `gh repo view --json nameWithOwner`; use `git branch` for `{branch}`.

- **Local** (uncommitted code + previewed content): http://localhost:3000/{path} 
- **Preview**: `https://{branch}--{repo}--{owner}.aem.page/{path}`
- **Live**: `https://main--{repo}--{owner}.aem.live/{path}`

## Pull request workflow

1. **Lint passes**: `npm run lint` must pass (CI enforces this)
2. **Test locally**: Verify at http://localhost:3000
3. **Push to branch**: `https://{branch}--{repo}--{owner}.aem.page/{path}`
4. **Performance**: Run [PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/) on preview URL; fix until meeting Performance requirement
5. **Open PR**: Use `.github/pull_request_template.md`. Fill in:
  - Issue reference: `Fix #<issue-id>`
  - Test URLs: Before (main) and After (branch)—PR will be rejected without this
6. **Checks pass**: Run `gh pr checks` before requesting review

## Overrides

- Use `AGENTS.override.md` at repo root for temporary or team-specific overrides
- Use `AGENTS.local.md` at repo root for personal preferences; add it to `.gitignore` so it is not committed

## Troubleshooting

- Search with `site:www.aem.live`
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
- [Best Practices](https://www.aem.live/docs/davidsmodel)
- [Working with AI Agents](https://www.aem.live/developer/ai-coding-agents)
- [AEM Documentation](https://www.aem.live/docs/)
- Doc search: `curl -s https://www.aem.live/docpages-index.json | jq -r '.data[] | select(.content | test("KEYWORD"; "i")) | "\(.path): \(.title)"'`
