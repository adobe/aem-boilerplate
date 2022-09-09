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
 * log RUM if part of the sample.
 * @param {string} checkpoint identifies the checkpoint in funnel
 * @param {Object} data additional data for RUM sample
 */

export function sampleRUM(checkpoint, data = {}) {
  sampleRUM.defer = sampleRUM.defer || [];
  const defer = (fnname) => {
    sampleRUM[fnname] = sampleRUM[fnname]
      || ((...args) => sampleRUM.defer.push({ fnname, args }));
  };
  sampleRUM.drain = sampleRUM.drain
    || ((dfnname, fn) => {
      sampleRUM[dfnname] = fn;
      sampleRUM.defer
        .filter(({ fnname }) => dfnname === fnname)
        .forEach(({ fnname, args }) => sampleRUM[fnname](...args));
    });
  sampleRUM.on = (chkpnt, fn) => { sampleRUM.cases[chkpnt] = fn; };
  defer('observe');
  defer('cwv');
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
      window.hlx.rum = { weight, id, random, isSelected, sampleRUM };
    }
    const { weight, id } = window.hlx.rum;
    if (window.hlx && window.hlx.rum && window.hlx.rum.isSelected) {
      const sendPing = (pdata = data) => {
        // eslint-disable-next-line object-curly-newline, max-len, no-use-before-define
        const body = JSON.stringify({ weight, id, referer: window.location.href, generation: window.hlx.RUM_GENERATION, checkpoint, ...data });
        const url = `https://rum.hlx.page/.rum/${weight}`;
        // eslint-disable-next-line no-unused-expressions
        navigator.sendBeacon(url, body);
        // eslint-disable-next-line no-console
        console.debug(`ping:${checkpoint}`, pdata);
      };
      sampleRUM.cases = sampleRUM.cases || {
        cwv: () => sampleRUM.cwv(data) || true,
        lazy: () => {
          // use classic script to avoid CORS issues
          const script = document.createElement('script');
          script.src = 'https://rum.hlx.page/.rum/@adobe/helix-rum-enhancer@^1/src/index.js';
          document.head.appendChild(script);
          sendPing(data);
          return true;
        },
      };
      sendPing(data);
      if (sampleRUM.cases[checkpoint]) { sampleRUM.cases[checkpoint](); }
    }
  } catch (error) {
    // something went wrong
  }
}

/**
 * Loads a CSS file.
 * @param {string} href The path to the CSS file
 */
export function loadCSS(href, callback) {
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
 * Retrieves the content of metadata tags.
 * @param {string} name The metadata name (or property)
 * @returns {string} The metadata value(s)
 */
export function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...document.head.querySelectorAll(`meta[${attr}="${name}"]`)].map((m) => m.content).join(', ');
  return meta || null;
}

/**
 * Adds one or more URLs to the dependencies for publishing.
 * @param {string|[string]} url The URL(s) to add as dependencies
 */
export function addPublishDependencies(url) {
  const urls = Array.isArray(url) ? url : [url];
  window.hlx = window.hlx || {};
  if (window.hlx.dependencies && Array.isArray(window.hlx.dependencies)) {
    window.hlx.dependencies = window.hlx.dependencies.concat(urls);
  } else {
    window.hlx.dependencies = urls;
  }
}

/**
 * Sanitizes a name for use as class name.
 * @param {string} name The unsanitized name
 * @returns {string} The class name
 */
export function toClassName(name) {
  return name && typeof name === 'string'
    ? name.toLowerCase().replace(/[^0-9a-z]/gi, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
    : '';
}

/*
 * Sanitizes a name for use as a js property name.
 * @param {string} name The unsanitized name
 * @returns {string} The camelCased name
 */
export function toCamelCase(name) {
  return toClassName(name).replace(/-([a-z])/g, (g) => g[1].toUpperCase());
}

/**
 * Replace icons with inline SVG and prefix with codeBasePath.
 * @param {Element} element
 */
export function decorateIcons(element = document) {
  element.querySelectorAll('span.icon').forEach(async (span) => {
    if (span.classList.length < 2 || !span.classList[1].startsWith('icon-')) {
      return;
    }
    const icon = span.classList[1].substring(5);
    // eslint-disable-next-line no-use-before-define
    const resp = await fetch(`${window.hlx.codeBasePath}/icons/${icon}.svg`);
    if (resp.ok) {
      const iconHTML = await resp.text();
      if (iconHTML.match(/<style/i)) {
        const img = document.createElement('img');
        img.src = `data:image/svg+xml,${encodeURIComponent(iconHTML)}`;
        span.appendChild(img);
      } else {
        span.innerHTML = iconHTML;
      }
    }
  });
}

/**
 * Gets placeholders object
 * @param {string} prefix
 */
export async function fetchPlaceholders(prefix = 'default') {
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
      } catch (error) {
        // error loading placeholders
        window.placeholders[prefix] = {};
        reject();
      }
    });
  }
  await window.placeholders[`${prefix}-loaded`];
  return (window.placeholders[prefix]);
}

/**
 * Decorates a block.
 * @param {Element} block The block element
 */
