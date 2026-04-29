const CustomImportScript = (() => {
  const __defProp = Object.defineProperty;
  const __defProps = Object.defineProperties;
  const __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  const __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  const __getOwnPropNames = Object.getOwnPropertyNames;
  const __getOwnPropSymbols = Object.getOwnPropertySymbols;
  const __hasOwnProp = Object.prototype.hasOwnProperty;
  const __propIsEnum = Object.prototype.propertyIsEnumerable;
  const __defNormalProp = (obj, key, value) => (key in obj ? __defProp(obj, key, {
    enumerable: true, configurable: true, writable: true, value,
  }) : obj[key] = value);
  const __spreadValues = (a, b) => {
    for (var prop in b || (b = {})) if (__hasOwnProp.call(b, prop)) __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols) {
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop)) __defNormalProp(a, prop, b[prop]);
      }
    }
    return a;
  };
  const __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  const __export = (target, all) => {
    for (const name in all) __defProp(target, name, { get: all[name], enumerable: true });
  };
  const __copyProps = (to, from, except, desc) => {
    if (from && typeof from === 'object' || typeof from === 'function') {
      for (const key of __getOwnPropNames(from)) if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  const __toCommonJS = (mod) => __copyProps(__defProp({}, '__esModule', { value: true }), mod);

  // tools/importer/import-homepage.js
  const import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default,
  });

  // tools/importer/parsers/hero-carousel.js
  function parse(element, { document }) {
    const allImageItems = Array.from(
      element.querySelectorAll('.stageHome__image-slider__slides .stageHome__image-slider__item'),
    ).filter((item) => !item.className.includes('swiper-slide-duplicate'));
    const allTextItems = Array.from(
      element.querySelectorAll('.stageHome__preview-slider__slides .stageHome__preview-slider__item'),
    ).filter((item) => !item.className.includes('swiper-slide-duplicate'));
    const slideCount = Math.max(allImageItems.length, allTextItems.length);
    const cells = [];
    for (let i = 0; i < slideCount; i += 1) {
      const imageItem = allImageItems[i];
      const textItem = allTextItems[i];
      const imageCell = [];
      if (imageItem) {
        const imgTag = imageItem.querySelector('img');
        if (imgTag) {
          imageCell.push(imgTag);
        } else {
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

  // tools/importer/parsers/embed.js
  function parse2(element, { document }) {
    let videoUrl = '';
    const videoEl = element.querySelector('video[src]');
    if (videoEl) {
      videoUrl = videoEl.getAttribute('src');
    }
    if (!videoUrl) {
      const sourceEl = element.querySelector('video source[src]');
      if (sourceEl) {
        videoUrl = sourceEl.getAttribute('src');
      }
    }
    if (!videoUrl) {
      const plyrEl = element.querySelector('[data-plyr-embed-id]');
      if (plyrEl) {
        videoUrl = plyrEl.getAttribute('data-plyr-embed-id');
      }
    }
    if (!videoUrl) {
      const dataSrcEl = element.querySelector('[data-src]');
      if (dataSrcEl) {
        videoUrl = dataSrcEl.getAttribute('data-src');
      }
    }
    if (!videoUrl) {
      const anySource = element.querySelector('source[src*=".mp4"], source[src*=".webm"], source[src*=".ogg"]');
      if (anySource) {
        videoUrl = anySource.getAttribute('src');
      }
    }
    if (!videoUrl) {
      videoUrl = 'https://www.meag.com/data/newwork.mp4';
    }
    if (videoUrl && !videoUrl.startsWith('http')) {
      videoUrl = `https://www.meag.com${videoUrl.startsWith('/') ? '' : '/'}${videoUrl}`;
    }
    const videoLink = document.createElement('a');
    videoLink.href = videoUrl;
    videoLink.textContent = videoUrl;
    const cells = [
      [videoLink],
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: 'embed', cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/carousel-quotes.js
  function parse3(element, { document }) {
    const heading = element.querySelector('h2.sliderCite__headline, h2, .sliderCite__headline');
    const quoteItems = Array.from(element.querySelectorAll('.image-with-quote'));
    const cells = [];
    if (heading) {
      cells.push([heading]);
    }
    quoteItems.forEach((item) => {
      const portraitImg = item.querySelector(':scope > img, .image-with-quote > img');
      const quoteText = item.querySelector('p.blockquote__quote, .blockquote__quote');
      const citeName = item.querySelector('cite.blockquote__cite, .blockquote__cite');
      const contentCell = [];
      if (quoteText) contentCell.push(quoteText);
      if (citeName) contentCell.push(citeName);
      const imageCell = portraitImg ? [portraitImg] : [];
      cells.push([imageCell, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: 'carousel-quotes', cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-teaser.js
  function parse4(element, { document }) {
    const heading = element.querySelector('h2.full-width-image-text-teaser__headline, h2, h3');
    const textContainer = element.querySelector('.full-width-image-text-teaser__text');
    const description = textContainer ? textContainer.querySelector('p') : element.querySelector('.full-width-image-text-teaser__content-wrapper p');
    const ctaLink = element.querySelector('.full-width-image-text-teaser__button a, a.meag-button, a.link');
    const image = element.querySelector('.full-width-image-text-teaser__image-wrapper img, img');
    const contentContainer = document.createElement('div');
    if (image) {
      contentContainer.append(image);
    }
    if (heading) {
      contentContainer.append(heading);
    }
    if (description) {
      contentContainer.append(description);
    }
    if (ctaLink) {
      const ctaParagraph = document.createElement('p');
      const strong = document.createElement('strong');
      strong.append(ctaLink);
      ctaParagraph.append(strong);
      contentContainer.append(ctaParagraph);
    }
    const cells = [];
    if (contentContainer.children.length > 0) {
      cells.push([[contentContainer]]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: 'cards-teaser', cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-nav.js
  function parse5(element, { document }) {
    const heading = element.querySelector('h2, h3, [class*="large-offset"]');
    const linkList = element.querySelector('ul.linked-list, .quickNavigation__navigation ul');
    const leftCell = [];
    if (heading) {
      const h2 = document.createElement('h2');
      h2.textContent = heading.textContent.trim();
      leftCell.push(h2);
    }
    if (linkList) {
      const ul = document.createElement('ul');
      const items = linkList.querySelectorAll('li');
      items.forEach((li) => {
        const link = li.querySelector('a');
        if (link) {
          const newLi = document.createElement('li');
          const a = document.createElement('a');
          a.href = link.href;
          a.textContent = link.textContent.trim();
          newLi.appendChild(a);
          ul.appendChild(newLi);
        }
      });
      leftCell.push(ul);
    }
    const teaserContainer = element.querySelector(
      '.imageTextTeaserWithBackground, [class*="imageTextTeaser"]',
    );
    const rightCell = [];
    if (teaserContainer) {
      const img = teaserContainer.querySelector('img');
      if (img) {
        const newImg = document.createElement('img');
        newImg.src = img.src;
        newImg.alt = img.alt || '';
        rightCell.push(newImg);
      }
      const teaserLink = teaserContainer.querySelector('a');
      if (teaserLink) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = teaserLink.href;
        a.textContent = teaserLink.textContent.trim();
        p.appendChild(a);
        rightCell.push(p);
      }
    }
    const cells = [
      [leftCell, rightCell],
    ];
    const block = WebImporter.Blocks.createBlock(document, {
      name: 'columns-nav',
      cells,
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-icon.js
  function parse6(element, { document }) {
    const sectionHeading = element.querySelector('h2.image-text-teaser__headline, h2');
    if (sectionHeading) {
      const h2 = document.createElement('h2');
      h2.textContent = sectionHeading.textContent.trim();
      element.before(h2);
    }
    const entries = element.querySelectorAll('.image-text-teaser__entry');
    const ctaLink = element.querySelector('.image-text-teaser__button a, a.meag-button');
    const cells = [];
    entries.forEach((entry, index) => {
      const img = entry.querySelector('img.image-text-teaser__image, img');
      const heading = entry.querySelector('.image-text-teaser__text h3, h3');
      const textContainer = entry.querySelector('.image-text-teaser__text');
      const descParagraph = textContainer ? textContainer.querySelector('p') : null;
      const textCell = [];
      if (heading) {
        textCell.push(heading);
      }
      if (descParagraph) {
        textCell.push(descParagraph);
      } else if (textContainer) {
        const textNodes = [];
        textContainer.childNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE && node.textContent.trim()) {
            textNodes.push(node.textContent.trim());
          }
        });
        if (textNodes.length > 0) {
          const p = document.createElement('p');
          p.textContent = textNodes.join(' ');
          textCell.push(p);
        }
      }
      if (ctaLink && index === entries.length - 1) {
        const p = document.createElement('p');
        const a = document.createElement('a');
        a.href = ctaLink.href;
        a.textContent = ctaLink.textContent.trim();
        p.append(a);
        textCell.push(p);
      }
      cells.push([img || '', textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: 'cards-icon', cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/meag-cleanup.js
  const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        '#cookieDisclaimer',
        '#sprite-plyr',
        '.disclaimer-banner',
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        '.js-header',
        '#flyoutWrapperDOM',
        '.mobile-flyout',
        '.breadcrumbs__outer-wrapper',
        'footer',
      ]);
    }
  }

  // tools/importer/transformers/meag-sections.js
  const TransformHook2 = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { document } = payload;
      const sections = payload.template && payload.template.sections;
      if (!sections || sections.length < 2) return;
      const reversedSections = [...sections].reverse();
      for (const section of reversedSections) {
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(document, {
            name: 'Section Metadata',
            cells: { style: section.style },
          });
          sectionEl.after(metaBlock);
        }
        if (section !== sections[0]) {
          const hr = document.createElement('hr');
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  const parsers = {
    'hero-carousel': parse,
    embed: parse2,
    'carousel-quotes': parse3,
    'cards-teaser': parse4,
    'columns-nav': parse5,
    'cards-icon': parse6,
  };
  const PAGE_TEMPLATE = {
    name: 'homepage',
    description: 'MEAG homepage - main landing page with company overview and key information',
    urls: [
      'https://www.meag.com/index_en.html',
    ],
    blocks: [
      {
        name: 'hero-carousel',
        instances: ['.stageHome'],
      },
      {
        name: 'embed',
        instances: ['.videoplayer'],
      },
      {
        name: 'carousel-quotes',
        instances: ['.sliderCite'],
      },
      {
        name: 'cards-teaser',
        instances: ['.full-width-image-text-teaser'],
      },
      {
        name: 'columns-nav',
        instances: ['.quickNavigation'],
      },
      {
        name: 'cards-icon',
        instances: ['.image-text-teaser'],
      },
    ],
    sections: [
      {
        id: 'section-1',
        name: 'Hero Stage',
        selector: '.stageHome',
        style: null,
        blocks: ['hero-carousel'],
        defaultContent: [],
      },
      {
        id: 'section-2',
        name: 'Company Introduction',
        selector: '.text-with-initial',
        style: null,
        blocks: [],
        defaultContent: ['.text-with-initial__header', '.text-with-initial__content-wrapper'],
      },
      {
        id: 'section-3',
        name: 'Video Section',
        selector: '.videoplayer',
        style: null,
        blocks: ['embed'],
        defaultContent: [],
      },
      {
        id: 'section-4',
        name: 'Employee Quotes',
        selector: '.sliderCite',
        style: null,
        blocks: ['carousel-quotes'],
        defaultContent: ['.rich-text-content', '.sliderCite__links'],
      },
      {
        id: 'section-5',
        name: 'Awarded Expertise',
        selector: '.full-width-image-text-teaser',
        style: null,
        blocks: ['cards-teaser'],
        defaultContent: [],
      },
      {
        id: 'section-6',
        name: 'Quick Navigation',
        selector: '.quickNavigation',
        style: null,
        blocks: ['columns-nav'],
        defaultContent: [],
      },
      {
        id: 'section-7',
        name: 'Commitment and Values',
        selector: '.image-text-teaser',
        style: null,
        blocks: ['cards-icon'],
        defaultContent: [],
      },
    ],
  };
  const transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : [],
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE,
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
  function findBlocksOnPage(document, template) {
    const pageBlocks = [];
    template.blocks.forEach((blockDef) => {
      blockDef.instances.forEach((selector) => {
        const elements = document.querySelectorAll(selector);
        if (elements.length === 0) {
          console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
        }
        elements.forEach((element) => {
          pageBlocks.push({
            name: blockDef.name,
            selector,
            element,
            section: blockDef.section || null,
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers('beforeTransform', main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        const parser = parsers[block.name];
        if (parser) {
          try {
            parser(block.element, { document, url, params });
          } catch (e) {
            console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
          }
        } else {
          console.warn(`No parser found for block: ${block.name}`);
        }
      });
      executeTransformers('afterTransform', main, payload);
      const hr = document.createElement('hr');
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name),
        },
      }];
    },
  };
  return __toCommonJS(import_homepage_exports);
})();
