/*
 * Copyright 2021 Adobe. All rights reserved.
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
 * Loads a CSS file.
 * @param {string} href The path to the CSS file
 */
export function loadCSS(href) {
  if (!document.querySelector(`head > link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    link.onload = () => {
    };
    link.onerror = () => {
    };
    document.head.appendChild(link);
  }
}

/**
 * Retrieves the content of a metadata tag.
 * @param {string} name The metadata name (or property)
 * @returns {string} The metadata value
 */
export function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const $meta = document.head.querySelector(`meta[${attr}="${name}"]`);
  return $meta && $meta.content;
}

/**
 * Adds one or more URLs to the dependencies for publishing.
 * @param {string|[string]} url The URL(s) to add as dependencies
 */
export function addPublishDependencies(url) {
  const urls = Array.isArray(url) ? url : [url];
  window.hlx = window.hlx || {};
  if (window.hlx.dependencies && Array.isArray(window.hlx.dependencies)) {
    window.hlx.dependencies.concat(urls);
  } else {
    window.hlx.dependencies = urls;
  }
}

/**
 * Sanitizes a name for use as class name.
 * @param {*} name The unsanitized name
 * @returns {string} The class name
 */
export function toClassName(name) {
  return name && typeof name === 'string'
    ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-')
    : '';
}

/**
 * Wraps each section in an additional {@code div}.
 * @param {[Element]} $sections The sections
 */
function wrapSections($sections) {
  $sections.forEach(($div) => {
    if ($div.childNodes.length === 0) {
      // remove empty sections
      $div.remove();
    } else if (!$div.id) {
      const $wrapper = document.createElement('div');
      $wrapper.className = 'section-wrapper';
      $div.parentNode.appendChild($wrapper);
      $wrapper.appendChild($div);
    }
  });
}

/**
 * Decorates a block.
 * @param {Element} block The block element
 */
export function decorateBlock(block) {
  const classes = Array.from(block.classList.values());
  let blockName = classes[0];
  if (!blockName) return;
  const section = block.closest('.section-wrapper');
  if (section) {
    section.classList.add(`${blockName}-container`.replace(/--/g, '-'));
  }
  const blocksWithVariants = ['recommended-articles'];
  blocksWithVariants.forEach((b) => {
    if (blockName.startsWith(`${b}-`)) {
      const options = blockName.substring(b.length + 1).split('-').filter((opt) => !!opt);
      blockName = b;
      block.classList.add(b);
      block.classList.add(...options);
    }
  });

  block.classList.add('block');
  block.setAttribute('data-block-name', blockName);
}

/**
 * Decorates all blocks in a container element.
 * @param {Element} $main The container element
 */
function decorateBlocks($main) {
  $main
    .querySelectorAll('div.section-wrapper > div > div')
    .forEach(($block) => decorateBlock($block));
}

/**
 * Builds a block DOM Element from a two dimensional array
 * @param {string} blockName name of the block
 * @param {any} content two dimensional array or string or object of content
 */
function buildBlock(blockName, content) {
  const table = Array.isArray(content) ? content : [[content]];
  const blockEl = document.createElement('div');
  // build image block nested div structure
  blockEl.classList.add(blockName);
  table.forEach((row) => {
    const rowEl = document.createElement('div');
    row.forEach((col) => {
      const colEl = document.createElement('div');
      const vals = col.elems ? col.elems : [col];
      vals.forEach((val) => {
        if (val) {
          if (typeof val === 'string') {
            colEl.innerHTML += val;
          } else {
            colEl.appendChild(val);
          }
        }
      });
      rowEl.appendChild(colEl);
    });
    blockEl.appendChild(rowEl);
  });
  return (blockEl);
}

/**
 * Loads JS and CSS for a block.
 * @param {Element} $block The block element
 */
export async function loadBlock($block) {
  const blockName = $block.getAttribute('data-block-name');
  try {
    const mod = await import(`/blocks/${blockName}/${blockName}.js`);
    if (mod.default) {
      await mod.default($block, blockName, document);
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.log(`failed to load module for ${blockName}`, err);
  }

  loadCSS(`/blocks/${blockName}/${blockName}.css`);
}

/**
 * Loads JS and CSS for all blocks in a container element.
 * @param {Element} $main The container element
 */
async function loadBlocks($main) {
  $main
    .querySelectorAll('div.section-wrapper > div > .block')
    .forEach(async ($block) => loadBlock($block));
}

/**
 * Extracts the config from a block.
 * @param {Element} $block The block element
 * @returns {object} The block config
 */
export function readBlockConfig($block) {
  const config = {};
  $block.querySelectorAll(':scope>div').forEach(($row) => {
    if ($row.children) {
      const $cols = [...$row.children];
      if ($cols[1]) {
        const $value = $cols[1];
        const name = toClassName($cols[0].textContent);
        let value = '';
        if ($value.querySelector('a')) {
          const $as = [...$value.querySelectorAll('a')];
          if ($as.length === 1) {
            value = $as[0].href;
          } else {
            value = $as.map(($a) => $a.href);
          }
        } else if ($value.querySelector('p')) {
          const $ps = [...$value.querySelectorAll('p')];
          if ($ps.length === 1) {
            value = $ps[0].textContent;
          } else {
            value = $ps.map(($p) => $p.textContent);
          }
        } else value = $row.children[1].textContent;
        config[name] = value;
      }
    }
  });
  return config;
}

/**
 * Returns a picture element with webp and fallbacks
 * @param {string} src The image URL
 * @param {boolean} eager load image eager
 * @param {Array} breakpoints breakpoints and corresponding params (eg. width)
 */
export function createOptimizedPicture(src, alt = '', eager = false, breakpoints = [{ media: '(min-width: 400px)', width: '2000' }, { width: '750' }]) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);

  // webp
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    if (br.media) source.setAttribute('media', br.media);
    source.setAttribute('type', 'image/webp');
    source.setAttribute('srcset', `${pathname}?width=${br.width}&format=webply&optimize=medium`);
    picture.appendChild(source);
  });

  // fallback
  breakpoints.forEach((br, i) => {
    if (i < breakpoints.length - 1) {
      const source = document.createElement('source');
      if (br.media) source.setAttribute('media', br.media);
      source.setAttribute('srcset', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      picture.appendChild(source);
    } else {
      const img = document.createElement('img');
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
    }
  });

  return picture;
}

/**
 * Removes formatting from images.
 * @param {Element} main The container element
 */
function removeStylingFromImages(main) {
  // remove styling from images, if any
  const imgs = [...main.querySelectorAll('strong picture'), ...main.querySelectorAll('em picture')];
  imgs.forEach((img) => {
    const parentEl = img.closest('p');
    parentEl.prepend(img);
    parentEl.lastChild.remove();
  });
}

/**
 * Normalizes all headings within a container element.
 * @param {Element} $elem The container element
 * @param {[string]]} allowedHeadings The list of allowed headings (h1 ... h6)
 */
export function normalizeHeadings($elem, allowedHeadings) {
  const allowed = allowedHeadings.map((h) => h.toLowerCase());
  $elem.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((tag) => {
    const h = tag.tagName.toLowerCase();
    if (allowed.indexOf(h) === -1) {
      // current heading is not in the allowed list -> try first to "promote" the heading
      let level = parseInt(h.charAt(1), 10) - 1;
      while (allowed.indexOf(`h${level}`) === -1 && level > 0) {
        level -= 1;
      }
      if (level === 0) {
        // did not find a match -> try to "downgrade" the heading
        while (allowed.indexOf(`h${level}`) === -1 && level < 7) {
          level += 1;
        }
      }
      if (level !== 7) {
        tag.outerHTML = `<h${level}>${tag.textContent}</h${level}>`;
      }
    }
  });
}

/**
 * Decorates the picture elements.
 * @param {Element} main The container element
 */
function decoratePictures(main) {
  main.querySelectorAll('img[src*="/media_"').forEach((img, i) => {
    const newPicture = createOptimizedPicture(img.src, img.alt, !i);
    const picture = img.closest('picture');
    if (picture) picture.parentElement.replaceChild(newPicture, picture);
  });
}

/**
 * returns an image caption of a picture elements
 * @param {Element} picture picture element
 */
function getImageCaption(picture) {
  const parentEl = picture.parentNode;
  const parentSiblingEl = parentEl.nextElementSibling;
  return (parentSiblingEl && parentSiblingEl.firstChild.nodeName === 'EM' ? parentSiblingEl : undefined);
}

/**
 * builds images blocks from default content.
 * @param {Element} main The container element
 */
function buildImageBlocks(main) {
  // select all non-featured, default (non-images block) images
  const imgs = [...main.querySelectorAll(':scope > div > p > picture')];
  imgs.forEach((img) => {
    const parent = img.parentNode;
    const imagesBlock = buildBlock('images', {
      elems: [parent.cloneNode(true), getImageCaption(img)],
    });
    parent.parentNode.insertBefore(imagesBlock, parent);
    parent.remove();
  });
}

/**
 * Builds all synthetic blocks in a container element.
 * @param {Element} main The container element
 */
function buildAutoBlocks(main) {
  removeStylingFromImages(main);
  try {
    buildImageBlocks(main);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Auto Blocking failed', error);
  }
}

/**
 * Removes the empty sections from the container element.
 * @param {Element} main The container element
 */
function removeEmptySections(main) {
  main.querySelectorAll(':scope > div:empty').forEach((div) => {
    div.remove();
  });
}

/**
 * Adds the favicon.
 * @param {string} href The favicon URL
 */
export function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * Decorates the main element.
 * @param {Element} main The main element
 */
export function decorateMain(main) {
  // forward compatible pictures redecoration
  decoratePictures(main);
  buildAutoBlocks(main);
  removeEmptySections(main);
  wrapSections(main.querySelectorAll(':scope > div'));
  decorateBlocks(main);
}

const LCP_BLOCKS = []; // add your LCP blocks to the list

/**
 * loads everything needed to get to LCP.
 */
async function loadEager(doc) {
  const main = doc.querySelector('main');
  if (main) {
    decorateMain(main);
    doc.querySelector('body').classList.add('appear');

    const block = doc.querySelector('.block');
    const hasLCPBlock = (block && LCP_BLOCKS.includes(block.getAttribute('data-block-name')));
    if (hasLCPBlock) await loadBlock(block, true);
    const lcpCandidate = doc.querySelector('main img');
    const loaded = {
      then: (resolve) => {
        if (lcpCandidate && !lcpCandidate.complete) {
          lcpCandidate.addEventListener('load', () => resolve());
          lcpCandidate.addEventListener('error', () => resolve());
        } else {
          resolve();
        }
      },
    };
    await loaded;
  }
}

/**
 * loads everything that doesn't need to be delayed.
 */
async function loadLazy(doc) {
  const main = doc.querySelector('main');

  loadBlocks(main);
  loadCSS('/styles/lazy-styles.css');
  addFavIcon('/styles/favicon.svg');
}

/**
 * loads everything that happens a lot later, without impacting
 * the user experience.
 */
function loadDelayed() {
  // load anything that can be postponed to the latest here
}

/**
 * Decorates the page.
 */
async function decoratePage(doc) {
  await loadEager(doc);
  loadLazy(doc);
  loadDelayed(doc);
}

decoratePage(document);
