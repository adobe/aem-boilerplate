/*
 * Copyright 2022 Adobe. All rights reserved.
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
 * Returns a picture element with webp and fallbacks
 * @param {string} src The image URL
 * @param {boolean} eager load image eager
 * @param {Array} breakpoints breakpoints and corresponding params (eg. width)
 * @preserve Exclude from terser
 */
function createOptimizedPicture(src, alt = '', eager = false, breakpoints = [{ media: '(min-width: 400px)', width: '2000' }, { width: '750' }], classes = []) {
  const url = new URL(src, window.location.href);
  const picture = document.createElement('picture');
  if (classes.length > 0) {
    picture.classList.add(classes);
  }

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
 * Given a set of breakpoints, returns the appropriate image URL for the most optimized version.
 * @param {string} src The image URL
 * @param {Array} breakpoints breakpoints and corresponding params (eg. width)
 * @preserve Exclude from terser
 */
function getOptimizedImagePath(src, breakpoints = [{ media: '(min-width: 400px)', width: '2000' }, { width: '750' }]) {
  const url = new URL(src, window.location.href);
  const { pathname } = url;
  const ext = pathname.substring(pathname.lastIndexOf('.') + 1);
  const br = breakpoints[breakpoints.length - 1];
  return `${pathname}?width=${br.width}&format=${ext}&optimize=medium`;
}

/**
 * Removes formatting from images.
 * @param {Element} main The container element
 * @preserve Exclude from terser
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

/*
 * Copyright 2022 Adobe. All rights reserved.
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
 * Retrieves the content of metadata tags.
 * @param {string} name The metadata name (or property)
 * @returns {string} The metadata value(s)
 * @preserve Exclude from terser
 */
function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...document.head.querySelectorAll(`meta[${attr}="${name}"]`)].map((m) => m.content).join(', ');
  return meta || null;
}

/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-param-reassign */

/**
 * Decorates a block.
 * @param {Element} block The block element
 * @preserve Exclude from terser
 */
function decorateBlock(block) {
  const trimDashes = (str) => str.replace(/(^\s*-)|(-\s*$)/g, '');
  const classes = Array.from(block.classList.values());
  const blockName = classes[0];
  if (!blockName) return;
  const section = block.closest('.section');
  if (section) {
    section.classList.add(`${blockName}-container`.replace(/--/g, '-'));
  }
  const blockWithVariants = blockName.split('--');
  const shortBlockName = trimDashes(blockWithVariants.shift());
  const variants = blockWithVariants.map((v) => trimDashes(v));
  block.classList.add(shortBlockName);
  block.classList.add(...variants);

  block.classList.add('block');
  block.setAttribute('data-block-name', shortBlockName);
  block.setAttribute('data-block-status', 'initialized');

  const blockWrapper = block.parentElement;
  blockWrapper.classList.add(`${shortBlockName}-wrapper`);
}

/**
 * Decorates all blocks in a container element.
 * @param {Element} main The container element
 * @preserve Exclude from terser
 */
function decorateBlocks(main) {
  main
    .querySelectorAll('div.section > div > div')
    .forEach((block) => decorateBlock(block));
}

/**
 * Sanitizes a name for use as class name.
 * @param {string} name The unsanitized name
 * @returns {string} The class name
 * @preserve Exclude from terser
 */
function toClassName(name) {
  return name && typeof name === 'string'
    ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-')
    : '';
}

/**
 * Sanitizes a name for use as a js property name.
 * @param {string} name The unsanitized name
 * @returns {string} The camelCased name
 */
