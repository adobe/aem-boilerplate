/* eslint-disable */
/* global WebImporter */

/**
 * Parser for hero-carousel
 * Base block: hero
 * Source selector: .stageHome
 * Source URL: https://www.meag.com/index_en.html
 * Generated: 2026-04-29
 *
 * Source structure:
 *   Images: .stageHome__image-slider__item > .wrapper-img
 *     - Live site uses CSS background-image on .wrapper-img (no <img> tags)
 *     - Scraped/cleaned HTML may have <img> tags inside .wrapper-img
 *   Text/CTA: .stageHome__preview-slider__item > h1 + a.link
 *   Both sliders use Swiper with duplicate clones (class contains 'swiper-slide-duplicate')
 *   Real slides and text items are paired by position after filtering duplicates.
 *
 * Output: One row per slide with [ image, heading + link ]
 */
export default function parse(element, { document }) {
  // Get all image slider items, filtering out Swiper duplicate clones
  const allImageItems = Array.from(
    element.querySelectorAll('.stageHome__image-slider__slides .stageHome__image-slider__item')
  ).filter((item) => !item.className.includes('swiper-slide-duplicate'));

  // Get all text/CTA slider items, filtering out Swiper duplicate clones
  const allTextItems = Array.from(
    element.querySelectorAll('.stageHome__preview-slider__slides .stageHome__preview-slider__item')
  ).filter((item) => !item.className.includes('swiper-slide-duplicate'));

  const slideCount = Math.max(allImageItems.length, allTextItems.length);
  const cells = [];

  for (let i = 0; i < slideCount; i += 1) {
    const imageItem = allImageItems[i];
    const textItem = allTextItems[i];

    // Build image cell
    const imageCell = [];
    if (imageItem) {
      // First try to find an existing <img> tag (scraped/cleaned HTML)
      const imgTag = imageItem.querySelector('img');
      if (imgTag) {
        imageCell.push(imgTag);
      } else {
        // Live site uses background-image on .wrapper-img — extract URL and create <img>
        const wrapper = imageItem.querySelector('.wrapper-img') || imageItem;
        const bgStyle = wrapper.style && wrapper.style.backgroundImage;
        if (bgStyle) {
          const urlMatch = bgStyle.match(/url\(["']?([^"')]+)["']?\)/);
          if (urlMatch && urlMatch[1]) {
            const img = document.createElement('img');
            img.src = urlMatch[1];
            imageCell.push(img);
          }
        }
      }
    }

    // Build content cell with heading and CTA link
    const contentCell = [];
    if (textItem) {
      const heading = textItem.querySelector('h1, h2, h3');
      const link = textItem.querySelector('a.link, a');
      if (heading) contentCell.push(heading);
      if (link) contentCell.push(link);
    }

    cells.push([imageCell, contentCell]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-carousel', cells });
  element.replaceWith(block);
}
