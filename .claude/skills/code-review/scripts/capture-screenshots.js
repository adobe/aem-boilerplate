/**
 * Screenshot capture utility for PR reviews
 *
 * Captures screenshots of preview URLs at multiple viewport sizes
 * for visual validation during PR review.
 *
 * Usage:
 *   node capture-screenshots.js <after-url> [before-url] [output-dir]
 *
 * Examples:
 *   node capture-screenshots.js https://branch--repo--owner.aem.page/path
 *   node capture-screenshots.js https://branch--repo--owner.aem.page/path https://main--repo--owner.aem.page/path
 *   node capture-screenshots.js https://branch--repo--owner.aem.page/path "" ./my-screenshots
 */

import { chromium } from 'playwright';
import { mkdir, writeFile } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

// Viewport configurations
const VIEWPORTS = {
  mobile: { width: 375, height: 667, name: 'mobile' },
  tablet: { width: 768, height: 1024, name: 'tablet' },
  desktop: { width: 1200, height: 800, name: 'desktop' },
};

/**
 * Capture screenshots of a URL at multiple viewport sizes
 * @param {string} url - The URL to capture
 * @param {string} outputDir - Directory to save screenshots
 * @param {string} prefix - Filename prefix (e.g., 'after' or 'before')
 * @param {string} [blockSelector] - Optional CSS selector to capture specific block
 * @returns {Promise<Object>} - Paths to captured screenshots
 */
async function captureUrl(browser, url, outputDir, prefix, blockSelector = null) {
  const page = await browser.newPage();
  const screenshots = {};

  try {
    // Navigate and wait for page to load
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    // Wait for any animations to settle
    await page.waitForTimeout(1500);

    // Capture at each viewport size
    for (const [key, viewport] of Object.entries(VIEWPORTS)) {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.waitForTimeout(500); // Wait for responsive adjustments

      const filename = `${prefix}-${viewport.name}.png`;
      const filepath = path.join(outputDir, filename);

      await page.screenshot({
        path: filepath,
        fullPage: true,
      });

      screenshots[key] = filepath;
      console.log(`  Captured ${viewport.name} (${viewport.width}x${viewport.height}): ${filename}`);
    }

    // Capture specific block if selector provided
    if (blockSelector) {
      const block = page.locator(blockSelector);
      if (await block.count() > 0) {
        // Use desktop viewport for block screenshot
        await page.setViewportSize({ width: VIEWPORTS.desktop.width, height: VIEWPORTS.desktop.height });
        await page.waitForTimeout(500);

        const filename = `${prefix}-block.png`;
        const filepath = path.join(outputDir, filename);

        await block.first().screenshot({ path: filepath });
        screenshots.block = filepath;
        console.log(`  Captured block (${blockSelector}): ${filename}`);
      } else {
        console.log(`  Block selector "${blockSelector}" not found, skipping block screenshot`);
      }
    }
  } finally {
    await page.close();
  }

  return screenshots;
}

/**
 * Generate markdown for PR comment with embedded screenshots
 * @param {Object} afterScreenshots - Paths to "after" screenshots
 * @param {Object} beforeScreenshots - Paths to "before" screenshots (optional)
 * @returns {string} - Markdown content
 */
