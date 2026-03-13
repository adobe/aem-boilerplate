# Web Page Analysis

Automated webpage analysis and preparation for content migration using npm playwright.

## Purpose

The web page analysis workflow prepares a source webpage for content migration by:
- Loading the page and triggering lazy-loaded content
- Capturing visual references (screenshots)
- Extracting cleaned HTML with preserved attributes
- Extracting metadata for SEO preservation
- Enhancing section boundary visibility for analysis

## Prerequisites

- Node.js installed
- npm playwright package: `npm install playwright`
- Browser binaries: `npx playwright install chromium`

## Usage

### Command Line

```bash
node .claude/skills/scrape-webpage/scripts/analyze-webpage.js "https://example.com/page" --output ./analysis
```

### Parameters

- **URL** (required): The webpage URL to analyze
- **--output** (optional): Output directory for artifacts. Defaults to `./page-analysis`

### Output

The script produces both structured data (JSON) and file artifacts:

**JSON Output (stdout + saved to metadata.json):**
```json
{
  "url": "https://example.com/page",
  "timestamp": "2025-01-12T10:30:00.000Z",
  "paths": {
    "documentPath": "/us/en/about",
    "htmlFilePath": "us/en/about.html",
    "mdFilePath": "us/en/about.md",
    "dirPath": "us/en",
    "filename": "about"
  },
  "screenshots": {
    "original": "./analysis/original.png",
    "enhancedContrast": "./analysis/enhanced-contrast.png"
  },
  "html": {
    "filePath": "./analysis/cleaned.html",
    "size": 45230
  },
  "metadata": {
    "title": "Page Title",
    "description": "Page description",
    "og:image": "https://example.com/image.jpg",
    "canonical": "https://example.com/page",
    ...
  }
}
```

**File Artifacts:**
- `metadata.json` - Complete analysis results including paths (saved automatically)
- `original.png` - Screenshot of the page as rendered
- `enhanced-contrast.png` - Screenshot with exaggerated section background colors
- `cleaned.html` - Extracted main content HTML with preserved src/href attributes

## Analysis Workflow

### 1. Image Capture Setup

**Network interception:**
- Sets up Playwright response listener BEFORE page navigation
- Intercepts all image requests during page load
- Downloads images to local `./images/` directory
- Generates MD5 hash filenames for deduplication
- Converts WebP, AVIF, SVG formats to PNG using Sharp
- Keeps JPEG and PNG in original format
- Creates mapping: original URL → local path

### 2. Page Loading and Lazy Content

**Navigate to URL:**
- Opens page in headless browser
- Waits for network idle
- Image capture active during load

**Scroll to trigger lazy loading:**
- Scrolls through entire page incrementally
- Waits for images to load at each step
- Ensures all lazy-loaded content populates
- Waits for all pending image downloads to complete

### 3. Visual Reference Capture

**Original screenshot:**
- Full-page screenshot for visual reference
- Used to compare final migrated result

**Enhanced contrast screenshot:**
- Algorithmically enhances background color differences
- Makes subtle section boundaries (white vs light grey) visually obvious
- Helps identify section breaks for content structure analysis

**How contrast enhancement works:**
1. Collects all background colors from the page
2. Groups similar colors (within 20 RGB units distance)
3. Spreads each group apart by 60 units in RGB space
4. Makes subtle differences dramatically visible

### 4. Image Fixing in DOM

**Before extracting HTML**, fix common image issues to ensure nothing is missed:

**Background images → Real images:**
- Finds elements with `background-image: url(...)`
- Creates `<img>` elements and prepends to parent
- Removes background-image style
- Ensures background images get captured

**Picture elements:**
- Ensures every `<picture>` has an `<img>` with `src`
- Extracts from `<source srcset>` (largest viewport)
- Fixes missing img elements

**Srcset fallback:**
- Images with only `srcset` (no `src`) get first srcset URL copied to src
- Ensures all images have src attribute

**Relative URL conversion:**
- Converts relative URLs to absolute URLs
- Handles `./path`, `/path`, `../path` formats
- Ensures images can be downloaded

**Inline SVG conversion:**
- Converts `<svg>` elements to `<img>` with data URLs
- Base64 encodes SVG content
- Ensures SVGs get captured

### 5. HTML Extraction and Image URL Replacement

Extracts cleaned HTML with:
- Non-content elements removed (scripts, styles, nav, footer, ads, iframes)
- Essential attributes preserved: `src`, `href`, `alt`, `title`, `class`, `id`
- All other attributes stripped
- **Formatted with proper indentation** (for Claude readability)
- **Image URLs replaced with local paths** (using mapping from step 1)

**Why not full HTML:**
- Focuses on main content only
- Reduces noise from navigation, marketing pixels, etc.
- Local images ready for migration (no external dependencies)

### 6. Metadata Extraction

Extracts SEO and social metadata:
- `<title>` tag
- Meta tags (name and property attributes)
- Canonical link
- JSON-LD structured data
- Open Graph properties
- Twitter Card properties

### 7. Document Path Generation

Generates document paths from the source URL:

