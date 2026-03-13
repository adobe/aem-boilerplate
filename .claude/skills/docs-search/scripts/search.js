#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import https from 'https';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const CACHE_DIR = path.join(__dirname, '..', '.cache');
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours
const USER_AGENT = 'AdobeSkills/1.0 (https://github.com/adobe/skills; skill:docs-search)';

// Stop words to ignore in searches
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by',
  'aem', 'cms', 'edge', 'delivery', 'services'
]);

// Scoring weights
const SCORE_WEIGHTS = {
  TITLE: 10,
  DESCRIPTION: 5,
  CONTENT: 1,
  MULTI_KEYWORD_MULTIPLIER: 1.5,
  DEPRECATION_PENALTY: 0.5 // Multiply score by 0.5 if deprecated
};

/**
 * Fetch JSON from URL with caching
 */
async function fetchWithCache(url, cacheFileName) {
  const cacheFilePath = path.join(CACHE_DIR, cacheFileName);

  // Check if cache exists and is fresh
  if (fs.existsSync(cacheFilePath)) {
    const stats = fs.statSync(cacheFilePath);
    const age = Date.now() - stats.mtimeMs;

    if (age < CACHE_DURATION_MS) {
      const cached = fs.readFileSync(cacheFilePath, 'utf8');
      return JSON.parse(cached);
    }
  }

  // Fetch fresh data
  return new Promise((resolve, reject) => {
    https.get(url, { headers: { 'User-Agent': USER_AGENT } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        try {
          const json = JSON.parse(data);
          // Cache the result
          fs.mkdirSync(CACHE_DIR, { recursive: true });
          fs.writeFileSync(cacheFilePath, data, 'utf8');
          resolve(json);
        } catch (err) {
          reject(err);
        }
      });
    }).on('error', reject);
  });
}

/**
 * Filter keywords to remove stop words
 */
function filterKeywords(keywords) {
  return keywords
    .map(k => k.toLowerCase().trim())
    .filter(k => k.length > 0 && !STOP_WORDS.has(k));
}

/**
 * Count keyword occurrences in text (case-insensitive)
 */
function countMatches(text, keyword) {
  if (!text) return 0;
  const regex = new RegExp(keyword, 'gi');
  const matches = text.match(regex);
  return matches ? matches.length : 0;
}

/**
 * Clean up content noise from the beginning of text
 */
function cleanContent(text) {
  if (!text) return '';

  // Remove common noise patterns at the start
  let cleaned = text
    .replace(/^style\s+content\s+/i, '')
    .replace(/^\s*\n+/, '')
    .trim();

  return cleaned;
}

/**
 * Extract full sentences around keyword match
 */
function extractSnippet(text, keyword) {
  if (!text) return '';

  // Clean the text first
  text = cleanContent(text);

  const regex = new RegExp(keyword, 'i');
  const match = text.match(regex);

  if (!match) {
    // No match - return first sentence(s) up to ~200 chars
    return extractFirstSentences(text, 200);
  }

  const matchIndex = match.index;

  // Find sentence boundaries around the match
  // Look backwards for sentence start (. ! ? or start of text)
  let sentenceStart = 0;
  for (let i = matchIndex - 1; i >= 0; i--) {
    if (text[i] === '.' || text[i] === '!' || text[i] === '?') {
      sentenceStart = i + 1;
      break;
    }
  }

  // Look forwards for sentence end (. ! ? or end of text)
  let sentenceEnd = text.length;
  for (let i = matchIndex; i < text.length; i++) {
    if (text[i] === '.' || text[i] === '!' || text[i] === '?') {
      sentenceEnd = i + 1;
      break;
    }
  }

  let snippet = text.substring(sentenceStart, sentenceEnd).trim();

  // If snippet is too short, try to include next sentence
  if (snippet.length < 100 && sentenceEnd < text.length) {
    let nextSentenceEnd = sentenceEnd;
    for (let i = sentenceEnd + 1; i < text.length; i++) {
      if (text[i] === '.' || text[i] === '!' || text[i] === '?') {
        nextSentenceEnd = i + 1;
        break;
      }
    }
    snippet = text.substring(sentenceStart, nextSentenceEnd).trim();
  }

  // If snippet is too long, truncate at ~300 chars on sentence boundary
  if (snippet.length > 300) {
    snippet = snippet.substring(0, 300);
    const lastPeriod = snippet.lastIndexOf('.');
    if (lastPeriod > 100) {
      snippet = snippet.substring(0, lastPeriod + 1);
    } else {
      snippet += '...';
    }
  }

  return snippet;
}

/**
 * Extract first few sentences up to maxLength
 */
