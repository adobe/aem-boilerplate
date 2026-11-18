import {
  readBlockConfig,
  toClassName,
  decorateBlock,
  decorateIcons,
  loadBlock,
} from './aem.js';

// MarTech: expose authored mbox/mbox-action Section Metadata to the plugin.
export function decoratePersonalizationMetadata(main) {
  main.querySelectorAll('.section-metadata').forEach((block) => {
    const section = block.closest('.section') || block.parentElement;
    const metadata = readBlockConfig(block);
    Object.entries(metadata).forEach(([key, authoredValue]) => {
      const value = Array.isArray(authoredValue) ? authoredValue.join(', ') : authoredValue;
      if (key === 'style') {
        value.split(',').map(toClassName).filter(Boolean)
          .forEach((style) => section.classList.add(style));
      } else if (key === 'id') {
        section.id = toClassName(value);
      } else {
        section.setAttribute(`data-${toClassName(key)}`, value);
      }
    });
    block.remove();
  });
}

export function watchPersonalizedBlocks(main, decorateButtons) {
  const observer = new MutationObserver((mutations) => {
    const candidates = new Set();
    mutations.forEach(({ addedNodes }) => {
      addedNodes.forEach((node) => {
        if (node.nodeType !== Node.ELEMENT_NODE) return;
        [node, ...node.querySelectorAll('div[class]')].forEach((element) => {
          if (element.tagName !== 'DIV' || !element.classList.length
            || element.matches('.section, .section-metadata, [data-block-status]')
            || [...element.classList].some((name) => name.endsWith('-wrapper') || name.endsWith('-container'))
            || element.closest('.block')
            || !element.children.length
            || ![...element.children].every((row) => row.tagName === 'DIV'
              && row.firstElementChild?.tagName === 'DIV')) return;
          candidates.add(element);
        });
      });
    });
    if (!candidates.size) return;
    decoratePersonalizationMetadata(main);
    candidates.forEach((block) => {
      // Decorated offer snapshots must use registerBlockRebind, not decorate() again.
      if (!block.isConnected || block.closest('.block')) return;
      if (block.parentElement.classList.contains('section')) {
        const wrapper = document.createElement('div');
        block.before(wrapper);
        wrapper.append(block);
      }
      decorateBlock(block);
      decorateIcons(block);
      decorateButtons(block);
      loadBlock(block).catch((error) => {
        // eslint-disable-next-line no-console
        console.error('MarTech: personalized block failed to load', error);
      });
    });
  });
  observer.observe(main, { childList: true, subtree: true });
}
