#!/usr/bin/env node

/*
 * Copyright 2025 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/**
 * Analyze Webpage for Migration
 *
 * Uses npm playwright to analyze a webpage and prepare it for content migration.
 *
 * Features:
 * - Scrolls to trigger lazy-loaded content
 * - Captures images and converts to web-friendly formats
 * - Takes full-page screenshot
 * - Extracts cleaned HTML with preserved attributes
 * - Extracts metadata (SEO, Open Graph, etc.)
 *
 * Usage:
 *   node analyze-webpage.js "https://example.com/page" --output ./analysis
 *
 * Requirements:
 *   npm install playwright
 *   npx playwright install chromium
 */

import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateDocumentPathInfo } from './generate-path.js';
import { setupImageCapture, waitForPendingImages, replaceImageUrls } from './image-capture.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Scroll through the entire page to trigger lazy-loaded images
 */
async function scrollToTriggerLazyLoad(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 100;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
}


/**
 * Fix images in the DOM to ensure none are missed during extraction
 * Adapted from site-transfer-agent-importscript/resources/transformers/images.js
 */
async function fixImagesInDom(page, url) {
  await page.evaluate((sourceUrl) => {
    // Helper: Extract URL from background-image CSS property
    function extractUrlFromBackgroundImage(backgroundImage) {
      if (!backgroundImage || backgroundImage.toLowerCase() === 'none') {
        return null;
      }
      const urlMatch = backgroundImage.match(/url\(['"]?([^'")\s]+)['"]?\)/);
      return urlMatch ? urlMatch[1] : null;
    }

    // Helper: Get background image from inline style or data attribute
    function getBackgroundImageFromElement(element) {
      const inlineStyle = element.getAttribute('style');
      if (inlineStyle) {
        const styleParts = inlineStyle.split(';');
        for (const style of styleParts) {
          const [prop, ...valueParts] = style.split(':');
          if (prop?.trim() === 'background-image') {
            return valueParts.join(':').trim();
          }
        }
      }
      const bgImage = window.getComputedStyle(element)?.getPropertyValue('background-image');
      if (bgImage && bgImage !== 'none' && bgImage.includes('url(')) {
        return bgImage;
      }

      return null;
    }

    // Helper: Extract picture source URL (largest viewport)
    function extractPictureSource(pictureElement) {
      const sources = pictureElement.querySelectorAll('source');
      if (sources.length === 0) return null;

      let largestSource = null;
      let largestMaxWidth = -1;

      for (const source of sources) {
        const mediaQuery = source.getAttribute('media');
        if (!mediaQuery) {
          largestSource = source;
          break;
        }

        const match = mediaQuery.match(/max-width:\s*(\d+)px/);
        if (match) {
          const maxWidth = parseInt(match[1], 10);
          if (maxWidth > largestMaxWidth) {
            largestMaxWidth = maxWidth;
            largestSource = source;
          }
        }
      }

      if (!largestSource) {
        largestSource = sources[sources.length - 1];
      }

      if (largestSource) {
        const srcset = largestSource.getAttribute('srcset');
        if (srcset) {
          return srcset.split(',')[0].trim().split(/\s+/)[0];
        }
      }
      return null;
    }

    // 1. Transform background images to actual img elements
    // Check common elements that often have background images from CSS
    const elementsToCheck = document.body.querySelectorAll('div, section, article, header, footer, aside, main, figure');
    elementsToCheck.forEach((element) => {
      const backgroundImage = getBackgroundImageFromElement(element);
      const src = extractUrlFromBackgroundImage(backgroundImage);
      if (src) {
        const img = document.createElement('img');
        img.src = src;
        element.prepend(img);
        element.style.backgroundImage = 'none';
      }
    });

    // 2. Ensure picture elements have img with src
    const pictures = document.body.querySelectorAll('picture');
    pictures.forEach((picture) => {
      const img = picture.querySelector('img');
      if (!img || !img.src) {
        const newImg = document.createElement('img');
        const src = extractPictureSource(picture);
        if (src) {
          newImg.src = src;
          if (img) {
            img.replaceWith(newImg);
          } else {
            picture.appendChild(newImg);
          }
        }
      }
    });

    // 3. Fix images with srcset but no src
    document.body.querySelectorAll('img').forEach((img) => {
      let src = img.getAttribute('src');
      const srcset = img.getAttribute('srcset')?.split(' ')[0];
      if (!src && srcset) {
        img.setAttribute('src', srcset);
      }
      src = img.getAttribute('src');

      // 4. Convert relative URLs to absolute
      if (src) {
        try {
          new URL(src);
          // Already absolute, leave it
        } catch (e) {
          // Relative URL - convert to absolute
          if (!src.startsWith('/')) {
            src = `./${src}`;
          }
          try {
            const absoluteUrl = new URL(src, sourceUrl);
            img.src = absoluteUrl.toString();
          } catch (err) {
            console.warn(`Unable to adjust image URL ${src}`);
          }
        }
      }
    });

    // 5. Transform inline SVG elements to img with data URLs
    const svgs = document.body.querySelectorAll('svg');
    svgs.forEach((svg) => {
      let svgString = '<svg';
      for (const attr of svg.attributes) {
        svgString += ` ${attr.name}="${attr.value}"`;
      }
      svgString += '>';
      svgString += svg.innerHTML;
      svgString += '</svg>';

      const svgDataUrl = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`;
      const img = document.createElement('img');
      img.src = svgDataUrl;
      svg.replaceWith(img);
    });
  }, url);
}

/**
 * Format HTML with proper indentation for readability
 */
function formatHtml(html) {
  let formatted = '';
  let indent = 0;
  const indentSize = 2;

  // Add newlines after tags
  html = html.replace(/></g, '>\n<');

  const lines = html.split('\n');

  lines.forEach(line => {
    const trimmed = line.trim();
    if (!trimmed) return;

    // Decrease indent for closing tags
    if (trimmed.startsWith('</')) {
      indent = Math.max(0, indent - 1);
    }

    // Add indentation
    formatted += ' '.repeat(indent * indentSize) + trimmed + '\n';

    // Increase indent for opening tags (but not self-closing or immediately closed)
    if (trimmed.startsWith('<') && !trimmed.startsWith('</') && !trimmed.endsWith('/>') && !trimmed.match(/<[^>]+>.*<\/[^>]+>$/)) {
      indent++;
    }
  });

  return formatted.trim();
}

/**
 * Extract cleaned HTML with preserved attributes
 */
async function extractCleanedHTML(page) {
  const html = await page.evaluate(() => {
    // 1. Remove non-content elements
    const selectorsToRemove = [
      'script', 'style', 'noscript'
    ];

    selectorsToRemove.forEach(selector => {
      document.querySelectorAll(selector).forEach(el => el.remove());
    });

    // 2. CRITICAL: Preserve essential attributes, strip all others
    const keepAttributes = ['src', 'href', 'alt', 'title', 'class', 'id'];
    document.body.querySelectorAll('*').forEach(el => {
      const attrs = Array.from(el.attributes);
      attrs.forEach(attr => {
        if (!keepAttributes.includes(attr.name)) {
          el.removeAttribute(attr.name);
        }
      });
    });

    // 3. Return full body HTML (will be formatted on Node.js side)
    return document.body.outerHTML;
  });

  // Format HTML for readability
  return formatHtml(html);
}

/**
 * Extract metadata from page
 */
async function extractMetadata(page) {
  const metadata = await page.evaluate(() => {
    const meta = {};

    // Extract title
    const titleTag = document.querySelector('title');
    if (titleTag) meta.title = titleTag.textContent.trim();

    // Extract all meta tags
    document.querySelectorAll('meta').forEach(tag => {
      const name = tag.getAttribute('name') || tag.getAttribute('property');
      const content = tag.getAttribute('content');
      if (name && content) meta[name] = content;
    });

    // Extract canonical link
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) meta.canonical = canonical.getAttribute('href');

    // Extract JSON-LD
    const jsonLd = document.querySelector('script[type="application/ld+json"]');
    if (jsonLd) {
      try {
        meta.jsonLd = JSON.parse(jsonLd.textContent);
      } catch (e) {
        meta.jsonLd = jsonLd.textContent;
      }
    }

    return meta;
  });

  return metadata;
}

/**
 * Main analysis function
 */
async function analyzeWebpage(url, outputDir) {
  // Ensure output directory exists
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  console.error(`Analyzing: ${url}`);
  console.error(`Output directory: ${outputDir}`);

  // Launch browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  try {
    // Set up image capture BEFORE navigation
    console.error('Setting up image capture...');
    const captureState = setupImageCapture(page, outputDir);

    // Navigate to page
    console.error('Navigating to page...');
    try {
      // Try networkidle first (most reliable when it works)
      await page.goto(url);
    } catch (error) {
      // Fall back to domcontentloaded if networkidle times out
      console.error('⚠️  networkidle timeout, falling back to domcontentloaded...');
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
      await page.waitForTimeout(3000); // Give page extra time to settle
    }

    // Scroll to trigger lazy loading
    console.error('Scrolling to trigger lazy-loaded content...');
    await scrollToTriggerLazyLoad(page);
    await page.waitForTimeout(1000); // Give lazy-loaded images time to populate

    // Wait for all pending images to complete
    console.error(`Waiting for ${captureState.pendingImages.size} pending images...`);
    await waitForPendingImages(captureState, 5000);
    console.error(`✅ Image capture complete: ${captureState.stats.total} total, ${captureState.stats.converted} converted, ${captureState.stats.failed} failed`);

    // Take screenshot
    console.error('Capturing screenshot...');
    const screenshot = path.join(outputDir, 'screenshot.png');
    await page.screenshot({ path: screenshot, fullPage: true });

    // Extract metadata
    console.error('Extracting metadata...');
    const metadata = await extractMetadata(page);

    // Disable image capture (images already captured)
    captureState.disable();

    // Fix images in DOM (background images, picture elements, relative URLs, inline SVGs)
    console.error('Fixing images in DOM...');
    await fixImagesInDom(page, url);

    // Extract cleaned HTML
    console.error('Extracting cleaned HTML...');
    let html = await extractCleanedHTML(page);

    // Replace image URLs with local paths
    console.error('Replacing image URLs with local paths...');
    html = replaceImageUrls(html, captureState.imageMap);

    const htmlPath = path.join(outputDir, 'cleaned.html');
    fs.writeFileSync(htmlPath, html, 'utf-8');

    // Generate document paths
    console.error('Generating document paths...');
    const paths = generateDocumentPathInfo(url);

    // Build result object
    const result = {
      url,
      timestamp: new Date().toISOString(),
      paths: {
        documentPath: paths.documentPath,
        htmlFilePath: paths.htmlFilePath,
        mdFilePath: paths.mdFilePath,
        dirPath: paths.dirPath,
        filename: paths.filename
      },
      screenshot,
      html: {
        filePath: htmlPath,
        size: html.length
      },
      metadata,
      images: {
        count: captureState.imageMap.size,
        mapping: Object.fromEntries(captureState.imageMap),
        stats: captureState.stats
      }
    };

    // Save metadata.json file
    const metadataPath = path.join(outputDir, 'metadata.json');
    fs.writeFileSync(metadataPath, JSON.stringify(result, null, 2), 'utf-8');
    console.error(`Saved metadata to: ${metadataPath}`);

    console.error('Analysis complete!');

    return result;
  } finally {
    await browser.close();
  }
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0 || args[0] === '--help' || args[0] === '-h') {
    console.error(`
Usage: node analyze-webpage.js <url> [--output <dir>]

Analyze a webpage and prepare it for content migration.

Arguments:
  <url>              URL of the webpage to analyze (required)
  --output <dir>     Output directory for artifacts (default: ./page-analysis)

Examples:
  node analyze-webpage.js "https://example.com/page"
  node analyze-webpage.js "https://example.com/page" --output ./my-analysis

Output:
  - screenshot.png            Screenshot of the page
  - cleaned.html              Extracted HTML with preserved attributes
  - metadata.json             Complete analysis results
  - images/                   Downloaded images

Requirements:
  npm install playwright
  npx playwright install chromium
`);
    process.exit(args.length === 0 ? 1 : 0);
  }

  const url = args[0];
  let outputDir = './page-analysis';

  // Parse --output flag
  const outputIndex = args.indexOf('--output');
  if (outputIndex !== -1 && args[outputIndex + 1]) {
    outputDir = args[outputIndex + 1];
  }

  try {
    const result = await analyzeWebpage(url, outputDir);

    // Output JSON to stdout (stderr used for progress messages above)
    console.log(JSON.stringify(result, null, 2));
  } catch (error) {
    console.error(`Error analyzing webpage: ${error.message}`);
    console.error(error.stack);
    process.exit(1);
  }
}

// Run if executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

export { analyzeWebpage, scrollToTriggerLazyLoad, extractCleanedHTML, extractMetadata };
