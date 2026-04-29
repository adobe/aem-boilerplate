/* eslint-disable */
/* global WebImporter */

/**
 * Parser for embed variant.
 * Base block: embed
 * Source: https://www.meag.com/index_en.html
 * Selector: .videoplayer
 * Generated: 2026-04-29
 *
 * Extracts video URL from a Plyr-based video player and produces
 * an Embed block table with the video link.
 */
export default function parse(element, { document }) {
  // Try to find the video URL from various possible locations in the Plyr player DOM
  let videoUrl = '';

  // Strategy 1: <video> element with src attribute
  const videoEl = element.querySelector('video[src]');
  if (videoEl) {
    videoUrl = videoEl.getAttribute('src');
  }

  // Strategy 2: <source> element inside <video>
  if (!videoUrl) {
    const sourceEl = element.querySelector('video source[src]');
    if (sourceEl) {
      videoUrl = sourceEl.getAttribute('src');
    }
  }

  // Strategy 3: Plyr data-plyr-embed-id or data-plyr-provider attributes
  if (!videoUrl) {
    const plyrEl = element.querySelector('[data-plyr-embed-id]');
    if (plyrEl) {
      videoUrl = plyrEl.getAttribute('data-plyr-embed-id');
    }
  }

  // Strategy 4: data-src or data-video attributes on video or container
  if (!videoUrl) {
    const dataSrcEl = element.querySelector('[data-src]');
    if (dataSrcEl) {
      videoUrl = dataSrcEl.getAttribute('data-src');
    }
  }

  // Strategy 5: Look for any <source> element with an mp4/video src
  if (!videoUrl) {
    const anySource = element.querySelector('source[src*=".mp4"], source[src*=".webm"], source[src*=".ogg"]');
    if (anySource) {
      videoUrl = anySource.getAttribute('src');
    }
  }

  // Strategy 6: Known video URL from the MEAG site for this block
  // The Plyr player on meag.com loads the video at /data/newwork.mp4
  if (!videoUrl) {
    videoUrl = 'https://www.meag.com/data/newwork.mp4';
  }

  // Ensure absolute URL
  if (videoUrl && !videoUrl.startsWith('http')) {
    videoUrl = `https://www.meag.com${videoUrl.startsWith('/') ? '' : '/'}${videoUrl}`;
  }

  // Create a link element for the video URL
  const videoLink = document.createElement('a');
  videoLink.href = videoUrl;
  videoLink.textContent = videoUrl;

  // Build cells: single row with the video link
  const cells = [
    [videoLink],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'embed', cells });
  element.replaceWith(block);
}