**Algorithm:**
1. Extracts pathname from URL
2. Appends 'index' if path ends with '/'
3. Removes `.html` extension
4. Converts to lowercase
5. Sanitizes special characters and diacritics (converts to hyphens)
6. Returns clean path

**Example transformations:**
- `https://example.com/us/en/About.html` → `/us/en/about`
- `https://example.com/Products/` → `/products/index`
- `https://example.com/café/été` → `/cafe/ete`

**Generates:**
- `documentPath` - For preview URL (`/us/en/about`)
- `htmlFilePath` - Where to save HTML file (`us/en/about.html`)
- `mdFilePath` - Alternative markdown path (`us/en/about.md`)
- `dirPath` - Parent directory (`us/en`)
- `filename` - Just the filename (`about`)

### 8. Save Complete Results

All analysis results are automatically saved to `metadata.json` in the output directory, providing a complete record of:
- Source URL and timestamp
- Generated paths for file saving
- Screenshot locations
- Extracted HTML and metadata
- **Image mapping** (original URLs → local paths)
- **Image statistics** (total, converted, failed)
- Contrast enhancement statistics

## Image Capture Details

### Supported Formats

**Keep original (no conversion):**
- JPEG (.jpg)
- PNG (.png)

**Convert to PNG:**
- WebP → PNG (better compatibility)
- AVIF → PNG (better compatibility)
- SVG → PNG (rasterized for content images)
- GIF → PNG
- BMP → PNG
- TIFF → PNG
- HEIC/HEIF → PNG

### File Naming

Images are saved with MD5 hash of their original URL:
- Avoids filename conflicts
- Deduplicates identical URLs
- Consistent naming across migrations

Example:
- `https://example.com/images/hero-banner.webp` → `./images/a1b2c3d4e5f6.png`
- `https://cdn.example.com/logo.jpg` → `./images/f6e5d4c3b2a1.jpg`

### Limits and Safety

- **Max image size:** 10MB per image (larger images skipped)
- **Max images:** 100 images per page (prevents runaway captures)
- **Timeout:** 5 seconds waiting for pending downloads

### What Happens to HTML

After image capture, all `src` attributes in the HTML are automatically replaced:

**Before:**
```html
<img src="https://example.com/hero.jpg" alt="Hero">
```

**After:**
```html
<img src="./images/a1b2c3d4e5f6.jpg" alt="Hero">
```

This means the migrated HTML file already references local images - no manual URL replacement needed!

## When to Use

### Automatic (within page-import skill)

The analyze-webpage.js script is invoked automatically as Step 1 of page-import. You don't need to run it manually.

### Standalone Use Cases

Run the script manually when:
- **Analyzing competitors** - Extract content structure and metadata without full migration
- **Quick inspection** - Need screenshots and HTML of a page for reference
- **Debugging** - Test the extraction logic on specific pages
- **Batch analysis** - Script multiple pages to compare patterns

## Troubleshooting

### Browser not installed

**Error:** `browserType.launch: Executable doesn't exist`

**Solution:**
```bash
npx playwright install chromium
```

### Lazy loading not working

Some pages use advanced lazy loading that doesn't trigger on scroll. The script includes reasonable delays, but complex cases may need manual intervention.

### Enhanced contrast looks wrong

The contrast enhancement algorithm works on most pages but may produce unusual results with:
- Gradient backgrounds
- Background images
- Complex layered designs

Use original.png for visual reference in these cases.

### Page requires interaction

Some pages hide content behind:
- Cookie consent popups
- Age verification
- Login requirements

The script attempts basic popup dismissal, but complex cases may need customization.

## Integration with Page Import

```
page-import Step 1: Scrape Webpage
└─ Runs: node analyze-webpage.js [URL] --output ./work
   ├─ Returns: JSON with all extracted data
   ├─ Saves: Screenshots for visual analysis
   ├─ Saves: Cleaned HTML for content mapping
   └─ Saves: Metadata for SEO preservation

page-import Step 2-5: Use the extracted data
├─ Enhanced screenshot → Identify section boundaries
├─ Original screenshot → Visual reference
├─ Cleaned HTML → Map to blocks
└─ Metadata → Generate metadata block
```

## Output Quality Checks

Before proceeding with migration:
- ✅ Original screenshot shows complete page (all content loaded)
- ✅ Enhanced screenshot clearly shows section boundaries
- ✅ Cleaned HTML contains all main content
- ✅ Image `src` attributes are absolute URLs (or correct relative paths)
- ✅ Link `href` attributes are preserved
- ✅ Metadata includes at least title and description

## Script Architecture

The `analyze-webpage.js` script is organized as:

```javascript
// Main orchestration
async function analyzeWebpage(url, outputDir) { }

// Helper functions (inline, no external dependencies)
async function scrollToTriggerLazyLoad(page) { }
async function enhanceContrast(page) { }
async function extractCleanedHTML(page) { }
async function extractMetadata(page) { }

// CLI entry point
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
```

All browser manipulation logic is self-contained - no external script files needed.

## Next Steps

After running web page analysis:
1. Review screenshots to understand page structure
2. Examine enhanced-contrast.png to identify section boundaries
3. Use cleaned HTML to map content to blocks
4. Use metadata to generate metadata block
5. Proceed with page-import Steps 2-5
