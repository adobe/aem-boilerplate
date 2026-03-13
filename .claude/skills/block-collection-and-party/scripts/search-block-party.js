#!/usr/bin/env node

/**
 * Search the AEM Block Party index for blocks, plugins, tools, and integrations
 *
 * Note: Only searches approved entries from the Block Party index
 *
 * Usage: node search-block-party.js [--category <category>] <search-term> [additional-terms...]
 *
 * Examples:
 *   node search-block-party.js breadcrumb
 *   node search-block-party.js --category "Build Tooling" sass
 *   node search-block-party.js adobe target integration
 */

import https from 'https';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Block Party constants
const BLOCK_PARTY_INDEX_URL = 'https://www.aem.live/developer/block-party/block-party.json?sheet=curated-list-new';
const CACHE_DIR = path.join(__dirname, '..', '.cache');
const CACHE_FILE = path.join(CACHE_DIR, 'block-party-index.json');
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

/**
 * Fetch data from a URL using HTTPS
 */
function fetchUrl(url) {
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
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            reject(new Error(`Failed to parse JSON: ${e.message}`));
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
 * Check if cached index is still valid
 */
function isCacheValid() {
  if (!fs.existsSync(CACHE_FILE)) {
    return false;
  }

  const stats = fs.statSync(CACHE_FILE);
  const age = Date.now() - stats.mtimeMs;

  return age < CACHE_TTL;
}

/**
 * Load index from cache
 */
function loadFromCache() {
  try {
    const data = fs.readFileSync(CACHE_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
}

/**
 * Save index to cache
 */
function saveToCache(data) {
  try {
    if (!fs.existsSync(CACHE_DIR)) {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
    }
    fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2), 'utf8');
  } catch (error) {
    // Silently fail - caching is not critical
    console.error('Warning: Failed to save cache:', error.message);
  }
}

/**
 * Fetch the Block Party index (with caching)
 */
async function getBlockPartyIndex() {
  // Try cache first
  if (isCacheValid()) {
    const cached = loadFromCache();
    if (cached) {
      return cached;
    }
  }

  // Fetch fresh data
  try {
    const data = await fetchUrl(BLOCK_PARTY_INDEX_URL);
    saveToCache(data);
    return data;
  } catch (error) {
    throw new Error(`Failed to fetch Block Party index: ${error.message}`);
  }
}

/**
 * Get all unique categories from entries (case-insensitive, preserving first occurrence)
 */
function getUniqueCategories(entries) {
  const categoryMap = new Map(); // lowercase -> original case
  entries.forEach(entry => {
    if (entry.category && entry.category.trim()) {
      const trimmed = entry.category.trim();
      const lower = trimmed.toLowerCase();
      if (!categoryMap.has(lower)) {
        categoryMap.set(lower, trimmed);
      }
    }
  });
  return Array.from(categoryMap.values()).sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase())
  );
}

/**
 * Validate category against available categories
 */
function validateCategory(category, availableCategories) {
  if (!category) {
    return { valid: true };
  }

  const lowerCategory = category.toLowerCase();
  const matchingCategory = availableCategories.find(cat =>
    cat.toLowerCase() === lowerCategory || cat.toLowerCase().includes(lowerCategory)
  );

  if (!matchingCategory) {
    return {
      valid: false,
      error: `Category "${category}" not found.`,
      availableCategories
    };
  }

  return { valid: true };
}

/**
 * Filter entries by category
 */
function filterByCategory(entries, category) {
  if (!category) {
    return entries;
  }

  const lowerCategory = category.toLowerCase();

  return entries.filter(entry => {
    const entryCategory = (entry.category || '').toLowerCase();
    return entryCategory.includes(lowerCategory);
  });
}

/**
 * Search entries by search terms
 */
function searchEntries(entries, searchTerms) {
  if (searchTerms.length === 0) {
    return entries;
  }

  return entries.filter(entry => {
    const searchableText = [
      entry.title || '',
      entry.description || '',
      entry.category || '',
      entry.githubProfile || ''
    ].join(' ').toLowerCase();

    // Match all search terms (AND logic)
    return searchTerms.every(term =>
      searchableText.includes(term.toLowerCase())
    );
  });
}

/**
 * Format results for output
 */
function formatResults(entries) {
  return entries.map(entry => ({
    title: entry.title || 'Untitled',
    category: entry.category || 'Unknown',
    description: entry.description || '',
    githubUrl: entry.githubUrl || '',
    showcaseUrl: entry.showcaseUrl || '',
    githubProfile: entry.githubProfile || ''
  }));
}

/**
 * Parse command line arguments
 */
function parseArgs(args) {
  const result = {
    category: null,
    searchTerms: []
  };

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--category') {
      if (i + 1 < args.length) {
        result.category = args[i + 1];
        i++; // Skip the next argument
      } else {
        throw new Error('--category flag requires a value');
      }
    } else {
      result.searchTerms.push(args[i]);
    }
  }

  return result;
}

/**
 * Main function
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: node search-block-party.js [--category <category>] <search-term> [additional-terms...]');
    console.error('');
    console.error('Examples:');
    console.error('  node search-block-party.js breadcrumb');
    console.error('  node search-block-party.js --category "Build Tooling" sass');
    console.error('  node search-block-party.js adobe target integration');
    console.error('');
    console.error('Common categories:');
    console.error('  - Block');
    console.error('  - Sidekick Plugin');
    console.error('  - DA Plugin');
    console.error('  - Code Snippet');
    console.error('  - Build Tooling');
    process.exit(1);
  }

  try {
    // Parse arguments
    const { category, searchTerms } = parseArgs(args);

    // Fetch the index
    const indexData = await getBlockPartyIndex();
    const allEntries = indexData.data || [];

    // Filter to only approved entries
    const approvedEntries = allEntries.filter(entry =>
      entry.approved === 'Yes' || entry.approved === true || entry.approved === 'true'
    );

    // Get available categories (from approved entries only)
    const availableCategories = getUniqueCategories(approvedEntries);

    // Validate category if provided
    const validation = validateCategory(category, availableCategories);
    if (!validation.valid) {
      console.error('Error:', validation.error);
      console.error('');
      console.error('Available categories:');
      validation.availableCategories.forEach(cat => {
        console.error(`  - ${cat}`);
      });
      process.exit(1);
    }

    // Filter by category if specified (using approved entries only)
    let entries = filterByCategory(approvedEntries, category);

    // Search by terms
    entries = searchEntries(entries, searchTerms);

    // Format results
    const results = formatResults(entries);

    // Output results as JSON
    const output = {
      query: searchTerms.join(' '),
      category: category || 'All categories',
      source: 'AEM Block Party (Approved Only)',
      indexUrl: BLOCK_PARTY_INDEX_URL,
      totalEntries: allEntries.length,
      approvedEntries: approvedEntries.length,
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