function extractFirstSentences(text, maxLength = 200) {
  text = cleanContent(text);

  let end = 0;
  let lastSentenceEnd = 0;

  for (let i = 0; i < text.length && i < maxLength + 100; i++) {
    if (text[i] === '.' || text[i] === '!' || text[i] === '?') {
      end = i + 1;
      if (end <= maxLength) {
        lastSentenceEnd = end;
      } else {
        break;
      }
    }
  }

  if (lastSentenceEnd === 0) {
    // No sentence found, just truncate
    return text.substring(0, maxLength) + (text.length > maxLength ? '...' : '');
  }

  return text.substring(0, lastSentenceEnd).trim();
}

/**
 * Calculate relevance score for a document
 */
function calculateScore(doc, keywords) {
  let score = 0;
  let matchedKeywords = 0;

  for (const keyword of keywords) {
    let keywordMatched = false;

    // Title matches
    const titleMatches = countMatches(doc.title, keyword);
    if (titleMatches > 0) {
      score += titleMatches * SCORE_WEIGHTS.TITLE;
      keywordMatched = true;
    }

    // Description matches
    const descMatches = countMatches(doc.description, keyword);
    if (descMatches > 0) {
      score += descMatches * SCORE_WEIGHTS.DESCRIPTION;
      keywordMatched = true;
    }

    // Content matches (if available)
    if (doc.content) {
      const contentMatches = countMatches(doc.content, keyword);
      if (contentMatches > 0) {
        score += contentMatches * SCORE_WEIGHTS.CONTENT;
        keywordMatched = true;
      }
    }

    if (keywordMatched) matchedKeywords++;
  }

  // Multi-keyword bonus
  if (matchedKeywords > 1) {
    score *= SCORE_WEIGHTS.MULTI_KEYWORD_MULTIPLIER;
  }

  // Deprecation penalty
  if (doc.deprecation && doc.deprecation.length > 0) {
    score *= SCORE_WEIGHTS.DEPRECATION_PENALTY;
  }

  return score;
}

/**
 * Search documents
 */
function searchDocuments(docs, keywords, type = 'doc') {
  const results = [];

  for (const doc of docs) {
    const score = calculateScore(doc, keywords);

    // Only include if score >= 1 (at least one keyword match)
    if (score >= 1) {
      // Extract snippet from content with keyword context
      let snippet = '';
      if (doc.content) {
        for (const keyword of keywords) {
          if (countMatches(doc.content, keyword) > 0) {
            snippet = extractSnippet(doc.content, keyword);
            break;
          }
        }
      }
      // Fallback to first sentences if no keyword match in content
      if (!snippet && doc.content) {
        snippet = extractFirstSentences(doc.content, 200);
      }

      results.push({
        path: doc.path,
        title: doc.title,
        description: doc.description || '',
        snippet,
        type,
        deprecation: doc.deprecation || null,
        relevanceScore: score
      });
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
}

/**
 * Main search function
 */
async function search(keywords, limit = 10) {
  // Filter keywords
  const filteredKeywords = filterKeywords(keywords);

  if (filteredKeywords.length === 0) {
    console.error('No valid keywords provided after filtering stop words');
    process.exit(1);
  }

  // Fetch indexes
  const [docpagesIndex, queryIndex] = await Promise.all([
    fetchWithCache('https://www.aem.live/docpages-index.json', 'docpages-index.json'),
    fetchWithCache('https://www.aem.live/query-index.json', 'query-index.json')
  ]);

  // Create a map of deprecation warnings from query-index
  const deprecationMap = new Map();
  for (const doc of queryIndex.data) {
    if (doc.deprecation && doc.deprecation.length > 0) {
      deprecationMap.set(doc.path, doc.deprecation);
    }
  }

  // Search docpages first and merge deprecation data
  let docpagesData = docpagesIndex.data.map(doc => ({
    ...doc,
    deprecation: deprecationMap.get(doc.path) || doc.deprecation || null
  }));
  let results = searchDocuments(docpagesData, filteredKeywords, 'doc');

  // If less than 5 results, search blog posts too
  if (results.length < 5) {
    const blogPosts = queryIndex.data.filter(doc => doc.path.startsWith('/blog/'));
    const blogResults = searchDocuments(blogPosts, filteredKeywords, 'blog');
    results = [...results, ...blogResults].sort((a, b) => b.relevanceScore - a.relevanceScore);
  }

  // Limit results if specified
  if (limit > 0) {
    results = results.slice(0, limit);
  }

  return results;
}

/**
 * CLI entry point
 */
async function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.error('Usage: search.js [--all] <keyword1> [keyword2] [keyword3] ...');
    console.error('Example: search.js block decoration');
    console.error('         search.js --all metadata');
    console.error('');
    console.error('Options:');
    console.error('  --all    Return all results (default: limit to 10)');
    process.exit(1);
  }

  // Check for --all flag
  let limit = 10;
  let keywords = args;

  if (args[0] === '--all') {
    limit = 0; // 0 means no limit
    keywords = args.slice(1);
  }

  if (keywords.length === 0) {
    console.error('No keywords provided');
    process.exit(1);
  }

  try {
    const results = await search(keywords, limit);
    console.log(JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Search error:', error.message);
    process.exit(1);
  }
}

main();
