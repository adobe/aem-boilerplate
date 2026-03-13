#!/usr/bin/env node

/**
 * Find pages containing a specific block in AEM Edge Delivery projects.
 *
 * This script queries the query-index to find instances of a block,
 * helping developers identify existing content for testing during development.
 *
 * Usage:
 *   node find-block-content.js <block-name> [host]
 *
 * Examples:
 *   node find-block-content.js hero
 *   node find-block-content.js hero localhost:3000
 *   node find-block-content.js hero main--mysite--owner.aem.live
 *   node find-block-content.js hero main--mysite--owner.aem.page
 *
 * The script will:
 * 1. Query the site's query-index for all pages
 * 2. Check each page for the specified block
 * 3. Report all pages containing the block with their URLs and variant info
 *
 * Defaults to localhost:3000 if no host specified
 */

import { JSDOM } from 'jsdom';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const USER_AGENT = 'AdobeSkills/1.0 (https://github.com/adobe/skills; skill:find-test-content)';

/**
 * Fetch all URLs from the query index with pagination
 * @param {string} host - The host to query
 * @returns {Promise<string[]>} Array of page paths
 */
async function fetchQueryIndex(host) {
  const limit = 512;
  let offset = 0;
  const paths = [];
  let more = true;

  do {
    try {
      // Use http for localhost, https for everything else
      const protocol = host.startsWith('localhost') ? 'http' : 'https';
      const url = `${protocol}://${host}/query-index.json?offset=${offset}&limit=${limit}`;
      const res = await fetch(url, {
        headers: { 'User-Agent': USER_AGENT },
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      const json = await res.json();
      const data = json.data || [];

      data.forEach((item) => {
        if (item.path) {
          paths.push(item.path);
        }
      });

      more = data.length === limit;
      offset += limit;
    } catch (err) {
      console.error(`Error fetching query index: ${err.message}`);
      more = false;
    }
  } while (more);

  return paths;
}

/**
 * Check if a page contains the specified block and extract variant info
 * @param {string} host - The host to query
 * @param {string} path - The page path
 * @param {string} blockName - Name of block to find
 * @returns {Promise<Object|null>} Object with count and variants, or null if not found
 */
async function pageContainsBlock(host, path, blockName) {
  try {
    // Use http for localhost, https for everything else
    const protocol = host.startsWith('localhost') ? 'http' : 'https';
    const url = `${protocol}://${host}${path}`;
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    });

    if (!res.ok) {
      return null;
    }

    const html = await res.text();

    // Parse HTML with jsdom
    const dom = new JSDOM(html);
    const { document } = dom.window;

    // Look for block using proper DOM query
    // Blocks appear as elements with the block name as a class
    const selector = `.${blockName}`;
    const blockElements = document.querySelectorAll(selector);

    if (blockElements.length === 0) {
      return null;
    }

    // Extract variants from all block instances
    const variants = new Set();
    Array.from(blockElements).forEach((element) => {
      // Get all classes except the block name itself
      Array.from(element.classList).forEach((className) => {
        if (className !== blockName && className !== 'block') {
          variants.add(className);
        }
      });
    });

    return {
      count: blockElements.length,
      variants: Array.from(variants).sort(),
    };
  } catch (err) {
    return null;
  }
}

/**
 * Process URLs in batches with concurrency control
 * @param {string} host - The host to query
 * @param {string[]} paths - Array of page paths
 * @param {string} blockName - Name of block to find
 * @param {number} concurrency - Number of concurrent requests
 * @returns {Promise<Array>} Array of objects with path, count, and variants
 */
async function findBlockInPages(host, paths, blockName, concurrency = 10) {
  const matches = [];
  const inFlight = new Set();

  for (let i = 0; i < paths.length; i += 1) {
    const path = paths[i];

    const promise = pageContainsBlock(host, path, blockName).then((result) => {
      if (result) {
        matches.push({
          path,
          count: result.count,
          variants: result.variants,
        });
      }
      inFlight.delete(promise);
    });

    inFlight.add(promise);

    // Wait if we've hit concurrency limit
    if (inFlight.size >= concurrency) {
      await Promise.race(inFlight);
    }
  }

  // Wait for remaining requests
  await Promise.all(inFlight);

  return matches;
}

/**
 * Get the host to query
 * @param {string} host - Host string or undefined for default
 * @returns {string} The host to query
 */
function getHost(host) {
  if (!host) {
    return 'localhost:3000';
  }

  // Strip https:// or http:// if provided
  return host.replace(/^https?:\/\//, '').replace(/\/$/, '');
}

/**
 * Main execution
 */
async function main() {
  const blockName = process.argv[2];
  const hostArg = process.argv[3];

  if (!blockName) {
    console.error('Error: Block name is required');
    console.error('\nUsage: node find-block-content.js <block-name> [host]');
    console.error('\nExamples:');
    console.error('  node find-block-content.js hero');
    console.error('  node find-block-content.js hero localhost:3000');
    console.error('  node find-block-content.js hero main--mysite--owner.aem.live');
    console.error('  node find-block-content.js cards main--mysite--owner.aem.page');
    process.exit(1);
  }

  const host = getHost(hostArg);

  // Fetch all pages from query index
  const paths = await fetchQueryIndex(host);

  if (paths.length === 0) {
    console.log('No pages found in query index.');
    console.log('\nMake sure:');
    console.log('- Your dev server is running (aem up)');
    console.log('- The site has been indexed');
    return;
  }

  // Search for block in pages
  const matches = await findBlockInPages(host, paths, blockName);

  // Report results
  if (matches.length === 0) {
    console.log(`No pages found containing the "${blockName}" block.`);
    console.log('\nThis might mean:');
    console.log('- The block is new and no content exists yet');
    console.log('- The block name is spelled differently');
    console.log('- Content exists but hasn\'t been published');
  } else {
    console.log(`Found ${matches.length} page(s) containing the "${blockName}" block:\n`);

    matches.forEach((match, index) => {
      const protocol = host.startsWith('localhost') ? 'http' : 'https';
      const countInfo = match.count > 1 ? ` (${match.count} instances)` : '';
      const variantInfo = match.variants.length > 0 ? ` - variants: ${match.variants.join(', ')}` : '';
      console.log(`${index + 1}. ${protocol}://${host}${match.path}${countInfo}${variantInfo}`);
    });
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});
