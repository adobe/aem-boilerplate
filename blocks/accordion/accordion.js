import { decorateBlock, loadBlock } from '../../scripts/aem.js';

export default async function decorate(block) {
  [...block.children].forEach((row) => {
    const label = row.children[0];
    const summary = document.createElement('summary');
    summary.className = 'accordion-item-label';
    summary.append(...label.childNodes);

    const body = row.children[1];
    body.className = 'accordion-item-body';

    const details = document.createElement('details');
    details.className = 'accordion-item';
    details.append(summary, body);
    row.replaceWith(details);
  });

  // decorate and load any nested blocks inside accordion bodies
  const nestedBlocks = block.querySelectorAll('.accordion-item-body > div[class]:not(.block)');
  for (let i = 0; i < nestedBlocks.length; i += 1) {
    const nestedBlock = nestedBlocks[i];
    decorateBlock(nestedBlock);
    // eslint-disable-next-line no-await-in-loop
    await loadBlock(nestedBlock);
  }
}
