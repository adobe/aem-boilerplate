/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroCarouselParser from './parsers/hero-carousel.js';
import embedParser from './parsers/embed.js';
import carouselQuotesParser from './parsers/carousel-quotes.js';
import cardsTeaserParser from './parsers/cards-teaser.js';
import columnsNavParser from './parsers/columns-nav.js';
import cardsIconParser from './parsers/cards-icon.js';

// TRANSFORMER IMPORTS
import meagCleanupTransformer from './transformers/meag-cleanup.js';
import meagSectionsTransformer from './transformers/meag-sections.js';

// PARSER REGISTRY
const parsers = {
  'hero-carousel': heroCarouselParser,
  'embed': embedParser,
  'carousel-quotes': carouselQuotesParser,
  'cards-teaser': cardsTeaserParser,
  'columns-nav': columnsNavParser,
  'cards-icon': cardsIconParser,
};

// PAGE TEMPLATE CONFIGURATION
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

// TRANSFORMER REGISTRY
const transformers = [
  meagCleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [meagSectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
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
 */
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

export default {
  transform: (payload) => {
    const { document, url, params } = payload;

    const main = document.body;

    // 1. Execute beforeTransform transformers (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page using embedded template
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block using registered parsers
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

    // 4. Execute afterTransform transformers (final cleanup + section breaks)
    executeTransformers('afterTransform', main, payload);

    // 5. Apply WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
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