function generateMarkdown(afterScreenshots, beforeScreenshots = null) {
  let markdown = '## Visual Preview\n\n';

  if (beforeScreenshots) {
    // Side-by-side comparison format
    markdown += '### Comparison\n\n';
    markdown += '| Viewport | Before | After |\n';
    markdown += '|----------|--------|-------|\n';

    for (const [key, afterPath] of Object.entries(afterScreenshots)) {
      if (key === 'block') continue;
      const beforePath = beforeScreenshots[key];
      const viewportName = key.charAt(0).toUpperCase() + key.slice(1);
      markdown += `| ${viewportName} | ![Before](${beforePath}) | ![After](${afterPath}) |\n`;
    }

    if (afterScreenshots.block || beforeScreenshots?.block) {
      markdown += '\n### Block Detail\n\n';
      if (beforeScreenshots?.block) {
        markdown += `**Before:**\n![Before Block](${beforeScreenshots.block})\n\n`;
      }
      if (afterScreenshots.block) {
        markdown += `**After:**\n![After Block](${afterScreenshots.block})\n`;
      }
    }
  } else {
    // After-only format
    markdown += '### Desktop (1200px)\n';
    markdown += `![Desktop Screenshot](${afterScreenshots.desktop})\n\n`;

    markdown += '### Mobile (375px)\n';
    markdown += `![Mobile Screenshot](${afterScreenshots.mobile})\n\n`;

    markdown += '<details>\n<summary>Additional Screenshots</summary>\n\n';
    markdown += '### Tablet (768px)\n';
    markdown += `![Tablet Screenshot](${afterScreenshots.tablet})\n\n`;

    if (afterScreenshots.block) {
      markdown += '### Block Detail\n';
      markdown += `![Block Screenshot](${afterScreenshots.block})\n\n`;
    }
    markdown += '</details>\n';
  }

  markdown += '\n### Visual Assessment\n';
  markdown += '- [ ] Layout renders correctly across viewports\n';
  markdown += '- [ ] No visual regressions from main branch\n';
  markdown += '- [ ] Colors and typography consistent\n';
  markdown += '- [ ] Images and icons display properly\n';

  return markdown;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.log('Usage: node capture-screenshots.js <after-url> [before-url] [output-dir] [block-selector]');
    console.log('');
    console.log('Examples:');
    console.log('  node capture-screenshots.js https://branch--repo--owner.aem.page/path');
    console.log('  node capture-screenshots.js https://branch--repo--owner.aem.page/path https://main--repo--owner.aem.page/path');
    console.log('  node capture-screenshots.js https://branch--repo--owner.aem.page/path "" ./screenshots ".hero"');
    process.exit(1);
  }

  const afterUrl = args[0];
  const beforeUrl = args[1] && args[1] !== '' ? args[1] : null;
  const outputDir = args[2] || './pr-screenshots';
  const blockSelector = args[3] || null;

  // Create output directory
  if (!existsSync(outputDir)) {
    await mkdir(outputDir, { recursive: true });
  }

  console.log('PR Screenshot Capture');
  console.log('=====================');
  console.log(`After URL: ${afterUrl}`);
  if (beforeUrl) {
    console.log(`Before URL: ${beforeUrl}`);
  }
  console.log(`Output directory: ${outputDir}`);
  if (blockSelector) {
    console.log(`Block selector: ${blockSelector}`);
  }
  console.log('');

  const browser = await chromium.launch();

  try {
    // Capture "after" screenshots
    console.log('Capturing "After" screenshots...');
    const afterScreenshots = await captureUrl(browser, afterUrl, outputDir, 'after', blockSelector);

    // Capture "before" screenshots if URL provided
    let beforeScreenshots = null;
    if (beforeUrl) {
      console.log('\nCapturing "Before" screenshots...');
      beforeScreenshots = await captureUrl(browser, beforeUrl, outputDir, 'before', blockSelector);
    }

    // Generate markdown
    const markdown = generateMarkdown(afterScreenshots, beforeScreenshots);

    // Save markdown file
    const markdownPath = path.join(outputDir, 'visual-preview.md');
    await writeFile(markdownPath, markdown);
    console.log(`\nMarkdown saved to: ${markdownPath}`);

    // Output markdown to console
    console.log('\n--- PR Comment Markdown ---\n');
    console.log(markdown);
    console.log('--- End Markdown ---\n');

    console.log('Screenshots captured successfully!');
    console.log(`Files saved in: ${outputDir}`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error('Error capturing screenshots:', error.message);
  process.exit(1);
});