export function decorateBlock(block) {
  const shortBlockName = block.classList[0];
  if (shortBlockName) {
    block.classList.add('block');
    block.setAttribute('data-block-name', shortBlockName);
    block.setAttribute('data-block-status', 'initialized');
    const blockWrapper = block.parentElement;
    blockWrapper.classList.add(`${shortBlockName}-wrapper`);
    const section = block.closest('.section');
    if (section) section.classList.add(`${shortBlockName}-container`);
  }
}

/**
 * Extracts the config from a block.
 * @param {Element} block The block element
 * @returns {object} The block config
 */
export function readBlockConfig(block) {
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
 * @param {Element} $main The container element
 */
export function decorateSections($main) {
  $main.querySelectorAll(':scope > div').forEach((section) => {
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
        if (key === 'style') {
          const styles = meta.style.split(',').map((style) => toClassName(style.trim()));
          styles.forEach((style) => section.classList.add(style));
        } else section.dataset[toCamelCase(key)] = meta[key];
      });
      sectionMeta.remove();
    }
  });
}

/**
 * Updates all section status in a container element.
 * @param {Element} main The container element
 */
export function updateSectionsStatus(main) {
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
 * Decorates all blocks in a container element.
 * @param {Element} main The container element
 */
export function decorateBlocks(main) {
  main
    .querySelectorAll('div.section > div > div')
    .forEach((block) => decorateBlock(block));
}

/**
 * Builds a block DOM Element from a two dimensional array
 * @param {string} blockName name of the block
 * @param {any} content two dimensional array or string or object of content
 */
export function buildBlock(blockName, content) {
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
 * @param {Element} block The block element
 */
export async function loadBlock(block, eager = false) {
  if (!(block.getAttribute('data-block-status') === 'loading' || block.getAttribute('data-block-status') === 'loaded')) {
    block.setAttribute('data-block-status', 'loading');
    const blockName = block.getAttribute('data-block-name');
    try {
      const cssLoaded = new Promise((resolve) => {
        loadCSS(`${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.css`, resolve);
      });
      const decorationComplete = new Promise((resolve) => {
        (async () => {
          try {
            const mod = await import(`../blocks/${blockName}/${blockName}.js`);
            if (mod.default) {
              await mod.default(block, blockName, document, eager);
            }
          } catch (error) {
            // eslint-disable-next-line no-console
            console.log(`failed to load module for ${blockName}`, error);
          }
          resolve();
        })();
      });
      await Promise.all([cssLoaded, decorationComplete]);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(`failed to load block ${blockName}`, error);
    }
    block.setAttribute('data-block-status', 'loaded');
  }
}

/**
 * Loads JS and CSS for all blocks in a container element.
 * @param {Element} main The container element
 */
export async function loadBlocks(main) {
  updateSectionsStatus(main);
  const blocks = [...main.querySelectorAll('div.block')];
  for (let i = 0; i < blocks.length; i += 1) {
    // eslint-disable-next-line no-await-in-loop
    await loadBlock(blocks[i]);
    updateSectionsStatus(main);
  }
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
      img.setAttribute('loading', eager ? 'eager' : 'lazy');
      img.setAttribute('alt', alt);
      picture.appendChild(img);
      img.setAttribute('src', `${pathname}?width=${br.width}&format=${ext}&optimize=medium`);
    }
  });

  return picture;
}

/**
 * Normalizes all headings within a container element.
 * @param {Element} el The container element
 * @param {[string]} allowedHeadings The list of allowed headings (h1 ... h6)
 */
export function normalizeHeadings(el, allowedHeadings) {
  const allowed = allowedHeadings.map((h) => h.toLowerCase());
  el.querySelectorAll('h1, h2, h3, h4, h5, h6').forEach((tag) => {
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
        tag.outerHTML = `<h${level} id="${tag.id}">${tag.textContent}</h${level}>`;
      }
    }
  });
}

/**
 * Set template (page structure) and theme (page styles).
 */
export function decorateTemplateAndTheme() {
  const addClasses = (elem, classes) => {
    classes.split(',').forEach((v) => {
      elem.classList.add(toClassName(v.trim()));
    });
  };
  const template = getMetadata('template');
  if (template) addClasses(document.body, template);
  const theme = getMetadata('theme');
  if (theme) addClasses(document.body, theme);
}

/**
 * decorates paragraphs containing a single link as buttons.
 * @param {Element} element container element
 */

