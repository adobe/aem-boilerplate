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
 */
export function getMetadata(name) {
  const attr = name && name.includes(':') ? 'property' : 'name';
  const meta = [...document.head.querySelectorAll(`meta[${attr}="${name}"]`)].map((m) => m.content).join(', ');
  return meta || '';
}

/**
 * Sanitizes a name for use as class name.
 * @param {string} name The unsanitized name
 * @returns {string} The class name
 */
export function toClassName(name) {
  return typeof name === 'string'
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

export const RumPlugin = () => {
  /**
   * log RUM if part of the sample.
   * @param {string} checkpoint identifies the checkpoint in funnel
   * @param {Object} data additional data for RUM sample
   */
  function sampleRUM(checkpoint, data = {}) {
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

  sampleRUM('top');

  window.addEventListener('load', () => sampleRUM('load'));

  return {
    name: 'rum',

    api: {
      sampleRUM,
    },

    preEager: async () => {
      window.addEventListener('unhandledrejection', (event) => {
        sampleRUM('error', { source: event.reason.sourceURL, target: event.reason.line });
      });
      window.addEventListener('error', (event) => {
        sampleRUM('error', { source: event.filename, target: event.lineno });
      });
    },

    postLazy: async () => {
      const main = document.querySelector('main');
      sampleRUM('lazy');
      sampleRUM.observe(main.querySelectorAll('div[data-block-name]'));
      sampleRUM.observe(main.querySelectorAll('picture > img'));
    },

    preDelayed: async () => {
      sampleRUM('cwv');
    },
  };
};

export const DecoratorPlugin = () => {
  /**
   * Replace icons with inline SVG and prefix with codeBasePath.
   * @param {Element} element
   */
  function decorateIcons(element = document) {
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
   * Decorates a block.
   * @param {Element} block The block element
   */
  function decorateBlock(block) {
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
   * Decorates all sections in a container element.
   * @param {Element} $main The container element
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
        Object.keys(meta).forEach((key) => {
          if (key === 'style') {
            const styles = meta.style.split(',').map((style) => toClassName(style.trim()));
            styles.forEach((style) => section.classList.add(style));
          } else {
            section.dataset[toCamelCase(key)] = meta[key];
          }
        });
        sectionMeta.parentNode.remove();
      }
    });
  }

  /**
   * Decorates all blocks in a container element.
   * @param {Element} main The container element
   */
  function decorateBlocks(main) {
    main
      .querySelectorAll('div.section > div > div')
      .forEach(decorateBlock);
  }

  /**
   * Set template (page structure) and theme (page styles).
   */
  function decorateTemplateAndTheme(loadCssThemes = false) {
    const addClasses = (elem, classes) => {
      classes.split(',').forEach((v) => {
        elem.classList.add(toClassName(v.trim()));
      });
    };
    const template = getMetadata('template');
    if (template) addClasses(document.body, template);
    const theme = getMetadata('theme');
    if (theme) {
      addClasses(document.body, theme);
      if (loadCssThemes) {
        theme.split(',').forEach((t) => {
          loadCSS(`/styles/theme-${toClassName(t)}.css`);
        });
      }
    }
  }

  /**
   * decorates paragraphs containing a single link as buttons.
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

  return {
    name: 'decorator',

    api: {
      decorateBlock,
      decorateBlocks,
      decorateButtons,
      decorateIcons,
      decorateSections,
    },

    preEager: (options) => {
      decorateTemplateAndTheme(options.loadCssThemes);
    },

    postEager: () => {
      const main = document.querySelector('main');
      decorateSections(main);
      decorateBlocks(main);
    },
  };
};

const plugins = {};
const pluginsApis = {};
const pluginContext = {
  getMetadata,
  loadCSS,
  readBlockConfig,
  toCamelCase,
  toClassName,
  plugins: pluginsApis,
};
export async function withPlugin(pathOrFunction, options = {}) {
  if (options.condition && !options.condition()) {
    return null;
  }

  let plugin;
  let pluginName;
  let pluginBasePath = `${window.hlx.codeBasePath}/scripts/`;

  if (typeof pathOrFunction === 'string') {
    const pathTokens = pathOrFunction.split('/');
    pluginName = toCamelCase(pathTokens.pop().replace('.js', ''));
    pluginBasePath = new URL(pathTokens.join('/'), window.location.origin + pluginBasePath).pathname;
    if (pluginName === 'index') {
      pluginName = toCamelCase(pathTokens.pop());
    }
    plugin = await import(pathOrFunction);
    if (plugin.init) {
      plugin.init.call(pluginContext, options);
    } else if (plugin.default) {
      plugin.default.call(pluginContext, options);
    }
  } else if (typeof pathOrFunction === 'function') {
    plugin = pathOrFunction(options);
    pluginName = plugin.name || pathOrFunction.name;
  } else {
    throw new Error('Invalid plugin reference', pathOrFunction);
  }
  options.basePath = pluginBasePath;
  plugins[pluginName] = { ...plugin, options };
  if (plugin.api) {
    pluginsApis[pluginName] = plugin.api;
  }
  return plugin.api || null;
}

export async function setPluginOptions(pluginName, options) {
  plugins[pluginName].options = { ...plugins[pluginName].options, ...options };
}

/**
 * Updates all section status in a container element.
 * @param {Element} main The container element
 */
export function updateSectionsStatus(main) {
  const sections = [...main.querySelectorAll(':scope>div')];
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
 * Gets the configuration for the given glock, and also passes
 * the config to the `patchBlockConfig` methods in the plugins.
 *
 * @param {Element} block The block element
 * @returns {object} The block config (blockName, cssPath and jsPath)
 */
function getBlockConfig(block) {
  const blockName = block.getAttribute('data-block-name');
  const cssPath = `${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.css`;
  const jsPath = `${window.hlx.codeBasePath}/blocks/${blockName}/${blockName}.js`;

  return Object.values(plugins).reduce((config, plugin) => (
    plugin.patchBlockConfig
      ? plugin.patchBlockConfig(config)
      : config
  ), {
    blockName,
    cssPath,
    jsPath,
  });
}

/**
 * Loads JS and CSS for a block.
 * @param {Element} block The block element
 */
export async function loadBlock(block) {
  const status = block.getAttribute('data-block-status');
  if (status === 'loading' || status === 'loaded') {
    return;
  }
  block.setAttribute('data-block-status', 'loading');
  const { blockName, cssPath, jsPath } = getBlockConfig(block);
  try {
    const cssLoaded = new Promise((resolve) => {
      loadCSS(cssPath, resolve);
    });
    const decorationComplete = new Promise((resolve) => {
      (async () => {
        try {
          const mod = await import(jsPath);
          if (mod.default) {
            await mod.default(block, pluginsApis);
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
 * load LCP block and/or wait for LCP in default content.
 */
export async function waitForLCP(lcpBlocks) {
  const block = document.querySelector('.block');
  const hasLCPBlock = (block && lcpBlocks.includes(block.getAttribute('data-block-name')));
  if (hasLCPBlock) await loadBlock(block);

  document.querySelector('body').classList.add('appear');
  const lcpCandidate = document.querySelector('main img');
  await new Promise((resolve) => {
    if (lcpCandidate && !lcpCandidate.complete) {
      lcpCandidate.setAttribute('loading', 'eager');
      lcpCandidate.addEventListener('load', resolve);
      lcpCandidate.addEventListener('error', resolve);
    } else {
      resolve();
    }
  });
}

/**
 * loads a block named 'header' into header
 */

export function loadHeader(header) {
  const headerBlock = buildBlock('header', '');
  header.append(headerBlock);
  pluginsApis.decorator.decorateBlock(headerBlock);
  return loadBlock(headerBlock);
}

/**
 * loads a block named 'footer' into footer
 */

export function loadFooter(footer) {
  const footerBlock = buildBlock('footer', '');
  footer.append(footerBlock);
  pluginsApis.decorator.decorateBlock(footerBlock);
  return loadBlock(footerBlock);
}

async function execPhase(pluginsList, phase, options) {
  await pluginsList.reduce((promise, plugin) => {
    if (plugin[`pre${phase}`]) {
      return promise.then(() => plugin[`pre${phase}`].call(pluginContext, document, options));
    }
    return promise;
  }, Promise.resolve());
  if (options[`load${phase}`]) {
    await options[`load${phase}`].call(pluginContext, document, options);
  }
  await pluginsList.reduce((promise, plugin) => {
    if (plugin[`post${phase}`]) {
      return promise.then(() => plugin[`post${phase}`].call(pluginContext, document, options));
    }
    return promise;
  }, Promise.resolve());
}

/**
 * The main loading logic for the page.
 * It defines the 3 phases (eager, lazy, delayed), and registers both
 * plugins and project hooks.
 *
 * @param {object} options
 * @returns
 */
async function loadPage(options = {}) {
  const pluginsList = Object.values(plugins);

  await execPhase(pluginsList, 'Eager', options);

  await waitForLCP(options.lcpBlocks || []);

  const main = document.querySelector('main');
  await loadBlocks(main);

  await execPhase(pluginsList, 'Lazy', options);
  return new Promise((resolve) => {
    window.setTimeout(async () => {
      await execPhase(pluginsList, 'Delayed', options);
      resolve();
    }, options.delayedDuration || 3000);
  });
}

/**
 * init block utils
 */
window.hlx = window.hlx || {};

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

withPlugin(RumPlugin);
withPlugin(DecoratorPlugin);
export async function init(options) {
  return loadPage(options);
}
