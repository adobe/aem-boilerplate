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
 * Path generation script for page migration
 * Generates document paths from source URLs
 *
 * This uses the exact same algorithm as the EXCAT MCP tool's generate_document_path
 * to ensure consistent path generation across all migration workflows.
 *
 * Usage:
 *   node generate-path.js "https://example.com/us/en/about.html"
 *
 * Output (JSON):
 *   {
 *     "success": true,
 *     "url": "https://example.com/us/en/about.html",
 *     "documentPath": "/us/en/about",
 *     "mdFilePath": "us/en/about.md",
 *     "htmlFilePath": "us/en/about.plain.html",
 *     "dirPath": "us/en",
 *     "filename": "about",
 *     "directoryCreated": true,
 *     "timestamp": "2025-11-02T10:30:45.123Z"
 *   }
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Sanitize a filename according to standard naming conventions
 * @param {string} name - The filename to sanitize
 * @returns {string} - Sanitized filename
 */
function sanitizeFilename(name) {
  if (!name) return '';
  return decodeURIComponent(name)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

/**
 * Sanitize a path according to standard naming conventions
 * @param {string} pathStr - The path to sanitize
 * @returns {string} - Sanitized path
 */
function sanitizePath(pathStr) {
  if (!pathStr) return '';
  const extension = pathStr.split('.').pop();
  const pathname = extension !== pathStr ? pathStr.substring(0, pathStr.lastIndexOf('.')) : pathStr;
  let sanitizedPath = '';
  pathname.split('/').forEach((p) => {
    if (p !== '') {
      sanitizedPath += `/${sanitizeFilename(p)}`;
    }
  });
  if (extension !== pathStr) {
    sanitizedPath += `.${extension}`;
  }
  return sanitizedPath;
}

/**
 * Generate document path from URL according to standard conventions
 * @param {string} url - Source URL
 * @returns {string} - Document path (without extension)
 */
function generateDocumentPath({ url }) {
  let p = new URL(url).pathname;
  if (p.endsWith('/')) {
    p = `${p}index`;
  }
  p = decodeURIComponent(p)
    .toLowerCase()
    .replace(/\.html$/, '')
    .replace(/[^a-z0-9/]/gm, '-');
  return sanitizePath(p);
}

/**
 * Generate document path with full file information
 * @param {string} url - Source URL to process
 * @returns {Object} - Complete path information
 */
function generateDocumentPathInfo(url) {
  try {
    // Generate the document path (no extension)
    const documentPath = generateDocumentPath({ url });

    // Build file paths
    const mdFilePath = `${documentPath}.md`;
    const htmlFilePath = `${documentPath}.plain.html`;

    // Extract directory path (parent directory)
    const dirPath = `${documentPath.substring(0, documentPath.lastIndexOf('/'))}`;

    // Extract just the filename (without extension)
    const filename = documentPath.substring(documentPath.lastIndexOf('/') + 1);

    // Automatically create directory structure if needed
    let directoryCreated = false;
    if (dirPath && dirPath !== 'content') {
      // Resolve to absolute path relative to workspace
      const workspaceRoot = process.env.WORKSPACE_ROOT || process.cwd();
      const absoluteDirPath = path.join(workspaceRoot, dirPath);

      try {
        fs.mkdirSync(absoluteDirPath, { recursive: true });
        directoryCreated = true;
      } catch (error) {
        // Don't fail - directory might already exist
        directoryCreated = false;
      }
    }

    return {
      success: true,
      url,
      documentPath,
      mdFilePath,
      htmlFilePath,
      dirPath,
      filename,
      directoryCreated,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    throw new Error(`Failed to generate document path: ${error.message}`);
  }
}

// CLI wrapper
async function main() {
  try {
    // Get URL from command line arguments
    const urlArg = process.argv[2];

    if (!urlArg) {
      console.error(JSON.stringify({
        success: false,
        error: 'Missing URL argument. Usage: node generate-path.js "https://example.com/page"',
        timestamp: new Date().toISOString(),
      }, null, 2));
      process.exit(1);
    }

    // Validate URL
    try {
      new URL(urlArg);
    } catch (e) {
      console.error(JSON.stringify({
        success: false,
        error: `Invalid URL: ${urlArg}`,
        timestamp: new Date().toISOString(),
      }, null, 2));
      process.exit(1);
    }

    // Generate path info
    const result = generateDocumentPathInfo(urlArg);

    // Output as JSON
    console.log(JSON.stringify(result, null, 2));

  } catch (error) {
    console.error(JSON.stringify({
      success: false,
      error: error.message,
      url: process.argv[2],
      timestamp: new Date().toISOString(),
    }, null, 2));
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main();
}

// Export functions for use by other scripts
export { sanitizeFilename, sanitizePath, generateDocumentPath, generateDocumentPathInfo };