function toCamelCase(name) {
  return toClassName(name).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {object} The block config
 * @preserve Exclude from terser
 */
function readBlockConfig(block) {
  const config = {};
  block.querySelectorAll(':scope>div').forEach((row) => {
    if (row.children) {
      const cols = [...row.children];
      if (cols[1]) {
        const col = cols[1];
        const name = toClassName(cols[0].textContent);
        let value = '';
        if (col.querySelector('a')) {
          const as = [...col.querySelectorAll('a')];
          if (as.length === 1) {
            value = as[0].href;
          } else {
            value = as.map((a) => a.href);
          }
        } else if (col.querySelector('img')) {
          const imgs = [...col.querySelectorAll('img')];
          if (imgs.length === 1) {
            value = imgs[0].src;
          } else {
            value = imgs.map((img) => img.src);
          }
        } else if (col.querySelector('p')) {
          const ps = [...col.querySelectorAll('p')];
          if (ps.length === 1) {
            value = ps[0].textContent;
          } else {
            value = ps.map((p) => p.textContent);
          }
        } else value = row.children[1].textContent;
        config[name] = value;
      }
    }
  });
  return config;
}

/**
 * Decorates all sections in a container element.
 * @param {Element} main The container element
 * @preserve Exclude from terser
 */
function decorateSections(main) {
  main.querySelectorAll(':scope > div').forEach((section) => {
    const wrappers = [];
    let defaultContent = false;
    [...section.children].forEach((e) => {
      if (e.tagName === 'DIV' || !defaultContent) {
        const wrapper = document.createElement('div');
        wrappers.push(wrapper);
        defaultContent = e.tagName !== 'DIV';
        if (defaultContent) wrapper.classList.add('default-content-wrapper');
      }
      wrappers[wrappers.length - 1].append(e);
    });
    wrappers.forEach((wrapper) => section.append(wrapper));
    section.classList.add('section');
    section.setAttribute('data-section-status', 'initialized');

    /* process section metadata */
    const sectionMeta = section.querySelector('div.section-metadata');
    if (sectionMeta) {
      const meta = readBlockConfig(sectionMeta);
      const keys = Object.keys(meta);
      keys.forEach((key) => {
        if (key === 'style') section.classList.add(toClassName(meta.style));
        else section.dataset[toCamelCase(key)] = meta[key];
      });
      sectionMeta.remove();
    }
  });
}

/**
 * Decorates the picture elements.
 * @param {Element} main The container element
 * @preserve Exclude from terser
 */
function decoratePictures(main) {
  main.querySelectorAll('img[src*="/media_"').forEach((img, i) => {
    const newPicture = createOptimizedPicture(img.src, img.alt, !i);
    const picture = img.closest('picture');
    if (picture) picture.parentElement.replaceChild(newPicture, picture);
    if (['EM', 'STRONG'].includes(newPicture.parentElement.tagName)) {
      const styleEl = newPicture.parentElement;
      styleEl.parentElement.replaceChild(newPicture, styleEl);
    }
  });
}

/**
 * Normalizes all headings within a container element.
 * @param {Element} elem The container element
 * @param {string[]} allowedHeadings The list of allowed headings (h1 ... h6)
 * @preserve Exclude from terser
 */
function normalizeHeadings(elem, allowedHeadings) {
  const allowed = allowedHeadings.map((h) => h.toLowerCase());
  elem.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((tag) => {
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
 * Adds the favicon.
 * @param {string} href The favicon URL
 * @preserve Exclude from terser
 */
function addFavIcon(href) {
  const link = document.createElement('link');
  link.rel = 'icon';
  link.type = href.indexOf('.ico') ? 'image/x-icon' : 'image/svg+xml';
  link.href = href;
  const existingLink = document.querySelector('head link[rel="icon"]');
  if (existingLink) {
    existingLink.parentElement.replaceChild(link, existingLink);
  } else {
    document.getElementsByTagName('head')[0].appendChild(link);
  }
}

/**
 * Turns absolute links within the domain into relative links.
 * @param {Element} main The container element
 * @preserve Exclude from terser
 */
function makeLinksRelative(main, productionDomains = []) {
  main.querySelectorAll('a').forEach((a) => {
    // eslint-disable-next-line no-use-before-define
    const hosts = ['hlx.page', 'hlx.live', ...productionDomains];
    if (a.href) {
      try {
        const url = new URL(a.href);
        const relative = hosts.some((host) => url.hostname.includes(host));
        if (relative) a.href = `${url.pathname}${url.search}${url.hash}`;
      } catch (e) {
        // something went wrong
        // eslint-disable-next-line no-console
        console.log(e);
      }
    }
  });
}

/**
 * Set template (page structure) and theme (page styles).
 */
function decorateTemplateAndTheme() {
  const template = getMetadata('template');
  if (template) document.body.classList.add(template);
  const theme = getMetadata('theme');
  if (theme) document.body.classList.add(theme);
}

/**
 * Replace icons with inline SVG and prefix with codeBasePath.
 * @param {Element} element
 */
function replaceIcons(element) {
  element.querySelectorAll('img.icon').forEach((img) => {
    const span = document.createElement('span');
    span.className = img.className;
    img.replaceWith(span);
  });
}

/**
 * Replace icons with inline SVG and prefix with codeBasePath.
 * @param {Element} element
 */
function decorateIcons(element) {
  // prepare for forward compatible icon handling
  replaceIcons(element);

  element.querySelectorAll('span.icon').forEach((span) => {
    const iconName = span.className.split('icon-')[1];
    fetch(`${window.hlx.codeBasePath}/icons/${iconName}.svg`).then((resp) => {
      if (resp.status === 200) {
        resp.text().then((svg) => {
          span.innerHTML = svg;
        });
      }
    });
  });
}

/**
 * Decorates paragraphs containing a single link as buttons.
 * @param {Element} element container element
 */
function decorateButtons(element) {
  element.querySelectorAll('a').forEach((a) => {
    a.title = a.title || a.textContent;
    if (a.href !== a.textContent) {
      const up = a.parentElement;
      const twoup = a.parentElement.parentElement;
      if (!a.querySelector('img')) {
        if (up.childNodes.length === 1 && (up.tagName === 'P' || up.tagName === 'DIV')) {
          a.className = 'button primary'; // default
          up.classList.add('button-container');
        }
        if (up.childNodes.length === 1 && up.tagName === 'STRONG'
          && twoup.childNodes.length === 1 && twoup.tagName === 'P') {
          a.className = 'button primary';
          twoup.classList.add('button-container');
        }
        if (up.childNodes.length === 1 && up.tagName === 'EM'
          && twoup.childNodes.length === 1 && twoup.tagName === 'P') {
          a.className = 'button secondary';
          twoup.classList.add('button-container');
        }
      }
    }
  });
}

/*
 * Copyright 2022 Adobe. All rights reserved.
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
 * loads a script by adding a script tag to the head.
 * @param {string} url URL of the js file
 * @param {Function} callback callback on load
 * @param {string} type type attribute of script tag
 * @returns {Element} script element
 * @preserve Exclude from terser
 */

function loadScript(url, callback, type) {
  const head = document.querySelector('head');
  const script = document.createElement('script');
  script.setAttribute('src', url);
  if (type) {
    script.setAttribute('type', type);
  }
  head.append(script);
  script.onload = callback;
  return script;
}

/**
 * Loads a CSS file.
 * @param {string} href The path to the CSS file
 * @preserve Exclude from terser
 */
function loadCSS(href, callback) {
  if (!document.querySelector(`head > link[href="${href}"]`)) {
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', href);
    if (typeof callback === 'function') {
      link.onload = (e) => callback(e.type);
      link.onerror = (e) => callback(e.type);
    }
    document.head.appendChild(link);
  } else if (typeof callback === 'function') {
    callback('noop');
  }
}

/**
 * Updates all section status in a container element.
 * @param {Element} main The container element
 * @preserve Exclude from terser
 */
function updateSectionsStatus(main) {
  const sections = [...main.querySelectorAll(':scope > div.section')];
  for (let i = 0; i < sections.length; i += 1) {
    const section = sections[i];
    const status = section.getAttribute('data-section-status');
    if (status !== 'loaded') {
      const loadingBlock = section.querySelector('.block[data-block-status="initialized"], .block[data-block-status="loading"]');
      if (loadingBlock) {
        section.setAttribute('data-section-status', 'loading');
        break;
      } else {
        section.setAttribute('data-section-status', 'loaded');
      }
    }
  }
}

/**
 * Loads JS and CSS for a block.
 * @param {Element} block The block element
 * @preserve Exclude from terser
 */
async function loadBlock(block, eager = false) {
  if (!(block.getAttribute('data-block-status') === 'loading' || block.getAttribute('data-block-status') === 'loaded')) {
    block.setAttribute('data-block-status', 'loading');
    const blockName = block.getAttribute('data-block-name');
    if (blockName) {
      try {
        const cssLoaded = new Promise((resolve) => {
          loadCSS(`/blocks/${blockName}/${blockName}.css`, resolve);
        });
        const decorationComplete = new Promise((resolve) => {
          (async () => {
            try {
              const mod = await import(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`);
              if (mod.default) {
                await mod.default(block, blockName, document, eager);
              }
            } catch (err) {
            // eslint-disable-next-line no-console
              console.log(`failed to load module for ${blockName}`, err);
            }
            resolve();
          })();
        });
        await Promise.all([cssLoaded, decorationComplete]);
      } catch (err) {
      // eslint-disable-next-line no-console
        console.log(`failed to load block ${blockName}`, err);
      }
    }
    block.setAttribute('data-block-status', 'loaded');
  }
}

/**
 * Loads JS and CSS for all blocks in a container element.
 * @param {Element} main The container element
 * @preserve Exclude from terser
 */
async function loadBlocks(main) {
  updateSectionsStatus(main);
  const blocks = [...main.querySelectorAll('div.block')];
  for (let i = 0; i < blocks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await loadBlock(blocks[i]);
    updateSectionsStatus(main);
  }
}

/**
 * Builds a block DOM Element from a two dimensional array
 * @param {string} blockName name of the block
 * @param {any} content two dimensional array or string or object of content
 * @preserve Exclude from terser
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
 * Loads the header block.
 * @param {Element} header The header element
 * @preserve Exclude from terser
 */
async function loadHeader(header, productionDomains) {
  const headerBlock = buildBlock('header', '');
  header.append(headerBlock);
  decorateBlock(headerBlock);
  await loadBlock(headerBlock);
  makeLinksRelative(headerBlock, productionDomains);
}

/**
 * Loads the footer block.
 * @param {Element} footer The footer element
 * @preserve Exclude from terser
 */
async function loadFooter(footer, productionDomains) {
  const footerBlock = buildBlock('footer', '');
  footer.append(footerBlock);
  decorateBlock(footerBlock);
  await loadBlock(footerBlock);
  makeLinksRelative(footerBlock, productionDomains);
}

/**
 * load LCP block and/or wait for LCP in default content.
 * @preserve Exclude from terser
 */
async function waitForLCP(LCP_BLOCKS, autoAppear) {
  // eslint-disable-next-line no-use-before-define
  const lcpBlocks = LCP_BLOCKS;
  const block = document.querySelector('.block');
  const hasLCPBlock = (block && lcpBlocks.includes(block.getAttribute('data-block-name')));
  if (hasLCPBlock) await loadBlock(block, true);

  if (autoAppear) {
    document.querySelector('body').classList.add('appear');
  }

  const lcpCandidate = document.querySelector('main img');
  await new Promise((resolve) => {
    if (lcpCandidate && !lcpCandidate.complete) {
      lcpCandidate.setAttribute('loading', 'eager');
      lcpCandidate.addEventListener('load', () => resolve());
      lcpCandidate.addEventListener('error', () => resolve());
    } else {
      resolve();
    }
  });
}

/**
 * Gets placeholders object
 * @param {string} prefix
 */
async function fetchPlaceholders(prefix = 'default') {
  window.placeholders = window.placeholders || {};
  const loaded = window.placeholders[`${prefix}-loaded`];
  if (!loaded) {
    window.placeholders[`${prefix}-loaded`] = new Promise((resolve, reject) => {
      try {
        fetch(`${prefix === 'default' ? '' : prefix}/placeholders.json`)
          .then((resp) => resp.json())
          .then((json) => {
            const placeholders = {};
            json.data.forEach((placeholder) => {
              placeholders[toCamelCase(placeholder.Key)] = placeholder.Text;
            });
            window.placeholders[prefix] = placeholders;
            resolve();
          });
      } catch (e) {
        // error loading placeholders
        window.placeholders[prefix] = {};
        reject();
      }
    });
  }
  await window.placeholders[`${prefix}-loaded`];
  return (window.placeholders[prefix]);
}

/*
 * Copyright 2022 Adobe. All rights reserved.
 * This file is licensed to you under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License. You may obtain a copy
 * of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed under
 * the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR REPRESENTATIONS
 * OF ANY KIND, either express or implied. See the License for the specific language
 * governing permissions and limitations under the License.
 */

/* eslint-disable no-param-reassign */

/**
 * log RUM if part of the sample.
 * @param {string} checkpoint identifies the checkpoint in funnel
 * @param {Object} data additional data for RUM sample
 * @preserve Exclude from terser
 */
function sampleRUM(checkpoint, generation, data = {}) {
  try {
    window.hlx = window.hlx || {};
    if (!window.hlx.rum) {
      const usp = new URLSearchParams(window.location.search);
      const weight = (usp.get('rum') === 'on') ? 1 : 100; // with parameter, weight is 1. Defaults to 100.
      // eslint-disable-next-line no-bitwise
      const hashCode = (s) => s.split('').reduce((a, b) => (((a << 5) - a) + b.charCodeAt(0)) | 0, 0);
      const id = `${hashCode(window.location.href)}-${new Date().getTime()}-${Math.random().toString(16).substr(2, 14)}`;
      const random = Math.random();
      const isSelected = (random * weight < 1);
      // eslint-disable-next-line object-curly-newline
      window.hlx.rum = { weight, id, random, isSelected };
    }
    const { random, weight, id } = window.hlx.rum;
    if (random && (random * weight < 1)) {
      const sendPing = () => {
        // eslint-disable-next-line object-curly-newline, max-len, no-use-before-define
        const body = JSON.stringify({ weight, id, referer: window.location.href, generation, checkpoint, ...data });
        const url = `https://rum.hlx.page/.rum/${weight}`;
        // eslint-disable-next-line no-unused-expressions
        navigator.sendBeacon(url, body);
      };
      sendPing();
      // special case CWV
      if (checkpoint === 'cwv') {
        // use classic script to avoid CORS issues
        const script = document.createElement('script');
        script.src = 'https://rum.hlx.page/.rum/web-vitals/dist/web-vitals.iife.js';
        script.onload = () => {
          const storeCWV = (measurement) => {
            data.cwv = {};
            data.cwv[measurement.name] = measurement.value;
            sendPing();
          };
          // When loading `web-vitals` using a classic script, all the public
          // methods can be found on the `webVitals` global namespace.
          window.webVitals.getCLS(storeCWV);
          window.webVitals.getFID(storeCWV);
          window.webVitals.getLCP(storeCWV);
        };
        document.head.appendChild(script);
      }
    }
  } catch (e) {
    // something went wrong
  }
}

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

function stamp(message) {
  if (window.name.includes('performance')) {
    console.log(`${new Date() - performance.timing.navigationStart}:${message}`);
  }
}

function registerPerformanceLogger() {
  try {
    const polcp = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      stamp(JSON.stringify(entries));
      // eslint-disable-next-line no-console
      console.log(entries[0].element);
    });
    polcp.observe({ type: 'largest-contentful-paint', buffered: true });

    const pols = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      stamp(JSON.stringify(entries));
      // eslint-disable-next-line no-console
      console.log(entries[0].sources[0].node);
    });
    pols.observe({ type: 'layout-shift', buffered: true });

    const pores = new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      entries.forEach((entry) => {
        stamp(`resource loaded: ${entry.name} - [${Math.round(entry.startTime + entry.duration)}]`);
      });
    });

    pores.observe({ type: 'resource', buffered: true });
  } catch (e) {
    // no output
  }
}

/*
 * Copyright 2022 Adobe. All rights reserved.
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
 * Initializes helix
 * @preserve Exclude from terser
 */
function initHlx() {
  window.hlx = window.hlx || {};
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get('lighthouse') === 'on';
  window.hlx.codeBasePath = '';

  const scriptEl = document.querySelector('script[src$="/scripts/scripts.js"]');
  if (scriptEl) {
    try {
      // relative path does not work when the script is loaded from a different origin
      window.hlx.codeBasePath = new URL(scriptEl.src).href.replace('/scripts/scripts.js', '');
    } catch (e) {
      // eslint-disable-next-line no-console
      console.log(e);
    }
  }
}

/**
 * Adds one or more URLs to the dependencies for publishing.
 * @param {string|string[]} url The URL(s) to add as dependencies
 * @preserve Exclude from terser
 */
function addPublishDependencies(url) {
  const urls = Array.isArray(url) ? url : [url];
  window.hlx = window.hlx || {};
  if (window.hlx.dependencies && Array.isArray(window.hlx.dependencies)) {
    window.hlx.dependencies.concat(urls);
  } else {
    window.hlx.dependencies = urls;
  }
}

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

const defaultConfig = {
  makeLinksRelative: true,
  lazyStyles: false,
  autoAppear: true,
  favIcon: '/styles/icon.svg',
};

/**
 * @typedef {object} AppConfig
 * @property {boolean} makeLinksRelative
 * @property {boolean} rumEnabled
 * @property {string} rumGeneration
 * @property {string} blocksSelector
 * @property {string[]} productionDomains
 * @property {string[]} lcpBlocks
 * @property {boolean} lazyStyles
 * @property {boolean} autoAppear
 * @property {string} favIcon
 */

class HelixApp {
  /** @param {AppConfig} config */
  constructor(config = defaultConfig) {
    this.config = config;
    initHlx();

    if (this.config.rumEnabled) {
      this.sampleRUM('top');
      window.addEventListener('load', () => sampleRUM('load'));
      document.addEventListener('click', () => sampleRUM('click'));
    }

    if (window.name.includes('performance')) {
      registerPerformanceLogger();
    }
  }

  static init(config) {
    return new HelixApp(config);
  }

  /**
   * Hook into the end of loadEager function.
   */
  withLoadEager(override) {
    this.loadEagerHook = override;
    return this;
  }

  /**
   * Hook into the end of loadLazy function.
   */
  withLoadLazy(override) {
    this.loadLazyHook = override;
    return this;
  }

  /**
   * Overrides the loadDelayed function.
   */
  withLoadDelayed(override) {
    this.loadDelayed = override;
    return this;
  }

  /**
   * Overrides the buildAutoBlocks function.
   */
  withBuildAutoBlocks(override) {
    this.buildAutoBlocks = override;
    return this;
  }

  /**
   * Overrides the loadHeader function.
   */
  withLoadHeader(override) {
    this.loadHeader = override;
    return this;
  }

  /**
   * Overrides the loadFooter function.
   */
  withLoadFooter(override) {
    this.loadFooter = override;
    return this;
  }

  /**
   * Overrides the decorateSections function.
   */
  withDecorateSections(override) {
    this.decorateSections = override;
    return this;
  }

  /**
   * Overrides the decorateSections function.
   */
  withDecorateBlock(override) {
    this.decorateBlock = override;
    return this;
  }

  /**
   * Overrides the decorateIcons function.
   */
  withDecorateIcons(override) {
    this.decorateIcons = override;
    return this;
  }

  /**
   * Overrides the decorateIcons function.
   */
  withDecorateButtons(override) {
    this.decorateButtons = override;
    return this;
  }

  /**
   * Hook direct after block decoration and before waitForLCP.
   */
  withPostDecorateBlockHook(hook) {
    this.postDecorateBlockHook = hook;
    return this;
  }

  /**
   * Decorate the page
   */
  async decorate() {
    await this.loadEager(document);
    await this.loadLazy(document);
    this.loadDelayed(document);
  }

  /**
   * Decorates all blocks in a container element.
   * @param {Element} main The container element
   * @preserve Exclude from terser
   */
  decorateBlocks(main) {
    main
      .querySelectorAll(this.config.blocksSelector ?? 'div.section > div > div')
      .forEach((block) => this.decorateBlock(block));
  }

  /**
   * Decorates the main element.
   * @param {Element} main The main element
   */
  decorateMain(main) {
    decoratePictures(main);
    removeStylingFromImages(main);
    if (this.config.makeLinksRelative ?? defaultConfig.makeLinksRelative) {
      makeLinksRelative(main, this.config.productionDomains);
    }
    this.decorateButtons(main);
    this.decorateIcons(main);
    this.buildAutoBlocks(main);
    this.decorateSections(main);
    this.decorateBlocks(main);
    if (this.postDecorateBlockHook) {
      this.postDecorateBlockHook(main);
    }
  }

  /**
   * log RUM if part of the sample.
   * @param {string} checkpoint identifies the checkpoint in funnel
   * @param {Object} data additional data for RUM sample
   * @preserve Exclude from terser
   */
  sampleRUM(event, data = {}) {
    sampleRUM(event, this.config.rumGeneration, data);
  }

  /**
   * loads everything needed to get to LCP.
   * Should be overridden by subclasses.
   */
  async loadEager(doc) {
    decorateTemplateAndTheme();
    const main = doc.querySelector('main');
    if (main) {
      this.decorateMain(main);
      await this.waitForLCP(this.config.lcpBlocks ?? []);
    }
    if (this.loadEagerHook) {
      await this.loadEagerHook(doc);
    }
  }

  /**
   * loads everything that doesn't need to be delayed.
   */
  async loadLazy(doc) {
    const main = doc.querySelector('main');
    await loadBlocks(main);

    const { hash } = window.location;
    if (hash) {
      try {
        const element = main.querySelector(hash);
        if (hash && element) element.scrollIntoView();
      } catch {
        /* do nothing */
      }
    }

    this.loadHeader(doc.querySelector('header'));
    this.loadFooter(doc.querySelector('footer'));

    if (this.config.lazyStyles ?? defaultConfig.lazyStyles) {
      loadCSS(`${window.hlx.codeBasePath}/styles/lazy-styles.css`);
    }

    addFavIcon(`${window.hlx.codeBasePath}${this.config.favIcon ?? defaultConfig.favIcon}`);
    if (this.loadLazyHook) {
      this.loadLazyHook(doc);
    }
  }

  /**
   * loads everything that happens a lot later, without impacting
   * the user experience.
   */
  loadDelayed() { }

  /**
   * Builds all synthetic blocks in a container element.
   * @param {Element} main The container element
   */
  buildAutoBlocks() { }

  /**
   * Loads the header block.
   * @param {Element} header The header element
   */
  async loadHeader(header) {
    loadHeader(header, this.config.productionDomains);
  }

  /**
   * Loads the footer block.
   * @param {Element} footer The footer element
   */
  async loadFooter(footer) {
    loadFooter(footer, this.config.productionDomains);
  }

  /**
   * Decorates all sections in a container element.
   * @param {Element} main The container element
   * @preserve Exclude from terser
   */
  decorateSections(main) {
    decorateSections(main);
  }

  /**
   * Decorates a block.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateBlock(main) {
    decorateBlock(main);
  }

  /**
   * Decorates all Icons.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateIcons(main) {
    decorateIcons(main);
  }

  /**
   * Decorates paragraphs containing a single link as buttons.
   * @param {Element} block The block element
   * @preserve Exclude from terser
   */
  decorateButtons(main) {
    decorateButtons(main);
  }

  /**
   * load LCP block and/or wait for LCP in default content.
   * @preserve Exclude from terser
   */
  waitForLCP(lcpBlocks) {
    return waitForLCP(lcpBlocks, this.config.autoAppear ?? defaultConfig.autoAppear);
  }
}

export { HelixApp, addFavIcon, addPublishDependencies, buildBlock, createOptimizedPicture, decorateBlock, decorateBlocks, decorateButtons, decorateIcons, decoratePictures, decorateSections, decorateTemplateAndTheme, fetchPlaceholders, getMetadata, getOptimizedImagePath, initHlx, loadBlock, loadBlocks, loadCSS, loadFooter, loadHeader, loadScript, makeLinksRelative, normalizeHeadings, readBlockConfig, registerPerformanceLogger, removeStylingFromImages, sampleRUM, stamp, toCamelCase, toClassName, updateSectionsStatus, waitForLCP };
