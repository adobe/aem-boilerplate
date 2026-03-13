#!/usr/bin/env node

/**
 * Search the Adobe AEM Block Collection for blocks matching a search term
 *
 * Usage: node search-block-collection.js <search-term>
 *
 * Example: node search-block-collection.js accordion
 */

import https from 'https';

// Block Collection constants
const REPO_OWNER = 'adobe';
const REPO_NAME = 'aem-block-collection';
const BLOCKS_PATH = 'blocks';
const REPO_BASE_URL = `https://github.com/${REPO_OWNER}/${REPO_NAME}`;
const SITE_BASE_URL = 'https://main--aem-block-collection--adobe.aem.live';
const NAV_URL = `${SITE_BASE_URL}/nav.plain.html`;

/**
 * Fetch HTML/text from a URL using HTTPS
 */
function fetchUrl(url, parseJson = false) {
  return new Promise((resolve, reject) => {
    https.get(url, {
      headers: {
        'User-Agent': 'AdobeSkills/1.0 (https://github.com/adobe/skills; skill:block-collection-and-party)'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode === 200) {
          if (parseJson) {
            try {
              resolve(JSON.parse(data));
            } catch (e) {
              reject(new Error(`Failed to parse JSON: ${e.message}`));
            }
          } else {
            resolve(data);
          }
        } else {
          reject(new Error(`HTTP ${res.statusCode}: ${res.statusMessage}`));
        }
      });
    }).on('error', (err) => {
      reject(err);
    });
  });
}

/**
 * Parse nav.plain.html to extract block names
 */
function parseBlocksFromNav(html) {
  const blocks = [];

  // Match all <a href="/block-collection/{block-name}">Display Name</a>
  const linkPattern = /<a href="\/block-collection\/([^"]+)">([^<]+)<\/a>/g;
  let match;

  while ((match = linkPattern.exec(html)) !== null) {
    const urlSlug = match[1];
    const displayName = match[2];

    blocks.push({
      name: urlSlug,
      displayName: displayName
    });
  }

  return blocks;
}

/**
 * Get all blocks from the Block Collection navigation
 */
async function getBlocks() {
  try {
    const html = await fetchUrl(NAV_URL, false);
    return parseBlocksFromNav(html);
  } catch (error) {
    throw new Error(`Failed to fetch Block Collection navigation: ${error.message}`);
  }
}

/**
 * Determine if a block is "Default Content" (no block code) or a "Sample Block"
 */
function isDefaultContent(blockName) {
  // Default Content items don't have block implementations
  const defaultContentItems = [
    'breadcrumbs', 'buttons', 'code', 'headings', 'icons', 'images',
    'links', 'lists', 'metadata', 'section-metadata', 'sections', 'text'
  ];
  return defaultContentItems.includes(blockName.toLowerCase());
}

/**
 * Search for blocks matching the search term
 */
function searchBlocks(blocks, searchTerm) {
  const lowerSearchTerm = searchTerm.toLowerCase();

  return blocks
    .filter(block => {
      // Search in both the URL slug and display name
      return block.name.toLowerCase().includes(lowerSearchTerm) ||
             block.displayName.toLowerCase().includes(lowerSearchTerm);
    })
    .map(block => {
      const result = {
        name: block.name,
        displayName: block.displayName,
        type: isDefaultContent(block.name) ? 'default-content' : 'block',
        liveExampleUrl: `${SITE_BASE_URL}/block-collection/${block.name}`
      };

      // Only add code URLs for actual blocks (not default content)
      if (result.type === 'block') {
        result.jsUrl = `${REPO_BASE_URL}/blob/main/${BLOCKS_PATH}/${block.name}/${block.name}.js`;
        result.cssUrl = `${REPO_BASE_URL}/blob/main/${BLOCKS_PATH}/${block.name}/${block.name}.css`;
      } else {
        result.note = 'This is default content documentation, not a standalone block. Code may be part of other blocks (e.g., breadcrumbs are in the header block). Visit https://www.aem.live/developer/block-collection and the live example URL for implementation guidance.';
        result.documentationUrl = 'https://www.aem.live/developer/block-collection';
      }

      return result;
    });
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node search-block-collection.js <search-term>');
    console.error('Example: node search-block-collection.js accordion');
    process.exit(1);
  }

  const searchTerm = args[0];

  try {
    // Fetch all blocks from navigation
    const blocks = await getBlocks();

    // Search for matching blocks
    const results = searchBlocks(blocks, searchTerm);

    // Output results as JSON
    const output = {
      query: searchTerm,
      source: 'Adobe AEM Block Collection',
      repository: `${REPO_BASE_URL}`,
      totalItems: blocks.length,
      matchCount: results.length,
      results: results
    };

    console.log(JSON.stringify(output, null, 2));

    // Exit with code 0 if results found, 1 if no results
    process.exit(results.length > 0 ? 0 : 1);

  } catch (error) {
    console.error('Error:', error.message);
    process.exit(1);
  }
}

// Run the script
main();
