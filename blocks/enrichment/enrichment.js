import { readBlockConfig } from '../../scripts/aem.js';
import { fetchIndex, loadFragment } from '../../scripts/scripts.js';
import { getSkuFromUrl } from '../../scripts/commerce.js';

export default async function decorate(block) {
  const { type, position } = readBlockConfig(block);

  const filters = {};
  if (type === 'product') {
    const productSku = getSkuFromUrl();
    if (!productSku) return;
    filters.products = productSku;
  }

  if (type === 'category') {
    const categoryId = document.querySelector('.block.product-list-page')?.dataset?.category;
    if (!categoryId) return;
    filters.categories = categoryId;
  }

  if (position) {
    filters.positions = position;
  }

  const index = await fetchIndex('enrichment/enrichment');
  const matchingFragments = index.data
    .filter((fragment) => Object.keys(filters).every((filterKey) => {
      const values = JSON.parse(fragment[filterKey]);
      return values.includes(filters[filterKey]);
    }))
    .map((fragment) => fragment.path);

  (await Promise.all(matchingFragments.map((path) => loadFragment(path))))
    .filter((fragment) => fragment)
    .forEach((fragment) => {
      const section = fragment.querySelector(':scope .section');
      if (section) {
        block.closest('.section').classList.add(...section.classList);
        block.closest('.section').append(...section.childNodes);
      }
    });

  block.closest('.enrichment-wrapper')?.remove();
}
