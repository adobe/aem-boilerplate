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
 * Image Capture Utilities for Page Migration
 *
 * Adapted from excat-ops MCP network-image-capture.js
 * Intercepts images during page load and saves them locally
 */

import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { createHash } from 'crypto';
import sharp from 'sharp';

// Image format mapping (Content-Type → format string)
const IMAGE_FORMAT_MAP = {
  'image/webp': 'webp',
  'image/avif': 'avif',
  'image/svg+xml': 'svg',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpeg',
  'image/png': 'png',
  'image/gif': 'gif',
  'image/bmp': 'bmp',
  'image/tiff': 'tiff',
  'image/heic': 'heic',
  'image/heif': 'heif',
};

// Supported formats (no conversion needed)
const SUPPORTED_FORMATS = ['jpeg', 'png'];

/**
 * Convert image buffer to PNG using Sharp
 */
async function convertToPng(buffer, originalFormat) {
  try {
    return await sharp(buffer)
      .png({
        compressionLevel: 9,
        palette: true,
      })
      .toBuffer();
  } catch (error) {
    throw new Error(`Failed to convert ${originalFormat} to PNG: ${error.message}`);
  }
}

/**
 * Check if format needs conversion
 */
function needsConversion(format) {
  return format !== 'unknown' && !SUPPORTED_FORMATS.includes(format);
}

/**
 * Set up network event listeners to capture images during page load
 * Must be called BEFORE page.goto()
 *
 * Uses proper request lifecycle:
 * 1. 'request' event - Track image requests as they are issued
 * 2. 'requestfinished' event - Process once body is fully downloaded
 *
 * @param {import('playwright').Page} page - Playwright page object
 * @param {string} outputDir - Directory to save images
 * @param {Object} options - Optional configuration
 * @param {number} options.maxImageSize - Max image size in bytes (default: 10MB)
 * @param {number} options.maxImages - Max number of images to capture (default: 100)
 * @returns {Promise<Object>} Capture state object
 */
