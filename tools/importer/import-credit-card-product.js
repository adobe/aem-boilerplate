/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroEternaParser from './parsers/hero-eterna.js';
import cardsBenefitParser from './parsers/cards-benefit.js';
import columnsProductParser from './parsers/columns-product.js';
import cardsAdditionalParser from './parsers/cards-additional.js';
import cardsStepsParser from './parsers/cards-steps.js';
import heroCtaParser from './parsers/hero-cta.js';
import accordionFaqParser from './parsers/accordion-faq.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/bobcard-cleanup.js';
import sectionsTransformer from './transformers/bobcard-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'credit-card-product',
  description: 'Credit card product detail page with hero banner, card benefits, additional benefits carousel, application guidelines, and FAQ sections',
  urls: [
    'https://www.bobcard.co.in/credit-card-types/eterna',
  ],
  blocks: [
    {
      name: 'hero-eterna',
      instances: ['.CardBannersWrapp article.card_banner', 'article.card_banner'],
    },
    {
      name: 'cards-benefit',
      instances: ['.CardBenefitesWrapp article.benefit-eterna'],
    },
    {
      name: 'columns-product',
      instances: ['article.feature-benefit'],
    },
    {
      name: 'cards-additional',
      instances: ['article.benefit-eterna.additional-benefit'],
    },
    {
      name: 'cards-steps',
      instances: ['article.document-req'],
    },
    {
      name: 'hero-cta',
      instances: ['article.transaction-banner'],
    },
    {
      name: 'accordion-faq',
      instances: ['.faq-pg article.faq-wrapper', 'article.faq-wrapper'],
    },
  ],
  sections: [
    {
      id: 'rc1',
      name: 'Hero Banner',
      selector: ['.CardBannersWrapp'],
      style: null,
      blocks: ['hero-eterna'],
      defaultContent: [],
    },
    {
      id: 'rc2',
      name: 'Page Heading',
      selector: ['h1.headingtext_headingH1Text__XffKe'],
      style: null,
      blocks: [],
      defaultContent: ['h1.headingtext_headingH1Text__XffKe'],
    },
    {
      id: 'rc3',
      name: 'Card Benefits',
      selector: ['.CardBenefitesWrapp'],
      style: 'light-grey',
      blocks: ['cards-benefit'],
      defaultContent: ['.CardBenefitesWrapp article.benefit-eterna h2'],
    },
    {
      id: 'rc4',
      name: 'Additional Benefits',
      selector: ['.AdditionalBenefitsWrapp'],
      style: null,
      blocks: ['columns-product', 'cards-additional'],
      defaultContent: ['article.benefit-eterna.additional-benefit h2', '.disclaimer_descrip'],
    },
    {
      id: 'rc5',
      name: 'Application Guidelines',
      selector: ['.ApplicationGuidelinesWrapp'],
      style: null,
      blocks: ['cards-steps', 'hero-cta'],
      defaultContent: ['article.document-req h2', 'article.document-req > .container > .wrapper > p'],
    },
    {
      id: 'rc6',
      name: 'FAQ',
      selector: ['.faq-pg.rupayFaq'],
      style: null,
      blocks: ['accordion-faq'],
      defaultContent: ['article.faq-wrapper h3', '.moreBtnBox'],
    },
  ],
};

// PARSER REGISTRY
const parsers = {
  'hero-eterna': heroEternaParser,
  'cards-benefit': cardsBenefitParser,
  'columns-product': columnsProductParser,
  'cards-additional': cardsAdditionalParser,
  'cards-steps': cardsStepsParser,
  'hero-cta': heroCtaParser,
  'accordion-faq': accordionFaqParser,
};

// TRANSFORMER REGISTRY - cleanup first, then sections (adds <hr> breaks + metadata)
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 * @param {string} hookName - The hook name ('beforeTransform' or 'afterTransform')
 * @param {Element} element - The DOM element to transform
 * @param {Object} payload - The payload containing { document, url, html, params }
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };

  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 * @param {Document} document - The DOM document
 * @param {Object} template - The embedded PAGE_TEMPLATE object
 * @returns {Array} Array of block instances found on the page
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  const seen = new Set();

  template.blocks.forEach((blockDef) => {
    let matched = false;
    blockDef.instances.forEach((selector) => {
      if (matched) return; // instances are ordered fallbacks - stop after first that matches
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) return;
      elements.forEach((element) => {
        if (seen.has(element)) return;
        seen.add(element);
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
      matched = true;
    });
    if (!matched) {
      console.warn(`Block "${blockDef.name}" not found with any selector: ${blockDef.instances.join(', ')}`);
    }
  });

  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

// EXPORT DEFAULT CONFIGURATION
export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // Already replaced by earlier parser
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

    // 4. Execute afterTransform transformers (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path (map root URL to /index to avoid importer crash)
    const rawPath = new URL(params.originalURL).pathname
      .replace(/\/$/, '')
      .replace(/\.html?$/, '');
    const path = WebImporter.FileUtils.sanitizePath(rawPath === '' ? '/index' : rawPath);

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
