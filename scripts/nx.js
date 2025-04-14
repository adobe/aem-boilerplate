const AUTO_BLOCKS = [
    { fragment: '/fragments/' },
    { youtube: 'https://www.youtube' },
  ];
  
  function getEnv() {
    const { host } = window.location;
    if (!['.page', 'local'].some((check) => host.includes(check))) return 'prod';
    if (['.hlx.', '.aem.'].some((check) => host.includes(check))) return 'stage';
    return 'dev';
  }
  
  export function getMetadata(name, doc = document) {
    const attr = name && name.includes(':') ? 'property' : 'name';
    const meta = doc.head.querySelector(`meta[${attr}="${name}"]`);
    return meta && meta.content;
  }
  
  export function getLocale(locales = { '': {} }) {
    const { pathname } = window.location;
    const matches = Object.keys(locales).filter((locale) => pathname.startsWith(`/${locale}/`));
    const prefix = getMetadata('locale') || matches.sort((a, b) => b.length - a.length)?.[0] || '';
    if (locales[prefix].ietf) document.documentElement.lang = locales[prefix].ietf;
    const base = prefix === '' ? '' : `/${prefix}`;
    return { prefix, base, ...locales[prefix] };
  }
  
  export const [setConfig, getConfig] = (() => {
    let config;
    return [
      (conf = {}) => {
        config = {
          ...conf,
          env: getEnv(),
          locale: getLocale(conf.locales),
          codeBase: `${import.meta.url.replace('/scripts/nx.js', '')}`,
        };
        return config;
      },
      () => (config || setConfig()),
    ];
  })();
  
  export async function loadStyle(href) {
    return new Promise((resolve) => {
      if (!document.querySelector(`head > link[href="${href}"]`)) {
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = href;
        link.onload = resolve;
        link.onerror = resolve;
        document.head.append(link);
      } else {
        resolve();
      }
    });
  }
  
  export async function loadBlock(block) {
    const { classList } = block;
    const name = classList[0];
    block.dataset.blockName = name;
    const blockPath = `/blocks/${name}/${name}`;
    const loaded = [new Promise((resolve) => {
      (async () => {
        try {
          await (await import(`${blockPath}.js`)).default(block);
        } catch (e) { console.log(e); }
        resolve();
      })();
    })];
    if (!classList.contains('cmp')) loaded.push(loadStyle(`${blockPath}.css`));
    await Promise.all(loaded);
    return block;
  }
  
  function decorateContent(el) {
    const children = [el];
    let child = el;
    while (child) {
      child = child.nextElementSibling;
      if (child && child.nodeName !== 'DIV') {
        children.push(child);
      } else {
        break;
      }
    }
    const block = document.createElement('div');
    block.className = 'content';
    block.append(...children);
    return block;
  }
  
  function decorateDefaults(el) {
    const firstChild = ':scope > *:not(div):first-child';
    const afterBlock = ':scope > div + *:not(div)';
    const children = el.querySelectorAll(`${firstChild}, ${afterBlock}`);
    children.forEach((child) => {
      const prev = child.previousElementSibling;
      const content = decorateContent(child);
      if (prev) {
        prev.insertAdjacentElement('afterend', content);
      } else {
        el.insertAdjacentElement('afterbegin', content);
      }
    });
  }
  
  function localizeLinks(links) {
    const { locale } = getConfig();
    // If we are in the root locale, do nothing
    if (locale.prefix === '') return;
  
    links.forEach((link) => {
      try {
        const url = new URL(link.href);
        const { origin, pathname, search, hash } = url;
  
        // If the link is already localized, do nothing
        if (pathname.startsWith(`/${locale.prefix}/`)) return;
  
        link.href = `${origin}/${locale.prefix}${pathname}${search}${hash}`;
      } catch {
        console.log('Could not make localized link');
      }
    });
  }
  
  function decorateLinks(el) {
    const anchors = [...el.querySelectorAll('a')];
    localizeLinks(anchors);
    return anchors.reduce((acc, a) => {
      const { href } = a;
      const found = AUTO_BLOCKS.some((pattern) => {
        const key = Object.keys(pattern)[0];
        if (!href.includes(pattern[key])) return false;
        // Base CSS classes
        const classes = [key, 'auto-block'];
        // If its a fragment, do not load a style
        if (key === 'fragment') classes.push('cmp');
        a.classList.add(...classes);
        return true;
      });
      if (found) acc.push(a);
      return acc;
    }, []);
  }
  
  function decorateIcons(el) {
    const icons = el.querySelectorAll('span.icon');
    icons.forEach((icon) => {
      const name = icon.classList[1].substring(5);
      const img = document.createElement('img');
      img.src = `${getConfig().codeBase}/img/icons/${name}.svg`;
      img.loading = 'lazy';
      img.alt = '';
      icon.append(img);
    });
  }
  
  
  function decorateHeader() {
    const header = document.querySelector('header');
    if (!header) return;
    const meta = getMetadata('header') || 'header';
    if (meta === 'off') {
      header.remove();
      return;
    }
    header.className = meta;
    header.dataset.status = 'decorated';
  }
  
  export async function loadArea(area = document) {
    const isDoc = area === document;
    if (isDoc) decorateHeader();
    const sections = decorateSections(area, isDoc);
    for (const [idx, section] of sections.entries()) {
      await Promise.all(section.autoBlocks.map((block) => loadBlock(block)));
      await Promise.all(section.blocks.map((block) => loadBlock(block)));
      delete section.dataset.status;
      if (isDoc && idx === 0) import('./postlcp.js').then(({ default: postLcp }) => postLcp());
    }
    if (isDoc) import('./lazy.js').then(({ default: lazy }) => lazy());
  }
  
  (async function loadNx() {
    // Setup template
    const template = getMetadata('template');
    if (template) { document.body.classList.add(`${template}-template`); }
  
    // Load DA
    if (!new URL(window.location.href).searchParams.get('dapreview')) return;
    import('https://da.live/scripts/dapreview.js').then(({ default: daPreview }) => daPreview(loadArea));
  }());