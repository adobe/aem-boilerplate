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
 * Fetch and parse block structure examples from Adobe Block Collection
 *
 * This script retrieves the .plain.html version of a block's documentation page,
 * which contains pre-decoration HTML structure examples showing the expected
 * content model for the block.
 *
 * Usage:
 *   node get-block-structure.js <block-name>
 *   node get-block-structure.js accordion
 *   node get-block-structure.js cards
 *
 * Output: JSON with block metadata, variants, and HTML structure examples
 */

import { JSDOM } from 'jsdom';

const BLOCK_COLLECTION_BASE = 'https://main--aem-block-collection--adobe.aem.live';
const USER_AGENT = 'AdobeSkills/1.0 (https://github.com/adobe/skills; skill:block-collection-and-party)';

/**
 * Simplify HTML by removing optimized picture elements and showing essential structure
 */
function simplifyHTML(html) {
  // Remove picture optimization attributes that clutter the output
  let simplified = html
    .replace(/\s+srcset="[^"]*"/g, '')
    .replace(/\s+type="[^"]*"/g, '')
    .replace(/\s+media="[^"]*"/g, '')
    .replace(/\s+loading="[^"]*"/g, '')
    .replace(/\s+width="[^"]*"/g, '')
    .replace(/\s+height="[^"]*"/g, '')
    .replace(/\?width=[^"'\s]*/g, ''); // Remove image optimization params

  // Replace multi-line picture elements with simplified version
  simplified = simplified.replace(
    /<picture>\s*(<source[^>]*>\s*)*\s*<img\s+([^>]*?)src="([^"]*)"([^>]*?)>\s*<\/picture>/gs,
    (match, sources, beforeSrc, src, afterSrc) => {
      const altMatch = match.match(/alt="([^"]*)"/);
      const alt = altMatch ? ` alt="${altMatch[1]}"` : '';
      return `<picture><img src="${src}"${alt}></picture>`;
    }
  );

  // Compact whitespace but preserve structure
  simplified = simplified
    .replace(/>\s+</g, '>\n<')
    .replace(/\n\s*\n/g, '\n')
    .trim();

  return simplified;
}

/**
 * Analyze HTML structure to provide a human-readable description
 */
function analyzeStructure(html, blockName) {
  const dom = new JSDOM(html);
  const doc = dom.window.document;
  const block = doc.querySelector(`.${blockName}`);

  if (!block) return 'Structure analysis unavailable';

  const rows = Array.from(block.children);
  const analysis = [];

  analysis.push(`Block has ${rows.length} row(s)`);

  rows.forEach((row, i) => {
    const cols = Array.from(row.children);
    const colDescriptions = cols.map(col => {
      const elements = [];
      if (col.querySelector('picture')) elements.push('image');
      if (col.querySelector('h1, h2, h3, h4, h5, h6')) elements.push('heading');
      if (col.querySelector('p')) elements.push('paragraph(s)');
      if (col.querySelector('ul, ol')) elements.push('list');
      if (col.querySelector('a')) elements.push('link(s)');
      return elements.length > 0 ? elements.join(', ') : 'content';
    });

    analysis.push(`  Row ${i + 1}: ${cols.length} column(s) [${colDescriptions.join(' | ')}]`);
  });

  return analysis.join('\n');
}

/**
 * Fetch and parse block structure from Block Collection
 */
async function getBlockStructure(blockName) {
  const url = `${BLOCK_COLLECTION_BASE}/block-collection/${blockName}.plain.html`;

  try {
    const response = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (!response.ok) {
      if (response.status === 404) {
        return {
          success: false,
          error: `Block "${blockName}" not found in Block Collection`,
          url,
          suggestion: 'Use search-block-collection-github.js to find available blocks'
        };
      }
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    const html = await response.text();
    const dom = new JSDOM(html);
    const doc = dom.window.document;

    // Find all sections (top-level divs in body)
    const sections = Array.from(doc.body.children);

    const variants = [];
    let description = null;
    let sourceCodeUrl = null;

    // Process each section
    sections.forEach(section => {
      const metadata = section.querySelector('.library-metadata');

      if (metadata) {
        // Extract metadata
        const metadataRows = Array.from(metadata.children);
        const metadataObj = {};

        metadataRows.forEach(row => {
          const cells = Array.from(row.children);
          if (cells.length === 2) {
            const key = cells[0].textContent.trim();
            const value = cells[1].textContent.trim();
            metadataObj[key] = value;

            // Extract source code link if present
            const link = cells[1].querySelector('a[href*="github.com"]');
            if (link) {
              sourceCodeUrl = link.href;
            }
          }
        });

        // Store description (usually in last metadata block)
        if (metadataObj.description) {
          description = metadataObj.description.replace(/\s*Source Code\s*$/, '').trim();
        }

        // Find the block content (div with class matching block name)
        const blockDiv = section.querySelector(`[class*="${blockName}"]`);

        if (blockDiv && metadataObj.name) {
          const blockHTML = blockDiv.outerHTML;
          const simplifiedHTML = simplifyHTML(blockHTML);
          const structure = analyzeStructure(blockHTML, blockName);

          variants.push({
            name: metadataObj.name,
            html: simplifiedHTML,
            structure
          });
        }
      }
    });

    if (variants.length === 0) {
      return {
        success: false,
        error: `No block examples found in ${url}`,
        url
      };
    }

    return {
      success: true,
      blockName,
      url,
      description,
      sourceCodeUrl,
      liveExampleUrl: `${BLOCK_COLLECTION_BASE}/block-collection/${blockName}`,
      variants,
      totalVariants: variants.length,
      usage: {
        purpose: 'Pre-decoration HTML structure examples',
        note: 'This shows the HTML structure BEFORE JavaScript decoration. Use this to understand the expected content model when authoring content or generating HTML.'
      }
    };

  } catch (error) {
    return {
      success: false,
      error: error.message,
      url,
      blockName
    };
  }
}

// CLI execution
async function main() {
  const blockName = process.argv[2];

  if (!blockName) {
    console.error(JSON.stringify({
      success: false,
      error: 'Missing block name argument',
      usage: 'node get-block-structure.js <block-name>',
      examples: [
        'node get-block-structure.js accordion',
        'node get-block-structure.js cards',
        'node get-block-structure.js tabs'
      ]
    }, null, 2));
    process.exit(1);
  }

  const result = await getBlockStructure(blockName);
  console.log(JSON.stringify(result, null, 2));

  if (!result.success) {
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}