export function decorateButtons(element) {
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
 * load LCP block and/or wait for LCP in default content.
 */
export async function waitForLCP(lcpBlocks) {
  const block = document.querySelector('.block');
  const hasLCPBlock = (block && lcpBlocks.includes(block.getAttribute('data-block-name')));
  if (hasLCPBlock) await loadBlock(block, true);

  document.querySelector('body').classList.add('appear');
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

export function initHlx() {
  window.hlx = window.hlx || {};
  window.hlx.lighthouse = new URLSearchParams(window.location.search).get('lighthouse') === 'on';
  window.hlx.codeBasePath = '';

  const scriptEl = document.querySelector('script[src$="/scripts/scripts.js"]');
  if (scriptEl) {
    try {
      [window.hlx.codeBasePath] = new URL(scriptEl.src).pathname.split('/scripts/scripts.js');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  }
}

initHlx();

window.blockingTime = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam odio nibh, imperdiet eget mauris vel, mattis condimentum lectus. Nullam sit amet ornare ex, ut lobortis neque. Morbi imperdiet, metus eu aliquam accumsan, nisl eros maximus velit, id feugiat lorem urna at odio. Mauris eleifend ornare sapien et posuere. Nunc ut cursus mauris, non vehicula diam. Curabitur in cursus tortor. Sed dignissim eleifend purus vel placerat.

Sed dignissim urna mi, ac congue dolor ullamcorper ut. Nulla dignissim leo in tempor consequat. Aliquam nec massa eros. Aliquam vitae consectetur odio. Mauris sagittis ultrices arcu non aliquet. Aliquam erat volutpat. In ipsum mi, tincidunt eu dapibus nec, luctus nec metus. In mattis diam nec lorem luctus, a volutpat ligula interdum. Pellentesque efficitur vehicula nulla. Nunc ac imperdiet urna.

Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur libero diam, finibus ac ligula sit amet, euismod efficitur mi. Nam metus leo, tempor nec hendrerit vitae, mattis at diam. In hac habitasse platea dictumst. Praesent risus arcu, hendrerit sit amet sapien nec, vehicula sagittis dui. Mauris maximus, tortor eu elementum fermentum, felis mauris pretium sapien, at porta mauris ipsum non nibh. Phasellus augue neque, pulvinar pulvinar elementum sit amet, placerat ut orci. Quisque et porta quam.

Aliquam ullamcorper elit a elementum commodo. Phasellus ultricies, augue in vehicula congue, eros tellus ultricies neque, et ultricies erat eros non dui. Nulla vel nisl eu lorem interdum ultrices. Sed lorem urna, convallis vitae iaculis eget, efficitur at elit. Duis at imperdiet lorem. Ut accumsan mi eget mauris efficitur convallis. Nullam eget lobortis leo, ut auctor diam. Integer malesuada suscipit porta. Fusce auctor ante a mollis egestas. Sed ac urna quis mi cursus ornare.

Suspendisse quis tortor purus. Nunc ultricies est quis sem mollis, ac vulputate lacus faucibus. Sed bibendum placerat aliquet. Quisque nec urna ac nulla pretium mattis sed eu turpis. Praesent varius porta risus, ac faucibus lectus pellentesque id. Donec tincidunt consectetur diam, sit amet aliquet lectus pulvinar a. Nulla vehicula urna leo, eu efficitur magna viverra sit amet. Morbi et accumsan arcu. Donec eleifend in lectus sed egestas. Proin sed scelerisque est, vel fermentum urna.

Cras condimentum nulla tempor vestibulum varius. Duis eget ultricies elit. Phasellus scelerisque tortor vitae varius sodales. Donec euismod mi ut est commodo hendrerit. Vestibulum elit massa, ultricies a justo quis, placerat rhoncus diam. Pellentesque sit amet vestibulum magna. Sed facilisis tristique nibh in convallis. Nullam convallis mi vitae risus egestas, ac vulputate magna tristique. Integer nisi lacus, tempus vitae metus vel, vehicula ultricies urna. In hac habitasse platea dictumst. Etiam interdum aliquet hendrerit. Sed non placerat justo. Fusce ultricies porta tempor. Nullam lobortis molestie sem, eu accumsan ex tincidunt id. Integer dictum condimentum blandit. Morbi ultricies lorem nec mi suscipit, quis sollicitudin velit commodo.

Etiam a pulvinar metus. Proin feugiat nulla nec iaculis ornare. Nunc sed mi eu ipsum bibendum interdum. Donec laoreet varius dui, non pulvinar diam malesuada non. Nunc elementum vitae magna nec fringilla. Mauris euismod, lorem in aliquet fermentum, diam sem rutrum ex, tempor eleifend enim nisl quis ligula. Sed tristique dictum metus, venenatis aliquet ipsum tristique vitae. Mauris tincidunt dapibus mauris, consequat congue lacus sodales at. Donec id orci lacus. Donec faucibus porta nibh, accumsan luctus massa pellentesque sed. Aenean luctus tincidunt ex ut ornare. Fusce faucibus diam quis urna commodo fringilla. Donec magna velit, vulputate vel nunc auctor, finibus scelerisque risus.

Maecenas pulvinar velit auctor elit auctor dignissim. Donec interdum ligula quis nulla tincidunt auctor. Etiam consequat magna nec rhoncus sagittis. Aliquam non ipsum sed dui fringilla dapibus quis sit amet dolor. Nulla facilisi. Pellentesque tempus purus erat. Morbi luctus luctus ante eu fermentum.

Nam egestas ex et tristique tempus. Pellentesque eget fermentum purus. Donec tempus porttitor mattis. Nam dictum ipsum vitae porttitor dignissim. Phasellus sit amet tortor auctor, venenatis ante eget, tincidunt ligula. Nunc cursus nisi at aliquam porta. Morbi tincidunt lacinia dictum. Ut blandit odio eu odio venenatis lacinia quis eget lorem. Sed interdum venenatis nulla. Curabitur sit amet vulputate turpis, eu ornare ipsum. Morbi vel erat egestas, convallis odio a, commodo nisl. Maecenas pellentesque libero sem, nec condimentum orci posuere vel.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Duis vitae facilisis metus. Nullam erat ipsum, imperdiet eu augue vitae, consequat elementum eros. Ut vitae lacinia lorem. Aenean quis arcu laoreet, elementum quam sed, varius orci. Nam molestie pulvinar mauris, a gravida ipsum egestas eget. Sed et auctor nisi.

Integer mollis nisl felis, sit amet faucibus dui pellentesque non. Pellentesque vehicula dictum luctus. Phasellus vitae mauris ut ex lobortis suscipit. In lacinia tincidunt libero, pharetra fermentum ante tempor feugiat. Ut lobortis, est id efficitur accumsan, massa elit interdum massa, et hendrerit tellus nibh vitae ex. Duis sed diam tortor. Sed laoreet condimentum tellus, eu consectetur neque gravida ac. Ut aliquet enim sed urna feugiat, eu suscipit lorem blandit. In tellus ante, cursus eu sapien nec, consectetur ultricies est. Pellentesque efficitur tellus non sem elementum, quis tristique eros molestie.

In mauris turpis, sodales in justo eget, varius mattis turpis. Nullam at diam justo. Aenean tincidunt dapibus mauris, et ornare lorem sagittis ultrices. Etiam mi massa, fermentum eget interdum et, mattis sagittis est. Pellentesque diam felis, cursus sed sodales eget, sagittis pellentesque elit. Maecenas id nulla dolor. Cras massa urna, blandit in laoreet quis, dignissim sed nibh. Pellentesque ante ex, porta at dui nec, ultricies iaculis leo. Morbi eget metus eget mauris rutrum porta lobortis eu sapien. Curabitur efficitur risus vitae augue auctor, non vestibulum ligula semper. Maecenas cursus libero congue, ullamcorper odio vel, molestie odio.

Vestibulum imperdiet ultricies maximus. Nam aliquam, dolor eget laoreet vulputate, ante justo malesuada nunc, sed sodales erat ante sit amet augue. Curabitur fermentum enim nec nisl semper, non tristique dui auctor. Proin et augue quis velit mattis luctus vitae id orci. Nunc bibendum erat ultricies purus imperdiet, eget ornare turpis rutrum. Etiam tristique varius velit nec placerat. Sed auctor, sapien at vestibulum viverra, purus neque mattis velit, a iaculis turpis quam vitae augue. Curabitur nulla metus, auctor at dictum ut, elementum in augue. Sed venenatis aliquet efficitur. Duis varius enim at turpis tincidunt gravida. Maecenas varius tempor tortor vel congue.

Sed varius, lacus nec mollis mattis, felis enim auctor ex, at mollis mauris velit ac erat. Vivamus luctus mattis lectus et tincidunt. Integer semper ipsum faucibus ipsum ornare hendrerit. Morbi id arcu sagittis, hendrerit dui sit amet, suscipit lorem. In volutpat lorem tellus, in venenatis turpis tempor nec. Curabitur sodales risus vitae nisl hendrerit tristique. Pellentesque in arcu orci. Integer vel ex quis risus ultricies consectetur et quis dolor. Phasellus in mauris in diam venenatis venenatis. Nulla mi ex, molestie posuere libero sed, elementum iaculis quam. Pellentesque iaculis velit ipsum, non pretium mi lacinia sit amet. Fusce hendrerit gravida tincidunt.

Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Suspendisse cursus neque vel erat ornare, quis tincidunt massa hendrerit. Nam eget pharetra ligula. Vivamus et fringilla nibh. Donec at lacus odio. Aenean nec pharetra justo. Praesent ac accumsan eros. Vestibulum tempus neque eu mauris tincidunt, a ornare lacus fermentum. Donec ut cursus lorem. In ut ultrices elit. Aenean id leo sed ligula varius dictum. Sed ultricies tincidunt vulputate. Praesent auctor, purus et maximus rhoncus, risus lacus tristique massa, nec hendrerit nulla erat vel est. Praesent sit amet accumsan tellus. Praesent molestie tincidunt dictum. Sed tempor mauris tempus dui elementum dapibus.

Duis lobortis cursus sapien, efficitur viverra tellus ultricies eget. Quisque eget vehicula enim, vel vehicula diam. Duis sollicitudin turpis vitae rutrum dapibus. Quisque ex justo, luctus vel facilisis ut, aliquam eu nisl. Phasellus ornare elit nulla, vitae fringilla quam rutrum luctus. In non molestie velit, at aliquam lacus. Ut mollis fringilla tellus. Integer semper vel nisi in cursus. Pellentesque interdum, diam vel varius condimentum, lacus erat semper magna, feugiat posuere libero leo vitae est.

Aenean sit amet sem a nibh laoreet semper et eget libero. Sed laoreet, tellus hendrerit faucibus tincidunt, nulla diam porttitor velit, ac vehicula mauris lectus vel ligula. Maecenas ac iaculis neque. Cras ultrices varius fermentum. Donec a condimentum massa. Maecenas ullamcorper risus a lacus bibendum, vitae imperdiet orci interdum. Ut posuere pulvinar dolor, a dictum nunc interdum nec. Donec semper quam nulla, eu pharetra ipsum semper sit amet. In cursus hendrerit purus, id congue mauris rhoncus sed. Nulla volutpat commodo diam. Quisque vel bibendum ipsum. Ut nec ornare mi. Aliquam a mauris iaculis, pulvinar metus quis, rutrum sapien. Quisque et elit nec dolor pretium rutrum. Nulla ut consequat ante. Nullam leo lacus, convallis et blandit non, tempor nec ante.

Aliquam non odio iaculis quam varius elementum nec eget nibh. Praesent eget ante orci. Maecenas magna nisl, varius a lacus ut, dignissim dictum felis. Maecenas ultricies suscipit dictum. Maecenas cursus mi lectus, vitae vehicula nulla sodales non. Sed justo sem, tristique a lorem nec, vestibulum tincidunt felis. Nulla et justo ut nibh mattis consequat. Cras ac rutrum orci, sed consectetur nisi.

In convallis convallis quam vel maximus. Aenean eu tempus nulla. Sed tincidunt nibh ac pulvinar semper. Fusce in orci sed felis interdum semper. Vestibulum consequat fringilla nibh ut blandit. Nam tempus, sapien et egestas tincidunt, ligula risus accumsan odio, a ornare purus neque et diam. Aenean semper auctor nisl, sed rhoncus lorem ultricies ac. Nam non iaculis velit. Suspendisse id maximus sem. Sed aliquet tortor eget erat rutrum aliquam. Curabitur sed nulla vel lectus vestibulum dapibus. Integer a bibendum nulla.

Sed mollis, urna vel condimentum lacinia, metus orci suscipit elit, in pellentesque arcu enim vel purus. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Cras placerat urna orci, quis rutrum turpis ornare in. Phasellus eu viverra tortor. Cras eu porttitor mauris. Curabitur in turpis nec enim efficitur venenatis. Aenean iaculis maximus mi vel ornare. Praesent quis nulla sed ex rhoncus ullamcorper. Maecenas nec est interdum ex laoreet venenatis.

Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Phasellus at quam lorem. Aliquam nec nibh justo. Nullam sed efficitur arcu, in molestie libero. Duis quis nunc et magna dictum fringilla vel sed est. In hac habitasse platea dictumst. Pellentesque tincidunt lorem viverra faucibus bibendum. Duis euismod eu turpis condimentum finibus. In hac habitasse platea dictumst.

Nunc blandit ornare vestibulum. Fusce tempus nisl quis ipsum blandit semper. Vestibulum pulvinar, orci sit amet maximus ultrices, sem quam tristique enim, at sollicitudin velit augue non est. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer eleifend placerat risus vitae convallis. Nunc pulvinar ipsum justo, ac dapibus dolor consequat ut. Vivamus volutpat dignissim lectus eu mollis. Donec vel dui magna.

Suspendisse ac nulla nulla. Aliquam iaculis nibh id tortor euismod ultricies. Etiam hendrerit tortor a augue hendrerit malesuada. Sed ultricies semper gravida. Proin auctor urna sed congue blandit. Aenean condimentum ultricies urna sit amet elementum. Pellentesque tincidunt placerat nulla a vehicula. Pellentesque vestibulum a enim at egestas. Ut elementum tincidunt diam, vitae fermentum odio varius nec. Aenean feugiat malesuada turpis vitae laoreet. Aenean bibendum consequat venenatis. Duis consectetur lacus lectus, at tincidunt nibh imperdiet eu. Vestibulum quis enim egestas, mattis velit vel, pretium ante. Proin molestie sed magna suscipit laoreet. Nullam molestie velit at blandit viverra.

Nulla facilisis, eros quis blandit pharetra, ex arcu interdum nulla, id sodales nibh dui sit amet est. Pellentesque dui nulla, tincidunt vel arcu iaculis, porta malesuada est. Sed efficitur metus ac libero molestie tristique. Mauris interdum pellentesque justo a eleifend. Aenean ac interdum libero. Nam vitae ipsum augue. Praesent ligula nunc, molestie mollis ipsum a, placerat tempus orci. Aliquam eget tellus eget mi accumsan egestas. Sed suscipit libero quam, scelerisque blandit dolor malesuada et. Fusce ultrices condimentum mi et accumsan. Mauris convallis faucibus libero eget laoreet. Donec quis velit sit amet tortor accumsan elementum sed eget urna. Aliquam accumsan eros turpis, at mollis tellus tempor non. Aenean eu placerat leo, ac tincidunt purus. Aliquam iaculis, magna sit amet faucibus varius, nunc justo eleifend erat, in aliquet ipsum nisi a metus.

Nulla nec ante at metus blandit consequat. Phasellus orci tortor, elementum et varius sit amet, varius ac augue. Praesent non orci vulputate, feugiat ligula tristique, molestie erat. Quisque vel pulvinar lorem, a semper urna. Mauris bibendum, dui vel porta lacinia, dui eros luctus arcu, ut gravida nulla dolor porta orci. Suspendisse eget nunc consequat, placerat turpis nec, bibendum turpis. Integer non quam sit amet lorem lobortis dapibus luctus tincidunt elit. Morbi sed elit a sapien dignissim varius. Pellentesque volutpat ultrices scelerisque. Ut tincidunt, erat nec euismod dapibus, tellus lacus efficitur tortor, vitae eleifend felis odio quis lorem.

Sed feugiat gravida mi at luctus. Etiam non ex at neque mollis rhoncus. Vivamus sagittis interdum felis, maximus finibus augue semper nec. Aliquam at finibus tellus, a porttitor diam. In hac habitasse platea dictumst. Ut maximus sollicitudin magna sit amet placerat. Phasellus ut purus non lacus feugiat venenatis ut at nisl. Maecenas tempus sollicitudin pulvinar. Nam vitae diam tellus. Maecenas aliquet arcu eget urna elementum interdum. Nunc consequat lectus sit amet enim tincidunt bibendum. Sed eu lobortis libero. Praesent quam lacus, mattis sit amet sem vitae, tincidunt porttitor sapien.

Curabitur vel ornare nisl, consectetur interdum sem. Curabitur porta volutpat nisl vitae dapibus. Pellentesque justo magna, eleifend vel tincidunt non, semper a turpis. Sed eget porta enim. Curabitur egestas nec turpis sit amet lobortis. Aliquam pellentesque nibh sed ultrices porttitor. In eu nisl ac nulla auctor porta sit amet laoreet diam. Aenean quam turpis, sollicitudin at sapien sit amet, tincidunt sodales mauris. Nunc a mauris volutpat, tincidunt est a, viverra sapien. Praesent nec nisl quis magna scelerisque dictum. Duis quis eleifend metus, non posuere odio. Proin luctus nunc eu interdum aliquet. Fusce tempus ac ex sed hendrerit. Cras rhoncus augue quis nunc volutpat tincidunt. Fusce quis placerat lorem.

Nunc mi leo, posuere ac mattis a, vestibulum vitae lacus. Ut sodales ullamcorper vestibulum. Nunc id magna at odio bibendum consectetur. Proin cursus orci id efficitur ultricies. In nisi dolor, sagittis non magna ac, rhoncus posuere arcu. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Praesent commodo pretium nisi nec rhoncus. Maecenas porta id lacus at pulvinar. Proin nibh ipsum, rutrum sed mi quis, pulvinar viverra metus. Sed tempor felis quis libero vestibulum, ut viverra sapien interdum. Fusce vel pellentesque magna. Morbi velit est, vehicula nec tincidunt sit amet, faucibus vel dui. Etiam sagittis sem eu lectus tincidunt efficitur. Sed vitae mi nunc.

Nam non viverra lorem. Nam euismod suscipit tortor sit amet maximus. Etiam vehicula tellus odio, a fermentum erat efficitur nec. Aliquam ultrices dolor ut augue vulputate efficitur. Phasellus mi mauris, imperdiet in metus non, consectetur laoreet libero. Etiam ac euismod erat. Vivamus ac nulla odio. Pellentesque pharetra, augue nec finibus vulputate, magna metus semper ante, vitae elementum arcu augue at ante. Phasellus ultrices tempus purus, elementum laoreet leo posuere vel. Donec massa ligula, facilisis eget tristique et, congue ac dolor. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris in risus ligula. Aenean bibendum leo non dolor condimentum fermentum vel sagittis dui. Pellentesque convallis dapibus metus tempus volutpat.

Nullam turpis leo, cursus id luctus sit amet, commodo sed orci. Aliquam sodales, nisi sed tincidunt gravida, leo diam laoreet nibh, quis bibendum enim lorem a lorem. Vestibulum nec laoreet ante. Morbi vitae nunc ac elit tristique congue. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut et ornare augue, sit amet pretium libero. Nam vitae nisl mattis ex feugiat congue sit amet non magna. Pellentesque sit amet ante a eros auctor tempor. Maecenas aliquet imperdiet lorem. Fusce a bibendum urna, tincidunt mattis nulla. Fusce bibendum dignissim lectus.

Curabitur rutrum, diam a venenatis suscipit, justo ex luctus orci, auctor bibendum lorem turpis sit amet felis. Ut vitae tellus quam. Suspendisse vulputate egestas enim ut bibendum. Duis venenatis odio facilisis nulla interdum convallis. Morbi pulvinar justo in porta pellentesque. Duis a consequat elit, ut ornare purus. Praesent efficitur felis et lorem suscipit, nec consectetur magna pellentesque.

Fusce accumsan eget tellus nec ornare. Maecenas molestie eleifend mi. Maecenas dapibus venenatis elit sed mattis. Mauris eu justo quis diam tincidunt pharetra ac sed elit. Duis accumsan accumsan mollis. Suspendisse velit augue, fermentum ut est in, vehicula bibendum ante. Nam molestie non arcu eget efficitur. Etiam eu libero ut magna rutrum lacinia. In sollicitudin egestas leo, tristique imperdiet velit tempus sit amet. Cras faucibus, nisl quis luctus ornare, lorem tortor porttitor tellus, et lobortis turpis est at tellus. Pellentesque maximus quis metus ut congue. Cras sagittis mauris at bibendum molestie. Suspendisse auctor tincidunt velit sit amet varius. Donec velit eros, venenatis elementum lorem quis, scelerisque congue augue. Cras ultrices porttitor diam ut convallis. Etiam est dolor, finibus et tristique a, congue quis mi.

Integer volutpat quam at iaculis viverra. Aenean eu fermentum urna. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Sed pharetra varius malesuada. Nam sed lobortis augue, non venenatis orci. Ut finibus pellentesque aliquet. Cras id mauris nec eros congue egestas. Nam at arcu auctor, rhoncus arcu quis, tristique nisl. Aenean augue massa, volutpat a ullamcorper vitae, ultrices vitae lectus. Etiam ac magna interdum, viverra risus eu, porta nulla. Suspendisse interdum nunc pretium neque varius vestibulum.

Sed scelerisque placerat elit, eu vulputate nisi blandit mollis. Etiam nec libero vel tortor rhoncus dignissim sed et dolor. Nunc pharetra, purus nec mollis volutpat, felis nibh laoreet ipsum, efficitur dapibus libero velit nec orci. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam et ex libero. Aenean vel semper orci. Nullam pulvinar a magna id scelerisque. Quisque eu semper risus.

Nunc ut posuere purus. Duis rhoncus tortor non mauris lacinia blandit eu vitae velit. Aenean lacinia sem quis venenatis malesuada. Aenean egestas enim ligula, in consequat purus tristique eget. Aenean quis condimentum arcu. Ut nisl urna, porttitor ut hendrerit ut, efficitur quis dui. In lectus tellus, fermentum eget nunc at, pharetra aliquet ipsum. Quisque id luctus nisl. Nullam nec accumsan lacus. Pellentesque tincidunt pretium malesuada. Nam congue blandit elit, vel porta magna. Vivamus tincidunt ex blandit, porttitor sem ac, dignissim augue.

Quisque porttitor rhoncus arcu sed malesuada. Praesent at nulla ac tellus mollis volutpat. Aliquam nisl risus, viverra a aliquam in, rutrum quis nunc. Proin ultrices odio ut porta consectetur. Nunc nec tincidunt arcu, vitae porta erat. Aliquam auctor luctus sodales. Aliquam ut porta sem. Vivamus tincidunt, erat vel convallis imperdiet, ante nibh luctus arcu, sit amet tincidunt nunc enim a felis.

Vestibulum nulla arcu, ultricies id tristique nec, mollis a magna. Donec auctor iaculis pharetra. Cras sed elementum nisi, ac laoreet turpis. In et convallis nulla. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Proin non dapibus ipsum, sed sollicitudin ipsum. Integer et neque sit amet libero tristique dictum a id ligula.

Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nunc eleifend neque sit amet leo facilisis condimentum. Sed sit amet urna felis. Donec at dui quis augue sodales scelerisque imperdiet et nisi. Duis sed fringilla enim, et ultricies ligula. Duis ut mi sodales, lobortis quam ac, placerat lectus. Nunc dolor est, consectetur at fringilla non, congue imperdiet augue.

In vehicula vel nunc ac fringilla. Fusce consequat arcu et nisl convallis vehicula. Nulla quam lorem, tincidunt in efficitur vel, rutrum in purus. Vestibulum id commodo metus. Aenean porttitor mollis ornare. Integer vel tincidunt nunc, et tristique dolor. Curabitur ut lorem lectus. Duis venenatis risus a ligula commodo, efficitur maximus justo posuere. Nam leo velit, lobortis eget faucibus ut, tempor ac magna.

Aenean porttitor et metus eu mattis. Sed ornare, odio sit amet hendrerit porta, tortor nulla dictum lectus, a sagittis neque arcu maximus augue. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque iaculis dapibus magna vitae dictum. Nulla bibendum ligula at massa faucibus dictum. Integer auctor convallis hendrerit. Ut ligula ligula, molestie vitae magna id, rhoncus aliquam quam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris mattis congue turpis sed molestie. Praesent mauris dolor, venenatis quis faucibus dignissim, iaculis nec augue. Curabitur fermentum sem felis, ut lacinia lectus eleifend ut. Suspendisse sodales scelerisque nulla vel posuere. Donec tincidunt ipsum nisi, sed ultricies orci varius sit amet. Donec mollis sollicitudin est vel gravida.

Sed volutpat nisl non dui accumsan fringilla. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Aliquam tempor ipsum ac purus fermentum fermentum. Cras vel urna in ex suscipit euismod vel quis tortor. Suspendisse dictum viverra felis in tempus. Morbi non scelerisque libero. Donec sollicitudin neque in justo imperdiet, at facilisis erat eleifend. Proin luctus massa ac consequat convallis. Sed a elementum massa, sed interdum metus. Maecenas arcu nulla, consectetur nec laoreet sit amet, malesuada vitae eros. Ut nec molestie enim, at posuere nibh.

Quisque sodales quam auctor urna aliquam, venenatis cursus purus consectetur. Nullam sit amet vulputate orci. Donec vulputate sem quis interdum rhoncus. Integer vel ante velit. Ut luctus nec ipsum sed auctor. Donec vehicula enim nulla, sed commodo felis porta ut. In efficitur orci risus, eu tincidunt libero pretium auctor. Integer in porta lectus.

Aenean maximus mi nisl. Nulla vitae mollis erat. Sed sollicitudin justo a enim elementum placerat eget in nisi. In sem elit, hendrerit et luctus vitae, porta sed nibh. Nam ut sodales erat. Morbi sed elementum elit, eget sollicitudin lacus. Quisque nisl magna, mollis eget elit at, faucibus imperdiet nunc. Donec ullamcorper at eros at pharetra. Fusce tempus faucibus odio. Phasellus sed massa magna. Vivamus nec imperdiet dui, a scelerisque lacus. Etiam dapibus condimentum lobortis. Quisque et odio pulvinar risus elementum condimentum.

Sed euismod egestas consectetur. Nullam ut orci vehicula nulla vestibulum finibus a sed dolor. Nullam eleifend ipsum eget diam cursus, non pharetra odio sollicitudin. Vivamus id hendrerit elit. Maecenas porttitor, urna ac sagittis vulputate, velit tortor bibendum nisi, sit amet blandit enim nisi tempus dolor. Curabitur non ante sed nisi sodales tristique eu a purus. Nunc vitae pharetra dui. Vestibulum vestibulum arcu ligula, at venenatis justo maximus id. Morbi semper blandit consequat. Cras blandit lorem eget orci auctor faucibus.

Maecenas eget fermentum dui. Phasellus eu sapien sit amet est imperdiet volutpat. Curabitur lacinia gravida nulla. Nam a mi non odio commodo efficitur eget quis tortor. Aenean orci mi, faucibus a odio vitae, euismod lobortis enim. Morbi iaculis odio elit, a laoreet dolor facilisis nec. Etiam ut felis in augue laoreet aliquet in eu ligula. Maecenas sagittis quis est id suscipit. Maecenas malesuada dignissim lacus, id eleifend lacus condimentum ut. Curabitur tincidunt, urna vitae varius commodo, ante sapien imperdiet ipsum, eget faucibus dui nibh feugiat massa. Curabitur ut nibh non orci semper lobortis vel ut ligula. Aliquam ante neque, gravida non condimentum a, venenatis ut ante. In porttitor dui in sem tincidunt, euismod placerat arcu molestie. Proin tristique velit in ante feugiat, at dapibus ipsum luctus. Ut sit amet iaculis nunc.

Nullam euismod dolor sed dui luctus, ac lacinia quam tristique. In hac habitasse platea dictumst. Donec id porttitor nulla. Etiam nec leo lacus. Suspendisse id efficitur dui. Duis consequat ipsum nulla, sit amet commodo urna mollis id. Maecenas ornare, ante congue feugiat vestibulum, turpis velit varius purus, molestie efficitur erat dolor eu ipsum. Aenean finibus nulla vel orci rutrum, sed hendrerit elit molestie. Nam dignissim placerat nibh a tristique. Vivamus sed ex pretium nulla tristique sagittis at sit amet lectus.

Sed egestas pretium lacus euismod luctus. Aliquam quis est ut risus blandit scelerisque vel nec libero. Duis eu nibh vitae nisl facilisis iaculis consectetur eu turpis. Nam id tortor sed augue pellentesque convallis. Sed velit tellus, aliquet sit amet dui eget, lacinia tincidunt quam. Etiam cursus ullamcorper purus in pulvinar. Duis iaculis lectus vel metus fringilla, at suscipit ligula efficitur. Integer sit amet elit cursus, fringilla massa at, scelerisque lorem. Sed et fringilla lacus, et suscipit orci. Praesent malesuada nisl et dui ultrices placerat. Curabitur eget nunc diam. Aliquam eu lobortis orci. Aliquam erat volutpat. Fusce fringilla malesuada pellentesque.

Curabitur malesuada non sapien at rutrum. Vestibulum purus est, dignissim et pellentesque a, dictum a tellus. Vestibulum tortor massa, pretium sit amet nibh et, varius euismod odio. Suspendisse non nisi massa. Proin imperdiet justo ut tellus condimentum dignissim. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam enim lectus, blandit et volutpat id, vulputate sed eros. Nunc tincidunt vestibulum enim, at tristique diam maximus quis. Donec posuere ex at elit aliquam, et ornare nisl condimentum. Quisque porttitor dolor nec metus tempor molestie sit amet eget tortor. Vestibulum vel justo nisl. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;

Suspendisse sed velit quis enim finibus condimentum at id eros. Vivamus rutrum ultrices tortor, vitae ultrices nulla bibendum quis. Proin non nisi vel lacus ultrices pulvinar ut eu dui. Nulla facilisi. Aliquam molestie eros vitae justo vestibulum ultrices. Nullam dapibus, diam rhoncus molestie scelerisque, sapien augue imperdiet lectus, eu malesuada ex velit sed odio. Curabitur elementum sem at justo rutrum hendrerit. In fermentum massa neque, nec elementum libero scelerisque eget. Maecenas convallis vulputate augue, dignissim consectetur lectus bibendum id. Proin felis leo, auctor sit amet ex a, euismod eleifend magna. Nulla eros libero, dignissim a tortor in, tempor mollis lorem. Nulla luctus vulputate felis vel feugiat.

Mauris vitae vehicula sem, vel varius sapien. In odio sem, porta vitae rhoncus sit amet, consectetur id justo. Cras eu elit nec augue posuere congue ac ac lectus. Sed in elit varius, tincidunt mauris volutpat, fringilla dolor. Pellentesque mattis nisi sit amet pretium molestie. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Integer id velit varius, imperdiet quam in, ultricies urna. Curabitur varius leo ligula, ut rhoncus est commodo sed. Cras vulputate sagittis leo, at tempor magna. Integer semper accumsan nulla at mollis. Quisque id orci non justo dictum vehicula. Mauris ut semper enim.
`;
