# AGENTS.md

This is the AEM Edge Delivery boilerplate project - a starter template for AEM Edge Delivery Services projects. This file provides guidance for AI coding agents working on this project.

## Project Overview

This is a boilerplate project for Adobe AEM Edge Delivery Services that serves as the foundation for all AEM Edge Delivery projects. It provides the basic structure, blocks, and configuration needed to get started quickly.

**Key Technologies:**
- AEM Edge Delivery Services
- Vanilla JavaScript (ES6+)
- CSS3 with modern features
- HTML5 semantic markup
- Node.js tooling

## Setup Commands

- Install dependencies: `npm install`
- Start local development: `aem up` (requires AEM CLI)
  - Install the AEM CLI globally by running `npm install -g @adobe/aem-cli`
- Run linting: `npm run lint`
- Fix linting issues: `npm run lint:fix`

## Project Structure

```
├── blocks/          # Reusable content blocks
    └── {blockName}/   - Individual block directory
        ├── {blockName}.js      # Block's JavaScript
        └── {blockName}.css     # Block's styles
├── styles/          # Global styles and CSS
    ├── styles.css          # Minimal global styling and layout for your website required for LCP
    └── lazy-styles.css     # Additional global styling and layout for below the fold/post LCP content
├── scripts/         # JavaScript libraries and utilities
    ├── aem.js           # Core AEM Library for Edge Delivery page decoration logic
    ├── scripts.js       # Global JavaScript utilities, main entry point for page decoration
    └── delayed.js       # Delayed functionality such as martech loading
├── fonts/           # Web fonts
├── icons/           # SVG icons
├── head.html        # Global HTML head content
└── 404.html         # Custom 404 page
```

## Code Style Guidelines

### JavaScript
- Use ES6+ features (arrow functions, destructuring, etc.)
- Follow Airbnb ESLint rules (already configured)
- Always include `.js` file extensions in imports
- Use Unix line endings (LF)

### CSS
- Follow Stylelint standard configuration
- Use modern CSS features (CSS Grid, Flexbox, CSS Custom Properties)
- Maintain responsive design principles
- Declare styles mobile first, use media queries for tablet and desktop specific styles
- Use 600px/900px/1200px as breakpoints

### HTML
- Use semantic HTML5 elements
- Ensure accessibility standards (ARIA labels, proper heading hierarchy)
- Follow AEM markup conventions for blocks and sections

## Key Concepts

### Content

CMS authored content is a key part of every AEM Website. The content of a page is broken into sections. Sections can have default content (text, headings, links, etc.) as well as content in blocks.

### Blocks

Blocks are the re-usable building blocks of AEM. Blocks add styling and functionality to content. Each block has an initial content structure it expects, and transforms the html in the block using DOM APIs to render a final structure. 

The initial content sturcture is important because it impacts how the author will create the content and how you will write your code to decorate it. In some sense, you can think of this structure as the contract for your block between the author and the developer. You should decide on this initial structure before writing any code, and be careful when making changes to code that makes assumptions about that structure as it could break existing pages.

The block javascript should export a default function which is called to perform the block decoration:

```
/**
 * loads and decorates the block
 * @param {Element} block The block element
 */
export default async function decorate(block) {
  // 1. Load dependencies
  // 2. Extract configuration, if applicable
  // 3. Transform DOM
  // 4. Add event listeners
  // 5. Set loaded status
}
```

### Auto-Blocking

Auto-blocking is the process of creating blocks that aren't explicitly authored into the page based on patterns in the content. See the `buildAutoBlocks` function in scripts.js.

### Three-Phase Page Loading

Pages are progressively loaded in three phases to maximize performance. This process begins when `loadPage` from scripts.js is called.

* Eager - load only what is required to get to LCP. This generally includes decorating the overall page content to create sections, blocks, buttons, etc. and loading the first section of the page.
* Lazy - load all other page content, including the header and footer.
* Delayed - load things that can be safely loaded later here and incur a performance penalty when loaded earlier

## Development Workflow

### Local Development
1. Run `aem up` to start the AEM Proxy server
2. Open `http://localhost:3000` in your browser
3. Make changes to files - they will auto-reload
4. Use browser dev tools to test responsive design

### Block Development
- Each block in the `blocks/` directory should be self-contained and re-useable
- Include CSS and JS files for each block
- Follow the naming convention: `blockname.css`, `blockname.js`
- Blocks should be responsive and accessible by default

### Styling
- Global styles go in `styles/styles.css`
- Font definitions in `styles/fonts.css`
- Lazy-loaded styles in `styles/lazy-styles.css`
- Block-specific styles in their respective directories

## Testing & Quality Assurance

### Linting
- JavaScript: ESLint with Airbnb base configuration
- CSS: Stylelint with standard configuration
- Run `npm run lint` before committing
- Use `npm run lint:fix` to automatically fix issues

### Performance
- Follow AEM Edge Delivery performance best practices
- Optimize images and assets
- Use lazy loading for non-critical resources
- Minimize JavaScript bundle size

### Accessibility
- Ensure proper heading hierarchy
- Include alt text for images
- Test with screen readers
- Follow WCAG 2.1 AA guidelines

## Deployment

### Environments
- **Production Preview**: `https://main--{repo}--{owner}.aem.page/`
- **Production Live**: `https://main--{repo}--{owner}.aem.live/`
- **Feature Preview**: `https://{branch}--{repo}--{owner}.aem.page/`

### Publishing Process
1. Push changes to a feature branch
2. AEM Code Sync automatically processes changes making them available on feature preview environment for that branch
3. Open a pull request to merge changes to main
4. Merge the PR
5. AEM Code Sync updates the main branch for production

## Common Tasks

### Adding New Blocks
1. Create a new directory in `blocks/`
2. Add `blockname.css` and `blockname.js` files
3. Update documentation if needed
4. Test in local development environment

### Modifying Existing Blocks
1. Make changes to the specific block files
2. Test locally with `aem up`
3. Ensure responsive behavior across devices
4. Run linting before committing

### Global Style Changes
1. Modify files in the `styles/` directory
2. Test across different blocks and pages
3. Ensure changes don't break existing layouts
4. Consider impact on performance, especially CLS

## Troubleshooting

### Getting Help
- Check [AEM Edge Delivery documentation](https://www.aem.live/docs/)
- Review [Developer Tutorial](https://www.aem.live/developer/tutorial)
- Consult [The Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
- Consider the rules in [David's Model](https://www.aem.live/docs/davidsmodel)

## Security Considerations

- Never commit sensitive information (API keys, passwords)
- Use environment variables for configuration
- Follow Adobe security guidelines
- Regularly update dependencies
- Use the .hlxignore file to prevent filed from being served

## Contributing

- Follow the existing code style and patterns
- Test changes locally before committing
- Run a PSI check on your branch and fix performance issues before raising a PR
- Ensure all linting passes
- Update documentation for significant changes
- Follow the project's Code of Conduct