export function setupImageCapture(page, outputDir, options = {}) {
  const {
    maxImageSize = 10 * 1024 * 1024, // 10MB
    maxImages = 1000,
  } = options;

  const imageMap = new Map();
  const pendingImages = new Set();
  const trackedRequests = new Set(); // Track image requests
  const stats = {
    total: 0,
    converted: 0,
    skipped: 0,
    failed: 0,
    tooLarge: 0,
    limitReached: 0
  };

  // Handler for request event - track image requests as they start
  const requestHandler = (request) => {
    // Check if this is an image request
    if (request.resourceType() !== 'image') {
      return;
    }

    const url = request.url();

    // Check if already tracked (avoid duplicates)
    if (trackedRequests.has(url)) {
      return;
    }

    // Check if max images limit reached
    if (stats.total >= maxImages) {
      if (stats.limitReached === 0) {
        console.error(`⚠️  Max images limit (${maxImages}) reached, skipping remaining images`);
      }
      stats.limitReached++;
      return;
    }

    // Track this request
    trackedRequests.add(url);
    pendingImages.add(url);
    stats.total++;
  };

  // Handler for requestfinished event - process images once fully downloaded
  const requestFinishedHandler = async (request) => {
    // Only process tracked image requests
    if (request.resourceType() !== 'image') {
      return;
    }

    const url = request.url();

    // Only process if we tracked this request
    if (!trackedRequests.has(url)) {
      return;
    }

    // Check if already captured (should not happen, but safeguard)
    if (imageMap.has(url)) {
      pendingImages.delete(url);
      return;
    }

    try {
      // Get the response object
      const response = await request.response();

      if (!response) {
        console.error(`⚠️  No response for image request: ${url.slice(0, 60)}...`);
        stats.failed++;
        pendingImages.delete(url);
        return;
      }

      // Get binary data from response body (now fully downloaded)
      const buffer = await response.body();

      // Check image size
      if (buffer.length > maxImageSize) {
        console.error(`⚠️  Image too large (${Math.round(buffer.length / 1024 / 1024)}MB): ${url.slice(0, 60)}...`);
        stats.tooLarge++;
        stats.failed++;
        pendingImages.delete(url);
        return;
      }

      // Get content type and determine format
      const contentType = response.headers()['content-type'] || '';
      const format = IMAGE_FORMAT_MAP[contentType.split(';')[0]];

      if (!format) {
        console.error(`⚠️  Unknown image format (${contentType}): ${url.slice(0, 60)}...`);
        stats.failed++;
        pendingImages.delete(url);
        return;
      }

      // Generate filename using MD5 hash
      const hash = createHash('md5').update(url).digest('hex');
      const imagesDir = join(outputDir, 'images');
      await mkdir(imagesDir, { recursive: true });

      // Convert if needed, save as PNG
      if (needsConversion(format)) {
        const pngBuffer = await convertToPng(buffer, format);
        const filename = `${hash}.png`;
        const filePath = join(imagesDir, filename);
        await writeFile(filePath, pngBuffer);

        imageMap.set(url, `./images/${filename}`);
        stats.converted++;
        console.error(`✓ Captured & converted (${format}→PNG): ${url.slice(0, 50)}... → ./images/${filename}`);
      } else {
        // Save original format (JPEG, PNG)
        const ext = format === 'jpeg' ? 'jpg' : format;
        const filename = `${hash}.${ext}`;
        const filePath = join(imagesDir, filename);
        await writeFile(filePath, buffer);

        imageMap.set(url, `./images/${filename}`);
        stats.skipped++;
        console.error(`✓ Captured (${format}): ${url.slice(0, 50)}... → ./images/${filename}`);
      }

    } catch (error) {
      console.error(`✗ Failed to capture ${url.slice(0, 50)}...: ${error.message}`);
      stats.failed++;
    } finally {
      pendingImages.delete(url);
    }
  };

  // Set up both event listeners
  page.on('request', requestHandler);
  page.on('requestfinished', requestFinishedHandler);

  return {
    imageMap,
    pendingImages,
    stats,
    disable: () => {
      page.off('request', requestHandler);
      page.off('requestfinished', requestFinishedHandler);
      console.error('🛑 Image capture disabled');
    },
  };
}

/**
 * Wait for all pending images to complete processing
 *
 * @param {Object} captureState - State object returned from setupImageCapture
 * @param {number} timeout - Max time to wait in milliseconds (default: 5000)
 * @returns {Promise<void>}
 */
export async function waitForPendingImages(captureState, timeout = 5000) {
  const startTime = Date.now();
  const { pendingImages } = captureState;

  while (pendingImages.size > 0) {
    if (Date.now() - startTime > timeout) {
      console.error(`⚠️  Timeout waiting for ${pendingImages.size} pending images after ${timeout}ms`);
      break;
    }
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

/**
 * Replace image URLs in HTML with local paths
 *
 * @param {string} html - HTML content
 * @param {Map} imageMap - Map of original URL to local path
 * @returns {string} - HTML with replaced image URLs
 */
export function replaceImageUrls(html, imageMap) {
  let modifiedHtml = html;
  let replacements = 0;

  for (const [originalUrl, localPath] of imageMap.entries()) {
    // Replace in src attributes
    const srcRegex = new RegExp(`src="${originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"`, 'g');
    const srcMatch = modifiedHtml.match(srcRegex);
    if (srcMatch) {
      modifiedHtml = modifiedHtml.replace(srcRegex, `src="${localPath}"`);
      replacements += srcMatch.length;
    }

    // Also try without quotes (less common but possible)
    const srcRegex2 = new RegExp(`src=${originalUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`, 'g');
    const srcMatch2 = modifiedHtml.match(srcRegex2);
    if (srcMatch2) {
      modifiedHtml = modifiedHtml.replace(srcRegex2, `src="${localPath}"`);
      replacements += srcMatch2.length;
    }
  }

  console.error(`🔄 Replaced ${replacements} image URL references in HTML`);
  return modifiedHtml;
}
